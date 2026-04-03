/**
 * Service xử lý tính năng Xin Quẻ (Divination)
 * Dựa hoàn toàn vào Bát Tự - KHÔNG có yếu tố ngẫu nhiên
 * Sử dụng LLM cho luận giải chi tiết + tính phí 10 linh thạch
 */

const { calculateHexagram, ELEMENTS } = require('../bazi/que_data/mapping');
const { HEXAGRAMS } = require('../bazi/que_data/gua_64');
const { getFullInterpretation, generateOfflineAnalysis } = require('../bazi/que_data/interpretations');
const database = require('./database.service');
const aiService = require('./ai.service');
const dateUtils = require('../utils/dateUtils');

const QUE_CREDIT_COST = 10; // 10 linh thạch mỗi lần xin quẻ

class QueService {

    async generateDailyQue(baziContext, userInfo, dateStr, contextId, topic = 'Chung', forceNew = false) {
        return this._generateQue(baziContext, userInfo, 'daily', dateStr, contextId, topic, forceNew);
    }

    async generateMonthlyQue(baziContext, userInfo, monthStr, contextId, topic = 'Chung', forceNew = false) {
        return this._generateQue(baziContext, userInfo, 'monthly', monthStr, contextId, topic, forceNew);
    }

    async generateYearlyQue(baziContext, userInfo, yearStr, contextId, topic = 'Chung', forceNew = false) {
        return this._generateQue(baziContext, userInfo, 'yearly', yearStr, contextId, topic, forceNew);
    }

