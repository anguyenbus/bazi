/**
 * Dữ liệu Cách Cục (Patterns) - Thập Thần Cách Cục
 * Tham chiếu từ Python backend.
 */

const THUC_THAN_CACH = {
    'name': ['Thực Thần cách', 'Cách Thực Thần', 'Thực Thần đắc lệnh'],
    'overview': [
        'Thực Thần cách chủ về người hiền lành, có phúc đức, ăn nói ôn hòa, có tài năng thiên bẩm.',
        'Người có Thực Thần cách thường là người vui vẻ, lạc quan, yêu đời.',
        'Thực Thần là cách cục của sự hưởng thụ, phúc lộc thọ toàn.',
        'Đây là cách cục mang lại cuộc sống an nhàn, ít lo âu.',
    ],
    'personality': [
        'Tính cách ôn hòa, không thích tranh đấu.',
        'Có óc thẩm mỹ cao, yêu cái đẹp.',
        'Thích hưởng thụ cuộc sống, biết cách tận hưởng.',
    ],
    'career': [
        'Phù hợp với ngành ẩm thực, nhà hàng, khách sạn.',
        'Thích hợp làm trong lĩnh vực nghệ thuật, giải trí.',
        'Có năng khiếu kinh doanh các mặt hàng tiêu dùng.',
    ],
    'wealth': [
        'Tài lộc đến một cách tự nhiên, không cần quá vất vả.',
        'Có phúc ăn lộc, được người khác đãi ngộ.',
    ],
    'relationships': [
        'Tình duyên thuận lợi, dễ tìm được bạn đời.',
        'Hôn nhân hòa thuận, gia đình êm ấm.',
    ],
    'success': [
        'Thành công đến tự nhiên, không cần bon chen.',
        'Sự nghiệp ổn định, bền vững.',
    ],
    'failure': [
        'Thực Thần gặp Ấn khắc thì phúc lộc giảm sút.',
        'Nếu Thực Thần quá vượng mà Nhật chủ nhược thì hao tài.',
    ],
};

const THUONG_QUAN_CACH = {
    'name': ['Thương Quan cách', 'Cách Thương Quan', 'Thương Quan đắc lệnh'],
    'overview': [
        'Thương Quan cách chủ về người thông minh, sắc sảo, có tài hoa phát tiết ra ngoài.',
        'Người có Thương Quan cách thường là người đa tài, giỏi giao tiếp.',
        'Thương Quan là ngôi sao của sự nổi tiếng và tài năng.',
    ],
    'personality': [
        'Thông minh lanh lợi, miệng lưỡi giỏi.',
        'Có tư duy sáng tạo, không theo lối mòn.',
    ],
    'career': [
        'Phù hợp với ngành luật, biện hộ, tranh tụng.',
        'Thích hợp làm trong lĩnh vực truyền thông, MC, diễn thuyết.',
    ],
    'wealth': [
        'Tài lộc đến nhờ tài năng và sự nổi tiếng.',
        'Kiếm tiền nhờ miệng lưỡi và trí tuệ.',
    ],
    'relationships': [
        'Tình duyên phức tạp, nhiều mối quan hệ.',
        'Hôn nhân cần nhường nhịn để hạnh phúc.',
    ],
    'success': [
        'Thành công nhờ tài năng và sự nổi bật.',
    ],
    'failure': [
        'Thương Quan ngộ Quan thì hay mắc họa.',
    ],
};

const CHINH_TAI_CACH = {
    'name': ['Chính Tài cách', 'Cách Chính Tài', 'Chính Tài đắc lệnh'],
    'overview': [
        'Chính Tài cách chủ về người có đầu óc kinh doanh, siêng năng làm việc.',
        'Người có Chính Tài cách thường là người chăm chỉ, cần mẫn.',
    ],
    'personality': [
        'Siêng năng, chăm chỉ, không ngại khó.',
        'Có tư duy quản lý tài chính tốt.',
    ],
    'career': [
        'Phù hợp với ngành tài chính, ngân hàng, kế toán.',
        'Thích hợp làm kinh doanh, buôn bán.',
    ],
    'wealth': [
        'Tài lộc đến từ sự cần mẫn và nỗ lực.',
        'Tiền bạc tích lũy dần dần, bền vững.',
    ],
    'relationships': [
        'Tình duyên ổn định, vợ chồng cùng làm ăn.',
    ],
    'success': [
        'Thành công nhờ sự kiên trì và nỗ lực.',
    ],
    'failure': [
        'Chính Tài gặp Kiếp Tài thì hao tài tốn của.',
    ],
};

