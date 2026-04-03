const LOGIC_POOL = {
    // --- CAREER ---
    CAREER_GENERAL: {
        strong: [
            "Với Nhật chủ **{ME_GAN}** vượng khí, đường công nghiệp của bạn rộng mở nhất khi bạn giữ vai trò quyết định. Sự quyết đoán bẩm sinh là chìa khóa để khai mở vận may.",
            "Bản mệnh Thân vượng cho thấy bạn có thể tự mình gây dựng cơ nghiệp. Công danh sẽ rạng rỡ nếu bạn tập trung vào các lĩnh vực đòi hỏi sự kiên định."
        ],
        weak: [
            "Bản mệnh **{ME_GAN}** mang tính chất nhu hòa, sự nghiệp sẽ phát đạt nhất khi có sự hỗ trợ từ tiền bối hoặc môi trường vững mạnh.",
            "Bạn tỏa sáng nhất ở vai trò chuyên gia hoặc cố vấn. Nguồn năng lượng từ đồng nghiệp và cấp trên sẽ là bệ phóng cho sự thăng tiến của bạn."
        ]
    },
    CAREER_TYPE: {
        strong: [
            "Với Nhật chủ **{ME_GAN}** mang khí thế vượng mạnh, bạn có chân mệnh của người dẫn dắt. Việc tự kinh doanh hoặc làm chủ sẽ giúp bạn phát huy tối đa sự quyết đoán.",
            "Nội lực Thân vượng cho thấy bạn không thích hợp với môi trường gò bó. Hãy tự tin xây dựng cơ nghiệp riêng để làm chủ vận mệnh."
        ],
        weak: [
            "Bản mệnh **{ME_GAN}** mang tính chất nhu hòa, bạn sẽ tỏa sáng nhất trong môi trường tổ chức vững mạnh. Vai trò chuyên gia hoặc cố vấn là bệ phóng an toàn nhất.",
            "Việc 'đứng trên vai người khổng lồ' giúp bạn tránh được sóng gió tự doanh và tận dụng được sự hỗ trợ từ đồng nghiệp."
        ]
    },
    CAREER_TIMING: {
        favorable: [
            "Vận trình đang trong kỳ **{LUCK_STATUS}**, đây là thời điểm vàng để thực hiện những thay đổi lớn như chuyển việc hoặc đầu tư.",
            "Các ngôi sao tốt đang hội tụ, báo hiệu sự hanh thông trong mọi kế hoạch sắp tới của bạn."
        ],
        unfavorable: [
            "Vận trình hiện tại đang có dấu hiệu **{LUCK_STATUS}**, bạn nên giữ vững vị trí hiện tại và tích lũy thêm nội lực.",
            "Sự tương xung trong vận hạn nhắc nhở bạn cần sự kiên nhẫn, tránh những quyết định đột ngột lúc này."
        ]
    },
    CAREER_PALACE: {
        strong: [
            "Cung Quan Lộc của bạn nhận được trợ lực mạnh mẽ từ hành **{ME_ELEMENT}**, cho thấy sự nghiệp có nền móng vững chắc. {CLASH_WARNING}",
            "Sự ổn định tại cung sự nghiệp báo hiệu một lộ trình công danh thăng tiến đều đặn, ít biến cố lớn. {STAR_INFO}"
        ],
        weak: [
            "Cung Quan Lộc cần được bổ khuyết bởi hành **{FAVORABLE_ELEMENT}**. Bạn nên chú trọng xây dựng quan hệ và tích lũy chuyên môn. {CLASH_WARNING}",
            "Vận trình sự nghiệp cần sự nhẫn nại, thành công sẽ đến muộn nhưng bền vững nếu bạn kiên trì bồi đắp."
        ]
    },
    CAREER_SECTOR: {
        strong: [
            "Với Dụng thần là **{FAVORABLE_ELEMENT}**, bạn sẽ gặp hái được nhiều thành công nhất trong các lĩnh vực: **{FAVORABLE_SECTORS}**",
            "Môi trường kinh doanh liên quan đến hành **{FAVORABLE_ELEMENT}** sẽ giúp bản mệnh khai mở tối đa tài lộc và quyền uy."
        ],
        weak: [
            "Sự lựa chọn nghề nghiệp đúng đắn (ưu tiên hành **{FAVORABLE_ELEMENT}**) sẽ giúp bạn bù đắp được sự thiếu hụt năng lượng trong bản mệnh. Hãy tham khảo: **{FAVORABLE_SECTORS}**",
            "Việc tập trung vào các ngành nghề hành **{FAVORABLE_ELEMENT}** sẽ mang lại sự bình ổn và hỗ trợ từ quý nhân cho sự nghiệp của bạn."
        ]
    },

    // --- LOVE ---
    LOVE_GENERAL: {
        clash: [
            "Duyên phận của bạn mang tính chất thử thách do sự tương xung trong mệnh cục. Điều này yêu cầu sự thấu cảm và nhường nhịn từ cả hai phía để giữ vững hạnh phúc.",
            "Sự biến động tại cung tình cảm nhắc nhở bạn cần chín chắn hơn trong các quyết định hôn nhân, tránh những rung động nhất thời."
        ],
        harmony: [
            "Lá số mang tín hiệu bình hòa trong tình cảm, báo hiệu một mối duyên bền vững và ít sóng gió. Sự ổn định này là nền tảng tốt cho gia đạo.",
            "Vận trình tình duyên hanh thông, bạn dễ tìm thấy tiếng nói chung và sự đồng điệu với đối phương trong cuộc sống."
        ]
    },
    LOVE_NATURE: {
        clash: [
            "Bản mệnh **{ME_GAN}** khi gặp tương xung thường khiến tâm tư xao động. Tình duyên có xu hướng 'đến muộn' nhưng sẽ vững chắc hơn sau khi bạn đã trưởng thành. {CLASH_WARNING}",
            "Chân mệnh tình cảm có sự xuất hiện của **{MALEFIC_STARS}**, đòi hỏi bạn phải tỉnh táo để phân biệt giữa duyên nợ và phúc đức."
        ],
        harmony: [
            "Bạn có chân mệnh thiện duyên, tính cách ôn hòa giúp bạn dễ dàng thu hút và duy trì những mối quan hệ tình cảm tốt đẹp. {STAR_INFO}",
            "Vận mệnh báo hiệu một người bạn đời thông tuệ, người sẽ cùng bạn xây dựng một mái ấm hòa hợp và sung túc."
        ]
    },
    LOVE_TYPE: {
        clash: [
            "Duyên phận của bạn thường mang tính chất biến động, dễ gặp các tình huống duyên nợ bất ngờ. Sự bền vững chỉ đến khi bạn thực sự hiểu mình và đối phương. {CLASH_WARNING}",
            "Bạn có thể gặp những mối duyên xa hoặc có sự khác biệt lớn về tính cách. Hãy lấy sự thấu hiểu làm cầu nối."
        ],
        harmony: [
            "Lá số ủng hộ những mối quan hệ mang tính chất truyền thống và ổn định. Sự đồng điệu về quan điểm sống là chìa khóa giữ gìn hạnh phúc gia đình.",
            "Vận trình báo hiệu bạn sẽ gặp được người tâm đầu ý hợp, mối quan hệ phát triển dựa trên sự tôn trọng và hỗ trợ lẫn nhau."
        ]
    },
    LOVE_SPOUSE_PALACE: {
        clash: [
            "Cung Phu Thê tại địa chi **{SPOUSE_ZHI}** đang gặp tình trạng **{RELATION_DETAIL}**. Điều này báo hiệu duyên phận đôi khi có chút sóng gió, cần sự bao dung để hóa giải.",
            "Sự xung khắc tại cung phối ngẫu cho thấy những thử thách trong việc thấu hiểu giữa đôi bên, hãy lấy sự điềm tĩnh làm gốc."
        ],
        harmony: [
            "Cung Phu Thê tại địa chi **{SPOUSE_Zhi}** rất bình hòa, không gặp xung phá. Đây là dấu hiệu của một mối quan hệ ổn định và gắn kết bền lâu.",
            "Sự ổn định tại cung phối ngẫu giúp bạn có một điểm tựa tinh thần vững chắc, người bạn đời sẽ là bệ phóng cho sự nghiệp của bạn."
        ]
    },
    LOVE_ROMANCE: {
        has_stars: [
            "Lá số mang chân mệnh **{ROMANCE_STARS}**, báo hiệu sức hút cá nhân rực rỡ và vận may trong các mối quan hệ xã giao.",
            "Sự hiện diện của đào hoa tinh giúp đường tình duyên của bạn luôn rộn ràng và có nhiều cơ hội gặp gỡ ý trung nhân."
        ],
        no_stars: [
            "Đường tình duyên của bạn thiên về sự chân thành và bền bỉ hơn là những khoảnh khắc đào hoa rực rỡ.",
            "Sự bình ổn trong cung tình cảm giúp bạn tìm thấy những mối quan hệ mang tính chất dài lâu và tin cậy."
        ]
    },
    LOVE_TIMING: {
        early: [
            "Vận trình cho thấy việc kết hôn sớm có thể mang lại sự ổn định và hỗ trợ lớn từ gia đình, đặc biệt khi hành **{ME_ELEMENT}** được tiếp thêm sinh khí.",
            "Thời điểm thanh xuân là lúc tình cảm nồng cháy nhất, nếu biết tiết chế cái tôi, bạn sẽ xây dựng được tổ ấm viên mãn ngay từ sớm."
        ],
        late: [
            "Lá số khuyên bạn nên tập trung vào sự nghiệp trước. Việc 'duyên muộn' sẽ giúp bạn gặp được người thực sự chín chắn và thấu hiểu.",
            "Kết hôn muộn là cách để bạn hóa giải các xung khắc trong cung phối ngẫu, đảm bảo sự bền vững lâu dài cho gia đạo."
        ]
    },

    // --- WEALTH ---
    WEALTH_GENERAL: {
        strong: [
            "Năng lượng tài lộc từ hành **{WEALTH_ELEMENT}** rất dồi dào. Bạn có số hưởng phú quý nếu biết tận dụng các cơ hội từ lĩnh vực **{ELEMENT_INDUSTRY}**.",
            "Khả năng tạo ra giá trị vật chất của bạn là rất lớn. Hãy chú trọng vào việc quản lý dòng tiền để biến tài lộc thành gia sản bền vững."
        ],
        weak: [
            "Tài vận của bạn mang tính chất tích lũy. Tiền bạc đến từ sự làm việc bền bỉ và cẩn trọng hơn là những vận may đột xuất.",
            "Hãy lấy sự ổn định làm gốc, tránh các hoạt động đầu tư rủi rủi cao. Tài lộc sẽ khởi sắc khi bước vào đại vận tương sinh."
        ]
    },
    WEALTH_PALACE: {
        strong: [
            "Cung Tài lộc của bạn mang hành **{WEALTH_ELEMENT}** rất vượng phát. Tiền bạc sẽ dồi dào nếu bạn biết cách vận hành đúng theo dụng thần.",
            "Khả năng kiếm tiền của bạn là bẩm sinh, đặc biệt trong các lĩnh vực liên quan đến **{ELEMENT_INDUSTRY}**."
        ],
        weak: [
            "Tài vận hiện tại đang ở thế tích tụ chậm. Tiền bạc đến từ sự lao động bền bỉ hơn là vận may bất ngờ.",
            "Hãy tập trung tích tiểu thành đại, lộc sẽ đến vào đại vận tốt sắp tới khi ngũ hành được cân bằng."
        ]
    },
    WEALTH_TYPE: {
        strong: [
            "Bản mệnh hợp với các nguồn 'Thiên Tài' (tài lộc từ kinh doanh, đầu tư, tay trái). Sự nhạy bén giúp bạn nắm bắt những vận may tài chính lớn.",
            "Số mệnh cho thấy bạn có duyên với việc điều hành dòng vốn lớn, tiền bạc luân chuyển mạnh mẽ mang lại lợi nhuận cao."
        ],
        weak: [
            "Nguồn 'Chính Tài' (lương bổng, thu nhập cố định) là nền tảng vững chắc nhất cho bạn. Hãy ưu tiên sự bền vững và kỷ luật tài chính.",
            "Tiền bạc của bạn đến từ sự tận tụy và chuyên môn sâu. Sự ổn định trong nghề nghiệp sẽ mang lại hậu vận sung túc."
        ]
    },

    // --- HEALTH ---
    HEALTH_GENERAL: {
        strong: [
            "Bản mệnh mang nguyên khí **{ME_ELEMENT}** dồi dào, giúp bạn có sức chịu đựng và phục hồi tuyệt vời. Hãy duy trì lối sống điều độ để giữ vững phong độ này.",
            "Nội lực mạnh mẽ giúp bạn ít khi ốm vặt, tuy nhiên cần chú trọng thải độc và cân bằng năng lượng vào những tháng xung khắc."
        ],
        weak: [
            "Bản mệnh mang tính chất nhạy cảm (Thân nhược), cần đặc biệt chú trọng dưỡng sinh và tránh làm việc quá sức. Khí huyết cần được lưu thông đều đặn.",
            "Nguyên khí có phần hao tổn, bạn nên tìm về thiên nhiên và các hoạt động tịnh tâm để bồi bổ sức khỏe từ bên trong."
        ]
    },
    HEALTH_CORE: {
        strong: [
            "Nguyên khí của bản mệnh **{ME_GAN}** rất dồi dào, giúp bạn có sức dẻo dai và khả năng phục hồi tốt.",
            "Thân vượng khí túc báo hiệu một cơ thể khỏe mạnh, tuy nhiên cần chú trọng điều hòa hành **{ME_ELEMENT}** để tránh quá cực đoan."
        ],
        weak: [
            "Bản mệnh **{ME_GAN}** mang tính chất nhạy cảm, cần chú trọng dưỡng tâm và bồi bổ nguyên khí thường xuyên. {STAR_INFO}",
            "Cơ thể dễ bị tác động bởi sự thay đổi khí thế, hãy lấy sự tĩnh tại và chế độ sinh hoạt điều độ làm gốc."
        ]
    },
    HEALTH_BODY: {
        strong: [
            "Hệ thống cơ quan chủ chốt của bạn (ứng với hành **{ME_ELEMENT}**) đang có sự vận hành trơn tru. Hãy duy trì thói quen tốt để bảo vệ nền tảng này.",
            "Năng lượng ngũ hành phân bổ đều, giúp các bộ phận trên cơ thể luôn ở trạng thái cân bằng và đầy sức sống."
        ],
        weak: [
            "Cần chú trọng đặc biệt đến các vấn đề liên quan đến hành **{ME_ELEMENT}** và **{FAVORABLE_ELEMENT}**. Một sự thiếu hụt nhỏ có thể dẫn đến mệt mệt mỏi kéo dài.",
            "Vận trình sức khỏe nhắc nhở bạn nên lắng nghe cơ thể hơn, đặc biệt là vào những mùa mà hành kỵ vượng phát."
        ]
    },

    // --- CHILDREN ---
    CHILDREN_GENERAL: {
        strong: [
            "Cung con cái mang năng lượng tích cực, con cháu sau này sẽ là niềm tự hào và là điểm tựa vững chắc cho bạn khi về già. {STAR_INFO}",
            "Duyên phận với thế hệ mai sau rất sâu nặng, bạn có khả năng truyền dạy và định hướng tốt cho con cái phát triển."
        ],
        weak: [
            "Việc nuôi dạy con cái đòi hỏi sự kiên nhẫn và bao dung lớn. Hãy lấy sự thấu hiểu làm cầu nối để xóa nhòa khoảng cách thế hệ. {STAR_INFO}",
            "Duyên phận với con cái có chút thử thách, cần chú trọng bồi đắp tình cảm và tạo môi trường ổn định nhất cho sự trưởng thành của trẻ."
        ]
    },
    CHILDREN_NATURE: {
        strong: [
            "Cung Tử Tức cát lợi, thế hệ mai sau sẽ mang hành **{KID_ELEMENT}** tương sinh với bản mệnh, tạo nên sự gắn kết sâu sắc. {STAR_INFO}",
            "Duyên phận với con cái rất sâu nặng, con cái sẽ là niềm tự hào và là động lực phát triển cho bạn."
        ],
        weak: [
            "Duyên phận với con cái mang tính chất thử thách, cần sự bao dung và thấu hiểu để xóa nhòa khoảng cách thế hệ. {STAR_INFO}",
            "Cung con cái có sự hiện diện của **{KID_STARS}**, đòi hỏi bạn phải kiên trì trong việc định hướng và giáo dục."
        ]
    },

    // --- COLLEAGUES ---
    COLLEAGUE_GENERAL: {
        strong: [
            "Môi trường xã giao rộn ràng, bạn luôn có những cộng sự đắc lực đồng hành. Sự chân thành giúp bạn thu phục lòng người dễ dàng.",
            "Đồng nghiệp và bạn bè xung quanh mang lại nhiều nguồn cảm hứng và cơ hội phát triển. Hãy tận dụng mạng lưới này để tiến xa hơn."
        ],
        weak: [
            "Trong giao tiếp cần sự thận trọng để tránh những thị phi không đáng có. Hãy giữ khoảng cách phù hợp và tập trung vào chuyên môn.",
            "Quan hệ với đồng nghiệp đôi khi gặp trắc trở, cần lấy sự điềm tĩnh và khiêm nhường làm lá chắn trước những xung đột lợi ích."
        ]
    },
    COLLEAGUE_NATURE: {
        strong: [
            "Bạn có năng lực thu phục lòng người nhờ sự hiện diện của **{SOCIAL_STARS}**. Đồng nghiệp sẽ là những cộng sự đắc lực.",
            "Mạng lưới xã giao rộn ràng, bạn luôn nhận được sự đồng hành từ những người cùng chí hướng."
        ],
        weak: [
            "Cần cẩn trọng với các thị phi ẩn tàng do sự xuất hiện của **{MALEFIC_STARS}**. Hãy giữ khoảng cách an toàn trong giao tế.",
            "Môi trường công sở đôi khi gặp chút trắc trở, cần lấy sự nhẫn nại và Chính Ấn để hóa giải các hiểu lầm."
        ]
    },

    // --- PARTNERSHIP ---
    PARTNERSHIP_GENERAL: {
        strong: [
            "Vận quý nhân trong hợp tác rất vượng. Việc hùn vốn hoặc xây dựng liên minh sẽ mang lại kết quả đại cát cho cả hai bên.",
            "Bạn có năng lực đàm phán và thuyết phục đối tác xuất sắc. Sự cộng hưởng sức mạnh sẽ là chìa khóa của thành công."
        ],
        weak: [
            "Trong hợp tác cần sự minh bạch tuyệt đối để tránh những rủi ro về mặt pháp lý hoặc tài chính. Hãy chọn đối tác cực kỳ kỹ lưỡng.",
            "Bản mệnh phù hợp với việc lèo lái độc lập hơn là phụ thuộc vào cộng sự. Nếu buộc phải hợp tác, hãy nắm giữ vai trò kiểm soát."
        ]
    },
    PARTNER_NATURE: {
        strong: [
            "Hợp tác kinh doanh là 'mảnh đất màu mỡ' để bạn phát tài. Sự bổ trợ ngũ hành từ cộng sự giúp vận thế của bạn bùng nổ.",
            "Số mệnh có 'Quý nhân' tại cung hợp tác, những người xung quanh sẽ mang đến khách hàng và cơ hội vàng cho bạn."
        ],
        weak: [
            "Hãy cẩn trọng khi 'hùn hạp' vào các đại vận xung khắc. Sự độc lập và làm chủ chính mình sẽ giúp bạn tránh được sự thất thoát.",
            "Mối quan hệ hợp tác cần được ràng buộc bằng pháp lý và văn bản rõ ràng để bảo vệ năng lượng của bản mệnh."
        ]
    },

    // --- MISFORTUNE ---
    MISFORTUNE_GENERAL: {
        strong: [
            "Lá số mang tín hiệu bình an, các hung tinh nếu có cũng bị hóa giải bởi phúc đức sâu dày của bản mệnh. {STAR_INFO}",
            "Bạn có trực giác và linh cảm tốt, giúp bản thân tránh được những rủi ro bất ngờ trong cuộc sống."
        ],
        weak: [
            "Cần chú trọng tu tâm tích đức để hóa giải những vận hạn không mong muốn. Sự thận trọng trong mọi quyết định là bùa hộ mệnh của bạn. {STAR_INFO}",
            "Vận trình có những biến động nhất định, hãy lấy sự tĩnh lặng và kiên trì để vượt qua những giai đoạn thử thách của số phận."
        ]
    },
    MISFORTUNE_NATURE: {
        strong: [
            "Bản mệnh có sức sống mãnh liệt (Thân vượng), gặp hung hóa cát nhờ nội lực thâm hậu. {STAR_INFO}",
            "Sự xuất hiện của 'Thiên Giải' hay 'Địa Giải' giúp bạn luôn thoát hiểm trong gang tấc trước những tình huống ngặt nghèo."
        ],
        weak: [
            "Vận mệnh nhắc nhở bạn 'phòng bệnh hơn chữa bệnh'. Hãy chú trọng an toàn và sức khỏe, tránh những mạo hiểm không cần thiết. {STAR_INFO}",
            "Hạn vận cần sự hóa giải bằng thiện hạnh và tu dưỡng. 'Đức năng thắng số' là kim chỉ nam cho bạn trong những năm hạn."
        ],
        clash: [
            "Sự hiện diện của quan hệ tương xung **{RELATION_DETAIL}** báo hiệu những biến động bất ngờ. {STAR_INFO}",
            "Tại cung vị **{PALACE_NAME}** đang gặp hình hại, bạn cần chú trọng các vấn đề liên quan đến pháp lý và các mối quan hệ xã hội."
        ]
    },
    MISFORTUNE_MAJOR_LIMIT: {
        strong: [
            "Đại hạn này mang tính chất thử thách lòng kiên nhẫn. Với nội lực bản mệnh vững vàng, bạn sẽ vượt qua. {STAR_INFO}",
            "Sự biến động trong vận trình chỉ là tạm thời, hãy tập trung vào việc củng cố nền tảng và chờ đợi thời cơ thuận lợi."
        ],
        weak: [
            "Trong đại hạn này, bạn nên ưu tiên sự ổn định và an toàn. Tránh các quyết định mang tính rủi ro cao. {STAR_INFO}",
            "Hãy chú trọng bồi bổ nguyên khí và tìm kiếm sự hỗ trợ từ những người xung quanh để cùng vượt qua giai đoạn khó khăn này."
        ]
    },

    // --- STARS ---
    STARS: {
        'Quý Nhân': "Sự hiện diện của Thiên Ất Quý Nhân báo hiệu bạn luôn nhận được sự giúp đỡ kịp thời từ những người có tầm ảnh hưởng.",
        'Dịch Mã': "Ngôi sao Dịch Mã cho thấy cuộc sống của bạn thường xuyên có sự biến chuyển, di chuyển dồi dào, mang lại nhiều cơ hội mới.",
        'Đào Hoa': "Sức hút cá nhân rực rỡ từ Đào Hoa tinh giúp bạn thuận lợi trong giao tiếp và có nhiều cơ hội trong tình cảm.",
        'Văn Xương': "Văn Xương tinh mang lại sự thông tuệ và khiếu thẩm mỹ cao, rất tốt cho con đường học vấn và nghệ thuật.",
        'Cô Quả': "Sự xuất hiện của Cô Thần, Quả Tú đôi khi khiến tâm tư cô độc, bạn nên mở lòng hơn trong các mối quan hệ xã hội."
    },

    // --- COMMON FRAGMENTS ---
    ELEMENT_ADVICE: {
        'Mộc': "Hãy gần gũi với thiên nhiên, sử dụng màu xanh lục để tăng cường sinh khí.",
        'Hỏa': "Ánh sáng và sự ấm áp từ màu đỏ, cam sẽ khơi dậy niềm đam mê.",
        'Thổ': "Sự vững chãi từ đất, màu vàng hoặc nâu sẽ giúp bạn giữ được sự ổn định.",
        'Kim': "Màu trắng, xám và các vật phẩm kim loại sẽ mang lại sự sắc bén trong tư duy.",
        'Thủy': "Yếu tố nước, màu đen hoặc xanh dương sẽ giúp trí tuệ luôn linh hoạt."
    },

    GENERAL_CLOSING: [
        "Hãy nhớ rằng: 'Đức năng thắng số', việc tu dưỡng tâm tính sẽ giúp bạn chuyển hóa mọi vận hạn thành cơ hội.",
        "Thiên thời - Địa lợi không bằng Nhân hòa. Sự nỗ lực và lòng nhân ái của bạn chính là lá bùa bình an mạnh nhất.",
        "Vận mệnh nằm trong lòng bàn tay, lá số chỉ là bản đồ, còn người lèo lái con thuyền đời mình chính là bạn."
    ]
};

module.exports = { LOGIC_POOL };

