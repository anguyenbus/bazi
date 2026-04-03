/**
 * Mega Love Interpretations - Chi tiết luận giải Tình Cảm
 * Phân biệt Nam/Nữ, 10 biến thể mỗi trường hợp
 */

const LOVE_MALE = {
    'Chính Tài': {
        good: [
            { status: 'Hạnh phúc viên mãn', desc: 'Chính Tài đại diện vợ/bạn gái chính duyên của nam. Thời gian này tình cảm ngọt ngào, dễ có hỷ sự. Nếu độc thân, dễ gặp người phù hợp để lập gia đình.' },
            { status: 'Duyên lành đến', desc: 'Có thể gặp được người phụ nữ tốt, hiền lành, biết lo toan. Nếu đang yêu, quan hệ tiến triển tích cực. Có thể tiến đến hôn nhân.' },
            { status: 'Vợ chồng hòa thuận', desc: 'Nếu đã có gia đình, vợ chồng hài hòa, ít cãi vã. Cùng nhau xây dựng tổ ấm vững chắc. Hạnh phúc gia đình tăng.' },
            { status: 'Được chăm sóc', desc: 'Người ấy quan tâm, chăm lo cho bạn chu đáo. Cảm nhận được tình yêu thương qua hành động. Đáp lại bằng sự trân trọng.' },
            { status: 'Ổn định về đích', desc: 'Nếu đang hẹn hò lâu, đây là lúc có thể định hôn, kết hôn. Timing thuận lợi cho những quyết định lớn về tình cảm.' },
            { status: 'Tài sắc vẹn toàn', desc: 'Người yêu/vợ vừa xinh đẹp vừa giỏi giang. Lucky in love. Trân trọng điều này.' },
            { status: 'Gia đình đồng ý', desc: 'Nếu cần sự chấp thuận từ gia đình hai bên, thời điểm này thuận lợi. Families approve. Go ahead.' },
            { status: 'Romantic moments', desc: 'Nhiều khoảnh khắc lãng mạn. Date nights, surprises, sweet words. Love is in the air.' },
            { status: 'Trust deepens', desc: 'Niềm tin trong quan hệ được củng cố. Hiểu nhau hơn, ít nghi ngờ. Solid foundation.' },
            { status: 'Future planning', desc: 'Cùng bàn bạc về tương lai: nhà cửa, con cái, retirement. Aligned vision. Building together.' }
        ],
        bad: [
            { status: 'Áp lực từ nửa kia', desc: 'Chính Tài bị khắc, quan hệ có chút căng thẳng. Vợ/bạn gái có thể đòi hỏi nhiều hơn. Cần lắng nghe và điều chỉnh.' },
            { status: 'Thiếu quan tâm', desc: 'Bạn hoặc nửa kia đang busy, không dành đủ thời gian cho nhau. Distance growing. Make time.' },
            { status: 'Tranh cãi về tiền', desc: 'Mâu thuẫn liên quan đến tài chính ảnh hưởng tình cảm. Money fights. Discuss openly.' },
            { status: 'Bất đồng quan điểm', desc: 'Khác biệt về quan điểm sống gây friction. Different values. Find common ground.' },
            { status: 'Routine nhàm chán', desc: 'Quan hệ trở nên routine, thiếu lửa. Spark dimming. Create surprises.' },
            { status: 'Gia đình can thiệp', desc: 'Gia đình hai bên gây áp lực hoặc can thiệp vào quan hệ. Boundaries needed. United front.' },
            { status: 'Nghi ngờ', desc: 'Có chút nghi ngờ trong quan hệ. Trust issues. Communicate directly.' },
            { status: 'Kỳ vọng không met', desc: 'Một trong hai bên cảm thấy kỳ vọng không được đáp ứng. Unmet expectations. Adjust or discuss.' },
            { status: 'Work-life imbalance', desc: 'Công việc chiếm hết thời gian, neglect relationship. Prioritize. Balance needed.' },
            { status: 'Health affects love', desc: 'Vấn đề sức khỏe của một trong hai ảnh hưởng đến quan hệ. Support each other. Be patient.' }
        ]
    },
    'Thiên Tài': {
        good: [
            { status: 'Đào hoa nở rộ', desc: 'Thiên Tài mang duyên mới bất ngờ. Dễ gặp nhiều người mới, có sức hút lớn. Nếu độc thân, enjoy the attention.' },
            { status: 'Exciting connections', desc: 'Các mối quan hệ mới thú vị, đầy bất ngờ. Adventure in romance. Try new things.' },
            { status: 'Charisma tăng', desc: 'Sức hấp dẫn tự nhiên tăng cao. Người khác bị thu hút bởi bạn dễ dàng. Confidence is sexy.' },
            { status: 'Fun dating', desc: 'Thời gian dating vui vẻ, không áp lực. Light-hearted romance. Enjoy the moment.' },
            { status: 'Social popularity', desc: 'Được nhiều người quan tâm, nhắn tin, hẹn hò. Popular choice. Options available.' },
            { status: 'Physical attraction', desc: 'Sức hút về thể chất mạnh mẽ. Chemistry intense. Sparks flying.' },
            { status: 'Unexpected romance', desc: 'Tình yêu đến từ nơi không ngờ: trip, event, online. Surprise love. Be open.' },
            { status: 'Freedom in love', desc: 'Feeling free trong tình cảm, không bị ràng buộc quá mức. Healthy independence. Space is good.' },
            { status: 'Variety is spice', desc: 'Nếu độc thân, có thể dating nhiều người để tìm hiểu. Explore options. No rush to commit.' },
            { status: 'Passion ignites', desc: 'Đam mê bùng cháy trong quan hệ. Intense feelings. Live fully.' }
        ],
        bad: [
            { status: 'Phức tạp tình cảm', desc: 'Thiên Tài gặp hung, quan hệ có thể trở nên phức tạp. Có thể có tam giác tình yêu. Clarify intentions.' },
            { status: 'Third party risk', desc: 'Có nguy cơ người thứ ba xuất hiện trong quan hệ. Guards up. Communicate with partner.' },
            { status: 'Không nghiêm túc', desc: 'Người đến với bạn có thể không nghiêm túc. Players around. Vet carefully.' },
            { status: 'Too many options', desc: 'Quá nhiều lựa chọn khiến khó quyết định. Decision fatigue. Trust instinct.' },
            { status: 'Commitment issues', desc: 'Khó cam kết lâu dài. Fear of missing out. Focus on what matters.' },
            { status: 'Unstable emotions', desc: 'Tình cảm không ổn định, lên xuống thất thường. Emotional rollercoaster. Find stability.' },
            { status: 'Short-term flings', desc: 'Các mối quan hệ ngắn hạn không đi đến đâu. Wasted time. Seek meaningful connections.' },
            { status: 'Superficial attraction', desc: 'Bị thu hút bởi bề ngoài mà không phù hợp bên trong. Look deeper. Character matters.' },
            { status: 'Scandals possible', desc: 'Hành vi trong tình cảm có thể gây scandal. Be discreet. Reputation at stake.' },
            { status: 'Financial drain', desc: 'Tình cảm tốn kém nhiều tiền: quà cáp, date. Balance romance and wallet.' }
        ]
    },
    'Kiếp Tài': {
        good: [
            { status: 'Chiến đấu cho tình yêu', desc: 'Kiếp Tài thúc đẩy bạn nỗ lực hơn cho tình cảm. Fight for love. Assertive pursuit.' },
            { status: 'Competition won', desc: 'Nếu có đối thủ tình ái, bạn thắng. Success in love competition. Cherish victory.' },
            { status: 'Protective love', desc: 'Bảo vệ người yêu/vợ khỏi khó khăn. Knight in shining armor. Be her rock.' },
            { status: 'Passionate intensity', desc: 'Tình cảm mãnh liệt, đam mê. Intense feelings. All or nothing love.' },
            { status: 'Bold moves', desc: 'Dám thể hiện tình cảm mạnh mẽ. Confess feelings boldly. No regrets.' },
            { status: 'Rekindled passion', desc: 'Đốt lại lửa trong quan hệ đang nguội. Spice things up. Adventure together.' },
            { status: 'Defender role', desc: 'Bảo vệ người thương khỏi kẻ khác. Protective instinct. She feels safe.' },
            { status: 'Overcome obstacles', desc: 'Vượt qua chướng ngại trong tình cảm bằng quyết tâm. Nothing stops love. Persevere.' },
            { status: 'Clear rivals', desc: 'Loại bỏ những kẻ theo đuổi người yêu. Mark territory. Make intentions clear.' },
            { status: 'Take charge', desc: 'Chủ động dẫn dắt quan hệ theo hướng tốt. Leadership in love. Guide relationship.' }
        ],
        bad: [
            { status: 'Đối thủ tình ái', desc: 'Kiếp Tài khắc Tài, dễ có kẻ thứ ba muốn chen vào. Rivals appear. Protect your relationship.' },
            { status: 'Jealousy issues', desc: 'Ghen tuông quá mức gây hại cho quan hệ. Trust is key. Control jealousy.' },
            { status: 'Aggressive behavior', desc: 'Comportment quá mạnh mẽ pushes partner away. Soften approach. Listen more.' },
            { status: 'Power struggle', desc: 'Tranh giành quyền lực trong quan hệ. Equal partnership. Compromise.' },
            { status: 'Possessiveness', desc: 'Sở hữu quá mức khiến đối phương ngột ngạt. Give space. Trust her.' },
            { status: 'Love or war', desc: 'Quan hệ giống như chiến trường hơn là tình yêu. Toxic dynamics. Re-evaluate.' },
            { status: 'External threats', desc: 'Người ngoài cố tình gây chia rẽ. United front. Ignore stirrers.' },
            { status: 'Comparison trap', desc: 'So sánh partner với người khác. Appreciate what you have. No one is perfect.' },
            { status: 'Emotional violence', desc: 'Dùng lời nói hoặc hành vi gây tổn thương. Never acceptable. Get help if needed.' },
            { status: 'Burn out', desc: 'Quan hệ quá intense dẫn đến kiệt sức. Sustainable pace. Rest together.' }
        ]
    },
    'Chính Quan': {
        good: [
            { status: 'Trách nhiệm', desc: 'Chính Quan giúp bạn responsible hơn trong tình cảm. Commitment strong. Reliable partner.' },
            { status: 'Marriage material', desc: 'Thể hiện phẩm chất phù hợp để kết hôn. Ready for family. Long-term vision.' },
            { status: 'Respected by her', desc: 'Được vợ/bạn gái kính trọng vì tư cách. Earn respect. Character matters.' },
            { status: 'Provider role', desc: 'Đảm bảo vai trò lo liệu cho gia đình. Financial security. She feels safe.' },
            { status: 'In-laws approve', desc: 'Bố mẹ vợ approved bạn. Family acceptance. Important milestone.' },
            { status: 'Structured relationship', desc: 'Quan hệ có cấu trúc rõ ràng: goals, plans, values. Organized love. Efficient together.' },
            { status: 'Loyal partner', desc: 'Thể hiện sự chung thủy mạnh mẽ. Faithful. Trustworthy.' },
            { status: 'Social recognition', desc: 'Quan hệ được xã hội công nhận, tôn trọng. Respectable couple. Public image good.' },
            { status: 'Lead the family', desc: 'Vai trò đầu gia đình được thể hiện tốt. Head of household. Wise decisions.' },
            { status: 'Stable foundation', desc: 'Nền tảng ổn định cho tương lai cùng nhau. Solid ground. Build on this.' }
        ],
        bad: [
            { status: 'Quá nghiêm khắc', desc: 'Chính Quan bị khắc, có thể quá cứng nhắc trong tình cảm. Too serious. Lighten up sometimes.' },
            { status: 'Work over love', desc: 'Công việc chiếm hết thời gian, neglect partner. Balance needed. She needs attention.' },
            { status: 'Authority issues', desc: 'Muốn kiểm soát quá mức trong quan hệ. Partnership not dictatorship. Equal say.' },
            { status: 'Boring predictable', desc: 'Quan hệ trở nên quá predictable, thiếu surprise. Add spontaneity. Fun is needed.' },
            { status: 'Pressure to marry', desc: 'Áp lực kết hôn từ xã hội hoặc gia đình. Make own timeline. Dont rush.' },
            { status: 'Status over love', desc: 'Quan tâm đến địa vị hơn tình cảm thực sự. Real love matters more. Reflect.' },
            { status: 'Distant emotionally', desc: 'Không thể hiện cảm xúc đủ với partner. Open up. Vulnerability is strength.' },
            { status: 'Her career conflict', desc: 'Sự nghiệp của cô ấy conflict với expectations của bạn. Support her dreams. Modern marriage.' },
            { status: 'Public vs private', desc: 'Hình ảnh bên ngoài khác với quan hệ thực sự. Be authentic. Whats real matters.' },
            { status: 'Expectations gap', desc: 'Kỳ vọng về vai trò không khớp với nhau. Discuss expectations. Align visions.' }
        ]
    },
    'Thất Sát': {
        good: [
            { status: 'Mãnh liệt đam mê', desc: 'Thất Sát tạo ra tình yêu intense, passionate. Burning love. Live fully.' },
            { status: 'Strong protector', desc: 'Thể hiện sức mạnh bảo vệ người yêu. Alpha energy. She feels secure.' },
            { status: 'Exciting relationship', desc: 'Quan hệ không bao giờ boring, luôn có drama tốt. Exciting times. Never dull.' },
            { status: 'Transform together', desc: 'Cùng nhau vượt qua thử thách lớn, mạnh mẽ hơn. Stronger through fire. Unbreakable bond.' },
            { status: 'Assertive love', desc: 'Thể hiện tình cảm mạnh mẽ, không rụt rè. Bold declarations. She knows you care.' },
            { status: 'Challenge accepted', desc: 'Xem quan hệ như challenge để conquer. Motivated love. Goal-oriented.' },
            { status: 'Power couple', desc: 'Cùng nhau tạo nên cặp đôi quyền lực. Strong together. Mutual respect.' },
            { status: 'Overcome adversity', desc: 'Vượt qua nghịch cảnh để đến với nhau. Against all odds. True love wins.' },
            { status: 'Respect from action', desc: 'Demonstrate love qua hành động mạnh mẽ. Actions speak. Prove devotion.' },
            { status: 'Decisive moves', desc: 'Ra quyết định quan trọng về tình cảm dứt khoát. No hesitation. Commit fully.' }
        ],
        bad: [
            { status: 'Bạo lực tiềm tàng', desc: 'Thất Sát gặp hung, cẩn thận với sự aggressive trong quan hệ. Control temper. Never violent.' },
            { status: 'Fights escalate', desc: 'Cãi vã dễ leo thang thành xung đột lớn. Cool down first. Discuss calmly later.' },
            { status: 'Power abuse', desc: 'Dùng sức mạnh để control partner. Abuse of power. Unacceptable behavior.' },
            { status: 'Jealousy rage', desc: 'Ghen tuông dẫn đến hành vi dangerous. Seek help. This is serious.' },
            { status: 'Toxic dynamics', desc: 'Quan hệ toxic, on-off liên tục. Not healthy. Consider ending.' },
            { status: 'War not love', desc: 'Cảm giác như đang chiến đấu thay vì yêu thương. Wrong dynamic. Love should nurture.' },
            { status: 'Fear-based', desc: 'Partner sợ bạn thay vì yêu. Fear is not respect. Change approach.' },
            { status: 'Destruction risk', desc: 'Có nguy cơ phá hủy quan hệ hoàn toàn. Point of no return. Act now.' },
            { status: 'External enemies', desc: 'Kẻ thù bên ngoài muốn phá hoại quan hệ. Protect love. Stay united.' },
            { status: 'Burnout', desc: 'Quá nhiều intensity gây kiệt sức cả hai. Rest together. Lower heat sometimes.' }
        ]
    }
};