    async _generateQue(baziContext, userInfo, type, periodKey, contextId, topic = 'Chung', forceNew = false) {
        const userId = userInfo.userId || null;
        const customerId = userInfo.customerId || null;

        // 1. Check history first - FREE if already requested (Include topic in check logic if needed, but for now allow free re-view of same day/type)
        // Note: Currently history check doesn't include topic. If user changes topic, they might want a new hexagram.
        // To allow different hexagrams for different topics, we should include topic in the lookup or contextid?
        // Let's rely on the fact that existing check uses contextId + type + periodKey.
        // If we want different results for different topics, we should append topic to periodKey or add topic filter?
        // Actually, let's append topic to contextId or periodKey for unique storage if topic != 'Chung'

        const effectiveContextId = topic === 'Chung' ? contextId : `${contextId}_${topic}`;

        // Skip cache if forceNew is true (re-roll)
        if (!forceNew) {
            const existing = await database.getQue(userId, customerId, effectiveContextId, type, periodKey);
            if (existing) {
                return {
                    ...existing.gua_data,
                    is_history: true,
                    user_note: existing.user_note,
                    is_verified: existing.is_verified
                };
            }
        }

        // 2. Check and deduct credits - 10 linh thạch
        if (userId) {
            const user = await database.get('SELECT credits FROM users WHERE id = ?', [userId]);
            if (!user || user.credits < QUE_CREDIT_COST) {
                throw new Error(`Không đủ linh thạch. Cần ${QUE_CREDIT_COST} linh thạch để xin quẻ.`);
            }
            await database.deductCredits(userId, QUE_CREDIT_COST, `Xin quẻ ${type}: ${periodKey}`);
        }

        // 3. Lấy Can Chi thời gian từ lunar-javascript
        const { Solar } = require('lunar-javascript');
        let targetDate;

        if (type === 'daily') {
            targetDate = new Date(periodKey);
        } else if (type === 'monthly') {
            const [year, month] = periodKey.split('-');
            targetDate = new Date(parseInt(year), parseInt(month) - 1, 15);
        } else {
            targetDate = new Date(parseInt(periodKey), 5, 15);
        }

        const solar = Solar.fromDate(targetDate);
        const lunar = solar.getLunar();

        let timeInfo = { gan: '', zhi: '' };

        if (type === 'daily') {
            const dayGanZhi = lunar.getDayInGanZhi();
            timeInfo = { gan: dayGanZhi.charAt(0), zhi: dayGanZhi.charAt(1) };
        } else if (type === 'monthly') {
            const monthGanZhi = lunar.getMonthInGanZhi();
            timeInfo = { gan: monthGanZhi.charAt(0), zhi: monthGanZhi.charAt(1) };
        } else {
            const yearGanZhi = lunar.getYearInGanZhi();
            timeInfo = { gan: yearGanZhi.charAt(0), zhi: yearGanZhi.charAt(1) };
        }

        // 4. Tính quẻ (DETERMINISTIC)
        const guaResult = calculateHexagram(baziContext, timeInfo, type, topic);
        const hexagramDef = HEXAGRAMS[guaResult.hexagramId];

        // 5. Lấy giải nghĩa cơ bản
        const interpretation = getFullInterpretation(
            guaResult.hexagramId,
            guaResult.interaction,
            type
        );

        // 6. Xác định quality text (New Point Scale)
        let qualityText = 'Bình';
        const score = guaResult.qualityScore;
        if (score >= 6) qualityText = 'Đại Cát';
        else if (score >= 3) qualityText = 'Tiểu Cát';
        else if (score >= 0) qualityText = 'Bình';
        else if (score >= -3) qualityText = 'Tiểu Hung';
        else qualityText = 'Hung';

        // 7. LLM Luận giải chi tiết
        let llmInterpretation = "";
        try {
            llmInterpretation = await this._generateLLMInterpretation(
                baziContext, hexagramDef, guaResult, type, periodKey, solar, lunar, topic
            );
        } catch (e) {
            console.error('[QueService] LLM error:', e.message);
        }

        // If LLM returned nothing or failed, use rich offline fallback
        if (!llmInterpretation) {
            console.log('[QueService] Using offline fallback for hexagram', guaResult.hexagramId);
            llmInterpretation = generateOfflineAnalysis(
                guaResult.hexagramId,
                hexagramDef,
                topic,
                guaResult.interaction,
                type,
                qualityText
            );
        }

        // 8. Build full result
        let displayPeriod = periodKey;
        if (type === 'daily') {
            displayPeriod = `Ngày ${solar.getDay()}/${solar.getMonth()}/${solar.getYear()}`;
        } else if (type === 'monthly') {
            displayPeriod = `Tháng ${solar.getMonth()}/${solar.getYear()} (Âm lịch: Tháng ${lunar.getMonth() < 10 ? '0' + lunar.getMonth() : lunar.getMonth()} - ${lunar.getMonthInGanZhi()} ${lunar.getYearInGanZhi()})`;
        } else {
            displayPeriod = `Năm ${periodKey}`;
        }

        // Get static interpretation data for share card
        const staticInterpretation = getFullInterpretation(guaResult.hexagramId, guaResult.interaction);

        const fullResult = {
            hexagramId: guaResult.hexagramId,
            name: hexagramDef.name,
            symbol: hexagramDef.symbol,
            meaning: hexagramDef.meaning,
            quality: qualityText,
            qualityScore: guaResult.qualityScore,

            upperTrigram: guaResult.upperTrigram,
            lowerTrigram: guaResult.lowerTrigram,

            interaction: {
                dayMaster: guaResult.interaction.dayMaster,
                dayMasterElement: ELEMENTS[guaResult.interaction.dayMaster],
                timeGan: guaResult.interaction.timeGan,
                timeZhi: guaResult.interaction.timeZhi,
                timeElement: ELEMENTS[guaResult.interaction.timeGan],
                relation: guaResult.interaction.ganInteraction.relation,
                relationType: guaResult.interaction.ganInteraction.relationType,
                activatedShiShen: guaResult.interaction.activatedShiShen
            },

            // Static interpretation for share card
            interpretation: {
                overview: staticInterpretation.overview,
                advice: staticInterpretation.advice,
                aspects: staticInterpretation.aspects
            },

            // 100% AI Analysis
            ai_analysis: llmInterpretation,

            period: periodKey,
            displayPeriod: displayPeriod,
            type: type,
            topic: topic,
            credits_used: QUE_CREDIT_COST,
            created_at: dateUtils.getCurrentVNTime()
        };

        // 8.5 Ensure customer exists for history linking
        let resolvedCustomerId = customerId;
        if (!resolvedCustomerId && baziContext.thong_tin_co_ban) {
            try {
                resolvedCustomerId = await database.findOrCreateCustomer({
                    name: baziContext.thong_tin_co_ban.ten || 'Mệnh chủ',
                    year: baziContext.thong_tin_co_ban.nam_sinh,
                    month: baziContext.thong_tin_co_ban.thang_sinh,
                    day: baziContext.thong_tin_co_ban.ngay_sinh,
                    hour: baziContext.thong_tin_co_ban.gio_sinh || 12,
                    minute: baziContext.thong_tin_co_ban.phut_sinh || 0,
                    gender: baziContext.thong_tin_co_ban.gioi_tinh || 'Nam',
                    calendar: 'solar'
                });
            } catch (err) {
                console.error('[QueService] Failed to resolve customer:', err.message);
            }
        }

        // 9. Save to History (Unified storage format - Consultations Table Only)
        try {
            const paragraphs = llmInterpretation.split('\n\n').filter(p => p.trim());

            // Map baziContext elements to person1 structure expected by History detail
            const person1Data = {
                name: baziContext.thong_tin_co_ban?.ten || 'Mệnh chủ',
                gender: baziContext.thong_tin_co_ban?.gioi_tinh || 'Nam',
                year: baziContext.thong_tin_co_ban?.nam_sinh,
                month: baziContext.thong_tin_co_ban?.thang_sinh,
                day: baziContext.thong_tin_co_ban?.ngay_sinh,
                chart: {
                    pillars: {
                        year: { gan: baziContext.chi_tiet_tru?.[0]?.can, zhi: baziContext.chi_tiet_tru?.[0]?.chi },
                        month: { gan: baziContext.chi_tiet_tru?.[1]?.can, zhi: baziContext.chi_tiet_tru?.[1]?.chi },
                        day: { gan: baziContext.chi_tiet_tru?.[2]?.can, zhi: baziContext.chi_tiet_tru?.[2]?.chi },
                        hour: { gan: baziContext.chi_tiet_tru?.[3]?.can, zhi: baziContext.chi_tiet_tru?.[3]?.chi }
                    }
                }
            };

            // Prepare gua_data for metadata (keep full result but exclude large text to avoid duplication)
            const guaDataForMeta = { ...fullResult };
            delete guaDataForMeta.ai_analysis;

            await database.saveConsultation(
                resolvedCustomerId,
                'xin_que',                      // theme_id
                type,                           // question_id (daily/monthly/yearly)
                `Xin quẻ ${topic !== 'Chung' ? topic : ''} ${type === 'daily' ? 'Ngày' : type === 'monthly' ? 'Tháng' : 'Năm'} - ${displayPeriod}`,
                paragraphs,                     // answer
                true,                           // use_ai
                QUE_CREDIT_COST,                // credits_used
                userId,
                'huyen_co',                     // persona
                [],                             // follow_ups
                {
                    person1: person1Data,
                    metadata: {
                        isQue: true,
                        queType: type,
                        topic: topic,
                        periodKey: periodKey,
                        contextId: effectiveContextId,
                        guaName: hexagramDef.name,
                        guaNumber: guaResult.hexagramId,
                        quality: qualityText,
                        symbol: hexagramDef.symbol,
                        gua_data: guaDataForMeta
                    }
                }
            );
        } catch (e) {
            console.error('[QueService] Error saving unified history:', e.message);
        }


        return fullResult;
    }

