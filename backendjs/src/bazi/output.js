/**
 * Output formatting for BaZi analysis
 * Converted from Python bazi/output_json.py
 * Updated to match Python API output structure
 */

const ganzhi = require('./ganzhi');
const { determineCach } = require('./geju');
const { calculateDaiVan } = require('./dayun');
const { calculateShenSha } = require('./shensha');

/**
 * Format full output for API response
 * Matches Python output_json.py structure
 */
function formatOutput(ctx, options = {}) {
    const { analyzeQuanHeCanChi } = require('./phan_tich/quan_he');
    const { generateLuanGiai6Phan } = require('./phan_tich/luan_giai_quan_he');

    const { name = '', includeAll = true } = options;

    // Prepare shared context data for legacy modules
    if (!ctx.zhi_shen3) {
        ctx.zhi_shen3 = (ctx.zhis || []).map(z => Object.keys(ganzhi.ZHI5[z] || {}).map(t => ganzhi.getThapThan(ctx.gans?.[2], t)));
    }
    if (!ctx.gan_shens) {
        ctx.gan_shens = (ctx.gans || []).map(g => ganzhi.getThapThan(ctx.gans?.[2], g));
    }
    if (!ctx.zhi_shens) {
        ctx.zhi_shens = (ctx.zhis || []).map(z => ganzhi.getThapThan(ctx.gans?.[2], ganzhi.getZhiMainGan(z)));
    }
    if (!ctx.shens2) {
        ctx.shens2 = [...(ctx.gan_shens || []), ...(ctx.zhi_shens || [])];
    }
    if (!ctx.zhus) {
        ctx.zhus = (ctx.gans || []).map((g, i) => [g, ctx.zhis?.[i]]);
    }
    if (!ctx.empties) {
        // Calculate Empties (Tuan Khong)
        const calcEmpties = (gan, zhi) => {
            if (!gan || !zhi) return [];
            const gi = ganzhi.GANS_VN.indexOf(gan);
            const zi = ganzhi.ZHIS_VN.indexOf(zhi);
            if (gi < 0 || zi < 0) return [];
            let diff = (zi - gi);
            if (diff < 0) diff += 12;
            const e1 = ganzhi.ZHIS_VN[(diff - 2 + 12) % 12];
            const e2 = ganzhi.ZHIS_VN[(diff - 1 + 12) % 12];
            return [e1, e2];
        };
        ctx.empties = [
            calcEmpties(ctx.gans?.[0], ctx.zhis?.[0]),
            [],
            calcEmpties(ctx.gans?.[2], ctx.zhis?.[2]),
            []
        ];
    }

    // Helper: Get health direction by element
    const getHealthDirection = (element) => {
        const directions = { 'Kim': 'Tây', 'Mộc': 'Đông', 'Thủy': 'Bắc', 'Hỏa': 'Nam', 'Thổ': 'Trung tâm' };
        return directions[element] || '';
    };

    // Helper: Get lucky color by element
    const getHealthColor = (element) => {
        const colors = { 'Kim': 'Trắng, Bạc', 'Mộc': 'Xanh lá', 'Thủy': 'Đen, Xanh dương đậm', 'Hỏa': 'Đỏ, Hồng', 'Thổ': 'Vàng, Nâu' };
        return colors[element] || '';
    };

    // Helper: Build extended relationship data
    const buildExtendedRelationships = (ctx) => {
        const relData = analyzeQuanHeCanChi(ctx);
        const result = {
            can_hop: [],
            can_xung: [],
            chi_hop: [], // Lục Hợp, Tam Hợp, Tam Hội, Bán Hợp, Ám Hợp
            chi_xung: [], // Lục Xung
            chi_hinh: [], // Tam Hình, Tự Hình, Bán Hình
            chi_hai: [],
            chi_pha: []
        };

        // Group Thiên Can
        relData.thien_can.forEach(item => {
            if (item.loai === 'Hợp') result.can_hop.push(item);
            else result.can_xung.push(item);
        });

        // Group Địa Chi
        relData.dia_chi.forEach(item => {
            const loai = item.loai;
            if (loai.includes('Hợp') || loai.includes('Hội')) {
                result.chi_hop.push(item);
            } else if (loai.includes('Xung')) {
                result.chi_xung.push(item);
            } else if (loai.includes('Hình')) {
                result.chi_hinh.push(item);
            } else if (loai.includes('Hại')) {
                result.chi_hai.push(item);
            } else if (loai.includes('Phá')) {
                result.chi_pha.push(item);
            }
        });

        return result;
    };

    // 1. Metadata (like Python)
    // Use Vietnam time for accurate timestamp
    const vnNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const metadata = {
        phien_ban: "2.0",
        thoi_gian_tao: vnNow.toISOString()
    };

    // 2. Input Parameters (tham_so_dau_vao)
    const thamSoDauVao = {
        gioi_tinh: ctx.isFemale ? 'Nữ' : 'Nam',
        la_lich_am: false,
        la_nhap_truc_tiep: false,
        ngay_gio: ctx.solar ?
            `${ctx.solar.getYear()}-${ctx.solar.getMonth()}-${ctx.solar.getDay()} ${ctx.solar.getHour()}` : ''
    };

    // 3. Basic Info (thong_tin_co_ban) - Expanded with Personalization
    const calculateAge = () => {
        if (!ctx.solar) return null;
        const birthYear = ctx.solar.getYear();
        const currentYear = vnNow.getFullYear();
        return currentYear - birthYear;
    };

    const tuoi = calculateAge();

    const getLifeStage = (age) => {
        if (!age) return 'Chưa xác định';
        if (age < 18) return 'Thiếu niên';
        if (age < 25) return 'Thanh niên';
        if (age < 40) return 'Trung niên sớm';
        if (age < 55) return 'Trung niên';
        if (age < 70) return 'Lão niên sớm';
        return 'Lão niên';
    };

    const giaiDoanDoi = getLifeStage(tuoi);
    const isNam = !ctx.isFemale;

    // Gender-specific terminology
    const xungHo = {
        full: ctx.isFemale ? 'Quý bà' : 'Quý ông',
        short: ctx.isFemale ? 'bà' : 'ông',
        menh: ctx.isFemale ? 'nữ mệnh' : 'nam mệnh',
        ban_than: ctx.isFemale ? 'bản thân nữ' : 'bản thân nam',
        vo_chong: ctx.isFemale ? 'chồng' : 'vợ',
        tài_loc: ctx.isFemale ? 'tài vận của gia đình' : 'tài vận cá nhân'
    };

    // Calculate Nien Khong and Nhat Khong (Tuần Không)
    const calcEmpties2 = (gan, zhi) => {
        if (!gan || !zhi) return [];
        const gi = ganzhi.GANS_VN.indexOf(gan) >= 0 ? ganzhi.GANS_VN.indexOf(gan) : ganzhi.GANS.indexOf(gan);
        const zi = ganzhi.ZHIS_VN.indexOf(zhi) >= 0 ? ganzhi.ZHIS_VN.indexOf(zhi) : ganzhi.ZHIS.indexOf(zhi);
        if (gi < 0 || zi < 0) return [];
        let diff = (zi - gi);
        if (diff < 0) diff += 12;
        const e1 = ganzhi.ZHIS_VN[(diff - 2 + 12) % 12] || ganzhi.zhiToVN(ganzhi.ZHIS[(diff - 2 + 12) % 12]);
        const e2 = ganzhi.ZHIS_VN[(diff - 1 + 12) % 12] || ganzhi.zhiToVN(ganzhi.ZHIS[(diff - 1 + 12) % 12]);
        return [e1, e2];
    };
    const nienKhong = calcEmpties2(ganzhi.ganToVN(ctx.gans?.[0]), ganzhi.zhiToVN(ctx.zhis?.[0]));
    const nhatKhong = calcEmpties2(ganzhi.ganToVN(ctx.gans?.[2]), ganzhi.zhiToVN(ctx.zhis?.[2]));

    const thongTinCoBan = {
        ten: name,
        gioi_tinh: ctx.isFemale ? 'Nữ' : 'Nam',
        nam_sinh: ctx.solar ? ctx.solar.getYear() : 0,
        thang_sinh: ctx.solar ? ctx.solar.getMonth() : 0,
        ngay_sinh: ctx.solar ? ctx.solar.getDay() : 0,
        gio_sinh: ctx.solar ? ctx.solar.getHour() : 0,
        phut_sinh: ctx.solar ? ctx.solar.getMinute() : 0,
        tuoi: tuoi,
        giai_doan_doi: giaiDoanDoi,
        xung_ho: xungHo.full,
        ngay_duong_lich: ctx.basicInfo?.ngay_duong_lich || '',
        ngay_am_lich: ctx.basicInfo?.ngay_am_lich || '',
        gio_sinh: ctx.basicInfo?.gio_sinh || '',
        gio_chi: ctx.basicInfo?.gio_chi || '',
        menh_cung: ctx.basicInfo?.menh_cung || '',
        thai_nguyen: ctx.basicInfo?.thai_nguyen || '',
        than_cung: ctx.basicInfo?.than_cung || '',
        nhap_van: ctx.basicInfo?.nhap_van || '',
        tiet_khi: ctx.basicInfo?.tiet_khi || '',
        can_yeu: ctx.basicInfo?.can_yeu || '',
        nien_khong: nienKhong.length > 0 ? nienKhong.join(' - ') : '',
        nhat_khong: nhatKhong.length > 0 ? nhatKhong.join(' - ') : '',
        // bat_tu - 4 pillars summary (like Python)
        bat_tu: {
            nam: [ganzhi.ganToVN(ctx.gans?.[0] || ''), ganzhi.zhiToVN(ctx.zhis?.[0] || '')],
            thang: [ganzhi.ganToVN(ctx.gans?.[1] || ''), ganzhi.zhiToVN(ctx.zhis?.[1] || '')],
            ngay: [ganzhi.ganToVN(ctx.gans?.[2] || ''), ganzhi.zhiToVN(ctx.zhis?.[2] || '')],
            gio: [ganzhi.ganToVN(ctx.gans?.[3] || ''), ganzhi.zhiToVN(ctx.zhis?.[3] || '')]
        }
    };

    // Attach personalization to context for analysis modules
    ctx.tuoi = tuoi;
    ctx.giaiDoanDoi = giaiDoanDoi;
    ctx.xungHo = xungHo;
    ctx.isNam = isNam;

    // Thần Sát calculation
    const thanSat = calculateShenSha(ctx);
    ctx.stars = (thanSat.summary || []).map(s => s.name);

    // 4. Scores (diem_so) - Match Python structure
    const elementMapping = { 'Mộc': 'Wood', 'Hỏa': 'Fire', 'Thổ': 'Earth', 'Kim': 'Metal', 'Thủy': 'Water' };
    const elements = ctx.elements || {};
    const totalScore = Object.values(elements).reduce((sum, v) => sum + v, 0) || 1;

    const nguHanhPercent = {};
    Object.entries(elements).forEach(([k, v]) => {
        const enKey = elementMapping[k] || k;
        nguHanhPercent[enKey] = Math.round((v / totalScore) * 100 * 10) / 10;
    });

    const diemSo = {
        ngu_hanh: nguHanhPercent,
        ngu_hanh_vn: elements,
        suc_manh: ctx.scores?.suc_manh || {
            la_nhuoc: true,
            diem_manh: 40,
            tong_diem: 100
        },
        nhiet_do: ctx.scores?.nhiet_do || 0
    };

    // 5. Pillars Detail (chi_tiet_tru) - Match Python structure
    const chiTietTru = (ctx.pillars || []).map((p, i) => {
        const pillarNames = ['Nam', 'Thang', 'Ngay', 'Gio'];
        const pillarNamesVN = ['Năm', 'Tháng', 'Ngày', 'Giờ'];

        // Get stars for this pillar - use direct pillar arrays
        const pillarShenShaKeys = ['year', 'month', 'day', 'hour'];
        const stars = thanSat[pillarShenShaKeys[i]] || [];

        // Build tang_can (hidden stems) with thap_than
        const tangCan = (p.tang_can || []).map(tc => {
            if (typeof tc === 'object' && tc.can) {
                return {
                    can: tc.can,
                    thap_than: tc.thap_than || ganzhi.getThapThan(ctx.gans?.[2] || '', tc.can_cn || '')
                };
            }
            return { can: tc, thap_than: '' };
        });

        // Build moi_quan_he (relationships) 
        const moiQuanHe = buildPillarRelationships(ctx.zhis, i);

        return {
            tru: pillarNames[i],
            can: p.can || '',
            chi: p.chi || '',
            nap_am: p.nap_am || '',
            thap_than_can: p.thap_than_can || (ctx.ganShens?.[i] || ''),
            thap_than_chi: p.thap_than_chi || (ctx.zhiShens?.[i] || ''),
            tang_can: tangCan,
            moi_quan_he: moiQuanHe,
            than_sat: stars,
            truong_sinh: (ctx.pillarStages || [])[i] || ''
        };
    });

    // 6. Analysis (phan_tich) - Match Python structure
    const phanTichModule = require('./phan_tich');
    const luanGiaiModule = require('./luan_giai/core');

    // 6.1 Cấu trúc (structural analysis)
    const cauTruc = buildCauTruc(ctx, thongTinCoBan);

    // 6.2 Thần Sát Sao (stars analysis) - Detailed like Python
    const thanSatSao = buildThanSatSao(ctx, thanSat);

    // 6.3 Thập Thần analysis
    const thapThan = buildThapThanAnalysis(ctx);

    // 6.4 Kết luận Cách Cục
    const cach = determineCach(ctx);
    const vanBanCoDien = buildVanBanCoDien(ctx);

    const ketLuan = {
        cuc: ctx.jus || [],
        cach: Array.isArray(cach) ? cach : (cach ? [cach] : []),
        dac_biet: [],
        van_ban: vanBanCoDien,
        mo_ta: ''
    };

    // 6.4b Cân Bằng Ngũ Hành (Dụng Hỷ Kỵ) - MOVED UP
    // Run this BEFORE detailed analysis so modules like luan_tinh can use Dung Than.
    const { analyzeNguHanh } = require('./phan_tich/ngu_hanh');
    const canBangNguHanh = analyzeNguHanh(ctx);

    // Attach to context for other modules (luan_tinh, etc.)
    ctx.nguHanhResult = canBangNguHanh;

    // 7.1 Calculate Dai Van EARLY for analysis modules
    const daiVan = calculateDaiVan(ctx);
    ctx.luck_pillars = daiVan; // Attach to context for luan_dong.js
    ctx.dai_van = daiVan;      // Keep consistent naming

    // 6.5 Phân tích nâng cao (includes luan_tinh)
    const phanTichNangCao = phanTichModule.runAllAnalyses(ctx);

    // 6.6 Quan Hệ Can Chi logic
    const quanHeCanChi = analyzeQuanHeCanChi(ctx);
    quanHeCanChi.luan_giai_chi_tiet = generateLuanGiai6Phan(ctx, quanHeCanChi);

    const phanTich = {
        cau_truc: cauTruc,
        than_sat_sao: thanSatSao,
        thap_than: thapThan,
        ket_luan: ketLuan,
        quan_he_can_chi: quanHeCanChi,
        can_bang_ngu_hanh: canBangNguHanh,
        luan_tinh: phanTichNangCao.luan_tinh,
        luan_dong: phanTichNangCao.luan_dong,
        // Vòng Trường Sinh structured data
        vong_trang_sinh: {
            stages: ctx.pillarStages || [],
            pillar_details: ['Năm', 'Tháng', 'Ngày', 'Giờ'].map((name, i) => ({
                pillar: name,
                stage: (ctx.pillarStages || [])[i] || 'N/A',
                chi: ganzhi.zhiToVN(ctx.zhis[i])
            })),
            analysis: phanTichNangCao.vong_trang_sinh || []
        },
        // NEW: Kinh Điển - detailed descriptions from classics
        kinh_dien: {
            nhat_chu: {
                can: ganzhi.ganToVN(ctx.gans[2]),
                mo_ta: ganzhi.GAN_DESC?.[ctx.gans[2]] || '',
                hanh: ganzhi.ganToElement(ctx.gans[2])
            },
            cung_phu_the: {
                chi: ganzhi.zhiToVN(ctx.zhis[2]),
                mo_ta: ganzhi.ZHI_DESC?.[ctx.zhis[2]] || ''
            },
            nam_tru: {
                can_mo_ta: ganzhi.GAN_DESC?.[ctx.gans[0]] || '',
                chi_mo_ta: ganzhi.ZHI_DESC?.[ctx.zhis[0]] || ''
            }
        },
        // NEW: Sức Khỏe - health advice by element
        suc_khoe: {
            ngu_hanh_nhat_chu: ganzhi.ganToElement(ctx.gans[2]),
            loi_khuyen: ganzhi.GAN_HEALTH?.[ganzhi.ganToElement(ctx.gans[2])] || '',
            huong_tot: getHealthDirection(ganzhi.ganToElement(ctx.gans[2])),
            mau_may_man: getHealthColor(ganzhi.ganToElement(ctx.gans[2]))
        },
        // NEW: Quan Hệ Mở Rộng - extended relationship data
        quan_he_mo_rong: buildExtendedRelationships(ctx),
        phan_tich_nang_cao: phanTichNangCao
    };

    // 7. Luận Giải (comprehensive interpretation)
    const luanGiai = luanGiaiModule.analyzeLuanGiai(ctx);

    // 8. Văn bản cổ điển
    const vanBan = vanBanCoDien;

    return {
        metadata: metadata,
        tham_so_dau_vao: thamSoDauVao,
        thong_tin_co_ban: thongTinCoBan,
        diem_so: diemSo,
        chi_tiet_tru: chiTietTru,
        phan_tich: phanTich,
        luan_giai: luanGiai,
        van_ban_co_dien: vanBan,
        dai_van: daiVan
    };
}

