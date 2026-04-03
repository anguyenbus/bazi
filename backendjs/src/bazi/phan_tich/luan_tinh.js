const LUAN_TINH_LIB = require('./data/luan_tinh_data');
const ganzhi = require('../ganzhi');

/**
 * Phân tích Luận Tĩnh Đa Biến (V6.0 - 1000x Data Integrated)
 */
function analyzeLuanTinh(ctx) {
    const dayGan = ctx.gans[2];
    const dayZhi = ctx.zhis[2];
    const monthZhi = ctx.zhis[1];

    // Safety check for nguHanhResult
    const nguHanhResult = ctx.nguHanhResult || {};

    // --- 1. TÍNH CÁCH & TỔNG QUAN ---
    const personality = analyzePersonalityRich(ctx, dayGan, dayZhi, monthZhi, nguHanhResult);

    // --- 2. SỰ NGHIỆP & TÀI LỘC ---
    const career = analyzeCareerRich(ctx, dayGan, monthZhi, nguHanhResult);

    // --- 3. HÔN NHÂN & SỨC KHỎE ---
    const marriage = analyzeMarriageRich(ctx, dayGan, dayZhi, nguHanhResult);

    // --- 4. THẦN SÁT ---
    const stars = detectStars(ctx);

    // --- 5. METADATA FOR ENGINE ---
    const dmElement = ganzhi.ganToElement(dayGan);
    const metadata = {
        day_master: {
            gan: dayGan,
            ganVN: ganzhi.ganToVN(dayGan),
            element: dmElement
        },
        strength: (ctx.scores && ctx.scores.suc_manh)
            ? (ctx.scores.suc_manh.kl_cuong_nhuoc || (ctx.scores.suc_manh.la_nhuoc ? "Thân Nhược" : "Thân Vượng"))
            : "Trung hòa",
        dominant_god: getDominantGod(ctx, dayGan),
        favorable_elements: ganzhi.getFavorable(dmElement),
        unfavorable_elements: ganzhi.getUnfavorable(dmElement),
        stars: stars,
        clashes: getPalaceClashes(ctx)
    };

    return { personality, career, marriage, stars, metadata };
}

function getPalaceClashes(ctx) {
    const clashes = [];
    const zhis = ctx.zhis; // Year, Month, Day, Hour
    const palaceNames = ['Năm (Tổ nghiệp)', 'Tháng (Cha mẹ/Anh em)', 'Ngày (Phu quân/Bản thân)', 'Giờ (Con cái)'];

    for (let i = 0; i < zhis.length; i++) {
        for (let j = i + 1; j < zhis.length; j++) {
            if (isZhiClash(zhis[i], zhis[j])) {
                clashes.push({
                    palaces: [palaceNames[i], palaceNames[j]],
                    detail: `${ganzhi.zhiToVN(zhis[i])} xung ${ganzhi.zhiToVN(zhis[j])}`
                });
            }
        }
    }
    return clashes;
}

