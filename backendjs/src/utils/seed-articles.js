/**
 * Seed Articles - 100 Bazi Articles with Rich Content (500+ words each)
 * Categories: khai-niem, cach-luan, ngu-hanh, can-chi, ung-dung
 */

const articles = [];

// Helper to generate slug
const toSlug = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Rich content generator for each category
const generateRichContent = (title, excerpt, category) => {
    const categoryContent = {
        'khai-niem': `
<h2>${title}</h2>

<p class="lead">${excerpt}</p>

<h3>Giới thiệu tổng quan</h3>
<p>Bát Tự (八字), còn được gọi là Tứ Trụ (四柱), là một trong những bộ môn dự đoán học cổ xưa và quan trọng nhất trong văn hóa phương Đông. Bộ môn này dựa trên nguyên lý rằng thời điểm một người được sinh ra - bao gồm năm, tháng, ngày và giờ - sẽ quyết định nhiều khía cạnh trong cuộc sống của họ, từ tính cách đến vận mệnh.</p>

<p>Trong truyền thống Trung Hoa cổ đại, Bát Tự đã được các học giả và nhà tiên tri sử dụng để dự đoán tương lai, đánh giá sự tương hợp trong hôn nhân, và đưa ra các quyết định quan trọng trong đời. Ngày nay, Bát Tự vẫn được ứng dụng rộng rãi trong nhiều lĩnh vực của cuộc sống hiện đại.</p>

<h3>Nguyên lý cơ bản</h3>
<p>Tên gọi "Bát Tự" xuất phát từ việc lá số của mỗi người bao gồm tám chữ Hán, được chia thành bốn cặp gọi là "Tứ Trụ". Mỗi trụ đại diện cho một khoảng thời gian: Năm (Niên Trụ), Tháng (Nguyệt Trụ), Ngày (Nhật Trụ), và Giờ (Thời Trụ). Mỗi trụ bao gồm một Thiên Can và một Địa Chi, tạo thành tổng cộng tám ký tự.</p>

<p>Thiên Can gồm mười ký tự: Giáp, Ất (Mộc), Bính, Đinh (Hỏa), Mậu, Kỷ (Thổ), Canh, Tân (Kim), Nhâm, Quý (Thủy). Địa Chi gồm mười hai ký tự tương ứng với mười hai con giáp: Tý (Chuột), Sửu (Trâu), Dần (Hổ), Mão (Mèo/Thỏ), Thìn (Rồng), Tỵ (Rắn), Ngọ (Ngựa), Mùi (Dê), Thân (Khỉ), Dậu (Gà), Tuất (Chó), Hợi (Lợn).</p>

<h3>Tầm quan trọng trong đời sống</h3>
<p>Việc hiểu rõ lá số Bát Tự của bản thân có thể mang lại nhiều lợi ích thiết thực. Đầu tiên, nó giúp chúng ta nhận thức rõ hơn về điểm mạnh và điểm yếu của bản thân, từ đó phát huy tối đa tiềm năng. Thứ hai, Bát Tự có thể dự báo những giai đoạn thuận lợi hoặc khó khăn trong đời, giúp chúng ta chuẩn bị tâm lý và kế hoạch phù hợp.</p>

<p>Ngoài ra, Bát Tự còn được ứng dụng trong việc chọn ngày lành tháng tốt cho các sự kiện quan trọng như cưới hỏi, khai trương, động thổ. Nhiều doanh nhân thành công tại các nước Á Đông vẫn tham khảo Bát Tự khi đưa ra các quyết định kinh doanh quan trọng.</p>

<h3>Lưu ý khi tìm hiểu</h3>
<p>Mặc dù Bát Tự là một công cụ dự đoán hữu ích, nhưng chúng ta cần hiểu rằng nó chỉ là một trong nhiều yếu tố ảnh hưởng đến cuộc sống. Nỗ lực cá nhân, môi trường sống, và các quyết định của chúng ta vẫn đóng vai trò quan trọng trong việc định hình tương lai. Bát Tự nên được xem như một công cụ tham khảo để hiểu bản thân tốt hơn, chứ không phải là định mệnh không thể thay đổi.</p>

<p>Để học Bát Tự một cách bài bản, bạn cần kiên nhẫn và nghiên cứu từng bước. Bắt đầu từ những khái niệm cơ bản như Âm Dương, Ngũ Hành, rồi tiến đến Thiên Can Địa Chi, và cuối cùng là các kỹ thuật luận giải phức tạp hơn. Hành trình này đòi hỏi sự kiên trì nhưng sẽ mang lại những hiểu biết sâu sắc về quy luật vũ trụ và con người.</p>
`,
        'cach-luan': `
<h2>${title}</h2>

<p class="lead">${excerpt}</p>

<h3>Phương pháp tiếp cận</h3>
<p>Việc luận giải Bát Tự là một nghệ thuật đòi hỏi sự kết hợp giữa kiến thức lý thuyết vững chắc và kinh nghiệm thực hành phong phú. Mỗi lá số là một bức tranh độc đáo về cuộc đời con người, và người luận giải cần có khả năng đọc hiểu từng chi tiết trong bức tranh đó.</p>

<p>Bước đầu tiên trong quá trình luận giải là xác định Nhật Chủ - Thiên Can của ngày sinh, đại diện cho bản thân chủ mệnh. Nhật Chủ là điểm xuất phát để đánh giá toàn bộ lá số. Từ Nhật Chủ, chúng ta có thể xác định các mối quan hệ với các Can Chi khác trong lá số, gọi là Thập Thần.</p>

<h3>Các bước luận giải chi tiết</h3>
<p>Sau khi xác định Nhật Chủ, bước tiếp theo là đánh giá sức mạnh của Nhật Chủ thông qua Nguyệt Lệnh (Địa Chi của tháng sinh). Nguyệt Lệnh được coi là "Tư lệnh" của lá số, quyết định phần lớn sức mạnh của Nhật Chủ. Một Nhật Chủ được Nguyệt Lệnh sinh phù sẽ mạnh, ngược lại sẽ yếu.</p>

<p>Việc xác định Nhật Chủ vượng hay nhược là cực kỳ quan trọng vì nó quyết định cách xác định Dụng Thần. Dụng Thần là hành cần thiết để cân bằng lá số, mang lại may mắn cho chủ mệnh. Với người thân vượng, Dụng Thần thường là các hành khắc chế hoặc tiết hơi Nhật Chủ. Với người thân nhược, Dụng Thần thường là các hành sinh phù Nhật Chủ.</p>

<h3>Phân tích các mối quan hệ</h3>
<p>Trong Bát Tự, các Thiên Can và Địa Chi có thể tương tác với nhau theo nhiều cách: Hợp, Xung, Hình, Hại, Phá. Thiên Can có thể hợp với nhau (ví dụ: Giáp hợp Kỷ hóa Thổ). Địa Chi có thể Lục Hợp (hai Chi hợp) hoặc Tam Hợp (ba Chi hợp thành cục). Ngược lại, các Chi cũng có thể Xung nhau (ví dụ: Tý Ngọ xung), tạo ra biến động và thay đổi.</p>

<p>Việc phân tích các mối quan hệ này giúp người luận giải hiểu được động lực bên trong lá số. Một lá số có nhiều Hợp cục thường cho thấy cuộc sống hài hòa, ổn định. Ngược lại, lá số có nhiều Xung thường báo hiệu cuộc sống nhiều biến động, nhưng cũng có thể mang đến cơ hội thay đổi tích cực.</p>

<h3>Kết hợp Đại Vận và Lưu Niên</h3>
<p>Sau khi phân tích bản mệnh (lá số gốc), bước quan trọng tiếp theo là xem xét Đại Vận và Lưu Niên. Đại Vận là chu kỳ 10 năm, mỗi chu kỳ mang theo một cặp Can Chi mới sẽ tương tác với lá số gốc. Lưu Niên là năm đang diễn ra, có Can Chi riêng cũng ảnh hưởng đến vận thế.</p>

<p>Khi Đại Vận hoặc Lưu Niên mang đến Dụng Thần, đó là thời kỳ thuận lợi. Ngược lại, khi gặp Kỵ Thần, chủ mệnh cần cẩn thận hơn trong các quyết định. Sự kết hợp giữa Đại Vận và Lưu Niên với lá số gốc tạo nên bức tranh vận mệnh từng năm của mỗi người.</p>

<h3>Lưu ý quan trọng</h3>
<p>Luận giải Bát Tự không phải là một công thức cứng nhắc mà là một nghệ thuật linh hoạt. Cùng một lá số có thể được giải thích theo nhiều cách khác nhau tùy thuộc vào bối cảnh và câu hỏi cụ thể. Người học Bát Tự cần thực hành nhiều, đọc nhiều lá số thực tế để trau dồi kỹ năng và trực giác. Quan trọng nhất là giữ thái độ khiêm tốn và cầu tiến trong quá trình học tập.</p>
`,
        'ngu-hanh': `
<h2>${title}</h2>

<p class="lead">${excerpt}</p>

<h3>Ngũ Hành là gì?</h3>
<p>Ngũ Hành là một trong những khái niệm nền tảng quan trọng nhất trong triết học và văn hóa phương Đông. Năm hành bao gồm: Kim (金 - Metal), Mộc (木 - Wood), Thủy (水 - Water), Hỏa (火 - Fire), và Thổ (土 - Earth). Đây không chỉ đơn thuần là năm chất liệu vật lý mà còn đại diện cho năm loại năng lượng, năm giai đoạn của sự vận động và biến đổi trong vũ trụ.</p>

<p>Trong Bát Tự, mỗi Thiên Can và Địa Chi đều thuộc về một trong năm hành. Việc phân tích sự phân bố Ngũ Hành trong lá số giúp chúng ta hiểu được đặc điểm tính cách, điểm mạnh, điểm yếu của một người, cũng như những điều cần bổ sung để cân bằng.</p>

<h3>Quy luật Tương Sinh</h3>
<p>Ngũ Hành Tương Sinh là quy luật nuôi dưỡng, hỗ trợ lẫn nhau giữa các hành: Mộc sinh Hỏa (gỗ cháy thành lửa), Hỏa sinh Thổ (lửa đốt tạo tro đất), Thổ sinh Kim (đất chứa quặng kim loại), Kim sinh Thủy (kim loại nóng chảy thành chất lỏng, hoặc kim loại lạnh ngưng tụ hơi nước), Thủy sinh Mộc (nước nuôi cây cối).</p>

<p>Trong lá số Bát Tự, mối quan hệ Tương Sinh thể hiện sự hỗ trợ tích cực. Ví dụ, nếu Nhật Chủ thuộc Mộc và trong lá số có nhiều Thủy, điều này có nghĩa Nhật Chủ được sinh phù mạnh mẽ. Các mối quan hệ tương sinh trong gia đình, công việc cũng có thể được phân tích thông qua nguyên lý này.</p>

<h3>Quy luật Tương Khắc</h3>
<p>Ngũ Hành Tương Khắc là quy luật chế ngự, kiểm soát lẫn nhau: Mộc khắc Thổ (rễ cây xuyên qua đất), Thổ khắc Thủy (đất đắp đê ngăn nước), Thủy khắc Hỏa (nước dập lửa), Hỏa khắc Kim (lửa nung chảy kim loại), Kim khắc Mộc (dao chặt cây). Quy luật này tạo nên sự cân bằng trong tự nhiên, không cho bất kỳ hành nào phát triển quá mức.</p>

<p>Trong luận giải Bát Tự, Tương Khắc không nhất thiết là xấu. Một Nhật Chủ quá vượng cần có hành khắc để kiểm soát, giống như một cây cần được tỉa cành để phát triển đẹp hơn. Điều quan trọng là sự cân bằng - không quá sinh cũng không quá khắc.</p>

<h3>Ứng dụng trong cuộc sống</h3>
<p>Hiểu biết về Ngũ Hành có thể được ứng dụng vào nhiều khía cạnh của cuộc sống. Trong việc chọn nghề nghiệp, mỗi hành tương ứng với các ngành nghề khác nhau: Mộc (giáo dục, xuất bản, nội thất), Hỏa (năng lượng, giải trí, ẩm thực), Thổ (bất động sản, nông nghiệp, xây dựng), Kim (tài chính, công nghệ, kim hoàn), Thủy (vận tải, du lịch, truyền thông).</p>

<p>Trong phong thủy, Ngũ Hành được ứng dụng để bố trí không gian sống hài hòa. Mỗi hướng nhà, mỗi phòng có thể được tối ưu hóa theo nguyên lý Ngũ Hành để hỗ trợ sức khỏe và vận may cho gia chủ. Màu sắc, vật liệu nội thất cũng được chọn lựa theo nguyên tắc này.</p>

<h3>Cân bằng Ngũ Hành</h3>
<p>Một lá số Bát Tự lý tưởng là lá số có sự cân bằng giữa năm hành. Tuy nhiên, trong thực tế, hầu hết lá số đều có sự thiên lệch - có hành thừa, có hành thiếu. Việc nhận biết và bổ sung các hành thiếu thông qua trang phục, phụ kiện, môi trường sống, thậm chí chế độ ăn uống có thể giúp cải thiện vận khí và sức khỏe.</p>

<p>Ví dụ, người thiếu Thủy có thể bổ sung bằng cách mặc quần áo màu đen hoặc xanh đậm, đeo đồ trang sức bằng kim loại (Kim sinh Thủy), uống nhiều nước, và làm việc trong môi trường gần nước. Tuy nhiên, cần thận trọng vì việc bổ sung quá mức cũng có thể gây mất cân bằng theo chiều ngược lại.</p>
`,
        'can-chi': `
<h2>${title}</h2>

<p class="lead">${excerpt}</p>

<h3>Tổng quan về Thiên Can và Địa Chi</h3>
<p>Thiên Can và Địa Chi là hai hệ thống ký hiệu cổ xưa được sử dụng trong lịch Can Chi của các nước Đông Á. Thiên Can gồm 10 ký tự, đại diện cho năng lượng của trời. Địa Chi gồm 12 ký tự, đại diện cho năng lượng của đất và tương ứng với 12 con giáp. Sự kết hợp giữa Thiên Can và Địa Chi tạo thành chu kỳ 60 năm gọi là Lục Thập Hoa Giáp.</p>

<p>Mỗi Thiên Can và Địa Chi đều thuộc về một trong năm hành (Kim, Mộc, Thủy, Hỏa, Thổ) và có tính Âm hoặc Dương. Sự phân chia này tạo nên đặc tính riêng biệt cho mỗi Can Chi, ảnh hưởng đến tính cách và vận mệnh của những người có chúng trong lá số Bát Tự.</p>

<h3>Đặc điểm chi tiết</h3>
<p>Khi phân tích một Thiên Can hoặc Địa Chi cụ thể, chúng ta cần xem xét nhiều khía cạnh: hành thuộc về, tính Âm Dương, ý nghĩa tượng trưng, và mối quan hệ với các Can Chi khác. Ví dụ, Giáp (甲) là Dương Mộc, tượng trưng cho cây cổ thụ, đại thụ - mạnh mẽ, kiên cường, có tính lãnh đạo. Ất (乙) là Âm Mộc, tượng trưng cho hoa cỏ, dây leo - mềm mại, linh hoạt, biết thích nghi.</p>

<p>Địa Chi còn có một đặc điểm quan trọng là Tàng Can - mỗi Địa Chi ẩn chứa một đến ba Thiên Can bên trong. Ví dụ, Chi Tý (子) tàng Quý Thủy, Chi Sửu (丑) tàng Kỷ Thổ, Quý Thủy, Tân Kim. Việc phân tích Tàng Can giúp hiểu sâu hơn về năng lượng tiềm ẩn trong lá số.</p>

<h3>Mối quan hệ giữa các Can Chi</h3>
<p>Thiên Can có các mối quan hệ Hợp đặc biệt: Giáp hợp Kỷ hóa Thổ, Ất hợp Canh hóa Kim, Bính hợp Tân hóa Thủy, Đinh hợp Nhâm hóa Mộc, Mậu hợp Quý hóa Hỏa. Khi hai Can hợp với nhau trong lá số, chúng có thể chuyển hóa thành hành mới, làm thay đổi cấu trúc Ngũ Hành của lá số.</p>

<p>Địa Chi có nhiều mối quan hệ phức tạp hơn: Lục Hợp (sáu cặp Chi hợp), Tam Hợp (ba Chi hợp thành cục), Bán Hợp (hai trong ba Chi của Tam Hợp), Lục Xung (sáu cặp Chi xung), Hình (ba loại hình phạt), Hại, Phá. Mỗi mối quan hệ mang ý nghĩa riêng và ảnh hưởng đặc biệt đến vận mệnh.</p>

<h3>Ý nghĩa trong lá số Bát Tự</h3>
<p>Khi một Can Chi làm Nhật Chủ (Thiên Can của ngày sinh), nó đại diện cho bản thân chủ mệnh. Đặc tính của Nhật Chủ sẽ ảnh hưởng trực tiếp đến tính cách cơ bản của người đó. Ví dụ, người Nhật Chủ Bính Hỏa thường sáng sủa, nhiệt tình, hướng ngoại như Mặt Trời. Người Nhật Chủ Đinh Hỏa thường kín đáo hơn, sâu sắc như ngọn nến.</p>

<p>Ngoài Nhật Chủ, vị trí của các Can Chi khác trong lá số (Niên Trụ, Nguyệt Trụ, Thời Trụ) cũng mang ý nghĩa đặc biệt. Niên Trụ đại diện cho tổ tiên, xuất thân. Nguyệt Trụ đại diện cho cha mẹ, sự nghiệp. Thời Trụ đại diện cho con cái và cuộc sống về già. Sự tương tác giữa các trụ tạo nên câu chuyện cuộc đời của mỗi người.</p>

<h3>Ứng dụng thực tiễn</h3>
<p>Hiểu biết về Thiên Can Địa Chi không chỉ dùng trong Bát Tự mà còn ứng dụng rộng rãi trong chọn ngày giờ tốt. Khi chọn ngày cho các sự kiện quan trọng như cưới hỏi, khai trương, nhập trạch, người ta thường xem xét Can Chi của ngày đó có tương hợp với bản mệnh hay không, có xung khắc với tuổi các thành viên trong gia đình hay không. Đây là một nghệ thuật đòi hỏi kiến thức sâu rộng và kinh nghiệm thực hành lâu năm.</p>
`,
        'ung-dung': `
<h2>${title}</h2>

<p class="lead">${excerpt}</p>

<h3>Giới thiệu ứng dụng</h3>
<p>Bát Tự không chỉ là một bộ môn học thuật mang tính lý thuyết mà còn có vô vàn ứng dụng thực tiễn trong cuộc sống hàng ngày. Từ việc chọn nghề nghiệp phù hợp đến việc tìm hiểu bạn đời, từ chọn hướng nhà đến chọn thời điểm kinh doanh, Bát Tự đều có thể cung cấp những gợi ý hữu ích dựa trên nguyên lý cân bằng Ngũ Hành.</p>

<p>Điều quan trọng cần nhớ là Bát Tự chỉ nên được xem như một công cụ tham khảo, không phải là kim chỉ nam tuyệt đối. Mọi quyết định cuối cùng vẫn nên dựa trên lý trí, hoàn cảnh thực tế và nỗ lực cá nhân. Bát Tự giúp chúng ta hiểu rõ hơn về bản thân và xu hướng vận mệnh, từ đó đưa ra những lựa chọn thông minh hơn.</p>

<h3>Phương pháp ứng dụng</h3>
<p>Để ứng dụng Bát Tự vào tình huống cụ thể, đầu tiên cần lập lá số chính xác dựa trên thông tin ngày giờ sinh. Sau đó, phân tích Nhật Chủ, Dụng Thần và tình hình Ngũ Hành trong lá số. Cuối cùng, đưa ra các gợi ý phù hợp dựa trên nguyên tắc bổ sung Dụng Thần và tránh Kỵ Thần.</p>

<p>Ví dụ, khi tư vấn nghề nghiệp, nếu Dụng Thần của một người là Hỏa, họ nên hướng đến các ngành nghề thuộc hành Hỏa như: năng lượng, điện lực, ẩm thực, giải trí, quảng cáo, marketing. Nếu Dụng Thần là Thủy, họ có thể phù hợp với ngành vận tải, du lịch, thương mại quốc tế, truyền thông, hoặc các công việc liên quan đến chất lỏng.</p>

<h3>Những lưu ý quan trọng</h3>
<p>Khi ứng dụng Bát Tự vào cuộc sống, cần tránh ngộ nhận rằng đây là một phương pháp dự đoán chính xác 100%. Bát Tự cung cấp những xu hướng và khả năng, không phải những định mệnh chắc chắn. Một người có lá số không tốt vẫn có thể thành công nếu họ nỗ lực đúng hướng và tận dụng những giai đoạn thuận lợi.</p>

<p>Ngoài ra, việc tự luận giải Bát Tự mà không có kiến thức chuyên sâu có thể dẫn đến những kết luận sai lầm. Nếu có những quyết định quan trọng cần tham khảo Bát Tự, nên tìm đến các chuyên gia có uy tín để được tư vấn chính xác. Đồng thời, luôn kết hợp với các yếu tố thực tế khác như tài chính, sức khỏe, hoàn cảnh gia đình trước khi đưa ra quyết định.</p>

<h3>Kết hợp với các bộ môn khác</h3>
<p>Bát Tự thường được kết hợp với Phong Thủy để tối ưu hóa môi trường sống và làm việc. Ví dụ, sau khi biết Dụng Thần của bản thân, bạn có thể bố trí nhà ở theo hướng và màu sắc phù hợp với hành đó. Phòng ngủ, bàn làm việc, cửa chính đều có thể được sắp xếp để hỗ trợ vận khí của gia chủ.</p>

<p>Bát Tự cũng có thể kết hợp với Tử Vi Đẩu Số để có cái nhìn toàn diện hơn về vận mệnh. Trong khi Bát Tự tập trung vào yếu tố thời gian và Ngũ Hành, Tử Vi Đẩu Số phân tích 12 cung và hơn 100 sao để đưa ra dự đoán chi tiết về từng lĩnh vực cuộc sống. Sự kết hợp của hai bộ môn này có thể mang lại những insights sâu sắc hơn.</p>

<h3>Kết luận</h3>
<p>Ứng dụng Bát Tự vào cuộc sống là một hành trình khám phá bản thân và vũ trụ. Đây không phải là mê tín mà là một hệ thống tri thức cổ xưa được đúc kết qua hàng nghìn năm quan sát và nghiên cứu. Khi tiếp cận với tâm thế cởi mở và lý trí, Bát Tự có thể trở thành một người bạn đồng hành hữu ích trên con đường cuộc sống của mỗi chúng ta.</p>
`
    };

    return categoryContent[category] || categoryContent['khai-niem'];
};

