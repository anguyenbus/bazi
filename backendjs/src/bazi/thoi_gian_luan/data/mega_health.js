/**
 * Mega Health Interpretations - Chi tiết luận giải Sức Khỏe
 * 10 Thập Thần x 5 biến thể + Xung scenarios = 100+ câu
 */

const HEALTH_INTERPRETATIONS = {
    'Thất Sát': {
        normal: [
            { status: 'Năng lượng cao', desc: 'Thất Sát mang năng lượng mạnh mẽ. Cơ thể có thể chịu được cường độ cao nhưng dễ stress. Tập thể dục để giải phóng năng lượng thừa.' },
            { status: 'Cẩn thận huyết áp', desc: 'Năng lượng Thất Sát ảnh hưởng đến hệ tim mạch. Kiểm tra huyết áp định kỳ. Hạn chế caffeine và rượu.' },
            { status: 'Stress management', desc: 'Dễ căng thẳng, áp lực. Thiền định, yoga, hoặc đi bộ trong thiên nhiên giúp cân bằng. Đừng để stress tích tụ.' },
            { status: 'Đau đầu tiềm ẩn', desc: 'Suy nghĩ quá nhiều gây đau đầu, migraine. Uống đủ nước, giảm screen time. Xoa bóp thái dương.' },
            { status: 'Tai nạn cẩn thận', desc: 'Năng lượng mạnh mẽ khiến dễ bất cẩn. Cẩn thận khi lái xe, vận động mạnh. Đừng liều.' }
        ],
        hasXung: [
            { status: 'Nguy cơ cao', desc: 'Có xung khắc kết hợp Thất Sát - nguy cơ tai nạn hoặc bệnh đột ngột tăng cao. Tránh hoạt động mạo hiểm. Kiểm tra sức khỏe ngay.' },
            { status: 'Cấp cứu tiềm ẩn', desc: 'Cẩn thận các tình huống khẩn cấp về sức khỏe. Có số điện thoại cấp cứu sẵn sàng. Biết vị trí bệnh viện gần nhất.' },
            { status: 'Bạo lực tránh', desc: 'Tránh xa các tình huống có thể dẫn đến bạo lực. Không tham gia cãi vã. Giữ bình tĩnh.' }
        ]
    },
    'Thương Quan': {
        normal: [
            { status: 'Hệ tiêu hóa', desc: 'Thương Quan ảnh hưởng đến hệ tiêu hóa. Chú ý đường ruột, dạ dày. Ăn chậm nhai kỹ, tránh thức ăn cay nóng.' },
            { status: 'Mệt mỏi', desc: 'Năng lượng tiêu hao nhiều qua lời nói, sáng tạo. Dễ suy nhược nếu không nghỉ ngơi đủ. Ngủ đủ 7-8 tiếng.' },
            { status: 'Hệ hô hấp', desc: 'Cẩn thận với các vấn đề về phổi, họng. Tránh hút thuốc, không khí ô nhiễm. Bổ sung Vitamin C.' },
            { status: 'Thanh quản', desc: 'Nói nhiều có thể stress thanh quản. Uống mật ong, trà gừng. Nghỉ giọng khi cần.' },
            { status: 'Emotional eating', desc: 'Dễ ăn uống theo cảm xúc. Mindful eating thay vì stress eating. Nhận biết trigger.' }
        ],
        hasXung: [
            { status: 'Ngộ độc cẩn thận', desc: 'Có xung khắc - cẩn thận với thực phẩm không an toàn. Ngộ độc thức ăn có thể xảy ra. Kiểm tra kỹ nguồn gốc thực phẩm.' },
            { status: 'Phẫu thuật tránh', desc: 'Không phải thời điểm tốt cho phẫu thuật không cấp thiết. Hoãn lại nếu có thể. Tham khảo ý kiến thầy.' },
            { status: 'Tai nạn giao thông', desc: 'Thương Quan xung - cẩn thận khi di chuyển. Đội mũ bảo hiểm, thắt dây an toàn. Tập trung khi lái xe.' }
        ]
    },
    'Kiếp Tài': {
        normal: [
            { status: 'Năng lượng cạn kiệt', desc: 'Kiếp Tài tiêu hao sinh khí. Dễ cảm thấy mệt mỏi hơn bình thường. Nghỉ ngơi đủ, bổ sung vitamin.' },
            { status: 'Tai nạn nhỏ', desc: 'Dễ gặp tai nạn nhỏ như xước xát, va đập. Cẩn thận khi vận động, làm việc tay chân.' },
            { status: 'Hệ miễn dịch', desc: 'Sức đề kháng có thể giảm. Bổ sung dinh dưỡng, tăng cường trái cây rau củ. Ngủ sớm.' },
            { status: 'Lái xe cẩn thận', desc: 'Kiếp Tài ảnh hưởng đến sự tập trung. Cẩn thận khi lái xe. Không sử dụng điện thoại khi lái.' },
            { status: 'Chia sẻ năng lượng', desc: 'Giao tiếp nhiều có thể drain năng lượng. Cần thời gian một mình để recharge. Introvert time.' }
        ],
        hasXung: [
            { status: 'Tai nạn nghiêm trọng', desc: 'Kiếp Tài xung - nguy cơ tai nạn cao hơn bình thường. Tránh các hoạt động nguy hiểm. An toàn first.' },
            { status: 'Tranh chấp gây thương', desc: 'Cẩn thận với các tình huống conflict có thể gây thương tích. Tránh đối đầu. Rời đi nếu cần.' },
            { status: 'Mất máu cẩn thận', desc: 'Kiếp Tài xung liên quan đến máu. Không phải lúc tốt để hiến máu hoặc phẫu thuật lớn.' }
        ]
    },
    'Chính Ấn': {
        normal: [
            { status: 'Bảo hộ sức khỏe', desc: 'Chính Ấn bảo vệ sức khỏe. Có người quan tâm chăm sóc. Thời gian tốt để bồi bổ cơ thể, dưỡng sinh.' },
            { status: 'Đông y hiệu quả', desc: 'Thời điểm tốt để sử dụng các phương pháp Đông y: châm cứu, thuốc bắc, xoa bóp bấm huyệt.' },
            { status: 'Mother energy', desc: 'Năng lượng nuôi dưỡng từ người lớn tuổi. Mẹ hoặc người trên có thể hỗ trợ sức khỏe. Nhận sự quan tâm.' },
            { status: 'Rest and recover', desc: 'Thời gian tốt để nghỉ ngơi, phục hồi sau bệnh. Cơ thể heal naturally. Đừng gấp.' },
            { status: 'Mental health', desc: 'Sức khỏe tinh thần được hỗ trợ. Cảm giác yên tâm, được bảo vệ. Inner peace.' }
        ],
        hasXung: [
            { status: 'Mẹ lo lắng', desc: 'Chính Ấn xung có thể liên quan đến sức khỏe của mẹ hoặc người nuôi dưỡng. Quan tâm đến họ.' },
            { status: 'Thông tin sức khỏe sai', desc: 'Cẩn thận với advice sức khỏe từ nguồn không đáng tin. Verify với bác sĩ chuyên môn.' },
            { status: 'Quá bảo vệ', desc: 'Được chăm sóc quá mức có thể counterproductive. Balance. Self-care too.' }
        ]
    },
    'Thiên Ấn': {
        normal: [
            { status: 'Sức khỏe tâm linh', desc: 'Thiên Ấn ảnh hưởng đến sức khỏe tinh thần. Lo lắng, mất ngủ có thể xảy ra. Thiền định giúp cân bằng.' },
            { status: 'Insomnia', desc: 'Khó ngủ, suy nghĩ quá nhiều về đêm. Tạo routine trước khi ngủ. Không dùng phone trước sleep.' },
            { status: 'Hệ thần kinh', desc: 'Chú ý đến hệ thần kinh. Anxiety, panic có thể xuất hiện. Breathing exercises giúp.' },
            { status: 'Alternative therapy', desc: 'Thời điểm tốt để thử các phương pháp trị liệu thay thế: meditation, aromatherapy, sound healing.' },
            { status: 'Spiritual wellbeing', desc: 'Kết nối với spirituality giúp sức khỏe tổng thể. Soul care. Inner journey.' }
        ],
        hasXung: [
            { status: 'Mental health crisis', desc: 'Thiên Ấn xung có thể trigger mental health issues. Seek professional help nếu cần. Dont struggle alone.' },
            { status: 'Isolation harm', desc: 'Cô lập bản thân quá mức ảnh hưởng sức khỏe. Connect với people. Human touch needed.' },
            { status: 'Overthinking damage', desc: 'Suy nghĩ quá mức gây physical symptoms. Headache, stomach issues. Ground yourself.' }
        ]
    },
    'Thực Thần': {
        normal: [
            { status: 'Sức khỏe tốt', desc: 'Thực Thần mang năng lượng an lành, sức khỏe ổn định. Cơ thể hoạt động hài hòa. Enjoy good health.' },
            { status: 'Ăn uống vui vẻ', desc: 'Thời gian tốt để enjoy ẩm thực. Nhưng cũng dễ tăng cân nếu không kiểm soát. Mindful eating.' },
            { status: 'Tiêu hóa tốt', desc: 'Hệ tiêu hóa hoạt động trơn tru. Có thể thử các món mới. Đa dạng dinh dưỡng.' },
            { status: 'Relaxed body', desc: 'Cơ thể thư giãn, ít tension. Ngủ ngon. Wake up refreshed.' },
            { status: 'Natural healing', desc: 'Cơ thể có khả năng tự chữa lành tốt. Minor illness recover quickly. Trust the body.' }
        ],
        hasXung: [
            { status: 'Overeating risk', desc: 'Thực Thần xung có thể dẫn đến ăn quá nhiều để đối phó với stress. Control portions. Healthy snacks.' },
            { status: 'Food allergy', desc: 'Cẩn thận với các phản ứng dị ứng thực phẩm. Try new food carefully. Know your allergies.' },
            { status: 'Weight fluctuation', desc: 'Cân nặng có thể biến động. Monitor weight. Exercise regularly.' }
        ]
    },
    'Chính Tài': {
        normal: [
            { status: 'Sức khỏe ổn định', desc: 'Chính Tài mang sự ổn định cho sức khỏe. Routine check-up tốt. Maintain healthy habits.' },
            { status: 'Work-life balance', desc: 'Làm việc vừa phải, không quá sức. Balance giữa earn và rest. Sustainable pace.' },
            { status: 'Insurance matters', desc: 'Thời điểm tốt để review bảo hiểm sức khỏe. Make sure coverage adequate. Protect yourself.' },
            { status: 'Practical self-care', desc: 'Chăm sóc bản thân một cách thực tế: gym membership, healthy food, regular sleep.' },
            { status: 'Financial = health', desc: 'Tài chính ổn định giúp giảm stress, tốt cho sức khỏe. Money worries less. Breathe easier.' }
        ],
        hasXung: [
            { status: 'Overwork warning', desc: 'Chính Tài xung - cẩn thận làm việc quá sức vì tiền. Health before wealth. Take breaks.' },
            { status: 'Stress từ tiền', desc: 'Lo lắng về tài chính ảnh hưởng health. Address root cause. Financial planning.' },
            { status: 'Neglect for work', desc: 'Bỏ qua sức khỏe vì busy với công việc. Prioritize self. You cant pour from empty cup.' }
        ]
    },
    'Thiên Tài': {
        normal: [
            { status: 'Energy fluctuates', desc: 'Thiên Tài mang năng lượng không đều. Có lúc hưng phấn, có lúc mệt. Listen to body.' },
            { status: 'Adventure caution', desc: 'Thích adventure nhưng cẩn thận với các hoạt động mạo hiểm. Know your limits.' },
            { status: 'Indulgence control', desc: 'Dễ indulge trong các thú vui không healthy: rượu, party late night. Moderation key.' },
            { status: 'Spontaneous exercise', desc: 'Tập thể dục theo mood hơn là routine. Find fun ways to move. Dance, hike, swim.' },
            { status: 'Health gambling', desc: 'Đừng gamble với sức khỏe. Nếu có symptom, check up. Dont wait.' }
        ],
        hasXung: [
            { status: 'Risky behavior', desc: 'Thiên Tài xung - có thể engage trong hành vi rủi ro cho sức khỏe. Think twice. Worth it?' },
            { status: 'Accident prone', desc: 'Dễ gặp tai nạn bất ngờ. Be extra careful. Awareness up.' },
            { status: 'Substance caution', desc: 'Cẩn thận với việc sử dụng các chất kích thích. Addiction risk. Healthy coping instead.' }
        ]
    },
    'Tỷ Kiên': {
        normal: [
            { status: 'Peer support', desc: 'Tỷ Kiên mang support từ bạn bè cho sức khỏe. Workout buddy, accountability partner. Together stronger.' },
            { status: 'Competition healthy', desc: 'Cạnh tranh lành mạnh trong fitness. Challenge each other. Improve together.' },
            { status: 'Group activities', desc: 'Tham gia các hoạt động nhóm tốt cho sức khỏe: team sports, group fitness, hiking clubs.' },
            { status: 'Shared resources', desc: 'Chia sẻ resources về health với bạn bè. Tips, recipes, gym time. Community wellness.' },
            { status: 'Motivation from peers', desc: 'Bạn bè inspire healthy lifestyle. Good influence. Choose friends wisely.' }
        ],
        hasXung: [
            { status: 'Competition stress', desc: 'Tỷ Kiên xung - cạnh tranh quá mức gây stress cho cơ thể. Not everything is competition. Relax.' },
            { status: 'Comparison harm', desc: 'So sánh body với người khác gây harm. Body image issues. Love your body.' },
            { status: 'Peer pressure unhealthy', desc: 'Áp lực từ bạn bè làm điều không healthy. Say no. Your body your choice.' }
        ]
    },
    'Chính Quan': {
        normal: [
            { status: 'Disciplined health', desc: 'Chính Quan mang kỷ luật cho sức khỏe. Regular check-up, medication on time. Structured wellness.' },
            { status: 'Authority compliance', desc: 'Follow doctors orders. Trust medical professionals. Dont self-diagnose.' },
            { status: 'Work stress', desc: 'Stress từ công việc, trách nhiệm. Decompress after work. Boundaries needed.' },
            { status: 'Posture awareness', desc: 'Chú ý tư thế khi làm việc. Ergonomic setup. Prevent back/neck pain.' },
            { status: 'Regular routine', desc: 'Routine về health tốt: sleep time, meal time, exercise time. Consistency is key.' }
        ],
        hasXung: [
            { status: 'Authority pressure', desc: 'Chính Quan xung - áp lực từ sếp hoặc công việc ảnh hưởng sức khỏe. Set limits. Protect yourself.' },
            { status: 'Over-responsibility', desc: 'Gánh quá nhiều trách nhiệm gây health issues. Delegate. Share load.' },
            { status: 'Burnout warning', desc: 'Nguy cơ burnout cao. Recognize signs early. Take action before too late.' }
        ]
    }
};

