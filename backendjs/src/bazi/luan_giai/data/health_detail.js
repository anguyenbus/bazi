/**
 * Dữ liệu Sức Khỏe Chi Tiết
 * Tham chiếu từ Python backend.
 */

const HEALTH_BY_ELEMENT = {
    'Mộc': {
        'organs': [
            "Mộc chủ về gan và mật - hai cơ quan quan trọng cho việc lọc độc tố.",
            "Gan là cơ quan trọng yếu của người Mộc, cần được chăm sóc đặc biệt.",
            "Mật và đường mật cũng thuộc hệ Mộc, cần chú ý khi ăn uống.",
            "Gân cốt, xương khớp liên quan đến Mộc, cần tập luyện đều đặn.",
            "Mắt và thị lực cũng thuộc về Mộc, cần bảo vệ.",
        ],
        'diseases': [
            "Đề phòng các bệnh về gan như viêm gan, gan nhiễm mỡ.",
            "Cẩn thận với sỏi mật và các vấn đề đường mật.",
            "Chú ý các bệnh về mắt như cận thị, viễn thị.",
            "Đề phòng các vấn đề về gân cốt như bong gân, viêm gân.",
            "Cẩn thận với stress ảnh hưởng đến gan.",
        ],
        'prevention': [
            "Tránh uống rượu bia quá mức để bảo vệ gan.",
            "Ăn nhiều rau xanh để bổ sung khí Mộc.",
            "Ngủ trước 11 giờ đêm để dưỡng gan.",
            "Kiểm soát cơn giận để tránh tổn thương gan.",
            "Tập yoga và thiền định để cân bằng năng lượng.",
        ],
        'exercises': [
            "Yoga và stretching giúp linh hoạt gân cốt.",
            "Đi bộ trong công viên tốt cho người Mộc.",
            "Bơi lội giúp cân bằng năng lượng.",
            "Thái cực quyền phù hợp với người Mộc.",
            "Tập thể dục nhẹ nhàng vào buổi sáng.",
        ],
    },
    'Hỏa': {
        'organs': [
            "Hỏa chủ về tim và mạch máu - hệ tuần hoàn của cơ thể.",
            "Tim là cơ quan trọng yếu của người Hỏa, cần được bảo vệ.",
            "Ruột non cũng thuộc hệ Hỏa, ảnh hưởng đến tiêu hóa.",
            "Mạch máu và hệ tuần hoàn liên quan đến Hỏa.",
            "Lưỡi và khả năng nói cũng thuộc về Hỏa.",
        ],
        'diseases': [
            "Đề phòng các bệnh về tim mạch như cao huyết áp.",
            "Cẩn thận với các vấn đề về hệ tuần hoàn.",
            "Chú ý đến huyết áp và nhịp tim.",
            "Đề phòng các bệnh về mắt như viêm kết mạc.",
            "Cẩn thận với stress ảnh hưởng đến tim.",
        ],
        'prevention': [
            "Kiểm soát cảm xúc, tránh quá vui hoặc quá buồn.",
            "Ăn thực phẩm tốt cho tim như cá, rau xanh.",
            "Tập thể dục tim mạch đều đặn.",
            "Tránh ăn quá nhiều đồ cay nóng.",
            "Giữ tâm lý ổn định, tránh lo âu.",
        ],
        'exercises': [
            "Bơi lội giúp làm mát cơ thể và tốt cho tim.",
            "Đi bộ nhẹ nhàng tốt cho hệ tim mạch.",
            "Yoga và thiền định giúp giảm stress.",
            "Tập cardio vừa phải để tăng cường tim.",
            "Thể dục nhịp điệu phù hợp với người Hỏa.",
        ],
    },
    'Thổ': {
        'organs': [
            "Thổ chủ về tỳ và vị - hệ tiêu hóa của cơ thể.",
            "Dạ dày là cơ quan trọng yếu của người Thổ.",
            "Lá lách và hệ miễn dịch cũng thuộc hệ Thổ.",
            "Cơ bắp và mô liên kết liên quan đến Thổ.",
            "Môi và khả năng nếm cũng thuộc về Thổ.",
        ],
        'diseases': [
            "Đề phòng các bệnh về dạ dày như viêm loét.",
            "Cẩn thận với tiểu đường và béo phì.",
            "Chú ý đến các vấn đề về tiêu hóa.",
            "Đề phòng các bệnh về lá lách.",
            "Cẩn thận với suy yếu hệ miễn dịch.",
        ],
        'prevention': [
            "Ăn uống điều độ, không quá no hoặc quá đói.",
            "Tránh ăn quá nhiều đồ ngọt.",
            "Kiểm tra đường huyết định kỳ.",
            "Duy trì vận động đều đặn, tránh lười biếng.",
            "Ăn vào giờ cố định mỗi ngày.",
        ],
        'exercises': [
            "Đi bộ sau bữa ăn giúp tiêu hóa.",
            "Thái cực quyền tốt cho người Thổ.",
            "Yoga nhẹ nhàng giúp cải thiện tiêu hóa.",
            "Massage bụng định kỳ.",
            "Tập thể dục vừa phải, không quá sức.",
        ],
    },
    'Kim': {
        'organs': [
            "Kim chủ về phổi và đại tràng - hệ hô hấp và bài tiết.",
            "Phổi là cơ quan trọng yếu của người Kim.",
            "Da và lông cũng thuộc hệ Kim.",
            "Đại tràng liên quan đến Kim, ảnh hưởng đến bài tiết.",
            "Mũi và khả năng ngửi cũng thuộc về Kim.",
        ],
        'diseases': [
            "Đề phòng các bệnh về phổi như viêm phổi, hen suyễn.",
            "Cẩn thận với các vấn đề về đường hô hấp.",
            "Chú ý đến các bệnh về da như dị ứng.",
            "Đề phòng các vấn đề về đại tràng.",
            "Cẩn thận với cảm lạnh và viêm mũi.",
        ],
        'prevention': [
            "Tránh môi trường ô nhiễm, bụi bẩn.",
            "Bỏ thuốc lá nếu có thói quen hút thuốc.",
            "Tập hít thở sâu để tăng cường phổi.",
            "Ăn thực phẩm tốt cho phổi như tỏi, cải.",
            "Giữ ấm cơ thể khi thời tiết lạnh.",
        ],
        'exercises': [
            "Hít thở sâu và tập thở là quan trọng nhất.",
            "Đi bộ ngoài trời tốt cho phổi.",
            "Khí công giúp tăng cường hô hấp.",
            "Bơi lội vừa phải, tránh nước lạnh.",
            "Yoga với các bài tập về thở.",
        ],
    },
    'Thủy': {
        'organs': [
            "Thủy chủ về thận và bàng quang - hệ bài tiết và sinh sản.",
            "Thận là cơ quan trọng yếu của người Thủy.",
            "Xương và tủy cũng thuộc hệ Thủy.",
            "Bàng quang và hệ tiết niệu liên quan đến Thủy.",
            "Tai và thính giác cũng thuộc về Thủy.",
        ],
        'diseases': [
            "Đề phòng các bệnh về thận như suy thận, sỏi thận.",
            "Cẩn thận với các vấn đề về tiết niệu.",
            "Chú ý đến xương khớp như loãng xương.",
            "Đề phòng các vấn đề về thính giác.",
            "Cẩn thận với suy nhược cơ thể.",
        ],
        'prevention': [
            "Uống đủ nước mỗi ngày.",
            "Tránh ăn quá mặn gây hại thận.",
            "Giữ ấm vùng lưng và bàn chân.",
            "Ngâm chân nước ấm trước khi ngủ.",
            "Nghỉ ngơi đủ giấc, không thức khuya.",
        ],
        'exercises': [
            "Bơi lội rất tốt cho người Thủy.",
            "Đi bộ nhẹ nhàng tốt cho xương khớp.",
            "Thiền định giúp cân bằng năng lượng.",
            "Yoga nhẹ nhàng phù hợp.",
            "Tập thể dục dưới nước.",
        ],
    },
};

