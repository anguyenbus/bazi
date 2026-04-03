/**
 * Classic Keywords Data
 * Extracted from classical texts (self_zuo, rizhus, jinbuhuan)
 */

const SELF_ZUO_KEYWORDS = {
    "Quan": [
        "hiền lành", "trung hậu", "thông minh", "chí tiến thủ", "học hành giỏi",
        "lao tâm khổ tứ", "thanh quý", "phát phúc", "trách nhiệm", "địa vị"
    ],
    "Sát": [
        "cấp bách", "âm hiểm", "tiệm ngụy", "mưu hại", "mặt mục có sẹo",
        "mãnh bạo", "vi phạm", "võ quý", "quyết đoán", "cạnh tranh"
    ],
    "Tài+": [
        "cẩn thận", "tiết kiệm", "hiếu thảo", "vợ hiền con ngoan",
        "phú ốc bần nhân", "sợ vợ", "trung niên phát đạt", "ổn định"
    ],
    "Tài-": [
        "hào phóng", "trọng nghĩa khinh tài", "ngoại giao", "hoành tài",
        "bôn ba", "nữ sắc bại thân", "kinh thương phát đạt", "mạo hiểm"
    ],
    "Ấn": [
        "nhân từ", "khoan dung", "học rộng", "quý nhân phù trợ",
        "hưởng phúc", "lười biếng", "dựa dẫm", "văn chương hiển đạt"
    ],
    "Kiêu": [
        "thông minh sắc sảo", "tài lẻ", "phản ứng nhanh", "cô độc", "đa nghi",
        "đầu không đuôi", "nghệ thuật", "kỹ thuật", "bói toán", "tôn giáo"
    ],
    "Thực": [
        "ôn hòa", "đôn hậu", "lộc ăn", "phúc thọ", "con cái hiếu thảo",
        "khắc con", "an phận", "nghệ thuật", "ẩm thực"
    ],
    "Thương": [
        "thông minh tột đỉnh", "đa tài đa nghệ", "kiêu ngạo", "tự phụ",
        "coi thường pháp luật", "đắc tội", "thị phi", "văn chương", "tài mưu"
    ],
    "Tỷ": [
        "cương trực", "trọng bạn bè", "tự lập", "tự cường", "không dựa dẫm",
        "khắc vợ", "tổn tài", "anh em tranh đoạt", "cố chấp", "nghiệp lớn"
    ],
    "Kiếp": [
        "dũng mãnh", "quyết đoán", "nóng nảy", "hiếu thắng", "lãng phí",
        "khó tụ tài", "khắc cha", "hại vợ", "kiện tụng", "liều lĩnh", "mạo hiểm"
    ],
};