/**
 * Build pillar relationships (moi_quan_he)
 */
function buildPillarRelationships(zhis, currentIndex) {
    if (!zhis || zhis.length < 4) return [];

    const relationships = [];
    const currentZhi = zhis[currentIndex];
    const otherZhis = zhis.filter((_, i) => i !== currentIndex);

    // Tam Hợp relationships
    const tamHop = {
        '子': ['辰', '申'], '辰': ['子', '申'], '申': ['子', '辰'],
        '丑': ['巳', '酉'], '巳': ['丑', '酉'], '酉': ['丑', '巳'],
        '寅': ['午', '戌'], '午': ['寅', '戌'], '戌': ['寅', '午'],
        '卯': ['未', '亥'], '未': ['卯', '亥'], '亥': ['卯', '未']
    };

    // Lục Xung relationships
    const lucXung = {
        '子': '午', '午': '子', '丑': '未', '未': '丑',
        '寅': '申', '申': '寅', '卯': '酉', '酉': '卯',
        '辰': '戌', '戌': '辰', '巳': '亥', '亥': '巳'
    };

    // Check Tam Hợp
    if (tamHop[currentZhi]) {
        const found = otherZhis.filter(z => tamHop[currentZhi].includes(z));
        if (found.length > 0) {
            relationships.push({
                loai: 'Tam Hợp',
                cac_chi: found.map(z => ganzhi.zhiToVN(z))
            });
        }
    }

    // Check Lục Xung
    if (lucXung[currentZhi] && otherZhis.includes(lucXung[currentZhi])) {
        relationships.push({
            loai: 'Lục Xung',
            cac_chi: [ganzhi.zhiToVN(lucXung[currentZhi])]
        });
    }

    return relationships;
}

