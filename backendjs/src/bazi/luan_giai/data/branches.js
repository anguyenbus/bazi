/**
 * Dữ liệu Địa Chi (12 Earthly Branches)
 * Tham chiếu từ Python backend.
 */

const TY_BRANCH = {
    'name': ['Tý', 'Chuột', 'Thủy Chi', 'Tý Thủy'],
    'animal': 'Chuột',
    'element': 'Thủy',
    'personality': [
        "Thông minh, hoạt bát, nhanh nhẹn.",
        "Có óc quan sát tốt, tinh ý.",
        "Thích tích lũy, biết lo xa.",
        "Linh hoạt, biết thích nghi.",
        "Có khả năng sinh tồn mạnh mẽ.",
        "Đôi khi quá cẩn thận, hay lo lắng.",
    ],
    'career': [
        "Phù hợp với công việc cần sự linh hoạt.",
        "Thích hợp làm trong ngành tài chính, đầu tư.",
        "Có năng khiếu kinh doanh, buôn bán.",
        "Hợp với công việc liên quan đến thông tin.",
        "Có thể thành công trong ngành logistics.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Thìn, Thân.",
        "Cần tránh xung khắc với người tuổi Ngọ.",
        "Hợp tác tốt với người tuổi Sửu.",
    ],
    'health': [
        "Cần chú ý thận và hệ tiết niệu.",
        "Đề phòng các vấn đề về tai.",
        "Giữ ấm cơ thể, tránh lạnh.",
    ],
};

const SUU_BRANCH = {
    'name': ['Sửu', 'Trâu', 'Thổ Chi', 'Sửu Thổ'],
    'animal': 'Trâu',
    'element': 'Thổ',
    'personality': [
        "Chăm chỉ, cần mẫn, kiên nhẫn.",
        "Đáng tin cậy, trung thành.",
        "Có sức chịu đựng tốt.",
        "Thực tế, không hay mơ mộng.",
        "Có thể cứng đầu, khó thay đổi.",
        "Biết tích lũy, không phung phí.",
    ],
    'career': [
        "Phù hợp với công việc cần sự kiên nhẫn.",
        "Thích hợp làm trong ngành nông nghiệp.",
        "Có năng khiếu quản lý, điều hành.",
        "Hợp với công việc liên quan đến bất động sản.",
        "Có thể thành công trong ngành tài chính.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Tý, Tỵ, Dậu.",
        "Cần tránh xung khắc với người tuổi Mùi.",
        "Hợp tác tốt với người tuổi Tý.",
    ],
    'health': [
        "Cần chú ý dạ dày và lá lách.",
        "Đề phòng các vấn đề về cơ bắp.",
        "Duy trì vận động đều đặn.",
    ],
};

const DAN_BRANCH = {
    'name': ['Dần', 'Hổ', 'Mộc Chi', 'Dần Mộc'],
    'animal': 'Hổ',
    'element': 'Mộc',
    'personality': [
        "Dũng cảm, mạnh mẽ, có uy lực.",
        "Thích tự do, không chịu bị ràng buộc.",
        "Có tư chất lãnh đạo tự nhiên.",
        "Quyết đoán, hành động nhanh.",
        "Có thể nóng nảy, thiếu kiên nhẫn.",
        "Bảo vệ người thân mạnh mẽ.",
    ],
    'career': [
        "Phù hợp với vị trí lãnh đạo, quản lý.",
        "Thích hợp làm trong ngành quân đội, công an.",
        "Có năng khiếu trong lĩnh vực thể thao.",
        "Hợp với công việc đòi hỏi sự dũng cảm.",
        "Có thể thành công trong ngành kinh doanh.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Ngọ, Tuất.",
        "Cần tránh xung khắc với người tuổi Thân.",
        "Hợp tác tốt với người tuổi Hợi.",
    ],
    'health': [
        "Cần chú ý gan và mật.",
        "Đề phòng các vấn đề về gân cốt.",
        "Tránh uống rượu bia quá mức.",
    ],
};

