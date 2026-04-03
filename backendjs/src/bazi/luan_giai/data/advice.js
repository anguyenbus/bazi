/**
 * Dữ liệu Lời Khuyên (Advice)
 */

const CAREER_ADVICE_BY_ELEMENT = {
    'Mộc': [
        "Phát huy thế mạnh sáng tạo và đổi mới trong công việc.",
        "Nên theo đuổi các lĩnh vực liên quan đến phát triển, mở rộng.",
        "Môi trường làm việc năng động và có sự phát triển phù hợp with bạn.",
        "Tránh công việc đơn điệu, lặp đi lặp lại thiếu sáng tạo.",
        "Hợp with các ngành: giáo dục, y tế, nông nghiệp, thiết kế.",
        "Nên làm việc trong môi trường có cây xanh, thiên nhiên.",
        "Phát triển kỹ năng lãnh đạo and khởi nghiệp.",
        "Tránh làm việc trong môi trường kim khí, cơ khí nặng.",
        "Phù hợp with công việc liên quan đến trẻ em and thanh niên.",
        "Nên đầu tư vào học hành and nâng cao kiến thức.",
    ],
    'Hỏa': [
        "Phát huy khả năng truyền cảm hứng and động viên người khác.",
        "Nên theo đuổi các lĩnh vực liên quan đến truyền thông, giải trí.",
        "Môi trường làm việc sôi động and có nhiều hoạt động phù hợp with bạn.",
        "Tránh công việc cần sự kiên nhẫn quá mức.",
        "Hợp with các ngành: truyền thông, marketing, giải trí, điện lực.",
        "Nên làm việc trong môi trường nhiều ánh sáng.",
        "Phát triển kỹ năng thuyết trình and giao tiếp công chúng.",
        "Tránh làm việc trong môi trường lạnh lẽo, thiếu tương tác.",
        "Phù hợp with công việc liên quan đến sự kiện, lễ hội.",
        "Nên đầu tư vào mạng lưới quan hệ xã hội.",
    ],
    'Thổ': [
        "Phát huy khả năng tổ chức and quản lý ổn định.",
        "Nên theo đuổi các lĩnh vực liên quan đến bất động sản, xây dựng.",
        "Môi trường làm việc ổn định and có hệ thống phù hợp with bạn.",
        "Tránh công việc có nhiều biến động, rủi ro cao.",
        "Hợp with các ngành: bất động sản, nông nghiệp, khai thác.",
        "Nên làm việc trong môi trường trung tâm, không quá xa vùng ngoại ô.",
        "Phát triển kỹ năng quản lý tài chính and tích lũy.",
        "Tránh làm việc liên quan đến vận chuyển, di chuyển nhiều.",
        "Phù hợp with công việc liên quan đến ẩm thực, nhà hàng.",
        "Nên đầu tư vào tài sản cố định, đất đai.",
    ],
    'Kim': [
        "Phát huy khả năng phân tích and quyết đoán.",
        "Nên theo đuổi các lĩnh vực liên quan đến tài chính, kim loại.",
        "Môi trường làm việc chuyên nghiệp and có kỷ luật phù hợp with bạn.",
        "Tránh công việc thiếu cấu trúc, quá tự do.",
        "Hợp with các ngành: tài chính, ngân hàng, cơ khí, công nghệ.",
        "Nên làm việc trong môi trường hiện đại, công nghệ cao.",
        "Phát triển kỹ năng phân tích số liệu and quản lý.",
        "Tránh làm việc trong môi trường quá ẩm ướt, thiếu ánh sáng.",
        "Phù hợp with công việc liên quan đến pháp luật, an ninh.",
        "Nên đầu tư vào công nghệ and thiết bị hiện đại.",
    ],
    'Thủy': [
        "Phát huy khả năng linh hoạt and thích nghi.",
        "Nên theo đuổi các lĩnh vực liên quan đến vận chuyển, logistics.",
        "Môi trường làm việc năng động and có nhiều di chuyển phù hợp with bạn.",
        "Tránh công việc quá cố định, giam mình một chỗ.",
        "Hợp with các ngành: vận tải, du lịch, thủy sản, truyền thông.",
        "Nên làm việc gần nước hoặc các hoạt động liên quan đến nước.",
        "Phát triển kỹ năng giao tiếp and đàm phán quốc tế.",
        "Tránh làm việc trong môi trường quá khô khan, bí bách.",
        "Phù hợp with công việc liên quan đến nghiên cứu, phát triển.",
        "Nên đầu tư vào kiến thức and kỹ năng mềm.",
    ],
};

