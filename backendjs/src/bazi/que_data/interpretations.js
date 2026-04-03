/**
 * Giải nghĩa chi tiết 64 Quẻ Dịch - COMPLETE
 */

const INTERPRETATIONS = {
    1: { overview: "Quẻ thuần dương, tượng trưng cho sức mạnh của trời. Thời điểm phát huy sáng tạo và lãnh đạo.", aspects: { career: "Thuận lợi khởi xướng dự án mới, thể hiện năng lực lãnh đạo.", finance: "Tài vận hanh thông nếu dám đầu tư có tính toán.", love: "Cần chủ động trong tình cảm, tự tin thể hiện.", spirit: "Năng lượng dồi dào, tinh thần sáng suốt.", safety: "Vận khí cường thịnh, tai ương khó xâm phạm. Đi xa an toàn." }, advice: { positive: ["Phát huy sáng kiến", "Dám nghĩ dám làm", "Tự tin"], caution: ["Tránh kiêu ngạo", "Cần lắng nghe"] } },
    2: { overview: "Quẻ thuần âm, tượng trưng cho sự tiếp nhận và bao dung của đất. Thời điểm nhu thuận.", aspects: { career: "Hỗ trợ người khác, làm việc nhóm hiệu quả.", finance: "Giữ gìn và tích lũy, đầu tư an toàn dài hạn.", love: "Dịu dàng và thấu hiểu củng cố tình cảm.", spirit: "Nghỉ ngơi, tĩnh tâm, học cách lắng nghe.", safety: "Bình an vô sự nếu biết nhẫn nhịn và bao dung. Tránh tranh chấp." }, advice: { positive: ["Kiên nhẫn chờ thời", "Khiêm tốn học hỏi"], caution: ["Tránh thụ động quá mức"] } },
    3: { overview: "Gian nan khởi đầu. Mọi việc mới bắt đầu đều khó khăn nhưng có tiềm năng.", aspects: { career: "Khởi đầu khó khăn nhưng có cơ hội nếu kiên trì.", finance: "Tài chính eo hẹp ban đầu, cần tiết kiệm.", love: "Tình cảm mới manh nha, cần thời gian.", spirit: "Thử thách tâm lý, cần kiên nhẫn.", safety: "Đi lại cẩn trọng, dễ gặp trở ngại nhỏ. Kiên nhẫn sẽ qua." }, advice: { positive: ["Kiên trì vượt khó", "Tìm người hỗ trợ"], caution: ["Không nản chí", "Từng bước một"] } },
    4: { overview: "Mờ mịt, cần sự dẫn dắt. Nên tìm người thầy hoặc cố vấn.", aspects: { career: "Cần học hỏi thêm, tìm người hướng dẫn.", finance: "Chưa rõ ràng, nên thận trọng.", love: "Non nớt trong tình cảm, cần trưởng thành.", spirit: "Thời điểm học tập và trau dồi.", safety: "Hạn chế đi xa nơi lạ lẫm. Cần người dẫn đường chỉ lối." }, advice: { positive: ["Khiêm tốn học hỏi", "Tìm thầy giỏi"], caution: ["Không tự mãn", "Chấp nhận mình chưa biết"] } },
    5: { overview: "Chờ đợi đúng thời. Kiên nhẫn là chìa khóa thành công.", aspects: { career: "Chưa phải lúc hành động, chờ đợi cơ hội.", finance: "Giữ nguyên, không đầu tư vội.", love: "Kiên nhẫn trong tình cảm.", spirit: "Tĩnh tâm, chuẩn bị cho tương lai.", safety: "Tránh nôn nóng. Ở yên một chỗ tốt hơn là di chuyển mạo hiểm." }, advice: { positive: ["Kiên nhẫn chờ thời", "Chuẩn bị sẵn sàng"], caution: ["Không nóng vội"] } },
    6: { overview: "Tranh chấp, bất đồng. Nên tránh xung đột trực tiếp.", aspects: { career: "Có mâu thuẫn với đồng nghiệp hoặc sếp.", finance: "Cẩn thận tranh chấp tài sản.", love: "Bất đồng quan điểm, cần đối thoại.", spirit: "Căng thẳng, cần bình tĩnh.", safety: "Đề phòng khẩu thiệt, thị phi. Tránh nơi đông người hỗn loạn." }, advice: { positive: ["Hòa giải", "Tìm người phân xử công bằng"], caution: ["Tránh kiện tụng", "Không để ego chi phối"] } },
    7: { overview: "Quần chúng, kỷ luật. Cần tổ chức và lãnh đạo đúng đắn.", aspects: { career: "Quản lý nhóm, cần kỷ luật.", finance: "Tài chính có quy củ sẽ ổn định.", love: "Cần trách nhiệm trong quan hệ.", spirit: "Rèn luyện ý chí và kỷ luật bản thân.", safety: "Giữ kỷ luật bản thân sẽ tránh được tai họa. Không làm việc tùy hứng." }, advice: { positive: ["Lãnh đạo công bằng", "Tổ chức tốt"], caution: ["Không lạm quyền"] } },
    8: { overview: "Thân mật, hợp tác. Thời điểm tốt để kết nối và liên minh.", aspects: { career: "Hợp tác làm ăn thuận lợi.", finance: "Có người hỗ trợ tài chính.", love: "Gắn kết sâu sắc hơn.", spirit: "Được bạn bè ủng hộ.", safety: "Được quý nhân phù trợ, tai qua nạn khỏi nhờ bạn bè giúp đỡ." }, advice: { positive: ["Mở rộng quan hệ", "Tin tưởng đối tác"], caution: ["Chọn đối tác đúng"] } },
    9: { overview: "Tiểu tích lũy. Thu gom từng chút, thành công nhỏ.", aspects: { career: "Tiến triển từ từ, không đột phá.", finance: "Tích lũy dần dần.", love: "Xây dựng tình cảm từng bước.", spirit: "Kiên nhẫn với quá trình.", safety: "Cẩn thận sương gió, bệnh vặt. Tích tiểu thành đại, đừng coi thường lỗi nhỏ." }, advice: { positive: ["Tích tiểu thành đại"], caution: ["Không kỳ vọng quá lớn"] } },
    10: { overview: "Đạp trên lưng cọp, cần cẩn trọng nhưng sẽ an toàn.", aspects: { career: "Đối mặt người có quyền lực, cần khéo léo.", finance: "Thận trọng trong giao dịch lớn.", love: "Cần tinh tế trong ứng xử.", spirit: "Cảnh giác nhưng không sợ hãi.", safety: "Như đi trên băng mỏng, cẩn trọng từng bước thì bình an vô sự." }, advice: { positive: ["Khéo léo ứng xử", "Giữ lễ nghi"], caution: ["Không liều lĩnh"] } },
    11: { overview: "Đại cát, trời đất giao hòa. Vạn sự hanh thông.", aspects: { career: "Thăng tiến rõ ràng, mọi nỗ lực có kết quả.", finance: "Tài lộc dồi dào, đầu tư sinh lời.", love: "Hạnh phúc viên mãn.", spirit: "Lạc quan, sức khỏe tốt.", safety: "Vạn sự như ý, đi lại bình an. Sức khỏe dồi dào." }, advice: { positive: ["Tận dụng cơ hội", "Mở rộng"], caution: ["Đừng chủ quan"] } },
    12: { overview: "Bế tắc, trời đất không giao hòa. Thời kỳ khó khăn.", aspects: { career: "Gặp trở ngại, đề phòng tiểu nhân.", finance: "Eo hẹp, hạn chế chi tiêu.", love: "Khó khăn trong giao tiếp.", spirit: "U ám, dễ chán nản.", safety: "Đề phòng tiểu nhân hãm hại. Không nên tin người lạ." }, advice: { positive: ["Kiên nhẫn", "Tích đức"], caution: ["Không nóng vội", "Tránh tiểu nhân"] } },
    13: { overview: "Đoàn kết với người. Hợp tác mang lại thành công.", aspects: { career: "Làm việc nhóm hiệu quả.", finance: "Hợp tác kinh doanh thuận lợi.", love: "Hòa hợp với mọi người.", spirit: "Năng lượng từ cộng đồng.", safety: "Đi cùng đoàn đội sẽ an toàn hơn đi một mình. Tránh tách lẻ." }, advice: { positive: ["Xây dựng đội nhóm", "Đoàn kết"], caution: ["Tránh phe cánh"] } },
    14: { overview: "Sở hữu lớn, giàu có và sung túc.", aspects: { career: "Thành công lớn trong sự nghiệp.", finance: "Tài lộc dồi dào.", love: "Hạnh phúc viên mãn.", spirit: "Mãn nguyện.", safety: "Phúc tinh chiếu mệnh, tai ách tiêu tan. Mọi sự cát tường." }, advice: { positive: ["Tận hưởng thành quả", "Chia sẻ"], caution: ["Không tham lam"] } },
    15: { overview: "Khiêm tốn mang lại may mắn. Nhún nhường được tôn trọng.", aspects: { career: "Khiêm tốn được đề bạt.", finance: "Tích lũy âm thầm.", love: "Được yêu quý vì khiêm tốn.", spirit: "Bình an nội tâm.", safety: "Giữ mình khiêm cung, tránh được tai vạ do ghen ghét đố kỵ." }, advice: { positive: ["Giữ khiêm tốn"], caution: ["Không tự hạ thấp quá mức"] } },
    16: { overview: "Vui vẻ, chuẩn bị. Thời điểm hào hứng và lạc quan.", aspects: { career: "Chuẩn bị dự án lớn.", finance: "Có kế hoạch tốt.", love: "Vui vẻ trong tình cảm.", spirit: "Năng lượng tích cực.", safety: " tinh thần thoải mái giúp đẩy lùi bệnh tật. Chuẩn bị kỹ càng thì đi đâu cũng an." }, advice: { positive: ["Lên kế hoạch", "Hào hứng"], caution: ["Không chủ quan"] } },
    17: { overview: "Đi theo, tùy tùng. Linh hoạt thích nghi.", aspects: { career: "Theo sự dẫn dắt của người giỏi.", finance: "Đi theo xu hướng.", love: "Chiều theo đối phương.", spirit: "Mềm dẻo.", safety: "Tùy cơ ứng biến sẽ tránh được rủi ro. Đừng cố chấp đi ngược dòng." }, advice: { positive: ["Linh hoạt"], caution: ["Không đánh mất bản thân"] } },
    18: { overview: "Sửa chữa cái hư nát. Cần cải cách.", aspects: { career: "Sửa chữa sai lầm cũ.", finance: "Giải quyết nợ nần.", love: "Hàn gắn quan hệ.", spirit: "Thanh lọc tâm hồn.", safety: "Cẩn thận bệnh cũ tái phát hoặc rắc rối từ quá khứ quay lại." }, advice: { positive: ["Sửa sai", "Đổi mới"], caution: ["Không né tránh"] } },
    19: { overview: "Đến gần, lớn mạnh. Thời kỳ tăng trưởng.", aspects: { career: "Mở rộng quy mô.", finance: "Đầu tư tăng trưởng.", love: "Tiến xa hơn trong quan hệ.", spirit: "Phát triển bản thân.", safety: "Sức khỏe dồi dào, nhưng đừng chủ quan làm việc quá sức." }, advice: { positive: ["Mở rộng", "Phát triển"], caution: ["Không quá vội"] } },
    20: { overview: "Quan sát, chiêm nghiệm. Thời điểm xem xét và suy ngẫm.", aspects: { career: "Đánh giá tình hình.", finance: "Xem xét đầu tư.", love: "Nhìn nhận quan hệ.", spirit: "Thiền định.", safety: "Quan sát kỹ trước khi hành động sẽ tránh được tai nạn bất ngờ." }, advice: { positive: ["Quan sát kỹ"], caution: ["Không hành động vội"] } },
    21: { overview: "Cắn vỡ, xét xử. Làm rõ sự việc.", aspects: { career: "Giải quyết vấn đề tồn đọng.", finance: "Đòi nợ, thu hồi.", love: "Làm rõ hiểu lầm.", spirit: "Quyết đoán.", safety: "Cẩn thận vấn đề ăn uống, răng miệng hoặc tranh chấp pháp lý." }, advice: { positive: ["Giải quyết dứt điểm"], caution: ["Công bằng"] } },
    22: { overview: "Trang trí, văn vẻ. Chú trọng hình thức.", aspects: { career: "Chăm chút hình ảnh.", finance: "Chi cho vẻ bề ngoài.", love: "Chú ý đến ngoại hình.", spirit: "Thẩm mỹ.", safety: "Đừng để vẻ ngoài hào nhoáng đánh lừa. Cẩn thận bị lừa gạt." }, advice: { positive: ["Làm đẹp"], caution: ["Không chỉ lo bề ngoài"] } },
    23: { overview: "Bóc mòn, suy tàn. Thời kỳ khó khăn.", aspects: { career: "Công việc suy giảm.", finance: "Thua lỗ, hao hụt.", love: "Rạn nứt.", spirit: "Mệt mỏi.", safety: "Sức khỏe suy giảm, đề phòng bệnh tật âm ỉ bên trong." }, advice: { positive: ["Chờ đợi", "Bảo toàn"], caution: ["Không chống cự"] } },
    24: { overview: "Trở lại, phục hồi. Vận may quay lại.", aspects: { career: "Cơ hội mới.", finance: "Phục hồi tài chính.", love: "Tái hợp.", spirit: "Hồi phục năng lượng.", safety: "Sức khỏe dần hồi phục. Tai qua nạn khỏi, vận may đang tới." }, advice: { positive: ["Bắt đầu lại"], caution: ["Học từ quá khứ"] } },
    25: { overview: "Không xằng bậy, chân thật. Thuận theo tự nhiên.", aspects: { career: "Làm đúng đắn sẽ thành.", finance: "Không tham sẽ an toàn.", love: "Chân thành.", spirit: "Thuần khiết.", safety: "Sống ngay thẳng thì quỷ thần cũng kính nể. Bình an vô sự." }, advice: { positive: ["Ngay thẳng"], caution: ["Tránh tham vọng sai"] } },
    26: { overview: "Đại tích lũy. Nuôi dưỡng sức mạnh lớn.", aspects: { career: "Tích lũy kinh nghiệm.", finance: "Dự trữ lớn.", love: "Xây dựng nền tảng.", spirit: "Nuôi dưỡng năng lượng.", safety: "Ở nhà tích lũy năng lượng, hạn chế đi xa hay mạo hiểm." }, advice: { positive: ["Tích lũy"], caution: ["Đừng hoang phí"] } },
    27: { overview: "Nuôi dưỡng, cẩn trọng khẩu nghiệp.", aspects: { career: "Cẩn thận lời nói.", finance: "Tiết kiệm.", love: "Chăm sóc lẫn nhau.", spirit: "Ăn uống lành mạnh.", safety: "Bệnh từ miệng vào, họa từ miệng ra. Cẩn thận ăn uống và lời nói." }, advice: { positive: ["Cẩn trọng lời nói"], caution: ["Không nói xấu"] } },
    28: { overview: "Quá tải, cần cân bằng.", aspects: { career: "Áp lực quá lớn.", finance: "Nợ quá nhiều.", love: "Căng thẳng.", spirit: "Kiệt sức.", safety: "Đừng gánh vác quá sức kẻo gãy đổ. Cẩn thận sập cấu trúc, đồ nặng." }, advice: { positive: ["Giảm tải", "Cân bằng"], caution: ["Không gánh thêm"] } },
    29: { overview: "Hiểm trở, nước chồng nước. Khó khăn liên tiếp.", aspects: { career: "Nhiều thử thách.", finance: "Không ổn định.", love: "Sóng gió.", spirit: "Áp lực.", safety: "Đại hung nếu đi đường thủy. Cẩn thận sông nước, hố sâu." }, advice: { positive: ["Bình tĩnh vượt khó"], caution: ["Không liều lĩnh"] } },
    30: { overview: "Sáng sủa, văn minh. Trí tuệ tỏa sáng.", aspects: { career: "Được công nhận.", finance: "Thu nhập ổn định.", love: "Ấm áp.", spirit: "Sáng suốt.", safety: "Cẩn thận hỏa hoạn, cháy nổ hoặc nóng trong người. Giữ tâm trí sáng suốt." }, advice: { positive: ["Tỏa sáng"], caution: ["Không kiêu ngạo"] } },
    31: { overview: "Cảm ứng, rung động. Tình cảm phát sinh.", aspects: { career: "Kết nối tốt.", finance: "Hợp tác thuận lợi.", love: "Tình yêu nảy nở.", spirit: "Nhạy cảm.", safety: "Cảm giác mách bảo điều gì hãy nghe theo. Trực giác giúp tránh rủi ro." }, advice: { positive: ["Mở lòng"], caution: ["Không nông nổi"] } },
    32: { overview: "Bền vững, lâu dài. Kiên trì sẽ thành.", aspects: { career: "Ổn định lâu dài.", finance: "Đầu tư dài hạn.", love: "Hôn nhân bền vững.", spirit: "Kiên định.", safety: "Cuộc sống bình ổn, ít biến động lớn. Duy trì thói quen tốt để khỏe mạnh." }, advice: { positive: ["Kiên trì"], caution: ["Không thay đổi liên tục"] } },
    33: { overview: "Lui về, ẩn dật. Thời điểm rút lui chiến lược.", aspects: { career: "Nên lui một bước.", finance: "Giữ gìn tài sản.", love: "Cần không gian.", spirit: "Tĩnh lặng.", safety: "Tránh voi chẳng xấu mặt nào. Gặp biến cố hãy tạm lánh mặt." }, advice: { positive: ["Biết lùi"], caution: ["Không cố chấp"] } },
    34: { overview: "Lớn mạnh, thịnh vượng.", aspects: { career: "Sức mạnh dồi dào.", finance: "Tài lộc hanh thông.", love: "Tràn đầy năng lượng.", spirit: "Tự tin.", safety: "Sức khỏe dồi dào như trâu mộng. Nhưng đừng ỷ mạnh mà lao vào nguy hiểm." }, advice: { positive: ["Phát huy sức mạnh"], caution: ["Không lạm dụng"] } },
    35: { overview: "Tiến lên, thăng tiến. Mặt trời mọc rực rỡ.", aspects: { career: "Thăng chức.", finance: "Thu nhập tăng.", love: "Rạng rỡ.", spirit: "Phấn chấn.", safety: "Vận đỏ đang lên, tai ương tự lùi. Đi đường gặp may mắn." }, advice: { positive: ["Tiến lên"], caution: ["Khiêm tốn"] } },
    36: { overview: "Tổn thương, giấu sáng. Thời kỳ khó khăn.", aspects: { career: "Bị kìm hãm.", finance: "Thua lỗ.", love: "Đau khổ.", spirit: "U ám.", safety: "Dễ bị thương tích hoặc tai nạn bất ngờ. Nên ẩn nhẫn chờ thời." }, advice: { positive: ["Giữ vững bên trong"], caution: ["Không lộ bài"] } },
    37: { overview: "Gia đạo, người nhà. Gia đình hài hòa.", aspects: { career: "Làm việc tại nhà thuận lợi.", finance: "Tài chính gia đình ổn.", love: "Hạnh phúc gia đình.", spirit: "Ấm áp.", safety: "Trong nhà an toàn nhất. Đi xa không bằng về nhà." }, advice: { positive: ["Chăm lo gia đình"], caution: ["Không bỏ bê"] } },
    38: { overview: "Đối lập, chia lìa. Mâu thuẫn cần giải quyết.", aspects: { career: "Bất đồng quan điểm.", finance: "Chia tách.", love: "Hiểu lầm.", spirit: "Cô đơn.", safety: "Tránh đi ngược chiều, xung đột giao thông hoặc cãi vã dẫn đến xô xát." }, advice: { positive: ["Tìm điểm chung"], caution: ["Không cố chấp"] } },
    39: { overview: "Gian nan, khó khăn. Cần dừng lại và suy nghĩ.", aspects: { career: "Gặp trở ngại.", finance: "Khó khăn.", love: "Cản trở.", spirit: "Mệt mỏi.", safety: "Phía trước có chướng ngại vật. Dừng lại quan sát kẻo vấp ngã." }, advice: { positive: ["Dừng lại xem xét"], caution: ["Không ép buộc"] } },
    40: { overview: "Giải quyết, cởi bỏ. Khó khăn tan đi.", aspects: { career: "Vấn đề được giải quyết.", finance: "Nợ được thanh toán.", love: "Hiểu lầm được giải tỏa.", spirit: "Nhẹ nhõm.", safety: "Bệnh tật thuyên giảm, tai ương qua đi. Mọi sự nhẹ nhàng." }, advice: { positive: ["Giải quyết nhanh"], caution: ["Không trì hoãn"] } },
    41: { overview: "Tổn thất, hy sinh. Bớt đi để thêm vào.", aspects: { career: "Cắt giảm.", finance: "Chi tiêu tiết kiệm.", love: "Hy sinh vì đối phương.", spirit: "Giản dị.", safety: "Của đi thay người. Chấp nhận mất mát nhỏ để tránh tai họa lớn." }, advice: { positive: ["Chấp nhận tổn thất"], caution: ["Không tiếc nuối"] } },
    42: { overview: "Tăng ích, lợi lộc. Trên dưới đồng lòng.", aspects: { career: "Phát triển thuận lợi.", finance: "Tài chính tăng trưởng.", love: "Gắn bó hơn.", spirit: "Lạc quan.", safety: "Được gia tăng phúc khí, sức khỏe cải thiện tốt lên." }, advice: { positive: ["Cho đi để nhận lại"], caution: ["Không tham lam"] } },
    43: { overview: "Quyết liệt, dứt khoát. Loại bỏ cái xấu.", aspects: { career: "Quyết định dứt khoát.", finance: "Cắt lỗ.", love: "Chấm dứt quan hệ độc hại.", spirit: "Giải phóng.", safety: "Cần phẫu thuật hoặc cắt bỏ khối u nhọt. Dứt khoát sẽ an toàn." }, advice: { positive: ["Quyết đoán"], caution: ["Không tàn nhẫn"] } },
    44: { overview: "Gặp gỡ bất ngờ. Cần cảnh giác.", aspects: { career: "Cơ hội bất ngờ.", finance: "Tiền từ nguồn lạ.", love: "Gặp người mới.", spirit: "Ngạc nhiên.", safety: "Đề phòng cám dỗ hoặc tai nạn bất ngờ từ người lạ, vật lạ." }, advice: { positive: ["Cởi mở"], caution: ["Cảnh giác"] } },
    45: { overview: "Tụ họp, sum vầy. Đoàn kết mang lại sức mạnh.", aspects: { career: "Họp mặt thành công.", finance: "Huy động vốn.", love: "Gặp gỡ gia đình.", spirit: "Cộng đồng.", safety: "Chỗ đông người an toàn, nơi vắng vẻ nguy hiểm. Nên đi theo nhóm." }, advice: { positive: ["Tập hợp lực lượng"], caution: ["Tránh bè phái"] } },
    46: { overview: "Thăng tiến, mọc lên. Từ dưới tiến lên.", aspects: { career: "Thăng tiến dần dần.", finance: "Tích lũy.", love: "Phát triển.", spirit: "Trưởng thành.", safety: "Leo cao ngã đau. Thăng tiến tốt nhưng cần chú ý an toàn khi ở trên cao." }, advice: { positive: ["Kiên trì thăng tiến"], caution: ["Không nhảy cấp"] } },
    47: { overview: "Khốn đốn, cùng đường. Giai đoạn khó khăn nhất.", aspects: { career: "Bế tắc.", finance: "Cạn kiệt.", love: "Căng thẳng.", spirit: "Mệt mỏi.", safety: "Đại hung. Dễ bị vây hãm, tai nạn hoặc bệnh nặng. Cần bảo trọng tối đa." }, advice: { positive: ["Giữ vững ý chí"], caution: ["Không bỏ cuộc"] } },
    48: { overview: "Giếng nước, nuôi dưỡng. Nguồn sống bền vững.", aspects: { career: "Công việc ổn định.", finance: "Nguồn thu đều đặn.", love: "Nuôi dưỡng tình cảm.", spirit: "Tĩnh tại.", safety: "Bình an. Nên chú trọng nguồn nước và thực phẩm sạch." }, advice: { positive: ["Duy trì nguồn lực"], caution: ["Không để cạn"] } },
    49: { overview: "Thay đổi, cách mạng. Đổi mới triệt để.", aspects: { career: "Thay đổi công việc.", finance: "Đầu tư mới.", love: "Làm mới quan hệ.", spirit: "Đổi mới bản thân.", safety: "Thay đổi môi trường sống hoặc thói quen sẽ tốt cho sức khỏe." }, advice: { positive: ["Dám thay đổi"], caution: ["Đúng thời điểm"] } },
    50: { overview: "Vững chắc, nung nấu. Thành tựu lớn.", aspects: { career: "Công trình lớn.", finance: "Tài sản vững.", love: "Hôn nhân vững chắc.", spirit: "Chín muồi.", safety: "Vững như bàn thạch. Mọi tai ương đều bị hóa giải." }, advice: { positive: ["Xây dựng nền móng"], caution: ["Kiên nhẫn"] } },
    51: { overview: "Sấm sét, chấn động. Thức tỉnh và hành động.", aspects: { career: "Thay đổi đột ngột.", finance: "Biến động.", love: "Sốc về tình cảm.", spirit: "Thức tỉnh.", safety: "Giật mình hoảng hốt nhưng không nguy hiểm tính mạng. Cẩn thận tiếng ồn, sấm sét." }, advice: { positive: ["Sẵn sàng"], caution: ["Không hoảng sợ"] } },
    52: { overview: "Ngưng nghỉ, núi non. Thời điểm dừng lại.", aspects: { career: "Nghỉ ngơi.", finance: "Không giao dịch.", love: "Cần không gian.", spirit: "Thiền định.", safety: "Đứng yên một chỗ là an toàn nhất. Tránh leo trèo cao." }, advice: { positive: ["Dừng lại khi cần"], caution: ["Không trì trệ"] } },
    53: { overview: "Tiến dần, tuần tự. Từng bước vững chắc.", aspects: { career: "Tiến bộ dần dần.", finance: "Tích lũy từ từ.", love: "Phát triển dần.", spirit: "Kiên nhẫn.", safety: "Đi chậm thì chắc, đi nhanh dễ vấp. An toàn nếu tuân thủ quy trình." }, advice: { positive: ["Từng bước một"], caution: ["Không nóng vội"] } },
    54: { overview: "Rối ren, không chính vị. Cẩn thận tai họa.", aspects: { career: "Bất ổn.", finance: "Rủi ro.", love: "Quan hệ phức tạp.", spirit: "Lo lắng.", safety: "Dễ gặp sự cố do đặt sai vị trí hoặc đi nhầm đường. Cần định vị lại." }, advice: { positive: ["Cẩn trọng"], caution: ["Không mạo hiểm"] } },
    55: { overview: "Phong phú, thịnh đại. Đỉnh cao thịnh vượng.", aspects: { career: "Thành công lớn.", finance: "Giàu có.", love: "Viên mãn.", spirit: "Mãn nguyện.", safety: "Quá sung mãn dễ sinh bệnh thực chứng. Cần tiết chế năng lượng." }, advice: { positive: ["Tận hưởng"], caution: ["Chuẩn bị suy thoái"] } },
    56: { overview: "Lữ hành, lang thang. Không ổn định.", aspects: { career: "Công tác xa.", finance: "Chi phí di chuyển.", love: "Xa cách.", spirit: "Cô đơn.", safety: "Đi xa dễ gặp rắc rối nhỏ dọc đường. Cẩn thận hành lý, xe cộ." }, advice: { positive: ["Linh hoạt"], caution: ["Không quá phiêu lưu"] } },
    57: { overview: "Thuận theo, thâm nhập. Gió len lỏi khắp nơi.", aspects: { career: "Thâm nhập thị trường.", finance: "Đầu tư dài hạn.", love: "Hiểu sâu.", spirit: "Thâm trầm.", safety: "Tránh nơi gió to sóng lớn. Phòng bệnh do phong hàn." }, advice: { positive: ["Kiên nhẫn thâm nhập"], caution: ["Không bề nổi"] } },
    58: { overview: "Vui vẻ, đầm hồ. Giao tiếp và niềm vui.", aspects: { career: "Giao tiếp tốt.", finance: "Kinh doanh dịch vụ.", love: "Hạnh phúc.", spirit: "Vui vẻ.", safety: "Vui quá hóa buồn. Cẩn thận bệnh hô hấp hoặc tai nạn sông nước." }, advice: { positive: ["Mở rộng quan hệ"], caution: ["Không quá vui"] } },
    59: { overview: "Tan tác, lan tỏa. Phân tán và mở rộng.", aspects: { career: "Mở rộng.", finance: "Chi tiêu nhiều.", love: "Xa nhau.", spirit: "Giải phóng.", safety: "Thoát khỏi hiểm nguy. Bệnh tật tiêu tan, mọi sự nhẹ nhõm." }, advice: { positive: ["Mở rộng ảnh hưởng"], caution: ["Không phân tán"] } },
    60: { overview: "Tiết chế, chừng mực. Cân bằng là chìa khóa.", aspects: { career: "Làm việc vừa phải.", finance: "Chi tiêu hợp lý.", love: "Cân bằng.", spirit: "Điều độ.", safety: "Biết điểm dừng sẽ an toàn. Không làm quá sức." }, advice: { positive: ["Tiết chế"], caution: ["Không thái quá"] } },
    61: { overview: "Trung thực, tín nghĩa. Niềm tin mang lại thành công.", aspects: { career: "Được tin tưởng.", finance: "Uy tín.", love: "Chung thủy.", spirit: "Bình an.", safety: "Lòng tin giúp vượt qua sợ hãi. Tâm an thì vạn sự an." }, advice: { positive: ["Giữ chữ tín"], caution: ["Không phản bội"] } },
    62: { overview: "Tiểu quá, lỗi nhỏ. Cẩn thận điều nhỏ.", aspects: { career: "Chú ý chi tiết.", finance: "Tiết kiệm nhỏ.", love: "Quan tâm nhỏ.", spirit: "Khiêm tốn.", safety: "Tránh vật nhỏ gây thương tích. Cẩn thận tiểu tiết để tránh tai nạn." }, advice: { positive: ["Cẩn thận từng chi tiết"], caution: ["Không coi thường"] } },
    63: { overview: "Đã xong, hoàn thành. Mọi việc trọn vẹn.", aspects: { career: "Hoàn thành dự án.", finance: "Cân bằng.", love: "Viên mãn.", spirit: "Mãn nguyện.", safety: "Mọi nguy hiểm đã qua. Giữ gìn thành quả để được lâu dài." }, advice: { positive: ["Duy trì"], caution: ["Không chủ quan"] } },
    64: { overview: "Chưa xong, dở dang. Tiếp tục nỗ lực.", aspects: { career: "Còn nhiều việc.", finance: "Chưa ổn định.", love: "Cần cố gắng.", spirit: "Hy vọng.", safety: "Chưa đến đích an toàn. Còn chút rủi ro cuối cùng, cẩn trọng." }, advice: { positive: ["Kiên trì hoàn thành"], caution: ["Không bỏ cuộc"] } }
};