// Category: Khái niệm cơ bản (20 articles)
const khaiNiem = [
    { title: "Bát Tự là gì? Tổng quan về thuật số mệnh lý", excerpt: "Tìm hiểu khái niệm cơ bản về Bát Tự - bộ môn dự đoán vận mệnh dựa trên ngày giờ sinh." },
    { title: "Tứ Trụ trong Bát Tự: Năm, Tháng, Ngày, Giờ", excerpt: "Giải thích chi tiết về 4 trụ cấu thành lá số Bát Tự của mỗi người." },
    { title: "Thiên Can là gì? 10 Thiên Can trong Bát Tự", excerpt: "Khám phá ý nghĩa của 10 Thiên Can: Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý." },
    { title: "Địa Chi là gì? 12 Địa Chi trong Bát Tự", excerpt: "Tìm hiểu về 12 Địa Chi: Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi." },
    { title: "Nhật Chủ - Yếu tố quan trọng nhất trong lá số", excerpt: "Nhật Chủ đại diện cho bản thân trong Bát Tự, cách xác định và ý nghĩa." },
    { title: "Nguyệt Lệnh là gì? Tầm quan trọng của tháng sinh", excerpt: "Nguyệt Lệnh quyết định sức mạnh của Nhật Chủ và định hướng cách cục." },
    { title: "Thân Vượng và Thân Nhược trong Bát Tự", excerpt: "Phân biệt lá số thân vượng và thân nhược, cách xác định dụng thần." },
    { title: "Dụng Thần là gì? Cách xác định Dụng Thần", excerpt: "Dụng Thần là hành cần thiết để cân bằng lá số, mang lại may mắn." },
    { title: "Kỵ Thần trong Bát Tự: Những điều cần tránh", excerpt: "Kỵ Thần là hành gây bất lợi cho lá số, cần hạn chế trong cuộc sống." },
    { title: "Hỷ Thần và Cách Thần trong Bát Tự", excerpt: "Phân biệt các loại thần trong lá số và vai trò của chúng." },
    { title: "Cách Cục trong Bát Tự là gì?", excerpt: "Tìm hiểu khái niệm cách cục và ảnh hưởng đến vận mệnh." },
    { title: "Đại Vận là gì? Chu kỳ 10 năm trong đời người", excerpt: "Giải thích về Đại Vận và cách nó ảnh hưởng đến từng giai đoạn cuộc sống." },
    { title: "Lưu Niên là gì? Vận hạn theo từng năm", excerpt: "Lưu Niên cho biết vận may năm đó, cách xem và ứng dụng." },
    { title: "Tiểu Vận và Nguyệt Vận trong Bát Tự", excerpt: "Các chu kỳ nhỏ hơn: Tiểu Vận theo tháng, Nguyệt Vận theo ngày." },
    { title: "Thập Thần là gì? 10 loại quan hệ trong Bát Tự", excerpt: "Tìm hiểu Thập Thần: Tỷ Kiên, Kiếp Tài, Thực Thần, Thương Quan..." },
    { title: "Tàng Can trong Địa Chi: Bí mật ẩn giấu", excerpt: "Mỗi Địa Chi ẩn chứa các Thiên Can, gọi là Tàng Can." },
    { title: "Không Vong trong Bát Tự là gì?", excerpt: "Không Vong là khái niệm đặc biệt, ảnh hưởng đến sức mạnh của sao." },
    { title: "Thần Sát trong Bát Tự: Các sao đặc biệt", excerpt: "Tìm hiểu về các Thần Sát như Thiên Ất Quý Nhân, Văn Xương..." },
    { title: "Âm Dương trong Bát Tự và Ngũ Hành", excerpt: "Khái niệm Âm Dương áp dụng vào Thiên Can và Địa Chi." },
    { title: "Lịch Can Chi: Cách đổi từ dương lịch", excerpt: "Hướng dẫn chuyển đổi ngày dương lịch sang ngày Can Chi." }
];