const THIEN_TAI_CACH = {
    'name': ['Thiên Tài cách', 'Cách Thiên Tài', 'Thiên Tài đắc lệnh'],
    'overview': [
        'Thiên Tài cách chủ về người hào phóng, tài vận may mắn.',
        'Người có Thiên Tài cách thường là người dễ gặp cơ hội bất ngờ.',
    ],
    'personality': [
        'Hào phóng, rộng rãi, không tiếc tiền.',
        'Có óc kinh doanh, biết nắm bắt cơ hội.',
    ],
    'career': [
        'Phù hợp với ngành đầu tư, chứng khoán.',
        'Thích hợp làm kinh doanh đa ngành.',
    ],
    'wealth': [
        'Tài lộc đến nhanh nhưng đi cũng nhanh.',
        'Có khả năng kiếm tiền lớn nhưng cũng tiêu lớn.',
    ],
    'relationships': [
        'Tình duyên phong phú, nhiều mối quan hệ.',
    ],
    'success': [
        'Thành công nhờ may mắn và sự linh hoạt.',
    ],
    'failure': [
        'Thiên Tài gặp Kiếp Tài thì phá sản dễ dàng.',
    ],
};

const CHINH_QUAN_CACH = {
    'name': ['Chính Quan cách', 'Cách Chính Quan', 'Chính Quan đắc lệnh'],
    'overview': [
        'Chính Quan cách chủ về người có tố chất lãnh đạo, trọng danh dự.',
        'Người có Chính Quan cách thường là người chính trực, đáng tin cậy.',
    ],
    'personality': [
        'Chính trực, ngay thẳng, trọng kỷ luật.',
        'Có tinh thần trách nhiệm cao.',
    ],
    'career': [
        'Phù hợp với cơ quan nhà nước, chính phủ.',
        'Thích hợp làm trong ngành tư pháp, công an.',
    ],
    'wealth': [
        'Tài lộc đến từ lương bổng, vị trí công việc.',
        'Ổn định, không quá giàu nhưng đủ đầy.',
    ],
    'relationships': [
        'Tình duyên đứng đắn, hôn nhân ổn định.',
    ],
    'success': [
        'Thành công nhờ sự chính trực và nỗ lực.',
    ],
    'failure': [
        'Chính Quan gặp Thương Quan thì mất chức.',
    ],
};

const THAT_SAT_CACH = {
    'name': ['Thất Sát cách', 'Cách Thất Sát', 'Thất Sát đắc lệnh'],
    'overview': [
        'Thất Sát cách chủ về người quả cảm, quyết đoán, có uy quyền.',
        'Người có Thất Sát cách thường là người có bản lĩnh phi thường.',
    ],
    'personality': [
        'Quả cảm, dũng mãnh, không sợ khó khăn.',
        'Có ý chí kiên cường, không dễ gục ngã.',
    ],
    'career': [
        'Phù hợp với ngành quân đội, công an.',
        'Thích hợp làm trong môi trường cạnh tranh.',
    ],
    'wealth': [
        'Tài lộc đến từ sự chiến đấu và nỗ lực.',
    ],
    'relationships': [
        'Tình duyên muộn, hôn nhân có sóng gió.',
    ],
    'success': [
        'Thành công nhờ sự kiên cường và bản lĩnh.',
    ],
    'failure': [
        'Thất Sát không có chế thì cuộc đời nhiều tai họa.',
    ],
};

const CHINH_AN_CACH = {
    'name': ['Chính Ấn cách', 'Cách Chính Ấn', 'Chính Ấn đắc lệnh'],
    'overview': [
        'Chính Ấn cách chủ về người có học vấn, được quý nhân phù trợ.',
        'Người có Chính Ấn cách thường là người nhân từ, hiền đức.',
    ],
    'personality': [
        'Nhân từ, bao dung, có lòng trắc ẩn.',
        'Yêu thích học hỏi, trau dồi kiến thức.',
    ],
    'career': [
        'Phù hợp với ngành giáo dục, nghiên cứu.',
        'Thích hợp làm trong lĩnh vực văn hóa, nghệ thuật.',
    ],
    'wealth': [
        'Tài lộc đến từ tri thức và sự hỗ trợ.',
    ],
    'relationships': [
        'Tình duyên thuận lợi, được gia đình ủng hộ.',
    ],
    'success': [
        'Thành công nhờ học vấn và quý nhân.',
    ],
    'failure': [
        'Chính Ấn gặp Tài khắc thì mất đi sự che chở.',
    ],
};

