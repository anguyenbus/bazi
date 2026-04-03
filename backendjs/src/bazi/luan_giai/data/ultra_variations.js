/**
 * Ultra Variations - Tập hợp khổng lồ các biến thể bổ sung
 */

const PERSONALITY_BASE = [
    "Bạn có tính {trait1} kết hợp với {trait2}, {trait3}.",
    "Tính cách nổi bật: {trait1}, {trait2} and {trait3}.",
    "Bạn là người {trait1}, {trait2}, luôn {trait3}.",
];

const TRAITS = [
    "thông minh", "sáng tạo", "chăm chỉ", "kiên nhẫn", "trung thực",
    "nhân hậu", "quyết đoán", "lạc quan", "khiêm tốn", "tự tin",
    "linh hoạt", "ổn định", "sâu sắc", "nhiệt tình", "cẩn thận",
];

const CAREER_BASE = [
    "Sự nghiệp tốt nhất trong lĩnh vực {field} với vai trò {role}.",
    "Phù hợp làm {role} trong ngành {field}.",
    "Thành công trong {field} với vai trò {role}.",
];

const FIELDS = [
    "giáo dục", "y tế", "tài chính", "công nghệ", "truyền thông",
    "du lịch", "thời trang", "xây dựng", "vận tải", "nông nghiệp",
];

const ROLES = [
    "quản lý", "chuyên gia", "tư vấn", "nhà nghiên cứu", "lãnh đạo",
    "nhà đầu tư", "doanh nhân", "nghệ sĩ", "kỹ sư", "bác sĩ",
];

const FORTUNE_BASE = [
    "Giai đoạn {phase} mang đến {fortune}.",
    "Trong {phase}, bạn sẽ {fortune}.",
    "Vận trình {phase}: {fortune}.",
];

const PHASES = [
    "tiền vận", "trung vận", "hậu vận", "tuổi trẻ", "tuổi trung niên",
];

const FORTUNE_EVENTS = [
    "may mắn and thành công", "thử thách and cơ hội", "ổn định and bình yên",
    "tài lộc dồi dào", "sự nghiệp thăng tiến", "tình cảm thuận lợi",
];

module.exports = {
    PERSONALITY_BASE,
    TRAITS,
    CAREER_BASE,
    FIELDS,
    ROLES,
    FORTUNE_BASE,
    PHASES,
    FORTUNE_EVENTS
};
