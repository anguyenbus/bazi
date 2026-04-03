/**
 * KHO DỮ LIỆU NGŨ HÀNH CHUYÊN SÂU (HUGE DATABASE)
 * Phiên bản: Ultimate v2.0 (10x Size Update)
 */

// 1. DỮ LIỆU NGHỀ NGHIỆP MỞ RỘNG (Expanded Career Database - 100+ Jobs per Element)
const CAREER_DB = {
    'Kim': {
        title: "Hành Kim - Sự Cứng Rắn, Chính Nghĩa & Tiên Phong",
        keywords: "Quản lý, Kỷ luật, Công nghệ, Tài chính, Quân sự, Luật pháp, Cơ khí",
        jobs: [
            // Quản lý & Lãnh đạo
            "CEO (Giám đốc điều hành)", "COO (Giám đốc vận hành)", "Quản lý dự án cấp cao", "Thành viên Hội đồng quản trị", "Thị trưởng/Quan chức chính phủ",
            // Luật & Chính trị
            "Luật sư tranh tụng", "Thẩm phán", "Kiểm sát viên", "Công chứng viên", "Cố vấn pháp lý doanh nghiệp", "Nhà hoạt động chính trị", "Nhà lập pháp",
            // Tài chính & Ngân hàng
            "Chuyên gia phân tích tài chính", "Kiểm toán viên", "Giám đốc ngân hàng", "Môi giới chứng khoán", "Chuyên gia quản lý rủi ro", "Kế toán trưởng", "Thủ quỹ", "Giao dịch viên ngoại hối (Forex)",
            // Kỹ thuật & Công nghệ
            "Kỹ sư cơ khí", "Kỹ sư ô tô", "Kỹ sư hàng không vũ trụ", "Kỹ sư luyện kim", "Kỹ sư phần cứng máy tính", "Kỹ sư robot", "Chuyên gia an ninh mạng", "Lập trình viên hệ thống nhúng",
            // Y tế (Liên quan đến dao kéo/xương khớp)
            "Bác sĩ phẫu thuật", "Bác sĩ nha khoa", "Bác sĩ chấn thương chỉnh hình", "Kỹ thuật viên châm cứu", "Bác sĩ thẩm mỹ",
            // Quân sự & An ninh
            "Sĩ quan quân đội", "Cảnh sát hình sự", "Vệ sĩ chuyên nghiệp", "Thám tử tư", "Chuyên gia võ thuật", "Giám sát an ninh",
            // Kinh doanh & Sản xuất
            "Kinh doanh vàng bạc đá quý", "Sản xuất/Kinh doanh ô tô xe máy", "Kinh doanh thiết bị máy móc", "Sản xuất đồng hồ/Mắt kính", "Gia công kim loại/Cơ khí chính xác", "Khai thác khoáng sản",
            // Nghệ thuật & Khác
            "Nhạc công (Kèn đồng, Trống)", "Điêu khắc gia (Kim loại/Đá)", "Thợ kim hoàn", "Trọng tài thể thao", "Huấn luyện viên quân sự"
        ],
        advice: "Hành Kim chủ về Nghĩa, sự quyết đoán và trật tự. Bạn phù hợp nhất với các công việc đòi hỏi tư duy logic, tính kỷ luật cao, khả năng ra quyết định lạnh lùng và chính xác. Môi trường cạnh tranh, áp lực cao hoặc cần sự minh bạch là nơi bạn tỏa sáng."
    },
    'Mộc': {
        title: "Hành Mộc - Sự Sáng Tạo, Nhân Văn & Sinh Trưởng",
        keywords: "Giáo dục, Y tế, Văn hóa, Nghệ thuật, Nông nghiệp, Thiết kế, Thời trang",
        jobs: [
            // Giáo dục & Đào tạo
            "Giáo sư/Giảng viên đại học", "Giáo viên mầm non/tiểu học", "Hiệu trưởng", "Chuyên gia đào tạo doanh nghiệp", "Gia sư chuyên nghiệp", "Huấn luyện viên kỹ năng sống",
            // Y tế & Chăm sóc sức khỏe
            "Bác sĩ Đông y", "Dược sĩ/Bào chế thuốc", "Chuyên gia dinh dưỡng", "Điều dưỡng viên", "Bác sĩ thú y", "Nhà trị liệu tâm lý",
            // Văn hóa & Nghệ thuật
            "Nhà văn/Tiểu thuyết gia", "Nhà báo/Phóng viên", "Biên tập viên sách", "Họa sĩ", "Nhà soạn nhạc", "Nhà thiết kế thời trang", "Người mẫu", "Nhiếp ảnh gia thiên nhiên",
            // Thiết kế & Sáng tạo
            "Thiết kế đồ họa", "Thiết kế nội thất", "Kiến trúc sư cảnh quan", "Thiết kế website (UI/UX - phần sáng tạo)", "Giám đốc sáng tạo (Creative Director)", "Chuyên gia cắm hoa (Florist)",
            // Nông Lâm & Sinh học
            "Kỹ sư nông nghiệp", "Nhà sinh vật học", "Kiểm lâm", "Chuyên gia thực vật học", "Chủ trang trại/Farmstay", "Kinh doanh cây cảnh/Bonsai", "Sản xuất đồ gỗ nội thất",
            // Kinh doanh & Dịch vụ
            "Kinh doanh sách/Văn phòng phẩm", "Kinh doanh thời trang/Vải vóc", "Kinh doanh dược phẩm", "Quản lý thư viện", "Chuyên gia nhân sự (HR)", "Hoạt động xã hội/NGO", "Kinh doanh trà đạo/Cà phê"
        ],
        advice: "Hành Mộc chủ về Nhân, sự phát triển và vươn lên. Bạn có thiên phú trong các lĩnh vực nuôi dưỡng con người (giáo dục, y tế), sáng tạo cái đẹp (nghệ thuật, thiết kế) hoặc liên quan đến sự sống (nông nghiệp, sinh học). Hãy chọn môi trường cho phép bạn tự do tư duy và thể hiện lòng trắc ẩn."
    },
    'Thủy': {
        title: "Hành Thủy - Trí Tuệ, Lưu Thông & Biến Hóa",
        keywords: "Thương mại, Giao tiếp, Vận tải, Dịch vụ, Biển cả, Du lịch, Tâm linh",
        jobs: [
            // Thương mại & Kinh doanh
            "Thương nhân quốc tế", "Chuyên gia xuất nhập khẩu", "Đại diện bán hàng (Sales)", "Chuyên gia đàm phán", "Môi giới thương mại", "Chủ chuỗi siêu thị/cửa hàng tiện lợi",
            // Giao tiếp & Ngoại giao
            "Nhà ngoại giao/Đại sứ", "Phiên dịch viên/Biên dịch viên", "Quan hệ công chúng (PR)", "Phóng viên hiện trường", "Chuyên gia tư vấn chiến lược", "Người dẫn chương trình (MC - sự kiện linh hoạt)",
            // Vận tải & Du lịch
            "Thuyền trưởng/Thủy thủ", "Phi công/Tiếp viên hàng không", "Lái xe chuyên nghiệp", "Điều phối viên logistics/Chuỗi cung ứng", "Hướng dẫn viên du lịch", "Quản lý khách sạn/Resort",
            // Công nghệ & Thông tin (Dạng dòng chảy dữ liệu)
            "Kỹ sư phần mềm (Software)", "Chuyên gia phân tích dữ liệu (Data Analyst)", "Quản trị mạng", "Thương mại điện tử (E-commerce)", "Streamer/YouTuber",
            // Dịch vụ & Giải trí
            "Pha chế (Bartender/Barista)", "Kinh doanh đồ uống/Giải khát", "Dịch vụ giặt ủi/Vệ sinh công nghiệp", "Nuôi trồng/Kinh doanh thủy hải sản", "Vận động viên bơi lội",
            // Tâm linh & Trí tuệ
            "Thám tử tư", "Điệp viên/Tình báo", "Nhà nghiên cứu thị trường", "Triết gia", "Giáo viên dạy toán/Lý"
        ],
        advice: "Hành Thủy chủ về Trí, sự linh hoạt và thâm trầm. Bạn cực kỳ phù hợp với các công việc đòi hỏi sự di chuyển, giao tiếp rộng, tư duy chiến lược sâu sắc hoặc khả năng thích ứng nhanh. Đừng tự trói mình vào một môi trường quá tĩnh lặng hay gò bó."
    },
    'Hỏa': {
        title: "Hành Hỏa - Nhiệt Huyết, Tỏa Sáng & Văn Minh",
        keywords: "Năng lượng, Giải trí, Công nghệ cao, Ẩm thực, Truyền thông, Tâm linh",
        jobs: [
            // Nghệ thuật & Giải trí
            "Diễn viên điện ảnh/Kịch nói", "Ca sĩ/Ca sĩ Opera", "Đạo diễn phim/Sân khấu", "Nhà sản xuất chương trình", "Người nổi tiếng (KOL/Influencer)", "Vũ công",
            // Truyền thông & Quảng cáo
            "Chuyên gia Marketing/Thương hiệu", "Copywriter sáng tạo", "Giám đốc truyền thông", "Chuyên gia tổ chức sự kiện", "Nhà diễn thuyết/Speaker",
            // Công nghệ & Kỹ thuật cao (Điện/Quang)
            "Kỹ sư điện/Điện tử", "Kỹ sư viễn thông/Internet", "Chuyên gia về AI/Robot (phần trí tuệ)", "Kỹ thuật viên X-Quang/Laser", "Lập trình game",
            // Ẩm thực & Dịch vụ
            "Đầu bếp chuyên nghiệp", "Chuyên gia phê bình ẩm thực", "Kinh doanh nhà hàng/Quán ăn", "Sản xuất thực phẩm chế biến", "Dịch vụ làm đẹp/Spa/Thẩm mỹ",
            // Năng lượng & Hóa học
            "Kỹ sư hóa dầu/Xăng dầu", "Kỹ sư năng lượng mặt trời/Điện", "Lính cứu hỏa", "Sản xuất thuốc nổ/Pháo hoa", "Công nghiệp luyện kim (lò nung)",
            // Tâm linh & Tôn giáo
            "Nhà truyền giáo", "Chuyên gia tâm lý học", "Thầy bói/Tử vi (soi đường)", "Nhà hoạt động xã hội nhiệt huyết"
        ],
        advice: "Hành Hỏa chủ về Lễ, sự nhiệt tình và hư danh (tiếng tăm). Bạn sinh ra để tỏa sáng và truyền cảm hứng. Hãy chọn những nghề nghiệp cho phép bạn đứng trước đám đông, thể hiện cái tôi, sử dụng công nghệ tiên tiến hoặc mang lại hơi ấm/ánh sáng cho người khác."
    },
    'Thổ': {
        title: "Hành Thổ - Sự Ổn Định, Nuôi Dưỡng & Tín Nghĩa",
        keywords: "Bất động sản, Xây dựng, Quản trị, Nông nghiệp, Lưu trữ, Tôn giáo, Bảo hiểm",
        jobs: [
            // Bất động sản & Xây dựng
            "Nhà đầu tư bất động sản", "Môi giới nhà đất", "Kỹ sư xây dựng dân dụng", "Kiến trúc sư công trình", "Quy hoạch đô thị", "Kinh doanh vật liệu xây dựng (Gạch, đá, xi măng)",
            // Quản trị & Hành chính
            "Quản lý kho bãi/Lưu trữ", "Thư ký/Trợ lý hành chính", "Quản trị nhân sự (C&B - Lương thưởng)", "Kế toán tổng hợp", "Bảo vệ/An ninh tòa nhà",
            // Nông nghiệp & Tài nguyên
            "Chủ đồn điền/Trang trại chăn nuôi", "Kỹ sư địa chất/Thổ nhưỡng", "Khai thác đá quý/Than đá", "Sản xuất gốm sứ/Thủy tinh", "Kinh doanh nông sản thực phẩm",
            // Dịch vụ & Bảo đảm
            "Đại lý bảo hiểm", "Cố vấn tài chính cá nhân", "Dịch vụ tang lễ", "Chuyên gia phong thủy (Địa lý)", "Dịch vụ san lấp mặt bằng",
            // Luật & Tôn giáo
            "Luật sư tư vấn (Soạn thảo hợp đồng)", "Tu sĩ/Nhà sư", "Nhà từ thiện", "Quản lý di sản/Bảo tàng", "Thủ thư"
        ],
        advice: "Hành Thổ chủ về Tín, sự bao dung và ổn định. Bạn là điểm tựa vững chắc cho tập thể. Hãy hướng tới các công việc mang tính chất tích lũy, xây dựng nền tảng, quản lý tài sản hoặc liên quan trực tiếp đến đất đai, sự nuôi dưỡng."
    }
};