const THIEN_AN_CACH = {
    'name': ['Thiên Ấn cách', 'Cách Kiêu', 'Thiên Ấn đắc lệnh'],
    'overview': [
        'Thiên Ấn (Kiêu) cách chủ về người thông minh nhưng cô độc.',
        'Người có Thiên Ấn cách thường là người có tư duy độc lập.',
    ],
    'personality': [
        'Thông minh, sáng tạo, có góc nhìn độc đáo.',
        'Thích sự độc lập, không ưa bị ràng buộc.',
    ],
    'career': [
        'Phù hợp với ngành nghiên cứu, phát minh.',
        'Thích hợp làm trong lĩnh vực nghệ thuật đặc thù.',
    ],
    'wealth': [
        'Tài lộc đến từ trí tuệ và sự khác biệt.',
    ],
    'relationships': [
        'Tình duyên muộn, khó tìm người hiểu mình.',
    ],
    'success': [
        'Thành công nhờ sự khác biệt và đột phá.',
    ],
    'failure': [
        'Thiên Ấn đoạt Thực thì hao tài.',
    ],
};

const KIEN_LOC_CACH = {
    'name': ['Kiến Lộc cách', 'Cách Kiến Lộc', 'Lộc đắc lệnh'],
    'overview': [
        'Kiến Lộc cách chủ về người tự lập, bản lĩnh, có khí phách.',
    ],
    'personality': [
        'Tự lập, không phụ thuộc người khác.',
        'Có tinh thần tự chủ, tự quyết.',
    ],
    'career': [
        'Phù hợp với kinh doanh tự chủ, startup.',
    ],
    'wealth': [
        'Tài lộc đến từ sự nỗ lực bản thân.',
    ],
    'relationships': [
        'Tình duyên cần người biết tôn trọng.',
    ],
    'success': [
        'Thành công nhờ sự kiên trì và bản lĩnh.',
    ],
    'failure': [
        'Kiến Lộc gặp xung thì hao tài.',
    ],
};

const KIEP_TAI_CACH = {
    'name': ['Kiếp Tài cách', 'Cách Kiếp Tài', 'Kiếp đắc lệnh'],
    'overview': [
        'Kiếp Tài cách chủ về người có tính cạnh tranh cao.',
    ],
    'personality': [
        'Mạnh mẽ, thích cạnh tranh.',
        'Gan dạ, dám mạo hiểm.',
    ],
    'career': [
        'Phù hợp với ngành cạnh tranh cao.',
    ],
    'wealth': [
        'Tài lộc đến đi thất thường.',
    ],
    'relationships': [
        'Tình duyên có cạnh tranh.',
    ],
    'success': [
        'Thành công nhờ sự gan dạ và bản lĩnh.',
    ],
    'failure': [
        'Kiếp Tài tranh Tài thì phá sản.',
    ],
};

const PATTERN_DATA = {
    'Thực': THUC_THAN_CACH,
    'Thương': THUONG_QUAN_CACH,
    'Tài+': CHINH_TAI_CACH,
    'Tài-': THIEN_TAI_CACH,
    'Quan': CHINH_QUAN_CACH,
    'Sát': THAT_SAT_CACH,
    'Ấn': CHINH_AN_CACH,
    'Kiêu': THIEN_AN_CACH,
    'Kiến Lộc': KIEN_LOC_CACH,
    'Kiếp': KIEP_TAI_CACH,
    'Tỷ': KIEN_LOC_CACH,
    'Thực Thần': THUC_THAN_CACH,
    'Thương Quan': THUONG_QUAN_CACH,
    'Chính Tài': CHINH_TAI_CACH,
    'Thiên Tài': THIEN_TAI_CACH,
    'Chính Quan': CHINH_QUAN_CACH,
    'Thất Sát': THAT_SAT_CACH,
    'Chính Ấn': CHINH_AN_CACH,
    'Thiên Ấn': THIEN_AN_CACH,
};

module.exports = {
    PATTERN_DATA
};