function detectStars(ctx) {
    const dayGanVN = ganzhi.ganToVN(ctx.gans[2]);
    const yearZhiVN = ganzhi.zhiToVN(ctx.zhis[0]);
    const dayZhiVN = ganzhi.zhiToVN(ctx.zhis[2]);
    const allZhisVN = ctx.zhis.map(z => ganzhi.zhiToVN(z));

    const foundStars = [];

    // 1. Thiên Ất Quý Nhân (Simplified logic)
    const quyNhanMap = {
        'Giáp': ['Sửu', 'Mùi'], 'Mậu': ['Sửu', 'Mùi'],
        'Ất': ['Tý', 'Thân'], 'Kỷ': ['Tý', 'Thân'],
        'Bính': ['Hợi', 'Dậu'], 'Đinh': ['Hợi', 'Dậu'],
        'Canh': ['Dần', 'Ngọ'], 'Tân': ['Dần', 'Ngọ'],
        'Nhâm': ['Mão', 'Tỵ'], 'Quý': ['Mão', 'Tỵ']
    };
    const targetQuyNhan = quyNhanMap[dayGanVN] || [];
    if (allZhisVN.some(z => targetQuyNhan.includes(z))) foundStars.push('Quý Nhân');

    // 2. Đào Hoa
    const daoHoaMap = {
        'Thân': 'Dậu', 'Tý': 'Dậu', 'Thìn': 'Dậu',
        'Dần': 'Mão', 'Ngọ': 'Mão', 'Tuất': 'Mão',
        'Hợi': 'Tý', 'Mão': 'Tý', 'Mùi': 'Tý',
        'Tỵ': 'Ngọ', 'Dậu': 'Ngọ', 'Sửu': 'Ngọ'
    };
    const targetDaoHoaYear = daoHoaMap[yearZhiVN];
    const targetDaoHoaDay = daoHoaMap[dayZhiVN];
    if (allZhisVN.includes(targetDaoHoaYear) || allZhisVN.includes(targetDaoHoaDay)) foundStars.push('Đào Hoa');

    // 3. Dịch Mã
    const dichMaMap = {
        'Thân': 'Dần', 'Tý': 'Dần', 'Thìn': 'Dần',
        'Dần': 'Thân', 'Ngọ': 'Thân', 'Tuất': 'Thân',
        'Hợi': 'Tỵ', 'Mão': 'Tỵ', 'Mùi': 'Tỵ',
        'Tỵ': 'Hợi', 'Dậu': 'Hợi', 'Sửu': 'Hợi'
    };
    if (allZhisVN.includes(dichMaMap[yearZhiVN]) || allZhisVN.includes(dichMaMap[dayZhiVN])) foundStars.push('Dịch Mã');

    // 4. Văn Xương
    const vanXuongMap = {
        'Giáp': 'Tỵ', 'Ất': 'Ngọ', 'Bính': 'Thân', 'Đinh': 'Dậu', 'Mậu': 'Thân',
        'Kỷ': 'Dậu', 'Canh': 'Hợi', 'Tân': 'Tý', 'Nhâm': 'Dần', 'Quý': 'Mão'
    };
    if (allZhisVN.includes(vanXuongMap[dayGanVN])) foundStars.push('Văn Xương');

    // 5. Cô Quả
    const coMap = { 'Dần': 'Tỵ', 'Mão': 'Tỵ', 'Thìn': 'Tỵ', 'Tỵ': 'Thân', 'Ngọ': 'Thân', '未': 'Thân', 'Thân': 'Hợi', '酉': 'Hợi', 'Tuất': 'Hợi', 'Hợi': 'Dần', 'Tý': 'Dần', 'Sửu': 'Dần' }; // Simplified
    // Not critical for now, let's keep it simple.

    return foundStars;
}

// --- LOGIC GENERATORS ---

