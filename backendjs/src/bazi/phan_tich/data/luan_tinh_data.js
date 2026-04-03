/**
 * KHO DỮ LIỆU LUẬN TĨNH PHÂN TÍCH CHUYÊN SÂU (V8.0 - COMPLETE UNIVERSE EDITION)
 * Bao gồm:
 * 1. Tổng quan Khí chất
 * 2. Hồ sơ Tâm lý Nhật Chủ (10 Can)
 * 3. Hồ sơ Hành vi Thập Thần (10 Thần) - ĐÃ BỔ SUNG LẠI
 * 4. TỪ ĐIỂN 60 HOA GIÁP (Full 60 Trụ)
 * 5. Bách khoa Sức khỏe
 * 6. Ma trận Nghề nghiệp
 * 7. Hôn nhân & Tài lộc
 */

const LUAN_TINH_LIB = {
    // I. TỔNG QUAN KHÍ CHẤT
    tong_quan: {
        than_vuong: {
            intro: "Mệnh chủ thuộc cách cục **Thân Vượng (Thân Cường)**. Bản mệnh đắc lệnh, đắc địa, khí thế hùng hậu. Hình tượng như cây đại thụ vững chãi hay ngọn núi cao sừng sững.",
            balance_advice: "Người Thân Vượng có ưu điểm là sự tự tin, độc lập, ý chí kiên định và khả năng chịu đựng áp lực cao. Tuy nhiên, điểm yếu cốt tử là cái tôi quá lớn, dễ dẫn đến độc đoán, bảo thủ. Chiến lược cuộc đời là 'Thực Thương Tiết Tú' (Dùng tài năng cống hiến) hoặc 'Quan Sát Chế Ngự' (Dùng kỷ luật rèn giũa).",
            keyword: "Khiêm tốn & Cống hiến"
        },
        than_nhuoc: {
            intro: "Mệnh chủ thuộc cách cục **Thân Nhược**. Bản mệnh thất lệnh hoặc bị khắc tiết nhiều. Hình tượng như loài hoa cỏ cần chăm sóc hay dòng suối nhỏ cần nương tựa dòng lớn.",
            balance_advice: "Người Thân Nhược có ưu điểm là sự nhạy cảm, tinh tế, giỏi tùy cơ ứng biến và biết lắng nghe. Điểm yếu là hay lo âu, thiếu quyết đoán, dễ bị môi trường chi phối. Chiến lược cuộc đời là 'Ấn Tinh Phù Trợ' (Dựa vào tri thức, bằng cấp) và 'Tỷ Kiếp Hợp Tác' (Kết nối sức mạnh cộng đồng).",
            keyword: "Học tập & Kết nối"
        },
        trung_hoa: {
            intro: "Mệnh chủ thuộc cách cục **Trung Hòa**. Ngũ hành lưu thông hữu tình, không thái quá cũng không bất cập. Đây là trạng thái 'Trung Dung' quý giá.",
            balance_advice: "Cuộc đời thường bình ổn, ít sóng gió cực đoan. Tâm tính ôn hòa, xử lý sự việc thấu tình đạt lý. Tuy nhiên cần tránh sự nhạt nhòa, thiếu điểm nhấn. Cần chủ động tạo ra thử thách để bứt phá.",
            keyword: "Cân bằng & Bền bỉ"
        }
    },

    // II. TÍNH CÁCH
    tinh_cach: {
        // 1. 10 THIÊN CAN (NHẬT CHỦ)
        Giap: {
            core: ["Cương trực", "Lãnh đạo", "Nhân từ"],
            desc: "Giáp Mộc như cây cổ thụ, luôn vươn thẳng, có tầm nhìn xa và lòng trắc ẩn lớn, thích che chở người khác."
        },
        At: {
            core: ["Linh hoạt", "Dẻo dai", "Thích nghi"],
            desc: "Ất Mộc như loài dây leo, mềm mỏng nhưng sức sống mãnh liệt, giỏi ngoại giao, ứng biến và sinh tồn."
        },
        Binh: {
            core: ["Nhiệt huyết", "Quang minh", "Hào phóng"],
            desc: "Bính Hỏa như mặt trời rực rỡ, lan tỏa năng lượng tích cực, sống đam mê, quang minh lỗi lạc nhưng nóng vội."
        },
        Dinh: {
            core: ["Sâu sắc", "Tỉ mỉ", "Hy sinh"],
            desc: "Đinh Hỏa như ngọn đèn đêm, âm thầm soi sáng, nội tâm phong phú, trực giác nhạy bén và biết hy sinh."
        },
        Mau: {
            core: ["Vững chãi", "Tín nghĩa", "Bao dung"],
            desc: "Mậu Thổ như ngọn núi cao, trầm ổn, đáng tin cậy, là chỗ dựa vững chắc, trọng chữ tín và bao dung."
        },
        Ky: {
            core: ["Khiêm tốn", "Chăm sóc", "Đa tài"],
            desc: "Kỷ Thổ như đất ruộng vườn, âm thầm nuôi dưỡng vạn vật, nhẫn nại, đa tài đa nghệ và chu đáo."
        },
        Canh: {
            core: ["Quyết đoán", "Nghĩa hiệp", "Cứng rắn"],
            desc: "Canh Kim như thanh kiếm sắc, thẳng thắn bộc trực, hành động dứt khoát, trọng nghĩa khinh tài, ghét sự giả dối."
        },
        Tan: {
            core: ["Tinh tế", "Sắc sảo", "Thẩm mỹ"],
            desc: "Tân Kim như trang sức quý, yêu cái đẹp, tư duy sắc bén, khéo léo, ngoại giao tốt nhưng đôi khi kiêu kỳ."
        },
        Nham: {
            core: ["Trí tuệ", "Phóng khoáng", "Biến hóa"],
            desc: "Nhâm Thủy như dòng sông lớn, thông minh linh hoạt, thích tự do, không chịu gò bó, giỏi xoay chuyển tình thế."
        },
        Quy: {
            core: ["Nhu mì", "Thâm trầm", "Mưu lược"],
            desc: "Quý Thủy như màn sương sớm, nhẹ nhàng nhưng thẩm thấu sâu, giàu cảm xúc, trực giác mạnh và túc trí đa mưu."
        },

        // 2. 10 THẬP THẦN (HÀNH VI & CÁCH CỤC) - BỔ SUNG LẠI
        "Thuc_Than": {
            trait: "Nghệ Sĩ Hưởng Thụ",
            pro: "Ôn hòa, rộng lượng, có gu thẩm mỹ cao, thông minh, tinh tế.",
            con: "Dễ lười biếng, thiếu ý chí phấn đấu quyết liệt, hay nuông chiều bản thân.",
            behavior: "Thích ăn ngon mặc đẹp, ghét tranh đấu, làm việc theo cảm hứng."
        },
        "Thuong_Quan": {
            trait: "Kẻ Nổi Loạn Sáng Tạo",
            pro: "Tư duy đột phá, hùng biện giỏi, dám nghĩ dám làm, luôn tìm ra giải pháp mới.",
            con: "Kiêu ngạo, coi thường quy tắc, dễ đắc tội người khác, hay gây thị phi.",
            behavior: "Thích thể hiện cái tôi, phản biện gay gắt, phá vỡ lề thói cũ."
        },
        "Chinh_Tai": {
            trait: "Người Quản Gia Thực Tế",
            pro: "Cần cù, tiết kiệm, sống trách nhiệm, quản lý tài chính xuất sắc.",
            con: "Thực dụng, đôi khi keo kiệt, thiếu sự lãng mạn, quá an phận.",
            behavior: "Tính toán lợi ích cụ thể, thích ổn định, ghét mạo hiểm."
        },
        "Thien_Tai": {
            trait: "Doanh Nhân Mạo Hiểm",
            pro: "Hào phóng, trọng nghĩa khí, nhạy bén với cơ hội, giao thiệp rộng.",
            con: "Phung phí, cả thèm chóng chán, dễ sa vào đỏ đen, tình cảm phức tạp.",
            behavior: "Kiếm tiền lướt sóng, chi tiền mở rộng quan hệ, sống phóng khoáng."
        },
        "Chinh_Quan": {
            trait: "Lãnh Đạo Mẫu Mực",
            pro: "Chính trực, kỷ luật, có năng lực tổ chức, tôn trọng pháp luật, danh dự.",
            con: "Bảo thủ, cứng nhắc, thiếu linh hoạt, dễ bị áp lực định kiến.",
            behavior: "Đúng giờ, chỉnh tề, làm việc theo quy trình, sợ mang tiếng."
        },
        "That_Sat": {
            trait: "Tướng Quân Quyền Lực",
            pro: "Quyết đoán, dũng cảm, uy quyền, giỏi giải quyết khủng hoảng, ý chí sắt đá.",
            con: "Độc đoán, nóng nảy, đa nghi, dễ dùng biện pháp mạnh, cuộc đời sóng gió.",
            behavior: "Thích ra lệnh, kiểm soát, hành động nhanh gọn."
        },
        "Chinh_An": {
            trait: "Học Giả Nhân Từ",
            pro: "Trí tuệ uyên bác, nhân hậu, ham học hỏi, được kính trọng.",
            con: "Xa rời thực tế, hay dựa dẫm, thiếu tính chiến đấu, đôi khi chậm chạp.",
            behavior: "Thích nghiên cứu, làm việc thiện, ngại va chạm."
        },
        "Thien_An": {
            trait: "Kẻ Lập Dị Tài Ba",
            pro: "Sáng tạo độc đáo, trực giác cực mạnh, giỏi lĩnh vực ngách, quan sát nhạy bén.",
            con: "Cô độc, lập dị, khó hòa đồng, đa nghi, hay thay đổi.",
            behavior: "Thích làm việc một mình, sở thích kỳ quái, đi ngược đám đông."
        },
        "Ty_Kien": {
            trait: "Người Độc Lập",
            pro: "Tự tin, ý chí vững vàng, tự chủ, công bằng, coi trọng tình bạn.",
            con: "Cố chấp, bướng bỉnh, khó nghe lời khuyên, cái tôi quá lớn.",
            behavior: "Muốn tự quyết định, ghét bị sai khiến, sòng phẳng."
        },
        "Kiep_Tai": {
            trait: "Chiến Binh Tham Vọng",
            pro: "Nhiệt huyết, giàu năng lượng, có sức hút, khả năng thuyết phục tốt.",
            con: "Nóng vội, liều lĩnh, dễ ghen tị, hay tranh giành, tiền bạc tụ tán.",
            behavior: "Hành động theo cảm xúc, thích đám đông, máu ăn thua."
        },

        // 3. 60 HOA GIÁP (FULL 60 PILLARS)
        hoa_giap: {
            "Giáp Tý": { menh: "Hải Trung Kim", image: "Bảo vật đáy biển", personality: "Vừa cứng cỏi vừa linh hoạt, hay suy nghĩ mông lung, có xu hướng tâm linh, giữ kín tâm tư.", advice: "Cần định tâm, tránh đứng núi này trông núi nọ." },
            "Ất Sửu": { menh: "Hải Trung Kim", image: "Vàng trong cát", personality: "Kiên nhẫn, chịu khó, âm thầm vươn lên, thực tế, sống có trách nhiệm.", advice: "Đừng quá thụ động hoặc bi quan, cần nắm bắt thời cơ quyết liệt hơn." },
            "Bính Dần": { menh: "Lư Trung Hỏa", image: "Lửa trong lò", personality: "Nhiệt tình, hiếu học, có tiềm năng lớn, thích được khen ngợi và nổi bật.", advice: "Phát huy sự sáng tạo nhưng cần kiên trì đến cùng, tránh cả thèm chóng chán." },
            "Đinh Mão": { menh: "Lư Trung Hỏa", image: "Lửa hương khói", personality: "Nghệ sĩ, lãng mạn, nhạy cảm, có sức hút bí ẩn, trực giác tâm linh mạnh.", advice: "Tránh đa sầu đa cảm, rèn luyện lý trí để không bị lụy tình." },
            "Mậu Thìn": { menh: "Đại Lâm Mộc", image: "Cây rừng già", personality: "Tự tin, tham vọng lớn, có khí chất lãnh đạo, thích việc lớn, hơi ngạo mạn.", advice: "Học cách khiêm tốn thu phục nhân tâm, tránh độc đoán." },
            "Kỷ Tỵ": { menh: "Đại Lâm Mộc", image: "Cây cỏ rậm", personality: "Thông minh, khôn khéo, ứng biến nhanh, bí ẩn khó nắm bắt, tính sở hữu cao.", advice: "Sự chân thành sẽ mang lại thành công bền vững hơn mưu mẹo." },
            "Canh Ngọ": { menh: "Lộ Bàng Thổ", image: "Ngựa rong chơi", personality: "Phóng khoáng, thích tự do, thẳng thắn, bộc trực nhưng thiếu kiên nhẫn.", advice: "Cần kỷ luật bản thân để biến những ý tưởng lớn thành hiện thực." },
            "Tân Mùi": { menh: "Lộ Bàng Thổ", image: "Dê qua cầu", personality: "Hiền lành, cẩn thận, hay lo xa, sống nội tâm, thích sự an toàn.", advice: "Mạnh dạn bước ra khỏi vùng an toàn để đón nhận cơ hội mới." },
            "Nhâm Thân": { menh: "Kiếm Phong Kim", image: "Mũi kiếm sắc", personality: "Thông minh, lanh lợi, đa tài, giỏi bắt chước, thích nghi nhanh, đôi khi lém lỉnh.", advice: "Tập trung vào một mục tiêu chuyên sâu thay vì lan man." },
            "Quý Dậu": { menh: "Kiếm Phong Kim", image: "Dao gọt trái cây", personality: "Trực giác tốt, sắc sảo, thích lý luận, có duyên ngầm, hơi kén chọn.", advice: "Tránh lời nói sắc nhọn gây tổn thương người thân." },

            "Giáp Tuất": { menh: "Sơn Đầu Hỏa", image: "Lửa trên núi", personality: "Thực tế, coi trọng vật chất nhưng nghĩa khí, thích che chở người khác.", advice: "Cân bằng giữa lợi ích kinh tế và giá trị tinh thần." },
            "Ất Hợi": { menh: "Sơn Đầu Hỏa", image: "Lửa ngọn nến", personality: "Ôn hòa, lương thiện, dễ mủi lòng, hay giúp người, cuộc đời ít sóng gió.", advice: "Rèn luyện sự quyết đoán và độc lập, tránh bị lợi dụng." },
            "Bính Tý": { menh: "Giản Hạ Thủy", image: "Nước khe suối", personality: "Thông minh, quyền biến, bên ngoài nhiệt tình bên trong toan tính, đa mưu.", advice: "Giữ chữ tín và sự nhất quán giữa lời nói và hành động." },
            "Đinh Sửu": { menh: "Giản Hạ Thủy", image: "Nước đọng", personality: "Cần cù, tỉ mỉ, nội tâm phong phú, hơi bi quan, thích sự yên tĩnh.", advice: "Tìm niềm vui từ những điều giản dị, lạc quan hơn để thu hút may mắn." },
            "Mậu Dần": { menh: "Thành Đầu Thổ", image: "Đất đắp thành", personality: "Mạnh mẽ, uy quyền, thích chinh phục, bảo thủ nhưng rất đáng tin cậy.", advice: "Học cách kiểm soát cảm xúc nóng giận và lắng nghe ý kiến trái chiều." },
            "Kỷ Mão": { menh: "Thành Đầu Thổ", image: "Đất bờ ruộng", personality: "Nhẹ nhàng, kín đáo, giỏi che giấu cảm xúc, thích an toàn, ngại va chạm.", advice: "Mở lòng hơn để đón nhận cơ hội mới, đừng quá an phận." },
            "Canh Thìn": { menh: "Bạch Lạp Kim", image: "Kim loại nóng chảy", personality: "Quyết liệt, tài năng, có chí tiến thủ, thông minh, dễ thành công sớm.", advice: "Tránh tự mãn, luôn trau dồi đạo đức để giữ vững thành công." },
            "Tân Tỵ": { menh: "Bạch Lạp Kim", image: "Vàng lỏng", personality: "Thông minh ngầm, mưu lược, kiên nhẫn chờ thời, bề ngoài lạnh lùng.", advice: "Hành động dứt khoát khi thời cơ đến, tránh do dự quá lâu." },
            "Nhâm Ngọ": { menh: "Dương Liễu Mộc", image: "Cây liễu rủ", personality: "Nhanh nhẹn, tháo vát, giao tiếp tốt, nhưng cả thèm chóng chán, đa tình.", advice: "Rèn luyện sự kiên trì và chung thủy trong các mối quan hệ." },
            "Quý Mùi": { menh: "Dương Liễu Mộc", image: "Cành liễu xanh", personality: "Hiền lành, nhẫn nại, hay suy nghĩ cho người khác, dễ chịu thiệt thòi.", advice: "Biết bảo vệ quyền lợi của bản thân, đừng hy sinh mù quáng." },

            "Giáp Thân": { menh: "Tuyền Trung Thủy", image: "Nước giếng khơi", personality: "Tâm tư thâm trầm, khó đoán, bên ngoài bình thản bên trong dậy sóng.", advice: "Cần chia sẻ cảm xúc để giải tỏa áp lực nội tâm." },
            "Ất Dậu": { menh: "Tuyền Trung Thủy", image: "Nước suối trong", personality: "Thanh cao, sạch sẽ, kỹ tính, có năng khiếu nghệ thuật, hơi cô độc.", advice: "Hòa nhập cộng đồng để tìm kiếm sự hỗ trợ." },
            "Bính Tuất": { menh: "Ốc Thượng Thổ", image: "Đất ngói lợp", personality: "Thẳng thắn, nóng tính nhưng tốt bụng, thích giúp đỡ, trọng danh dự.", advice: "Kiềm chế nóng giận, 'uốn lưỡi bảy lần trước khi nói'." },
            "Đinh Hợi": { menh: "Ốc Thượng Thổ", image: "Đất bùn ao", personality: "Thông minh, khôn ngoan, biết tùy cơ ứng biến, có lộc trời cho.", advice: "Sống chân thành, tránh thủ đoạn vặt." },
            "Mậu Tý": { menh: "Tích Lịch Hỏa", image: "Sét đánh", personality: "Quyết đoán, mạnh mẽ, hành động nhanh, dễ nổi nóng, thích làm chuyện lớn.", advice: "Cần sự điềm tĩnh và kế hoạch chi tiết thay vì bốc đồng." },
            "Kỷ Sửu": { menh: "Tích Lịch Hỏa", image: "Lửa lò gạch", personality: "Nhẫn nại, chăm chỉ, ít nói, làm nhiều, tư duy thực tế, chắc chắn.", advice: "Linh hoạt hơn trong tư duy, đón nhận cái mới." },
            "Canh Dần": { menh: "Tùng Bách Mộc", image: "Cây tùng già", personality: "Cương nghị, nguyên tắc, có uy tín, thích sự công bằng, ghét dối trá.", advice: "Học cách mềm mỏng, 'lạt mềm buộc chặt'." },
            "Tân Mão": { menh: "Tùng Bách Mộc", image: "Gỗ cây tùng", personality: "Tinh tế, khéo léo, nhiều tham vọng ngầm, thích hư vinh một chút.", advice: "Chân thật với bản thân và mọi người." },
            "Nhâm Thìn": { menh: "Trường Lưu Thủy", image: "Sông dài", personality: "Phóng khoáng, tự do, thông minh, nhìn xa trông rộng, thích di chuyển.", advice: "Tập trung năng lượng vào mục tiêu cụ thể để tạo thành tựu." },
            "Quý Tỵ": { menh: "Trường Lưu Thủy", image: "Dòng nước chảy", personality: "Linh hoạt, giỏi ứng biến, đa sầu đa cảm, hay thay đổi tâm tính.", advice: "Rèn luyện sự kiên định lập trường." },

            "Giáp Ngọ": { menh: "Sa Trung Kim", image: "Vàng trong cát", personality: "Nhiệt tình, thẳng thắn nhưng thiếu kiên nhẫn, thích hào nhoáng.", advice: "Rèn luyện sự điềm tĩnh và chiều sâu." },
            "Ất Mùi": { menh: "Sa Trung Kim", image: "Vàng vùi", personality: "Dịu dàng, kín đáo, nội tâm phức tạp, hay lo nghĩ.", advice: "Tự tin thể hiện bản thân." },
            "Bính Thân": { menh: "Sơn Hạ Hỏa", image: "Lửa chân núi", personality: "Thông minh, tài trí, phản ứng nhanh, nhưng dễ nản lòng.", advice: "Kiên trì theo đuổi mục tiêu dài hạn." },
            "Đinh Dậu": { menh: "Sơn Hạ Hỏa", image: "Lửa đèn lồng", personality: "Tinh tế, lãng mạn, có gu thẩm mỹ, nhưng hơi yếu đuối.", advice: "Xây dựng nội lực mạnh mẽ hơn." },
            "Mậu Tuất": { menh: "Bình Địa Mộc", image: "Cây đồng bằng", personality: "Hiền lành, chất phác, hòa đồng, dễ thích nghi, không quá tham vọng.", advice: "Đặt mục tiêu cao hơn để phát triển." },
            "Kỷ Hợi": { menh: "Bình Địa Mộc", image: "Cây ven sông", personality: "Thông minh, khéo léo, biết người biết ta, cuộc sống êm đềm.", advice: "Dám chấp nhận thử thách để bứt phá." },
            "Canh Tý": { menh: "Bích Thượng Thổ", image: "Đất vách tường", personality: "Thẳng thắn, nguyên tắc, thích che chở, sống có trách nhiệm.", advice: "Tránh cứng nhắc, bảo thủ." },
            "Tân Sửu": { menh: "Bích Thượng Thổ", image: "Đất trát tường", personality: "Cần cù, tỉ mỉ, khiêm tốn, nhưng hơi thụ động.", advice: "Chủ động tìm kiếm cơ hội." },
            "Nhâm Dần": { menh: "Kim Bạch Kim", image: "Vàng trắng", personality: "Sang trọng, thông minh, tự tin, thích sự hoàn hảo.", advice: "Tránh kiêu ngạo, hòa đồng hơn." },
            "Quý Mão": { menh: "Kim Bạch Kim", image: "Bạc nén", personality: "Nhẹ nhàng, tinh tế, khôn ngoan, biết giữ của.", advice: "Sống rộng lượng hơn để nhận lại nhiều hơn." },

            "Giáp Thìn": { menh: "Phúc Đăng Hỏa", image: "Lửa đèn dầu", personality: "Ấm áp, soi sáng, thích giúp đời, nhưng sức tỏa sáng có hạn.", advice: "Chọn đúng môi trường để phát huy giá trị." },
            "Ất Tỵ": { menh: "Phúc Đăng Hỏa", image: "Ngọn đèn trước gió", personality: "Nhạy cảm, dễ dao động, nhưng có khả năng truyền cảm hứng.", advice: "Tìm điểm tựa tinh thần vững chắc." },
            "Bính Ngọ": { menh: "Thiên Hà Thủy", image: "Nước mưa trời", personality: "Hào phóng, nhiệt tình, nhưng hay thay đổi, cảm xúc thất thường.", advice: "Rèn luyện sự ổn định cảm xúc." },
            "Đinh Mùi": { menh: "Thiên Hà Thủy", image: "Sương mù", personality: "Bí ẩn, nội tâm, hay suy tư, trí tuệ sâu sắc.", advice: "Thực tế hóa các ý tưởng." },
            "Mậu Thân": { menh: "Đại Dịch Thổ", image: "Đất cồn bãi", personality: "Điềm tĩnh, bao dung, thích ổn định, ngại thay đổi.", advice: "Mạnh dạn đổi mới tư duy." },
            "Kỷ Dậu": { menh: "Đại Dịch Thổ", image: "Đất vườn tược", personality: "Chăm chỉ, thực tế, giỏi vun vén, nhưng tầm nhìn hẹp.", advice: "Mở rộng kiến thức và quan hệ." },
            "Canh Tuất": { menh: "Thoa Xuyến Kim", image: "Trâm cài áo", personality: "Quý phái, sắc sảo, tự trọng cao, thích được tôn trọng.", advice: "Khiêm tốn để được yêu mến." },
            "Tân Hợi": { menh: "Thoa Xuyến Kim", image: "Nhẫn vàng", personality: "Tinh tế, khéo léo, có duyên, được nhiều người quý.", advice: "Tránh phù phiếm, hư vinh." },
            "Nhâm Tý": { menh: "Tang Đố Mộc", image: "Cây dâu tằm", personality: "Dẻo dai, bền bỉ, chịu khó, nhưng cuộc đời nhiều thăng trầm.", advice: "Lạc quan trước nghịch cảnh." },
            "Quý Sửu": { menh: "Tang Đố Mộc", image: "Gỗ cây dâu", personality: "Nhẫn nại, âm thầm, nội tâm sâu sắc, ít chia sẻ.", advice: "Mở lòng chia sẻ gánh nặng." },

            "Giáp Dần": { menh: "Đại Khê Thủy", image: "Nước khe lớn", personality: "Mạnh mẽ, phóng khoáng, có chí lớn, thích tự do.", advice: "Rèn luyện kỷ luật thép." },
            "Ất Mão": { menh: "Đại Khê Thủy", image: "Nước suối nguồn", personality: "Trong sáng, vô tư, thông minh, nhưng thiếu mưu mẹo.", advice: "Cảnh giác trước sự lừa lọc." },
            "Bính Thìn": { menh: "Sa Trung Thổ", image: "Đất pha cát", personality: "Linh hoạt, dễ thích nghi, nhưng thiếu lập trường kiên định.", advice: "Xây dựng nguyên tắc sống rõ ràng." },
            "Đinh Tỵ": { menh: "Sa Trung Thổ", image: "Đất bãi bồi", personality: "Thông minh, khôn khéo, biết nắm bắt thời cơ, thực dụng.", advice: "Giữ chữ tín trong kinh doanh." },
            "Mậu Ngọ": { menh: "Thiên Thượng Hỏa", image: "Nắng trưa", personality: "Nóng nảy, bộc trực, nhiệt tình thái quá, thích làm trung tâm.", advice: "Học cách lắng nghe và nhường nhịn." },
            "Kỷ Mùi": { menh: "Thiên Thượng Hỏa", image: "Lửa mặt trời", personality: "Ấm áp, bao dung, nhưng đôi khi áp đặt người khác.", advice: "Tôn trọng sự khác biệt của người khác." },
            "Canh Thân": { menh: "Thạch Lựu Mộc", image: "Gỗ cây lựu", personality: "Cứng rắn, kiên định, chung thủy, nhưng cô độc.", advice: "Hòa đồng để bớt cô đơn." },
            "Tân Dậu": { menh: "Thạch Lựu Mộc", image: "Cành lựu đỏ", personality: "Sắc sảo, tài năng, có sức hút, nhưng hay ghen tuông.", advice: "Tin tưởng vào người thân yêu." },
            "Nhâm Tuất": { menh: "Đại Hải Thủy", image: "Biển lớn", personality: "Bao la, rộng lượng, trí tuệ uyên thâm, khó lường.", advice: "Dùng trí tuệ làm việc thiện." },
            "Quý Hợi": { menh: "Đại Hải Thủy", image: "Đại dương", personality: "Sâu sắc, bí ẩn, có khả năng tâm linh, cảm xúc mạnh.", advice: "Cân bằng cảm xúc và lý trí." }
        }
    },

    // III. SỨC KHỎE
    suc_khoe: {
        Kim: {
            weak: "Phổi yếu, khí hư, hay bị cảm mạo, viêm xoang, tiếng nói nhỏ, da khô, dễ buồn bã. Nên tập hít thở sâu, ăn đồ cay nhẹ (hành, tỏi).",
            excess: "Phổi nóng, ho khan, dễ bị táo bón, các bệnh về đại tràng, tính tình cứng nhắc khó chịu. Nên ăn đồ mát, uống nhiều nước."
        },
        Moc: {
            weak: "Gan mật kém, mắt mờ, móng tay khô dễ gãy, hay bị chuột rút, tinh thần uể oải, thiếu quyết đoán. Nên vận động nhẹ nhàng, ăn rau xanh.",
            excess: "Gan nóng, dễ cáu gắt, chóng mặt, đau đầu, huyết áp cao, dễ bị trúng gió. Nên tĩnh tâm, hạn chế rượu bia."
        },
        Thuy: {
            weak: "Thận yếu, đau lưng mỏi gối, tai ù, tóc bạc sớm, trí nhớ giảm, hay sợ hãi vô cớ. Nên giữ ấm vùng lưng, ăn đồ đen (đậu đen, mè đen).",
            excess: "Thận dương quá vượng hoặc thủy thũng, phù nề, bàng quang yếu, tâm lý bất ổn. Nên vận động ra mồ hôi, tránh ăn quá mặn."
        },
        Hoa: {
            weak: "Tim đập yếu, huyết áp thấp, hay lạnh chân tay, sắc mặt nhợt nhạt, thiếu nhiệt huyết. Nên vận động mạnh, ăn đồ đỏ (táo đỏ, thịt đỏ).",
            excess: "Tim đập nhanh, huyết áp cao, hay hồi hộp, mất ngủ, nóng trong người, viêm nhiễm. Nên ăn đồ đắng (mướp đắng), rau mát."
        },
        Tho: {
            weak: "Tỳ vị hư hàn, ăn uống kém tiêu, gầy yếu, cơ bắp nhão, hay lo âu, dạ dày yếu. Nên ăn chín uống sôi, dùng gừng, nghệ.",
            excess: "Béo phì, trì trệ, dễ bị tắc nghẽn tiêu hóa, sỏi thận/mật, tính tình cố chấp. Nên ăn thanh đạm, tăng cường chất xơ."
        }
    },

    // IV. NGHỀ NGHIỆP
    nghe_nghiep: {
        by_useful_god: {
            Kim: { industry: "Tài chính (Bank, Stock), Cơ khí/Oto, Luật pháp, Trang sức, Phần cứng máy tính.", role: "Giám đốc tài chính (CFO), Kỹ sư trưởng, Luật sư, Kiểm soát viên." },
            Moc: { industry: "Giáo dục & Đào tạo, Y dược/Đông y, Thời trang/Design, Nông nghiệp sạch, Xuất bản.", role: "Giảng viên, Bác sĩ, Nhà thiết kế, Giám đốc sáng tạo." },
            Thuy: { industry: "Logistics/Vận tải, Thủy hải sản, Đồ uống/F&B, Du lịch/Khách sạn, Thông tin (Telco).", role: "Sales Manager, Chuyên gia Marketing, Điều phối viên, Giao dịch viên." },
            Hoa: { industry: "Công nghệ (AI/Software), Năng lượng/Điện, Truyền thông/Media, Giải trí, Nhà hàng.", role: "Lập trình viên, Diễn giả, KOLs, Đầu bếp trưởng." },
            Tho: { industry: "Bất động sản, Xây dựng, Khoáng sản, Lưu trữ/Kho bãi, Bảo hiểm, Nông sản.", role: "Môi giới BĐS, Kỹ sư giám sát, Quản lý kho, Chuyên gia định giá." }
        },
        by_dominant_god: {
            "Thực Thần": "Ưu tiên nghề: Sáng tạo, Nghệ thuật, Ẩm thực, Giáo dục mầm non. Hợp môi trường tự do, thoải mái, ít áp lực.",
            "Thương Quan": "Ưu tiên nghề: Marketing, Luật sư, Diễn thuyết, Công nghệ cao. Hợp môi trường năng động, cạnh tranh, đổi mới liên tục.",
            "Chính Tài": "Ưu tiên nghề: Kế toán, Ngân hàng, Hành chính, Quản lý kho. Hợp môi trường ổn định, quy trình rõ ràng, ít rủi ro.",
            "Thiên Tài": "Ưu tiên nghề: Kinh doanh, Đầu tư, Môi giới, Sales. Hợp môi trường linh hoạt, thu nhập dựa trên doanh số/hiệu quả.",
            "Chính Quan": "Ưu tiên nghề: Công chức, Quản lý doanh nghiệp, Tổ chức NGO. Hợp môi trường nhà nước, tập đoàn lớn, có thứ bậc.",
            "Thất Sát": "Ưu tiên nghề: Quân đội, Công an, Kỹ thuật công trình, Giám sát. Hợp môi trường kỷ luật thép, áp lực cao, quyền lực.",
            "Chính Ấn": "Ưu tiên nghề: Nghiên cứu, Y dược, Văn hóa, Thư viện. Hợp môi trường hàn lâm, tôn trọng tri thức, ít va chạm.",
            "Thiên Ấn": "Ưu tiên nghề: Công nghệ mới, Huyền học, Nghệ thuật thị giác, Game. Hợp môi trường độc lập, chuyên sâu, cho phép sự lập dị.",
            "Tỷ Kiên": "Ưu tiên nghề: Tự doanh (Cửa hàng riêng), Freelancer, Kỹ thuật viên. Hợp làm chủ nhỏ hoặc làm độc lập.",
            "Kiếp Tài": "Ưu tiên nghề: Bán hàng hệ thống, Thể thao, Hợp tác. Hợp môi trường đông người, cần kỹ năng thuyết phục/tranh đua."
        },
        orientation: {
            strong: "Bạn có tố chất của người LÃNH ĐẠO hoặc LÀM CHỦ. Hãy mạnh dạn hướng ra ngoài, khai phá thị trường mới. Thất bại chỉ là bài học tạm thời, sự kiên trì sẽ đưa bạn đến đỉnh cao.",
            weak: "Bạn phù hợp vai trò CHIẾN LƯỢC GIA hoặc CHUYÊN GIA. Hãy tìm kiếm những đối tác mạnh để hợp tác. Đừng cố gồng gánh một mình, sức mạnh của bạn nằm ở mưu lược và sự kết nối.",
            neutral: "Bạn có khả năng thích nghi cao, có thể vừa làm quản lý vừa làm chuyên môn. Hãy chọn con đường phát triển bền vững, 'chậm mà chắc' là kim chỉ nam."
        }
    },

    // V. HÔN NHÂN & TÀI LỘC
    hon_nhan: {
        scenarios: {
            "Tương Sinh": "Vợ chồng Tương Sinh: Tình cảm êm đẹp, thấu hiểu nhau. Vợ chồng như đôi bạn tri kỷ, cùng nhau xây dựng tổ ấm vững chắc.",
            "Tương Khắc": "Vợ chồng Tương Khắc: Dễ xảy ra mâu thuẫn quan điểm. Cần học chữ 'Nhẫn', mỗi người nhường một bước thì gia đạo mới yên.",
            "Tương Hòa": "Vợ chồng Tương Hòa: Bình đẳng, tôn trọng nhau. Tình cảm không quá nồng nhiệt nhưng bền bỉ, 'tương kính như tân'.",
            "Tứ Khố": "Cung phu thê Tứ Khố (Thìn/Tuất/Sửu/Mùi): Duyên tình thường đến muộn hoặc kín đáo, ít phô trương. Vợ chồng sống thực tế, trách nhiệm.",
            "Tứ Chính": "Cung phu thê Tứ Chính (Tý/Ngọ/Mão/Dậu): Tình cảm lãng mạn, nồng nhiệt, dễ có tiếng sét ái tình. Cần giữ lửa để tránh phai nhạt theo thời gian.",
            "Tứ Sinh": "Cung phu thê Tứ Sinh (Dần/Thân/Tỵ/Hợi): Vợ chồng thường hay đi xa, di chuyển nhiều hoặc có sự thay đổi nơi ở. Cuộc sống năng động."
        },
        partner_qualities: {
            male: {
                "Tài Tinh": "Vợ là mẫu người 'Vượng Phu Ích Tử', biết vun vén gia đình, giúp chồng yên tâm phát triển sự nghiệp.",
                "Không Tài": "Duyên với vợ hơi mỏng, vợ có thể là người độc lập cao hoặc ít quan tâm chi tiết. Nên tự quản lý tài chính."
            },
            female: {
                "Quan Tinh": "Chồng là người có trách nhiệm, là trụ cột kinh tế và tinh thần vững chắc. Có thể nương tựa cả đời.",
                "Sát Tinh": "Chồng là người cá tính mạnh, quyết đoán, nam tính nhưng đôi khi hơi gia trưởng. Cần sự khéo léo để dung hòa.",
                "Không Quan": "Nữ mệnh Hữu Tài Vô Quan thì thường phải tự lực cánh sinh, chồng ít hỗ trợ được nhiều. Nên độc lập về kinh tế."
            }
        },
        general_advice: {
            early: "Kết hôn sớm dễ gặp sóng gió do tâm lý chưa vững.",
            late: "Mệnh này nên kết hôn muộn (sau 30 tuổi) thì gia đạo mới bền vững.",
            conflict: "Cung hôn nhân có xung khắc, cần sự bao dung lớn.",
            harmony: "Gia đạo yên ấm là nền tảng cho mọi thành công."
        }
    },
    tai_loc: {
        patterns: {
            "Thực Thương sinh Tài": "Cách cục DOANH NHÂN: Làm giàu bằng năng lực, trí tuệ và sự sáng tạo. Tiền đẻ ra tiền liên tục.",
            "Tài dưỡng Quan": "Cách cục LÃNH ĐẠO: Dùng tiền tạo uy tín, dùng uy tín tạo địa vị, tiền bạc tự khắc đi theo.",
            "Thân vượng Tài vượng": "Cách cục ĐẠI PHÚ: Có sức khỏe, có tài năng, có thời cơ. Dễ trở thành người giàu có lớn.",
            "Thân nhược Tài vượng": "Cách cục GIỮ TIỀN GIÙM: Thấy tiền mà khó lấy, hoặc làm nhiều tiêu nhiều. Cần người quản lý tài chính hộ.",
            "Tỷ Kiếp đoạt Tài": "Cách cục HAO TÀI: Dễ bị mất tiền vì bạn bè, anh em hoặc đầu tư sai lầm. Cần cực kỳ thận trọng.",
            "Quan Ấn tương sinh": "Cách cục THANH LIÊM: Tài lộc ổn định từ lương bổng, danh tiếng. Không giàu xổi nhưng bền vững cả đời."
        }
    }
};

module.exports = LUAN_TINH_LIB;
