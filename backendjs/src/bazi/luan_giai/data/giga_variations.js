/**
 * Giga Variations - Bộ biến thể khổng lồ
 */

const GENERAL_TEMPLATES = [
    "Bạn thuộc mệnh {element}, {adj}, có {trait}.",
    "Với mệnh {element}, bạn {adj} and sở hữu {trait}.",
    "Thuộc {element}, tính cách {adj}, điểm mạnh là {trait}.",
];

const ELEMENTS = ["Mộc", "Hỏa", "Thổ", "Kim", "Thủy"];

const ADJECTIVES = [
    "thông minh", "sáng tạo", "chăm chỉ", "kiên nhẫn", "trung thực",
    "nhân hậu", "quyết đoán", "lạc quan", "khiêm tốn", "tự tin",
];

const TRAITS = [
    "khả năng phân tích tốt", "óc sáng tạo cao", "tinh thần học hỏi",
    "khả năng lãnh đạo", "sức chịu đựng", "trực giác nhạy bén",
];

const CAREER_TEMPLATES2 = [
    "Sự nghiệp trong lĩnh vực {field} với vai trò {role}, {outcome}.",
    "Thành công ở ngành {field} làm {role}, {outcome}.",
];

const FIELDS2 = [
    "giáo dục", "y tế", "tài chính", "công nghệ", "truyền thông",
];

const ROLES2 = [
    "quản lý", "chuyên gia", "nhà tư vấn", "nhà nghiên cứu", "lãnh đạo",
];

const OUTCOMES = [
    "sẽ thành công lớn", "đạt được mục tiêu", "có thu nhập cao",
    "được nhiều người tôn trọng", "có sức ảnh hưởng",
];

module.exports = {
    GENERAL_TEMPLATES,
    ELEMENTS,
    ADJECTIVES,
    TRAITS,
    CAREER_TEMPLATES2,
    FIELDS2,
    ROLES2,
    OUTCOMES
};
