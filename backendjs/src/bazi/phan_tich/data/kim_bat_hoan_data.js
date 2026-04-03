/**
 * Kim Bất Hoán Data
 */

const VERSE_DB = {
    '甲': {
        '子': "Giáp sinh tháng Tý, Ấn thụ vượng, hỷ gặp Hỏa vận, kỵ gặp Thủy đa. Chủ về thanh cao nhưng cô độc.",
        '丑': "Giáp sinh tháng Sửu, Tài tinh nắm quyền, hỷ gặp Quan tinh phát phú. Cần có Bính hỏa chiếu sưởi mới thành quý cục.",
        '寅': "Giáp sinh tháng Dần, Kiến lộc cách, hỷ Tài Quan, kỵ Tỷ Kiếp. Vận đi về hướng Nam (Hỏa) thì danh lợi vẹn toàn.",
        '卯': "Giáp sinh tháng Mão, Dương nhẫn quá vượng, hỷ Sát khắc nhẫn. Nếu gặp Dậu là xung phá nấc thang danh vọng.",
        '辰': "Giáp sinh tháng Thìn, Tài vận hanh thông, hỷ Mộc hỏa tương sinh. Đây là hạng người tài hoa, giỏi kinh bang tế thế.",
        '巳': "Giáp sinh tháng Tỵ, Thực thần đắc lệnh, hỷ Tài lộ, kỵ Ấn đa. Người này tính tình ôn hòa, phúc lộc dồi dào.",
        '午': "Giáp sinh tháng Ngọ, Thương quan quá vượng, hỷ Thủy nhuận, kỵ Hỏa liệt. Cần Nhâm Thủy lộ ra mới cứu được cái nóng mùa Hạ.",
        '未': "Giáp sinh tháng Mùi, Tài tinh vượng địa, hỷ Sát Quan, kỵ Kiếp sát. Chủ về hậu vận đại phú, con cháu hiển đạt.",
        '申': "Giáp sinh tháng Thân, Tuyệt địa phùng sinh, hỷ Ấn hóa Sát. Vận đi về hướng Tây (Kim) thì vất vả, hướng Đông (Mộc) thì hanh thông.",
        '酉': "Giáp sinh tháng Dậu, Chính quan cách, hỷ Tài sinh, kỵ Xung phá. Đây là cốt cách làm quan, liêm khiết chính trực.",
        '戌': "Giáp sinh tháng Tuất, Tài khố đại vượng, hỷ mở kho, kỵ bị đóng. Cần Thân Dậu Tuất hội cục mới thành đại phú.",
        '亥': "Giáp sinh tháng Hợi, Trường sinh chi địa, hỷ Hỏa sưởi ấm. Đông mộc cần Dương quang, vận về phương Nam là đắc cách."
    },
    '乙': {
        '子': "Ất sinh tháng Tý, Thủy phiếm Mộc phù, kỵ Thủy vượng, hỷ Hỏa vận. Cần Mậu Thổ chế Thủy làm gốc.",
        '丑': "Ất sinh tháng Sửu, Tài tinh đắc lệnh, hỷ Hỏa sưởi, kỵ Mộc vượng. Chủ về trung vận phát đạt.",
        '寅': "Ất sinh tháng Dần, Tỷ kiếp vượng, hỷ Sát Quan lộ ra. Vận về phương Nam là tốt nhất.",
        '卯': "Ất sinh tháng Mão, Kiến lộc cách, hỷ Tài Sát. Người này thông minh lanh lợi nhưng tính tình cương trực quá mức.",
        '辰': "Ất sinh tháng Thìn, Tài khố vượng địa, hỷ Mộc trợ Hỏa sinh. Đây là hạng người giàu sang, điền sản phong phú.",
        '巳': "Ất sinh tháng Tỵ, Thương quan sinh Tài, hỷ Thủy nhuận, kỵ Hỏa khô. Người này đa tài nghệ, khéo léo giao tiếp.",
        '午': "Ất sinh tháng Ngọ, Thương quan tuyệt địa, hỷ Thủy sinh, kỵ Hỏa táo. Cần có Nhâm Thủy mới giữ được thọ nguyên.",
        '未': "Ất sinh tháng Mùi, Tạp khí Tài Quan, hỷ Sát lộ. Chủ về sự nghiệp hanh thông, danh tiếng vang xa.",
        '申': "Ất sinh tháng Thân, Quan tinh đắc lệnh, hỷ Tài sinh, kỵ Hình xung. Đây là cốt cách hiền lương, phục vụ xã hội.",
        '酉': "Ất sinh tháng Dậu, Sát vượng lâm thân, hỷ Ấn hóa, kỵ Tài sinh Sát. Khéo léo thì thành danh, vụng về thì lao đao.",
        '戌': "Ất sinh tháng Tuất, Tài tinh vượng địa, hỷ Mộc hỏa. Hậu vận sung túc, con cháu thành đạt.",
        '亥': "Ất sinh tháng Hợi, Ấn thụ đắc địa, hỷ Hỏa ấm. Mùa Đông cây cỏ cần nắng, vận về Nam là đỉnh cao."
    },
    '丙': {
        '子': "Bính sinh tháng Tý, Chính quan cách, hỷ Tài sinh, kỵ Sát hỗn. Đông hỏa tinh quang, vận hướng Nam là quý.",
        '丑': "Bính sinh tháng Sửu, Thương quan nắm quyền, hỷ có Kim thủy, kỵ Thổ đa. Cần Bính hỏa trợ giúp mới thành đại tài.",
        '寅': "Bính sinh tháng Dần, Trường sinh địa, hỷ Tài Quan lộ ra. Vận về phương Đông thì quý, phương Bắc thì phát tài.",
        '卯': "Bính sinh tháng Mão, Ấn thụ vượng, hỷ Sát tinh. Người này học rộng tài cao, danh giá lẫy lừng.",
        '辰': "Bính sinh tháng Thìn, Thực thần đắc lệnh, hỷ Tài vượng. Chủ về phúc lộc dồi dào, sống thọ và an nhàn.",
        '巳': "Bính sinh tháng Tỵ, Kiến lộc cách, hỷ Tài Quan thủy kim. Ý chí mạnh mẽ, sự nghiệp lẫy lừng.",
        '午': "Bính sinh tháng Ngọ, Dương nhẫn đắc địa, hỷ Thủy chế, kỵ Mộc trợ. Cực vượng tất có biến, cần khiêm tốn mới bền.",
        '未': "Bính sinh tháng Mùi, Thương quan đắc lệnh, hỷ Thủy nhuận. Đây là hạng người tài hoa, giỏi mưu lược kiện tụng.",
        '申': "Bính sinh tháng Thân, Tài tinh đắc lệnh, hỷ thân vượng gặp Quan. Người này giỏi kinh doanh, danh lợi song thu.",
        '酉': "Bính sinh tháng Dậu, Tài vượng thân yếu, hỷ Tỷ Kiếp trợ. Vận về phương Đông (Mộc) là lúc phát tài nhất.",
        '戌': "Bính sinh tháng Tuất, Tài khố vượng, hỷ mở kho. Cần Thủy mộc để điều hòa mới thành quý cục.",
        '亥': "Bính sinh tháng Hợi, Sát tinh đương vị, hỷ Ấn hóa Sát. Gặp Giáp mộc hóa Sát thì văn võ song toàn."
    },
    '丁': {
        '子': "Đinh sinh tháng Tý, Sát vượng lâm thân, kỵ Thủy đa, hỷ Giáp mộc hóa Sát. Có Giáp thì hóa thành danh môn quý tộc.",
        '丑': "Đinh sinh tháng Sửu, Thực thần mộ địa, hỷ Hỏa trợ, kỵ Thổ vượng. Hậu vận an nhàn nhưng cần đề phòng sức khỏe.",
        '寅': "Đinh sinh tháng Dần, Ấn thụ trường sinh, hỷ Kim thủy. Ý chí kiên cường, học hành đỗ đạt cao.",
        '卯': "Đinh sinh tháng Mão, Thiên ấn đắc lệnh, hỷ Tài chế. Người này tính tình cô độc nhưng tài năng xuất chúng.",
        '辰': "Đinh sinh tháng Thìn, Thương quan vượng, hỷ có Ấn. Đây là hạng người thông minh, giỏi nghệ thuật hoặc kỹ thuật.",
        '巳': "Đinh sinh tháng Tỵ, Kiến lộc vượng, hỷ Tài tinh. Sự nghiệp vững chắc, gia đạo bình yên.",
        '午': "Đinh sinh tháng Ngọ, Kiến lộc cách, hỷ Kim thủy tương sinh. Năng lực điều hành cực tốt, nhưng tính khí nóng nảy.",
        '未': "Đinh sinh tháng Mùi, Thực thần vượng, hỷ Sát lộ. Chủ về danh tiếng phát đạt ở hậu vận.",
        '申': "Đinh sinh tháng Thân, Tài vượng thân nhược, hỷ Tỷ Kiếp trợ giúp. Vận về phương Nam thì phát tài to.",
        '酉': "Đinh sinh tháng Dậu, Thiên tài đắc vị, hỷ Kim yếu. Người này nhạy bén với tiền bạc, dễ thành đại phú.",
        '戌': "Đinh sinh tháng Tuất, Tài khố vượng, hỷ Hình xung mở kho. Cần Hỏa trợ mới gánh nổi tài khố lớn.",
        '亥': "Đinh sinh tháng Hợi, Quan tinh đương lệnh, hỷ Tài sinh. Cốt cách phong lưu, thanh tao, quý hiển."
    },
    '戊': {
        '子': "Mậu sinh tháng Tý, Tài tinh đắc địa, hỷ Hỏa sinh thân, kỵ Thủy vượng. Cần có Bính Đinh hỏa mới ấm được lòng đất.",
        '丑': "Mậu sinh tháng Sửu, Tạp khí Tài Quan, hỷ Hình xung mở kho. Người này tính tình trung hậu, hậu vận giàu sang.",
        '寅': "Mậu sinh tháng Dần, Trường sinh ngộ Sát, hỷ Ấn hóa Sát. Vận về phương Nam (Hỏa) là đắc cách nhất.",
        '卯': "Mậu sinh tháng Mão, Quan tinh đắc lệnh, hỷ Tài sinh. Cốt cách chính trực, hiền lương, đời sống ổn định.",
        '辰': "Mậu sinh tháng Thìn, Tài khố vượng, hỷ Mộc hỏa. Đây là hạng người tài hoa, giỏi quản lý tài lực.",
        '巳': "Mậu sinh tháng Tỵ, Kiến lộc cách, hỷ Thủy nhuận Thổ. Cốt cách vững chãi, sự nghiệp vinh quang.",
        '午': "Mậu sinh tháng Ngọ, Ấn thụ đương quyền, hỷ Thủy nhuận Thổ, kỵ Hỏa táo. Cốt cách vững chãi, hậu vận cực tốt.",
        '未': "Mậu sinh tháng Mùi, Thực thần vượng địa, hỷ Sát lộ. Chủ về danh tiếng lẫy lừng, con cháu hiển đạt.",
        '申': "Mậu sinh tháng Thân, Thực thần sinh Tài, hỷ Thủy mộc, kỵ Hỏa táo. Người này thông minh, giỏi mưu lược sinh tài.",
        '酉': "Mậu sinh tháng Dậu, Thương quan nắm quyền, hỷ Tài tinh. Tài năng xuất chúng, danh lợi song thu.",
        '戌': "Mậu sinh tháng Tuất, Tài khố đại vượng, hỷ mở kho. Vận về phương Tây (Kim) là lúc phát tài nhất.",
        '亥': "Mậu sinh tháng Hợi, Tài tinh trường sinh, hỷ Hỏa ấm Thổ. Vận về hướng Nam là quý cục."
    },
    '己': {
        '子': "Kỷ sinh tháng Tý, Tài vượng lâm đầu, hỷ Hỏa sưởi, kỵ Thủy hàn. Thổ mùa Đông cần hơi ấm để sinh trưởng.",
        '丑': "Kỷ sinh tháng Sửu, Tạp khí Ấn khố, hỷ mở kho phùng Kim. Hậu vận sung túc, điền sản phong phú.",
        '寅': "Kỷ sinh tháng Dần, Quan tinh đương lệnh, hỷ Hỏa hóa. Cốt cách thanh cao, học hành đỗ đạt.",
        '卯': "Kỷ sinh tháng Mão, Sát vượng lâm thân, hỷ có Ấn hóa. Đây là hạng người kiên cường, vượt khó đi lên.",
        '辰': "Kỷ sinh tháng Thìn, Tài tinh trường sinh, hỷ Mộc sơ thông Thổ. Người này giỏi kinh doanh, tích lũy tài sản tốt.",
        '巳': "Kỷ sinh tháng Tỵ, Ấn thụ đương quyền, hỷ Thủy nhuận. Sự nghiệp vững chắc, được quý nhân phù trợ.",
        '午': "Kỷ sinh tháng Ngọ, Lộc địa đắc vị, hỷ Kim thủy tương tế. Chủ về quyền hành, có tài lãnh đạo tài ba.",
        '未': "Kỷ sinh tháng Mùi, Tạp khí Tài Quan, hỷ lộ ra. Cốt cách ôn hòa, đời sống an nhàn, phúc lộc thọ toàn.",
        '申': "Kỷ sinh tháng Thân, Thương quan sinh Tài, hỷ Thủy mộc, kỵ Thổ trọng. Tài năng phát lộ sớm, danh tiếng vang xa.",
        '酉': "Kỷ sinh tháng Dậu, Thực thần nắm quyền, hỷ Tài tinh. Chủ về ăn uống, hưởng lạc, phúc khí dồi dào.",
        '戌': "Kỷ sinh tháng Tuất, Tài khố đại vượng, hỷ mở kho. Vận về Tây phương (Kim) là đắc địa nhất.",
        '亥': "Kỷ sinh tháng Hợi, Tài tinh đắc địa, hỷ Hỏa warm. Mùa Đông cần sưởi ấm để hành Thổ không bị đóng băng."
    },
    '庚': {
        '子': "Canh sinh tháng Tý, Thương quan đắc lệnh, hỷ Hỏa ấm, kỵ Thủy lạnh. Kim hàn Thủy lãnh cần Hỏa vận mới hanh thông.",
        '丑': "Canh sinh tháng Sửu, Tạp khí Ấn khố, hỷ Hình xung mở kho. Hậu vận phát đạt, điền sản dồi dào.",
        '寅': "Canh sinh tháng Dần, Tài vượng sinh Sát, hỷ Ấn hóa. Đây là hạng người liều lĩnh, thích mạo hiểm để thành công.",
        '卯': "Canh sinh tháng Mão, Tài tinh đắc lệnh, hỷ Kim nhược gặp Ấn. Vận về phương Tây là lúc phát tài to.",
        '辰': "Canh sinh tháng Thìn, Ấn thụ nắm quyền, hỷ mở kho. Cốt cách thanh cao, đời sống an nhàn.",
        '巳': "Canh sinh tháng Tỵ, Sát tinh đương vị, hỷ Thổ hóa. Chủ về võ nghiệp, quyền hành, sự nghiệp lẫy lừng.",
        '午': "Canh sinh tháng Ngọ, Quan vượng lâm thân, hỷ Thổ hóa Sát, kỵ Mộc trợ Hỏa. Cốt cách cương trực, gặp vận tốt sẽ phất nhanh.",
        '未': "Canh sinh tháng Mùi, Tạp khí Tài Quan, hỷ lộ ra. Chủ về danh lợi vẹn toàn, hậu vận hiển đạt.",
        '申': "Canh sinh tháng Thân, Kiến lộc vượng tướng, hỷ Tài Quan mộc hỏa. Ý chí kiên cường, sự nghiệp lẫy lừng.",
        '酉': "Canh sinh tháng Dậu, Dương nhẫn đắc địa, hỷ Sát chế. Đây là người quyết đoán, có khả năng xoay chuyển cục diện.",
        '戌': "Canh sinh tháng Tuất, Tài khố đại vượng, hỷ mở kho. Vận về Tây phương (Kim) tài lộc hanh thông.",
        '亥': "Canh sinh tháng Hợi, Thực thần nắm quyền, hỷ Hỏa ấm Kim. Mùa Đông Kim lạnh cần Hỏa sưởi mới đắc dụng."
    },
    '辛': {
        '子': "Tân sinh tháng Tý, Thực thần đắc lệnh, hỷ Hỏa ấm, kỵ Thủy lạnh. Châu ngọc mùa Đông cần hơi ấm để tỏa sáng.",
        '丑': "Tân sinh tháng Sửu, Tạp khí Ấn khố, hỷ phùng Hình mở kho. Hậu vận an nhàn, điền sản giàu sang.",
        '寅': "Tân sinh tháng Dần, Tài vượng sinh Quan, hỷ Kim nhược có Ấn che chở. Vận phương Tây là đắc địa.",
        '卯': "Tân sinh tháng Mão, Thiên tài đắc vị, hỷ Kim nhược gặp Ấn. Vận về hướng Tây thì phát tài, hướng Đông thì vất vả.",
        '辰': "Tân sinh tháng Thìn, Ấn thụ nắm quyền, hỷ mở kho. Cốt cách thanh cao, học hành thông minh.",
        '巳': "Tân sinh tháng Tỵ, Chính quan đắc lộc, hỷ Thủy chế, kỵ Hỏa táo. Đây là hạng người khéo léo, quý hiển.",
        '午': "Tân sinh tháng Ngọ, Sát tinh đương quyền, hỷ có Thổ hóa, kỵ Mộc vượng trợ Sát. Cần Thổ dày để nạp Hỏa sinh Kim mới thành quý cách.",
        '未': "Tân sinh tháng Mùi, Tạp khí Tài Quan, hỷ lộ ra mới quý. Thổ trọng Kim mai, cần Mộc sơ thông.",
        '申': "Tân sinh tháng Thân, Thân vượng gặp Sát, hỷ Hỏa chế. Ý chí mạnh mẽ, thích phiêu lưu mạo hiểm.",
        '酉': "Tân sinh tháng Dậu, Kiến lộc vượng tướng, hỷ Tài Quan. Cốt cách thanh cao, danh giá, hậu vận hanh thông.",
        '戌': "Tân sinh tháng Tuất, Ấn mộ chi địa, hỷ mở kho gặp Kim. Cần có Nhâm Thủy mới thoát khỏi sự vùi lấp.",
        '亥': "Tân sinh tháng Hợi, Thương quan đắc vị, hỷ Hỏa sưởi ấm. Cần có Mậu Thổ chế bớt Thủy phiếm."
    },
    '壬': {
        '子': "Nhâm sinh tháng Tý, Dương nhẫn quá cường, hỷ Mậu thổ chế, kỵ Thủy vượng. Càng gian nan càng tỏa sáng.",
        '丑': "Nhâm sinh tháng Sửu, Tạp khí Ấn khố, hỷ mở kho, kỵ Thủy đa. Hậu vận vinh hiển, điền sản dồi dào.",
        '寅': "Nhâm sinh tháng Dần, Thực thần sinh Tài, hỷ Thủy mộc. Người này thông minh, phóng khoáng, dễ thành công.",
        '卯': "Nhâm sinh tháng Mão, Thương quan nắm quyền, hỷ có Tài tinh. Tài năng nghệ thuật hoặc kinh doanh phát lộ sớm.",
        '辰': "Nhâm sinh tháng Thìn, Sát tinh đương vị, hỷ Ấn hóa. Đây là người có tham vọng lớn, sự nghiệp vẻ vang.",
        '巳': "Nhâm sinh tháng Tỵ, Tài tinh đắc lệnh, hỷ thân vượng. Vận về phương Bắc (Thủy) là lúc phát tài nhất.",
        '午': "Nhâm sinh tháng Ngọ, Tài Quan song mỹ, hỷ Thân vượng, kỵ Sát cường. Vận về hướng Bắc là đắc cách nhất.",
        '未': "Nhâm sinh tháng Mùi, Tạp khí Tài Quan, hỷ lộ ra. Chủ về danh giá, thanh cao, cuộc sống ổn định.",
        '申': "Nhâm sinh tháng Thân, Ấn thụ đương lệnh, hỷ Tài tinh phá Ấn. Người này học rộng tài cao, danh lừng tứ hải.",
        '酉': "Nhâm sinh tháng Dậu, Ấn thụ vượng địa, hỷ Sát sinh Ấn. Cốt cách phong lưu, hiền tài, hậu vận an nhàn.",
        '戌': "Nhâm sinh tháng Tuất, Tài khố vượng, hỷ mở kho. Vận về phương Bắc tài lộc sung túc.",
        '亥': "Nhâm sinh tháng Hợi, Kiến lộc cách, hỷ Tài Quan mộc hỏa. Ý chí kiên cường, tự lập thành danh."
    },
    '癸': {
        '子': "Quý sinh tháng Tý, Kiến lộc đắc địa, hỷ Hỏa sưởi, kỵ Thủy hàn. Thủy mùa Đông cần hơi ấm để lưu thông.",
        '丑': "Quý sinh tháng Sửu, Tạp khí Ấn khố, hỷ Hình mở kho. Hậu vận ấm êm, dư dả tiền bạc.",
        '寅': "Quý sinh tháng Dần, Thương quan nắm quyền, hỷ có Tài. Người này khéo léo, nhiều sáng kiến độc đáo.",
        '卯': "Quý sinh tháng Mão, Thực thần đắc lệnh, hỷ Tài tinh. Cuộc sống bình yên, phúc lộc thọ toàn.",
        '辰': "Quý sinh tháng Thìn, Quan tinh đương vị, hỷ Tài sinh. Cốt cách chính trực, hiền đức, được trọng dụng.",
        '巳': "Quý sinh tháng Tỵ, Tài Quan song mỹ, hỷ thân vượng. Sự nghiệp thăng tiến nhanh chóng, đại phú đại quý.",
        '午': "Quý sinh tháng Ngọ, Tài quan đắc lệnh, hỷ Thân vượng gặp Ấn. Cốt cách tinh tế, hậu vận đại quý.",
        '未': "Quý sinh tháng Mùi, Tạp khí Tài Quan, hỷ Sát lộ. Chủ về quyền hành, có danh tiếng trong xã hội.",
        '申': "Quý sinh tháng Thân, Ấn thụ trường sinh, hỷ Tài thấu. Sự nghiệp vững chắc, gia đạo bình yên.",
        '酉': "Quý sinh tháng Dậu, Thiên ấn đắc lệnh, hỷ Tài chế. Tài năng đặc biệt trong các lĩnh vực chuyên môn.",
        '戌': "Quý sinh tháng Tuất, Tài khố đại vượng, hỷ mở kho. Vận phương Nam tài lộc hanh thông.",
        '亥': "Quý sinh tháng Hợi, Tỷ kiếp vượng địa, hỷ Hỏa ấm. Người này nhiệt tình, tốt bụng nhưng cần đề phòng hao tài."
    }
};