const SHISHEN_ADVICE = {
    'Tỷ Kiên': { topic: 'Bạn bè & Đồng nghiệp', advice: 'Chú ý mối quan hệ bạn bè, đồng nghiệp. Có thể gặp người cùng chí hướng.', action: 'Hợp tác, kết nối.', avoid: 'Cạnh tranh không lành mạnh.' },
    'Kiếp Tài': { topic: 'Tiền bạc & Cạnh tranh', advice: 'Cẩn thận với tiền bạc. Có người cạnh tranh.', action: 'Bảo vệ tài sản.', avoid: 'Cho vay, hùn vốn không rõ ràng.' },
    'Thực Thần': { topic: 'Sáng tạo & Thư giãn', advice: 'Năng lượng sáng tạo dồi dào.', action: 'Phát huy ý tưởng.', avoid: 'Áp lực công việc nặng.' },
    'Thương Quan': { topic: 'Giao tiếp & Thể hiện', advice: 'Muốn thể hiện mạnh mẽ. Cẩn trọng lời nói với cấp trên.', action: 'Sáng tạo, đổi mới.', avoid: 'Nói quá, chỉ trích.' },
    'Thiên Tài': { topic: 'Cơ hội tài chính', advice: 'Có cơ hội kiếm tiền bất ngờ.', action: 'Nắm bắt cơ hội.', avoid: 'Quá thận trọng bỏ lỡ.' },
    'Chính Tài': { topic: 'Thu nhập ổn định', advice: 'Tài chính liên quan đến lương.', action: 'Chăm chỉ làm việc.', avoid: 'Mạo hiểm tài chính.' },
    'Thất Sát': { topic: 'Áp lực & Thử thách', advice: 'Gặp áp lực. Cơ hội rèn luyện.', action: 'Đối mặt thử thách.', avoid: 'Đối đầu trực diện.' },
    'Chính Quan': { topic: 'Danh vọng & Trách nhiệm', advice: 'Liên quan đến công danh, địa vị.', action: 'Giữ hình ảnh tốt.', avoid: 'Vi phạm quy định.' },
    'Thiên Ấn': { topic: 'Học hỏi & Bảo hộ', advice: 'Có quý nhân bảo hộ.', action: 'Học tập, xin lời khuyên.', avoid: 'Cố chấp.' },
    'Chính Ấn': { topic: 'Mẹ & Trí tuệ', advice: 'Liên quan đến mẹ hoặc tri thức.', action: 'Đọc sách, học hỏi.', avoid: 'Suy nghĩ tiêu cực.' }
};

