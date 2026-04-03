/**
 * Combinations Generator - Templates for unique outputs
 */

const INTRO_TEMPLATES = [
    "Sinh ngày {day_master} ({element}), bạn là người {trait}.",
    "Với Nhật chủ {day_master}, bản mệnh mang đặc tính của {element}: {trait}.",
    "Mệnh {day_master} ({element}) cho thấy bạn có tính cách {trait}.",
    "{day_master} thuộc hành {element}, đặc trưng bởi sự {trait}.",
    "Bạn sinh ngày {day_master} - hành {element}. Điều này thể hiện {trait}.",
    "Nhật chủ {day_master} ({element}) biểu hiện qua {trait}.",
    "Mang bản mệnh {day_master}, bạn được trời ban cho {trait}.",
    "Hành {element} của {day_master} mang lại cho bạn {trait}.",
    "Là người {day_master} ({element}), bạn có thiên hướng {trait}.",
    "Với {day_master} làm Nhật chủ, bạn bẩm sinh đã có {trait}.",
];

const STRENGTH_TEMPLATES = {
    'strong': [
        "Thân vượng, sinh lực dồi dào, có thể gánh vác nhiều trách nhiệm lớn.",
        "Mệnh cường, ý chí kiên định, không dễ bị khuất phục.",
        "Thân mạnh mẽ, có sức chịu đựng và bản lĩnh vượt trội.",
        "Khí lực sung mãn, tinh thần lạc quan, ít bị bệnh tật.",
        "Bản mệnh vững chãi như cây đại thụ, có thể che chở người khác.",
        "Sinh lực tốt, năng lượng dồi dào, phù hợp with công việc áp lực cao.",
        "Thân vượng nên có khả năng tự lực, không cần dựa dẫm.",
        "Mệnh cường thường có tố chất lãnh đạo tự nhiên.",
    ],
    'weak': [
        "Thân nhược, cần sự hỗ trợ từ người thân and quý nhân.",
        "Mệnh yếu nhưng nhờ có phúc ấm sẽ được che chở.",
        "Thân không quá mạnh, nên biết dựa vào thế lực bên ngoài.",
        "Khí lực cần được bổ sung, chú ý sức khỏe and nghỉ ngơi.",
        "Bản mệnh cần sự nương tựa, phù hợp with môi trường ổn định.",
        "Sinh lực cần điều hòa, tránh làm việc quá sức.",
        "Thân nhược nên biết cách chọn thời cơ hành động.",
        "Mệnh yếu nhưng nếu biết điều hòa sẽ có hậu vận tốt.",
    ],
    'balanced': [
        "Thân trung hòa, cân bằng giữa cương and nhu.",
        "Âm dương điều hòa, tính cách ôn hòa, dễ thích nghi.",
        "Mệnh cân bằng, cuộc đời ổn định, ít biến động lớn.",
        "Khí lực vừa phải, không thái quá, biết kiểm soát.",
        "Bản mệnh hòa hoãn, phù hợp with nhiều môi trường.",
        "Sinh lực ổn định, sức khỏe bình thường nếu biết giữ gìn.",
        "Thân trung hòa là nền tảng tốt để phát triển.",
        "Mệnh cân bằng có lợi thế thích nghi with hoàn cảnh.",
    ],
};

const PATTERN_TEMPLATES = [
    "Cách cục **{pattern}** cho thấy bạn {description}.",
    "Với cách {pattern}, cuộc đời bạn mang đặc điểm {description}.",
    "Lá số thành cách **{pattern}**, biểu hiện qua {description}.",
    "{pattern} cách chủ về {description}.",
    "Mệnh lập cách {pattern}, có nghĩa là {description}.",
    "Cách cục {pattern} mang lại {description}.",
    "Theo cách {pattern}, bạn có xu hướng {description}.",
    "Thành cách {pattern} cho biết {description}.",
];

const CAREER_TEMPLATES = [
    "Về sự nghiệp, bạn phù hợp with {field}.",
    "Nghề nghiệp thích hợp: {field}.",
    "Trong công việc, bạn nên hướng đến {field}.",
    "Lĩnh vực phù hợp nhất: {field}.",
    "Sự nghiệp sẽ phát triển tốt trong ngành {field}.",
    "Bạn có tố chất cho {field}.",
    "Hãy cân nhắc theo đuổi {field}.",
    "Tiềm năng sự nghiệp nằm ở {field}.",
];

const RELATIONSHIP_TEMPLATES = {
    'male': [
        "Là nam giới, trong tình cảm bạn {trait}.",
        "Người đàn ông {day_master} trong hôn nhân thường {trait}.",
        "Về tình cảm, bạn có xu hướng {trait}.",
        "Nam mệnh {day_master} trong quan hệ thường {trait}.",
    ],
    'female': [
        "Là nữ giới, trong tình cảm bạn {trait}.",
        "Người phụ nữ {day_master} trong hôn nhân thường {trait}.",
        "Về tình cảm, bạn có xu hướng {trait}.",
        "Nữ mệnh {day_master} trong quan hệ thường {trait}.",
    ],
};

const FORTUNE_TEMPLATES = {
    'tien_van': [
        "**Tiền vận (trước 30 tuổi):** {description}",
        "Giai đoạn thanh xuân: {description}",
        "Từ 0-30 tuổi: {description}",
    ],
    'trung_van': [
        "**Trung vận (30-50 tuổi):** {description}",
        "Giai đoạn trung niên: {description}",
        "Từ 30-50 tuổi: {description}",
    ],
    'hau_van': [
        "**Hậu vận (sau 50 tuổi):** {description}",
        "Giai đoạn về già: {description}",
        "Từ 50 tuổi trở đi: {description}",
    ],
};

const ADVICE_TEMPLATES = [
    "**Lời khuyên:** {advice}",
    "Hãy nhớ rằng {advice}",
    "Điều quan trọng là {advice}",
    "Nên lưu ý: {advice}",
    "**Gợi ý:** {advice}",
    "Một lời nhắc: {advice}",
    "Bạn cần biết rằng {advice}",
    "Đừng quên: {advice}",
];

module.exports = {
    INTRO_TEMPLATES,
    STRENGTH_TEMPLATES,
    PATTERN_TEMPLATES,
    CAREER_TEMPLATES,
    RELATIONSHIP_TEMPLATES,
    FORTUNE_TEMPLATES,
    ADVICE_TEMPLATES
};
