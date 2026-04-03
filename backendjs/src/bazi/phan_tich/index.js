const { analyzeBenhDuoc } = require('./benh_duoc');
const { analyzeDichThienTuy, STEM_ESSENCE } = require('./dich_thien_tuy');
const { analyzeDongTinhLuan } = require('./dong_tinh_luan');
const { analyzeKimBatHoan, VERSE_DB } = require('./kim_bat_hoan');
const { analyzeVongTrangSinh, LIFE_STAGES, STAGE_WEIGHTS } = require('./vong_trang_sinh');
const { analyzeHinhHaiPha, TAM_HINH, LUC_HAI, LUC_PHA } = require('./hinh_hai_pha');
const { analyzeTuBinhChanThuyen, STATUS } = require('./tu_binh_chan_thuyen');
const { analyzeCungThongBaoGiam, DIEU_HAU } = require('./cung_thong_bao_giam');
const { analyzeNapAmChuyenSau } = require('./nap_am_chuyen_sau');
const { analyzeLuanTinh } = require('./luan_tinh');
const { analyzeLuanDong } = require('./luan_dong');
const shishen = require('../shishen');

/**
 * Tam Mệnh Thông Hội - Three Lives Analysis
 * (Can be moved to separate file later if needed)
 */
function analyzeTamMenhThongHoi(ctx) {
    const ganzhi = require('../ganzhi');
    const results = [];
    const dayGan = ctx.gans[2];
    const dayZhi = ctx.zhis[2];
    const hourGan = ctx.gans[3];
    const hourZhi = ctx.zhis[3];

    results.push("==== TAM MỆNH THÔNG HỘI ====");
    results.push(`[PHÂN TÍCH NHẬT TRỤ: ${ganzhi.ganToVN(dayGan)} ${ganzhi.zhiToVN(dayZhi)}]`);

    // Simplified descriptions for common pillars
    const descriptions = {
        '甲子': 'Giáp Tý nhật: Hải Trung Kim. Cốt cách thanh cao, thông minh nhưng dễ lo lắng.',
        '乙丑': 'Ất Sửu nhật: Hải Trung Kim. Tính tình chắc chắn, bền bỉ, kiên nhẫn.',
        '丙寅': 'Bính Dần nhật: Lư Trung Hỏa. Năng động, nhiệt huyết, có tài lãnh đạo.',
        '丁卯': 'Đinh Mão nhật: Lư Trung Hỏa. Thông minh, nhạy cảm, có tài nghệ thuật.',
    };
    const key = `${dayGan}${dayZhi}`;
    results.push(descriptions[key] || `${ganzhi.ganToVN(dayGan)} ${ganzhi.zhiToVN(dayZhi)} nhật: Cốt cách đặc biệt, cần xem xét toàn bộ mệnh cục.`);

    results.push(`\n[PHÂN TÍCH GIỜ TRỤ: ${ganzhi.ganToVN(hourGan)} ${ganzhi.zhiToVN(hourZhi)}]`);
    const hourShishen = ganzhi.getThapThan(dayGan, hourGan);
    const shishenDesc = {
        'Tỷ': 'Giờ sinh có Tỷ kiên, anh em bạn bè trợ sức hậu vận.',
        'Kiếp': 'Giờ sinh có Kiếp tài, cẩn thận hao tài vào tuổi già.',
        'Thực': 'Giờ sinh có Thực thần, con cái hiếu thuận, phúc lộc hậu vận.',
        'Thương': 'Giờ sinh có Thương quan, con cái tài giỏi nhưng cứng đầu.',
        'Tài+': 'Giờ sinh có Chính tài, hậu vận có tài lộc, vợ con đề huề.',
        'Tài-': 'Giờ sinh có Thiên tài, hậu vận có nhiều cơ hội tài chính.',
        'Quan': 'Giờ sinh có Chính quan, con cái hiền lành, có danh tiếng.',
        'Sát': 'Giờ sinh có Thất sát, hậu vận có quyền lực nhưng cần cẩn thận.',
        'Ấn': 'Giờ sinh có Chính ấn, được con cái phụng dưỡng, an nhàn tuổi già.',
        'Kiêu': 'Giờ sinh có Thiên ấn, có trí tuệ đặc biệt nhưng dễ cô độc hậu vận.'
    };
    results.push(shishenDesc[hourShishen] || 'Giờ sinh cần phân tích kỹ trong bối cảnh toàn mệnh.');

    results.push(`\n"Tam Mệnh Thông Hội, lấy giờ sinh xét thành bại, luận cát hung theo ngũ thời." — Tam Mệnh tôn chỉ.`);

    return results;
}

/**
 * Run all analyses
 */
function runAllAnalyses(ctx) {
    const luanTinhResult = analyzeLuanTinh(ctx);
    return {
        benh_duoc: analyzeBenhDuoc(ctx),
        dich_thien_tuy: analyzeDichThienTuy(ctx),
        tu_binh_chan_thuyen: analyzeTuBinhChanThuyen(ctx),
        nap_am_chuyen_sau: analyzeNapAmChuyenSau(ctx),
        hinh_hai_pha: analyzeHinhHaiPha(ctx),
        vong_trang_sinh: analyzeVongTrangSinh(ctx),
        dong_tinh_luan: analyzeDongTinhLuan(ctx),
        kim_bat_hoan: analyzeKimBatHoan(ctx),
        cung_thong_bao_giam: analyzeCungThongBaoGiam(ctx),
        tam_menh_thong_hoi: analyzeTamMenhThongHoi(ctx),
        luan_tinh: luanTinhResult,
        luan_dong: analyzeLuanDong(ctx, luanTinhResult), // New
        shishen: shishen.runAllShishenAnalyses(ctx)
    };
}

module.exports = {
    analyzeBenhDuoc,
    analyzeDichThienTuy,
    analyzeTuBinhChanThuyen,
    analyzeNapAmChuyenSau,
    analyzeHinhHaiPha,
    analyzeVongTrangSinh,
    analyzeDongTinhLuan,
    analyzeKimBatHoan,
    analyzeCungThongBaoGiam,
    analyzeTamMenhThongHoi,
    analyzeLuanTinh,
    runAllAnalyses,

    // Data exports
    STEM_ESSENCE,
    VERSE_DB,
    LIFE_STAGES,
    STAGE_WEIGHTS,
    TAM_HINH,
    LUC_HAI,
    LUC_PHA,
    STATUS,
    DIEU_HAU
};
