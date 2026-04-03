/**
 * Dữ liệu Quan Hệ Gia Đình và Tình Cảm
 * Tham chiếu từ Python backend.
 */

const FATHER_RELATIONSHIPS = {
    'positive': [
        "Mối quan hệ với cha tốt đẹp, được cha yêu thương và hướng dẫn.",
        "Cha là hình mẫu và nguồn cảm hứng trong cuộc sống.",
        "Được cha hỗ trợ trong sự nghiệp và tài chính.",
        "Cha có địa vị và ảnh hưởng tốt đến cuộc đời con.",
        "Mối quan hệ cha con hòa thuận, tin tưởng lẫn nhau.",
    ],
    'negative': [
        "Mối quan hệ với cha có thể có khoảng cách, cần nỗ lực kết nối.",
        "Cha có thể vắng mặt hoặc ít gần gũi trong tuổi thơ.",
        "Có những bất đồng quan điểm với cha cần hòa giải.",
        "Cha có thể nghiêm khắc, cần học cách thấu hiểu.",
        "Mối quan hệ cha con cần được nuôi dưỡng và cải thiện.",
    ],
    'balanced': [
        "Mối quan hệ với cha có lúc tốt lúc xấu, như mọi gia đình.",
        "Cần thời gian để hiểu nhau và xây dựng niềm tin.",
        "Cha yêu thương theo cách riêng, cần học cách nhận ra.",
        "Có thể có khác biệt thế hệ nhưng vẫn tôn trọng nhau.",
        "Mối quan hệ phát triển tốt hơn theo thời gian.",
    ],
};

const MOTHER_RELATIONSHIPS = {
    'positive': [
        "Mối quan hệ với mẹ rất gắn bó, được mẹ yêu thương vô điều kiện.",
        "Mẹ là nguồn động viên và hỗ trợ tinh thần lớn nhất.",
        "Được mẹ che chở và bảo bọc từ nhỏ.",
        "Mẹ có phúc ấm, con cái được hưởng.",
        "Mối quan hệ mẹ con là niềm hạnh phúc lớn trong đời.",
    ],
    'negative': [
        "Mối quan hệ với mẹ có thể có khó khăn, cần thấu hiểu.",
        "Mẹ có thể hay lo lắng, cần học cách trấn an.",
        "Có những bất đồng quan điểm với mẹ.",
        "Mẹ có thể bảo bọc quá mức, cần không gian riêng.",
        "Mối quan hệ mẹ con cần sự cân bằng.",
    ],
    'balanced': [
        "Mối quan hệ với mẹ bình thường, có yêu thương và mâu thuẫn.",
        "Cần thời gian để hiểu nhau và xây dựng mối quan hệ.",
        "Mẹ yêu thương theo cách riêng, đôi khi khó nhận ra.",
        "Có thể có khác biệt thế hệ nhưng vẫn tôn trọng nhau.",
        "Mối quan hệ trưởng thành theo thời gian.",
    ],
};

const SPOUSE_RELATIONSHIPS = {
    'male': {
        'early_marriage': [
            "Có duyên kết hôn sớm, gặp được người phù hợp.",
            "Tình duyên đến sớm, hôn nhân thuận lợi.",
            "Có thể gặp ý trung nhân từ thời thanh xuân.",
            "Duyên số đưa đến hạnh phúc từ khi còn trẻ.",
        ],
        'late_marriage': [
            "Duyên vợ chồng đến muộn, cần kiên nhẫn chờ đợi.",
            "Kết hôn muộn nhưng bền vững hơn.",
            "Cần trải nghiệm cuộc sống trước khi lập gia đình.",
            "Duyên số sắp đặt gặp người phù hợp ở tuổi trung niên.",
        ],
        'happy_marriage': [
            "Hôn nhân hạnh phúc, vợ chồng hòa thuận.",
            "Vợ là người đồng hành đắc lực trong cuộc sống.",
            "Gia đình êm ấm, vợ chồng tin tưởng nhau.",
            "Có vợ tốt giúp sự nghiệp phát triển.",
            "Hôn nhân mang lại sự ổn định và hạnh phúc.",
        ],
        'challenging_marriage': [
            "Hôn nhân có thể gặp thử thách, cần nhẫn nại.",
            "Vợ chồng cần học cách giao tiếp và thấu hiểu.",
            "Có thể có sóng gió nhưng vượt qua sẽ bền vững.",
            "Cần tránh xung đột và biết nhường nhịn.",
        ],
    },
    'female': {
        'early_marriage': [
            "Có duyên kết hôn sớm, gặp được người yêu thương.",
            "Tình duyên đến sớm, được gia đình chúc phúc.",
            "Có thể gặp ý trung nhân từ thời trẻ.",
            "Duyên số đưa đến hạnh phúc từ khi còn xuân.",
        ],
        'late_marriage': [
            "Duyên chồng đến muộn, cần kiên nhẫn chờ đợi.",
            "Kết hôn muộn nhưng chọn được người xứng đáng.",
            "Cần phát triển bản thân trước khi lập gia đình.",
            "Duyên số sắp đặt gặp người phù hợp ở tuổi trưởng thành.",
        ],
        'happy_marriage': [
            "Hôn nhân hạnh phúc, được chồng yêu thương.",
            "Chồng là người đàn ông tốt, biết quan tâm.",
            "Gia đình êm ấm, vợ chồng đồng lòng.",
            "Có chồng hỗ trợ để phát triển bản thân.",
            "Hôn nhân mang lại sự an toàn và hạnh phúc.",
        ],
        'challenging_marriage': [
            "Hôn nhân có thể gặp thử thách, cần kiên nhẫn.",
            "Vợ chồng cần học cách thấu hiểu và nhường nhịn.",
            "Có thể có khó khăn nhưng vượt qua sẽ hạnh phúc.",
            "Cần giữ vững niềm tin và tình yêu.",
        ],
    },
};

