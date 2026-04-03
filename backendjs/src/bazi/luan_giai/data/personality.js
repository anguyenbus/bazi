/**
 * Personality Variations - Hàng ngàn biến thể về tính cách
 */

const PERSONALITY_BY_ELEMENT = {
    'Mộc': {
        'general': [
            "Người Mộc có tính sáng tạo, biết phát triển ý tưởng mới.",
            "Mộc khí mang đến sự nhân ái and lòng từ bi.",
            "Người mang hành Mộc thường linh hoạt, dễ thích nghi.",
            "Tính cách Mộc thiên về sự phát triển and mở rộng.",
            "Người Mộc có xu hướng bảo vệ người yếu thế.",
        ],
        'strengths': [
            "Sáng tạo and có nhiều ý tưởng mới mẻ.",
            "Biết cách phát triển and mở rộng sự nghiệp.",
            "Có lòng nhân ái, biết quan tâm người khác.",
            "Linh hoạt, dễ thích nghi with môi trường mới.",
            "Kiên trì theo đuổi mục tiêu dài hạn.",
        ],
        'weaknesses': [
            "Đôi khi quá lý tưởng, thiếu thực tế.",
            "Có thể do dự, khó đưa ra quyết định.",
            "Hay ghen tị khi thấy người khác thành công.",
            "Có thể bừng nộ khi bị dồn vào góc.",
            "Đôi khi quá mềm mỏng, thiếu quyết đoán.",
        ],
    },
    'Hỏa': {
        'general': [
            "Người Hỏa có năng lượng cao, nhiệt tình trong mọi việc.",
            "Hỏa khí mang đến sự tự tin and cuốn hút.",
            "Người mang hành Hỏa thường lạc quan, vui vẻ.",
            "Tính cách Hỏa thiên về sự lan tỏa and ảnh hưởng.",
            "Người Hỏa có xu hướng lãnh đạo and dẫn dắt.",
        ],
        'strengths': [
            "Nhiệt tình, năng động, tràn đầy năng lượng.",
            "Tự tin, có sức hút and thu hút người khác.",
            "Có khả năng lãnh đạo and truyền cảm hứng.",
            "Giao tiếp tốt, biết cách thuyết phục.",
            "Quyết đoán, không ngại đưa ra quyết định.",
        ],
        'weaknesses': [
            "Đôi khi nóng nảy, thiếu kiên nhẫn.",
            "Có thể quá tự tin, trở nên kiêu ngạo.",
            "Hay phô trương, thích được chú ý.",
            "Có thể thiếu chiều sâu trong suy nghĩ.",
            "Đôi khi hấp tấp, không suy nghĩ kỹ.",
        ],
    },
    'Thổ': {
        'general': [
            "Người Thổ có tính ổn định, đáng tin cậy trong mọi việc.",
            "Thổ khí mang đến sự vững vàng and chắc chắn.",
            "Người mang hành Thổ thường chín chắn, thực tế.",
            "Tính cách Thổ thiên về sự bảo vệ and che chở.",
            "Người Thổ có xu hướng tích lũy and bảo tồn.",
        ],
        'strengths': [
            "Đáng tin cậy, giữ lời hứa.",
            "Kiên nhẫn, bền bỉ theo đuổi mục tiêu.",
            "Thực tế, có chân đất.",
            "Biết cách quản lý and tổ chức.",
            "Có trách nhiệm cao with công việc.",
        ],
        'weaknesses': [
            "Đôi khi quá chậm chạp, thiếu quyết đoán.",
            "Có thể bảo thủ, không chịu thay đổi.",
            "Hay lo lắng quá mức về mọi việc.",
            "Có thể cố chấp with quan điểm cũ.",
            "Đôi khi thiếu linh hoạt trong suy nghĩ.",
        ],
    },
    'Kim': {
        'general': [
            "Người Kim có tính quyết đoán, sắc bén trong suy nghĩ.",
            "Kim khí mang đến sự công bằng and chính trực.",
            "Người mang hành Kim thường thẳng thắn, trực tiếp.",
            "Tính cách Kim thiên về sự chính xác and hoàn hảo.",
            "Người Kim có xu hướng phân tích and đánh giá.",
        ],
        'strengths': [
            "Quyết đoán, biết đưa ra quyết định nhanh.",
            "Công bằng, không thiên vị ai.",
            "Thẳng thắn, nói thẳng nói thật.",
            "Có khả năng phân tích sắc bén.",
            "Kỷ luật, có nguyên tắc rõ ràng.",
        ],
        'weaknesses': [
            "Đôi khi quá cứng nhắc, không linh hoạt.",
            "Có thể lạnh lùng, thiếu cảm xúc.",
            "Hay phê phán and chỉ trích người khác.",
            "Có thể quá hoàn hảo chủ nghĩa.",
            "Đôi khi thiếu sự đồng cảm.",
        ],
    },
    'Thủy': {
        'general': [
            "Người Thủy có tính linh hoạt, dễ thích ứng with môi trường.",
            "Thủy khí mang đến sự thông minh and sâu sắc.",
            "Người mang hành Thủy thường bí ẩn, khó đoán.",
            "Tính cách Thủy thiên về sự thấu hiểu and đồng cảm.",
            "Người Thủy có xu hướng chảy theo dòng, không đối đầu.",
        ],
        'strengths': [
            "Linh hoạt, dễ thích ứng with mọi tình huống.",
            "Thông minh, học hỏi nhanh.",
            "Có trực giác nhạy bén.",
            "Biết cách giao tiếp and đàm phán.",
            "Có khả năng thấu hiểu người khác.",
        ],
        'weaknesses': [
            "Đôi khi quá linh hoạt, thiếu lập trường.",
            "Có thể hay thay đổi, không ổn định.",
            "Hay đa nghi, thiếu tin tưởng.",
            "Có thể bí ẩn khiến người khác khó hiểu.",
            "Đôi khi thiếu quyết đoán.",
        ],
    },
};

