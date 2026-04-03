/**
 * Logic ánh xạ Bát Tự + Thời Gian → Quẻ Dịch
 * DETERMINISTIC - Không dùng ngẫu nhiên
 * Dựa trên nguyên lý Mai Hoa Dịch Số kết hợp Bát Tự
 */

const { TRIGRAMS, HEXAGRAM_LOOKUP } = require('./gua_64');

// Thiên Can → Số (1-10) - Vietnamese + Chinese
const STEM_NUMBERS = {
    'Giáp': 1, 'Ất': 2, 'Bính': 3, 'Đinh': 4, 'Mậu': 5,
    'Kỷ': 6, 'Canh': 7, 'Tân': 8, 'Nhâm': 9, 'Quý': 10,
    // Chinese characters
    '甲': 1, '乙': 2, '丙': 3, '丁': 4, '戊': 5,
    '己': 6, '庚': 7, '辛': 8, '壬': 9, '癸': 10
};

// Địa Chi → Số (1-12) - Vietnamese + Chinese
const BRANCH_NUMBERS = {
    'Tý': 1, 'Sửu': 2, 'Dần': 3, 'Mão': 4, 'Thìn': 5, 'Tỵ': 6,
    'Ngọ': 7, 'Mùi': 8, 'Thân': 9, 'Dậu': 10, 'Tuất': 11, 'Hợi': 12,
    // Chinese characters
    '子': 1, '丑': 2, '寅': 3, '卯': 4, '辰': 5, '巳': 6,
    '午': 7, '未': 8, '申': 9, '酉': 10, '戌': 11, '亥': 12
};

// Chủ đề → Số độn (Topic Offsets)
const TOPIC_NUMBERS = {
    'Chung': 0,
    'Công danh': 1,
    'Tài lộc': 2,
    'Tình duyên': 3,
    'Gia đạo': 4,
    'Học hành': 5,
    'Sức khỏe': 6,
    'Thi cử': 7,
    'Giao dịch': 8,
    'Xuất hành': 9
};

// Ngũ Hành
const ELEMENTS = {
    'Giáp': 'Mộc', 'Ất': 'Mộc',
    'Bính': 'Hỏa', 'Đinh': 'Hỏa',
    'Mậu': 'Thổ', 'Kỷ': 'Thổ',
    'Canh': 'Kim', 'Tân': 'Kim',
    'Nhâm': 'Thủy', 'Quý': 'Thủy'
};

// Ngũ Hành tương sinh/khắc
const ELEMENT_RELATIONS = {
    // A sinh B
    'Mộc_sinh_Hỏa': true, 'Hỏa_sinh_Thổ': true, 'Thổ_sinh_Kim': true,
    'Kim_sinh_Thủy': true, 'Thủy_sinh_Mộc': true,
    // A khắc B
    'Mộc_khắc_Thổ': true, 'Thổ_khắc_Thủy': true, 'Thủy_khắc_Hỏa': true,
    'Hỏa_khắc_Kim': true, 'Kim_khắc_Mộc': true
};

// Thiên Can hợp
const STEM_COMBINES = {
    'Giáp_Kỷ': 'Thổ', 'Ất_Canh': 'Kim', 'Bính_Tân': 'Thủy',
    'Đinh_Nhâm': 'Mộc', 'Mậu_Quý': 'Hỏa'
};

// Thiên Can xung (khắc)
const STEM_CLASHES = {
    'Giáp_Canh': true, 'Ất_Tân': true, 'Bính_Nhâm': true,
    'Đinh_Quý': true, 'Mậu_Giáp': true, 'Kỷ_Ất': true
};

// Địa Chi lục hợp
const BRANCH_COMBINES = {
    'Tý_Sửu': 'Thổ', 'Dần_Hợi': 'Mộc', 'Mão_Tuất': 'Hỏa',
    'Thìn_Dậu': 'Kim', 'Tỵ_Thân': 'Thủy', 'Ngọ_Mùi': 'Thổ'
};

// Địa Chi lục xung
const BRANCH_CLASHES = {
    'Tý_Ngọ': true, 'Sửu_Mùi': true, 'Dần_Thân': true,
    'Mão_Dậu': true, 'Thìn_Tuất': true, 'Tỵ_Hợi': true
};

// Địa Chi lục hại (Harms)
const BRANCH_HARMS = {
    'Tý_Mùi': true, 'Sửu_Ngọ': true, 'Dần_Tỵ': true,
    'Mão_Thìn': true, 'Thân_Hợi': true, 'Dậu_Tuất': true
};

