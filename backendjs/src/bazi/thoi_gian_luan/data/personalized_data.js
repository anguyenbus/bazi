/**
 * Dữ liệu luận giải cá nhân hóa theo Giới tính và Độ tuổi cho Thập Thần
 */

const PERSONALIZED_INTERPRETATIONS = {
    "Tỷ Kiên": {
        "Nam": {
            "Thiếu niên": "Năm này bạn có nhiều bạn bè, dễ bị lôi kéo vào các cuộc chơi. Cần tập trung vào việc học, tránh tranh chấp vô ích với bạn cùng trang lứa.",
            "Thanh niên": "Cơ hội khởi nghiệp cùng bạn bè. Tuy nhiên cần rõ ràng về tài chính để tránh mất lòng. Có sự cạnh tranh trong công việc nhưng đó là động lực để vươn lên.",
            "Trung niên": "Mở rộng mạng lưới quan hệ xã hội. Chú ý giữ gìn hòa khí với anh em trong gia đình. Sự nghiệp ổn định nhờ sự hỗ trợ của đồng nghiệp cùng cấp.",
            "Lão niên": "Vui vầy bên bạn già, tham gia các hoạt động cộng đồng. Cần chú ý sức khỏe, tránh làm việc quá sức vì tinh thần muốn 'bằng bạn bằng bè'."
        },
        "Nữ": {
            "Thiếu niên": "Dễ gặp bạn thân tâm đầu ý hợp. Cần chú ý cân bằng giữa tình bạn và việc học tập. Đôi khi nảy sinh lòng đố kỵ nhỏ, cần học cách chia sẻ.",
            "Thanh niên": "Năng động trong các hoạt động tập thể. Trong tình cảm có thể xuất hiện đối thủ cạnh tranh. Hãy tự tin vào bản thân và giữ phong thái độc lập.",
            "Trung niên": "Gác lại những lo toan để dành thời gian cho bạn bè, chị em. Chú ý mối quan hệ với chồng, đừng để những tác động từ bên ngoài làm ảnh hưởng hạnh phúc gia đình.",
            "Lão niên": "Tâm hồn trẻ trung, thích giao lưu. Được sự quan tâm của anh chị em. Sức khỏe cần chú ý các bệnh về hệ thần kinh hoặc tiêu hóa."
        }
    },
    "Kiếp Tài": {
        "Nam": {
            "Thiếu niên": "Dễ bị bạn bè xấu lôi kéo, ham chơi quên học. Cần sự giám sát chặt chẽ từ gia đình về tài chính và các mối quan hệ xã hội.",
            "Thanh niên": "Thử thách lớn về tài chính. Tránh cờ bạc, đầu tư mạo hiểm. Có thể gặp gian truân trong sự nghiệp do tiểu nhân quấy phá hoặc bị đồng nghiệp lấn lướt.",
            "Trung niên": "Cẩn trọng trong các hợp đồng làm ăn. Tránh bảo lãnh tiền bạc cho người khác. Chú ý sức khỏe và mối quan hệ với vợ, dễ nảy sinh mâu thuẫn vì tiền bạc.",
            "Lão niên": "Phòng tránh lừa đảo tài chính. Không nên tham gia các dự án đầu tư không rõ ràng. Dành thời gian nghỉ ngơi, tránh lo nghĩ về chuyện tiền nong của con cái."
        },
        "Nữ": {
            "Thiếu niên": "Dễ bị ảnh hưởng bởi xu hướng đám đông, chi tiêu hoang phí. Cần học cách quản lý cảm xúc và tiền bạc ngay từ sớm.",
            "Thanh niên": "Cạnh tranh gay gắt trong sự nghiệp và tình cảm. Cần giữ cái đầu lạnh, tránh các cuộc tranh cãi vô bổ. Tài chính có xu hướng hao hụt cho mua sắm.",
            "Trung niên": "Áp lực gia đình và công việc tăng cao. Cần chú ý giữ gìn sức khỏe, đặc biệt là hệ tuần hoàn. Cẩn thận bị người thân/bạn bè 'vay mượn' không trả.",
            "Lão niên": "Cẩn thận các bệnh tuổi già phát tác do lo âu. Tránh can thiệp quá sâu vào chuyện kinh tế của con cái để giữ cho tâm hồn thanh thản."
        }
    },
    "Thực Thần": {
        "Nam": {
            "Thiếu niên": "Năm của sự sáng tạo và học hỏi. Có lộc ăn uống, sức khỏe tốt. Thích hợp theo đuổi các môn nghệ thuật hoặc năng khiếu.",
            "Thanh niên": "Nhiều ý tưởng mới trong công việc. Có cơ hội thể hiện năng lực bản thân. Tài lộc dồi dào nhờ kỹ năng chuyên môn và sự linh hoạt.",
            "Trung niên": "Cuộc sống thong dong, hưởng thụ thành quả lao động. Có duyên với ẩm thực và du lịch. Chú ý giữ gìn vóc dáng, tránh các bệnh do thừa chất.",
            "Lão niên": "Phúc lộc đầy nhà, con cháu hiếu thảo. Tinh thần lạc quan, yêu đời. Là giai đoạn vàng để truyền đạt kinh nghiệm cho thế hệ sau."
        },
        "Nữ": {
            "Thiếu niên": "Thông minh, lanh lợi, được nhiều người yêu mến. Có năng khiếu nghệ thuật bẩm sinh. Sức khỏe dồi dào, tâm hồn trong sáng.",
            "Thanh niên": "Duyên dáng, có sức hút lớn với người khác giới. Trong công việc có sự sáng tạo vượt bậc. Đây là năm tốt để thực hiện các dự định cá nhân.",
            "Trung niên": "Khéo léo trong việc chăm sóc gia đình và công việc. Có lộc về điền sản hoặc quà tặng. Cuộc sống viên mãn, nội tâm yên bình.",
            "Lão niên": "An nhàn hưởng phúc, tâm hồn thư thái. Có niềm vui từ việc chăm sóc cây cảnh, thú cưng hoặc các hoạt động tâm linh, thiện nguyện."
        }
    },
    "Thương Quan": {
        "Nam": {
            "Thiếu niên": "Tinh thần phản kháng cao, thích thể hiện cá tính. Cần sự định hướng đúng đắn để không đi chệch hướng. Có tài lẻ nhưng thiếu kiên trì.",
            "Thanh niên": "Tham vọng lớn, muốn thay đổi công việc hoặc môi trường sống. Dễ mâu thuẫn với cấp trên. Cần tiết chế cái tôi để tránh các rắc rối pháp lý hoặc thị phi.",
            "Trung niên": "Sự nghiệp có nhiều biến động, đòi hỏi sự bứt phá. Chú ý sức khỏe, đặc biệt là các bệnh do áp lực công việc. Cần bình tĩnh trong các quyết định quan trọng.",
            "Lão niên": "Tâm trí vẫn còn nhanh nhạy nhưng dễ nảy sinh sự cô độc. Nên tham gia các hoạt động trí tuệ nhẹ nhàng để giữ cho tinh thần minh mẫn."
        },
        "Nữ": {
            "Thiếu niên": "Lanh lợi nhưng hơi bướng bỉnh. Cần chú ý lời ăn tiếng nói để tránh mâu thuẫn với thầy cô, cha mẹ. Có xu hướng mộng mơ quá mức.",
            "Thanh niên": "Cá tính mạnh mẽ, độc lập trong sự nghiệp. Trong tình cảm dễ nảy sinh mâu thuẫn do đòi hỏi cao ở đối phương. Cần học cách nhường nhịn.",
            "Trung niên": "Nhiều lo toan cho con cái và gia đình. Sức khỏe cần chú ý hệ hô hấp và nội tiết. Dễ gặp thị phi nơi công sở, nên giữ thái độ trung lập.",
            "Lão niên": "Hay lo nghĩ cho con cháu, đôi khi tạo ra áp lực không cần thiết. Nên học cách buông bỏ để tận hưởng những năm tháng tuổi già an yên."
        }
    },
    "Thiên Tài": {
        "Nam": {
            "Thiếu niên": "Bắt đầu có ý thức về giá trị đồng tiền. Có lộc bất ngờ từ người lớn. Thích hợp tham gia các hoạt động ngoại khóa mang tính thực tế.",
            "Thanh niên": "Cơ hội kiếm tiền ngoài luồng dồi dào. Thích hợp đầu tư ngắn hạn. Trong tình cảm có nhiều mối quan hệ mới, cần sự chung thủy.",
            "Trung niên": "Tài vận hanh thông, sự nghiệp phát triển nhờ nhạy bén với thời cuộc. Có duyên với bất động sản hoặc chứng khoán. Chú ý sức khỏe gan thận.",
            "Lão niên": "Tài lực ổn định, có thể giúp đỡ con cháu về tài chính. Tinh thần sảng khoái, thích du lịch trải nghiệm những điều mới lạ."
        },
        "Nữ": {
            "Thiếu niên": "Khéo léo, biết cách lấy lòng người lớn. Có may mắn về quà tặng hoặc phần thưởng học tập. Thích mua sắm và chăm chút ngoại hình.",
            "Thanh niên": "Năng động, có duyên với kinh doanh buôn bán. Tài chính ổn định nhờ sự linh hoạt. Trong tình duyên có nhiều lựa chọn, cần sự sáng suốt.",
            "Trung niên": "Quản lý tài chính giỏi, là tay hòm chìa khóa của gia đình. Có cơ hội tăng thu nhập từ nghề tay trái. Cuộc sống phong phú, nhiều niềm vui.",
            "Lão niên": "Có của ăn của để, sống không phải lo nghĩ về tiền bạc. Hài lòng với thành quả đạt được. Sức khỏe ổn định nhờ chế độ dinh dưỡng tốt."
        }
    },
    "Chính Tài": {
        "Nam": {
            "Thiếu niên": "Chăm chỉ, cần mẫn trong học tập. Có ý thức tiết kiệm và quý trọng tài sản. Đây là năm đặt nền móng kiến thức vững chắc.",
            "Thanh niên": "Công việc ổn định, thu nhập đều đặn từ lương. Thích hợp cho việc lập gia đình và mua sắm các tài sản lớn (nhà, xe). Sự nghiệp thăng tiến chậm nhưng chắc.",
            "Trung niên": "Trụ cột gia đình vững chắc. Sự nghiệp đạt độ chín muồi. Tài chính dư dả, có tích lũy cho tương lai. Chú ý các bệnh về tiêu hóa do lối sống văn phòng.",
            "Lão niên": "Hưởng lương hưu hoặc thu nhập ổn định từ tích lũy. Sống nề nếp, kỷ luật. Được mọi người kính trọng vì sự mẫu mực và điềm đạm."
        },
        "Nữ": {
            "Thiếu niên": "Ngoan ngoãn, ham học hỏi. Biết giúp đỡ mẹ cha làm việc nhà. Có tính cách hiền dịu, chuẩn mực của người con gái truyền thống.",
            "Thanh niên": "Là người phụ nữ đảm đang, chu toàn cả việc nước lẫn việc nhà. Sự nghiệp ổn định, được cấp trên tin tưởng. Tài chính có sự tích lũy tốt.",
            "Trung niên": "Gia đình êm ấm, thuận hòa. Là hậu phương vững chắc cho chồng con. Sức khỏe tốt, tinh thần ổn định. Hài lòng với cuộc sống hiện tại.",
            "Lão niên": "Sống thọ, an nhàn. Được con cháu phụng dưỡng chu đáo. Truyền dạy phong cách sống cần kiệm, liêm chính cho thế hệ sau."
        }
    },
    "Thất Sát": {
        "Nam": {
            "Thiếu niên": "Hiếu động, đôi khi gây ra rắc rối vì tính nóng nảy. Cần sự rèn luyện thể chất và kỷ luật nghiêm khắc để hướng năng lượng vào điều tích cực.",
            "Thanh niên": "Năm của thử thách và sự khắc nghiệt. Áp lực công việc rất lớn, đòi hỏi bản lĩnh vượt qua. Cần cẩn thận tai nạn hoặc va chạm pháp lý.",
            "Trung niên": "Giữ trọng trách cao, đối mặt với nhiều sóng gió trong sự nghiệp. Đòi hỏi sự quyết đoán và tinh thần thép. Chú ý sức khỏe huyết áp và tim mạch.",
            "Lão niên": "Tinh thần vẫn còn rất cứng cỏi nhưng sức khỏe có dấu hiệu suy giảm nhanh. Nên tránh các cuộc tranh luận căng thẳng, tập trung tịnh dưỡng."
        },
        "Nữ": {
            "Thiếu niên": "Cá tính mạnh, dễ có mâu thuẫn với gia đình. Cần sự thấu hiểu và sẻ chia để vượt qua giai đoạn biến động tâm lý. Chú ý sức khỏe vùng đầu.",
            "Thanh niên": "Áp lực từ công việc và tình cảm. Dễ gặp phải người đàn ông có tính cách mạnh mẽ hoặc gia trưởng. Cần sự kiên cường và khôn khéo.",
            "Trung niên": "Gánh vác nhiều trách nhiệm nặng nề. Sự nghiệp có nhiều khó khăn cần tháo gỡ. Chú ý giữ gìn sức khỏe phụ khoa và hệ xương khớp.",
            "Lão niên": "Tâm tính có phần nghiêm khắc, dễ khiến con cháu e ngại. Nên học cách chia sẻ tình cảm nhẹ nhàng hơn để tuổi già thêm ấm áp."
        }
    },
    "Chính Quan": {
        "Nam": {
            "Thiếu niên": "Năm của thành tích học tập xuất sắc. Có xu hướng làm lớp trưởng hoặc người đứng đầu các hội nhóm. Có ý thức kỷ luật và lòng tự trọng cao.",
            "Thanh niên": "Sự nghiệp thăng tiến, có cơ hội thăng chức hoặc trúng tuyển vào các vị trí quan trọng. Nhận được sự tín nhiệm của cấp trên và đồng nghiệp.",
            "Trung niên": "Địa vị xã hội ổn định, uy tín tăng cao. Là tấm gương sáng trong cộng đồng. Tài lộc và danh tiếng đồng hành. Chú ý giữ gìn hình ảnh cá nhân.",
            "Lão niên": "Được vinh danh về những đóng góp cho xã hội. Sống mẫu mực, là chỗ dựa tinh thần cho con cháu. Sức khỏe ổn định nhờ lối sống lành mạnh."
        },
        "Nữ": {
            "Thiếu niên": "Học giỏi, mẫu mực, là niềm tự hào của gia đình. Có phong thái đài các, đoan trang. Đây là năm tốt để phát triển các kỹ năng lãnh đạo.",
            "Thanh niên": "Công danh rạng rỡ, có quý nhân phù trợ. Trong tình duyên dễ gặp được người chồng lý tưởng, thành đạt. Cuộc sống viên mãn, hạnh phúc.",
            "Trung niên": "Sự nghiệp thành công, gia đình hạnh phúc. Kết hợp hài hòa giữa công việc và tổ ấm. Có uy tín lớn trong các mối quan hệ xã hội.",
            "Lão niên": "Phong thái sang quý, an nhàn hưởng phúc. Được xã hội và gia đình kính trọng. Sức khỏe tốt nhờ tâm can bình thản, lối sống khoa học."
        }
    },
    "Thiên Ấn": {
        "Nam": {
            "Thiếu niên": "Đam mê khám phá những điều mới lạ, độc đáo. Có thiên hướng về triết học hoặc các môn khoa học huyền bí. Cần tránh sự cô độc, xa rời thực tế.",
            "Thanh niên": "Khả năng tự học xuất sắc. Thích hợp cho các công việc nghiên cứu hoặc sáng tạo độc lập. Có thể gặp được những bậc thầy tâm linh hoặc thầy giỏi.",
            "Trung niên": "Tư tưởng thâm trầm, sâu sắc. Có uy tín trong các lĩnh vực chuyên môn hẹp. Cuộc sống nội tâm phong phú. Chú ý các bệnh tâm lý hoặc mất ngủ.",
            "Lão niên": "Nghiên cứu sâu về đạo học, tôn giáo hoặc thiền định. Tinh thần thoát tục, an nhiên. Là người có trí tuệ sâu sắc, được con cháu ngưỡng mộ."
        },
        "Nữ": {
            "Thiếu niên": "Nhạy cảm, có trực giác tốt. Đam mê đọc sách và tìm hiểu về nghệ thuật. Cần sự quan tâm tinh tế từ gia đình để tránh cảm giác bị bỏ rơi.",
            "Thanh niên": "Có khả năng cảm thụ nghệ thuật và trực giác siêu nhạy. Trong công việc thường có những giải pháp độc đáo. Cần tránh sự mơ mộng thiếu thực tế.",
            "Trung niên": "Yêu thích sự tĩnh lặng và các hoạt động tâm linh. Có khả năng chữa lành cho người khác bằng lời khuyên và sự thấu cảm. Cuộc sống bình lặng.",
            "Lão niên": "Tâm hồn thanh tịnh, hướng thiện. Dành thời gian cho các hoạt động từ thiện và tu tập. Sức khỏe ổn định nhờ tâm trí luôn được bình an."
        }
    },
    "Chính Ấn": {
        "Nam": {
            "Thiếu niên": "Được sự che chở và ủng hộ tuyệt đối của gia đình. Học hành đỗ đạt, thi cử thuận lợi. Bản tính hiền lành, hiếu thảo, trọng đạo nghĩa.",
            "Thanh niên": "Sự nghiệp có bước đệm vững chắc từ tiền bối. Nhận được bằng cấp cao hoặc các chứng chỉ danh giá. Được nhiều người quý mến và giúp đỡ.",
            "Trung niên": "Sự nghiệp vững vàng, có uy tín và danh tiếng. Là người có tâm đức, hay giúp đỡ hậu thế. Gia đình ấm cúng, con cái ngoan ngoãn.",
            "Lão niên": "Phúc đức vô biên, con cháu vinh hiển. Sống trong sự tôn trọng và yêu thương của mọi người. Sức khỏe tốt, tâm hồn luôn thư thái, an lạc."
        },
        "Nữ": {
            "Thiếu niên": "Là 'lá ngọc cành vàng', được yêu chiều. Học tập thuận lợi, cuộc sống êm đềm. Có tâm hồn nhân hậu, biết yêu thương mọi người.",
            "Thanh niên": "Có duyên với nghệ thuật và văn chương. Trong sự nghiệp nhận được sự bảo bọc của quý nhân. Cuộc sống ít sóng gió, nhiều niềm vui.",
            "Trung niên": "Người mẹ mẫu mực, người vợ hiền thục. Sự nghiệp ổn định, không cầu danh lợi nhưng vẫn đạt được. Hài lòng với những gì mình đang có.",
            "Lão niên": "Tấm gương sáng về đức hạnh cho con cháu. Sống trường thọ, an nhiên. Tận hưởng tuổi già trong sự bình yên và tri ân cuộc đời."
        }
    }
};

module.exports = {
    PERSONALIZED_INTERPRETATIONS
};
