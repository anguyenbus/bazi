/**
 * Phân tích Địch Thiên Tủy (Di Tian Sui)
 */

const { STEM_ESSENCE } = require('./data/dich_thien_tuy_data');
const ganzhi = require('../ganzhi');

function analyzeDichThienTuy(ctx) {
    const results = ["==== ĐỊCH THIÊN TỦY: HỆ THỐNG CHẨN ĐOÁN ===="];
    const gans = ctx.gans;
    const zhis = ctx.zhis;
    const scores = ctx.scores || {};
    const dm = gans[2];
    const dmEl = ganzhi.ganToElement(dm);

    // 1. Nhật Chủ Essence
    results.push(`\n[PHÁP THÂN NHẬT CHỦ: ${ganzhi.ganToVN(dm)}]`);
    if (STEM_ESSENCE[dm]) {
        results.push(`• *"${STEM_ESSENCE[dm].verse}"*`);
        results.push(`• **Tâm pháp**: ${STEM_ESSENCE[dm].detail}`);

        // Determine season
        const mZhi = zhis[1];
        let season = "Winter";
        if ("寅卯辰".includes(mZhi)) season = "Spring";
        else if ("巳午未".includes(mZhi)) season = "Summer";
        else if ("申酉戌".includes(mZhi)) season = "Autumn";

        const seasonVN = { "Spring": "Xuân", "Summer": "Hạ", "Autumn": "Thu", "Winter": "Đông" }[season];
        results.push(`• **Khí tượng mùa ${seasonVN}**: ${STEM_ESSENCE[dm].seasonal[season]}`);
    }

    // 2. Mộ Khố Dynamics
    results.push("\n[LÝ LUẬN MỘ KHỐ]");
    const graveyards = ['辰', '戌', '丑', '未'];
    const foundGraves = zhis.filter(z => graveyards.includes(z));

    if (foundGraves.length === 0) {
        results.push("• Mệnh cục không có Mộ Khố, khí thế rõ ràng, không có sự tàng ẩn phức tạp.");
    } else {
        const uniqueGraves = [...new Set(foundGraves)];
        uniqueGraves.forEach(z => {
            let isOpen = false;
            if (z === '辰' && zhis.includes('戌')) isOpen = true;
            if (z === '戌' && zhis.includes('辰')) isOpen = true;
            if (z === '丑' && zhis.includes('未')) isOpen = true;
            if (z === '未' && zhis.includes('丑')) isOpen = true;

            const hiddenQi = { '辰': '癸', '戌': '丁', '丑': '辛', '未': '乙' };
            const qiVN = { '癸': 'Quý', '丁': 'Đinh', '辛': 'Tân', '乙': 'Ất' };
            const mainElement = { '辰': 'Thủy', '戌': 'Hỏa', '丑': 'Kim', '未': 'Mộc' };
            const canLo = gans.includes(hiddenQi[z]);

            const status = (isOpen || canLo) ? "Đã Mở" : "Đang Đóng";
            const reason = (isOpen || canLo) ? "(do Xung hoặc Can lộ)" : "(cần Xung hoặc Can lộ để phát dụng)";
            results.push(`• **Mộ Khố ${ganzhi.zhiToVN(z)} (${mainElement[z]})**: Trạng thái **${status}** ${reason}.`);

            if ((isOpen || canLo) && canLo) {
                results.push(`  - Cát hung: Can **${qiVN[hiddenQi[z]]}** từ kho lộ ra, tượng trưng cho năng lực ẩn giấu được phát huy.`);
            }
        });
    }

    // 3. Quân Thần Tá Sứ
    results.push("\n[HỆ THỐNG QUÂN THẦN TÁ SỨ]");
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    if (sortedScores.length > 0) {
        const rulerEl = sortedScores[0][0];
        results.push(`• **Quân (Vị Vua)**: Hành **${rulerEl}** nắm quyền chủ tể trong mệnh cục.`);

        const ministerMap = { 'Mộc': 'Thủy', 'Hỏa': 'Mộc', 'Thổ': 'Hỏa', 'Kim': 'Thổ', 'Thủy': 'Kim' };
        const ministerEl = ministerMap[rulerEl];
        if (scores[ministerEl] > 15) {
            results.push(`• **Thần (Tể Tướng)**: Hành **${ministerEl}** đắc lực, phò tá Quân vương giữ vững cục diện.`);
        } else {
            results.push(`• **Thần (Tể Tướng)**: Thiếu vắng sự hỗ trợ của ${ministerEl}, Quân vương đơn độc, cách cục khó hiển đạt cao.`);
        }
        results.push("• **Tá Sứ**: Các hành phụ trợ giúp mệnh cục cân bằng, tránh sự thiên lệch thái quá.");
    }

    // 4. Xung Chiến Strategic
    results.push("\n[XUNG CHIẾN CHI TIẾT]");
    const clashes = [['子', '午'], ['卯', '酉'], ['寅', '申'], ['巳', '亥'], ['辰', '戌'], ['丑', '未']];
    let foundClash = false;
    clashes.forEach(([c1, c2]) => {
        if (zhis.includes(c1) && zhis.includes(c2)) {
            foundClash = true;
            const e1 = ganzhi.zhiToElement(c1);
            const e2 = ganzhi.zhiToElement(c2);
            const s1 = scores[e1] || 0;
            const s2 = scores[e2] || 0;

            let outcome = "";
            if (Math.abs(s1 - s2) < 10) {
                outcome = "**Xung nhi phát** (Kích hoạt năng lượng tốt, rèn luyện bản thân).";
            } else {
                const stronger = s1 > s2 ? ganzhi.zhiToVN(c1) : ganzhi.zhiToVN(c2);
                outcome = `**Xung nhi bại** (Bên yếu hơn bị tổn thương). Trục **${stronger}** thắng thế.`;
            }
            results.push(`• **Xung ${ganzhi.zhiToVN(c1)}-${ganzhi.zhiToVN(c2)}**: Kết quả ${outcome}`);
        }
    });
    if (!foundClash) results.push("• Không có xung chiến trực diện giữa các địa chi, khí thế yên bình.");

    // 5. Thần Khí & Vitality
    results.push("\n[THẦN KHÍ VÀ LƯU THÔNG]");
    let flowCount = 0;
    for (let i = 0; i < gans.length - 1; i++) {
        const e1 = ganzhi.ganToElement(gans[i]);
        const e2 = ganzhi.ganToElement(gans[i + 1]);
        if (ganzhi.generates(e1, e2)) flowCount++;
    }
    if (flowCount >= 2) results.push("• **Thần Khí**: Khí thế lưu thông từ Trụ Năm đến Trụ Giờ. Đây là tượng của vĩ nhân, quý hiển.");
    else if (flowCount === 1) results.push("• **Thần Khí**: Khí thế có sự kết nối nhưng chưa thông suốt toàn cục.");
    else results.push("• **Thần Khí**: Khí thế bị ngưng trệ, các trụ rời rạc, cần nỗ lực lớn để khai thông vận mệnh.");

    // 6. Thanh - Trọc
    results.push("\n[THANH - TRỌC]");
    const dominantEl = sortedScores[0] ? sortedScores[0][0] : null;
    if (dominantEl && scores[dominantEl] > 40 && Object.values(scores).filter(s => s >= 25).length === 1) {
        results.push("• **Thanh Cục**: Khí thế một hành chuyên nhất, không bị tạp khí làm nhiễu. Đây là tượng của bậc thuần khiết, chuyên tâm.");
    } else if (Object.values(scores).filter(s => s > 20).length >= 4) {
        results.push("• **Trọc Cục**: Ngũ hành hỗn tạp, nhiều lực lượng tranh chấp. Tâm tư dễ xao nhãng, cuộc sống nhiều biến động, cần hành vận 'Khứ lưu' mới phát.");
    } else {
        results.push("• **Trung Dung**: Khí thế điều hòa, không quá thanh cũng không quá trọc.");
    }

    // 7. Khô - Thấp
    results.push("\n[KHÔ - THẤP]");
    const dryCount = zhis.filter(z => "巳午未戌".includes(z)).length;
    const wetCount = zhis.filter(z => "亥子丑辰".includes(z)).length;
    if (dryCount >= 3) results.push("• **Khô Táo**: Mệnh cục quá nóng khô, thiếu sự nhuận trạch. Tính tình cương trực nhưng dễ nóng nảy, sự nghiệp có lúc bốc cháy dữ dội nhưng khó bền.");
    else if (wetCount >= 3) results.push("• **Hàn Thấp**: Mệnh cục quá lạnh ẩm, thiếu dương khí. Tâm tư thâm trầm, sâu sắc nhưng dễ u uất, thiếu sự đột phá mạnh mẽ.");
    else results.push("• **Điều Hòa**: Hàn nhiệt vừa phải, khí thế trung chính.");

    // 8. Chân - Giả
    results.push("\n[CHÂN - GIẢ]");
    let foundRoot = false;
    gans.forEach(g => {
        zhis.forEach(z => {
            const tang = ganzhi.getTangCan(z);
            if (tang.some(t => t.can === ganzhi.ganToVN(g))) foundRoot = true;
        });
    });
    if (foundRoot) results.push("• **Chân Thần**: Thần nắm quyền có gốc rễ vững chắc ở địa chi, là người có thực tài, nói đi đôi với làm.");
    else results.push("• **Giả Thần**: Thần nắm quyền chỉ lộ ở Thiên can mà không có gốc ở Chi, dễ rơi vào tình trạng 'hữu danh vô thực'.");

    results.push("\n" + "=".repeat(50));
    results.push("*“Người có bệnh mới là quý, được thuốc mới là lạ. Trong mệnh có bệnh, đi đến vận gặp thuốc, thì phú quý không ai bằng.”* — Địch Thiên Tủy tôn chỉ.");

    return results;
}

module.exports = {
    analyzeDichThienTuy,
    STEM_ESSENCE
};