const MAO_BRANCH = {
    'name': ['Mão', 'Mèo/Thỏ', 'Mộc Chi', 'Mão Mộc'],
    'animal': 'Mèo/Thỏ',
    'element': 'Mộc',
    'personality': [
        "Dịu dàng, tao nhã, thanh lịch.",
        "Thông minh, nhanh nhẹn.",
        "Có óc thẩm mỹ cao.",
        "Khéo léo trong giao tiếp.",
        "Có thể nhút nhát, thiếu quyết đoán.",
        "Yêu cái đẹp và hòa bình.",
    ],
    'career': [
        "Phù hợp với công việc cần sự tinh tế.",
        "Thích hợp làm trong ngành thời trang, thiết kế.",
        "Có năng khiếu trong lĩnh vực nghệ thuật.",
        "Hợp với công việc liên quan đến ngoại giao.",
        "Có thể thành công trong ngành truyền thông.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Hợi, Mùi.",
        "Cần tránh xung khắc với người tuổi Dậu.",
        "Hợp tác tốt với người tuổi Tuất.",
    ],
    'health': [
        "Cần chú ý gân cốt và xương khớp.",
        "Đề phòng các vấn đề về thần kinh.",
        "Tập yoga để thư giãn.",
    ],
};

const THIN_BRANCH = {
    'name': ['Thìn', 'Rồng', 'Thổ Chi', 'Thìn Thổ'],
    'animal': 'Rồng',
    'element': 'Thổ',
    'personality': [
        "Oai phong, lẫm liệt, có khí chất vương giả.",
        "Tham vọng lớn, mạnh mẽ.",
        "Có tầm nhìn xa, chiến lược.",
        "Tự tin, không sợ khó khăn.",
        "Có thể kiêu ngạo, tự phụ.",
        "Có sức thu hút mạnh mẽ.",
    ],
    'career': [
        "Phù hợp với vị trí lãnh đạo cao nhất.",
        "Thích hợp làm doanh nhân, CEO.",
        "Có năng khiếu trong lĩnh vực chính trị.",
        "Hợp với công việc sáng tạo, đổi mới.",
        "Có thể thành công trong ngành công nghệ.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Tý, Thân.",
        "Cần tránh xung khắc với người tuổi Tuất.",
        "Hợp tác tốt với người tuổi Dậu.",
    ],
    'health': [
        "Cần chú ý dạ dày và tiêu hóa.",
        "Đề phòng stress và áp lực.",
        "Duy trì cân bằng công việc-cuộc sống.",
    ],
};

const TI_BRANCH = {
    'name': ['Tỵ', 'Rắn', 'Hỏa Chi', 'Tỵ Hỏa'],
    'animal': 'Rắn',
    'element': 'Hỏa',
    'personality': [
        "Thông minh, sâu sắc, bí ẩn.",
        "Có trực giác nhạy bén.",
        "Khéo léo, tinh tế.",
        "Có vẻ lạnh lùng bên ngoài.",
        "Có thể đa nghi, thiếu tin tưởng.",
        "Biết cách tự bảo vệ.",
    ],
    'career': [
        "Phù hợp với công việc cần sự tinh tế.",
        "Thích hợp làm trong ngành tài chính, phân tích.",
        "Có năng khiếu trong lĩnh vực nghiên cứu.",
        "Hợp với công việc đòi hỏi sự kiên nhẫn.",
        "Có thể thành công trong ngành tâm lý.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Sửu, Dậu.",
        "Cần tránh xung khắc với người tuổi Hợi.",
        "Hợp tác tốt với người tuổi Thân.",
    ],
    'health': [
        "Cần chú ý tim mạch.",
        "Đề phòng các vấn đề về mắt.",
        "Giữ tâm lý ổn định.",
    ],
};