function analyzePersonalityRich(ctx, dayGan, dayZhi, monthZhi, nguHanh) {
    const dayGanVN = ganzhi.ganToVN(dayGan);
    const dayZhiVN = ganzhi.zhiToVN(dayZhi);
    const dayGanCode = removeDiacritics(dayGanVN);
    const fullPillar = `${dayGanVN} ${dayZhiVN}`;

    const strength = (nguHanh.scores && nguHanh.scores.suc_manh && nguHanh.scores.suc_manh.kl_cuong_nhuoc)
        ? nguHanh.scores.suc_manh.kl_cuong_nhuoc : "Trung hòa";
    const isStrong = strength.includes("Vượng") || strength.includes("Mạnh");
    const isWeak = strength.includes("Nhược") || strength.includes("Yếu");
    const generalKey = isStrong ? 'than_vuong' : (isWeak ? 'than_nhuoc' : 'trung_hoa');
    const generalData = LUAN_TINH_LIB.tong_quan[generalKey] || {};

    // Personalization from context
    const xungHo = ctx.xungHo || { menh: 'mệnh chủ', vo_chong: 'bạn đời' };
    const giaiDoan = ctx.giaiDoanDoi || '';
    const tuoi = ctx.tuoi || 0;

    // 1. BIẾN SỐ
    const variables = [
        `${xungHo.menh ? xungHo.menh.charAt(0).toUpperCase() + xungHo.menh.slice(1) : 'Mệnh chủ'} có Nhật chủ: **${dayGanVN}** (${ganzhi.GAN_YIN_YANG[dayGanVN] || "Âm/Dương"}).`,
        `Thân thế: **${strength}** (${generalData.keyword || ''}).`,
        `Trụ ngày: **${fullPillar}** - ${ganzhi.getNapAm(dayGan, dayZhi)}.`,
        `Cấu trúc: ${getDominantGod(ctx, dayGan)} cách.`,
        tuoi ? `Tuổi hiện tại: **${tuoi}** (${giaiDoan}).` : ''
    ].filter(v => v);

    // 2. HỘI TỤ
    const convergence = [];
    const libCore = LUAN_TINH_LIB.tinh_cach[dayGanCode] || {};

    // Day Master Core
    if (libCore.core) convergence.push(`Bản chất: ${libCore.core.join(' - ')} (${libCore.desc}).`);

    // 60 Jia Zi Specifics
    const pillarData = LUAN_TINH_LIB.tinh_cach.hoa_giap ? LUAN_TINH_LIB.tinh_cach.hoa_giap[fullPillar] : null;
    if (pillarData) {
        convergence.push(`Đặc tính Trụ Ngày: ${pillarData.personality}`);
        convergence.push(`Hình tượng: ${pillarData.image}`);
    } else {
        const image = ganzhi.getNapAm(dayGan, dayZhi);
        convergence.push(`Nạp âm Trụ Ngày: ${image}. Ảnh hưởng tâm tính, cần tu dưỡng.`);
    }

    // Age-specific insight
    if (giaiDoan === 'Thanh niên') {
        convergence.push(`Giai đoạn hiện tại: Đang trong thời kỳ xây dựng nền tảng, cần chú trọng học hỏi và phát triển bản thân.`);
    } else if (giaiDoan === 'Trung niên sớm') {
        convergence.push(`Giai đoạn hiện tại: Thời điểm vàng để phát triển sự nghiệp, cân bằng gia đình và công việc.`);
    } else if (giaiDoan === 'Trung niên') {
        convergence.push(`Giai đoạn hiện tại: Thời kỳ ổn định và thu hoạch, cần giữ gìn sức khỏe và đức hạnh.`);
    } else if (giaiDoan.includes('Lão')) {
        convergence.push(`Giai đoạn hiện tại: Thời kỳ an nhàn, truyền đạt kinh nghiệm và hưởng phúc từ con cháu.`);
    }

    // 3. LUẬN GIẢI
    let conclusion = `<b>I. KHÍ CHẤT TỔNG QUAN:</b><br/>${generalData.intro}<br/><br/>`;
    conclusion += `<b>II. CHIẾN LƯỢC CÂN BẰNG:</b><br/>${generalData.balance_advice}`;

    if (pillarData && pillarData.advice) {
        conclusion += `<br/><br/>💡 <b>Lời khuyên riêng cho ${fullPillar}:</b> ${pillarData.advice}`;
    }

    // Embed Health
    const healthInfo = getHealthAnalysis(nguHanh);
    if (healthInfo) {
        conclusion += `<br/><br/><b>IV. CẢNH BÁO SỨC KHỎE:</b><br/>${healthInfo}`;
    } else {
        conclusion += `<br/><br/><b>IV. CẢNH BÁO SỨC KHỎE:</b> Ngũ hành tương đối cân bằng, chú ý duy trì lối sống lành mạnh.`;
    }

    return { variables, convergence, conclusion };
}