/**
 * Build structural analysis (cau_truc)
 */
/**
 * Build structural analysis (cau_truc) - New Logic
 */
function buildCauTruc(ctx) {
    // 1. Thiên Can (Lộ khí)
    const thienCan = {
        title: 'Thiên Can (Lộ khí)',
        items: ctx.gans.map((g, i) => {
            const pillar = ['Năm', 'Tháng', 'Ngày', 'Giờ'][i];
            const vn = ganzhi.ganToVN(g);
            const element = ganzhi.ganToElement(g);
            const idx = ganzhi.GANS.indexOf(g) >= 0 ? ganzhi.GANS.indexOf(g) : ganzhi.GANS_VN.indexOf(g);
            const yinyang = idx % 2 === 0 ? 'Dương' : 'Âm';
            return { pillar, name: vn, element, yinyang };
        }),
        analysis: [] // Add interaction logic if needed
    };

    // 2. Địa Chi (Tàng khí)
    const diaChi = {
        title: 'Địa Chi (Tàng khí)',
        items: ctx.zhis.map((z, i) => {
            const pillar = ['Năm', 'Tháng', 'Ngày', 'Giờ'][i];
            const vn = ganzhi.zhiToVN(z);
            const hidden = ganzhi.getTangCan(z).map(t => `${t.can} (${ganzhi.ganToElement(t.can)})`);
            return { pillar, name: vn, hidden };
        }),
        analysis: []
    };

    // 3. Âm - Dương
    let yangCount = 0;
    const allChars = [...ctx.gans, ...ctx.zhis];
    allChars.forEach(c => {
        // Can logic
        let idx = ganzhi.GANS.indexOf(c);
        if (idx === -1) idx = ganzhi.GANS_VN.indexOf(c);
        if (idx >= 0) {
            if (idx % 2 === 0) yangCount++;
            return;
        }
        // Zhi logic
        idx = ganzhi.ZHIS.indexOf(c);
        if (idx === -1) idx = ganzhi.ZHIS_VN.indexOf(c);
        if (idx >= 0) {
            // Tý (0) is Yang, Suu (1) is Yin...
            if (idx % 2 === 0) yangCount++;
        }
    });

    const yinCount = 8 - yangCount;
    let balanceComment = '';
    if (yangCount === 8) balanceComment = 'Thuần Dương (Cực Dương), tính cách cương trực liệt cường.';
    else if (yinCount === 8) balanceComment = 'Thuần Âm (Cực Âm), tính cách nhu thuận, hướng nội.';
    else if (Math.abs(yangCount - yinCount) <= 2) balanceComment = 'Âm Dương khá cân bằng.';
    else balanceComment = yangCount > yinCount ? 'Dương thịnh Âm suy.' : 'Âm thịnh Dương suy.';

    const amDuong = {
        title: 'Âm - Dương',
        stats: { duong: yangCount, am: yinCount },
        conclusion: balanceComment
    };

    // 4. Ngũ Hành
    const elements = ctx.scores?.ngu_hanh_vn || {};
    const totalScore = Object.values(elements).reduce((a, b) => a + b, 0) || 1;
    const distribution = Object.entries(elements)
        .sort(([, a], [, b]) => b - a)
        .map(([k, v]) => ({
            element: k,
            score: v,
            percent: Math.round((v / totalScore) * 100)
        }));

    // Find strongest/weakest
    const strongest = distribution[0];
    const weakest = distribution[distribution.length - 1];

    const nguHanh = {
        title: 'Ngũ Hành',
        distribution: distribution,
        comment: `Ngũ hành chủ đạo là ${strongest.element} (${strongest.percent}%), yếu nhất là ${weakest.element} (${weakest.percent}%).`
    };

    return {
        thien_can: thienCan,
        dia_chi: diaChi,
        am_duong: amDuong,
        ngu_hanh: nguHanh
    };
}

