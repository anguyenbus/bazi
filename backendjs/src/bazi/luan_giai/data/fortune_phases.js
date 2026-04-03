/**
 * Fortune Phases Extended - Vận trình chi tiết
 */

const FORTUNE_BY_DEITY = {
    'Quan': {
        'vượng': [
            "Vận Quan vượng: Sự nghiệp thăng tiến, được cấp trên tin tưởng.",
            "Quan tinh vượng: Có cơ hội được đề bạt, thăng chức.",
            "Gặp vận Quan tốt: Danh tiếng and địa vị được nâng cao.",
            "Quan vượng tốt đẹp: Công việc thuận lợi, suôn sẻ.",
            "Vận Quan hanh thông: Được tôn trọng and kính nể.",
        ],
        'nhược': [
            "Vận Quan nhược: Sự nghiệp có thể gặp khó khăn.",
            "Quan tinh nhược: Cần cố gắng nhiều hơn trong công việc.",
            "Gặp vận Quan yếu: Có thể thiếu sự hỗ trợ từ cấp trên.",
            "Quan nhược không tốt: Cần cẩn thận with tiểu nhân.",
            "Vận Quan không hanh thông: Cần kiên nhẫn chờ đợi.",
        ],
    },
    'Sát': {
        'vượng': [
            "Vận Sát vượng: Có sức mạnh vượt qua mọi thử thách.",
            "Sát tinh vượng: Tinh thần chiến đấu cao, quyết đoán.",
            "Gặp vận Sát mạnh: Có thể đối phó with mọi đối thủ.",
            "Sát vượng tốt đẹp: Thành công trong môi trường cạnh tranh.",
            "Vận Sát hanh thông: Có quyền uy and sức ảnh hưởng.",
        ],
        'nhược': [
            "Vận Sát nhược: Có thể gặp khó khăn with đối thủ.",
            "Sát tinh nhược: Cần cẩn thận with cạnh tranh.",
            "Gặp vận Sát yếu: Thiếu sức mạnh đối phó.",
            "Sát nhược không tốt: Có thể bị áp đảo.",
            "Vận Sát không hanh thông: Cần tránh xung đột.",
        ],
    },
    'Tài+': {
        'vượng': [
            "Vận Chính Tài vượng: Tài lộc dồi dào, thu nhập ổn định.",
            "Chính Tài vượng: Kiếm tiền dễ dàng, công việc thuận lợi.",
            "Gặp vận Tài tốt: Có nhiều cơ hội kiếm tiền.",
            "Tài vượng tốt đẹp: Cuộc sống sung túc, đầy đủ.",
            "Vận Tài hanh thông: Đầu tư sinh lời, tiết kiệm được.",
        ],
        'nhược': [
            "Vận Chính Tài nhược: Thu nhập có thể hạn chế.",
            "Chính Tài nhược: Cần cố gắng nhiều hơn trong kiếm tiền.",
            "Gặp vận Tài yếu: Có thể gặp khó khăn tài chính.",
            "Tài nhược không tốt: Cần tiết kiệm and chi tiêu hợp lý.",
            "Vận Tài không hanh thông: Cần cẩn thận with tiền bạc.",
        ],
    },
    'Tài-': {
        'vượng': [
            "Vận Thiên Tài vượng: Có nhiều nguồn thu nhập bất ngờ.",
            "Thiên Tài vượng: Kinh doanh phát đạt, đầu tư lãi lớn.",
            "Gặp vận Thiên Tài tốt: May mắn về tài chính.",
            "Thiên Tài vượng tốt đẹp: Phát tài nhanh chóng.",
            "Vận Thiên Tài hanh thông: Có quý nhân giúp đỡ về tiền bạc.",
        ],
        'nhược': [
            "Vận Thiên Tài nhược: Có thể gặp tổn thất tài chính.",
            "Thiên Tài nhược: Cần cẩn thận with đầu tư mạo hiểm.",
            "Gặp vận Thiên Tài yếu: Tài lộc bấp bênh.",
            "Thiên Tài nhược không tốt: Có thể mất tiền bất ngờ.",
            "Vận Thiên Tài không hanh thông: Cần tránh đánh bạc, mạo hiểm.",
        ],
    },
    'Ấn': {
        'vượng': [
            "Vận Ấn vượng: Được quý nhân phò trợ, học hành tiến bộ.",
            "Ấn tinh vượng: Có người giúp đỡ, hướng dẫn.",
            "Gặp vận Ấn tốt: Được yêu thương and bảo bọc.",
            "Ấn vượng tốt đẹp: Học vấn thành đạt, thi cử thuận lợi.",
            "Vận Ấn hanh thông: Được mẹ and người thân yêu thương.",
        ],
        'nhược': [
            "Vận Ấn nhược: Có thể thiếu sự hỗ trợ từ người khác.",
            "Ấn tinh nhược: Học hành có thể gặp khó khăn.",
            "Gặp vận Ấn yếu: Thiếu quý nhân phò trợ.",
            "Ấn nhược không tốt: Có thể gặp vấn đề with mẹ.",
            "Vận Ấn không hanh thông: Cần tự lực cánh sinh.",
        ],
    },
    'Kiêu': {
        'vượng': [
            "Vận Kiêu vượng: Có năng khiếu đặc biệt được phát huy.",
            "Kiêu tinh vượng: Sáng tạo and độc đáo nổi bật.",
            "Gặp vận Kiêu tốt: Thành công trong lĩnh vực đặc thù.",
            "Kiêu vượng tốt đẹp: Có phong cách riêng, được công nhận.",
            "Vận Kiêu hanh thông: Trực giác nhạy bén, khám phá nhiều.",
        ],
        'nhược': [
            "Vận Kiêu nhược: Có thể cảm thấy cô đơn, lẻ loi.",
            "Kiêu tinh nhược: Năng khiếu không được phát huy.",
            "Gặp vận Kiêu yếu: Thiếu sự công nhận.",
            "Kiêu nhược không tốt: Có thể khó hòa nhập.",
            "Vận Kiêu không hanh thông: Cần tìm người đồng điệu.",
        ],
    },
    'Thực': {
        'vượng': [
            "Vận Thực vượng: Cuộc sống hưởng thụ, an nhàn.",
            "Thực tinh vượng: Tài năng nghệ thuật được phát huy.",
            "Gặp vận Thực tốt: Có nhiều niềm vui trong cuộc sống.",
            "Thực vượng tốt đẹp: Con cái hiếu thảo, gia đình hạnh phúc.",
            "Vận Thực hanh thông: Sức khỏe tốt, tinh thần vui vẻ.",
        ],
        'nhược': [
            "Vận Thực nhược: Có thể thiếu niềm vui trong cuộc sống.",
            "Thực tinh nhược: Tài năng không được công nhận.",
            "Gặp vận Thực yếu: Sức khỏe cần chú ý.",
            "Thực nhược không tốt: Có thể gặp vấn đề with con cái.",
            "Vận Thực không hanh thông: Cần tìm nguồn vui mới.",
        ],
    },
    'Thương': {
        'vượng': [
            "Vận Thương vượng: Tài năng tỏa sáng, nổi tiếng thành danh.",
            "Thương tinh vượng: Khả năng biểu đạt xuất sắc.",
            "Gặp vận Thương tốt: Được nhiều người biết đến.",
            "Thương vượng tốt đẹp: Thành công trong truyền thông.",
            "Vận Thương hanh thông: Sức hút cá nhân mạnh mẽ.",
        ],
        'nhược': [
            "Vận Thương nhược: Có thể gặp thị phi, khẩu nghiệp.",
            "Thương tinh nhược: Tài năng không được công nhận.",
            "Gặp vận Thương yếu: Cần cẩn thận lời nói.",
            "Thương nhược không tốt: Có thể bị hiểu lầm.",
            "Vận Thương không hanh thông: Cần kiềm chế bản thân.",
        ],
    },
    'Tỷ': {
        'vượng': [
            "Vận Tỷ vượng: Có sự hỗ trợ từ bạn bè, anh em.",
            "Tỷ tinh vượng: Mạng lưới quan hệ mở rộng.",
            "Gặp vận Tỉ tốt: Hợp tác kinh doanh thuận lợi.",
            "Tỉ vượng tốt đẹp: Tự tin and độc lập.",
            "Vận Tỉ hanh thông: Được giúp đỡ khi cần thiết.",
        ],
        'nhược': [
            "Vận Tỉ nhược: Có thể thiếu sự hỗ trợ từ bên ngoài.",
            "Tỉ tinh nhược: Cần tự lực cánh sinh.",
            "Gặp vận Tỉ yếu: Có thể gặp xung đột with anh em.",
            "Tỷ nhược không tốt: Thiếu bạn bè đồng hành.",
            "Vận Tỉ không hanh thông: Cần xây dựng mạng lưới.",
        ],
    },
    'Kiếp': {
        'vượng': [
            "Vận Kiếp vượng: Có sức mạnh đối phó with cạnh tranh.",
            "Kiếp tinh vượng: Tinh thần chiến đấu cao.",
            "Gặp vận Kiếp tốt: Không sợ đối thủ.",
            "Kiếp vượng tốt đẹp: Bảo vệ được tài sản and quyền lợi.",
            "Vận Kiếp hanh thông: Vượt qua mọi thử thách.",
        ],
        'nhược': [
            "Vận Kiếp nhược: Có thể hao tài tốn của.",
            "Kiếp tinh nhược: Cần cẩn thận with tiền bạc.",
            "Gặp vận Kiếp yếu: Có thể bị người khác tranh giành.",
            "Kiếp nhược không tốt: Dễ mất mát tài sản.",
            "Vận Kiếp không hanh thông: Cần bảo vệ những gì có.",
        ],
    },
};

module.exports = {
    FORTUNE_BY_DEITY
};
