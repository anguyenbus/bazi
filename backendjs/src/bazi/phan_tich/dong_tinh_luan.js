/**
 * Phân tích Động Tĩnh Luận (Natal Chart vs Flowing Years/Luck)
 */

const ganzhi = require('../ganzhi');
const { calculateDaiVan, getCurrentDaiVan } = require('../dayun');
const { createSeededRandom } = require('../../utils/random');


function analyzeDongTinhLuan(ctx) {
    const gans = ctx.gans;
    const zhis = ctx.zhis;
    const yun = ctx.yun;
    const results = ["==== ĐỘNG TĨNH LUẬN: ĐẠI VẬN KÍCH HOẠT ===="];

    // Get current Dai Van
    let daYuns = ctx.dai_van;
    if (!daYuns) {
        daYuns = calculateDaiVan(ctx);
    }

    const yearBorn = ctx.solar.getYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearBorn;
    const currentYun = getCurrentDaiVan(daYuns, age);

    if (!currentYun) {
        return ["Không có dữ liệu Đại Vận tương ứng với lứa tuổi hiện tại hoặc chưa khởi Đại vận."];
    }

    // Assuming currentYun has gan and zhi properties or getGanZhi method
    // Let's use placeholders as per previous pattern
    const yGan = currentYun.can_cn || '甲';
    const yZhi = currentYun.chi_cn || '子';
    const yEl = ganzhi.ganToElement(yGan);
    const yZhiEl = ganzhi.zhiToElement(yZhi);

    results.push(`\n[VẬN KHÍ HIỆN TẠI: ${ganzhi.ganToVN(yGan)}${ganzhi.zhiToVN(yZhi)}]`);

    const rng = createSeededRandom(`${ctx.solar.getYear()}-${ctx.solar.getMonth()}-${ctx.solar.getDay()}-${yGan}${yZhi}`);

    // 1. THIÊN ĐỘNG ĐỊA TĨNH
    results.push("\n[1. THIÊN ĐỘNG ĐỊA TĨNH]");
    if (gans.includes(yGan)) {
        results.push(`• **Thiên Động**: Can vận **${ganzhi.ganToVN(yGan)}** trùng với Can mệnh. Sự việc chủ về công danh, sự nghiệp sẽ 'Động' rõ rệt.`);
    } else {
        results.push(`• **Thiên Động**: Can vận **${ganzhi.ganToVN(yGan)}** đang dẫn dắt khí thế, nhưng chưa trực tiếp xung đột với can gốc.`);
    }

    if (zhis.includes(yZhi)) {
        results.push(`• **Địa Tĩnh**: Chi vận **${ganzhi.zhiToVN(yZhi)}** trùng với Chi mệnh (Phục ngâm). Năng lượng nội tại bị nén lại, chuẩn bị cho một sự thay đổi lớn từ bên trong.`);
    } else {
        results.push(`• **Địa Tĩnh**: Căn cơ địa chi đang ổn định, chưa bị vận khí lôi kéo mạnh mẽ.`);
    }

    // 2. ĐẠI VẬN KÍCH ĐỘNG
    results.push("\n[2. ĐẠI VẬN KÍCH ĐỘNG]");
    const scores = ctx.scores || {};
    const sortedScores = Object.entries(scores).sort((a, b) => a[1] - b[1]);
    const neededEl = sortedScores.length > 0 ? sortedScores[0][0] : '';

    if (yEl === neededEl) {
        const activationVariants = [
            `• **Kích Hoạt**: Can vận **${ganzhi.ganToVN(yGan)}** (${yEl}) chính là 'Dược' bổ khuyết. Một thần đang ngủ yên đã được đánh thức, thời cơ thuận lợi.`,
            `• **Vận Dược**: **${ganzhi.ganToVN(yGan)}** mang theo hành ${yEl} - chính xác là hành bạn đang cần. Đây là giai đoạn vàng để phát triển.`,
            `• **Cát Vận**: Đại vận này mang đến hành ${yEl} cần thiết. Như người khát gặp nước, mọi nỗ lực sẽ được đền đáp xứng đáng.`,
        ];
        results.push(rng.pick(activationVariants));
    } else {
        const defaultVariants = [
            `• **Trạng Thái**: Vận khí ${ganzhi.ganToVN(yGan)} chưa kích hoạt Dụng thần tối ưu. Đây là giai đoạn tích lũy, chuẩn bị cho vận tốt hơn.`,
            `• **Chuẩn Bị**: Đại vận hiện tại mang tính trung lập. Nên tập trung củng cố sức khỏe và các mối quan hệ.`,
        ];
        results.push(rng.pick(defaultVariants));
    }

    // 3. XUNG HÌNH BIẾN ĐỘNG
    results.push("\n[3. XUNG HÌNH BIẾN ĐỘNG]");
    const clashMap = { '子': '午', '午': '子', '卯': '酉', '酉': '卯', '寅': '申', '申': '寅', '巳': '亥', '亥': '巳', '辰': '戌', '戌': '辰', '丑': '未', '未': '丑' };
    const target = clashMap[yZhi];
    if (zhis.includes(target)) {
        const tEl = ganzhi.zhiToElement(target);
        const yScore = scores[yZhiEl] || 0;
        const tScore = scores[tEl] || 0;

        let motionType = "";
        if (yScore > tScore) {
            motionType = "**Xung phá** (Làm tan vỡ kết cấu tĩnh, vất vả, thay đổi ngoài ý muốn).";
        } else {
            motionType = "**Xung động** (Kích thích sự phát triển, thay đổi tích cực, chuyển mình).";
        }
        results.push(`• **Biến Động**: Chi vận **${ganzhi.zhiToVN(yZhi)}** xung với **${ganzhi.zhiToVN(target)}** trong mệnh. Loại: ${motionType}`);
    } else {
        results.push("• **Biến Động**: Không có xung đột trực diện giữa chi vận và chi mệnh, cục diện giữ được sự ổn định.");
    }

    // 4. TÀNG PHỤC KHỞI ĐỘNG
    results.push("\n[4. TÀNG PHỤC KHỞI ĐỘNG]");
    const triggered = [];
    zhis.forEach(z => {
        const hides = ganzhi.getTangCan(z).map(t => t.can);
        if (hides.includes(ganzhi.ganToVN(yGan))) {
            triggered.push(ganzhi.zhiToVN(z));
        }
    });
    if (triggered.length > 0) {
        results.push(`• **Tàng Phục**: Can vận **${ganzhi.ganToVN(yGan)}** lôi kéo các can tạng ẩn trong **${[...new Set(triggered)].join(', ')}** ra ngoài. Những năng lực hoặc sự cố tiềm ẩn sẽ lộ diện.`);
    } else {
        results.push("• **Tàng Phục**: Các thần ẩn giấu vẫn đang ngủ yên, chưa có dấu hiệu lộ diện trong vận này.");
    }

    // 5. DỤNG THẦN ĐỘNG TĨNH
    results.push("\n[5. DỤNG THẦN ĐỘNG TĨNH]");
    let isDynamic = false;
    zhis.forEach(z => {
        if (clashMap[z] === yZhi) isDynamic = true;
    });
    if (isDynamic) {
        results.push("• **Dụng Thần Trạng Thái**: Cách cục đang ở thế **Động**. Vận khí đang 'xới tung' các tiềm năng ngầm. Đây là lúc 'Hóa rồng' hoặc 'Xuống vực', cần quyết đoán.");
    } else {
        results.push("• **Dụng Thần Tràng Thái**: Cách cục ở thế **Tĩnh**. Mọi sự chuyển biến đều diễn ra chậm rãi, chắc chắn. Thích hợp cho việc xây dựng nền móng lâu dài.");
    }

    // 6. KÍCH HOẠT THẦN SÁT
    results.push("\n[6. KÍCH HOẠT THẦN SÁT]");
    const activeStars = ctx.allShens || [];
    const starMeanings = {
        "Thiên Ất": "Kích hoạt quý nhân trợ giúp, gặp hung hóa cát, có người nâng đỡ trong công việc.",
        "Lộc Thần": "Kích hoạt tài lộc, có cơ hội tăng thu nhập hoặc nhận được những khoản thưởng bất ngờ.",
        "Dương Nhẫn": "Kích hoạt sự quyết liệt, có thể dẫn đến tranh chấp hoặc thành công đột phá nếu được chế ngự.",
        "Dịch Mã": "Kích hoạt sự di chuyển, thay đổi nơi ở, công việc hoặc đi công tác xa.",
        "Hoa Cái": "Kích hoạt tư duy sáng tạo, nghệ thuật hoặc tâm linh, dễ cảm thấy cô độc.",
        "Đào Hoa": "Kích hoạt duyên dáng, quan hệ xã hội mở rộng, có lợi cho giao tiếp nhưng cần tiết chế.",
        "Thiên Hỷ": "Kích hoạt niềm vui, sự kiện tốt đẹp trong gia đình hoặc các mối quan hệ.",
        "Văn Xương": "Kích hoạt học vấn, thi cử, khả năng viết lách and tiếp thu kiến thức."
    };

    let foundStar = false;
    activeStars.forEach(star => {
        Object.entries(starMeanings).forEach(([key, desc]) => {
            if (star.includes(key)) {
                results.push(`• **Kích hoạt ${star}**: ${desc}`);
                foundStar = true;
            }
        });
    });
    if (!foundStar) results.push("• Hiện tại chưa có các thần sát quan trọng được kích hoạt mạnh mẽ.");

    results.push("\n" + "=".repeat(50));
    results.push("*“Càn là động, Chi là tĩnh. Vận đến sẽ lôi cuốn các thần trong Tứ trụ ra để ứng nghiệm cát hung.”* — Động Tĩnh Luận tôn chỉ.");

    return results;
}

module.exports = {
    analyzeDongTinhLuan
};
