/**
 * Dữ liệu Vận Trình (Fortune Phases)
 * Tham chiếu từ Python backend.
 */

const TIEN_VAN_VUONG = [
    "Tuổi trẻ rực rỡ, tài năng sớm phát lộ. Nền tảng được xây dựng vững chắc từ gia đình.",
    "Tiền vận hanh thông, học hành đỗ đạt cao. Có quý nhân dìu dắt từ thuở nhỏ.",
    "Giai đoạn thanh xuân đầy hứa hẹn, sự nghiệp khởi sắc sớm hơn đồng trang lứa.",
    "Tuổi trẻ vượt trội, nhưng cần tránh kiêu ngạo để giữ vững phúc lộc dài lâu.",
    "Tiền vận phúc lộc dồi dào, cha mẹ hỗ trợ chi tiết cho con đường phát triển.",
    "Thời niên thiếu được nuông chiều, học hành suôn sẻ, bạn bè nhiều.",
    "Tuổi 20 đã có thành tựu đáng kể, được xã hội công nhận sớm.",
    "Tiền vận như hoa nở sớm, rực rỡ và thu hút ánh nhìn.",
    "Giai đoạn này có nhiều cơ hội, biết nắm bắt sẽ thăng tiến nhanh.",
    "Gia đình tạo điều kiện tốt, bản thân biết phấn đấu nên sớm thành công.",
    "Tuổi trẻ tài cao, được nhiều người quý mến và giúp đỡ.",
    "Tiền vận như dòng sông xuôi, mọi việc thuận buồm xuôi gió.",
    "Học hành sáng dạ, thi cử đỗ cao, nền móng vững chắc cho tương lai.",
    "Giai đoạn thanh xuân được trời ưu ái, phúc lộc dồi dào.",
    "Tuổi trẻ không lo nghĩ, được gia đình bảo bọc chu đáo.",
];

const TIEN_VAN_NHUOC = [
    "Tuổi trẻ trải qua nhiều sóng gió, gia đình không ổn định. Tuy nhiên, đây là bài học quý giá.",
    "Tiền vận vất vả, phải tự lập sớm. Nhờ vậy mà bản lĩnh được tôi luyện.",
    "Giai đoạn thanh xuân lận đận, học hành dang dở. Nhưng đừng nản, hậu vận sẽ tốt hơn.",
    "Tuổi trẻ thiếu thốn, nhưng chính hoàn cảnh khó khăn giúp trưởng thành nhanh chóng.",
    "Tiền vận có nhiều chướng ngại, cha mẹ không thể hỗ trợ nhiều. Phải tự thân vận động.",
    "Thời niên thiếu thiếu sự quan tâm, nhưng điều này rèn ý chí kiên cường.",
    "Tuổi 20 còn đang bươn chải, chưa tìm được hướng đi rõ ràng.",
    "Tiền vận như đường xuyên rừng, nhiều gai góc nhưng cũng giúp mạnh mẽ hơn.",
    "Giai đoạn này cần kiên nhẫn, mọi khó khăn sẽ là bài học cho sau này.",
    "Gia đình có biến cố, phải sớm gánh vác trách nhiệm lớn.",
    "Tuổi trẻ lao đao, nhưng đây là thử thách tôi rèn tâm tính.",
    "Tiền vận như con sông ngược dòng, phải nỗ lực gấp đôi người khác.",
    "Học hành gián đoạn, sự nghiệp khởi đầu muộn. Nhưng chậm mà chắc.",
    "Giai đoạn thanh xuân không được hưởng phúc từ cha mẹ.",
    "Tuổi trẻ phải tự lực, không có ai nâng đỡ. Điều này tạo nên bản lĩnh.",
];