khaiNiem.forEach((a) => {
    articles.push({
        title: a.title,
        slug: toSlug(a.title),
        excerpt: a.excerpt,
        content: generateRichContent(a.title, a.excerpt, 'khai-niem'),
        thumbnail: '/images/articles/bazi_concept.png',
        category_slug: 'khai-niem',
        author: 'Huyền Cơ Bát Tự',
        is_featured: articles.length === 0,
        is_published: true
    });
});

// Category: Cách luận giải (20 articles)
const cachLuan = [
    { title: "Cách đọc lá số Bát Tự cho người mới bắt đầu", excerpt: "Hướng dẫn từng bước đọc và phân tích một lá số Bát Tự cơ bản." },
    { title: "Phân tích Nhật Chủ: Bước đầu tiên đọc lá số", excerpt: "Cách xác định đặc điểm của Nhật Chủ và sức mạnh của nó." },
    { title: "Cách xác định Thân Vượng hay Thân Nhược", excerpt: "Phương pháp đánh giá sức mạnh Nhật Chủ qua Nguyệt Lệnh." },
    { title: "Luận Thập Thần trong lá số Bát Tự", excerpt: "Cách phân tích từng Thập Thần và ý nghĩa của chúng." },
    { title: "Xem quan hệ Hợp - Xung trong Bát Tự", excerpt: "Các mối quan hệ đặc biệt giữa Can Chi và ảnh hưởng." },
    { title: "Thiên Hợp và Địa Hợp: Khi nào xảy ra?", excerpt: "Giải thích hiện tượng Thiên Hợp (Can hợp) và Địa Hợp (Chi hợp)." },
    { title: "Lục Hợp Địa Chi: Ý nghĩa và ứng dụng", excerpt: "6 cặp Địa Chi hợp nhau và ý nghĩa trong lá số." },
    { title: "Tam Hợp Cục: Khi 3 Chi tạo thành cục", excerpt: "Thân-Tý-Thìn hợp Thủy, Dần-Ngọ-Tuất hợp Hỏa..." },
    { title: "Lục Xung trong Bát Tự: Dấu hiệu biến động", excerpt: "6 cặp Địa Chi xung nhau và tác động đến cuộc sống." },
    { title: "Hình - Hại - Phá trong Địa Chi", excerpt: "Các mối quan hệ tiêu cực khác ngoài Xung trong Bát Tự." },
    { title: "Cách xác định Dụng Thần chính xác", excerpt: "Phương pháp tìm Dụng Thần dựa trên cách cục và thân vượng/nhược." },
    { title: "Luận Đại Vận: Xem vận hạn 10 năm", excerpt: "Cách tính và phân tích Đại Vận cho nam và nữ mệnh." },
    { title: "Kết hợp Đại Vận và Lưu Niên", excerpt: "Phương pháp xem vận hạn khi Đại Vận gặp Lưu Niên." },
    { title: "Cách cục đặc biệt: Tòng Cách", excerpt: "Khi Nhật Chủ quá yếu, lá số có thể theo Tòng Cách." },
    { title: "Cách cục Kiến Lộc: Đặc điểm và luận giải", excerpt: "Phân tích lá số có cách cục Kiến Lộc Cách." },
    { title: "Cách cục Thương Quan Bội Ấn", excerpt: "Một trong những cách cục quý hiếm trong Bát Tự." },
    { title: "Luận về Tài Tinh trong lá số", excerpt: "Tài tinh đại diện cho tiền bạc, cách xem giàu nghèo." },
    { title: "Luận về Quan Tinh trong lá số", excerpt: "Quan tinh liên quan đến sự nghiệp, công danh." },
    { title: "Phân tích Ấn Tinh: Mẹ, học vấn và trí tuệ", excerpt: "Ấn tinh trong Bát Tự và các ý nghĩa quan trọng." },
    { title: "Thực Thần và Thương Quan: Đặc điểm khác biệt", excerpt: "So sánh hai loại thần liên quan đến tài năng, sáng tạo." }
];

