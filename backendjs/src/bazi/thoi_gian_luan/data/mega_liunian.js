/**
 * Mega Lưu niên combinations
 */

const THAP_THAN = ["Tỷ Kiên", "Kiếp Tài", "Thực Thần", "Thương Quan", "Chính Tài",
    "Thiên Tài", "Chính Quan", "Thất Sát", "Chính Ấn", "Thiên Ấn"];

const LIUNIAN_TEMPLATES = {
    "general": [
        "Năm {year} mang năng lượng {shen}, {adj1} cho bạn, {action}.",
        "Với Lưu niên {shen}, năm này {adj1}, cần {advice}.",
    ],
    "career": [
        "Sự nghiệp năm {year} với {shen}: {adj1}, {action} để thăng tiến.",
        "Công việc năm này {adj1} do {shen}. Cơ hội: {opportunity}.",
    ],
    "wealth": [
        "Tài chính năm {year} với {shen}: {adj1}, nên {action}.",
        "Tiền bạc năm này {adj1} do {shen}. {advice}.",
    ],
};

const ADJECTIVES = {
    "Tỷ Kiên": ["có cạnh tranh", "nhiều giao tiếp", "cần hợp tác"],
    "Kiếp Tài": ["có tổn thất", "cần cảnh giác", "khó giữ tiền"],
    "Thực Thần": ["vui vẻ", "sáng tạo", "thư thả"],
    "Thương Quan": ["nhiều biến động", "có xung đột", "nổi loạn"],
    "Chính Tài": ["ổn định tài chính", "thu nhập tốt", "có cơ hội tiền bạc"],
    "Thiên Tài": ["may mắn bất ngờ", "có hoành tài", "cơ hội ngoài kế hoạch"],
    "Chính Quan": ["được thăng tiến", "có trách nhiệm", "được công nhận"],
    "Thất Sát": ["có áp lực", "cạnh tranh gay gắt", "thử thách lớn"],
    "Chính Ấn": ["được bảo bọc", "học hỏi tốt", "có quý nhân"],
    "Thiên Ấn": ["suy nghĩ sâu sắc", "hơi cô đơn", "nghiên cứu tốt"],
};

const ACTIONS = {
    "Tỷ Kiên": ["làm việc nhóm", "chia sẻ với bạn bè"],
    "Kiếp Tài": ["giữ chặt tài sản", "tránh cho vay"],
    "Thực Thần": ["phát triển sáng tạo", "tận hưởng cuộc sống"],
    "Thương Quan": ["kiểm soát lời nói", "tránh tranh cãi"],
    "Chính Tài": ["đầu tư dài hạn", "mua sắm tài sản"],
    "Thiên Tài": ["nắm bắt cơ hội", "linh hoạt ứng biến"],
    "Chính Quan": ["giữ gìn uy tín", "nhận trách nhiệm"],
    "Thất Sát": ["mạnh mẽ đối mặt", "tập luyện sức khỏe"],
    "Chính Ấn": ["học tập trau dồi", "biết ơn người giúp"],
    "Thiên Ấn": ["thiền định tu tập", "nghiên cứu chuyên sâu"],
};

const ADVICES = {
    "Tỷ Kiên": ["chia sẻ để nhận lại", "đoàn kết tạo sức mạnh"],
    "Kiếp Tài": ["tiền mất có thể kiếm lại", "bài học quý hơn tiền"],
    "Thực Thần": ["vui sống là phúc", "sáng tạo không giới hạn"],
    "Thương Quan": ["đổi mới là cần thiết", "kiểm soát là sức mạnh"],
    "Chính Tài": ["chậm mà chắc", "tích tiểu thành đại"],
    "Thiên Tài": ["biết khi nào dừng", "may mắn cần nắm bắt"],
    "Chính Quan": ["uy tín là vàng", "trách nhiệm định nghĩa bạn"],
    "Thất Sát": ["khó khăn tạo nên bạn", "không có thất bại, chỉ có bài học"],
    "Chính Ấn": ["biết ơn để nhận phúc", "học hỏi không ngừng"],
    "Thiên Ấn": ["cô độc để suy ngẫm", "chiều sâu tạo nên giá trị"],
};

module.exports = {
    THAP_THAN,
    LIUNIAN_TEMPLATES,
    ADJECTIVES,
    ACTIONS,
    ADVICES
};