// 2. DỮ LIỆU SỨC KHỎE ĐÔNG Y CHUYÊN SÂU (TCM Ultimate Health DB)
const HEALTH_DB = {
    'Kim': {
        organs: "Hệ Hô Hấp (Phổi, Khí quản), Hệ Tiêu Hóa dưới I (Đại tràng), Da liễu, Khứu giác (Mũi).",
        symptoms: "Dễ mắc cảm cúm, ho khan, viêm xoang, viêm mũi dị ứng. Da dẻ khô, dễ bị nám hoặc mụn nhọt do phế nhiệt. Tiêu hóa kém, dễ táo bón hoặc viêm đại tràng. Đau mỏi vai gáy do tà khí xâm nhập.",
        psychology: "Xu hướng u buồn, bi quan, hay lo nghĩ về quá khứ, cô độc. Dễ bị stress do áp lực tự tạo ra.",
        nutrition: "Nên ăn thực phẩm màu TRẮNG: Củ cải trắng, Lê, Nấm tuyết, Hành tây, Tỏi, Sữa chua, Yến mạch. Tránh đồ cay nóng quá mức làm tổn thương Phế âm.",
        lifestyle: "Tập hít thở sâu (Khí công/Yoga) là quan trọng nhất để dưỡng Phổi. Tránh khói thuốc và môi trường ô nhiễm. Giữ ấm cổ ngực."
    },
    'Mộc': {
        organs: "Hệ Bài Tiết (Gan), Mật, Hệ Thần Kinh, Mắt, Gân cơ, Móng tay/chân.",
        symptoms: "Hay đau đầu, chóng mặt, hoa mắt. Rối loạn giấc ngủ, mất ngủ kinh niên. Đau mỏi gân cơ, chuột rút, tê bì chân tay. Chức năng gan kém, men gan cao, vàng da. Dễ bị các bệnh về mắt (cận thị, khô mắt).",
        psychology: "Dễ nóng giận, cáu gắt, bực bội (Can khí uất kết). Tính khí thất thường, dễ bị kích động hoặc trầm uất.",
        nutrition: "Nên ăn thực phẩm màu XANH: Súp lơ xanh, Cải bó xôi, Rau cần, Mướp đắng, Táo xanh, Trà xanh. Hạn chế rượu bia, đồ chiên rán dầu mỡ hại Gan.",
        lifestyle: "Ngủ trước 11h đêm để Gan thải độc. Tập thể dục điều độ (đi bộ, dưỡng sinh) để thư giãn gân cốt. Học cách kiềm chế cơn giận."
    },
    'Thủy': {
        organs: "Hệ Tiết Niệu (Thận, Bàng quang), Hệ Sinh Dục, Thính giác (Tai), Xương tủy, Tóc.",
        symptoms: "Đau lưng mỏi gối, tiểu đêm, tiểu rắt. Ù tai, thính lực giảm. Tóc bạc sớm, rụng tóc. Chân tay lạnh, sợ lạnh. Yếu sinh lý, rối loạn kinh nguyệt. Trí nhớ giảm sút.",
        psychology: "Hay lo sợ vô cớ (Thận tàng Chí - lo sợ hại Thận), thiếu ý chí, hay do dự, thiếu quyết đoán. Dễ rơi vào trạng thái hoảng loạn.",
        nutrition: "Nên ăn thực phẩm màu ĐEN: Đậu đen, Mè đen, Gạo lứt đen, Rong biển, Mộc nhĩ, Hải sản (Hàu, tôm). Uống đủ nước.",
        lifestyle: "Giữ ấm vùng thắt lưng và bàn chân. Ngâm chân nước ấm trước khi ngủ. Tránh sinh hoạt tình dục quá độ. Tài liệu Đông y khuyên nên tập 'Nạp thận khí'."
    },
    'Hỏa': {
        organs: "Hệ Tuần Hoàn (Tim, Mạch máu), Ruột non, Lưỡi, Thần minh (Tâm trí).",
        symptoms: "Tim đập nhanh, hồi hộp, đánh trống ngực. Cao huyết áp hoặc huyết áp thấp. Mất ngủ, hay mơ, ngủ không sâu. Nhiệt miệng, lở loét lưỡi. Mặt hay đỏ bừng hoặc tái nhợt.",
        psychology: "Dễ hưng phấn quá độ hoặc cười nói huyên thuyên (Tâm tàng Thần). Khi mất cân bằng dễ sinh ra cuồng loạn hoặc uất ức, thiếu kiên nhẫn.",
        nutrition: "Nên ăn thực phẩm màu ĐỎ: Cà chua, Dưa hấu, Táo đỏ, Đậu đỏ, Cà rốt, Tim heo. Tránh ăn quá mặn hại Tim.",
        lifestyle: "Tập Thiền định để an thần, tĩnh tâm. Tránh làm việc căng thẳng quá sức. Không nên tắm nước quá lạnh đột ngột. Duy trì niềm vui nhẹ nhàng."
    },
    'Thổ': {
        organs: "Hệ Tiêu Hóa trên (Dạ dày, Lá lách), Miệng, Cơ bắp, Mỡ dưới da.",
        symptoms: "Đầy bụng, khó tiêu, ợ hơi, trào ngược dạ dày. Viêm loét dạ dày tá tràng. Chán ăn hoặc thèm ăn vô độ. Cơ thể nặng nề, lười vận động, béo phì hoặc suy dinh dưỡng. Cơ bắp nhão.",
        psychology: "Hay lo âu, suy nghĩ quẩn quanh (Tỳ tàng Ý). Dễ bị ám ảnh bởi các chi tiết nhỏ, khó buông bỏ suy nghĩ.",
        nutrition: "Nên ăn thực phẩm màu VÀNG/CAM: Bí ngô, Khoai lang, Ngô, Đu đủ, Cam, Gừng, Mật ong. Ăn chín uống sôi, hạn chế đồ sống lạnh.",
        lifestyle: "Ăn uống đúng giờ, nhai kỹ no lâu. Tránh vừa ăn vừa làm việc. Tập các bài tập tăng cường cơ bắp nhẹ nhàng. Giữ môi trường sống khô ráo."
    }
};

