/**
 * Hình Hại Phá Data
 */

const OPENINGS = {
    "nam": [
        "Về phương diện đối thế và bản lĩnh nam mệnh, các mối quan hệ",
        "Xét về sự nghiệp và vị thế xã hội của nam giới này, sóng gió",
        "Đối với nam mệnh, sự va chạm giữa các chi chủ về",
        "Nhìn từ góc độ ngoại giao và tranh đấu của phái mạnh, lá số",
        "Khối năng lượng xung đột trong bản mệnh nam này biểu hiện",
        "Về mặt bản lĩnh đối nhân xử thế của nam mệnh này,",
    ],
    "nu": [
        "Về phương diện cảm xúc và gia đạo nữ mệnh, các mối quan hệ",
        "Xét về sự nhạy cảm và nội tâm của nữ giới này, những tổn thương",
        "Đối với nữ mệnh, sự giao thoa giữa các chi mang tính tiêu cực chủ về",
        "Nhìn từ góc độ hạnh phúc lứa đôi và nội cung phái đẹp, lá số",
        "Năng lượng nhiễu loạn trong bản mệnh nữ này biểu hiện qua",
        "Về mặt tâm tính và sự bao dung của nữ mệnh này,",
    ]
};

const CONFLICT_TEMPLATES = {
    "HÌNH": {
        "Tý-Mão": [
            "Vô lệ chi hình gây ra sự thiếu tôn trọng trong giao tiếp xã hội.",
            "Xung đột giữa nước và cây khiến đạo đức bị thử thách mạnh mẽ.",
            "Tương tác Tý-Mão làm suy giảm uy tín do những hành xử thiếu tinh tế.",
        ],
        "Dần-Tỵ-Thân": [
            "Cậy thế chi hình khiến bản mệnh dễ chủ quan, dẫn đến sai lầm pháp lý.",
            "Ma trận xung đột giữa ba thế lực mạnh làm nội tâm luôn căng thẳng.",
            "Sự ngạo mạn từ sức mạnh tiềm ẩn dễ gây ra tai nạn bất ngờ.",
        ],
        "Sửu-Mùi-Tuất": [
            "Vô ơn chi hình làm lòng tốt dễ bị lợi dụng hoặc bị phản bội.",
            "Sự xói mòn niềm tin giữa người thân và bạn bè do đất khố bị xung phá.",
            "Khí Thổ quá vượng gây bế tắc trong việc chia sẻ và thấu hiểu.",
        ],
        "Tự Hình": [
            "Tự hình khiến tâm trí hay luẩn quẩn trong những suy nghĩ tiêu cực.",
            "Bản mệnh tự gây áp lực cho chính mình, dễ dẫn đến trầm uất.",
            "Những quyết định sai lầm do chính mình tạo ra gây hậu quả lâu dài.",
        ]
    },
    "HẠI": {
        "Tý-未": [
            "Thổ khắc Thủy làm trí tuệ bị mờ mịt bởi những hoài nghi nhỏ nhen.",
            "Đề phòng sự ghen ghét từ những người tưởng chừng thân cận.",
        ],
        "Sửu-Ngọ": [
            "Sức nóng của hỏa thiêu đốt Thổ khố, gây ra những cơn giận dữ bất thình lình.",
            "Mâu thuẫn bộc phát do sự thiếu kiềm chế trong lời nói.",
        ],
        "Dần-Tỵ": [
            "Sự phản bội ngầm từ những mắt xích quan trọng trong sự nghiệp.",
            "Mối quan hệ bị rạn nứt do sự cạnh tranh vị thế quá mức.",
        ],
        "Mão-Thìn": [
            "Bất hòa gia tộc do những hiểu lầm về đất đai hoặc tiền bạc.",
            "Nền móng tình cảm bị xuyên thấu bởi những tranh chấp không đáng có.",
        ],
        "Thân-Hợi": [
            "Kim sinh Thủy tràn trề gây cảm giác bất an và lo âu không lối thoát.",
            "Tinh thần dễ bị suy sụp do áp lực vô hình từ bên ngoài.",
        ],
        "Dậu-Tuất": [
            "Dễ mang tiếng oan, bị vu khống hoặc gặp thị phi từ trên trời rơi xuống.",
            "Sự hiểu lầm sâu sắc dẫn đến việc chấm dứt quan hệ đột ngột.",
        ]
    },
    "PHÁ": {
        "Tý-Dậu": ["Mối quan hệ giữa bản thân và đồng nghiệp dễ bị chia rẽ, phá hoại."],
        "Ngọ-Mão": ["Mâu thuẫn bộc phát giữa người thân trong gia đình, khó tìm được tiếng nói chung."],
        "Thân-Tỵ": ["Sự nghiệp gặp cản trở từ những đối thủ cạnh tranh không lành mạnh."],
        "Dần-Hợi": ["Cảm giác bị phản bội từ những người tin tưởng nhất, gây hụt hẫng lớn."],
        "Thìn-Sửu": ["Tranh chấp liên quan đến tài sản, đất đai giữa anh em họ hàng."],
        "Tuất-Mùi": ["Sự rạn nứt trong các mối quan hệ lâu năm do bất đồng quan điểm."],
    }
};

const GENDER_IMPACTS = {
    "nam": {
        "HÌNH": "Ảnh hưởng mạnh đến uy tín sự nghiệp và khả năng lãnh đạo, dễ vướng vòng lao lý.",
        "HẠI": "Tiểu nhân quấy phá đường quan lộ, bạn bè phản trắc trong kinh doanh.",
        "PHÁ": "Dòng vốn bị đứt gãy, các hợp đồng đầu tư dễ bị hủy bỏ đột ngột.",
    },
    "nu": {
        "HÌNH": "Gây áp lực lớn lên tâm lý, dễ buồn phiền vì chồng con và người thân trong nhà.",
        "HẠI": "Thị phi chốn khuê phòng, tình cảm chị em bạn dì dễ nảy sinh đố kỵ.",
        "PHÁ": "Hạnh phúc gia đình bị lung lay do những tác động từ bên ngoài xã hội.",
    }
};

const GPS_TEMPLATES = {
    0: "Gây nhiễu loạn căn cơ tổ nghiệp, trưởng bối dễ gặp chuyện phiền lòng.",
    1: "Bất ổn trong môi trường làm việc, anh em đồng nghiệp thiếu sự gắn kết.",
    2: "Nội cung bất ổn, bản thân và phối ngẫu dễ xảy ra xung đột trực diện.",
    3: "Thất thoát thành quả hậu vận, con cái hoặc cấp dưới khó điều khiển.",
};

module.exports = {
    OPENINGS,
    CONFLICT_TEMPLATES,
    GENDER_IMPACTS,
    GPS_TEMPLATES
};