// Địa Chi lục phá (Breaks)
const BRANCH_BREAKS = {
    'Tý_Dậu': true, 'Sửu_Thìn': true, 'Dần_Hợi': true,
    'Mão_Ngọ': true, 'Thân_Tỵ': true, 'Tuất_Mùi': true
};

// Địa Chi hình (Punishments)
// Note: Matches both keys like 'Tý_Mão' and self-punishments like 'Thìn_Thìn'
const BRANCH_PUNISHMENTS = {
    'Tý_Mão': true, 'Mão_Tý': true,
    'Dần_Tỵ': true, 'Tỵ_Thân': true, 'Thân_Dần': true,
    'Sửu_Tuất': true, 'Tuất_Mùi': true, 'Mùi_Sửu': true,
    'Thìn_Thìn': true, 'Ngọ_Ngọ': true, 'Dậu_Dậu': true, 'Hợi_Hợi': true
};

// Thập Thần mapping (từ quan hệ Nhật Chủ với Can khác)
const SHISHEN_MAP = {
    'same_yang': 'Tỷ Kiên', 'same_yin': 'Kiếp Tài',
    'i_produce_yang': 'Thực Thần', 'i_produce_yin': 'Thương Quan',
    'produces_me_yang': 'Thiên Ấn', 'produces_me_yin': 'Chính Ấn',
    'i_control_yang': 'Thiên Tài', 'i_control_yin': 'Chính Tài',
    'controls_me_yang': 'Thất Sát', 'controls_me_yin': 'Chính Quan'
};

// Nhật Chủ → Nội Quái (Lower Trigram) - Deterministic
const DAY_MASTER_TO_TRIGRAM = {
    'Giáp': 4, // Chấn (Dương Mộc)
    'Ất': 5,   // Tốn (Âm Mộc)
    'Bính': 3, // Ly (Dương Hỏa)
    'Đinh': 3, // Ly (Âm Hỏa)
    'Mậu': 7,  // Cấn (Dương Thổ)
    'Kỷ': 8,   // Khôn (Âm Thổ)
    'Canh': 1, // Càn (Dương Kim)
    'Tân': 2,  // Đoài (Âm Kim)
    'Nhâm': 6, // Khảm (Dương Thủy)
    'Quý': 6   // Khảm (Âm Thủy)
};

/**
 * Phân tích tương tác giữa hai Can
 */
function analyzeGanInteraction(gan1, gan2) {
    const el1 = ELEMENTS[gan1];
    const el2 = ELEMENTS[gan2];

    const result = {
        element1: el1,
        element2: el2,
        relation: 'bình',
        relationType: 'neutral',
        combine: null,
        clash: false
    };

    // Check hợp
    const combineKey1 = `${gan1}_${gan2}`;
    const combineKey2 = `${gan2}_${gan1}`;
    if (STEM_COMBINES[combineKey1]) {
        result.combine = STEM_COMBINES[combineKey1];
        result.relationType = 'combine';
        result.relation = 'hợp';
    } else if (STEM_COMBINES[combineKey2]) {
        result.combine = STEM_COMBINES[combineKey2];
        result.relationType = 'combine';
        result.relation = 'hợp';
    }

    // Check xung
    if (STEM_CLASHES[combineKey1] || STEM_CLASHES[combineKey2]) {
        result.clash = true;
        result.relationType = 'clash';
        result.relation = 'xung';
    }

    // Check sinh/khắc
    if (ELEMENT_RELATIONS[`${el1}_sinh_${el2}`]) {
        result.relation = 'sinh xuất';
        result.relationType = 'produce';
    } else if (ELEMENT_RELATIONS[`${el2}_sinh_${el1}`]) {
        result.relation = 'được sinh';
        result.relationType = 'produced';
    } else if (ELEMENT_RELATIONS[`${el1}_khắc_${el2}`]) {
        result.relation = 'khắc xuất';
        result.relationType = 'control';
    } else if (ELEMENT_RELATIONS[`${el2}_khắc_${el1}`]) {
        result.relation = 'bị khắc';
        result.relationType = 'controlled';
    } else if (el1 === el2) {
        result.relation = 'tỷ hòa';
        result.relationType = 'same';
    }

    return result;
}

/**
 * Phân tích tương tác giữa hai Chi
 */
