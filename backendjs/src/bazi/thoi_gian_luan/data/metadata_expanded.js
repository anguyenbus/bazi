/**
 * Keywords Expanded - Transferred from Python keywords_expanded.py
 * Contains traits, synonyms, and matching logic for BaZi analysis.
 */

const TRAIT_SYNONYMS = {
    // === LÃNH ĐẠO & QUYỀN LỰC ===
    "lãnh đạo": [
        "chỉ huy", "đứng đầu", "cầm quân", "thống lĩnh", "quản lý", "điều hành",
        "dẫn dắt", "chỉ đạo", "cai quản", "lãnh tụ", "thủ lĩnh", "người đứng đầu",
        "quyền lực", "địa vị", "uy quyền", "cầm quyền", "nắm quyền", "Quan", "Sát"
    ],
    "quyền lực": [
        "uy quyền", "thế lực", "quyền hành", "quyền thế", "quyền bính", "quyền uy",
        "thế", "lực", "ảnh hưởng", "chi phối", "thống trị", "kiểm soát",
        "Quan", "Sát", "thăng tiến", "địa vị", "chức vụ"
    ],
    "tham vọng": [
        "khát vọng", "hoài bão", "chí lớn", "mục tiêu lớn", "ước mơ lớn",
        "ham muốn", "tham vọng lớn", "chí nguyện", "quyết tâm", "hướng đến",
        "Sát", "Kiếp", "tranh giành", "cạnh tranh"
    ],
    "kiên định": [
        "vững vàng", "kiên trì", "bền bỉ", "không lung lay", "quyết tâm",
        "kiên quyết", "chắc chắn", "không dao động", "bất khuất", "cứng rắn",
        "Tỷ", "Kiếp", "ổn định", "vững chắc", "bền vững"
    ],
    "quyết đoán": [
        "dứt khoát", "mạnh mẽ", "quyết liệt", "không do dự", "quyết định nhanh",
        "Kim", "Sát", "cứng rắn", "thẳng thắn", "dứt khoát"
    ],

    // === TRÍ TUỆ & SÁNG TẠO ===
    "thiên tài": [
        "tài năng", "xuất chúng", "phi thường", "thông minh vượt trội", "trí tuệ cao",
        "tài giỏi", "thiên phú", "năng khiếu", "bẩm sinh", "đặc biệt", "hơn người",
        "Thực", "Thương", "sáng tạo", "ý tưởng", "đột phá"
    ],
    "thông minh": [
        "trí tuệ", "sáng dạ", "nhanh nhạy", "thông thái", "uyên bác", "học giỏi",
        "đầu óc", "não bộ", "tư duy", "hiểu nhanh", "tiếp thu nhanh",
        "Ấn", "Thủy", "học tập", "nghiên cứu"
    ],
    "sáng tạo": [
        "đổi mới", "phát minh", "ý tưởng độc đáo", "nghệ thuật", "tư duy mới",
        "sáng chế", "sáng kiến", "cải tiến", "đột phá", "khác biệt",
        "Thực", "Thương", "phá cách", "mới mẻ"
    ],
    "viễn kiến": [
        "tầm nhìn", "nhìn xa", "dự đoán", "tiên liệu", "dài hạn",
        "tầm nhìn xa", "chiến lược", "hoạch định", "phát triển"
    ],

    // === TÀI CHÍNH & KINH DOANH ===
    "giàu có": [
        "phát tài", "tài lộc", "tiền bạc", "sung túc", "dư dả",
        "giàu sang", "phú quý", "tài sản", "của cải", "thịnh vượng",
        "Tài", "Chính Tài", "Thiên Tài", "thu nhập"
    ],
    "kinh doanh": [
        "thương mại", "buôn bán", "làm ăn", "doanh nghiệp", "kinh tế",
        "đầu tư", "khởi nghiệp", "startup", "doanh nhân",
        "Tài", "Thực", "tài chính"
    ],
    "tài chính": [
        "tiền bạc", "thu nhập", "lợi nhuận", "đầu tư", "tài sản",
        "Tài", "Chính Tài", "Thiên Tài", "kiếm tiền"
    ],

    // === TÍNH CÁCH ===
    "nhân ái": [
        "từ bi", "nhân từ", "thương người", "bác ái", "độ lượng",
        "tốt bụng", "hay giúp", "quan tâm", "yêu thương", "che chở",
        "Ấn", "Thực", "quý nhân", "phúc đức"
    ],
    "cô đơn": [
        "cô độc", "một mình", "lẻ loi", "đơn độc", "tách biệt",
        "hướng nội", "ít bạn", "không ai hiểu",
        "Thiên Ấn", "Kiêu", "cô lập"
    ],
    "nổi loạn": [
        "phá cách", "xung đột", "không chịu khuất phục", "chống đối",
        "phản kháng", "bất tuân", "không theo quy tắc",
        "Thương", "khắc", "xung"
    ],
    "khiêm tốn": [
        "khiêm nhường", "không kiêu ngạo", "giản dị", "đơn giản",
        "nhún nhường", "hòa nhã", "không khoe khoang",
        "Ấn", "ổn định"
    ],
    "đào hoa": [
        "quyến rũ", "lãng mạn", "tình cảm phức tạp", "nhiều người yêu",
        "Đào Hoa", "Hồng Loan", "tình duyên", "người yêu"
    ],
    "kiêu ngạo": [
        "tự phụ", "tự cao", "ngạo mạn", "khinh người", "không coi ai ra gì",
        "Kiếp", "Sát", "cái tôi lớn"
    ],

    // === SỨC KHỎE & BIẾN CỐ ===
    "bệnh tật": [
        "ốm đau", "sức khỏe yếu", "bệnh", "đau", "yếu",
        "sức khỏe", "thể chất", "tinh thần yếu",
        "Sát", "xung", "tai nạn"
    ],
    "nghiện": [
        "nghiện ngập", "sa đọa", "mất kiểm soát", "phụ thuộc",
        "Kiếp", "mất", "tổn thất"
    ],
    "bi kịch": [
        "đau khổ", "khó khăn", "thử thách", "mất mát", "đau thương",
        "Sát", "Kiếp", "xung", "hung", "hiểm"
    ],
    "tai nạn": [
        "chấn thương", "nguy hiểm", "rủi ro", "bất trắc",
        "Sát", "xung", "hung"
    ],

    // === SỰ NGHIỆP ===
    "quân sự": [
        "chiến tranh", "quân đội", "lính", "chiến đấu", "quân nhân",
        "tướng quân", "chỉ huy", "chiến lược",
        "Sát", "Quan", "cạnh tranh"
    ],
    "nghệ thuật": [
        "nghệ sĩ", "họa sĩ", "nhạc sĩ", "diễn viên", "sáng tác",
        "biểu diễn", "âm nhạc", "hội họa", "điện ảnh",
        "Thực", "Thương", "sáng tạo"
    ],
    "khoa học": [
        "nghiên cứu", "khám phá", "phát minh", "học thuật", "viện sĩ",
        "giáo sư", "tiến sĩ", "bác sĩ",
        "Ấn", "Thực", "nghiên cứu", "học tập"
    ],
    "chính trị": [
        "chính trường", "chính khách", "ngoại giao", "xã hội",
        "Quan", "Sát", "quyền lực", "địa vị"
    ]
};

