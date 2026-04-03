/**
 * Phân tích Bệnh Dược (Thần Phong Thông Khảo) - Phiên bản Phase 5 Million Matrix
 */

const { OPENINGS, SYNDROMES, GENDER_HEALTH, REMEDIES } = require('./data/benh_duoc_data');

// Simple seeded random to ensure consistency
function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function analyzeBenhDuoc(ctx) {
    const results = ["==== PHÂN TÍCH BỆNH DƯỢC ===="];
    const gender = ctx.isFemale ? "nu" : "nam";
    const scores = ctx.scores || {};

    // Fallback names for elements to match data keys
    const elementMap = {
        'Kim': 'Kim', 'Mộc': 'Mộc', 'Thủy': 'Thủy', 'Hỏa': 'Hỏa', 'Thổ': 'Thổ',
        'Metal': 'Kim', 'Wood': 'Mộc', 'Water': 'Thủy', 'Fire': 'Hỏa', 'Earth': 'Thổ'
    };

    if (Object.keys(scores).length === 0) {
        return ["Chưa có dữ liệu điểm số để phân tích Bệnh Dược."];
    }

    // Initialize Seed
    let seed = ctx.solar.getYear() + ctx.solar.getMonth() + ctx.solar.getDay() + (ctx.isFemale ? 1 : 0);

    // 1. Find strongest and weakest elements
    const sortedEls = Object.entries(scores)
        .map(([k, v]) => [elementMap[k] || k, v])
        .sort((a, b) => b[1] - a[1]);

    const strongest = sortedEls[0][0];
    const weakest = sortedEls[sortedEls.length - 1][0];

    // --- PHẦN 1: MỞ ĐẦU & TỔNG QUAN ---
    const openingOptions = OPENINGS[gender] || OPENINGS["nam"];
    const opening = openingOptions[Math.floor(seededRandom(seed++) * openingOptions.length)];
    results.push(`• **Tổng quan**: ${opening} sự mất cân bằng giữa **${strongest}** và **${weakest}**.`);

    // --- PHẦN 2: HỘI CHỨNG ĐA BIẾN ---
    results.push("\n[CHẨN ĐOÁN HỘI CHỨNG PHỨC HỢP]");
    const pairKey = `${strongest}_${weakest}`;
    if (SYNDROMES[pairKey]) {
        const syndromeOptions = SYNDROMES[pairKey];
        results.push(`• **Hội chứng chính**: ${syndromeOptions[Math.floor(seededRandom(seed++) * syndromeOptions.length)]}`);
    } else {
        results.push(`• **Hội chứng**: Khí của ${strongest} đang lấn át ${weakest}, gây mất cân bằng sinh lý.`);
    }

    // --- PHẦN 3: CÁ NHÂN HÓA GIỚI TÍNH ---
    const genderLabel = gender === "nu" ? "NỮ" : "NAM";
    results.push(`\n[PHÂN TÍCH RỦI RO SINH LÝ CHO ${genderLabel} MỆNH]`);
    const riskText = (GENDER_HEALTH[gender] && GENDER_HEALTH[gender][strongest]) || "Cần chú ý sức khỏe tổng quát.";
    results.push(`• **Cảnh báo ${genderLabel} mệnh**: ${riskText}`);

    const weakDetail = (GENDER_HEALTH[gender] && GENDER_HEALTH[gender][weakest]) || "Bổ trợ thêm hành này.";
    results.push(`• **Điểm yếu nội tại**: ${weakDetail}`);

    // --- PHẦN 4: LỜI KHUYÊN & PHÁP TRỊ ---
    results.push("\n[PHÁP TRỊ VÀ DƯỠNG SINH CHIẾN LƯỢC]");
    const adviceList = REMEDIES[weakest] || ["Nâng cao sức khỏe"];

    // Choose 2 random advices
    const idx1 = Math.floor(seededRandom(seed++) * adviceList.length);
    let idx2 = Math.floor(seededRandom(seed++) * adviceList.length);
    if (idx1 === idx2 && adviceList.length > 1) idx2 = (idx1 + 1) % adviceList.length;

    results.push(`• **Khuyên dùng**: ${adviceList[idx1]}.`);
    if (idx1 !== idx2) {
        results.push(`• **Khuyên dùng**: ${adviceList[idx2]}.`);
    }

    results.push(`• **Màu sắc trợ mệnh**: Sử dụng đồ dùng màu sắc thuộc hành ${weakest} để điều hòa khí hóa.`);

    results.push("\n" + "=".repeat(30));
    results.push("*“Bệnh tại chỗ thiên lệch, Dược tại chỗ điều hòa. Thấu suốt Bệnh Dược, có thể bảo tồn mạng sống.”*");

    return results;
}

module.exports = {
    analyzeBenhDuoc
};
