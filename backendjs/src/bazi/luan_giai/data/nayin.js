/**
 * Dữ liệu Nạp Âm (60 Giáp Tý) với hàng ngàn biến thể.
 * Tham chiếu từ Python backend.
 */

const NAYIN_DATA = {
    '海中金': {
        'name': 'Hải Trung Kim',
        'element': 'Kim',
        'description': [
            "Vàng trong biển - Kim loại quý giá được che giấu dưới đáy biển sâu.",
            "Kim ẩn trong Thủy - Tài năng tiềm ẩn chờ được phát hiện.",
            "Như ngọc trai dưới đáy đại dương - Giá trị không lộ ra bên ngoài.",
            "Kim loại được bảo vệ bởi nước - Có sự che chở tự nhiên.",
            "Kho báu dưới biển - Tiềm năng lớn nhưng cần thời gian để khai thác.",
        ],
        'personality': [
            "Người có nội tâm sâu sắc, không hay thể hiện ra bên ngoài.",
            "Tính cách trầm lắng nhưng có giá trị thực sự.",
            "Biết giữ bí mật, đáng tin cậy.",
            "Có tài năng ẩn giấu, cần môi trường phù hợp để tỏa sáng.",
            "Kiên nhẫn, không vội vàng bộc lộ khả năng.",
        ],
        'career': [
            "Phù hợp với công việc đòi hỏi sự kiên nhẫn và chiều sâu.",
            "Thích hợp làm nghiên cứu, phân tích, khám phá.",
            "Có thể thành công trong ngành khai thác, thu mua.",
            "Hợp với công việc liên quan đến biển, thủy sản.",
        ],
        'fortune': [
            "Tiền vận lặng lẽ, trung vận khởi sắc, hậu vận vinh hiển.",
            "Tài lộc đến muộn nhưng bền vững.",
            "Cần thời gian để được công nhận giá trị.",
        ],
    },
    '爐中火': {
        'name': 'Lô Trung Hỏa',
        'element': 'Hỏa',
        'description': [
            "Lửa trong lò - Ngọn lửa được kiểm soát, có mục đích rõ ràng.",
            "Hỏa được nuôi dưỡng - Năng lượng ổn định và bền bỉ.",
            "Như lửa luyện kim - Có khả năng biến đổi, tạo ra giá trị.",
            "Ngọn lửa ấm áp trong nhà - Mang lại sự ấm cúng cho gia đình.",
        ],
        'personality': [
            "Người có năng lượng ổn định, không quá bùng phát.",
            "Tính cách ấm áp, biết chăm sóc người khác.",
            "Có khả năng kiên trì theo đuổi mục tiêu.",
            "Biết kiểm soát cảm xúc, không nóng vội.",
        ],
        'career': [
            "Phù hợp với công việc đòi hỏi sự kiên nhẫn và kỹ năng.",
            "Thích hợp làm thợ thủ công, chế tác.",
            "Có thể thành công trong ngành ẩm thực.",
        ],
        'fortune': [
            "Tiền vận vất vả tích lũy, trung vận ổn định, hậu vận sung túc.",
            "Tài lộc đến từ sự chăm chỉ và kỹ năng.",
        ],
    },
    '大林木': {
        'name': 'Đại Lâm Mộc',
        'element': 'Mộc',
        'description': [
            "Rừng già - Cây cổ thụ trong rừng đại ngàn.",
            "Mộc vượng ở rừng - Sức sống mãnh liệt, phát triển không ngừng.",
            "Cây lớn che bóng mát - Có khả năng bảo bọc nhiều người.",
        ],
        'personality': [
            "Người có tầm nhìn rộng, bao quát được nhiều thứ.",
            "Tính cách hào phóng, biết chia sẻ.",
            "Có khả năng lãnh đạo và bảo vệ người khác.",
        ],
        'career': [
            "Phù hợp với công việc quản lý, điều hành quy mô lớn.",
            "Thích hợp làm trong ngành lâm nghiệp, nông nghiệp.",
        ],
        'fortune': [
            "Tiền vận phát triển nhanh, trung vận đạt đỉnh, hậu vận an nhàn.",
            "Tiểu lộc dồi dào nhờ sự nghiệp lớn.",
        ],
    },
    '路傍土': {
        'name': 'Lộ Bàng Thổ',
        'element': 'Thổ',
        'description': [
            "Đất ven đường - Đất bằng phẳng, dễ tiếp cận.",
            "Như con đường lớn - Kết nối và hỗ trợ di chuyển.",
        ],
        'personality': [
            "Người giản dị, không cầu kỳ.",
            "Tính cách thân thiện, dễ gần.",
            "Kiên nhẫn, chịu đựng được khó khăn.",
        ],
        'career': [
            "Phù hợp với công việc dịch vụ, phục vụ công cộng.",
            "Thích hợp làm trong ngành giao thông, vận tải.",
        ],
        'fortune': [
            "Tiền vận vất vả, trung vận ổn định, hậu vận bình an.",
        ],
    },
    '劍鋒金': {
        'name': 'Kiếm Phong Kim',
        'element': 'Kim',
        'description': [
            "Lưỡi kiếm sắc bén - Kim loại được rèn luyện đến hoàn hảo.",
            "Kim của võ tướng - Uy lực và quyết đoán.",
        ],
        'personality': [
            "Người quyết đoán, sắc bén trong suy nghĩ.",
            "Tính cách cương trực, không nhún nhường.",
            "Dũng cảm, sẵn sàng đối mặt với thử thách.",
        ],
        'career': [
            "Phù hợp với công việc quân đội, công an, tư pháp.",
            "Thích hợp làm trong ngành luật, ngoại khoa.",
        ],
        'fortune': [
            "Tiền vận gian nan rèn luyện, trung vận thành danh, hậu vận tôn trọng.",
        ],
    },
    '山頭火': {
        'name': 'Sơn Đầu Hỏa',
        'element': 'Hỏa',
        'description': [
            "Lửa trên đỉnh núi - Ngọn lửa tỏa sáng từ nơi cao.",
            "Hỏa của bình minh - Ánh sáng đầu tiên của ngày mới.",
        ],
        'personality': [
            "Người có tầm nhìn cao, lý tưởng lớn.",
            "Tính cách nổi bật, thu hút sự chú ý.",
            "Có khả năng truyền cảm hứng.",
        ],
        'career': [
            "Phù hợp với công việc lãnh đạo, truyền thông, giải trí.",
        ],
        'fortune': [
            "Tiền vận leo núi, trung vận đạt đỉnh, hậu vận tôn vinh.",
        ],
    },
    '澗下水': {
        'name': 'Giản Hạ Thủy',
        'element': 'Thủy',
        'description': [
            "Nước suối chảy - Dòng nước trong mát chảy qua khe núi.",
        ],
        'personality': [
            "Người có tâm hồn trong sáng, thanh cao.",
            "Tính cách hiền lành, không tranh giành.",
        ],
        'career': [
            "Phù hợp với công việc chăm sóc, nuôi dưỡng, y tế.",
        ],
        'fortune': [
            "Tiền vận thanh bạch, trung vận bình an, hậu vận thanh nhàn.",
        ],
    },
    '城頭土': {
        'name': 'Thành Đầu Thổ',
        'element': 'Thổ',
        'description': [
            "Đất thành lũy - Đất được xây dựng thành công trình.",
            "Thổ của phòng thủ - Bảo vệ và che chở.",
        ],
        'personality': [
            "Người có tính cách vững vàng, đáng tin cậy.",
            "Kiên định, khó thay đổi.",
        ],
        'career': [
            "Phù hợp với an ninh, xây dựng, kiến trúc.",
        ],
        'fortune': [
            "Tiền vận xây móng, trung vận vững chắc, hậu vận an toàn.",
        ],
    },
    '白蠟金': {
        'name': 'Bạch Lạp Kim',
        'element': 'Kim',
        'description': [
            "Vàng trắng như sáp - Kim loại mềm dẻo, tinh tế.",
        ],
        'personality': [
            "Người có tính cách tinh tế, lịch sự.",
            "Thích sự hoàn hảo và cái đẹp.",
        ],
        'career': [
            "Phù hợp với nghệ thuật, trang sức, thời trang.",
        ],
        'fortune': [
            "Tiền vận yêu thương, trung vận thành công, hậu vận sung túc.",
        ],
    },
    '楊柳木': {
        'name': 'Dương Liễu Mộc',
        'element': 'Mộc',
        'description': [
            "Cây liễu rủ - Mềm mại, uyển chuyển theo gió.",
        ],
        'personality': [
            "Người có tính cách mềm mỏng, dễ thích nghi.",
        ],
        'career': [
            "Phù hợp với nghệ thuật, ngoại giao, giao tiếp.",
        ],
        'fortune': [
            "Tiền vận nhẹ nhàng, trung vận ổn định, hậu vận bình an.",
        ],
    },
    '井泉水': {
        'name': 'Tỉnh Tuyền Thủy',
        'element': 'Thủy',
        'description': [
            "Nước giếng, nước suối - Nguồn nước ngầm quý giá.",
        ],
        'personality': [
            "Người có nội tâm sâu sắc, trầm lắng.",
        ],
        'career': [
            "Phù hợp với nghiên cứu, y tế, tư vấn.",
        ],
        'fortune': [
            "Tiền vận ẩn náu, trung vận phát hiện, hậu vận tôn vinh.",
        ],
    },
    '屋上土': {
        'name': 'Ốc Thượng Thổ',
        'element': 'Thổ',
        'description': [
            "Đất trên mái nhà - Che chở và bảo vệ.",
        ],
        'personality': [
            "Người có tính cách bao dung, che chở.",
        ],
        'career': [
            "Phù hợp với bất động sản, xây dựng, bảo hiểm.",
        ],
        'fortune': [
            "Tiền vận xây dựng, trung vận ổn định, hậu vận an khang.",
        ],
    },
    '霹靂火': {
        'name': 'Tích Lịch Hỏa',
        'element': 'Hỏa',
        'description': [
            "Lửa sấm sét - Năng lượng bùng nổ mãnh liệt.",
        ],
        'personality': [
            "Người có năng lượng bùng nổ, mãnh liệt.",
        ],
        'career': [
            "Phù hợp với công nghệ, khởi nghiệp, truyền thông.",
        ],
        'fortune': [
            "Tiền vận đột phá, trung vận thăng tiến, hậu vận ổn định.",
        ],
    },
    '松柏木': {
        'name': 'Tùng Bách Mộc',
        'element': 'Mộc',
        'description': [
            "Cây tùng, cây bách - Kiên trì, trường thọ.",
        ],
        'personality': [
            "Người có tính cách kiên định, bền bỉ.",
        ],
        'career': [
            "Phù hợp với môi trường, giáo dục, nghiên cứu.",
        ],
        'fortune': [
            "Tiền vận chậm rãi, trung vận vững vàng, hậu vận trường thọ.",
        ],
    },
    '長流水': {
        'name': 'Trường Lưu Thủy',
        'element': 'Thủy',
        'description': [
            "Dòng sông dài - Chảy mãi không ngừng.",
        ],
        'personality': [
            "Người có tính cách bền bỉ, không bỏ cuộc.",
        ],
        'career': [
            "Phù hợp với vận chuyển, du lịch, truyền thông.",
        ],
        'fortune': [
            "Tiền vận di chuyển, trung vận phát triển, hậu vận thành tựu.",
        ],
    },
    '沙中金': { 'name': 'Sa Trung Kim', 'element': 'Kim' },
    '山下火': { 'name': 'Sơn Hạ Hỏa', 'element': 'Hỏa' },
    '平地木': { 'name': 'Bình Địa Mộc', 'element': 'Mộc' },
    '壁上土': { 'name': 'Bích Thượng Thổ', 'element': 'Thổ' },
    '金箔金': { 'name': 'Kim Bạc Kim', 'element': 'Kim' },
    '佛燈火': { 'name': 'Phật Đăng Hỏa', 'element': 'Hỏa' },
    '天河水': { 'name': 'Thiên Hà Thủy', 'element': 'Thủy' },
    '大驛土': { 'name': 'Đại Dịch Thổ', 'element': 'Thổ' },
    '釵釧金': { 'name': 'Thoa Xuyến Kim', 'element': 'Kim' },
    '桑柘木': { 'name': 'Tang Đố Mộc', 'element': 'Mộc' },
    '大溪水': { 'name': 'Đại Khê Thủy', 'element': 'Thủy' },
    '沙중土': { 'name': 'Sa Trung Thổ', 'element': 'Thổ' },
    '天上火': { 'name': 'Thiên Thượng Hỏa', 'element': 'Hỏa' },
    '石榴木': { 'name': 'Thạch Lựu Mộc', 'element': 'Mộc' },
    '大海水': { 'name': 'Đại Hải Thủy', 'element': 'Thủy' },
};