function analyzeZhiInteraction(zhi1, zhi2) {
    const result = {
        combine: null,
        clash: false,
        harm: false,
        break: false,
        punishment: false,
        relation: 'bình'
    };

    const key1 = `${zhi1}_${zhi2}`;
    const key2 = `${zhi2}_${zhi1}`;

    // Lục Hợp
    if (BRANCH_COMBINES[key1] || BRANCH_COMBINES[key2]) {
        result.combine = BRANCH_COMBINES[key1] || BRANCH_COMBINES[key2];
        result.relation = 'lục hợp';
    }

    // Lục Xung
    if (BRANCH_CLASHES[key1] || BRANCH_CLASHES[key2]) {
        result.clash = true;
        result.relation = 'lục xung';
    }

    // Lục Hại
    if (BRANCH_HARMS[key1] || BRANCH_HARMS[key2]) {
        result.harm = true;
        result.relation = 'lục hại';
    }

    // Lục Phá
    if (BRANCH_BREAKS[key1] || BRANCH_BREAKS[key2]) {
        result.break = true;
        result.relation = 'lục phá';
    }

    // Hình (Punishment)
    if (BRANCH_PUNISHMENTS[key1] || BRANCH_PUNISHMENTS[key2]) {
        result.punishment = true;
        result.relation = 'hình';
    }

    return result;
}

/**
 * Xác định Thập Thần của một Can so với Nhật Chủ
 */
function getShiShen(dayMaster, targetGan) {
    const dmElement = ELEMENTS[dayMaster];
    const targetElement = ELEMENTS[targetGan];
    const dmYang = ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(dayMaster);
    const targetYang = ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(targetGan);
    const samePolarity = dmYang === targetYang;

    if (dmElement === targetElement) {
        return samePolarity ? 'Tỷ Kiên' : 'Kiếp Tài';
    }

    // Tôi sinh ra
    if (ELEMENT_RELATIONS[`${dmElement}_sinh_${targetElement}`]) {
        return samePolarity ? 'Thực Thần' : 'Thương Quan';
    }

    // Sinh ra tôi
    if (ELEMENT_RELATIONS[`${targetElement}_sinh_${dmElement}`]) {
        return samePolarity ? 'Thiên Ấn' : 'Chính Ấn';
    }

    // Tôi khắc
    if (ELEMENT_RELATIONS[`${dmElement}_khắc_${targetElement}`]) {
        return samePolarity ? 'Thiên Tài' : 'Chính Tài';
    }

    // Khắc tôi  
    if (ELEMENT_RELATIONS[`${targetElement}_khắc_${dmElement}`]) {
        return samePolarity ? 'Thất Sát' : 'Chính Quan';
    }

    return 'Nhật Chủ';
}

/**
 * Tính quẻ DETERMINISTIC dựa trên Bát Tự + Thời gian
 * @param {Object} baziContext - Lá số Bát Tự đầy đủ
 * @param {Object} timeInfo - Can Chi của thời điểm (ngày/tháng/năm)
 * @param {string} periodType - 'daily', 'monthly', 'yearly'
 * @param {string} topic - Topic of divination
 */
