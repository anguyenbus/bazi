/**
 * Dữ liệu Đại Vận (10-Year Luck Cycles) chi tiết
 */

const DAYUN_BY_ELEMENT = {
    'Mộc': {
        'favorable': [
            "Đại vận Mộc đến: Thời kỳ phát triển mạnh mẽ, sự nghiệp nở rộ.",
            "Vận Mộc vượng: Sáng tạo bùng phát, cơ hội mới mở ra.",
            "Mộc vận thịnh: Sức khỏe tốt, năng lượng dồi dào.",
            "Vận Mộc hanh thông: Tài lộc khởi sắc, kinh doanh phát đạt.",
            "Mộc vận phú quý: Được quý nhân phò trợ.",
        ],
        'unfavorable': [
            "Đại vận Mộc khắc: Cần cẩn thận with gan mật, sức khỏe.",
            "Vận Mộc xung: Có thể gặp xung đột, tranh chấp.",
            "Mộc vận suy: Năng lượng giảm sút, cần nghỉ ngơi.",
            "Vận Mộc yếu: Sự nghiệp có thể chậm lại.",
        ],
    },
    'Hỏa': {
        'favorable': [
            "Đại vận Hỏa đến: Thời kỳ rực rỡ nhất trong đời.",
            "Vận Hỏa vượng: Danh tiếng nổi bật, được nhiều người biết đến.",
            "Hỏa vận thịnh: Nhiệt huyết cao độ, thành công lớn.",
            "Vận Hỏa hanh thông: Được tôn vinh and kính trọng.",
            "Hỏa vận phú quý: Tiền bạc đến dồi dào.",
        ],
        'unfavorable': [
            "Đại vận Hỏa khắc: Cần cẩn thận with tim mạch.",
            "Vận Hỏa xung: Có thể gặp thị phi, xung đột.",
            "Hỏa vận suy: Cần kiểm soát cảm xúc, tránh nóng giận.",
            "Vận Hỏa yếu: Năng lượng có thể cạn kiệt.",
        ],
    },
    'Thổ': {
        'favorable': [
            "Đại vận Thổ đến: Thời kỳ ổn định and tích lũy.",
            "Vận Thổ vượng: Bất động sản, tài sản tăng trưởng.",
            "Thổ vận thịnh: Cuộc sống bình an, gia đình yên ấm.",
            "Vận Thổ hanh thông: Sự nghiệp phát triển bền vững.",
            "Thổ vận phú quý: Nhiều phúc lộc đến.",
        ],
        'unfavorable': [
            "Đại vận Thổ khắc: Cần cẩn thận with tiêu hóa.",
            "Vận Thổ xung: Có thể gặp trì trệ, chậm chạp.",
            "Thổ vận suy: Cần tránh bảo thủ, cố chấp.",
            "Vận Thổ yếu: Có thể gặp vấn đề về tài sản.",
        ],
    },
    'Kim': {
        'favorable': [
            "Đại vận Kim đến: Thời kỳ quyết đoán, thành công.",
            "Vận Kim vượng: Sự nghiệp thăng tiến, được đề bạt.",
            "Kim vận thịnh: Tài chính dồi dào, đầu tư sinh lời.",
            "Vận Kim hanh thông: Được quý nhân hỗ trợ.",
            "Kim vận phú quý: Giàu có and quyền lực.",
        ],
        'unfavorable': [
            "Đại vận Kim khắc: Cần cẩn thận with phổi, đường hô hấp.",
            "Vận Kim xung: Có thể gặp xung đột with người khác.",
            "Kim vận suy: Cần mềm mỏng hơn trong giao tiếp.",
            "Vận Kim yếu: Quyền lực có thể bị lung lay.",
        ],
    },
    'Thủy': {
        'favorable': [
            "Đại vận Thủy đến: Thời kỳ linh hoạt, cơ hội mới.",
            "Vận Thủy vượng: Trí tuệ phát triển, học hành tiến bộ.",
            "Thủy vận thịnh: Tài lộc từ xa đến, kinh doanh quốc tế.",
            "Vận Thủy hanh thông: Được hỗ trợ từ nhiều phía.",
            "Thủy vận phú quý: Tài lộc dồi dào từ nước ngoài.",
        ],
        'unfavorable': [
            "Đại vận Thủy khắc: Cần cẩn thận with thận, tiết niệu.",
            "Vận Thủy xung: Có thể gặp biến động, thay đổi bất ngờ.",
            "Thủy vận suy: Cần ổn định hơn, tránh di chuyển nhiều.",
            "Vận Thủy yếu: Có thể gặp khó khăn trong giao tiếp.",
        ],
    },
};

