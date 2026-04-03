/**
 * Mega Chọn ngày combinations
 */

const ACTIVITY_VN = {
    "wedding": "Cưới hỏi", "business": "Khai trương", "moving": "Dọn nhà",
    "travel": "Xuất hành", "contract": "Ký hợp đồng", "meeting": "Họp mặt",
    "study": "Học tập", "medical": "Khám bệnh", "construction": "Xây dựng",
    "funeral": "Tang lễ", "house_blessing": "Nhập trạch", "engagement": "Đính hôn",
    "job_start": "Nhận việc", "lawsuit": "Kiện tụng", "haircut": "Cắt tóc",
    "vehicle_purchase": "Mua xe", "stock_trade": "Đầu tư", "loan": "Vay tiền",
    "interview": "Phỏng vấn", "exam": "Thi cử"
};

const JIANCHU = ["Kiến", "Trừ", "Mãn", "Bình", "Định", "Chấp", "Phá", "Nguy", "Thành", "Thu", "Khai", "Bế"];

const CHON_NGAY_TEMPLATES = {
    "good_day": [
        "Ngày {date} ({ganzhi}) là ngày **{quality}** cho {activity}. {reason}. Nên {action}.",
        "Với {activity}, ngày {date} rất thuận lợi do {reason}. Thích hợp để {action}.",
    ],
    "bad_day": [
        "Ngày {date} ({ganzhi}) **không nên** làm {activity}. {reason}. Nên {action}.",
        "Tránh {activity} vào ngày {date} do {reason}. Thay vào đó {action}.",
    ],
    "neutral": [
        "Ngày {date} ({ganzhi}) là ngày bình thường cho {activity}. {detail}.",
    ],
};

const GOOD_REASONS = {
    "wedding": ["ngày Ngọc Đường", "Thiên Hỷ chiếu", "Nguyệt Đức hợp"],
    "business": ["ngày Khai", "Thành nhật", "Thiên Tài lâm"],
    "moving": ["ngày Thiên Xá", "An Hương nhật", "Phúc Sinh hội"],
    "general": ["Hoàng Đạo cát", "Thiên Ân lâm", "Phúc Đức hội"],
};

const BAD_REASONS = {
    "wedding": ["Ly Biệt nhật", "Cô Thần chiếu", "Quả Tú hội"],
    "business": ["Phá nhật", "Bế nhật", "Tổn Tài thực"],
    "general": ["Phá nhật kỵ", "Bế nhật đóng", "Nguy nhật hung"],
};

const SUGGESTED_ACTIONS = {
    "good": ["tiến hành thuận lợi", "nắm bắt cơ hội", "hành động quyết đoán"],
    "bad": ["dời lại ngày khác", "chờ thời cơ hơn", "tránh khởi đầu mới"],
    "neutral": ["cẩn thận tiến hành", "chuẩn bị kỹ lưỡng", "xem xét thêm yếu tố"],
};

module.exports = {
    ACTIVITY_VN,
    JIANCHU,
    CHON_NGAY_TEMPLATES,
    GOOD_REASONS,
    BAD_REASONS,
    SUGGESTED_ACTIONS
};
