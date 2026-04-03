/**
 * Dữ liệu 64 Quẻ Dịch (I Ching Hexagrams)
 * Dùng cho tính năng Xin Quẻ
 */

const TRIGRAMS = {
    1: { name: 'Càn', element: 'Kim', symbol: '☰' }, // Thiên
    2: { name: 'Đoài', element: 'Kim', symbol: '☱' }, // Trạch
    3: { name: 'Ly', element: 'Hỏa', symbol: '☲' },   // Hỏa
    4: { name: 'Chấn', element: 'Mộc', symbol: '☳' }, // Lôi
    5: { name: 'Tốn', element: 'Mộc', symbol: '☴' },  // Phong
    6: { name: 'Khảm', element: 'Thủy', symbol: '☵' }, // Thủy
    7: { name: 'Cấn', element: 'Thổ', symbol: '☶' },  // Sơn
    8: { name: 'Khôn', element: 'Thổ', symbol: '☷' }   // Địa
};

// Map Upper (Outer) + Lower (Inner) -> Hexagram ID (1-64)
// Key format: "UpperID,LowerID"
const HEXAGRAM_LOOKUP = {
    "1,1": 1, "8,8": 2, "6,4": 3, "7,6": 4, "6,1": 5, "1,6": 6, "8,6": 7, "6,8": 8,
    "5,1": 9, "1,2": 10, "8,1": 11, "1,8": 12, "1,3": 13, "3,1": 14, "8,7": 15, "4,8": 16,
    "2,4": 17, "7,5": 18, "8,2": 19, "5,8": 20, "3,4": 21, "7,3": 22, "7,8": 23, "8,4": 24,
    "1,4": 25, "7,1": 26, "7,4": 27, "2,5": 28, "6,6": 29, "3,3": 30, "2,7": 31, "4,5": 32,
    "1,7": 33, "4,1": 34, "3,8": 35, "8,3": 36, "5,3": 37, "3,2": 38, "6,7": 39, "4,6": 40,
    "7,2": 41, "5,4": 42, "2,1": 43, "1,5": 44, "2,8": 45, "8,5": 46, "2,6": 47, "6,5": 48,
    "2,3": 49, "3,5": 50, "4,4": 51, "7,7": 52, "5,7": 53, "4,2": 54, "4,3": 55, "3,7": 56,
    "5,5": 57, "2,2": 58, "5,6": 59, "6,2": 60, "5,2": 61, "4,7": 62, "6,3": 63, "3,6": 64
};

