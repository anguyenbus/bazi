/**
 * Ganzhi (Can Chi) - Core data and conversion utilities
 * Converted from Python bazi/ganzhi.py
 */

// Thiên Can (10 Heavenly Stems)
const GANS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const GANS_VN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];

// Địa Chi (12 Earthly Branches)
const ZHIS = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZHIS_VN = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// Ngũ Hành (Five Elements)
const ELEMENTS = ['Mộc', 'Mộc', 'Hỏa', 'Hỏa', 'Thổ', 'Thổ', 'Kim', 'Kim', 'Thủy', 'Thủy'];
const ZHI_ELEMENTS = ['Thủy', 'Thổ', 'Mộc', 'Mộc', 'Thổ', 'Hỏa', 'Hỏa', 'Thổ', 'Kim', 'Kim', 'Thổ', 'Thủy'];

// Thập Thần (Ten Gods)
const SHISHEN = {
    same_yang: 'Tỷ',
    same_yin: 'Kiếp',
    generate_yang: 'Thực',
    generate_yin: 'Thương',
    wealth_yang: 'Tài+',
    wealth_yin: 'Tài-',
    officer_yang: 'Quan',
    officer_yin: 'Sát',
    seal_yang: 'Ấn',
    seal_yin: 'Kiêu'
};

// Nạp Âm (Nayin - 60 Jiazi sounds)
const NAP_AM = {
    '甲子': 'Hải Trung Kim', '乙丑': 'Hải Trung Kim',
    '丙寅': 'Lư Trung Hỏa', '丁卯': 'Lư Trung Hỏa',
    '戊辰': 'Đại Lâm Mộc', '己巳': 'Đại Lâm Mộc',
    '庚午': 'Lộ Bàng Thổ', '辛未': 'Lộ Bàng Thổ',
    '壬申': 'Kiếm Phong Kim', '癸酉': 'Kiếm Phong Kim',
    '甲戌': 'Sơn Đầu Hỏa', '乙亥': 'Sơn Đầu Hỏa',
    '丙子': 'Giản Hạ Thủy', '丁丑': 'Giản Hạ Thủy',
    '戊寅': 'Thành Đầu Thổ', '己卯': 'Thành Đầu Thổ',
    '庚辰': 'Bạch Lạp Kim', '辛巳': 'Bạch Lạp Kim',
    '壬午': 'Dương Liễu Mộc', '癸未': 'Dương Liễu Mộc',
    '甲申': 'Tỉnh Tuyền Thủy', '乙酉': 'Tỉnh Tuyền Thủy',
    '丙戌': 'Ốc Thượng Thổ', '丁亥': 'Ốc Thượng Thổ',
    '戊子': 'Tích Lịch Hỏa', '己丑': 'Tích Lịch Hỏa',
    '庚寅': 'Tùng Bách Mộc', '辛卯': 'Tùng Bách Mộc',
    '壬辰': 'Trường Lưu Thủy', '癸巳': 'Trường Lưu Thủy',
    '甲午': 'Sa Trung Kim', '乙未': 'Sa Trung Kim',
    '丙申': 'Sơn Hạ Hỏa', '丁酉': 'Sơn Hạ Hỏa',
    '戊戌': 'Bình Địa Mộc', '己亥': 'Bình Địa Mộc',
    '庚子': 'Bích Thượng Thổ', '辛丑': 'Bích Thượng Thổ',
    '壬寅': 'Kim Bạch Kim', '癸卯': 'Kim Bạch Kim',
    '甲辰': 'Phúc Đăng Hỏa', '乙巳': 'Phúc Đăng Hỏa',
    '丙午': 'Thiên Hà Thủy', '丁未': 'Thiên Hà Thủy',
    '戊申': 'Đại Dịch Thổ', '己酉': 'Đại Dịch Thổ',
    '庚戌': 'Thoa Xuyến Kim', '辛亥': 'Thoa Xuyến Kim',
    '壬子': 'Tang Đố Mộc', '癸丑': 'Tang Đố Mộc',
    '甲寅': 'Đại Khê Thủy', '乙卯': 'Đại Khê Thủy',
    '丙辰': 'Sa Trung Thổ', '丁巳': 'Sa Trung Thổ',
    '戊午': 'Thiên Thượng Hỏa', '己未': 'Thiên Thượng Hỏa',
    '庚申': 'Thạch Lựu Mộc', '辛酉': 'Thạch Lựu Mộc',
    '壬戌': 'Đại Hải Thủy', '癸亥': 'Đại Hải Thủy'
};


