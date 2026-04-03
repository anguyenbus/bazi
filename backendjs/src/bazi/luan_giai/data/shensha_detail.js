/**
 * Dữ liệu Thần Sát (Shen Sha) chi tiết
 */

const THIEN_AT_QUY_NHAN = {
    'name': ['Thiên Ất Quý Nhân', 'Quý Nhân', 'Thiên Ất'],
    'meaning': [
        "Đại cát tinh, gặp nạn có người giúp đỡ, ra ngoài dễ gặp quý nhân đề bạt.",
        "Ngôi sao may mắn bậc nhất, biến hung thành cát, gặp khó có người cứu.",
        "Quý nhân tinh chiếu mệnh, cuộc đời nhiều người quan tâm giúp đỡ.",
    ],
    'effect': [
        "Trong công việc, dễ được cấp trên đề bạt and đồng nghiệp hỗ trợ.",
        "Khi gặp khó khăn, luôn có người xuất hiện giúp đỡ đúng lúc.",
        "Tài lộc đến nhờ sự kết nối with quý nhân.",
    ],
    'advice': [
        "Hãy trân trọng những người đã giúp đỡ mình.",
        "Biết ơn and đền đáp ân tình để phúc lộc bền lâu.",
        "Chủ động kết nối with người có uy tín để phát triển.",
    ],
};

const LOC_THAN = {
    'name': ['Lộc Thần', 'Kiến Lộc', 'Lộc Đường'],
    'meaning': [
        "Kích hoạt tài lộc, có cơ hội tăng thu nhập hoặc nhận được những khoản thưởng bất ngờ.",
        "Sao tài lộc chiếu mệnh, cuộc sống no đủ, không thiếu thốn.",
    ],
    'effect': [
        "Lương bổng ổn định, có thưởng hoặc tăng lương bất ngờ.",
        "Kinh doanh thuận lợi, khách hàng đông đúc.",
    ],
    'advice': [
        "Biết đủ là đủ, không tham lam quá mức.",
        "Chia sẻ phúc lộc để phúc đức bền lâu.",
    ],
};

const VAN_XUONG = {
    'name': ['Văn Xương', 'Văn Xương Quý Nhân', 'Văn Tinh'],
    'meaning': [
        "Kích hoạt học vấn, thi cử, khả năng viết lách and tiếp thu kiến thức.",
        "Sao học hành, thông minh sáng dạ, thi đâu đỗ đấy.",
    ],
    'effect': [
        "Học hành tiến bộ, thi cử đỗ đạt.",
        "Dễ được công nhận trong lĩnh vực học thuật.",
    ],
    'advice': [
        "Đầu tư vào học hành, kiến thức là tài sản vĩnh cửu.",
        "Tham gia các khóa học, hội thảo để mở rộng kiến thức.",
    ],
};

const DAO_HOA = {
    'name': ['Đào Hoa', 'Hàm Trì', 'Đào Hoa Tinh'],
    'meaning': [
        "Kích hoạt duyên dáng, quan hệ xã hội mở rộng, có lợi cho giao tiếp nhưng cần tiết chế.",
        "Sao tình duyên, thu hút người khác bằng vẻ đẹp and sự quyến rũ.",
    ],
    'effect': [
        "Dễ thu hút người khác, có sức hút cá nhân mạnh.",
        "Tình duyên phong phú, nhiều người theo đuổi.",
    ],
    'advice': [
        "Sử dụng sức hút cho mục đích tốt, tránh lạm dụng.",
        "Cẩn thận trong tình cảm, tránh phức tạp hóa.",
    ],
};

const THIEN_HY = {
    'name': ['Thiên Hỷ', 'Hỷ Thần', 'Thiên Hỷ Tinh'],
    'meaning': [
        "Chủ về niềm vui, tin vui, sự kiện hỷ lạc trong cuộc sống.",
        "Sao mang lại niềm vui, tiếng cười and hạnh phúc.",
    ],
    'effect': [
        "Hay nhận được tin vui, sự kiện tốt đẹp.",
        "Gia đình có nhiều niềm vui, lễ lạt.",
    ],
    'advice': [
        "Lan tỏa niềm vui cho người xung quanh.",
        "Biết ơn những điều tốt đẹp trong cuộc sống.",
    ],
};

