/**
 * Phân tích Tử Bình Chân Thuyên - Grandmaster Pattern Suite
 */

const { OPENINGS, INTEGRITY_TEMPLATES, GENDER_NUANCE, MINISTER_DB } = require('./data/tu_binh_data');

// Simple seeded random
function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function analyzeTuBinhChanThuyen(ctx) {
    const results = ["==== TỬ BÌNH CHÂN THUYÊN ===="];
    const gender = ctx.isFemale ? "nu" : "nam";

    // ge is typically an object with name, type (SUCCESS/FAILURE/RESCUE), and desc
    const ge = ctx.ge || { name: "Kiến Lộc", type: "SUCCESS", desc: "Cách cục Kiến Lộc vượng." };
    const geName = ge.name || "Kiến Lộc";
    const statusType = ge.type || "SUCCESS";
    const conditionDesc = ge.desc || "Cấu trúc mệnh cục ổn định.";

    // Normalize pattern key
    let patternKey = "Lộc";
    const keys = Object.keys(OPENINGS[gender]);
    for (const pk of keys) {
        if (geName.includes(pk)) {
            patternKey = pk;
            break;
        }
    }

    let seed = ctx.solar.getYear() + ctx.solar.getMonth() + ctx.solar.getDay() + (ctx.isFemale ? 1 : 0);

    // --- PHẦN 1: MỞ ĐẦU ---
    const openingOptions = OPENINGS[gender][patternKey] || ["Về cách cục,"];
    const opening = openingOptions[Math.floor(seededRandom(seed++) * openingOptions.length)];

    const integrityOptions = INTEGRITY_TEMPLATES[statusType] || ["đang được phân tích."];
    const integrityMsg = integrityOptions[Math.floor(seededRandom(seed++) * integrityOptions.length)];

    results.push(`• **Tổng quan cấu trúc**: ${opening} ${integrityMsg}`);

    // --- PHẦN 2: PHÂN TÍCH THÀNH BẠI ---
    results.push("\n[PHÂN TÍCH THÀNH BẠI CHUYÊN SÂU]");
    results.push(`• **Trạng thái**: ${conditionDesc}`);

    const nuance = GENDER_NUANCE[gender][statusType] || "Cần chú ý vận trình.";
    results.push(`• **Tác động ${gender.toUpperCase()}**: ${nuance}`);

    // --- PHẦN 3: ĐỊNH VỊ TƯỚNG THẦN ---
    results.push("\n[ĐỊNH VỊ TƯỚNG THẦN VÀ TÁ THẦN]");
    const ministerOptions = MINISTER_DB[patternKey] || ["Cần phối hợp can chi để tìm dụng thần."];
    const mMsg = ministerOptions[Math.floor(seededRandom(seed++) * ministerOptions.length)];
    results.push(`• **Chiến lược**: ${mMsg}`);

    results.push("\n" + "=".repeat(50));
    results.push("*“Cách cục không phân thành bại, cứu ứng không kịp thời, thì phú quý chỉ là mây khói.”* — Chân Thuyên tôn chỉ.");

    return results;
}

module.exports = {
    analyzeTuBinhChanThuyen,
    STATUS: INTEGRITY_TEMPLATES
};