// Tàng Can (Hidden Stems in Branches)
const TANG_CAN = {
    '子': [{ can: 'Quý', thap_than: '' }],
    '丑': [{ can: 'Kỷ', thap_than: '' }, { can: 'Quý', thap_than: '' }, { can: 'Tân', thap_than: '' }],
    '寅': [{ can: 'Giáp', thap_than: '' }, { can: 'Bính', thap_than: '' }, { can: 'Mậu', thap_than: '' }],
    '卯': [{ can: 'Ất', thap_than: '' }],
    '辰': [{ can: 'Mậu', thap_than: '' }, { can: 'Ất', thap_than: '' }, { can: 'Quý', thap_than: '' }],
    '巳': [{ can: 'Bính', thap_than: '' }, { can: 'Mậu', thap_than: '' }, { can: 'Canh', thap_than: '' }],
    '午': [{ can: 'Đinh', thap_than: '' }, { can: 'Kỷ', thap_than: '' }],
    '未': [{ can: 'Kỷ', thap_than: '' }, { can: 'Đinh', thap_than: '' }, { can: 'Ất', thap_than: '' }],
    '申': [{ can: 'Canh', thap_than: '' }, { can: 'Nhâm', thap_than: '' }, { can: 'Mậu', thap_than: '' }],
    '酉': [{ can: 'Tân', thap_than: '' }],
    '戌': [{ can: 'Mậu', thap_than: '' }, { can: 'Tân', thap_than: '' }, { can: 'Đinh', thap_than: '' }],
    '亥': [{ can: 'Nhâm', thap_than: '' }, { can: 'Giáp', thap_than: '' }]
};

// ZHI5 - Hidden stems with weights (exact copy from Python)
const ZHI5 = {
    '子': { '癸': 8 },
    '丑': { '己': 5, '癸': 2, '辛': 1 },
    '寅': { '甲': 5, '丙': 2, '戊': 1 },
    '卯': { '乙': 8 },
    '辰': { '戊': 5, '乙': 2, '癸': 1 },
    '巳': { '丙': 5, '戊': 2, '庚': 1 },
    '午': { '丁': 5, '己': 3 },
    '未': { '己': 5, '丁': 2, '乙': 1 },
    '申': { '庚': 5, '壬': 2, '戊': 1 },
    '酉': { '辛': 8 },
    '戌': { '戊': 5, '辛': 2, '丁': 1 },
    '亥': { '壬': 5, '甲': 3 }
};

// GAN5 - Gan to element (Chinese key, Vietnamese value - exact copy from Python)
const GAN5 = {
    '甲': 'Mộc', '乙': 'Mộc', '丙': 'Hỏa', '丁': 'Hỏa', '戊': 'Thổ',
    '己': 'Thổ', '庚': 'Kim', '辛': 'Kim', '壬': 'Thủy', '癸': 'Thủy'
};


// Convert Chinese Gan to Vietnamese
const KANJI_TO_VN = {
    '\u7532': 'Giáp', '\u4E59': 'Ất', '\u4E19': 'Bính', '\u4E01': 'Đinh', '\u620A': 'Mậu',
    '\u5DF1': 'Kỷ', '\u5E9A': 'Canh', '\u8F9B': 'Tân', '\u58EC': 'Nhâm', '\u7678': 'Quý'
};
function ganToVN(gan) {
    if (KANJI_TO_VN[gan]) return KANJI_TO_VN[gan];
    const idx = GANS.indexOf(gan);
    return idx >= 0 ? GANS_VN[idx] : gan;
}

// Convert Chinese Zhi to Vietnamese
function zhiToVN(zhi) {
    const idx = ZHIS.indexOf(zhi);
    return idx >= 0 ? ZHIS_VN[idx] : zhi;
}

// Get element from Gan
function ganToElement(gan) {
    const idx = GANS.indexOf(gan);
    if (idx >= 0) return ELEMENTS[idx];
    // Check Vietnamese
    const vnIdx = GANS_VN.indexOf(gan);
    return vnIdx >= 0 ? ELEMENTS[vnIdx] : 'Thổ';
}

// Get element from Zhi
function zhiToElement(zhi) {
    const idx = ZHIS.indexOf(zhi);
    if (idx >= 0) return ZHI_ELEMENTS[idx];
    const vnIdx = ZHIS_VN.indexOf(zhi);
    return vnIdx >= 0 ? ZHI_ELEMENTS[vnIdx] : 'Thổ';
}

// Get Nap Am
function getNapAm(gan, zhi) {
    const key = `${gan}${zhi}`;
    return NAP_AM[key] || '';
}

// Get Tang Can (hidden stems)
function getTangCan(zhi) {
    return TANG_CAN[zhi] || [];
}

// Get main Gan from Zhi
function getZhiMainGan(zhi) {
    const tangCan = getTangCan(zhi);
    return tangCan.length > 0 ? tangCan[0].can : '';
}