// 3. LUẬN GIẢI CHUYÊN SÂU CÁCH CỤC (Structure Deep Analysis)
const STRUCTURE_ANALYSIS = {
    // A. NỘI CÁCH (Normal Structures)
    'Chính Quan Cách': {
        desc: "Cách cục của người quân tử, trọng danh dự và nề nếp. Quan tinh đại diện cho luật pháp, cấp trên, quy tắc.",
        strengths: "Chính trực, liêm khiết, có trách nhiệm cao, năng lực quản lý tốt, được mọi người kính trọng.",
        weaknesses: "Dễ bảo thủ, cứng nhắc, thiếu sự linh hoạt, đôi khi quá câu nệ hình thức.",
        success_key: "Dùng Ấn để hộ Quan (Quan Ấn tương sinh) sẽ có quyền lực thực sự. Dùng Tài để sinh Quan sẽ phú quý song toàn."
    },
    'Thất Sát Cách': {
        desc: "Cách cục của người hùng, tướng quân. Thất Sát là lực lượng khắc thân mạnh mẽ, đại diện cho quyền uy và sự sát phạt.",
        strengths: "Quyết đoán, dũng cảm, dám nghĩ dám làm, có khí chất uy nghiêm, thích hợp thời loạn hoặc sóng gió.",
        weaknesses: "Tính tình nóng nảy, độc đoán, dễ gây thù chuốc oán, cuộc đời nhiều thăng trầm biến động.",
        success_key: "Cần Thực Thần để chế Sát (hóa thành Quyền) hoặc dùng Ấn để hóa giải (Sát Ấn tương sinh). Kỵ nhất là Tài sinh Sát vượng mà không có chế hóa."
    },
    'Chính Tài Cách': {
        desc: "Cách cục của người quản lý tài sản, thực tế và cần cù. Chính Tài đại diện cho tiền lương, tài sản tích lũy chính đáng.",
        strengths: "Cần cù, tiết kiệm, biết quý trọng đồng tiền, đáng tin cậy, chung thủy trong tình cảm.",
        weaknesses: "Dễ trở nên keo kiệt, tính toán chi li, thiếu tầm nhìn xa, quá coi trọng vật chất.",
        success_key: "Cần Thân vượng để gánh Tài. Dùng Quan để bảo vệ Tài (Tài vượng sinh Quan). Kỵ Tỷ Kiếp cướp Tài."
    },
    'Thiên Tài Cách': {
        desc: "Cách cục của doanh nhân, hào sảng và mạo hiểm. Thiên Tài đại diện cho tiền thưởng, trúng số, đầu tư mạo hiểm.",
        strengths: "Hào phóng, giao thiệp rộng, nhạy bén với cơ hội kinh doanh, có khả năng kiếm tiền nhanh.",
        weaknesses: "Tiêu xài hoang phí, tình cảm phong lưu đa đoan, cuộc sống thiếu ổn định.",
        success_key: "Cần Thân vượng. Dùng Thực Thương để sinh Tài. Biết dừng đúng lúc để bảo toàn tài sản."
    },
    'Thực Thần Cách': {
        desc: "Cách cục của nghệ sĩ, người có phúc khí. Thực Thần đại diện cho sự sáng tạo, hưởng thụ, ăn uống.",
        strengths: "Thông minh, ôn hòa, rộng lượng, có gu thẩm mỹ tốt, cuộc đời an nhàn, ít sóng gió.",
        weaknesses: "Dễ lười biếng, thiếu ý chí phấn đấu mãnh liệt, đôi khi quá nuông chiều bản thân.",
        success_key: "Dùng Tài để phát phúc (Thực Thần sinh Tài). Tránh gặp Kiêu Thần (Thiên Ấn) vì sẽ bị 'Kiêu thần đoạt thực' (mất cơm, mất phúc)."
    },
    'Thương Quan Cách': {
        desc: "Cách cục của nhân tài kiệt xuất nhưng kiêu ngạo. Thương Quan đại diện cho sự nổi loạn, tài năng vượt trội, chống đối.",
        strengths: "Thông minh tuyệt đỉnh, đa tài đa nghệ, tư duy đột phá, không chịu khuất phục.",
        weaknesses: "Kiêu căng, tự phụ, hay chê bai người khác, dễ phạm pháp hoặc gây thị phi, hôn nhân trắc trở.",
        success_key: "Cần Ấn chế Thương (Thương quan bội Ấn) để điều hướng tài năng vào việc chính nghĩa. Hoặc dùng Tài để xì hơi Thương Quan (Thương quan sinh Tài)."
    },
    'Chính Ấn Cách': {
        desc: "Cách cục của học giả, người mẹ hiền. Ấn tinh đại diện cho học vấn, danh tiếng, sự che chở.",
        strengths: "Thông minh, hiếu học, nhân từ, trọng danh dự, được quý nhân phù trợ, cuộc đời êm ả.",
        weaknesses: "Dễ ỷ lại, thiếu thực tế, đôi khi quá thanh cao xa rời quần chúng, chậm chạp trong kinh doanh.",
        success_key: "Cần Quan Sát để sinh Ấn (Quan Ấn song toàn). Kỵ Tài tinh phá Ấn (mất danh dự, học hành dở dang)."
    },
    'Thiên Ấn Cách': {
        desc: "Cách cục của kỳ tài, người nghiên cứu độc lập. Thiên Ấn (Kiêu) đại diện cho sự sắc sảo, cô độc, huyền học.",
        strengths: "Nhạy bén, trực giác tốt, sáng tạo độc đáo, giỏi các môn ít người biết (y thuật, tướng số, nghệ thuật lạ).",
        weaknesses: "Cô độc, lập dị, ít bạn bè, tính tình thất thường, đa nghi, hay bỏ dở giữa chừng.",
        success_key: "Cần Thiên Tài để chế Kiêu. Nếu có Sát (Sát Ấn tương sinh) thì quyền uy hiển hách."
    },
    'Kiến Lộc Cách/Nguyệt Kiếp': {
        desc: "Cách cục Thân vượng tự cường. Nhật chủ đắc lệnh tháng sinh, khí thế mạnh mẽ.",
        strengths: "Sức khỏe tốt, ý chí kiên cường, tự lập tự cường, không dựa dẫm, giàu nghị lực.",
        weaknesses: "Khắc cha, khắc vợ (với nam), tài lộc khó tụ nếu không có Quan/Thực. Dễ bị bạn bè lợi dụng.",
        success_key: "Bắt buộc phải có Quan Sát để khắc chế bản thân thành người hữu dụng. Hoặc dùng Thực Thương để tiết khí sinh Tài."
    },

    // B. NGOẠI CÁCH (Special Structures)
    'Tòng Vượng Cách': {
        desc: "Mệnh cục cực vượng, khí thế một hành chiếm toàn bộ, không có lực lượng khắc chế. Phải thuận theo thế vượng.",
        strengths: "Sức mạnh phi thường, nếu vận thuận (gặp Tỷ/Ấn/Thực) thì thăng tiến như diều gặp gió, làm nên nghiệp lớn.",
        weaknesses: "Nếu gặp vận ngược (Tài/Quan) kích nộ khí vượng thì tai họa khôn lường, phá sản, ngục tù hoặc bạo bệnh.",
        success_key: "Tuyệt đối không được khắc. Dụng thần là Tỷ Kiếp hoặc Ấn. Hỷ thần là Thực Thương (tiết tú)."
    },
    'Tòng Tài Cách': {
        desc: "Nhật chủ cực nhược, bốn bề là Tài tinh. Bỏ mình để theo Tài.",
        strengths: "Nhạy bén tuyệt vời với tiền bạc, có duyên kinh doanh, dễ trở thành cự phú, đại gia.",
        weaknesses: "Lệ thuộc vào tiền tài, vợ (với nam). Nếu gặp vận Ấn/Tỷ giúp thân thì lại phá cách, trở thành người nghèo hèn.",
        success_key: "Dụng thần là Tài hoặc Thực Thương. Kỵ Ấn và Tỷ Kiếp."
    },
    'Tòng Sát Cách': {
        desc: "Nhật chủ cực nhược, bốn bề là Quan Sát. Bỏ mình để theo Quyền lực.",
        strengths: "Quyền uy hiển hách, có thể làm quan to, tướng lớn, nắm quyền sinh sát.",
        weaknesses: "Áp lực tinh thần cực lớn, cuộc sống khắc nghiệt. Nếu vận giúp thân thì tai họa giáng xuống.",
        success_key: "Dụng thần là Quan Sát hoặc Tài. Kỵ Ấn và Tỷ Kiếp."
    },
    'Tòng Nhi Cách': {
        desc: "Nhật chủ cực nhược, bốn bề là Thực Thương. Bỏ mình để theo sự Sáng tạo/Con cái.",
        strengths: "Trí tuệ siêu phàm, học một biết mười, danh tiếng lẫy lừng trong giới học thuật/nghệ thuật.",
        weaknesses: "Cao ngạo, lập dị. Nữ mệnh thường khắc chồng con hoặc ở vậy.",
        success_key: "Dụng thần là Thực Thương hoặc Tài. Kỵ nhất là Ấn (Kiêu gặp Tòng Nhi là đại họa)."
    }
};