const TRUNG_VAN_VUONG = [
    "Trung vận thăng hoa, sự nghiệp đạt đỉnh cao. Giai đoạn thu hoạch thành quả.",
    "Tuổi 30-50 là thời kỳ rực rỡ nhất, tài lộc dồi dào, gia đình hạnh phúc.",
    "Giai đoạn này mọi nỗ lực đều được đền đáp, danh tiếng vang xa.",
    "Trung vận như mặt trời giữa trưa, tỏa sáng và ấm áp.",
    "Sự nghiệp phát triển mạnh mẽ, có nhiều cơ hội thăng tiến.",
    "Tuổi trung niên viên mãn, vợ chồng hòa thuận, con cái hiếu thảo.",
    "Giai đoạn 40 tuổi là đỉnh cao của sự nghiệp và quyền lực.",
    "Trung vận được trời đất ủng hộ, quý nhân xuất hiện đúng lúc.",
    "Tài lộc hanh thông, có thể tích lũy được tài sản đáng kể.",
    "Tuổi 35-45 là giai đoạn vàng, mọi việc đều thuận lợi.",
    "Sự nghiệp vững chắc, gia đình êm ấm, xã hội tôn trọng.",
    "Trung vận như cây đại thụ, tỏa bóng mát cho người xung quanh.",
    "Giai đoạn này là lúc gặt hái những gì đã gieo trồng.",
    "Quyền lực và địa vị được củng cố, danh tiếng lẫy lừng.",
    "Tuổi trung niên sống trong sung túc, không phải lo lắng vật chất.",
];

const TRUNG_VAN_NHUOC = [
    "Trung vận gặp nhiều thử thách, sự nghiệp có lúc lên lúc xuống.",
    "Tuổi 30-50 cần đặc biệt cẩn thận, có thể gặp sóng gió bất ngờ.",
    "Giai đoạn này đòi hỏi sự kiên nhẫn và bản lĩnh để vượt qua.",
    "Trung vận như đường đèo quanh co, cần tập trung và cẩn trọng.",
    "Sự nghiệp có thể gặp trở ngại, cần linh hoạt thích ứng.",
    "Tuổi trung niên có biến động, gia đình cần được chú ý.",
    "Giai đoạn 40 tuổi có thể gặp khủng hoảng, cần bình tĩnh đối phó.",
    "Trung vận không được trời ưu ái, phải tự thân vận động nhiều hơn.",
    "Tài lộc không ổn định, cần quản lý chi tiêu cẩn thận.",
    "Tuổi 35-45 có nhiều biến cố, sức khỏe cần được quan tâm.",
    "Sự nghiệp chững lại, cần thay đổi hướng đi để phát triển.",
    "Trung vận như con thuyền gặp sóng, cần có tay lái vững.",
    "Giai đoạn này là lúc thử thách lòng kiên nhẫn và ý chí.",
    "Quyền lực có thể bị lung lay, cần củng cố các mối quan hệ.",
    "Tuổi trung niên phải đối mặt với nhiều áp lực từ gia đình và xã hội.",
];

const HAU_VAN_VUONG = [
    "Hậu vận an nhàn, được hưởng phúc từ con cái. Cuộc sống thanh thản, viên mãn.",
    "Tuổi già được kính trọng, con cháu đề huề, không còn lo lắng vật chất.",
    "Giai đoạn cuối đời hạnh phúc, được xã hội tôn vinh vì những đóng góp.",
    "Hậu vận như hoàng hôn rực rỡ, đẹp đẽ và bình yên.",
    "Cuộc sống về già êm đềm, được vợ/chồng và con cháu yêu thương.",
    "Tuổi 60+ là lúc hưởng thụ thành quả cả đời, sức khỏe tốt.",
    "Giai đoạn này được nghỉ ngơi, du lịch, tận hưởng cuộc sống.",
    "Hậu vận có quý nhân, được bạn bè cũ trân trọng.",
    "Tài sản để lại cho con cháu, họ tộc, được ghi nhớ công lao.",
    "Tuổi già không cô đơn, luôn có người thân bên cạnh.",
    "Sức khỏe duy trì tốt, tinh thần lạc quan, sống thọ.",
    "Hậu vận như dòng sông nhẹ trôi ra biển, thanh thản và bình an.",
    "Giai đoạn cuối đời được sum vầy với con cháu.",
    "Những năm tháng cuối cùng là những năm đẹp nhất.",
    "Tuổi già không thiếu thốn, được xã hội tôn kính.",
];

