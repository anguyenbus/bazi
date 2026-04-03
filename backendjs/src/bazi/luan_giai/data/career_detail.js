/**
 * Dữ liệu Sự Nghiệp Chi Tiết
 * Tham chiếu từ Python backend.
 */

const CAREER_BY_ELEMENT = {
    'Mộc': {
        'industries': [
            "Ngành giáo dục: giáo viên, giảng viên, nghiên cứu sinh.",
            "Ngành y tế: bác sĩ, y tá, dược sĩ, đông y.",
            "Ngành nông nghiệp: trồng trọt, chăn nuôi, lâm nghiệp.",
            "Ngành thời trang: thiết kế, may mặc, dệt may.",
            "Ngành văn hóa: nhà văn, nhà báo, biên tập viên.",
        ],
        'positions': [
            "Vị trí sáng tạo như designer, họa sĩ, kiến trúc sư.",
            "Vị trí phát triển như project manager, team lead.",
            "Vị trí giáo dục như giáo viên, huấn luyện viên.",
            "Vị trí nghiên cứu như nhà khoa học, chuyên viên R&D.",
        ],
        'work_style': [
            "Làm việc trong môi trường linh hoạt, sáng tạo.",
            "Thích công việc có sự phát triển và thay đổi.",
            "Phù hợp với công việc liên quan đến trẻ em, thanh niên.",
            "Cần không gian xanh, gần thiên nhiên để làm việc tốt.",
        ],
        'strengths': [
            "Khả năng sáng tạo và đổi mới vượt trội.",
            "Tư duy phát triển và mở rộng.",
            "Nhân ái và biết quan tâm đến người khác.",
            "Linh hoạt và thích nghi nhanh.",
        ],
        'challenges': [
            "Có thể thiếu kiên nhẫn với công việc lặp lại.",
            "Đôi khi quá lý tưởng, không thực tế.",
            "Có thể bị phân tâm bởi quá nhiều ý tưởng.",
        ],
    },
    'Hỏa': {
        'industries': [
            "Ngành truyền thông: TV, radio, online media.",
            "Ngành giải trí: ca sĩ, diễn viên, MC, DJ.",
            "Ngành marketing: quảng cáo, PR, branding.",
            "Ngành điện tử: điện lực, điện tử, viễn thông.",
            "Ngành thẩm mỹ: spa, thẩm mỹ viện, trang điểm.",
        ],
        'positions': [
            "Vị trí nổi bật như MC, nghệ sĩ, diễn giả.",
            "Vị trí lãnh đạo như CEO, giám đốc.",
            "Vị trí marketing như CMO, trưởng phòng marketing.",
            "Vị trí bán hàng như sales manager, BDM.",
        ],
        'work_style': [
            "Làm việc trong môi trường sôi động, năng động.",
            "Thích công việc có sự tiếp xúc với công chúng.",
            "Phù hợp với công việc đòi hỏi sự nhiệt tình.",
            "Cần được công nhận và khen ngợi trong công việc.",
        ],
        'strengths': [
            "Khả năng truyền cảm hứng và động viên người khác.",
            "Năng lượng tích cực và nhiệt huyết.",
            "Tự tin và có sức thu hút cá nhân.",
            "Giỏi thuyết trình và giao tiếp.",
        ],
        'challenges': [
            "Có thể nóng vội và thiếu kiên nhẫn.",
            "Đôi khi quá táo bạo, thiếu cân nhắc.",
            "Có thể bị kiệt sức nếu không biết nghỉ ngơi.",
        ],
    },
    'Thổ': {
        'industries': [
            "Ngành bất động sản: mua bán, cho thuê, quản lý.",
            "Ngành xây dựng: xây nhà, cầu đường, công trình.",
            "Ngành khai thác: mỏ, khoáng sản, vật liệu.",
            "Ngành nông nghiệp: trồng trọt, chăn nuôi.",
            "Ngành ẩm thực: nhà hàng, khách sạn, resort.",
        ],
        'positions': [
            "Vị trí quản lý như quản lý tài sản, property manager.",
            "Vị trí tài chính như CFO, kế toán trưởng.",
            "Vị trí vận hành như COO, quản lý hoạt động.",
            "Vị trí nhân sự như HR manager, tuyển dụng.",
        ],
        'work_style': [
            "Làm việc trong môi trường ổn định, có hệ thống.",
            "Thích công việc có quy trình rõ ràng.",
            "Phù hợp với công việc lâu dài, bền vững.",
            "Cần sự an toàn và đảm bảo trong công việc.",
        ],
        'strengths': [
            "Đáng tin cậy và kiên định.",
            "Khả năng quản lý và tổ chức tốt.",
            "Kiên nhẫn và bền bỉ trong công việc.",
            "Thực tế và có đầu óc tính toán.",
        ],
        'challenges': [
            "Có thể quá chậm chạp, thiếu linh hoạt.",
            "Đôi khi bảo thủ, khó thay đổi.",
            "Có thể bỏ lỡ cơ hội vì quá thận trọng.",
        ],
    },
    'Kim': {
        'industries': [
            "Ngành tài chính: ngân hàng, chứng khoán, đầu tư.",
            "Ngành kim loại: luyện kim, cơ khí, gia công.",
            "Ngành công nghệ: IT, phần mềm, công nghệ cao.",
            "Ngành luật: luật sư, thẩm phán, công chứng.",
            "Ngành an ninh: công an, quân đội, bảo vệ.",
        ],
        'positions': [
            "Vị trí phân tích như financial analyst, data analyst.",
            "Vị trí luật như luật sư, cố vấn pháp lý.",
            "Vị trí kỹ thuật như kỹ sư, chuyên gia IT.",
            "Vị trí quản lý như giám đốc tài chính, CFO.",
        ],
        'work_style': [
            "Làm việc trong môi trường chuyên nghiệp, kỷ luật.",
            "Thích công việc có quy tắc và chuẩn mực.",
            "Phù hợp với công việc đòi hỏi độ chính xác cao.",
            "Cần sự công bằng và minh bạch trong công việc.",
        ],
        'strengths': [
            "Phân tích và quyết đoán.",
            "Công bằng và nguyên tắc.",
            "Chính xác và tỉ mỉ trong công việc.",
            "Có khả năng đưa ra quyết định khó.",
        ],
        'challenges': [
            "Có thể quá cứng nhắc và không linh hoạt.",
            "Đôi khi quá lạnh lùng, thiếu cảm xúc.",
            "Có thể gây thương tổn cho người khác bằng lời nói.",
        ],
    },
    'Thủy': {
        'industries': [
            "Ngành vận tải: logistics, shipping, hàng không.",
            "Ngành du lịch: du lịch, lữ hành, khách sạn.",
            "Ngành thủy sản: nuôi trồng, chế biến, xuất khẩu.",
            "Ngành đồ uống: bia, rượu, nước giải khát.",
            "Ngành xuất nhập khẩu: thương mại quốc tế.",
        ],
        'positions': [
            "Vị trí giao dịch như trader, dealer, broker.",
            "Vị trí nghiên cứu như researcher, scientist.",
            "Vị trí tư vấn như consultant, advisor.",
            "Vị trí quốc tế như business development.",
        ],
        'work_style': [
            "Làm việc trong môi trường linh hoạt, năng động.",
            "Thích công việc có sự di chuyển và thay đổi.",
            "Phù hợp với công việc liên quan đến nước ngoài.",
            "Cần sự tự do và linh hoạt trong công việc.",
        ],
        'strengths': [
            "Linh hoạt và thích nghi nhanh.",
            "Thông minh và sâu sắc.",
            "Có khả năng giao tiếp đa ngôn ngữ.",
            "Biết cách đàm phán và thương lượng.",
        ],
        'challenges': [
            "Có thể thiếu kiên định, hay thay đổi.",
            "Đôi khi quá mạo hiểm trong quyết định.",
            "Có thể khó tập trung vào một việc.",
        ],
    },
};