const LOVE_FEMALE = {
    'Chính Quan': {
        good: [
            { status: 'Duyên lành', desc: 'Chính Quan đại diện chồng/bạn trai chính duyên của nữ. Tình cảm vững chắc, dễ gặp người đàng hoàng, đáng tin cậy nếu độc thân.' },
            { status: 'Hôn nhân thuận lợi', desc: 'Nếu đang yêu, thời điểm thuận lợi để tiến đến hôn nhân. Anh ấy serious about you.' },
            { status: 'Chồng tốt', desc: 'Nếu đã có gia đình, chồng thể hiện trách nhiệm và quan tâm. Happy marriage. Appreciate him.' },
            { status: 'Được bảo vệ', desc: 'Cảm thấy được che chở, an toàn trong tình cảm. Protected. Secure relationship.' },
            { status: 'Gia đình ủng hộ', desc: 'Gia đình cả hai bên ủng hộ, quan hệ được chúc phúc. Blessed union. Family harmony.' },
            { status: 'Stability', desc: 'Quan hệ ổn định, không có drama. Peace in love. Comfortable together.' },
            { status: 'Future together', desc: 'Cùng bàn về tương lai: nhà cửa, con cái, sự nghiệp. Aligned goals. Building life together.' },
            { status: 'Respect mutual', desc: 'Sự tôn trọng hai chiều trong quan hệ. He respects you. You respect him.' },
            { status: 'Provider partner', desc: 'Anh ấy đảm bảo về mặt tài chính, bạn feel secure. Financial security. Stress-free.' },
            { status: 'Role model couple', desc: 'Trở thành cặp đôi được ngưỡng mộ. Inspiring others. Love goals.' }
        ],
        bad: [
            { status: 'Bị kiểm soát', desc: 'Chính Quan bị khắc, có thể cảm thấy bị kiểm soát hoặc áp lực. Controlling behavior. Set boundaries.' },
            { status: 'His work priority', desc: 'Anh ấy ưu tiên công việc hơn quan hệ. Feeling neglected. Communicate needs.' },
            { status: 'Traditional expectations', desc: 'Kỳ vọng về vai trò truyền thống không phù hợp với bạn. Modern woman. Discuss openly.' },
            { status: 'In-law pressure', desc: 'Gia đình chồng gây áp lực. Mother-in-law issues. United front with husband.' },
            { status: 'Boring routine', desc: 'Quan hệ trở nên routine, thiếu romance. Spice needed. Plan date nights.' },
            { status: 'Distant partner', desc: 'Anh ấy distant về mặt cảm xúc. Emotional unavailability. Seek connection.' },
            { status: 'Delayed marriage', desc: 'Hôn nhân bị trì hoãn vì nhiều lý do. Frustrating. Have honest conversation.' },
            { status: 'Competition at work', desc: 'Cả hai bận rộn với công việc, neglect nhau. Work-life balance. Prioritize love.' },
            { status: 'His authority', desc: 'Anh ấy muốn làm chủ mọi quyết định. Equal partnership. Your voice matters.' },
            { status: 'Social expectations', desc: 'Áp lực xã hội về quan hệ gây stress. Live your truth. Ignore judgment.' }
        ]
    },
    'Thất Sát': {
        good: [
            { status: 'Mãnh liệt', desc: 'Thất Sát mang duyên số mãnh liệt. Dễ gặp người quyền lực, có cá tính mạnh. Tình yêu bùng cháy, passionate.' },
            { status: 'Strong man', desc: 'Attract được người đàn ông mạnh mẽ, có ambition. He leads. You support.' },
            { status: 'Exciting love', desc: 'Quan hệ không bao giờ boring, luôn có surprises. Adventure together. Never dull.' },
            { status: 'Transformation', desc: 'Tình yêu giúp bạn transform, mạnh mẽ hơn. Growth through love. Better version.' },
            { status: 'Power couple', desc: 'Cùng nhau tạo nên cặp đôi quyền lực. Ambitious together. Taking over world.' },
            { status: 'Protected fiercely', desc: 'Anh ấy bảo vệ bạn fierce, no one dares mess. Ultimate protection. Safe with him.' },
            { status: 'Deep passion', desc: 'Đam mê sâu sắc trong quan hệ. Intense connection. Physical and emotional.' },
            { status: 'Challenge accepted', desc: 'Cả hai đều competitive, push each other. Better together. Mutual growth.' },
            { status: 'Overcome obstacles', desc: 'Vượt qua chướng ngại cùng nhau, bond stronger. Tested love. Proven true.' },
            { status: 'Decisive relationship', desc: 'Quan hệ rõ ràng, dứt khoát, không mập mờ. Know where you stand. Clear intentions.' }
        ],
        bad: [
            { status: 'Controlling man', desc: 'Thất Sát gặp hung, cẩn thận với người đàn ông muốn control quá mức. Red flags. Trust instincts.' },
            { status: 'Violence risk', desc: 'Nguy cơ bạo lực trong quan hệ. Leave immediately if violent. Your safety first.' },
            { status: 'Toxic relationship', desc: 'Quan hệ toxic, on-off liên tục không healthy. Break cycle. Seek help.' },
            { status: 'His anger', desc: 'Anh ấy có vấn đề về anger management. Not your job to fix. Protect yourself.' },
            { status: 'Power imbalance', desc: 'Quyền lực nghiêng hẳn về một bên. Unhealthy dynamic. Equal partnership needed.' },
            { status: 'Fear not love', desc: 'Cảm thấy sợ anh ấy hơn là yêu. Wrong relationship. Love should be safe.' },
            { status: 'Drama constant', desc: 'Drama liên tục, không moment bình yên. Exhausting. Consider peace over passion.' },
            { status: 'Bad boy trap', desc: 'Bị attract bởi bad boys không phù hợp. Pattern recognition. Break the cycle.' },
            { status: 'His enemies', desc: 'Kẻ thù của anh ấy gây ảnh hưởng đến bạn. Collateral damage. Stay safe.' },
            { status: 'Burnout', desc: 'Intensity quá cao gây kiệt sức cả hai. Sustainable love. Calm moments needed.' }
        ]
    },
    'Thương Quan': {
        good: [
            { status: 'Tự do yêu', desc: 'Thương Quan mang cảm giác tự do trong tình cảm. Express yourself. Authentic love.' },
            { status: 'Creative partner', desc: 'Attract được người creative, interesting. Never boring. Artist vibes.' },
            { status: 'Express love freely', desc: 'Thể hiện tình cảm thoải mái, không gượng ép. Natural expression. He accepts you.' },
            { status: 'Fun relationship', desc: 'Quan hệ vui vẻ, lots of laughter. Joy together. Happy moments.' },
            { status: 'Independence kept', desc: 'Giữ được sự độc lập trong quan hệ. Your own life. Healthy space.' },
            { status: 'Admired', desc: 'Được ngưỡng mộ vì tài năng và cá tính. He admires you. Ego boost.' },
            { status: 'Honest communication', desc: 'Giao tiếp thẳng thắn, không giấu giếm. Say whats on mind. Real talk.' },
            { status: 'Break conventions', desc: 'Quan hệ không theo khuôn mẫu truyền thống. Your rules. Your love story.' },
            { status: 'Intellectual connection', desc: 'Kết nối về mặt trí tuệ mạnh mẽ. Great conversations. Mind meeting.' },
            { status: 'Creative projects', desc: 'Cùng nhau làm các dự án creative. Build together. Work as team.' }
        ],
        bad: [
            { status: 'Khắc phu', desc: 'Thương Quan khắc Quan, quan hệ dễ có mâu thuẫn với chồng/bạn trai. Arguments frequent. Tongue control.' },
            { status: 'Words hurt', desc: 'Lời nói cay nghiệt làm tổn thương anh ấy. Think before speak. Kindness matters.' },
            { status: 'Too independent', desc: 'Quá độc lập khiến partner feel không cần thiết. Balance needed. Include him.' },
            { status: 'Critical attitude', desc: 'Hay chỉ trích anh ấy khiến ảnh hưởng quan hệ. Appreciation instead. See good.' },
            { status: 'Competition with him', desc: 'Cạnh tranh với partner thay vì support. Same team. Not rivals.' },
            { status: 'Marriage delay', desc: 'Thương Quan có thể delay marriage. If you want it, work on it.' },
            { status: 'Ego clashes', desc: 'Cái tôi của cả hai clash. Humble yourselves. Love over ego.' },
            { status: 'Unsuitable men', desc: 'Attract men không phù hợp lâu dài. Pattern check. What do you really want.' },
            { status: 'Reputation risk', desc: 'Hành vi trong tình cảm có thể affect reputation. Discretion. Be wise.' },
            { status: 'Alone threat', desc: 'Nguy cơ ở một mình nếu không điều chỉnh cách approach tình cảm. Reflect and change.' }
        ]
    },
    'Chính Tài': {
        good: [
            { status: 'Relationship stable', desc: 'Chính Tài giúp quan hệ ổn định về mặt vật chất. Material security. Comfortable life.' },
            { status: 'Practical love', desc: 'Tình yêu thực tế, cả hai together vì những lý do concrete. Solid foundation. Real deal.' },
            { status: 'Financial partner', desc: 'Partner hỗ trợ tài chính hoặc cùng build wealth. Money talks. Prosperity together.' },
            { status: 'Provider appreciated', desc: 'Nếu anh ấy là provider, thời gian này đặc biệt successful. Grateful. Acknowledge efforts.' },
            { status: 'Home building', desc: 'Cùng nhau build home, tổ ấm vững chắc. Nest building. Future secure.' },
            { status: 'Gift receiving', desc: 'Nhận được quà từ partner, feel valued. Acts of service. Love language.' },
            { status: 'Luxury moments', desc: 'Được enjoy luxury cùng nhau. Nice things. Quality time.' },
            { status: 'Investment in love', desc: 'Đầu tư vào quan hệ mang lại return. Time well spent. Worth it.' },
            { status: 'Stable partner', desc: 'Partner ổn định, đáng tin cậy về mọi mặt. Rock solid. Depend on him.' },
            { status: 'Value alignment', desc: 'Cùng giá trị về tiền bạc và cuộc sống. Same page. Easy together.' }
        ],
        bad: [
            { status: 'Money over love', desc: 'Chính Tài bị khắc, quan hệ quá focus vào tiền hơn tình. What is love for. Reflect.' },
            { status: 'His financial stress', desc: 'Stress tài chính của anh ấy affect quan hệ. Support him. Weather storm together.' },
            { status: 'Golddigger stereotype', desc: 'Bị judge là vì tiền. Ignore haters. You know truth.' },
            { status: 'Materialistic trap', desc: 'Focus vào vật chất quá mức, forget emotions. Balance. Heart matters too.' },
            { status: 'Provider pressure', desc: 'Áp lực phải provide ảnh hưởng đến anh ấy. Take off pressure. Team effort.' },
            { status: 'Competitive finances', desc: 'Cạnh tranh về tài chính trong quan hệ. Pool resources. Same goal.' },
            { status: 'Debt stress', desc: 'Nợ nần gây stress trong quan hệ. Plan together. Face it as team.' },
            { status: 'Different spending', desc: 'Quan điểm chi tiêu khác biệt gây friction. Discuss budget. Compromise.' },
            { status: 'Score keeping', desc: 'Tracking ai contribute gì gây resentment. Love is not transaction. Give freely.' },
            { status: 'Security vs passion', desc: 'Chọn security nhưng thiếu passion. Can have both. Dont settle.' }
        ]
    },
    'Thiên Tài': {
        good: [
            { status: 'Adventure love', desc: 'Thiên Tài mang tình yêu adventure, unexpected. Exciting times. Go with flow.' },
            { status: 'New connections', desc: 'Nhiều cơ hội gặp người mới nếu độc thân. Dating pool expanded. Explore.' },
            { status: 'Spontaneous romance', desc: 'Romance tự nhiên, không cần plan. Surprise moments. Live in moment.' },
            { status: 'Financial help', desc: 'Partner có thể help về tài chính bất ngờ. Generous giving. Grateful receiving.' },
            { status: 'Fun dating', desc: 'Dating vui vẻ, không pressure. Light-hearted. Enjoy the ride.' },
            { status: 'Travel together', desc: 'Du lịch cùng nhau, memories created. Explore world. Bond deepens.' },
            { status: 'Gifts received', desc: 'Nhận quà bất ngờ từ admirer hoặc partner. Pleasant surprises. Feel special.' },
            { status: 'Open relationship', desc: 'Nếu phù hợp, có thể explore các hình thức quan hệ non-traditional. Your choice. Be honest.' },
            { status: 'Social butterfly', desc: 'Được nhiều người quan tâm, social life active. Popular. Options available.' },
            { status: 'Lucky in love', desc: 'May mắn trong tình yêu, things just work out. Lucky star. Grateful.' }
        ],
        bad: [
            { status: 'Unstable love', desc: 'Thiên Tài gặp hung, quan hệ không ổn định. On-off pattern. Seek stability.' },
            { status: 'Player attract', desc: 'Attract men không serious. See through games. Demand better.' },
            { status: 'Third party', desc: 'Có thể có người thứ ba. Eyes open. Clarify relationship status.' },
            { status: 'Financial user', desc: 'Someone may want to use you for money. Guard assets. Verify intentions.' },
            { status: 'Commitment phobia', desc: 'Partner hoặc bạn có vấn đề về commitment. Face it. Decide what you want.' },
            { status: 'Scandal risk', desc: 'Hành vi có thể gây scandal. Discretion. Privacy matters.' },
            { status: 'Too many options', desc: 'Quá nhiều options khiến khó commit. Focus. Choose wisely.' },
            { status: 'Shallow connection', desc: 'Connections bề mặt, thiếu depth. Seek meaning. Quality over quantity.' },
            { status: 'Gambling with heart', desc: 'Putting heart at risk unnecessarily. Protect yourself. Calculated risks only.' },
            { status: 'Lost in choices', desc: 'Không biết mình muốn gì trong tình cảm. Self-reflection. Know yourself first.' }
        ]
    }
};

function getLoveInterpretation(shishen, isFemale, score = 0) {
    const dataset = isFemale ? LOVE_FEMALE : LOVE_MALE;
    const data = dataset[shishen];
    if (!data) {
        return score >= 0
            ? { status: 'Bình thường', desc: 'Tình cảm không có biến động lớn, quan hệ ổn định.' }
            : { status: 'Cần quan tâm', desc: 'Nên chủ động tạo bất ngờ để hâm nóng tình cảm.' };
    }
    const pool = score >= 0 ? data.good : data.bad;
    return pool[Math.floor(Math.random() * pool.length)];
}

module.exports = { LOVE_MALE, LOVE_FEMALE, getLoveInterpretation };
