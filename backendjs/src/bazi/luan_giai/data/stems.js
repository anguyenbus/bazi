/**
 * Dữ liệu Thiên Can (10 Stems)
 * Tham chiếu từ Python backend.
 */

const GIAP_MOC = {
    'name': ['Giáp Mộc', 'Cây Đại Thụ', 'Mộc Dương', 'Cổ Thụ Giáp'],
    'symbol': [
        'Cây đại thụ, cây cổ thụ sừng sững',
        'Cây tùng bách nghìn năm',
        'Rừng già nguyên sinh',
    ],
    'traits': [
        'Cương trực, chính nghĩa, có khí phách hiên ngang.',
        'Như cây đại thụ, vững chãi và che chở cho người xung quanh.',
        'Tính cách ngay thẳng, đôi khi cứng nhắc.',
        'Có lòng nhân ái, thích giúp đỡ người khác.',
        'Tinh thần tiên phong, dám nghĩ dám làm.',
    ],
    'traits_male': [
        'Nam Giáp Mộc thường là người đàn ông có trách nhiệm, đáng tin cậy.',
        'Người chồng Giáp Mộc thường là trụ cột gia đình, che chở vợ con.',
        'Nam giới Giáp có xu hướng làm lãnh đạo, quản lý.',
    ],
    'traits_female': [
        'Nữ Giáp Mộc thường là người phụ nữ mạnh mẽ, tự lập.',
        'Người vợ Giáp Mộc có tính cách dứt khoát, biết quản lý gia đình.',
        'Nữ giới Giáp thường thành công trong sự nghiệp nhờ bản lĩnh.',
    ],
    'career': [
        'Hợp với quản lý, điều hành, hoặc các vị trí lãnh đạo.',
        'Phù hợp với ngành xây dựng, kiến trúc, bất động sản.',
        'Thích hợp làm doanh nhân, người sáng lập startup.',
    ],
    'health': [
        'Cần chú ý gan, mật, hệ thống xương khớp.',
        'Đề phòng căng thẳng thần kinh, stress mãn tính.',
    ],
    'relationships': [
        'Trong tình yêu, Giáp là người chung thủy và bảo bọc.',
        'Đối với bạn bè, Giáp luôn sẵn sàng giúp đỡ khi cần.',
    ],
};

const AT_MOC = {
    'name': ['Ất Mộc', 'Hoa Thảo Mộc', 'Mộc Âm', 'Cỏ Cây Ất'],
    'symbol': [
        'Cỏ cây hoa lá, dây leo mềm mại',
        'Hoa hồng, hoa lan tao nhã',
        'Cây nho bám víu leo trèo',
    ],
    'traits': [
        'Mềm mại, uyển chuyển, biết thích nghi với hoàn cảnh.',
        'Như dây leo, biết nương tựa và phát triển trong mọi điều kiện.',
        'Tính cách nhẹ nhàng, dễ gần nhưng kiên cường bên trong.',
        'Có khả năng ngoại giao tốt, dễ hòa nhập.',
        'Thông minh, tinh tế, biết cách xử lý tình huống khéo léo.',
    ],
    'traits_male': [
        'Nam Ất Mộc thường là người đàn ông tinh tế, lịch sự.',
        'Người chồng Ất Mộc biết chiều chuộng vợ, gia đình hòa thuận.',
        'Nam giới Ất có khả năng đàm phán, thương lượng tốt.',
    ],
    'traits_female': [
        'Nữ Ất Mộc thường là người phụ nữ dịu dàng, đảm đang.',
        'Người vợ Ất Mộc biết cách làm cho gia đình êm ấm, hạnh phúc.',
        'Nữ giới Ất có duyên dáng tự nhiên, thu hút người khác.',
    ],
    'career': [
        'Hợp với ngành thời trang, thiết kế, mỹ phẩm.',
        'Phù hợp với công việc ngoại giao, quan hệ công chúng.',
        'Thích hợp làm trong ngành y tế, chăm sóc sức khỏe.',
    ],
    'health': [
        'Cần chú ý gân cốt, hệ thần kinh.',
        'Đề phòng các vấn đề về da, dị ứng.',
    ],
    'relationships': [
        'Trong tình yêu, Ất là người lãng mạn và tinh tế.',
        'Đối với bạn bè, Ất biết cách lắng nghe và chia sẻ.',
    ],
};

