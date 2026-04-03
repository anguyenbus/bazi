const ganzhi = require('../ganzhi');
const LUAN_DONG_LIB = require('./data/luan_dong_data');
let thoiGianLuan;
try {
    thoiGianLuan = require('../thoi_gian_luan');
} catch (e) {
    console.warn("Module thoi_gian_luan not found, skipping detailed LiuNian integration.");
}

/**
 * Phân tích Động (Dai Van & Luu Nien) - V4.1 Logic
 * - Markdown Output
 * - Key Mapping fix
 * - Thoi Gian Luan Integration
 */
function analyzeLuanDong(ctx, luanTinhResult) {
    const currentYear = new Date().getFullYear();
    const currentLuck = findCurrentLuckPillar(ctx, currentYear);
    if (!currentLuck) return null;

    const dayGan = ctx.gans[2];

    // Core specs
    const dungThans = (ctx.nguHanhResult && ctx.nguHanhResult.dung_than && ctx.nguHanhResult.dung_than.ngu_hanh)
        ? ctx.nguHanhResult.dung_than.ngu_hanh : [];
    const kyThans = (ctx.nguHanhResult && ctx.nguHanhResult.dung_than && ctx.nguHanhResult.dung_than.ky_than)
        ? ctx.nguHanhResult.dung_than.ky_than : [];

    // DM Strength
    const strengthStr = (ctx.nguHanhResult && ctx.nguHanhResult.scores && ctx.nguHanhResult.scores.suc_manh)
        ? ctx.nguHanhResult.scores.suc_manh.kl_cuong_nhuoc : "Trung hòa";
    const isStrong = strengthStr.includes("Vượng") || strengthStr.includes("Mạnh");
    const isWeak = strengthStr.includes("Nhược") || strengthStr.includes("Yếu");

    // --- A. PHÂN TÍCH ĐẠI VẬN ---
    const daiVanAnalysis = analyzeDaiVanV4(ctx, currentLuck, dayGan, dungThans, kyThans, isStrong, isWeak);

    // --- B. PHÂN TÍCH LƯU NIÊN ---
    const luuNienAnalysis = analyzeLuuNienV4(ctx, currentLuck, currentYear, dayGan, daiVanAnalysis.score, isStrong, isWeak);

    return {
        dai_van: daiVanAnalysis,
        luu_nien: luuNienAnalysis,
        intro: getRandomIntro()
    };
}

