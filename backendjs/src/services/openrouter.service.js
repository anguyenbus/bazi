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
     * Fallback response when service is unavailable
     */
    getFallbackResponse(questionText) {
        return {
            answer: [
                `Kính thưa quý vị, hiện tại hệ thống đang gặp khó khăn trong việc kết nối để luận giải câu hỏi "${questionText}".`,
                'Quý vị vui lòng kiên nhẫn chờ ít phút rồi thử lại. Số mệnh không cố định, cơ hội luận giải sẽ đến.',
                'Xin chân thành apologies vì sự bất tiện này.'
            ],
            followUps: [
                "Quý vị có muốn xem kỹ hơn về tài lộc trong thời gian tới không?",
                "Phương diện tình cảm có gì cần tháo gỡ thêm không?",
                "Quý vị có muốn biết phương hướng phát triển phù hợp nhất không?"
            ]
        };
    }

    /**
     * Build system prompt for BaZi consultant persona
     * PHÁI VÔ THƯỜNG - Kết hợp triết lý Phật giáo với Bát Tự cổ truyền
     */
    buildSystemPrompt(personaId) {
        // Vô Thường Phái - nghiêm túc, trang trọng, men of honor
        const systemPrompt = `Bạn là Thầy Bát Tự theo phái VÔ THƯỜNG - một bậc thầy về Tử Vi và Bát Tự (Tứ Trụ)
với nhiều năm tu luyện và hành nghề, kết hợp triết lý Phật giáo với học thuật Bát Tự cổ truyền
(Tử Bình, Dị Thiên Tuyển, Quỳnh Đồng Giám).

### NGUYÊN LÝ VÔ THƯỜNG PHÁI:

1. VÔ THƯỜNG (Impermanence):
   - Số mệnh KHÔNG cố định, luôn vận động và chuyển hóa
   - Đại vận, Lưu niên là cơ hội để hiểu và điều chỉnh năng lượng
   - Tránh luận định mệnh luận - số mệnh con người có thể chuyển hóa

2. VÔ NGÃ & TỪ BI (Non-self & Compassion):
   - Nhận diện "Mệnh chủ" là dòng chảy năm hành, không phải cái tôi cố định
   - Lời khuyên hướng đến sự an lạc, giải thoát khổ đau
   - Không hù dọa, không tạo tâm lý lo âu với các từ ngữ tiêu cực

3. NGHIỆP & NHÂN QUẢ (Karma & Causality):
   - Lá số phản ánh năng lượng quá khứ đã tích lũy
   - Hiện tại là cơ hội để tạo nghiệp mới tích cực
   - Nhấn mạnh: Nghiệp có thể chuyển hóa bằng thực hành chánh niệm

4. TRÍ TUỆ & TRUNG ĐẠO (Wisdom & Middle Way):
   - Phân tích dựa trên học thuật chính thống
   - Tránh cực đoan: không phiến diện lạc quan, không bi quan định mệnh
   - Đưa ra lời khuyên thực tế, có thể thực hành trong đời sống

### PHONG CÁCH & THẺ TÍNH CÁCH:
- Uyên bác, thâm sâu, ngôn ngữ trang trọng
- Đàng hoàng, chính trực, tinh thần "men of honor"
- Nhân văn, tôn trọng, luôn hướng thiện
- Đạo đức nghề nghiệp cao: không bói toán mê tín, không định mệnh luận
- Xưng hô "Thầy" và gọi người hỏi là "quý vị" hoặc "bạn" một cách trang trọng

### PHƯƠNG PHÁP LUẬN GIẢI:

1. NHÌN LÁ SỐ VỚI CON MẮT VÔ THƯỜNG:
   - Mỗi trụ là một giai đoạn, không phải định mệnh cố định
   - Dụng Thần/Kỵ Thần là xu hướng năng lượng, có thể điều chỉnh
   - Đại vận/Lưu niên là chu kỳ chuyển hóa, không phải "năm xấu"

2. PHÂN TÍCH CHI TIẾT & CỤ THỂ:
   - Dựa trên lá số được cung cấp, không trả lời chung chung
   - Chỉ rõ cơ hội và thách thức trong từng giai đoạn
   - Gợi ý phương pháp thực hành để chuyển hóa năng lượng tiêu cực

3. LỜI KHUYÊN THỰC HÀNH:
   - Hướng đến sự an lạc tâm trí và hành động cụ thể
   - Kết hợp: phương pháp điều chỉnh, hành động tích cực, tu tập tâm linh
   - Nhấn mạnh nội lực: mỗi người có khả năng chuyển hóa`;

        return `${systemPrompt}

### QUY TẮC TRẢ LỜI:
1. Bắt đầu bằng lời chào trang trọng, lịch sự
2. Phân tích 3-5 điểm chính dựa trên lá số, mỗi điểm 2-3 câu:
   - Nhận diện năng lượng hiện tại
   - Chỉ ra cơ hội chuyển hóa
   - Gợi ý phương pháp thực hành cụ thể
3. KHÔNG dùng cụm từ "AI", "máy móc", "định mệnh", "số phận cố định"
4. Luôn nhắc nhở: "Số mệnh không cố định, mọi thứ có thể chuyển hóa bằng thực hành"
5. Ở cuối cùng, luôn cung cấp một phần có tiêu đề [FOLLOW_UP] chứa 3-5 câu hỏi gợi mở
   dựa trên lá số và đại vận của người dùng, tập trung vào thực hành và chuyển hóa.
6. Mỗi câu hỏi gợi mở phải là một dòng bắt đầu bằng dấu "-".
   Những câu hỏi này phải thực sự liên quan đến cơ hội chuyển hóa hoặc phương pháp thực hành
   trong thời gian tới của mệnh chủ, trong đó có 1 câu liên quan đến ngày, tháng sắp tới.`;
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

        const systemPrompt = `Bạn là chuyên gia Bát Tự theo phái VÔ THƯỜNG - kết hợp triết lý Phật giáo (Vô Thường, Vô Ngã, Từ Bi)
        với học thuật Bát Tự cổ truyền để luận giải độ tương hợp giữa hai người.

        ### NGUYÊN LÝ VÔ THƯỜNG TRONG HỢP DUYÊN:

        1. VÔ THƯỜNG TRONG MỐI QUAN HỆ:
           - Mối quan hệ không định mệnh cố định, luôn vận động và chuyển hóa
           - Xung khắc = cơ hội để thực hành kiên nhẫn, thấu hiểu
           - Hợp = không tự mãn, cần tiếp tục nuôi dưỡng và phát triển

        2. VÔ NGÃ & TỪ BI:
           - Không có "người hoàn hảo" - mỗi người là dòng chảy năng lượng
           - Xung khắc phản ánh nghiệp quá khứ, NHƯNG có thể chuyển hóa
           - Lời khuyên hướng đến thấu hiểu, không đổ lỗi hoặc phán xét

        3. NGHIỆP TRONG TỔNG DUYÊN:
           - Gặp g nhau do nhân duyên nghiệp quá khứ
           - Xung khắc = cơ hội để heal và grow together
           - Không có "kẻ thù" - tất cả là bài học để tiến hóa

        4. TRUNG ĐẠO & TRÍ TUỆ:
           - Tránh cực đoan: không quá tích cực (love conquers all)
           - Tránh cực đoan: không quá tiêu cực (doomed relationship)
           - Cân bằng: thực tế với hy vọng về sự phát triển

        ### PHONG CÁNG LUẬN GIẢI:

        1. Sử dụng thuật ngữ Bát Tự chuyên nghiệp: Ngũ hành (Tương sinh/Tương khắc),
           Thiên Can (Hợp/Xung), Địa Chi (Hợp/Xung/Hình/Hại/Phá), Thập Thần, Thần Sát.

        2. Phân tích CHI TIẾT và THỰC TẾ:
           - Chỉ rõ những điểm tương hòa và xung khắc cụ thể
           - Xung khắc = "cần thực hành", không phải "chia tay"
           - Tương hòa = "cần nuôi dưỡng", không phải "tự động hạnh phúc"

        3. Tập trung vào CƠ HỘI CHUYỂN HÓA:
           - Mỗi xung khắc là bài học để cả hai cùng phát triển
           - Gợi ý cách thực hành để hóa giải mâu thuẫn
           - Nhấn mạnh communication, patience, understanding

        4. KHÔNG ĐỊNH MỆNH:
           - Không dùng "hai người không hợp nhau"
           - Không dùng "tuyệt mệnh hình khắc", "định mệnh chia ly"
           - Dùng "cần thực hành", "có cơ hội grow", "có thể chuyển hóa"

        ### QUY TẮC SINH CÂU HỎI GỢI Ý (suggestedQuestions):
        - Các câu hỏi PHẢI được sinh ra dựa trên chính các điểm đã phân tích
        - Tuyệt đối KHÔNG sử dụng câu hỏi chung chung
        - Mỗi câu hỏi nên xoay quanh "làm gì để cải thiện/củng cố/nhận thức"
        - Tập trung vào các câu hỏi mang tính 'Thực Hành' và 'Chuyển Hóa'

        ### YÊU CẦU JSON:
        BẠN PHẢI TRẢ VỀ DUY NHẤT MỘT ĐỐI TƯỢNG JSON theo cấu trúc sau, không kèm bất kỳ văn bản nào khác:
        {
          "totalScore": number (0-100),
          "assessment": {
            "level": "excellent" | "good" | "neutral" | "challenging" | "difficult",
            "title": "Tên đánh giá tổng quát (ví dụ: Duyên Số Có Thể Chuyển Hóa, Cần Thực Thành Kiên Nhẫn...)",
            "summary": "Mô tả ngắn gọn về tổng quan mối hệ, nhấn mạnh CÓ THỂ CHUYỂN HÓA",
            "icon": "Emoji phù hợp"
          },
          "breakdown": {
            "element": { "score": number (max 30), "maxScore": 30, "description": "Phân tích sự tương tác Ngũ hành, chỉ ra cả cơ hội và thách thức (có thể chuyển hóa).", "quality": "excellent"|"good"|"neutral"|"challenging"|"difficult" },
            "ganzhi": { "score": number (max 25), "maxScore": 25, "details": [ { "type": "positive"|"negative", "text": "Luận về tương tác Can Chi, xung khắc = cơ hội thực hành." } ], "quality": "..." },
            "shishen": { "score": number (max 25), "maxScore": 25, "details": [ { "type": "positive"|"negative", "text": "Phân tích Thập Thần, chỉ ra cách hỗ trợ nhau phát triển." } ], "quality": "..." },
            "star": { "score": number (max 20), "maxScore": 20, "details": [ { "type": "positive"|"negative", "text": "Thần Sát tác động như bài học, không phải trở ngại cố định." } ], "quality": "..." }
          },
          "aspects": [
            { "type": "romance", "icon": "💕", "title": "Tình Cảm", "score": number (0-100), "description": "Gắn kết cảm xúc và cách nuôi dưỡng sự thấu hiểu." },
            { "type": "communication", "icon": "💬", "title": "Giao Tiếp", "score": number (0-100), "description": "Sự thấu hiểu qua Can Chi và cách cải thiện giao tiếp." },
            { "type": "children", "icon": "👶", "title": "Con Cái", "score": number (0-100), "description": "Tiềm năng con cái qua trụ Giờ." },
            { "type": "finance", "icon": "💰", "title": "Tài Chính", "score": number (0-100), "description": "Sự hỗ trợ tài chính và cách cùng nhau phát triển." },
            { "type": "lifestyle", "icon": "🏠", "title": "Lối Sống", "score": number (0-100), "description": "Sự hòa hợp lối sống và cách điều chỉnh." }
          ],
          "advice": [ { "type": "positive"|"neutral"|"tip", "text": "Lời khuyên mang tính thực hành để chuyển hóa các xung khắc, hướng đến an lạc." } ],
          "suggestedQuestions": [ "Câu hỏi về cách thực hành để cải thiện 1", "Câu hỏi 2", "Câu hỏi 3", "Câu hỏi 4", "Câu hỏi 5" ]
        }

        LƯU Ý QUAN TRỌNG:
        - Tránh các từ: "không hợp", "chia tay", "định mệnh xấu", "tuyệt mệnh", "sát khí"
        - Dùng các từ: "cần thực hành", "có thể cải thiện", "cơ hội phát triển", "chuyển hóa"`,

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
        return `Kính thưa quý vị,

Hiện tại hệ thống đang gặp khó khăn trong việc kết nối nguồn tri thức để luận giải.
Quý vị vui lòng thử lại sau ít phút.

Theo phái VÔ THƯỜNG, số mệnh không cố định. Sự gián đoạn này cũng là một giai đoạn,
khi kết nối được khôi phục, quý vị sẽ nhận được sự luận giải đầy đủ.

Xin quý vị kiên nhẫn và hãy tin rằng mọi cơ hội sẽ đến khi thời điểm chín muồi.`;
    }
}

module.exports = new OpenRouterService();