const CAREER_BY_DEITY = {
    'Quan': [
        "Chính Quan cho thấy sự nghiệp ổn định trong cơ quan nhà nước.",
        "Phù hợp với vị trí công chức, viên chức.",
        "Có thể thăng tiến trong hệ thống hành chính.",
        "Được cấp trên tin tưởng và đề bạt.",
    ],
    'Sát': [
        "Thất Sát cho thấy sự nghiệp cạnh tranh, thử thách.",
        "Phù hợp với vị trí đòi hỏi sự dũng cảm như quân đội, công an.",
        "Có thể thành công trong môi trường áp lực cao.",
        "Sự nghiệp có thể lên xuống nhưng đạt đỉnh cao nếu vượt qua.",
    ],
    'Tài+': [
        "Chính Tài cho thấy sự nghiệp kiếm tiền ổn định.",
        "Phù hợp với công việc kế toán, tài chính, ngân hàng.",
        "Có thể tích lũy tài sản qua công việc chính đáng.",
        "Sự nghiệp phát triển bền vững nhờ chăm chỉ.",
    ],
    'Tài-': [
        "Thiên Tài cho thấy sự nghiệp kiếm tiền đa dạng.",
        "Phù hợp với kinh doanh, đầu tư, mạo hiểm.",
        "Có thể có nhiều nguồn thu nhập khác nhau.",
        "Sự nghiệp có thể lên xuống nhưng tổng thể tốt.",
    ],
    'Ấn': [
        "Chính Ấn cho thấy sự nghiệp liên quan đến học vấn.",
        "Phù hợp với giáo dục, nghiên cứu, xuất bản.",
        "Có thể được quý nhân hỗ trợ trong sự nghiệp.",
        "Sự nghiệp phát triển nhờ tri thức và học hỏi.",
    ],
    'Kiêu': [
        "Thiên Ấn cho thấy sự nghiệp độc đáo, khác biệt.",
        "Phù hợp với công việc sáng tạo, nghệ thuật đặc thù.",
        "Có thể thành công trong các lĩnh vực ít người theo.",
        "Sự nghiệp theo con đường riêng, không theo số đông.",
    ],
    'Thực': [
        "Thực Thần cho thấy sự nghiệp hưởng thụ, nghệ thuật.",
        "Phù hợp với ẩm thực, giải trí, nghệ thuật.",
        "Có thể thành công trong các lĩnh vực sáng tạo.",
        "Sự nghiệp mang lại nhiều niềm vui và hưởng thụ.",
    ],
    'Thương': [
        "Thương Quan cho thấy sự nghiệp nổi tiếng, tài năng.",
        "Phù hợp với luật, biện hộ, diễn thuyết.",
        "Có thể thành công trong truyền thông, giải trí.",
        "Sự nghiệp có thể có thị phi nhưng nổi bật.",
    ],
    'Tỷ': [
        "Tỷ Kiên cho thấy sự nghiệp tự lập, cạnh tranh.",
        "Phù hợp với kinh doanh cá nhân, startup.",
        "Có thể làm việc độc lập hoặc hợp tác với anh em.",
        "Sự nghiệp cần tự thân vận động, ít được hỗ trợ.",
    ],
    'Kiếp': [
        "Kiếp Tài cho thấy sự nghiệp cạnh tranh, mạo hiểm.",
        "Phù hợp với môi trường có nhiều đối thủ.",
        "Có thể thành công nếu biết cách đối phó.",
        "Sự nghiệp có thể có hao tổn nhưng cũng có cơ hội.",
    ],
};

