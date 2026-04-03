/**
 * Bệnh Dược Data
 */

const OPENINGS = {
    "nam": [
        "Về phương diện thể trạng nam giới, bản mệnh mang", "Xét về khí lực và dương cương, hệ thống tạng phủ",
        "Đối với nam mệnh, sự vận hành của khí huyết biểu hiện", "Nhìn từ góc độ sinh lý phái mạnh, lá số này tiềm ẩn",
        "Khối năng lượng nội tại của nam giới này chủ về", "Về mặt hộ thân và sức bền của nam mệnh,",
    ],
    "nu": [
        "Về phương diện thể trạng nữ giới, hệ thống nội tiết", "Xét về khí huyết và âm nhu, bản mệnh nữ này mang",
        "Đối với nữ mệnh, sự điều hòa tạng phủ và nhan sắc biểu hiện", "Nhìn từ góc độ sinh lý phái đẹp, lá số này tiềm ẩn",
        "Năng lượng nuôi dưỡng của nữ giới này chủ về", "Về mặt huyết phận và sự tươi trẻ của nữ mệnh,",
    ]
};

const SYNDROMES = {
    "Mộc_Thổ": [
        "Can khí quá vượng lấn át Tỳ vị, gây ra các chứng đầy hơi, tiêu hóa kém.",
        "Sự uất kết của Mộc khiến Thổ bị thương tổn, cần chú ý dạ dày và lo âu.",
        "Thủ phạm là Can mộc quá mạnh gây áp lực lên hệ thống hấp thụ dinh dưỡng.",
        "Mộc khắc Thổ thái quá khiến trung tiêu bất ổn, dễ bị đau thượng vị.",
    ],
    "Hỏa_Kim": [
        "Tâm hỏa thiêu đốt Phế kim, dễ gây ho khan, nóng trong và các bệnh về phổi.",
        "Sức nóng thái quá làm suy yếu hệ hô hấp, cần thanh nhiệt giải độc gấp.",
        "Xung đột giữa nhiệt năng và kim khí khiến da dẻ dễ gặp các vấn đề viêm nhiễm.",
        "Hỏa vượng Kim nuy, tạng phế bị hỏa nung nấu gây khô họng, khát nước.",
    ],
    "Thổ_Thủy": [
        "Thổ trọng Thủy kiệt, hệ thống bài tiết bị tắc nghẽn, dễ gặp sỏi hoặc phù thũng.",
        "Đất khô vùi lấp nước mạch, tạng thận chịu áp lực lớn từ sự tích tụ độc tố.",
        "Sự trì trệ của hành Thổ làm suy yếu chức năng lọc máu của thận.",
        "Thổ khắc Thủy khiến thận khí không thông, dễ đau lưng mỏi gối.",
    ],
    "Kim_Mộc": [
        "Kim mộc tương chiến, ảnh hưởng trực tiếp đến gân cốt và hệ thần kinh.",
        "Khí kim sắc bén làm tổn thương mầm sống của mộc, đề phòng tê bì chân tay.",
        "Xung đột can phế khiến tính tình dễ gắt gỏng và đau nhức các khớp.",
        "Kim vượng Mộc suy, gân cơ co rút, dễ bị chuột rút hoặc đau thần kinh.",
    ],
    "Thủy_Hỏa": [
        "Thủy hỏa bất tương dung, hỏa bị nước dập tắt làm dương khí suy giảm.",
        "Tâm hỏa bị hàn thủy lấn át, dễ gặp các vấn đề về tim mạch và sợ lạnh.",
        "Sự mất cân bằng giữa nước và lửa khiến tinh thần hay hồi hộp, bất an.",
        "Thủy khắc Hỏa quá độ, dương hư khí trệ, sắc mặt thường nhợt nhạt.",
    ]
};

const GENDER_HEALTH = {
    "nam": {
        "Mộc": "Đề phòng các bệnh về gan do bia rượu hoặc nóng nảy, gân cốt dễ bị chấn thương.",
        "Hỏa": "Chú ý huyết áp, tim mạch và các bệnh liên quan đến cường độ làm việc cao.",
        "Thổ": "Cảnh báo về dạ dày, tiêu hóa và các chứng liên quan đến áp lực công việc.",
        "Kim": "Phổi và đại trực tràng cần được kiểm tra định kỳ, tránh hút thuốc.",
        "Thủy": "Trọng điểm là thận và tuyến tiền liệt, cần giữ gìn tinh lực.",
    },
    "nu": {
        "Mộc": "Chú ý đến nội tiết tố, gân duỗi và sự điều hòa kinh nguyệt.",
        "Hỏa": "Đề phòng chứng nóng trong, ảnh hưởng đến làn da và giấc ngủ.",
        "Thổ": "Hệ thống tiêu hóa dễ bị ảnh hưởng bởi tâm trạng, đề phòng tỳ vị hư hàn.",
        "Kim": "Chú ý đến hệ hô hấp, da và các vấn đề về tuyến giáp.",
        "Thủy": "Trọng điểm là tử cung, buồng trứng và hệ thống khí huyết phụ khoa.",
    }
};

const REMEDIES = {
    "Mộc": ["Tăng cường rau xanh", "Ngủ sớm trước 11h", "Dùng tinh dầu oải hương", "Tập yoga kéo giãn"],
    "Hỏa": ["Uống trà thanh nhiệt", "Hạn chế đồ cay nóng", "Thiền định mỗi tối", "Bổ sung Vitamin C"],
    "Thổ": ["Ăn uống đúng giờ", "Nhai kỹ sống lâu", "Sử dụng gừng ấm", "Tránh suy nghĩ quá nhiều"],
    "Kim": ["Tập hít thở sâu", "Uống nhiều nước lọc", "Bổ sung yến sào/phổi heo", "Tránh môi trường bụi bặm"],
    "Thủy": ["Giữ ấm vùng lưng", "Hạn chế ăn mặn", "Uống nước đậu đen", "Nghỉ ngơi điều độ"]
};

module.exports = {
    OPENINGS,
    SYNDROMES,
    GENDER_HEALTH,
    REMEDIES
};
