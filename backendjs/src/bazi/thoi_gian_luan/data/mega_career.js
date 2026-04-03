/**
 * Mega Career Interpretations - Chi tiết luận giải Sự Nghiệp
 * 10 Thập Thần x 10 biến thể good + 10 biến thể bad = 200 câu
 */

const CAREER_INTERPRETATIONS = {
    'Chính Quan': {
        good: [
            { status: 'Thăng tiến', desc: 'Quan tinh chiếu mệnh, cơ hội thăng tiến rõ ràng. Cấp trên ưu ái, đồng nghiệp ủng hộ. Thời điểm vàng để đề xuất ý tưởng mới hoặc đàm phán lương thưởng.' },
            { status: 'Quý nhân phù trợ', desc: 'Chính Quan vượng mang quý nhân đến. Có người có quyền lực giúp đỡ, mở đường cho sự nghiệp phát triển. Nên chủ động kết nối với các mối quan hệ cấp cao.' },
            { status: 'Chức vụ mới', desc: 'Thời điểm thuận lợi cho việc nhận trọng trách mới. Nếu có cơ hội thăng chức, hãy nắm bắt ngay. Năng lực lãnh đạo được phát huy tối đa.' },
            { status: 'Ổn định vững chắc', desc: 'Công việc tiến triển đều đặn, không cần lo lắng về vị thế. Uy tín trong mắt mọi người tăng cao. Thích hợp để xây dựng hình ảnh chuyên nghiệp.' },
            { status: 'Thuận lợi mọi mặt', desc: 'Mọi việc đều hanh thông, khó khăn tự tan biến. Các dự án trì hoãn nay có thể tiến hành. Cấp dưới nghe theo, cấp trên công nhận.' },
            { status: 'Danh tiếng lan xa', desc: 'Thành tựu được nhiều người biết đến. Có thể được mời phỏng vấn, chia sẻ kinh nghiệm. Xây dựng thương hiệu cá nhân thuận lợi.' },
            { status: 'Cơ hội đào tạo', desc: 'Được cử đi học, đào tạo nâng cao. Kiến thức mới giúp nâng tầm sự nghiệp. Nên đầu tư vào bản thân trong thời gian này.' },
            { status: 'Dự án lớn', desc: 'Có thể được giao dự án quan trọng, mang tính bước ngoặt. Thể hiện năng lực để được ghi nhận. Đây là cơ hội chứng minh giá trị.' },
            { status: 'Hài lòng công việc', desc: 'Cảm thấy công việc có ý nghĩa, được trân trọng. Môi trường làm việc tích cực, đồng nghiệp thân thiện. Tinh thần làm việc lên cao.' },
            { status: 'Tài năng tỏa sáng', desc: 'Khả năng được công nhận rộng rãi. Có thể nhận giải thưởng hoặc vinh danh. Sự nghiệp bước vào giai đoạn hoàng kim.' }
        ],
        bad: [
            { status: 'Áp lực từ trên', desc: 'Quan tinh bị khắc, cấp trên gây áp lực nặng nề. Bị giám sát chặt, ít không gian tự do. Nên tuân thủ nguyên tắc, tránh tự ý đổi mới.' },
            { status: 'Bị kiểm tra', desc: 'Công việc chịu sự kiểm tra ngặt nghèo. Dễ bị bắt lỗi vặt vãnh. Cẩn thận từng chi tiết nhỏ, đừng chủ quan.' },
            { status: 'Mất tự do', desc: 'Cảm giác bị gò bó, không được làm theo ý mình. Quy định cứng nhắc khiến sáng tạo bị hạn chế. Kiên nhẫn chờ thời cơ tốt hơn.' },
            { status: 'Cạnh tranh ngầm', desc: 'Có người muốn giành vị trí của bạn. Nên cảnh giác với những lời khen ngợi quá mức. Bảo vệ thông tin quan trọng.' },
            { status: 'Chậm thăng tiến', desc: 'Dù nỗ lực nhưng kết quả chưa được ghi nhận. Cơ hội thăng chức bị hoãn lại. Không nản, tiếp tục tích lũy.' },
            { status: 'Xung đột lợi ích', desc: 'Quan điểm khác biệt với cấp trên. Nên tìm cách thỏa hiệp thay vì đối đầu. Giữ hòa khí là ưu tiên.' },
            { status: 'Trách nhiệm nặng', desc: 'Bị giao quá nhiều việc, dễ quá tải. Học cách từ chối và ủy quyền. Sức khỏe quan trọng hơn công việc.' },
            { status: 'Thay đổi đột ngột', desc: 'Có thể có biến động về nhân sự hoặc cấu trúc. Chuẩn bị tinh thần thích ứng. Linh hoạt để tồn tại.' },
            { status: 'Hiểu lầm', desc: 'Lời nói hoặc hành động dễ bị hiểu sai. Cẩn thận giao tiếp, đặc biệt qua email. Giải thích rõ ràng mọi việc.' },
            { status: 'Mệt mỏi tinh thần', desc: 'Công việc không mang lại niềm vui. Cảm giác đi làm như đi đày. Cân nhắc thay đổi dài hạn.' }
        ]
    },
    'Thất Sát': {
        good: [
            { status: 'Thử thách lớn', desc: 'Sát tinh mang năng lượng mãnh liệt, phù hợp cho quyết định táo bạo. Đây là lúc để thể hiện bản lĩnh, đưa ra quyết sách quan trọng.' },
            { status: 'Đột phá nghề nghiệp', desc: 'Thất Sát giúp phá vỡ giới hạn. Có thể đạt được thành tựu mà trước đây không dám mơ. Dũng cảm tiến lên.' },
            { status: 'Lãnh đạo mạnh mẽ', desc: 'Tư chất lãnh đạo được phát huy. Mọi người tự nhiên nghe theo chỉ đạo. Thích hợp để đứng đầu dự án khó.' },
            { status: 'Cạnh tranh thắng lợi', desc: 'Trong cuộc đua với đối thủ, bạn nắm ưu thế. Tận dụng sự quyết đoán để vượt lên. Đây là thời điểm to win.' },
            { status: 'Quyền lực tăng', desc: 'Phạm vi ảnh hưởng mở rộng. Tiếng nói có trọng lượng hơn trong tổ chức. Tận dụng để đẩy mạnh mục tiêu.' },
            { status: 'Giải quyết khủng hoảng', desc: 'Năng lực xử lý tình huống khẩn cấp được công nhận. Là người đáng tin cậy khi có vấn đề. Uy tín tăng mạnh.' },
            { status: 'Động lực cao', desc: 'Cảm thấy tràn đầy năng lượng chinh phục. Không gì có thể cản trở quyết tâm. Thời điểm để làm việc lớn.' },
            { status: 'Cải tổ thành công', desc: 'Thay đổi mang lại kết quả tích cực. Những gì cải cách đang phát huy hiệu quả. Tiếp tục đổi mới.' },
            { status: 'Đối thủ kính nể', desc: 'Đối thủ cạnh tranh phải dè chừng. Danh tiếng khiến người khác không dám xem thường. Tận dụng vị thế này.' },
            { status: 'Bước ngoặt lớn', desc: 'Sự nghiệp bước vào giai đoạn mới với nhiều cơ hội. Quyết định trong thời gian này ảnh hưởng lâu dài. Suy nghĩ kỹ nhưng hành động nhanh.' }
        ],
        bad: [
            { status: 'Nguy hiểm rình rập', desc: 'Thất Sát gặp hung, công việc có nguy cơ đảo lộn. Đối thủ mạnh hơn dự kiến. Tránh đối đầu trực tiếp, lui một bước để tiến hai bước.' },
            { status: 'Tiểu nhân hại', desc: 'Có kẻ ngầm phá hoại công việc. Cẩn thận với người tỏ ra thân thiện bất thường. Bảo mật thông tin quan trọng.' },
            { status: 'Áp lực cực đoan', desc: 'Công việc căng thẳng quá mức chịu đựng. Deadline chồng deadline. Ưu tiên sức khỏe, đừng cố quá sức.' },
            { status: 'Xung đột gay gắt', desc: 'Mâu thuẫn dễ bùng phát thành cãi vã. Kiềm chế cảm xúc nóng giận. Lời nói trong lúc tức giận gây hậu quả lớn.' },
            { status: 'Mất kiểm soát', desc: 'Tình hình vượt ngoài tầm kiểm soát. Kế hoạch bị phá vỡ bởi yếu tố bất ngờ. Linh hoạt thay đổi chiến lược.' },
            { status: 'Bị loại khỏi cuộc chơi', desc: 'Có nguy cơ bị gạt ra ngoài các quyết định quan trọng. Củng cố vị thế, xây dựng liên minh.' },
            { status: 'Tai tiếng', desc: 'Hành động có thể bị đánh giá sai. Tin đồn lan nhanh gây ảnh hưởng xấu. Cẩn thận hình ảnh công chúng.' },
            { status: 'Đổ vỡ hợp tác', desc: 'Quan hệ đối tác gặp trục trặc nghiêm trọng. Có thể phải chia tay đối tác. Chuẩn bị phương án độc lập.' },
            { status: 'Rủi ro pháp lý', desc: 'Cẩn thận các vấn đề liên quan đến pháp luật. Đọc kỹ hợp đồng trước khi ký. Tham khảo luật sư nếu cần.' },
            { status: 'Kiệt sức', desc: 'Năng lượng bị tiêu hao quá mức. Cần thời gian nghỉ ngơi để phục hồi. Đừng cố gánh vác một mình.' }
        ]
    },
    'Chính Ấn': {
        good: [
            { status: 'Quý nhân phù trợ', desc: 'Ấn tinh sáng, có quý nhân phù trợ. Người lớn tuổi hoặc có kinh nghiệm hỗ trợ đắc lực. Biết ơn và duy trì mối quan hệ này.' },
            { status: 'Học hỏi thuận lợi', desc: 'Thời gian tốt để theo đuổi chứng chỉ, bằng cấp. Kiến thức mới dễ tiếp thu. Đầu tư vào học tập sẽ có lợi lâu dài.' },
            { status: 'Được bảo vệ', desc: 'Có người che chở khỏi khó khăn. Khi gặp vấn đề, luôn có người giúp đỡ. Vị thế được bảo đảm an toàn.' },
            { status: 'Văn thư thuận lợi', desc: 'Các thủ tục giấy tờ, hợp đồng được giải quyết nhanh. Đơn xin phê duyệt dễ được chấp nhận. Thời điểm tốt để ký kết.' },
            { status: 'Sức sáng tạo', desc: 'Tư duy mở rộng, ý tưởng dồi dào. Phù hợp cho công việc sáng tạo, nghiên cứu. Output chất lượng cao hơn bình thường.' },
            { status: 'Danh dự về', desc: 'Nhận được sự công nhận về năng lực học thuật hoặc chuyên môn. Có thể được mời giảng dạy hoặc chia sẻ kinh nghiệm.' },
            { status: 'Tâm trí minh mẫn', desc: 'Đầu óc sáng suốt, quyết định chính xác. Trí tuệ sắc bén hơn, nhanh nhạy với cơ hội. Tận dụng để giải quyết vấn đề khó.' },
            { status: 'Môi trường hỗ trợ', desc: 'Điều kiện làm việc thuận lợi. Được cung cấp tài nguyên cần thiết. Không phải lo lắng về logistics.' },
            { status: 'Mở rộng tri thức', desc: 'Có cơ hội tiếp cận kiến thức mới. Sách, khóa học, mentor đều xuất hiện đúng lúc. Háo hức học hỏi.' },
            { status: 'Chín muồi nghề nghiệp', desc: 'Tích lũy kinh nghiệm đến độ chín. Mọi thứ đã học đang phát huy tác dụng. Sự nghiệp vững vàng.' }
        ],
        bad: [
            { status: 'Thiếu hỗ trợ', desc: 'Ấn tinh bị khắc, cảm thấy thiếu hỗ trợ hoặc động lực. Phải tự lực cánh sinh nhiều hơn. Đừng trông chờ người khác.' },
            { status: 'Học hành trắc trở', desc: 'Việc học tập gặp trở ngại. Thi cử không như ý. Cần nỗ lực gấp đôi để đạt kết quả.' },
            { status: 'Thiếu direction', desc: 'Không biết nên đi theo hướng nào. Mentor không có mặt hoặc không hữu ích. Tự mình tìm đường.' },
            { status: 'Giấy tờ vướng mắc', desc: 'Thủ tục hành chính bị delay. Hợp đồng cần xem xét kỹ hơn. Cẩn thận các điều khoản ẩn.' },
            { status: 'Kiến thức lỗi thời', desc: 'Những gì biết trước đây không còn áp dụng được. Cần cập nhật kỹ năng mới. Đừng cứng nhắc với cách cũ.' },
            { status: 'Mất uy tín học thuật', desc: 'Danh tiếng chuyên môn bị ảnh hưởng. Cẩn thận với những phát ngôn về chuyên môn. Kiểm tra kỹ trước khi công bố.' },
            { status: 'Đầu óc đục', desc: 'Khó tập trung, hay quên. Quyết định dễ sai lầm. Nghỉ ngơi để não bộ phục hồi.' },
            { status: 'Thiếu tài nguyên', desc: 'Không có đủ công cụ, ngân sách để làm việc. Phải sáng tạo với những gì có. Tìm cách tiết kiệm.' },
            { status: 'Cô lập', desc: 'Cảm thấy không ai hiểu công việc của mình. Khó tìm người cùng chí hướng. Tự mình là đủ.' },
            { status: 'Chậm phát triển', desc: 'Sự nghiệp dậm chân tại chỗ. Không có gì mới mẻ đến. Kiên nhẫn, mùa xuân sẽ đến sau mùa đông.' }
        ]
    },
    'Thiên Ấn': {
        good: [
            { status: 'Sáng tạo đột phá', desc: 'Thiên Ấn mang năng lượng nghệ thuật. Ý tưởng độc đáo dễ được công nhận. Thích hợp cho ngành sáng tạo, nghiên cứu.' },
            { status: 'Linh cảm mạnh', desc: 'Trực giác sắc bén, "đánh hơi" được cơ hội. Tin vào bản năng của mình. Những quyết định theo trực giác thường đúng.' },
            { status: 'Nghệ thuật thăng hoa', desc: 'Tài năng nghệ thuật được thể hiện mạnh mẽ. Tác phẩm gây ấn tượng sâu sắc. Thời điểm ra mắt sản phẩm sáng tạo.' },
            { status: 'Tâm linh phát triển', desc: 'Có xu hướng quan tâm đến chiều sâu tâm linh. Thiền định, tu tập mang lại bình an. Cân bằng công việc với đời sống nội tâm.' },
            { status: 'Độc lập thành công', desc: 'Làm việc một mình hiệu quả hơn làm nhóm. Dự án cá nhân phát triển tốt. Freelance hoặc tự kinh doanh thuận lợi.' },
            { status: 'Khác biệt là thế mạnh', desc: 'Sự khác biệt của bạn trở thành lợi thế. Không cần bắt chước ai, cứ là chính mình. Người ta tìm đến vì bạn độc đáo.' },
            { status: 'Nghiên cứu sâu', desc: 'Khả năng đào sâu vấn đề được phát huy. Thích hợp cho nghiên cứu, phân tích. Phát hiện những điều người khác bỏ sót.' },
            { status: 'Bí ẩn hấp dẫn', desc: 'Phong cách bí ẩn tạo sức hút. Người khác tò mò muốn biết thêm về bạn. Giữ một chút mystery.' },
            { status: 'Học từ nguồn khác', desc: 'Kiến thức không chính thống lại hữu ích. Học hỏi từ internet, sách cũ, người lạ. Mở rộng định nghĩa về "thầy".' },
            { status: 'Tự do tư tưởng', desc: 'Không bị ràng buộc bởi khuôn mẫu. Suy nghĩ out of the box. Đề xuất những ý tưởng mà người khác không dám.' }
        ],
        bad: [
            { status: 'Cô đơn nghề nghiệp', desc: 'Thiên Ấn bị khắc, dễ cảm thấy không được thấu hiểu. Đồng nghiệp không hiểu cách làm việc của bạn. Tìm đồng minh.' },
            { status: 'Bị cô lập', desc: 'Ý tưởng quá khác biệt nên bị bác bỏ. Khó thuyết phục người khác. Cần tìm cách trình bày dễ hiểu hơn.' },
            { status: 'Mất phương hướng', desc: 'Quá nhiều ý tưởng nhưng không biết theo đuổi cái nào. Phân tán năng lượng. Tập trung vào một mục tiêu.' },
            { status: 'Thiếu thực tế', desc: 'Ý tưởng hay nhưng khó thực hiện. Cần ai đó giúp triển khai. Tìm người bổ sung điểm yếu.' },
            { status: 'Bị nghi ngờ', desc: 'Người khác không tin vào cách làm của bạn. Phải chứng minh bằng kết quả. Đừng giải thích quá nhiều, cứ làm.' },
            { status: 'Mắc kẹt trong đầu', desc: 'Suy nghĩ quá nhiều mà không hành động. Lý thuyết suông không đi đến đâu. Bắt tay làm đi.' },
            { status: 'Khó hòa nhập', desc: 'Văn hóa công ty không phù hợp với bạn. Cảm thấy là outsider. Cân nhắc môi trường phù hợp hơn.' },
            { status: 'Bỏ lỡ cơ hội', desc: 'Quá chờ đợi thời điểm hoàn hảo nên bỏ lỡ. Đôi khi "done" tốt hơn "perfect". Hành động khi có 70% sẵn sàng.' },
            { status: 'Bị lợi dụng ý tưởng', desc: 'Ý tưởng của bạn bị người khác đem đi sử dụng. Bảo vệ sở hữu trí tuệ. Cẩn thận chia sẻ với ai.' },
            { status: 'Sức khỏe tâm thần', desc: 'Suy nghĩ nhiều gây căng thẳng tinh thần. Cần giải tỏa qua nghệ thuật hoặc thiên nhiên. Đừng giam mình.' }
        ]
    },
    'Thương Quan': {
        good: [
            { status: 'Đột phá ngoạn mục', desc: 'Thương Quan sinh Tài, biết thể hiện sẽ gây ấn tượng mạnh. Thời điểm xuất sắc cho thuyết trình, đàm phán. Tài năng biểu diễn lên cao.' },
            { status: 'Sáng tạo vượt trội', desc: 'Tư duy không giới hạn, phá vỡ mọi khuôn mẫu. Ý tưởng táo bạo được đón nhận. Đây là lúc để đề xuất cái mới.' },
            { status: 'Giao tiếp xuất sắc', desc: 'Khả năng diễn đạt lên đến đỉnh cao. Thuyết phục được những người khó tính nhất. Sử dụng lời nói như vũ khí.' },
            { status: 'Nhạy bén thị trường', desc: 'Nắm bắt xu hướng nhanh hơn người khác. Thấy cơ hội mà người khác chưa thấy. Tiên phong mở đường.' },
            { status: 'Phản biện sắc bén', desc: 'Khả năng phân tích và phản biện cực mạnh. Không ai qua mặt được bạn trong logic. Thích hợp cho tranh luận.' },
            { status: 'Thể hiện bản thân', desc: 'Tự tin thể hiện con người thật. Không cần đeo mặt nạ, chân thực lại được yêu quý. Authenticity là sức mạnh.' },
            { status: 'Truyền thông mạnh', desc: 'Ảnh hưởng qua social media, báo chí tăng mạnh. Nội dung tạo ra được chia sẻ rộng rãi. Xây dựng thương hiệu cá nhân.' },
            { status: 'Phá luật thành công', desc: 'Những gì làm khác quy tắc lại mang đến thành công. Sẵn sàng chấp nhận rủi ro để đổi mới. Người đi trước thường cô đơn.' },
            { status: 'Giáo dục hiệu quả', desc: 'Khả năng truyền đạt kiến thức lên cao. Giảng dạy, huấn luyện được đón nhận. Học viên tiến bộ rõ rệt.' },
            { status: 'Tài năng biểu diễn', desc: 'Nếu làm nghệ thuật, đây là thời điểm vàng. Sân khấu thuộc về bạn. Thể hiện hết mình.' }
        ],
        bad: [
            { status: 'Xung đột với sếp', desc: 'Thương Quan khắc Quan, dễ mâu thuẫn với cấp trên. Lời nói có thể gây họa. Giữ im lặng là vàng.' },
            { status: 'Nói nhiều hại thân', desc: 'Phát ngôn bốc đồng gây hậu quả nghiêm trọng. Một câu nói sai có thể hủy hoại cả sự nghiệp. Suy nghĩ trước khi nói.' },
            { status: 'Bị đánh giá kiêu ngạo', desc: 'Người khác thấy bạn tự cao tự đại. Dù thực tế có tài nhưng cách thể hiện gây phản cảm. Khiêm tốn hơn.' },
            { status: 'Phá vỡ quan hệ', desc: 'Lời chỉ trích thẳng thắn khiến người khác xa lánh. Đúng nhưng không khéo léo là sai. Học cách phản hồi nhẹ nhàng.' },
            { status: 'Thách thức quyền lực', desc: 'Thái độ chống đối hệ thống không đem lại lợi ích. Đôi khi cần biết khi nào nên cúi đầu. Chọn trận chiến quan trọng.' },
            { status: 'Mất kiểm soát cảm xúc', desc: 'Bùng nổ cảm xúc tại nơi làm việc. Hình ảnh chuyên nghiệp bị ảnh hưởng. Học cách managing emotions.' },
            { status: 'Bất đồng quan điểm', desc: 'Không ai đồng ý với ý kiến của bạn. Cảm giác đơn độc trong quan điểm. Đôi khi đa số đúng.' },
            { status: 'Tiết lộ bí mật', desc: 'Nói ra những điều không nên nói. Thông tin nhạy cảm bị lộ gây hại. Học cách giữ bí mật.' },
            { status: 'Đòi hỏi quá mức', desc: 'Yêu cầu của bạn bị đánh giá là không hợp lý. Biết đủ thay vì muốn nhiều hơn. Cân nhắc thực tế.' },
            { status: 'Bị phản bội', desc: 'Những gì bạn nói bị người khác sử dụng chống lại. Cẩn thận với người "bạn" giả tạo. Trust issues.' }
        ]
    },
    'Thực Thần': {
        good: [
            { status: 'Suôn sẻ tự nhiên', desc: 'Thực Thần mang năng lượng hài hòa, công việc trôi chảy. Không cần cố gắng quá mức, mọi thứ tự đến. Enjoy the flow.' },
            { status: 'Sáng tạo vui vẻ', desc: 'Tâm trạng tốt khiến công việc sáng tạo hiệu quả. Ý tưởng đến một cách tự nhiên, không gượng ép. Làm việc như đang chơi.' },
            { status: 'Được yêu mến', desc: 'Đồng nghiệp quý mến, khách hàng hài lòng. Tạo không khí tích cực cho team. Mọi người thích làm việc cùng bạn.' },
            { status: 'Kiên nhẫn đáng khen', desc: 'Khả năng làm việc tỉ mỉ, lâu dài được phát huy. Phù hợp cho dự án cần sự kiên trì. Chất lượng output cao.' },
            { status: 'Ăn uống nuôi dưỡng', desc: 'Thể chất tốt hỗ trợ tinh thần làm việc. Năng lượng dồi dào để làm việc bền bỉ. Take care of yourself.' },
            { status: 'Harmonic relationships', desc: 'Quan hệ công việc hài hòa, không có drama. Môi trường làm việc peaceful. Tận hưởng sự ổn định.' },
            { status: 'Thu nhập từ năng lực', desc: 'Thực Thần sinh Tài, tài năng mang lại thu nhập. Làm tốt thì tiền tự đến. Focus on quality.' },
            { status: 'Mentor cho người khác', desc: 'Khả năng hướng dẫn người mới nổi bật. Trở thành người được đồng nghiệp tìm đến khi cần giúp đỡ. Đức độ.' },
            { status: 'Balance work-life', desc: 'Cân bằng tốt giữa công việc và cuộc sống. Không bị work kiểm soát. Có thời gian cho bản thân và gia đình.' },
            { status: 'Chậm mà chắc', desc: 'Tiến độ có thể không nhanh nhưng vững chắc. Không cần vội, đến đích an toàn. Tortoise wins the race.' }
        ],
        bad: [
            { status: 'Trì trệ lười biếng', desc: 'Thực Thần bị khắc, dễ lười biếng hoặc mất phương hướng. Thiếu động lực để push. Cần discipline.' },
            { status: 'Quá thoải mái', desc: 'Thoải mái quá mức dẫn đến thiếu cạnh tranh. Bị người khác vượt qua. Cần chút áp lực để tiến lên.' },
            { status: 'Không có urgency', desc: 'Thiếu cảm giác cấp bách khiến bỏ lỡ deadline. Mọi thứ đều "mai làm cũng được". Đặt hẹn cho bản thân.' },
            { status: 'Dễ bị lợi dụng', desc: 'Tính tốt bụng bị lợi dụng. Làm hộ người khác mà không được ghi nhận. Biết nói không.' },
            { status: 'Thiếu tham vọng', desc: 'Hài lòng với hiện tại nên không có động lực tiến lên. OK với "đủ" thay vì "xuất sắc". Push harder.' },
            { status: 'Quá enjoy', desc: 'Quá tập trung vào việc tận hưởng mà quên làm việc. Ăn chơi ảnh hưởng công việc. Cân bằng lại.' },
            { status: 'Bị xem thường', desc: 'Tính dễ gần bị hiểu là dễ bắt nạt. Cần thể hiện authority khi cần. Tốt bụng ≠ yếu đuối.' },
            { status: 'Miss opportunities', desc: 'Quá chờ đợi điều tốt đẹp tự đến mà không hành động. Cơ hội qua đi. Chủ động hơn.' },
            { status: 'Thiếu innovation', desc: 'Quá thoải mái với status quo, không muốn thay đổi. Bị thời đại bỏ lại phía sau. Cập nhật bản thân.' },
            { status: 'Weight gain', desc: 'Ăn uống không kiểm soát ảnh hưởng sức khỏe và hình ảnh. Cẩn thận với comfort eating. Ăn healthy.' }
        ]
    },
    'Chính Tài': {
        good: [
            { status: 'Thu nhập ổn định', desc: 'Tài tinh vượng, công việc mang lại thu nhập đáng kể. Lương thưởng đúng hẹn, có thể có bonus. Tài chính khởi sắc.' },
            { status: 'Thời điểm tăng lương', desc: 'Cơ hội đàm phán lương thưởng thuận lợi. Giá trị của bạn được công nhận. Mạnh dạn đề xuất.' },
            { status: 'Công việc có giá trị', desc: 'Những gì làm ra đều có giá trị thực tế. Output chuyển hóa thành tiền. Cảm thấy công việc có ý nghĩa.' },
            { status: 'Ổn định lâu dài', desc: 'Công việc mang lại sự ổn định tài chính. Không cần lo lắng về sinh kế. Có thể lên kế hoạch dài hạn.' },
            { status: 'Client tốt', desc: 'Khách hàng đáng tin cậy, thanh toán đúng hẹn. Mối quan hệ kinh doanh win-win. Xây dựng base khách hàng.' },
            { status: 'Kinh doanh thuận lợi', desc: 'Nếu tự kinh doanh, doanh thu tăng trưởng. Chi phí được kiểm soát. Lợi nhuận cải thiện.' },
            { status: 'Đầu tư sinh lời', desc: 'Thời điểm tốt để đầu tư an toàn. Tiền đẻ ra tiền. Xem xét các kênh đầu tư passive income.' },
            { status: 'Quản lý tốt', desc: 'Khả năng quản lý tài chính và công việc đều tốt. Biết phân bổ nguồn lực hiệu quả. Boss material.' },
            { status: 'Cơ hội việc làm', desc: 'Nhiều lời mời công việc với đãi ngộ tốt. Nếu đang tìm việc, đây là thời điểm vàng. Chọn lọc kỹ.' },
            { status: 'Tài sản tăng', desc: 'Giá trị tài sản tích lũy tăng lên. Bất động sản, cổ phiếu, hoặc các khoản đầu tư có lãi. Wealth building.' }
        ],
        bad: [
            { status: 'Vất vả kiếm tiền', desc: 'Chính Tài bị khắc, phải làm nhiều mới có thu hoạch. Tiền không đến dễ dàng. Đừng nản, kiên trì.' },
            { status: 'Lương không xứng', desc: 'Cảm thấy đãi ngộ không tương xứng với công sức. Khó đàm phán tăng lương. Cân nhắc lựa chọn khác.' },
            { status: 'Chi phí cao', desc: 'Chi phí gia tăng làm giảm lợi nhuận. Kiểm soát chi tiêu chặt chẽ. Cut unnecessary expenses.' },
            { status: 'Khách hàng khó', desc: 'Khách hàng yêu cầu nhiều nhưng trả ít. Bị nợ tiền hoặc delay thanh toán. Set boundaries.' },
            { status: 'Áp lực tài chính', desc: 'Lo lắng về tiền ảnh hưởng đến công việc. Stress về tài chính giảm năng suất. Giải quyết gốc rễ.' },
            { status: 'Công việc nhàm chán', desc: 'Làm chỉ vì tiền mà không có đam mê. Burnout rình rập. Cân bằng giữa bread và passion.' },
            { status: 'Cạnh tranh giá', desc: 'Bị ép giá bởi đối thủ hoặc khách hàng. Khó giữ margin. Tập trung vào value differentiation.' },
            { status: 'Thiếu tài nguyên', desc: 'Không có đủ ngân sách để thực hiện kế hoạch. Phải làm ít với nguồn lực hạn chế. Sáng tạo với constraints.' },
            { status: 'Tài sản giảm', desc: 'Giá trị đầu tư giảm sút. Không phải thời điểm bán. Hold và chờ đợi.' },
            { status: 'Nợ nần', desc: 'Cẩn thận với các khoản vay, tránh mắc nợ mới. Ưu tiên trả nợ cũ. Quản lý dòng tiền.' }
        ]
    },
    'Thiên Tài': {
        good: [
            { status: 'Cơ hội bất ngờ', desc: 'Thiên Tài mang tài lộc bất ngờ. Thu nhập ngoài dự kiến như bonus, commission, hoặc quà tặng. Open to opportunities.' },
            { status: 'Hoành tài', desc: 'Có thể kiếm tiền nhanh từ các cơ hội ngắn hạn. Side hustle phát triển. Đa dạng nguồn thu.' },
            { status: 'May mắn tài chính', desc: 'Vận may đến trong các giao dịch. Mua được giá tốt, bán được giá cao. Timing is right.' },
            { status: 'Đầu cơ thắng', desc: 'Nếu có đầu cơ (có kiểm soát), thời gian này thuận lợi. Linh cảm về thị trường khá chính xác. Nhưng đừng quá tham.' },
            { status: 'Khách hàng mới', desc: 'Khách hàng mới tìm đến một cách bất ngờ. Referral từ nguồn không ngờ. Mở rộng network.' },
            { status: 'Partnership lợi nhuận', desc: 'Hợp tác kinh doanh mang lại lợi nhuận cao. Đối tác có nguồn lực tốt. Win-win deal.' },
            { status: 'Doanh nghiệp tăng trưởng', desc: 'Nếu kinh doanh, có bước nhảy vọt về doanh thu. Thị trường mở rộng. Nắm bắt momentum.' },
            { status: 'Quản lý rủi ro tốt', desc: 'Biết cách chấp nhận rủi ro có tính toán. Bold moves pay off. Calculated risk.' },
            { status: 'Đa dạng thu nhập', desc: 'Nhiều nguồn thu nhập cùng hoạt động. Không phụ thuộc vào một nguồn. Financial security.' },
            { status: 'Tài sản nhanh', desc: 'Khả năng tích lũy tài sản nhanh hơn bình thường. Bắt đúng sóng. Make hay while the sun shines.' }
        ],
        bad: [
            { status: 'Tiền đến rồi đi', desc: 'Thiên Tài gặp hung, tiền vào lại ra nhanh. Khó tích lũy. Buộc phải tiết kiệm ngay khi có.' },
            { status: 'Rủi ro tài chính', desc: 'Cẩn thận với các khoản đầu tư mạo hiểm. Có thể mất tiền. Tốt nhất là giữ ổn định.' },
            { status: 'Lừa đảo rình rập', desc: 'Cẩn thận với các cơ hội "quá tốt để là thật". Có người muốn lừa tiền. Verify everything.' },
            { status: 'Chi tiêu bốc đồng', desc: 'Dễ tiêu tiền vào những thứ không cần thiết. Shopping impulse cao. Chờ 24h trước khi mua.' },
            { status: 'Thu nhập bất ổn', desc: 'Doanh thu dao động mạnh, khó dự đoán. Lập kế hoạch dự phòng. Emergency fund.' },
            { status: 'Đối tác không tin', desc: 'Đối tác kinh doanh không đáng tin cậy. Check background kỹ. Đừng tin lời hứa suông.' },
            { status: 'Cạnh tranh khốc liệt', desc: 'Đối thủ mạnh hơn tranh giành thị phần. Cạnh tranh về giá không phải giải pháp. Differentiate.' },
            { status: 'Đầu tư thất bại', desc: 'Các khoản đầu tư không như kỳ vọng. Cut loss sớm nếu cần. Learn from mistakes.' },
            { status: 'Tham lam hại thân', desc: 'Quá ham lợi dẫn đến quyết định sai lầm. Greed is not good. Biết đủ là giàu.' },
            { status: 'Cash flow vấn đề', desc: 'Dòng tiền không ổn định, khó xoay xở. Cần kế hoạch tài chính rõ ràng. Manage cash carefully.' }
        ]
    },
    'Tỷ Kiên': {
        good: [
            { status: 'Hợp tác hiệu quả', desc: 'Tỷ Kiên vượng, làm việc nhóm hiệu quả cao. Đồng nghiệp hỗ trợ tích cực. Thời điểm tốt để team project.' },
            { status: 'Network mở rộng', desc: 'Quan hệ đồng nghiệp, bạn bè nghề nghiệp phát triển. Networking mang lại cơ hội. Attend events.' },
            { status: 'Cùng nhau thành công', desc: 'Shared success là possible. Thắng cùng nhau. Team spirit cao, morale tốt.' },
            { status: 'Peer support', desc: 'Có người cùng trình độ sẵn sàng giúp đỡ. Không phải làm một mình. Ask for help.' },
            { status: 'Sức mạnh tập thể', desc: 'Kết hợp sức mạnh của nhiều người để đạt mục tiêu lớn. Unity is strength. Together we stand.' },
            { status: 'Học hỏi lẫn nhau', desc: 'Trao đổi kiến thức với đồng nghiệp rất hiệu quả. Peer learning. Share knowledge.' },
            { status: 'Partnership công bằng', desc: 'Nếu có đối tác, quan hệ công bằng và harmonious. Chia sẻ lợi nhuận hợp lý. Fair deal.' },
            { status: 'Competition healthy', desc: 'Cạnh tranh với đồng nghiệp một cách lành mạnh. Push each other to be better. Friendly rivalry.' },
            { status: 'Đồng minh mạnh', desc: 'Có người cùng phe ủng hộ trong các cuộc họp, quyết định. Không bị cô lập. Political support.' },
            { status: 'Co-working', desc: 'Làm việc chung với người khác tạo động lực và ý tưởng mới. Synergy. 1+1=3.' }
        ],
        bad: [
            { status: 'Cạnh tranh nội bộ', desc: 'Tỷ Kiên gặp xung, đồng nghiệp trở thành đối thủ. Cạnh tranh không lành mạnh. Protect your territory.' },
            { status: 'Bị giành công', desc: 'Người khác nhận credit cho công sức của bạn. Document contributions. Claim your work.' },
            { status: 'Chia rẽ', desc: 'Team bị chia thành các phe phái. Khó làm việc chung. Neutral stance if possible.' },
            { status: 'So sánh bất lợi', desc: 'Bị so sánh với đồng nghiệp theo hướng bất lợi. Focus on your own game. Run your own race.' },
            { status: 'Bạn giả', desc: 'Người tỏ ra thân thiện nhưng ngầm cạnh tranh. Không nên tiết lộ chiến lược. Keep cards close.' },
            { status: 'Chia lợi nhuận', desc: 'Bất đồng về cách chia lợi nhuận hoặc công lao. Clear agreements upfront. Written contracts.' },
            { status: 'Copy cat', desc: 'Người khác copy ý tưởng hoặc cách làm của bạn. Protect IP. Stay ahead by innovating.' },
            { status: 'Gossip', desc: 'Tin đồn trong office về bạn. Đừng quan tâm quá nhiều. Actions speak louder.' },
            { status: 'Clique exclusion', desc: 'Bị loại khỏi nhóm insider. Không được mời vào các cuộc nói chuyện quan trọng. Build own circle.' },
            { status: 'Resource fight', desc: 'Cạnh tranh nguồn lực với đồng nghiệp. Ngân sách, headcount, projects. Negotiate fairly.' }
        ]
    },
    'Kiếp Tài': {
        good: [
            { status: 'Động lực cạnh tranh', desc: 'Kiếp Tài mang năng lượng cạnh tranh. Nếu có thực lực thì đây là lúc thể hiện. Rise to the challenge.' },
            { status: 'Quyết đoán mạnh mẽ', desc: 'Không do dự khi cần ra quyết định. Boldness brings rewards. Take decisive action.' },
            { status: 'Vượt qua đối thủ', desc: 'Trong cuộc đua, bạn có năng lượng để vượt lên. Competitive edge. Seize the lead.' },
            { status: 'Thúc đẩy bản thân', desc: 'Áp lực từ cạnh tranh khiến bạn làm tốt hơn. Push beyond limits. Better version of yourself.' },
            { status: 'Assert bản thân', desc: 'Thể hiện sức mạnh và vị thế. Không bị bắt nạt. Stand your ground. Assert authority.' },
            { status: 'Nhanh nhẹn phản ứng', desc: 'Phản ứng nhanh với tình huống thay đổi. Agile and adaptable. First mover advantage.' },
            { status: 'Risk taker', desc: 'Dám chấp nhận rủi ro mà người khác không dám. Fortune favors the bold. Calculated risks.' },
            { status: 'No fear', desc: 'Không sợ đối đầu với khó khăn. Face challenges head on. Courage.' },
            { status: 'Survivor', desc: 'Khả năng sống sót trong môi trường khắc nghiệt. Tough times dont last. You do.' },
            { status: 'Alpha energy', desc: 'Thể hiện phẩm chất lãnh đạo mạnh mẽ. Người khác tự nhiên theo bạn. Natural leader.' }
        ],
        bad: [
            { status: 'Mất cơ hội', desc: 'Kiếp Tài gặp hung, người khác tranh giành thành quả. Bảo vệ những gì đã xây dựng. Dont reveal plans.' },
            { status: 'Phá hoại', desc: 'Có người muốn phá hoại công việc của bạn. Watch your back. Identify enemies.' },
            { status: 'Xung đột dữ dội', desc: 'Mâu thuẫn leo thang thành xung đột nghiêm trọng. Pick battles wisely. Not everything is worth fighting.' },
            { status: 'Tiêu hao năng lượng', desc: 'Quá many fronts to fight. Energy scattered. Focus on priorities.' },
            { status: 'Relationships damaged', desc: 'Cạnh tranh quá mức hủy hoại quan hệ. Burned bridges. Win the battle, lose the war.' },
            { status: 'Bị backstab', desc: 'Đồng minh trở mặt. Allies become enemies. Trust carefully.' },
            { status: 'Reputation hit', desc: 'Hành vi cạnh tranh bị đánh giá là aggressive. Bad publicity. Mind your image.' },
            { status: 'Isolation', desc: 'Quá competitive khiến không ai muốn làm cùng. Lonely at the top. Balance is key.' },
            { status: 'Burnout', desc: 'Chiến đấu liên tục khiến kiệt sức. Battle fatigue. Rest and recover.' },
            { status: 'Pyrrhic victory', desc: 'Thắng nhưng mất mát quá nhiều. Worth it? Count the cost before the fight.' }
        ]
    }
};

/**
 * Get random career interpretation based on shishen and score
 */
function getCareerInterpretation(shishen, score = 0) {
    const data = CAREER_INTERPRETATIONS[shishen];
    if (!data) {
        return score >= 0
            ? { status: 'Bình thường', desc: 'Công việc diễn ra bình thường, không có biến động lớn. Duy trì nhịp độ hiện tại.' }
            : { status: 'Ổn định', desc: 'Duy trì ổn định, tránh thay đổi lớn trong thời gian này.' };
    }

    const pool = score >= 0 ? data.good : data.bad;
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
}

module.exports = {
    CAREER_INTERPRETATIONS,
    getCareerInterpretation
};