const CAREER_BY_AGE_GENDER = {
    'male': {
        'young': [
            "Nam giới trẻ nên tập trung xây dựng kỹ năng và kinh nghiệm.",
            "Đây là thời điểm tốt để mạo hiểm và thử nghiệm.",
            "Nên tìm mentor để học hỏi và phát triển.",
        ],
        'middle': [
            "Nam giới trung niên nên củng cố vị trí sự nghiệp.",
            "Đây là thời điểm để gặt hái thành quả.",
            "Cân bằng giữa sự nghiệp và gia đình.",
        ],
        'old': [
            "Nam giới lớn tuổi nên truyền đạt kinh nghiệm cho thế hệ sau.",
            "Có thể làm cố vấn, mentor cho người trẻ.",
            "Chuyển đổi sang công việc ít áp lực hơn.",
        ],
    },
    'female': {
        'young': [
            "Nữ giới trẻ nên tự tin theo đuổi sự nghiệp.",
            "Đừng sợ cạnh tranh trong môi trường làm việc.",
            "Xây dựng kỹ năng và chuyên môn vững vàng.",
        ],
        'middle': [
            "Nữ giới trung niên cần cân bằng sự nghiệp và gia đình.",
            "Có thể đạt được vị trí cao nếu kiên trì.",
            "Tận dụng kỹ năng mềm trong công việc.",
        ],
        'old': [
            "Nữ giới lớn tuổi có thể trở thành mentor cho người trẻ.",
            "Tham gia hoạt động xã hội, từ thiện.",
            "Chia sẻ kinh nghiệm sống và làm việc.",
        ],
    },
};

module.exports = {
    CAREER_BY_ELEMENT,
    CAREER_BY_DEITY,
    CAREER_BY_AGE_GENDER
};
