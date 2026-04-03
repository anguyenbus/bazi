/**
 * Mega Quan hệ trụ
 */

const PILLARS = ["Năm", "Tháng", "Ngày", "Giờ"];

const ZHI_RELATIONS = [
    "Lục Hợp", "Tam Hợp", "Bán Hợp", "Xung", "Hình", "Hại",
    "Phá", "Ám Hợp", "Củng", "Đồng Chi", "Không Vong", "Nguyên Thần"
];

const ZHI_RELATION_DESC = {
    "Lục Hợp": { "eval": "tốt", "meaning": "Quan hệ tình cảm, hợp tác bền vững." },
    "Tam Hợp": { "eval": "rất tốt", "meaning": "Được hỗ trợ từ nhiều phía." },
    "Xung": { "eval": "cẩn thận", "meaning": "Có biến động, cần đối mặt." },
    "Hình": { "eval": "khó khăn", "meaning": "Có thể gặp rắc rối pháp lý." },
    "Hại": { "eval": "hại", "meaning": "Cẩn thận người xung quanh." },
};

const GAN_RELATIONS = [
    "Ngũ Hợp", "Tranh Hợp", "Đố Hợp", "Xung Thiên", "Khắc",
    "Sinh", "Bị Sinh", "Đồng Nguyên", "Tiết Khí", "Can Thấu"
];

const QUAN_HE_TEMPLATES = {
    "zhi_relation": [
        "Trụ {pillar1} ({zhi1}) and Trụ {pillar2} ({zhi2}) có quan hệ **{relation}**: {desc}. {impact}.",
        "{relation} giữa {pillar1} với {pillar2}: {eval}. Điều này cho thấy {meaning}.",
    ],
    "gan_relation": [
        "Thiên can {gan1} ({pillar1}) and {gan2} ({pillar2}) có quan hệ **{relation}**: {desc}.",
    ],
};

const IMPACTS = {
    "tốt": ["mang lại thuận lợi and may mắn", "tạo điều kiện phát triển"],
    "xấu": ["gây khó khăn and trở ngại", "cần cẩn trọng trong hành động"],
    "trung bình": ["không có tác động đặc biệt", "cần nỗ lực thêm"],
};

const SPECIAL_PATTERNS = {
    "Phục Ngâm": "trụ trùng, lặp lại",
    "Phản Ngâm": "trụ xung, đối lập",
    "Thiên Khắc Địa Xung": "can khắc chi xung",
};

module.exports = {
    PILLARS,
    ZHI_RELATIONS,
    ZHI_RELATION_DESC,
    GAN_RELATIONS,
    QUAN_HE_TEMPLATES,
    IMPACTS,
    SPECIAL_PATTERNS
};