/**
 * Build Thần Sát Sao analysis (detailed star analysis like Python)
 */
function buildThanSatSao(ctx, thanSat) {
    const summary = thanSat.summary || [];

    return {
        thien_at: summary.filter(s => s.name === 'Thiên Ất' || s.name === 'Thiên Ất Quý Nhân').map(s => s.pillar),
        ngoc_duong: summary.filter(s => s.name === 'Ngọc Đường').map(s => s.pillar),
        thien_la_dia_vong: summary.filter(s => s.name.includes('Thiên La') || s.name.includes('Địa Võng')).map(s => s.pillar),
        hoc_duong: summary.filter(s => s.name === 'Học Đường').map(s => s.pillar),
        tu_quan: summary.filter(s => s.name === 'Từ Quán').map(s => s.pillar),
        kho: summary.filter(s => s.name.includes('Kho')).map(s => s.pillar),
        ngoi_tren_can: [],
        xuat_than: 'Bình thường',
        can_lap_lai: checkGanRepeat(ctx),
        chi_lap_lai: checkZhiRepeat(ctx),
        phan_tich_loc: [],
        van_tinh_thien_an: [],
        thieu_ngu_hanh: getThieuNguHanh(ctx),
        dao_hoa: summary.filter(s => s.name === 'Đào Hoa').map(s => s.pillar),
        dich_ma: summary.filter(s => s.name === 'Dịch Mã').map(s => s.pillar),
        kiem_cuu: summary.filter(s => s.name === 'Kiếm Cửu' || s.name === 'Kình Dương').map(s => s.pillar)
    };
}