cachLuan.forEach((a) => {
    articles.push({
        title: a.title,
        slug: toSlug(a.title),
        excerpt: a.excerpt,
        content: generateRichContent(a.title, a.excerpt, 'cach-luan'),
        thumbnail: '/images/articles/bazi_interpretation.png',
        category_slug: 'cach-luan',
        author: 'Huyền Cơ Bát Tự',
        is_featured: false,
        is_published: true
    });
});

// Category: Ngũ Hành (20 articles)  
const nguHanh = [
    { title: "Ngũ Hành là gì? Kim Mộc Thủy Hỏa Thổ", excerpt: "Tổng quan về 5 yếu tố cơ bản cấu thành vạn vật." },
    { title: "Ngũ Hành Tương Sinh: Quy luật nuôi dưỡng", excerpt: "Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc." },
    { title: "Ngũ Hành Tương Khắc: Quy luật chế ngự", excerpt: "Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, Kim khắc Mộc." },
    { title: "Mệnh Kim: Đặc điểm và tính cách", excerpt: "Người mệnh Kim có tính cách quyết đoán, cứng rắn." },
    { title: "Mệnh Mộc: Đặc điểm và tính cách", excerpt: "Người mệnh Mộc thường nhân hậu, có tinh thần cầu tiến." },
    { title: "Mệnh Thủy: Đặc điểm và tính cách", excerpt: "Người mệnh Thủy thông minh, linh hoạt, dễ thích nghi." },
    { title: "Mệnh Hỏa: Đặc điểm và tính cách", excerpt: "Người mệnh Hỏa nhiệt tình, năng động, hướng ngoại." },
    { title: "Mệnh Thổ: Đặc điểm và tính cách", excerpt: "Người mệnh Thổ trung thực, đáng tin cậy, ổn định." },
    { title: "Ngũ Hành và Màu sắc may mắn", excerpt: "Mỗi hành tương ứng với các màu sắc hỗ trợ vận mệnh." },
    { title: "Ngũ Hành và Hướng nhà phù hợp", excerpt: "Chọn hướng nhà, hướng bàn làm việc theo Ngũ Hành." },
    { title: "Ngũ Hành và Nghề nghiệp phù hợp", excerpt: "Mỗi hành có những ngành nghề tương ứng." },
    { title: "Ngũ Hành trong ẩm thực và sức khỏe", excerpt: "Ăn uống cân bằng Ngũ Hành để khỏe mạnh." },
    { title: "Ngũ Hành và các con số may mắn", excerpt: "Số may mắn theo từng hành trong Bát Tự." },
    { title: "Cách bổ sung Ngũ Hành thiếu", excerpt: "Phương pháp bù đắp hành thiếu trong lá số." },
    { title: "Ngũ Hành và mối quan hệ xã hội", excerpt: "Tương sinh tương khắc áp dụng trong giao tiếp." },
    { title: "Ngũ Hành Nạp Âm là gì?", excerpt: "Tìm hiểu về Ngũ Hành Nạp Âm khác với Ngũ Hành thường." },
    { title: "60 Giáp Tý và Ngũ Hành Nạp Âm", excerpt: "Bảng tra cứu Ngũ Hành Nạp Âm theo năm sinh." },
    { title: "Hành Kim trong Bát Tự: Phân tích chi tiết", excerpt: "Các Thiên Can Địa Chi thuộc hành Kim và đặc điểm." },
    { title: "Hành Thủy trong Bát Tự: Phân tích chi tiết", excerpt: "Các Thiên Can Địa Chi thuộc hành Thủy và đặc điểm." },
    { title: "Cân bằng Ngũ Hành trong lá số", excerpt: "Tầm quan trọng của sự cân bằng và cách đạt được." }
];

