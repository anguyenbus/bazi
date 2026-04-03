/**
 * Liunian (Lưu Niên) - Annual fortune analysis
 * Converted from Python bazi/thoi_gian_luan
 */

const ganzhi = require('./ganzhi');

/**
 * Analyze Lưu Niên (Annual Fortune)
 */
function analyzeLuuNien(ctx, targetYear) {
    // Calculate Gan Chi for target year
    const yearGanIdx = (targetYear - 4) % 10;
    const yearZhiIdx = (targetYear - 4) % 12;

    const yearGan = ganzhi.GANS[yearGanIdx];
    const yearZhi = ganzhi.ZHIS[yearZhiIdx];

    // Get Thập Thần relationship with Day Master
    const ganThapThan = ganzhi.getThapThan(ctx.gans[2], yearGan);
    const zhiThapThan = ganzhi.getThapThan(ctx.gans[2], ganzhi.getZhiMainGan(yearZhi));

    // Check interactions with natal chart
    const interactions = checkInteractions(ctx.zhis, yearZhi);

    return {
        nam: targetYear,
        can: ganzhi.ganToVN(yearGan),
        chi: ganzhi.zhiToVN(yearZhi),
        nap_am: ganzhi.getNapAm(yearGan, yearZhi),
        thap_than_can: ganThapThan,
        thap_than_chi: zhiThapThan,
        tuong_tac: interactions,
        danh_gia: evaluateYear(ganThapThan, zhiThapThan, interactions)
    };
}

/**
 * Check interactions between year Zhi and natal Zhis
 */
function checkInteractions(natalZhis, yearZhi) {
    const interactions = [];
    const pillars = ['Năm', 'Tháng', 'Ngày', 'Giờ'];

    for (let i = 0; i < natalZhis.length; i++) {
        const natalZhiVN = ganzhi.zhiToVN(natalZhis[i]);
        const yearZhiVN = ganzhi.zhiToVN(yearZhi);

        // Check Xung (Clash)
        if (isXung(natalZhis[i], yearZhi)) {
            interactions.push({
                type: 'Xung',
                pillar: pillars[i],
                description: `${yearZhiVN} xung ${natalZhiVN}`
            });
        }

        // Check Hợp (Combine)
        if (isHop(natalZhis[i], yearZhi)) {
            interactions.push({
                type: 'Hợp',
                pillar: pillars[i],
                description: `${yearZhiVN} hợp ${natalZhiVN}`
            });
        }
    }

    return interactions;
}

/**
 * Check if two Zhis clash (Xung)
 */
function isXung(zhi1, zhi2) {
    const xungPairs = [
        ['子', '午'], ['丑', '未'], ['寅', '申'],
        ['卯', '酉'], ['辰', '戌'], ['巳', '亥']
    ];

    return xungPairs.some(pair =>
        (pair.includes(zhi1) && pair.includes(zhi2)) && zhi1 !== zhi2
    );
}

/**
 * Check if two Zhis combine (Hợp)
 */
function isHop(zhi1, zhi2) {
    const hopPairs = [
        ['子', '丑'], ['寅', '亥'], ['卯', '戌'],
        ['辰', '酉'], ['巳', '申'], ['午', '未']
    ];

    return hopPairs.some(pair =>
        (pair.includes(zhi1) && pair.includes(zhi2)) && zhi1 !== zhi2
    );
}

/**
 * Evaluate year fortune
 */
function evaluateYear(ganTT, zhiTT, interactions) {
    let score = 50; // Base score

    // Favorable Thập Thần
    const favorable = ['Quan', 'Ấn', 'Tài+', 'Tài-', 'Thực'];
    const unfavorable = ['Sát', 'Thương', 'Kiếp'];

    if (favorable.includes(ganTT)) score += 15;
    if (favorable.includes(zhiTT)) score += 10;
    if (unfavorable.includes(ganTT)) score -= 15;
    if (unfavorable.includes(zhiTT)) score -= 10;

    // Interactions
    for (const interaction of interactions) {
        if (interaction.type === 'Xung') score -= 10;
        if (interaction.type === 'Hợp') score += 5;
    }

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    if (score >= 70) return { level: 'Tốt', score, color: 'green' };
    if (score >= 50) return { level: 'Bình', score, color: 'yellow' };
    return { level: 'Xấu', score, color: 'red' };
}

module.exports = {
    analyzeLuuNien,
    checkInteractions,
    isXung,
    isHop
};
