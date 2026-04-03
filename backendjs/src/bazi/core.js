/**
 * Core BaZi functions
 * Converted from Python bazi/core.py
 */

const ganzhi = require('./ganzhi');

/**
 * Get Gong (Palace) information
 */
function getGong(gan, zhi) {
    return {
        gan: ganzhi.ganToVN(gan),
        zhi: ganzhi.zhiToVN(zhi),
        napAm: ganzhi.getNapAm(gan, zhi)
    };
}

/**
 * Get elements distribution
 */
function getElements(ctx) {
    return ctx.elements || {};
}

/**
 * Calculate element balance
 */
function calculateBalance(elements) {
    const total = Object.values(elements).reduce((a, b) => a + b, 0);
    const balanced = total / 5;

    const result = {};
    for (const [key, value] of Object.entries(elements)) {
        result[key] = {
            score: value,
            percentage: Math.round((value / total) * 100),
            status: value > balanced * 1.2 ? 'Vượng' : (value < balanced * 0.8 ? 'Nhược' : 'Bình')
        };
    }

    return result;
}

module.exports = {
    getGong,
    getElements,
    calculateBalance
};