nguHanh.forEach((a) => {
    articles.push({
        title: a.title,
        slug: toSlug(a.title),
        excerpt: a.excerpt,
        content: generateRichContent(a.title, a.excerpt, 'ngu-hanh'),
        thumbnail: '/images/articles/bazi_elements.png',
        category_slug: 'ngu-hanh',
        author: 'Huyền Cơ Bát Tự',
        is_featured: false,
        is_published: true
    });
});

// Category: Thiên Can - Địa Chi (20 articles)
const canChi = [
    { title: "Giáp (甲): Thiên Can Dương Mộc", excerpt: "Đặc điểm của Thiên Can Giáp và ý nghĩa làm Nhật Chủ." },
    { title: "Ất (乙): Thiên Can Âm Mộc", excerpt: "Đặc điểm của Thiên Can Ất và ý nghĩa làm Nhật Chủ." },
    { title: "Bính (丙): Thiên Can Dương Hỏa", excerpt: "Đặc điểm của Thiên Can Bính - Mặt Trời trong Bát Tự." },
    { title: "Đinh (丁): Thiên Can Âm Hỏa", excerpt: "Đặc điểm của Thiên Can Đinh - Ngọn lửa trong Bát Tự." },
    { title: "Mậu (戊): Thiên Can Dương Thổ", excerpt: "Đặc điểm của Thiên Can Mậu - Núi non, đất đai." },
    { title: "Kỷ (己): Thiên Can Âm Thổ", excerpt: "Đặc điểm của Thiên Can Kỷ - Đất vườn, ruộng nương." },
    { title: "Canh (庚): Thiên Can Dương Kim", excerpt: "Đặc điểm của Thiên Can Canh - Kim loại cứng." },
    { title: "Tân (辛): Thiên Can Âm Kim", excerpt: "Đặc điểm của Thiên Can Tân - Vàng bạc, trang sức." },
    { title: "Nhâm (壬): Thiên Can Dương Thủy", excerpt: "Đặc điểm của Thiên Can Nhâm - Sông ngòi, biển cả." },
    { title: "Quý (癸): Thiên Can Âm Thủy", excerpt: "Đặc điểm của Thiên Can Quý - Mưa, sương, suối nguồn." },
    { title: "Địa Chi Tý (子): Chuột và tháng 11", excerpt: "Đặc điểm của Tý trong Bát Tự, tháng Tý, giờ Tý." },
    { title: "Địa Chi Sửu (丑): Trâu và tháng 12", excerpt: "Đặc điểm của Sửu trong Bát Tự và các ứng dụng." },
    { title: "Địa Chi Dần (寅): Hổ và tháng Giêng", excerpt: "Đặc điểm của Dần - khởi đầu mùa Xuân." },
    { title: "Địa Chi Mão (卯): Mèo và tháng 2", excerpt: "Đặc điểm của Mão trong Bát Tự." },
    { title: "Địa Chi Thìn (辰): Rồng và tháng 3", excerpt: "Đặc điểm của Thìn - Chi duy nhất là linh vật." },
    { title: "Địa Chi Tỵ (巳): Rắn và tháng 4", excerpt: "Đặc điểm của Tỵ trong Bát Tự." },
    { title: "Địa Chi Ngọ (午): Ngựa và tháng 5", excerpt: "Đặc điểm của Ngọ - giữa mùa Hạ." },
    { title: "Địa Chi Mùi (未): Dê và tháng 6", excerpt: "Đặc điểm của Mùi trong Bát Tự." },
    { title: "Địa Chi Thân (申): Khỉ và tháng 7", excerpt: "Đặc điểm của Thân - khởi đầu mùa Thu." },
    { title: "Địa Chi Dậu (酉): Gà và tháng 8", excerpt: "Đặc điểm của Dậu trong Bát Tự." }
];