const DAYUN_BY_AGE = {
    '0-10': [
        "Đại vận đầu đời (0-10 tuổi): Thời kỳ nền móng, phụ thuộc vào gia đình.",
        "Vận thơ ấu: Ảnh hưởng lớn từ cha mẹ and gia đình.",
        "Giai đoạn này chủ yếu xây dựng nền tảng cho tương lai.",
    ],
    '10-20': [
        "Đại vận tuổi trẻ (10-20 tuổi): Thời kỳ học hành, phát triển.",
        "Vận thanh thiếu niên: Học tập and xây dựng kỹ năng.",
        "Giai đoạn này định hình hướng đi tương lai.",
    ],
    '20-30': [
        "Đại vận tuổi 20 (20-30 tuổi): Thời kỳ khởi đầu sự nghiệp.",
        "Vận thanh xuân: Năng lượng dồi dào, nhiều cơ hội.",
        "Giai đoạn này quyết định nền tảng sự nghiệp.",
    ],
    '30-40': [
        "Đại vận tuổi 30 (30-40 tuổi): Thời kỳ phát triển sự nghiệp.",
        "Vận trung niên đầu: Củng cố vị trí and phát triển.",
    ],
    '40-50': [
        "Đại vận tuổi 40 (40-50 tuổi): Thời kỳ đỉnh cao sự nghiệp.",
        "Vận trung niên: Gặt hái thành quả của nỗ lực.",
    ],
    '50-60': [
        "Đại vận tuổi 50 (50-60 tuổi): Thời kỳ chuyển giao.",
        "Vận trung niên cuối: Truyền đạt kinh nghiệm.",
    ],
    '60-70': [
        "Đại vận tuổi 60 (60-70 tuổi): Thời kỳ nghỉ ngơi an nhàn.",
        "Vận lão niên: Tận hưởng cuộc sống and gia đình.",
    ],
    '70+': [
        "Đại vận tuổi 70+ : Thời kỳ hưởng thọ.",
        "Vận hậu niên: An nhàn and bình an.",
    ],
};

const DAYUN_BY_DEITY = {
    'Quan': [
        "Đại vận Chính Quan: Thời kỳ thăng tiến, được đề bạt.",
        "Vận Quan sát chiếu mệnh: Có quyền lực and địa vị.",
        "Vận Quan vượng: Danh tiếng and uy tín tăng lên.",
    ],
    'Sát': [
        "Đại vận Thất Sát: Thời kỳ thử thách nhưng có cơ hội.",
        "Vận Sát đến: Cần dũng cảm đối mặt with khó khăn.",
        "Đại vận Sát tốt (có chế): Vượt qua sẽ thành công lớn.",
    ],
    'Tài+': [
        "Đại vận Chính Tài: Thời kỳ tài lộc ổn định.",
        "Vận Tài đến: Thu nhập tăng, tiền bạc dồi dào.",
        "Đại vận Tài vượng: Tích lũy tài sản đáng kể.",
    ],
    'Tài-': [
        "Đại vận Thiên Tài: Thời kỳ tài lộc bất ngờ.",
        "Vận Thiên Tài đến: Có thể có thu nhập đột xuất.",
        "Vận Thiên Tài vượng: Tiền bạc đến nhanh.",
    ],
    'Ấn': [
        "Đại vận Chính Ấn: Thời kỳ học hỏi, được hỗ trợ.",
        "Vận Ấn đến: Có quý nhân phù trợ.",
        "Vận Ấn hanh thông: Mọi việc suôn sẻ nhờ có hậu thuẫn.",
    ],
    'Kiêu': [
        "Đại vận Thiên Ấn: Thời kỳ sáng tạo, độc đáo.",
        "Vận Kiêu đến: Có thể theo đuổi con đường riêng.",
        "Vận Kiêu vượng: Có thể có thành tựu độc đáo.",
    ],
    'Thực': [
        "Đại vận Thực Thần: Thời kỳ hưởng thụ, sáng tạo.",
        "Vận Thực đến: Cuộc sống nhẹ nhàng, an nhàn.",
        "Vận Thực hanh thông: Tài năng được công nhận.",
    ],
    'Thương': [
        "Đại vận Thương Quan: Thời kỳ nổi tiếng, tài năng bừng sáng.",
        "Vận Thương vượng: Nổi bật trong lĩnh vực chuyên môn.",
    ],
    'Tỷ': [
        "Đại vận Tỷ Kiên: Thời kỳ tự lập, hợp tác.",
        "Vận Tỷ vượng: Mạng lưới quan hệ mở rộng.",
    ],
    'Kiếp': [
        "Đại vận Kiếp Tài: Thời kỳ cạnh tranh, thử thách.",
        "Vận Kiếp vượng: Cần quản lý tài chính cẩn thận.",
    ],
};

module.exports = {
    DAYUN_BY_ELEMENT,
    DAYUN_BY_AGE,
    DAYUN_BY_DEITY
};