const DICH_MA = {
    'name': ['Dịch Mã', 'Mã Tinh', 'Dịch Mã Tinh'],
    'meaning': [
        "Kích hoạt sự di chuyển, thay đổi nơi ở, công việc hoặc đi công tác xa.",
        "Sao của sự di chuyển, thay đổi and phát triển.",
    ],
    'effect': [
        "Hay di chuyển, thay đổi nơi ở hoặc công việc.",
        "Có cơ hội làm việc ở nước ngoài.",
    ],
    'advice': [
        "Chuẩn bị kỹ lưỡng trước các chuyến đi xa.",
        "Tận dụng cơ hội ở xa để phát triển.",
    ],
};

const DUONG_NHAN = {
    'name': ['Dương Nhẫn', 'Nhẫn Tinh', 'Dương Nhẫn Tinh'],
    'meaning': [
        "Kích hoạt sự quyết liệt, có thể dẫn đến tranh chấp hoặc thành công đột phá nếu được chế ngự.",
        "Sao của sự cương quyết, sắc bén nhưng cũng nguy hiểm.",
    ],
    'effect': [
        "Tính cách cương quyết, không nhún nhường.",
        "Dễ gặp tranh chấp, xung đột nếu không kiểm soát.",
    ],
    'advice': [
        "Học cách kiềm chế sự cương quyết quá mức.",
        "Cẩn thận trong các hoạt động nguy hiểm.",
    ],
};

const HOA_CAI = {
    'name': ['Hoa Cái', 'Hoa Cái Tinh', 'Cô Thần'],
    'meaning': [
        "Kích hoạt tư duy sáng tạo, nghệ thuật hoặc tâm linh, dễ cảm thấy cô độc.",
        "Sao của sự sáng tạo and cô đơn, nghệ sĩ thường có sao này.",
    ],
    'effect': [
        "Có năng khiếu nghệ thuật, sáng tạo độc đáo.",
        "Thích cô đơn, tách biệt khỏi đám đông.",
    ],
    'advice': [
        "Chấp nhận sự khác biệt của bản thân.",
        "Phát triển năng khiếu nghệ thuật thành sự nghiệp.",
    ],
};

const QUOC_AN = {
    'name': ['Quốc Ấn', 'Quốc Ấn Quý Nhân'],
    'meaning': ["Chủ về quyền lực, địa vị xã hội, sự thanh liêm and chính trực."],
    'effect': ["Dễ được thăng quan tiến chức, có uy tín trong cộng đồng."],
    'advice': ["Giữ vững đạo đức nghề nghiệp, công bằng and chính trực."]
};

const THAI_CUC = {
    'name': ['Thái Cực', 'Thái Cực Quý Nhân'],
    'meaning': ["Chủ về trí tuệ, sự thông thái and có duyên with huyền học, tâm linh."],
    'effect': ["Thích tìm hiểu những điều bí ẩn, có khả năng giác ngộ cao."],
    'advice': ["Phát triển trực giác and khả năng học hỏi tâm linh."]
};

const HOC_DUONG = {
    'name': ['Học Đường', 'Học Tinh'],
    'meaning': ["Chủ về học vấn, sự thông minh and thành công trong thi cử."],
    'effect': ["Học hành hanh thông, kiến thức sâu rộng."],
    'advice': ["Không ngừng học hỏi để nâng cao bản thân."]
};

const THIEN_LA_DIA_VONG = {
    'name': ['Thiên La', 'Địa Võng'],
    'meaning': ["Hung sát chủ về sự bế tắc, ràng buộc and khó khăn pháp lý."],
    'effect': ["Dễ gặp rắc rối with pháp luật, cảm thấy cuộc đời bị kìm kẹp."],
    'advice': ["Làm việc thượng tôn pháp luật, kiên nhẫn vượt khó."]
};

const HONG_LOAN = {
    'name': ['Hồng Loan', 'Hồng Loan Tinh'],
    'meaning': ["Chủ về hôn nhân, hỷ sự, duyên dáng and sự yêu mến từ người khác."],
    'effect': ["Dễ có tin vui về tình cảm, cuộc sống nhiều màu sắc."],
    'advice': ["Mở lòng with các mối quan hệ, trân trọng hạnh phúc hiện tại."]
};

const THIEN_DUC = {
    'name': ['Thiên Đức', 'Thiên Đức Quý Nhân'],
    'meaning': ["Cát thần giải trừ tai ương, bảo bọc and che chở khỏi điềm xấu."],
    'effect': ["Gặp hung hóa cát, công việc thuận lợi nhờ phúc đức."],
    'advice': ["Năng làm việc thiện để bồi đắp thêm phúc khí."]
};

