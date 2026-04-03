/**
 * Shishen (Ten Gods) Analysis Index
 */

const { analyzeBiJian, analyzeJieCai, analyzeBiKiepGeneral } = require('./bijie');
const { analyzePianCai, analyzeZhengCai, analyzeCaiGeneral } = require('./cai');
const { analyzeGuan, analyzeSha } = require('./guansha');
const { analyzeShi, analyzeShang, analyzeShiShangGeneral } = require('./shishang');
const { analyzeYin, analyzeXiao, analyzeYinXiaoGeneral } = require('./yinxiao');
const ganzhi = require('../ganzhi');

// Local Hardcoded Maps for Robust Conversion (Safety Net)
const KANJI_GAN_VN = {
    '\u7532': 'Giáp', '\u4E59': 'Ất', '\u4E19': 'Bính', '\u4E01': 'Đinh', '\u620A': 'Mậu',
    '\u5DF1': 'Kỷ', '\u5E9A': 'Canh', '\u8F9B': 'Tân', '\u58EC': 'Nhâm', '\u7678': 'Quý'
};
const KANJI_ZHI_VN = {
    '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ',
    '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi'
};

function runAllShishenAnalyses(originalCtx) {
    // 1. Prepare Vietnamese Context (Normalize inputs)
    const gansVN = (originalCtx.gans || []).map(g => KANJI_GAN_VN[g] || ganzhi.ganToVN(g));
    const zhisVN = (originalCtx.zhis || []).map(z => KANJI_ZHI_VN[z] || ganzhi.zhiToVN(z));
    const dayGanVN = gansVN[2];

    // If dayGanVN is invalid, return empty
    if (!dayGanVN) return ["⚠️ Dữ liệu Thiên Can Nhật Trụ không hợp lệ."];

    const ctx = {
        ...originalCtx,
        me: dayGanVN,
        is_female: (originalCtx.isFemale !== undefined) ? originalCtx.isFemale : originalCtx.is_female,
        gans: gansVN,
        zhis: zhisVN,
        zhus: gansVN.map((g, i) => [g, zhisVN[i]]),
        isYangMe: ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(dayGanVN),

        // Recalculate Shens (always use VN Day Master)
        gan_shens: (originalCtx.gan_shens && originalCtx.gan_shens.length) ? originalCtx.gan_shens :
            (originalCtx.gans || []).map(g => ganzhi.getThapThan(dayGanVN, KANJI_GAN_VN[g] || ganzhi.ganToVN(g))),

        zhi_shens: (originalCtx.zhi_shens && originalCtx.zhi_shens.length) ? originalCtx.zhi_shens :
            (originalCtx.zhis || []).map(z => ganzhi.getThapThan(dayGanVN, ganzhi.getZhiMainGan(z))),

        zhi_shen3: (originalCtx.zhi_shen3 && originalCtx.zhi_shen3.length) ? originalCtx.zhi_shen3 :
            (originalCtx.zhis || []).map(z => Object.keys(ganzhi.ZHI5[z] || {}).map(t => ganzhi.getThapThan(dayGanVN, t))),
    };

    // Ensure flattened array
    ctx.shens2 = [...(ctx.gan_shens || []), ...(ctx.zhi_shens || [])];
    ctx.zhi_shens2 = (ctx.zhi_shen3 || []).flat();

    // Calculate Empties (Tuần Không)
    const calcEmpties = (gan, zhi) => {
        if (!gan || !zhi) return [];
        const GAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const ZHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        const gi = GAN.indexOf(gan);
        const zi = ZHI.indexOf(zhi);
        if (gi < 0 || zi < 0) return [];
        let diff = (zi - gi);
        if (diff < 0) diff += 12;
        const e1 = ZHI[(diff - 2 + 12) % 12];
        const e2 = ZHI[(diff - 1 + 12) % 12];
        return [e1, e2];
    };
    if (!originalCtx.empties) {
        ctx.empties = [
            calcEmpties(gansVN[0], zhisVN[0]),
            [],
            calcEmpties(gansVN[2], zhisVN[2]),
            []
        ];
    } else {
        // Assume origin empties are raw, maybe convert? 
        // Empties are usually Zhis. Convert to VN for safe comparison
        ctx.empties = originalCtx.empties.map(list => list.map(e => KANJI_ZHI_VN[e] || ganzhi.zhiToVN(e)));
    }


    let results = ["==== PHÂN TÍCH THẬP THẦN CHI TIẾT ===="];

    try {
        results = results.concat(analyzeBiJian(ctx));
        results = results.concat(analyzeJieCai(ctx));
        if (analyzeBiKiepGeneral) results = results.concat(analyzeBiKiepGeneral(ctx));

        results = results.concat(analyzePianCai(ctx));
        results = results.concat(analyzeZhengCai(ctx));
        if (analyzeCaiGeneral) results = results.concat(analyzeCaiGeneral(ctx));

        results = results.concat(analyzeGuan(ctx));
        results = results.concat(analyzeSha(ctx));

        results = results.concat(analyzeShi(ctx));
        results = results.concat(analyzeShang(ctx));
        if (analyzeShiShangGeneral) results = results.concat(analyzeShiShangGeneral(ctx));

        results = results.concat(analyzeYin(ctx));
        results = results.concat(analyzeXiao(ctx));
        if (analyzeYinXiaoGeneral) results = results.concat(analyzeYinXiaoGeneral(ctx));
    } catch (e) {
        console.error("Error running Shishen analysis:", e);
        results.push(`⚠️ Đã xảy ra lỗi trong quá trình phân tích: ${e.message}`);
    }

    if (results.length === 1) {
        results.push("• (Không có phân tích đặc biệt cho mệnh cục này)");
    }

    results.push("\n" + "=".repeat(40));
    results.push("*“Thập Thần là mười biểu tượng của cuộc đời, là sự biến hóa của Ngũ Hành trong dòng chảy nhân sinh.”*");

    return results;
}

module.exports = {
    analyzeBiJian,
    analyzeJieCai,
    analyzePianCai,
    analyzeZhengCai,
    analyzeGuan,
    analyzeSha,
    analyzeShi,
    analyzeShang,
    analyzeYin,
    analyzeXiao,
    runAllShishenAnalyses
};