const NGO_BRANCH = {
    'name': ['Ngọ', 'Ngựa', 'Hỏa Chi', 'Ngọ Hỏa'],
    'animal': 'Ngựa',
    'element': 'Hỏa',
    'personality': [
        "Năng động, nhiệt tình, tự do.",
        "Thích phiêu lưu, khám phá.",
        "Có sức sống mãnh liệt.",
        "Thẳng thắn, không quanh co.",
        "Có thể thiếu kiên nhẫn.",
        "Yêu tự do, ghét ràng buộc.",
    ],
    'career': [
        "Phù hợp với công việc cần sự năng động.",
        "Thích hợp làm trong ngành du lịch.",
        "Có năng khiếu trong lĩnh vực thể thao.",
        "Hợp với công việc đòi hỏi di chuyển.",
        "Có thể thành công trong ngành vận tải.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Dần, Tuất.",
        "Cần tránh xung khắc với người tuổi Tý.",
        "Hợp tác tốt với người tuổi Mùi.",
    ],
    'health': [
        "Cần chú ý tim và hệ tuần hoàn.",
        "Đề phòng các chấn thương vận động.",
        "Giữ nhịp độ sống cân bằng.",
    ],
};

const MUI_BRANCH = {
    'name': ['Mùi', 'Dê', 'Thổ Chi', 'Mùi Thổ'],
    'animal': 'Dê',
    'element': 'Thổ',
    'personality': [
        "Hiền lành, nhân hậu, ôn hòa.",
        "Có óc thẩm mỹ, yêu cái đẹp.",
        "Nhạy cảm, giàu tình cảm.",
        "Thích yên bình, tránh xung đột.",
        "Có thể thiếu quyết đoán.",
        "Biết quan tâm người khác.",
    ],
    'career': [
        "Phù hợp với công việc cần sự cảm xúc.",
        "Thích hợp làm trong ngành nghệ thuật.",
        "Có năng khiếu trong lĩnh vực thiết kế.",
        "Hợp với công việc chăm sóc.",
        "Có thể thành công trong ngành giáo dục.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Mão, Hợi.",
        "Cần tránh xung khắc với người tuổi Sửu.",
        "Hợp tác tốt với người tuổi Ngọ.",
    ],
    'health': [
        "Cần chú ý dạ dày và tiêu hóa.",
        "Đề phòng các vấn đề về da.",
        "Giữ tâm lý thoải mái.",
    ],
};

const THAN_BRANCH = {
    'name': ['Thân', 'Khỉ', 'Kim Chi', 'Thân Kim'],
    'animal': 'Khỉ',
    'element': 'Kim',
    'personality': [
        "Thông minh, lanh lợi, nhanh trí.",
        "Linh hoạt, khéo léo.",
        "Có khiếu hài hước.",
        "Thích học hỏi, tìm tòi.",
        "Có thể ranh mãnh, khó nắm bắt.",
        "Giỏi giải quyết vấn đề.",
    ],
    'career': [
        "Phù hợp với công việc cần sự sáng tạo.",
        "Thích hợp làm trong ngành công nghệ.",
        "Có năng khiếu trong lĩnh vực nghiên cứu.",
        "Hợp với công việc đòi hỏi sự linh hoạt.",
        "Có thể thành công trong ngành giải trí.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Tý, Thìn.",
        "Cần tránh xung khắc với người tuổi Dần.",
        "Hợp tác tốt với người tuổi Tỵ.",
    ],
    'health': [
        "Cần chú ý phổi và đường hô hấp.",
        "Đề phòng các chấn thương tay.",
        "Giữ nhịp sống điều độ.",
    ],
};