const CAREER_KEYWORDS = {
    "chính_trị": ["chính trị", "tổng thống", "thủ tướng", "lãnh tụ", "cách mạng", "ngoại giao"],
    "quân_sự": ["tướng", "quân đội", "chiến tranh", "chiến lược", "chiến đấu", "võ sư"],
    "khoa_học": ["nhà khoa học", "nghiên cứu", "phát minh", "vật lý", "hóa học", "toán học"],
    "nghệ_thuật": ["họa sĩ", "nhạc sĩ", "ca sĩ", "diễn viên", "đạo diễn", "nghệ sĩ"],
    "kinh_doanh": ["doanh nhân", "tỷ phú", "CEO", "startup", "đầu tư", "kinh doanh"],
    "văn_học": ["nhà văn", "nhà thơ", "kịch tác gia", "tác giả", "viết"],
    "thể_thao": ["vận động viên", "cầu thủ", "võ sĩ", "vô địch", "huy chương"],
    "hoàng_gia": ["vua", "hoàng đế", "nữ hoàng", "vương", "công chúa", "hoàng tử"],
};

const CACH_CUC_TRAITS = {
    "Quan": ["lãnh đạo", "quyền lực", "trách nhiệm", "địa vị"],
    "Sát": ["quyết đoán", "tham vọng", "quân sự", "cạnh tranh"],
    "Tài+": ["tài chính", "kinh doanh", "giàu có", "thực dụng"],
    "Tài-": ["may mắn", "tiền bất ngờ", "đào hoa nam"],
    "Ấn": ["học tập", "thông minh", "quý nhân", "văn hóa"],
    "Kiêu": ["cô đơn", "sáng tạo", "tâm linh", "độc lập"],
    "Thực": ["sáng tạo", "phúc đức", "ổn định", "nghệ thuật"],
    "Thương": ["nổi loạn", "sáng tạo", "xung đột", "phá cách"],
    "Tỷ": ["bạn bè", "hợp tác", "cạnh tranh", "anh em"],
    "Kiếp": ["mạo hiểm", "mất tiền", "tranh giành", "rủi ro"],
    "Kiến Lộc": ["tự lập", "năng động", "không dựa dẫm"],
};

const NGU_HANH_TRAITS = {
    "Mộc": ["nhân ái", "sáng tạo", "phát triển", "linh hoạt"],
    "Hỏa": ["năng động", "nhiệt tình", "tham vọng", "nổi bật"],
    "Thổ": ["ổn định", "trách nhiệm", "đáng tin", "kiên định"],
    "Kim": ["quyết đoán", "công bằng", "cứng rắn", "logic"],
    "Thủy": ["thông minh", "linh hoạt", "thích nghi", "sâu sắc"],
};

/**
 * Lấy tất cả synonyms cho một trait.
 */
function getAllSynonyms(trait) {
    const traitLower = trait.toLowerCase();
    if (TRAIT_SYNONYMS[traitLower]) {
        return [...TRAIT_SYNONYMS[traitLower]];
    }

    // Tìm trong các traits khác
    for (const [key, synonyms] of Object.entries(TRAIT_SYNONYMS)) {
        if (synonyms.some(s => s.toLowerCase() === traitLower)) {
            return [...synonyms, key];
        }
    }

    return [trait];
}

/**
 * Kiểm tra xem trait (hoặc synonyms) có trong text không.
 */
function matchTraitInText(trait, text) {
    if (!text) return false;
    const textLower = text.toLowerCase();
    const synonyms = getAllSynonyms(trait);
    return synonyms.some(synonym => textLower.includes(synonym.toLowerCase()));
}

module.exports = {
    TRAIT_SYNONYMS,
    CAREER_KEYWORDS,
    CACH_CUC_TRAITS,
    NGU_HANH_TRAITS,
    getAllSynonyms,
    matchTraitInText
};
