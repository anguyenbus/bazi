/**
 * Bazi Granular Logic Atoms (Archetype System)
 * Providing specific atoms for sub-categories like TYPE, SECTOR, TIMING, STARS, etc.
 */

const LOGIC_ATOMS = {
    // =========================================================================
    // CAREER ARCHETYPES
    // =========================================================================

    // 1. NATURE / TYPE (Office vs Biz, Leadership, Freelance)
    CAREER_TYPE: {
        strong: {
            openers: [
                "Với bản mệnh {ME_GAN} cường vượng, bạn thuộc mẫu người không thích sự gò bó.",
                "Sở hữu khí thế áp đảo của Nhật chủ {ME_GAN}, bạn sinh ra để làm chủ cuộc chơi.",
                "Lá số cho thấy bạn có tố chất độc lập tác chiến và khả năng chịu áp lực cực cao.",
                "Năng lượng Thân vượng thúc đẩy bạn tìm kiếm những môi trường cho phép tự quyết."
            ],
            core: [
                "bạn phù hợp nhất với con đường khởi nghiệp hoặc nắm giữ vị trí quản lý cấp cao.",
                "môi trường làm thuê đơn thuần sẽ kìm hãm chí tiến thủ và tài năng của bạn.",
                "việc tự mình đứng mũi chịu sào sẽ giúp bạn khai phá hết tiềm năng lãnh đạo.",
                "thay vì chờ đợi cơ hội, bạn nên là người kiến tạo ra cơ hội cho người khác."
            ],
            advice: [
                "Hãy mạnh dạn bước ra khỏi vùng an toàn để xây dựng đế chế riêng.",
                "Đừng ngần ngại đảm nhận những trọng trách lớn, đó là đòn bẩy của bạn.",
                "Tập trung vào việc xây dựng đội ngũ kế cận để giải phóng bản thân."
            ]
        },
        weak: {
            openers: [
                "Bản mệnh {ME_GAN} nhu hòa, bạn là người biết nhu biết cương đúng lúc.",
                "Với thế Thân nhược, sức mạnh của bạn nằm ở khả năng kết nối và hòa nhập.",
                "Lá số thiên về sự ổn định, bạn sẽ phát huy tốt nhất trong môi trường có tổ chức.",
                "Sự nhạy bén và tinh tế là vũ khí lớn nhất của bạn trên con đường sự nghiệp."
            ],
            core: [
                "vai trò chuyên gia, cố vấn hoặc quản lý cấp trung là 'đất diễn' hoàn hảo nhất.",
                "việc nương tựa vào một tập đoàn lớn sẽ giúp bạn tránh được sóng gió thương trường.",
                "bạn nên ưu tiên sự hợp tác (Teamwork) hơn là đối đầu đơn độc.",
                "con đường quan lộ sẽ hanh thông nhờ sự nâng đỡ của quý nhân và đồng nghiệp."
            ],
            advice: [
                "Hãy tìm một người sếp giỏi (Quý nhân) để học hỏi và phò tá.",
                "Tập trung phát triển chiều sâu chuyên môn để trở thành người không thể thay thế.",
                "Tránh những quyết định khởi nghiệp mạo hiểm khi chưa đủ nguồn lực hỗ trợ."
            ]
        }
    },

    // 2. SECTOR (Industry Selection)
    CAREER_SECTOR: {
        strong: {
            openers: [
                "Dụng thần của bạn nằm ở hành {FAVORABLE_ELEMENT}, đây là chìa khóa mở kho tài lộc.",
                "Việc chọn đúng ngành nghề theo ngũ hành {FAVORABLE_ELEMENT} sẽ giúp cân bằng mệnh cục.",
                "Để tối ưu hóa năng lượng Thân vượng, bạn cần 'xả' khí vào đúng nơi đúng chỗ.",
                "Sự nghiệp sẽ thăng hoa nếu bạn đặt mình vào môi trường thuộc hành {FAVORABLE_ELEMENT}."
            ],
            core: [
                "các lĩnh vực như {FAVORABLE_SECTORS} là mảnh đất màu mỡ nhất dành cho bạn.",
                "bạn sẽ tìm thấy niềm đam mê và thành tựu lớn trong ngành {FAVORABLE_SECTORS}.",
                "môi trường kinh doanh liên quan đến {FAVORABLE_ELEMENT} sẽ kích hoạt vận may tiềm ẩn.",
                "hãy mạnh dạn dấn thân vào {FAVORABLE_SECTORS}, nơi đó có quý nhân chờ đợi."
            ],
            advice: [
                "Hãy bắt đầu tìm hiểu và chuyển hướng dần sang các lĩnh vực này.",
                "Nếu không thể đổi nghề, hãy tìm vị trí liên quan đến {FAVORABLE_ELEMENT} trong công ty.",
                "Sử dụng vật phẩm phong thủy hành {FAVORABLE_ELEMENT} tại nơi làm việc để tăng cát khí."
            ]
        },
        weak: {
            openers: [
                "Bản mệnh cần sự bổ trợ từ hành {FAVORABLE_ELEMENT} để vững vàng hơn trước sóng gió.",
                "Ngành nghề thuộc hành {FAVORABLE_ELEMENT} chính là 'liều thuốc bổ' cho lá số của bạn.",
                "Việc chọn nghề đúng ngũ hành sẽ giúp bạn đi nhanh và xa hơn người khác.",
                "Sự nghiệp của bạn sẽ bớt chông gai nếu biết nương tựa vào hành {FAVORABLE_ELEMENT}."
            ],
            core: [
                "hãy ưu tiên các công việc liên quan đến {FAVORABLE_SECTORS} để nhận được trợ lực.",
                "bạn sẽ cảm thấy nhẹ nhàng và thuận lợi hơn khi làm trong ngành {FAVORABLE_SECTORS}.",
                "đây là những lĩnh vực giúp bạn bổ khuyết năng lượng thiếu hụt, tăng cường bản lĩnh.",
                "sự ổn định sẽ đến từ việc gắn bó với môi trường thuộc hành {FAVORABLE_ELEMENT}."
            ],
            advice: [
                "Hãy đầu tư thời gian học thêm kỹ năng luên quan tới {FAVORABLE_SECTORS}.",
                "Tìm kiếm những cộng sự mệnh {FAVORABLE_ELEMENT} để cùng hợp tác phát triển.",
                "Định hướng lại lộ trình nghề nghiệp theo hướng chuyên sâu vào lĩnh vực này."
            ]
        }
    },

    // 3. TIMING (When to move, specific years)
    CAREER_TIMING: {
        favorable: {
            openers: [
                "Vận trình thời gian hiện tại đang ủng hộ những quyết định táo bạo của bạn.",
                "Thiên thời địa lợi đang dần hội tụ trong giai đoạn này.",
                "Đại vận {LUCK_STATUS} mở ra những cơ hội vàng hiếm có.",
                "Bát tự báo hiệu một chu kỳ tăng trưởng mạnh mẽ đang đến gần."
            ],
            core: [
                "đây là thời điểm lý tưởng để chuyển việc, khởi nghiệp hoặc mở rộng quy mô.",
                "những nỗ lực của bạn trong quá khứ sẽ bắt đầu đơm hoa kết trái từ bây giờ.",
                "bạn nên tranh thủ giai đoạn khí vượng này để bứt phá lên tầm cao mới.",
                "sự thay đổi lúc này là cần thiết và sẽ mang lại kết quả tích cực."
            ],
            advice: [
                "Hãy hành động ngay, đừng chần chừ để lỡ mất thời cơ.",
                "Mạnh dạn đề xuất thăng chức hoặc tăng lương, cơ hội được chấp thuận rất cao.",
                "Lên kế hoạch chi tiết cho 3-5 năm tới và bắt tay thực hiện."
            ]
        },
        unfavorable: {
            openers: [
                "Thời điểm này, vận khí có phần trầm lắng, chưa thích hợp cho những biến động lớn.",
                "Giai đoạn này đòi hỏi sự kiên nhẫn 'án binh bất động' để bảo toàn lực lượng.",
                "Vận trình đang đi vào vùng trũng, cần sự thận trọng tối đa.",
                "Bát tự khuyên bạn nên chậm lại một nhịp để quan sát tình hình."
            ],
            core: [
                "mọi quyết định thay đổi môi trường lúc này dễ dẫn đến những rủi ro khó lường.",
                "sự nóng vội sẽ khiến bạn đánh mất những gì đã dày công gây dựng.",
                "bạn nên tập trung vào việc củng cố nội lực thay vì mở rộng hay thay đổi.",
                "giữ vững vị trí hiện tại là chiến lược khôn ngoan nhất."
            ],
            advice: [
                "Hãy dùng thời gian này để học tập, trau dồi kỹ năng mới.",
                "Kiên nhẫn chờ đợi thời cơ, đừng vì áp lực nhất thời mà buông bỏ.",
                "Tập trung hoàn thành tốt nhiệm vụ hiện tại để duy trì sự ổn định."
            ]
        }
    },

    // 4. STARS
    CAREER_STARS: {
        strong: {
            openers: [
                "Mệnh cục của bạn có sự chiếu rọi của các vì tinh tú quan trọng.",
                "Yếu tố con người và quý nhân đóng vai trò then chốt trong lá số này.",
                "Bên cạnh năng lực, vận may từ các chòm sao cũng hỗ trợ bạn không ít."
            ],
            core: [
                "{STAR_INFO}. Điều này báo hiệu bạn thường xuyên gặp may mắn bất ngờ.",
                "sự trợ giúp từ quý nhân sẽ giúp bạn vượt qua những nút thắt quan trọng.",
                "bạn có duyên với những người có địa vị, giải được các thế bí."
            ],
            advice: [
                "Hãy mở rộng mạng lưới quan hệ xã giao tích cực.",
                "Biết ơn những người đã giúp đỡ mình để phúc trạch bền lâu."
            ]
        },
        weak: {
            openers: [
                "Các cát tinh trong mệnh cục là nguồn động viên lớn cho tinh thần của bạn.",
                "Dù gặp khó khăn, ánh sáng từ quý nhân tinh vẫn luôn soi đường.",
                "Vận trình các sao báo hiệu những biến chuyển thú vị về mặt nhân sự."
            ],
            core: [
                "{STAR_INFO}. Đây là dấu hiệu của sự phò trợ âm thầm mà hiệu quả.",
                "bạn dễ gặp được thầy giỏi, bạn hiền trong những lúc nguy nan nhất.",
                "sự thành bại đôi khi phụ thuộc vào việc bạn chọn ai để đồng hành."
            ],
            advice: [
                "Hãy chủ động tìm kiếm sự giúp đỡ khi gặp bế tắc.",
                "Trân trọng các mối quan hệ đồng nghiệp, họ chính là quý nhân của bạn."
            ]
        }
    },

    // 5. LOCATION (Travel, Abroad, South/North)
    CAREER_LOCATION: {
        strong: {
            openers: ["Với năng lượng dồi dào, bạn rất hợp với sự di chuyển.", "Việc thay đổi môi trường địa lý sẽ kích hoạt vận may."],
            core: ["đi xa lập nghiệp (ly hương) sẽ gặt hái thành tựu lớn hơn ở quê nhà.", "các cơ hội xuất ngoại hay công tác xa là đòn bẩy sự nghiệp."],
            advice: ["Mạnh dạn nhận các nhiệm vụ đòi hỏi di chuyển.", "Tìm kiếm cơ hội ở các thành phố lớn hoặc nước ngoài."]
        },
        weak: {
            openers: ["Sự ổn định về địa lý giúp bạn tích lũy nội lực tốt hơn.", "Việc di chuyển quá nhiều có thể làm hao tổn nguyên khí."],
            core: ["nên lập nghiệp ở nơi quen thuộc hoặc gần gia đình để được hỗ trợ.", "việc xuất ngoại hay đi xa cần cân nhắc kỹ về sức khỏe và tài chính."],
            advice: ["Chọn nơi làm việc cố định, ít phải đi công tác.", "Tập trung xây dựng nền tảng tại chỗ thật vững chắc."]
        }
    },

    // =========================================================================
    // WEALTH ARCHETYPES
    // =========================================================================
    WEALTH_GENERAL: {
        weak: {
            openers: ["Vận trình tài lộc cần sự tích lũy bền bỉ.", "Dòng tiền đến từ chuyên môn vững chắc."],
            core: ["không nên đầu tư mạo hiểm.", "hãy tiết kiệm và quản lý chặt chẽ."],
            advice: ["Học cách quản lý tài chính cá nhân.", "Đầu tư an toàn vào vàng hoặc gửi tiết kiệm."]
        },
        strong: {
            openers: ["Cơ hội làm giàu đang rộng mở.", "Khả năng kiểm soát tài chính tốt."],
            core: ["có thể đầu tư lớn sinh lời.", "đa dạng hóa nguồn thu nhập."],
            advice: ["Mạnh dạn nắm bắt cơ hội kinh doanh.", "Xây dựng hệ thống tài chính tự động."]
        }
    },

    WEALTH_TYPE: {
        strong: {
            openers: ["Bạn có duyên với các nguồn tiền 'Động' (đầu tư, kinh doanh).", "Tài lộc chủ về sự bứt phá và rủi ro."],
            core: ["Nên tập trung vào nguồn thu nhập thụ động và các dự án lớn.", "Tiền bạc sẽ sinh sôi khi được luân chuyển liên tục."],
            advice: ["Đa dạng danh mục đầu tư.", "Tìm kiếm các cơ hội có đòn bẩy tài chính cao."]
        },
        weak: {
            openers: ["Nguồn tài chính của bạn nên đến từ sự ổn định (Chính Tài).", "Sự an toàn là ưu tiên hàng đầu trong tài chính."],
            core: ["Nên tập trung vào công việc chính và tích lũy dần dần.", "Tránh xa các hình thức đầu cơ hay vay mượn quá sức."],
            advice: ["Tích lũy tài sản an toàn (bất động sản, vàng).", "Nói không với các lời mời đầu tư lãi suất cao bất thường."]
        }
    },

    // TIMING for WEALTH (When will wealth peak? Which year is good?)
    WEALTH_TIMING: {
        favorable: {
            openers: [
                "Vận trình tài lộc đang bước vào giai đoạn vượng phát.",
                "Đại vận hiện tại mở ra chu kỳ tài khí thịnh vượng.",
                "Lá số báo hiệu một giai đoạn tích cực về mặt tài chính."
            ],
            core: [
                "**Giai đoạn vượng nhất:** Trong vòng 3-5 năm tới, đặc biệt những năm có Thiên Can phù hợp Dụng Thần.",
                "Các năm Đại Vận đi đúng hướng sẽ là thời điểm tài lộc bùng nổ.",
                "Lưu niên hợp với Nhật Chủ chính là cơ hội vàng để phát tài.",
                "Chu kỳ vượng tài thường rơi vào giai đoạn trung niên (35-50 tuổi) theo lá số này."
            ],
            advice: [
                "Hãy chuẩn bị tâm thế và tích lũy nguồn lực ngay từ bây giờ.",
                "Tận dụng giai đoạn này để đầu tư và mở rộng kinh doanh."
            ]
        },
        unfavorable: {
            openers: [
                "Vận trình tài lộc cần thời gian để tích lũy và ổn định.",
                "Giai đoạn hiện tại chưa phải đỉnh cao của tài khí.",
                "Lá số khuyên bạn kiên nhẫn chờ đợi thời cơ chín muồi."
            ],
            core: [
                "**Giai đoạn vượng nhất:** Sẽ đến sau khi Đại Vận chuyển sang hành Dụng Thần.",
                "Tuổi trung niên và về sau sẽ là giai đoạn tài lộc ổn định hơn.",
                "Những năm Lưu niên không xung khắc với Nhật Chủ sẽ thuận lợi hơn.",
                "Chu kỳ tài vận sẽ cải thiện đáng kể sau giai đoạn 'hạn' hiện tại."
            ],
            advice: [
                "Tập trung tích lũy và tiết kiệm trong giai đoạn chờ đợi.",
                "Không nên mạo hiểm đầu tư lớn cho đến khi thời cơ thuận lợi."
            ]
        }
    },

    // =========================================================================
    // FENGSHUI ARCHETYPES (Items, Colors, Scents, Directions, Plants, Stones)
    // =========================================================================
    // These are selected based on FAVORABLE ELEMENT, not Strong/Weak.
    // Condition key = Favorable Element: kim, moc, thuy, hoa, tho
    FENGSHUI: {
        kim: {
            openers: [
                "Dựa trên phân tích lá số, dụng thần của bạn thuộc hành **Kim**.",
                "Hành **Kim** là nguồn năng lượng cần thiết để cân bằng mệnh cục của bạn.",
                "Mọi vật phẩm phong thủy liên quan đến Kim sẽ kích hoạt may mắn."
            ],
            core: [
                "**Màu sắc:** Màu trắng, bạc, xám, vàng kim là những lựa chọn hàng đầu.",
                "**Tinh dầu/Mùi hương:** Hương bạc hà, khuynh diệp (eucalyptus) - mùi the mát, trong lành.",
                "**Đá quý:** Thạch Anh Trắng, Pha Lê, Bạch Ngọc, Đá Mặt Trăng.",
                "**Hướng tốt:** Tây và Tây Bắc.",
                "**Cây trồng:** Cây Kim Tiền, Cây Lan Ý (lá tròn, gọn, hợp với khí Kim).",
                "**Vật phẩm:** Chuông gió kim loại, vật phẩm bằng đồng thau, bạc."
            ],
            advice: [
                "Sử dụng các vật phẩm kim loại để tăng cường khí tốt trong nhà.",
                "Mang theo bút kim loại hoặc đồng hồ kim loại như vật hộ mệnh hàng ngày."
            ]
        },
        moc: {
            openers: [
                "Dụng thần nằm ở hành **Mộc**, đây là nguồn sinh khí chính của bạn.",
                "Hành **Mộc** giúp bạn phát triển, mở rộng và sinh sôi nảy nở.",
                "Vật phẩm phong thủy thuộc Mộc sẽ mang lại sức sống và tài lộc."
            ],
            core: [
                "**Màu sắc:** Màu xanh lá cây, xanh ngọc bích, xanh lục.",
                "**Tinh dầu/Mùi hương:** Hương sả chanh, trầm, gỗ đàn hương (sandalwood) - mùi cây cỏ thiên nhiên.",
                "**Đá quý:** Ngọc Bích, Thạch Anh Xanh, Peridot, Emerald.",
                "**Hướng tốt:** Đông và Đông Nam.",
                "**Cây trồng:** Trầu Bà, Kim Ngân, Phát Tài, các loại cây lá xanh tươi tốt.",
                "**Vật phẩm:** Đồ gỗ tự nhiên, tranh vẽ cây cối, rừng núi."
            ],
            advice: [
                "Đặt cây xanh trong nhà, đặc biệt là phòng khách và văn phòng làm việc.",
                "Dùng tinh dầu sả chanh khi thiền định hoặc nghỉ ngơi để thu hút năng lượng tích cực."
            ]
        },
        thuy: {
            openers: [
                "Dụng thần của bạn thuộc hành **Thủy**, biểu tượng của sự linh hoạt và tài lộc.",
                "Hành **Thủy** là dòng chảy của tiền bạc và trí tuệ trong lá số của bạn.",
                "Vật phẩm phong thủy mang yếu tố Thủy sẽ chiêu tài lộc hiệu quả."
            ],
            core: [
                "**Màu sắc:** Màu đen, xanh dương đậm, xanh nước biển.",
                "**Tinh dầu/Mùi hương:** Hương hoa Nhài, hương biển, hương mưa - mùi mát lạnh, dịu nhẹ.",
                "**Đá quý:** Sapphire Xanh, Aquamarine, Thạch Anh Đen (Obsidian), Tourmaline Đen.",
                "**Hướng tốt:** Bắc.",
                "**Cây trồng:** Cây thủy sinh, Sen, Súng, hoặc bể cá cảnh.",
                "**Vật phẩm:** Bể cá phong thủy, thác nước mini, hình ảnh sông suối."
            ],
            advice: [
                "Đặt thác nước nhỏ hoặc bể cá cảnh gần cửa ra vào để đón tài lộc.",
                "Uống nhiều nước và thường xuyên đến những nơi có sông, hồ, biển để nạp năng lượng."
            ]
        },
        hoa: {
            openers: [
                "Dụng thần của bạn nằm ở hành **Hỏa**, nguồn sức mạnh và danh tiếng.",
                "Hành **Hỏa** tượng trưng cho sự nhiệt huyết, đam mê và thành công nổi bật.",
                "Vật phẩm phong thủy thuộc Hỏa sẽ kích hoạt vận may về danh tiếng và sự nghiệp."
            ],
            core: [
                "**Màu sắc:** Màu đỏ, cam, hồng, tím - những gam màu nóng.",
                "**Tinh dầu/Mùi hương:** Hương Quế, Hồi, Gừng, Đinh hương - mùi ấm áp, cay nồng.",
                "**Đá quý:** Hồng Ngọc (Ruby), Thạch Anh Hồng, Garnet, Đá Mặt Trời.",
                "**Hướng tốt:** Nam.",
                "**Cây trồng:** Cây hoa đỏ (Hồng, Đỗ Quyên), Trạng Nguyên.",
                "**Vật phẩm:** Nến thơm, đèn trang trí, tranh mặt trời."
            ],
            advice: [
                "Thắp nến thơm trong nhà để kích hoạt năng lượng Hỏa.",
                "Trang trí phòng làm việc với sắc đỏ để tăng cường động lực và sự tự tin."
            ]
        },
        tho: {
            openers: [
                "Dụng thần của bạn thuộc hành **Thổ**, nền tảng của sự ổn định và bền vững.",
                "Hành **Thổ** mang lại sự cân bằng, chắc chắn và nền tảng vững chắc.",
                "Vật phẩm phong thủy mang năng lượng Thổ giúp bạn ổn định và trữ tài."
            ],
            core: [
                "**Màu sắc:** Màu vàng đất, nâu, be, cam đất.",
                "**Tinh dầu/Mùi hương:** Hương Hoắc hương (Patchouli), Xạ hương - mùi đất, mùi cổ điển.",
                "**Đá quý:** Mắt Hổ, Thạch Anh Vàng (Citrine), Jasper, Đá Mã Não.",
                "**Hướng tốt:** Trung tâm nhà, Đông Bắc, Tây Nam.",
                "**Cây trồng:** Cây Sen Đá, Xương Rồng (tiết kiệm nước, ổn định, gần với đất).",
                "**Vật phẩm:** Đồ gốm sứ, tượng đá, đồ trang trí bằng đất nung."
            ],
            advice: [
                "Đặt các chậu cây sen đá trong nhà để ổn định vận khí.",
                "Sử dụng đồ gốm sứ trang trí để tăng cường năng lượng Thổ bền vững."
            ]
        }
    },

    // =========================================================================
    // PARTNERSHIP ARCHETYPES (Đối tác, Hợp tác kinh doanh)
    // =========================================================================
    PARTNER_TYPE: {
        strong: {
            openers: [
                "Với bản mệnh cường vượng, bạn có tố chất của một người dẫn dắt trong mọi mối quan hệ hợp tác.",
                "Năng lượng mạnh mẽ giúp bạn tự tin đàm phán và nắm thế chủ động trong kinh doanh.",
                "Lá số cho thấy bạn phù hợp với vai trò chủ chốt trong các dự án hợp tác."
            ],
            core: [
                "bạn nên nắm giữ quyền quyết định chính trong mọi thỏa thuận hợp tác.",
                "đối tác lý tưởng là người bổ trợ, hỗ trợ hậu cần thay vì cạnh tranh quyền lực.",
                "việc hùn hạp làm ăn sẽ thuận lợi nếu bạn giữ vai trò quản lý tài chính."
            ],
            advice: [
                "Chọn đối tác có tính cách điềm đạm, bổ sung cho sự quyết đoán của bạn.",
                "Luôn giữ quyền kiểm soát các quyết định chiến lược quan trọng."
            ]
        },
        weak: {
            openers: [
                "Bản mệnh thiên về sự hợp tác và cần sự hỗ trợ từ đối tác mạnh mẽ.",
                "Lá số khuyên bạn nên tìm kiếm những đối tác có năng lực bổ sung.",
                "Việc hợp tác kinh doanh sẽ mang lại nhiều lợi ích hơn so với đơn thương độc mã."
            ],
            core: [
                "đối tác lý tưởng là người có kinh nghiệm và mạng lưới quan hệ rộng.",
                "bạn nên đảm nhận vai trò chuyên môn thay vì quản lý tổng thể.",
                "sự gắn kết với đối tác đáng tin cậy sẽ giúp bạn vượt qua nhiều sóng gió."
            ],
            advice: [
                "Đừng vội vàng ký kết, hãy tìm hiểu kỹ background của đối tác.",
                "Xây dựng mối quan hệ dựa trên sự minh bạch và văn bản pháp lý rõ ràng."
            ]
        }
    },

    PARTNER_TIMING: {
        favorable: {
            openers: [
                "Thời điểm này rất thuận lợi cho các quyết định hợp tác và ký kết.",
                "Vận trình đang ủng hộ những bước tiến mới trong quan hệ đối tác.",
                "Đại vận hiện tại mở ra cơ hội gặp gỡ quý nhân trong kinh doanh."
            ],
            core: [
                "đây là lúc thích hợp để ký kết hợp đồng hoặc mở rộng hợp tác.",
                "những thỏa thuận đạt được trong giai đoạn này sẽ mang lại lợi ích lâu dài.",
                "bạn nên chủ động tìm kiếm và tiếp cận các đối tác tiềm năng."
            ],
            advice: [
                "Tận dụng thời cơ này để đàm phán các điều khoản có lợi.",
                "Mở rộng mạng lưới quan hệ kinh doanh ngay bây giờ."
            ]
        },
        unfavorable: {
            openers: [
                "Giai đoạn này cần thận trọng trong các quyết định hợp tác kinh doanh.",
                "Vận trình khuyên bạn nên giữ các mối quan hệ hiện có thay vì mở rộng.",
                "Thời điểm chưa thích hợp để ký kết các hợp đồng lớn."
            ],
            core: [
                "nên hoãn các thỏa thuận quan trọng đến khi vận trình thuận lợi hơn.",
                "cần đề phòng những bất đồng và xung đột lợi ích với đối tác.",
                "các mối quan hệ hợp tác mới trong giai đoạn này dễ gặp trở ngại."
            ],
            advice: [
                "Tập trung củng cố các mối quan hệ đối tác hiện có.",
                "Tránh đưa ra cam kết tài chính lớn trong thời điểm này."
            ]
        }
    },

    PARTNER_HURDLE: {
        strong: {
            openers: [
                "Bản mệnh có khả năng nhận diện và hóa giải các rủi ro trong hợp tác.",
                "Sự quyết đoán giúp bạn đối phó hiệu quả với các tình huống bất trắc.",
                "Lá số cho thấy bạn có thể kiểm soát được các mâu thuẫn với đối tác."
            ],
            core: [
                "rủi ro bị lừa gạt thấp nếu bạn duy trì sự cảnh giác và kiểm tra kỹ lưỡng.",
                "các mâu thuẫn trong hợp tác có thể được giải quyết bằng đối thoại thẳng thắn.",
                "sự minh bạch tài chính là chìa khóa để tránh xung đột lợi ích."
            ],
            advice: [
                "Luôn có luật sư hoặc cố vấn pháp lý khi ký kết hợp đồng quan trọng.",
                "Thiết lập cơ chế giám sát tài chính rõ ràng ngay từ đầu."
            ]
        },
        weak: {
            openers: [
                "Bản mệnh cần đặc biệt cẩn trọng trong các mối quan hệ hợp tác.",
                "Lá số cảnh báo về khả năng gặp tiểu nhân hoặc đối tác không trung thực.",
                "Sự nhạy cảm của bạn vừa là ưu điểm vừa là điểm yếu trong đàm phán."
            ],
            core: [
                "có nguy cơ bị lợi dụng nếu không cẩn thận trong việc chọn đối tác.",
                "các mâu thuẫn tài chính dễ xảy ra nếu không có văn bản ràng buộc rõ ràng.",
                "cần tránh hợp tác với những người có lá số xung khắc với bạn."
            ],
            advice: [
                "Không bao giờ góp vốn khi chưa có hợp đồng pháp lý chi tiết.",
                "Tham khảo ý kiến người thân trước mọi quyết định hợp tác lớn."
            ]
        }
    },

    PARTNER_ELEMENT: {
        strong: {
            openers: [
                "Dựa trên ngũ hành, bạn có thể xác định được đối tác tương sinh.",
                "Lá số cho thấy sự tương hợp ngũ hành rất quan trọng trong hợp tác.",
                "Năng lượng ngũ hành của đối tác sẽ ảnh hưởng lớn đến sự thành bại."
            ],
            core: [
                "đối tác mang hành {FAVORABLE_ELEMENT} sẽ bổ trợ và tương sinh cho bạn.",
                "nên tránh hợp tác sâu với người mang hành tương khắc.",
                "sự cân bằng ngũ hành giữa hai bên quyết định sự bền vững của hợp tác."
            ],
            advice: [
                "Tìm hiểu ngày sinh của đối tác để đánh giá mức độ tương hợp.",
                "Sử dụng vật phẩm phong thủy phù hợp khi gặp gỡ đối tác quan trọng."
            ]
        },
        weak: {
            openers: [
                "Việc chọn đối tác theo ngũ hành tương sinh sẽ giúp bổ khuyết cho bản mệnh.",
                "Lá số nhấn mạnh tầm quan trọng của việc tìm đối tác có năng lượng bổ sung.",
                "Đối tác phù hợp về ngũ hành sẽ giúp bạn ổn định và phát triển."
            ],
            core: [
                "ưu tiên tìm kiếm đối tác mang hành {FAVORABLE_ELEMENT} để nhận được trợ lực.",
                "đối tác có hành tương sinh sẽ giúp bạn vượt qua những giai đoạn khó khăn.",
                "sự hòa hợp ngũ hành tạo nên nền tảng vững chắc cho mối quan hệ lâu dài."
            ],
            advice: [
                "Nhờ chuyên gia Bát Tự phân tích mức độ tương hợp với đối tác tiềm năng.",
                "Tránh xa những người có lá số xung khắc mạnh với bạn."
            ]
        }
    },

    // Default fallbacks for other categories to prevent crashes while building out
    LOVE_GENERAL: {
        harmony: { openers: ["Tình duyên êm đẹp."], core: ["hạnh phúc bền lâu."], advice: ["Trân trọng người bên cạnh."] },
        clash: { openers: ["Cần vun vén tình cảm."], core: ["dễ có sóng gió nhỏ."], advice: ["Lắng nghe và thấu hiểu nhiều hơn."] }
    },

    // =========================================================================
    // EXTENDED ARCHETYPES - Question-Specific
    // =========================================================================

    // PALACE (Vượng/Suy questions)
    WEALTH_PALACE: {
        strong: {
            openers: [
                "Cung Tài của bạn đang ở trạng thái **VƯỢNG**.",
                "Phân tích Tứ Trụ cho thấy cung Tài Bạch của bạn rất mạnh.",
                "Năng lượng tài khí trong lá số thuộc dạng sung túc."
            ],
            core: [
                "Cung Tài có sự hiện diện của Dụng Thần, đây là dấu hiệu tài lộc hanh thông.",
                "Thiên Can và Địa Chi hỗ trợ tốt cho vận tài, báo hiệu khả năng tích lũy cao.",
                "Đây là lá số có cung Tài vượng khí, tiền bạc đến dễ dàng hơn người khác."
            ],
            advice: [
                "Tận dụng lợi thế này bằng cách mở rộng nguồn thu nhập.",
                "Đầu tư và kinh doanh là con đường phù hợp với cung Tài vượng của bạn."
            ]
        },
        weak: {
            openers: [
                "Cung Tài của bạn đang ở trạng thái **SUY**, cần sự nỗ lực nhiều hơn.",
                "Phân tích Tứ Trụ cho thấy cung Tài Bạch cần được bổ sung năng lượng.",
                "Tài khí trong lá số thuộc dạng cần tích lũy dần dần."
            ],
            core: [
                "Cung Tài bị Kị Thần xâm phạm, tiền bạc dễ đến nhanh đi nhanh.",
                "Thiên Can và Địa Chi chưa hỗ trợ tối ưu cho vận tài, cần kiên nhẫn tích lũy.",
                "Đây là lá số cần nỗ lực trong việc quản lý tài chính."
            ],
            advice: [
                "Tập trung vào tiết kiệm và quản lý chi tiêu chặt chẽ.",
                "Tránh đầu tư mạo hiểm, ưu tiên nguồn thu nhập ổn định."
            ]
        }
    },

    // HOANH TAI (Windfall questions)
    WEALTH_HOANH: {
        strong: {
            openers: [
                "Lá số cho thấy bạn **CÓ SỐ** hoành tài (phát tài bất ngờ).",
                "Phân tích cho thấy vận trình có khả năng đón nhận tài lộc bất ngờ.",
                "Thiên cơ của bạn ẩn chứa tiềm năng hoành tài."
            ],
            core: [
                "Sự hiện diện của Thiên Tài và Dịch Mã báo hiệu khả năng phát tài từ xa hoặc đột ngột.",
                "Các năm có Thiên Can hợp Dụng Thần là thời điểm hoành tài có thể xuất hiện.",
                "Vận may về tiền bạc có thể đến từ đầu tư, thừa kế hoặc cơ hội bất ngờ."
            ],
            advice: [
                "Tận dụng các cơ hội đầu tư khi vận may đến, nhưng vẫn phải tính toán.",
                "Hãy chuẩn bị tâm lý đón nhận những cơ hội tài chính bất ngờ."
            ]
        },
        weak: {
            openers: [
                "Lá số cho thấy tài lộc của bạn thiên về **Chính Tài** (tích lũy dần).",
                "Vận trình không báo hiệu nhiều về hoành tài, nhưng Chính Tài vững vàng.",
                "Tiền bạc đến với bạn qua nỗ lực và công việc hơn là may mắn."
            ],
            core: [
                "Không có dấu hiệu rõ ràng về hoành tài (Thiên Tài yếu hoặc bị khắc).",
                "Nguồn tài chính ổn định từ lương bổng, công việc chính là thế mạnh của bạn.",
                "Đừng kỳ vọng vào vận may bất ngờ, hãy tập trung xây dựng tài sản bền vững."
            ],
            advice: [
                "Tránh các hình thức đầu cơ rủi ro cao.",
                "Tập trung phát triển sự nghiệp chính để tăng thu nhập ổn định."
            ]
        }
    },

    // HEALTH NATURE (Bẩm sinh)
    HEALTH_NATURE: {
        strong: {
            openers: [
                "Sức khỏe bẩm sinh của bạn thuộc dạng **CƯỜNG TRÁNG**, thể lực sung mãn.",
                "Lá số cho thấy nền tảng sức khỏe vốn có rất tốt.",
                "Bạn được trời phú cho sức khỏe tốt và khả năng hồi phục nhanh."
            ],
            core: [
                "Thân vượng khí huyết dồi dào, ít bệnh vặt, năng lượng cao.",
                "Cơ thể có khả năng tự chữa lành và phục hồi tốt sau bệnh tật.",
                "Sức đề kháng tự nhiên mạnh, ít bị ảnh hưởng bởi thời tiết thay đổi."
            ],
            advice: [
                "Duy trì lối sống lành mạnh để bảo toàn lợi thế sức khỏe.",
                "Không nên ỷ lại vào sức khỏe tốt mà bỏ qua việc chăm sóc bản thân."
            ]
        },
        weak: {
            openers: [
                "Sức khỏe bẩm sinh của bạn thuộc dạng **NHẠY CẢM**, cần được chăm sóc đặc biệt.",
                "Lá số cho thấy thể chất cần được nâng niu và bảo vệ.",
                "Bạn cần chú trọng hơn đến việc dưỡng sinh và giữ gìn sức khỏe."
            ],
            core: [
                "Thân nhược khí huyết cần bổ sung, dễ mệt mỏi nếu làm việc quá sức.",
                "Hệ miễn dịch cần được củng cố, dễ bị ảnh hưởng bởi môi trường.",
                "Cần ngủ đủ giấc, ăn uống đầy đủ chất để duy trì năng lượng."
            ],
            advice: [
                "Tập thể dục nhẹ nhàng (yoga, đi bộ), ngủ đúng giờ, ăn uống cân bằng.",
                "Khám sức khỏe định kỳ và không nên làm việc quá sức."
            ]
        }
    },

    // HEALTH ELEMENT (Ngũ hành thiếu)
    HEALTH_ELEMENT: {
        kim: {
            openers: ["Ngũ hành trong lá số **THIẾU KIM**. Điều này ảnh hưởng đến phổi, da, đường hô hấp."],
            core: ["Bạn dễ gặp các vấn đề về hô hấp, da liễu, hoặc đại tràng. Hệ miễn dịch có thể yếu hơn."],
            advice: ["Bổ sung thực phẩm màu trắng (củ cải, tỏi), tập thở sâu, tránh môi trường ô nhiễm."]
        },
        moc: {
            openers: ["Ngũ hành trong lá số **THIẾU MỘC**. Điều này ảnh hưởng đến gan, mật, gân cốt."],
            core: ["Bạn dễ gặp các vấn đề về gan, mắt, hoặc căng thẳng thần kinh. Cần chú ý giải độc gan."],
            advice: ["Ăn nhiều rau xanh, tránh rượu bia, giữ tinh thần thoải mái, tập yoga/thiền."]
        },
        thuy: {
            openers: ["Ngũ hành trong lá số **THIẾU THỦY**. Điều này ảnh hưởng đến thận, bàng quang, xương."],
            core: ["Bạn dễ gặp các vấn đề về thận, hệ tiết niệu, hoặc xương khớp. Cần bổ sung nước đầy đủ."],
            advice: ["Uống đủ nước mỗi ngày, ăn đậu đen, hạt sen, tránh thức khuya."]
        },
        hoa: {
            openers: ["Ngũ hành trong lá số **THIẾU HỎA**. Điều này ảnh hưởng đến tim, mạch máu, ruột non."],
            core: ["Bạn dễ gặp các vấn đề về tim mạch, huyết áp, hoặc tiêu hóa. Tuần hoàn máu cần được chú ý."],
            advice: ["Tập thể dục đều đặn, ăn thực phẩm màu đỏ (cà chua, ớt), tránh stress."]
        },
        tho: {
            openers: ["Ngũ hành trong lá số **THIẾU THỔ**. Điều này ảnh hưởng đến dạ dày, lá lách, cơ bắp."],
            core: ["Bạn dễ gặp các vấn đề về tiêu hóa, dạ dày, hoặc cơ bắp yếu. Cần ăn uống điều độ."],
            advice: ["Ăn ngũ cốc, khoai lang, bí đỏ. Tránh ăn quá no hoặc quá đói."]
        }
    },

    // LOVE NATURE (Duyên nợ/Phúc)
    LOVE_NATURE: {
        harmony: {
            openers: [
                "Tình duyên của bạn thuộc dạng **PHÚC** - dễ gặp người tốt.",
                "Lá số báo hiệu vận tình cảm hanh thông, thuận lợi.",
                "Duyên phận đến với bạn nhẹ nhàng và tự nhiên."
            ],
            core: [
                "Cung Phu/Thê không bị xung khắc, tình cảm có nền tảng vững chắc.",
                "Bạn dễ thu hút người phù hợp và xây dựng mối quan hệ lành mạnh.",
                "Tình duyên là phúc đức, mang lại niềm vui và sự hỗ trợ trong cuộc sống."
            ],
            advice: [
                "Trân trọng những mối quan hệ tốt đẹp đến với bạn.",
                "Tin tưởng vào duyên số và mở lòng đón nhận tình yêu."
            ]
        },
        clash: {
            openers: [
                "Tình duyên của bạn thuộc dạng **DẠY BẢO** - cần trải qua thử thách để trưởng thành.",
                "Lá số cho thấy vận tình cảm có một số thử thách cần vượt qua.",
                "Duyên phận đến kèm theo các bài học quan trọng về tình yêu."
            ],
            core: [
                "Cung Phu/Thê có sự xung khắc, tình cảm cần sự nỗ lực để duy trì.",
                "Bạn có thể gặp trắc trở ban đầu, nhưng đây là cơ hội để học cách yêu thương.",
                "Tình duyên là nợ cần trả hoặc bài học cần học - mỗi mối quan hệ đều có ý nghĩa."
            ],
            advice: [
                "Kiên nhẫn và thấu hiểu là chìa khóa vượt qua các thử thách tình cảm.",
                "Đừng vội vàng kết hôn, hãy tìm hiểu kỹ trước khi cam kết."
            ]
        }
    },

    // KIDS NATURE (Duyên con)
    KIDS_NATURE: {
        strong: {
            openers: [
                "Duyên phận với con cái của bạn thuộc dạng **THUẬN LỢI**.",
                "Lá số cho thấy cung Con Cái vượng khí, dễ có và dễ nuôi.",
                "Mối quan hệ cha mẹ - con cái của bạn có nền tảng tốt đẹp."
            ],
            core: [
                "Cung Tử Tức không bị xung khắc, con cái ngoan ngoãn và biết vâng lời.",
                "Bạn có phúc về con, chúng sẽ mang lại niềm vui và sự tự hào.",
                "Con cái có khả năng thành đạt và hiếu thảo với cha mẹ."
            ],
            advice: [
                "Đầu tư thời gian chất lượng cho con để củng cố mối quan hệ.",
                "Định hướng đúng đắn cho con từ nhỏ để phát huy tiềm năng."
            ]
        },
        weak: {
            openers: [
                "Duyên phận với con cái của bạn cần **SỰ KIÊN NHẪN** và nỗ lực.",
                "Lá số cho thấy cung Con Cái cần được vun đắp cẩn thận.",
                "Mối quan hệ cha mẹ - con cái sẽ cần sự thấu hiểu và bao dung."
            ],
            core: [
                "Cung Tử Tức có một số thử thách, con cái có thể có tính cách độc lập mạnh.",
                "Cần nỗ lực nhiều hơn trong việc giao tiếp và hiểu con.",
                "Con cái có thể khác biệt quan điểm, cần tôn trọng sự khác biệt."
            ],
            advice: [
                "Lắng nghe và thấu hiểu thay vì áp đặt quan điểm lên con.",
                "Kiên nhẫn và bao dung là chìa khóa xây dựng mối quan hệ bền vững."
            ]
        }
    },

    // MISFORTUNE NATURE (Đại hạn)
    MIS_NATURE: {
        strong: {
            openers: [
                "Lá số của bạn có khả năng **CHỐNG CHỊU HẠN** tốt.",
                "Năng lượng vượng giúp bạn vượt qua các giai đoạn khó khăn.",
                "Các đại hạn sẽ khó ảnh hưởng sâu sắc đến bạn."
            ],
            core: [
                "Các năm xung khắc sẽ chỉ gây sóng gió nhẹ, không đủ sức quật ngã bạn.",
                "Đại vận xấu có thể mang đến thử thách nhưng bạn có sức đề kháng.",
                "Những năm Tam Tai, Thái Tuế sẽ chỉ là bước đệm chứ không phải vực sâu."
            ],
            advice: [
                "Giữ vững tinh thần lạc quan và tiếp tục tiến về phía trước.",
                "Cẩn trọng vẫn cần thiết nhưng không cần quá lo lắng."
            ]
        },
        weak: {
            openers: [
                "Lá số khuyên bạn cần **ĐỀ PHÒNG** các giai đoạn hạn vận.",
                "Năng lượng nhược khiến bạn nhạy cảm hơn với các biến động vận mệnh.",
                "Các đại hạn có thể ảnh hưởng rõ rệt đến cuộc sống của bạn."
            ],
            core: [
                "Những năm có Nhật Chủ bị xung khắc mạnh là thời điểm cần đề phòng: bệnh tật, tai nạn, thất bại.",
                "Đại vận xấu (10 năm) có thể là giai đoạn thử thách nghiêm trọng.",
                "Tam Tai, Thái Tuế, Kim Lâu là những năm cần đặc biệt cẩn trọng."
            ],
            advice: [
                "Tu tâm tích đức, làm việc thiện để hóa giải hạn.",
                "Tránh đưa ra quyết định lớn (mua nhà, kết hôn, khởi nghiệp) trong năm hạn."
            ]
        }
    },

    // =========================================================================
    // ADDITIONAL ARCHETYPES - Comprehensive Coverage
    // =========================================================================

    // LOVE TIMING (Kết hôn sớm/muộn)
    LOVE_TIMING: {
        favorable: {
            openers: [
                "Vận trình tình cảm của bạn đang thuận lợi cho việc tiến tới hôn nhân.",
                "Thiên thời đang ủng hộ những quyết định về tình cảm.",
                "Đại vận hiện tại mở ra cánh cửa cho hạnh phúc lứa đôi."
            ],
            core: [
                "Kết hôn **SỚM** (trước 30 tuổi) sẽ tận dụng được vận may tình cảm đang hanh thông.",
                "Thời điểm thanh xuân là lúc tình cảm nồng cháy nhất, nếu biết tiết chế cái tôi, bạn sẽ xây dựng được tổ ấm viên mãn ngay từ sớm.",
                "Các năm Đại Vận thuận lợi cho hôn nhân đang đến, hãy nắm bắt cơ hội."
            ],
            advice: [
                "Mở lòng đón nhận tình yêu và đừng quá kén chọn.",
                "Khi gặp người phù hợp, đừng chần chừ quá lâu."
            ]
        },
        unfavorable: {
            openers: [
                "Vận trình khuyên bạn nên cân nhắc kỹ về thời điểm kết hôn.",
                "Thiên thời chưa hoàn toàn thuận lợi cho hôn nhân trong giai đoạn này.",
                "Lá số cho thấy sự chín muồi trong tình cảm đến muộn hơn."
            ],
            core: [
                "Kết hôn **MUỘN** (sau 30 tuổi) sẽ mang lại sự ổn định và trưởng thành hơn trong lựa chọn.",
                "Vội vàng tiến tới hôn nhân có thể gặp trắc trở, hãy dành thời gian tìm hiểu kỹ.",
                "Sự nghiệp cần được xây dựng vững chắc trước khi lập gia đình."
            ],
            advice: [
                "Tập trung phát triển bản thân và sự nghiệp trước.",
                "Kiên nhẫn chờ đợi người thực sự phù hợp."
            ]
        }
    },

    // LOVE HURDLE (Trở ngại tình cảm)
    LOVE_HURDLE: {
        strong: {
            openers: [
                "Lá số cho thấy bạn có khả năng vượt qua các thử thách tình cảm.",
                "Năng lượng mạnh mẽ giúp bạn đối phó với các biến cố tình yêu.",
                "Các trở ngại trong tình cảm sẽ khó quật ngã được bạn."
            ],
            core: [
                "Nguy cơ ly hôn hoặc chia tay có thể được hóa giải bằng sự quyết tâm và thấu hiểu.",
                "Xung đột trong hôn nhân tồn tại nhưng bạn có năng lực giải quyết.",
                "Đào Hoa không gây ra tai họa nếu bạn biết kiềm chế và trung thành."
            ],
            advice: [
                "Chủ động giao tiếp và giải quyết xung đột sớm.",
                "Đừng để cái tôi làm hỏng mối quan hệ."
            ]
        },
        weak: {
            openers: [
                "Lá số khuyên bạn cần **THẬN TRỌNG** với các vấn đề tình cảm.",
                "Năng lượng nhược khiến bạn nhạy cảm hơn trong các mối quan hệ.",
                "Các trở ngại tình cảm có thể ảnh hưởng sâu sắc nếu không cẩn thận."
            ],
            core: [
                "Nguy cơ ly hôn hoặc chia tay cao hơn nếu không biết nhường nhịn và thấu hiểu.",
                "Xung đột trong hôn nhân cần được xử lý khéo léo để tránh đổ vỡ.",
                "Đào Hoa có thể mang đến những cám dỗ, cần tỉnh táo để tránh hối hận."
            ],
            advice: [
                "Lắng nghe nhiều hơn, nói ít đi trong các cuộc tranh luận.",
                "Tìm hiểu kỹ về đối tác trước khi cam kết dài hạn."
            ]
        }
    },

    // COLLEAGUES TYPE (Quan hệ đồng nghiệp)
    COL_TYPE: {
        strong: {
            openers: [
                "Với bản mệnh cường vượng, bạn thường **CHIẾM ƯU THẾ** trong quan hệ đồng nghiệp.",
                "Năng lượng mạnh mẽ giúp bạn tự tin và có tiếng nói trong tập thể.",
                "Lá số cho thấy bạn có khả năng dẫn dắt và ảnh hưởng đến đồng nghiệp."
            ],
            core: [
                "Đồng nghiệp thường nhìn nhận bạn là người có năng lực và đáng tin cậy.",
                "Bạn có thể gặp sự ganh đua nhưng sẽ dễ dàng khẳng định vị thế.",
                "Mối quan hệ công sở thuận lợi nếu bạn biết khiêm nhường."
            ],
            advice: [
                "Đừng quá áp đảo, hãy cho đồng nghiệp cơ hội thể hiện.",
                "Xây dựng mối quan hệ win-win thay vì cạnh tranh triệt để."
            ]
        },
        weak: {
            openers: [
                "Với bản mệnh cần hỗ trợ, quan hệ đồng nghiệp cần được **VUN ĐẮP** cẩn thận.",
                "Bạn có thể gặp một số thử thách trong môi trường công sở.",
                "Lá số khuyên nên tìm kiếm đồng minh và quý nhân trong công việc."
            ],
            core: [
                "Cần cẩn trọng với các thị phi ẩn tàng do sự xuất hiện của **Thị phi, Kiếp Tài**.",
                "Trong giao tiếp cần sự thận trọng để tránh những hiểu lầm không đáng có.",
                "Quan hệ với đồng nghiệp đôi khi gặp trắc trở, cần lấy sự điềm tĩnh làm lá chắn."
            ],
            advice: [
                "Hãy giữ khoảng cách an toàn trong giao tế.",
                "Tập trung vào chuyên môn thay vì chính trị công sở."
            ]
        }
    },

    // WEALTH NATURE (Bản chất tài vận)
    WEALTH_NATURE: {
        strong: {
            openers: [
                "Lá số cho thấy bạn có **SỐ GIÀU** hay tiềm năng tài lộc cao.",
                "Bạn thuộc mẫu người có khí chất làm giàu tự nhiên.",
                "Năng lượng tài khí trong Tứ Trụ của bạn rất mạnh mẽ."
            ],
            core: [
                "Tiền bạc đến với bạn dễ dàng hơn người khác nếu đi đúng hướng.",
                "Khả năng kiếm tiền và giữ tiền đều tốt, nền tảng tài chính vững chắc.",
                "Tài lộc là một trong những thế mạnh lớn nhất trong lá số của bạn."
            ],
            advice: [
                "Tận dụng lợi thế này để mở rộng đầu tư và tích lũy.",
                "Không nên tự mãn, tiếp tục phát triển nguồn thu nhập."
            ]
        },
        weak: {
            openers: [
                "Lá số cho thấy tài lộc **CẦN NỖ LỰC** nhiều hơn để đạt được.",
                "Bạn thuộc mẫu người cần kiên trì trong con đường làm giàu.",
                "Năng lượng tài khí cần được bổ sung và nuôi dưỡng."
            ],
            core: [
                "Tiền bạc đến với bạn qua sự nỗ lực và tích lũy dần dần.",
                "Khả năng kiếm tiền cần cải thiện, nhưng khả năng giữ tiền có thể là điểm mạnh.",
                "Tài lộc không phải thế mạnh tự nhiên nhưng có thể xây dựng qua nỗ lực."
            ],
            advice: [
                "Tập trung vào tiết kiệm và đầu tư an toàn.",
                "Học hỏi thêm về quản lý tài chính cá nhân."
            ]
        }
    },

    // CAREER HURDLE (Khó khăn sự nghiệp)
    CAREER_HURDLE: {
        strong: {
            openers: [
                "Lá số cho thấy bạn có khả năng **VƯỢT QUA** các khó khăn trong sự nghiệp.",
                "Năng lượng cường vượng giúp bạn đối phó với các biến cố công việc.",
                "Các trở ngại trong sự nghiệp sẽ chỉ là bước đệm cho thành công."
            ],
            core: [
                "Tiểu nhân hoặc cạnh tranh không thể gây hại nghiêm trọng nếu bạn giữ vững lập trường.",
                "Thất bại tạm thời sẽ nhanh chóng được phục hồi nhờ bản lĩnh.",
                "Áp lực công việc cao nhưng bạn có khả năng chịu đựng tốt."
            ],
            advice: [
                "Biến thử thách thành cơ hội để chứng minh bản thân.",
                "Không để những khó khăn nhỏ làm lung lay quyết tâm."
            ]
        },
        weak: {
            openers: [
                "Lá số khuyên bạn cần **CHUẨN BỊ** kỹ cho các khó khăn sự nghiệp.",
                "Năng lượng nhược khiến bạn nhạy cảm hơn với các biến động công việc.",
                "Các trở ngại trong sự nghiệp cần được xử lý thận trọng."
            ],
            core: [
                "Tiểu nhân hoặc cạnh tranh có thể gây ảnh hưởng nếu không cẩn thận.",
                "Thất bại có thể mất thời gian hồi phục, cần kế hoạch dự phòng.",
                "Áp lực công việc cần được quản lý để tránh burnout."
            ],
            advice: [
                "Xây dựng mạng lưới hỗ trợ và đồng minh trong công việc.",
                "Đừng đơn thương độc mã, hãy tìm người đỡ đầu (mentor)."
            ]
        }
    },

    // =========================================================================
    // LOCATION ARCHETYPES - Direction-based answers
    // =========================================================================
    // These use favorable element to determine actual directions
    // Kim=Tây/Tây Bắc, Mộc=Đông/Đông Nam, Thủy=Bắc, Hỏa=Nam, Thổ=Trung tâm/Tây Nam/Đông Bắc

    WEALTH_LOCATION: {
        kim: {
            openers: ["Vận may tiền bạc của bạn đến từ **hướng TÂY** và **TÂY BẮC**."],
            core: [
                "Phương Tây là phương vị của hành Kim, tương sinh với Dụng Thần của bạn.",
                "Các cơ hội làm ăn, đầu tư từ miền Tây hoặc các nước phương Tây sẽ thuận lợi.",
                "Nên đặt két sắt, bàn làm việc hướng về phía Tây để chiêu tài."
            ],
            advice: ["Di chuyển về phía Tây hoặc làm việc với đối tác từ phương Tây sẽ có lợi."]
        },
        moc: {
            openers: ["Vận may tiền bạc của bạn đến từ **hướng ĐÔNG** và **ĐÔNG NAM**."],
            core: [
                "Phương Đông là phương vị của hành Mộc, tương sinh với Dụng Thần của bạn.",
                "Các cơ hội từ miền Đông, các nước Đông Á sẽ mang lại tài lộc.",
                "Nên đặt cây xanh phía Đông nhà để kích hoạt vượng khí."
            ],
            advice: ["Di chuyển về phía Đông hoặc làm việc với đối tác từ phương Đông sẽ có lợi."]
        },
        thuy: {
            openers: ["Vận may tiền bạc của bạn đến từ **hướng BẮC**."],
            core: [
                "Phương Bắc là phương vị của hành Thủy, tương sinh với Dụng Thần của bạn.",
                "Các cơ hội từ miền Bắc, các nước phương Bắc sẽ mang lại tài lộc.",
                "Nên đặt bể cá hoặc đài phun nước phía Bắc nhà để chiêu tài."
            ],
            advice: ["Di chuyển về phía Bắc hoặc làm việc với đối tác từ phương Bắc sẽ có lợi."]
        },
        hoa: {
            openers: ["Vận may tiền bạc của bạn đến từ **hướng NAM**."],
            core: [
                "Phương Nam là phương vị của hành Hỏa, tương sinh với Dụng Thần của bạn.",
                "Các cơ hội từ miền Nam, các nước nhiệt đới sẽ mang lại tài lộc.",
                "Nên đặt đèn sáng, nến thơm phía Nam nhà để kích hoạt vượng khí."
            ],
            advice: ["Di chuyển về phía Nam hoặc làm việc với đối tác từ phương Nam sẽ có lợi."]
        },
        tho: {
            openers: ["Vận may tiền bạc của bạn đến từ **TRUNG TÂM**, **TÂY NAM** và **ĐÔNG BẮC**."],
            core: [
                "Phương vị Trung tâm, Tây Nam, Đông Bắc thuộc hành Thổ, tương sinh với Dụng Thần.",
                "Các cơ hội từ khu vực nội địa, vùng cao nguyên sẽ mang lại tài lộc.",
                "Nên đặt đồ gốm sứ, đá cảnh ở trung tâm nhà để chiêu tài."
            ],
            advice: ["Làm việc tại chỗ hoặc với đối tác trong nước sẽ có lợi hơn nước ngoài."]
        }
    },

    CAREER_LOCATION: {
        kim: {
            openers: ["Sự nghiệp của bạn sẽ phát triển thuận lợi khi đi về **hướng TÂY** hoặc **TÂY BẮC**."],
            core: [
                "Phương Tây là phương vị hợp mệnh, mở ra nhiều cơ hội thăng tiến.",
                "Làm việc cho công ty có trụ sở ở phía Tây thành phố hoặc các nước phương Tây sẽ thuận lợi."
            ],
            advice: ["Chọn văn phòng, nhà ở phía Tây để kích hoạt vận sự nghiệp."]
        },
        moc: {
            openers: ["Sự nghiệp của bạn sẽ phát triển thuận lợi khi đi về **hướng ĐÔNG** hoặc **ĐÔNG NAM**."],
            core: [
                "Phương Đông là phương vị hợp mệnh, mở ra nhiều cơ hội thăng tiến.",
                "Làm việc cho công ty có trụ sở ở phía Đông thành phố hoặc các nước Đông Á sẽ thuận lợi."
            ],
            advice: ["Chọn văn phòng, nhà ở phía Đông để kích hoạt vận sự nghiệp."]
        },
        thuy: {
            openers: ["Sự nghiệp của bạn sẽ phát triển thuận lợi khi đi về **hướng BẮC**."],
            core: [
                "Phương Bắc là phương vị hợp mệnh, mở ra nhiều cơ hội thăng tiến.",
                "Làm việc cho công ty có trụ sở ở phía Bắc thành phố hoặc các nước phương Bắc sẽ thuận lợi."
            ],
            advice: ["Chọn văn phòng, nhà ở phía Bắc để kích hoạt vận sự nghiệp."]
        },
        hoa: {
            openers: ["Sự nghiệp của bạn sẽ phát triển thuận lợi khi đi về **hướng NAM**."],
            core: [
                "Phương Nam là phương vị hợp mệnh, mở ra nhiều cơ hội thăng tiến.",
                "Làm việc cho công ty có trụ sở ở phía Nam thành phố hoặc các nước nhiệt đới sẽ thuận lợi."
            ],
            advice: ["Chọn văn phòng, nhà ở phía Nam để kích hoạt vận sự nghiệp."]
        },
        tho: {
            openers: ["Sự nghiệp của bạn sẽ ổn định nhất khi ở **TRUNG TÂM** hoặc **TÂY NAM/ĐÔNG BẮC**."],
            core: [
                "Phương vị Trung tâm là phương vị hợp mệnh, mang lại sự ổn định.",
                "Làm việc tại chỗ, không di chuyển xa sẽ giúp sự nghiệp vững chắc."
            ],
            advice: ["Không cần di chuyển xa, tập trung phát triển tại nơi hiện tại."]
        }
    },

    LOVE_LOCATION: {
        kim: {
            openers: ["Duyên tình của bạn đến từ **hướng TÂY** hoặc **TÂY BẮC**."],
            core: [
                "Người phù hợp với bạn có thể đến từ phía Tây hoặc các nước phương Tây.",
                "Đi du lịch, làm việc ở phương Tây sẽ dễ gặp được người có duyên."
            ],
            advice: ["Tham gia các hoạt động liên quan đến phương Tây để tăng cơ hội gặp gỡ."]
        },
        moc: {
            openers: ["Duyên tình của bạn đến từ **hướng ĐÔNG** hoặc **ĐÔNG NAM**."],
            core: [
                "Người phù hợp với bạn có thể đến từ phía Đông hoặc các nước Đông Á.",
                "Đi du lịch, làm việc ở phương Đông sẽ dễ gặp được người có duyên."
            ],
            advice: ["Tham gia các hoạt động liên quan đến phương Đông để tăng cơ hội gặp gỡ."]
        },
        thuy: {
            openers: ["Duyên tình của bạn đến từ **hướng BẮC**."],
            core: [
                "Người phù hợp với bạn có thể đến từ phía Bắc hoặc các nước phương Bắc.",
                "Đi du lịch, làm việc ở phương Bắc sẽ dễ gặp được người có duyên."
            ],
            advice: ["Tham gia các hoạt động liên quan đến phương Bắc để tăng cơ hội gặp gỡ."]
        },
        hoa: {
            openers: ["Duyên tình của bạn đến từ **hướng NAM**."],
            core: [
                "Người phù hợp với bạn có thể đến từ phía Nam hoặc các nước nhiệt đới.",
                "Đi du lịch, làm việc ở phương Nam sẽ dễ gặp được người có duyên."
            ],
            advice: ["Tham gia các hoạt động liên quan đến phương Nam để tăng cơ hội gặp gỡ."]
        },
        tho: {
            openers: ["Duyên tình của bạn đến từ **gần nhà** hoặc **qua người thân giới thiệu**."],
            core: [
                "Người phù hợp với bạn có thể ở ngay gần hoặc qua mai mối của người quen.",
                "Không cần đi xa để tìm duyên, hãy chú ý những người xung quanh."
            ],
            advice: ["Nhờ người thân, bạn bè giới thiệu sẽ dễ gặp được người phù hợp."]
        }
    }
};

module.exports = { LOGIC_ATOMS };