function analyzeCareerRich(ctx, dayGan, monthZhi, nguHanh) {
    const dungThans = (nguHanh.dung_than && nguHanh.dung_than.ngu_hanh) ? nguHanh.dung_than.ngu_hanh : [];
    const usefulGod = dungThans.length > 0 ? dungThans[0] : null;
    const domGod = getDominantGod(ctx, dayGan);
    const domGodCode = getGodCode(domGod);

    // Personalization
    const xungHo = ctx.xungHo || { tài_loc: 'tài lộc' };
    const giaiDoan = ctx.giaiDoanDoi || '';
    const tuoi = ctx.tuoi || 0;

    // 1. BIẾN SỐ
    const variables = [
        `Dụng thần ưu tiên: **${usefulGod || 'Đang xác định'}**.`,
        `Thập thần chủ đạo: **${domGod}**.`,
        tuoi ? `Tuổi nghề nghiệp: **${tuoi}** tuổi (${giaiDoan}).` : ''
    ].filter(v => v);

    // 2. HỘI TỤ
    const convergence = [];
    const usefulCareer = usefulGod ? (LUAN_TINH_LIB.nghe_nghiep.by_useful_god[usefulGod] || {}) : {};
    const behaviorCareer = LUAN_TINH_LIB.nghe_nghiep.by_dominant_god[domGod] || "";

    if (usefulCareer.industry) convergence.push(`Ngành nghề thuận Dụng Thần (${usefulGod}): ${usefulCareer.industry}`);
    if (behaviorCareer) convergence.push(`Phong cách phù hợp (${domGod}): ${behaviorCareer}`);

    // Age-specific career insight
    if (giaiDoan === 'Thanh niên') {
        convergence.push(`Lời khuyên ${giaiDoan}: Nên tích lũy kinh nghiệm, học hỏi đa dạng, không nên vội vàng khởi nghiệp.`);
    } else if (giaiDoan === 'Trung niên sớm') {
        convergence.push(`Lời khuyên ${giaiDoan}: Thời điểm thích hợp để thăng tiến hoặc tự kinh doanh, cần mở rộng quan hệ.`);
    } else if (giaiDoan === 'Trung niên') {
        convergence.push(`Lời khuyên ${giaiDoan}: Nên củng cố vị trí, đào tạo thế hệ kế thừa, tránh mạo hiểm quá lớn.`);
    } else if (giaiDoan.includes('Lão')) {
        convergence.push(`Lời khuyên ${giaiDoan}: Thời điểm làm cố vấn, chia sẻ kinh nghiệm, hoặc kinh doanh nhẹ nhàng.`);
    }

    const wealthGods = countGods(ctx, dayGan, ['Chính Tài', 'Thiên Tài']);
    if (wealthGods >= 2) convergence.push("Tài tinh vượng -> Có duyên với thương mại, tài chính.");

    // 3. LUẬN GIẢI
    let conclusion = `<b>III. ĐỊNH HƯỚNG NGHỀ NGHIỆP:</b><br/>`;
    if (usefulCareer.industry) {
        conclusion += `- <b>Ngành nghề thịnh vượng:</b> ${usefulCareer.industry}<br/>`;
        conclusion += `- <b>Vai trò phù hợp:</b> ${usefulCareer.role}<br/>`;
    }

    const strength = (nguHanh.scores && nguHanh.scores.suc_manh && nguHanh.scores.suc_manh.kl_cuong_nhuoc) || "";
    const isStrong = strength.includes("Vượng") || strength.includes("Mạnh");
    const orientation = isStrong ? LUAN_TINH_LIB.nghe_nghiep.orientation.strong : LUAN_TINH_LIB.nghe_nghiep.orientation.weak;

    conclusion += `<br/><b>Chiến lược phát triển:</b> ${orientation}`;

    const wPattern = getWealthPattern(ctx, dayGan, isStrong, wealthGods);
    if (wPattern) {
        conclusion += `<br/><br/><b>V. GÓC NHÌN TÀI CHÍNH (${xungHo.tài_loc}):</b> ${wPattern}`;
    }

    return { variables, convergence, conclusion };
}

function analyzeMarriageRich(ctx, dayGan, dayZhi, nguHanh) {
    const dayGanVN = ganzhi.ganToVN(dayGan);
    const dayZhiVN = ganzhi.zhiToVN(dayZhi);
    const dayGanElem = ganzhi.ganToElement(dayGan);
    const dayZhiElem = ganzhi.zhiToElement(dayZhi);
    const relation = getElementRelationSimple(dayGanElem, dayZhiElem);
    const isFemale = ctx.isFemale;

    // 1. BIẾN SỐ
    const variables = [
        `Cung Phu Thê: **${dayZhiVN}** (${dayZhiElem}) - ${relation} với Nhật Chủ.`,
        `Sao Phối Ngẫu: ${isFemale ? 'Quan/Sát' : 'Tài Tinh'}.`
    ];

    // 2. HỘI TỤ
    const convergence = [];
    const scenario = LUAN_TINH_LIB.hon_nhan.scenarios[relation] || "";
    if (scenario) convergence.push(scenario);

    // Check Clash
    if (isZhiClash(ctx.zhis[1], dayZhi)) convergence.push("Bị Nguyệt lệnh xung -> Hôn nhân dễ có sóng gió từ bên ngoài (gia đình, hoàn cảnh).");

    // 3. LUẬN GIẢI
    let conclusion = `<b>IV. HÔN NHÂN & GIA ĐẠO:</b><br/>`;
    if (relation === 'Tương Sinh' || relation === 'Tương Hòa') {
        conclusion += LUAN_TINH_LIB.hon_nhan.general_advice.harmony;
    } else {
        conclusion += LUAN_TINH_LIB.hon_nhan.general_advice.conflict;
    }

    conclusion += " " + (isStrongMarriage(ctx) ? LUAN_TINH_LIB.hon_nhan.general_advice.late : "");

    conclusion += `<br/><br/><b>Hình mẫu phù hợp:</b> `;
    if (isFemale) {
        conclusion += LUAN_TINH_LIB.hon_nhan.partner_qualities.female["Quan Tinh"] || "Người có trách nhiệm.";
    } else {
        conclusion += LUAN_TINH_LIB.hon_nhan.partner_qualities.male["Tài Tinh"] || "Người biết vun vén.";
    }

    return { variables, convergence, conclusion };
}

