/**
 * Phân tích Quan Hệ Can Chi (Stem-Branch Relationships)
 * Bao gồm: Hợp, Xung, Hình, Hại, Phá, Tàng Can, Căn Khí (Root), Sức Mạnh.
 */
const ganzhi = require('../ganzhi');

const { TEXTS } = require('./data/quan_he_text');

const KANJI_GAN_VN = {
    '\u7532': 'Giáp', '\u4E59': 'Ất', '\u4E19': 'Bính', '\u4E01': 'Đinh', '\u620A': 'Mậu',
    '\u5DF1': 'Kỷ', '\u5E9A': 'Canh', '\u8F9B': 'Tân', '\u58EC': 'Nhâm', '\u7678': 'Quý'
};
const KANJI_ZHI_VN = {
    '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ',
    '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi'
};

function getVN(val, type) {
    if (!val) return '';
    if (type === 'GAN') return KANJI_GAN_VN[val] || ganzhi.ganToVN(val);
    if (type === 'ZHI') return KANJI_ZHI_VN[val] || ganzhi.zhiToVN(val);
    return val;
}

function getText(category, k1, k2) {
    // category object from TEXTS
    if (!category) return '';
    const key1 = `${k1}-${k2}`;
    const key2 = `${k2}-${k1}`;
    return category[key1] || category[key2] || '';
}