const RELATIONSHIP_ADVICE = {
    'male': {
        'general': [
            "Là nam giới, cần chủ động trong tình cảm nhưng tôn trọng đối phương.",
            "Người đàn ông cần biết lắng nghe and thấu hiểu vợ/bạn gái.",
            "Nên thể hiện sự quan tâm bằng hành động hơn lời nói.",
            "Tránh quá cứng nhắc trong các quyết định gia đình.",
            "Cân bằng giữa sự nghiệp and gia đình là chìa khóa hạnh phúc.",
        ],
        'marriage': [
            "Hôn nhân của nam giới cần sự kiên nhẫn and trách nhiệm.",
            "Là chồng, cần là chỗ dựa vững chắc cho vợ con.",
            "Nên chia sẻ công việc nhà with vợ để gia đình hòa thuận.",
            "Tránh mang công việc về nhà, giữ không gian riêng cho gia đình.",
            "Quan tâm đến cảm xúc của vợ, không chỉ vật chất.",
        ],
    },
    'female': {
        'general': [
            "Là nữ giới, hãy tự tin and yêu thương bản thân mình trước.",
            "Người phụ nữ hiện đại cần cân bằng giữa sự nghiệp and gia đình.",
            "Nên biết giá trị của mình, không hạ thấp bản thân vì ai.",
            "Tránh hy sinh quá nhiều đến mức quên mất chính mình.",
            "Sự mềm mại là sức mạnh, không phải điểm yếu.",
        ],
        'marriage': [
            "Hôn nhân của nữ giới cần sự thấu hiểu and kiên nhẫn.",
            "Là vợ, biết cách làm cho gia đình êm ấm là nghệ thuật.",
            "Nên duy trì sự độc lập tài chính trong hôn nhân.",
            "Tránh quá phụ thuộc vào chồng, giữ sự bình đẳng.",
            "Giao tiếp cởi mở với chồng về mọi vấn đề.",
        ],
    },
};

const HEALTH_ADVICE_BY_STEM = {
    '甲': [
        "Giáp Mộc cần chú ý gan and mật, tránh uống rượu bia quá nhiều.",
        "Đề phòng các vấn đề về gân cốt and xương khớp.",
        "Nên tập thể dục đều đặn, đặc biệt là đi bộ and yoga.",
        "Ăn nhiều rau xanh, trái cây để bổ sung khí mộc.",
    ],
    '乙': [
        "Ất Mộc cần chú ý hệ thần kinh and gân cốt.",
        "Đề phòng các vấn đề về da and dị ứng.",
        "Nên duy trì lối sống cân bằng, tránh căng thẳng.",
        "Yoga and thiền định rất phù hợp cho Ất Mộc.",
    ],
    '丙': [
        "Bính Hỏa cần chú ý tim mạch and huyết áp.",
        "Đề phòng các vấn đề về mắt and thị lực.",
        "Nên kiểm soát cảm xúc, tránh nóng giận quá độ.",
        "Hạn chế đồ ăn cay nóng, giữ cho cơ thể mát mẻ.",
    ],
    '丁': [
        "Đinh Hỏa cần chú ý ruột non and hệ tiêu hóa.",
        "Đề phòng các vấn đề về giấc ngủ, mất ngủ.",
        "Nên duy trì tinh thần lạc quan, tránh suy nghĩ tiêu cực.",
        "Thiền định and yoga rất có lợi cho Đinh Hỏa.",
    ],
    '戊': [
        "Mậu Thổ cần chú ý dạ dày and hệ tiêu hóa.",
        "Đề phòng các vấn đề về béo phì and tiểu đường.",
        "Nên duy trì vận động đều đặn, tránh lười biếng.",
        "Ăn uống điều độ, không ăn quá no hoặc quá khuya.",
    ],
    '己': [
        "Kỷ Thổ cần chú ý lá lách and hệ miễn dịch.",
        "Đề phòng các vấn đề về tiêu hóa and dạ dày.",
        "Nên duy trì tâm lý thoải mái, tránh lo lắng quá mức.",
        "Ăn uống lành mạnh, tránh đồ lạnh.",
    ],
    '庚': [
        "Canh Kim cần chú ý phổi and đại tràng.",
        "Đề phòng các vấn đề về hô hấp.",
        "Nên kiểm soát cảm xúc, tránh buồn phiền quá độ.",
        "Tập hít thở sâu and các bài tập về phổi.",
    ],
    '辛': [
        "Tân Kim cần chú ý hệ hô hấp and da.",
        "Đề phòng các vấn đề về dị ứng.",
        "Nên duy trì chế độ làm đẹp, chăm sóc bản thân.",
        "Tránh môi trường ô nhiễm, bụi bẩn.",
    ],
    '壬': [
        "Nhâm Thủy cần chú ý thận and bàng quang.",
        "Đề phòng các vấn đề về xương khớp.",
        "Nên duy trì uống đủ nước, tránh để cơ thể khô.",
        "Nghỉ ngơi đủ giấc, không thức khuya thường xuyên.",
    ],
    '癸': [
        "Quý Thủy cần chú ý hệ bài tiết and thận.",
        "Đề phòng các vấn đề về tai and thính giác.",
        "Nên duy trì tinh thần lạc quan, tránh u uất.",
        "Tránh suy nghĩ quá nhiều gây stress.",
    ],
};

