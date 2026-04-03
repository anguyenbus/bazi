/**
 * Phân tích Vòng Tràng Sinh - Grandmaster Life Stage Suite
 */

const { OPENINGS, STAGES, DYNAMICS, STAGE_WEIGHTS } = require('./data/vong_trang_sinh_data');

// Simple seeded random
function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function analyzeVongTrangSinh(ctx) {
    const gans = ctx.gans; // [Năm, Tháng, Ngày, Giờ]
    const zhis = ctx.zhis;
    const gender = ctx.isFemale ? "nu" : "nam";
    const pillarNames = ["Năm", "Tháng", "Ngày", "Giờ"];

    // 1. Calculate stages for each pillar
    // Note: ctx.stages should be provided or calculated here.
    // In Python it's ten_deities.get(gans[i], {}).get(zhis[i], "N/A")
    // Let's assume the context already provides them or we calculate them.
    // Assuming ctx.pillarStages is an array of 4 stage names.
    const stages = ctx.pillarStages || [];

    if (stages.length === 0) {
        // Fallback or calculation logic if not provided
        // For now, if missing, we can't do much. 
        // But likely the calculator already computed these.
        return ["Chưa có dữ liệu Vòng Tràng Sinh để phân tích."];
    }

    const results = ["==== VÒNG TRÀNG SINH ===="];
    let seed = ctx.solar.getYear() + ctx.solar.getMonth() + ctx.solar.getDay() + (ctx.isFemale ? 1 : 0);

    // --- PHẦN 1: MỞ ĐẦU ---
    const openingOptions = OPENINGS[gender];
    const opening = openingOptions[Math.floor(seededRandom(seed++) * openingOptions.length)];
    results.push(`• **Tổng quan khí thế**: ${opening} mang sắc thái đặc thù.`);

    // --- PHẦN 2: CHI TIẾT CÁC TRỤ ---
    results.push("\n[CHI TIẾT TRẠNG THÁI SINH KHÍ]");
    let totalScore = 0;
    for (let i = 0; i < 4; i++) {
        const stage = stages[i];
        const stageInfo = STAGES[stage] || { desc: "Trạng thái không xác định." };
        const genderDesc = stageInfo[gender] || stageInfo.desc;

        totalScore += STAGE_WEIGHTS[stage] || 1.0;

        const nuance = [
            `Trụ **${pillarNames[i]}** đang ở đất **${stage}**. `,
            `Tại **${pillarNames[i]}** ghi nhận trạng thái **${stage}**. `,
            `Năng lượng tại trụ **${pillarNames[i]}** biểu hiện qua **${stage}**. `
        ];
        results.push(`• ${nuance[Math.floor(seededRandom(seed++) * nuance.length)]}${genderDesc}`);
    }

    // --- PHẦN 3: PHÂN TÍCH ĐỘNG LỰC ---
    results.push("\n[PHÂN TÍCH ĐỘNG LỰC VÒNG ĐỜI]");
    const vSet = ['Tràng sinh', 'Lâm quan', 'Đế vượng', 'Quan đới'];
    const sSet = ['Tử', 'Mộ', 'Tuyệt', 'Bệnh'];

    let dynamicType = "";
    if (vSet.includes(stages[0]) && sSet.includes(stages[3])) dynamicType = "TIỀN_CÁT_HẬU_HUNG";
    else if (sSet.includes(stages[0]) && vSet.includes(stages[3])) dynamicType = "TIỀN_HUNG_HẬU_CÁT";
    else if (stages.every(s => vSet.includes(s))) dynamicType = "VƯỢNG_VƯỢNG";
    else if (stages.every(s => sSet.includes(s))) dynamicType = "SUY_SUY";

    if (dynamicType && DYNAMICS[dynamicType]) {
        const dynOptions = DYNAMICS[dynamicType];
        results.push(`• **Nhận định**: ${dynOptions[Math.floor(seededRandom(seed++) * dynOptions.length)]}`);
    } else {
        results.push("• **Nhận định**: Khí thế vận trình đan xen, đòi hỏi sự linh hoạt trong từng giai đoạn.");
    }

    // --- PHẦN 4: LỜI KHUYÊN GIỚI TÍNH ---
    const genderLabel = gender === "nu" ? "NỮ" : "NAM";
    results.push(`\n[LỜI KHUYÊN CHO ${genderLabel} MỆNH]`);
    const adviceNam = [
        "Cần tận dụng các giai đoạn Vượng để đột phá sự nghiệp.",
        "Ở giai đoạn Suy, nên tập trung vào chiều sâu và quản lý thay vì mở rộng.",
        "Bản lĩnh đàn ông thể hiện rõ nhất khi đối mặt với trạng thái Tuyệt."
    ];
    const adviceNu = [
        "Hãy nuôi dưỡng nội tâm và sự nhạy bén trong các giai đoạn Thai, Dưỡng.",
        "Giai đoạn Đế vượng cần chú ý giữ gìn hòa khí trong các mối quan hệ.",
        "Sự bình an tâm hồn là chìa khóa để vượt qua những lúc khí thế suy vi."
    ];

    const adviceList = gender === "nu" ? adviceNu : adviceNam;
    results.push(`• **Khuyên**: ${adviceList[Math.floor(seededRandom(seed++) * adviceList.length)]}`);

    // --- PHẦN 5: CHỈ SỐ TỔNG HỢP ---
    results.push(`\n• **Chỉ số sinh khí tổng hợp**: ${totalScore.toFixed(1)}/8.0. ` +
        (totalScore > 5.0 ? "Khí thế dồi dào, bản mệnh vững vàng." : totalScore > 3.0 ? "Khí thế trung bản, cần sự bổ trợ từ đại vận." : "Khí thế suy vi, cần tịnh dưỡng và hành sự cẩn trọng."));

    results.push("\n" + "=".repeat(50));
    results.push("*“Sinh ra đúng lúc là phúc, già đi đúng chỗ là đức. Tràng sinh chi vị, chính là cái gốc của vạn vật.”*");

    return results;
}

module.exports = {
    analyzeVongTrangSinh,
    LIFE_STAGES: STAGES,
    STAGE_WEIGHTS
};