// === DAI VAN ANALYSIS V4 ===
function analyzeDaiVanV4(ctx, flow, dayGan, dungThans, kyThans, isStrong, isWeak) {
    const gan = flow.gan;
    const zhi = flow.zhi;
    const ganElem = ganzhi.ganToElement(gan);
    const zhiElem = ganzhi.zhiToElement(zhi);
    const dayGanElem = ganzhi.ganToElement(dayGan);

    // 1. BIẾN SỐ
    const variables = [
        `Giai đoạn: **${flow.start} - ${flow.end}** (Tuổi âm: ${flow.startAge}-${flow.endAge}).`,
        `Đại vận: **${gan} ${zhi}** (${ganzhi.getNapAm(gan, zhi)}).`,
        `Thế cục: ${isStrong ? 'Thân Vượng' : (isWeak ? 'Thân Nhược' : 'Trung Hòa')} nhập vận **${ganElem}**.`,
    ];

    // 2. HỘI TỤ
    const convergence = [];
    let score = 0;

    // 2.1. Ngu Hanh Tac Dong
    const interactType = getInteractType(dayGanElem, ganElem);
    const impactData = LUAN_DONG_LIB.ngu_hanh_van[interactType];

    if (impactData) {
        convergence.push(`**${impactData.title}**: ${impactData.general}`);
        const details = isStrong ? impactData.scenarios.strong_day_master : impactData.scenarios.weak_day_master;
        if (details) {
            convergence.push(`> ${details[0]}`);
            convergence.push(`> ${details[1]}`);
        }

        if (isStrong && (interactType === 'sinh' || interactType === 'tro')) score -= 1;
        else if (isWeak && (interactType === 'khac' || interactType === 'hao' || interactType === 'tiet')) score -= 1;
        else score += 1;
    }

    // 2.2. Dung Than
    if (dungThans.includes(ganElem)) {
        convergence.push(`💎 Can vận là **Dụng Thần** (${ganElem}) -> Đắc Thiên Thời, rất tốt.`);
        score += 2;
    } else if (kyThans.includes(ganElem)) {
        convergence.push(`🔥 Can vận là **Kỵ Thần** (${ganElem}) -> Nghịch Thiên Thời, trắc trở.`);
        score -= 2;
    }

    // 2.3. Thap Than
    const godCode = ganzhi.getThapThan(dayGan, gan);
    const godName = mapGodName(godCode);
    const godData = LUAN_DONG_LIB.thap_than_ung_ky[godName];
    if (godData) {
        convergence.push(`**Vận ${godName} (${godData.keywords}):**`);
        convergence.push(`- ${godData.detail}`);
    } else {
        convergence.push(`Vận ${godName} (${godCode})`);
    }

    // 2.4. Dia Chi Chi Tiet
    const zhis = ctx.zhis;
    const zhiImpacts = checkZhiInteractionsV4(zhi, zhis);
    zhiImpacts.forEach(imp => convergence.push(`- ${imp}`));
    if (zhiImpacts.some(i => i.includes("tương xung"))) score -= 1;

    // 3. LUẬN GIẢI CHIẾN LƯỢC
    let conclusion = "";

    // Pick Strategy
    let strategyKey = 'du_kich';
    if (score >= 2) strategyKey = 'tan_cong';
    else if (score <= -1) strategyKey = 'phong_thu';

    const strategy = LUAN_DONG_LIB.chien_luoc_v4[strategyKey];

    conclusion += `**${strategy.name}**\n\n`;
    conclusion += `_"${strategy.desc}"_\n\n`;
    conclusion += `**👉 KẾ HOẠCH HÀNH ĐỘNG:**\n\n`;
    strategy.actions.forEach(act => conclusion += `- ${act}\n`);
    conclusion += `\n`;

    if (godData) {
        conclusion += `**💡 LỜI KHUYÊN RIÊNG:**\n${godData.advice}\n\n`;
    }

    if (impactData && impactData.poem) {
        conclusion += `_"${impactData.poem}"_`;
    }

    return { variables, convergence, conclusion, score, gan, zhi };
}

// === LUU NIEN ANALYSIS V4 ===
function analyzeLuuNienV4(ctx, currentLuck, year, dayGan, luckScore, isStrong, isWeak) {
    const gan = getYearGan(year);
    const zhi = getYearZhi(year);
    const godCode = ganzhi.getThapThan(dayGan, gan);
    const godName = mapGodName(godCode);
    const godData = LUAN_DONG_LIB.thap_than_ung_ky[godName];

    // 1. BIẾN SỐ
    const variables = [
        `Năm: **${year} (${gan} ${zhi})** - ${ganzhi.getNapAm(gan, zhi)}.`,
        `Thần sát: **${godName}** nắm quyền.`,
        `Bối cảnh: ${luckScore >= 1 ? 'Thuận Vận' : (luckScore <= -1 ? 'Nghịch Vận' : 'Bình Vận')}.`
    ];

    // 2. HỘI TỤ
    const convergence = [];

    // 2.1 Luu Nien vs Luck
    if (isZhiClash(zhi, currentLuck.zhi)) {
        convergence.push(`⚠️ **Lưu Niên xung Đại Vận:** Nền tảng bị lung lay, năm nhiều biến động.`);
    }

    // 2.2 Event Tags
    if (godData && godData.event_tags) {
        convergence.push(`🎲 **Sự kiện dễ gặp:** ${godData.event_tags.join(' - ')}.`);
    }

    // 2.3 Chart Interactions
    const chartImpacts = checkZhiInteractionsV4(zhi, ctx.zhis);
    chartImpacts.forEach(imp => convergence.push(`- Tác động gốc: ${imp}`));

    // 3. KẾT LUẬN & THỜI GIAN LUẬN
    let conclusion = "";

    // Merge Thoi Gian Luan Evaluations
    if (thoiGianLuan && thoiGianLuan.analyzeLiuNian) {
        try {
            const richData = thoiGianLuan.analyzeLiuNian(ctx, year);
            if (richData && richData.evaluations) {
                conclusion += `**PHÂN TÍCH TOÀN DIỆN ${year}:**\n\n`;
                const evuls = richData.evaluations;
                conclusion += `- 💼 **Sự Nghiệp**: ${evuls.career.status} - ${evuls.career.desc}\n`;
                conclusion += `- 💰 **Tài Lộc**: ${evuls.wealth.status} - ${evuls.wealth.desc}\n`;
                conclusion += `- ❤️ **Tình Cảm**: ${evuls.love.status} - ${evuls.love.desc}\n`;
                conclusion += `- 🏥 **Sức Khỏe**: ${evuls.health.status} - ${evuls.health.desc}\n\n`;
            }
        } catch (err) {
            console.log("ThoiGianLuan Error", err);
        }
    }

    if (godData) {
        conclusion += `**DỰ BÁO CHI TIẾT:**\n\n`;
        conclusion += `${godData.detail}\n\n`;
        conclusion += `**👉 LƯU Ý:**\n${godData.advice}`;
    }

    return { variables, convergence, conclusion };
}

