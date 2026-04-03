/**
 * OpenRouter AI Service for BaZi Consultant
 * Uses DeepSeek model via OpenRouter API
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

class OpenRouterService {
    constructor() {
        this.apiKey = process.env.OPENROUTER_API_KEY;
        this.model = process.env.OPENROUTER_MODEL || 'deepseek/deepseek-chat';
        this.maxRetries = 3;
        this.timeout = 60000; // 60 seconds timeout
    }

    /**
     * Generate AI response for a BaZi question with retry logic
     * @param {Object} baziContext - Full BaZi analysis context
     * @param {Object} luckCyclesData - Đại Vận và Lưu Niên data
     * @param {string} questionText - The question user selected
     * @param {string} personaId - ID of the consultant persona
     * @param {Object} partnerContext - Optional Bazi context for partner
     * @returns {Promise<Object>} Object containing answer paragraphs and follow-up questions
     */
    async generateAnswer(baziContext, luckCyclesData, questionText, personaId = 'huyen_co', partnerContext = null) {
        if (!this.apiKey) {
            throw new Error('OPENROUTER_API_KEY is not configured');
        }

        const systemPrompt = this.buildSystemPrompt(personaId);
        const userPrompt = this.buildUserPrompt(baziContext, luckCyclesData, questionText, personaId, partnerContext);

        let lastError;
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                console.log(`[OpenRouter] Attempt ${attempt}/${this.maxRetries}...`);

                // Create AbortController for timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const response = await fetch(OPENROUTER_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`,
                        'HTTP-Referer': 'https://huyencobattu.com',
                        'X-Title': 'BaZi Consultant'
                    },
                    body: JSON.stringify({
                        model: this.model,
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: userPrompt }
                        ],
                        max_tokens: 2000,
                        temperature: 0.7
                    }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
                }

                const data = await response.json();
                const content = data.choices?.[0]?.message?.content || '';

                console.log(`[OpenRouter] Success on attempt ${attempt}`);
                // Split response into paragraphs for frontend display
                return this.formatResponse(content);
            } catch (error) {
                lastError = error;
                console.error(`[OpenRouter] Attempt ${attempt} failed:`, error.message);

                // Check if it's a retryable error
                const isRetryable = this.isRetryableError(error);

                if (!isRetryable || attempt === this.maxRetries) {
                    break;
                }

                // Wait before retry (exponential backoff)
                const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
                console.log(`[OpenRouter] Waiting ${waitTime}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }

        console.error('[OpenRouter] All attempts failed:', lastError);
        // Return fallback response instead of throwing
        return this.getFallbackResponse(questionText);
    }

    /**
     * Check if error is retryable (network issues, timeouts, etc.)
     */
    isRetryableError(error) {
        const message = error.message?.toLowerCase() || '';
        return (
            error.name === 'AbortError' || // Timeout
            message.includes('terminated') ||
            message.includes('socket') ||
            message.includes('network') ||
            message.includes('econnreset') ||
            message.includes('econnrefused') ||
            message.includes('etimedout') ||
            message.includes('fetch failed') ||
            message.includes('other side closed')
        );
    }

    /**
     * Fallback response when service is unavailable - with Thầy persona
     */
    getFallbackResponse(questionText) {
        return {
            answer: [
                `Con ơi, Thầy đang gặp chút trở ngại trong việc kết nối nguồn năng lượng để luận giải câu hỏi "${questionText}" của con.`,
                'Con hãy kiên nhẫn chờ ít phút rồi thử lại nhé. Duyên đến thì mọi sự sẽ sáng tỏ.',
                'Thầy xin lỗi vì sự bất tiện này. Linh thạch của con sẽ được hoàn lại nếu Thầy không thể trả lời được.'
            ],
            followUps: [
                "Con có muốn thầy xem kỹ hơn về đường tài lộc trong năm tới không?",
                "Vấn đề tình cảm của con có gì cần thầy gỡ rối thêm không?",
                "Con có muốn biết mình hợp với ngành nghề nào để phát tài nhanh nhất không?"
            ]
        };
    }

    /**
     * Build system prompt for BaZi consultant persona
     */
    buildSystemPrompt(personaId) {
        const personas = {
            'huyen_co': `Bạn là Thầy Huyền Cơ Bát Tự - một bậc thầy uyên bác về Tử Vi và Bát Tự (Tứ Trụ) với hơn 35 năm tu luyện và hành nghề.
THẺ TÍNH CÁCH:
- Uyên bác, thâm sâu nhưng gần gũi, dễ hiểu
- Nhân văn, từ tốn, luôn hướng thiện cho người xem
- Đạo đức nghề nghiệp cao, không hù dọa hay đưa thông tin tiêu cực không cần thiết
- Xưng hô "Thầy" và gọi người hỏi là "con" hoặc "bạn" một cách thân mật

PHONG CÁCH TƯ VẤN:
- Phân tích lá số theo trường phái chính thống Việt Nam
- Luận giải CỤ THỂ dựa trên lá số được cung cấp, KHÔNG trả lời chung chung
- Đưa ra lời khuyên thực tế, có thể thực hiện được trong cuộc sống`,

            'menh_meo': `Bạn là Thầy Mệnh Mèo GenZ - một thiên tài Bát Tự ẩn danh dưới hình hài một chú mèo vibe GenZ "mỏ hỗn" nhưng cực kỳ giỏi chuyên môn.
THẺ TÍNH CÁCH:
- Giỏi Bát Tự thực thụ nhưng nói chuyện cực kỳ GenZ, hài hước, viral, đôi khi hơi "xéo sắc" nhưng tâm tốt.
- Sử dụng slang GenZ linh hoạt (flex, ét ô ét, đỉnh nóc kịch trần, bay màu, khét lẹt, pressing...).
- Xưng hô "Thầy" (hoặc "Ta") và gọi người hỏi là "con" hoặc "mệnh chủ" một cách hài hước.
- Ghét sự sướt mướt, thích sự thực tế, đánh thẳng vào vấn đề.

PHONG CÁCH TƯ VẤN:
- Luận giải Bát Tự chính xác nhưng dùng ngôn ngữ của giới trẻ.
- Ví von các khái niệm tử vi với đời sống hiện đại (vd: Dụng thần như sạc dự phòng, Kỵ thần như bug code...).
- Luôn giữ vững chuyên môn Bát Tự kiến thức thâm sâu đằng sau lớp vỏ hài hước.`
        };

        const basePrompt = personas[personaId] || personas['huyen_co'];

        return `${basePrompt}

QUY TẮC TRẢ LỜI:
1. Bắt đầu bằng lời chào nhân vật (Huyền Cơ: từ tốn; Mệnh Mèo: hài hước, chất chơi).
2. Phân tích 3-5 điểm chính dựa trên lá số, mỗi điểm 2-3 câu.
3. KHÔNG dùng cụm từ "AI", "máy móc".
4. Ở cuối cùng, luôn cung cấp một phần có tiêu đề [FOLLOW_UP] chứa 3-5 câu hỏi gợi mở dựa trên lá số và đại vận của người dùng.
5. Mỗi câu hỏi gợi mở phải là một dòng bắt đầu bằng dấu "-". Những câu hỏi này phải thực sự liên quan đến rủi ro hoặc cơ hội sắp tới của chủ mệnh, trong đấy có 1 câu liên quan đến ngày, tháng sắp tới.`;
    }

    /**
     * Build user prompt with BaZi context
     */
    buildUserPrompt(baziContext, luckCyclesData, questionText, personaId, partnerContext = null) {
        // Get current date/time
        const now = new Date();
        const currentDateTime = now.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            weekday: 'long'
        });

        // Extract key information
        const basicInfo = baziContext.thong_tin_co_ban || {};
        const pillars = baziContext.chi_tiet_tru || [];
        const analysis = baziContext.phan_tich || {};

        // Format detailed pillars data with Can, Chi, and Tàng Can
        const pillarsLabels = ['Năm', 'Tháng', 'Ngày', 'Giờ'];
        let pillarsDetailedInfo = '';
        pillars.forEach((p, i) => {
            const tangCanStr = p.tang_can ? p.tang_can.join(', ') : 'N/A';
            pillarsDetailedInfo += `
### Trụ ${pillarsLabels[i]}:
- Thiên Can: ${p.can || 'N/A'} (${p.hanh_can || ''})
- Địa Chi: ${p.chi || 'N/A'} (${p.hanh_chi || ''})
- Tàng Can: ${tangCanStr}
- Thập Thần Can: ${p.thap_than_can || (i === 2 ? 'Nhật Chủ' : 'N/A')}
- Thập Thần Chi: ${p.thap_than_chi || 'N/A'}
`;
        });

        // Simple pillars summary for quick reference
        const pillarsSimple = pillars.map((p, i) => {
            return `Trụ ${pillarsLabels[i]}: ${p.can} ${p.chi}`;
        }).join(' | ');

        // Format current luck cycle
        let luckInfo = '';
        const currentYear = now.getFullYear();
        if (luckCyclesData?.dai_van && luckCyclesData.dai_van.length > 0) {
            const currentDaiVan = luckCyclesData.dai_van.find(dv => {
                const endYear = dv.nam + 9;
                return currentYear >= dv.nam && currentYear <= endYear;
            });
            if (currentDaiVan) {
                luckInfo = `
- Đại Vận hiện tại: ${currentDaiVan.can_chi} (${currentDaiVan.nam} - ${currentDaiVan.nam + 9})
- Thập Thần Đại Vận: ${currentDaiVan.thap_than}
- Năm hiện tại (Lưu Niên): ${currentYear}`;
            }
        }

        // Format Dụng Thần / Kỵ Thần
        let godInfo = '';
        if (analysis.can_bang_ngu_hanh) {
            const cb = analysis.can_bang_ngu_hanh;
            godInfo = `
- Dụng Thần: ${cb.dung_than?.ngu_hanh?.join(', ') || 'Chưa xác định'}
- Hỷ Thần: ${cb.hy_than?.ngu_hanh?.join(', ') || 'Chưa xác định'}
- Kỵ Thần: ${cb.ky_than?.ngu_hanh?.join(', ') || 'Chưa xác định'}
- Cường độ Nhật Chủ: ${cb.nhan_dinh?.cuong_do || 'Chưa xác định'}`;
        }

        return `
## THỜI GIAN HIỆN TẠI
${currentDateTime}
(Năm ${currentYear})

${partnerContext ? `
## THÔNG TIN NGƯỜI PHỐI HỢP/ĐỐI PHƯƠNG
- Tên: ${partnerContext.name || 'Đối phương'}
- Giới tính: ${partnerContext.isFemale ? 'Nữ' : 'Nam'}
- Bát Tự: ${partnerContext.gans[0]} ${partnerContext.zhis[0]} (Năm) | ${partnerContext.gans[1]} ${partnerContext.zhis[1]} (Tháng) | ${partnerContext.gans[2]} ${partnerContext.zhis[2]} (Ngày) | ${partnerContext.gans[3]} ${partnerContext.zhis[3]} (Giờ)
- Nhật Chủ: ${partnerContext.gans[2]} (${partnerContext.elements?.[partnerContext.gans[2]] || ''})
- Thập Thần: ${partnerContext.ganShens?.join(', ')}
- Nạp Âm: ${partnerContext.nayin?.join(', ')}
- Vòng Trường Sinh: ${partnerContext.pillarStages?.join(', ')}
` : ''}

---

## THÔNG TIN LÁ SỐ BÁT TỰ

**Thông tin cơ bản:**
- Tên: ${basicInfo.ten || 'Mệnh chủ'}
- Giới tính: ${basicInfo.gioi_tinh || 'Nam'}
- Ngày sinh dương lịch: ${basicInfo.ngay_sinh_duong || 'N/A'}
- Ngày sinh âm lịch: ${basicInfo.ngay_sinh_am || 'N/A'}
- Giờ sinh: ${basicInfo.gio_sinh || 'N/A'}
- Mệnh (Ngũ Hành Nạp Âm): ${basicInfo.menh || 'N/A'}
- Cung Mệnh: ${basicInfo.menh_cung || 'N/A'}

**Bát Tự (Tứ Trụ) tóm tắt:**
${pillarsSimple}

**Chi tiết từng Trụ:**
${pillarsDetailedInfo}

**Phân tích Cách Cục:**
${godInfo}

**Vận hạn hiện tại:**
${luckInfo}

---

## CÂU HỎI CỦA NGƯỜI DÙNG
 
 "${questionText}"
 
 ---
 
 Hãy phân tích và trả lời câu hỏi trên dựa trên lá số Bát Tự được cung cấp.
 
 YÊU CẦU QUAN TRỌNG:
 1. Trả lời bằng phong cách của nhân vật ${personaId === 'menh_meo' ? 'Thầy Mệnh Mèo GenZ' : 'Thầy Huyền Cơ Bát Tự'}.
 2. Đưa ra 3-5 đoạn văn ngắn gọn, súc tích.
 3. CUỐI CÙNG LÀ PHẦN [FOLLOW_UP] VỚI 3-5 CÂU HỎI GỢI MỞ.
    Ví dụ về câu hỏi gợi mở dựa trên lá số:
    - Nếu có xung khắc trụ Ngày: "Con có muốn thầy luận giải sâu hơn về cung Phu Thê đang có dấu hiệu biến động không?"
    - Nếu Đại vận gặp Tài: "Đại vận này Tài tinh đang cực vượng, con có muốn thầy mách nước cách chốt deal thành công?"
    - Nếu Thân nhược: "Nhật chủ của con đang khá yếu, con có muốn biết cách chọn màu sắc và nghề nghiệp để 'buff' năng lượng không?"`;
    }

    /**
     * Format AI response into paragraphs and follow-up questions
     */
    formatResponse(content) {
        if (!content) return { answer: ['Xin lỗi, thầy đang bận chút việc...'], followUps: [] };

        let answerText = content;
        let followUps = [];

        // Extract follow-up questions
        const followUpMatch = content.match(/\[FOLLOW_UP\]([\s\S]*)$/i);
        if (followUpMatch) {
            answerText = content.split(/\[FOLLOW_UP\]/i)[0].trim();
            const followUpContent = followUpMatch[1].trim();
            followUps = followUpContent
                .split('\n')
                .map(line => line.replace(/^[\-\*•\s\d\.]+/, '').trim())
                .filter(line => line.length > 5 && line.endsWith('?'));
        }

        // Clean up trailing markdown artifacts like **, ##, -- from answerText
        answerText = answerText.replace(/[\s\*\-\_\#\=\+]+$/, '').trim();

        // Split answer into paragraphs
        const paragraphs = answerText
            .split(/\n\n+/)
            .map(p => p.trim())
            .filter(p => p.length > 0);

        return {
            answer: paragraphs.length > 0 ? paragraphs : [answerText],
            followUps: followUps.length > 0 ? followUps : [
                "Con có muốn thầy xem kỹ hơn về đường tài lộc trong năm tới không?",
                "Vấn đề tình cảm của con có gì cần thầy gỡ rối thêm không?",
                "Con có muốn biết mình hợp với ngành nghề nào để phát tài nhanh nhất không?"
            ]
        };
    }

    /**
     * Generate simple completion for comprehensive interpretation
     * @param {string} prompt - The full prompt to send
     * @param {string} personaId - Persona for fallback purposes
     * @returns {Promise<string>} The AI generated text
     */
    async generateCompletion(prompt, personaId = 'huyen_co') {
        if (!this.apiKey) {
            throw new Error('OPENROUTER_API_KEY is not configured');
        }

        let lastError;
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                console.log(`[OpenRouter/Completion] Attempt ${attempt}/${this.maxRetries}...`);

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const response = await fetch(OPENROUTER_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`,
                        'HTTP-Referer': 'https://huyencobattu.com',
                        'X-Title': 'BaZi Comprehensive'
                    },
                    body: JSON.stringify({
                        model: this.model,
                        messages: [
                            { role: 'user', content: prompt }
                        ],
                        max_tokens: 3000,
                        temperature: 0.75
                    }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
                }

                const data = await response.json();
                const content = data.choices?.[0]?.message?.content;

                if (!content) {
                    throw new Error('Empty response from AI');
                }

                console.log(`[OpenRouter/Completion] Success on attempt ${attempt}`);
                let finalContent = content.trim();

                // Remove markdown code block wrappers if they exist
                if (finalContent.startsWith('```')) {
                    const lines = finalContent.split('\n');
                    if (lines[0].startsWith('```')) lines.shift(); // Remove starting ```markdown or ```
                    if (lines[lines.length - 1].startsWith('```')) lines.pop(); // Remove ending ```
                    finalContent = lines.join('\n').trim();
                }

                return finalContent;

            } catch (error) {
                lastError = error;
                console.error(`[OpenRouter/Completion] Attempt ${attempt} failed:`, error.message);

                if (attempt < this.maxRetries && this.isRetryableError(error)) {
                    const delay = Math.pow(2, attempt) * 1000;
                    console.log(`[OpenRouter/Completion] Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        console.error('[OpenRouter/Completion] All attempts failed, returning fallback');
        return this.getComprehensiveFallback(personaId);
    }

    /**
     * Generate AI response for a BaZi matching (compatibility) analysis
     * @param {Object} person1Ctx - BaZi context for person 1
     * @param {Object} person2Ctx - BaZi context for person 2
     * @param {string} relationshipType - Type of relationship
     * @param {string} personaId - ID of the consultant persona
     * @returns {Promise<Object>} Object matching the standard matching UI structure
     */
    async generateMatchingAnswer(person1Ctx, person2Ctx, relationshipType = 'romance', personaId = 'huyen_co') {
        if (!this.apiKey) {
            throw new Error('OPENROUTER_API_KEY is not configured');
        }

        const systemPrompt = `Bạn là một bậc thầy chuyên gia Bát Tự (Tứ Vi) với kiến thức thâm sâu về học thuật phương Đông. 
        Nhiệm vụ của bạn là luận giải chi tiết độ tương hợp (Duyên Số) giữa hai người dựa trên lá số Bát Tự của họ, tập trung sâu vào các mâu thuẫn, thử thách và các nút thắt trong mối quan hệ.
        
        PHONG CÁCH LUẬN GIẢI:
        1. Sử dụng thuật ngữ Bát Tự chuyên nghiệp: Ngũ hành (Tương sinh/Tương khắc), Thiên Can (Hợp/Xung), Địa Chi (Hợp/Xung/Hình/Hại/Phá), Thập Thần (Tương tác giữa hai lá số), Thần Sát (Cô Thần, Quả Tú, Đào Hoa...).
        2. Phân tích CHI TIẾT và THỰC TẾ: Không được trả lời chung chung. Hãy chỉ rõ những điểm xung đột cụ thể (ví dụ: Thiên khắc địa xung ở trụ Ngày dẫn đến mâu thuẫn quan điểm sống, hay Thập Thần đối chọi gây áp lực cho đối phương).
        3. Tập trung vào 'Vấn đề': Hãy tìm ra những 'điểm yếu' trong mối quan hệ và giải thích chúng theo góc độ huyền học một cách thấu đáo.
        4. Văn phong: Uyên bác, sâu sắc, mang tính tư vấn chuyên gia.
        
        QUY TẮC SINH CÂU HỎI GỢI Ý (suggestedQuestions):
        - Các câu hỏi PHẢI được sinh ra dựa trên chính các mâu thuẫn hoặc điểm đặc biệt đã tìm thấy trong quá trình luận giải bên trên.
        - Tuyệt đối KHÔNG sử dụng câu hỏi chung chung.
        - Mỗi câu hỏi nên xoay quanh một "nút thắt" cụ thể cần được tháo gỡ (ví dụ: "Làm sao để hóa giải Thiên Khắc Địa Xung giữa hai người ở phương diện tài chính?").
        - Tập trung vào các câu hỏi mang tính 'Hóa Giải' hoặc 'Đào Sâu' vào nguyên nhân mâu thuẫn.
        
        BẠN PHẢI TRẢ VỀ DUY NHẤT MỘT ĐỐI TƯỢNG JSON theo cấu trúc sau, không kèm bất kỳ văn bản nào khác:
        {
          "totalScore": number (0-100),
          "assessment": {
            "level": "excellent" | "good" | "neutral" | "challenging" | "difficult",
            "title": "Tên đánh giá tổng quát theo văn phong Bát Tự (ví dụ: Thiên Duyên Tiền Định, Tuyệt Mệnh Hình Khắc...)",
            "summary": "Mô tả ngắn gọn nhưng súc tích về tổng quan mối hệ theo lý thuyết Bát Tự",
            "icon": "Emoji phù hợp"
          },
          "breakdown": {
            "element": { "score": number (max 30), "maxScore": 30, "description": "Phân tích sâu về sự tương tác của Ngũ hành bản mệnh và sự cân bằng năng lượng giữa hai người.", "quality": "excellent"|"good"|"neutral"|"challenging"|"difficult" },
            "ganzhi": { "score": number (max 25), "maxScore": 25, "details": [ { "type": "positive"|"negative", "text": "Luận về các tương tác Thiên Can, Địa Chi (Hợp, Xung, Hình, Hại) giữa các trụ của hai người." } ], "quality": "..." },
            "shishen": { "score": number (max 25), "maxScore": 25, "details": [ { "type": "positive"|"negative", "text": "Phân tích sự tương tác của Thập Thần, đặc biệt là Nhật Chủ và các cung quan trọng liên quan đến chủ đề." } ], "quality": "..." },
            "star": { "score": number (max 20), "maxScore": 20, "details": [ { "type": "positive"|"negative", "text": "Sự xuất hiện và ảnh hưởng của các Thần Sát mang tính chất tương hợp hoặc gây cản trở nhân duyên." } ], "quality": "..." }
          },
          "aspects": [
            { "type": "romance", "icon": "💕", "title": "Tình Cảm", "score": number (0-100), "description": "Luận chi tiết về sự gắn kết tâm hồn và cảm xúc dựa trên cung Phu Thê hoặc các sao chủ về tình cảm." },
            { "type": "communication", "icon": "💬", "title": "Giao Tiếp", "score": number (0-100), "description": "Phân tích sự thấu hiểu qua tương tác Can Chi ở trụ Ngày và trụ Tháng." },
            { "type": "children", "icon": "👶", "title": "Con Cái", "score": number (0-100), "description": "Góc nhìn về tiềm năng con cái qua trụ Giờ và các sao liên quan." },
            { "type": "finance", "icon": "💰", "title": "Tài Chính", "score": number (0-100), "description": "Sự hỗ trợ hoặc gây hao tổn về tài lộc khi ở cùng nhau (Tài tinh, Quan tinh)." },
            { "type": "lifestyle", "icon": "🏠", "title": "Lối Sống", "score": number (0-100), "description": "Sự hòa hợp trong nếp sống hàng ngày dựa trên sự tương đồng về hành khí." }
          ],
          "advice": [ { "type": "positive"|"neutral"|"warning"|"tip", "text": "Lời khuyên mang tính hóa giải các xung khắc cụ thể đã chỉ ra." } ],
          "suggestedQuestions": [ "Câu hỏi gợi ý sâu về vấn đề nan giải nhất của cặp đôi này 1", "Câu hỏi 2", "Câu hỏi 3", "Câu hỏi 4", "Câu hỏi 5" ]
        }`;

        const now = new Date();
        const currentDateTime = now.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            weekday: 'long'
        });

        // Current Luck Cycle calculation
        const { getCurrentDaiVan } = require('../bazi/dayun');
        const currentYear = now.getFullYear();
        const age1 = currentYear - person1Ctx.solar.getYear() + 1;
        const age2 = currentYear - person2Ctx.solar.getYear() + 1;

        const dv1 = getCurrentDaiVan(person1Ctx.dai_van || [], age1);
        const dv2 = getCurrentDaiVan(person2Ctx.dai_van || [], age2);

        const relMapping = {
            'romance': 'Tình duyên / Hôn nhân',
            'friendship': 'Bạn bè',
            'parent_child': 'Cha mẹ - Con cái',
            'siblings': 'Anh chị em',
            'business': 'Đối tác kinh doanh',
            'colleague': 'Đồng nghiệp',
            'teacher_student': 'Thầy trò',
            'spiritual': 'Đạo hữu / Tâm linh',
            'rival': 'Đối thủ / Cạnh tranh',
            'boss_employee': 'Cấp trên - Cấp dưới'
        };
        const relationshipVN = relMapping[relationshipType] || relationshipType;

        const userPrompt = `Hãy phân tích độ tương hợp của mối quan hệ "${relationshipVN}" giữa hai người sau với sự đào sâu vào các chi tiết chuyên môn, chỉ ra các điểm xung đột cụ thể:
        
        THỜI ĐIỂM XEM (Hiện tại): ${currentDateTime}
        
        NGƯỜI 1 (Nam/Nữ: ${person1Ctx.isFemale ? 'Nữ' : 'Nam'}):
        - Bát Tự: ${person1Ctx.gans[0]} ${person1Ctx.zhis[0]} (Năm) | ${person1Ctx.gans[1]} ${person1Ctx.zhis[1]} (Tháng) | ${person1Ctx.gans[2]} ${person1Ctx.zhis[2]} (Ngày) | ${person1Ctx.gans[3]} ${person1Ctx.zhis[3]} (Giờ)
        - Nhật Chủ: ${person1Ctx.gans[2]} (Hành: ${person1Ctx.elements?.[person1Ctx.gans[2]] || ''})
        - Thập Thần: ${person1Ctx.ganShens?.join(', ')}
        - Nạp Âm: ${person1Ctx.nayin?.join(', ')}
        - Vòng Trường Sinh: ${person1Ctx.pillarStages?.join(', ')}
        - Ngũ Hành: Kim: ${person1Ctx.elements?.Kim || 0}, Mộc: ${person1Ctx.elements?.Moc || 0}, Thủy: ${person1Ctx.elements?.Thuy || 0}, Hỏa: ${person1Ctx.elements?.Hoa || 0}, Thổ: ${person1Ctx.elements?.Tho || 0}
        - Đại Vận hiện tại: ${dv1 ? `${dv1.can_chi} (${dv1.thap_than}) - ${dv1.luan_giai?.split('\n')[1] || ''}` : 'N/A'}
        
        NGƯỜI 2 (Nam/Nữ: ${person2Ctx.isFemale ? 'Nữ' : 'Nam'}):
        - Bát Tự: ${person2Ctx.gans[0]} ${person2Ctx.zhis[0]} (Năm) | ${person2Ctx.gans[1]} ${person2Ctx.zhis[1]} (Tháng) | ${person2Ctx.gans[2]} ${person2Ctx.zhis[2]} (Ngày) | ${person2Ctx.gans[3]} ${person2Ctx.zhis[3]} (Giờ)
        - Nhật Chủ: ${person2Ctx.gans[2]} (Hành: ${person2Ctx.elements?.[person2Ctx.gans[2]] || ''})
        - Thập Thần: ${person2Ctx.ganShens?.join(', ')}
        - Nạp Âm: ${person2Ctx.nayin?.join(', ')}
        - Vòng Trường Sinh: ${person2Ctx.pillarStages?.join(', ')}
        - Ngũ Hành: Kim: ${person2Ctx.elements?.Kim || 0}, Mộc: ${person2Ctx.elements?.Moc || 0}, Thủy: ${person2Ctx.elements?.Thuy || 0}, Hỏa: ${person2Ctx.elements?.Hoa || 0}, Thổ: ${person2Ctx.elements?.Tho || 0}
        - Đại Vận hiện tại: ${dv2 ? `${dv2.can_chi} (${dv2.thap_than}) - ${dv2.luan_giai?.split('\n')[1] || ''}` : 'N/A'}
        
        Yêu cầu: Viết bản luận giải thật chi tiết, sử dụng văn phong Bát Tự chuyên nghiệp (như một bậc thầy thực thụ), tập trung vào việc bóc tách các vấn đề thực tế giữa hai người. Trả về kết quả JSON chính xác.`;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(OPENROUTER_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'HTTP-Referer': 'https://huyencobattu.com',
                    'X-Title': 'BaZi Matching'
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    response_format: { type: "json_object" },
                    max_tokens: 2000,
                    temperature: 0.7
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;

            if (!content) throw new Error('Empty response from AI');

            // Use cleanAndParseJSON with validation
            try {
                const parsedResult = this.cleanAndParseJSON(content);
                console.log('[OpenRouter/Matching] Successfully parsed and validated JSON response');
                return parsedResult;
            } catch (jsonError) {
                console.error('[OpenRouter/Matching] JSON parsing failed:', jsonError.message);
                console.error('[OpenRouter/Matching] Returning fallback response');

                // Return a valid fallback structure instead of throwing
                return {
                    totalScore: 50,
                    assessment: {
                        level: 'neutral',
                        title: 'Cần phân tích thêm',
                        summary: 'Thầy đang gặp chút khó khăn trong việc phân tích chi tiết. Vui lòng thử lại hoặc liên hệ hỗ trợ.',
                        icon: '🔮'
                    },
                    breakdown: {
                        element: { score: 15, maxScore: 30, description: 'Chưa phân tích được chi tiết', quality: 'neutral' },
                        ganzhi: { score: 12, maxScore: 25, details: [], quality: 'neutral' },
                        shishen: { score: 12, maxScore: 25, details: [], quality: 'neutral' },
                        star: { score: 10, maxScore: 20, details: [], quality: 'neutral' }
                    },
                    aspects: [
                        { type: 'romance', icon: '💕', title: 'Tình Cảm', score: 50, description: 'Cần xem xét thêm' },
                        { type: 'communication', icon: '💬', title: 'Giao Tiếp', score: 50, description: 'Cần xem xét thêm' },
                        { type: 'finance', icon: '💰', title: 'Tài Chính', score: 50, description: 'Cần xem xét thêm' }
                    ],
                    advice: [
                        { type: 'neutral', text: 'Hãy kiên nhẫn và thử lại sau. Thầy sẽ cố gắng phân tích kỹ hơn cho con.' }
                    ],
                    suggestedQuestions: [
                        "Làm sao để cải thiện mối quan hệ này?",
                        "Có điều gì cần lưu ý trong thời gian tới?",
                        "Làm thế nào để hóa giải những xung khắc?"
                    ]
                };
            }
        } catch (error) {
            console.error('[OpenRouter/Matching] Fatal error:', error);
            // Return fallback instead of throwing to prevent 500 errors
            return {
                totalScore: 50,
                assessment: {
                    level: 'neutral',
                    title: 'Lỗi kết nối',
                    summary: 'Thầy đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.',
                    icon: '⚠️'
                },
                breakdown: {
                    element: { score: 15, maxScore: 30, description: 'Không thể phân tích', quality: 'neutral' },
                    ganzhi: { score: 12, maxScore: 25, details: [], quality: 'neutral' },
                    shishen: { score: 12, maxScore: 25, details: [], quality: 'neutral' },
                    star: { score: 10, maxScore: 20, details: [], quality: 'neutral' }
                },
                aspects: [],
                advice: [
                    { type: 'warning', text: 'Hệ thống đang gặp sự cố. Linh thạch của bạn sẽ được hoàn lại.' }
                ],
                suggestedQuestions: []
            };
        }
    }

    /**
     * Clean and parse JSON response from LLM
     * Handles markdown code blocks and validates structure
     * @param {string} content - Raw content from LLM
     * @returns {Object} Parsed and validated JSON object
     * @throws {Error} If JSON is invalid or missing required fields
     */
    cleanAndParseJSON(content) {
        if (!content || typeof content !== 'string') {
            throw new Error('Empty or invalid content');
        }

        // Remove markdown code blocks (```json ... ``` or ``` ... ```)
        let cleaned = content.trim();
        const codeBlockMatch = cleaned.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```$/m);
        if (codeBlockMatch) {
            cleaned = codeBlockMatch[1].trim();
            console.log('[JSON Cleaner] Removed markdown code block wrapper');
        }

        // Try to parse JSON
        let parsed;
        try {
            parsed = JSON.parse(cleaned);
        } catch (parseError) {
            console.error('[JSON Parse Error]', parseError.message);
            console.error('[Raw Content Preview]', content.substring(0, 500));
            throw new Error(`Invalid JSON from LLM: ${parseError.message}`);
        }

        // Validate required fields for matching response
        if (parsed.totalScore === undefined && parsed.totalScore !== 0) {
            console.warn('[JSON Validation] Missing totalScore, using default');
            parsed.totalScore = 50;
        }

        if (!parsed.assessment) {
            console.warn('[JSON Validation] Missing assessment, using default');
            parsed.assessment = {
                level: 'neutral',
                title: 'Cần xem xét thêm',
                summary: 'Thông tin chưa đầy đủ để đánh giá.',
                icon: '🔮'
            };
        }

        if (!parsed.breakdown) {
            console.warn('[JSON Validation] Missing breakdown, using default');
            parsed.breakdown = {};
        }

        if (!Array.isArray(parsed.aspects)) {
            console.warn('[JSON Validation] Missing or invalid aspects, using default');
            parsed.aspects = [];
        }

        if (!Array.isArray(parsed.advice)) {
            console.warn('[JSON Validation] Missing or invalid advice, using default');
            parsed.advice = [];
        }

        if (!Array.isArray(parsed.suggestedQuestions)) {
            console.warn('[JSON Validation] Missing or invalid suggestedQuestions, using default');
            parsed.suggestedQuestions = [
                "Làm sao để cải thiện mối quan hệ này?",
                "Có điều gì cần lưu ý trong thời gian tới?",
                "Làm thế nào để hóa giải những xung khắc?"
            ];
        }

        console.log('[JSON Validation] Successfully validated matching response');
        return parsed;
    }

    /**
     * Fallback for comprehensive interpretation
     */
    getComprehensiveFallback(personaId) {
        if (personaId === 'menh_meo') {
            return `🐱 Ối dồi ôi, server đang bận lắm nè con ơi!

Thầy Mèo đang chill một chút, con thử lại sau nha! 😸

Nhưng nhìn sơ qua lá số thì Thầy thấy con cũng vibe lắm đó, năng lượng dồi dào, tiềm năng phát triển cực mạnh. Chờ tí Thầy comeback là Thầy sẽ flex cho con một bản luận giải đỉnh của chóp!

✨ Tips nhanh: Hãy tin vào bản thân và đừng ngại thử thách mới nhé con!`;
        }

        return `Kính thưa Mệnh chủ,

Hệ thống đang gặp một chút trở ngại trong việc kết nối với nguồn tri thức. Xin Mệnh chủ vui lòng thử lại sau ít phút.

Tuy nhiên, dựa trên những gì Thầy đã nhìn thấy từ Tứ Trụ của con, đây là một lá số có nhiều tiềm năng phát triển. Ngũ hành trong mệnh cách khá cân bằng, cho thấy con có khả năng thích ứng tốt với môi trường.

Xin con hãy kiên nhẫn, Thầy sẽ sớm có bản luận giải đầy đủ cho con.

Thầy Huyền Cơ kính bút.`;
    }
}

module.exports = new OpenRouterService();
