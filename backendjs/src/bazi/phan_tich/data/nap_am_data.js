/**
 * Nạp Âm Chuyên Sâu Data
 */

const NAYIN_DETAILS = {
    "Hải Trung Kim": { "element": "Kim", "nature": "tiềm ẩn", "bone": "ngọc báu dưới đáy biển" },
    "Kiếm Phong Kim": { "element": "Kim", "nature": "sắc bén", "bone": "thép trinh rèn mũi kiếm" },
    "Bạch Lạp Kim": { "element": "Kim", "nature": "thanh khiết", "bone": "vàng trong sáp" },
    "Sa Trung Kim": { "element": "Kim", "nature": "hỗn tạp", "bone": "vàng lẫn trong cát" },
    "Kim Bạch Kim": { "element": "Kim", "nature": "quý phái", "bone": "vàng lá rát tượng" },
    "Thoa Xuyến Kim": { "element": "Kim", "nature": "tinh tế", "bone": "vàng trang sức trâm cài" },

    "Lộ Bàng Thổ": { "element": "Thổ", "nature": "phóng khoáng", "bone": "đất bằng ven đường" },
    "Thành Đầu Thổ": { "element": "Thổ", "nature": "vững chãi", "bone": "đất đắp mặt thành" },
    "Ốc Thượng Thổ": { "element": "Thổ", "nature": "che chở", "bone": "đất nung mái nhà" },
    "Bích Thượng Thổ": { "element": "Thổ", "nature": "kiên cường", "bone": "đất bùn trên tường" },
    "Đại Trạch Thổ": { "element": "Thổ", "nature": "biến hóa", "bone": "đất đầm lầy" },
    "Sa Trung Thổ": { "element": "Thổ", "nature": "tĩnh lặng", "bone": "đất pha cát" },

    "Dương Liễu Mộc": { "element": "Mộc", "nature": "mềm dẻo", "bone": "cành liễu trước gió" },
    "Tùng Bách Mộc": { "element": "Mộc", "nature": "hiên ngang", "bone": "gỗ tùng bách xanh tốt" },
    "Đại Lâm Mộc": { "element": "Mộc", "nature": "bao trùm", "bone": "cây già trong rừng sâu" },
    "Tang Đố Mộc": { "element": "Mộc", "nature": "công hiến", "bone": "gỗ cây dâu làm tằm" },
    "Thạch Lựu Mộc": { "element": "Mộc", "nature": "nghị lực", "bone": "gỗ thạch lựu cứng cỏi" },
    "Bình Địa Mộc": { "element": "Mộc", "nature": "ôn hòa", "bone": "cây cỏ đồng bằng" },

    "Thiên Thượng Hỏa": { "element": "Hỏa", "nature": "rạng rỡ", "bone": "ánh nắng trời cao" },
    "Sơn Hạ Hỏa": { "element": "Hỏa", "nature": "âm ỉ", "bone": "ngọn lửa dưới chân núi" },
    "Sơn Đầu Hỏa": { "element": "Hỏa", "nature": "mạnh mẽ", "bone": "lửa cháy đỉnh núi" },
    "Lư Trung Hỏa": { "element": "Hỏa", "nature": "nhiệt huyết", "bone": "ngọn hỏa lò rực sáng" },
    "Phúc Đăng Hỏa": { "element": "Hỏa", "nature": "ấm áp", "bone": "ánh đèn soi bóng đêm" },
    "Tích Lịch Hỏa": { "element": "Hỏa", "nature": "đột phá", "bone": "tia chớp trong mưa" },

    "Giản Hạ Thủy": { "element": "Thủy", "nature": "thâm trầm", "bone": "nước dưới khe suối" },
    "Tuyền Trung Thủy": { "element": "Thủy", "nature": "trong trẻo", "bone": "nước mạch suối ngàn" },
    "Trường Lưu Thủy": { "element": "Thủy", "nature": "bền bỉ", "bone": "nước sông dài đổ biển" },
    "Đại Hải Thủy": { "element": "Thủy", "nature": "mênh mông", "bone": "nước biển đại dương" },
    "Đại Khê Thủy": { "element": "Thủy", "nature": "sôi động", "bone": "nước khe lớn đổ ra sông" },
    "Thiên Hà Thủy": { "element": "Thủy", "nature": "thanh cao", "bone": "mưa rơi từ trời xanh" }
};