// --- UTILS ---

function mapGodName(code) {
    const map = {
        'Tỷ': 'Tỷ Kiên', 'Tỉ': 'Tỷ Kiên',
        'Kiếp': 'Kiếp Tài',
        'Thực': 'Thực Thần',
        'Thương': 'Thương Quan',
        'Tài+': 'Thiên Tài', // Assuming Same Polarity
        'Tài-': 'Chính Tài', // Assuming Diff Polarity
        'Quan': 'Chính Quan',
        'Sát': 'Thất Sát',
        'Ấn': 'Chính Ấn',
        'Kiêu': 'Thiên Ấn'
    };
    return map[code] || code;
}

function getRandomIntro() {
    const list = LUAN_DONG_LIB.intro_sentences;
    return list[Math.floor(Math.random() * list.length)];
}

function checkZhiInteractionsV4(targetZhi, chartZhis) {
    const impacts = [];
    const targetVN = ganzhi.zhiToVN(targetZhi);
    const clashPairs = [
        { pair: ['Tý', 'Ngọ'], key: 'xung_ti_ngo' },
        { pair: ['Sửu', 'Mùi'], key: 'xung_suu_mui' },
        { pair: ['Dần', 'Thân'], key: 'xung_dan_than' },
        { pair: ['Mão', 'Dậu'], key: 'xung_mao_dau' },
        { pair: ['Thìn', 'Tuất'], key: 'xung_thin_tuat' },
        { pair: ['Tỵ', 'Hợi'], key: 'xung_ty_hoi' }
    ];
    const posKeys = ['tru_nam', 'tru_thang', 'tru_ngay', 'tru_gio'];

    chartZhis.forEach((z, i) => {
        const zVN = ganzhi.zhiToVN(z);
        const match = clashPairs.find(p => (p.pair[0] === targetVN && p.pair[1] === zVN) || (p.pair[0] === zVN && p.pair[1] === targetVN));
        if (match) {
            const detailXung = LUAN_DONG_LIB.dia_chi_chi_tiet[match.key];
            const area = LUAN_DONG_LIB.cung_vi[posKeys[i]];
            if (detailXung && area) {
                impacts.push(`**${detailXung.split(':')[0]}** tại ${area.area}: ${area.meaning.split(':')[1]}`);
            }
        }
    });
    return impacts;
}


function findCurrentLuckPillar(ctx, currentYear) {
    if (!ctx.luck_pillars || ctx.luck_pillars.length === 0) return null;
    return ctx.luck_pillars.find(p => currentYear >= p.start && currentYear <= p.end);
}

function getYearGan(year) {
    const idx = (year - 4) % 10;
    return ganzhi.GANS_VN[idx < 0 ? idx + 10 : idx];
}

function getYearZhi(year) {
    const idx = (year - 4) % 12;
    return ganzhi.ZHIS_VN[idx < 0 ? idx + 12 : idx];
}

function getInteractType(dayElem, targetElem) {
    if (dayElem === targetElem) return 'tro';
    if (ganzhi.generates(targetElem, dayElem)) return 'sinh';
    if (ganzhi.generates(dayElem, targetElem)) return 'tiet';
    if (ganzhi.controls(targetElem, dayElem)) return 'khac';
    if (ganzhi.controls(dayElem, targetElem)) return 'hao';
    return '';
}

function isZhiClash(z1, z2) {
    const pairs = [['Tý', 'Ngọ'], ['Sửu', 'Mùi'], ['Dần', 'Thân'], ['Mão', 'Dậu'], ['Thìn', 'Tuất'], ['Tỵ', 'Hợi']];
    return pairs.some(p => (p[0] === z1 && p[1] === z2) || (p[0] === z2 && p[1] === z1));
}

module.exports = { analyzeLuanDong };