const INTERACTION_ADVICE = {
    'combine': 'Năng lượng hợp hóa, thuận lợi và hài hòa.',
    'clash': 'Xung động, cẩn trọng trong giao tiếp.',
    'produce': 'Sinh ra ngoài, hao tổn nhưng là cống hiến.',
    'produced': 'Được sinh trợ, nhẹ nhàng thuận lợi.',
    'control': 'Thế chủ động, kiểm soát tình huống.',
    'controlled': 'Áp lực từ bên ngoài, cần thích nghi.',
    'same': 'Năng lượng tương đồng, dễ gặp người cùng chí hướng.',
    'neutral': 'Năng lượng trung hòa, tự quyết định xu hướng.'
};

function getFullInterpretation(hexagramId, interaction, periodType = 'daily') {
    const base = INTERPRETATIONS[hexagramId] || { overview: 'Cần chiêm nghiệm thêm.', aspects: { career: 'Cân nhắc kỹ.', finance: 'Cẩn trọng.', love: 'Lắng nghe trái tim.', spirit: 'Giữ bình an.' }, advice: { positive: ['Bình tĩnh'], caution: ['Không vội vàng'] } };
    const shiShenAdvice = SHISHEN_ADVICE[interaction?.activatedShiShen] || { topic: 'Tổng quan', advice: 'Tập trung mục tiêu.', action: 'Hành động cân nhắc.', avoid: 'Vội vàng.' };
    const interactionAdvice = INTERACTION_ADVICE[interaction?.ganInteraction?.relationType] || INTERACTION_ADVICE['neutral'];
    return { ...base, personalized: { shiShen: shiShenAdvice, interactionAdvice, qualityScore: interaction?.qualityScore || 50 }, periodType };
}

