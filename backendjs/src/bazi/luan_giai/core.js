/**
 * Module Luận Giải (Interpretation) - Core Processor
 * Synthesizes all analysis modules into a user-friendly report.
 */

const { STEM_DATA } = require('./data/stems');
const { BRANCH_DATA } = require('./data/branches');
const { THAP_THAN_DEEP } = require('./data/thap_than_deep');
const { CAREER_ADVICE_BY_ELEMENT, RELATIONSHIP_ADVICE, HEALTH_ADVICE_BY_STEM, SOCIAL_ADVICE, FENGSHUI_ADVICE_BY_ELEMENT, ELEMENT_COLORS, ELEMENT_DIRECTIONS } = require('./data/advice');
const { CAREER_BY_ELEMENT, CAREER_BY_DEITY, CAREER_BY_AGE_GENDER } = require('./data/career_detail');
const { FATHER_RELATIONSHIPS, MOTHER_RELATIONSHIPS, SPOUSE_RELATIONSHIPS, CHILDREN_RELATIONSHIPS, SIBLING_RELATIONSHIPS, LOVE_RELATIONSHIPS } = require('./data/relationships');
const { HEALTH_BY_ELEMENT, HEALTH_BY_AGE_GENDER, HEALTH_BY_SEASON } = require('./data/health_detail');
const { SHENSHA_DATA } = require('./data/shensha_detail');
const { PATTERN_DATA } = require('./data/patterns');
const { NAYIN_DATA } = require('./data/nayin');
const { LIFE_EVENTS_BY_AGE, LIFE_EVENTS_BY_ELEMENT } = require('./data/life_events');
const { TIEN_VAN_VUONG, TRUNG_VAN_VUONG, HAU_VAN_VUONG } = require('./data/fortunes');
const phanTich = require('../phan_tich');
const shishen = require('../shishen');
const ganzhi = require('../ganzhi');
const { createSeededRandom } = require('../../utils/random');

function _extractKeyLines(results, keywords = ['•', '**', ':']) {
    if (!results || !Array.isArray(results)) return [];
    return results.filter(line =>
        line &&
        !line.startsWith('==') &&
        !line.startsWith('[') &&
        keywords.some(kw => line.includes(kw))
    ).map(line => line.replace(/^•\s*/, '').trim());
}

/**
 * Generate comprehensive analysis report
 */