/**
 * Check for repeated Gans
 */
function checkGanRepeat(ctx) {
    const gans = ctx.gans || [];
    const counts = {};
    gans.forEach(g => { counts[g] = (counts[g] || 0) + 1; });
    const repeated = Object.entries(counts)
        .filter(([g, c]) => c >= 2)
        .map(([g, c]) => `${ganzhi.ganToVN(g)} (${c} lần)`);
    return repeated;
}

/**
 * Check for repeated Zhis
 */
function checkZhiRepeat(ctx) {
    const zhis = ctx.zhis || [];
    const counts = {};
    zhis.forEach(z => { counts[z] = (counts[z] || 0) + 1; });
    const repeated = Object.entries(counts)
        .filter(([z, c]) => c >= 2)
        .map(([z, c]) => `${ganzhi.zhiToVN(z)} (${c} lần)`);
    return repeated;
}

/**
 * Get missing elements analysis
 */
function getThieuNguHanh(ctx) {
    const elements = ctx.elements || {};
    const missing = Object.entries(elements)
        .filter(([k, v]) => v < 5)
        .map(([k]) => k);

    if (missing.length === 0) return 'Ngũ hành đầy đủ.';
    return `Thiếu hành ${missing.join(', ')}.`;
}

/**
 * Build Thập Thần analysis
 */