const NGUYET_DUC = {
    'name': ['Nguyệt Đức', 'Nguyệt Đức Quý Nhân'],
    'meaning': ["Cát thần mang tính ôn hòa, giải trừ xung đột and mang lại bình an."],
    'effect': ["Tâm hồn thanh thản, mọi sự hanh thông."],
    'advice': ["Giữ thái độ hòa nhã with mọi người."]
};

const THIEN_Y = {
    'name': ['Thiên Y'],
    'meaning': ["Chủ về sức khỏe, khả năng chữa lành and duyên with y học."],
    'effect': ["Ít ốm đau, nếu có bệnh cũng dễ gặp thầy gặp thuốc."],
    'advice': ["Chú ý chăm sóc sức khỏe, có thể tìm hiểu về đông y, thiền định."]
};

const KIEP_SAT = {
    'name': ['Kiếp Sát'],
    'meaning': ["Hung sát chủ về sự mất mát, tranh giành and tai họa bất ngờ."],
    'effect': ["Dễ bị thị phi, lừa gạt hoặc hao tài."],
    'advice': ["Cẩn trọng trong đầu tư and ký kết giấy tờ."]
};

const VONG_THAN = {
    'name': ['Vong Thần'],
    'meaning': ["Hung sát chủ về sự hao tổn tinh thần, lo lắng and bất an."],
    'effect': ["Dễ cảm thấy bế tắc, tâm trí không tập trung."],
    'advice': ["Dành thời gian nghỉ ngơi, giữ vững tâm lý."]
};

const HONG_DIEM = {
    'name': ['Hồng Diễm', 'Hồng Diễm Sát'],
    'meaning': ["Chủ về sự quyến rũ, đào hoa nhưng dễ dẫn đến rắc rối tình cảm."],
    'effect': ["Thu hút người khác phái mạnh mẽ, dễ có quan hệ phức tạp."],
    'advice': ["Giữ chừng mực trong các mối quan hệ xã giao."]
};

const AM_DUONG_SAI_THO = {
    'name': ['Âm Dương Sai Thố'],
    'meaning': ["Hung sát ảnh hưởng đến quan hệ gia đình, hôn nhân."],
    'effect': ["Dễ xảy ra hiểu lầm, trắc trở with họ hàng bên vợ/chồng."],
    'advice': ["Kiên nhẫn and khéo léo trong giao tiếp gia đình."]
};

const CO_LOAN = {
    'name': ['Cô Loan Sát'],
    'meaning': ["Hung sát chủ về sự cô đơn trong tình cảm, khó tìm được tiếng nói chung."],
    'effect': ["Kết hôn muộn hoặc cảm thấy cô đơn dù đã có đôi."],
    'advice': ["Học cách thấu hiểu and chia sẻ nhiều hơn with bạn đời."]
};

const TAM_KY = {
    'name': ['Tam Kỳ Quý Nhân'],
    'meaning': ["Tổ hợp quý hiếm mang lại trí tuệ siêu việt and thành công lớn."],
    'effect': ["Thông minh tuyệt đỉnh, vạn người có một, hậu vận rực rỡ."],
    'advice': ["Tận dụng tài năng để đóng góp cho xã hội."]
};

const THIEN_TRU = {
    'name': ['Thiên Trù', 'Thiên Trù Quý Nhân'],
    'meaning': ["Chủ về lộc ăn uống, sự no đủ and cuộc sống an nhàn."],
    'effect': ["Luôn có lộc về ẩm thực, cuộc sống không lo thiếu thốn."],
    'advice': ["Sống cởi mở and sẻ chia."]
};

const THIEN_KHO = {
    'name': ['Thiên Khố', 'Địa Khố'],
    'meaning': ["Chủ về tích lũy tài sản, kho tàng and sự giàu có ngầm."],
    'effect': ["Có khả năng giữ tiền tốt, tích lũy được nhiều tài sản."],
    'advice': ["Quản lý tài chính thông minh."]
};

const PHO_HO = {
    'name': ['Phổ Hộ'],
    'meaning': ["Cát thần che chở, mang lại sự bình yên and hóa giải hung hiểm."],
    'effect': ["Vạn sự hanh thông, được quý nhân giúp đỡ."],
    'advice': ["Giữ tâm thiện để hưởng phúc dài lâu."]
};

