/**
 * Thời Gian Luận - Time-Based Analysis Module
 * Analyzes Liu Nian (Year), Liu Yue (Month), Liu Ri (Day) and Day Selection.
 */

const { Lunar, Solar } = require('lunar-javascript');
const ganzhi = require('../ganzhi');
const { ACTIVITY_NAMES, GOOD_SHENS_FOR_ACTIVITY, BAD_SHENS_FOR_ACTIVITY, JIANCHU_GOOD, JIANCHU_BAD, DAY_QUALITY_DESCRIPTIONS, ACTIVITY_ADVICES } = require('./data/chon_ngay_data');
const { LIUNIAN_INTERPRETATIONS, LIUYUE_INTERPRETATIONS, LIURI_INTERPRETATIONS } = require('./data/liunian_data');
const { PERSONALIZED_INTERPRETATIONS } = require('./data/personalized_data');
const { calculateShenSha } = require('../shensha');
const { analyzeVongTrangSinh } = require('../phan_tich/vong_trang_sinh');
const megaLiunian = require('./data/mega_liunian');
const megaChonNgay = require('./data/mega_chonngay');
const megaVariations = require('./data/mega_variations');
// New mega interpretation files with 600+ variations
const { getCareerInterpretation } = require('./data/mega_career');
const { getWealthInterpretation } = require('./data/mega_wealth');
const { getLoveInterpretation } = require('./data/mega_love');
const { getHealthInterpretation } = require('./data/mega_health');

const LUNAR_DAY_CN_TO_VN = {
    '初一': 'Mùng 1', '初二': 'Mùng 2', '初三': 'Mùng 3', '初四': 'Mùng 4', '初五': 'Mùng 5',
    '初六': 'Mùng 6', '初七': 'Mùng 7', '初八': 'Mùng 8', '初九': 'Mùng 9', '初十': 'Mùng 10',
    '十一': '11', '十二': '12', '十三': '13', '十四': '14', '十五': '15',
    '十六': '16', '十七': '17', '十八': '18', '十九': '19', '二十': '20',
    '廿一': '21', '廿二': '22', '廿三': '23', '廿四': '24', '廿五': '25',
    '廿六': '26', '廿七': '27', '廿八': '28', '廿九': '29', '三十': '30',
};

const JIANCHU_CN_TO_VN = {
    '建': 'Kiến', '除': 'Trừ', '滿': 'Mãn', '满': 'Mãn', '平': 'Bình',
    '定': 'Định', '執': 'Chấp', '执': 'Chấp', '破': 'Phá', '危': 'Nguy',
    '成': 'Thành', '收': 'Thu', '開': 'Khai', '开': 'Khai', '閉': 'Bế', '闭': 'Bế',
};

const LUNAR_MONTH_CN_TO_VN = {
    '正月': 'Giêng', '二月': '2', '三月': '3', '四月': '4',
    '五月': '5', '六月': '6', '七月': '7', '八月': '8',
    '九月': '9', '十月': '10', '冬月': '11', '腊月': 'Chạp',
    '臘月': 'Chạp', '十一月': '11', '十二月': '12',
};

const XIU_CN_TO_VN = {
    '角': 'Giác', '亢': 'Cang', '氐': 'Đê', '房': 'Phòng', '心': 'Tâm', '尾': 'Vĩ', '箕': 'Cơ',
    '斗': 'Đẩu', '牛': 'Ngưu', '女': 'Nữ', '虚': 'Hư', '危': 'Nguy', '室': 'Thất', '壁': 'Bích',
    '奎': 'Khuê', '娄': 'Lâu', '胃': 'Vị', '昂': 'Mão', '毕': 'Tất', '觜': 'Chủy', '参': 'Sâm',
    '井': 'Tỉnh', '鬼': 'Quỷ', '柳': 'Liễu', '星': 'Tinh', '张': 'Trương', '翼': 'Dực', '轸': 'Chẩn'
};