/**
 * Build Thập Thần analysis - Structured
 */
function buildThapThanAnalysis(ctx) {
    const ganzhi = require('./ganzhi');
    const dayGan = ctx.gans[2];
    const pillarNames = ['Năm', 'Tháng', 'Ngày', 'Giờ'];
    const groups = {
        ty_kiep: { title: 'Tỷ / Kiếp', desc: 'Đại diện cho anh em, bạn bè, đồng nghiệp. Vượng: Tự tin, nhưng dễ độc đoán. Suy: Cô độc, thiếu trợ lực.', items: [] },
        thuc_thuong: { title: 'Thực / Thương', desc: 'Đại diện cho tài năng, sự sáng tạo, con cái (nữ). Vượng: Thông minh, nhưng dễ thị phi. Suy: Kém linh hoạt.', items: [] },
        tai_tinh: { title: 'Tài Tinh', desc: 'Đại diện cho tiền bạc, cha, vợ (nam). Vượng: Giàu có, nhưng dễ ham vật chất. Suy: Duyên bạc mỏng.', items: [] },
        quan_sat: { title: 'Quan Sát', desc: 'Đại diện cho công danh, con cái (nam), chồng (nữ). Vượng: Quyền uy, nhưng áp lực. Suy: Thiếu kỷ luật.', items: [] },
        an_tinh: { title: 'Ấn Tinh', desc: 'Đại diện cho mẹ, học vấn, danh dự. Vượng: Được che chở, nhưng ỷ lại. Suy: Thiếu sự giúp đỡ.', items: [] }
    };

    const add = (name, pillar, source) => {
        let key = '';
        if (name === 'Tỷ' || name === 'Kiếp') key = 'ty_kiep';
        else if (name === 'Thực' || name === 'Thương') key = 'thuc_thuong';
        else if (name === 'Chính Tài' || name === 'Thiên Tài') key = 'tai_tinh';
        else if (name === 'Chính Quan' || name === 'Sát') key = 'quan_sat';
        else if (name === 'Chính Ấn' || name === 'Thiên Ấn') key = 'an_tinh';

        if (key) {
            groups[key].items.push({ name, pillar, source });
        }
    };

    // 1. Structural count (Basic)
    ctx.gans.forEach((g, i) => {
        if (i === 2) return;
        const shen = ganzhi.getThapThan(dayGan, g);
        add(shen, pillarNames[i], 'Can');
    });

    ctx.zhis.forEach((z, i) => {
        const mainGan = ganzhi.getZhiMainGan(z);
        const shen = ganzhi.getThapThan(dayGan, mainGan);
        add(shen, pillarNames[i], 'Chi');
    });

    // Local Hardcoded Maps for Robust Conversion (Safety Net)
    const KANJI_GAN_VN = {
        '\u7532': 'Giáp', '\u4E59': 'Ất', '\u4E19': 'Bính', '\u4E01': 'Đinh', '\u620A': 'Mậu',
        '\u5DF1': 'Kỷ', '\u5E9A': 'Canh', '\u8F9B': 'Tân', '\u58EC': 'Nhâm', '\u7678': 'Quý'
    };
    const KANJI_ZHI_VN = {
        '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ',
        '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi'
    };

    // 2. Prepare Detailed Context
    // Create VN versions of Gans/Zhis for Module Consumption
    const gansVN = ctx.gans.map(g => KANJI_GAN_VN[g] || ganzhi.ganToVN(g));
    const zhisVN = ctx.zhis.map(z => KANJI_ZHI_VN[z] || ganzhi.zhiToVN(z));
    const dayGanVN = gansVN[2];

    const analysisCtx = {
        me: dayGanVN,
        gender: ctx.gender,
        is_female: ctx.isFemale,
        isYangMe: ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(dayGanVN),
        gans: gansVN,
        zhis: zhisVN,
        zhus: gansVN.map((g, i) => [g, zhisVN[i]]),

        gan_shens: ctx.gan_shens || ctx.gans.map(g => ganzhi.getThapThan(dayGan, g)),
        zhi_shens: ctx.zhi_shens || ctx.zhis.map(z => ganzhi.getThapThan(dayGan, ganzhi.getZhiMainGan(z))),
        zhi_shen3: ctx.zhi_shen3 || ctx.zhis.map(z => Object.keys(ganzhi.ZHI5[z] || {}).map(t => ganzhi.getThapThan(dayGan, t))),

        shens2: [],
        zhi_shens2: [],
        empties: []
    };

    analysisCtx.shens2 = [...analysisCtx.gan_shens, ...analysisCtx.zhi_shens];
    analysisCtx.zhi_shens2 = analysisCtx.zhi_shen3.flat();

    // Calculate Empties (using VN strings)
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
    analysisCtx.empties = [
        calcEmpties(gansVN[0], zhisVN[0]),
        [],
        calcEmpties(gansVN[2], zhisVN[2]),
        []
    ];

    // 3. Run Modules
    try {
        const bijie = require('./shishen/bijie');
        const yinxiao = require('./shishen/yinxiao');
        const cai = require('./shishen/cai');
        const guansha = require('./shishen/guansha');
        const shishang = require('./shishen/shishang');

        groups.ty_kiep.analysis = [...bijie.analyzeBiJian(analysisCtx), ...bijie.analyzeJieCai(analysisCtx), ...bijie.analyzeBiKiepGeneral(analysisCtx)];
        groups.an_tinh.analysis = [...yinxiao.analyzeYin(analysisCtx), ...yinxiao.analyzeXiao(analysisCtx), ...yinxiao.analyzeYinXiaoGeneral(analysisCtx)];
        groups.tai_tinh.analysis = [...cai.analyzePianCai(analysisCtx), ...cai.analyzeZhengCai(analysisCtx), ...cai.analyzeCaiGeneral(analysisCtx)];
        groups.quan_sat.analysis = [...guansha.analyzeGuan(analysisCtx), ...guansha.analyzeSha(analysisCtx)];
        groups.thuc_thuong.analysis = [...shishang.analyzeShi(analysisCtx), ...shishang.analyzeShang(analysisCtx), ...shishang.analyzeShiShangGeneral(analysisCtx)];

    } catch (e) {
        console.error("Deep Analysis Error:", e);
    }

    // 4. Return
    const result = { isStructured: true };
    for (const [key, val] of Object.entries(groups)) {
        result[key] = {
            title: val.title,
            desc: val.desc,
            count: val.items.length,
            items: val.items,
            analysis: val.analysis || []
        };
    }

    // Aggregated commentary for backward compatibility or easy view
    result.commentary = [];
    Object.values(groups).forEach(g => {
        if (g.analysis && g.analysis.length > 0) {
            result.commentary.push(`<b>[${g.title}]</b>:`);
            result.commentary.push(...g.analysis);
        }
    });

    return result;
}

