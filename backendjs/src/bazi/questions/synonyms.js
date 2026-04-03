/**
 * Bazi Synonym Dictionary (1000+ words target)
 * Used for dynamic word substitution to increase answer variety.
 */

const SYNONYMS = {
    // --- NOUNS ---
    "sự nghiệp": ["công danh", "đường quan lộ", "vận trình sự nghiệp", "con đường công việc", "tiền đồ"],
    "tài lộc": ["tiền bạc", "tài vận", "tài khí", "nguồn tài chính", "của cải", "lộc trời", "ngân sách"],
    "tình duyên": ["chuyện tình cảm", "nhân duyên", "đường tình", "vận đào hoa", "mối lương duyên"],
    "sức khỏe": ["thể trạng", "nguyên khí", "sinh lực", "nền tảng thể chất", "sức vóc"],
    "bản mệnh": ["mệnh chủ", "đương số", "chân mệnh", "bản thân", "người"],
    "quý nhân": ["người giúp đỡ", "ân nhân", "người hỗ trợ", "bậc cao nhân", "thiện tri thức"],
    "thử thách": ["chông gai", "sóng gió", "trở ngại", "biến cố", "khó khăn", "thách thức"],
    "cơ hội": ["vận may", "thời cơ", "dịp tốt", "cánh cửa mới", "bước ngoặt"],

    // --- VERBS/ACTIONS ---
    "phát triển": ["thăng tiến", "vươn xa", "nở rộ", "khởi sắc", "thành tựu"],
    "cải thiện": ["nâng cao", "khắc phục", "trau dồi", "bồi đắp", "hoàn thiện"],
    "giúp đỡ": ["hỗ trợ", "nâng đỡ", "tương trợ", "phù trợ", "tiếp sức"],
    "cần": ["nên", "phải", "cần thiết", "quan trọng là", "mấu chốt là"],
    "tránh": ["hạn chế", "đề phòng", "kiêng kỵ", "xa lánh", "giữ khoảng cách"],

    // --- ADJECTIVES ---
    "tốt": ["cát lợi", "hanh thông", "thuận lợi", "viên mãn", "rực rỡ", "tích cực"],
    "xấu": ["bất lợi", "kém may mắn", "trắc trở", "u ám", "tiêu cực"],
    "mạnh": ["vượng", "dồi dào", "sung mãn", "cường thịnh", "mãnh liệt"],
    "yếu": ["suy", "mỏng manh", "yếu ớt", "như muối bỏ bể", "kém sắc"],
    "bền vững": ["lâu dài", "vững chắc", "trường tồn", "kiên cố", "ổn định"],

    // --- BAZI SPECIFIC ---
    "dụng thần": ["yếu tố cân bằng", "thần hộ mệnh", "ngũ hành cứu cánh", "chìa khóa cải vận"],
    "kỵ thần": ["yếu tố khắc chế", "ngũ hành gây bất lợi", "tác nhân cản trở"],
    "đại vận": ["giai đoạn 10 năm", "vận trình thập kỷ", "hành trình mười năm"],
    "lưu niên": ["năm hiện tại", "vận hạn năm nay", "biến động trong năm"],

    // --- CONNECTORS ---
    "tuy nhiên": ["mặc dù vậy", "song song đó", "thế nhưng", "dẫu vậy"],
    "hơn nữa": ["ngoài ra", "bên cạnh đó", "thêm vào đó", "đồng thời"],
    "vì vậy": ["do đó", "chính vì thế", "bởi vậy", "cho nên"]
};

/**
 * Injects synonyms into a text string randomly.
 * @param {string} text - The input text.
 * @param {object} rng - Seeded random number generator.
 * @returns {string} - Text with substitutions.
 */
function injectSynonyms(text, rng) {
    let result = text;
    const keys = Object.keys(SYNONYMS);

    // Shuffle keys to avoid bias order
    // (Simple implementation: just iterate)

    keys.forEach(key => {
        // Simple regex to match whole words or phrases (case insensitive)
        const regex = new RegExp(key, 'gi');
        if (text.match(regex)) {
            // 50% chance to swap if found
            if (rng.next() > 0.5) {
                const options = SYNONYMS[key];
                const replacement = rng.pick(options);
                // Preserve capitalization of the first letter if possible (basic)
                result = result.replace(regex, (match) => {
                    const isCap = match[0] === match[0].toUpperCase();
                    return isCap ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
                });
            }
        }
    });
    return result;
}

module.exports = { SYNONYMS, injectSynonyms };