const SOCIAL_ADVICE = [
    "Lắng nghe nhiều hơn nói, thấu hiểu trước khi phản hồi.",
    "Giữ lời hứa, đó là nền tảng của sự tin cậy.",
    "Tránh nói xấu sau lưng, đây là đức hạnh cơ bản.",
    "Biết ơn những gì mình có, cảm ơn những người đã giúp đỡ.",
    "Khiêm tốn khi thành công, kiên cường khi thất bại.",
];

const FENGSHUI_ADVICE_BY_ELEMENT = {
    'Mộc': [
        "Bổ sung màu xanh lá, xanh ngọc trong nhà and văn phòng.",
        "Trồng cây xanh trong nhà để tăng khí Mộc.",
        "Hướng Đông là hướng tốt nhất cho Mộc.",
    ],
    'Hỏa': [
        "Bổ sung màu đỏ, tím, hồng trong trang trí.",
        "Đảm bảo đủ ánh sáng, đặc biệt ánh sáng tự nhiên.",
        "Hướng Nam là hướng tốt nhất cho Hỏa.",
    ],
    'Thổ': [
        "Bổ sung màu vàng, nâu, be trong không gian sống.",
        "Sử dụng đồ gốm sứ, đá tự nhiên để trang trí.",
        "Hướng Trung ương, Tây Nam, Đông Bắc tốt cho Thổ.",
    ],
    'Kim': [
        "Bổ sung màu trắng, bạc, xám trong trang trí.",
        "Sử dụng đồ kim loại, inox để trang trí.",
        "Hướng Tây, Tây Bắc là hướng tốt cho Kim.",
    ],
    'Thủy': [
        "Bổ sung màu đen, xanh dương đậm trong không gian.",
        "Sử dụng bể cá, thác nước mini để trang trí.",
        "Hướng Bắc là hướng tốt nhất cho Thủy.",
    ],
};

const ELEMENT_COLORS = {
    'Mộc': 'xanh lá, xanh lục, xanh ngọc',
    'Hỏa': 'đỏ, tím, hồng, cam',
    'Thổ': 'vàng, nâu, be, cam đất',
    'Kim': 'trắng, bạc, xám, ánh kim',
    'Thủy': 'đen, xanh biển, xanh dương đậm'
};

const ELEMENT_DIRECTIONS = {
    'Mộc': 'Đông', 'Hỏa': 'Nam', 'Thổ': 'Trung tâm', 'Kim': 'Tây', 'Thủy': 'Bắc'
};

module.exports = {
    CAREER_ADVICE_BY_ELEMENT,
    RELATIONSHIP_ADVICE,
    HEALTH_ADVICE_BY_STEM,
    SOCIAL_ADVICE,
    FENGSHUI_ADVICE_BY_ELEMENT,
    ELEMENT_COLORS,
    ELEMENT_DIRECTIONS
}
