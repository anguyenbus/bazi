/**
 * Cung Thông Bảo Giám Data - The Grandmaster Manual of Seasonal Balance
 * 
 * This module contains classical interpretations based on the Day Stem and Month Branch.
 */

const DATA = {
    '甲_寅': "Giáp mộc tháng Giêng, đầu xuân vẫn còn dư hàn, được Bính Quý gặp nhau thì phú quý song toàn. Quý tàng Bính thấu gọi là 'hàn mộc hướng dương', chủ đại phú quý. Nếu phong thủy không bằng cũng không mất danh nho lâm tuấn tú. Nếu không có Bính Quý là người bình thường. Bính là trọng yếu, Quý có thể ở Sửu hoặc Thủy đều được.",
    '甲_卯': "Giáp mộc tháng Hai, Canh Kim đắc sở gọi là 'Dương Nhận giá Sát', có thể nói là quý nhỏ, hiển đạt dị lộ, hoặc chủ võ chức, nhưng phải có Tài giúp đỡ. Trong trụ gặp Tài thì anh hùng áp đảo vạn người. Nếu thấy Quý Thủy làm khốn Tài Sát, chủ là kẻ khốn cùng, trọng Nhận tất gặp hung. Tính tình hung bạo.",
    '甲_辰': "Giáp mộc tháng Ba, khí mộc sắp cạn. Trước hết lấy Canh Kim, sau dùng Nhâm Thủy. Canh Nhâm cùng thấu thì bảng vàng có tên. Nhưng phải vận dụng tương sinh, phong thủy âm đức mới mong phú quý. Hoặc thấy một hai Canh Kim, chuyên lấy Nhâm Thủy. Nhâm thấu là người thanh tú, tài học tất giàu.",
    '甲_巳': "Giáp mộc tháng Tư, khí thoái, Bính Hỏa nắm quyền, trước hết lấy Quý sau dùng Đinh, lại cần phải có Canh thấu. Canh Kim quá nhiều thì Giáp trái lại bị bệnh. Nếu được Nhâm Thủy mới phối hợp được trung hòa, người này tính cách thanh cao, giả trang phú quý.",
    '甲_午': "Giáp mộc tháng Năm, tính Mộc hư tiêu. Dùng Quý trước sau đến Đinh, Canh Kim thứ chi. Tam phục sinh hàn, Đinh Hỏa thoái khí. Trước Đinh sau Canh, không Quý cũng được. Hoặc tháng năm thiếu Quý, dùng Đinh cũng được, cần vận hành đến phương Bắc mới tốt. Quý Canh cùng thấu là thượng cách.",
    '甲_未': "Giáp mộc tháng Sáu, tính Mộc hư tiêu. Mộc thịnh dùng Đinh trước. Đinh Canh cùng thấu là thượng cách. Dụng thần đã thấu, Mộc Hỏa thông minh, tự nhiên phú quý. Hoặc Đinh nhiều Canh ít, lại là người bình thường; hoặc một Canh một Đinh, định sẽ thành danh.",
    '甲_申': "Giáp mộc tháng Bảy, tính mộc khô héo, Kim Thổ thừa vượng, dùng Đinh trước sau đến Canh, Đinh Canh đầy đủ sẽ biến Giáp thành vũ khí sắc bén. Canh lộc tại Thân, Sát Ấn tương sinh, vận hành Kim Thủy, thân cận minh quân. Hoặc Canh thấu không Đinh, chỉ giàu mà thôi, chủ người lo toan quá nặng.",
    '甲_酉': "Giáp mộc tháng Tám, Mộc tù Kim vượng. Đinh Hỏa hàng đầu, thứ đến dùng Bính Hỏa, Canh Kim sau nữa. Một Đinh một Canh, khoa giáp định hiển. Quý Thủy thấu ra thì khoa giáp không toàn. Bính Đinh hoàn toàn không có là mệnh tăng đạo.",
    '甲_戌': "Giáp mộc tháng Chín, mộc tinh điêu linh, duy nhất thích Đinh Hỏa, Nhâm Quý nuôi dưỡng, Đinh Nhâm Quý cùng thấu, Mậu Kỷ cũng thấu, mệnh này phối hợp trung hòa, có thể đỗ bảng vàng. Canh Kim đắc sở chắc chắn khoa giáp. Nếu thấy một hai Tỷ Kiên không có Canh chế là người thường.",
    '甲_亥': "Giáp mộc tháng Mười, Canh Đinh là trọng yếu, Bính Hỏa thứ chi. Kỵ Nhâm Thủy ngập thân, phải có Mậu Thổ chế ngự. Nếu Canh Đinh cùng thấu lại có Mậu xuất can gọi là khử trọc lưu thanh, phú quý cực điểm.",
    '甲_子': "Giáp mộc tháng Mười Một, tính mộc sinh hàn, dùng Đinh trước Canh sau, Bính Hỏa hỗ trợ. Quý Thủy nắm quyền là bệnh của Hỏa Kim. Canh Đinh cùng thấu, chi thấy Tỵ Dần thì khoa giáp có chuẩn. Nếu Quý thấu thương Đinh là người tàn tật.",
    '甲_丑': "Giáp mộc tháng Chạp, trời lạnh khí đóng băng, tính mộc cực hàn, không có tượng sinh phát, trước hết dùng Canh gọt Giáp mới dẫn được Đinh Hỏa bắt đầu có tượng mộc hỏa thông minh. Canh Đinh cùng thấu, khoa giáp ơn phong.",
    // Adding more for Yi (Ất)
    '乙_寅': "Ất mộc tháng Giêng, phải dùng Bính sưởi ấm vì thời tiết vẫn còn dư hàn, không có Bính không sưởi ấm được. Bính Quý cùng thấu, khoa giáp định nhiên. Hoặc có Bính không Quý thì môn hộ rạng rỡ.",
    '乙_卯': "Ất mộc tháng Hai, Dương khí dần tăng, Mộc không lạnh nữa, lấy Bính làm Quân, Quý làm Thần, Bính Quý cùng thấu, không thấu Canh Kim là đại phú đại quý.",
    '乙_午': "Ất mộc tháng Năm, Đinh Hỏa nắm quyền, lúa mạ đều hạn hán. Quý Thủy thiết kỵ Mậu Kỷ tạp loạn. Quý thấu có căn thì phú quý song toàn. Nếu thấy Bính thấu, chi thành Hỏa cục làm khô rễ mộc, người này tàn tật.",
    // ... add more as needed, but I'll provide a framework for the module.
};

module.exports = {
    DATA
};
