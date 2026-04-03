/**
 * Chọn ngày tốt - Day Selection Data
 */

const ACTIVITY_NAMES = {
    "general": "Công việc chung",
    "wedding": "Cưới hỏi",
    "business": "Khai trương, kinh doanh",
    "moving": "Dọn nhà, chuyển nhà",
    "travel": "Xuất hành, du lịch",
    "contract": "Ký hợp đồng",
    "meeting": "Họp mặt, gặp gỡ",
    "study": "Học tập, thi cử",
    "medical": "Khám chữa bệnh",
    "construction": "Xây dựng, động thổ",
};

const GOOD_SHENS_FOR_ACTIVITY = {
    "general": ["Chính Tài", "Thiên Tài", "Chính Ấn", "Thực Thần"],
    "wedding": ["Chính Tài", "Chính Quan", "Chính Ấn", "Thực Thần"],
    "business": ["Chính Tài", "Thiên Tài", "Thực Thần", "Thiên Ấn"],
    "moving": ["Chính Ấn", "Thiên Ấn", "Thực Thần"],
    "travel": ["Thực Thần", "Chính Tài", "Thiên Tài"],
    "contract": ["Chính Quan", "Chính Tài", "Chính Ấn"],
    "meeting": ["Tỷ Kiên", "Thực Thần", "Chính Tài"],
    "study": ["Chính Ấn", "Thiên Ấn", "Thực Thần"],
    "medical": ["Chính Ấn", "Thực Thần"],
    "construction": ["Chính Ấn", "Chính Tài", "Thiên Tài"],
};

const BAD_SHENS_FOR_ACTIVITY = {
    "general": ["Thất Sát", "Kiếp Tài"],
    "wedding": ["Thất Sát", "Thương Quan", "Kiếp Tài"],
    "business": ["Thất Sát", "Kiếp Tài", "Thương Quan"],
    "moving": ["Thất Sát", "Thương Quan"],
    "travel": ["Thất Sát", "Kiếp Tài"],
    "contract": ["Thất Sát", "Thương Quan", "Kiếp Tài"],
    "meeting": ["Thất Sát", "Thương Quan"],
    "study": ["Kiếp Tài", "Thất Sát"],
    "medical": ["Thất Sát"],
    "construction": ["Thất Sát", "Kiếp Tài"],
};

const JIANCHU_GOOD = {
    "general": ["Kiến", "Trừ", "Mãn", "Bình", "Định", "Chấp", "Thành", "Thu", "Khai"],
    "wedding": ["Thành", "Thu", "Khai", "Định"],
    "business": ["Thành", "Khai", "Mãn"],
    "moving": ["Trừ", "Thành", "Khai"],
    "travel": ["Khai", "Trừ", "Định"],
    "contract": ["Thành", "Định", "Chấp"],
    "meeting": ["Thành", "Thu", "Khai"],
    "study": ["Khai", "Thành", "Mãn"],
    "medical": ["Trừ", "Định"],
    "construction": ["Thành", "Trừ", "Định", "Khai"],
    "engagement": ["Thành", "Thu", "Khai", "Định"],
    "house_blessing": ["Trừ", "Thành", "Khai", "Định"],
};

const JIANCHU_BAD = {
    "general": ["Phá", "Nguy", "Bế"],
    "wedding": ["Phá", "Bế", "Nguy", "Thu"],
    "business": ["Phá", "Bế", "Nguy"],
    "moving": ["Phá", "Bế"],
    "travel": ["Phá", "Bế", "Nguy"],
    "contract": ["Phá", "Bế"],
    "meeting": ["Phá", "Bế"],
    "study": ["Phá", "Bế"],
    "medical": ["Phá", "Bế", "Nguy"],
    "construction": ["Phá", "Bế", "Nguy"],
    "engagement": ["Phá", "Bế", "Nguy"],
    "house_blessing": ["Phá", "Bế", "Nguy"],
};

const DAY_QUALITY_DESCRIPTIONS = {
    "excellent": [
        "Ngày đại cát, mọi việc thuận lợi.",
        "Ngày rất tốt để tiến hành công việc quan trọng.",
        "Ngày được trời phù hộ, thành công dễ dàng.",
    ],
    "good": [
        "Ngày tốt, phù hợp with hoạt động này.",
        "Ngày thuận lợi, có thể tiến hành.",
        "Ngày khá tốt, nên tận dụng.",
    ],
    "neutral": [
        "Ngày bình thường, có thể tiến hành.",
        "Ngày không đặc biệt tốt hay xấu.",
        "Ngày trung bình, cẩn thận là được.",
    ],
    "bad": [
        "Ngày không thuận lợi, nên tránh.",
        "Ngày có trở ngại, cân nhắc hoãn lại.",
        "Ngày xấu cho hoạt động này.",
    ],
    "terrible": [
        "Ngày đại kỵ, tuyệt đối tránh.",
        "Ngày rất xấu, không nên tiến hành.",
        "Ngày có nhiều xung khắc, dời lại.",
    ],
};

const ACTIVITY_ADVICES = {
    "wedding": [
        "Cưới hỏi nên chọn ngày Thành, Khai, Định để hôn nhân bền vững.",
        "Tránh ngày Xung with tuổi cô dâu chú rể.",
        "Ngày có Hỷ Thần, Thiên Hỷ càng tốt.",
    ],
    "business": [
        "Khai trương nên chọn ngày Khai, Thành, Mãn để sinh ý hanh thông.",
        "Tránh ngày Phá, Bế để không bị thua lỗ.",
        "Ngày có Tài tinh lâm càng tốt cho kinh doanh.",
    ],
    "moving": [
        "Dọn nhà nên chọn ngày Trừ, Thành, Khai để gia đình yên ổn.",
        "Tránh ngày Xung with trụ Năm sinh của gia chủ.",
        "Ngày có Thiên Ân, Thiên Xá càng tốt.",
    ],
    "travel": [
        "Xuất hành nên chọn ngày Khai, Trừ, Định để thuận buồm xuôi gió.",
        "Tránh ngày Phá, Nguy, Bế để tránh tai nạn.",
        "Ngày có Dịch Mã, Thiên Mã càng thuận lợi.",
    ],
    "contract": [
        "Ký hợp đồng nên chọn ngày Thành, Định, Chấp để hợp tác bền lâu.",
        "Tránh ngày Phá, Bế để không bị bội ước.",
        "Ngày Quan tinh lâm thì hợp đồng có tính pháp lý cao.",
    ],
    "study": [
        "Học tập thi cử nên chọn ngày Khai, Thành, Mãn để kết quả tốt.",
        "Tránh ngày Phá, Bế để không bị trượt.",
        "Ngày có Văn Xương, Học Đường càng thuận lợi.",
    ],
    "construction": [
        "Động thổ xây dựng nên chọn ngày Thành, Trừ, Định, Khai.",
        "Tránh ngày Phá, Nguy, Bế and ngày Tam Sát.",
        "Ngày không xung khắc with tuổi gia chủ.",
    ],
};

module.exports = {
    ACTIVITY_NAMES,
    GOOD_SHENS_FOR_ACTIVITY,
    BAD_SHENS_FOR_ACTIVITY,
    JIANCHU_GOOD,
    JIANCHU_BAD,
    DAY_QUALITY_DESCRIPTIONS,
    ACTIVITY_ADVICES
};