// Special scenarios for any xung situation
const XUNG_GENERAL = [
    { status: 'Cảnh báo chung', desc: 'Có xung khắc trong mệnh - cần đặc biệt cẩn thận về sức khỏe. Tránh các hoạt động nguy hiểm. Kiểm tra sức khỏe định kỳ.' },
    { status: 'Tai nạn potential', desc: 'Xung khắc tăng nguy cơ tai nạn. Cẩn thận khi di chuyển, lái xe. Đội mũ bảo hiểm, thắt dây an toàn.' },
    { status: 'Bệnh đột ngột', desc: 'Có thể có bệnh xuất hiện đột ngột. Đừng chủ quan với các triệu chứng. Đi khám ngay khi cần.' },
    { status: 'Surgery avoid', desc: 'Nếu không cấp thiết, không nên phẫu thuật trong thời gian này. Hoãn lại nếu có thể. Consult carefully.' },
    { status: 'Travel caution', desc: 'Cẩn thận khi đi xa. Có thể gặp vấn đề sức khỏe khi travel. Mang theo thuốc cần thiết.' }
];

function getHealthInterpretation(shishen, hasXung = false) {
    const data = HEALTH_INTERPRETATIONS[shishen];

    if (hasXung) {
        // 50% chance to use xung-specific, 50% general xung warning
        if (data && data.hasXung && Math.random() > 0.5) {
            return data.hasXung[Math.floor(Math.random() * data.hasXung.length)];
        }
        return XUNG_GENERAL[Math.floor(Math.random() * XUNG_GENERAL.length)];
    }

    if (!data) {
        return { status: 'Ổn định', desc: 'Sức khỏe bình thường, duy trì lối sống lành mạnh. Uống đủ nước, ngủ đủ giấc, vận động đều đặn.' };
    }

    return data.normal[Math.floor(Math.random() * data.normal.length)];
}

module.exports = { HEALTH_INTERPRETATIONS, XUNG_GENERAL, getHealthInterpretation };
