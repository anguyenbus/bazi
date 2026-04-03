/**
 * Vòng Tràng Sinh Data
 */

const OPENINGS = {
    "nam": [
        "Về phương diện cường độ sinh lực và bản lĩnh của nam mệnh, khí thế",
        "Xét về động lực hành động và khả năng làm chủ của nam giới này, vòng Tràng sinh",
        "Đối với nam mệnh, sự luân chuyển năng lượng qua các trụ biểu hiện",
        "Nhìn từ góc độ dương cương và sức bật của phái mạnh, lá số",
        "Khối năng lượng sinh khởi trong bản mệnh nam này cho thấy",
        "Về mặt ý chí và sự bền bỉ của nam mệnh này,",
    ],
    "nu": [
        "Về phương diện nội lực và sự uyển chuyển của nữ mệnh, khí thế",
        "Xét về tâm tính và khả năng nuôi dưỡng của nữ giới này, vòng Tràng sinh",
        "Đối với nữ mệnh, sự luân chuyển năng lượng qua các trụ biểu hiện",
        "Nhìn từ góc độ âm nhu và sự nhạy bén của phái đẹp, lá số",
        "Luồng sinh khí chảy trôi trong bản mệnh nữ này cho thấy",
        "Về mặt cảm xúc và sự bao dung của nữ mệnh này,",
    ]
};

const STAGES = {
    "Tràng sinh": {
        "desc": "Khởi đầu rực rỡ, đầy sức sống, ham học hỏi.",
        "nam": "Nam mệnh có Tràng sinh chủ về sự hào sảng, sớm khẳng định được vị thế và có sức hút tự nhiên.",
        "nu": "Nữ mệnh có Tràng sinh chủ về sự tươi trẻ, nội tâm trong sáng và dễ gặp được quý nhân che chở.",
    },
    "Mộc dục": {
        "desc": "Giai đoạn 'tắm gội', dễ bị cám dỗ, đào hoa vượng.",
        "nam": "Nam mệnh cần chú ý sự ổn định trong sự nghiệp, tránh để vẻ bề ngoài làm xao nhãng chí hướng.",
        "nu": "Nữ mệnh có Mộc dục thường rất lôi cuốn, nhưng cần giữ tâm thế vững vàng trước những biến biến động tình cảm.",
    },
    "Quan đới": {
        "desc": "Giai đoạn trưởng thành, bắt đầu có trách nhiệm.",
        "nam": "Nam mệnh ở giai đoạn này bắt đầu xây dựng được uy tín, sẵn sàng gánh vác trọng trách lớn.",
        "nu": "Nữ mệnh có Quan đới thể hiện sự độc lập, đảm đang và có khả năng quán xuyến việc gia đình, xã hội.",
    },
    "Lâm quan": {
        "desc": "Thời kỳ đỉnh cao của tự lập, quyết đoán.",
        "nam": "Nam mệnh đạt đến độ chín muồi về bản lĩnh, có thể tự mình gây dựng cơ nghiệp đồ sộ.",
        "nu": "Nữ mệnh rất tài năng và độc lập, tuy nhiên cần chú ý cân bằng giữa sự nghiệp và hạnh phúc cá nhân.",
    },
    "Đế vượng": {
        "desc": "Sức mạnh tối đa, uy quyền đỉnh điểm.",
        "nam": "Nam mệnh cực vượng chủ về quyền quý, nhưng cần học cách khiêm nhường để tránh 'trèo cao ngã đau'.",
        "nu": "Nữ mệnh quá vượng thường có xu hướng làm chủ, tính cách mạnh mẽ đôi khi lấn át bạn đời.",
    },
    "Suy": {
        "desc": "Bắt đầu thu mình, cẩn trọng, thích ổn định.",
        "nam": "Nam mệnh bắt đầu chuyển sang giai đoạn bảo thủ, thích sự an toàn và giữ vững thành quả.",
        "nu": "Nữ mệnh trở nên sâu sắc, hướng nội và là chỗ dựa tinh thần vững chắc cho gia đình.",
    },
    "Bệnh": {
        "desc": "Năng lượng suy giảm, tâm tư nhạy cảm.",
        "nam": "Nam mệnh cần chú ý sức khỏe, tránh lao lực quá sức vì những tham vọng không cần thiết.",
        "nu": "Nữ mệnh dễ bị tổn thương cảm xúc, cần được sự quan tâm và vỗ về từ những người thân yêu.",
    },
    "Tử": {
        "desc": "Trạng thái tĩnh lặng, nội tâm sâu sắc.",
        "nam": "Nam mệnh có xu hướng nghiên cứu sâu, tính cách điềm đạm và có triết lý sống riêng biệt.",
        "nu": "Nữ mệnh tâm tính thanh tịnh, có duyên with các vấn đề tâm linh hoặc nghệ thuật chiều sâu.",
    },
    "Mộ": {
        "desc": "Tích lũy, thu tàng, tính cách kín đáo.",
        "nam": "Nam mệnh giỏi tích lũy tài sản, sống thực tế và luôn có kế hoạch dự phòng chắc chắn.",
        "nu": "Nữ mệnh đoan trang, tiết kiệm, là người 'tay hòm chìa khóa' xuất sắc trong gia đình.",
    },
    "Tuyệt": {
        "desc": "Sự đứt gãy để chuẩn bị cho cái mới, cô độc.",
        "nam": "Nam mệnh dễ gặp những bước ngoặt bất ngờ, cuộc đời nhiều thăng trầm nhưng ẩn chứa sức bật lớn.",
        "nu": "Nữ mệnh tâm tính cô nhạn, thường cảm thấy cô đơn dù đang ở giữa đám đông, cần sự thấu hiểu sâu sắc.",
    },
    "Thai": {
        "desc": "Ấp ủ ý tưởng, cần sự nuôi dưỡng.",
        "nam": "Nam mệnh nhiều hoài bão nhưng cần thời gian tích lũy đủ để bùng nổ trong tương lai.",
        "nu": "Nữ mệnh có tâm hồn ưu tư, giàu trí tưởng tượng và luôn hy vọng vào những điều tốt đẹp.",
    },
    "Dưỡng": {
        "desc": "Tích lũy nội lực, chuẩn bị kỹ lưỡng.",
        "nam": "Nam mệnh ôn hòa, kiên nhẫn chờ thời, hậu vận thường rất vững chắc nhờ sự chuẩn bị tốt.",
        "nu": "Nữ mệnh dịu dàng, biết nhẫn nhịn và chăm sóc tốt cho những mầm mống tương lai.",
    }
};