const HAU_VAN_NHUOC = [
    "Hậu vận cần tích cực chăm sóc sức khỏe và các mối quan hệ để được an nhàn.",
    "Tuổi già có thể có đơn, cần xây dựng mạng lưới hỗ trợ từ bây giờ.",
    "Giai đoạn cuối đời cần chú ý tài chính, tránh tiêu xài quá đà.",
    "Hậu vận như mùa thu muộn, cần chuẩn bị cho mùa đông.",
    "Cuộc sống về già có thể cô đơn, con cháu ở xa.",
    "Tuổi 60+ cần đặc biệt chú ý sức khỏe, tránh lao lực.",
    "Giai đoạn này cần sự hỗ trợ từ gia đình và bạn bè.",
    "Hậu vận phải tự mình lo liệu, không được con cháu phụng dưỡng.",
    "Tài sản có thể hao hụt, cần tiết kiệm từ sớm.",
    "Tuổi già sức khỏe yếu, cần chế độ dinh dưỡng phù hợp.",
    "Sức khỏe cần được ưu tiên, tránh stress và lo lắng.",
    "Hậu vận như con đường cuối, cần đi chậm và cẩn thận.",
    "Giai đoạn cuối đời cần sự bình an nội tâm.",
    "Những năm tháng cuối có thể vất vả, cần chuẩn bị tinh thần.",
    "Tuổi già thiếu người quan tâm, cần chủ động kết giao.",
];

const FORTUNE_BY_ELEMENT = {
    'Mộc': {
        'tien_van': [
            "Mộc khí tuổi trẻ như cây non, cần được tưới tắm và chăm sóc.",
            "Tiền vận Mộc cần môi trường thuận lợi để phát triển.",
            "Tuổi trẻ Mộc đầy tiềm năng, như hạt giống chờ nảy mầm.",
        ],
        'trung_van': [
            "Trung vận Mộc như cây đang đâm chồi nảy lộc, phát triển mạnh mẽ.",
            "Giai đoạn 30-50 Mộc tỏa sáng, sự nghiệp phát triển như cây lớn.",
            "Mộc khí trung vận cần được nuôi dưỡng bằng Thủy và Hỏa.",
        ],
        'hau_van': [
            "Hậu vận Mộc như cổ thụ, vững chãi và được kính trọng.",
            "Tuổi già Mộc được hưởng bóng mát từ con cháu.",
            "Mộc khí hậu vận cần tĩnh dưỡng, tránh nóng nảy.",
        ],
    },
    'Hỏa': {
        'tien_van': [
            "Hỏa khí tuổi trẻ như ngọn lửa mới nhóm, cần được che chở.",
            "Tiền vận Hỏa nhiệt tình nhưng cần kiểm soát.",
            "Tuổi trẻ Hỏa rực rỡ nhưng dễ cháy hết sức sớm.",
        ],
        'trung_van': [
            "Trung vận Hỏa như mặt trời giữa trưa, tỏa sáng rực rỡ.",
            "Giai đoạn 30-50 Hỏa đạt đỉnh cao, cần tránh táo.",
            "Hỏa khí trung vận cần Thủy điều hòa.",
        ],
        'hau_van': [
            "Hậu vận Hỏa như hoàng hôn đẹp, ấm áp và bình yên.",
            "Tuổi già Hỏa cần giữ ấm, tránh lạnh.",
            "Hỏa khí hậu vận cần nghỉ ngơi, tĩnh dưỡng.",
        ],
    },
    'Thổ': {
        'tien_van': [
            "Thổ khí tuổi trẻ như đất mới, cần được cày xới.",
            "Tiền vận Thổ ổn định nhưng chậm phát triển.",
            "Tuổi trẻ Thổ vững vàng, xây dựng nền móng chắc chắn.",
        ],
        'trung_van': [
            "Trung vận Thổ như ruộng đồng màu mỡ, thu hoạch dồi dào.",
            "Giai đoạn 30-50 Thổ ổn định, tích lũy tài sản.",
            "Thổ khí trung vận cần Mộc sơ thông.",
        ],
        'hau_van': [
            "Hậu vận Thổ như núi cao, được kính trọng.",
            "Tuổi già Thổ an nhàn, con cháu đề huề.",
            "Thổ khí hậu vận cần vận động, tránh ù lì.",
        ],
    },
    'Kim': {
        'tien_van': [
            "Kim khí tuổi trẻ như kim loại thô, cần được rèn luyện.",
            "Tiền vận Kim sắc bén nhưng dễ bị tổn thương.",
            "Tuổi trẻ Kim quyết đoán, đôi khi quá cứng nhắc.",
        ],
        'trung_van': [
            "Trung vận Kim như kiếm báu, sắc bén và uy lực.",
            "Giai đoạn 30-50 Kim đạt thành tựu, được tôn trọng.",
            "Kim khí trung vận cần Hỏa rèn luyện.",
        ],
        'hau_van': [
            "Hậu vận Kim như ngọc quý, được trân trọng.",
            "Tuổi già Kim thanh cao, được kính nể.",
            "Kim khí hậu vận cần Thổ dưỡng.",
        ],
    },
    'Thủy': {
        'tien_van': [
            "Thủy khí tuổi trẻ như suối nguồn, trong lành và tươi mát.",
            "Tiền vận Thủy linh hoạt nhưng cần định hướng.",
            "Tuổi trẻ Thủy thông minh, biết thích nghi.",
        ],
        'trung_van': [
            "Trung vận Thủy như dòng sông lớn, chảy xiết và mạnh mẽ.",
            "Giai đoạn 30-50 Thủy phát triển, lan tỏa ảnh hưởng.",
            "Thủy khí trung vận cần Thổ ngăn đê.",
        ],
        'hau_van': [
            "Hậu vận Thủy như biển lớn, sâu sắc và bao dung.",
            "Tuổi già Thủy trí tuệ, được kính trọng.",
            "Thủy khí hậu vận cần Kim sinh.",
        ],
    },
};