function calculateHexagram(baziContext, timeInfo, periodType = 'daily', topic = 'Chung') {
    // 1. Lấy Nhật Chủ & Nhật Chi
    let dayMaster = 'Giáp';
    let dayZhi = 'Tý';

    if (baziContext.thong_tin_co_ban?.bat_tu?.ngay) {
        dayMaster = baziContext.thong_tin_co_ban.bat_tu.ngay[0] || 'Giáp';
        dayZhi = baziContext.thong_tin_co_ban.bat_tu.ngay[1] || 'Tý';
    } else if (baziContext.chi_tiet_tru?.[2]) {
        dayMaster = baziContext.chi_tiet_tru[2].can || 'Giáp';
        dayZhi = baziContext.chi_tiet_tru[2].chi || 'Tý';
    }

    // 2. NỘI QUÁI (Lower) = Đại diện MỆNH CHỦ
    let lowerId = DAY_MASTER_TO_TRIGRAM[dayMaster] || 1;

    // 3. NGOẠI QUÁI (Upper) = Đại diện THỜI VẬN
    const timeGan = timeInfo.gan || 'Giáp';
    const timeZhi = timeInfo.zhi || 'Tý';
    const timeElement = ELEMENTS[timeGan];

    const ganNum = STEM_NUMBERS[timeGan] || 1;
    const zhiNum = BRANCH_NUMBERS[timeZhi] || 1;
    const topicNum = TOPIC_NUMBERS[topic] || 0;

    // Add topicNum to the sum to shift the Upper Trigram
    let upperId = (ganNum + zhiNum + topicNum) % 8;
    if (upperId === 0) upperId = 8;

    // 4. Phân tích tương tác Mệnh - Thời
    const ganInteraction = analyzeGanInteraction(dayMaster, timeGan);
    const zhiInteraction = analyzeZhiInteraction(dayZhi, timeZhi);
    const activatedShiShen = getShiShen(dayMaster, timeGan);

    // 5. Lấy Dụng Thần / Kỵ Thần
    const dungThan = baziContext.phan_tich?.can_bang_ngu_hanh?.dung_than?.ngu_hanh || [];
    const kyThan = baziContext.phan_tich?.can_bang_ngu_hanh?.ky_than?.ngu_hanh || [];

    // Helper: Check if element A controls element B
    const controls = (a, b) => ELEMENT_RELATIONS[`${a}_khắc_${b}`];

    // 6. Động Hào
    // Use Vietnam time for accurate hour calculation
    const vnNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const currentHour = vnNow.getHours();
    // Include topicNum in yaoPosition for variation
    const yaoPosition = ((ganNum + zhiNum + topicNum + Math.floor(currentHour / 2) + 1) % 6) + 1;

    // ---------------------------------------------------------
    // 7. TÍNH ĐIỂM NĂNG LƯỢNG (Point-based accumulation)
    // ---------------------------------------------------------
    let score = 0;

    // 7.1 Sinh - Khắc Ngũ Hành (Nhật Chủ)
    if (ganInteraction.relationType === 'produced') score += 2; // Sinh Nhật chủ
    else if (ganInteraction.relationType === 'same') score += 1; // Trợ Nhật chủ (Tỷ hòa)
    else if (ganInteraction.relationType === 'controlled') score -= 2; // Khắc Nhật chủ (Bị khắc)
    else if (ganInteraction.relationType === 'produce') score -= 2; // Tổn hao Nhật chủ (Sinh xuất)

    // 7.2 Dụng Thần / Kỵ Thần
    if (dungThan.includes(timeElement)) {
        score += 3; // Kích hoạt / Sinh dụng thần
    } else if (kyThan.includes(timeElement)) {
        score -= 3; // Đánh vào kỵ thần (Xấu)
    } else {
        // Kiểm tra Khắc Kỵ Thần (+2)
        const isControllingKyThan = kyThan.some(kt => controls(timeElement, kt));
        if (isControllingKyThan) score += 2;
    }

    // 7.3 Thập Thần chủ sự
    const positiveGods = ['Chính Quan', 'Chính Tài', 'Thiên Tài', 'Thực Thần'];
    const negativeGods = ['Thương Quan', 'Thất Sát', 'Thiên Ấn']; // Kiêu (Thiên Ấn) thường mang tính nghịch
    if (positiveGods.includes(activatedShiShen)) score += 1;
    else if (negativeGods.includes(activatedShiShen)) score -= 1;

    // 7.4 Quan hệ Can Chi (Hợp, Xung, Hình, Hại, Phá)
    if (ganInteraction.combine) score += 1; // Can Hợp
    if (zhiInteraction.combine) score += 1; // Chi Hợp

    if (zhiInteraction.clash) score -= 2; // Chi Xung
    if (zhiInteraction.harm || zhiInteraction.punishment) score -= 3; // Hình / Hại
    if (zhiInteraction.break) score -= 2; // Chi Phá

    // 8. Ghép quẻ & Trả về kết quả
    const hexagramId = HEXAGRAM_LOOKUP[`${upperId},${lowerId}`] || 1;

    return {
        hexagramId,
        upperId,
        lowerId,
        upperTrigram: TRIGRAMS[upperId],
        lowerTrigram: TRIGRAMS[lowerId],
        interaction: {
            dayMaster,
            dayZhi,
            timeGan,
            timeZhi,
            ganInteraction,
            zhiInteraction,
            activatedShiShen,
            yaoPosition
        },
        qualityScore: score, // Now using raw point scale
        periodType,
        calculatedAt: vnNow.toISOString()
    };
}

module.exports = {
    calculateHexagram,
    analyzeGanInteraction,
    analyzeZhiInteraction,
    getShiShen,
    ELEMENTS,
    STEM_NUMBERS,
    BRANCH_NUMBERS
};