const LUCK_RULES = {
    '辛_午': {
        '申': "Vận Thân (Tây phương): Tân Kim gặp đất trường sinh, thân vượng đủ sức đương đầu với Sát. Đây là vận 'Hóa hung thành cát'.",
        '酉': "Vận Dậu (Tây phương): Lộc địa của Tân Kim, sự nghiệp thăng tiến, tài lộc dồi dào.",
        '戌': "Vận Tuất (Tây phương): Ấn khố của Kim, có sự hỗ trợ ngầm từ quý nhân.",
        '寅': "Vận Dần (Đông phương): Mộc vượng trợ Hỏa thiêu Kim, rủi ro cao về sức khỏe và pháp lý.",
        '卯': "Vận Mão (Đông phương): Mão Ngọ tương phá, lại trợ Sát hại thân, vạn sự cần cẩn trọng."
    },
    '甲_子': {
        '巳': "Vận Tỵ (Nam phương): Hỏa sưởi ấm Đông mộc, cơ hội khởi nghiệp rộng mở.",
        '午': "Vận Ngọ (Nam phương): Xung Tý mở kho, thay đổi lớn về nơi ở hoặc công việc theo hướng tích cực.",
        '未': "Vận Mùi (Nam phương): Tài tinh vượng địa, danh lợi vẹn toàn."
    },
    '丙_申': {
        '子': "Vận Tý (Bắc phương): Thủy hỏa tương tế, quyền uy lẫy lừng.",
        '寅': "Vận Dần (Đông phương): Hình xung lệnh tháng, biến động lớn về gia đạo."
    },
    '戊_午': {
        '亥': "Vận Hợi (Bắc phương): Nước nhuận đất khô, vạn vật sinh sôi, tài lộc hanh thông.",
        '子': "Vận Tý (Bắc phương): Xung kích Dương Nhẫn, đề phòng tai ương bất ngờ."
    },
    '庚_辰': {
        '酉': "Vận Dậu (Tây phương): Thần hợp hóa Kim, ý chí mạnh mẽ, sự nghiệp thăng tiến.",
        '戌': "Vận Tuất (Tây phương): Xung mở Ấn khố, học hành đỗ đạt, có danh tiếng lớn."
    },
    '壬_戌': {
        '卯': "Vận Mão (Đông phương): Mão Tuất hợp Hỏa, tài vận bộc phát, có duyên với bất động sản.",
        '辰': "Vận Thìn (Trung ương): Xung kho tài, tiền bạc vào ra thất thường, cần quản lý tốt."
    }
};