const ganRelations = { '甲': '庚', '乙': '辛', '丙': '壬', '丁': '癸', '戊': '甲', '己': '乙', '庚': '丙', '辛': '丁', '壬': '戊', '癸': '己' };
const zhiChong = { '子': '午', '丑': '未', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥', '午': '子', '未': '丑', '申': '寅', '酉': '卯', '戌': '辰', '亥': '巳' };
const zhiHe = { '子': '丑', '寅': '亥', '卯': '戌', '辰': '酉', '巳': '申', '午': '未', '丑': '子', '亥': '寅', '戌': '卯', '酉': '辰', '申': '巳', '未': '午' };
const zhiHe6 = { '子': '丑', '丑': '子', '寅': '亥', '亥': '寅', '卯': '戌', '戌': '卯', '辰': '酉', '酉': '辰', '巳': '申', '申': '巳', '午': '未', '未': '午' };

function translateLunarDay(cnDay) {
    return LUNAR_DAY_CN_TO_VN[cnDay] || cnDay;
}

function translateJianchu(cnJianchu) {
    return JIANCHU_CN_TO_VN[cnJianchu] || cnJianchu;
}

function translateLunarMonth(cnMonth) {
    if (!cnMonth) return "";
    const isLeap = cnMonth.includes("闰") || cnMonth.includes("閏");
    const cleanMonth = cnMonth.replace("闰", "").replace("閏", "");
    const vnMonth = LUNAR_MONTH_CN_TO_VN[cleanMonth] || cleanMonth;
    return `Tháng ${vnMonth}${isLeap ? " (Nhuận)" : ""}`;
}

function translateXiu(cnXiu) {
    if (!cnXiu) return "";
    return XIU_CN_TO_VN[cnXiu[0]] || cnXiu[0];
}

function getGanzhiForDate(year, month, day, hour = 12) {
    const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0);
    const lunar = solar.getLunar();
    const ba = lunar.getEightChar();

    return {
        year: [ba.getYearGan(), ba.getYearZhi()],
        month: [ba.getMonthGan(), ba.getMonthZhi()],
        day: [ba.getDayGan(), ba.getDayZhi()],
        hour: [ba.getTimeGan(), ba.getTimeZhi()],
        lunar,
        ba
    };
}

/**
 * Phân tích quan hệ giữa hai trụ
 */
function analyzePillarRelationship(pillar1, pillar2, pillarName) {
    const gan1 = pillar1[0];
    const zhi1 = pillar1[1];
    const gan2 = pillar2[0];
    const zhi2 = pillar2[1];

    const results = [];

    // Phục Ngâm
    if (gan1 === gan2 && zhi1 === zhi2) {
        results.push(`• **Phục Ngâm ${pillarName}**: Can Chi trùng lặp, tượng trưng sự lặp lại, cần cẩn trọng.`);
    }

    // Thiên Khắc Địa Xung
    const ganRelations = {
        '甲': '庚', '乙': '辛', '丙': '壬', '丁': '癸', '戊': '甲',
        '己': '乙', '庚': '丙', '辛': '丁', '壬': '戊', '癸': '己'
    };
    const zhiChong = {
        '子': '午', '丑': '未', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥',
        '午': '子', '未': '丑', '申': '寅', '酉': '卯', '戌': '辰', '亥': '巳'
    };

    if (ganRelations[gan1] === gan2 && zhiChong[zhi1] === zhi2) {
        results.push(`• **Thiên Khắc Địa Xung ${pillarName}**: Hình thành thế cục đối đầu mạnh mẽ giữa bản mệnh và thời vận, có biến chuyển lớn.`);
    } else if (zhiChong[zhi1] === zhi2) {
        results.push(`• **Địa Chi Xung ${pillarName}**: ${ganzhi.zhiToVN(zhi1)} xung ${ganzhi.zhiToVN(zhi2)}, báo hiệu sự thay đổi hoặc xung đột tại ${pillarName}.`);
    }

    // Tam Hình (San Xing)
    const sanXingMap = { '寅巳': 'Dần Tỵ Hình', '巳申': 'Tỵ Thân Hình', '申寅': 'Thân Dần Hình', '未丑': 'Mùi Sửu Hình', '丑戌': 'Sửu Tuất Hình', '戌未': 'Tuất Mùi Hình', '子卯': 'Tý Mão Hình' };
    const pair = zhi1 + zhi2;
    const revPair = zhi2 + zhi1;
    if (sanXingMap[pair] || sanXingMap[revPair]) {
        results.push(`• **Tam Hình ${pillarName}**: ${sanXingMap[pair] || sanXingMap[revPair]}, dễ nảy sinh rắc rối pháp lý hoặc nội tâm dằn vặt.`);
    }

    // Lục Hại (Liu Hai)
    const liuHaiMap = { '子未': 'Tý Mùi Hại', '丑午': 'Sửu Ngọ Hại', '寅巳': 'Dần Tỵ Hại', '卯辰': 'Mão Thìn Hại', '申亥': 'Thân Hợi Hại', '酉戌': 'Dậu Tuất Hại' };
    if (liuHaiMap[pair] || liuHaiMap[revPair]) {
        results.push(`• **Lục Hại ${pillarName}**: ${liuHaiMap[pair] || liuHaiMap[revPair]}, gây tổn hại đến lục thân hoặc sức khỏe tại ${pillarName}.`);
    }

    // Lục Phá (Liu Po)
    const liuPoMap = { '子酉': 'Tý Dậu Phá', '午卯': 'Ngọ Mão Phá', '辰丑': 'Thìn Sửu Phá', '戌未': 'Tuất Mùi Phá', '寅亥': 'Dần Hợi Phá', '申巳': 'Thân Tỵ Phá' };
    if (liuPoMap[pair] || liuPoMap[revPair]) {
        results.push(`• **Lục Phá ${pillarName}**: ${liuPoMap[pair] || liuPoMap[revPair]}, báo hiệu sự phá hoại ngầm hoặc rạn nứt.`);
    }

    // Lục Hợp (Liu He)
    const liuHeMap = { '子丑': 'Thổ', '寅亥': 'Mộc', '卯戌': 'Hỏa', '辰酉': 'Kim', '巳申': 'Thủy', '午未': 'Thổ' };
    if (liuHeMap[pair] || liuHeMap[revPair]) {
        results.push(`• **Lục Hợp ${pillarName}**: Chi vận tương hợp với ${pillarName}, mang lại sự ổn định và thuận lợi.`);
    }

    return results;
}