const RIZHU_TRAITS = {
    "甲子": ["Mộc Dục", "thê bại", "mùa đông", "tứ trụ có Lộc"],
    "甲寅": ["Trường Sinh", "Tài Quan đều lưng", "cần Ấn hỗ trợ"],
    "甲辰": ["Tài khố", "tính thiện lương", "Thủy khí"],
    "甲午": ["sinh mùa hè", "đại cát", "Hỏa vượng"],
    "甲申": ["Tọa Tuyệt", "tứ trụ đều Tuyệt thì cát"],
    "甲戌": ["vượng Quan", "Hỏa khố", "tâm hoài từ thiện"],
    "乙丑": ["Tài Quan", "Ất Canh hợp cát"],
    "乙卯": ["Tài Quan vô khí", "cần giờ Canh Thần"],
    "乙巳": ["hại gia thất", "cần Nhâm giảm"],
    "乙未": ["Tài Thương Quan cách"],
    "乙酉": ["tọa Sát", "hóa Sát cát"],
    "乙亥": ["Mộc cục", "đa nguồn lợi"],
    "丙寅": ["Kim tuyệt Thủy tử", "Thực thần vượng", "chủ thọ"],
    "丙辰": ["mùa xuân", "cần Kim điều hậu"],
    "丙午": ["Nhật Nhận", "hỷ Hình Xung", "hại gia thất"],
    "丙申": ["tọa Tài", "cát cách"],
    "丙戌": ["mùa hè", "Tài Quan vô khí"],
    "丙子": ["Tài Quan song mỹ", "mùa hạ Thân vượng"],
    "丁卯": ["Tài Quan đều lưng", "cần hợp khí"],
    "丁巳": ["hại gia thất", "cần Mậu hoặc Giáp giảm"],
    "丁未": ["tọa Ấn", "tiểu cát"],
    "丁酉": ["Tài học tinh", "cần giờ Nhâm Dần"],
    "丁亥": ["Nhật quý", "giờ Nhâm Dần, Ất Tỵ đều quý"],
    "丁丑": ["Kim khố vinh phong", "giờ Tân Hợi quý"],
    "戊寅": ["Giáp mộc", "Quan Sát giả cát"],
    "戊辰": ["Nhâm Canh nhập mộ", "Ất mộc tự tọa"],
    "戊午": ["Nhật Nhận", "hỷ Hình Xung", "tháng 4, 5 cát"],
    "戊申": ["Giáp tuyệt", "Tài không Quan"],
    "戊戌": ["Khôi Cương", "kỵ Xung Hình"],
    "戊子": ["tự tọa Tài", "giờ Ất Mão, Đinh Tỵ quý"],
    "己卯": ["tọa Sát địa", "Thân Sát lực tương đương"],
    "己巳": ["Thủy tuyệt Mộc bệnh", "giờ Bính Dần quý"],
    "己未": ["giờ Bính Dần quý", "không Thủy đại cát"],
    "己酉": ["Tài Lộc đều lưng", "cần sinh phù"],
    "己亥": ["tọa Tài Quan", "cao danh", "giờ Bính Dần quý"],
    "己丑": ["Tài không Quan", "giờ Bính Dần quý"],
    "庚寅": ["Tọa Tuyệt", "phản lại chủ cát xương"],
    "庚辰": ["Khôi Cương", "kỵ Hình Xung"],
    "庚午": ["tọa Tử", "tự tọa Quan Ấn", "bại không quẫn"],
    "庚申": ["Nhật Đức", "Nhật Lộc", "thọ"],
    "庚戌": ["Khôi Cương", "kỵ Địa chi Hỏa vượng"],
    "庚子": ["cần Đinh Hỏa cát"],
    "辛卯": ["Tài suy", "giờ Mậu Tý quý"],
    "辛巳": ["Kim cục tọa Tử", "giờ Mậu Tý quý"],
    "辛未": ["Thân vượng", "giờ Bính Thân quý"],
    "辛酉": ["Nhật Lộc", "giờ Mậu Tý, Bính Thân quý"],
    "辛亥": ["Tài sinh", "Quan tuyệt"],
    "辛丑": ["Thực Thần vinh xương", "chủ thọ"],
    "壬寅": ["Thủy Hỏa ký tế", "giờ Nhâm Dần đại cát"],
    "壬辰": ["Khôi Cương", "kỵ Xung Hình", "Kiến Lộc trái thành hèn"],
    "壬午": ["Tài Quan song mỹ", "lanh lợi", "mưu", "giờ Nhâm Dần quý"],
    "壬申": ["Thủy Trường sinh", "thông minh tú lệ"],
    "壬戌": ["Nguyên Vũ đương quyền", "Hỏa Khố", "Tài Quan song mỹ", "Thân vượng gặp Hỏa ắt phát phú"],
    "壬子": ["Nhật Nhận", "hỷ Hình Xung"],
    "癸卯": ["Nhật quý", "suy thần vượng cát"],
    "癸巳": ["Tài Quan song mỹ", "cát tường", "giờ Đinh Tỵ quý"],
    "癸未": ["tọa Sát vị", "thân lực tương đương"],
    "癸酉": ["Tài Quan vô khí", "cần dùng vượng"],
    "癸亥": ["giờ Quý Hợi", "phu quý"],
    "癸丑": ["hỷ Xung", "không tai họa"],
};

const JIN_BU_HUAN_KEYWORDS = {
    "Quan": ["Tài Sát", "quyền lực", "thăng tiến", "công danh"],
    "Sát": ["chiến đấu", "cạnh tranh", "áp lực", "thử thách", "quân sự"],
    "Tài": ["kinh doanh", "tiền bạc", "tài lộc", "phát tài", "phú"],
    "Ấn": ["học hành", "nghiên cứu", "trí tuệ", "quý nhân"],
    "Thực": ["sáng tạo", "nghệ thuật", "con cái", "phúc đức"],
    "Thương": ["tài năng", "phá cách", "thị phi", "gây tranh cãi"],
};

module.exports = {
    SELF_ZUO_KEYWORDS,
    RIZHU_TRAITS,
    JIN_BU_HUAN_KEYWORDS
};