const HEXAGRAMS = {
    1: { name: "Bát Thuần Càn", symbol: "䷀", meaning: "Sáng tạo, mạnh mẽ, kiên định", quality: "Đại Cát" },
    2: { name: "Bát Thuần Khôn", symbol: "䷁", meaning: "Tiếp nhận, nhu thuận, bao dung", quality: "Đại Cát" },
    3: { name: "Thủy Lôi Truân", symbol: "䷂", meaning: "Gian nan, khởi đầu khó khăn", quality: "Hung" },
    4: { name: "Sơn Thủy Mông", symbol: "䷃", meaning: "Mờ mịt, cần người dẫn dắt", quality: "Bình" },
    5: { name: "Thủy Thiên Nhu", symbol: "䷄", meaning: "Chờ đợi, thời cơ chưa đến", quality: "Bình" },
    6: { name: "Thiên Thủy Tụng", symbol: "䷅", meaning: "Tranh chấp, kiện tụng, bất đồng", quality: "Xấu" },
    7: { name: "Địa Thủy Sư", symbol: "䷆", meaning: "Quân đội, kỷ luật, đám đông", quality: "Bình" },
    8: { name: "Thủy Địa Tỷ", symbol: "䷇", meaning: "Gần gũi, thân thiết, giúp đỡ", quality: "Cát" },
    9: { name: "Phong Thiên Tiểu Súc", symbol: "䷈", meaning: "Tích lũy nhỏ, chờ thời", quality: "Bình" },
    10: { name: "Thiên Trạch Lý", symbol: "䷉", meaning: "Dẫm đuôi cọp, cẩn trọng, lễ nghi", quality: "Bình" },
    11: { name: "Địa Thiên Thái", symbol: "䷊", meaning: "Hanh thông, hòa hợp, yên vui", quality: "Đại Cát" },
    12: { name: "Thiên Địa Bĩ", symbol: "䷋", meaning: "Bế tắc, không thông, tiểu nhân", quality: "Đại Hung" },
    13: { name: "Thiên Hỏa Đồng Nhân", symbol: "䷌", meaning: "Cùng người, hợp tác, đoàn kết", quality: "Cát" },
    14: { name: "Hỏa Thiên Đại Hữu", symbol: "䷍", meaning: "Sở hữu lớn, giàu có, sung túc", quality: "Đại Cát" },
    15: { name: "Địa Sơn Khiêm", symbol: "䷎", meaning: "Khiêm tốn, nhún nhường, cát lợi", quality: "Cát" },
    16: { name: "Lôi Địa Dự", symbol: "䷏", meaning: "Vui vẻ, chuẩn bị, hào hứng", quality: "Cát" },
    17: { name: "Trạch Lôi Tùy", symbol: "䷐", meaning: "Đi theo, tùy tùng, linh hoạt", quality: "Bình" },
    18: { name: "Sơn Phong Cổ", symbol: "䷑", meaning: "Sửa chữa, cải cách, hư nát", quality: "Xấu" },
    19: { name: "Địa Trạch Lâm", symbol: "䷒", meaning: "Đến gần, giám sát, lớn mạnh", quality: "Cát" },
    20: { name: "Phong Địa Quan", symbol: "䷓", meaning: "Quan sát, xem xét, chiêm nghiệm", quality: "Bình" },
    21: { name: "Hỏa Lôi Phệ Hạp", symbol: "䷔", meaning: "Cắn vỡ, trừng phạt, làm rõ", quality: "Bình" },
    22: { name: "Sơn Hỏa Bí", symbol: "䷕", meaning: "Trang trí, văn vẻ, bề ngoài", quality: "Tiểu Cát" },
    23: { name: "Sơn Địa Bác", symbol: "䷖", meaning: "Bóc mòn, suy tàn, rơi rụng", quality: "Xấu" },
    24: { name: "Địa Lôi Phục", symbol: "䷗", meaning: "Trở lại, phục hồi, bắt đầu lại", quality: "Cát" },
    25: { name: "Thiên Lôi Vô Vọng", symbol: "䷘", meaning: "Không xằng bậy, chân thật, tai vạ", quality: "Bình" },
    26: { name: "Sơn Thiên Đại Súc", symbol: "䷙", meaning: "Tích lũy lớn, nuôi dưỡng, dừng lại", quality: "Cát" },
    27: { name: "Sơn Lôi Di", symbol: "䷚", meaning: "Nuôi dưỡng, ăn uống, khẩu nghiệp", quality: "Bình" },
    28: { name: "Trạch Phong Đại Quá", symbol: "䷛", meaning: "Quá mức, gánh nặng, cong oằn", quality: "Xấu" },
    29: { name: "Bát Thuần Khảm", symbol: "䷜", meaning: "Hiểm trở, khó khăn chồng chất", quality: "Đại Hung" },
    30: { name: "Bát Thuần Ly", symbol: "䷝", meaning: "Sáng sủa, bám vào, văn minh", quality: "Cát" },
    31: { name: "Trạch Sơn Hàm", symbol: "䷞", meaning: "Cảm ứng, rung động, tình yêu", quality: "Cát" },
    32: { name: "Lôi Phong Hằng", symbol: "䷟", meaning: "Bền vững, lâu dài, vợ chồng", quality: "Cát" },
    33: { name: "Thiên Sơn Độn", symbol: "䷠", meaning: "Lui về, ẩn dật, trốn tránh", quality: "Xấu" },
    34: { name: "Lôi Thiên Đại Tráng", symbol: "䷡", meaning: "Lớn mạnh, thịnh vượng, tự tin", quality: "Cát" },
    35: { name: "Hỏa Địa Tấn", symbol: "䷢", meaning: "Tiến lên, thăng tiến, rực rỡ", quality: "Đại Cát" },
    36: { name: "Địa Hỏa Minh Di", symbol: "䷣", meaning: "Tổn thương, giấu sáng, gian nan", quality: "Xấu" },
    37: { name: "Phong Hỏa Gia Nhân", symbol: "䷤", meaning: "Người nhà, gia đạo, ổn định", quality: "Cát" },
    38: { name: "Hỏa Trạch Khuê", symbol: "䷥", meaning: "Trái ngược, chia lìa, mâu thuẫn", quality: "Xấu" },
    39: { name: "Thủy Sơn Kiển", symbol: "䷦", meaning: "Gian nan, què quặt, dừng lại", quality: "Hung" },
    40: { name: "Lôi Thủy Giải", symbol: "䷧", meaning: "Giải quyết, cởi bỏ, tan đi", quality: "Cát" },
    41: { name: "Sơn Trạch Tổn", symbol: "䷨", meaning: "Tổn thất, bớt đi, hy sinh", quality: "Bình" },
    42: { name: "Phong Lôi Ích", symbol: "䷩", meaning: "Tăng thêm, lợi ích, giúp đỡ", quality: "Đại Cát" },
    43: { name: "Trạch Thiên Quải", symbol: "䷪", meaning: "Quyết liệt, dứt khoát, loại bỏ", quality: "Bình" },
    44: { name: "Thiên Phong Cấu", symbol: "䷫", meaning: "Gặp gỡ, cấu kết, bất ngờ", quality: "Bình" },
    45: { name: "Trạch Địa Tụy", symbol: "䷬", meaning: "Tụ họp, đông đúc, sum vầy", quality: "Cát" },
    46: { name: "Địa Phong Thăng", symbol: "䷭", meaning: "Thăng tiến, mọc lên, thuận lợi", quality: "Đại Cát" },
    47: { name: "Trạch Thủy Khốn", symbol: "䷮", meaning: "Khốn đốn, cùng đường, cạn kiệt", quality: "Đại Hung" },
    48: { name: "Thủy Phong Tỉnh", symbol: "䷯", meaning: "Giếng nước, nuôi dưỡng, tịnh tâm", quality: "Bình" },
    49: { name: "Trạch Hỏa Cách", symbol: "䷰", meaning: "Thay đổi, cách mạng, đổi mới", quality: "Bình" },
    50: { name: "Hỏa Phong Đỉnh", symbol: "䷱", meaning: "Vững chắc, nung nấu, đại sự", quality: "Cát" },
    51: { name: "Bát Thuần Chấn", symbol: "䷲", meaning: "Sấm sét, chấn động, lo sợ", quality: "Bình" },
    52: { name: "Bát Thuần Cấn", symbol: "䷳", meaning: "Ngưng nghỉ, núi non, tĩnh tại", quality: "Bình" },
    53: { name: "Phong Sơn Tiệm", symbol: "䷴", meaning: "Từ từ, tiến dần, tuần tự", quality: "Cát" },
    54: { name: "Lôi Trạch Quy Muội", symbol: "䷵", meaning: "Rối ren, không chính vị, tai họa", quality: "Xấu" },
    55: { name: "Lôi Hỏa Phong", symbol: "䷶", meaning: "Phong phú, thịnh đại, dồi dào", quality: "Đại Cát" },
    56: { name: "Hỏa Sơn Lữ", symbol: "䷷", meaning: "Khách lữ hành, lang thang, bất định", quality: "Bình" },
    57: { name: "Bát Thuần Tốn", symbol: "䷸", meaning: "Thuận theo, gió, thâm nhập", quality: "Bình" },
    58: { name: "Bát Thuần Đoài", symbol: "䷹", meaning: "Vui vẻ, đầm hồ, nói năng", quality: "Cát" },
    59: { name: "Phong Thủy Hoán", symbol: "䷺", meaning: "Tan tác, giải tán, lan tỏa", quality: "Bình" },
    60: { name: "Thủy Trạch Tiết", symbol: "䷻", meaning: "Tiết chế, chừng mực, hạn chế", quality: "Cát" },
    61: { name: "Phong Trạch Trung Phu", symbol: "䷼", meaning: "Tin tưởng, trung thực, tín nghĩa", quality: "Cát" },
    62: { name: "Lôi Sơn Tiểu Quá", symbol: "䷽", meaning: "Quá một chút, lỗi nhỏ, chim bay", quality: "Tiểu Xấu" },
    63: { name: "Thủy Hỏa Ký Tế", symbol: "䷾", meaning: "Đã xong, hoàn thành, trọn vẹn", quality: "Cát" },
    64: { name: "Hỏa Thủy Vị Tế", symbol: "䷿", meaning: "Chưa xong, dở dang, hy vọng", quality: "Bình" }
};

module.exports = {
    TRIGRAMS,
    HEXAGRAM_LOOKUP,
    HEXAGRAMS
};