const HEALTH_BY_AGE_GENDER = {
    'male': {
        'young': [
            "Nam giới trẻ cần chú ý xây dựng thể lực tốt ngay từ bây giờ.",
            "Tránh thói quen xấu như hút thuốc, uống rượu quá mức.",
            "Tập thể dục đều đặn để duy trì sức khỏe.",
            "Giữ chế độ ăn uống cân bằng, đầy đủ dinh dưỡng.",
        ],
        'middle': [
            "Nam giới trung niên cần đặc biệt chú ý tim mạch.",
            "Kiểm tra huyết áp, cholesterol định kỳ.",
            "Duy trì cân nặng hợp lý để tránh béo phì.",
            "Giảm stress bằng thiền định, yoga.",
        ],
        'old': [
            "Nam giới lớn tuổi cần chú ý đặc biệt đến tim mạch.",
            "Kiểm tra tuyến tiền liệt định kỳ.",
            "Duy trì vận động nhẹ nhàng hàng ngày.",
            "Bổ sung canxi và vitamin D cho xương.",
        ],
    },
    'female': {
        'young': [
            "Nữ giới trẻ cần chú ý chu kỳ kinh nguyệt và sức khỏe sinh sản.",
            "Bổ sung sắt và acid folic đầy đủ.",
            "Chăm sóc da và tóc đúng cách.",
            "Tập thể dục đều đặn để duy trì vóc dáng.",
        ],
        'middle': [
            "Nữ giới trung niên cần chú ý đến tiền mãn kinh.",
            "Kiểm tra tuyến vú, tử cung định kỳ.",
            "Bổ sung canxi để phòng loãng xương.",
            "Kiểm soát cân nặng, tránh béo phì.",
        ],
        'old': [
            "Nữ giới lớn tuổi cần đặc biệt chú ý đến loãng xương.",
            "Bổ sung canxi và vitamin D đầy đủ.",
            "Theo dõi triệu chứng mãn kinh.",
            "Kiểm tra tim mạch định kỳ.",
        ],
    },
};

