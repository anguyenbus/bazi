/**
 * Thập Thần Deep Interpretations
 * 1000+ variations for Ten Gods analysis
 */

const THAP_THAN_DEEP = {
    "Quan": {
        "traits": [
            "lãnh đạo", "quyền lực", "trách nhiệm", "địa vị", "uy tín",
            "nghiêm túc", "kỷ luật", "nguyên tắc", "chính trực", "công bằng",
            "đáng tin", "quản lý", "tổ chức", "kiểm soát", "ổn định",
            "bảo thủ", "truyền thống", "tôn trọng", "danh dự", "uy quyền",
            "quyết đoán", "chiến lược"
        ],
        "career_keywords": [
            "chính trị", "chính khách", "tổng thống", "thủ tướng", "lãnh tụ",
            "quản lý", "giám đốc", "CEO", "điều hành", "công chức",
            "pháp luật", "thẩm phán", "luật sư", "cảnh sát", "quan chức",
            "ngoại giao", "đại sứ", "bộ trưởng", "thống đốc", "lãnh đạo"
        ],
        "personality_phrases": [
            "Người có tinh thần trách nhiệm cao, luôn hoàn thành công việc.",
            "Được người khác tôn trọng và kính nể trong tập thể.",
            "Có tố chất lãnh đạo bẩm sinh, biết cách tổ chức và điều phối.",
            "Trọng danh dự, giữ gìn uy tín cá nhân và gia đình.",
            "Thích môi trường có kỷ luật, nguyên tắc rõ ràng.",
            "Là người đáng tin cậy, được giao phó trách nhiệm lớn.",
            "Có khả năng quản lý, kiểm soát tình huống tốt.",
            "Lãnh đạo bằng uy tín và sự công bằng, không bằng áp đặt.",
            "Nghiêm túc trong công việc, không đùa giỡn với trách nhiệm.",
            "Có tầm nhìn về xây dựng tổ chức và hệ thống.",
            "Đôi khi quá nghiêm khắc, lạnh lùng hoặc thậm chí tàn nhẫn để giữ kỷ luật.",
            "Có tài văn chương, thi ca, dùng ngôn từ để thể hiện quan điểm chính trị.",
            "Luôn có sự đề phòng, đa nghi để bảo vệ vị thế và quyền lực.",
        ],
        "famous_patterns": [
            "Nhiều lãnh đạo chính trị nổi tiếng như Abraham Lincoln, Margaret Thatcher đều có Quan vượng trong mệnh.",
            "Quan cách điển hình thường thành công trong các tổ chức lớn, cơ quan nhà nước.",
            "Người Quan mạnh thường được bổ nhiệm vào vị trí quản lý từ sớm.",
        ]
    },

    "Sát": {
        "traits": [
            "quyết đoán", "tham vọng", "quân sự", "cạnh tranh", "mạnh mẽ",
            "dũng cảm", "kiên cường", "bất khuất", "chiến đấu", "can đảm",
            "quyết liệt", "không sợ hãi", "đối đầu", "thử thách", "áp lực",
            "uy quyền", "thống trị", "kiểm soát", "chinh phục", "vượt khó",
            "đa nghi", "chiến lược", "quyền lực"
        ],
        "career_keywords": [
            "quân sự", "tướng", "tướng quân", "chiến tranh", "chiến đấu",
            "võ sĩ", "võ sư", "thể thao", "vận động viên", "đấu tranh",
            "cảnh sát", "an ninh", "bảo vệ", "lính", "đặc nhiệm",
            "kinh doanh", "cạnh tranh", "startup", "khởi nghiệp", "đầu tư mạo hiểm"
        ],
        "personality_phrases": [
            "Tinh thần chiến đấu cao, không bao giờ chịu khuất phục.",
            "Có tham vọng lớn, luôn hướng đến những mục tiêu cao xa.",
            "Dũng cảm đối mặt với mọi thử thách, không run sợ trước khó khăn.",
            "Quyết đoán trong mọi quyết định, không do dự khi hành động.",
            "Có bản lĩnh và ý chí mạnh mẽ, vượt qua mọi chướng ngại.",
            "Thích môi trường cạnh tranh, nơi có thể thể hiện năng lực.",
            "Là người chiến đấu không mệt mỏi vì mục tiêu của mình.",
            "Có khả năng lãnh đạo trong khủng hoảng và tình huống nguy cấp.",
            "Mang tính cách của người chiến binh, không chấp nhận thất bại.",
            "Có sức mạnh ý chí vượt trội so với người bình thường.",
            "Dã tâm lớn, có phần lạnh lùng và tàn nhẫn trong cuộc cạnh tranh sinh tồn.",
            "Tư duy chiến lược, mưu lược sắc bén, luôn nắm thế chủ động.",
        ],
        "famous_patterns": [
            "Các tướng lĩnh lừng danh như Napoleon Bonaparte, Võ Nguyên Giáp đều mang Sát cách mạnh.",
            "Sát cách thường xuất hiện ở những người thành công trong môi trường cạnh tranh khốc liệt.",
            "Người Sát mạnh có thể trở thành lãnh đạo xuất sắc nếu biết chế ngự được sức mạnh.",
        ]
    },

    "Tài+": {
        "traits": [
            "tài chính", "kinh doanh", "giàu có", "thực dụng", "chăm chỉ",
            "tiết kiệm", "tích lũy", "quản lý tiền", "đầu tư", "thu nhập",
            "ổn định", "bền vững", "cẩn thận", "tính toán", "kế hoạch",
            "thịnh vượng", "sung túc", "no đủ", "dư dả", "phát tài",
            "kinh doanh tốt", "thực tế"
        ],
        "career_keywords": [
            "kinh doanh", "doanh nhân", "doanh nghiệp", "CEO", "tài chính",
            "ngân hàng", "đầu tư", "kế toán", "quản lý tài sản", "bất động sản",
            "thương mại", "buôn bán", "xuất nhập khẩu", "làm ăn", "kinh tế"
        ],
        "personality_phrases": [
            "Biết cách quản lý tiền bạc, không hoang phí.",
            "Chăm chỉ làm việc, thu nhập ổn định và bền vững.",
            "Có đầu óc kinh doanh, biết tính toán lợi nhuận.",
            "Tích lũy của cải qua thời gian bằng sự kiên nhẫn.",
            "Thực dụng trong cách nhìn nhận và xử lý vấn đề.",
            "Có khả năng tạo ra thu nhập từ nhiều nguồn khác nhau.",
            "Biết đầu tư hợp lý, không mạo hiểm quá mức.",
            "Có nền tảng tài chính vững chắc nhờ kế hoạch tốt.",
            "Giàu có nhờ nỗ lực làm việc, không phải may mắn.",
            "Quản lý tài sản gia đình tốt, lo liệu cho tương lai.",
        ],
        "famous_patterns": [
            "Warren Buffett là ví dụ điển hình cho Chính Tài cách - đầu tư dài hạn, kiên nhẫn.",
            "Người Chính Tài thường thành công trong các ngành tài chính, ngân hàng.",
            "Tài cách vượng thích hợp với công việc quản lý tài sản, kế toán.",
        ]
    },

    "Tài-": {
        "traits": [
            "may mắn", "tiền bất ngờ", "đầu tư", "mạo hiểm", "hào phóng",
            "rộng rãi", "không tiếc tiền", "phóng khoáng", "linh hoạt", "cơ hội",
            "tiền đến nhanh", "nhiều nguồn thu", "đào hoa", "quyến rũ", "thu hút"
        ],
        "career_keywords": [
            "đầu tư", "chứng khoán", "startup", "khởi nghiệp", "kinh doanh tự do",
            "freelance", "đa ngành", "mạo hiểm", "casino", "bất động sản",
            "nghệ sĩ", "diễn viên", "người có ảnh hưởng", "giải trí"
        ],
        "personality_phrases": [
            "Có may mắn về tài lộc, tiền bạc đến từ nhiều nguồn.",
            "Hào phóng trong chi tiêu, rộng rãi với bạn bè.",
            "Biết nắm bắt cơ hội kiếm tiền nhanh chóng.",
            "Linh hoạt trong kinh doanh, không bị gò bó.",
            "Có khả năng thu hút tài lộc bất ngờ.",
            "Không quá lo lắng về tiền bạc, tin vào vận may.",
            "Kiếm tiền nhanh nhưng cũng tiêu xài nhanh.",
            "Có đào hoa trong chuyện tiền bạc và tình cảm.",
            "Thu nhập từ các nguồn không cố định, đa dạng.",
            "Phóng khoáng trong cuộc sống, không bị ràng buộc.",
        ],
        "famous_patterns": [
            "Elon Musk thể hiện Thiên Tài cách - kinh doanh mạo hiểm, nhiều nguồn thu.",
            "Người Thiên Tài hay thành công trong các lĩnh vực đầu tư, mạo hiểm.",
            "Thiên Tài cách thường có đào hoa, thu hút người khác giới.",
        ]
    },

    "Ấn": {
        "traits": [
            "học tập", "thông minh", "quý nhân", "văn hóa", "tri thức",
            "nghiên cứu", "giáo dục", "trí tuệ", "sâu sắc", "bảo bọc",
            "che chở", "nhân từ", "khiêm tốn", "hiểu biết", "học hỏi",
            "tiếp thu", "tư duy", "phân tích", "văn học", "nghệ thuật",
            "triết học", "nhân ái", "cống hiến"
        ],
        "career_keywords": [
            "giáo viên", "giáo sư", "nhà nghiên cứu", "học giả", "tiến sĩ",
            "nhà văn", "nhà thơ", "học thuật", "thư viện", "viện sĩ",
            "tư vấn", "cố vấn", "mentor", "đào tạo", "giảng dạy"
        ],
        "personality_phrases": [
            "Yêu thích học tập, luôn tìm kiếm kiến thức mới.",
            "Được quý nhân phù trợ, hay gặp người giúp đỡ.",
            "Có trí tuệ sâu sắc, thấu hiểu nhiều vấn đề.",
            "Khiêm tốn và nhân từ, được người khác yêu mến.",
            "Có tư duy phân tích tốt, nhìn nhận vấn đề đa chiều.",
            "Thích môi trường học thuật, nghiên cứu tri thức.",
            "Được bảo bọc và che chở từ gia đình, đặc biệt là mẹ.",
            "Có khả năng tiếp thu nhanh, học gì cũng giỏi.",
            "Phù hợp với công việc giáo dục, truyền đạt kiến thức.",
            "Có gu thẩm mỹ cao, yêu văn hóa và nghệ thuật.",
        ],
        "famous_patterns": [
            "Albert Einstein, Stephen Hawking là những người có Ấn cách mạnh - thiên tài nghiên cứu.",
            "Người Chính Ấn thường thành công trong học thuật, giáo dục.",
            "Ấn cách vượng hay có mẹ tốt, quý nhân phù trợ.",
        ]
    },

    "Kiêu": {
        "traits": [
            "cô đơn", "sáng tạo", "tâm linh", "độc lập", "khác biệt",
            "độc đáo", "triết học", "huyền bí", "trực giác", "nhạy cảm",
            "nghệ thuật đặc thù", "một mình", "tách biệt", "không phụ thuộc",
            "tư duy khác người", "góc nhìn riêng", "ít bạn", "kén chọn"
        ],
        "career_keywords": [
            "nghệ sĩ độc lập", "nhà triết học", "tâm linh", "chiêm tinh",
            "yoga", "thiền định", "tôn giáo", "bác sĩ đặc thù", "tâm lý",
            "sáng tạo", "freelance", "tự do", "nghiên cứu độc lập"
        ],
        "personality_phrases": [
            "Có năng khiếu đặc biệt, vượt trội trong lĩnh vực riêng.",
            "Thích suy nghĩ độc lập, không theo đám đông.",
            "Có trực giác nhạy bén, cảm nhận được điều người khác không thấy.",
            "Cô đơn nhưng không cô độc, tự tìm thấy ý nghĩa riêng.",
            "Có góc nhìn khác biệt, sáng tạo theo cách riêng.",
            "Phù hợp với các ngành đặc thù, không phổ biến.",
            "Có năng lực tâm linh, hiểu biết về thế giới tinh thần.",
            "Độc lập trong suy nghĩ and hành động.",
            "Khác người nhưng có chiều sâu và ý nghĩa riêng.",
            "Hay suy tư về các vấn đề triết học, tâm linh.",
        ],
        "famous_patterns": [
            "Nikola Tesla là ví dụ điển hình cho Thiên Ấn - thiên tài nhưng cô độc.",
            "Người Thiên Ấn hay thành công trong các lĩnh vực khác thường.",
            "Kiêu cách thường có cuộc sống tinh thần phong phú hơn vật chất.",
        ]
    },

    "Thực": {
        "traits": [
            "sáng tạo", "phúc đức", "ổn định", "nghệ thuật", "vui vẻ",
            "hưởng thụ", "ẩm thực", "thanh thản", "an nhàn", "lạc quan",
            "thoải mái", "dễ chịu", "hòa đồng", "không ganh đua", "biết đủ",
            "con cái", "con tốt", "thiên tài nghệ thuật", "năng khiếu"
        ],
        "career_keywords": [
            "đầu bếp", "ẩm thực", "nhà hàng", "nghệ sĩ", "ca sĩ",
            "diễn viên", "nhạc sĩ", "họa sĩ", "thiết kế", "sáng tạo nội dung",
            "giáo dục trẻ em", "y tế", "làm đẹp", "spa", "thẩm mỹ"
        ],
        "personality_phrases": [
            "Hiền lành, có phúc đức, được mọi người yêu mến.",
            "Vui vẻ và lạc quan, tạo không khí tốt xung quanh.",
            "Có năng khiếu về nghệ thuật, ẩm thực hoặc thẩm mỹ.",
            "Sống an nhàn, không bon chen vật chất.",
            "Có phúc con cái, được con cháu yêu thương.",
            "Sáng tạo theo cách nhẹ nhàng, không gây xung đột.",
            "Biết hưởng thụ cuộc sống, không quá lo lắng.",
            "Tâm hồn thanh thản, không bị stress chi phối.",
            "Có khiếu ẩm thực, nấu ăn ngon hoặc biết thưởng thức.",
            "Dễ chịu trong giao tiếp, không gây áp lực cho ai.",
        ],
        "famous_patterns": [
            "Mozart là Thực Thần cách điển hình - thiên tài nghệ thuật, sáng tạo tự nhiên.",
            "Người Thực Thần hay thành công trong nghệ thuật, ẩm thực.",
            "Thực cách vượng thường có cuộc sống hạnh phúc, con cái tốt.",
        ]
    },

    "Thương": {
        "traits": [
            "nổi loạn", "sáng tạo cực đoan", "xung đột", "phá cách", "thông minh",
            "ý tưởng", "đột phá", "khác biệt", "không chấp nhận quy tắc", "tự do",
            "lôi cuốn", "thu hút", "cá tính mạnh", "diễn đạt tốt", "hùng biện",
            "thể hiện", "nổi bật", "gây chú ý", "gây tranh cãi"
        ],
        "career_keywords": [
            "truyền thông", "báo chí", "MC", "diễn giả", "chính trị gia",
            "nghệ sĩ nổi loạn", "nhà cách mạng", "cải cách", "startup",
            "marketing", "quảng cáo", "PR", "biểu diễn", "diễn viên"
        ],
        "personality_phrases": [
            "Thông minh sắc sảo, có nhiều ý tưởng đột phá.",
            "Không chấp nhận quy tắc sẵn có, muốn phá vỡ khuôn khổ.",
            "Có khả năng diễn đạt xuất sắc, nói giỏi viết hay.",
            "Cá tính mạnh, thu hút sự chú ý của người khác.",
            "Sáng tạo theo cách cực đoan, không theo lối mòn.",
            "Dễ gây tranh cãi nhưng cũng dễ được chú ý.",
            "Có tinh thần nổi loạn, không chịu khuất phục.",
            "Lôi cuốn và quyến rũ, có sức hút đặc biệt.",
            "Hay xung đột với cấp trên, người có quyền.",
            "Phù hợp với các ngành cần sự thể hiện, biểu đạt.",
        ],
        "famous_patterns": [
            "Winston Churchill, Steve Jobs đều có Thương Quan - hùng biện, sáng tạo, gây tranh cãi.",
            "Người Thương Quan hay thành công trong truyền thông, diễn giả.",
            "Thương cách cần biết kiểm soát để không gây hại cho bản thân.",
        ]
    },

    "Tỷ": {
        "traits": [
            "bạn bè", "hợp tác", "cạnh tranh", "anh em", "độc lập",
            "tự lập", "bản lĩnh", "không cần giúp đỡ", "ngang hàng", "đồng nghiệp",
            "chia sẻ", "cộng tác", "team work", "kiên định", "vững vàng",
            "không lung lay", "ý chí", "tự tin", "quyết tâm"
        ],
        "career_keywords": [
            "kinh doanh độc lập", "tự doanh", "freelance", "startup",
            "hợp tác kinh doanh", "đối tác", "team leader", "coach",
            "huấn luyện viên", "thể thao", "võ thuật", "cạnh tranh"
        ],
        "personality_phrases": [
            "Có bản lĩnh và ý chí mạnh mẽ, tự lập từ sớm.",
            "Được bạn bè và anh em hỗ trợ khi cần thiết.",
            "Thích làm việc độc lập, không muốn phụ thuộc ai.",
            "Có tinh thần cạnh tranh lành mạnh, không ngại thử thách.",
            "Biết hợp tác với người ngang hàng, tạo sức mạnh tập thể.",
            "Kiên định với mục tiêu, không dễ dàng bỏ cuộc.",
            "Tự tin vào bản thân, không cần sự xác nhận từ người khác.",
            "Phù hợp với vai trò leader trong nhóm nhỏ.",
            "Có năng lực tự thân vận động, không trông chờ.",
            "Chia sẻ và giúp đỡ bạn bè khi có cơ hội.",
        ],
        "famous_patterns": [
            "Hồ Chí Minh có sự hỗ trợ của Tỷ cách - kiên định, tự lập, được anh em theo.",
            "Người Tỷ Kiên thường thành công trong kinh doanh độc lập.",
            "Tỷ cách vượng hay có nhiều bạn bè, anh em tốt.",
        ]
    },

    "Kiếp": {
        "traits": [
            "mạo hiểm", "mất tiền", "tranh giành", "rủi ro", "cứng rắn",
            "bất chấp", "liều lĩnh", "cạnh tranh khốc liệt", "không sợ mất",
            "dám làm", "dám chịu", "bản lĩnh cao", "bất khuất", "kiên cường"
        ],
        "career_keywords": [
            "đầu tư mạo hiểm", "startup rủi ro cao", "kinh doanh cạnh tranh",
            "thể thao đối kháng", "võ thuật", "quân đội", "cảnh sát",
            "casino", "chứng khoán", "bất động sản rủi ro"
        ],
        "personality_phrases": [
            "Có bản lĩnh cao, dám đối đầu với khó khăn.",
            "Không sợ mất tiền, sẵn sàng mạo hiểm vì mục tiêu.",
            "Cứng rắn và kiên cường trong mọi tình huống.",
            "Hay tranh giành nhưng cũng hay mất mát.",
            "Có sức mạnh ý chí vượt trội, không dễ bỏ cuộc.",
            "Thích môi trường cạnh tranh khốc liệt.",
            "Liều lĩnh nhưng có tính toán, biết giới hạn.",
            "Bất khuất trước áp lực và thử thách.",
            "Có thể mất nhiều nhưng cũng kiếm được nhiều.",
            "Phù hợp với các ngành đòi hỏi sự mạo hiểm.",
        ],
        "famous_patterns": [
            "Maradona thể hiện Kiếp Tài - thiên tài nhưng cũng đầy scandal và mất mát.",
            "Người Kiếp Tài cần cẩn thận về tài chính, dễ mất tiền.",
            "Kiếp cách mạnh thường có cuộc đời nhiều biến động.",
        ]
    },
};

module.exports = {
    THAP_THAN_DEEP
};