const BINH_HOA = {
    'name': ['Bính Hỏa', 'Thái Dương', 'Hỏa Dương', 'Mặt Trời Bính'],
    'symbol': [
        'Mặt trời chói lọi, ánh sáng rực rỡ',
        'Ngọn lửa cháy sáng giữa trời',
        'Ánh dương quang chiếu khắp muôn nơi',
    ],
    'traits': [
        'Nhiệt tình, sôi nổi, có sức lan tỏa mạnh mẽ.',
        'Như mặt trời, tỏa sáng và mang lại ấm áp cho xung quanh.',
        'Cởi mở, hào phóng, không giữ điều gì trong lòng.',
        'Có khả năng truyền cảm hứng, động viên người khác.',
        'Đôi khi quá nóng vội, thiếu kiên nhẫn.',
    ],
    'traits_male': [
        'Nam Bính Hỏa thường là người đàn ông hào hoa, phong độ.',
        'Người chồng Bính Hỏa yêu thương gia đình nhưng đôi khi nóng tính.',
        'Nam giới Bính có tham vọng lớn, không chấp nhận cuộc sống tầm thường.',
    ],
    'traits_female': [
        'Nữ Bính Hỏa thường là người phụ nữ nổi bật, thu hút ánh nhìn.',
        'Người vợ Bính Hỏa năng động, không chịu đứng sau chồng.',
        'Nữ giới Bính có cá tính mạnh, biết những gì mình muốn.',
    ],
    'career': [
        'Hợp với ngành truyền thông, giải trí, showbiz.',
        'Phù hợp với công việc diễn thuyết, MC, đào tạo.',
        'Thích hợp làm trong ngành marketing, quảng cáo.',
    ],
    'health': [
        'Cần chú ý tim mạch, huyết áp.',
        'Đề phòng các vấn đề về mắt, thị lực.',
    ],
    'relationships': [
        'Trong tình yêu, Bính là người nồng nhiệt và đam mê.',
        'Đối với bạn bè, Bính là nguồn năng lượng tích cực.',
    ],
};

const DINH_HOA = {
    'name': ['Đinh Hỏa', 'Hỏa Âm', 'Ngọn Đèn', 'Lửa Ấm Đinh'],
    'symbol': [
        'Ngọn đèn dầu, ánh nến lung linh',
        'Ngọn lửa bếp ấm áp gia đình',
        'Sao sáng trên trời đêm',
    ],
    'traits': [
        'Ấm áp, tinh tế, sâu sắc. Có trực giác nhạy bén.',
        'Như ngọn đèn, chiếu sáng vừa đủ và không làm chói mắt.',
        'Giàu tình cảm, hay suy nghĩ, có chiều sâu tâm hồn.',
        'Thích sự yên tĩnh, không ưa ồn ào phô trương.',
        'Có khả năng thấu hiểu tâm lý người khác rất tốt.',
    ],
    'traits_male': [
        'Nam Đinh Hỏa thường là người đàn ông sâu sắc, giàu cảm xúc.',
        'Người chồng Đinh Hỏa ân cần, chu đáo với gia đình.',
        'Nam giới Đinh có tư duy triết học, thích tìm hiểu ý nghĩa cuộc sống.',
    ],
    'traits_female': [
        'Nữ Đinh Hỏa thường là người phụ nữ dịu dàng, quyến rũ.',
        'Người vợ Đinh Hỏa biết cách chăm sóc chồng con tỉ mỉ.',
        'Nữ giới Đinh có trực giác mạnh, khó qua mặt được.',
    ],
    'career': [
        'Hợp với ngành tâm lý, tư vấn, coaching.',
        'Phù hợp với công việc nghiên cứu, phân tích.',
        'Thích hợp làm trong ngành y tế, chăm sóc.',
    ],
    'health': [
        'Cần chú ý ruột non, hệ tiêu hóa.',
        'Đề phòng các vấn đề về giấc ngủ, mất ngủ.',
    ],
    'relationships': [
        'Trong tình yêu, Đinh là người lãng mạn và chu đáo.',
        'Đối với bạn bè, Đinh là người bạn biết lắng nghe.',
    ],
};