function analyzeLuanGiai(ctx) {
    const sections = [];
    const me = ctx.me;
    const meElement = ganzhi.ganToElement(me);
    const monthZhi = ctx.zhis[1];
    const dayZhi = ctx.zhis[2];
    const isFemale = ctx.isFemale;
    const genderKey = isFemale ? 'female' : 'male';
    const genderStr = isFemale ? 'nữ mệnh' : 'nam mệnh';

    // 1. TỔNG QUAN LÁ SỐ
    sections.push({
        title: 'Tổng quan lá số',
        icon: '👋',
        content: [
            `Chào bạn, đây là bản luận giải chi tiết dựa trên lá số Tứ Trụ (Bát Tự) của ${genderStr}.`,
            'Phân tích được tổng hợp từ các phương pháp cổ điển (Dịch Thiên Tuy, Tử Bình) và hiện đại.'
        ]
    });

    // Run all advanced analyses
    const analysis = phanTich.runAllAnalyses(ctx);

    // 2. TỔNG QUAN BẢN MỆNH (NHẬT CHỦ)
    const stemInfo = STEM_DATA[me] || {};
    const stemName = (stemInfo.name && stemInfo.name[0]) || ganzhi.ganToVN(me);
    const symbol = (stemInfo.symbol && stemInfo.symbol[0]) || '';

    const rng = createSeededRandom(`${ctx.solar.getYear()}-${ctx.solar.getMonth()}-${ctx.solar.getDay()}-${genderKey}`);
    const traitsList = stemInfo[isFemale ? 'traits_female' : 'traits_male'] || stemInfo.traits || [];
    const trait = rng.pick(traitsList) || '';

    const overviewContent = [
        `Nhật chủ (Can ngày): **${stemName}** (${symbol}).`,
        `Đặc điểm chủ đạo: ${trait}`,
        `Sức mạnh bản mệnh: ${ctx.scores.suc_manh.la_nhuoc ? 'Thân Nhược' : 'Thân Vượng'} (Điểm: ${ctx.scores.suc_manh.diem_manh}/${ctx.scores.suc_manh.tong_diem})`,
        `Hành chủ đạo: ${meElement}`
    ];

    const vtsResult = analysis.vong_trang_sinh;
    if (vtsResult && vtsResult.length > 0) {
        overviewContent.push(_extractKeyLines(vtsResult).slice(0, 1)[0] || vtsResult[1]);
    }

    const dttResult = analysis.dich_thien_tuy;
    if (dttResult) {
        overviewContent.push(..._extractKeyLines(dttResult).slice(0, 2));
    }

    sections.push({
        title: "Tổng Quan Bản Mệnh",
        icon: "👤",
        content: overviewContent
    });

    // 3. SỰ NGHIỆP VÀ TÀI LỘC
    const careerContent = [];
    const careerAdvice = CAREER_ADVICE_BY_ELEMENT[meElement] || [];
    const careerDetails = CAREER_BY_ELEMENT[meElement] || {};

    careerContent.push(`**Định hướng nghề nghiệp**: ${careerAdvice[0] || 'Phù hợp với nhiều lĩnh vực.'}`);
    if (careerDetails.industries) {
        careerContent.push(`**Lĩnh vực phù hợp**: ${careerDetails.industries.slice(0, 3).join(', ')}`);
    }

    // Ten Deities Influence on Career
    const careerDeity = ctx.ganShens[3]; // Hour pillar
    if (CAREER_BY_DEITY[careerDeity]) {
        careerContent.push(`**Ảnh hưởng Thập Thần**: ${CAREER_BY_DEITY[careerDeity][0]}`);
    }

    const ctbgResult = analysis.cung_thong_bao_giam;
    if (ctbgResult && ctbgResult.length > 0) {
        careerContent.push(`**Lời khuyên Cùng Thông**: ${_extractKeyLines(ctbgResult)[0]}`);
    }

    const tbcResult = analysis.tu_binh_chan_thuyen;
    if (tbcResult) {
        careerContent.push(..._extractKeyLines(tbcResult).slice(0, 2));
    }

    sections.push({
        title: "Sự Nghiệp và Tài Lộc",
        icon: "💰",
        content: careerContent
    });

    // 4. TÌNH CẢM VÀ GIA ĐÌNH
    const familyContent = [];
    const branchInfo = BRANCH_DATA[dayZhi] || {};

    // Day Branch Description
    familyContent.push(`Trụ Ngày (Cung Phu Thê) tọa chi **${ganzhi.zhiToVN(dayZhi)}** (${branchInfo.animal}).`);
    if (branchInfo.relationships) {
        familyContent.push(`**Đặc điểm**: ${rng.pick(branchInfo.relationships)}`);
    }

    // Spouse Relationship
    const spouseData = SPOUSE_RELATIONSHIPS[genderKey] || {};
    // Determine marriage earliness/lateness logic - simplistic for now, or random variance
    const marriageType = rng.pick(['early_marriage', 'late_marriage', 'happy_marriage']);
    if (spouseData[marriageType]) {
        familyContent.push(`**Hôn nhân**: ${rng.pick(spouseData[marriageType])}`);
    }

    // Parents
    if (FATHER_RELATIONSHIPS.positive) {
        // Randomly pick a quality for variety or base on stars if implemented later
        const fQuality = rng.pick(['positive', 'balanced']);
        familyContent.push(`**Cha**: ${rng.pick(FATHER_RELATIONSHIPS[fQuality])}`);
    }

    // Children
    if (CHILDREN_RELATIONSHIPS.filial_children) {
        const cQuality = rng.pick(['filial_children', 'many_children', 'challenging_children']);
        familyContent.push(`**Con cái**: ${rng.pick(CHILDREN_RELATIONSHIPS[cQuality])}`);
    }

    const hhpResult = analysis.hinh_hai_pha;
    if (hhpResult && hhpResult.length > 0) {
        familyContent.push("**Xung kỵ bẩm sinh**: " + _extractKeyLines(hhpResult).slice(0, 2).join(" "));
    }

    sections.push({
        title: "Tình Cảm và Gia Đình",
        icon: "❤️",
        content: familyContent
    });

    // 5. SỨC KHỎE VÀ PHONG THỦY
    const healthContent = [];
    const healthDetail = HEALTH_BY_ELEMENT[meElement] || {};
    const fsAdvice = FENGSHUI_ADVICE_BY_ELEMENT[meElement] || [];

    // Health by Element
    if (healthDetail.organs) {
        healthContent.push(`**Cơ quan yếu điểm**: ${rng.pick(healthDetail.organs)}`);
    }
    if (healthDetail.diseases) {
        healthContent.push(`**Đề phòng bệnh**: ${rng.pick(healthDetail.diseases)}`);
    }
    if (healthDetail.prevention) {
        healthContent.push(`**Lời khuyên phòng bệnh**: ${rng.pick(healthDetail.prevention)}`);
    }

    // Health by Season (Month)
    const month = ctx.solar.getMonth(); // 1-12
    let seasonKey = 'winter';
    if (month >= 3 && month <= 5) seasonKey = 'spring';
    else if (month >= 6 && month <= 8) seasonKey = 'summer';
    else if (month >= 9 && month <= 11) seasonKey = 'autumn';

    if (HEALTH_BY_SEASON[seasonKey]) {
        healthContent.push(`**Theo mùa sinh**: ${rng.pick(HEALTH_BY_SEASON[seasonKey])}`);
    }

    const bdResult = analysis.benh_duoc;
    if (bdResult) {
        healthContent.push(..._extractKeyLines(bdResult).slice(0, 1));
    }

    // Feng Shui Advice
    if (fsAdvice.length > 0) {
        healthContent.push(`**Phong thủy**: ${fsAdvice[0]}`);
    }

    // Balanced element logic from index.js
    const scores = ctx.scores.ngu_hanh_vn || {};
    const sortedScores = Object.entries(scores).sort((a, b) => a[1] - b[1]);
    const weakest = sortedScores[0][0];

    healthContent.push(`**Cần bổ sung**: Hành **${weakest}** để cân bằng mệnh cục.`);
    healthContent.push(`**Màu sắc hợp**: ${ELEMENT_COLORS[weakest] || 'Đa dạng'}.`);
    healthContent.push(`**Hướng quý**: ${ELEMENT_DIRECTIONS[weakest] || 'Linh hoàn'}.`);

    sections.push({
        title: "Sức Khỏe và Phong Thủy",
        icon: "🏥",
        content: healthContent
    });

    // 6. THẦN SÁT VÀ CÁT HUNG
    const shenshaContent = [];
    (ctx.stars || []).forEach(star => {
        const detail = SHENSHA_DATA[star];
        if (detail) {
            shenshaContent.push(`**${star}**: ${detail.desc || detail.meaning || detail}`);
        }
    });
    if (shenshaContent.length > 0) {
        sections.push({
            title: "Thần Sát và Cát Hung",
            icon: "✨",
            content: shenshaContent.slice(0, 15)
        });
    }

    // 7. CÁCH CỤC VÀ NẠP ÂM
    const patternContent = [];
    const nayin = ctx.nayin[2]; // Day pillar nayin
    if (NAYIN_DATA[nayin]) {
        patternContent.push(`**Nạp âm Trụ Ngày**: ${nayin} - ${NAYIN_DATA[nayin].desc || NAYIN_DATA[nayin].name || ''}`);
    }

    // Pattern detection
    const patternInfo = PATTERN_DATA[ctx.ge];
    patternContent.push("**Cách cục**: " + (patternInfo ? (patternInfo.name[0] || ctx.ge) : "Cơ bản") + ".");
    if (patternInfo && patternInfo.overview) {
        patternContent.push(rng.pick(patternInfo.overview));
    }

    sections.push({
        title: "Cách Cục và Năng Lượng",
        icon: "💎",
        content: patternContent
    });

    // 8. TIẾN TRÌNH ĐỜI NGƯỜI
    const eventContent = [];
    const ageRanges = ['20-30', '30-40', '40-50'];
    const elementEvents = LIFE_EVENTS_BY_ELEMENT[meElement]?.events || [];

    ageRanges.forEach(range => {
        const events = LIFE_EVENTS_BY_AGE[range];
        if (events) {
            const desc = rng.pick(events.general) || '';
            eventContent.push(`**Tuổi ${range}**: ${desc}`);
        }
    });

    if (elementEvents.length > 0) {
        eventContent.push(`**Lưu ý chung**: ${rng.pick(elementEvents)}`);
    }

    sections.push({
        title: "Tiến Trình Đời Người",
        icon: "🛤️",
        content: eventContent
    });

    // 9. LỜI KHUYÊN TỔNG HỢP
    const sumContent = [];
    sumContent.push(`**Vận trình**: ${rng.pick(TRUNG_VAN_VUONG)}`);
    sumContent.push(`**Châm ngôn**: "${rng.pick(SOCIAL_ADVICE)}"`);

    sections.push({
        title: "Lời Khuyên Tổng Hợp",
        icon: "💡",
        content: sumContent
    });

    return sections;
}

/**
 * Get full analysis report including raw analysis data
 */
function getFullReport(ctx) {
    const luanGiai = analyzeLuanGiai(ctx);
    const analysisResults = phanTich.runAllAnalyses(ctx);

    return {
        luan_giai: luanGiai,
        phan_tich: analysisResults
    };
}

module.exports = {
    analyzeLuanGiai,
    getFullReport
};