canChi.forEach((a) => {
    articles.push({
        title: a.title,
        slug: toSlug(a.title),
        excerpt: a.excerpt,
        content: generateRichContent(a.title, a.excerpt, 'can-chi'),
        thumbnail: '/images/articles/bazi_canchi.png',
        category_slug: 'can-chi',
        author: 'Huyền Cơ Bát Tự',
        is_featured: false,
        is_published: true
    });
});

// Category: Ứng dụng thực tế (20 articles)
const ungDung = [
    { title: "Xem Bát Tự chọn ngày cưới hỏi", excerpt: "Phương pháp chọn ngày tốt cho hôn nhân dựa trên lá số." },
    { title: "Bát Tự và việc chọn nghề nghiệp phù hợp", excerpt: "Cách xác định nghề nghiệp hợp mệnh từ lá số Bát Tự." },
    { title: "Xem Bát Tự dự đoán tình duyên", excerpt: "Phân tích cung phu thê, duyên phận trong lá số." },
    { title: "Bát Tự và sức khỏe: Dự báo bệnh tật", excerpt: "Ngũ Hành mất cân bằng dẫn đến các vấn đề sức khỏe." },
    { title: "Xem Bát Tự chọn hướng nhà phù hợp", excerpt: "Phong thủy kết hợp Bát Tự để chọn hướng cát lợi." },
    { title: "Bát Tự và tài vận: Xem giàu nghèo", excerpt: "Phân tích Tài Tinh để dự đoán khả năng làm giàu." },
    { title: "Xem Bát Tự cho con cái: Hiểu con bạn hơn", excerpt: "Phân tích lá số để hiểu tính cách và tiềm năng của con." },
    { title: "Bát Tự và hợp tuổi trong hôn nhân", excerpt: "Xem sự tương hợp giữa hai lá số trong tình cảm." },
    { title: "Xem Bát Tự năm Giáp Thìn 2024", excerpt: "Dự báo vận thế năm Giáp Thìn cho các Nhật Chủ." },
    { title: "Bát Tự giúp chọn thời điểm kinh doanh", excerpt: "Xác định thời điểm thuận lợi để khởi nghiệp." },
    { title: "Xem Bát Tự để chọn đối tác làm ăn", excerpt: "Phân tích sự tương hợp trong hợp tác kinh doanh." },
    { title: "Bát Tự và du học: Xem hướng xuất ngoại", excerpt: "Phân tích khả năng du học, định cư nước ngoài." },
    { title: "Xem Bát Tự chọn xe ô tô hợp mệnh", excerpt: "Màu xe, biển số phù hợp với Ngũ Hành." },
    { title: "Bát Tự và đầu tư bất động sản", excerpt: "Thời điểm và hướng đất phù hợp để mua nhà." },
    { title: "Xem Bát Tự trong tuyển dụng nhân sự", excerpt: "Ứng dụng Bát Tự để đánh giá ứng viên." },
    { title: "Bát Tự và đặt tên cho con", excerpt: "Chọn tên có bộ thủ bổ sung Ngũ Hành cần thiết." },
    { title: "Xem Bát Tự dự đoán thăng tiến", excerpt: "Phân tích Quan Tinh để xem cơ hội thăng chức." },
    { title: "Bát Tự và chuyển công việc", excerpt: "Thời điểm nào nên nhảy việc, thay đổi sự nghiệp." },
    { title: "Xem Bát Tự giải hạn năm không tốt", excerpt: "Phương pháp hóa giải khi gặp năm xung khắc." },
    { title: "Câu hỏi thường gặp về Bát Tự", excerpt: "Giải đáp các thắc mắc phổ biến về xem Bát Tự." }
];

ungDung.forEach((a) => {
    articles.push({
        title: a.title,
        slug: toSlug(a.title),
        excerpt: a.excerpt,
        content: generateRichContent(a.title, a.excerpt, 'ung-dung'),
        thumbnail: '/images/articles/bazi_practical.png',
        category_slug: 'ung-dung',
        author: 'Huyền Cơ Bát Tự',
        is_featured: false,
        is_published: true
    });
});

module.exports = articles;