    /**
     * Generate LLM interpretation for the hexagram
     */
    /**
     * Generate 100% AI analysis for the hexagram
     */
    async _generateLLMInterpretation(baziContext, hexagramDef, guaResult, type, periodKey, solar, lunar, topic = 'Chung') {
        const periodLabel = type === 'daily' ? 'NGÀY' : type === 'monthly' ? 'THÁNG' : 'NĂM';
        const topicLabel = topic !== 'Chung' ? `về chủ đề ${topic.toUpperCase()}` : '';

        // Prepare Bazi Data for Prompt
        const dm = baziContext.thong_tin_co_ban?.nhap_chu || baziContext.phan_tich?.kinh_dien?.nhat_chu?.can || guaResult.interaction.dayMaster;
        const dmEle = ELEMENTS[dm];
        const dungThan = baziContext.phan_tich?.can_bang_ngu_hanh?.dung_than?.ngu_hanh || [];
        const kyThan = baziContext.phan_tich?.can_bang_ngu_hanh?.ky_than?.ngu_hanh || [];
        const timeElement = ELEMENTS[guaResult.interaction.timeGan];
        const periodYang = ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(guaResult.interaction.timeGan);

        // Age & Gender Personalization
        const age = baziContext.thong_tin_co_ban?.tuoi || 'không rõ';
        const gender = baziContext.thong_tin_co_ban?.gioi_tinh || 'Nam';
        const lifeStage = baziContext.thong_tin_co_ban?.giai_doan_doi || 'Bình thường';

        const prompt = `Bạn là bậc thầy ẩn sĩ "Huyền Cơ", chuyên gia tối cao về Kinh Dịch và Bát Tự. 
Hãy thực hiện một bài LUẬN GIẢI CHI TIẾT quẻ ${periodLabel} ${topicLabel} cho mệnh chủ dựa trên sự tương tác giữa Mệnh (Lá số Bát Tự) và Thời (Năng lượng hiện tại).

### THÔNG TIN ĐẦU VÀO:

**1. Trục Mệnh (Cố định):**
- Nhật Chủ: ${dm} (${dmEle})
- Giới tính: ${gender} | Tuổi: ${age} (${lifeStage})
- Thập thần kích hoạt: ${guaResult.interaction.activatedShiShen}
- Dụng Thần: ${dungThan.join(', ')}
- Kỵ Thần: ${kyThan.join(', ')}

**2. Trục Thời (Năng lượng ${periodLabel}):**
- Dương lịch: ${solar.toYmd()}
- Âm lịch: ${lunar.getMonth()}/${lunar.getDay()} (${lunar.getMonthInGanZhi()} ${lunar.getDayInGanZhi()})
- Can Chi ${periodLabel}: ${guaResult.interaction.timeGan}${guaResult.interaction.timeZhi}
- Ngũ hành chủ khí: ${timeElement}
- Âm/Dương: ${periodYang ? 'Dương' : 'Âm'}

**3. Trục Tương Tác (Sinh quẻ):**
- Quẻ: ${hexagramDef.name} (${hexagramDef.symbol})
- Tính chất: ${guaResult.qualityScore >= 50 ? 'Cát/Trung' : 'Cần cẩn trọng/Hung'}
- Quan hệ Can Chi: ${guaResult.interaction.ganInteraction.relation}

### YÊU CẦU CẤU TRÚC BÀI LUẬN (TUÂN THỦ 100%):

**I. Thông tin thời vận**
- Phân tích Can Chi của ${periodLabel} tương ứng.
- Ngũ hành chủ khí và tính chất Âm/Dương (${periodYang ? 'Dương' : 'Âm'}) của thời điểm này.

**II. Quẻ chính**
- Tên quẻ và hình tượng quẻ (tượng quái).
- Tính chất tổng quát: Cát – Trung – hay Cần cẩn trọng (Dựa trên điểm vận thế quẻ).

**III. Giải quẻ theo mệnh (CÁ NHÂN HÓA THEO CHỦ ĐỀ: ${topic.toUpperCase()})**
- Tổng quan năng lượng bao trùm.
- Luận giải SÂU SẮC và CHI TIẾT về chủ đề **${topic.toUpperCase()}** (Đây là trọng tâm chính):
  + Phân tích cơ hội và thách thức cụ thể trong ${periodLabel}.
  + Dự báo diễn biến.
- Nếu chủ đề là "Chung", hãy luận giải 4 phương diện chính (Công việc, Tài chính, Tình cảm, Sức khỏe).
- Lời khuyên hành động cốt lõi để đạt được kết quả tốt nhất về ${topic}.

**IV. Cá nhân hóa Bát Tự**
- Tác động cụ thể của quẻ lên Nhật chủ ${dm}. Phân tích xem quẻ có kích hoạt Dụng thần hay đánh vào Kỵ thần không.
- Sự tương tác với Dụng thần (${dungThan.join('/')}) hoặc Kỵ thần (${kyThan.join('/')}).
- Luận giải: ${type === 'daily' ? 'Việc NÊN LÀM/NÊN TRÁNH cụ thể trong ngày.' : type === 'monthly' ? 'Chiến lược hành động và tháng này là thuận hay cần tiết chế.' : 'Năm này là năm mở rộng hay thu mình, bài học lớn nhất của năm.'}

### QUY TẮC VĂN PHONG:
1. Viết liền mạch, uyên bác, trang trọng nhưng sâu sắc (phong cách Thầy Huyền Cơ).
2. XƯNG HÔ PHÙ HỢP: Gọi người dùng là "con" hoặc "mệnh chủ". Có thể dùng "Quý ông/Quý bà" khi cần sự trang trọng tuyệt đối.
3. TRÌNH BÀY THEO CHIỀU DỌC, không dùng tab/cột. Sử dụng tiêu đề Markdown clear.
4. KHÔNG dùng chữ Hán gốc, luôn dùng tên gọi tiếng Việt (Giáp, Ất, Tý, Sửu...). 
5. KHÔNG bao bọc trong code block (\`\`\`).
6. Tuyệt đối KHÔNG nhắc đến AI, Máy tính hay "luật lệ prompt".`;

        try {
            const response = await aiService.generateCompletion(prompt, 'huyen_co');
            return response;
        } catch (e) {
            console.error('[LLM] Failed:', e.message);
            return "Hiện tại năng lượng kết nối đang yếu, Thầy chưa thể đưa ra bản luận giải chi tiết ngay lúc này. Con vui lòng thử lại sau.";
        }
    }

    async getHistory(userId, page = 1, limit = 10) {
        return database.getQueHistory(userId, page, limit);
    }

    async updateNote(id, note, isVerified) {
        return database.updateQueNote(id, note, isVerified);
    }
}

module.exports = new QueService();
