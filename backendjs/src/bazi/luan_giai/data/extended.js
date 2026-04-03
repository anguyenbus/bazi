/**
 * Dữ liệu mở rộng - Strength, Elements, Deities
 */

const STRENGTH_VARIATIONS = {
    'cực_vượng': [
        "Thân cực vượng, sinh lực dồi dào, có thể gánh vác nhiều trách nhiệm lớn.",
        "Mệnh cực mạnh, khí chất phi thường, có tư chất lãnh đạo bẩm sinh.",
        "Sinh lực sung mãn như mặt trời giữa trưa, năng lượng tỏa ra khắp nơi.",
    ],
    'vượng': [
        "Thân vượng, sinh lực tốt, có khả năng tự lập and không phụ thuộc.",
        "Mệnh vượng, ý chí kiên định, khó bị lung lay bởi hoàn cảnh.",
        "Sinh lực dồi dào, sức khỏe tốt, tinh thần lạc quan.",
    ],
    'trung_hòa': [
        "Thân trung hòa, cân bằng giữa sinh phù and khắc tiết, cuộc đời ổn định.",
        "Âm dương điều hòa, tính cách ôn hòa, dễ thích nghi with hoàn cảnh.",
        "Mệnh cân bằng, không thái quá, cuộc đời bình an.",
    ],
    'nhược': [
        "Thân nhược, cần sự hỗ trợ từ người thân and quý nhân.",
        "Mệnh yếu nhưng nhờ có phúc ấm sẽ được che chở.",
        "Sinh lực cần được bổ sung, chú ý sức khỏe and nghỉ ngơi.",
    ],
    'cực_nhược': [
        "Thân cực nhược, cần dựa vào ngoại lực, quý nhân là yếu tố quyết định.",
        "Sức khỏe yếu, tránh các công việc nặng nhọc, stress cao.",
        "Nên thuận theo thời thế, không nên đối đầu trực tiếp.",
    ],
};

const ELEMENT_DESCRIPTIONS = {
    'Mộc': {
        'general': [
            "Mộc chủ về sự sinh trưởng, phát triển and mở rộng.",
            "Năng lượng Mộc mang tính sáng tạo, đổi mới.",
        ],
        'career': [
            "Mộc hợp with ngành giáo dục, y tế, nông nghiệp.",
            "Ngành thời trang, thiết kế, sáng tạo.",
        ],
        'health': [
            "Mộc chủ về gan, mật, gân cốt, mắt.",
            "Cần chú ý các vấn đề về gan khi Mộc thiếu hoặc thừa.",
        ],
    },
    'Hỏa': {
        'general': [
            "Hỏa chủ về sự nhiệt tình, năng lượng and sức sống.",
            "Năng lượng Hỏa mang tính bùng nổ, lan tỏa.",
        ],
        'career': [
            "Hỏa hợp with ngành truyền thông, giải trí, marketing.",
            "Ngành biểu diễn, nghệ thuật, showbiz.",
        ],
        'health': [
            "Hỏa chủ về tim, mạch máu, ruột non.",
            "Cần chú ý các vấn đề về tim mạch khi Hỏa thiếu hoặc thừa.",
        ],
    },
    'Thổ': {
        'general': [
            "Thổ chủ về sự ổn định, kiên định and tích lũy.",
            "Năng lượng Thổ mang tính bền vững, chắc chắn.",
        ],
        'career': [
            "Thổ hợp with ngành bất động sản, xây dựng, kiến trúc.",
            "Ngành ẩm thực, nhà hàng, khách sạn.",
        ],
        'health': [
            "Thổ chủ về tỳ, vị, cơ bắp.",
            "Cần chú ý các vấn đề về tiêu hóa khi Thổ thiếu sau thừa.",
        ],
    },
    'Kim': {
        'general': [
            "Kim chủ về sự sắc bén, quyết đoán and chính xác.",
            "Năng lượng Kim mang tính thu liệm, ngưng tụ.",
        ],
        'career': [
            "Kim hợp with ngành tài chính, ngân hàng, kế toán.",
            "Ngành luật, công an, quân đội.",
        ],
        'health': [
            "Kim chủ về phổi, đại tràng, da.",
            "Cần chú ý các vấn đề về hô hấp khi Kim thiếu hoặc thừa.",
        ],
    },
    'Thủy': {
        'general': [
            "Thủy chủ về sự linh hoạt, thông minh and sâu sắc.",
            "Năng lượng Thủy mang tính uyển chuyển, thích nghi.",
        ],
        'career': [
            "Thủy hợp with ngành vận tải, logistics, thủy sản.",
            "Ngành du lịch, khám phá, phiêu lưu.",
        ],
        'health': [
            "Thủy chủ về thận, bàng quang, xương.",
            "Cần chú ý các vấn đề về thận khi Thủy thiếu hoặc thừa.",
        ],
    },
};

