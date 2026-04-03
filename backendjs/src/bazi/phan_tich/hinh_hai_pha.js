/**
 * Phân tích Hình, Hại, Phá Chuyên Sâu
 */

const { OPENINGS, CONFLICT_TEMPLATES, GENDER_IMPACTS, GPS_TEMPLATES } = require('./data/hinh_hai_pha_data');
const ganzhi = require('../ganzhi');

// constants for export
const TAM_HINH = ["Tý-Mão", "Dần-Tỵ-Thân", "Sửu-Mùi-Tuất", "Tự Hình"];
const LUC_HAI = ["Tý-Mùi", "Sửu-Ngọ", "Dần-Tỵ", "Mão-Thìn", "Thân-Hợi", "Dậu-Tuất"];
const LUC_PHA = ["Tý-Dậu", "Ngọ-Mão", "Thân-Tỵ", "寅-Hợi", "Thìn-Sửu", "Tuất-Mùi"];

// Simple seeded random
function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function analyzeHinhHaiPha(ctx) {
    const zhis = ctx.zhis;
    const pillarNames = ["Năm", "Tháng", "Ngày", "Giờ"];
    const activeClashes = [];

    // --- 1. PHÂN TÍCH TAM HÌNH ---
    // Tý - Mão
    if (zhis.includes('子') && zhis.includes('卯')) {
        const indices = zhis.map((z, i) => (z === '子' || z === '卯' ? i : -1)).filter(i => i !== -1);
        activeClashes.push({
            type: "HÌNH", pair: "Tý-Mão",
            pillars: indices.map(i => pillarNames[i]), indices
        });
    }

    // Dần - Thân - Tỵ
    const dstSet = new Set(['寅', '申', '巳']);
    const foundDst = zhis.filter(z => dstSet.has(z));
    if (new Set(foundDst).size >= 2) {
        const indices = zhis.map((z, i) => (dstSet.has(z) ? i : -1)).filter(i => i !== -1);
        activeClashes.push({
            type: "HÌNH", pair: "Dần-Tỵ-Thân",
            pillars: indices.map(i => pillarNames[i]), indices
        });
    }

    // Sửu - Tuất - Mùi
    const stmSet = new Set(['丑', '戌', '未']);
    const foundStm = zhis.filter(z => stmSet.has(z));
    if (new Set(foundStm).size >= 2) {
        const indices = zhis.map((z, i) => (stmSet.has(z) ? i : -1)).filter(i => i !== -1);
        activeClashes.push({
            type: "HÌNH", pair: "Sửu-Mùi-Tuất",
            pillars: indices.map(i => pillarNames[i]), indices
        });
    }

    // Tự Hình
    ['辰', '午', '酉', '亥'].forEach(z => {
        const count = zhis.filter(val => val === z).length;
        if (count >= 2) {
            const indices = zhis.map((val, i) => (val === z ? i : -1)).filter(i => i !== -1);
            activeClashes.push({
                type: "HÌNH", pair: "Tự Hình",
                pillars: indices.map(i => pillarNames[i]), indices
            });
        }
    });

    // --- 2. PHÂN TÍCH LỤC HẠI ---
    const harmDb = [['子', '未'], ['丑', '午'], ['寅', '巳'], ['卯', '辰'], ['申', '亥'], ['酉', '戌']];
    const harmKeys = { '子-未': 'Tý-Mùi', '丑-午': 'Sửu-Ngọ', '寅-巳': 'Dần-Tỵ', '卯-辰': 'Mão-Thìn', '申-亥': 'Thân-Hợi', '酉-戌': 'Dậu-Tuất' };
    harmDb.forEach(([h1, h2]) => {
        if (zhis.includes(h1) && zhis.includes(h2)) {
            const indices = zhis.map((z, i) => (z === h1 || z === h2 ? i : -1)).filter(i => i !== -1);
            const key = harmKeys[`${h1}-${h2}`] || `${ganzhi.zhiToVN(h1)}-${ganzhi.zhiToVN(h2)}`;
            activeClashes.push({
                type: "HẠI", pair: key,
                pillars: indices.map(i => pillarNames[i]), indices
            });
        }
    });

    // --- 3. PHÂN TÍCH LỤC PHÁ ---
    const breakDb = [['子', '酉'], ['午', '卯'], ['申', '巳'], ['寅', '亥'], ['辰', '丑'], ['戌', '未']];
    breakDb.forEach(([p1, p2]) => {
        if (zhis.includes(p1) && zhis.includes(p2)) {
            const indices = zhis.map((z, i) => (z === p1 || z === p2 ? i : -1)).filter(i => i !== -1);
            activeClashes.push({
                type: "PHÁ", pair: `${ganzhi.zhiToVN(p1)}-${ganzhi.zhiToVN(p2)}`,
                pillars: indices.map(i => pillarNames[i]), indices
            });
        }
    });

    // --- TỔNG HỢP & MA TRẬN HÓA ---
    const results = ["==== HÌNH HẠI PHÁ ===="];
    const gender = ctx.isFemale ? "nu" : "nam";
    let seed = ctx.solar.getYear() + ctx.solar.getMonth() + ctx.solar.getDay() + (ctx.isFemale ? 1 : 0);

    if (activeClashes.length > 0) {
        // --- PHẦN 1: MỞ ĐẦU ---
        const openingOptions = OPENINGS[gender];
        const opening = openingOptions[Math.floor(seededRandom(seed++) * openingOptions.length)];
        results.push(`• **Tổng quan**: ${opening} mang sắc thái của sự nhiễu loạn.`);

        // --- PHẦN 2: CHI TIẾT XUNG ĐỘT ---
        results.push("\n[MA TRẬN XUNG ĐỘT PHỨC HỢP]");
        activeClashes.slice(0, 4).forEach(clash => {
            const type = clash.type;
            const pair = clash.pair;
            const pillars = clash.pillars;

            const dbType = CONFLICT_TEMPLATES[type] || {};
            const pairOptions = dbType[pair] || ["Tương tác này gây ra sự bất ổn ngầm."];
            const template = pairOptions[Math.floor(seededRandom(seed++) * pairOptions.length)];

            results.push(`• **${type} ${pair}** (${pillars.join(" - ")}): ${template}`);
        });

        // --- PHẦN 3: CÁ NHÂN HÓA GIỚI TÍNH ---
        results.push(`\n[PHÂN TÍCH HỆ QUẢ ${gender.toUpperCase()} MỆNH]`);
        const primaryClash = activeClashes[0].type;
        const impact = GENDER_IMPACTS[gender][primaryClash] || "Cần chú ý các mối quan hệ xã hội.";
        results.push(`• **Tác động ${gender}**: ${impact}`);

        // --- PHẦN 4: ĐỊNH VỊ GPS ---
        results.push("\n[ĐỊNH VỊ RỦI RO CHIẾN LƯỢC]");
        activeClashes.slice(0, 2).forEach(clash => {
            clash.indices.forEach(idx => {
                results.push(`• **Trụ ${pillarNames[idx]}**: ${GPS_TEMPLATES[idx] || 'Gây nhiễu dòng năng lượng.'}`);
            });
        });
    } else {
        results.push("\n• Mệnh cục thái bình, không có các tương tác Hình-Hại-Phá gây nhiễu loạn căn cơ.");
    }

    results.push("\n" + "=".repeat(50));
    results.push("*“Hình thì phải có thuốc, Hại thì phải có hợp. Trong hung có cát, luận mệnh mới là vi diệu.”*");

    return results;
}

module.exports = {
    analyzeHinhHaiPha,
    TAM_HINH,
    LUC_HAI,
    LUC_PHA
};
