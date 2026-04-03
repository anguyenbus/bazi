/**
 * Phân tích Nạp Âm Chuyên Sâu
 */

const { NAYIN_DETAILS, OPENINGS, ADJECTIVES, INTERACTION_TEMPLATES, STRATEGIES } = require('./data/nap_am_data');
const ganzhi = require('../ganzhi');

// Helper to get nayin data
function getNayinData(nayin) {
    for (const key in NAYIN_DETAILS) {
        if (nayin.includes(key)) return NAYIN_DETAILS[key];
    }
    return { element: "Thổ", nature: "ổn định", bone: "khí nạp âm" };
}

// Simple seeded random to ensure consistency
function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function analyzeNapAmChuyenSau(ctx) {
    const results = ["==== NẠP ÂM CHUYÊN SÂU ===="];

    // Get nayins for 4 pillars
    // ctx.zhus is array of [Can, Chi]
    const nyList = ctx.zhus.map(zhu => ganzhi.getNapAm(zhu[0], zhu[1]));
    const yearNy = nyList[0];
    const data = getNayinData(yearNy);
    const el = data.element;

    // Seed based on birth date
    let seed = ctx.solar.getYear() + ctx.solar.getMonth() + ctx.solar.getDay();

    // 1. Cốt cách
    const openingOptions = OPENINGS[el] || ["Bản mệnh"];
    const opening = openingOptions[Math.floor(seededRandom(seed++) * openingOptions.length)];

    const adjOptions = ADJECTIVES[el] || ["đặc biệt"];
    const adj1 = adjOptions[Math.floor(seededRandom(seed++) * adjOptions.length)];
    const adj2 = adjOptions[Math.floor(seededRandom(seed++) * adjOptions.length)];

    results.push(`${opening} **${yearNy}** (${data.bone}), mang cốt cách **${adj1}** và **${adj2}**.`);

    // 2. Ma trận tương tác
    results.push("\n[MA TRẬN TƯƠNG TÁC 4 TRỤ]");
    const pillars = ["Năm", "Tháng", "Ngày", "Giờ"];

    const growth = { 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy' };
    const control = { 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc' };

    for (let i = 1; i < 4; i++) {
        const pName = pillars[i];
        const pNy = nyList[i];
        const pData = getNayinData(pNy);
        const pEl = pData.element;

        let rel = "Đồng";
        if (growth[el] === pEl || growth[pEl] === el) rel = "Sinh";
        else if (control[el] === pEl || control[pEl] === el) rel = "Khắc";

        const templates = INTERACTION_TEMPLATES[rel];
        const template = templates[Math.floor(seededRandom(seed++) * templates.length)];
        results.push(`• **Trụ ${pName} (${pNy})**: ${template.replace('{p2}', 'bản mệnh')}`);
    }

    // 3. Định hướng chiến lược
    results.push("\n[ĐỊNH HƯỚNG LỘ TRÌNH CHIẾN LƯỢC]");
    const strategyOptions = STRATEGIES[el] || ["Nâng cao năng lực tự thân"];
    const strat = strategyOptions[Math.floor(seededRandom(seed++) * strategyOptions.length)];
    results.push(`• **Lời khuyên**: ${strat}.`);

    results.push("\n" + "=".repeat(30));
    results.push("*“Ngũ hành là khí, Nạp âm là hình. Nạp âm ma trận lột tả bản chất sâu xa của vạn vật.”*");

    return results;
}

module.exports = {
    analyzeNapAmChuyenSau
};