const MAU_THO = {
    'name': ['Mậu Thổ', 'Thổ Dương', 'Núi Cao', 'Đất Mậu'],
    'symbol': [
        'Núi cao vững chãi, thành lũy bền vững',
        'Đê điều ngăn nước, công trình kiến trúc',
        'Đất đai rộng lớn, nền móng vững chắc',
    ],
    'traits': [
        'Đáng tin cậy, kiên định, có trách nhiệm cao.',
        'Như núi lớn, không dễ lay chuyển bởi ngoại cảnh.',
        'Trung thực, thẳng thắn, giữ lời hứa như đinh đóng cột.',
        'Có khả năng tổ chức, quản lý tốt.',
        'Đôi khi quá cứng nhắc, chậm thích nghi với thay đổi.',
    ],
    'traits_male': [
        'Nam Mậu Thổ thường là người đàn ông đáng tin cậy, trách nhiệm.',
        'Người chồng Mậu Thổ là trụ cột vững chắc của gia đình.',
        'Nam giới Mậu có tính cách ổn định, không thích mạo hiểm.',
    ],
    'traits_female': [
        'Nữ Mậu Thổ thường là người phụ nữ đảm đang, vững vàng.',
        'Người vợ Mậu Thổ biết cách quản lý tài chính gia đình.',
        'Nữ giới Mậu có tính cách thực tế, không hay mơ mộng.',
    ],
    'career': [
        'Hợp với ngành bất động sản, xây dựng, kiến trúc.',
        'Phù hợp với công việc quản lý, hành chính.',
        'Thích hợp làm trong ngành ngân hàng, tài chính.',
    ],
    'health': [
        'Cần chú ý dạ dày, hệ tiêu hóa.',
        'Đề phòng các vấn đề về béo phì, tiểu đường.',
    ],
    'relationships': [
        'Trong tình yêu, Mậu là người chung thủy và bảo bọc.',
        'Đối với bạn bè, Mậu là chỗ dựa đáng tin cậy.',
    ],
};

const KY_THO = {
    'name': ['Kỷ Thổ', 'Thổ Âm', 'Ruộng Đồng', 'Đất Kỷ'],
    'symbol': [
        'Ruộng đồng phì nhiêu, đất vườn màu mỡ',
        'Đồng bằng trù phú, đất canh tác',
        'Đất mẹ nuôi dưỡng vạn vật',
    ],
    'traits': [
        'Nhân hậu, bao dung, có lòng từ thiện.',
        'Như đất vườn, nuôi dưỡng và chăm sóc mọi thứ xung quanh.',
        'Tính cách ôn hòa, dễ hòa nhập, ít gây xung đột.',
        'Có khả năng điều hòa, làm trung gian hòa giải.',
        'Đôi khi quá lo lắng, hay suy nghĩ nhiều.',
    ],
    'traits_male': [
        'Nam Kỷ Thổ thường là người đàn ông hiền lành, dễ tính.',
        'Người chồng Kỷ Thổ yêu thương gia đình, không thích xung đột.',
        'Nam giới Kỷ có tính cách bình dị, không phô trương.',
    ],
    'traits_female': [
        'Nữ Kỷ Thổ thường là người phụ nữ đảm đang, tận tụy.',
        'Người vợ Kỷ Thổ chăm sóc gia đình hết lòng.',
        'Nữ giới Kỷ có thiên hướng làm công việc từ thiện, xã hội.',
    ],
    'career': [
        'Hợp với ngành nông nghiệp, chăn nuôi.',
        'Phù hợp với công việc y tế, chăm sóc sức khỏe.',
        'Thích hợp làm trong ngành giáo dục, đào tạo.',
    ],
    'health': [
        'Cần chú ý lá lách, hệ miễn dịch.',
        'Đề phòng các vấn đề về tiêu hóa, dạ dày.',
    ],
    'relationships': [
        'Trong tình yêu, Kỷ là người chu đáo và hy sinh.',
        'Đối với bạn bè, Kỷ là người bạn hiền lành, dễ chịu.',
    ],
};