const DAU_BRANCH = {
    'name': ['Dậu', 'Gà', 'Kim Chi', 'Dậu Kim'],
    'animal': 'Gà',
    'element': 'Kim',
    'personality': [
        "Chăm chỉ, siêng năng, đúng giờ.",
        "Có óc quan sát tốt.",
        "Thẳng thắn, nói thật.",
        "Tự tin, có phong cách riêng.",
        "Có thể cầu toàn, khó tính.",
        "Có gu thẩm mỹ tốt.",
    ],
    'career': [
        "Phù hợp với công việc cần sự tỉ mỉ.",
        "Thích hợp làm trong ngành thời trang.",
        "Có năng khiếu trong lĩnh vực tài chính.",
        "Hợp với công việc đòi hỏi độ chính xác.",
        "Có thể thành công trong ngành truyền thông.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Sửu, Tỵ.",
        "Cần tránh xung khắc với người tuổi Mão.",
        "Hợp tác tốt với người tuổi Thìn.",
    ],
    'health': [
        "Cần chú ý phổi và họng.",
        "Đề phòng các vấn đề về da.",
        "Giữ tinh thần lạc quan.",
    ],
};

const TUAT_BRANCH = {
    'name': ['Tuất', 'Chó', 'Thổ Chi', 'Tuất Thổ'],
    'animal': 'Chó',
    'element': 'Thổ',
    'personality': [
        "Trung thành, đáng tin cậy, thật thà.",
        "Có tinh thần bảo vệ mạnh mẽ.",
        "Công bằng, ghét bất công.",
        "Kiên định với nguyên tắc.",
        "Có thể cứng đầu, lo lắng.",
        "Biết quan tâm người thân.",
    ],
    'career': [
        "Phù hợp với công việc cần sự tin cậy.",
        "Thích hợp làm trong ngành an ninh.",
        "Có năng khiếu trong lĩnh vực luật.",
        "Hợp với công việc bảo vệ.",
        "Có thể thành công trong ngành y tế.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Dần, Ngọ.",
        "Cần tránh xung khắc với người tuổi Thìn.",
        "Hợp tác tốt với người tuổi Mão.",
    ],
    'health': [
        "Cần chú ý dạ dày và tiêu hóa.",
        "Đề phòng các vấn đề về xương.",
        "Giữ tâm lý ổn định.",
    ],
};

const HOI_BRANCH = {
    'name': ['Hợi', 'Lợn', 'Thủy Chi', 'Hợi Thủy'],
    'animal': 'Lợn',
    'element': 'Thủy',
    'personality': [
        "Hiền lành, nhân hậu, dễ chịu.",
        "Thích hưởng thụ, yêu cuộc sống.",
        "Chân thành, không bụng dạ.",
        "Rộng rãi, hào phóng.",
        "Có thể ngây thơ, dễ tin.",
        "Biết tận hưởng cuộc sống.",
    ],
    'career': [
        "Phù hợp với công việc cần sự nhân hậu.",
        "Thích hợp làm trong ngành ẩm thực.",
        "Có năng khiếu trong lĩnh vực từ thiện.",
        "Hợp với công việc chăm sóc.",
        "Có thể thành công trong ngành giải trí.",
    ],
    'relationships': [
        "Trong tình yêu, có duyên với người tuổi Mão, Mùi.",
        "Cần tránh xung khắc với người tuổi Tỵ.",
        "Hợp tác tốt với người tuổi Dần.",
    ],
    'health': [
        "Cần chú ý thận và hệ tiết niệu.",
        "Đề phòng tăng cân.",
        "Duy trì vận động đều đặn.",
    ],
};

const BRANCH_DATA = {
    '子': TY_BRANCH,
    '丑': SUU_BRANCH,
    '寅': DAN_BRANCH,
    '卯': MAO_BRANCH,
    '辰': THIN_BRANCH,
    '巳': TI_BRANCH,
    '午': NGO_BRANCH,
    '未': MUI_BRANCH,
    '申': THAN_BRANCH,
    '酉': DAU_BRANCH,
    '戌': TUAT_BRANCH,
    '亥': HOI_BRANCH,
};

module.exports = {
    BRANCH_DATA
};
