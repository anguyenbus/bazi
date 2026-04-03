/**
 * Mega Wealth Interpretations - Chi tiết luận giải Tài Lộc
 * 10 Thập Thần x 10 biến thể good + 10 biến thể bad = 200 câu
 */

const WEALTH_INTERPRETATIONS = {
    'Chính Tài': {
        good: [
            { status: 'Tài lộc vượng', desc: 'Chính Tài chiếu mệnh, thu nhập ổn định và tăng dần. Tiền lương đúng hẹn, có thể có thêm bonus hoặc phụ cấp. Tài chính khởi sắc rõ rệt.' },
            { status: 'Tăng lương thành công', desc: 'Thời điểm vàng để đàm phán lương thưởng. Giá trị của bạn được công nhận xứng đáng. Mạnh dạn đề xuất, có khả năng được chấp thuận.' },
            { status: 'Đầu tư an toàn sinh lời', desc: 'Thích hợp để đầu tư vào các kênh an toàn như tiết kiệm lãi cao, trái phiếu, hoặc bất động sản. Tiền đẻ ra tiền một cách ổn định.' },
            { status: 'Thu nhập đa kênh', desc: 'Nguồn thu từ nhiều kênh đều hoạt động tốt. Lương chính và thu nhập phụ đều ổn định. Đa dạng hóa mang lại an toàn.' },
            { status: 'Khách hàng thanh toán tốt', desc: 'Các khoản phải thu được thanh toán đúng hẹn. Dòng tiền ổn định. Quản lý tài chính thuận lợi.' },
            { status: 'Tích lũy thành công', desc: 'Thời gian tốt để tích lũy, tiết kiệm cho tương lai. Mỗi tháng đều có dư để cất giữ. Quỹ dự phòng tăng lên.' },
            { status: 'Chi tiêu hợp lý', desc: 'Biết cách chi tiêu thông minh, có tiền mà không lãng phí. Cân bằng giữa enjoy và save. Financial IQ cao.' },
            { status: 'Tài sản tăng giá', desc: 'Các tài sản đang sở hữu tăng giá trị. Bất động sản, xe cộ được bảo dưỡng tốt. Net worth tăng.' },
            { status: 'Gia đình hỗ trợ', desc: 'Có sự hỗ trợ tài chính từ gia đình khi cần. Hoặc không phải lo chi phí cho người thân. Gia đình ổn định.' },
            { status: 'Quyết định tài chính đúng', desc: 'Những quyết định về tiền trong quá khứ đang phát huy hiệu quả. Nhìn thấy kết quả tích lũy. Financial karma tốt.' }
        ],
        bad: [
            { status: 'Vất vả kiếm tiền', desc: 'Chính Tài bị khắc, phải làm việc vất vả mới có thu hoạch. Tiền đến không dễ dàng. Cần kiên nhẫn và chăm chỉ hơn.' },
            { status: 'Lương không đủ sống', desc: 'Thu nhập không theo kịp chi phí gia tăng. Cuối tháng khó khăn. Cần tìm thêm nguồn thu hoặc cắt giảm chi.' },
            { status: 'Đàm phán thất bại', desc: 'Yêu cầu tăng lương hoặc giá không được chấp nhận. Phía đối tác cứng rắn. Cân nhắc lại chiến lược.' },
            { status: 'Chi phí phát sinh', desc: 'Nhiều chi phí bất ngờ xuất hiện: sửa xe, sức khỏe, sửa nhà. Emergency fund bị hao hụt. Cẩn thận chi tiêu.' },
            { status: 'Nợ khó thu', desc: 'Người khác nợ tiền chậm trả hoặc quỵt nợ. Dòng tiền bị ảnh hưởng. Không cho vay mới trong thời gian này.' },
            { status: 'Đầu tư không hiệu quả', desc: 'Các khoản đầu tư chưa sinh lời như kỳ vọng. Cần kiên nhẫn chờ đợi hoặc xem xét lại chiến lược.' },
            { status: 'Conflict về tiền', desc: 'Mâu thuẫn với người thân hoặc đối tác về vấn đề tài chính. Tiền bạc thử thách tình cảm. Communicate clearly.' },
            { status: 'Giá trị tài sản giảm', desc: 'Tài sản đang sở hữu giảm giá hoặc hao mòn. Không phải lúc bán. Hold và bảo dưỡng.' },
            { status: 'Tích lũy chậm', desc: 'Tiết kiệm được ít hơn dự kiến. Goal tài chính bị delay. Adjust expectations, stay patient.' },
            { status: 'Quyết định tài chính sai', desc: 'Một số quyết định về tiền trong quá khứ đang gây hậu quả. Học từ bài học này. Thận trọng hơn.' }
        ]
    },
    'Thiên Tài': {
        good: [
            { status: 'Hoành tài', desc: 'Thiên Tài vượng, cơ hội kiếm tiền ngoài dự kiến rất cao. Bonus, hoa hồng, hoặc quà tặng có thể đến. Mở lòng đón nhận.' },
            { status: 'May mắn bất ngờ', desc: 'Có thể trúng thưởng nhỏ hoặc nhận được tiền từ nguồn bất ngờ. Thử vận may (có kiểm soát). Fortune smiles.' },
            { status: 'Side business phát đạt', desc: 'Thu nhập từ kinh doanh phụ hoặc freelance tăng mạnh. Cân nhắc mở rộng. Cơ hội đang đến.' },
            { status: 'Đầu cơ thắng lợi', desc: 'Nếu có đầu tư mạo hiểm, thời gian này có thể có lợi nhuận. Linh cảm về thị trường khá chính xác. Nhưng biết dừng.' },
            { status: 'Deal béo bở', desc: 'Có cơ hội tham gia vào các thương vụ sinh lời cao. Đối tác mang đến opportunity tốt. Do due diligence.' },
            { status: 'Commission cao', desc: 'Nếu làm sales hoặc có commission, đây là thời điểm thu hoạch. Chốt deal lớn. Celebrate success.' },
            { status: 'Gift từ người khác', desc: 'Có thể được tặng quà có giá trị hoặc được người khác chiêu đãi. Nhận với lòng biết ơn.' },
            { status: 'Đa dạng nguồn thu', desc: 'Nhiều nguồn thu nhập hoạt động đồng thời. Passive income tăng. Multiple streams of income.' },
            { status: 'Thời điểm startup', desc: 'Nếu có ý tưởng kinh doanh, đây là lúc thử nghiệm. Risk appetite phù hợp với opportunity. Go for it.' },
            { status: 'Quick money', desc: 'Có thể kiếm tiền nhanh từ các công việc ngắn hạn. Gig economy thuận lợi. Tận dụng.' }
        ],
        bad: [
            { status: 'Tiền đến rồi đi', desc: 'Thiên Tài gặp hung, tiền vào nhanh nhưng ra cũng nhanh. Khó giữ được. Tiết kiệm ngay khi có.' },
            { status: 'Lừa đảo rình rập', desc: 'Cẩn thận với các cơ hội đầu tư hoặc kinh doanh "quá tốt để là thật". Scam artists hoạt động mạnh. Verify.' },
            { status: 'Mất tiền vì rủi ro', desc: 'Đầu cơ hoặc đầu tư mạo hiểm có thể mang lại thua lỗ. Không phải lúc để gamble. Play safe.' },
            { status: 'Chi tiêu bốc đồng', desc: 'Dễ bị cám dỗ mua sắm những thứ không cần thiết. Impulse buying gây hại tài chính. 24h rule.' },
            { status: 'Business partner không tin', desc: 'Đối tác kinh doanh có thể không đáng tin cậy. Background check kỹ. Written agreements only.' },
            { status: 'Thất thoát không rõ', desc: 'Tiền mất mà không biết đi đâu. Kiểm tra bank statement. Track expenses carefully.' },
            { status: 'Cho vay mất', desc: 'Nếu cho ai vay tiền trong thời gian này, khả năng mất cao. Tuyệt đối không cho vay lớn. Just say no.' },
            { status: 'Gambling loss', desc: 'Tránh xa cờ bạc, lottery, hoặc đầu cơ quá mức. Có thể mất hết. The house always wins.' },
            { status: 'Deal xấu', desc: 'Bị ép vào thương vụ không có lợi. Đọc kỹ terms trước khi ký. Walk away if needed.' },
            { status: 'Tham lam hại thân', desc: 'Quá ham kiếm nhiều tiền dẫn đến quyết định sai. Greed destroys. Biết đủ là đủ.' }
        ]
    },
    'Thực Thần': {
        good: [
            { status: 'Tài sinh từ tài năng', desc: 'Thực Thần sinh Tài, thu nhập đến từ chính năng lực bản thân. Làm tốt thì có thưởng. Chất lượng = Tiền.' },
            { status: 'Creative income', desc: 'Khả năng sáng tạo mang lại thu nhập. Content, design, nghệ thuật đều có thể monetize. Create and earn.' },
            { status: 'Passive income tăng', desc: 'Thu nhập thụ động từ các dự án cũ vẫn đều đặn. Royalties, commissions, dividends. Money while you sleep.' },
            { status: 'Service business tốt', desc: 'Nếu làm dịch vụ, khách hàng hài lòng và quay lại. Repeat customers. Word of mouth marketing.' },
            { status: 'Teach and earn', desc: 'Kiếm tiền từ việc chia sẻ kiến thức. Dạy học, coaching, mentoring đều thuận lợi. Knowledge is wealth.' },
            { status: 'Food business', desc: 'Nếu liên quan đến ẩm thực, F&B, đây là thời điểm tốt. Doanh thu tăng. Comfort food sells.' },
            { status: 'Sustainable income', desc: 'Thu nhập bền vững, không phải lo lắng. Nguồn thu đáng tin cậy. Financial peace of mind.' },
            { status: 'Chi tiêu enjoy', desc: 'Có tiền để tận hưởng cuộc sống một cách comfortable. Ăn ngon, chơi vui. Balance giữa save và spend.' },
            { status: 'Gifts given and received', desc: 'Trao đổi quà tặng tạo thiện cảm và cơ hội. Give and you shall receive. Generosity pays.' },
            { status: 'Natural abundance', desc: 'Cảm giác đủ đầy, không thiếu thốn. Mindset of abundance. Grateful for what you have.' }
        ],
        bad: [
            { status: 'Hao phí không cần thiết', desc: 'Thực Thần bị khắc, dễ tiêu tiền vào ăn uống, giải trí quá mức. Entertainment expenses cao. Budget entertainment.' },
            { status: 'Overspend on food', desc: 'Chi phí ẩm thực tăng cao: ăn ngoài, order delivery, đồ ăn vặt. Cook at home more. Meal prep.' },
            { status: 'Lazy money', desc: 'Không chủ động kiếm thêm, nghĩ tiền sẽ tự đến. Passive attitude về finance. Take action.' },
            { status: 'Undercharging', desc: 'Không biết định giá bản thân xứng đáng. Bán rẻ dịch vụ hoặc sản phẩm. Know your worth.' },
            { status: 'Procrastinate về tài chính', desc: 'Trì hoãn việc quản lý tiền: không làm budget, không đầu tư. Ignoring finances. Face it now.' },
            { status: 'Comfort spending', desc: 'Mua sắm để cảm thấy tốt hơn. Emotional spending. Address root cause instead.' },
            { status: 'Weight vs wallet', desc: 'Ăn nhiều ảnh hưởng cả sức khỏe lẫn túi tiền. Double negative. Healthy eating = healthy wallet.' },
            { status: 'Thiếu ambition tài chính', desc: 'Quá thoải mái với hiện tại, không có mục tiêu tài chính lớn. Set bigger goals. Dream bigger.' },
            { status: 'Missed opportunities', desc: 'Quá thoải mái nên bỏ lỡ cơ hội kiếm tiền. Others take the deals. Be more proactive.' },
            { status: 'Cho đi quá nhiều', desc: 'Quá generous đến mức ảnh hưởng tài chính bản thân. Set boundaries. Self-care first.' }
        ]
    },
    'Thương Quan': {
        good: [
            { status: 'Tài từ trí tuệ', desc: 'Thương Quan sinh Tài, ý tưởng sáng tạo chuyển hóa thành tiền. Sell your ideas. Intellectual property.' },
            { status: 'Negotiation thắng lợi', desc: 'Khả năng đàm phán, thương lượng cực mạnh. Giành được deal tốt. Win negotiations.' },
            { status: 'Speaking fees', desc: 'Kiếm tiền từ khả năng nói, thuyết trình. Diễn giả, MC, podcaster. Voice is money.' },
            { status: 'Consultant income', desc: 'Tư vấn mang lại thu nhập cao. Expert opinions get paid. Sell expertise.' },
            { status: 'Legal wins', desc: 'Nếu có tranh chấp tài chính, có khả năng thắng. Legal matters in your favor. Justice with money.' },
            { status: 'Sales success', desc: 'Bán hàng dễ dàng, khách bị thuyết phục. Closing deals left and right. Sales commission high.' },
            { status: 'New revenue stream', desc: 'Tìm ra nguồn thu mới mà người khác chưa nghĩ đến. Innovation in income. First mover advantage.' },
            { status: 'Breaking bad deals', desc: 'Khả năng thoát khỏi các thỏa thuận không có lợi. Exit strategies work. Free yourself.' },
            { status: 'Value from criticism', desc: 'Phản hồi của bạn được trả giá cao. Người ta trả tiền để nghe sự thật. Paid reviewer.' },
            { status: 'Disruptive income', desc: 'Thu nhập từ việc phá vỡ status quo. Làm khác đi mang lại tiền. Disrupt and earn.' }
        ],
        bad: [
            { status: 'Mất tiền vì khẩu', desc: 'Thương Quan gặp hung, lời nói có thể gây thiệt hại tài chính. Phát ngôn sai gây mất deal. Think before speak.' },
            { status: 'Hợp đồng tranh chấp', desc: 'Các vấn đề pháp lý liên quan đến hợp đồng phức tạp. Legal costs có thể phát sinh. Read fine print.' },
            { status: 'Đàm phán thất bại', desc: 'Quá aggressive trong negotiation gây mất deal. Tone down approach. Win-win mindset.' },
            { status: 'Bad reviews cost', desc: 'Phản hồi tiêu cực online ảnh hưởng đến business. Reputation damage = revenue loss. Mind online presence.' },
            { status: 'Overpromise', desc: 'Hứa quá nhiều, không deliver được, phải refund hoặc bồi thường. Underproject, overdeliver instead.' },
            { status: 'Relationship damage', desc: 'Phá hỏng quan hệ quan trọng vì vấn đề tiền. Long-term loss. Repair bridges.' },
            { status: 'Tax issues', desc: 'Vấn đề về thuế có thể phát sinh do khai bào không đúng. Review tax documents. Get accountant.' },
            { status: 'Too many opinions', desc: 'Cho ý kiến quá nhiều nơi gây loãng focus và mất cơ hội. Focus on profitable areas.' },
            { status: 'Complaints backfire', desc: 'Khiếu nại về dịch vụ/sản phẩm gây thêm rắc rối hơn là refund. Pick battles wisely.' },
            { status: 'Enemies costly', desc: 'Người ghét bạn có thể gây hại về tài chính. Minimize enemies. Make peace when possible.' }
        ]
    },
    'Chính Quan': {
        good: [
            { status: 'Lương ổn định', desc: 'Chính Quan mang đến thu nhập vững chắc từ công việc chính thức. Steady paycheck. Employment stability.' },
            { status: 'Bonus từ company', desc: 'Có khả năng nhận thưởng, phúc lợi từ công ty. Year-end bonus, stock options. Corporate benefits.' },
            { status: 'Government grants', desc: 'Nếu apply cho các chương trình hỗ trợ của nhà nước, khả năng được duyệt cao. Scholarships, grants.' },
            { status: 'Đầu tư blue chip', desc: 'Thời điểm tốt để đầu tư vào các công ty lớn, ổn định. Safe investments. Long-term growth.' },
            { status: 'Real estate thuận lợi', desc: 'Giao dịch bất động sản thuận buồm xuôi gió. Buying or selling property. Clear titles.' },
            { status: 'Pension và bảo hiểm', desc: 'Các khoản bảo hiểm, lương hưu được đảm bảo. Future security. Retirement planning on track.' },
            { status: 'Tax refund', desc: 'Có thể nhận được hoàn thuế hoặc các khoản hoàn tiền. Money back. Check entitlements.' },
            { status: 'Corporate card perks', desc: 'Tận dụng được các quyền lợi từ công ty: travel, meals, entertainment. Work perks.' },
            { status: 'Structured income', desc: 'Thu nhập có cấu trúc rõ ràng, predictable. Easy to budget. Financial planning.' },
            { status: 'Authority income', desc: 'Thu nhập từ vị trí có quyền lực, quản lý. Management bonuses. Leadership pays.' }
        ],
        bad: [
            { status: 'Ép lương', desc: 'Chính Quan bị khắc, có thể bị ép giữ mức lương thấp. Salary freeze. Limited negotiation room.' },
            { status: 'Tax burden', desc: 'Chi phí thuế hoặc các khoản đóng góp bắt buộc tăng. Less take-home. Review deductions.' },
            { status: 'Bureaucracy delays', desc: 'Các thủ tục hành chính về tiền bị chậm trễ. Waiting for approvals. Patience required.' },
            { status: 'Fines và penalties', desc: 'Có thể phải đóng phạt vì vi phạm quy định. Compliance costs. Follow rules carefully.' },
            { status: 'Corporate restructuring', desc: 'Company thay đổi ảnh hưởng đến thu nhập hoặc vị trí. Uncertainty. Update CV just in case.' },
            { status: 'Benefits cut', desc: 'Các quyền lợi, phúc lợi bị cắt giảm. Less perks. Negotiate or look elsewhere.' },
            { status: 'Limited upside', desc: 'Trần thu nhập bị giới hạn bởi bậc lương, quy định. Glass ceiling. Consider entrepreneurship.' },
            { status: 'Dependent on employer', desc: 'Quá phụ thuộc vào một nguồn thu duy nhất. Vulnerable. Diversify income sources.' },
            { status: 'Audit risk', desc: 'Có thể bị kiểm toán hoặc review tài chính. Prepare documentation. Keep records clean.' },
            { status: 'Rigid budget', desc: 'Không có flexibility trong chi tiêu, bị ràng buộc bởi constraints. Feel restricted. Find ways to increase income.' }
        ]
    },
    'Thất Sát': {
        good: [
            { status: 'High risk, high reward', desc: 'Thất Sát mang cơ hội kiếm tiền lớn nếu chấp nhận rủi ro. Fortune favors the bold. Calculated bets.' },
            { status: 'Crisis = opportunity', desc: 'Trong khủng hoảng có thể tìm thấy cơ hội tài chính. Contrarian investing. Buy low.' },
            { status: 'Dám làm dám chịu', desc: 'Những quyết định táo bạo về tiền có thể mang lại kết quả lớn. Big moves pay off. Go big.' },
            { status: 'Competition cash', desc: 'Thắng trong cạnh tranh mang lại phần thưởng tài chính. Winner takes all. Compete hard.' },
            { status: 'Debt collection', desc: 'Thời điểm tốt để thu nợ từ người khác. Aggressive follow-up works. Get what is owed.' },
            { status: 'Turnaround profits', desc: 'Cải tổ, restructure mang lại lợi nhuận. Fix broken things for profit. Turnaround specialist.' },
            { status: 'Survival money', desc: 'Bằng mọi cách tìm được tiền để tồn tại. Resourceful in tough times. Survivor.' },
            { status: 'Power move', desc: 'Sử dụng vị thế để negotiating better deals. Leverage your position. Assert value.' },
            { status: 'Military precision', desc: 'Quản lý tài chính với kỷ luật như quân đội. Zero waste. Maximum efficiency.' },
            { status: 'Intimidation advantage', desc: 'Thái độ mạnh mẽ khiến đối tác không dám ép giá. Respect means better deals. Show strength.' }
        ],
        bad: [
            { status: 'Mất tiền vì liều', desc: 'Thất Sát gặp hung, rủi ro quá mức có thể mất tất cả. Gambling losses. Stop loss necessary.' },
            { status: 'Bị cướp, mất trộm', desc: 'Cẩn thận với an ninh tài sản. Có thể là đối tượng của kẻ xấu. Secure valuables.' },
            { status: 'Disputes escalate', desc: 'Mâu thuẫn về tiền leo thang thành kiện tụng. Legal battles costly. Settle if possible.' },
            { status: 'Enemies sabotage', desc: 'Kẻ thù có thể phá hoại tài chính của bạn. Protect assets. Watch for sabotage.' },
            { status: 'Market crash', desc: 'Thị trường biến động mạnh gây thua lỗ. Volatile investments. Hedge risks.' },
            { status: 'Debt pressure', desc: 'Áp lực trả nợ căng thẳng. Collectors aggressive. Negotiate payment plan.' },
            { status: 'Hostile takeover', desc: 'Người khác muốn chiếm đoạt tài sản hoặc business. Protect ownership. Legal defense.' },
            { status: 'Health costs', desc: 'Chi phí y tế bất ngờ do stress hoặc tai nạn. Medical bills. Get insurance.' },
            { status: 'Violent loss', desc: 'Mất tiền trong các tình huống drama, bạo lực. Avoid dangerous situations. Safety first.' },
            { status: 'Power stripped', desc: 'Mất vị thế dẫn đến mất thu nhập. Job loss, demotion. Rebuild from scratch.' }
        ]
    },
    'Chính Ấn': {
        good: [
            { status: 'Support từ gia đình', desc: 'Có sự hỗ trợ tài chính từ cha mẹ hoặc người lớn. Family support. Grateful for help.' },
            { status: 'Học bổng, tài trợ', desc: 'Có thể nhận được học bổng, grant, hoặc sponsorship. Education funding. Apply for aid.' },
            { status: 'Inheritance', desc: 'Có khả năng nhận được tài sản thừa kế. Legacy wealth. Honor ancestors.' },
            { status: 'Property from elders', desc: 'Được giúp đỡ về nhà cửa, đất đai từ thế hệ trước. Real estate gifts. Intergenerational wealth.' },
            { status: 'Knowledge monetized', desc: 'Kiến thức, bằng cấp chuyển thành thu nhập cao hơn. Education pays. Invest in learning.' },
            { status: 'Document rewards', desc: 'Các giấy tờ, certificate mang lại lợi ích tài chính. Qualifications pay. Collect credentials.' },
            { status: 'Protected income', desc: 'Thu nhập được bảo vệ bởi hợp đồng, bảo hiểm. Secure stream. Safety net.' },
            { status: 'Mentor guidance', desc: 'Được mentor hướng dẫn về tài chính đúng đắn. Wise advice. Learn from others mistakes.' },
            { status: 'Intellectual property', desc: 'Sở hữu trí tuệ tạo ra thu nhập. Patents, copyrights. Create and own.' },
            { status: 'Trust fund', desc: 'Có quỹ hoặc trust fund hoạt động tốt. Passive income from trusts. Well-managed.' }
        ],
        bad: [
            { status: 'Phụ thuộc tài chính', desc: 'Chính Ấn bị khắc, quá phụ thuộc vào người khác về tiền. Dependency. Build independence.' },
            { status: 'Gia đình cần hỗ trợ', desc: 'Phải chi tiền để lo cho cha mẹ, người lớn. Elder care costs. Budget for family.' },
            { status: 'Education debt', desc: 'Nợ học phí, chi phí giáo dục còn nặng. Student loans. Plan repayment.' },
            { status: 'Knowledge không monetize', desc: 'Học nhiều nhưng không chuyển được thành tiền. Theory vs practice. Apply what you learn.' },
            { status: 'Certificates useless', desc: 'Bằng cấp không được thị trường đánh giá cao. Outdated qualifications. Update skills.' },
            { status: 'Inheritance disputes', desc: 'Tranh chấp về thừa kế gây mất tiền và thời gian. Family conflicts. Resolve fairly.' },
            { status: 'Over-protection', desc: 'Quá an toàn khiến bỏ lỡ cơ hội làm giàu. Conservative to a fault. Take calculated risks.' },
            { status: 'Paperwork delays', desc: 'Các thủ tục giấy tờ về tiền bị chậm trễ. Bureaucracy. Follow up persistently.' },
            { status: 'Lost documents', desc: 'Mất giấy tờ quan trọng liên quan đến tài sản, tài chính. Organize files. Backup digitally.' },
            { status: 'Outdated advice', desc: 'Theo lời khuyên tài chính không còn phù hợp. Old wisdom doesnt apply. Get current info.' }
        ]
    },
    'Thiên Ấn': {
        good: [
            { status: 'Intuitive investments', desc: 'Linh cảm về đầu tư khá chính xác. Trust gut feelings. Intuition pays.' },
            { status: 'Alternative income', desc: 'Thu nhập từ các nguồn không truyền thống. Crypto, NFT, gig economy. New money.' },
            { status: 'Spiritual wealth', desc: 'Cảm thấy giàu có về mặt tinh thần, không phải về tiền. Inner richness. Contentment.' },
            { status: 'Unexpected sources', desc: 'Tiền đến từ những nguồn không ngờ tới. Mysterious income. Welcome surprises.' },
            { status: 'Artistic income', desc: 'Kiếm tiền từ nghệ thuật, sáng tạo độc đáo. Art sells. Follow passion.' },
            { status: 'Research pays', desc: 'Nghiên cứu, tìm hiểu sâu mang lại cơ hội tài chính. Deep knowledge. Specialist advantage.' },
            { status: 'Occult knowledge', desc: 'Kiến thức về tâm linh, bí ẩn có thể monetize. Psychic income. Niche market.' },
            { status: 'Healing income', desc: 'Thu nhập từ việc chữa lành người khác. Alternative therapies. Help and earn.' },
            { status: 'Writing royalties', desc: 'Sách, content dài hạn tạo thu nhập thụ động. Write once, earn forever.' },
            { status: 'Privacy pays', desc: 'Giữ bí mật về tài chính bảo vệ được wealth. Stealth wealth. Dont show off.' }
        ],
        bad: [
            { status: 'Detached from money', desc: 'Thiên Ấn bị khắc, quá thoát ly khỏi vấn đề tiền bạc. Ignoring finances. Get grounded.' },
            { status: 'Impractical dreams', desc: 'Ước mơ tài chính không thực tế. Fantasy vs reality. Be practical.' },
            { status: 'Scammed spiritually', desc: 'Bị lừa tiền qua các "thầy", "gurus". Fake spirituality. Discernment.' },
            { status: 'Over-generous', desc: 'Cho đi quá nhiều khiến bản thân thiếu thốn. Self-sacrifice. Balance giving.' },
            { status: 'Isolation hurt', desc: 'Cô lập khiến mất cơ hội tài chính từ network. Connect with others. Community.' },
            { status: 'Analysis paralysis', desc: 'Suy nghĩ quá nhiều mà không action về tiền. Overthinking. Just do it.' },
            { status: 'Strange investments', desc: 'Đầu tư vào những thứ quá kỳ quặc mà không ai hiểu. Explain to yourself first.' },
            { status: 'Victim mentality', desc: 'Cảm thấy bị universe treat unfairly về tiền. Self-pity. Take responsibility.' },
            { status: 'Conspiracy thinking', desc: 'Tin vào âm mưu về tiền bạc khiến quyết định sai. Stay rational. Verify facts.' },
            { status: 'Talent wasted', desc: 'Có tài năng nhưng không chuyển thành tiền. Hidden value. Commercialize gifts.' }
        ]
    },
    'Tỷ Kiên': {
        good: [
            { status: 'Partnership profits', desc: 'Tỷ Kiên vượng, hợp tác kinh doanh sinh lời. Joint ventures. Combined strength.' },
            { status: 'Group investment', desc: 'Đầu tư cùng nhóm bạn mang lại kết quả. Pool resources. Shared risk.' },
            { status: 'Referral income', desc: 'Bạn bè giới thiệu khách hàng, cơ hội. Network pays. Reciprocate.' },
            { status: 'Cost sharing', desc: 'Chia sẻ chi phí với người khác giúp tiết kiệm. Shared expenses. Split bills.' },
            { status: 'Sibling support', desc: 'Anh chị em hỗ trợ về tài chính khi cần. Family business. Work together.' },
            { status: 'Friend loans', desc: 'Có thể vay mượn bạn bè trong trường hợp cần thiết. Trusted circle. Repay on time.' },
            { status: 'Collective bargaining', desc: 'Cùng nhau thương lượng được giá tốt hơn. Group buying power. Unite for deals.' },
            { status: 'Peer accountability', desc: 'Bạn bè giúp giữ kỷ luật tài chính. Financial friends. Accountability partner.' },
            { status: 'Equal opportunity', desc: 'Cơ hội kiếm tiền được chia sẻ công bằng. Fair distribution. Everyone wins.' },
            { status: 'Community wealth', desc: 'Cộng đồng cùng phát triển về tài chính. Rising tide lifts all boats. Abundant mindset.' }
        ],
        bad: [
            { status: 'Tranh chấp tiền', desc: 'Tỷ Kiên gặp hung, mâu thuẫn về tiền với anh em, bạn bè. Money fights. Clear agreements.' },
            { status: 'Split unfair', desc: 'Chia lợi nhuận không công bằng gây bất mãn. Unfair shares. Renegotiate.' },
            { status: 'Friend debt', desc: 'Bạn bè nợ tiền không trả được. Friendship vs money. Learn lesson.' },
            { status: 'Competition loss', desc: 'Người cùng level vượt qua bạn về kiếm tiền. Left behind. Up your game.' },
            { status: 'Copy business', desc: 'Bị người khác copy ý tưởng kinh doanh. Idea stolen. Move faster, innovate more.' },
            { status: 'Partner cheat', desc: 'Đối tác chiếm tiền hoặc gian lận. Betrayal. Verify everything.' },
            { status: 'Peer pressure spend', desc: 'Bị áp lực chi tiêu theo bạn bè. Keeping up with Joneses. Be yourself.' },
            { status: 'Group liability', desc: 'Chịu trách nhiệm cho nợ của nhóm. Joint liability. Limit exposure.' },
            { status: 'Social expenses', desc: 'Chi phí giao tiếp xã hội quá cao. Social commitments drain wallet. Say no sometimes.' },
            { status: 'Comparison trap', desc: 'So sánh tài chính với người khác gây stress. Comparison thief of joy. Focus on own journey.' }
        ]
    },
    'Kiếp Tài': {
        good: [
            { status: 'Competition money', desc: 'Kiếp Tài vượng, cạnh tranh mang lại lợi nhuận. Win and earn. Competitive edge.' },
            { status: 'Fast money', desc: 'Kiếm tiền nhanh trong môi trường cạnh tranh cao. Quick wins. Aggressive earning.' },
            { status: 'Disruption profits', desc: 'Phá vỡ thị trường cũ tạo ra cơ hội tài chính mới. Disrupt incumbents. First mover.' },
            { status: 'Reclaim what is yours', desc: 'Lấy lại những gì bị mất hoặc bị lấy. Recover losses. Fight for rights.' },
            { status: 'Survival skills', desc: 'Khả năng sống sót trong môi trường tài chính khắc nghiệt. Tough times build wealth. Resilience.' },
            { status: 'Opportunistic gains', desc: 'Nhanh chóng nắm bắt cơ hội mà người khác chậm hơn. Snatch opportunities. Quick reaction.' },
            { status: 'Hostile acquisition', desc: 'Mua lại đối thủ hoặc tài sản với giá có lợi. Tough negotiator. Dominant position.' },
            { status: 'Crisis profit', desc: 'Kiếm tiền trong chaos khi người khác hoảng loạn. Calm under pressure. Contrarian.' },
            { status: 'Resource grab', desc: 'Chiếm được nguồn lực quan trọng trước đối thủ. Strategic assets. Competitive advantage.' },
            { status: 'Bold moves pay', desc: 'Hành động mạnh mẽ về tài chính mang lại kết quả. Nothing ventured nothing gained. Go big.' }
        ],
        bad: [
            { status: 'Mất tiền vì người', desc: 'Kiếp Tài gặp hung, dễ mất tiền vì bạn bè, người thân lợi dụng. Taken advantage of. Set boundaries.' },
            { status: 'Cho vay mất', desc: 'Tuyệt đối không cho vay trong thời gian này. Money lost forever. Just say no to lending.' },
            { status: 'Bị lừa', desc: 'Kẻ xấu nhắm vào bạn để lừa tiền. Fraud target. Double verify everything.' },
            { status: 'Partner steal', desc: 'Đối tác kinh doanh có thể chiếm đoạt tiền. Trust issues. Monitor finances.' },
            { status: 'Competition loss', desc: 'Thua trong cạnh tranh mất cả tiền lẫn cơ hội. Beaten by rival. Regroup and retry.' },
            { status: 'Overspend to compete', desc: 'Chi quá nhiều để cạnh tranh hình ảnh. Keeping up appearances. Be authentic.' },
            { status: 'Debt from others', desc: 'Phải gánh nợ của người khác. Not your debt. Refuse responsibility.' },
            { status: 'Lawsuit money', desc: 'Kiện tụng tiêu tốn tài chính. Legal battles expensive. Settle if possible.' },
            { status: 'Relationship damage', desc: 'Mất quan hệ quý giá vì vấn đề tiền. Relationships > money. Choose wisely.' },
            { status: 'Burning bridges', desc: 'Cách kiếm tiền gây ra kẻ thù. Enemies made. Consider long-term.' }
        ]
    }
};

function getWealthInterpretation(shishen, score = 0) {
    const data = WEALTH_INTERPRETATIONS[shishen];
    if (!data) {
        return score >= 0
            ? { status: 'Bình ổn', desc: 'Tài chính ổn định, không có biến động lớn. Thu chi cân bằng.' }
            : { status: 'Tiết kiệm', desc: 'Nên chi tiêu tiết kiệm, tích trữ cho thời điểm tốt hơn.' };
    }
    const pool = score >= 0 ? data.good : data.bad;
    return pool[Math.floor(Math.random() * pool.length)];
}

module.exports = { WEALTH_INTERPRETATIONS, getWealthInterpretation };