// 4. LỜI KHUYÊN VẬN HẠN CHI TIẾT (Luck Cycle Advice Detailed)
const LUCK_ADVICE = {
    'good': [
        "Thiên thời địa lợi nhân hòa, đây là giai đoạn vàng để triển khai các đại dự án.",
        "Cơ hội thăng quan tiến chức, tài lộc dồi dào. Quý nhân xuất hiện giúp đỡ mọi mặt.",
        "Sức khỏe sung mãn, tinh thần minh mẫn. Nên tranh thủ học hỏi, mở rộng kiến thức.",
        "Gia đạo yên vui, có tin hỷ sự. Thích hợp để cưới hỏi, sinh con hoặc xây nhà.",
        "Đầu tư sinh lời, kinh doanh phát đạt. Hãy mạnh dạn mạo hiểm trong giới hạn cho phép."
    ],
    'bad': [
        "Vận khí suy thoái, 'án binh bất động' là thượng sách. Tránh đầu tư lớn hay thay đổi công việc.",
        "Đề phòng tiểu nhân hãm hại, thị phi khẩu thiệt. Cẩn trọng trong mọi giấy tờ, hợp đồng.",
        "Sức khỏe có dấu hiệu bất ổn, cần chú ý nghỉ ngơi, đi khám định kỳ.",
        "Gia đạo có chút xáo trộn, cần nhẫn nhịn, dĩ hòa vi quý để tránh đổ vỡ.",
        "Tài lộc thất thoát, tránh cho vay mượn hoặc đứng ra bảo lãnh cho người khác."
    ]
};