const DYNAMICS = {
    "VƯỢNG_VƯỢNG": [
        "Khí thế liên hoàn cường vượng, cuộc đời hanh thông, ít gặp trở ngại lớn.",
        "Năng lượng dồi dào chảy suốt các trụ, tạo nên một bản mệnh vững chãi như bàn thạch.",
    ],
    "SUY_SUY": [
        "Khí thế có phần trầm lắng, cần nỗ lực bền bỉ và tìm kiếm sự trợ giúp từ quý nhân.",
        "Bản mệnh thiên về tĩnh tại, nên phát triển các ngành nghề cần sự tỉ mỉ thay vì tranh đấu.",
    ],
    "TIỀN_CÁT_HẬU_HUNG": [
        "Khởi đầu rực rỡ nhưng hậu vận cần đề phòng sự suy vi, nên sớm có kế hoạch tích lũy.",
        "Vận trình như hoa nở sớm, cần biết giữ mình và tiết chế khi ở đỉnh cao.",
    ],
    "TIỀN_HUNG_HẬU_CÁT": [
        "Gian nan thuở nhỏ là phép thử để có được hậu vận viên mãn, sung túc.",
        "Càng về già càng phát đạt, con cái thành danh, bản mệnh an hưởng thái bình.",
    ]
};

const STAGE_WEIGHTS = {
    "Tràng sinh": 1.5, "Mộc dục": 0.8, "Quan đới": 1.2, "Lâm quan": 1.8,
    "Đế vượng": 2.0, "Suy": 0.9, "Bệnh": 0.5, "Tử": 0.2,
    "Mộ": 0.6, "Tuyệt": 0.1, "Thai": 0.4, "Dưỡng": 0.7
};

module.exports = {
    OPENINGS,
    STAGES,
    DYNAMICS,
    STAGE_WEIGHTS
};