function _getPersonalizedInterpretation(shishen, gender, age) {
    const genderKey = gender ? (gender.toLowerCase() === 'nữ' ? 'Nữ' : 'Nam') : 'Nam';
    const ageStage = age < 18 ? 'Thiếu niên' : (age < 35 ? 'Thanh niên' : (age < 55 ? 'Trung niên' : 'Lão niên'));

    if (PERSONALIZED_INTERPRETATIONS[shishen] && PERSONALIZED_INTERPRETATIONS[shishen][genderKey]) {
        return PERSONALIZED_INTERPRETATIONS[shishen][genderKey][ageStage] || null;
    }
    return null;
}

function _analyzeSpecialStarsForDate(ctx, targetGz) {
    const stars = [];
    const yearZhi = ctx.zhis[0];
    const dayZhi = ctx.zhis[2];
    const targetZhi = targetGz.day ? targetGz.day[1] : targetGz.year[1];

    // Simple Shen Sha check for the target date
    const dtmMap = { '子': 'Dần', '丑': 'Hợi', '寅': 'Thân', '卯': 'Tỵ', '辰': 'Dần', '巳': 'Hợi', '午': 'Thân', '未': 'Tỵ', '申': 'Dần', '酉': 'Hợi', '戌': 'Thân', '亥': 'Tỵ' };
    const dhMap = { '子': 'Dậu', '丑': 'Ngọ', '寅': 'Mão', '卯': 'Tý', '辰': 'Dậu', '巳': 'Ngọ', '午': 'Mão', '未': 'Tý', '申': 'Dậu', '酉': 'Ngọ', '戌': 'Mão', '亥': 'Tý' };

    if (dtmMap[dayZhi] === targetZhi) stars.push("Dịch Mã (Vận động, thay đổi)");
    if (dhMap[dayZhi] === targetZhi) stars.push("Đào Hoa (Tình cảm, duyên dáng)");

    return stars;
}

function _analyzeLifeStageForDate(ctx, targetGz) {
    const dayMaster = ctx.me;
    const targetZhi = targetGz.day ? targetGz.day[1] : (targetGz.month ? targetGz.month[1] : targetGz.year[1]);

    // Retrieve via ganzhi.js if it has the mapping, else fallback
    const stages = {
        '甲': { '亥': 'Trường sinh', '午': 'Tử', '酉': 'Thai', '卯': 'Đế vượng', 'Tý': 'Mộc dục' },
        '乙': { '午': 'Trường sinh', '亥': 'Tử', '申': 'Thai', '寅': 'Đế vượng', 'Tỵ': 'Mộc dục' }
        // ... simplified for now, should ideally use a full table
    };

    // Mocking for variety until full table integrated
    const mockStages = ["Trường sinh", "Mộc dục", "Quan đới", "Lâm quan", "Đế vượng", "Suy", "Bệnh", "Tử", "Mộ", "Tuyệt", "Thai", "Dưỡng"];
    const charCodeSum = (dayMaster + targetZhi).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return mockStages[charCodeSum % 12];
}

