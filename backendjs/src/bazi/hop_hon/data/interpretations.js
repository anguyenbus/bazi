/**
 * Compatibility Interpretations Data
 * Detailed interpretations for matching analysis
 */

const COMPATIBILITY_INTERPRETATIONS = {
    // Element relationship interpretations
    element: {
        generate: {
            'Mộc_Hỏa': 'Mộc sinh Hỏa - Tình yêu nồng ấm, người Mộc nuôi dưỡng đam mê của người Hỏa. Mối quan hệ phát triển tự nhiên và bền vững.',
            'Hỏa_Thổ': 'Hỏa sinh Thổ - Sự nhiệt huyết của Hỏa tạo nền tảng vững chắc cho Thổ. Quan hệ ổn định, có chiều sâu.',
            'Thổ_Kim': 'Thổ sinh Kim - Sự chắc chắn của Thổ giúp Kim tỏa sáng. Hỗ trợ nhau trong sự nghiệp và cuộc sống.',
            'Kim_Thủy': 'Kim sinh Thủy - Kim mang đến sự sáng suốt cho Thủy. Quan hệ thông tuệ, hiểu nhau sâu sắc.',
            'Thủy_Mộc': 'Thủy sinh Mộc - Thủy nuôi dưỡng sự phát triển của Mộc. Mối quan hệ đầy sức sống.'
        },
        control: {
            'Mộc_Thổ': 'Mộc khắc Thổ - Người Mộc có xu hướng chi phối. Cần học cách nhường nhịn và tôn trọng.',
            'Thổ_Thủy': 'Thổ khắc Thủy - Sự cứng rắn có thể kìm hãm dòng chảy tình cảm. Cần linh hoạt hơn.',
            'Thủy_Hỏa': 'Thủy khắc Hỏa - Xung đột giữa lý trí và cảm xúc. Cần tìm điểm cân bằng.',
            'Hỏa_Kim': 'Hỏa khắc Kim - Đam mê có thể làm tổn thương sự hoàn hảo. Cần kiểm soát cảm xúc.',
            'Kim_Mộc': 'Kim khắc Mộc - Sự sắc bén có thể cắt đứt sự phát triển. Cần mềm mỏng hơn.'
        },
        same: {
            'Mộc': 'Cùng hành Mộc - Như hai cây cùng vươn lên, cạnh tranh ánh sáng nhưng cũng che chở lẫn nhau.',
            'Hỏa': 'Cùng hành Hỏa - Hai ngọn lửa có thể cháy rực rỡ hoặc thiêu đốt nhau. Cần kiểm soát nhiệt huyết.',
            'Thổ': 'Cùng hành Thổ - Ổn định và đáng tin cậy nhưng có thể thiếu kích thích. Cần tạo sự mới mẻ.',
            'Kim': 'Cùng hành Kim - Cả hai đều kiên định nhưng có thể quá cứng nhắc. Cần linh hoạt.',
            'Thủy': 'Cùng hành Thủy - Dòng chảy hòa quyện nhưng có thể thiếu định hướng. Cần mục tiêu rõ ràng.'
        }
    },

    // Relationship type specific interpretations
    relationshipType: {
        romance: {
            excellent: [
                'Đây là duyên phận trời định, hai người như được tạo ra cho nhau.',
                'Tình cảm sẽ phát triển tự nhiên và bền vững qua thời gian.',
                'Hôn nhân hạnh phúc nếu biết trân trọng và nuôi dưỡng tình yêu.'
            ],
            good: [
                'Hai người có nhiều điểm chung, dễ dàng xây dựng cuộc sống chung.',
                'Tình yêu có tiềm năng phát triển tốt đẹp với sự nỗ lực.',
                'Quan hệ hứa hẹn nhiều điều tốt đẹp trong tương lai.'
            ],
            neutral: [
                'Mối quan hệ cần thời gian để tìm hiểu và thích nghi.',
                'Có những khác biệt nhưng hoàn toàn có thể vượt qua.',
                'Cần kiên nhẫn và thấu hiểu để xây dựng tình cảm bền vững.'
            ],
            challenging: [
                'Sẽ có nhiều thử thách trong mối quan hệ này.',
                'Cần nỗ lực rất lớn từ cả hai phía để duy trì tình cảm.',
                'Nếu vượt qua được, mối quan hệ sẽ càng thêm vững chắc.'
            ]
        },
        friendship: {
            excellent: [
                'Đây là tình bạn tri kỷ, hiếm có trong đời.',
                'Hai người hiểu nhau sâu sắc, có thể chia sẻ mọi điều.',
                'Tình bạn này sẽ bền vững theo thời gian.'
            ],
            good: [
                'Hai người có thể trở thành bạn tốt của nhau.',
                'Dễ dàng tìm được tiếng nói chung trong nhiều vấn đề.',
                'Tình bạn sẽ mang lại niềm vui và hỗ trợ lẫn nhau.'
            ],
            neutral: [
                'Có thể làm bạn nhưng cần thời gian để hiểu nhau.',
                'Một số khác biệt cần được tôn trọng.',
                'Tình bạn có thể phát triển nếu cả hai cùng cố gắng.'
            ],
            challenging: [
                'Khó trở thành bạn thân do nhiều khác biệt.',
                'Có thể giao tiếp nhưng khó chia sẻ sâu.',
                'Cần sự cởi mở và chấp nhận lẫn nhau.'
            ]
        },
        parent_child: {
            excellent: [
                'Mối quan hệ cha mẹ - con cái rất hài hòa.',
                'Sự hiểu biết và yêu thương tự nhiên giữa hai thế hệ.',
                'Con cái sẽ được nuôi dưỡng trong môi trường lành mạnh.'
            ],
            good: [
                'Quan hệ tốt đẹp với sự tôn trọng lẫn nhau.',
                'Cha mẹ và con cái có thể giao tiếp hiệu quả.',
                'Gia đình sẽ là nền tảng vững chắc cho con.'
            ],
            neutral: [
                'Có khoảng cách thế hệ cần được thu hẹp.',
                'Cần nỗ lực để hiểu quan điểm của nhau.',
                'Với sự kiên nhẫn, mối quan hệ sẽ cải thiện.'
            ],
            challenging: [
                'Dễ xảy ra xung đột do khác biệt tư tưởng.',
                'Cần rất nhiều kiên nhẫn và thấu hiểu.',
                'Cha mẹ nên linh hoạt hơn trong cách tiếp cận.'
            ]
        },
        siblings: {
            excellent: [
                'Anh chị em ruột gắn bó, hỗ trợ nhau mọi lúc.',
                'Tình cảm gia đình rất sâu đậm và bền vững.',
                'Sẽ là điểm tựa cho nhau suốt cuộc đời.'
            ],
            good: [
                'Quan hệ anh chị em tốt đẹp, có sự đồng cảm.',
                'Có thể chia sẻ và hỗ trợ nhau khi cần.',
                'Gia đình sẽ luôn là nơi quay về.'
            ],
            neutral: [
                'Có thể có một số mâu thuẫn nhỏ thời thơ ấu.',
                'Lớn lên sẽ hiểu và quý trọng nhau hơn.',
                'Tình anh chị em sẽ bền vững theo thời gian.'
            ],
            challenging: [
                'Có thể có sự cạnh tranh hoặc ghen tị.',
                'Cần học cách tôn trọng và chia sẻ.',
                'Cha mẹ đóng vai trò quan trọng trong việc hàn gắn.'
            ]
        },
        business: {
            excellent: [
                'Đây là cặp đối tác lý tưởng trong kinh doanh.',
                'Bổ sung điểm mạnh của nhau một cách hoàn hảo.',
                'Sự nghiệp hợp tác hứa hẹn nhiều thành công.'
            ],
            good: [
                'Có thể hợp tác kinh doanh hiệu quả.',
                'Mỗi người mang đến giá trị riêng cho sự hợp tác.',
                'Với phân công rõ ràng, sẽ đạt được mục tiêu chung.'
            ],
            neutral: [
                'Cần thảo luận kỹ trước khi hợp tác.',
                'Một số khác biệt về phong cách làm việc.',
                'Có thể thành công nếu có quy chế rõ ràng.'
            ],
            challenging: [
                'Khó tìm được tiếng nói chung trong kinh doanh.',
                'Dễ xảy ra mâu thuẫn về chiến lược.',
                'Nên cân nhắc kỹ trước khi hợp tác chính thức.'
            ]
        }
    },

    // Aspect-specific intepretations
    aspects: {
        romance: {
            high: 'Tình cảm giữa hai người rất mạnh mẽ, có thể phát triển thành tình yêu sâu đậm và bền vững.',
            medium: 'Tình cảm có tiềm năng phát triển tốt nếu cả hai cùng nỗ lực nuôi dưỡng.',
            low: 'Tình cảm cần thời gian và sự kiên nhẫn để phát triển, không nên vội vàng.'
        },
        communication: {
            high: 'Giao tiếp giữa hai người rất thuận lợi, dễ dàng hiểu ý nhau.',
            medium: 'Cần một chút nỗ lực để giao tiếp hiệu quả nhưng hoàn toàn có thể.',
            low: 'Giao tiếp có thể gặp trở ngại, cần học cách lắng nghe và diễn đạt rõ ràng.'
        },
        children: {
            high: 'Cung con cái rất hợp, có khả năng sinh con tốt và nuôi dạy con hiệu quả.',
            medium: 'Chuyện con cái ổn, cần thống nhất phương pháp giáo dục.',
            low: 'Cần chú ý đến việc lên kế hoạch và chuẩn bị cho việc có con.'
        },
        finance: {
            high: 'Hợp tác tài chính rất tốt, có thể cùng nhau tạo dựng sự nghiệp và tài sản.',
            medium: 'Tài chính cần được quản lý rõ ràng để tránh mâu thuẫn.',
            low: 'Nên tách biệt tài chính cá nhân hoặc thảo luận kỹ trước khi chung tay.'
        },
        lifestyle: {
            high: 'Lối sống rất tương đồng, dễ dàng chung sống hài hòa.',
            medium: 'Một số khác biệt về lối sống nhưng có thể điều chỉnh.',
            low: 'Lối sống khác biệt nhiều, cần tôn trọng và chấp nhận lẫn nhau.'
        }
    }
};

module.exports = { COMPATIBILITY_INTERPRETATIONS };