/**
 * Build Văn bản cổ điển (Classic texts)
 */
function buildVanBanCoDien(ctx) {
    const dayGan = ctx.gans?.[2] || '';
    const dayZhi = ctx.zhis?.[2] || '';
    const monthZhi = ctx.zhis?.[1] || '';
    const hourGan = ctx.gans?.[3] || '';
    const hourZhi = ctx.zhis?.[3] || '';
    const yearGan = ctx.gans?.[0] || '';
    const yearZhi = ctx.zhis?.[0] || '';

    // Get element description for day pillar
    const dayElement = ganzhi.ganToElement(dayGan);
    const descriptions = {
        'Kim': 'Kim khí cương nghị, quyết đoán, trọng nghĩa.',
        'Mộc': 'Mộc khí nhân từ, bác ái, có chí tiến thủ.',
        'Thủy': 'Thủy khí thông minh, linh hoạt, giỏi giao tiếp.',
        'Hỏa': 'Hỏa khí nhiệt tình, năng động, lạc quan.',
        'Thổ': 'Thổ khí trung hậu, điềm tĩnh, đáng tin cậy.'
    };

    return {
        nam: `${ganzhi.ganToVN(yearGan)} ${ganzhi.zhiToVN(yearZhi)} năm: ${ganzhi.getNapAm(yearGan, yearZhi)}.`,
        thang: `Tháng ${ganzhi.zhiToVN(monthZhi)}: Điều hậu theo mùa sinh.`,
        ngay: `${ganzhi.ganToVN(dayGan)} ${ganzhi.zhiToVN(dayZhi)} ngày: ${descriptions[dayElement] || ''}`,
        gio: `Giờ ${ganzhi.ganToVN(hourGan)} ${ganzhi.zhiToVN(hourZhi)}: Luận giải theo Tam Mệnh Thông Hội.`,
        muoi_hai_thoi_thanh: 'Phân tích chi tiết 12 thời thần.'
    };
}


module.exports = {
    formatOutput
};