const CANH_KIM = {
    'name': ['Canh Kim', 'Kim Dương', 'Kiếm Báu', 'Kim Loại Canh'],
    'symbol': [
        'Kiếm báu, kim loại thô luyện',
        'Thanh gươm sắc bén, vũ khí lợi hại',
        'Quặng kim loại chưa khai thác',
    ],
    'traits': [
        'Cương quyết, sắc bén, có uy lực. Thẳng thắn.',
        'Như kiếm sắc, có thể bảo vệ hoặc gây tổn thương.',
        'Tính cách dứt khoát, không lưỡng lự khi quyết định.',
        'Có khả năng lãnh đạo mạnh mẽ, uy quyền.',
        'Đôi khi quá cứng rắn, thiếu sự mềm mỏng.',
    ],
    'traits_male': [
        'Nam Canh Kim thường là người đàn ông quyết đoán, có uy.',
        'Người chồng Canh Kim bảo vệ gia đình, không cho phép ai xâm phạm.',
        'Nam giới Canh có tính cách mạnh mẽ, dám nghĩ dám làm.',
    ],
    'traits_female': [
        'Nữ Canh Kim thường là người phụ nữ cá tính, không dễ bắt nạt.',
        'Người vợ Canh Kim có tiếng nói trong gia đình.',
        'Nữ giới Canh thường thành công trong môi trường cạnh tranh.',
    ],
    'career': [
        'Hợp với ngành quân đội, công an, an ninh.',
        'Phù hợp với công việc luật sư, tòa án.',
        'Thích hợp làm trong ngành tài chính, ngân hàng.',
    ],
    'health': [
        'Cần chú ý phổi, đại tràng.',
        'Đề phòng các vấn đề về hô hấp.',
    ],
    'relationships': [
        'Trong tình yêu, Canh là người trung thành và bảo vệ.',
        'Đối với bạn bè, Canh là người đáng tin cậy trong hoạn nạn.',
    ],
};

const TAN_KIM = {
    'name': ['Tân Kim', 'Kim Âm', 'Ngọc Châu', 'Kim Loại Tân'],
    'symbol': [
        'Ngọc châu, trang sức quý giá',
        'Kim cương, đá quý lung linh',
        'Bạc trắng sáng lấp lánh',
    ],
    'traits': [
        'Tinh tế, thanh cao, có óc thẩm mỹ. Yêu cái đẹp.',
        'Như ngọc quý, cần được trân trọng và chăm sóc.',
        'Tính cách lý trí, phân tích mọi việc cẩn thận.',
        'Có khả năng nhìn thấy chi tiết mà người khác bỏ qua.',
        'Đôi khi quá cầu toàn, khó hài lòng.',
    ],
    'traits_male': [
        'Nam Tân Kim thường là người đàn ông lịch lãm, có gu.',
        'Người chồng Tân Kim kỹ tính trong việc nhà.',
        'Nam giới Tân có khiếu thẩm mỹ, biết chọn lựa.',
    ],
    'traits_female': [
        'Nữ Tân Kim thường là người phụ nữ xinh đẹp, thanh lịch.',
        'Người vợ Tân Kim biết cách làm đẹp bản thân và tổ ấm.',
        'Nữ giới Tân có sức hút tự nhiên, thu hút người khác.',
    ],
    'career': [
        'Hợp với ngành thời trang, thiết kế, mỹ phẩm.',
        'Phù hợp với công việc kim hoàn, chế tác.',
        'Thích hợp làm trong ngành tài chính, phân tích.',
    ],
    'health': [
        'Cần chú ý hệ hô hấp, da.',
        'Đề phòng các vấn đề về dị ứng.',
    ],
    'relationships': [
        'Trong tình yêu, Tân là người lãng mạn và tinh tế.',
        'Đối với bạn bè, Tân có phần khó gần nhưng chân thành.',
    ],
};