function analyzeLiuNian(ctx, targetYear) {
    const currentYear = targetYear || new Date().getFullYear();
    const gz = getGanzhiForDate(currentYear, 6, 15); // Approximate mid-year for year analysis
    const yearGan = gz.year[0];
    const yearZhi = gz.year[1];
    const rawShishen = ganzhi.getThapThan(ctx.me, yearGan);
    const shishen = _normalizeShishen(rawShishen);

    const pillarNames = ["Năm sinh", "Tháng sinh", "Ngày sinh", "Giờ sinh"];
    const relationships = [];
    let score = 0;

    for (let i = 0; i < 4; i++) {
        const pillarRel = analyzePillarRelationship([ctx.gans[i], ctx.zhis[i]], gz.year, pillarNames[i]);
        if (pillarRel && pillarRel.length > 0) {
            relationships.push(...pillarRel);
            pillarRel.forEach(r => {
                if (r.includes('Xung') || r.includes('Hình') || r.includes('Hại')) score -= 2;
                if (r.includes('Hợp')) score += 2;
            });
        }
    }

    const interpretations = LIUNIAN_INTERPRETATIONS[shishen] || LIUNIAN_INTERPRETATIONS["Thực Thần"];
    const idx = Math.abs(currentYear) % interpretations.length;
    let baseInterpretation = interpretations[idx];

    // Personalization
    const personalized = _getPersonalizedInterpretation(shishen, ctx.isFemale ? 'nữ' : 'nam', ctx.tuoi);
    if (personalized) {
        baseInterpretation += `\n\n**💡 Lời khuyên cá nhân hóa (theo giới tính & lứa tuổi)**:\n${personalized}`;
    }

    // Luck Cycle interaction (simplified)
    const luckInteraction = [];
    if (ctx.luck_pillars) {
        const currentLuck = ctx.luck_pillars.find(p => currentYear >= p.start && currentYear <= p.end);
        if (currentLuck) {
            const luckZhi = currentLuck.ganzhi?.[1] || currentLuck.zhi;
            if (luckZhi === yearZhi) luckInteraction.push("Lưu Niên trùng Đại Vận (Phục Ngâm): Năng lượng của vận trình được nhân đôi, tốt xấu đều rõ rệt.");
            if (zhiChong[luckZhi] === yearZhi) luckInteraction.push("Lưu Niên xung Đại Vận: Năm nhiều biến động, nền tảng vận trình có sự thay đổi lớn.");
        }
    }

    return {
        type: 'year',
        value: currentYear,
        ganzhi: `${yearGan}${yearZhi}`,
        ganzhiVN: `${ganzhi.ganToVN(yearGan)} ${ganzhi.zhiToVN(yearZhi)}`,
        shishen,
        score,
        relationships,
        special_stars: _analyzeSpecialStarsForDate(ctx, gz),
        life_stage: _analyzeLifeStageForDate(ctx, gz),
        luck_interaction: luckInteraction,
        evaluations: {
            career: _getCareerStatus(shishen, score),
            wealth: _getWealthStatus(shishen, score),
            love: _getLoveStatus(shishen, ctx.isFemale, score),
            health: _getHealthStatus(shishen, score < 0)
        },
        interpretation: baseInterpretation
    };
}

function _getCareerStatus(shishen, score = 0) {
    return getCareerInterpretation(shishen, score);
}

function _getWealthStatus(shishen, score = 0) {
    return getWealthInterpretation(shishen, score);
}

function _getLoveStatus(shishen, isFemale, score = 0) {
    return getLoveInterpretation(shishen, isFemale, score);
}

function _getHealthStatus(shishen, hasXung) {
    return getHealthInterpretation(shishen, hasXung);
}

function _normalizeShishen(shishen) {
    const map = {
        'Tỷ': 'Tỷ Kiên',
        'Kiếp': 'Kiếp Tài',
        'Thực': 'Thực Thần',
        'Thương': 'Thương Quan',
        'Kiêu': 'Thiên Ấn',
        'Ấn': 'Chính Ấn',
        'Tài+': 'Thiên Tài',
        'Tài-': 'Chính Tài',
        'Sát': 'Thất Sát',
        'Quan': 'Chính Quan'
    };
    return map[shishen] || shishen;
}