const DEITY_DESCRIPTIONS = {
    'Tỷ': {
        'general': ["Tỷ Kiên đại diện cho anh em, bạn bè cùng giới."],
        'positive': ["Được bạn bè hỗ trợ, có người đồng hành."],
        'negative': ["Có thể gặp cạnh tranh từ bạn bè, đồng nghiệp."],
    },
    'Kiếp': {
        'general': ["Kiếp Tài đại diện cho sự tranh đoạt, cạnh tranh."],
        'positive': ["Có tinh thần chiến đấu, không ngại khó."],
        'negative': ["Dễ mất tiền do đầu tư mạo hiểm."],
    },
    'Thực': {
        'general': ["Thực Thần đại diện cho phúc lộc, hưởng thụ."],
        'positive': ["Có khẩu phúc, được ăn ngon mặc đẹp."],
        'negative': ["Có thể lười biếng, chỉ thích hưởng thụ."],
    },
    'Thương': {
        'general': ["Thương Quan đại diện cho tài năng, sự nổi bật."],
        'positive': ["Thông minh lanh lợi, biện luận giỏi."],
        'negative': ["Dễ gây thị phi bằng lời nói."],
    },
    'Tài+': {
        'general': ["Chính Tài đại diện cho tài lộc chính đáng."],
        'positive': ["Làm ăn chính đáng, tài lộc ổn định."],
        'negative': ["Có thể quá tham công tiếc việc."],
    },
    'Tài-': {
        'general': ["Thiên Tài đại diện cho tài lộc bất ngờ."],
        'positive': ["May mắn trong đầu tư, kinh doanh."],
        'negative': ["Tiền đến nhanh đi cũng nhanh."],
    },
    'Quan': {
        'general': ["Chính Quan đại diện cho quyền lực, kỷ luật."],
        'positive': ["Được tôn trọng, có địa vị xã hội."],
        'negative': ["Có thể bị áp lực từ cấp trên."],
    },
    'Sát': {
        'general': ["Thất Sát đại diện cho quyền lực, thử thách."],
        'positive': ["Có bản lĩnh, ý chí kiên cường."],
        'negative': ["Cuộc đời nhiều sóng gió, thử thách."],
    },
    'Ấn': {
        'general': ["Chính Ấn đại diện cho học vấn, sự bảo bọc."],
        'positive': ["Được mẹ yêu thương, có phúc ấm."],
        'negative': ["Có thể quá phụ thuộc vào người khác."],
    },
    'Kiêu': {
        'general': ["Thiên Ấn (Kiêu) đại diện cho trí tuệ, sự khác biệt."],
        'positive': ["Thông minh, sáng tạo, có tư duy độc đáo."],
        'negative': ["Có thể cô đơn, khó được hiểu."],
    },
};

module.exports = {
    STRENGTH_VARIATIONS,
    ELEMENT_DESCRIPTIONS,
    DEITY_DESCRIPTIONS
};