const NHAM_THUY = {
    'name': ['Nhâm Thủy', 'Thủy Dương', 'Đại Dương', 'Nước Nhâm'],
    'symbol': [
        'Đại dương mênh mông, sông ngòi cuồn cuộn',
        'Biển cả bao la vô tận',
        'Dòng sông lớn chảy xiết',
    ],
    'traits': [
        'Thông minh, năng động, có tầm nhìn rộng.',
        'Như đại dương, chứa đựng vô vàn bí ẩn và khả năng.',
        'Tính cách phóng khoáng, tự do, không thích bị ràng buộc.',
        'Có khả năng thích nghi với mọi hoàn cảnh.',
        'Đôi khi thiếu kiên định, hay thay đổi quyết định.',
    ],
    'traits_male': [
        'Nam Nhâm Thủy thường là người đàn ông thông minh, linh hoạt.',
        'Người chồng Nhâm Thủy có nhiều ý tưởng, không bao giờ nhàm chán.',
        'Nam giới Nhâm có tham vọng lớn, thích chinh phục.',
    ],
    'traits_female': [
        'Nữ Nhâm Thủy thường là người phụ nữ thông minh, năng động.',
        'Người vợ Nhâm Thủy độc lập, không phụ thuộc.',
        'Nữ giới Nhâm có năng lực làm việc xuất sắc.',
    ],
    'career': [
        'Hợp với ngành vận tải, logistics.',
        'Phù hợp với công việc du lịch, khám phá.',
        'Thích hợp làm trong ngành xuất nhập khẩu.',
    ],
    'health': [
        'Cần chú ý thận, bàng quang.',
        'Đề phòng các vấn đề về xương khớp.',
    ],
    'relationships': [
        'Trong tình yêu, Nhâm là người đam mê và nồng nhiệt.',
        'Đối với bạn bè, Nhâm mang lại sự tươi mới.',
    ],
};

const QUY_THUY = {
    'name': ['Quý Thủy', 'Thủy Âm', 'Sương Mù', 'Nước Quý'],
    'symbol': [
        'Nước sương, mưa rơi nhẹ nhàng',
        'Giọt sương mai trên lá',
        'Mưa phùn ướt đẫm',
    ],
    'traits': [
        'Sâu sắc, bền bỉ, hướng nội. Có tư duy logic.',
        'Như giọt sương, nhỏ nhoi nhưng thấm nhuần khắp nơi.',
        'Tính cách trầm lắng, ít nói nhưng khi nói thì sâu sắc.',
        'Có khả năng quan sát và phân tích tuyệt vời.',
        'Đôi khi quá u uẩn, hay suy nghĩ tiêu cực.',
    ],
    'traits_male': [
        'Nam Quý Thủy thường là người đàn ông sâu sắc, trí tuệ.',
        'Người chồng Quý Thủy ít nói nhưng thấu hiểu.',
        'Nam giới Quý có khả năng nghiên cứu, phân tích.',
    ],
    'traits_female': [
        'Nữ Quý Thủy thường là người phụ nữ bí ẩn, quyến rũ.',
        'Người vợ Quý Thủy tinh tế, biết việc.',
        'Nữ giới Quý có trực giác mạnh, khó qua mặt được.',
    ],
    'career': [
        'Hợp với ngành nghiên cứu, phân tích dữ liệu.',
        'Phù hợp với công việc tâm lý, tư vấn.',
        'Thích hợp làm trong ngành công nghệ thông tin.',
    ],
    'health': [
        'Cần chú ý hệ bài tiết, thận.',
        'Đề phòng các vấn đề về tai, thính giác.',
    ],
    'relationships': [
        'Trong tình yêu, Quý là người sâu sắc và trung thành.',
        'Đối với bạn bè, Quý là người bạn tri kỷ.',
    ],
};

const STEM_DATA = {
    '甲': GIAP_MOC,
    '乙': AT_MOC,
    '丙': BINH_HOA,
    '丁': DINH_HOA,
    '戊': MAU_THO,
    '己': KY_THO,
    '庚': CANH_KIM,
    '辛': TAN_KIM,
    '壬': NHAM_THUY,
    '癸': QUY_THUY,
};

module.exports = {
    STEM_DATA
};
