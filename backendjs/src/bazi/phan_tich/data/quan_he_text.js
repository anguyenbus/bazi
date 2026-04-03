/**
 * Dữ liệu luận giải Quan Hệ Can Chi (ĐẦY ĐỦ)
 * Aggregated and Standardized form.
 * Updated: Tam Hội, Bán Hợp, Bán Hình, Thiên Can Khắc (Full), Ám Hợp.
 */

const TEXTS = {
    // --- THIÊN CAN ---
    "THIEN_CAN_HOP": {
        "Giáp-Kỷ": "Trung chính chi hợp (Hóa Thổ): Chủ người tôn trọng chữ tín, tính tình khoan dung, nhưng đôi khi thiếu quyết đoán. Vận tốt thì được quý nhân giúp đỡ, vận xấu thì dễ bị tình cảm chi phối.",
        "Ất-Canh": "Nhân nghĩa chi hợp (Hóa Kim): Chủ người cương trực, quả quyết. Nữ mệnh thường có chồng quyền quý hoặc bản thân mạnh mẽ. Nam mệnh dễ thành công trong quân sự, pháp luật.",
        "Bính-Tân": "Uy chế chi hợp (Hóa Thủy): Chủ người có khí chất, uy nghiêm nhưng cũng thích hưởng thụ. Có tài ngoại giao, dễ thu hút người khác phái.",
        "Đinh-Nhâm": "Đa tình chi hợp (Hóa Mộc): Chủ người nhân duyên tốt, trọng tình cảm, tâm hồn lãng mạn. Cần đề phòng rắc rối vì chuyện nam nữ.",
        "Mậu-Quý": "Vô tình chi hợp (Hóa Hỏa): Chủ người vẻ ngoài nho nhã, lễ độ nhưng nội tâm lạnh lùng hoặc tính toán kỹ lưỡng. Dễ đạt được mục đích về tài chính."
    },
    "THIEN_CAN_XUNG": {
        // Tứ Xung (Direct Clashes)
        "Giáp-Canh": "Giáp Canh tương xung: Kim Mộc giao chiến, chủ về đau đầu, thần kinh căng thẳng, hoặc các bệnh về gan mật, tay chân. Sự nghiệp thường có biến động lớn.",
        "Ất-Tân": "Ất Tân tương xung: Âm Kim khắc Âm Mộc, chủ về thị phi, rắc rối giấy tờ, hoặc đau nhức xương khớp. Tâm tính hay thay đổi.",
        "Bính-Nhâm": "Bính Nhâm tương xung: Thủy Hỏa bất dung, chủ về bệnh mắt, tim mạch, huyết áp. Tính cách nóng nảy nhưng mau quên. Dễ gặp tai nạn sông nước hoặc lửa điện.",
        "Đinh-Quý": "Đinh Quý tương xung: Âm Thủy khắc Âm Hỏa, chủ về mâu thuẫn nội tâm, bệnh về máu huyết hoặc tim. Dễ bị tiểu nhân ám hại ngầm."
    },
    "THIEN_CAN_KHAC": {
        // Các cặp khắc còn lại
        "Giáp-Mậu": "Giáp khắc Mậu: Mộc Thổ tương khắc. Chủ về hao tài, lo nghĩ, dạ dày kém. Đối với Mậu thổ quá vượng thì là sự khai phá tốt.",
        "Ất-Kỷ": "Ất khắc Kỷ: Mộc Thổ tương khắc (Âm khắc Âm). Quan hệ dây dưa, khó chịu. Dễ mắc bệnh tỳ vị, ăn uống kém.",
        "Bính-Canh": "Bính khắc Canh: Hỏa Kim tương khắc. Sự rèn luyện khắc nghiệt. Chủ về sự thay đổi, cải cách nhưng đi kèm áp lực lớn.",
        "Đinh-Tân": "Đinh khắc Tân: Hỏa Kim tương khắc (Âm khắc Âm). Phá hoại sự hoàn mỹ, gây tổn thương về phổi, họng hoặc trang sức, tiền bạc.",
        "Mậu-Nhâm": "Mậu khắc Nhâm: Thổ Thủy tương khắc. Ngăn chặn dòng chảy, gây bí bách. Dễ sinh bệnh thận, bàng quang hoặc tai nạn sông nước.",
        "Kỷ-Quý": "Kỷ khắc Quý: Thổ Thủy tương khắc (Âm khắc Âm). Đất làm đục nước. Tư duy rối loạn, nhập nhằng trong tình cảm hoặc tiền bạc."
    },

    // --- ĐỊA CHI HỢP ---
    "TAM_HOI": {
        "Dần-Mão-Thìn": "Tam Hội Phương Đông (Mộc Cục): Mộc khí cực vượng, chủ về sự nhân từ, phát triển, hoặc cố chấp, bảo thủ. Lực lượng Mộc chi phối toàn bộ mệnh cục.",
        "Tỵ-Ngọ-Mùi": "Tam Hội Phương Nam (Hỏa Cục): Hỏa khí cực thịnh, chủ về sự lễ nghĩa, nhiệt huyết, nóng nảy. Năng lượng bùng nổ, dễ thành công nhanh nhưng cũng dễ tàn.",
        "Thân-Dậu-Tuất": "Tam Hội Phương Tây (Kim Cục): Kim khí cực vượng, chủ về nghĩa khí, sát phạt, quyết đoán. Tính cách cứng rắn, lạnh lùng, có uy quyền.",
        "Hợi-Tý-Sửu": "Tam Hội Phương Bắc (Thủy Cục): Thủy khí cực vượng, chủ về trí tuệ, mưu lược, hoặc trôi nổi, bất định. Dễ có thiên hướng di chuyển nhiều."
    },
    "TAM_HOP": {
        "Thân-Tý-Thìn": "Thân Tý Thìn hợp Thủy cục: Trí tuệ linh hoạt, quan hệ xã hội rộng rãi, dòng chảy tài lộc hanh thông nếu Thủy là hỷ thần. Nếu là kỵ thần thì đề phòng trôi nổi, bất định.",
        "Tỵ-Dậu-Sửu": "Tỵ Dậu Sửu hợp Kim cục: Tính cách cương nghị, quyết đoán, trọng nghĩa khí. Sát khí mạnh, thích hợp võ nghiệp hoặc quản lý. Cần đề phòng tai nạn kim khí.",
        "Dần-Ngọ-Tuất": "Dần Ngọ Tuất hợp Hỏa cục: Nhiệt tình, năng nổ, có sức lan tỏa mạnh. Dễ thành danh nhưng tính nóng nảy. Hợp Hỏa cục thường văn chương cái thế.",
        "Hợi-Mão-Mùi": "Hợi Mão Mùi hợp Mộc cục: Nhân từ, ôn hòa, có sức sống bền bỉ. Thích hợp các ngành giáo dục, y tế, nghệ thuật. Đôi khi thiếu quyết đoán."
    },
    "LUC_HOP": {
        "Tý-Sửu": "Tý Sửu hợp Thổ: Hợp tác ngầm, sự gắn kết bền vững dựa trên lợi ích thực tế.",
        "Dần-Hợi": "Dần Hợi hợp Mộc: Sự nuôi dưỡng, sinh sôi, hợp tác đôi bên cùng có lợi (Hợi Thủy sinh Dần Mộc).",
        "Mão-Tuất": "Mão Tuất hợp Hỏa: Sự nhiệt tình hâm nóng mối quan hệ, nhưng dễ nóng vội.",
        "Thìn-Dậu": "Thìn Dậu hợp Kim: Sự liên kết quyền lực, hỗ trợ nhau về danh vọng.",
        "Tỵ-Thân": "Tỵ Thân hợp Thủy: Vừa hợp vừa hình (hình hợp), ban đầu tốt đẹp nhưng sau dễ có mâu thuẫn ngầm.",
        "Ngọ-Mùi": "Ngọ Mùi hợp Thổ (hoặc Hỏa): Sự tương trợ, đồng lòng, rực rỡ và tỏa sáng."
    },
    "BAN_HOP": {
        "Thân-Tý": "Thân Tý (Bán Thủy): Sinh hợp, nguồn nước được khơi thông, trí tuệ được phát huy.",
        "Tý-Thìn": "Tý Thìn (Bán Thủy): Mộ hợp, nước tụ về hồ, tài lộc tích tụ âm thầm.",
        "Tỵ-Dậu": "Tỵ Dậu (Bán Kim): Sinh hợp, kim loại được tôi luyện, quyền lực gia tăng.",
        "Dậu-Sửu": "Dậu Sửu (Bán Kim): Mộ hợp, kho kim khí, sự bền bỉ và chắc chắn.",
        "Dần-Ngọ": "Dần Ngọ (Bán Hỏa): Sinh hợp, lửa được tiếp củi, nhiệt huyết bùng cháy.",
        "Ngọ-Tuất": "Ngọ Tuất (Bán Hỏa): Mộ hợp, lò lửa ủ nóng, sức mạnh tiềm tàng.",
        "Hợi-Mão": "Hợi Mão (Bán Mộc): Sinh hợp, cây được tưới nước, sinh trưởng mạnh mẽ.",
        "Mão-Mùi": "Mão Mùi (Bán Mộc): Mộ hợp, rừng cây thành thục, sự ổn định.",
        "DEFAULT": "Bán hợp cục: Lực lượng liên kết chưa trọn vẹn nhưng vẫn tạo đà phát triển."
    },
    "AM_HOP": {
        "Dần-Sửu": "Ám Hợp (Dần Sửu): Sự liên kết bí mật, có quý nhân giúp đỡ ngầm hoặc quan hệ tình cảm lén lút.",
        "Ngọ-Hợi": "Ám Hợp (Ngọ Hợi): Quan hệ Thủy Hỏa ký tế, sự hấp dẫn giới tính mạnh mẽ nhưng phức tạp.",
        "Mão-Thân": "Ám Hợp (Mão Thân): Tình cảm ban đầu trắc trở (Kim khắc Mộc) nhưng sau gắn bó (Ất Canh hợp).",
        "Tý-Tuất": "Ám Hợp (Tý Tuất): Sự liên kết về tài lộc hoặc quyền lực (Thủy Thổ), nhưng thiếu bền vững."
    },

    // --- ĐỊA CHI XUNG/HÌNH/HẠI/PHÁ ---
    "LUC_XUNG": {
        "Tý-Ngọ": "Tý Ngọ tương xung: Thủy Hỏa giao chiến, một đời bôn ba, tâm bất an, dễ thay đổi chỗ ở hoặc công việc. Tình cảm nam nữ dễ có sóng gió.",
        "Sửu-Mùi": "Sửu Mùi tương xung: Thổ tương kích, trở ngại trong sự nghiệp, anh em trong nhà thiếu hòa khí. Dễ mắc bệnh về tỳ vị, tiêu hóa.",
        "Dần-Thân": "Dần Thân tương xung: Kim Mộc giao chiến, chủ về đi lại nhiều, xe cộ, tay chân dễ bị tổn thương. Người đa tình hoặc hay thay đổi định hướng.",
        "Mão-Dậu": "Mão Dậu tương xung: Chủ về bội ước, thất tín, lo âu. Dễ bị đâm sau lưng hoặc gặp rắc rối vì người khác phái. Đau nhức xương cốt.",
        "Thìn-Tuất": "Thìn Tuất tương xung: La Võng giao chiến, khắc người thân, hình thương. Dễ vướng vào tranh chấp pháp lý hoặc ngục tù nếu vận xấu.",
        "Tỵ-Hợi": "Tỵ Hợi tương xung: Thích lo chuyện bao đồng, làm ơn mắc oán. Dễ gặp rắc rối nhỏ nhặt nhưng dai dẳng."
    },
    "TAM_HINH": {
        "Dần-Tỵ-Thân": "Vô Ân chi hình (Dần-Tỵ-Thân): Làm ơn mắc oán, bị người mình giúp đỡ quay lại hại mình. Lục thân duyên mỏng, dễ dính dáng đến pháp luật hoặc tai nạn giao thông.",
        "Sửu-Mùi-Tuất": "Thị Thế chi hình (Sửu-Mùi-Tuất): Cậy thế ức hiếp người, hoặc bị chèn ép. Dễ bị lừa gạt, phụ nữ dễ sinh nở khó khăn hoặc tình duyên lận đận.",
        "Tý-Mão": "Vô Lễ chi hình (Tý-Mão): Thiếu lễ độ, dâm loạn hoặc bị người khác khinh rẻ. Quan hệ nam nữ bất chính hoặc bị tai tiếng.",
        "Tự Hình": "Tự Hình: Tự mình làm khổ mình, hay lo nghĩ vẩn vơ, tự gây áp lực dẫn đến bế tắc."
    },
    "BAN_HINH": {
        "Dần-Tỵ": "Hình hại nhau: Mâu thuẫn ngầm, bằng mặt không bằng lòng. Cẩn thận xe cộ.",
        "Tỵ-Thân": "Hình trong hợp: Ban đầu tốt nhưng sau dễ sinh oán hận, tranh chấp tài chính.",
        "Thân-Dần": "Xung hình: Va chạm trực diện kèm theo sự vô ơn, đi lại nhiều dễ gặp nạn.",
        "Sửu-Mùi": "Hình xung: Thổ khí xung đột, anh em bất hòa, tranh chấp đất đai.",
        "Mùi-Tuất": "Hình phá: Sự cản trở lẫn nhau trong công việc, dễ bị kìm hãm.",
        "Tuất-Sửu": "Hình hại: Dễ bị tiểu nhân dèm pha, mang tiếng oan."
    },
    "LUC_HAI": {
        "Tý-Mùi": "Tý Mùi tương hại: Cốt nhục chia lìa, lục thân bất hòa. Dễ mắc bệnh ngầm.",
        "Sửu-Ngọ": "Sửu Ngọ tương hại: Tính tình nóng nảy, thiếu kiên nhẫn dẫn đến hỏng việc.",
        "Dần-Tỵ": "Dần Tỵ tương hại: Bị người thân cận phản bội, hoặc bệnh tật nan y.",
        "Mão-Thìn": "Mão Thìn tương hại: Bất hòa về điền trạch, đất đai, người thân lạnh nhạt.",
        "Thân-Hợi": "Thân Hợi tương hại: Bề ngoài hòa hợp nhưng bên trong đố kỵ, tranh đấu.",
        "Dậu-Tuất": "Dậu Tuất tương hại: Ghen ghét, đố kỵ, tai nghe tiếng oan, mặt có sẹo hoặc tật."
    },
    "TUONG_PHA": {
        "Tý-Dậu": "Tý Dậu tương phá: Việc tốt thường bị phá ngang, không trọn vẹn.",
        "Ngọ-Mão": "Ngọ Mão tương phá: Dễ mất tiền của, hao tài tốn của vì chuyện không đâu.",
        "Thân-Tỵ": "Thân Tỵ tương phá (kèm Hợp/Hình): Quan hệ phức tạp, vừa hợp tác vừa đề phòng.",
        "Dần-Hợi": "Dần Hợi tương phá (kèm Hợp): Trong hợp có phá, niềm tin dễ bị lung lay.",
        "Thìn-Sửu": "Thìn Sửu tương phá: Phá tài, trở ngại trong việc tích lũy tài sản.",
        "Tuất-Sửu": "Tuất Sửu tương phá: Tranh chấp giấy tờ (Duplicate logic with Hinh/Pha).",
        "Tuất-Mùi": "Tuất Mùi tương phá: Tranh chấp giấy tờ, tiểu nhân quấy phá."
    }
};