const CHILDREN_RELATIONSHIPS = {
    'many_children': [
        "Có nhiều con cái, gia đình đông đúc, vui vẻ.",
        "Được trời ban cho nhiều phước tử.",
        "Con cháu đề huề, gia đình xum vầy.",
        "Có phúc có con, các con đều khỏe mạnh.",
    ],
    'few_children': [
        "Có ít con nhưng chất lượng, con thành đạt.",
        "Tập trung nuôi dạy ít con để được tốt nhất.",
        "Con cái ít nhưng hiếu thảo, giỏi giang.",
        "Một hoặc hai con nhưng được chăm sóc chu đáo.",
    ],
    'filial_children': [
        "Con cái hiếu thảo, biết kính trọng cha mẹ.",
        "Được con cái phụng dưỡng khi về già.",
        "Con cái thành công, mang vinh dự cho gia đình.",
        "Nuôi dạy con thành người tốt, có ích cho xã hội.",
    ],
    'challenging_children': [
        "Con cái có thể có cá tính mạnh, cần hướng dẫn.",
        "Cần kiên nhẫn trong việc nuôi dạy con.",
        "Con cái có thể đi con đường riêng.",
        "Mối quan hệ với con cái cần được xây dựng.",
    ],
    'son': [
        "Có duyên với con trai, con trai khỏe mạnh.",
        "Con trai sẽ nối dõi gia đình, thăng tiến.",
        "Con trai có tính cách mạnh mẽ, quyết đoán.",
    ],
    'daughter': [
        "Có duyên với con gái, con gái xinh xắn.",
        "Con gái là người bạn đồng hành của mẹ.",
        "Con gái có tính cách dịu dàng, hiếu thảo.",
    ],
};

const SIBLING_RELATIONSHIPS = {
    'harmonious': [
        "Anh chị em hòa thuận, giúp đỡ lẫn nhau.",
        "Mối quan hệ anh em gắn bó từ nhỏ.",
        "Được anh chị em hỗ trợ trong cuộc sống.",
        "Anh em đồng lòng, gia đình êm ấm.",
    ],
    'competitive': [
        "Anh chị em có thể cạnh tranh, cần hòa giải.",
        "Có thể có xung đột với anh em ruột.",
        "Mối quan hệ anh em cần được nuôi dưỡng.",
    ],
    'distant': [
        "Anh chị em có thể ở xa, ít gặp gỡ.",
        "Mối quan hệ anh em cần được kết nối lại.",
        "Có thể không có anh chị em hoặc ít gần gũi.",
    ],
};

const LOVE_RELATIONSHIPS = {
    'romantic': [
        "Có duyên tình cảm phong phú, được nhiều người yêu mến.",
        "Tình yêu đến một cách lãng mạn và đẹp đẽ.",
        "Có sức hút tự nhiên với người khác giới.",
        "Cuộc sống tình cảm đầy màu sắc.",
    ],
    'stable': [
        "Tình cảm ổn định, không thích phiêu lưu.",
        "Tìm được người bạn đời phù hợp và bền vững.",
        "Cuộc sống tình cảm bình lặng nhưng hạnh phúc.",
        "Trân trọng mối quan hệ lâu dài.",
    ],
    'late_bloomer': [
        "Tình cảm đến muộn nhưng sâu sắc.",
        "Cần thời gian để tìm được người phù hợp.",
        "Không vội vàng trong chuyện tình cảm.",
        "Khi đến sẽ là tình yêu đích thực.",
        "Duyên số sắp đặt gặp người đúng ở thời điểm đúng.",
    ],
};

module.exports = {
    FATHER_RELATIONSHIPS,
    MOTHER_RELATIONSHIPS,
    SPOUSE_RELATIONSHIPS,
    CHILDREN_RELATIONSHIPS,
    SIBLING_RELATIONSHIPS,
    LOVE_RELATIONSHIPS
};