// --- HELPER FUNCTIONS ---

function getHealthAnalysis(nguHanh) {
    if (!nguHanh.scores || !nguHanh.scores.ngu_hanh) return "";

    let text = "";
    Object.entries(nguHanh.scores.ngu_hanh).forEach(([el, score]) => {
        // Thresholds: defined roughly. Say < 10 is Weak, > 40 is Excess (Normalize to 100? Assuming % scores or relative)
        // If score is derived properly. Let's assume standard range ~20% is balanced.
        // < 10% is Weak. > 35% is Excess.
        if (score < 10 && LUAN_TINH_LIB.suc_khoe[el]) {
            text += `- <b>Hành ${el} suy yếu (${score}%):</b> ${LUAN_TINH_LIB.suc_khoe[el].weak}<br/>`;
        } else if (score > 40 && LUAN_TINH_LIB.suc_khoe[el]) {
            text += `- <b>Hành ${el} quá vượng (${score}%):</b> ${LUAN_TINH_LIB.suc_khoe[el].excess}<br/>`;
        }
    });
    return text || "Các hành tương đối cân bằng, sức khỏe ổn định.";
}

function getWealthPattern(ctx, dayGan, isStrong, wealthCount) {
    if (wealthCount > 2 && isStrong) return LUAN_TINH_LIB.tai_loc.patterns["Thân vượng Tài vượng"];
    if (wealthCount > 2 && !isStrong) return LUAN_TINH_LIB.tai_loc.patterns["Thân nhược Tài vượng"];
    return "Tài lộc đến từ sự tích lũy bền bỉ.";
}

function getDominantGod(ctx, dayGan) {
    const monthZhiGan = ganzhi.getZhiMainGan(ctx.zhis[1]);
    return ganzhi.getThapThan(dayGan, monthZhiGan) || "Tỷ Kiên";
}

function getGodCode(godName) {
    const map = { 'Thực Thần': 'Thuc_Than', 'Thương Quan': 'Thuong_Quan', 'Chính Tài': 'Chinh_Tai', 'Thiên Tài': 'Thien_Tai', 'Chính Quan': 'Chinh_Quan', 'Thất Sát': 'That_Sat', 'Chính Ấn': 'Chinh_An', 'Thiên Ấn': 'Thien_An', 'Tỷ Kiên': 'Ty_Kien', 'Kiếp Tài': 'Kiep_Tai' };
    return map[godName] || 'Thuc_Than';
}

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

function getElementRelationSimple(e1, e2) {
    if (e1 === e2) return 'Tương Hòa';
    const cycles = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'];
    const idx1 = cycles.indexOf(e1);
    const idx2 = cycles.indexOf(e2);
    if ((idx1 + 1) % 5 === idx2) return 'Tương Sinh';
    if ((idx2 + 1) % 5 === idx1) return 'Tương Sinh';
    return 'Tương Khắc';
}

function countGods(ctx, dayGan, targets) {
    let c = 0;
    ctx.gans.forEach((g, i) => { if (i !== 2 && targets.includes(ganzhi.getThapThan(dayGan, g))) c++; });
    return c;
}

function isZhiClash(z1, z2) {
    const pairs = [['Tý', 'Ngọ'], ['Sửu', 'Mùi'], ['Dần', 'Thân'], ['Mão', 'Dậu'], ['Thìn', 'Tuất'], ['Tỵ', 'Hợi']];
    const z1vn = ganzhi.zhiToVN(z1);
    const z2vn = ganzhi.zhiToVN(z2);
    return pairs.some(p => (p[0] === z1vn && p[1] === z2vn) || (p[0] === z2vn && p[1] === z1vn));
}

function isStrongMarriage(ctx) { return false; } // Placeholder

module.exports = { analyzeLuanTinh };
