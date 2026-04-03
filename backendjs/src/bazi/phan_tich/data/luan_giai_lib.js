/**
 * KHO DỮ LIỆU LUẬN GIẢI BIẾN THIÊN (INFINITE GENERATIVE LIBRARY)
 * Hệ thống sinh văn bản tổ hợp đa tầng (Multi-layer Combinatorial Generation).
 * Quy mô biến thể: > 10,000,000 combinations (Infinite scale).
 */

// --- TỪ ĐIỂN MẢNH GHÉP (ATOMIC WORD BANKS) ---
const BANKS = {
    // CHỦ NGỮ (SUBJECTS)
    SUBJECTS: [
        "Đương số", "Bản mệnh", "Thân chủ", "Mệnh tạo", "Người này", "Mệnh chủ", "Quý bạn", "Gia chủ", "Chủ nhân lá số",
        "Người sở hữu bát tự này", "Đương sự", "Vị này", "Chính chủ", "Cá nhân này", "Bản thân đương số", "Người có mệnh cục này"
    ],
    // TRẠNG TỪ CHỈ MỨC ĐỘ (ADVERBS)
    ADVERBS: [
        "vô cùng", "rất", "khá", "cực kỳ", "đặc biệt", "hết sức", "tương đối", "phần nào", "thực sự", "đáng kể", "rõ rệt",
        "mạnh mẽ", "sâu sắc", "nghiêm trọng", "triệt để", "hoàn toàn", "không thể xem thường", "đáng báo động", "cần lưu tâm"
    ],
    // TỪ NỐI (CONNECTORS)
    CONNECTORS: [
        "đồng thời", "bên cạnh đó", "hơn nữa", "mặt khác", "tuy nhiên", "dẫn đến việc", "kéo theo", "hệ quả là", "từ đó",
        "chính vì vậy", "do đó", "bởi thế", "cho nên", "kết quả là", "điều này gây ra", "tạo nên", "góp phần làm"
    ],
    // ĐỘNG TỪ TÁC ĐỘNG (VERBS - IMPACT)
    VERBS_IMPACT: [
        "gây ra", "tạo nên", "dẫn đến", "mang lại", "khiến cho", "làm nảy sinh", "thúc đẩy", "kìm hãm", "kích hoạt",
        "gia tăng", "làm giảm", "tác động đến", "ảnh hưởng tới", "chi phối", "định hình", "xoay chuyển", "biến đổi"
    ],
    // TÍNH TỪ MÔ TẢ TÍCH CỰC (ADJ - POSITIVE)
    ADJ_GOOD: [
        "vững chắc", "hanh thông", "thuận lợi", "tốt đẹp", "rực rỡ", "thăng hoa", "ổn định", "bền vững", "viên mãn",
        "may mắn", "sáng ngời", "tích cực", "khả quan", "hứa hẹn", "đầy triển vọng", "sung túc", "an nhàn", "phú quý"
    ],
    // TÍNH TỪ MÔ TẢ TIÊU CỰC (ADJ - NEGATIVE)
    ADJ_BAD: [
        "bất ổn", "chông gai", "trắc trở", "khó khăn", "lận đận", "sóng gió", "biến động", "bấp bênh", "lao đao",
        "mệt mỏi", "căng thẳng", "áp lực", "rối ren", "phức tạp", "nguy nan", "hiểm nghèo", "đau thương", "xót xa"
    ]
};

// --- CÔNG CỤ SINH CÂU (GENERATORS) ---
/**
 * Tạo một mảng các câu bằng cách hoán vị các thành phần.
 * @param {Array[]} componentsArray - Mảng chứa các mảng từ (Word Banks)
 * @param {number} limit - Giới hạn số câu sinh ra để tránh tràn bộ nhớ (Default: 500)
 */
function permute(componentsArray, limit = 500) {
    const results = [];

    // Helper recursive function
    function generate(currentString, depth) {
        if (results.length >= limit) return;
        if (depth === componentsArray.length) {
            results.push(currentString.trim());
            return;
        }

        const currentBank = componentsArray[depth];
        // Pick random 5 items from generic banks to avoid explosion, or iterate all if small
        const itemsToUse = currentBank.length > 20 ? currentBank.sort(() => 0.5 - Math.random()).slice(0, 10) : currentBank;

        for (const item of itemsToUse) {
            generate(currentString + " " + item, depth + 1);
            if (results.length >= limit) break;
        }
    }

    generate("", 0);
    return results;
}

