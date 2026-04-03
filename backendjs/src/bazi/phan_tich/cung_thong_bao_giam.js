/**
 * Phân tích Cung Thông Bảo Giám - The Grandmaster Manual of Seasonal Balance
 */

const { DATA } = require('./data/cung_thong_data');
const ganzhi = require('../ganzhi');

function analyzeCungThongBaoGiam(ctx) {
    const me = ctx.gans[2]; // Nhật Chủ
    const monthZhi = ctx.zhis[1]; // Lệnh tháng
    const results = ["==== CUNG THÔNG BẢO GIÁM: ĐIỀU HẬU CHÂN KINH ===="];

    const key = `${me}_${monthZhi}`;
    const interpretation = DATA[key];

    results.push(`\n[NHẬT CHỦ ${ganzhi.ganToVN(me)} SINH THÁNG ${ganzhi.zhiToVN(monthZhi)}]`);

    if (interpretation) {
        results.push(`• **Bản văn**: ${interpretation}`);
    } else {
        results.push("• (Đang cập nhật dữ liệu điều hậu chuyên sâu cho tổ hợp này)");
    }

    results.push("\n" + "=".repeat(50));
    results.push("*“Ba tháng mùa xuân mộc vượng, ba tháng mùa hạ hỏa nồng. Điều hòa khí hậu là gốc của sự sống.”* — Cung Thông tôn chỉ.");

    return results;
}

module.exports = {
    analyzeCungThongBaoGiam,
    DIEU_HAU: DATA
};