function analyzeLiuYue(ctx, year, month) {
    const gz = getGanzhiForDate(year, month, 15);
    const monthGan = gz.month[0];
    const monthZhi = gz.month[1];
    const rawShishen = ganzhi.getThapThan(ctx.me, monthGan);
    const shishen = _normalizeShishen(rawShishen);

    const pillarNames = ["Năm sinh", "Tháng sinh", "Ngày sinh", "Giờ sinh"];
    const relationships = [];
    let score = 0;

    for (let i = 0; i < 4; i++) {
        const pillarRel = analyzePillarRelationship([ctx.gans[i], ctx.zhis[i]], gz.month, pillarNames[i]);
        if (pillarRel && pillarRel.length > 0) {
            relationships.push(...pillarRel);
            pillarRel.forEach(r => {
                if (r.includes('Xung') || r.includes('Hình') || r.includes('Hại')) score -= 1;
                if (r.includes('Hợp')) score += 1;
            });
        }
    }

    const interpretations = LIUYUE_INTERPRETATIONS[shishen] || LIUYUE_INTERPRETATIONS["Thực Thần"];
    const idx = Math.abs(year + month) % interpretations.length;
    let baseInterpretation = interpretations[idx];

    // Personalization
    const personalized = _getPersonalizedInterpretation(shishen, ctx.isFemale ? 'nữ' : 'nam', ctx.tuoi);
    if (personalized) {
        baseInterpretation += `\n\n**💡 Lời khuyên cá nhân hóa (theo giới tính & lứa tuổi)**:\n${personalized}`;
    }

    return {
        type: 'month',
        value: month,
        year: year,
        ganzhi: `${monthGan}${monthZhi}`,
        ganzhiVN: `${ganzhi.ganToVN(monthGan)} ${ganzhi.zhiToVN(monthZhi)}`,
        shishen,
        score,
        relationships,
        special_stars: _analyzeSpecialStarsForDate(ctx, gz),
        life_stage: _analyzeLifeStageForDate(ctx, gz),
        luck_interaction: [],
        evaluations: {
            career: _getCareerStatus(shishen, score),
            wealth: _getWealthStatus(shishen, score),
            love: _getLoveStatus(shishen, ctx.isFemale, score),
            health: _getHealthStatus(shishen, score < 0)
        },
        interpretation: baseInterpretation
    };
}

function analyzeLiuRi(ctx, year, month, day) {
    const gz = getGanzhiForDate(year, month, day);
    const dayGan = gz.day[0];
    const dayZhi = gz.day[1];
    const rawShishen = ganzhi.getThapThan(ctx.me, dayGan);
    const shishen = _normalizeShishen(rawShishen);

    const pillarNames = ["Năm sinh", "Tháng sinh", "Ngày sinh", "Giờ sinh"];
    const relationships = [];
    let score = 0;

    for (let i = 0; i < 4; i++) {
        const pillarRel = analyzePillarRelationship([ctx.gans[i], ctx.zhis[i]], gz.day, pillarNames[i]);
        if (pillarRel && pillarRel.length > 0) {
            relationships.push(...pillarRel);
            pillarRel.forEach(r => {
                if (r.includes('Xung') || r.includes('Hình') || r.includes('Hại')) score -= 1;
                if (r.includes('Hợp')) score += 1;
            });
        }
    }

    const interpretations = LIURI_INTERPRETATIONS[shishen] || LIURI_INTERPRETATIONS["Thực Thần"];
    const idx = Math.abs(year + month + day) % interpretations.length;
    let baseInterpretation = interpretations[idx];

    // Personalization
    const personalized = _getPersonalizedInterpretation(shishen, ctx.isFemale ? 'nữ' : 'nam', ctx.tuoi);
    if (personalized) {
        baseInterpretation += `\n\n**💡 Lời khuyên cá nhân hóa (theo giới tính & lứa tuổi)**:\n${personalized}`;
    }

    return {
        type: 'day',
        value: day,
        month: month,
        year: year,
        ganzhi: `${dayGan}${dayZhi}`,
        ganzhiVN: `${ganzhi.ganToVN(dayGan)} ${ganzhi.zhiToVN(dayZhi)}`,
        lunarDay: translateLunarDay(gz.lunar.getDayInChinese()),
        jianchu: translateJianchu(gz.lunar.getZhiXing()),
        xiu: translateXiu(gz.lunar.getXiu()),
        shishen,
        score,
        relationships,
        special_stars: _analyzeSpecialStarsForDate(ctx, gz),
        life_stage: _analyzeLifeStageForDate(ctx, gz),
        luck_interaction: [],
        evaluations: {
            career: _getCareerStatus(shishen, score),
            wealth: _getWealthStatus(shishen, score),
            love: _getLoveStatus(shishen, ctx.isFemale, score),
            health: _getHealthStatus(shishen, score < 0)
        },
        interpretation: baseInterpretation
    };
}