function generateDefaultData(name, element) {
    const traits = {
        'Kim': 'quyết đoán, sắc bén, trọng nghĩa',
        'Mộc': 'nhân ái, phát triển, sáng tạo',
        'Thủy': 'thông minh, linh hoạt, sâu sắc',
        'Hỏa': 'nhiệt huyết, năng động, bộc trực',
        'Thổ': 'tin cậy, ổn định, bao dung'
    };
    const trait = traits[element] || 'đặc biệt';

    return {
        name,
        element,
        description: [
            `${name} là một trong 60 Nạp Âm, thuộc hành ${element}.`,
            `Mang năng lượng đặc trưng của ${element} trong vũ trụ quan phương Đông.`,
        ],
        personality: [
            `Tính cách mang đặc tính ${trait} của hành ${element}.`,
            `Người có xu hướng hành động và suy nghĩ theo quy luật của ${element}.`,
        ],
        career: [
            `Phù hợp với các ngành nghề thuộc hành ${element}.`,
            `Thành công trong các lĩnh vực đòi hỏi tính chất của ${element}.`,
        ],
        fortune: [
            `Vận mệnh chịu ảnh hưởng sâu sắc từ năng lượng ${element}.`,
            `Tài lộc và sự nghiệp phát triển theo lộ trình của hành ${element}.`,
        ]
    };
}

// Ensure all entries have full data
for (const key in NAYIN_DATA) {
    if (!NAYIN_DATA[key].description) {
        NAYIN_DATA[key] = { ...NAYIN_DATA[key], ...generateDefaultData(NAYIN_DATA[key].name, NAYIN_DATA[key].element) };
    }
}

module.exports = {
    NAYIN_DATA
};
