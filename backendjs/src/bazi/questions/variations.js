/**
 * Enhanced Variations for Consultant Engine
 * Adds niche phrases for Business, Social, and Misfortune themes
 * Supports Gender and Age-based personalization
 */

const CONSULTANT_VARIATIONS = {
    // Theme-specific deep analysis phrases
    business: {
        partnership_luck: [
            "Hợp tác làm ăn trong giai đoạn này cần sự vững chãi của hành Thổ để tạo nền móng.",
            "Đối tác có can chi xung khắc với Nhật chủ của bản mệnh, cần thận trọng trong các thỏa thuận ngầm.",
            "Cơ chế Tỷ Kiên vượng cho thấy bạn có tiếng nói trọng yếu nhưng cũng dễ gặp sự cạnh tranh công bằng.",
            "Sự xuất hiện của Thiên Tài báo hiệu nguồn lợi từ các kênh đầu tư mạo hiểm cùng cộng sự mẫn tiệp."
        ],
        loyalty: [
            "Kiếp Tài ẩn tàng trong địa chi báo hiệu sự cạnh tranh ngầm từ những người thân cận nhất.",
            "Cung Nô Bộc (theo lý thuyết mở rộng) cho thấy sự tận tụy nếu mệnh chủ biết cách dùng Chính Ấn để thâu phục nhân tâm.",
            "Thập thần Thực Thần sinh Tài là minh chứng cho sự trung thực và phát triển bền vững trong hợp tác."
        ],
        promotion: [
            "Sao Quốc Ấn đang soi chiếu, báo hiệu sự tăng trưởng về uy danh và quyền lực trong tổ chức.",
            "Quan Ấn Tương Sinh là cách cục đại cát, giúp bạn thăng tiến một cách danh chính ngôn thuận."
        ]
    },
    social: {
        gossip: [
            "Thương Quan vượng dễ khiến mệnh chủ gặp thị phi do lời ăn tiếng nói bộc trực, cần lấy Chính Quan để chế ước.",
            "Địa chi hình hại báo hiệu sự đố kỵ từ những mối quan hệ bề nổi, hãy giữ tâm định ý vững.",
            "Hãy lấy Chính Ấn làm gốc để hóa giải các hiểu lầm không đáng có, biến thù thành bạn."
        ],
        noble_support: [
            "Sao Thiên Ất Quý Nhân đang tọa thủ, giúp mệnh chủ kết giao được với những bậc tiền bối đức cao đạo trọng.",
            "Vận trình đang đi vào Tam Hợp cục, mang lại sự ủng hộ tuyệt đối từ bằng hữu và đồng môn."
        ]
    },
    misfortune: {
        legal: [
            "Cẩn thận với các ngôi sao mang tính sát phạt như Kình Dương, dễ vướng vào các rắc rối giấy tờ minh bạch.",
            "Quan Sát hỗn tạp báo hiệu áp lực từ các cơ quan công lực nếu mệnh chủ không giữ mình thanh bạch."
        ],
        accidents: [
            "Lưu niên gặp xung với Thái Tuế, cần hạn chế di chuyển xa vào các tháng Tứ Hành Xung (Dần Thân Tỵ Hợi).",
            "Năng lượng Hỏa vượng quá mức dễ gây ra các sự cố bất ngờ liên quan đến nhiệt năng hoặc tốc độ cao."
        ]
    },

    // Personalization tokens
    age_groups: {
        youth: "Ở tuổi trẻ đầy nhiệt huyết và sức sống, việc thử thách bản thân qua những thăng trầm là tiền đề để tôi luyện bản lĩnh.",
        middle: "Bước vào giai đoạn trung niên, khi các ngôi sao dần đi vào quỹ đạo ổn định, sự cân bằng trong mệnh cục trở nên quan trọng hơn bao giờ hết.",
        senior: "Khi về già, phúc đức tích lũy từ Chính Ấn và lòng nhân ái sẽ là điểm tựa vững chắc nhất cho bản thân và hậu duệ."
    },

    gender_styling: {
        male: {
            tone: "Mạnh mẽ, quyết đoán, mang tính chinh phục và kiến tạo cơ nghiệp.",
            address: "anh",
            perspective: "Nam mệnh thường lấy Tài tinh làm đại diện cho sự nghiệp, của cải và người phối ngẫu."
        },
        female: {
            tone: "Tinh tế, sâu sắc, mang tính nuôi dưỡng và bảo bọc tổ ấm.",
            address: "chị",
            perspective: "Nữ mệnh thường lấy Quan tinh làm bệ đỡ cho danh tiếng, sự nghiệp và người bạn đời."
        }
    }
};

module.exports = { CONSULTANT_VARIATIONS };