// 5. DỮ LIỆU ĐIỀU HẦU (Climate Adjustment)
const DIEU_HAU_DATA = {
    'Hỏa': { msg: "Mệnh sinh mùa Đông (tháng Hợi, Tý, Sửu) hàn lạnh, nước đóng băng, cây cối úa tàn. Rất cần HỎA (Bính/Đinh/Tỵ/Ngọ) để sưởi ấm cục diện, giúp vạn vật hồi sinh. Có Hỏa thì mệnh mới phát quý, tinh thần mới phấn chấn.", icon: "🔥" },
    'Thủy': { msg: "Mệnh sinh mùa Hè (tháng Tỵ, Ngọ, Mùi) hỏa vượng, đất đai nứt nẻ, kim loại nóng chảy. Rất cần THỦY (Nhâm/Quý/Hợi/Tý) để tưới mát, giúp điều hòa khí nóng. Có Thủy thì mệnh mới an định, trí tuệ mới sáng suốt, tránh được bệnh về máu huyết.", icon: "💧" },
    'Kim': { msg: "Mệnh Mộc sinh mùa Xuân quá vượng cần Kim để cắt tỉa bớt cành lá rườm rà thì mới thành gỗ quý. (Dùng Kim phạt Mộc). Kim mang lại sự quyết đoán và trật tự cho mệnh cục.", icon: "⚔️" },
    'Mộc': { msg: "Mệnh Thổ sinh mùa Tứ Quý quá dày, cần Mộc để xới tơi đất, khai thông bế tắc. (Dùng Mộc sơ Thổ). Mộc mang lại sinh khí và sự phát triển.", icon: "🌳" }
};