const FORTUNE_BY_GENDER = {
    'male': {
        'tien_van_vuong': [
            "Nam giới tiền vận vượng, sớm có thành tựu, được gia đình tự hào.",
            "Tuổi trẻ là nam nhi hào kiệt, sớm nổi tiếng.",
            "Người đàn ông tiền vận tốt, sự nghiệp khởi sắc sớm.",
        ],
        'trung_van_vuong': [
            "Nam giới trung vận thăng hoa, quyền lực và danh vọng.",
            "Người đàn ông 40 tuổi là đỉnh cao của sự nghiệp.",
            "Nam nhân trung vận được vợ con tin tưởng, xã hội tôn trọng.",
        ],
        'hau_van_vuong': [
            "Nam giới hậu vận an nhàn, được con cháu phụng dưỡng.",
            "Tuổi già người đàn ông được tôn kính như cây đại thụ.",
            "Nam nhân hậu vận có phúc, sống thọ và khỏe mạnh.",
        ],
    },
    'female': {
        'tien_van_vuong': [
            "Nữ giới tiền vận vượng, xinh đẹp và tài năng, được nhiều người ngưỡng mộ.",
            "Tuổi trẻ là thiếu nữ tài sắc vẹn toàn, tình duyên thuận lợi.",
            "Người phụ nữ tiền vận tốt, được cha mẹ yêu thương.",
        ],
        'trung_van_vuong': [
            "Nữ giới trung vận hạnh phúc, gia đình êm ấm, sự nghiệp phát triển.",
            "Người phụ nữ 40 tuổi là lúc viên mãn nhất.",
            "Nữ nhân trung vận được chồng con yêu thương, xã hội tôn trọng.",
        ],
        'hau_van_vuong': [
            "Nữ giới hậu vận được con cháu phụng dưỡng, sống an nhàn.",
            "Tuổi già người phụ nữ được kính trọng như mẹ hiền.",
            "Nữ nhân hậu vận có phúc, cháu đàn đàn đống.",
        ],
    },
};

module.exports = {
    TIEN_VAN_VUONG,
    TIEN_VAN_NHUOC,
    TRUNG_VAN_VUONG,
    TRUNG_VAN_NHUOC,
    HAU_VAN_VUONG,
    HAU_VAN_NHUOC,
    FORTUNE_BY_ELEMENT,
    FORTUNE_BY_GENDER
};
