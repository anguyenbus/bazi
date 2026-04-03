/**
 * Shen Sha (Thần Sát) - Stars and special markers
 * Converted from Python bazi/shensha.py
 */

const ganzhi = require('./ganzhi');

// Thần Sát data
const SHEN_SHA = {
    // Based on Year Zhi (The 12 Yearly Gods - Vòng Thái Tuế)
    yearly_cycle: {
        'Thái Tuế': 0, 'Thái Dương': 1, 'Tang Môn': 2, 'Thái Âm': 3,
        'Quan Phù': 4, 'Tử Phù': 5, 'Tuế Phá': 6, 'Long Đức': 7,
        'Bạch Hổ': 8, 'Phúc Đức': 9, 'Điếu Khách': 10, 'Trực Phù': 11
    },
    // Based on Year Zhi (natal) -> check target Zhi
    year_based: {
        'Cô Thần': {
            '子': 'Dần', '丑': 'Dần', '寅': 'Tỵ', '卯': 'Tỵ', '辰': 'Tỵ', '巳': 'Thân',
            '午': 'Thân', '未': 'Thân', '申': 'Hợi', '酉': 'Hợi', '戌': 'Hợi', '亥': 'Dần'
        },
        'Quả Tú': {
            '子': 'Tuất', '丑': 'Tuất', '寅': 'Sửu', '卯': 'Sửu', '辰': 'Sửu', '巳': 'Thìn',
            '午': 'Thìn', '未': 'Thìn', '申': 'Mùi', '酉': 'Mùi', '戌': 'Mùi', '亥': 'Tuất'
        },
        'Kiếp Sát': {
            '子': 'Tỵ', '丑': 'Dần', '寅': 'Hợi', '卯': 'Thân', '辰': 'Tỵ', '巳': 'Dần',
            '午': 'Hợi', '未': 'Thân', '申': 'Tỵ', '酉': 'Dần', '戌': 'Hợi', '亥': 'Thân'
        },
        'Vong Thần': {
            '子': 'Hợi', '丑': 'Thân', '寅': 'Tỵ', '卯': 'Dần', '辰': 'Hợi', '巳': 'Thân',
            '午': 'Tỵ', '未': 'Dần', '申': 'Hợi', '酉': 'Thân', '戌': 'Tỵ', '亥': 'Dần'
        },
        'Hồng Loan': {
            '子': 'Mão', '丑': 'Dần', '寅': 'Sửu', '卯': 'Tý', '辰': 'Hợi', '巳': 'Tuất',
            '午': 'Dậu', '未': 'Thân', '申': 'Mùi', '酉': 'Ngọ', '戌': 'Tỵ', '亥': 'Thìn'
        },
        'Thiên Hỉ': {
            '子': 'Dậu', '丑': 'Thân', '寅': 'Mùi', '卯': 'Ngọ', '辰': 'Tỵ', '巳': 'Thìn',
            '午': 'Mão', '未': 'Dần', '申': 'Sửu', '酉': 'Tý', '戌': 'Hợi', '亥': 'Tuất'
        },
        'Tai Sát': {
            '子': 'Ngọ', '丑': 'Mão', '寅': 'Tý', '卯': 'Dậu', '辰': 'Ngọ', '巳': 'Mão',
            '午': 'Tý', '未': 'Dậu', '申': 'Ngọ', '酉': 'Mão', '戌': 'Tý', '亥': 'Dậu'
        },
        'Nguyên Thần': { // Đại Hao
            '子': 'Mùi', '丑': 'Thân', '寅': 'Tỵ', '卯': 'Ngọ', '辰': 'Hợi', '巳': 'Tý',
            '午': 'Sửu', 'Mùi': 'Dần', '申': 'Tỵ', '酉': 'Ngọ', '戌': 'Hợi', '亥': 'Tý'
        },
        'Thiên Cẩu': { // 天狗 - Tai họa, thương tích
            '子': 'Tuất', '丑': 'Hợi', '寅': 'Tý', '卯': 'Sửu', '辰': 'Dần', '巳': 'Mão',
            '午': 'Thìn', '未': 'Tỵ', '申': 'Ngọ', '酉': 'Mùi', '戌': 'Thân', '亥': 'Dậu'
        },
        'Câu Giảo': { // 勾绞 - Thị phi, rắc rối
            '子': 'Dậu', '丑': 'Thân', '寅': 'Mùi', '卯': 'Ngọ', '辰': 'Tỵ', '巳': 'Thìn',
            '午': 'Mão', '未': 'Dần', '申': 'Sửu', '酉': 'Tý', '戌': 'Hợi', '亥': 'Tuất'
        },
        'Phi Nhẫn': { // 飞刃 - Tai nạn, đổ máu
            '子': 'Ngọ', '丑': 'Mùi', '寅': 'Thân', '卯': 'Dậu', '辰': 'Tuất', '巳': 'Hợi',
            '午': 'Tý', '未': 'Sửu', '申': 'Dần', '酉': 'Mão', '戌': 'Thìn', '亥': 'Tỵ'
        }
    },
    // Based on Day Zhi
    day_based: {
        'Đào Hoa': {
            '子': 'Dậu', '丑': 'Ngọ', '寅': 'Mão', '卯': 'Tý', '辰': 'Dậu', '巳': 'Ngọ',
            '午': 'Mão', '未': 'Tý', '申': 'Dậu', '酉': 'Ngọ', '戌': 'Mão', '亥': 'Tý'
        },
        'Dịch Mã': {
            '子': 'Dần', '丑': 'Hợi', '寅': 'Thân', '卯': 'Tỵ', '辰': 'Dần', '巳': 'Hợi',
            '午': 'Thân', '未': 'Tỵ', '申': 'Dần', '酉': 'Hợi', '戌': 'Thân', '亥': 'Tỵ'
        },
        'Hoa Cái': {
            '子': 'Thìn', '丑': 'Sửu', '寅': 'Tuất', '卯': 'Mùi', '辰': 'Thìn', '巳': 'Sửu',
            '午': 'Tuất', '未': 'Mùi', '申': 'Thìn', '酉': 'Sửu', '戌': 'Tuất', '亥': 'Mùi'
        },
        'Lục Hại': { // 六害 - Xui xẻo
            '子': 'Mùi', '丑': 'Ngọ', '寅': 'Tỵ', '卯': 'Thìn', '辰': 'Mão', '巳': 'Dần',
            '午': 'Sửu', '未': 'Tý', '申': 'Hợi', '酉': 'Tuất', '戌': 'Dậu', '亥': 'Thân'
        },
        'Hàm Trì': { // 咸池 - Đào hoa sát
            '子': 'Dậu', '丑': 'Ngọ', '寅': 'Mão', '卯': 'Tý', '辰': 'Dậu', '巳': 'Ngọ',
            '午': 'Mão', '未': 'Tý', '申': 'Dậu', '酉': 'Ngọ', '戌': 'Mão', '亥': 'Tý'
        },
        'Mộ Khố': { // 墓库 - Kho chôn giấu
            '子': 'Sửu', '丑': 'Tuất', '寅': 'Mùi', '卯': 'Thìn', '辰': 'Sửu', '巳': 'Tuất',
            '午': 'Mùi', '未': 'Thìn', '申': 'Sửu', '酉': 'Tuất', '戌': 'Mùi', '亥': 'Thìn'
        }
    },
    // Based on Day Gan
    gan_based: {
        'Thiên Ất': {
            '甲': 'Mùi Sửu', '乙': 'Thân Tý', '丙': 'Dậu Hợi', '丁': 'Dậu Hợi', '戊': 'Mùi Sửu',
            '己': 'Thân Tý', '庚': 'Mùi Sửu', '辛': 'Dần Ngọ', '壬': 'Mão Tỵ', '癸': 'Mão Tỵ'
        },
        'Văn Xương': {
            '甲': 'Tỵ', '乙': 'Ngọ', '丙': 'Thân', '丁': 'Dậu', '戊': 'Thân',
            '己': 'Dậu', '庚': 'Hợi', '辛': 'Tý', '壬': 'Dần', '癸': 'Sửu'
        },
        'Lộc Thần': {
            '甲': 'Dần', '乙': 'Mão', '丙': 'Tỵ', '丁': 'Ngọ', '戊': 'Tỵ',
            '己': 'Ngọ', '庚': 'Thân', '辛': 'Dậu', '壬': 'Hợi', '癸': 'Tý'
        },
        'Dương Nhẫn': {
            '甲': 'Mão', '乙': 'Thìn', '丙': 'Ngọ', '丁': 'Mùi', '戊': 'Ngọ',
            '己': 'Mùi', '庚': 'Dậu', '辛': 'Tuất', '壬': 'Tý', '癸': 'Sửu'
        },
        'Kim Dư': {
            '甲': 'Thìn', '乙': 'Tỵ', '丙': 'Mùi', '丁': 'Thân', '戊': 'Mùi',
            '己': 'Thân', '庚': 'Tuất', '辛': 'Hợi', '壬': 'Sửu', '癸': 'Dần'
        },
        'Quốc Ấn': {
            '甲': 'Tuất', '乙': 'Hợi', '丙': 'Sửu', '丁': 'Dần', '戊': 'Sửu',
            '己': 'Dần', '庚': 'Thìn', '辛': 'Tỵ', '壬': 'Mùi', '癸': 'Thân'
        },
        'Thái Cực': {
            '甲': 'Tý Ngọ', '乙': 'Tý Ngọ', '丙': 'Mão Dậu', '丁': 'Mão Dậu',
            '戊': 'Thìn Tuất Sửu Mùi', '己': 'Thìn Tuất Sửu Mùi',
            '庚': 'Dần Hợi', '辛': 'Dần Hợi', '壬': 'Tỵ Thân', '癸': 'Tỵ Thân'
        },
        'Học Đường': {
            '甲': 'Tỵ', '乙': 'Ngọ', '丙': 'Thân', '丁': 'Dậu', '戊': 'Thân',
            '己': 'Dậu', '庚': 'Hợi', '辛': 'Tý', '壬': 'Dần', '癸': 'Mão'
        },
        'Phúc Tinh': {
            '甲': 'Dần Tý', '乙': 'Hợi Tuất', '丙': 'Thân', '丁': 'Mùi', '戊': 'Thân',
            '己': 'Mùi', '庚': 'Ngọ', '辛': 'Tỵ', '壬': 'Thìn', '癸': 'Mão'
        },
        'Kim Quỹ': {
            '甲': 'Mùi', '乙': 'Thân', '丙': 'Tuất', '丁': 'Hợi', '戊': 'Tuất',
            '己': 'Hợi', '庚': 'Sửu', '辛': 'Dần', '壬': 'Thìn', '癸': 'Tỵ'
        },
        'Ngọc Đường': {
            '甲': 'Dậu', '乙': 'Tuất', '丙': 'Tý', '丁': 'Sửu', '戊': 'Tý',
            '己': 'Sửu', '庚': 'Mão', '辛': 'Thìn', '壬': 'Ngọ', '癸': 'Mùi'
        },
        'Lưu Hà': {
            '甲': 'Dậu', '乙': 'Tuất', '丙': 'Mùi', '丁': 'Thân', '戊': 'Tỵ',
            '己': 'Ngọ', '庚': 'Thìn', '辛': 'Mão', '壬': 'Hợi', '癸': 'Dần'
        },
        'Thanh Long': {
            '甲': 'Dần', '乙': 'Mão', '丙': 'Tỵ', '丁': 'Ngọ', '戊': 'Thìn',
            '己': 'Mùi', '庚': 'Thân', '辛': 'Dậu', '壬': 'Hợi', '癸': 'Tý'
        },
        'Từ Quán': {
            '甲': '寅', '乙': '卯', '丙': '巳', '丁': '午', '戊': '巳',
            '己': '午', '庚': '申', '辛': '酉', '壬': '亥', '癸': '子'
        },
        'Học Sĩ': {
            '甲': '亥', '乙': '子', '丙': '寅', '丁': '卯', '戊': '寅',
            '己': '卯', '庚': '巳', '辛': '午', '壬': '申', '癸': '酉'
        },
        'Kình Dương': {
            '甲': '卯', '乙': 'Thìn', '丙': 'Ngọ', '丁': 'Mùi', '戊': 'Ngọ',
            '己': 'Mùi', '庚': 'Dậu', '辛': 'Tuất', '壬': 'Tý', '癸': 'Sửu'
        },
        'Đà La': {
            '甲': '丑', '乙': 'Dần', '丙': 'Thìn', '丁': 'Tỵ', '戊': 'Thìn',
            '己': 'Tỵ', '庚': 'Mùi', '辛': 'Thân', '壬': 'Tuất', '癸': 'Hợi'
        },
        'Hồng Diễm': {
            '甲': 'Ngọ', '乙': 'Ngọ', '丙': 'Dần', '丁': 'Mùi', '戊': 'Thìn',
            '己': 'Thìn', '庚': 'Tuất', '辛': 'Dậu', '壬': 'Tý', '癸': 'Thân'
        },
        'Thiên Quan': {
            '甲': 'Mùi', '乙': 'Thìn', '丙': 'Tỵ', '丁': 'Dần', '戊': 'Mão',
            '己': 'Dậu', '庚': 'Hợi', '辛': 'Dần', '壬': 'Tuất', '癸': 'Ngọ'
        },
        'Thiên Phúc': {
            '甲': 'Dậu', '乙': 'Thân', '丙': 'Tý', '丁': 'Hợi', '戊': 'Mão',
            '己': 'Dần', '庚': 'Ngọ', '辛': 'Tỵ', '壬': 'Ngọ', '癸': 'Tỵ'
        },
        'Thiên Trù': {
            '甲': 'Tỵ', '乙': 'Ngọ', '丙': 'Tỵ', '丁': 'Ngọ', '戊': 'Thân',
            '己': 'Dậu', '庚': 'Hợi', '辛': 'Ngọ', '壬': 'Dần', '癸': 'Sửu'
        },
        'Thiên Khố': {
            '甲': 'Tuất', '乙': 'Hợi', '丙': 'Sửu', '丁': 'Dần', '戊': 'Thìn',
            '己': 'Tỵ', '庚': 'Mùi', '辛': 'Thân', '壬': 'Tuất', '癸': 'Hợi'
        },
        'Địa Khố': {
            '甲': 'Sửu', '乙': 'Dần', '丙': 'Thìn', '丁': 'Tỵ', '戊': 'Mùi',
            '己': 'Thân', '庚': 'Tuất', '辛': 'Hợi', '壬': 'Sửu', '癸': 'Dần'
        }
    },
    // Based on Year Zhi (natal) -> check all pillars
    year_based_extended: {
        'Tướng Tinh': {
            '子': 'Tý', '申': 'Tý', '辰': 'Tý',
            '寅': 'Ngọ', '午': 'Ngọ', '戌': 'Ngọ',
            '巳': 'Dậu', '酉': 'Dậu', '丑': 'Dậu',
            '亥': 'Mão', '卯': 'Mão', '未': 'Mão'
        }
    },
    // Based on Month Zhi
    month_based: {
        'Thiên Đức': {
            '寅': 'Đinh', '卯': 'Thân', '辰': 'Nhâm', '巳': 'Tân',
            '午': 'Hợi', '未': 'Giáp', '申': 'Quý', '酉': 'Dần',
            '戌': 'Bính', '亥': 'Ất', '子': 'Tỵ', '丑': 'Canh'
        },
        'Nguyệt Đức': {
            '寅': 'Bính', '卯': 'Giáp', '辰': 'Nhâm', '巳': 'Canh',
            '午': 'Bính', '未': 'Giáp', '申': 'Nhâm', '酉': 'Canh',
            '戌': 'Bính', '亥': 'Giáp', '子': 'Nhâm', '丑': 'Canh'
        },
        'Thiên Đức Hợp': {
            '寅': 'Nhâm', '卯': '巳', '辰': 'Đinh', '巳': '丙',
            '午': '寅', '未': 'Kỷ', '申': 'Mậu', '酉': 'Hợi',
            '戌': 'Tân', '亥': 'Canh', '子': 'Bính', '丑': 'Ất'
        },
        'Nguyệt Đức Hợp': {
            '寅': 'Tân', '卯': 'Kỷ', '辰': 'Đinh', '巳': 'Ất',
            '午': 'Tân', '未': 'Kỷ', '申': 'Đinh', '酉': 'Ất',
            '戌': 'Tân', '亥': 'Kỷ', '子': 'Đinh', '丑': 'Ất'
        },
        'Thiên Y': {
            '寅': '丑', '卯': '寅', '辰': 'Mão', '巳': 'Thìn',
            '午': '巳', '未': 'Ngọ', '申': 'Mùi', '酉': 'Thân',
            '戌': 'Dậu', '亥': 'Tuất', '子': 'Hợi', '丑': 'Tý'
        },
        'Thiên Giải': {
            '寅': 'Thân', '卯': 'Thân', '辰': 'Dậu', '巳': 'Dậu',
            '午': 'Tuất', '未': 'Tuất', '申': 'Hợi', '酉': 'Hợi',
            '戌': 'Ngọ', '亥': 'Ngọ', '子': 'Mùi', '丑': 'Mùi'
        },
        'Địa Giải': {
            '寅': 'Mùi', '卯': 'Thân', '辰': 'Dậu', '巳': 'Tuất',
            '午': 'Hợi', '未': 'Tý', '申': 'Sửu', '酉': 'Dần',
            '戌': 'Mão', '亥': 'Thìn', '子': 'Tỵ', '丑': 'Ngọ'
        },
        'Huyết Nhẫn': {
            '寅': 'Tuất', '卯': 'Dậu', '辰': 'Thân', '巳': 'Mùi',
            '午': 'Ngọ', '未': 'Tỵ', '申': 'Thìn', '酉': 'Mão',
            '戌': 'Dần', '亥': 'Sửu', '子': 'Tý', '丑': 'Hợi'
        },
        'Giải Thần': {
            '寅': 'Thân', '卯': 'Thân', '辰': 'Dậu', '巳': 'Dậu',
            '午': 'Tuất', '未': 'Tuất', '申': 'Hợi', '酉': 'Hợi',
            '戌': 'Ngọ', '亥': 'Ngọ', '子': 'Mùi', '丑': 'Mùi'
        },
        'Nguyệt Phá': {
            '寅': 'Thân', '卯': 'Dậu', '辰': 'Tuất', '巳': 'Hợi',
            '午': 'Tý', '未': 'Sửu', '申': 'Dần', '酉': 'Mão',
            '戌': 'Thìn', '亥': 'Tỵ', '子': 'Ngọ', '丑': 'Mùi'
        },
        'Nguyệt Sát': {
            '寅': 'Sửu', '卯': 'Tuất', '辰': 'Mùi', '巳': 'Thìn',
            '午': 'Sửu', '未': 'Tuất', '申': 'Mùi', '酉': 'Thìn',
            '戌': 'Sửu', '亥': 'Tuất', '子': 'Mùi', '丑': 'Thìn'
        },
        'Nguyệt Yếm': {
            '寅': 'Tuất', '卯': 'Dậu', '辰': 'Thân', '巳': 'Mùi',
            '午': 'Ngọ', '未': 'Tỵ', '申': 'Thìn', '酉': 'Mão',
            '戌': 'Dần', '亥': 'Sửu', '子': 'Tý', '丑': 'Hợi'
        },
        'Nguyệt Hại': {
            '寅': 'Tỵ', '卯': 'Thìn', '辰': 'Mão', '巳': 'Dần',
            '午': 'Sửu', '未': 'Tý', '申': 'Hợi', '酉': 'Tuất',
            '戌': 'Dậu', '亥': 'Thân', '子': 'Mùi', '丑': 'Ngọ'
        },
        'Thiên Tặc': {
            '寅': 'Thìn', '卯': 'Dậu', '辰': 'Dần', '巳': 'Mùi',
            '午': 'Tý', '未': 'Tỵ', '申': 'Tuất', '酉': 'Mão',
            '戌': 'Thân', '亥': 'Sửu', '子': 'Ngọ', '丑': 'Hợi'
        },
        'Nguyệt Tặc': {
            '寅': 'Ngọ', '卯': 'Tý', '辰': 'Tỵ', '巳': 'Mùi',
            '午': 'Dậu', '未': 'Sửu', '申': 'Hợi', '酉': 'Tỵ',
            '戌': 'Thìn', '亥': 'Dần', '子': 'Thân', '丑': 'Mão'
        },
        'Thọ Tử': {
            '寅': 'Tuất', '卯': 'Thìn', '辰': 'Hợi', '巳': 'Tỵ',
            '午': 'Tý', '未': 'Ngọ', '申': 'Sửu', '酉': 'Mùi',
            '戌': 'Dần', '亥': 'Thân', '子': 'Mão', '丑': 'Dậu'
        },
        'Sát Chủ': {
            '寅': 'Tỵ', '卯': 'Tý', '辰': 'Mùi', '巳': 'Mão',
            '午': 'Thân', '未': 'Tuất', '申': 'Thìn', '酉': 'Hợi',
            '戌': 'Sửu', '亥': 'Ngọ', '子': 'Dần', '丑': 'Dậu'
        },
        'Thiên Quý': {
            '寅': 'Giáp', '卯': 'Ất', '辰': 'Giáp', '巳': 'Bính',
            '午': 'Đinh', '未': 'Bính', '申': 'Canh', '酉': 'Tân',
            '戌': 'Canh', '亥': 'Nhâm', '子': 'Quý', '丑': 'Nhâm'
        },
        'Nguyệt Quý': {
            '寅': 'Bính', '卯': 'Đinh', '辰': 'Bính', '巳': 'Canh',
            '午': 'Tân', '未': 'Canh', '申': 'Nhâm', '酉': 'Quý',
            '戌': 'Nhâm', '亥': 'Giáp', '子': 'Ất', '丑': 'Giáp'
        },
        'Thánh Tâm': {
            '寅': 'Hợi', '卯': 'Tỵ', '辰': 'Tý', '巳': 'Ngọ',
            '午': 'Sửu', '未': 'Mùi', '申': 'Dần', '酉': 'Thân',
            '戌': 'Mão', '亥': 'Dậu', '子': 'Thìn', '丑': 'Tuất'
        },
        'Ngũ Phú': {
            '寅': 'Hợi', '卯': 'Dần', '辰': 'Tỵ', '巳': 'Thân',
            '午': 'Hợi', '未': 'Dần', '申': 'Tỵ', '酉': 'Thân',
            '戌': 'Hợi', '亥': 'Dần', '子': 'Tỵ', '丑': 'Thân'
        },
        'Lộc Mã': {
            '寅': 'Thân', '卯': 'Tỵ', '辰': 'Dần', '巳': 'Hợi',
            '午': 'Thân', '未': 'Tỵ', '申': 'Dần', '酉': 'Hợi',
            '戌': 'Thân', '亥': 'Tỵ', '子': 'Dần', '丑': 'Hợi'
        },
        'Phổ Hộ': {
            '寅': 'Thân', '卯': 'Dần', '辰': 'Hợi', '巳': 'Thìn', '午': 'Tỵ', '未': 'Ngọ',
            '申': 'Mùi', '酉': 'Thân', '戌': 'Dậu', '亥': 'Tuất', '子': 'Hợi', '丑': 'Tý'
        },
        'Ích Hậu': {
            '寅': 'Tý', '卯': 'Thân', '辰': 'Tỵ', '巳': 'Dần', '午': 'Hợi', '未': 'Thân',
            '申': 'Tỵ', '酉': 'Dần', '戌': 'Hợi', '亥': 'Thân', '子': 'Tỵ', '丑': 'Dần'
        },
        'Tục Thế': {
            '寅': 'Hợi', '卯': 'Dần', '辰': 'Tỵ', '巳': 'Thân', '午': 'Hợi', '未': 'Dần',
            '申': 'Tỵ', '酉': 'Thân', '戌': 'Hợi', '亥': 'Dần', '子': 'Tỵ', '丑': 'Thân'
        },
        'Hoạt Diệu': {
            '寅': '午', '卯': 'Tỵ', '辰': 'Thìn', '巳': 'Mão', '午': 'Dần', '未': 'Sửu',
            '申': 'Tý', '酉': 'Hợi', '戌': 'Tuất', '亥': 'Dậu', '子': 'Thân', '丑': 'Mùi'
        },
        'Dân Nhật': {
            '寅': 'Ngọ', '卯': '寅', '辰': 'Hợi', '巳': 'Thân', '午': 'Tỵ', '未': 'Mão',
            '申': 'Tý', '酉': 'Dậu', '戌': 'Mùi', '亥': 'Thìn', '子': 'Sửu', '丑': 'Tuất'
        },
        'Thời Đức': {
            '寅': 'Ngọ', '卯': 'Ngọ', '辰': 'Ngọ', '巳': 'Dậu', '午': 'Dậu', '未': 'Dậu',
            '申': 'Tý', '酉': 'Tý', '戌': 'Tý', '亥': 'Mão', '子': 'Mão', '丑': 'Mão'
        },
        'Ngọc Vũ': {
            '寅': 'Tý', '卯': 'Sửu', '辰': 'Dần', '巳': 'Mão', '午': 'Thìn', '未': 'Tỵ',
            '申': 'Ngọ', '酉': 'Mùi', '戌': 'Thân', '亥': 'Dậu', '子': 'Tuất', '丑': 'Hợi'
        },
        'Kim Đường': {
            '寅': 'Hợi', '卯': 'Tuất', '辰': 'Dậu', '巳': 'Thân', '午': 'Mùi', '未': 'Ngọ',
            '申': 'Tỵ', '酉': 'Thìn', '戌': 'Mão', '亥': 'Dần', '子': 'Sửu', '丑': 'Tý'
        },
        'Minh Đường': {
            '寅': 'Sửu', '卯': 'Dần', '辰': 'Mão', '巳': 'Thìn', '午': 'Tỵ', '未': 'Ngọ',
            '申': 'Mùi', '酉': 'Thân', '戌': 'Dậu', '亥': 'Tuất', '子': 'Hợi', '丑': 'Tý'
        },
        'Thiên Ân': {
            '寅': 'Giáp', '卯': 'Ất', '辰': 'Bính', '巳': 'Đinh', '午': 'Mậu', '未': 'Kỷ',
            '申': 'Canh', '酉': 'Tân', '戌': 'Nhâm', '亥': 'Quý', '子': 'Giáp', '丑': 'Ất'
        },
        'Phục Tội': {
            '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi',
            '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi', '子': 'Tý', '丑': 'Sửu'
        },
        'Bát Tọa': {
            '寅': 'Thìn', '卯': '巳', '辰': 'Ngọ', '巳': 'Mùi', '午': 'Thân', '未': 'Dậu',
            '申': 'Tuất', '酉': 'Hợi', '戌': 'Tý', '亥': 'Sửu', '子': 'Dần', '丑': 'Mão'
        },
        'Thiên Hình': {
            '寅': 'Dần', '卯': 'Tỵ', '辰': 'Thân', '巳': 'Hợi', '午': 'Dần', '未': 'Tỵ',
            '申': 'Thân', '酉': 'Hợi', '戌': 'Dần', '亥': 'Tỵ', '子': 'Thân', '丑': 'Hợi'
        },
        'Thiên Lao': {
            '寅': 'Thân', '卯': 'Hợi', '辰': 'Dần', '巳': 'Tỵ', '午': 'Thân', '未': 'Hợi',
            '申': 'Dần', '酉': 'Tỵ', '戌': 'Thân', '亥': 'Hợi', '子': 'Dần', '丑': 'Tỵ'
        },
        'Hà Khôi': {
            '寅': 'Hợi', '卯': 'Tuất', '辰': 'Dậu', '巳': 'Thân', '午': 'Mùi', '未': 'Ngọ',
            '申': 'Tỵ', '酉': 'Thìn', '戌': 'Mão', '亥': 'Dần', '子': 'Sửu', '丑': 'Tý'
        },
        'Thiên Ngục': {
            '寅': 'Tỵ', '卯': 'Thân', '辰': 'Hợi', '巳': 'Dần', '午': 'Tỵ', '未': 'Thân',
            '申': 'Hợi', '酉': 'Dần', '戌': 'Tỵ', '亥': 'Thân', '子': 'Hợi', '丑': 'Dần'
        },
        'Địa Phá': {
            '寅': 'Hợi', '卯': 'Tuất', '辰': 'Dậu', '巳': 'Thân', '午': 'Mùi', '未': 'Ngọ',
            '申': 'Tỵ', '酉': 'Thìn', '戌': 'Mão', '亥': 'Dần', '子': 'Sửu', '丑': 'Tý'
        },
        'Địa Tặc': {
            '寅': 'Sửu', '卯': 'Dần', '辰': 'Mão', '巳': 'Thìn', '午': 'Tỵ', '未': 'Ngọ',
            '申': 'Mùi', '酉': 'Thân', '戌': 'Dậu', '亥': 'Tuất', '子': 'Hợi', '丑': 'Tý'
        },
        'Địa Nang': {
            '寅': 'Thìn', '卯': 'Tỵ', '辰': 'Ngọ', '巳': 'Mùi', '午': 'Thân', '未': 'Dậu',
            '申': 'Tuất', '酉': 'Hợi', '戌': 'Tý', '亥': 'Sửu', '子': 'Dần', '丑': 'Mão'
        },
        'Địa Hỏa': {
            '寅': 'Tuất', '卯': 'Dậu', '辰': 'Thân', '巳': 'Mùi', '午': 'Ngọ', '未': 'Tỵ',
            '申': 'Thìn', '酉': 'Mão', '戌': 'Dần', '亥': 'Sửu', '子': 'Tý', '丑': 'Hợi'
        },
        'Thiên Hỏa': {
            '寅': 'Tý', '卯': 'Mão', '辰': 'Ngọ', '巳': 'Dậu', '午': 'Tý', '未': 'Mão',
            '申': 'Ngọ', '酉': 'Dậu', '戌': 'Tý', '亥': 'Mão', '子': 'Ngọ', '丑': 'Dậu'
        },
        'Độc Hỏa': {
            '寅': '巳', '卯': 'Thân', '辰': 'Hợi', '巳': 'Dần', '午': '巳', '未': 'Thân',
            '申': 'Hợi', '酉': 'Dần', '戌': '巳', '亥': 'Thân', '子': 'Hợi', '丑': 'Dần'
        },
        'Ngũ Quỷ': {
            '寅': 'Ngọ', '卯': 'Mùi', '辰': 'Thân', '巳': 'Dậu', '午': 'Tuất', '未': 'Hợi',
            '申': 'Tý', '酉': 'Sửu', '戌': 'Dần', '亥': 'Mão', '子': 'Thìn', '丑': 'Tỵ'
        },
        'Phi Ma Sát': {
            '寅': 'Tỵ', '卯': 'Tỵ', '辰': 'Tỵ', '巳': 'Thân', '午': 'Thân', '未': 'Thân',
            '申': 'Hợi', '酉': 'Hợi', '戌': 'Hợi', '亥': 'Dần', '子': 'Dần', '丑': 'Dần'
        },
        'Hỏa Tai': {
            '寅': 'Ngọ', '卯': 'Ngọ', '辰': 'Ngọ', '巳': 'Dậu', '午': 'Dậu', '未': 'Dậu',
            '申': 'Tý', '酉': 'Tý', '戌': 'Tý', '亥': 'Mão', '子': 'Mão', '丑': 'Mão'
        },
        'Vãng Vong': {
            '寅': 'Dần', '卯': 'Tỵ', '辰': 'Thân', '巳': 'Hợi', '午': 'Mão', '未': 'Ngọ',
            '申': 'Dậu', '酉': 'Tý', '戌': 'Thìn', '亥': 'Mùi', '子': 'Tuất', '丑': 'Sửu'
        },
        'Câu Trận': {
            '寅': 'Thìn', '卯': '巳', '辰': 'Ngọ', '巳': 'Mùi', '午': 'Thân', '未': 'Dậu',
            '申': 'Tuất', '酉': 'Hợi', '戌': 'Tý', '亥': 'Sửu', '子': 'Dần', '丑': 'Mão'
        },
        'Chu Tước': {
            '寅': 'Mão', '卯': 'Thìn', '辰': 'Tỵ', '巳': 'Ngọ', '午': 'Mùi', '未': 'Thân',
            '申': 'Dậu', '酉': 'Tuất', '戌': 'Hợi', '亥': 'Tý', '子': 'Sửu', '丑': 'Dần'
        },
        'Huyền Vũ': {
            '寅': 'Dậu', '卯': 'Tuất', '辰': 'Hợi', '巳': 'Tý', '午': 'Sửu', '未': 'Dần',
            '申': 'Mão', '酉': 'Thìn', '戌': 'Tỵ', '亥': 'Ngọ', '子': 'Mùi', '丑': 'Thân'
        },
        'U Vi': {
            '寅': 'Mùi', '卯': 'Thân', '辰': 'Dậu', '巳': 'Tuất', '午': 'Hợi', '未': 'Tý',
            '申': 'Sửu', '酉': 'Dần', '戌': 'Mão', '亥': 'Thìn', '子': 'Tỵ', '丑': 'Ngọ'
        },
        'Dịch Thế': {
            '寅': 'Sửu', '卯': 'Dần', '辰': 'Mão', '巳': 'Thìn', '午': 'Tỵ', '未': 'Ngọ',
            '申': 'Mùi', '酉': 'Thân', '戌': 'Dậu', '亥': 'Tuất', '子': 'Hợi', '丑': 'Tý'
        },
        'Mẫu Thương': {
            '寅': 'Hợi', '卯': 'Tý', '辰': 'Sửu', '巳': 'Dần', '午': 'Mão', '未': 'Thìn',
            '申': 'Tỵ', '酉': 'Ngọ', '戌': 'Mùi', '亥': 'Thân', '子': 'Dậu', '丑': 'Tuất'
        },
        'Minh Phế': {
            '寅': 'Thân', '卯': 'Dậu', '辰': 'Tuất', '巳': 'Hợi', '午': 'Tý', '未': 'Sửu',
            '申': 'Dần', '酉': 'Mão', '戌': 'Thìn', '亥': 'Tỵ', '子': 'Ngọ', '丑': 'Mùi'
        },
        'Tứ Ly': {
            '寅': 'Mão', '卯': 'Ngọ', '辰': 'Dậu', '巳': 'Tý', '午': 'Mão', '未': 'Ngọ',
            '申': 'Dậu', '酉': 'Tý', '戌': 'Mão', '亥': 'Ngọ', '子': 'Dậu', '丑': 'Tý'
        },
        'Tứ Tuyệt': {
            '寅': 'Hợi', '卯': 'Dần', '辰': 'Tỵ', '巳': 'Thân', '午': 'Hợi', '未': 'Dần',
            '申': 'Tỵ', '酉': 'Thân', '戌': 'Hợi', '亥': 'Dần', '子': 'Tỵ', '丑': 'Thân'
        },
        'Tam Ưu': {
            '寅': 'Tuất', '卯': 'Hợi', '辰': 'Tý', '巳': 'Sửu', '午': 'Dần', '未': 'Mão',
            '申': 'Thìn', '酉': 'Tỵ', '戌': 'Ngọ', '亥': 'Mùi', '子': 'Thân', '丑': 'Dậu'
        }
    },
    // Based on Season (Spring, Summer, Autumn, Winter)
    season_based: {
        'Thiên Xá': {
            'Xuân': 'Mậu Dần', 'Hạ': 'Giáp Ngọ', 'Thu': 'Mậu Thân', 'Đông': 'Giáp Tý'
        },
        'Tứ Phế': {
            'Xuân': 'Canh Thân Tân Dậu', 'Hạ': 'Nhâm Tý Quý Hợi',
            'Thu': 'Giáp Dần Ất Mão', 'Đông': 'Bính Ngọ Đinh Tỵ'
        },
        'Hoang Vu': {
            'Xuân': 'Tỵ Dậu Sửu', 'Hạ': 'Thân Tý Thìn', 'Thu': 'Hợi Mão Mùi', 'Đông': 'Dần Ngọ Tuất'
        }
    }
};