/**
 * Generate offline analysis when LLM is unavailable
 * Uses local interpretation data to create a rich markdown response
 */
function generateOfflineAnalysis(hexagramId, hexagramDef, topic, interaction, type, qualityText) {
    const base = INTERPRETATIONS[hexagramId] || INTERPRETATIONS[1];
    const shiShen = SHISHEN_ADVICE[interaction?.activatedShiShen] || SHISHEN_ADVICE['Chính Ấn'];
    const relationAdvice = INTERACTION_ADVICE[interaction?.ganInteraction?.relationType] || INTERACTION_ADVICE['neutral'];

    const periodLabel = type === 'daily' ? 'ngày' : type === 'monthly' ? 'tháng' : 'năm';

    // Map topic to aspect key
    const aspectMap = {
        'Chung': 'career',
        'Công danh': 'career',
        'Tài lộc': 'finance',
        'Tình duyên': 'love',
        'Gia đạo': 'love',
        'Học hành': 'spirit',
        'Sức khỏe': 'safety',
        'Thi cử': 'career',
        'Giao dịch': 'finance',
        'Xuất hành': 'safety'
    };

    const aspectKey = aspectMap[topic] || 'career';
    const aspectAdvice = base.aspects?.[aspectKey] || base.aspects?.career || 'Cân nhắc kỹ càng.';
    const safetyAdvice = base.aspects?.safety || 'Cẩn thận trong mọi việc.';

    return `### 🔮 Luận Giải Quẻ ${hexagramDef.name}

**Tổng quan ${periodLabel} này:**
${base.overview}

---

### 🎯 Về ${topic === 'Chung' ? 'Tổng Quan' : topic}

${aspectAdvice}

${relationAdvice}

---

### 💫 Năng Lượng Thập Thần: ${shiShen.topic}

${shiShen.advice}

**Nên:** ${shiShen.action}
**Tránh:** ${shiShen.avoid}

---

### 🛡️ An Toàn & Sức Khỏe

${safetyAdvice}

---

### ✨ Lời Khuyên

**Điều nên làm:**
${(base.advice?.positive || ['Bình tĩnh']).map(p => `- ${p}`).join('\n')}

**Điều cần tránh:**
${(base.advice?.caution || ['Vội vàng']).map(c => `- ${c}`).join('\n')}

---

*⚡ Đây là bản luận giải ngoại tuyến. Khi kết nối được với Thầy Huyền Cơ, bản luận sẽ chi tiết và cá nhân hóa hơn.*`;
}

module.exports = { INTERPRETATIONS, SHISHEN_ADVICE, INTERACTION_ADVICE, getFullInterpretation, generateOfflineAnalysis };