const HEALTH_BY_SEASON = {
    'spring': [
        "Mùa Xuân là thời điểm Mộc khí vượng, cần chú ý gan mật.",
        "Tập thể dục ngoài trời để đón năng lượng mùa Xuân.",
        "Ăn nhiều rau xanh, mầm cây để bổ sung khí Mộc.",
        "Đề phòng dị ứng phấn hoa ở người nhạy cảm.",
    ],
    'summer': [
        "Mùa Hạ là thời điểm Hỏa khí vượng, cần chú ý tim mạch.",
        "Uống đủ nước để tránh mất nước khi trời nóng.",
        "Tránh phơi nắng quá lâu vào giữa trưa.",
        "Ăn nhiều trái cây mát như dưa hấu, dưa leo.",
    ],
    'autumn': [
        "Mùa Thu là thời điểm Kim khí vượng, cần chú ý phổi.",
        "Giữ ấm cơ thể khi thời tiết chuyển mùa.",
        "Ăn thực phẩm dưỡng phổi như lê, táo, mật ong.",
        "Tập hít thở sâu để tăng cường hệ hô hấp.",
    ],
    'winter': [
        "Mùa Đông là thời điểm Thủy khí vượng, cần chú ý thận.",
        "Giữ ấm cơ thể, đặc biệt vùng lưng và bàn chân.",
        "Bổ sung thực phẩm dưỡng thận như đậu đen, mè đen.",
        "Nghỉ ngơi nhiều hơn, đi ngủ sớm hơn.",
    ],
};

module.exports = {
    HEALTH_BY_ELEMENT,
    HEALTH_BY_AGE_GENDER,
    HEALTH_BY_SEASON
};