// Calculate Thap Than (Ten Gods)
function getThapThan(dayGan, otherGan) {
    const dayIdx = GANS.indexOf(dayGan) >= 0 ? GANS.indexOf(dayGan) : GANS_VN.indexOf(dayGan);
    const otherIdx = GANS.indexOf(otherGan) >= 0 ? GANS.indexOf(otherGan) : GANS_VN.indexOf(otherGan);

    if (dayIdx < 0 || otherIdx < 0) return '';

    const dayElement = ELEMENTS[dayIdx];
    const otherElement = ELEMENTS[otherIdx];
    const dayYin = dayIdx % 2;
    const otherYin = otherIdx % 2;
    const sameYinYang = dayYin === otherYin;

    // Same element
    if (dayElement === otherElement) {
        return sameYinYang ? 'Tỷ' : 'Kiếp';
    }

    // Day generates other (Thực Thương)
    if (generates(dayElement, otherElement)) {
        return sameYinYang ? 'Thực' : 'Thương';
    }

    // Day is generated by other (Ấn Kiêu)
    if (generates(otherElement, dayElement)) {
        return sameYinYang ? 'Kiêu' : 'Ấn';
    }

    // Day controls other (Tài)
    if (controls(dayElement, otherElement)) {
        return sameYinYang ? 'Tài+' : 'Tài-';
    }

    // Other controls day (Quan Sát)
    if (controls(otherElement, dayElement)) {
        return sameYinYang ? 'Sát' : 'Quan';
    }

    return '';
}

// Check if element1 generates element2
function generates(e1, e2) {
    const cycle = { 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy', 'Thủy': 'Mộc' };
    return cycle[e1] === e2;
}

// Check if element1 controls element2
function controls(e1, e2) {
    const cycle = { 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc' };
    return cycle[e1] === e2;
}

// Get Can Khi (strength analysis)
function getCanKhi(dayElement, monthZhi) {
    const zhiElement = zhiToElement(monthZhi);
    if (dayElement === zhiElement) return 'Vượng';
    if (generates(zhiElement, dayElement)) return 'Tướng';
    if (generates(dayElement, zhiElement)) return 'Hưu';
    if (controls(dayElement, zhiElement)) return 'Tù';
    if (controls(zhiElement, dayElement)) return 'Tử';
    return 'Yếu';
}

// Get favorable elements
function getFavorable(dayElement) {
    const generating = Object.keys({ 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy', 'Thủy': 'Mộc' })
        .find(k => ({ 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy', 'Thủy': 'Mộc' })[k] === dayElement);
    return [dayElement, generating].filter(Boolean);
}

// Get unfavorable elements
function getUnfavorable(dayElement) {
    const controlling = Object.keys({ 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc' })
        .find(k => ({ 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc' })[k] === dayElement);
    return [controlling].filter(Boolean);
}

// Vòng Trường Sinh (12 Life Stages)
const TRANG_SINH_NAMES = ['Tr.Sinh', 'Mộc Dục', 'Quan Đới', 'L.Quan', 'Đ.Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];

const TRANG_SINH_START = {
    'Giáp': 'Hợi', 'Bính': 'Dần', 'Mậu': 'Dần', 'Canh': 'Tỵ', 'Nhâm': 'Thân', // Dương
    'Ất': 'Ngọ', 'Đinh': 'Dậu', 'Kỷ': 'Dậu', 'Tân': 'Tý', 'Quý': 'Mão'        // Âm
};

// Calculate Vong Trang Sinh status
function getVongTrangSinh(gan, zhi) {
    const ganVN = ganToVN(gan);
    const zhiVN = zhiToVN(zhi);

    if (!TRANG_SINH_START[ganVN]) return '';

    const startZhi = TRANG_SINH_START[ganVN];
    const startIdx = ZHIS_VN.indexOf(startZhi);
    const currentIdx = ZHIS_VN.indexOf(zhiVN);

    const ganIdx = GANS_VN.indexOf(ganVN);
    const isYang = ganIdx % 2 === 0;

    let offset;
    if (isYang) {
        offset = (currentIdx - startIdx + 12) % 12;
    } else {
        offset = (startIdx - currentIdx + 12) % 12;
    }

    return TRANG_SINH_NAMES[offset];
}

// Gan Yin/Yang
const GAN_YIN_YANG = {
    'Giáp': 'Dương', 'Ất': 'Âm',
    'Bính': 'Dương', 'Đinh': 'Âm',
    'Mậu': 'Dương', 'Kỷ': 'Âm',
    'Canh': 'Dương', 'Tân': 'Âm',
    'Nhâm': 'Dương', 'Quý': 'Âm'
};

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

// Import extended data
const ganzhiData = require('./ganzhi_data');

module.exports = {
    GANS, GANS_VN, ZHIS, ZHIS_VN, ELEMENTS, ZHI_ELEMENTS,
    NAP_AM, TANG_CAN, ZHI5, GAN5, GAN_YIN_YANG,
    ganToVN, zhiToVN, ganToElement, zhiToElement,
    getNapAm, getTangCan, getZhiMainGan, getThapThan,
    generates, controls, getCanKhi, getFavorable, getUnfavorable,
    getVongTrangSinh, removeDiacritics,
    // Extended data from ganzhi_data.js
    ...ganzhiData
};
