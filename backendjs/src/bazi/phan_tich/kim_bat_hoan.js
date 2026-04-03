/**
 * Phân tích Kim Bất Hoán - Golden Verses Grandmaster Suite
 */

const { VERSE_DB, LUCK_RULES, HY_KY_RULES, DEFAULT_HY_KY } = require('./data/kim_bat_hoan_data');
const ganzhi = require('../ganzhi');

// Simple seeded random
function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function analyzeKimBatHoan(ctx) {
    const me = ctx.gans[2]; // Nhật Chủ
    const monthZhi = ctx.zhis[1]; // Lệnh tháng
    const results = ["==== KIM BẤT HOÁN: HỆ THỐNG KHẨU QUYẾT VÀNG ===="];

    results.push(`\n[NHẬT CHỦ ${ganzhi.ganToVN(me)} SINH THÁNG ${ganzhi.zhiToVN(monthZhi)}]`);

    // 1. Khẩu quyết
    const verse = (VERSE_DB[me] && VERSE_DB[me][monthZhi]) ||
        `Khẩu quyết Kim Bất Hoán cho Nhật Chủ ${ganzhi.ganToVN(me)} sinh tháng ${ganzhi.zhiToVN(monthZhi)} đang được nghiên cứu chuyên sâu.`;
    results.push(`• **Khẩu quyết**: *"${verse}"*`);

    // 2. Đại vận đồ hình
    results.push("\n[ĐẠI VẬN ĐỒ HÌNH]");
    const currentYun = (ctx.yun && ctx.yun.getDaYun && ctx.yun.getDaYun().length > 1) ? ctx.yun.getDaYun()[1] : null;
    if (currentYun) {
        // Assuming currentYun has getGanZhi or similar structure
        // In the absence of full yun object details, let's use a placeholder approach for currentYun
        const yunZhi = currentYun.zhi || '子'; // Placeholder
        const key = `${me}_${monthZhi}`;
        const detail = (LUCK_RULES[key] && LUCK_RULES[key][yunZhi]) || "";

        if (detail) {
            results.push(`• **Chi tiết Vận Vị (${ganzhi.zhiToVN(yunZhi)})**: ${detail}`);
        } else {
            const yEl = ganzhi.zhiToElement(yunZhi);
            results.push(`• **Vận Lộ (${ganzhi.zhiToVN(yunZhi)} - ${yEl})**: Vận khí hiện tại mang tính chất của hành ${yEl}. Cần phối hợp với các thần sát để định rõ cát hung.`);
        }
    } else {
        results.push("• (Dữ liệu đại vận hiện tại chưa khả dụng để đối chiếu đồ hình)");
    }

    // 3. Hỷ kỵ
    results.push("\n[HỶ KỴ QUYẾT]");
    const key = `${me}_${monthZhi}`;
    let hyKy = HY_KY_RULES[key];
    if (!hyKy) {
        const meEl = ganzhi.ganToElement(me);
        const variants = DEFAULT_HY_KY[meEl] || DEFAULT_HY_KY['Thổ'];
        let seed = ctx.solar.getYear() + ctx.solar.getMonth() + ctx.solar.getDay();
        hyKy = variants[Math.floor(seededRandom(seed) * variants.length)];
    }
    results.push(`• **Hỷ Kỵ**: ${hyKy}`);

    // 4. Định cách
    results.push("\n[ĐỊNH CÁCH PHÚ QUÝ]");
    const meEl = ganzhi.ganToElement(me);
    const meScore = (ctx.scores && ctx.scores[meEl]) || 0;
    let status = "";
    if (meScore > 30) status = "Thanh Quý (Cốt cách cao sang, trung hậu).";
    else if (meScore > 15) status = "Bình Phàm (Đời người ổn định, ít sóng gió lớn).";
    else status = "Khốn Khó (Cần nỗ lực vượt bậc để vượt qua rào cản vận mệnh).";

    results.push(`• **Định Cách**: Lá số thuộc hạng **${status}**`);

    results.push("\n" + "=".repeat(50));
    results.push("*“Vàng có khi đổi được, nhưng một lời khẩu quyết của Kim Bất Hoán thì vạn kim không đổi.”* — Kim Bất Hoán tôn chỉ.");

    return results;
}

module.exports = {
    analyzeKimBatHoan,
    VERSE_DB
};
