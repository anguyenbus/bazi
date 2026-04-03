/**
 * Tử Bình Chân Thuyên Data
 */

const OPENINGS = {
    "nam": {
        "Quan": ["Về phương diện tước lộc và sự nghiệp của nam mệnh này, Chính Quan cách", "Xét về khả năng lãnh đạo và uy tín xã hội của phái mạnh, Chính Quan"],
        "Tài": ["Về phương diện kinh bang tế thế và tài lộc của nam mệnh này, Tài cách", "Xét về năng lực quản trị tiền bạc và bản lĩnh thương trường của nam giới,"],
        "Sát": ["Về phương diện quyền uy và khả năng vượt nghịch cảnh của nam mệnh, Thất Sát", "Nhìn từ góc độ can trường và sức bật trong môi trường khắc nghiệt của phái mạnh,"],
        "Ấn": ["Về phương diện học vấn và sự nâng đỡ từ quý nhân của nam mệnh, Ấn thụ", "Xét về trí tuệ và nền tảng đạo đức của nam giới này, Ấn cách"],
        "Thực": ["Về phương diện phúc lộc và năng khiếu sáng tạo của nam mệnh, Thực thần", "Nhìn từ góc độ an nhàn và khả năng tận hưởng cuộc sống của phái mạnh,"],
        "Thương": ["Về phương diện tài hoa và khả năng xoay sở của nam mệnh, Thương quan", "Xét về sự thông tuệ và cá tính độc lập của nam giới này,"],
        "Nhẫn": ["Về phương diện sức mạnh cơ bắp và ý chí quyết liệt của nam mệnh, Dương Nhẫn", "Nhìn từ góc độ bản lĩnh can trường và đôi khi là sự cực đoan của phái mạnh,"],
        "Lộc": ["Về phương diện tự lực cánh sinh và khả năng lập thân của nam mệnh, Kiến Lộc", "Xét về nền tảng gia đình và sức bật cá nhân của nam giới này,"],
    },
    "nu": {
        "Quan": ["Về phương diện chính trực and sự tôn nghiêm của nữ mệnh này, Chính Quan cách", "Xét về khả năng quán xuyến và vị thế trong gia đình của phái đẹp, Chính Quan"],
        "Tài": ["Về phương diện quản lý tài chính và sự tháo vát của nữ mệnh này, Tài cách", "Nhìn từ góc độ đảm đang và khả năng gây dựng cơ đồ của người phụ nữ,"],
        "Sát": ["Về phương diện nội lực mạnh mẽ và sự kiên cường của nữ mệnh, Thất Sát", "Xét về khả năng đối mặt với áp lực và bảo vệ gia đình của phái đẹp,"],
        "Ấn": ["Về phương diện tri thức và lòng nhân hậu của nữ mệnh này, Ấn thụ", "Nhìn từ góc độ văn nhã và sự bảo bọc từ trưởng bối của phái đẹp,"],
        "Thực": ["Về phương diện phúc đức và sự khéo léo của nữ mệnh này, Thực thần", "Xét về sự tinh tế và khả năng chăm sóc tổ ấm của người phụ nữ,"],
        "Thương": ["Về phương diện sắc sảo và tài hoa vượt trội của nữ mệnh, Thương quan", "Nhìn từ góc độ độc lập và cá tính mạnh mẽ của phái đẹp,"],
        "Nhẫn": ["Về phương diện ý chí sắt đá và sự can trường của nữ mệnh, Dương Nhẫn", "Xét về bản lĩnh đương đầu với sóng gió và sự quyết liệt của phái đẹp,"],
        "Lộc": ["Về phương diện tự lập và khả năng vươn lên của nữ mệnh này, Kiến Lộc", "Nhìn từ góc độ nghị lực và sự bền bỉ của người phụ nữ,"],
    }
};

const INTEGRITY_TEMPLATES = {
    "SUCCESS": [
        "là minh chứng cho một cấu trúc hoàn hảo, nơi các yếu tố phò trợ đắc lực giúp bản mệnh tỏa sáng.",
        "biểu hiện sự hanh thông tuyệt vời, hứa hẹn một cuộc đời rực rỡ và thành công vang dội.",
        "tạo nên một thế trận vững chắc, giúp mệnh chủ dễ dàng đạt được tâm nguyện và vị thế cao.",
    ],
    "FAILURE": [
        "đang gặp phải sự nhiễu loạn từ các yếu tố xung khắc, khiến tài năng khó lòng bộc phát hoàn toàn.",
        "cho thấy những rào cản vô hình đang ngăn trở bước tiến, cần sự kiên nhẫn và chiến lược đúng đắn.",
        "hiện lên như một bài thử thách lớn, nơi mệnh chủ cần học cách chuyển bại thành thắng.",
    ],
    "RESCUE": [
        "tuy có khiếm khuyết nhưng may mắn gặp được cứu tinh, hóa giải hiểm nguy thành cơ hội vàng.",
        "là tượng 'Bại nhi hữu cứu', minh chứng cho sức mạnh của sự trợ giúp kịp thời từ quý nhân.",
        "cho thấy dù gặp nghịch cảnh nhưng bản mệnh luôn có lối thoát và khả năng phục hồi thần kỳ.",
    ]
};

const GENDER_NUANCE = {
    "nam": {
        "SUCCESS": "Bản lĩnh đàn ông được khẳng định, sự nghiệp thăng tiến không ngừng, uy tín lẫy lừng.",
        "FAILURE": "Áp lực sự nghiệp và danh tiếng đè nặng, cần tránh các quyết định vội vàng mang tính sĩ diện.",
        "RESCUE": "Dù gặp sóng gió thương trường nhưng luôn có người nâng đỡ, biến nguy thành an.",
    },
    "nu": {
        "SUCCESS": "Người phụ nữ có vị thê tương đương nam giới, độc lập tài chính và gia đạo vinh hiển.",
        "FAILURE": "Cần chú ý sự cân bằng giữa cái tôi cá nhân và hạnh phúc gia đình để tránh cô độc.",
        "RESCUE": "Sự khéo léo và nhân hậu chính là chìa khóa giúp vượt qua những trắc trở trong cuộc sống.",
    }
};

const MINISTER_DB = {
    "Quan": ["Cần Tài tinh phò tá để Quan vượng.", "Cần Ấn thụ hộ vệ để Quan an."],
    "Sát": ["Cần Thực thần chế phục để Sát biến thành quyền.", "Cần Ấn thụ hóa giải để Thân vững."],
    "Tài": ["Cần Thực Thương khai thông nguồn mạch.", "Cần Quan tinh bảo vệ tài lộc."],
    "Ấn": ["Cần Quan Sát tương sinh để Ấn vượng.", "Cần Kiếp tài chế Tài bảo vệ Ấn."],
    "Thực": ["Cần Tài tinh để bộc phát lộc lá.", "Cần Sát tinh để có cơ hội thể hiện bản lĩnh."],
    "Thương": ["Cần Ấn thụ để kìm hãm sự ngông cuồng.", "Cần Tài tinh để chuyển hóa tài năng."],
    "Nhẫn": ["Cần Sát tinh mạnh mẽ để chế ngự hung khí.", "Cần Quan tinh để đưa sức mạnh vào khuôn khổ."],
    "Lộc": ["Cần Tài Quan phối hợp để lập thân.", "Cần Thực Thương tiết tú để bộc lộ tài năng."]
};

module.exports = {
    OPENINGS,
    INTEGRITY_TEMPLATES,
    GENDER_NUANCE,
    MINISTER_DB
};