// --- DỮ LIỆU GỐC (SEED DATA) + SINH TỰ ĐỘNG ---

const GENERATED_DATA = {
    PART_1: {
        PREFIX: permute([
            ["Xét về", "Nhìn vào", "Phân tích", "Đánh giá", "Khảo sát", "Tổng quan về", "Đi sâu vào", "Quan sát"],
            ["cục diện", "thế trận", "cấu trúc", "bức tranh", "hình thái", "năng lượng", "sự tương tác", "mối quan hệ"],
            ["của bát tự,", "của lá số,", "của mệnh cục,", "của tứ trụ,", "giữa các hành,", "giữa can và chi,"]
        ], 200),

        STATE_XUNG: permute([
            ["Sự xung đột", "Sự giao tranh", "Mâu thuẫn", "Sự đối kháng", "Tình trạng xung khắc", "Các dòng khí giao chiến"],
            ["giữa các hành", "trong nội tại", "giữa các trụ", "của ngũ hành", "giữa thiên can địa chi", "trong cấu trúc"],
            ["diễn ra", "xuất hiện", "biểu hiện", "bộc lộ", "hoành hành", "tác động"],
            BANKS.ADVERBS,
            ["gay gắt", "mạnh mẽ", "kịch liệt", "không khoan nhượng", "dai dẳng", "khốc liệt"]
        ], 200),

        STATE_HOP: permute([
            ["Sự liên kết", "Sự hòa hợp", "Mối quan hệ", "Tình trạng tương hợp", "Sự gắn kết", "Các dòng khí tương sinh"],
            ["giữa các trụ", "trong mệnh cục", "của các hành", "giữa can chi", "trong lá số"],
            ["trở nên", "tỏ ra", "biểu hiện", "xuất hiện", "duy trì"],
            BANKS.ADVERBS,
            ["chặt chẽ", "hữu tình", "bền vững", "sâu sắc", "tích cực", "tốt đẹp"]
        ], 200),

        CONTEXT_XUNG: permute([
            BANKS.CONNECTORS,
            ["điều này", "tình trạng này", "cục diện này", "thực tế này", "sự xung đột này"],
            BANKS.VERBS_IMPACT,
            ["cuộc sống của", "vận mệnh của", "hành trình của", "tâm lý của"],
            BANKS.SUBJECTS,
            ["trở nên", "gặp phải", "đối mặt với"],
            BANKS.ADJ_BAD
        ], 300),

        CONTEXT_HOP: permute([
            BANKS.CONNECTORS,
            ["yếu tố này", "sự hòa hợp này", "điểm sáng này", "lợi thế này"],
            ["giúp cho", "hỗ trợ", "tạo điều kiện để", "thúc đẩy"],
            ["cuộc sống của", "vận trình của", "đường đời của"],
            BANKS.SUBJECTS,
            ["thêm phần", "trở nên", "ngày càng"],
            BANKS.ADJ_GOOD
        ], 300)
    },

    PART_2: {
        ROOTS_STRONG: permute([
            ["Căn khí", "Nền tảng", "Gốc rễ", "Nội lực"],
            ["của", "dành cho"],

            ["Nhật chủ", "Bản mệnh"],
            ["vô cùng", "rất", "cực kỳ", "thực sự"],
            ["vững chắc", "mạnh mẽ", "thâm hậu", "bền bỉ", "kiên cường"]
        ], 200),

        ROOTS_WEAK: permute([
            ["Gốc rễ", "Điểm tựa", "Nơi nương tựa", "Căn cơ"],
            ["của Nhật chủ", "của bản mệnh"],
            ["tỏ ra", "trở nên", "khá là", "thực sự"],
            ["mỏng manh", "yếu ớt", "thiếu vững chắc", "lung lay", "kém bền"]
        ], 200),

        ROOTS_CLASHED: permute([
            ["Nguy hiểm thay,", "Đáng lo ngại là,", "Cần lưu ý rằng,", "Điểm trí mạng là,", "Vấn đề nghiêm trọng là,"],
            ["gốc rễ quan trọng nhất", "chỗ dựa sinh tồn", "điểm tựa cốt tử", "nền tảng bản mệnh"],
            ["đang bị", "đã bị", "chịu sự"],
            ["xung phá", "công kích", "tàn phá", "hủy hoại", "tấn công"],
            BANKS.ADVERBS
        ], 100)
    },

    // Extend other parts similarly or keep generic high quality lists combined with generators
    PART_3_GENERIC: permute([
        ["Sự tương tác", "Mối quan hệ", "Sự va chạm", "Cấu trúc"],
        ["giữa các hành", "của ngũ hành", "này"],
        BANKS.VERBS_IMPACT,
        ["những biến đổi", "những hệ quả", "những tác động"],
        ["sâu sắc", "đa chiều", "khó lường", "trực tiếp"]
    ], 100),

    // PART 6 - EVENTS (Massive permutations)
    EVENTS_CAREER: permute([
        ["Đường công danh", "Sự nghiệp", "Con đường thăng tiến", "Vận trình công việc", "Lĩnh vực kinh doanh"],
        ["của", "dành cho"],
        BANKS.SUBJECTS,
        ["sẽ", "dự báo", "có thể", "có xu hướng"],
        ["gặp nhiều", "trải qua", "đối mặt"],
        ["biến động", "thăng trầm", "cạnh tranh", "sáp nhập", "thay đổi cơ cấu", "áp lực chỉ tiêu"],
        ["đòi hỏi sự thích nghi", "cần sự kiên nhẫn", "cần sự tỉnh táo"]
    ], 300),

    EVENTS_LOVE: permute([
        ["Chuyện tình cảm", "Đường tình duyên", "Hôn nhân gia đạo", "Mối quan hệ lứa đôi", "Cung phu thê"],
        ["dễ nảy sinh", "thường gặp", "có nguy cơ đối mặt", "tiềm ẩn"],
        ["những mâu thuẫn", "sự bất đồng", "khoảng cách vô hình", "sự lạnh nhạt", "người thứ ba", "sóng gió"],
        ["khiến tâm tư", "làm cho tinh thần"],
        ["muộn phiền", "lo âu", "bất an", "tổn thương"]
    ], 300),

    EVENTS_HEALTH: permute([
        ["Sức khỏe", "Thể trạng", "Cơ thể", "Sinh lực"],
        ["cần được", "đòi hỏi phải", "nên"],
        ["chăm sóc kỹ lưỡng", "quan tâm đặc biệt", "theo dõi sát sao", "bảo dưỡng thường xuyên"],
        ["để phòng tránh", "nhằm hạn chế", "để ngăn ngừa"],
        ["các bệnh về", "nguy cơ", "vấn đề"],
        ["tiêu hóa", "thần kinh", "xương khớp", "tim mạch", "hô hấp", "thị lực"]
    ], 300)
};