const PERSONALITY_BY_DEITY = {
    'Quan': {
        'positive': [
            "Người có Quan sát mạnh thường được tôn trọng and kính nể.",
            "Quan đại diện cho quyền lực, địa vị and uy tín.",
            "Có Quan tốt giúp thăng tiến trong sự nghiệp.",
            "Người có Quan vượng thường có tính kỷ luật cao.",
        ],
        'negative': [
            "Quan quá vượng có thể gây áp lực and stress.",
            "Quan quá mạnh có thể thiếu tự do cá nhân.",
            "Quan bị khắc có thể mất địa vị and uy tín.",
        ],
    },
    'Sát': {
        'positive': [
            "Người có Sát mạnh thường có tinh thần chiến đấu cao.",
            "Sát đại diện cho sức mạnh, quyền uy and cạnh tranh.",
            "Có Sát tốt giúp vượt qua mọi thử thách.",
            "Người có Sát vượng thường có tham vọng lớn.",
        ],
        'negative': [
            "Sát quá vượng có thể gây xung đột and đối đầu.",
            "Sát quá mạnh có thể thiếu sự mềm mỏng.",
            "Sát bị khắc có thể mất quyền lực.",
        ],
    },
    'Tài+': {
        'positive': [
            "Người có Chính Tài mạnh thường có tài chính ổn định.",
            "Chính Tài đại diện cho thu nhập chính đáng and bền vững.",
            "Có Chính Tài tốt giúp tích lũy của cải.",
            "Người có Chính Tài vượng thường biết quản lý tiền bạc.",
        ],
        'negative': [
            "Chính Tài quá vượng có thể quá chú trọng tiền bạc.",
            "Chính Tài bị khắc có thể mất tiền bạc.",
        ],
    },
    'Tài-': {
        'positive': [
            "Người có Thiên Tài mạnh thường có nhiều nguồn thu.",
            "Thiên Tài đại diện cho tài lộc bất ngờ and đa dạng.",
            "Có Thiên Tài tốt giúp kiếm tiền từ nhiều nguồn.",
            "Thiên Tài giúp nắm bắt cơ hội tài chính.",
        ],
        'negative': [
            "Thiên Tài quá vượng có thể dễ mất tiền như có.",
            "Thiên Tài quá mạnh có thể tham lam.",
        ],
    },
    'Ấn': {
        'positive': [
            "Người có Chính Ấn mạnh thường được yêu thương and bảo bọc.",
            "Chính Ấn đại diện cho sự học hỏi and tri thức.",
            "Có Chính Ấn tốt giúp học hành thành đạt.",
            "Người có Chính Ấn vượng thường có quý nhân phò trợ.",
        ],
        'negative': [
            "Chính Ấn quá vượng có thể quá phụ thuộc người khác.",
            "Chính Ấn bị khắc có thể gặp vấn đề with mẹ.",
        ],
    },
    'Kiêu': {
        'positive': [
            "Người có Thiên Ấn mạnh thường có năng khiếu đặc biệt.",
            "Thiên Ấn đại diện cho sự sáng tạo and độc đáo.",
            "Có Thiên Ấn tốt giúp phát triển tài năng riêng.",
            "Người có Thiên Ấn vượng thường có trực giác nhạy bén.",
        ],
        'negative': [
            "Thiên Ấn quá vượng có thể cô đơn, lẻ loi.",
            "Thiên Ấn bị khắc có thể mất năng khiếu.",
        ],
    },
    'Thực': {
        'positive': [
            "Người có Thực Thần mạnh thường có cuộc sống hưởng thụ.",
            "Thực Thần đại diện cho sự sáng tạo and nghệ thuật.",
            "Có Thực Thần tốt giúp phát triển tài năng.",
            "Người có Thực Thần vượng thường có khiếu ẩm thực.",
        ],
        'negative': [
            "Thực Thần quá vượng có thể lười biếng, hưởng thụ.",
            "Thực Thần bị khắc có thể gặp vấn đề with con cái.",
        ],
    },
    'Thương': {
        'positive': [
            "Người có Thương Quan mạnh thường có tài năng nổi bật.",
            "Thương Quan đại diện cho sự thể hiện and biểu đạt.",
            "Có Thương Quan tốt giúp nổi tiếng and thành danh.",
            "Người có Thương Quan vượng thường có khả năng diễn đạt.",
        ],
        'negative': [
            "Thương Quan quá vượng có thể gây thị phi.",
            "Thương Quan bị khắc có thể mất danh tiếng.",
        ],
    },
    'Tỷ': {
        'positive': [
            "Người có Tỷ Kiên mạnh thường có sự hỗ trợ từ bạn bè.",
            "Tỷ Kiên đại diện cho anh em, bạn bè and đồng nghiệp.",
            "Có Tỷ Kiên tốt giúp hợp tác and cộng tác.",
            "Người có Tỉ Kiên vượng thường có tinh thần tự lập.",
        ],
        'negative': [
            "Tỷ Kiên quá vượng có thể gây cạnh tranh with anh em.",
            "Tỷ Kiên bị khắc có thể mất bạn bè.",
        ],
    },
    'Kiếp': {
        'positive': [
            "Người có Kiếp Tài mạnh thường có sức mạnh and bản lĩnh.",
            "Kiếp Tài đại diện cho sự cạnh tranh and tranh đấu.",
            "Có Kiếp Tài tốt giúp vượt qua đối thủ.",
            "Người có Kiếp Tài vượng thường không sợ khó khăn.",
        ],
        'negative': [
            "Kiếp Tài quá vượng có thể hao tài tốn của.",
            "Kiếp Tài bị khắc có thể bị đối thủ vượt mặt.",
        ],
    },
};

module.exports = {
    PERSONALITY_BY_ELEMENT,
    PERSONALITY_BY_DEITY
};