function analyzeQuanHeCanChi(ctx) {
    const gans = ctx.gans || [];
    const zhis = ctx.zhis || [];
    const pillars = ['Năm', 'Tháng', 'Ngày', 'Giờ'];
    const relationships = {
        thien_can: [],
        dia_chi: [],
        tang_can: [],
        can_khi: [], // Roots analysis
        manh_yeu: {} // Strength analysis
    };

    // --- 1. THIÊN CAN (Ngũ Hợp & Xung) ---
    const GAN_HOP = [
        { pair: new Set(['甲', '己']), name: 'Trung Chính (Hóa Thổ)', elements: ['Thổ'] },
        { pair: new Set(['乙', '庚']), name: 'Nhân Nghĩa (Hóa Kim)', elements: ['Kim'] },
        { pair: new Set(['丙', '辛']), name: 'Uy Chế (Hóa Thủy)', elements: ['Thủy'] },
        { pair: new Set(['丁', '壬']), name: 'Dâm Dật (Hóa Mộc)', elements: ['Mộc'] },
        { pair: new Set(['戊', '癸']), name: 'Vô Tình (Hóa Hỏa)', elements: ['Hỏa'] }
    ];
    const GAN_XUNG = [
        { pair: new Set(['甲', '庚']), name: 'Canh khắc Giáp (Xung)', main: true },
        { pair: new Set(['乙', '辛']), name: 'Tân khắc Ất (Xung)', main: true },
        { pair: new Set(['丙', '壬']), name: 'Nhâm khắc Bính (Xung)', main: true },
        { pair: new Set(['丁', '癸']), name: 'Quý khắc Đinh (Xung)', main: true },
        { pair: new Set(['甲', '戊']), name: 'Giáp khắc Mậu', main: false },
        { pair: new Set(['乙', '己']), name: 'Ất khắc Kỷ', main: false },
        { pair: new Set(['丙', '庚']), name: 'Bính khắc Canh', main: false },
        { pair: new Set(['丁', '辛']), name: 'Đinh khắc Tân', main: false },
        { pair: new Set(['戊', '壬']), name: 'Mậu khắc Nhâm', main: false },
        { pair: new Set(['己', '癸']), name: 'Kỷ khắc Quý', main: false }
    ];

    for (let i = 0; i < gans.length; i++) {
        for (let j = i + 1; j < gans.length; j++) {
            const g1 = gans[i], g2 = gans[j];
            if (!g1 || !g2) continue;
            const vn1 = getVN(g1, 'GAN');
            const vn2 = getVN(g2, 'GAN');

            // Hợp
            GAN_HOP.forEach(h => {
                if (h.pair.has(g1) && h.pair.has(g2)) {
                    relationships.thien_can.push({
                        loai: 'Hợp',
                        ten: h.name,
                        tru: `${pillars[i]} - ${pillars[j]}`,
                        chi_tiet: `${vn1} hợp ${vn2}`,
                        luan_giai: getText(TEXTS.THIEN_CAN_HOP, vn1, vn2)
                    });
                }
            });
            // Xung/Khắc
            GAN_XUNG.forEach(x => {
                if (x.pair.has(g1) && x.pair.has(g2)) {
                    relationships.thien_can.push({
                        loai: x.main ? 'Tương Xung' : 'Tương Khắc',
                        ten: x.name,
                        tru: `${pillars[i]} - ${pillars[j]}`,
                        chi_tiet: `${vn1} khắc/xung ${vn2}`,
                        luan_giai: getText(x.main ? TEXTS.THIEN_CAN_XUNG : TEXTS.THIEN_CAN_KHAC, vn1, vn2)
                    });
                }
            });
        }
    }

    // --- 2. ĐỊA CHI (Hợp, Xung, Hình, Hại, Phá) ---
    const activeZhiIndices = zhis.map((z, i) => ({ z, i })).filter(x => x.z);

    const getPillarsForZhis = (targets) => {
        const foundIndices = [];
        activeZhiIndices.forEach(item => {
            if (targets.includes(item.z)) foundIndices.push(item.i);
        });
        // Remove duplicates and sort
        const unique = [...new Set(foundIndices)].sort((a, b) => a - b);
        return unique.map(i => pillars[i]).join(' - ');
    };

    const checkCombo = (indices, targetSet, type, name, exact = false, keyLookup = '') => {
        const found = indices.filter(item => targetSet.has(item.z));
        const foundValues = new Set(found.map(f => f.z));
        if (exact) {
            if (foundValues.size === targetSet.size) { // Full combo
                relationships.dia_chi.push({
                    loai: type,
                    ten: name,
                    tru: found.map(f => pillars[f.i]).join(' - '),
                    chi_tiet: Array.from(foundValues).map(k => getVN(k, 'ZHI')).join(' + '),
                    luan_giai: keyLookup ? TEXTS.TAM_HOP[keyLookup] : ''
                });
            }
        }
    };

    // Tam Hội
    checkCombo(activeZhiIndices, new Set(['寅', '卯', '辰']), 'Tam Hội', 'Phương Đông Mộc', true, 'Dần-Mão-Thìn');
    checkCombo(activeZhiIndices, new Set(['巳', '午', '未']), 'Tam Hội', 'Phương Nam Hỏa', true, 'Tỵ-Ngọ-Mùi');
    checkCombo(activeZhiIndices, new Set(['申', '酉', '戌']), 'Tam Hội', 'Phương Tây Kim', true, 'Thân-Dậu-Tuất');
    checkCombo(activeZhiIndices, new Set(['亥', '子', '丑']), 'Tam Hội', 'Phương Bắc Thủy', true, 'Hợi-Tý-Sửu');

    // Tam Hợp
    checkCombo(activeZhiIndices, new Set(['申', '子', '辰']), 'Tam Hợp', 'Thủy Cục', true, 'Thân-Tý-Thìn');
    checkCombo(activeZhiIndices, new Set(['巳', '酉', '丑']), 'Tam Hợp', 'Kim Cục', true, 'Tỵ-Dậu-Sửu');
    checkCombo(activeZhiIndices, new Set(['寅', '午', '戌']), 'Tam Hợp', 'Hỏa Cục', true, 'Dần-Ngọ-Tuất');
    checkCombo(activeZhiIndices, new Set(['亥', '卯', '未']), 'Tam Hợp', 'Mộc Cục', true, 'Hợi-Mão-Mùi');

    // Pairwise checks
    for (let i = 0; i < zhis.length; i++) {
        for (let j = i + 1; j < zhis.length; j++) {
            const z1 = zhis[i], z2 = zhis[j];
            if (!z1 || !z2) continue;

            const vn1 = getVN(z1, 'ZHI');
            const vn2 = getVN(z2, 'ZHI');
            const pairStr = [z1, z2].sort().join('');

            // Lục Hợp
            const LUC_HOP = {
                '子丑': 'Hóa Thổ', '寅亥': 'Hóa Mộc', '卯戌': 'Hóa Hỏa',
                '辰酉': 'Hóa Kim', '巳申': 'Hóa Thủy', '午未': 'Hóa Thổ'
            };
            if (LUC_HOP[pairStr]) {
                relationships.dia_chi.push({
                    loai: 'Lục Hợp',
                    ten: LUC_HOP[pairStr],
                    tru: `${pillars[i]} - ${pillars[j]}`,
                    chi_tiet: `${vn1} - ${vn2}`,
                    luan_giai: getText(TEXTS.LUC_HOP, vn1, vn2)
                });
            }

            // Lục Xung
            const LUC_XUNG = ['子午', '丑未', '寅申', '卯酉', '辰戌', '巳亥'];
            if (LUC_XUNG.includes(pairStr)) {
                relationships.dia_chi.push({
                    loai: 'Lục Xung',
                    ten: 'Trực xung',
                    tru: `${pillars[i]} - ${pillars[j]}`,
                    chi_tiet: `${vn1} - ${vn2}`,
                    luan_giai: getText(TEXTS.LUC_XUNG, vn1, vn2)
                });
            }

            // Lục Hại
            const isHai = (z1 === '子' && z2 === '未') || (z1 === '未' && z2 === '子') ||
                (z1 === '丑' && z2 === '午') || (z1 === '午' && z2 === '丑') ||
                (z1 === '寅' && z2 === '巳') || (z1 === '巳' && z2 === '寅') ||
                (z1 === '卯' && z2 === '辰') || (z1 === '辰' && z2 === '卯') ||
                (z1 === '申' && z2 === '亥') || (z1 === '亥' && z2 === '申') ||
                (z1 === '酉' && z2 === '戌') || (z1 === '戌' && z2 === '酉');
            if (isHai) {
                relationships.dia_chi.push({
                    loai: 'Lục Hại',
                    ten: 'Tương hại',
                    tru: `${pillars[i]} - ${pillars[j]}`,
                    chi_tiet: `${vn1} - ${vn2}`,
                    luan_giai: getText(TEXTS.LUC_HAI, vn1, vn2)
                });
            }

            // Tương Phá
            const isPha = (z1 === '子' && z2 === '酉') || (z1 === '酉' && z2 === '子') ||
                (z1 === '午' && z2 === '卯') || (z1 === '卯' && z2 === '午') ||
                (z1 === '巳' && z2 === '申') || (z1 === '申' && z2 === '巳') ||
                (z1 === '寅' && z2 === '亥') || (z1 === '亥' && z2 === '寅') ||
                (z1 === '辰' && z2 === '丑') || (z1 === '丑' && z2 === '辰') ||
                (z1 === '戌' && z2 === '未') || (z1 === '未' && z2 === '戌');
            if (isPha) {
                relationships.dia_chi.push({
                    loai: 'Tương Phá',
                    ten: 'Tương phá',
                    tru: `${pillars[i]} - ${pillars[j]}`,
                    chi_tiet: `${vn1} - ${vn2}`,
                    luan_giai: getText(TEXTS.TUONG_PHA, vn1, vn2)
                });
            }

            // Bán Hợp
            const BAN_HOP = [
                { set: new Set(['申', '子']), name: 'Thủy bán hợp (Sinh)', key: 'Thân-Tý' }, { set: new Set(['子', '辰']), name: 'Thủy bán hợp (Mộ)', key: 'Tý-Thìn' },
                { set: new Set(['巳', '酉']), name: 'Kim bán hợp (Sinh)', key: 'Tỵ-Dậu' }, { set: new Set(['酉', '丑']), name: 'Kim bán hợp (Mộ)', key: 'Dậu-Sửu' },
                { set: new Set(['寅', '午']), name: 'Hỏa bán hợp (Sinh)', key: 'Dần-Ngọ' }, { set: new Set(['午', '戌']), name: 'Hỏa bán hợp (Mộ)', key: 'Ngọ-Tuất' },
                { set: new Set(['亥', '卯']), name: 'Mộc bán hợp (Sinh)', key: 'Hợi-Mão' }, { set: new Set(['卯', '未']), name: 'Mộc bán hợp (Mộ)', key: 'Mão-Mùi' }
            ];
            BAN_HOP.forEach(bh => {
                if (bh.set.has(z1) && bh.set.has(z2)) {
                    relationships.dia_chi.push({
                        loai: 'Bán Hợp',
                        ten: bh.name,
                        tru: `${pillars[i]} - ${pillars[j]}`,
                        chi_tiet: `${vn1} - ${vn2}`,
                        luan_giai: getText(TEXTS.BAN_HOP, vn1, vn2) || TEXTS.BAN_HOP.DEFAULT
                    });
                }
            });

            // Ám Hợp
            const AM_HOP = [
                { set: new Set(['寅', '丑']), name: 'Minh Ám Hợp (Dần Sửu)' },
                { set: new Set(['午', '亥']), name: 'Minh Ám Hợp (Ngọ Hợi)' },
                { set: new Set(['卯', '申']), name: 'Minh Ám Hợp (Mão Thân)' },
                { set: new Set(['子', '戌']), name: 'Minh Ám Hợp (Tý Tuất)' }
            ];
            AM_HOP.forEach(ph => {
                if (ph.set.has(z1) && ph.set.has(z2)) {
                    relationships.dia_chi.push({
                        loai: 'Ám Hợp',
                        ten: ph.name,
                        tru: `${pillars[i]} - ${pillars[j]}`,
                        chi_tiet: `${vn1} - ${vn2}`,
                        luan_giai: getText(TEXTS.AM_HOP, vn1, vn2)
                    });
                }
            });
        }
    }

    // Tam Hình
    const hasDan = zhis.includes('寅'), hasTy = zhis.includes('巳'), hasThan = zhis.includes('申');
    if (hasDan && hasTy && hasThan) {
        relationships.dia_chi.push({
            loai: 'Tam Hình',
            ten: 'Vô Ân (Đủ 3)',
            tru: getPillarsForZhis(['寅', '巳', '申']),
            chi_tiet: 'Dần - Tỵ - Thân',
            luan_giai: TEXTS.TAM_HINH['Dần-Tỵ-Thân']
        });
    } else {
        if (hasDan && hasTy) relationships.dia_chi.push({ loai: 'Bán Hình', ten: 'Hình nhau (Vô Ân)', tru: getPillarsForZhis(['寅', '巳']), chi_tiet: 'Dần - Tỵ', luan_giai: getText(TEXTS.BAN_HINH, 'Dần', 'Tỵ') });
        if (hasTy && hasThan) relationships.dia_chi.push({ loai: 'Bán Hình', ten: 'Hình nhau (Vô Ân)', tru: getPillarsForZhis(['巳', '申']), chi_tiet: 'Tỵ - Thân', luan_giai: getText(TEXTS.BAN_HINH, 'Tỵ', 'Thân') });
        if (hasThan && hasDan) relationships.dia_chi.push({ loai: 'Bán Hình', ten: 'Hình nhau (Vô Ân)', tru: getPillarsForZhis(['申', '寅']), chi_tiet: 'Thân - Dần', luan_giai: getText(TEXTS.BAN_HINH, 'Thân', 'Dần') });
    }
    const hasSuu = zhis.includes('丑'), hasMui = zhis.includes('未'), hasTuat = zhis.includes('戌');
    if (hasSuu && hasMui && hasTuat) {
        relationships.dia_chi.push({
            loai: 'Tam Hình',
            ten: 'Thị Thế (Đủ 3)',
            tru: getPillarsForZhis(['丑', '未', '戌']),
            chi_tiet: 'Sửu - Mùi - Tuất',
            luan_giai: TEXTS.TAM_HINH['Sửu-Mùi-Tuất']
        });
    } else {
        if (hasSuu && hasMui) relationships.dia_chi.push({ loai: 'Bán Hình', ten: 'Hình nhau (Thị Thế)', tru: getPillarsForZhis(['丑', '未']), chi_tiet: 'Sửu - Mùi', luan_giai: getText(TEXTS.BAN_HINH, 'Sửu', 'Mùi') });
        if (hasMui && hasTuat) relationships.dia_chi.push({ loai: 'Bán Hình', ten: 'Hình nhau (Thị Thế)', tru: getPillarsForZhis(['未', '戌']), chi_tiet: 'Mùi - Tuất', luan_giai: getText(TEXTS.BAN_HINH, 'Mùi', 'Tuất') });
        if (hasTuat && hasSuu) relationships.dia_chi.push({ loai: 'Bán Hình', ten: 'Hình nhau (Thị Thế)', tru: getPillarsForZhis(['戌', '丑']), chi_tiet: 'Tuất - Sửu', luan_giai: getText(TEXTS.BAN_HINH, 'Tuất', 'Sửu') });
    }

    if (zhis.includes('子') && zhis.includes('卯')) {
        relationships.dia_chi.push({
            loai: 'Tương Hình',
            ten: 'Vô Lễ Tri Hình',
            tru: getPillarsForZhis(['子', '卯']),
            chi_tiet: 'Tý - Mão',
            luan_giai: TEXTS.TAM_HINH['Tý-Mão']
        });
    }
    ['辰', '午', '酉', '亥'].forEach(z => {
        if (zhis.filter(x => x === z).length >= 2) {
            relationships.dia_chi.push({
                loai: 'Tự Hình',
                ten: 'Tự Hình',
                tru: getPillarsForZhis([z]),
                chi_tiet: `${getVN(z, 'ZHI')}`,
                luan_giai: TEXTS.TAM_HINH['Tự Hình']
            });
        }
    });

    // --- 3. TÀNG CAN ---
    zhis.forEach((z, i) => {
        const hiddens = ganzhi.getTangCan(z);
        if (hiddens && hiddens.length) {
            relationships.tang_can.push({
                tru: pillars[i],
                chi: getVN(z, 'ZHI'),
                can_tang: hiddens.map(h => ({ can: getVN(h.can, 'GAN'), than: ganzhi.getThapThan(getVN(ctx.gans[2], 'GAN'), getVN(h.can, 'GAN')) }))
            });
        }
    });

    // --- 4. CĂN KHÍ (ROOTS) & ĐẮC LỆNH ---
    // Check if Day Master (or any stem) is rooted.
    gans.forEach((g, i) => {
        const ganVN = getVN(g, 'GAN');
        const roots = [];
        const isDayMaster = i === 2;

        // Check local branch (Zhis[i]) - "Tọa"
        // And check all other branches - "Thông căn"
        zhis.forEach((z, j) => {
            const hiddens = ganzhi.getTangCan(z); // Array of {can: '...'} (Kanji)
            // Check if g is in hiddens
            // h.can is Kanji. g is Kanji.
            const matchIndex = hiddens.findIndex(h => h.can === g);
            if (matchIndex !== -1) {
                const zhiVN = getVN(z, 'ZHI');
                // Type of root based on index: 0=Main (Bản khí), 1=Middle (Trung), 2=Residual (Dư)
                // Note: TANG_CAN lists Main Qi first? 
                // Let's check ganhi.js TANG_CAN structure.
                // '子': [{ can: 'Quý' }] -> Main
                // '丑': [{ can: 'Kỷ' }, { can: 'Quý' }, { can: 'Tân' }] -> Main, Middle, Residual (standard ordering).
                // So index 0 is Strongest.
                const type = matchIndex === 0 ? 'Bản khí (Gốc chính)' : (matchIndex === 1 ? 'Trung khí' : 'Dư khí');
                roots.push({
                    tru: pillars[j],
                    chi: zhiVN,
                    loai: type,
                    cuong_do: matchIndex === 0 ? 3 : (matchIndex === 1 ? 2 : 1)
                });
            }
        });

        relationships.can_khi.push({
            tru: pillars[i],
            can: ganVN,
            is_nhat_chu: isDayMaster,
            roots: roots,
            co_can: roots.length > 0,
            trang_thai: roots.length === 0 ? 'Vô căn (Trôi nổi)' : (roots.some(r => r.cuong_do === 3) ? 'Căn vượng (Có gốc chính)' : 'Căn nhược (Chỉ có dư khí/trung khí)')
        });
    });

    // --- 5. LUẬN MẠNH YẾU SƠ BỘ ---
    // Đắc Lệnh: Month Branch supports Day Stem?
    const dayGan = gans[2];
    const monthZhi = zhis[1];
    const dayGanEle = ganzhi.ganToElement(dayGan); // Returns VN Element
    const monthZhiEle = ganzhi.zhiToElement(monthZhi); // Returns VN Element

    // Simple command check: Same element or Generating element (Mother generates Child)
    const isDacLenh = (dayGanEle === monthZhiEle) || (ganzhi.generates(monthZhiEle, dayGanEle));

    // Đắc Địa: Day Branch supports Day Stem? (Sitting on Root or Storage)
    const dayZhi = zhis[2];
    const dayRoot = relationships.can_khi[2].roots.find(r => r.tru === 'Ngày');
    const isDacDia = !!dayRoot;

    // Đắc Thế: Many same elements or printing elements? 
    // This is complex scoring, already done in 'scores' object.
    // We can just use scores.suc_manh if available.

    relationships.manh_yeu = {
        dac_lenh: {
            status: isDacLenh,
            desc: isDacLenh ? `Đắc lệnh (Sinh vào tháng ${getVN(monthZhi, 'ZHI')} hành ${monthZhiEle}, phù/sinh cho Nhật chủ ${dayGanEle})` : `Thất lệnh (Sinh vào tháng ${getVN(monthZhi, 'ZHI')} hành ${monthZhiEle}, không sinh trợ Nhật chủ)`
        },
        dac_dia: {
            status: isDacDia,
            desc: isDacDia ? `Đắc địa (Tự tọa ${relationships.can_khi[2].trang_thai})` : `Thất địa (Ngày chi không tàng gốc của Nhật chủ)`
        },
        ket_luan_so_bo: (isDacLenh && isDacDia) ? 'Thân Vượng (Đắc lệnh, Đắc địa)' :
            (isDacLenh) ? 'Thân Vượng (Đắc lệnh)' :
                (isDacDia) ? 'Thân có căn (Đắc địa), cần xem thêm Đắc thế' : 'Thân Nhược (Cần Tỷ/Ấn trợ giúp)'
    };

    return relationships;
}

module.exports = { analyzeQuanHeCanChi };