// 6. DỮ LIỆU BỔ TRỢ PHONG THỦY (Feng Shui Remedies)
const FENGSHUI_DB = {
    'Kim': { color: "Trắng, Xám, Ghi, Bạc, Vàng kim", shape: "Tròn, Oval, Mái vòm", material: "Kim loại, Vàng, Bạc, Inox", number: "6, 7", direction: "Tây, Tây Bắc" },
    'Mộc': { color: "Xanh lá cây, Xanh nõn chuối", shape: "Chữ nhật dài, Hình trụ", material: "Gỗ, Tre, Giấy, Cây xanh", number: "3, 4", direction: "Đông, Đông Nam" },
    'Thủy': { color: "Đen, Xanh dương đậm, Xanh than", shape: "Lượn sóng, Uốn khúc", material: "Kính, Thủy tinh, Nước (bể cá)", number: "1", direction: "Bắc" },
    'Hỏa': { color: "Đỏ, Cam, Hồng, Tím", shape: "Tam giác, Chóp nhọn", material: "Nhựa, Đèn, Nến, Tranh ảnh", number: "9", direction: "Nam" },
    'Thổ': { color: "Vàng, Nâu đất, Be", shape: "Vuông, Chữ nhật ngang", material: "Gốm, Sứ, Đá, Gạch", number: "2, 5, 8", direction: "Tây Nam, Đông Bắc" }
};

module.exports = {
    CAREER_DB,
    HEALTH_DB,
    STRUCTURE_ANALYSIS,
    LUCK_ADVICE,
    DIEU_HAU_DATA,
    FENGSHUI_DB
};
