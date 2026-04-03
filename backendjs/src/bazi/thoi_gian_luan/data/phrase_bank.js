/**
 * Ngân Hàng Cụm Từ - Phrase Bank cho Thoi Gian Luan
 */

const OPENINGS = {
    "positive": [
        "Năm nay mang đến", "Đây là thời điểm thuận lợi để", "Vận may đang đến với",
        "Cơ hội rộng mở cho", "Thiên thời đã hợp để", "Năng lượng tích cực hỗ trợ",
    ],
    "neutral": [
        "Năm nay cần", "Đây là lúc để", "Thời điểm này đòi hỏi", "Cần lưu ý về",
    ],
    "warning": [
        "Cảnh báo quan trọng:", "Đặc biệt lưu ý:", "Không nên", "Tránh việc",
    ],
};

const CAREER_ADVICE = {
    "excellent": [
        "Đây là năm vàng cho sự nghiệp, hãy mạnh dạn nhận thêm trách nhiệm.",
        "Cơ hội thăng tiến rõ ràng, thể hiện năng lực tốt nhất của bạn.",
    ],
    "good": [
        "Công việc ổn định, tập trung hoàn thành nhiệm vụ được giao.",
        "Mối quan hệ với đồng nghiệp tốt, hợp tác hiệu quả.",
    ],
};

const FINANCE_ADVICE = {
    "excellent": [
        "Tài lộc dồi dào, thu nhập vượt kỳ vọng.",
        "Đầu tư sinh lời, cân nhắc mở rộng danh mục.",
    ],
    "good": [
        "Thu nhập ổn định, duy trì chi tiêu hợp lý.",
        "Tiết kiệm được một khoản, có quỹ dự phòng.",
    ],
};

const THAP_THAN_DESCRIPTIONS = {
    "Tỷ Kiên": {
        "essence": [
            "Tỷ Kiên là năng lượng ngang hàng, đại diện cho anh em, bạn bè, đồng nghiệp cùng cấp.",
        ],
        "positive": [
            "Được bạn bè hỗ trợ khi cần thiết nhất.",
        ],
        "negative": [
            "Dễ bị chia sẻ thành quả, lợi nhuận.",
        ],
    },
};

module.exports = {
    OPENINGS,
    CAREER_ADVICE,
    FINANCE_ADVICE,
    THAP_THAN_DESCRIPTIONS
};