const THIEN_HINH = {
    'name': ['Thiên Hình'],
    'meaning': ["Hung sát chủ về hình phạt, thương tích and rắc rối pháp luật."],
    'effect': ["Dễ gặp tai nạn hoặc vướng vào kiện tụng."],
    'advice': ["Hết sức cẩn trọng trong hành động and lời nói."]
};

const NGU_QUY = {
    'name': ['Ngũ Quỷ'],
    'meaning': ["Hung sát chủ về sự quấy phá của kẻ tiểu nhân and bất an tinh thần."],
    'effect': ["Dễ bị nói xấu, ám hại sau lưng."],
    'advice': ["Cảnh giác with các mối quan hệ không rõ ràng."]
};

const SHENSHA_DATA = {
    'Thiên Ất': THIEN_AT_QUY_NHAN,
    'Thiên Ất Quý Nhân': THIEN_AT_QUY_NHAN,
    'Quý Nhân': THIEN_AT_QUY_NHAN,
    'Lộc Thần': LOC_THAN,
    'Kiến Lộc': LOC_THAN,
    'Văn Xương': VAN_XUONG,
    'Đào Hoa': DAO_HOA,
    'Hàm Trì': DAO_HOA,
    'Thiên Hỷ': THIEN_HY,
    'Dịch Mã': DICH_MA,
    'Dương Nhẫn': DUONG_NHAN,
    'Hoa Cái': HOA_CAI,
    'Quốc Ấn': QUOC_AN,
    'Thái Cực': THAI_CUC,
    'Học Đường': HOC_DUONG,
    'Thiên La': THIEN_LA_DIA_VONG,
    'Địa Võng': THIEN_LA_DIA_VONG,
    'Hồng Loan': HONG_LOAN,
    'Thiên Đức': THIEN_DUC,
    'Nguyệt Đức': NGUYET_DUC,
    'Thiên Y': THIEN_Y,
    'Kiếp Sát': KIEP_SAT,
    'Vong Thần': VONG_THAN,
    'Hồng Diễm': HONG_DIEM,
    'Âm Dương Sai Thố': AM_DUONG_SAI_THO,
    'Cô Loan Sát': CO_LOAN,
    'Tam Kỳ Quý Nhân': TAM_KY,
    'Kiến': { 'name': ['Kiến'], 'meaning': ['Khởi đầu, xây dựng.'] },
    'Trừ': { 'name': ['Trừ'], 'meaning': ['Loại bỏ cái cũ, giải tỏa bế tắc.'] },
    'Mãn': { 'name': ['Mãn'], 'meaning': ['Đầy đủ, sung túc.'] },
    'Bình': { 'name': ['Bình'], 'meaning': ['Ổn định, hòa bình.'] },
    'Định': { 'name': ['Định'], 'meaning': ['Kiên định, giữ vững lập trường.'] },
    'Chấp': { 'name': ['Chấp'], 'meaning': ['Nắm giữ, quản lý.'] },
    'Phá': { 'name': ['Phá'], 'meaning': ['Thay đổi mạnh mẽ, phá vỡ cái cũ.'] },
    'Nguy': { 'name': ['Nguy'], 'meaning': ['Cần thận trọng, nguy hiểm tiềm tàng.'] },
    'Thành': { 'name': ['Thành'], 'meaning': ['Thành công, hoàn tất.'] },
    'Thâu': { 'name': ['Thâu'], 'meaning': ['Thu gặt, tích lũy.'] },
    'Khai': { 'name': ['Khai'], 'meaning': ['Mở ra cơ hội mới, hanh thông.'] },
    'Bế': { 'name': ['Bế'], 'meaning': ['Đóng kín, bảo tồn, bí mật.'] },
    'Thiên Trù': THIEN_TRU,
    'Thiên Khố': THIEN_KHO,
    'Địa Khố': THIEN_KHO,
    'Phổ Hộ': PHO_HO,
    'Thiên Hình': THIEN_HINH,
    'Ngũ Quỷ': NGU_QUY,
    'Phúc Tinh': { 'name': ['Phúc Tinh'], 'meaning': ['May mắn, phúc lộc từ tổ tiên.'] },
    'Kim Quỹ': { 'name': ['Kim Quỹ'], 'meaning': ['Kho báu, tài lộc dồi dào.'] },
    'Ngọc Đường': { 'name': ['Ngọc Đường'], 'meaning': ['Quý nhân hỗ trợ, danh tiếng.'] },
    'Lưu Hà': { 'name': ['Lưu Hà'], 'meaning': ['Biến động, trôi nổi.'] },
    'Thanh Long': { 'name': ['Thanh Long'], 'meaning': ['Hanh thông, thăng tiến.'] },
    'Từ Quán': { 'name': ['Từ Quán'], 'meaning': ['Thông minh, quan lộ.'] },
    'Học Sĩ': { 'name': ['Học Sĩ'], 'meaning': ['Học thức, nghiên cứu.'] },
    'Thiên Quan': { 'name': ['Thiên Quan'], 'meaning': ['Quyền quý, thăng quan.'] },
    'Thiên Phúc': { 'name': ['Thiên Phúc'], 'meaning': ['Hạnh phúc, an nhàn.'] },
    'Tướng Tinh': { 'name': ['Tướng Tinh'], 'meaning': ['Lãnh đạo, uy quyền.'] },
    'Tai Sát': { 'name': ['Tai Sát'], 'meaning': ["Hung sát chủ về tai ương, bệnh tật."] },
    'Nguyên Thần': { 'name': ['Nguyên Thần'], 'meaning': ["Hao tán tài sản, bất an."] },
    'Thiên Giải': { 'name': ['Thiên Giải'], 'meaning': ["Hóa giải hung hiểm."] },
    'Địa Giải': { 'name': ['Địa Giải'], 'meaning': ["Hóa giải tai ương."] },
    'Huyết Nhẫn': { 'name': ['Huyết Nhẫn'], 'meaning': ["Đề phòng thương tích."] },
    'Thái Tuế': { 'name': ['Thái Tuế'], 'meaning': ["Vận hạn lớn, biến động."] },
    'Thái Dương': { 'name': ['Thái Dương'], 'meaning': ["Công danh, ánh sáng."] },
    'Tang Môn': { 'name': ['Tang Môn'], 'meaning': ["Tin buồn, tang tóc."] },
    'Thái Âm': { 'name': ['Thái Âm'], 'meaning': ["Phúc đức, tài lộc ngầm."] },
    'Quan Phù': { 'name': ['Quan Phù'], 'meaning': ["Kiện tụng, tranh chấp."] },
    'Tử Phù': { 'name': ['Tử Phù'], 'meaning': ["Tiểu hao, xui xẻo."] },
    'Tuế Phá': { 'name': ['Tuế Phá'], 'meaning': ["Đại hao, phá tán."] },
    'Long Đức': { 'name': ['Long Đức'], 'meaning': ["Đức dày, hóa giải."] },
    'Bạch Hổ': { 'name': ['Bạch Hổ'], 'meaning': ["Tai nạn, thị phi."] },
    'Phúc Đức': { 'name': ['Phúc Đức'], 'meaning': ["Phúc lộc, may mắn."] },
    'Điếu Khách': { 'name': ['Điếu Khách'], 'meaning': ["Buồn phiền, tin xấu."] },
    'Trực Phù': { 'name': ['Trực Phù'], 'meaning': ["Bệnh tật, trì trệ."] },
    'Hoạt Diệu': { 'name': ['Hoạt Diệu'], 'meaning': ["Sáng suốt, cơ hội."] },
    'Dân Nhật': { 'name': ['Dân Nhật'], 'meaning': ["Được lòng dân."] },
    'Thời Đức': { 'name': ['Thời Đức'], 'meaning': ["Thuận thời thế."] },
    'Ngọc Vũ': { 'name': ['Ngọc Vũ'], 'meaning': ["Danh tiếng, học vấn."] },
    'Kim Đường': { 'name': ['Kim Đường'], 'meaning': ["Giàu sang, đầy đủ."] },
    'Minh Đường': { 'name': ['Minh Đường'], 'meaning': ["May mắn, sáng sủa."] },
    'Thiên Ân': { 'name': ['Thiên Ân'], 'meaning': ["Ơn trời, bình an."] },
    'Huyền Vũ': { 'name': ['Huyền Vũ'], 'meaning': ["Mờ ám, lừa lọc."] },
    'Chu Tước': { 'name': ['Chu Tước'], 'meaning': ["Thị phi, cãi vã."] },
    'Câu Trận': { 'name': ['Câu Trận'], 'meaning': ["Cản trở, trì trệ."] },
    // === BỔ SUNG 53 SAO CÒN THIẾU ===
    'Cô Thần': { 'name': ['Cô Thần'], 'meaning': ["Cô tịch, cô độc. Nam sợ Cô Thần, nữ sợ Quả Tú."], 'effect': ["Dễ cô đơn, quan hệ xã hội hạn chế."], 'advice': ["Chủ động mở rộng giao thiệp."] },
    'Quả Tú': { 'name': ['Quả Tú'], 'meaning': ["Cô đơn, trắc trở tình duyên."], 'effect': ["Dễ muộn duyên, cảm thấy lẻ loi."], 'advice': ["Kiên nhẫn, đừng vội vàng."] },
    'Kim Dư': { 'name': ['Kim Dư'], 'meaning': ["Sang trọng, may mắn từ vợ/chồng."], 'effect': ["Được hỗ trợ từ bạn đời, cuộc sống sung túc."], 'advice': ["Trân trọng hôn nhân."] },
    'Kình Dương': { 'name': ['Kình Dương'], 'meaning': ["Gây hấn, bạo lực, phẫu thuật."], 'effect': ["Tính nóng nảy, dễ gặp tai nạn."], 'advice': ["Kiềm chế cảm xúc."] },
    'Đà La': { 'name': ['Đà La'], 'meaning': ["Trì trệ, cản trở ngầm."], 'effect': ["Tiểu nhân quấy phá, việc bị đình trệ."], 'advice': ["Cảnh giác người xung quanh."] },
    'Thiên Hỉ': { 'name': ['Thiên Hỉ'], 'meaning': ["Vui vẻ, hôn nhân, tin vui."], 'effect': ["Dễ có tin vui về gia đạo, con cái."], 'advice': ["Đón nhận niềm vui."] },
    'Thiên Quý': { 'name': ['Thiên Quý'], 'meaning': ["Quý nhân từ trời, hanh thông."], 'effect': ["Được giúp đỡ bất ngờ."], 'advice': ["Giữ tâm thiện lành."] },
    'Nguyệt Quý': { 'name': ['Nguyệt Quý'], 'meaning': ["Quý nhân từ trăng."], 'effect': ["May mắn về đêm, phụ nữ giúp đỡ."], 'advice': ["Biết ơn người hỗ trợ."] },
    'Thánh Tâm': { 'name': ['Thánh Tâm'], 'meaning': ["Tấm lòng sáng suốt."], 'effect': ["Tâm hồn bình an, sáng suốt."], 'advice': ["Nuôi dưỡng tâm linh."] },
    'Ngũ Phú': { 'name': ['Ngũ Phú'], 'meaning': ["Năm nguồn tài lộc."], 'effect': ["Kinh doanh phát đạt, đa nguồn thu."], 'advice': ["Đa dạng hóa thu nhập."] },
    'Lộc Mã': { 'name': ['Lộc Mã'], 'meaning': ["Tiền bạc vận động."], 'effect': ["Tài lộc đến nhanh, nên di chuyển."], 'advice': ["Chớp lấy cơ hội."] },
    'Thiên Đức Hợp': { 'name': ['Thiên Đức Hợp'], 'meaning': ["Hợp hóa Thiên Đức."], 'effect': ["Tăng cường phúc khí."], 'advice': ["Làm việc thiện."] },
    'Nguyệt Đức Hợp': { 'name': ['Nguyệt Đức Hợp'], 'meaning': ["Hợp hóa Nguyệt Đức."], 'effect': ["Giải trừ tai hung."], 'advice': ["Giữ hòa khí."] },
    'Thiên Xá': { 'name': ['Thiên Xá'], 'meaning': ["Trời tha thứ, giảm nhẹ tội."], 'effect': ["Gặp nạn được tha, xóa bỏ lỗi lầm."], 'advice': ["Sám hối, làm mới."] },
    'Tứ Phế': { 'name': ['Tứ Phế'], 'meaning': ["Bốn mùa phế khí."], 'effect': ["Công việc đình trệ theo mùa."], 'advice': ["Chọn thời điểm hành động."] },
    'Hoang Vu': { 'name': ['Hoang Vu'], 'meaning': ["Trống rỗng, thất bại."], 'effect': ["Khởi việc không có kết quả."], 'advice': ["Chuẩn bị kỹ trước khi làm."] },
    'Nguyệt Sát': { 'name': ['Nguyệt Sát'], 'meaning': ["Hung sát tháng."], 'effect': ["Gây trở ngại, mệt mỏi."], 'advice': ["Nghỉ ngơi đầy đủ."] },
    'Nguyệt Yếm': { 'name': ['Nguyệt Yếm'], 'meaning': ["Thị phi, tai tiếng."], 'effect': ["Bị nói xấu, đặt điều."], 'advice': ["Ít nói, làm nhiều."] },
    'Nguyệt Hại': { 'name': ['Nguyệt Hại'], 'meaning': ["Bị hại ngầm."], 'effect': ["Tiểu nhân ám hại công việc."], 'advice': ["Bảo mật kế hoạch."] },
    'Nguyệt Phá': { 'name': ['Nguyệt Phá'], 'meaning': ["Phá tán trong tháng."], 'effect': ["Hao tài, xung đột."], 'advice': ["Tránh quyết định lớn."] },
    'Thiên Tặc': { 'name': ['Thiên Tặc'], 'meaning': ["Trộm cắp từ trời."], 'effect': ["Mất mát bất ngờ."], 'advice': ["Bảo vệ tài sản."] },
    'Nguyệt Tặc': { 'name': ['Nguyệt Tặc'], 'meaning': ["Tiểu nhân, mất mát nhỏ."], 'effect': ["Hao tài tiểu tiết."], 'advice': ["Tiết kiệm."] },
    'Thọ Tử': { 'name': ['Thọ Tử'], 'meaning': ["Bất lợi sức khỏe."], 'effect': ["Nguy hiểm, bệnh tật nặng."], 'advice': ["Khám sức khỏe định kỳ."] },
    'Sát Chủ': { 'name': ['Sát Chủ'], 'meaning': ["Đại hung, khởi đầu khó."], 'effect': ["Mọi việc gặp trở ngại."], 'advice': ["Chờ thời cơ tốt."] },
    'Phi Ma Sát': { 'name': ['Phi Ma Sát'], 'meaning': ["Tang chế, lo âu."], 'effect': ["Tin buồn, đám tang."], 'advice': ["Tránh viếng đám tang."] },
    'Hỏa Tai': { 'name': ['Hỏa Tai'], 'meaning': ["Họa từ lửa."], 'effect': ["Nóng nảy, tai nạn hỏa hoạn."], 'advice': ["Cẩn thận với lửa."] },
    'Thiên Hỏa': { 'name': ['Thiên Hỏa'], 'meaning': ["Vận hạn từ trời."], 'effect': ["Sự cố đột ngột, hỏa hoạn."], 'advice': ["Phòng cháy."] },
    'Địa Hỏa': { 'name': ['Địa Hỏa'], 'meaning': ["Tai nạn từ đất."], 'effect': ["Hỏa hoạn, nóng nảy."], 'advice': ["Bình tĩnh xử lý."] },
    'Độc Hỏa': { 'name': ['Độc Hỏa'], 'meaning': ["Cô độc, nóng nảy."], 'effect': ["Dễ bị bỏng, cô đơn."], 'advice': ["Kết nối nhiều hơn."] },
    'Vãng Vong': { 'name': ['Vãng Vong'], 'meaning': ["Đi xa trắc trở."], 'effect': ["Không nên khởi sự lớn."], 'advice': ["Ở nhà ổn định."] },
    'Bát Tọa': { 'name': ['Bát Tọa'], 'meaning': ["Địa vị cao sang."], 'effect': ["Có quyền có thế."], 'advice': ["Dùng quyền lực đúng đắn."] },
    'Phục Tội': { 'name': ['Phục Tội'], 'meaning': ["Lỗi lầm cũ."], 'effect': ["Sai lầm quá khứ tái hiện."], 'advice': ["Sửa chữa, sám hối."] },
    'Hà Khôi': { 'name': ['Hà Khôi'], 'meaning': ["Tài năng dẫn đầu."], 'effect': ["Xuất chúng nhưng dễ bị đố kỵ."], 'advice': ["Khiêm tốn."] },
    'Thiên Lao': { 'name': ['Thiên Lao'], 'meaning': ["Bế tắc tinh thần."], 'effect': ["U uất, bị kìm kẹp."], 'advice': ["Tìm người tâm sự."] },
    'Thiên Ngục': { 'name': ['Thiên Ngục'], 'meaning': ["Rắc rối pháp lý."], 'effect': ["Kiện tụng, giam cầm."], 'advice': ["Tuân thủ pháp luật."] },
    'Địa Phá': { 'name': ['Địa Phá'], 'meaning': ["Hao tổn đất đai."], 'effect': ["Nhà cửa trắc trở."], 'advice': ["Cẩn thận bất động sản."] },
    'Địa Tặc': { 'name': ['Địa Tặc'], 'meaning': ["Mất trộm."], 'effect': ["Tiểu nhân ám hại tài sản."], 'advice': ["Khóa cửa cẩn thận."] },
    'Địa Nang': { 'name': ['Địa Nang'], 'meaning': ["Khó ngăn tai họa."], 'effect': ["Tai nạn bất ngờ."], 'advice': ["Cầu an."] },
    'Giải Thần': { 'name': ['Giải Thần'], 'meaning': ["Hóa giải hung hiểm."], 'effect': ["Gặp nạn tai qua."], 'advice': ["Giữ tâm tốt."] },
    'Thiên Cẩu': { 'name': ['Thiên Cẩu'], 'meaning': ["Tai họa bất ngờ."], 'effect': ["Thương tích, đề phòng động vật."], 'advice': ["Cẩn thận đường đi."] },
    'Câu Giảo': { 'name': ['Câu Giảo'], 'meaning': ["Thị phi, kiện tụng."], 'effect': ["Rắc rối nhỏ, cãi vã."], 'advice': ["Nhường nhịn."] },
    'Phi Nhẫn': { 'name': ['Phi Nhẫn'], 'meaning': ["Tai nạn giao thông."], 'effect': ["Đổ máu, thương tích."], 'advice': ["Lái xe cẩn thận."] },
    'Lục Hại': { 'name': ['Lục Hại'], 'meaning': ["Xui xẻo, bị hại."], 'effect': ["Mọi sự không thuận."], 'advice': ["Kiên nhẫn chờ đợi."] },
    'Mộ Khố': { 'name': ['Mộ Khố'], 'meaning': ["Tích lũy, cất giấu."], 'effect': ["Có thể chôn vùi tài năng."], 'advice': ["Thể hiện bản thân."] },
    'U Vi': { 'name': ['U Vi'], 'meaning': ["Thanh cao, ẩn dật."], 'effect': ["Tài năng kín đáo."], 'advice': ["Không cần phô trương."] },
    'Dịch Thế': { 'name': ['Dịch Thế'], 'meaning': ["Thay đổi thời thế."], 'effect': ["Có duyên với cải cách."], 'advice': ["Đón nhận thay đổi."] },
    'Mẫu Thương': { 'name': ['Mẫu Thương'], 'meaning': ["Lòng mẹ che chở."], 'effect': ["Được mẹ bảo vệ, nhân từ."], 'advice': ["Hiếu thảo."] },
    'Minh Phế': { 'name': ['Minh Phế'], 'meaning': ["Trí tuệ giảm sút."], 'effect': ["Cần nghỉ ngơi, suy nghĩ kém."], 'advice': ["Nghỉ ngơi đầy đủ."] },
    'Tứ Ly': { 'name': ['Tứ Ly'], 'meaning': ["Chia ly, xa cách."], 'effect': ["Trắc trở tình cảm."], 'advice': ["Trân trọng người thân."] },
    'Tứ Tuyệt': { 'name': ['Tứ Tuyệt'], 'meaning': ["Cùng đường, tuyệt lộ."], 'effect': ["Cần tìm hướng mới."], 'advice': ["Đổi mới tư duy."] },
    'Tam Ưu': { 'name': ['Tam Ưu'], 'meaning': ["Ba nỗi lo âu."], 'effect': ["Tinh thần mệt mỏi."], 'advice': ["Thư giãn, thiền định."] },
    'Ích Hậu': { 'name': ['Ích Hậu'], 'meaning': ["Có lợi cho con cái."], 'effect': ["Gia đình hưng thịnh."], 'advice': ["Đầu tư cho con."] },
    'Tục Thế': { 'name': ['Tục Thế'], 'meaning': ["Kế thừa vinh quang."], 'effect': ["Gia tộc phát đạt."], 'advice': ["Giữ gìn truyền thống."] }
};

module.exports = {
    SHENSHA_DATA
};