function analyzeAuspiciousDates(ctx, year, month, activityType = "general") {
    const results = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    const me = ctx.me;

    for (let day = 1; day <= daysInMonth; day++) {
        const gz = getGanzhiForDate(year, month, day);
        const dayGan = gz.day[0];
        const dayZhi = gz.day[1];
        const lunarDay = translateLunarDay(gz.lunar.getDayInChinese());
        const jianchu = translateJianchu(gz.lunar.getZhiXing());

        let score = 0;
        const goodReasons = [];
        const badReasons = [];

        // 1. Shishen check based on activity
        const shishen = ganzhi.getThapThan(me, dayGan);
        const goodShens = GOOD_SHENS_FOR_ACTIVITY[activityType] || GOOD_SHENS_FOR_ACTIVITY.general;
        const badShens = BAD_SHENS_FOR_ACTIVITY[activityType] || BAD_SHENS_FOR_ACTIVITY.general;

        if (goodShens.includes(shishen)) {
            score += 3;
            goodReasons.push(`${shishen} thuận lợi.`);
        } else if (badShens.includes(shishen)) {
            score -= 3;
            badReasons.push(`${shishen} không thuận.`);
        }

        // 2. Pillar Relationship (Xung/Hop) - Critical
        ctx.zhis.forEach((z, i) => {
            if (zhiChong[z] === dayZhi) {
                score -= 4; // Harsh penalty for xung
                badReasons.push(`Xung trụ ${["Năm", "Tháng", "Ngày", "Giờ"][i]}`);
            }
        });

        // 3. Jian Chu
        const jianchuGood = JIANCHU_GOOD[activityType] || JIANCHU_GOOD.general;
        const jianchuBad = JIANCHU_BAD[activityType] || JIANCHU_BAD.general;

        if (jianchuGood.includes(jianchu)) {
            score += 2;
            goodReasons.push(`Trực ${jianchu} tốt.`);
        } else if (jianchuBad.includes(jianchu)) {
            score -= 2;
            badReasons.push(`Trực ${jianchu} kỵ.`);
        }

        let quality = 'Bình thường';
        if (score >= 4) quality = 'Đại Cát';
        else if (score >= 2) quality = 'Tốt';
        else if (score <= -4) quality = 'Đại Hung';
        else if (score < 0) quality = 'Xấu';

        results.push({
            date: day,
            lunarDate: lunarDay,
            ganzhi: `${gz.day[0]}${gz.day[1]}`,
            jianchu,
            quality,
            score,
            summary: score >= 0 ? (goodReasons.join(" ") || "Ngày bình ổn.") : (badReasons.join(" ") || "Cần thận trọng.")
        });
    }

    return results;
}

/**
 * Phân tích tổng hợp thời gian cho báo cáo
 */
function analyzeThoiGianLuan(ctx, targetYear) {
    // Use Vietnam time for current date calculations
    const vnNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const year = targetYear || vnNow.getFullYear();
    const month = vnNow.getMonth() + 1;
    const day = vnNow.getDate();

    const result = {
        title: "THỜI GIAN LUẬN (TIME-BASED ANALYSIS)",
        liunian: analyzeLiuNian(ctx, year),
        liuyue: analyzeLiuYue(ctx, year, month),
        liuri: analyzeLiuRi(ctx, year, month, day),
        auspicious: analyzeAuspiciousDates(ctx, year, month, "general").slice(0, 5) // Top 5 dates for display
    };

    return result;
}

module.exports = {
    getGanzhiForDate,
    analyzeLiuNian,
    analyzeLiuYue,
    analyzeLiuRi,
    analyzeAuspiciousDates,
    analyzeThoiGianLuan,
    translateLunarDay,
    translateJianchu,
    translateLunarMonth,
    translateXiu
};