// Thần Sát descriptions
const SHEN_SHA_INFO = {
    'Cô Thần': 'Cô tịch, cô độc. Nam sợ Cô Thần.',
    'Quả Tú': 'Tương tự Cô Thần. Nữ sợ Quả Tú.',
    'Đào Hoa': 'Tình duyên, yêu đương. Hung nhiều nếu không đắc dụng.',
    'Dịch Mã': 'Di chuyển, thay đổi. Hỷ có Quý nhân.',
    'Hoa Cái': 'Nghệ thuật, tài năng đặc biệt.',
    'Thiên Ất': 'Quý nhân. Giải nạn, gặp hung hóa cát.',
    'Văn Xương': 'Văn chương, học văn.',
    'Lộc Thần': 'Tài lộc, bổng lộc. May mắn về tiền bạc.',
    'Dương Nhẫn': 'Hung sát mạnh. Tính nóng nảy, dễ tai họa.',
    'Kim Dư': 'Sang trọng, giàu có, cuộc sống sung túc.',
    'Hồng Loan': 'Hôn nhân, tình duyên. Dấu hiệu kết hôn.',
    'Thiên Hỉ': 'Vui vẻ, hôn nhân, tin vui.',
    'Kiếp Sát': 'Hung sát. Tai họa, tranh chấp, thị phi.',
    'Vong Thần': 'Hao tổn, mất mát, tai họa bất ngờ.',
    'Thiên Đức': 'Quý nhân phù hộ, giảm nhẹ tai ương.',
    'Nguyệt Đức': 'Quý nhân phù hộ, gặp hung hóa cát.',
    'Quốc Ấn': 'Quyền lực, địa vị. Thanh liêm, chính trực.',
    'Thái Cực': 'Thông minh, hiếu học. Duyên với huyền học, tâm linh.',
    'Học Đường': 'Học vốn tốt, thông minh, thành công thi cử.',
    'Thiên La': 'Hung sát. Khó khăn, trắc trở, pháp luật.',
    'Địa Võng': 'Hung sát. Ràng buộc, bế tắc, kiện tụng.',
    // New descriptions
    'Tai Sát': 'Tai ương, bệnh tật, những điều không may bất ngờ.',
    'Nguyên Thần': 'Hao tán tài sản, tinh thần bất an.',
    'Phúc Tinh': 'Phúc đức, may mắn từ tổ tiên.',
    'Kim Quỹ': 'Kho báu, tài lộc dồi dào, giữ được tiền.',
    'Ngọc Đường': 'Quý nhân hỗ trợ, danh tiếng, thanh cao.',
    'Lưu Hà': 'Trôi nổi, biến động, đề phòng sông nước.',
    'Thanh Long': 'Vạn sự hanh thông, tin vui, thăng tiến.',
    'Thiên Y': 'Sức khỏe tốt, có duyên với y học.',
    'Thiên Giải': 'Hóa giải hung hiểm, gặp nạn tai qua.',
    'Địa Giải': 'Hóa giải tai ương, đất đai trạch vận tốt.',
    'Huyết Nhẫn': 'Đề phòng thương tích, chảy máu, phẫu thuật.',
    'Thái Tuế': 'Vận hạn lớn, biến động mạnh mẽ.',
    'Thái Dương': 'Ánh sáng, công danh, quý nhân nam giới.',
    'Tang Môn': 'Tin buồn, tang tóc, hao tốn.',
    'Thái Âm': 'Phúc đức, quý nhân nữ giới, tài lộc ngầm.',
    'Quan Phù': 'Kiện tụng, tranh chấp, cửa quan.',
    'Tử Phù': 'Tiểu hao, xui xẻo nhỏ, bệnh tật.',
    'Tuế Phá': 'Đại hao, phá tán, xung đột lớn.',
    'Long Đức': 'Đức dày, hóa giải mọi hung hiểm.',
    'Bạch Hổ': 'Tai nạn, đổ máu, thị phi mạnh.',
    'Phúc Đức': 'Phúc lộc, may mắn, tốt cho hậu vận.',
    'Điếu Khách': 'Buồn phiền, thăm viếng, tin không vui.',
    'Trực Phù': 'Bệnh tật, trì trệ, mệt mỏi.',
    'Nguyệt Sát': 'Hung sát, gây trở ngại, mệt mỏi tinh thần.',
    'Nguyệt Yếm': 'Thị phi, tai tiếng, ám hại.',
    'Nguyệt Hại': 'Bị chơi xấu, cản trở sự nghiệp.',
    'Thiên Tặc': 'Trộm cắp, hao tốn tiền của.',
    'Nguyệt Tặc': 'Mất mát tài sản nhỏ, tiểu nhân.',
    'Thọ Tử': 'Bất lợi cho sức khỏe, nguy hiểm.',
    'Sát Chủ': 'Đại hung, mọi việc khởi đầu khó khăn.',
    'Hoang Vu': 'Trống rỗng, thất bại, không có kết quả.',
    'Thiên Quý': 'Quý nhân từ trời, hanh thông mọi sự.',
    'Nguyệt Quý': 'Quý nhân từ trăng, đem lại may mắn.',
    'Thánh Tâm': 'Tấm lòng sáng suốt, bình an tâm hồn.',
    'Ngũ Phú': 'Năm nguồn tài lộc, kinh doanh phát đạt.',
    'Lộc Mã': 'Tiền bạc vận động, nhanh chóng thành công.',
    'Từ Quán': 'Thông minh, có duyện với chính trường, quan lộ.',
    'Học Sĩ': 'Học thức uyên bác, phù hợp nghiên cứu.',
    'Kình Dương': 'Gây hấn, bạo lực, phẫu thuật hoặc thương tích.',
    'Đà La': 'Trì trệ, cản trở, tiểu nhân quấy phá ngầm.',
    'Hồng Diễm': 'Đào hoa sát, quyến rũ nhưng dễ gặp rắc rối tình cảm.',
    'Thiên Đức Hợp': 'Hợp hóa cát thần, tăng cường phúc lộc.',
    'Nguyệt Đức Hợp': 'Hợp hóa cát thần, giải trừ tai hung.',
    'Âm Dương Sai Thố': 'Trục trặc trong quan hệ hôn nhân, gia đình.',
    'Cô Loan Sát': 'Cô đơn, trắc trở tình duyên, khó tìm bạn đời.',
    'Tam Kỳ Quý Nhân': 'Kỳ tài, xuất chúng, vận may đặc biệt.',
    'Thiên Quan': 'Quyền quý, thăng quan tiến chức.',
    'Thiên Phúc': 'Hạnh phúc dồi dào, cuộc sống an nhàn.',
    'Tướng Tinh': 'Lãnh đạo, uy quyền, có khả năng cầm quân.',
    'Kiến': 'Vạn sự khởi đầu, thích hợp xây dựng.',
    'Trừ': 'Tẩy trần, loại bỏ điều xấu, chữa bệnh.',
    'Mãn': 'Sung túc, đầy đủ, hỷ sự.',
    'Bình': 'Ổn định, hóa giải tranh chấp.',
    'Định': 'Kiên định, ký kết hợp đồng.',
    'Chấp': 'Nắm giữ, quản lý, tu tạo.',
    'Phá': 'Xung đột, phá vỡ cái cũ, cẩn trọng.',
    'Nguy': 'Nguy hiểm, cẩn mật, tránh làm việc lớn.',
    'Thành': 'Thành công, trọn vẹn, khai trương.',
    'Thâu': 'Thu hoạch, tích lũy, đòi nợ.',
    'Khai': 'Mở mang, hanh thông, cưới hỏi.',
    'Bế': 'Bảo tồn, đóng kín, giữ bí mật.',
    'Phổ Hộ': 'Quý nhân che chở, vạn sự hanh thông.',
    'Ích Hậu': 'Có lợi cho việc con cái, gia đình.',
    'Tục Thế': 'Kế thừa vinh quang, gia tộc hưng thịnh.',
    'Hoạt Diệu': 'Sáng suốt, nhanh nhẹn, gặp nhiều cơ hội.',
    'Dân Nhật': 'Lòng dân ủng hộ, dễ làm việc công.',
    'Thời Đức': 'Thuận theo thời thế, thành công dễ dàng.',
    'Ngọc Vũ': 'Danh tiếng vang xa, học vấn uyên bác.',
    'Kim Đường': 'Tiền tài đầy kho, gia đạo giàu sang.',
    'Minh Đường': 'Gặp nhiều may mắn, sự nghiệp sáng sủa.',
    'Thiên Ân': 'Ơn trời ban cho, vạn sự bình an.',
    'Phục Tội': 'Cẩn thận sai lầm cũ, nên sám hối.',
    'Bát Tọa': 'Địa vị cao sang, có quyền có thế.',
    'Thiên Hình': 'Hình phạt, thương tật, rắc rối pháp lý.',
    'Thiên Lao': 'Bế tắc, u uất, bị kìm kẹp tinh thần.',
    'Hà Khôi': 'Tài năng dẫn đầu, nhưng dễ bị đố kỵ.',
    'Thiên Ngục': 'Tai họa lao lý, rắc rối cửa quan.',
    'Địa Phá': 'Hao tổn đất đai, nhà cửa trắc trở.',
    'Địa Tặc': 'Đề phòng mất trộm, tiểu nhân ám hại.',
    'Địa Nang': 'Khó ngăn cản tai họa, cần thận trọng.',
    'Địa Hỏa': 'Hỏa hoạn, nóng nảy, tai nạn bất ngờ.',
    'Thiên Hỏa': 'Vận hạn từ trời, sự cố đột ngột.',
    'Độc Hỏa': 'Cô độc, nóng nảy, dễ bị bỏng.',
    'Ngũ Quỷ': 'Tiểu nhân quấy phá, tinh thần bất an.',
    'Phi Ma Sát': 'Tang chế, lo âu, tin buồn.',
    'Hỏa Tai': 'Họa từ lửa, nóng nảy gây hỏng việc.',
    'Vãng Vong': 'Đi xa trắc trở, không nên khởi sự lớn.',
    'Câu Trận': 'Cản trở, trì trệ, rắc rối giấy tờ.',
    'Chu Tước': 'Thị phi, cãi vã, tiếng xấu vang xa.',
    'Huyền Vũ': 'Mờ ám, lừa lọc, đề phòng tiểu nhân.',
    'Thiên Trù': 'Lộc ăn uống, cuộc sống no đủ.',
    'Thiên Khố': 'Kho trời, tài sản dồi dào vô tận.',
    'Địa Khố': 'Kho đất, bất động sản phong phú.',
    'U Vi': 'Thanh cao, ẩn dật, tài năng kín đáo.',
    'Dịch Thế': 'Thay đổi thời thế, có duyên với cải cách.',
    'Mẫu Thương': 'Lòng nhân từ, được mẹ che chở.',
    'Minh Phế': 'Trí tuệ giảm sút, cần nghỉ ngơi.',
    'Tứ Ly': 'Chia ly, xa cách, trắc trở tình cảm.',
    'Tứ Tuyệt': 'Cùng đường, tuyệt lộ, cần tìm hướng mới.',
    'Tam Ưu': 'Ba nỗi lo âu, tinh thần mệt mỏi.',
    'Thiên Cẩu': 'Tai họa, thương tích bất ngờ, đề phòng động vật.',
    'Câu Giảo': 'Thị phi, rắc rối, kiện tụng nhỏ.',
    'Phi Nhẫn': 'Tai nạn giao thông, đổ máu, thương tích.',
    'Lục Hại': 'Xui xẻo, bị hại, mọi sự không thuận.',
    'Hàm Trì': 'Đào hoa sát, u uất tình cảm, dễ sa đọa.',
    'Mộ Khố': 'Tích lũy, cất giấu, nhưng có thể bị chôn vùi tài năng.'
};

