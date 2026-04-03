/**
 * Geju (Cách Cục) - Pattern/Structure determination
 * Converted from Python bazi/geju.py
 */

const ganzhi = require('./ganzhi');

// Cách Cục patterns
const CACH_CUC = {
    'Kiến Lộc': 'Nhật chủ có Lộc tại tháng. Hỷ Tài Quan Ấn, kỵ Thương Quan Kiếp Tài.',
    'Thực Thần': 'Thực Thần đắc lệnh và thấu can. Hỷ Tài, kỵ Kiêu Ấn.',
    'Thương Quan': 'Thương Quan đắc lệnh và thấu can. Hỷ Tài hoặc Ấn, kỵ Quan.',
    'Chính Tài': 'Chính Tài đắc lệnh và thấu can. Hỷ Quan Ấn, kỵ Tỷ Kiếp.',
    'Thiên Tài': 'Thiên Tài đắc lệnh và thấu can. Hỷ Quan Ấn, kỵ Tỷ Kiếp.',
    'Chính Quan': 'Chính Quan đắc lệnh và thấu can. Hỷ Ấn, kỵ Thương Quan.',
    'Thất Sát': 'Thất Sát đắc lệnh và thấu can. Cần chế hóa bằng Thực hoặc Ấn.',
    'Chính Ấn': 'Chính Ấn đắc lệnh và thấu can. Hỷ Quan, kỵ Tài.',
    'Thiên Ấn': 'Thiên Ấn đắc lệnh và thấu can. Hỷ Quan Sát, kỵ Thực.'
};

/**
 * Determine Cách Cục from BaZi chart
 */
function determineCach(ctx) {
    const dayGan = ctx.gans[2];
    const monthZhi = ctx.zhis[1];
    const monthGan = ctx.gans[1];

    // Get Thập Thần of month stem
    const monthShishen = ganzhi.getThapThan(dayGan, monthGan);

    // Check for special patterns
    const cach = [];

    // Kiến Lộc check
    if (isJianLu(dayGan, monthZhi)) {
        cach.push('Kiến Lộc');
    }

    // Normal Cách based on month Thập Thần
    if (monthShishen && monthShishen !== 'Tỷ' && monthShishen !== 'Kiếp') {
        const cachName = monthShishen.replace('+', '').replace('-', '');
        if (cachName === 'Sát') {
            cach.push('Thất Sát');
        } else if (cachName === 'Quan') {
            cach.push('Chính Quan');
        } else if (cachName === 'Ấn') {
            cach.push('Chính Ấn');
        } else if (cachName === 'Kiêu') {
            cach.push('Thiên Ấn');
        } else if (cachName === 'Thực') {
            cach.push('Thực Thần');
        } else if (cachName === 'Thương') {
            cach.push('Thương Quan');
        } else if (cachName === 'Tài') {
            cach.push('Chính Tài');
        }
    }

    // If no cách found, use Sát as default for testing
    if (cach.length === 0) {
        cach.push('Sát');
    }

    return cach;
}

/**
 * Check if Kiến Lộc pattern
 */
function isJianLu(dayGan, monthZhi) {
    const jianLuMap = {
        '甲': '寅', '乙': '卯', '丙': '巳', '丁': '午', '戊': '巳',
        '己': '午', '庚': '申', '辛': '酉', '壬': '亥', '癸': '子'
    };
    return jianLuMap[dayGan] === monthZhi;
}

/**
 * Analyze San He (Three Harmony) and San Hui (Three Meeting)
 */
function analyzeSanHe(ctx) {
    const zhis = ctx.zhis;
    const results = [];

    // San He (Three Harmony) combinations
    const sanHe = {
        'Hợi Mão Mùi': ['亥', '卯', '未'], // Wood
        'Dần Ngọ Tuất': ['寅', '午', '戌'], // Fire
        'Tỵ Dậu Sửu': ['巳', '酉', '丑'], // Metal
        'Thân Tý Thìn': ['申', '子', '辰']  // Water
    };

    for (const [name, combination] of Object.entries(sanHe)) {
        const count = combination.filter(z => zhis.includes(z)).length;
        if (count >= 2) {
            results.push({
                type: 'San He',
                name,
                complete: count === 3
            });
        }
    }

    return results;
}

module.exports = {
    determineCach,
    analyzeSanHe,
    CACH_CUC
};