const OPENINGS = {
    "Kim": [
        "Xét về khối vật chất mang tính rèn giũa,", "Bản mệnh mang kim khí sắc bén,",
        "Năng lượng Kim trong lá số biểu hiện qua", "Khối Kim này ẩn chứa",
        "Với bản thể là vàng trong trời đất,", "Sức mạnh của Kim khí chủ về",
    ],
    "Mộc": [
        "Về phương diện năng lượng sinh sôi,", "Khối Mộc này mang hơi thở của",
        "Sự vươn lên của hành Mộc biểu hiện,", "Bản chất là gỗ quý trong rừng,",
        "Sức sống tiềm tàng của Mộc khí", "Nhìn vào cốt cách của cây cỏ,",
    ],
    "Thủy": [
        "Dòng chảy của năng lượng Thủy", "Bản chất là nước trong thiên hài,",
        "Sự uyển chuyển của Thủy khí biểu hiện", "Nước chủ về trí tuệ và sự",
        "Khối Thủy này mang tâm tư của", "Nhìn từ sự luân chuyển của dòng nước,",
    ],
    "Hỏa": [
        "Ngọn lửa của nhiệt huyết và tâm thế,", "Hỏa khí rực rỡ chiếu sáng biểu hiện",
        "Bản chất là lửa trong lò hay lửa trời,", "Sức nóng của năng lượng Hỏa",
    ],
    "Thổ": [
        "Sự vững chãi của đất mẹ biểu hiện qua", "Khối Thổ này mang cốt cách của",
        "Bản chất là đất trên thành hay ven đường,", "Thổ khí chủ về sự tin cậy và",
    ]
};

const ADJECTIVES = {
    "Kim": ["sắc bén", "quyết đoán", "cứng cỏi", "kiên định", "mạnh mẽ", "thẳng thắn", "sắc sảo", "uy quyền"],
    "Mộc": ["nhân hậu", "bao dung", "phát triển", "kiên nhẫn", "mềm dẻo", "sinh sôi", "hướng thượng", "ôn hòa"],
    "Thủy": ["thông minh", "linh hoạt", "sâu sắc", "uyển chuyển", "bí ẩn", "khôn ngoan", "lanh lợi", "uyên bác"],
    "Hỏa": ["nhiệt huyết", "sáng tạo", "đam mê", "mạnh mẽ", "rực rỡ", "nổi bật", "sôi nổi", "tiên phong"],
    "Thổ": ["ổn định", "vững chắc", "trung thực", "bao dung", "kiên nhẫn", "thực tế", "đáng tin", "bền bỉ"]
};

const INTERACTION_TEMPLATES = {
    "Sinh": [
        "có sự hỗ trợ tuyệt vời từ {p2}, khí thế như rồng thêm cánh.",
        "được {p2} bồi đắp năng lượng, giúp bản mệnh không ngừng phát triển.",
        "hài hòa với {p2}, tạo nên một dòng chảy năng lượng hanh thông.",
    ],
    "Khắc": [
        "chịu sự kìm kẹp của {p2}, cần học cách nhẫn nại và chờ thời.",
        "xung đột với khí thế của {p2}, đòi hỏi bản lĩnh vượt qua nghịch cảnh.",
        "bị {p2} tiết chế sức mạnh, nên hành sự cẩn trọng và suy tính kỹ.",
    ],
    "Đồng": [
        "cùng khí thế với {p2}, tạo nên sức mạnh cộng hưởng to lớn.",
        "tương đồng với {p2}, chủ về sự hợp tác mang tính chiến lược.",
        "gặp {p2} là tượng hổ mọc thêm cánh, khí thế ngút trời.",
    ]
};

const STRATEGIES = {
    "Kim": ["Cần mài giũa tài năng chuyên môn", "Nên theo đuổi các ngành quản lý, pháp trị", "Dùng sự sắc bén để dẫn đầu"],
    "Mộc": ["Phát triển theo chiều sâu tri thức", "Nên làm các công việc mang tính giáo dục, cộng đồng", "Gieo mầm nhân đức để gặt hái thành công"],
    "Thủy": ["Phát huy trí tuệ và mạng lưới quan hệ", "Linh hoạt ứng biến trong mọi sóng gió", "Nên theo đuổi các ngành dịch vụ, giao tiếp"],
    "Hỏa": ["Giữ ngọn lửa đam mê và sự trung thực", "Nổi bật trong các ngành nghệ thuật, truyền thông", "Nên tránh sự bốc đồng nhất thời"],
    "Thổ": ["Xây dựng nền tảng vững chắc và uy tín", "Bất động sản và tài chính là nơi dung thân tốt", "Sự chân thành sẽ mở ra nhiều quý nhân"]
};

module.exports = {
    NAYIN_DETAILS,
    OPENINGS,
    ADJECTIVES,
    INTERACTION_TEMPLATES,
    STRATEGIES
};