// COMBINING STATIC DATA WITH GENERATED DATA
// We'll export the structure expected by the logic module, but populated with these huge arrays.

const DICTIONARY_FINAL = {
    PART_1: {
        PREFIX: GENERATED_DATA.PART_1.PREFIX,
        STATE_XUNG: GENERATED_DATA.PART_1.STATE_XUNG,
        STATE_HOP: GENERATED_DATA.PART_1.STATE_HOP,
        CONTEXT_XUNG: GENERATED_DATA.PART_1.CONTEXT_XUNG,
        CONTEXT_HOP: GENERATED_DATA.PART_1.CONTEXT_HOP
    },
    PART_2: {
        ROOTS_STRONG: GENERATED_DATA.PART_2.ROOTS_STRONG,
        ROOTS_WEAK: GENERATED_DATA.PART_2.ROOTS_WEAK,
        ROOTS_CLASHED: GENERATED_DATA.PART_2.ROOTS_CLASHED,
        // Manual rich descriptions for Season can be standard
        SEASON: {
            SUPPORT: ["Đắc lệnh, khí thế vượng.", "Được mùa sinh, năng lượng dồi dào.", "Nắm lệnh tháng sinh, căn cơ vững."],
            AGAINST: ["Thất lệnh, khí thế suy.", "Sinh lỗi mùa, năng lượng yếu.", "Không được mùa sinh ủng hộ."]
        }
    },
    PART_3: {
        // Keep the high quality specific ones from previous step, they are good. 
        // We can create a generator for them if needed, but quality > quantity for specific element logic.
        // Let's keep the manual ones for logic-based precision and append generic ones.
        KIM_MOC: {
            SUBJECT: ["Kim Mộc giao chiến", "Sự đối đầu Kim-Mộc", "Canh/Tân khắc Giáp/Ất"],
            ACTION: ["gây tổn thương gân cốt", "tạo áp lực thần kinh", "làm đau đầu nhức óc"],
            RESULT: ["dễ bị tai nạn xe cộ", "cần đề phòng vật sắc nhọn", "tư duy hay mâu thuẫn"]
        },
        THUY_HOA: {
            SUBJECT: ["Thủy Hỏa bất dung", "Nước Lửa giao tranh", "Sự xung đột Thủy-Hỏa"],
            ACTION: ["làm rối loạn khí huyết", "gây bất an trong tâm", "tạo ra sự bốc đồng"],
            RESULT: ["dễ mắc bệnh tim mạch/mắt", "tính tình nóng nảy thất thường", "quan hệ dễ đổ vỡ"]
        },
        GENERIC_XUNG: GENERATED_DATA.PART_3_GENERIC
    },
    PART_4: {
        EARLY_LIFE: {
            GOOD: permute([["Tiền vận", "Thuở nhỏ", "Giai đoạn đầu đời", "Tuổi thơ"], ["êm ấm", "hạnh phúc", "được gia đình che chở", "thuận lợi học hành", "có nền tảng tốt", "được nuông chiều"]], 100),
            BAD: permute([["Tiền vận", "Thuở nhỏ", "Giai đoạn đầu đời", "Tuổi thơ"], ["vất vả", "lận đận", "sớm xa quê hương", "biến động nhiều", "thiếu thốn tình cảm", "sức khỏe kém", "hay ốm đau"]], 100)
        },
        MID_LIFE: {
            GOOD: permute([["Trung vận", "Tuổi trung niên", "Giai đoạn lập nghiệp"], ["hanh thông", "sự nghiệp thăng tiến", "gia đạo yên vui", "vững vàng", "gặt hái nhiều thành công", "được quý nhân phù trợ"]], 100),
            BAD: permute([["Trung vận", "Tuổi trung niên", "Giai đoạn 30-50 tuổi"], ["nhiều sóng gió", "công việc trắc trở", "hôn nhân trục trặc", "áp lực kinh tế lớn", "bôn ba vất vả", "dễ gặp thị phi"]], 100)
        },
        LATE_LIFE: {
            GOOD: permute([["Hậu vận", "Tuổi già", "Giai đoạn xế chiều"], ["an nhàn", "viên mãn", "con cháu hiếu thảo", "tâm hồn thư thái", "sức khỏe dẻo dai", "hưởng phúc lộc"]], 100),
            BAD: permute([["Hậu vận", "Tuổi già", "Giai đoạn xế chiều"], ["nhiều lo toan", "vất vả vì con cái", "cô đơn", "sức khỏe suy giảm", "nhiều bệnh tật", "lận đận"]], 100)
        }
    },
    PART_5: {
        ACTIVE: ["Thế chủ động", "Nắm quyền kiểm soát", "Áp chế đối phương", "Làm chủ tình thế"],
        PASSIVE: ["Thế bị động", "Chịu sự chi phối", "Bị ngoại cảnh tác động", "Khó làm chủ tình hình"]
    },
    PART_6: {
        CAREER: GENERATED_DATA.EVENTS_CAREER,
        LOVE: GENERATED_DATA.EVENTS_LOVE,
        HEALTH: GENERATED_DATA.EVENTS_HEALTH,
        ADVICE: [
            "Nên giữ tâm bất biến giữa dòng đời vạn biến.", "Cẩn trọng lời ăn tiếng nói.",
            "Lấy nhu thắng cương, lấy tĩnh chế động.", "Tích cực làm việc thiện để hóa giải."
        ]
    }
};

/**
 * Main Mix Function
 */
function mix(...arrays) {
    const parts = arrays.map(arr => {
        if (!arr || arr.length === 0) return "";
        return arr[Math.floor(Math.random() * arr.length)];
    });
    return parts.filter(p => p).join(" ");
}

/**
 * Random Picker
 */
function pick(arr) {
    if (!arr || arr.length === 0) return "";
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { DICTIONARY: DICTIONARY_FINAL, mix, pick };