const TRU_IMPACTS = {
    0: [ // Trụ Năm
        "Ảnh hưởng sâu sắc đến phúc đức tổ tiên và mối quan hệ với cha mẹ.",
        "Tác động đến nền tảng xuất thân và giai đoạn ấu thơ (1-15 tuổi).",
        "Liên quan đến danh dự dòng họ và di sản thừa kế.",
        "Biến động liên quan đến đất đai hương hỏa hoặc nơi chốn gốc gác.",
        "Sức khỏe của người lớn tuổi trong gia đình cần lưu tâm."
    ],
    1: [ // Trụ Tháng
        "Ảnh hưởng trực tiếp đến cung Huynh Đệ và môi trường xã hội.",
        "Tác động mạnh mẽ đến sự nghiệp khởi đầu và ý chí lập thân.",
        "Giai đoạn thanh niên (16-30 tuổi) chịu nhiều chi phối nhất.",
        "Mối quan hệ với đồng nghiệp, cấp trên và bạn bè.",
        "Quyết định sự thành bại trong bước đầu ra ngoài xã hội."
    ],
    2: [ // Trụ Ngày
        "Đánh trực tiếp vào bản mệnh (Nhật chủ) và sức khỏe cá nhân.",
        "Đe dọa sự ổn định của hôn nhân (Cung Phu Thê) và hạnh phúc riêng.",
        "Tâm tính, nội tâm và trạng thái tinh thần chịu áp lực.",
        "Giai đoạn trung vận (31-45 tuổi) là thời điểm ứng nghiệm mạnh.",
        "Sự bình yên trong ngôi nhà nhỏ và quan hệ vợ chồng."
    ],
    3: [ // Trụ Giờ
        "Ảnh hưởng đến đường con cái, sinh nở và mối quan hệ với hậu duệ.",
        "Quyết định sự thành bại, vinh nhục và an nhàn lúc tuổi già.",
        "Tác động đến cấp dưới, nhân viên hoặc những sản phẩm mình tạo ra.",
        "Giai đoạn hậu vận (>45 tuổi) và kết quả cuối cùng của cuộc đời.",
        "Tư duy, trí tuệ và những khát vọng thầm kín bên trong."
    ]
};

module.exports = {
    TEXTS,
    TRU_IMPACTS
};