const HY_KY_RULES = {
    '辛_午': "Sợ nhất vận Mão vì Mão Ngọ tương phá, lại trợ Sát hại thân.",
    '甲_子': "Thích nhất Bính hỏa lộ ra để sưởi ấm cành khô mùa Đông.",
    '丙_子': "Hỷ mộc sinh hỏa, kỵ thủy đa diệt quang.",
    '丁_亥': "Hỷ Giáp mộc hóa Sát sinh thân, kỵ Thổ dày làm mờ lửa đèn.",
    '戊_寅': "Hỷ Hỏa ấm Thổ, kỵ Kim khắc mộc làm mất đi sinh khí.",
    '己_卯': "Hỷ Thổ dày trợ thân, kỵ Thủy vượng làm đất lầy lội.",
    '庚_申': "Hỷ Tài Quan lộ hiển, kỵ Tỷ Kiếp tranh đoạt.",
    '壬_子': "Hỷ Mậu Thổ ngăn nước, kỵ Thủy vượng dâng cao.",
    '癸_巳': "Hỷ Kim mộc tương sinh, kỵ Hỏa vượng làm cạn dòng sương mù."
};

const DEFAULT_HY_KY = {
    'Mộc': [
        "Hỷ Thủy sinh, Hỏa tiết. Cần cân bằng Âm Dương, tránh Kim khắc quá mạnh.",
        "Mộc nhật chủ hỷ gặp Ấn Tỉ sinh trợ, kỵ Kim vượng phạt thân.",
        "Nhật chủ thuộc Mộc thích hợp vận về phương Đông hoặc Nam (Hỏa sinh).",
    ],
    'Hỏa': [
        "Hỷ Mộc sinh, Thổ tiết. Cần có Thủy điều hòa, tránh táo nhiệt quá độ.",
        "Hỏa nhật chủ hỷ gặp Ấn Tỉ trợ lực, kỵ Thủy vượng khắc thân.",
        "Nhật chủ thuộc Hỏa thích hợp vận về phương Nam hoặc Đông (Mộc sinh).",
    ],
    'Thổ': [
        "Hỷ Hỏa sinh, Kim tiết. Cần có Mộc sơ thông, tránh ngưng tụ quá dày.",
        "Thổ nhật chủ hỷ gặp Ấn Tỉ trợ lực, kỵ Mộc vượng làm rạn nứt.",
        "Nhật chủ thuộc Thổ thích hợp vận về phương Nam (Hỏa sinh) hoặc Trung ương.",
    ],
    'Kim': [
        "Hỷ Thổ sinh, Thủy tiết. Cần có Hỏa rèn luyện, tránh bị vùi lấp.",
        "Kim nhật chủ hỷ gặp Ấn Tỉ trợ lực, kỵ Hỏa vượng khắc chảy.",
        "Nhật chủ thuộc Kim thích hợp vận về phương Tây hoặc Trung ương (Thổ sinh).",
    ],
    'Thủy': [
        "Hỷ Kim sinh, Mộc tiết. Cần có Thổ ngăn đê, tránh phiếm lạm.",
        "Thủy nhật chủ hỷ gặp Ấn Tỉ trợ lực, kỵ Thổ vượng cản dòng.",
        "Nhật chủ thuộc Thủy thích hợp vận về phương Bắc hoặc Tây (Kim sinh).",
    ]
};

module.exports = {
    VERSE_DB,
    LUCK_RULES,
    HY_KY_RULES,
    DEFAULT_HY_KY
};