/**
 * Calculate Shen Sha for a BaZi chart
 * Returns shen sha for each pillar position (year, month, day, hour)
 */
function calculateShenSha(ctx) {
    const pillarKeys = ['year', 'month', 'day', 'hour'];
    const pillarNames = ['Năm', 'Tháng', 'Ngày', 'Giờ'];

    const result = {
        year: [],
        month: [],
        day: [],
        hour: [],
        summary: []
    };

    // Helper: add to result
    const addStar = (idx, name) => {
        if (!result[pillarKeys[idx]].includes(name)) {
            result[pillarKeys[idx]].push(name);
            result.summary.push({
                name,
                pillar: pillarNames[idx],
                description: SHEN_SHA_INFO[name] || ''
            });
        }
    };

    const vnToKanjiZhi = {
        'Tý': '子', 'Sửu': '丑', 'Dần': '寅', 'Mão': '卯', 'Thìn': '辰', 'Tỵ': '巳',
        'Ngọ': '午', 'Mùi': '未', 'Thân': '申', 'Dậu': '酉', 'Tuất': '戌', 'Hợi': '亥'
    };
    const vnToKanjiGan = {
        'Giáp': '甲', 'Ất': '乙', 'Bính': '丙', 'Đinh': '丁', 'Mậu': '戊',
        'Kỷ': '己', 'Canh': '庚', 'Tân': '辛', 'Nhâm': '壬', 'Quý': '癸'
    };
    const zhisOrder = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    const getZhiKanji = (zhi) => vnToKanjiZhi[zhi] || zhi;
    const getGanKanji = (gan) => vnToKanjiGan[gan] || gan;

    const yearZhi = getZhiKanji(ctx.zhis[0]);
    const dayZhi = getZhiKanji(ctx.zhis[2]);
    const dayGan = getGanKanji(ctx.gans[2]);
    const monthZhi = getZhiKanji(ctx.zhis[1]);
    const allZhis = ctx.zhis.map(getZhiKanji);
    const allGans = ctx.gans.map(getGanKanji);

    // 1. Check Vòng Thái Tuế (Yearly Cycle Stars)
    // Formula: (Target Zhi index - Year Zhi index + 12) % 12
    const yearZhiIdx = zhisOrder.indexOf(yearZhi);
    for (let i = 0; i < 4; i++) {
        const targetZhiIdx = zhisOrder.indexOf(allZhis[i]);
        const diff = (targetZhiIdx - yearZhiIdx + 12) % 12;
        for (const [name, offset] of Object.entries(SHEN_SHA.yearly_cycle)) {
            if (offset === diff) {
                addStar(i, name);
            }
        }
    }

    // 2. year_based (Natal Year Zhi -> Check all Zhis)
    for (const [name, mapping] of Object.entries(SHEN_SHA.year_based)) {
        const targetStr = mapping[yearZhi];
        if (targetStr) {
            for (let i = 0; i < 4; i++) {
                const zhiVN = ganzhi.zhiToVN(allZhis[i]);
                if (targetStr.includes(zhiVN)) addStar(i, name);
            }
        }
    }

    // 3. day_based (Natal Day Zhi -> Check all Zhis)
    for (const [name, mapping] of Object.entries(SHEN_SHA.day_based)) {
        const targetStr = mapping[dayZhi];
        if (targetStr) {
            for (let i = 0; i < 4; i++) {
                const zhiVN = ganzhi.zhiToVN(allZhis[i]);
                if (targetStr.includes(zhiVN)) addStar(i, name);
            }
        }
    }

    // 4. gan_based (Natal Day Gan -> Check all Zhis)
    for (const [name, mapping] of Object.entries(SHEN_SHA.gan_based)) {
        const targetStr = mapping[dayGan];
        if (targetStr) {
            for (let i = 0; i < 4; i++) {
                const zhiVN = ganzhi.zhiToVN(allZhis[i]);
                if (targetStr.includes(zhiVN)) addStar(i, name);
            }
        }
    }

    // 4b. year_based_extended (Natal Year Zhi -> Check all Zhis)
    for (const [name, mapping] of Object.entries(SHEN_SHA.year_based_extended || {})) {
        const targetStr = mapping[yearZhi];
        if (targetStr) {
            for (let i = 0; i < 4; i++) {
                const zhiVN = ganzhi.zhiToVN(allZhis[i]);
                if (targetStr.includes(zhiVN)) addStar(i, name);
            }
        }
    }

    // 5. month_based (Natal Month Zhi -> Check Gans/Zhis)
    for (const [name, mapping] of Object.entries(SHEN_SHA.month_based)) {
        const targetStr = mapping[monthZhi];
        if (targetStr) {
            // Check Gans
            for (let i = 0; i < 4; i++) {
                const ganVN = ganzhi.ganToVN(allGans[i]);
                if (targetStr.includes(ganVN)) addStar(i, name);
            }
            // Check Zhis
            for (let i = 0; i < 4; i++) {
                const zhiVN = ganzhi.zhiToVN(allZhis[i]);
                if (targetStr.includes(zhiVN)) addStar(i, name);
            }
        }
    }

    // 6. Special combinations
    const allZhisVN = ctx.zhis.map(z => ganzhi.zhiToVN(z));
    if (allZhisVN.includes('Thìn') && allZhisVN.includes('Tỵ')) {
        result.summary.push({ name: 'Thiên La', pillar: 'Tổ hợp', description: SHEN_SHA_INFO['Thiên La'] });
    }
    if (allZhisVN.includes('Tuất') && allZhisVN.includes('Hợi')) {
        result.summary.push({ name: 'Địa Võng', pillar: 'Tổ hợp', description: SHEN_SHA_INFO['Địa Võng'] });
    }

    // Tam Kỳ Quý Nhân
    const allGansVN = ctx.gans.map(g => ganzhi.ganToVN(g));
    const tamKy1 = ['Giáp', 'Mậu', 'Canh'];
    const tamKy2 = ['Nhâm', 'Quý', 'Tân'];
    const tamKy3 = ['Ất', 'Bính', 'Đinh'];
    const checkTamKy = (gans) => {
        const s = gans.join('');
        return s.includes(tamKy1.join('')) || s.includes(tamKy2.join('')) || s.includes(tamKy3.join(''));
    };
    if (checkTamKy(allGansVN.slice(0, 3)) || checkTamKy(allGansVN.slice(1, 4))) {
        result.summary.push({ name: 'Tam Kỳ Quý Nhân', pillar: 'Tổ hợp', description: 'Kỳ tích, thông minh, quyền quý phi thường.' });
    }

    // Âm Dương Sai Thố (Day)
    const saiThoDays = ['Bính Tý', 'Đinh Sửu', 'Mậu Dần', 'Tân Mão', 'Nhâm Thìn', 'Quý Tỵ', 'Bính Ngọ', 'Đinh Mùi', 'Mậu Thân', 'Tân Dậu', 'Nhâm Tuất', 'Quý Hợi'];
    const dayPillarName = ganzhi.ganToVN(ctx.gans[2]) + ' ' + ganzhi.zhiToVN(ctx.zhis[2]);
    if (saiThoDays.includes(dayPillarName)) {
        addStar(2, 'Âm Dương Sai Thố');
    }

    // Cô Loan Sát (Day)
    const coLoanDays = ['Ất Tỵ', 'Đinh Tỵ', 'Tân Hợi', 'Giáp Dần', 'Mậu Ngọ', 'Nhâm Tý', 'Bính Ngọ'];
    if (coLoanDays.includes(dayPillarName)) {
        addStar(2, 'Cô Loan Sát');
    }

    // 7. Season based
    const monthsZhi = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
    const seasonNames = ['Xuân', 'Hạ', 'Thu', 'Đông'];
    const seasonIdx = Math.floor(monthsZhi.indexOf(monthZhi) / 3);
    const season = seasonNames[seasonIdx];

    for (const [name, mapping] of Object.entries(SHEN_SHA.season_based)) {
        const targetStr = mapping[season];
        if (targetStr) {
            // Check day pillar
            const dayPillarVN = ganzhi.ganToVN(ctx.gans[2]) + ' ' + ganzhi.zhiToVN(ctx.zhis[2]);
            if (targetStr.includes(dayPillarVN) || targetStr.includes(ganzhi.ganToVN(ctx.gans[2]))) {
                addStar(2, name);
            }
        }
    }

    // 8. Thập Ác Đại Bại (Year Gan + Day)
    const yearGanVN = ganzhi.ganToVN(ctx.gans[0]);
    const dayPillarVN = ganzhi.ganToVN(ctx.gans[2]) + ganzhi.zhiToVN(ctx.zhis[2]);
    const thapAc = {
        'Giáp': ['Giáp Thìn'], 'Ất': ['Ất Tỵ'], 'Bính': ['Nhâm Thân'], 'Đinh': ['Quý Hợi'],
        '戊': ['Mậu Tuất'], '己': ['Ất Sửu'], '庚': ['Giáp Thìn'], '辛': ['Ất Tỵ'],
        '壬': ['Bính Thân'], '癸': ['Đinh Hợi']
    };
    if (thapAc[yearGanVN] && thapAc[yearGanVN].includes(dayPillarVN)) {
        addStar(2, 'Thập Ác Đại Bại');
    }

    // 9. Thập Nhị Kiến Trừ (12 Gods of the Day)
    // Formula: (Day Zhi - Month Zhi + 12) % 12 - Offset can vary depending on school
    const kienTruNames = ['Kiến', 'Trừ', 'Mãn', 'Bình', 'Định', 'Chấp', 'Phá', 'Nguy', 'Thành', 'Thâu', 'Khai', 'Bế'];
    const dayZhiIdx = zhisOrder.indexOf(dayZhi);
    const monthZhiIdx = zhisOrder.indexOf(monthZhi);
    const kienTruIdx = (dayZhiIdx - monthZhiIdx + 12) % 12;
    addStar(2, kienTruNames[kienTruIdx]);

    return result;
}

module.exports = {
    calculateShenSha,
    SHEN_SHA,
    SHEN_SHA_INFO
};
