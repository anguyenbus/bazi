/**
 * Extended Ganzhi Data - Complete data from Python ganzhi.py
 * This file contains all the additional data structures for BaZi analysis
 */

// ========================================
// TEMPS - Nhiệt độ Can Chi
// ========================================
const TEMPS = {
    '甲': 3, '乙': 1, '丙': 6, '丁': 4, '戊': 5, '己': -4, '庚': -1, '辛': -3, '壬': -5, '癸': -6,
    '子': -6, '丑': -4, '寅': 3, '卯': 1, '辰': -4, '巳': 5, '午': 6, '未': 3, '申': -2, '酉': -3, '戌': 4, '亥': -5
};

// ========================================
// ZHI_TIME - Giờ sinh tương ứng Chi
// ========================================
const ZHI_TIME = {
    '子': '23-1', '丑': '1-3', '寅': '3-5', '卯': '5-7', '辰': '7-9',
    '巳': '9-11', '午': '11-13', '未': '13-15', '申': '15-17', '酉': '17-19',
    '戌': '19-21', '亥': '21-23'
};

// ========================================
// DATOUXIU / XIAOTOUXIU - Đầu Tú
// ========================================
const DATOUXIU = ['壬子', '癸丑', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉'];
const XIAOTOUXIU = ['壬午', '癸未', '庚子', '辛丑', '戊子', '己丑'];

// ========================================
// TEN_DEITIES - Thập Thần đầy đủ cho từng Thiên Can
// Bao gồm: Thập Thần với các Can khác, Vòng Trường Sinh với các Chi, và các thuộc tính đặc biệt
// ========================================
const TEN_DEITIES = {
    '甲': {
        thap_than: { '甲': 'Tỉ', '乙': 'Kiếp', '丙': 'Thực', '丁': 'Thương', '戊': 'Tài-', '己': 'Tài+', '庚': 'Sát', '辛': 'Quan', '壬': 'Kiêu', '癸': 'Ấn' },
        trang_sinh: { '子': 'M.Dục', '丑': 'Q.Đới', '寅': 'L.Quan', '卯': 'Đ.Vượng', '辰': 'Suy', '巳': 'Bệnh', '午': 'Tử', '未': 'Mộ', '申': 'Tuyệt', '酉': 'Thai', '戌': 'Dưỡng', '亥': 'Tr.Sinh' },
        kho: 'Mùi', hanh: 'Mộc', khac: 'Thổ', bi_khac: 'Kim', sinh_me: 'Thủy', sinh: 'Hỏa', hop: '己', xung: '庚'
    },
    '乙': {
        thap_than: { '甲': 'Kiếp', '乙': 'Tỉ', '丙': 'Thương', '丁': 'Thực', '戊': 'Tài+', '己': 'Tài-', '庚': 'Quan', '辛': 'Sát', '壬': 'Ấn', '癸': 'Kiêu' },
        trang_sinh: { '子': 'Bệnh', '丑': 'Suy', '寅': 'Đ.Vượng', '卯': 'L.Quan', '辰': 'Q.Đới', '巳': 'M.Dục', '午': 'Tr.Sinh', '未': 'Dưỡng', '申': 'Thai', '酉': 'Tuyệt', '戌': 'Mộ', '亥': 'Tử' },
        kho: 'Mùi', hanh: 'Mộc', khac: 'Thổ', bi_khac: 'Kim', sinh_me: 'Thủy', sinh: 'Hỏa', hop: '庚', xung: '辛'
    },
    '丙': {
        thap_than: { '丙': 'Tỉ', '丁': 'Kiếp', '戊': 'Thực', '己': 'Thương', '庚': 'Tài-', '辛': 'Tài+', '壬': 'Sát', '癸': 'Quan', '甲': 'Kiêu', '乙': 'Ấn' },
        trang_sinh: { '子': 'Thai', '丑': 'Dưỡng', '寅': 'Tr.Sinh', '卯': 'M.Dục', '辰': 'Q.Đới', '巳': 'L.Quan', '午': 'Đ.Vượng', '未': 'Suy', '申': 'Bệnh', '酉': 'Tử', '戌': 'Mộ', '亥': 'Tuyệt' },
        kho: 'Tuất', hanh: 'Hỏa', khac: 'Kim', bi_khac: 'Thủy', sinh_me: 'Mộc', sinh: 'Thổ', hop: '辛', xung: '壬'
    },
    '丁': {
        thap_than: { '丙': 'Kiếp', '丁': 'Tỉ', '戊': 'Thương', '己': 'Thực', '庚': 'Tài+', '辛': 'Tài-', '壬': 'Quan', '癸': 'Sát', '甲': 'Ấn', '乙': 'Kiêu' },
        trang_sinh: { '子': 'Tuyệt', '丑': 'Mộ', '寅': 'Tử', '卯': 'Bệnh', '辰': 'Suy', '巳': 'Đ.Vượng', '午': 'L.Quan', '未': 'Q.Đới', '申': 'M.Dục', '酉': 'Tr.Sinh', '戌': 'Dưỡng', '亥': 'Thai' },
        kho: 'Tuất', hanh: 'Hỏa', khac: 'Kim', bi_khac: 'Thủy', sinh_me: 'Mộc', sinh: 'Thổ', hop: '壬', xung: '癸'
    },
    '戊': {
        thap_than: { '戊': 'Tỉ', '己': 'Kiếp', '庚': 'Thực', '辛': 'Thương', '壬': 'Tài-', '癸': 'Tài+', '甲': 'Sát', '乙': 'Quan', '丙': 'Kiêu', '丁': 'Ấn' },
        trang_sinh: { '子': 'Thai', '丑': 'Dưỡng', '寅': 'Tr.Sinh', '卯': 'M.Dục', '辰': 'Q.Đới', '巳': 'L.Quan', '午': 'Đ.Vượng', '未': 'Suy', '申': 'Bệnh', '酉': 'Tử', '戌': 'Mộ', '亥': 'Tuyệt' },
        kho: 'Thìn', hanh: 'Thổ', khac: 'Thủy', bi_khac: 'Mộc', sinh_me: 'Hỏa', sinh: 'Kim', hop: '癸', xung: ''
    },
    '己': {
        thap_than: { '戊': 'Kiếp', '己': 'Tỉ', '庚': 'Thương', '辛': 'Thực', '壬': 'Tài-', '癸': 'Tài+', '甲': 'Quan', '乙': 'Sát', '丙': 'Ấn', '丁': 'Kiêu' },
        trang_sinh: { '子': 'Tuyệt', '丑': 'Mộ', '寅': 'Tử', '卯': 'Bệnh', '辰': 'Suy', '巳': 'Đ.Vượng', '午': 'L.Quan', '未': 'Q.Đới', '申': 'M.Dục', '酉': 'Tr.Sinh', '戌': 'Dưỡng', '亥': 'Thai' },
        kho: 'Thìn', hanh: 'Thổ', khac: 'Thủy', bi_khac: 'Mộc', sinh_me: 'Hỏa', sinh: 'Kim', hop: '甲', xung: ''
    },
    '庚': {
        thap_than: { '庚': 'Tỉ', '辛': 'Kiếp', '壬': 'Thực', '癸': 'Thương', '甲': 'Tài+', '乙': 'Tài-', '丙': 'Sát', '丁': 'Quan', '戊': 'Kiêu', '己': 'Ấn' },
        trang_sinh: { '子': 'Tử', '丑': 'Mộ', '寅': 'Tuyệt', '卯': 'Thai', '辰': 'Dưỡng', '巳': 'Tr.Sinh', '午': 'M.Dục', '未': 'Q.Đới', '申': 'L.Quan', '酉': 'Đ.Vượng', '戌': 'Suy', '亥': 'Bệnh' },
        kho: 'Sửu', hanh: 'Kim', khac: 'Mộc', bi_khac: 'Hỏa', sinh_me: 'Thổ', sinh: 'Thủy', hop: '乙', xung: '甲'
    },
    '辛': {
        thap_than: { '庚': 'Kiếp', '辛': 'Tỉ', '壬': 'Thương', '癸': 'Thực', '甲': 'Tài-', '乙': 'Tài+', '丙': 'Quan', '丁': 'Sát', '戊': 'Ấn', '己': 'Kiêu' },
        trang_sinh: { '子': 'Tr.Sinh', '丑': 'Dưỡng', '寅': 'Thai', '卯': 'Tuyệt', '辰': 'Mộ', '巳': 'Tử', '午': 'Bệnh', '未': 'Suy', '申': 'Đ.Vượng', '酉': 'L.Quan', '戌': 'Q.Đới', '亥': 'M.Dục' },
        kho: 'Sửu', hanh: 'Kim', khac: 'Mộc', bi_khac: 'Hỏa', sinh_me: 'Thổ', sinh: 'Thủy', hop: '丙', xung: '丁'
    },
    '壬': {
        thap_than: { '壬': 'Tỉ', '癸': 'Kiếp', '甲': 'Thực', '乙': 'Thương', '丙': 'Tài+', '丁': 'Tài-', '戊': 'Sát', '己': 'Quan', '庚': 'Kiêu', '辛': 'Ấn' },
        trang_sinh: { '子': 'Đ.Vượng', '丑': 'Suy', '寅': 'Bệnh', '卯': 'Tử', '辰': 'Mộ', '巳': 'Tuyệt', '午': 'Thai', '未': 'Dưỡng', '申': 'Tr.Sinh', '酉': 'M.Dục', '戌': 'Q.Đới', '亥': 'L.Quan' },
        kho: 'Thìn', hanh: 'Thủy', khac: 'Hỏa', bi_khac: 'Thổ', sinh_me: 'Kim', sinh: 'Mộc', hop: '丁', xung: '丙'
    },
    '癸': {
        thap_than: { '壬': 'Kiếp', '癸': 'Tỉ', '甲': 'Thương', '乙': 'Thực', '丙': 'Tài-', '丁': 'Tài+', '戊': 'Quan', '己': 'Sát', '庚': 'Ấn', '辛': 'Kiêu' },
        trang_sinh: { '子': 'L.Quan', '丑': 'Q.Đới', '寅': 'M.Dục', '卯': 'Tr.Sinh', '辰': 'Dưỡng', '巳': 'Thai', '午': 'Tuyệt', '未': 'Mộ', '申': 'Tử', '酉': 'Bệnh', '戌': 'Suy', '亥': 'Đ.Vượng' },
        kho: 'Thìn', hanh: 'Thủy', khac: 'Hỏa', bi_khac: 'Thổ', sinh_me: 'Kim', sinh: 'Mộc', hop: '戊', xung: '丁'
    }
};

// ========================================
// ZHI_ATTS - Quan hệ Địa Chi đầy đủ
// ========================================
const ZHI_ATTS = {
    '子': { xung: '午', hinh: '卯', bi_hinh: '卯', hop: ['申', '辰'], hoi: ['亥', '丑'], hai: '未', pha: '酉', luc_hop: '丑', am: '' },
    '丑': { xung: '未', hinh: '戌', bi_hinh: '未', hop: ['巳', '酉'], hoi: ['子', '亥'], hai: '午', pha: '辰', luc_hop: '子', am: '寅' },
    '寅': { xung: '申', hinh: '巳', bi_hinh: '申', hop: ['午', '戌'], hoi: ['卯', '辰'], hai: '巳', pha: '亥', luc_hop: '亥', am: '丑' },
    '卯': { xung: '酉', hinh: '子', bi_hinh: '子', hop: ['未', '亥'], hoi: ['寅', '辰'], hai: '辰', pha: '午', luc_hop: '戌', am: '申' },
    '辰': { xung: '戌', hinh: '辰', bi_hinh: '辰', hop: ['子', '申'], hoi: ['寅', '卯'], hai: '卯', pha: '丑', luc_hop: '酉', am: '' },
    '巳': { xung: '亥', hinh: '申', bi_hinh: '寅', hop: ['酉', '丑'], hoi: ['午', '未'], hai: '寅', pha: '申', luc_hop: '申', am: '' },
    '午': { xung: '子', hinh: '午', bi_hinh: '午', hop: ['寅', '戌'], hoi: ['巳', '未'], hai: '丑', pha: '卯', luc_hop: '未', am: '亥' },
    '未': { xung: '丑', hinh: '丑', bi_hinh: '戌', hop: ['卯', '亥'], hoi: ['巳', '午'], hai: '子', pha: '戌', luc_hop: '午', am: '' },
    '申': { xung: '寅', hinh: '寅', bi_hinh: '巳', hop: ['子', '辰'], hoi: ['酉', '戌'], hai: '亥', pha: '巳', luc_hop: '巳', am: '卯' },
    '酉': { xung: '卯', hinh: '酉', bi_hinh: '酉', hop: ['巳', '丑'], hoi: ['申', '戌'], hai: '戌', pha: '子', luc_hop: '辰', am: '' },
    '戌': { xung: '辰', hinh: '未', bi_hinh: '丑', hop: ['午', '寅'], hoi: ['申', '酉'], hai: '酉', pha: '未', luc_hop: '卯', am: '' },
    '亥': { xung: '巳', hinh: '亥', bi_hinh: '亥', hop: ['卯', '未'], hoi: ['子', '丑'], hai: '申', pha: '寅', luc_hop: '寅', am: '午' }
};

// ========================================
// GAN_HES - Thiên Can Ngũ Hợp
// ========================================
const GAN_HES = {
    '甲己': { name: 'Trung Chính chi hợp', hoa: 'Thổ', desc: 'Tôn sùng trọng đại, khoan hậu bình trực. Nếu mang Sát mà Ngũ hành vô khí thì đa sân hiếu nộ, tính ngạnh bất khả khuất.' },
    '乙庚': { name: 'Nhân Nghĩa chi hợp', hoa: 'Kim', desc: 'Quả cảm hữu thủ, bất hoặc nhu nịnh, chu triền duy Nhân, tiến thoái duy Nghĩa.' },
    '丙辛': { name: 'Uy Chế chi hợp', hoa: 'Thủy', desc: 'Uy nghiêm đoan chính, có sức chế hóa mạnh mẽ.' },
    '丁壬': { name: 'Dâm Thắc chi hợp', hoa: 'Mộc', desc: 'Tình cảm phong phú, mềm mại uyển chuyển.' },
    '戊癸': { name: 'Vô Tình chi hợp', hoa: 'Hỏa', desc: 'Không tình cảm gắn bó, nhưng hợp hóa mạnh mẽ.' }
};

// ========================================
// GAN_CHONGS - Thiên Can Xung
// ========================================
const GAN_CHONGS = {
    '甲庚': 'Tương xung', '乙辛': 'Tương xung', '丙壬': 'Tương xung', '丁癸': 'Tương xung'
};

// ========================================
// ZHI_6HES - Địa Chi Lục Hợp
// ========================================
const ZHI_6HES = {
    '子丑': 'Thổ', '寅亥': 'Mộc', '卯戌': 'Hỏa', '酉辰': 'Kim', '申巳': 'Thủy', '未午': 'Thổ'
};

// ========================================
// ZHI_3HES - Địa Chi Tam Hợp
// ========================================
const ZHI_3HES = {
    '申子辰': { hoa: 'Thủy', ma: 'Dần' },
    '巳酉丑': { hoa: 'Kim', ma: 'Hợi' },
    '寅午戌': { hoa: 'Hỏa', ma: 'Thân' },
    '亥卯未': { hoa: 'Mộc', ma: 'Tỵ' }
};

// ========================================
// ZHI_HALF_3HES - Bán Tam Hợp
// ========================================
const ZHI_HALF_3HES = {
    '申子': { hoa: 'Thủy', ma: 'Dần' }, '子辰': { hoa: 'Thủy', ma: 'Dần' }, '申辰': { hoa: 'Thủy', ma: 'Dần' },
    '巳酉': { hoa: 'Kim', ma: 'Hợi' }, '酉丑': { hoa: 'Kim', ma: 'Hợi' }, '巳丑': { hoa: 'Kim', ma: 'Hợi' },
    '寅午': { hoa: 'Hỏa', ma: 'Thân' }, '午戌': { hoa: 'Hỏa', ma: 'Thân' }, '寅戌': { hoa: 'Hỏa', ma: 'Thân' },
    '亥卯': { hoa: 'Mộc', ma: 'Tỵ' }, '亥未': { hoa: 'Mộc', ma: 'Tỵ' }, '卯未': { hoa: 'Mộc', ma: 'Tỵ' }
};

// ========================================
// ZHI_HUIS - Địa Chi Tam Hội
// ========================================
const ZHI_HUIS = {
    '亥子丑': 'Thủy', '寅卯辰': 'Mộc', '巳午未': 'Hỏa', '申酉戌': 'Kim'
};

// ========================================
// ZHI_CHONGS - Địa Chi Lục Xung chi tiết
// ========================================
const ZHI_CHONGS = {
    '子午': 'Tương xung - Thủy Hỏa tương khắc',
    '丑未': 'Tương xung - Thổ lệch khí',
    '寅申': 'Tương xung - Mộc Kim tương khắc',
    '卯酉': 'Tương xung - Mộc Kim tương khắc',
    '辰戌': 'Tương xung - Thổ xung Thổ',
    '巳亥': 'Tương xung - Hỏa Thủy tương khắc'
};

// ========================================
// ZHI_POES - Địa Chi Lục Phá
// ========================================
const ZHI_POES = {
    '子酉': 'Tương phá', '午卯': 'Tương phá', '辰丑': 'Tương phá', '戌未': 'Tương phá'
};

// ========================================
// ZHI_HAIES - Địa Chi Lục Hại (chi tiết luận giải)
// ========================================
const ZHI_HAIES = {
    '子未': `Mùi hại Tý là Mùi vượng Thổ, Hợi Tý vượng Thủy, là thế gia tương hại. Cho nên Tý gặp Mùi thì thành hại. Không lợi cho lục thân cốt nhục. Vào Quý cách thì làm lụy thê thiếp, vào Tiện cách thì cô độc không nơi nương tựa.`,
    '丑午': `Ngọ hại Sửu là Ngọ lấy vượng Hỏa lấn Sửu tử Kim, gọi là Quan Quỷ tương hại. Sinh vượng chủ hiếu thắng đa nộ, nghiêm nghị không nhẫn nhịn; tử tuyệt chủ độc hại, thương thảm, khuynh phúc.`,
    '寅巳': `Tương hỗ tương hại. Sinh vượng thì chủ thần khiết mạo tuấn, hảo tranh đoạt, hỉ kích tác; trị tử tuyệt thì đa mưu thiếu thành.`,
    '卯辰': `Mão hại Thìn là Mão lấy vượng Mộc lấn Thìn tử Thổ, đây là lấy thiếu lấn trưởng tương hại. Sinh vượng chủ hiếu thắng đa nộ, nghiêm nghị không nhẫn.`,
    '申亥': `Tương hỗ tương hại. Gọi là cậy vào Lâm Quan, đố kỵ tài năng, tranh tiến tương hại. Sinh vượng chủ thần khiết mạo tuấn, hảo tranh đoạt.`,
    '酉戌': `Tuất hại Dậu là Tuất lấy tử Hỏa hại Dậu vượng Kim, đây là tật đố tương hại. Sinh vượng bất dung vật, đa cương lệ; tử tuyệt cốc hận, tăng thiện đố năng.`
};

// ========================================
// ZHI_XINGS - Địa Chi Tam Hình (chi tiết luận giải)
// ========================================
const ZHI_XINGS = {
    '寅巳': { name: 'Vô ơn chi hình', desc: 'Dần hình Tỵ - Vô ơn chi hình' },
    '巳申': { name: 'Vô ơn chi hình', desc: 'Tỵ hình Thân - Vô ơn chi hình' },
    '申寅': { name: 'Vô ơn chi hình', desc: 'Thân hình Dần - Vô ơn chi hình' },
    '未丑': { name: 'Trì thế chi hình', desc: 'Mùi hình Sửu - Trì thế chi hình' },
    '丑戌': { name: 'Trì thế chi hình', desc: 'Sửu hình Tuất - Trì thế chi hình' },
    '戌未': { name: 'Trì thế chi hình', desc: 'Tuất hình Mùi - Trì thế chi hình' },
    '子卯': { name: 'Vô lễ chi hình', desc: 'Tý hình Mão, Mão hình Tý - Vô lễ chi hình. Nữ mệnh gặp phải càng không tốt. Sinh vượng chủ nhân uy túc, diện vô hòa khí, khí cường tính bạo.' }
};

// Tự Hình
const ZHI_ZIXINGS = ['辰', '午', '酉', '亥'];

// ========================================
// RELATIONS - Ma trận quan hệ Ngũ Hành
// ========================================
const RELATIONS = {
    'Kim_Kim': '=', 'Kim_Mộc': '→', 'Kim_Thủy': '↓', 'Kim_Hỏa': '←', 'Kim_Thổ': '↑',
    'Mộc_Mộc': '=', 'Mộc_Thổ': '→', 'Mộc_Hỏa': '↓', 'Mộc_Kim': '←', 'Mộc_Thủy': '↑',
    'Thủy_Thủy': '=', 'Thủy_Hỏa': '→', 'Thủy_Mộc': '↓', 'Thủy_Thổ': '←', 'Thủy_Kim': '↑',
    'Hỏa_Hỏa': '=', 'Hỏa_Kim': '→', 'Hỏa_Thổ': '↓', 'Hỏa_Thủy': '←', 'Hỏa_Mộc': '↑',
    'Thổ_Thổ': '=', 'Thổ_Thủy': '→', 'Thổ_Kim': '↓', 'Thổ_Mộc': '←', 'Thổ_Hỏa': '↑'
};

// ========================================
// GAN_DESC - Mô tả chi tiết 10 Thiên Can
// ========================================
const GAN_DESC = {
    '甲': 'Lôi Long, Lương Đống, Lộc tại Dần; rìu búa đục đẽo thành đồ dùng. Mộc không chạy về phương Nam; hỷ Xuân vận không hỷ phương Tây, sinh mùa Xuân xử thế an nhiên, tất thọ.',
    '乙': 'Phong, Thụ, Lộc tại Mão. Thủy phiếm Mộc phù, Thu lệnh đại cát.',
    '丙': 'Điện, Dã, Lộc tại Tỵ. Hỏa không hướng về phía Tây.',
    '丁': 'Tinh, Đăng, Lộc tại Ngọ. Hỏa sáng quá tất diệt. Hỷ gặp Thu. Ngày Đinh Tỵ đa khắc cha anh vợ con.',
    '戊': 'Vụ Hà, Sơn, Lộc tại Tỵ. Thổ hư tắc băng. Tứ trụ mang Thủy là thượng cách, Hà Thủy tương huy nhi thành văn thái vậy.',
    '己': 'Nguyên khí vân, Chân Thổ, Lộc tại Ngọ. Hỏa táo Thổ liệt. Trời giáng mưa lành, núi sông xuất mây.',
    '庚': 'Nguyệt, Thiết, Lộc tại Thân. Úy Quý Thủy. Tỵ thành chung đỉnh. Thủy Thổ trầm mai tắc vô thanh. Kim thực vô thanh. Kim chìm đáy nước.',
    '辛': 'Sương, Kim, Lộc tại Dậu. Thổ trọng Kim mai. Người Tân tọa Mão, Mùi thấu Ất, đại phú, tọa Hợi thấu Bính tắc quý. Ái sinh mùa Đông.',
    '壬': 'Thu lộ vân, Trạch, Lộc tại Hợi. Tử thủy hoành lưu.',
    '癸': 'Vũ, Tuyền mạch, Xuân lâm, Lộc tại Tý. Thủy không chảy về hướng Tây. Ngày Quý Mão thấu Kỷ, có vân hành vũ có tài kinh tế vậy. Xuân Hạ cát, Thu Đông bất cát.'
};

// ========================================
// ZHI_DESC - Mô tả chi tiết 12 Địa Chi
// ========================================
const ZHI_DESC = {
    '子': 'Mặc trì, chính Bắc. Giờ hỷ kiến Quý Hợi, gọi là Thủy quy Đại Hải, lại gọi là Song Ngư du Mặc, tất là bậc văn chương sĩ vậy.',
    '丑': 'Liễu ngạn. Người Sửu giờ gặp Kỷ Mùi, là nguyệt chiếu liễu sao, cực kỳ thượng cách.',
    '寅': 'Quảng cốc. Người sinh năm Dần mà giờ Mậu Thìn, gọi là Hổ khiếu nhi Cốc phong sinh, uy trấn vạn dặm.',
    '卯': 'Quỳnh lâm, Ất Mộc, chính Đông, trọng Xuân. Người năm Mão gặp giờ Tỵ Mùi, là tượng Thỏ nhập Nguyệt cung, chủ đại quý.',
    '辰': 'Thảo trạch, thứ phương Đông. Thìn gặp Nhâm Tuất, Quý Hợi là cách Long quy Đại Hải.',
    '巳': 'Đại dịch. Sinh năm Tỵ hỷ đắc giờ Thìn, Xà hóa Thanh Long, ở cách này là thiên lý long câu.',
    '午': 'Phong hầu, phương Nam. Thuộc Hỏa, Thổ, màu sắc đỏ vàng. Giờ lợi gặp Thìn, Chân Long xuất thì Phàm Mã trống không, gọi là Mã hóa Long Câu.',
    '未': 'Hoa viên. Mão nãi Mộc vượng, tự thành lâm lộc; Mùi nãi Mộc khố, như người xây tường bao bảo vệ trăm hoa vậy.',
    '申': 'Danh đô, nơi đế vương cư ngụ. Cung Thân Nhâm Thủy sinh giờ Hợi, là Địa Thiên Giao Thái.',
    '酉': 'Tự chung, chính Tây. Gặp Dần cát, gọi là Chung minh Cốc ứng.',
    '戌': 'Thiêu nguyên. Tuất và Thìn là nơi Quý nhân không tới vậy. Tuất sinh gặp Mão là Xuân nhập thiêu ngân.',
    '亥': 'Huyền hà, tức Thiên Môn. Ngày giờ gặp hai chữ Dần, Thìn, là Thủy củng Lôi Môn.'
};

// ========================================
// GAN_HEALTH - Lời khuyên sức khỏe theo Ngũ Hành
// ========================================
const GAN_HEALTH = {
    'Kim': `Mùa Thu vận tốt. Tháng Thân, tháng Dậu, năm Thân và năm Dậu vận khí khá tốt. 3 giờ chiều đến 7 giờ tối là giờ lành. Hướng Tây là hướng tốt. Ở nhà hướng Tây khá cát lợi. Phòng ngủ ở phía Tây ngôi nhà khá tốt. Giường kim loại có lợi cho sức khỏe. Bàn làm việc hướng Tây giúp tăng hiệu suất. Màu sắc may mắn là màu trắng. Chớ bi thương, chú ý hệ hô hấp, phổi, ruột, gân. Võ thuật, đối kháng, vận động binh khí, tập gym cũng rất tốt.`,
    'Mộc': `Mùa Xuân hoặc thời tiết gió nhẹ vận khí tốt. Tháng Mão, tháng Dần, năm Mão và năm Dần vận khí khá tốt. 3 giờ sáng đến 7 giờ sáng là giờ lành. Hướng Đông là hướng tốt. Giường gỗ có lợi cho sức khỏe. Màu sắc may mắn là màu xanh lá. Uống nhiều đồ uống chua, kỵ tức giận, chú ý hệ thần kinh, gan, mật, đầu vai. Chơi golf, đi dạo công viên, đi bộ trong rừng...`,
    'Thủy': `Sức khỏe cần chú ý: Chân, bàng quan, thận (ví dụ sỏi), uống nhiều nước. Mùa Đông hoặc thời tiết lạnh vận khí tốt. Tháng Hợi, tháng Tý, năm Hợi và năm Tý vận khí khá tốt. 9 giờ tối đến 1 giờ sáng là giờ lành. Hướng Bắc là hướng tốt. Màu sắc may mắn là màu đen. Bơi lội, lặn, trượt tuyết, câu cá, trượt băng...`,
    'Hỏa': `Mùa Hạ hoặc thời tiết nóng vận khí tốt. Tháng Ngọ, tháng Tỵ, năm Ngọ và năm Tỵ vận khí khá tốt. 9 giờ sáng đến 1 giờ chiều là giờ lành. Hướng Nam là hướng tốt. Giường gỗ có lợi cho sức khỏe. Màu sắc may mắn là màu đỏ. Nên cười nhiều, chú ý hệ tim mạch, tuần hoàn máu, mắt, răng. Chơi bóng rổ, tennis, bóng chuyền, đạp xe...`,
    'Thổ': `Thời điểm giao mùa Xuân, Hạ, Thu, Đông vận khí tốt. Tháng Sửu, Thìn, Mùi, Tuất và năm Sửu, Thìn, Mùi, Tuất vận khí khá tốt. Khoảng 2 giờ sáng, 8 giờ sáng và 2 giờ chiều, 8 giờ tối đều là giờ lành. Môi trường sống và khí hậu không nên quá khô hoặc quá ẩm. Phòng ngủ ở giữa ngôi nhà khá tốt. Màu sắc may mắn là màu vàng nâu. Chớ lo lắng quá nhiều. Ít ăn đồ ngọt, chú ý hệ tiêu hóa, tỳ, cơ bắp. Làm vườn, cắm trại, đi bộ...`
};

// ========================================
// SHENGXIAOS - Con Giáp
// ========================================
const SHENGXIAOS = {
    '子': 'Chuột', '丑': 'Trâu', '寅': 'Hổ', '卯': 'Mèo', '辰': 'Rồng', '巳': 'Rắn',
    '午': 'Ngựa', '未': 'Dê', '申': 'Khỉ', '酉': 'Gà', '戌': 'Chó', '亥': 'Lợn'
};

// ========================================
// JU - Cục khí
// ========================================
const JU = {
    '子': 'Thủy', '丑': 'Kim', '寅': 'Hỏa', '卯': 'Mộc', '辰': 'Thủy', '巳': 'Kim',
    '午': 'Hỏa', '未': 'Mộc', '申': 'Thủy', '酉': 'Kim', '戌': 'Hỏa', '亥': 'Mộc',
    'Sinh me': 'Ấn cục', 'Sinh': 'Thực Thương cục', 'Khắc': 'Tài cục',
    'Bị Khắc': 'Quan Sát cục', 'Hành': 'Tỷ Kiếp cục'
};

// ========================================
// KUS - Mộ Khố
// ========================================
const KUS = { '辰': 'Thủy Thổ', '戌': 'Hỏa Thổ', '丑': 'Kim', '未': 'Mộc' };

// ========================================
// JQMC - Tiết Khí
// ========================================
const JQMC = ['Đông Chí', 'Tiểu Hàn', 'Đại Hàn', 'Lập Xuân', 'Vũ Thủy', 'Kinh Trập', 'Xuân Phân', 'Thanh Minh', 'Cốc Vũ', 'Lập Hạ', 'Tiểu Mãn', 'Mang Chủng', 'Hạ Chí', 'Tiểu Thử', 'Đại Thử', 'Lập Thu', 'Xử Thử', 'Bạch Lộ', 'Thu Phân', 'Hàn Lộ', 'Sương Giáng', 'Lập Đông', 'Tiểu Tuyết', 'Đại Tuyết'];

// ========================================
// CHONGS - Xung đối ánh xạ
// ========================================
const CHONGS = {
    '甲': '庚', '庚': '甲', '乙': '辛', '辛': '乙', '丙': '壬', '壬': '丙', '丁': '癸', '癸': '丁',
    '子': '午', '午': '子', '丑': '未', '未': '丑', '寅': '申', '申': '寅', '卯': '酉', '酉': '卯', '辰': '戌', '戌': '辰', '巳': '亥', '亥': '巳'
};

// ========================================
// XINGS - Hình đối ánh xạ
// ========================================
const XINGS = {
    '巳': '寅', '申': '巳', '寅': '申', '丑': '未', '戌': '丑', '未': '戌',
    '子': '卯', '卯': '子', '辰': '辰', '午': '午', '酉': '酉', '亥': '亥'
};

// ========================================
// GUANS - Quan (Official) positions for each Day Master
// ========================================
const GUANS = {
    '甲': ['辛', '酉', '戌', '丑'], '乙': ['庚', '申', '巳'], '丙': ['癸', '丑', '辰'],
    '丁': ['壬', '亥', '申'], '戊': ['乙', '卯', '戌', '未'], '己': ['甲', '寅', '亥'],
    '庚': ['丁', '午', '戌', '未'], '辛': ['丙', '寅', '巳'],
    '壬': ['己', '午', '未', '丑'], '癸': ['戊', '寅', '辰', '巳', '申', '戌']
};

// ========================================
// GAN3 - Luận về Can (từ kinh điển)
// ========================================
const GAN3 = {
    '甲': 'Thiên thượng quý, cô độc thủ không phòng',
    '乙': 'Đa âm tư, hựu yếu bại tổ nghiệp',
    '丙': 'Nhân cô lão, sản trung vong',
    '丁': 'Đa ác tật, thủ túc dã tự thương',
    '戊': 'Tử tùy xuất, ly tổ biệt gia hương',
    '己': 'Biệt phụ mẫu, huynh đệ các nhất phương',
    '庚': 'Tài lang, vạn lý trí điền trang',
    '辛': 'Thọ số trường, tài trệ đa tai lang',
    '壬': 'Gia nghiệp thịnh, hữu phú bất cửu trường',
    '癸': 'Nhất Hợi toàn, liệt hỏa thiêu ốc phòng'
};

// ========================================
// GAN4 - Luận về Can (bản 2)
// ========================================
const GAN4 = {
    '甲': 'Thiếu phu thê', '乙': 'Mệnh tảo vong', '丙': 'Tử tức không',
    '丁': 'Thọ bất trường', '戊': 'Nhân cô hình', '己': 'Nhân trung lương',
    '庚': 'Tha hương tẩu', '辛': 'Thọ hạn trường', '壬': 'Định phú túc', '癸': 'Nhân yểu vong'
};

// ========================================
// ZHI3 - Luận về Chi (từ kinh điển)
// ========================================
const ZHI3 = {
    '子': 'Hôn sự trọng', '丑': 'Tứ phu thê', '寅': 'Thủ cô quả', '卯': 'Hung ác đa',
    '辰': 'Hiếu đấu thương', '巳': 'Tao hình hại', '午': 'Khắc phu thê', '未': 'Thủ không phòng',
    '申': 'Nhân bất túc', '酉': 'Độc cư phòng', '戌': 'Tụng sự đa', '亥': 'Cô khổ lân'
};

// ========================================
// GANZHI60 - 60 Giáp Tý (số thứ tự → cặp Can Chi)
// ========================================
const GANZHI60 = {
    1: '甲子', 13: '丙子', 25: '戊子', 37: '庚子', 49: '壬子', 2: '乙丑', 14: '丁丑', 26: '己丑', 38: '辛丑', 50: '癸丑',
    3: '丙寅', 15: '戊寅', 27: '庚寅', 39: '壬寅', 51: '甲寅', 4: '丁卯', 16: '己卯', 28: '辛卯', 40: '癸卯', 52: '乙卯',
    5: '戊辰', 17: '庚辰', 29: '壬辰', 41: '甲辰', 53: '丙辰', 6: '己巳', 18: '辛巳', 30: '癸巳', 42: '乙巳', 54: '丁巳',
    7: '庚午', 19: '壬午', 31: '甲午', 43: '丙午', 55: '戊午', 8: '辛未', 20: '癸未', 32: '乙未', 44: '丁未', 56: '己未',
    9: '壬申', 21: '甲申', 33: '丙申', 45: '戊申', 57: '庚申', 10: '癸酉', 22: '乙酉', 34: '丁酉', 46: '己酉', 58: '辛酉',
    11: '甲戌', 23: '丙戌', 35: '戊戌', 47: '庚戌', 59: '壬戌', 12: '乙亥', 24: '丁亥', 36: '己亥', 48: '辛亥', 60: '癸亥'
};

// ========================================
// WUHANGS - Ngũ Hành groupings (which Gans/Zhis belong to which element)
// ========================================
const WUHANGS = {
    'Kim': '庚辛申酉', 'Mộc': '甲乙寅卯', 'Thủy': '壬癸子亥', 'Hỏa': '丙丁巳午', 'Thổ': '戊己丑辰未戌'
};

// ========================================
// ZHENGS - Tứ Chính (4 cardinal branches)
// ========================================
const ZHENGS = '子午卯酉';

// ========================================
// GONG_HE / GONG_HUI - Củng Hợp / Củng Hội
// ========================================
const GONG_HE = { '申辰': '子', '巳丑': '酉', '寅戌': '午', '亥未': '卯', '辰申': '子', '丑巳': '酉', '戌寅': '午', '未亥': '卯' };
const GONG_HUI = { '亥丑': '子', '寅辰': '卯', '巳未': '午', '申戌': '酉', '丑亥': '子', '辰寅': '卯', '未巳': '午', '戌申': '酉' };

// ========================================
// JIS - Mùa
// ========================================
const JIS = { 0: 'Đông', 1: 'Xuân', 2: 'Hạ', 3: 'Thu', 4: 'Đông' };

// ========================================
// YMC / RMC - Tên tháng / ngày âm lịch
// ========================================
const YMC = ['Mười một', 'Mười hai', 'Giêng', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười'];
const RMC = ['Mùng một', 'Mùng hai', 'Mùng ba', 'Mùng bốn', 'Mùng năm', 'Mùng sáu', 'Mùng bảy', 'Mùng tám', 'Mùng chín', 'Mùng mười', 'Mười một', 'Mười hai', 'Mười ba', 'Mười bốn', 'Mười lăm', 'Mười sáu', 'Mười bảy', 'Mười tám', 'Mười chín', 'Hai mươi', 'Hai mốt', 'Hai hai', 'Hai ba', 'Hai tư', 'Hai lăm', 'Hai sáu', 'Hai bảy', 'Hai tám', 'Hai chín', 'Ba mươi', 'Ba mốt'];

// ========================================
// NUMCN / WEEK - Số Việt / Thứ trong tuần
// ========================================
const NUMCN = ['Không', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười'];
const WEEK = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

// ========================================
// ZHI5_LIST - Tàng Can danh sách
// ========================================
const ZHI5_LIST = {
    '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'], '卯': ['乙'],
    '辰': ['戊', '乙', '癸'], '巳': ['丙', '戊', '庚'], '午': ['丁', '己'],
    '未': ['己', '丁', '乙'], '申': ['庚', '壬', '戊'], '酉': ['辛'],
    '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲']
};

const XINGXIUS = {
    0: ['角', 'Giác mộc Giao (Tốt)'], 1: ['亢', 'Kháng kim Long (Xấu)'], 2: ['氐', 'Đê thổ Lạc (Xấu)'], 3: ['房', 'Phòng nhật Thố (Tốt)'],
    4: ['心', 'Tâm nguyệt Hồ (Xấu)'], 5: ['尾', 'Vĩ hỏa Hổ (Tốt)'], 6: ['箕', 'Cơ thủy Báo (Tốt)'], 7: ['斗', 'Đẩu mộc Giải (Tốt)'],
    8: ['牛', 'Ngưu kim Ngưu (Xấu)'], 9: ['女', 'Nữ thổ Bức (Xấu)'], 10: ['虚', 'Hư nhật Thử (Xấu)'], 11: ['危', 'Nguy nguyệt Yến (Xấu)'],
    12: ['室', 'Thất hỏa Trư (Tốt)'], 13: ['壁', 'Bích thủy Du (Tốt)'], 14: ['奎', 'Khuê mộc Lang (Xấu)'], 15: ['娄', 'Lâu kim Cẩu (Tốt)'],
    16: ['胃', 'Vị thổ Trĩ (Tốt)'], 17: ['昴', 'Mão nhật Kê (Xấu)'], 18: ['毕', 'Tất nguyệt Ô (Tốt)'], 19: ['觜', 'Chủy hỏa Hầu (Xấu)'],
    20: ['参', 'Sâm thủy Viên (Tốt)'], 21: ['井', 'Tỉnh mộc Hãn (Tốt)'], 22: ['鬼', 'Quỷ kim Dương (Xấu)'], 23: ['柳', 'Liễu thổ Chương (Xấu)'],
    24: ['星', 'Tinh nhật Mã (Xấu)'], 25: ['张', 'Trương nguyệt Lộc (Tốt)'], 26: ['翼', 'Dực hỏa Xà (Xấu)'], 27: ['轸', 'Chẩn thủy Dẫn (Tốt)'],
};

const JIANCHUS = {
    0: ['Kiến', "Khí chuyên mà mạnh, nên làm việc công phủ quan sở. Nên: Nhậm chức, cầu phúc, cầu tự, cầu tài, giao thiệp, xuất hành. Kỵ: Thượng lương, cưới hỏi, an táng."],
    1: ['Trừ', "Ngày loại bỏ cái cũ lập cái mới. Nên: Tế tự, cầu phúc, cưới hỏi, xuất hành, nhập trạch, động thổ, khai quang, giao dịch. Kỵ: Cưới hỏi, thăm bệnh."],
    2: ['Mãn', "Ý nghĩa bội thu. Nên: Cưới hỏi, cầu phúc, xuất hành, an sàng, cầu tài, may mặc, tế tự. Kỵ: Tạo táng, nhậm chức, cầu y."],
    3: ['Bình', "Ngày bình thường. Nên: Tu tạo, sơn tường, sửa chữa. Kỵ: Xuất hành."],
    4: ['Định', "Ngày Nguyệt lệnh Tam hợp. Nên: Tế tự, cầu phúc, cưới hỏi, xây nhà, cầu tự, nạp tài. Kỵ: Kiện tụng, xuất hành, giao thiệp."],
    5: ['Chấp', "Ý nghĩa giữ thành quả. Nên: Nạp thái, cưới hỏi, động thổ, nhập liệm. Kỵ: Nhập trạch, khai trương."],
    6: ['Phá', "Nhật Nguyệt tương xung, gọi là Đại Hao, mọi việc không nên. Nên: Phá dỡ nhà cửa. Kỵ: Không nên làm việc cát."],
    7: ['Nguy', "Ngày không nên làm việc cát. Nên: Nhập liệm, phá thổ, hỏa táng, nhập tháp, an táng. Kỵ: Nhập trạch, cưới hỏi và các việc cát khác."],
    8: ['Thành', "Ngày Tam hợp của Nguyệt chi, ngày của Cát thần. Nên: Kết hôn, khai trương, tu tạo, động thổ, an sàng, phá thổ, an táng, di chuyển, giao dịch, cầu tài, xuất hành, lập khế ước, dựng cột, gieo trồng, chăn nuôi. Kỵ: Kiện tụng."],
    9: ['Thu', "Ngày thu thành, thu hoạch. Nên: Cầu phúc, cầu tự, nhậm chức, cưới hỏi, an sàng, tu tạo, động thổ, cầu học, khai trương, giao dịch, mua bán, lập khế ước. Kỵ: Phá thổ, an táng."],
    10: ['Khai', "Ngày tốt để bắt đầu lại. Nên: Tế tự, cầu phúc, khai quang, nhập trạch, cưới hỏi, nhậm chức, tu tạo, động thổ, khai trương, an sàng, giao dịch, xuất hành, dựng cột. Kỵ: Kiện tụng, an táng."],
    11: ['Bế', "Ngày bế tàng. Nên: Dựng cửa, chặt cây, tu tạo, động thổ. Kỵ: Xuất hành, cưới hỏi."],
};

const MINGGONGS = {
    "子": "Thiên Quý tinh, chí khí bất phàm, phú dụ thanh cát.",
    "丑": "Thiên Ách tinh, tiền nan hậu cát, ly tổ lao tâm, vãn niên cát.",
    "寅": "Thiên Quyền tinh, thông minh đại khí, trung niên có quyền bính.",
    "卯": "Thiên Xá tinh, hào phóng sơ tài, khi đắc quyền phải khiêm tốn.",
    "辰": "Thiên Như tinh, việc đa phần lặp đi lặp lại, cơ mưu đa năng.",
    "巳": "Thiên Văn tinh, văn chương chấn phát, nữ mệnh có chồng tốt.",
    "午": "Thiên Phúc tinh, vinh hoa cát mệnh.",
    "未": "Thiên Dịch tinh, cả đời lao lục, ly tổ mới an ổn.",
    "申": "Thiên Cô tinh, không nên kết hôn sớm, nữ mệnh hình phu.",
    "酉": "Thiên Bí tinh, tính tình cương trực, thường có thị phi.",
    "戌": "Thiên Nghệ tinh, tâm tính bình hòa, nghệ đạo nổi danh.",
    "亥": "Thiên Thọ tinh, tâm từ minh ngộ, khắc kỷ trợ nhân.",
};

const RIZHU_DESCS = {
    "甲子": "Ngày Thiên Đức Quý Nhân. Tọa Tý, Mộc Dục, phùng Quan lâm Đào Hoa.\nBạch Ngọc tiên tử bưng ấn đến, một bước thành danh Thiên Môn mở.\nQuý nhân không hướng phương Tây bước, khói lửa không phụ bậc kỳ tài.\nTân là Chính Quan, Canh là Thiên Quan, Mậu Kỷ là Tài, thấy Giáp Ất là phá tài, Bính Đinh làm tổn danh lợi gian nan, sinh tháng Tý, không có Sửu hợp thì ly tổ tự lập, tháng Hợi Mão Thìn chủ quý, tháng Tỵ mạng bình thường, tháng Ngọ Giáp tử Tý thần xung, lập nghiệp tha hương. Tháng Thân, tử tức khó có. Tháng Thìn, di căn hoán diệp. Tháng Hợi, văn chương hiển đạt.\nChi tiết: Tuy tọa Mộc Dục, nếu tứ trụ có Lộc, xem Ấn, sinh mùa đông không coi là thê bại",
    "甲寅": "Ngày Thiên Lộc Quý Nhân. Tọa Tỷ Kiên, Thực Thần, Lâm Quan Lộc.\nLộc đến nhân gian là kỳ lạ nhất, nghìn thu công nghiệp đáp Bạch Đế.\nĐiền viên phong quang hảo phúc khí, sông xuân đêm trăng liễu tơ rủ.\nMộc đôi hàng, thấy tháng Dần, cô khắc, hai ba vợ, thấy tháng Thân Dậu đại quý, tháng Mão thân quá vượng phá tài, tháng Tỵ phạm hình, tháng Hợi sớm bước vào cung vua, tháng Tý kẹp Sửu thì quý. Tháng Ngọ hội phương Đông Hỏa cục, tài hoa siêu quần, tháng Thìn tậu nhiều ruộng vườn.\nChi tiết: Tài Quan đều lưng, gặp giờ Tân Mùi quý",
    "甲辰": "Ngày Long Thủ Tài Khố. Tọa Thiên Tài Khố, lâm Suy.\nThân tọa Tài Khố một đời vinh, hào phóng phong lưu người đa tình.\nTập đoàn công ty giỏi giao tế, Quan tinh thấu hiển quản vạn dân.\nTháng Tý, Thủy nhiều Mộc phiêu, chủ di căn hoán diệp. Tháng Thân quý, tháng Dậu phú quý song toàn. Tháng Ngọ Tuất chủ phú, tháng Mão Dương Nhận chủ bại tài. Tháng Sửu phú hậu có tài, tháng Hợi thấu Quan là quý nhất. Tháng Dần long hổ kẹp nguyệt gọi là Long ngâm Hổ khiếu.\nChi tiết: Thân tọa Tài khố Thủy khí, tính thiện lương, giờ Bính Dần cát",
    "甲午": "Ngày Long Mã Bôn Trì. Tọa Tử, Thương Quan, Tài địa, ngày Tiến Quý.\nLong mã giao trì hảo phúc khí, vợ hiền gái đẹp thích phương Bắc.\nTháng Tám hoa quế hương nghìn dặm, gió xuân ngày đẹp cùng tựa nương.\nTháng Tý xung Ngọ, uyên ương khó hợp. Tháng Hợi Mão Mùi quý hiển. Tháng Ngọ tự hình, thấy Hợi Tý chủ phú. Tháng Sửu thân nhược, thấy Hỏa thì nghèo. Tháng Dần được Thân Dậu thì cát, tháng Hỏa lao lục bần yểu; tháng Mão tài không tụ; tháng Thân Dậu võ chức đắc quyền.\nChi tiết: Sinh mùa hè đại cát",
    "甲申": "Ngày Long Hổ Đoạt Khôi. Tọa Tuyệt, lâm Sát hóa Ấn.\nVượt ngựa múa giáo ruổi thiên nhai, Tần Sơn Sở Quốc soái phủ gia.\nCon cái anh em hỷ tương phùng, chém tướng đoạt quan tráng sĩ khen.\nSinh tháng Tý, Ấn hóa Sát là quý. Tháng Hợi Mão Mùi đều quý, tháng Thân giờ Thân là tử, mạng yểu. Tháng Sửu mang tật, tháng Thìn cô đơn hoặc là tăng đạo. Tháng Tỵ thanh bần, đôn hậu thông minh hựu có hình. Tháng Ngọ nghệ nghiệp thành danh, tháng Dậu trước quý sau mang tật, một thành một bại, tháng Hợi văn chương hiển đạt.\nChi tiết: Tọa Tuyệt, tứ trụ đều Tuyệt thì cát",
    "甲戌": "Ngày Thanh Long Hiến Nghệ. Tọa Dưỡng, lâm Thiên Tài, Thương Quan.\nMột đời vinh hoa đi tha hương, nghìn bàn nghệ kỹ thứ gì cũng giỏi.\nQuan tinh Ấn tinh đến nâng niu, phong lưu đa tình chốn ca múa.\nTháng Tý, hầm chữ thành danh. Tháng Sửu Mùi xung hình tai, nhiều bệnh. Tháng Dần quý, công việc tốt, bất lợi cho vợ, tháng Sửu đại phú, tháng Tỵ danh lợi vẹn toàn. Tháng Ngọ phú mà quý. Tháng Thìn tăng đạo thanh cao. Tháng Hợi nghệ nhân, công danh không toại. Tháng Tuất bối lộc trục mã, gà vịt cùng kêu. Giáp lâm Tuất, Tài khố, là ngày phú quý song toàn.\nChi tiết: Thân tọa vượng Quan, lâm Hỏa khố, tâm hoài từ thiện, giờ Bính Dần quý",
    "乙丑": "Ngày Ngọc Nữ Bội Châu (Đinh là Ngọc Nữ, Sửu là Châu). Lâm Suy, tọa Kiêu và Thiên Tài, Tướng Tinh.\nThân tọa Kim khố tài phúc tú, y lộc vinh hoa món gì cũng sẵn.\nKim Thủy tương hàm hảo văn chương, phương Đông phương Tây đối diện đàm.\nSinh tháng Tý, Sửu hợp thì quý, tháng Sửu mang tật; tháng Dần, Bính hỏa trong Dần khắc Canh kim Quan tinh, bất lộc. Tháng Thân Dậu không có Hỏa thì thọ dài. Tháng Dần Mão bại tài. Tháng Thìn Tuất phú quý. Tháng Hợi Tý ý văn dương. Tháng Tỵ Ngọ phúc thọ. Tháng Tuất thanh tú hậu đạo, tài phú phong doanh.\nChi tiết: Thân tọa Tài Quan, có Ất Canh hợp là cát nhất",
    "乙卯": "Ngày Phong Vân Tương Hội. Tọa Lộc, lâm Bi Kiên, Tước Vị, Thiên Ất Quý Nhân.\nThân tọa Tước vị người xưng tụng, công danh hiển đạt liệt triều ban.\nBiển xanh châu ngọc gặp mưa lộc, núi xanh mây trắng nước chảy xa.\nTháng Tý, Thiên Ấn, mạng văn bút, hỷ Thực Thương sinh Tài, tháng Thổ phú, tháng Hợi, Tân Quan, võ chức huân nghiệp. Tháng Dần Mão tài tuyệt, có duyên với tăng đạo. Tháng Tỵ Ngọ phá tài, tháng Thân Dậu hiển hách. Tháng Tuất phúc mà thọ. Tháng Mùi tài phú phong doanh.\nChi tiết: Tài Quan vô khí, gặp giờ Canh Thần quý",
    "乙巳": "Ngày Mộc Hỏa Sinh Huy. Giao Quý, Dịch Mã, Chính Tài, thành danh.\nCố chấp tự phụ hựu thông minh, Tài Quan cùng thấy mệnh công hầu.\nVăn tài võ lược sợ Thanh Long, hưng vượng thành bại trong gang tấc.\nTháng Tý, văn tài xuất chúng, một đời lao lục. Tháng Thân, Quan được sinh, gần vua. Tháng Sửu, võ chức kiến kỳ. Tháng Hợi Mão, thông căn thấy Quan Sát quý. Tháng Mùi, có phúc, kinh thương phát tài. Tháng Tỵ Ngọ, vợ bệnh hoặc ly biệt. Tháng Thân Dậu mang tật, bệnh gan mật. Tháng Hợi văn chương kỳ lạ. Tháng Tuất nhập mộ, phú mà thọ đoản.\nChi tiết: Nam nữ phương hại gia thất, có Nhâm thì nhẹ",
    "乙未": "Ngày Tài Phúc. Lâm Tài, tọa Dưỡng. Còn gọi là Phúc Quý mục.\nThiên nguyên tọa Phúc người thông tuệ, được Quan phùng Tỷ giàu nhất vùng.\nĐường tơ lụa sầu thạch lựu, sắc xuân hoa thu mưa mịt mù.\nTháng Tý, mạng bình thường. Tháng Mùi, cô hình, tháng Thân Dậu bệnh thận, liệt dương, nữ giới có bệnh phụ khoa, tháng Hợi đại quý. Tháng Thìn Tuất Sửu phú thương cự giả. Tháng Ngọ thanh danh thiên hạ, sinh mùa hạ mạng bình thường, sinh mùa đông thọ dài. Tháng Tỵ công danh khó toại, thân phận nghệ nghiệp.\nChi tiết: Gặp Tài Thương Quan cách",
    "乙酉": "Ngày Long Phượng Trình Tường. (Sinh tháng Dậu là quý, là ngày mông nan). Tọa Tuyệt, Tướng Tinh.\nHoa xuân nước sông lạc phượng hà, nam bắc dương danh khuông thiên hạ.\nPhương Nam một chuyến ngồi điện vàng, ngọc thạch phỉ thúy lệ hoa hoa.\nTháng Tý, sinh thân, phùng Tài tinh thì cát. Tháng Dần Mão hiển quý. Tháng Ngọ nghệ danh sinh nhai. Tháng Thân mạng nghèo, lao lục. Tháng Dậu tự hình, thương lộc phá mệnh mục tật, chủ tai, hành vận Ấn thì cát. Tháng Hợi hỷ Tài tinh, điền viên phong thịnh, tháng Tỵ bại tán tổ nghiệp, Ất Dậu đa thương tàn.\nChi tiết: Tọa Sát, bốn Ất Dậu hoặc có hóa Sát thì cát, giờ Tân Tỵ là hóa khí Kim cục quý",
    "乙亥": "Ngày Danh Lợi Song Thành. Tọa Tử, lâm Chính Ấn, Kiếp Tài, Văn Tinh Quý Nhân.\nNgọc thỏ quế nguyệt hỷ Quan tinh, thân nhân bằng hữu trọng hữu tình.\nTrúc xanh nước chảy uất thông thông, thái dương đầu giang lặp lại hành.\nTháng Tý, chủ có phú, hỷ Quan Sát hiển quý. Tháng Hợi tự hình. Tháng Ngọ quý mệnh, nghìn sen ngày hạ tươi. Tháng Dần Mão Tài tinh thấu, phú thọ. Tháng Thân đắc Quan. Tháng Tỵ thiên nhai phong trần. Tháng Tuất nghệ đạo thành danh, mạng can qua trận tiền. Tháng Dậu Thương Quan là quý, chết vì phi mệnh.\nChi tiết: Nhật tọa Mộc cục, giờ Bính Nhâm, Nhâm Ngọ, Giáp Thân quý",
    "丙子": "Ngày Ly Giang Chiếu Thái. Lâm Thai, Chính Quan, ví như sao Văn Khúc, Thiên Quan Quý Nhân.\nSắc chiếu sơn xuyên phượng trình tường, niên thiếu thành danh ngồi hoa đường.\nNhật lạc giang hà người thảm thương, đông thái tây hồng mặc quân tưởng.\nTháng Tý, phùng Ấn thì quý. Tháng Thổ, tập đoàn xí nghiệp. Tháng Dần Mão, học nghiệp thành công. Tháng Ngọ, nghèo, tự lập gia nghiệp, anh em khó nhờ. Tháng Thân Dậu, kinh tế có phương pháp. Tháng Hợi có tật, yểu. Tháng Tý bất lộc, bệnh tim. Tháng Sửu thấu Tài là quý. Tháng Tỵ hình tai, bệnh đại tràng. Tháng Thìn Quan tinh ám tàng, siêu quần xuất chúng.\nChi tiết: Thân tọa Tài Quan song mỹ, sinh mùa hạ thì Thân vượng, hỷ Thủy điều hậu. Giờ Quý Tỵ là quý cách.",
    "丙寅": "Ngày Hồng Nhật Đông Thăng. Tọa Trường Sinh, Thiên Ấn, Thực Thần.\nSơn xuyên tú lệ liễu tơ xanh, nhân sinh hỷ nhất cảnh yên hà.\nMạc hướng ly tình hổ sơn hành, tây nam một chuyến mạng u u.\nTháng Dậu, Chính Tài, thấu Tài quý hiển. Tháng Dần quý nhưng không lâu dài. Tháng Mão thấy Tài tinh là phúc, Quan tinh hiển quý. Tháng Thân Tài Quan song hiển. Tháng Mùi chủ phúc. Tháng Tuất y lộc bình thường. Tháng Hợi Tý là quý cửu phẩm, tháng Tỵ Ngọ bệnh đường ruột hoặc phổi.\nChi tiết: Kim tuyệt Thủy tử, Tài Quan đều lưng, nhưng Bính hỏa Trường sinh Thực thần độc vượng, chủ thọ, giờ Kỷ Hợi, Tân Mão, Quý Tỵ là quý",
    "丙辰": "Ngày Hỏa Chiếu Long Đầm. Lâm Quan, Thực Thần vượng, Chính Ấn.\nNgày tọa Phúc thần thụ hoàng ân, cao quan hậu lộc tử tôn hưng.\nBình sinh hưởng hết phúc nhân gian, nữ mệnh mặc vàng lại đeo bạc.\nTháng Tuất xung, cửa tài mở, mạng giàu. Tháng Thìn tăng đạo hoặc cô đơn. Tháng Dần Mão quý. Tháng Sửu Mùi phú hậu. Tháng Hợi Tý quý cách. Tháng Thân Dậu hành vận Hỏa, quan chí nhị tam phẩm. Tháng Ngọ hai ba vợ, phúc lộc vẹn toàn.\nChi tiết: Sinh mùa đông không cát, giờ Canh Dần quý",
    "丙午": "Ngày Thiên Hà Lạc Thái. Tọa Kiếp địa, Thương Quan, Dương Nhận.\nNgười phùng Đế tọa tước sĩ thân, công danh sĩ đồ hiển đạt nhân.\nThương long Thủy Hỏa đa hữu ách, mưa phùn mịt mờ nhập yến môn.\nTháng Tỵ Ngọ mạng bình thường. Tháng Hợi Tý võ quan, công danh trắc trở. Tháng Ngọ nghèo, đảo xung Tý quý. Tháng Dần tam hợp cục, văn chương hiển hách. Tháng Mão hỷ hành Tài tinh, quý mà giàu. Tháng Tuất hợp hỏa, thương nhân. Tháng Thìn chủ xí nghiệp. Tháng Thân Dậu tài phú thương giả.\nChi tiết: Nhật Nhận hỷ Hình Xung, nam nữ phương hại gia thất, gặp Ất, Quý thì nhẹ",
    "丙申": "Ngày Hỏa Chiếu Kim Thành. Bệnh địa, Thiên Tài, lâm Sát.\nThân lâm Tài Quan hiển thanh danh, hựu phòng Tỷ Nhận Sát Thương lâm.\nMã phùng Đế Vượng lâm Quan xử, tích ngọc chất vàng lập đại công.\nTháng Tý Sửu bệnh huyết, tháng Thân văn chương nổi tiếng. Tháng Dậu thê thiếp hữu tình. Tháng Tý Thìn mang tật, tháng Hợi hỷ Tài. Tháng Ngọ một đời cát khánh không bệnh, thọ lâu. Tháng Dần Mão Quan vinh thân. Tháng Mùi tuy giàu nhưng bệnh đường ruột. Ngày Bính Thân gặp tuế vận hình xung tất sinh tai họa.\nChi tiết: Thân tọa Tài, giờ Canh Dần quý, giờ Quý Tỵ cũng cát",
    "丙戌": "Ngày Thiên Trù Quý Nhân. Tọa Mộ, Phúc thần Tài địa.\nNgọc đường hậu lộc hàn môn xuất, kim ngân châu báu đường phương Tây.\nNhật lạc thâm đầm xông quỷ môn, bảng vàng đề danh hiển song thân.\nSinh tháng Tý, phúc thọ diên trường, có danh có lợi. Địa chi tháng Tỵ Ngọ Tuất phú quý song toàn. Tháng Thân Dậu đại phú, tập đoàn. Tháng Thìn xung, thiếu niên danh hiển. Tháng Hợi võ chức lục phẩm. Tháng Sửu người kinh tế bình thường. Tháng Thìn thân vượng đắc chức, thân nhược bần tiện.\nChi tiết: Sinh mùa hè thì Tài Quan vô khí",
    "丁丑": "Ngày Ngọc Nữ Thủ Khố. Tọa Mộ, lâm Tài.\nMột vòng trăng rằm sắc họa tươi, kim ngân đầy kho lộc cao thăng.\nLệ nhân không đi đất Đông Nam, da trắng thân ngọc chịu dày vò.\nTháng Sửu Tài thấu can thì giàu. Tháng Dần Mão Ấn, mệnh học sĩ. Tháng Tỵ Ngọ vợ muộn, hai đời vợ, phá tài, một đời vất vả. Tháng Thân Dậu tiền bạc đầy nhà. Tháng Tuất hình tai, tài đi tài tán lưỡng không. Tháng Hợi hỷ hành phương Nam vận Hỏa, danh lợi có hy vọng. Tháng Tý thấy Hỏa, nhung mã không hốt.\nChi tiết: Kim khố vinh phong, gặp giờ Tân Hợi quý",
    "丁卯": "Ngày Nguyệt Chiếu Thiềm Cung. Lâm Thiên Ấn, tọa Bệnh (hư danh hư lợi).\nNgày tọa Thiên Ấn thân tự cường, gió tây không thổi nhật sầu muộn.\nDịch mã giao trì đến tài hương, văn chương cao ngất lừng một phương.\nTháng Dần Mão Ấn thụ, hỷ hành Quan vận, hàn môn tướng soái. Tháng Thìn Tuất Sửu Mùi cô tinh, vợ không thuận, tài không tụ. Tháng Tỵ Ngọ duyên phận phu thê mỏng, gian khổ. Tháng Ngọ nhiều vợ, nghèo, yểu. Tháng Thân Dậu danh lợi song quý. Tháng Tý võ chức. Tháng Hợi văn chức hiển diệu.\nChi tiết: Tài Quan đều lưng, phải hợp khí, Lộc, Hỏa phù trợ",
    "丁巳": "Ngày Chu Tước Dược Huy. Tọa Đế Vượng, Kiếp Tài, Thương Quan, Chính Tài.\nTạ nữ tài cao đầy từ quán, bình thản bước ra lúc thiếu niên.\nTinh kỳ che mát nhập phượng khuyết, hỏa diễm mã bì oán cao sơn.\nTháng Ngọ Trường Sinh, văn chương hiển kỳ. Tháng Tỵ Lộc Quý. Tháng Dần Mão thấu Quan tinh, nhất phẩm đại quý. Tháng Thìn thương hải hữu danh. Tháng Mùi quý cách, tháng Thân Dậu mạng giàu. Tháng Tuất vô phúc, thấy Quý thủy hại mắt cận thị. Tháng Hợi thường xuyên đi xa.\nChi tiết: Nam nữ phương hại gia thất, có Mậu thì nặng, Giáp, Dần thì nhẹ",
    "丁未": "Ngày Nhân Lập Họa Kiều. Tọa Quan Đái, Thực Thần, Bi Kiên, Thiên Ấn.\nThực thần sinh vượng thắng Tài Quan, Thiên Hà họa kiều bái kim điện.\nTốn phong tương bạn vân vũ thủy, thái dương đoạt huy khổ bần hàn.\nThanh Tý lập công sa trường. Tháng Sửu ra ngoài kinh thương, vợ nhiều ly biệt. Tháng Dần Mão kim đường ngọc mã. Tháng Tỵ Ngọ phá tổ nghiệp, tự lập môn hộ. Tháng Thân Tài Quan song mỹ, tháng Dậu đại phú. Tháng Thìn tạp khí Quan vượng. Tháng Hợi tướng soái. Đinh Mùi tính mạnh, người quý, hung hiểm nhiều.\nChi tiết: Tọa Ấn tiểu cát",
    "丁酉": "Ngày Ngọc Nữ Thừa Phượng. Tọa Trường Sinh, lâm Thiên Tài.\nChu tước thừa phượng hiển anh hào, xe vàng phượng ngọc phúc thọ cao.\nQuý nhân long mã phương Đông dậy, thái dương thăng lúc phí công lao.\nTháng Hợi quý nhân bưng ấn. Tháng Dậu Tuất phạm hình, cốt nhục vô tình, nhân tài phân trương. Tháng Tý Sát vượng, hỷ hành vận Thổ. Tháng Ngọ can cường tài vượng. Tháng Mùi y lộc bình thường. Tháng Thân tài nhiều thân nhược, giàu trong nhà nghèo ra ngoài. Tháng Tuất nghệ nghiệp sinh nhai.\nChi tiết: Lâm Tài học tinh, giờ Nhâm Dần quý",
    "丁亥": "Ngày Nguyệt Chiếu Thiên Môn. Tọa Thai, lâm Chính Ấn, Chính Quan.\nTừ quán văn chương sớm vinh thân, dịch mã thất sát phong trần nhân.\nHỷ nhất sen hồng hoa nở cặp, Kim Thủy văn chương tá triều quân.\nTháng Hợi quý và giàu. Tháng Tý hành vận Mộc, kim qua thiết mã. Tháng Tuất xung, kỹ nghệ tinh trản. Tháng Dần Mão quý và hiển diệu. Tháng Tỵ Ngọ tự hình, tiểu thương. Tháng Thân Dậu lợi lộ miên miên. Tháng Tý mang tật. Tháng Thìn chuyên môn kỹ thuật thành danh.\nChi tiết: Nhật quý, giờ Nhâm Dần, Ất Tỵ đều quý",
    "戊子": "Ngày Sơn Hoàn Thủy Bảo. Lâm Thai, tọa Chính Tài.\nNước bao núi vòng ánh trăng sáng, trong bóng hoa đẹp hưởng phúc cao.\nĐừng tham giấc mộng thành Hòe Sơn, mây trôi biển sông đều hư không.\nTháng Tý, hỷ hành vận Hỏa, phúc. Tháng Sửu thông minh, chủ phú quý. Tháng Dần Mão nhược, bệnh hoặc chết yểu, hỷ Hỏa Thổ. Tháng Tỵ Ngọ Lộc ở Tỵ là Ấn, Nhận ở Ngọ hỷ hành Thực Thương phú quý. Tháng Thân Thực vượng, quý. Tháng Dậu tổn thương danh vọng. Tháng Thổ đắc Tài, phú quý. Tháng Hợi hư tú, tài bạch không tụ.\nChi tiết: Tự tọa Tài, giờ Ất Mão, Đinh Tỵ quý",
    "戊寅": "Ngày Hổ Khiếu Sơn Cốc. Lâm Trường Sinh, tọa Sát, Thiên Ấn.\nTướng tinh nhập mệnh lập võ công, mãnh hổ tung gió hiển anh hùng.\nẤn thụ Tài Quan treo Thiên Môn, nam chinh bắc chiến ruổi ngựa hồng.\nTháng Mão, tháng Dần Quỷ vượng, nhiều bệnh hoặc yểu. Tháng Tỵ Ngọ Ấn, ý văn hội hải, binh quyền vạn dặm. Tháng Thân Dậu bất lộc, thương công danh. Tháng Thổ phú. Tháng Hợi tháng Tý phú thương đại phú.\nChi tiết: Giáp mộc đương cục, Quan Sát giả cát",
    "戊辰": "Ngày Thương Long Xuất Hải. Lâm Quan Đái, Chính Tài, Bi Kiên, Chính Quan.\nTrăng treo núi cao giang sơn tú, bình sinh hỷ nhất du Đông Nam.\nMột đời vất vả quý không hiển, làm người nhiệt tâm phúc khí dày.\nTháng Tý Tài vượng, mù lòa, không Hỏa h hư mà không thực. Tháng Sửu ít Tài, người thông minh. Tháng Dần Mão Quan tinh vinh thân. Tháng Thìn tài không tụ, cô khắc. Tháng Tỵ Ngọ học nghiệp hai lần thành danh. Tháng Thân Dậu nghệ danh bốn phương. Tháng Tuất xung, thiếu niên xuất chúng. Tháng Hợi nhiều bệnh, tháng Tý vô căn phiêu đãng, kỹ nghệ siêu quần.\nChi tiết: Nhâm Canh nhập mộ, Ất mộc tự tọa Tài Quan",
    "戊午": "Ngày Mã Bôn Ngọ Môn. Lâm Dương Nhận, Chính Ấn.\nNhật nguyệt phân tú phúc khí nồng, Sát Quan tương kiến chủ võ công.\nBình xuyên một chuyến tiền trình viễn, nhung mã Tây Châu sánh Đào Công.\nTháng Tý danh lợi song thu. Tháng Sửu Tài vượng. Tháng Dần Mão thấu can là triều dã trọng thần. Tháng Ngọ Mùi Ấn, cẩm tú văn chương, thấu Quan hiển quý. Tháng Thân Dậu đổng sự tập đoàn tài chính. Tháng Tuất tài ít, bình thường, cô khắc. Tháng Tý lập nghiệp ngoại hương, tổ nghiệp không nhờ, lục thân lạnh nhạt. Tháng Hợi đại phú, Nhận vượng tính mạnh, người tuy quý nhưng hung hiểm nhiều.\nChi tiết: Nhật Nhận hỷ Hình Xung, tháng 4, 5 ở đất Hình cũng cát",
    "戊申": "Ngày Hà Lạc Hoa Túc. Lâm Bệnh, Thực Thần, Thiên Tài.\nNgày tọa Phúc tinh thanh danh hiển, vạn quyển thi thư chốn triều đình.\nCưỡi lừa ruổi ngựa lửa trong lò, phong vân lôi vũ bước kim điện.\nTháng Dần xung Lộc, tài vượng. Tháng Tý Tài vượng Ấn vượng là quý. Tháng Sửu phúc, ham tửu sắc, cố chấp. Tháng Mão hợp Thực danh lợi song hiển. Tháng Thìn Tuất Mùi Thổ khí chuyên vượng không tụ tài, bệnh thận. Tháng Tỵ Ngọ sự nghiệp chìm nổi định không ổn định, nhiều biến động. Tháng Thân Dậu chuyên nghiệp trí phú. Tháng Hợi Tý đại phú.\nChi tiết: Giáp tuyệt có Tài không Quan",
    "戊戌": "Ngày Khê Nhiễu Họa Đình. Tọa Mộ, lâm Chính Ấn, Bi Kiếp.\nNhiệt tình hậu đạo tâm như biển, Bạch Đế Ngọc Nữ bưng ấn đến.\nKhê nhiễu họa đình phương hương danh, điền viên bình xuyên vân thiên ngoại.\nTháng Tý hiển quý tụ tài. Tháng Sửu Mùi Tuất hình tai, phá tán. Tháng Dần Mão hợp Ấn, văn chương thành chương. Tháng Thân Dậu tích ngọc chất vàng. Tháng Hợi xung, tâm thần định không yên, ở đất khách lập nghiệp.\nChi tiết: Khôi Cương, kỵ Xung Hình",
    "己丑": "Ngày Kim Ngưu Bái Kim Điện. Lâm Mộ, tọa Bi Kiên, Thực Thần, Thiên Tài.\nMột nén hương phật bái kim điện, Cấn Sơn lưu thủy phương danh hiển.\nThìa vàng mở được kho Sửu Qua, phú quý vinh hoa say quản huyền.\nTháng Hợi Thương Quan tận là quý, có quyền uy. Tháng Dần quý hiển. Tháng Mão binh quyền hiển hách. Tháng Thân Canh là bối lộc. Giáp tuyệt tháng Mùi xung, phát tích, bệnh thận. Tháng Ngọ xung, vợ có ách. Tháng Tỵ hợp Kim là phú thương cự giả. Tháng Thìn cô thân. Tháng Tý kho tàng xung doanh.\nChi tiết: Có Tài không Quan, giờ Bính Dần quý",
    "己卯": "Ngày Võ Khoa Tướng Đàn. Lâm Suy, tọa Thất Sát Tướng Tinh.\nTướng sĩ đeo cung cưỡi chiến mã, mưa chiều gió trăng độ niên hoa.\nVăn tinh phúc lộc nhược hữu tình, bắc quốc ngoảnh đầu tựa đến nhà.\nTháng Dậu Mão Dậu xung, một đời nhiều di chuyển, ly thê. Tháng Thân sớm phát tích. Tháng Hợi quý. Tháng Mùi hợp, ngũ cốc phong đăng. Tháng Ngọ thi mãn càn khôn. Tháng Tỵ văn tú. Tháng Thìn có thể kiến công lập nghiệp. Tháng Tý vô lễ, hung bạo.\nChi tiết: Thân tọa Sát địa, phải Thân Sát lực tương đương mới cát",
    "己巳": "Ngày Mã Dược Bình Xuyên. Lâm Đế Vượng, tọa Thiên Ấn, Bi Kiếp.\nNam Triều thiên tử thụ ngọc ấn, nghìn dặm Trường Giang say du nhân.\nTuyết sơn thảo địa mã nan hành, xuân phong đắc ý tọa thượng tân.\nTỵ là Ấn vượng, tháng Tỵ - Kim Thần kỵ Tài hỷ Thực Thương. Tháng Ngọ hiển quý. Tháng Thổ mệnh hầu bá. Tháng Thân Dậu hỷ Ấn vận, thương tận là võ chức. Tháng Hợi nhất phẩm quý, có binh quyền. Tháng Tý Thực Thương vận đại phú. Tháng Thìn trước nghèo sau phát. Ngày Kỷ Tỵ người quý.\nChi tiết: Thủy tuyệt Mộc bệnh, giờ Bính Dần quý",
    "己未": "Ngày Đan Quế Phiêu Hương. Lâm Quan Đái, tọa Bi Kiên, Kiêu Ấn.\nTrong trăng quế tử thu phiêu hương, sông ngòi nhật nguyệt giao tương ánh.\nMạc oán núi cao vận đến muộn, ảnh lý can qua là phỉ thúy.\nTháng Hợi văn chương khoe nhảy, thanh cao. Tháng Dậu đại quý. Tháng Thìn chức nhỏ, cận vệ. Tháng Thân tài phúc hưng thịnh. Tháng Mùi tài kim tán thất. Tháng Ngọ hợp, thanh bần nho nhã. Tháng Tỵ hỷ Quan hiển quý. Tháng Thìn hàn môn tướng sĩ.\nChi tiết: Giờ Bính Dần quý (không Thủy đại cát)",
    "己酉": "Ngày Phượng Phi Lục Châu. Lâm Trường Sinh, tọa chi Thực Thần.\nMột vầng trăng rằm ra biển xanh, kim phượng tung cánh bay thiên ngoại.\nTần Sơn Côn Luân tuyết trắng ngần, long phượng trình tường ngọc châu tới.\nTháng Hợi thân nhược, nghèo. Tháng Dần Mão có Hỏa là võ chức. Tháng Dậu mệnh cao quý, Dậu nhiều là du phương thuật sĩ. Tháng Thân vô Quan hiển quý. Tháng Mùi đại phú. Tháng Tỵ phú quý Đào Chu. Tháng Tý Thực phá, bần hàn.\nChi tiết: Tài Lộc đều lưng, đều phải sinh phù",
    "己亥": "Ngày Bình Xuyên Lưu Thủy. Lâm Thai, tọa chi Chính Tài, Chính Quan.\nLộc mã đồng hương bái ngọc đường, thiên tiệm thông đồ văn tinh dương.\nTrầm ảnh không tùy lưu thủy khứ, Sát tinh xung động mã vô cương.\nTháng Hợi Tài hiển Quan vượng là quý. Tháng Dậu Thực Thần Tài vượng. Tháng Thân can thâm thấu Ấn đại quý. Tháng Mùi hợp võ chức. Tháng Tỵ xung, ngoại tích phát phẫn. Tháng Tý nhiều bệnh, huyết tật. Tháng Dần Mão chi trung Quỷ vượng, một đời khó thành đại sự. Ấn thấu đại quý.\nChi tiết: Tự tọa Tài Quan đợc cao danh, giờ Bính Dần quý",
    "庚子": "Ngày Kim Ngọc Xuất Hải. Lâm Tử, tọa chi Thương Quan.\nGiỏi hát giỏi múa bút và mực, tựa như hổ trắng giỡn nước sông.\nXung tại Lộc Mã đăng khoa giáp, trúc vằn mưa phùn lệ thương tình.\nTháng Tý suy, Thương Quan, không vận Thổ, Quỷ vượng, đèn trước gió dễ yểu. Tháng Sửu hư danh, khinh tài. Tháng Dần Thiên Tài, bất lộc. Tháng Mão hợp Tài, kim ngọc đầy mắt. Tháng Thìn lợi lộ kinh thương. Tháng Tỵ võ chức hiển hách. Tháng Ngọ văn quan cận vệ. Tháng Tứ Quý Ấn vượng giàu mà có danh, tháng Hợi phiêu bạt làm tăng lữ.\nChi tiết: Có Đinh Hỏa thì cát",
    "庚寅": "Ngày Bạch Hổ Trấn Sơn. Lâm Tuyệt, tọa chi Thiên Tài, Thất Sát, Thiên Ấn.\nMãnh hổ bình xuyên về rừng núi, gió thu lá rụng lúc không yên.\nHỷ nhất đại tuyết phong sơn lúc, ba hạ bóng râm nằm Khổng Minh.\nTháng Tý Thực vượng thân suy, Tỷ Kiếp phù trợ thì cát. Tháng Dần thanh tú mạng cao. Tháng Mão giàu không lâu bền. Tháng Thìn giàu mà quý. Tháng Tỵ Quỷ ám tàng có Ấn, chức vinh. Tháng Thân Dậu tiền tài tụ tán chìm nổi, tháng Tuất Hợi đổng sự tập đoàn tài chính.\nChi tiết: Tọa Tuyệt phản lại chủ cát xương",
    "庚辰": "Ngày Phúc Đức Quý Nhân. Lâm Dưỡng, tọa chi Thiên Ấn, Thực Thần.\nMệnh mang Khôi Cương tính cương cường, không tin quỷ thần ở bên mình.\nNgọc bội kiêu dương nhập mệnh đến, cầm giáo cưỡi ngựa tá cao hoàng.\nTháng Sửu giàu mà có danh. Tháng Tý Sửu văn tài xuất chúng. Tháng Dần Mão tài phúc thọ ngắn, tháng Ngọ phát tích có tật bệnh. Tháng Tỵ một đời gian nan, tháng Mùi Thân tài vận phát tích. Tháng Dậu hợp thấu Quan tinh, vinh hiển. Tháng Hợi Tý Thực Thần vượng phát tích khó thọ. Canh Thìn quý mà phong lưu, danh trọng lợi khinh.\nChi tiết: Khôi Cương, kỵ Hình Xung",
    "庚午": "Ngày Hỏa Chú Kim Ấn. Lâm Mộc Dục, chi tọa Chính Quan Ấn.\nMột chiếc bút sắt nước làm mực, thái nhạt mây nồng dưới bút vẽ.\nHọc uyển tướng sĩ hai bàn mệnh, sơn dã chu tước ngậm ngọc thúy.\nTháng Sửu có thanh danh, tháng Thìn tự hình, giàu mà có hình. Tháng Dần Hỏa vượng mang tàn tật, phổi có bệnh. Tháng Mão Tài vượng là người đại phú. Tháng Tý xung, thiên nhai nghệ hải. Tháng Thân Dậu ngày quý, tay thả thanh vân.\nChi tiết: Canh kim tọa Tử nhưng trên Ngọ tự tọa Quan, Ấn, tuy bại không quẫn",
    "庚申": "Ngày Song Hổ Bôn Trì. Lâm Quan Lộc, tọa chi Bi Kiên, Thực Thần, Thiên Ấn. Còn gọi là ngày Hổ Luyến Ngọc Nữ.\nBạch hổ giao trì hướng Nam hành, chim nhảy sông ngòi sớm thành danh.\nLộc đến Trường Sinh Quan đắc địa, chín tầng lộ vũ mộc chu y.\nTháng Canh thấu Hỏa là mệnh đại quý. Tháng Hợi Tý thơ từ thanh sướng lưu vận. Tháng Thân Dậu không có Quan tinh, bần tiện. Tháng Dần Mão tài mãn Tam Hiệp. Tháng Tỵ Ngọ quan chí Thị lang, Thất Sát, kim qua thiết mã.\nChi tiết: Nhật Đức, Nhật Lộc, thọ",
    "庚戌": "Ngày Lộc Mã Quý Nhân. Lâm Suy, tọa chi Chính Quan, Thiên Ấn.\nTướng quân trăm trận không luận công, núi cao nước chảy lại xuất chinh.\nTây khứ Dương Quan tri âm thiếu, tiền lộc hậu phúc hai ba tầng.\nTháng Thìn xung mệnh bình thường. Tháng Mão hợp nhân vợ phát phúc. Tháng Dần mệnh hầu vương. Tháng Sửu Tài vượng quan thăng. Tháng Tỵ Hỏa Quan, võ chức thao quyền có kinh hiểm. Tháng Ngọ văn chức khó thiện chung. Tháng Thân Dậu tài đến tài tán, tán tụ hai bên 依依. Tháng Hợi Tý văn bút siêu quần.\nChi tiết: Khôi Cương, kỵ vận Địa chi Hỏa vượng và Hình Xung",
    "辛丑": "Ngày Bạch Ngọc Sinh Huy. Lâm Dưỡng, chi tọa Thiên Ấn, Thực Thần, Bi Kiên.\nBạch ngọc sinh huy Kim Môn khách, núi cao đắc quý tử làm mực.\nThân nhập bình xuyên nhiều sầu thán, can qua ảnh lý huân nghiệp thùy.\nTháng Tý Thực Thần vinh hoa. Tháng Sửu phục ngâm, uyên ương khó hợp. Tháng Dần Mão tài tụ quan vượng. Tháng Tỵ sớm toại danh hương, tháng Thìn hiển đạt có danh lợi. Tháng Ngọ hung. Tháng Thân Dậu phùng Quan tinh là quý, thiếu niên lận đận. Tháng Thổ bình thường. Tháng Hợi Thương Quan, một văn minh thiên hạ.\nChi tiết: Thực Thần vinh xương, chủ thọ",
    "辛卯": "Ngày Phượng Khuyết Tảo Bộ. Lâm Tuyệt, chi tọa Tài, Thương Quan, Dịch Mã, xung Lộc.\nNúi cao khởi trình nước chảy dài, biên tái diệu diệu tuyết đầy sương.\nPhật Sơn Ngọc Nữ há hữu tình, tuyết sơn nhật chiếu hoa hải đường.\nTháng Thìn Thương Quan thương tận, tự lập tự thành, kỹ nghệ, bói toán, bác sĩ. Tháng Dần Mão hợp tài phong. Tháng Tỵ xung văn tinh xuất chúng. Tháng Ngọ tự hình trước vinh sau hình. Tháng Mùi giàu. Tháng Thân nghèo nhân sinh bất định. Tháng Dậu nhiều tranh luận. Tháng Tý Thực vượng phúc vượng. Tháng Hợi Thương Quan kỹ nghiệp thành danh. Tân Mão Thiên Tài là ngày phúc quý vẹn toàn.\nChi tiết: Tài suy không ngại, gặp giờ Mậu Tý quý",
    "辛巳": "Ngày Kim Mã Đăng Điện. Lâm Tử, tọa chi Chính Quan, Chính Ấn, Kiếp Tài, Dịch Mã.\nKim mã lâm quan hiệu tê phong, Ngọc Đường bái tướng Hàn Uyển danh.\nHỷ nhất núi cao nước bao quanh, kiêu dương nhật xuất mạn tiêu hồn.\nTháng Tý Thực vượng danh hiển. Tháng Sửu hợp vợ ít duyên tài nhạt. Tháng Dần nhân tài có hình. Tháng Mão hoành tài. Tháng Tỵ Kim Trường Sinh hóa Thủy danh hiển. Tháng Ngọ ám quỷ có tật. Tháng Thân Dậu quý trung có thất. Tháng Hợi xung song quý.\nChi tiết: Kim cục tọa Tử không ngại, giờ Mậu Tý quý",
    "辛未": "Ngày Băng Hà Giải Đống. Lâm Suy, chi tọa Kiêu Ấn, Thiên Quan, đa tình vọng nghĩa.\nThân nhập Tây quốc Phật hương địa, mạn ca khinh vũ quản huyền túy.\nNgọc nữ truyền tống phong lưu nhân, núi cao nhật xuất thái họa tân.\nTháng Thân ở dưới cửa quý nhân được giàu. Tháng Dậu hựu quý hựu giàu. Tháng Thìn Kho Ấn xung, thanh nhã nho sĩ. Tháng Tỵ văn nguyệt, võ thao trọng quyền. Tháng Tý phú môn quý hiển. Tháng Sửu kinh tế thương, vân du. Tháng Hợi song quý.\nChi tiết: Thân vượng, giờ Bính Thân quý",
    "辛酉": "Ngày Phượng Ngọa Kim Sơn. Lâm Lộc, chi tọa Bi Kiên, Thiên Ất Quý Nhân.\nLộc Mã quý nhân thế gian hiếm, phượng ngọa kim sơn tướng soái chờ.\nNhật xuất triều dương ngang trời hành, nguyệt viên Kim Môn tìm thạch lựu.\nTháng Thân Kiếp Tài một đời tài không tụ. Tháng Dậu Bi Kiên tài phùng kiếp. Tháng Tý phúc thọ danh cao, tháng Tỵ tổn vợ. Tháng Dần Mão tài khí thông môn hộ. Tháng Tỵ hợp danh dương bốn biển. Tháng Ngọ can qua kiếm ảnh, tháng Mùi Tuất thanh bần, tháng Hợi giàu mà có hình.\nChi tiết: Nhật Lộc, giờ Mậu Tý, Bính Thân quý",
    "辛亥": "Ngày Hổ Hành Thiên Môn. Lâm Mộc Dục, chi tọa Thương Quan, Chính Tài, Dịch Mã.\nMột khứ Thiên Môn diệu diệu viễn, trường đình dịch lộ quan sơn hàn.\nĐáo kỵ mao lừa hướng Đông khứ, núi cao lệ nhật hoa đoàn đoàn.\nTháng Thân phát phúc mang tật. Tháng Dậu phá lộc nhiều mài giũa. Tháng Dần phú thương. Tháng Mão tập đoàn tài chính. Tháng Tỵ xung thiên nhai du khách. Tháng Ngọ võ công kiến kỳ. Tháng Thổ có quan chức. Tháng Hợi lầm nhập thương hải.\nChi tiết: Tài sinh, Quan tuyệt",
    "壬子": "Ngày Mã Bôn Thiên Hà. Lâm Đế Vượng, tọa chi Kiếp Tài.\nNhâm thủy hạo hạo tràn thiên hạ, hành nhập phương Đông phúc đến nhà.\nGiang Nam bình xuyên vùng cá gạo, mây mưa hồ biển hoa trong gương.\nTháng Tý người bình thường. Tháng Sửu Quan tinh, người thanh tú. Tháng Dần đại phú quý. Tháng Mão hình, ly thê. Tháng Thìn Quan Khố, không xung không phát. Tháng Tỵ tháng Ngọ túi bụi kinh thương. Tháng Thân Dậu văn chương rực rỡ. Tháng Tuất quyền trọng. Tháng Hợi nghèo.\nChi tiết: Nhật Nhận hỷ Hình Xung",
    "壬寅": "Ngày Phúc Lộc. Lâm Bệnh, chi tọa Thực Thần, Thiên Tài Thiên Quan.\nHổ nhảy Thiên Hà uy danh dương, tựa như kỵ báo ra sơn cương.\nLộc đến Trường Sinh Quan đắc địa, chín tầng mưa lộ mộc chu y.\nTháng Mão phá tài, có thành có bại. Tháng Thổ cát. Tháng Ngọ Chính Quan vinh hoa quý hiển. Tháng Thân xung thân cô, người bôn ba. Tháng Dậu phong lưu tài tử. Tháng Tuất tài vượng. Tháng Hợi tài có căn là mạng giàu. Tháng Tý nhân tài có phá. Nhâm thấy Dần là Thực Thần, hiệu là ngày phúc quý vẹn toàn.\nChi tiết: Thủy Hỏa ký tế, gặp giờ Nhâm Dần đại cát",
    "壬辰": "Ngày Sơn Lưu Thủy Trường. Lâm Mộ, chi tọa Thiên Quan, Kiếp Tài, Kho địa (hư danh hư lợi).\nNước sông lưu phương đẹp như họa, đỗ quyên đề huyết hẻm Vu Sơn.\nDưới trăng cưỡi ngựa dạo bình xuyên, một ngày nếm hết hoa mẫu đơn.\nTháng Tý thành trung có bại, nhiều hung. Tháng Sửu Thìn Tuất Mùi đều quý. Tháng Dần Thực vượng người cưỡi lưng rồng, danh lưu tài vượng. Tháng Mão người thanh nhã. Tháng Tỵ Ngọ tậu nhiều trang viên. Tháng Thân bôn lao, đi làng xuyên dã. Tháng Dậu hợp văn chương nổi tiếng, tài tử. Tháng Hợi chủ chưởng quyền.\nChi tiết: Khôi Cương, không hỷ Xung Hình, gặp Kiến Lộc trái lại thành hèn kém",
    "壬午": "Ngày Hoa Hồng Liễu Lục. Lâm Thai, chi tọa Tài, Chính Quan, Dịch Mã.\nLộc Mã mời nhau nhập đế hương, hoa hồng liễu lục che cao đường.\nRa khuyết hỷ nhất Hàm Ngọc Quan, nghìn dặm diệu diệu nhạn bắc thượng.\nTháng Tý nguyệt nhật xung, lập gia ngoại hương, khó đoàn viên. Tháng Sửu Lộc vượng là quý. Tháng Dần quý mà nhiều bệnh. Tháng Mão phú quý song hiển. Tháng Tỵ Tài vượng hỷ Ấn địa. Tháng Ngọ tự hình, yểu tật, Tỷ Kiếp phù trợ thì cát. Tháng Mùi đại phú. Tháng Thân Dậu trạng nguyên cập đệ. Thổ vượng Tứ Quý chủ quyền. Tháng Hợi thân vượng tài vượng.\nChi tiết: Tài Quan song mỹ, lanh lợi có mưu, giờ Nhâm Dần quý",
    "壬申": "Ngày Bạch Hổ Độ Giang. Lâm Trường Sinh, chi tọa Thiên Ấn, Thiên Quan, Kiếp Tài, Dịch Mã.\nMệnh tựa hổ trắng qua Trường Giang, sợ nhất gió mưa nước sông dâng.\nLệ nhật bước vào đất bình xuyên, cành vàng lá ngọc bồi bên người.\nTháng Tý Kiếp Tài hợp Thủy, một đời bôn ba, nghèo. Tháng Dậu thiên vượng mang tật cô thân. Tháng Hợi hình phá tài, thấy Quan tinh đại phú. Tháng Sửu Quan tinh hành Tài vận thanh tú Lộc Quý. Tháng Dần Mão Thực vượng phú quý song toàn. Tháng Tỵ Ngọ thân tọa học đường danh lợi ruổi rong. Tháng Thân Dậu tài bạch tiến thoái. Tháng Thổ quý.\nChi tiết: Thủy Trường sinh, thông minh tú lệ",
    "壬戌": "Ngày Long Xuất Thương Hải. Lâm Quan Đái, chi tọa Chính Tài, Thiên Quan, Chính Ấn, Hỏa Khố.\nThân tọa Hỏa khố Thủy đắc phúc, tây hành đông mời nhân gian khổ.\nTráng sĩ khó đáp chí thanh vân, say xem thiếu nữ mạn ca múa.\nTháng Tý có tật. Tháng Sửu người quý hiển. Tháng Thân Kiêu Ấn Kiếp Tài thân nhân khó vẹn. Tháng Dậu Ấn thụ văn ấn cùng đến. Tháng Dần hợp tư sinh vinh mậu. Tháng Mão thương danh, dị lộ thừa phượng. Tháng Tỵ anh hào thấu phát, tháng Ngọ quý hiển song thân. Tháng Thìn thanh long phi dược. Tháng Hợi lan huệ bất lộc.\nChi tiết: Nguyên Vũ đương quyền, tọa hạ Hỏa Khố, Tài Quan song mỹ. Nếu Thân vượng gặp Hỏa ắt phát phú.",
    "癸丑": "Ngày Tang Liễu Thành Âm. Lâm Quan Đái, chi tọa Thiên Quan, Ấn, Bi Kiên.\nAo đầm tang liễu đầy vườn sắc, tháng hai gió xuân liễu cát bay.\nMạc oán núi cao vận đến muộn, ảnh lý can qua là phỉ thúy.\nTháng Ngọ xung Tài vượng phúc. Tháng Mùi chủ quý. Tháng Tý hợp công danh hiển đạt. Tháng Sửu xuất sĩ dị thường. Tháng Dần Mão Thương Thực vượng nghệ hải sinh nhai. Tháng Tỵ Ngọ lợi lộ kinh thương. Tứ Quý Thổ nguyệt bình bình, tàn tật. Tháng Thân Dậu khoa trường công danh, tháng Hợi Tý quyết chiến nghìn dặm.\nChi tiết: Hỷ Xung không coi là tai họa",
    "癸卯": "Ngày Thiên Tư Văn Tú. Lâm Trường Sinh, chi tọa Thực Thần.\nHọc đường từ quán mệnh quý nhân, thiên tư văn tú người đa tình.\nHỷ nhất ba sao cùng củng chiếu, thơ cầm ca nhạc tiếng quản huyền.\nTháng Tý hình vô lễ đức, bất lợi cho vợ nhưng bình bộ thanh vân. Tháng Sửu quý kỳ hiển. Tháng Dần gian nan nhân sinh. Tháng Mão nhân sinh phú thứ. Tháng Thìn tài bạch phú nguyệt bố mẹ khó nhờ. Tháng Tỵ giàu mà có tàn, tháng Ngọ một đời tài phong. Tháng Thân thư hương sớm toại, tháng Dậu đao bút thành danh xung uyên ương ly hợp. Thổ nguyệt chủ quý, tháng Hợi danh lợi song toàn.\nChi tiết: Nhật quý, suy thần vượng cát",
    "癸巳": "Ngày Thái Hà Bội Ngọc. Lâm Thai, chi tọa Chính Tài Chính Quan, Dịch Mã, Văn Tinh.\nQuý nhân Ngọc Đường đến bái tướng, mực trì suối vọt hảo văn chương.\nVõ sĩ cưỡi ngựa đi thiên hạ, vương công hoàng hậu tựa bình thường.\nTháng Tỵ Tài Quan song mỹ, thi thư cầm họa. Tháng Ngọ trung niên đại phú. Tháng Thân Dậu chung thân lao lụy thấu Quan. Tháng Sửu tú khí. Tháng Thìn sơn minh thủy tú, hồng phấn sinh nhai.\nChi tiết: Tài Quan song mỹ cát tường nhất, giờ Đinh Tỵ quý",
    "癸未": "Ngày Quý Nhân Bội Ngọc. Lâm Mộ, chi tọa Thiên Quan, Thiên Tài.\nNgày lâm Quan khố mệnh tướng soái, nam tử anh dũng nữ quý vinh.\nPhương Tây một chuyến đất phúc lộc, hoa viên thúy đình mã không đi.\nTháng Tý thanh vân đắc lộ là quý. Tháng Sửu ám quỷ xung thương hôn nhân có biến. Tháng Dần tú quý một đời thuận lợi. Tháng Mão võ chức bình thường. Tháng Thìn giàu mà tú quý, tháng Tỵ giàu lại có bệnh phổi. Tháng Mùi nam nữ không con cái, liệt dương. Tháng Thân Dậu văn tự sinh phát. Tháng Hợi tài phát.\nChi tiết: Thân tọa Sát vị phải thân lực tương đương",
    "癸酉": "Ngày Thiên Phúc. Lâm Bệnh, chi tọa Thiên Ấn.\nTiêu sái công danh khởi một phương, một xung một hợp dị tầm thường.\nGiang hồ hoa sái an hưởng phúc, Nam khứ cao sơn thế mạc đương.\nTháng Hợi sinh nhai toại tâm phong lưu. Tháng Tuất bình thường thiện trí mưu. Tháng Dậu đắc tổ nghiệp phá tài. Tháng Thân Ấn vượng văn thượng xuất sĩ. Tháng Dần nghệ kỹ sinh nhai. Tháng Mão xung Ấn phá đại phú. Tháng Tỵ phú thương. Tháng Ngọ người làm ăn. Tháng Thân Dậu Kim Thủy tương hàm văn tú. Tháng Tý Ấn phá bất lộc mạng bình thường.\nChi tiết: Tài Quan vô khí, cần dùng vượng giả thì cát",
    "癸亥": "Ngày Thiên Môn Huyền Thái. Lâm Đế Vượng, chi tọa Thương Quan, Kiếp Tài, Dịch Mã.\nNúi Cửu Hoa mở cửa thiên môn, nhật hành phương Đông hoa tựa biển.\nNếu khứ Tây phương đất Côn Luân, biên tái tướng sĩ luyến cố quốc.\nTháng Mùi hợp Mộc quý, chết ở ngoài. Tháng Tý vợ ly dị tài phân trương. Tháng Hợi Kiếp Tài một đời không chính nghiệp, tán nghiệp. Tứ Quý Thổ nguyệt có tác vi, quyết chiến sa trường. Tháng Dần Mão tập đoàn tài chính kinh doanh hoặc nghệ danh thiên nhai. Tháng Tỵ Ngọ đại phú. Quý Hợi mệnh mỏng nhiều nghèo.\nChi tiết: Được giờ Quý Hợi phu quý",
};

const EMPTIES = {
    '甲子': ['戌', '亥'], '乙丑': ['戌', '亥'],
    '丙寅': ['戌', '亥'], '丁卯': ['戌', '亥'],
    '戊辰': ['戌', '亥'], '己巳': ['戌', '亥'],
    '庚午': ['戌', '亥'], '辛未': ['戌', '亥'],
    '壬申': ['戌', '亥'], '癸酉': ['戌', '亥'],

    '甲戌': ['申', '酉'], '乙亥': ['申', '酉'],
    '丙子': ['申', '酉'], '丁丑': ['申', '酉'],
    '戊寅': ['申', '酉'], '己卯': ['申', '酉'],
    '庚辰': ['申', '酉'], '辛巳': ['申', '酉'],
    '壬午': ['申', '酉'], '癸未': ['申', '酉'],

    '甲申': ['午', '未'], '乙酉': ['午', '未'],
    '丙戌': ['午', '未'], '丁亥': ['午', '未'],
    '戊子': ['午', '未'], '己丑': ['午', '未'],
    '庚寅': ['午', '未'], '辛卯': ['午', '未'],
    '壬辰': ['午', '未'], '癸巳': ['午', '未'],

    '甲午': ['辰', '巳'], '乙未': ['辰', '巳'],
    '丙申': ['辰', '巳'], '丁酉': ['辰', '巳'],
    '戊戌': ['辰', '巳'], '己亥': ['辰', '巳'],
    '庚子': ['辰', '巳'], '辛丑': ['辰', '巳'],
    '壬寅': ['辰', '巳'], '癸卯': ['辰', '巳'],

    '甲辰': ['寅', '卯'], '乙巳': ['寅', '卯'],
    '丙午': ['寅', '卯'], '丁未': ['寅', '卯'],
    '戊申': ['寅', '卯'], '己酉': ['寅', '卯'],
    '庚戌': ['寅', '卯'], '辛亥': ['寅', '卯'],
    '壬子': ['寅', '卯'], '癸丑': ['寅', '卯'],

    '甲寅': ['子', '丑'], '乙卯': ['子', '丑'],
    '丙辰': ['子', '丑'], '丁巳': ['子', '丑'],
    '戊午': ['子', '丑'], '己未': ['子', '丑'],
    '庚申': ['子', '丑'], '辛酉': ['子', '丑'],
    '壬戌': ['子', '丑'], '癸亥': ['子', '丑'],
};

const EMPTIE4S = {
    '甲子': 'Thủy', '乙丑': 'Thủy', '丙寅': 'Thủy', '丁卯': 'Thủy', '戊辰': 'Thủy', '己巳': 'Thủy', '庚午': 'Thủy', '辛未': 'Thủy', '壬申': 'Thủy', '癸酉': 'Thủy',
    '甲申': 'Kim', '乙酉': 'Kim', '丙戌': 'Kim', '丁亥': 'Kim', '戊子': 'Kim', '己丑': 'Kim', '庚寅': 'Kim', '辛卯': 'Kim', '壬辰': 'Kim', '癸巳': 'Kim',
    '甲午': 'Thủy', '乙未': 'Thủy', '丙申': 'Thủy', '丁酉': 'Thủy', '戊戌': 'Thủy', '己亥': 'Thủy', '庚子': 'Thủy', '辛丑': 'Thủy', '壬寅': 'Thủy', '癸卯': 'Thủy',
    '甲寅': 'Kim', '乙卯': 'Kim', '丙辰': 'Kim', '丁巳': 'Kim', '戊午': 'Kim', '己未': 'Kim', '庚申': 'Kim', '辛酉': 'Kim', '壬戌': 'Kim', '癸亥': 'Kim',
};

const LU_TYPES = {
    "甲": {
        '丙寅': 'Phúc Tinh Lộc, Danh Vị Lộc - Cát', '戊寅': 'Phục Mã Lộc - Cát',
        '庚寅': 'Phá Lộc - Bán cát bán hung', '壬寅': 'Chính Lộc, mang Tiệt Lộ Không Vong, ắt làm tăng đạo - Bất cát',
        '甲寅': 'Trường Sinh Lộc - Đại cát', '乙卯': 'Sinh Thành Lộc - Đại cát',
    },
    "乙": {
        '乙卯': 'Hỷ Thần Vượng Lộc - Cát', '丁卯': 'Tiệt Lộ Không Vong - Hung',
        '己卯': 'Tiến Thần Lộc - Cát', '辛卯': 'Phá Lộc, lại là Giao Thần - Bán cát bán hung',
        '癸卯': 'Tử Lộc, tuy quý nhưng cuối cùng nghèo - Hung',
    },
    "丙": {
        '己巳': 'Cửu Thiên Khố Lộc - Cát', '辛巳': 'Tiệt Lộ Không Vong - Hung',
        '乙巳': 'Vượng Mã Lộc - Cát', '丁巳': 'Khố Lộc - Cát',
        '癸巳': 'Phục Quý Thần Lộc - Bán cát bán hung',
    },
    "丁": {
        '庚午': 'Tiệt Lộ Không Vong - Hung', '壬午': 'Đức Hợp Lộc - Cát',
        '甲午': 'Tiến Thần Lộc - Cát', '丙午': 'Hỷ Thần Lộc, giao Dương Nhận - Bán cát',
        '戊午': 'Phục Dương Nhận Lộc - Đa hung',
    },
    "戊": {
        '己巳': 'Cửu Thiên Khố Lộc - Cát', '辛巳': 'Tiệt Lộ Không Vong - Hung',
        '癸巳': 'Quý Thần Lộc, Mậu Quý hóa hợp, có quan vị trọng - Cát', '乙巳': 'Dịch Mã Đồng Hương Lộc - Cát',
        '戊巳': 'Vượng Khố Lộc - Cát',
    },
    "己": {
        '庚午': 'Tiệt Lộ Không Vong - Hung', '壬午': 'Tử Quỷ Lộc - Hung',
        '甲午': 'Tiến Thần Hợp Lộc, tượng hiển đạt - Cát', '丙午': 'Hỷ Thần Lộc - Bán cát',
        '戊午': 'Phục Thần Dương Nhận Lộc - Hung',
    },
    "庚": {
        '壬申': 'Đại Bại Lộc - Hung', '甲申': 'Tiệt Lộ Không Vong Lộc - Hung',
        '丙申': 'Đại Bại Lộc, đa thành bại - Bán cát', '戊申': 'Phục Mã Lộc, trì trệ, nếu gặp Phúc Tinh thì quý cát',
        '庚申': 'Trường Sinh Lộc - Đại cát',
    },
    "辛": {
        '癸酉': 'Phục Thần Lộc, Thủy Hỏa tương phạm - Hung', '乙酉': 'Phá Lộc, thành bại - Hung',
        '丁酉': 'Không Vong Quý Thần Lộc, Đinh mộc thụ khí, Tân thủy mộc dục, chủ sự gian dâm; gặp Hỷ Thần thì cát.',
        '己酉': 'Tiến Thần Lộc - Cát', '辛酉': 'Chính Lộc - Cát',
    },
    "壬": {
        '丁亥': 'Quý Thần Hợp Lộc - Cát', '乙亥': 'Thiên Đức Lộc - Cát',
        '己亥': 'Vượng Lộc - Đại cát', '辛亥': 'Đồng Mã Hương Lộc - Đại cát',
        '癸亥': 'Đại Bại Lộc, nghèo hèn - Hung',
    },
    "癸": {
        '甲子': 'Tiến Thần Lộc, chủ khoa bảng hiển đạt - Cát', '丙子': 'Giao Dương Nhận Lộc, mang Phúc Tinh, quý hiển có quyền - Cát',
        '戊子': 'Phục Dương Nhận Hợp Quý Lộc - Bán cát',
        '庚子': 'Tiến Thần Lộc - Cát', '壬子': 'Chính Dương Nhận Lộc - Hung',
    },
};

const SILING = {
    "寅": "Sau Lập Xuân: Mậu Thổ 7 ngày, Bính Hỏa 7 ngày, Giáp Mộc 16 ngày. Lập Xuân, Vũ Thủy.",
    "卯": "Sau Kinh Trập: Giáp Mộc 10 ngày, Ất Mộc 20 ngày. Kinh Trập, Xuân Phân.",
    "辰": "Sau Thanh Minh: Ất Mộc 9 ngày, Quý Thủy 3 ngày, Mậu Thổ 18 ngày. Thanh Minh, Cốc Vũ.",
    "巳": "Sau Lập Hạ: Mậu Thổ 5 ngày, Canh Kim 9 ngày, Bính Hỏa 16 ngày. Lập Hạ, Tiểu Mãn.",
    "午": "Sau Mang Chủng: Bính Hỏa 10 ngày, Kỷ Thổ 9 ngày, Đinh Hỏa 11 ngày. Mang Chủng, Hạ Chí.",
    "未": "Sau Tiểu Thử: Đinh Hỏa 9 ngày, Ất Mộc 3 ngày, Kỷ Thổ 18 ngày. Tiểu Thử, Đại Thử.",
    "申": "Sau Lập Thu: Mậu Kỷ Thổ 10 ngày, Nhâm Thủy 3 ngày, Canh Kim 17 ngày. Lập Thu, Xử Thử.",
    "酉": "Sau Bạch Lộ: Canh Kim 10 ngày, Tân Kim 20 ngày. Bạch Lộ, Thu Phân.",
    "戌": "Sau Hàn Lộ: Tân Kim 10 ngày, Đinh Hỏa 3 ngày, Mậu Thổ 18 ngày. Hàn Lộ, Sương Giáng.",
    "亥": "Sau Lập Đông: Mậu Thổ 7 ngày, Giáp Mộc 5 ngày, Nhâm Thủy 18 ngày. Lập Đông, Tiểu Tuyết.",
    "子": "Sau Đại Tuyết: Nhâm Thủy 10 ngày, Quý Thủy 20 ngày. Đại Tuyết, Đông Chí.",
    "丑": "Sau Tiểu Hàn: Quý Thủy 9 ngày, Tân Kim 3 ngày, Kỷ Thổ 18 ngày. Tiểu Hàn, Đại Hàn.",
};

const XIUQIUS = {
    "寅": { "Kim": "Tù", "Mộc": "Vượng", "Thủy": "Hưu", "Hỏa": "Tướng", "Thổ": "Tử" },
    "卯": { "Kim": "Tù", "Mộc": "Vượng", "Thủy": "Hưu", "Hỏa": "Tướng", "Thổ": "Tử" },
    "辰": { "Kim": "Tướng", "Mộc": "Tù", "Thủy": "Tử", "Hỏa": "Hưu", "Thổ": "Vượng" },
    "巳": { "Kim": "Tử", "Mộc": "Hưu", "Thủy": "Tù", "Hỏa": "Vượng", "Thổ": "Tướng" },
    "午": { "Kim": "Tử", "Mộc": "Hưu", "Thủy": "Tù", "Hỏa": "Vượng", "Thổ": "Tướng" },
    "未": { "Kim": "Tướng", "Mộc": "Tù", "Thủy": "Tử", "Hỏa": "Hưu", "Thổ": "Vượng" },
    "申": { "Kim": "Vượng", "Mộc": "Tử", "Thủy": "Tướng", "Hỏa": "Tù", "Thổ": "Hưu" },
    "酉": { "Kim": "Vượng", "Mộc": "Tử", "Thủy": "Tướng", "Hỏa": "Tù", "Thổ": "Hưu" },
    "戌": { "Kim": "Tướng", "Mộc": "Tù", "Thủy": "Tử", "Hỏa": "Hưu", "Thổ": "Vượng" },
    "亥": { "Kim": "Hưu", "Mộc": "Tướng", "Thủy": "Vượng", "Hỏa": "Tử", "Thổ": "Tù" },
    "子": { "Kim": "Hưu", "Mộc": "Tướng", "Thủy": "Vượng", "Hỏa": "Tử", "Thổ": "Tù" },
    "丑": { "Kim": "Tướng", "Mộc": "Tù", "Thủy": "Tử", "Hỏa": "Hưu", "Thổ": "Vượng" },
};

const CHENS = {
    "子": "Đầu giờ Tý\nVận này như thế nào, làm việc tiến thoái nhiều, năm đầu tài chưa đến, cuối hạn đủ tài bảo.\nĐầu giờ Tý khắc mẹ trước, tính tình nóng nảy, vợ cả khó cầu, con trưởng có khắc, lục thân lãnh đạm, anh em không hòa thuận, làm việc tiến thoái, năm đầu không thuận, cuối hạn tốt, nghi tay nghề thì cát.\n\nGiữa giờ Tý\nY lộc tự nhiên hưng, một đời gần quý nhân, làm quan làm tể tướng, phú quý danh tiếng lớn.\nGiữa giờ Tý cha mẹ còn, một đời vui vẻ thanh nhàn, y lộc không thiếu, anh em có phần, con cái có thể cầu, lục thân đại vượng, không thể dựa vào tổ nghiệp, ra ngoài chủ có tài lớn.\n\nCuối giờ Tý\nSinh gặp cuối giờ Tý, vận năm đầu chưa thông, lục thân không chỗ dựa, anh em hai phương đông tây.\nCuối giờ Tý khắc cha trước, tính tình rộng rãi, lục thân anh em vô lực, con cái khó cầu, năm đầu vất vả, làm việc có đầu không đuôi, chủ ly tổ làm con nuôi, thờ cúng cha mẹ khác.",
    "丑": "Đầu giờ Sửu\nSinh gặp đầu giờ Sửu, y lộc tích có dư, làm quan có chức phận, điền sản phúc an cư.\nĐầu giờ Sửu cha mẹ song toàn, trước hai mươi không hình khắc, sau hai mươi tiến điền trang, văn võ đều thông, gần người cao quý, có danh phận, lục thân đắc lực, anh em có quyền, con cái tốt.\n\nGiữa giờ Sửu\nSinh ra phát đạt muộn, làm người vất vả nhất, tài lộc tùy thời đến, gặp hỷ lại gặp cát.\nGiữa giờ Sửu khắc cha trước, y lộc bình thường, lòng làm công đạo, tuổi trẻ vất vả, hậu vận tốt, sau ba mươi tám chín phát tài, anh em khó nhờ, lục thân lãnh đạm, ly tổ có thể tay trắng dựng cơ đồ.\n\nCuối giờ Sửu\nKhắc mẹ trước, làm người vất vả, việc lớn một đời thành, lục thân anh em vô lực, con cái đắc lực, y lộc trung bình, năm đầu vất vả, sau bốn mươi phát tài, cuối hạn thắng trước.\nCuối giờ Sửu, một đời phong quang tốt, tài đến không khắc phá, học thuật tay nghề thành.\n",
    "寅": "Đầu giờ Dần\nSinh ra gặp Đại Hao, hai gái đều hình điếu, đầu giường mười đồng tiền, cuối giường quỷ đến gọi.\nĐầu giờ Dần khắc cha trước, gần người cao quý, việc hung thành cát, tuổi trẻ lao khổ, ba mươi năm bôn ba, sau ba mươi bảy tuổi tốt, lục thân lãnh đạm, anh em thưa thớt, con cái đại dụng, có con dưỡng già.\n\nGiữa giờ Dần\nNhà cửa phong quang tốt, sinh ra đại cát tường, một đời thường vui vẻ, cầm bút viết văn chương.\nGiữa giờ Dần cha mẹ đầy đủ, làm việc có quyền bính, y lộc không thiếu, lục thân có phần, anh em giúp đỡ, con cái hai ba, là người có chí thành không cẩu thả.\n\nCuối giờ Dần\nCuối giờ Dần việc nhiều, thân an tâm lại lao, một đời nhiều bệnh tật, thuyền nhỏ trôi trên nước.\nCuối giờ Dần khắc mẹ trước, lục thân vô lực, đầu con khó cầu, anh em không hòa thuận, năm đầu vất vả, qua ba mươi sáu tuổi phát tài, cuối hạn thắng trước, y lộc bình thường, làm việc tiến thoái.",
    "卯": "Đầu giờ Mão\nSinh đầu giờ Mão, làm người vất vả nhất, cơm áo tùy thời độ, bi hỷ tiễn nhau sinh.\nĐầu giờ Mão khắc mẹ trước, làm việc có đầu không đuôi, anh em thiếu lực, lục thân khó nhờ, nghi ly tổ làm con nuôi, năm đầu bôn ba, hình khắc con cái, thực thực giả giả dưỡng già.\n\nGiữa giờ Mão\nỞ trong nhà cao cửa rộng, anh em có chủ trương, một đời hưởng phú quý, văn võ gần quân vương.\nGiữa giờ Mão cha mẹ song toàn, ba mươi năm cha mẹ còn, đàn ông làm quan, đàn bà có phúc, một đời gần quý, đàn bà giúp chồng, lục thân anh em có lực, con cái không thiếu, y lộc có dư.\n\nCuối giờ Mão\nCuối giờ đi đường trình, vất vả lại lao thần, tuổi già thời vận đến, tài lộc tích môn đình.\nCuối giờ Mão khắc cha trước, làm việc bổn phận, năm đầu không toại lao lục bôn ba, ly tổ làm con nuôi, anh em không dựa dẫm, tự chỉnh môn phong, lục thân lãnh đạm, cốt nhục tình thưa, cuối hạn thắng trước.",
    "辰": "Đầu giờ Thìn\nY lộc tự nhiên đến, anh em lục thân đông, cha mẹ khó hình khắc, cảnh già càng không lo.\nĐầu giờ Thìn cha mẹ còn, tính tình nóng nảy, lục thân có lực, con trưởng khó cầu, anh em không hòa thuận, lòng hiền lành, nghi tay nghề sinh nhai, năm đầu bình thường, sau bốn mươi hai tuổi dần tốt.\n\nGiữa giờ Thìn\nY lộc được người nâng, lo trước sau mới cát, lục thân dù lãnh đạm, cuối hạn đủ tiền tài.\nGiữa giờ Thìn khắc cha trước, lòng làm công đạo, tính nóng nảy trực tính, ra vào có quý nhân phù trì, ly tổ thành gia, lục thân anh em tình thưa, năm đầu không thuận, cuối hạn tốt.\n\nCuối giờ Thìn\nY lộc tự nhiên có, áo tía làm quan triều, một sớm mạng phát đạt, phú quý có tiếng tăm.\nCuối giờ Thìn khắc mẹ trước, người thông minh, y lộc đầy đủ, có danh tiếng lớn, lục thân đại vượng, anh em có trông cậy, làm quan đứng đầu, nữ mệnh giúp chồng, vượng con phúc lộc song toàn.",
    "巳": "Đầu giờ Tỵ\nNhà cửa phong quang tốt, nên sớm học văn chương, nữ mệnh có quyền bính, nam mệnh làm quan triều.\nĐầu giờ Tỵ khắc mẹ trước, người có y lộc, lục thân ít lực, anh em khó nhờ, con trưởng khó cầu, vợ chồng có khắc, năm đầu bôn ba, cuối hạn đại lợi, nữ mệnh giúp chồng.\n\nGiữa giờ Tỵ\nGiữa giờ không khắc phá, một đời tích tiền tài, nhờ việc công được tài vật, ra ngoài tốt sắp xếp.\nGiữa giờ Tỵ cha mẹ song toàn, một đời gần quý, tài lộc đủ dùng, anh em có phần, con cái hòa thuận, làm quan triều, thầy dạy, người đứng đầu, việc lớn thành nhỏ, mệnh hào phóng.\n\nCuối giờ Tỵ\nMuốn đi nghìn dặm đường, lòng gấp ngựa đi chậm, cờ vây như lửa trời, đặt xuống không thể biết.\nCuối giờ Tỵ khắc cha trước, gần người cao quý, làm việc khi thành khi bại, con cái khó nhờ, lục thân lãnh đạm, tuổi trẻ tai hối, vất vả bôn ba, cuối hạn thắng trước.",
    "午": "Đầu giờ Ngọ\nGiờ Ngọ tự có uy, ra vào có người theo, một đời thường thụ dụng, lên ngựa quý nhân phò.\nĐầu giờ Ngọ cha mẹ song toàn, lợi hại gần quý, lục thân hòa hợp, anh em có chỗ dựa, con cái ba năm người, y lộc không thiếu, mệnh làm quan lại.\n\nGiữa giờ Ngọ\nSinh ra không tự do, y lộc tài ít cầu, bôn ba lo lắng đến, lãng tử độ xuân thu.\nGiữa giờ Ngọ khắc cha trước, y lộc bình thường, vất vả bôn ba, sau ba mươi tuổi dần tốt, nữ mệnh giúp chồng, nam mệnh trước khó sau dễ, lục thân ít lực, mệnh khi thành khi bại.\n\nCuối giờ Ngọ\nSầu con vợ cha mẹ, tài bạch không thể cầu, tiền trình dù có phần, tất phải cầu trong khổ.\nCuối giờ Ngọ khắc mẹ trước, tính tình nóng nảy, lục thân không dựa dẫm, anh em thiếu lực, con đầu khó cầu, thông minh lanh lợi, tuổi trẻ xui xẻo, bôn ba, cuối hạn vinh hoa.",
    "未": "Đầu giờ Mùi\nRa đời giờ lành tốt, uy quyền tự có dư, mệnh mang thân cao quý, tất đến ao phượng chầu.\nĐầu giờ Mùi cha mẹ song toàn, gần người cao quý, một đời an lạc, lục thân đắc ý, anh em không thiếu, mệnh làm người đứng đầu, đàn bà giúp chồng, biết nặng biết nhẹ.\n\nGiữa giờ Mùi\nY lộc tự nhiên theo, phong quang việc nhỏ làm, văn chương phải có quý, trước mắt phải duy trì.\nGiữa giờ Mùi khắc cha trước, tính tình rộng rãi gần quý, lục thân ít lực, anh em có tình, y lộc bình thường, năm đầu bôn ba, khắc vợ cả, con cái khó nhờ, cuối hạn thắng trước.\n\nCuối giờ Mùi\nTài lộc tùy thời cầu, tình người tốt liền thôi, bi lo liền một hỷ, hào phóng bạn đứng đầu.\nCuối giờ Mùi khắc mẹ trước, một đời gần quý, y lộc bình thường, khi thành khi bại, năm đầu vất vả, lục thân ít lực, anh em không hòa thuận, con cái khó cầu, cuối hạn thắng trước.",
    "申": "Đầu giờ Thân\nSinh ra mệnh vận cao, trong nhà nhiều phú hào, sớm đăng khoa giáp đệ, áo vải thay cẩm bào.\nĐầu giờ Thân cha mẹ song toàn, là người thông minh gần quý, văn võ đều thông, lục thân có lộc, anh em con cái đắc lực, điền sản rộng mở, nữ mệnh giúp chồng vượng con.\n\nGiữa giờ Thân\nLại là người nổi tiếng, thân sơ anh em không tình, tự đến thời vận tới, vẫn như cũ bại gia thanh.\nGiữa giờ Thân khắc cha trước, lục thân không hòa thuận, anh em ít lực, một lo một vui, năm đầu lao lục bôn ba xui xẻo, kết hôn sớm hình khắc, cảnh già tốt, ly tổ cát.\n\nCuối giờ Thân\nY lộc tự nhiên hưng, mưu kế việc việc năng, làm người nhiều tính toán, làm việc có mưu thành.\nCuối giờ Thân khắc mẹ trước, anh em lục thân lãnh đạm, năm đầu vất vả, chủ chiêu phá tướng, ba mươi tuổi bình thường, sau bốn mươi mới tốt, thắng trước.",
    "酉": "Đầu giờ Dậu\nNhà cửa là quang huy, trong triều mặc áo tía, lạy dân liên dạ hỷ, văn võ quý nhân đề.\nĐầu giờ Dậu cha mẹ song toàn, một đời lợi quan gần quý, văn võ đều biết, lục thân có chỗ dựa, anh em khó nhờ, con cái có thể cậy, mệnh làm quan đứng đầu.\n\nGiữa giờ Dậu\nY lộc không hề thiếu, tiếng tăm báo gà bình minh, sáng tối thẹn thùng lệ, vả làm con người khác.\nGiữa giờ Dậu khắc cha trước, tính tình rộng rãi, anh em bất lợi, con trưởng khó cầu, tuổi trẻ không toại, cuối hạn tốt, nam hình vợ, nữ khắc chồng, ly tổ làm con nuôi.\n\nCuối giờ Dậu\nY lộc tốt sắp xếp, tình người việc có thể hài, làm người tâm tính tốt, làm việc có thời đến.\nCuối giờ Dậu khắc mẹ trước, y lộc bình thường, anh em ít lực, năm đầu xui xẻo vất vả, ba mươi bảy tuổi phát tài, vợ chồng hình khắc, nam tử muộn năng, nữ tử dâm loạn, khắc con.",
    "戌": "Đầu giờ Tuất\nLòng từ hành công đạo, phù tài nhập thủ lai, vả có sức tự làm, thường được quý nhân nâng.\nĐầu giờ Tuất khắc mẹ trước, tính tình nóng nảy lòng từ bi, tay chân không đắc lực, làm việc có quyền bính, lục thân bình thường, năm đầu bôn ba vất vả, ba mươi bảy tám tuổi phát tài, cơm áo tốt.\n\nGiữa giờ Tuất\nBình đẳng tâm không lậu, sinh ra vốn có phòng, mật có trời lớn thế, mở miệng làm điên cuồng.\nGiữa giờ Tuất khắc cha trước, lục thân anh em ít lực, vợ chồng hình khắc, con trưởng khó cầu, năm đầu bôn ba lao khổ, sau bốn mươi hai dần tốt, y lộc bình thường, cảnh già có vượng.\n\nCuối giờ Tuất\nY lộc tự an nhiên, bình sinh phúc tự rộng, mọi việc như tâm ý, hưởng phúc thái cẩm nhân.\nCuối giờ Tuất cha mẹ song toàn, tính tình nóng nảy, văn võ đều thông, lục thân anh em có chỗ dựa, chỉ nghi tay nghề, học thuật tinh xảo, vợ chồng bách niên giai lão, ly tổ thì cát.",
    "亥": "Đầu giờ Hợi\nMệnh mang tự nhiên có, vận đầu chưa thông, một sớm thời vận tới, tay trắng chỉnh gia phong.\nĐầu giờ Hợi khắc mẹ trước, tính tình rộng rãi, lục thân ít lực, tình nghĩa tay chân thưa thớt, con cái hai ba, một đời gần quý, y lộc bình thường, năm đầu thiếu toại, cuối hạn thắng trước.\n\nGiữa giờ Hợi\nCó việc biết mưu thi, sinh ra phúc tự dư, lòng tốt tồn công đạo, y lộc càng không thiếu.\nGiữa giờ Hợi cha mẹ đầy đủ, người thông minh nóng nảy, thân thích hòa thuận, anh em con cái có phần, nữ nắm quyền nam, cuối hạn thắng trước, mệnh hưng gia.\n\nCuối giờ Hợi\nY lộc tự khó lường, nam nữ mang khắc thương, vợ chồng không lương đức, hai họ con tương đương.\nCuối giờ Hợi khắc cha trước, tính tình nóng nảy lòng từ bi, lục thân ít lực, anh em khó nhờ, tuổi trẻ lao khổ, nam khắc hai vợ, nữ hình ba chồng, cuối hạn tốt.",
};

const JINS = {
    '甲': 'Thìn Tuất Sửu Mùi nhập Mộ Khố vận; Tháng Tỵ Mùi Thân Dậu Hợi có vận yểu chiết; Tháng Thân Dậu Tuất Hợi điều hậu chờ cải tiến!',
    '乙': 'Thìn Mùi Hợi có vận yểu thọ; Dần Thìn Ngọ Thân Dậu điều hậu chờ cải tiến!',
    '丙': 'Tý Dậu Hợi có vận yểu chiết; Ngọ Mùi Hợi điều hậu chờ cải tiến!',
    '丁': 'Tý Thìn Ngọ Hợi có vận yểu chiết; Dần Tỵ Ngọ Dậu Tuất điều hậu chờ cải tiến!',
    '戊': 'Mão Hợi có vận yểu chiết; Mùi Thìn Tuất điều hậu chờ cải tiến!',
    '己': 'Tý Dần Mão Dậu Hợi có vận yểu tổn; Dần Mão Thìn Tỵ Hợi Tý Sửu điều hậu chờ cải tiến!',
    '庚': 'Tý Mão Thìn Tỵ Ngọ Tuất có vận tổn thọ; Dần Mão Thìn Tỵ Ngọ Thân điều hậu chờ cải tiến!',
    '辛': 'Sửu Dần có vận yểu chiết; Dần Mão Tỵ Ngọ Dậu Tuất Hợi điều hậu chờ cải tiến!',
    '壬': 'Tỵ Mùi Thân có vận tổn thọ; Dần Mão Tỵ Ngọ Hợi điều hậu chờ cải tiến!',
    '癸': 'Sửu Dần Ngọ Tuất Hợi có vận tổn thọ; Tý Sửu Thìn Tỵ Ngọ Mùi Hợi điều hậu chờ cải tiến!',
};

const TIAOHOUS = {
    '甲寅': 'Mộc hàn hướng dương, hỷ Bính hỏa sưởi ấm, Quý thủy tưới bón để mầm non phát triển.',
    '甲卯': 'Dương mộc vượng cực, hỷ Canh kim rèn luyện thành vật phẩm, Mậu Bính trợ giúp là cát.',
    '甲辰': 'Mộc đắc khí Xuân, hỷ Canh kim sơ thông, Nhâm Đinh phối hợp để Mộc không quá ẩm.',
    '甲巳': 'Mộc lâm hưu địa, hỷ Quý thủy nhuận gốc, Canh kim phối hợp để ngăn Hỏa quá vượng.',
    '甲午': 'Mộc hỏa giao huy, hỷ Quý thủy điều hậu gấp, Canh Đinh là phụ.',
    '甲未': 'Mộc hưu Thổ táo, hỷ Quý thủy tưới mát, Canh kim rèn luyện mộc già.',
    '甲申': 'Mộc lâm Tuyệt địa, hỷ Canh kim trợ Sát, Nhâm Đinh hóa Sát sinh Thân.',
    '甲酉': 'Mộc lâm Thai địa, hỷ Canh kim rèn luyện, Bính Đinh sưởi ấm Kim hàn.',
    '甲戌': 'Mộc táo Thổ khô, hỷ Canh kim sơ thông, Nhâm Giáp Quý Đinh phối hợp.',
    '甲亥': 'Mộc đắc Trường sinh, hỷ Canh kim rèn luyện, Mậu Đinh Bính sưởi ấm Thủy lạnh.',
    '甲子': 'Mộc hàn Thủy đông, hỷ Đinh hỏa sưởi ấm, Bính Canh trợ giúp.',
    '甲丑': 'Mộc hàn Thổ đóng băng, hỷ Đinh hỏa sưởi ấm, Bính Canh phá băng.',

    '乙寅': 'Mộc hàn mầm non, hỷ Bính hỏa hướng dương, Quý thủy nuôi dưỡng.',
    '乙卯': 'Mộc vượng đắc lệnh, hỷ Bính hỏa phát tiết tú khí, Quý thủy nhuận mầm.',
    '乙辰': 'Mộc ẩm Thổ nhuận, hỷ Quý thủy tưới bón, Mậu Bính sưởi ấm.',
    '乙巳': 'Mộc lâm Bệnh địa, hỷ Quý thủy nhuận gốc để chống chọi với Hỏa nóng.',
    '乙午': 'Mộc hỏa vượng, hỷ Quý thủy điều hậu, Bính hỏa phát tiết.',
    '乙未': 'Mộc táo Thổ khô, hỷ Quý thủy nhuận Thổ, Bính hỏa hướng dương.',
    '乙申': 'Mộc lâm Thai địa, hỷ Canh kim thành Quan, Kỷ Quý sinh phù.',
    '乙酉': 'Mộc lâm Tuyệt địa, hỷ Quý thủy hóa Sát, Đinh Bính sưởi ấm.',
    '乙戌': 'Mộc táo Thổ khô, hỷ Quý thủy nhuận gốc, Tân kim thấu lộ.',
    '乙亥': 'Mộc đắc khí Thủy, hỷ Bính hỏa sưởi ấm, Mậu thổ ngăn Thủy phiêu lưu.',
    '乙子': 'Mộc hàn Thủy đông, hỷ Bính hỏa sưởi ấm tuyệt đối.',
    '乙丑': 'Mộc hàn Thổ đông, hỷ Bính hỏa phá băng sưởi ấm.',

    '丙寅': 'Hỏa ngàn hoa nở, hỷ Nhâm thủy điều tiết, Canh kim sinh Thủy.',
    '丙卯': 'Hỏa đắc mộc sinh, hỷ Nhâm thủy ánh dương, Kỷ thổ phát tiết.',
    '丙辰': 'Hỏa lâm nhuận Thổ, hỷ Nhâm thủy chiếu rọi, Giáp mộc sơ thông.',
    '丙巳': 'Hỏa vượng đắc lệnh, hỷ Nhâm thủy điều hậu, Quý Canh phối hợp.',
    '丙午': 'Hỏa vượng cực hỷ Nhâm thủy chế Nhận, Canh kim sinh Thủy.',
    '丙未': 'Hỏa táo Thổ khô, hỷ Nhâm thủy nhuận Thổ, Canh kim sinh Thủy.',
    '丙申': 'Hỏa lâm Bệnh địa, hỷ Nhâm thủy trợ khí, Mậu thổ ngăn Thủy.',
    '丙酉': 'Hỏa lâm Tử địa, hỷ Nhâm thủy ánh dương, Quý thủy phối hợp.',
    '丙戌': 'Hỏa lâm Mộ địa, hỷ Giáp mộc sơ thông Thổ, Nhâm thủy điều tiết.',
    '丙亥': 'Hỏa lâm Tuyệt địa, hỷ Giáp mộc sinh phù, Canh Mậu Nhâm phối hợp.',
    '丙子': 'Hỏa hàn Thủy đông, hỷ Nhâm thủy chiếu rọi sông băng, Kỷ Mậu ngăn Thủy.',
    '丙丑': 'Hỏa hàn Thổ đóng băng, hỷ Nhâm thủy ánh dương, Giáp mộc sinh phù.',

    '丁寅': 'Hỏa đắc mộc sinh, hỷ Giáp mộc dẫn hỏa, Canh kim đốn mộc.',
    '丁卯': 'Hỏa lâm Bệnh địa, hỷ Canh kim phát tài, Giáp mộc sinh phù.',
    '丁辰': 'Hỏa tiết vào Thổ, hỷ Giáp mộc sơ thông, Canh kim phối hợp.',
    '丁巳': 'Hỏa vượng đắc Nhẫn, hỷ Giáp mộc dẫn hỏa, Canh kim rèn luyện.',
    '丁午': 'Hỏa vượng cực, hỷ Nhâm Quý thủy điều hậu, Canh kim sinh Thủy.',
    '丁未': 'Hỏa táo Thổ khô, hỷ Giáp mộc sinh Thân, Canh Nhâm điều tiết.',
    '丁申': 'Hỏa lâm Bệnh địa, hỷ Giáp mộc sinh phù, Bính Canh Mậu phối hợp.',
    '丁酉': 'Hỏa lâm Trường sinh (giả), hỷ Giáp mộc sinh phù, Bính Canh Mậu trợ giúp.',
    '丁戌': 'Hỏa lâm Mộ địa, hỷ Giáp mộc sơ thông, Mậu Canh phát tiết.',
    '丁亥': 'Hỏa lâm Thai địa, hỷ Giáp mộc sinh phù, Canh kim phối hợp.',
    '丁子': 'Hỏa hàn Thủy đông, hỷ Bính hỏa trợ uy sưởi ấm.',
    '丁丑': 'Hỏa hàn Thổ đóng băng, hỷ Giáp mộc sinh phù, Canh kim phối hợp.',

    '戊寅': 'Thổ đắc mộc sơ thông, hỷ Bính hỏa sưởi ấm, Quý Giáp phối hợp.',
    '戊卯': 'Thổ yếu mộc vượng, hỷ Bính hỏa hóa Sát, Quý Giáp phối hợp.',
    '戊辰': 'Thổ dày mộc sơ, hỷ Giáp mộc khai phá, Quý Bính điều hậu.',
    '戊巳': 'Thổ vượng đắc lệnh, hỷ Giáp mộc sơ thông, Quý Bính phối hợp.',
    '戊午': 'Thổ táo Nhận vượng, hỷ Nhâm thủy điều hậu, Bính Giáp trợ giúp.',
    '戊未': 'Thổ vượng cực khô, hỷ Quý thủy nhuận Thổ, Giáp Bính phối hợp.',
    '戊申': 'Thổ tiết vào Kim, hỷ Bính hỏa sưởi ấm, Giáp Quý phối hợp.',
    '戊酉': 'Thổ lâm Tử địa, hỷ Bính hỏa sinh phù, Quý thủy nhuận Thổ.',
    '戊戌': 'Thổ khô ráo cực, hỷ Giáp mộc sơ thông, Quý Bính điều hậu.',
    '戊亥': 'Thổ ẩm Thủy vượng, hỷ Giáp mộc sơ thông, Bính hỏa sưởi ấm.',
    '戊子': 'Thổ hàn Thủy đông, hỷ Bính hỏa sưởi ấm, Giáp mộc sơ thông.',
    '戊丑': 'Thổ hàn băng đóng, hỷ Bính hỏa sưởi ấm tuyệt đối, Giáp mộc hỗ trợ.',

    '己寅': 'Thổ hàn mầm mọc, hỷ Bính hỏa hướng dương, Giáp Canh phối hợp.',
    '己卯': 'Thổ ẩm mộc vượng, hỷ Giáp mộc sơ thông, Quý Bính điều hậu.',
    '己辰': 'Thổ nhuận khí hòa, hỷ Bính hỏa sưởi ấm, Giáp Quý phối hợp.',
    '己巳': 'Thổ đắc vượng hỏa, hỷ Quý thủy nhuận Thổ, Bính hỏa sưởi ấm.',
    '己午': 'Thổ táo hỏa vượng, hỷ Quý thủy nhuận Thổ, Bính hỏa chiếu rọi.',
    '己未': 'Thổ vượng cực táo, hỷ Quý thủy nhuận Thổ, Bính hỏa trợ giúp.',
    '己申': 'Thổ tiết vào Kim, hỷ Bính hỏa sưởi ấm, Quý thủy nhuận Thổ.',
    '己酉': 'Thổ lâm Trường sinh (giả), hỷ Bính hỏa sưởi ấm, Quý thủy nhuận Thổ.',
    '己戌': 'Thổ khô ráo táo, hỷ Giáp mộc sơ thông, Quý Bính phối hợp.',
    '己亥': 'Thổ ẩm Thủy vượng, hỷ Bính hỏa sưởi ấm, Mậu Giáp ngăn Thủy.',
    '己子': 'Thổ hàn Thủy đông, hỷ Bính hỏa sưởi ấm, Mậu Giáp ngăn Thủy.',
    '己丑': 'Thổ hàn băng đóng, hỷ Bính hỏa sưởi ấm, Mậu Giáp phối hợp.',

    '庚寅': 'Kim tuyệt tại mộc, hỷ Mậu thổ sinh phù, Bính Giáp Đinh Nhâm phối hợp.',
    '庚卯': 'Kim lâm Thai địa, hỷ Đinh hỏa rèn luyện, Bính Giáp Canh trợ giúp.',
    '庚辰': 'Kim đắc Thổ sinh, hỷ Giáp mộc sơ thông, Nhâm Đinh Quý phối hợp.',
    '庚巳': 'Kim lâm Trường sinh, hỷ Nhâm thủy tôi luyện, Bính Mậu Đinh phối hợp.',
    '庚午': 'Kim bị hỏa thiêu, hỷ Nhâm thủy điều hậu, Quý thủy phối hợp.',
    '庚未': 'Kim lâm Quan đới, hỷ Đinh hỏa rèn luyện, Giáp mộc sơ thông.',
    '庚申': 'Kim vượng đắc lệnh, hỷ Đinh hỏa rèn luyện thành vật dụng, Giáp mộc phát tài.',
    '庚酉': 'Kim vượng cực Nhẫn, hỷ Đinh hỏa rèn Nhận, Bính Giáp trợ giúp.',
    '庚戌': 'Kim lâm Mộ địa, hỷ Giáp mộc sơ thông Thổ, Nhâm thủy rửa Kim.',
    '庚亥': 'Kim lấm Thủy lạnh, hỷ Đinh hỏa sưởi ấm, Bính hỏa hỗ trợ.',
    '庚子': 'Kim hàn Thủy đông, hỷ Đinh hỏa sưởi ấm, Bính Giáp phối hợp.',
    '庚丑': 'Kim hàn băng đóng, hỷ Bính hỏa phá băng, Giáp Đinh rèn luyện.',

    '辛寅': 'Kim tuyệt tại mộc, hỷ Kỷ thổ sinh phù, Canh Nhâm phối hợp.',
    '辛卯': 'Kim lâm Tuyệt địa, hỷ Nhâm thủy rửa sạch, Giáp mộc sơ thông.',
    '辛辰': 'Kim đắc Thổ sinh, hỷ Nhâm thủy rửa Kim, Giáp mộc sơ thông.',
    '辛巳': 'Kim lâm Tử địa, hỷ Nhâm thủy rửa sạch, Quý Giáp phối hợp.',
    '辛午': 'Kim bị hỏa thiêu, hỷ Nhâm thủy điều hậu, Quý Tỵ trợ giúp.',
    '辛未': 'Kim táo Thổ khô, hỷ Nhâm thủy nhuận Thổ, Giáp Canh phối hợp.',
    '辛申': 'Kim tiết vào Thủy, hỷ Nhâm thủy ánh dương, Mậu Giáp ngăn Thủy.',
    '辛酉': 'Kim vượng đắc lệnh, hỷ Nhâm thủy rửa Kim, Thân kim trợ giúp.',
    '辛戌': 'Kim lâm Mộ địa, hỷ Nhâm thủy rửa Kim, Giáp mộc sơ thông Thổ.',
    '辛亥': 'Kim lấm Thủy lạnh, hỷ Nhâm thủy rửa sạch, Bính hỏa sưởi ấm.',
    '辛子': 'Kim hàn Thủy đông, hỷ Bính hỏa sưởi ấm, Nhâm Mậu Giáp phối hợp.',
    '辛丑': 'Kim hàn băng đóng, hỷ Bính hỏa phá băng, Mậu Nhâm Kỷ phối hợp.',

    '壬寅': 'Thủy tiết vào mộc, hỷ Canh kim sinh phù, Mậu Bính phối hợp.',
    '壬卯': 'Thủy lâm Tử địa, hỷ Mậu thổ ngăn nước, Canh Tân sinh phù.',
    '壬辰': 'Thủy lâm Mộ địa, hỷ Giáp mộc sơ thông, Canh kim sinh phù.',
    '壬巳': 'Thủy lâm Tuyệt địa, hỷ Nhâm thủy trợ khí, Canh Tân Quý phối hợp.',
    '壬午': 'Thủy bị Hỏa thiêu, hỷ Quý thủy trợ khí, Tân Canh sinh phù.',
    '壬未': 'Thủy táo Thổ khô, hỷ Tân kim sinh phù, Giáp mộc sơ thông.',
    '壬申': 'Thủy đắc Trường sinh, hỷ Mậu thổ ngăn nước, Đinh hỏa sưởi ấm.',
    '壬酉': 'Thủy đắc vượng Kim, hỷ Giáp mộc sơ thông, Canh kim phối hợp.',
    '壬戌': 'Thủy lâm Quan đới, hỷ Giáp mộc sơ thông, Bính hỏa sưởi ấm.',
    '壬亥': 'Thủy vượng đắc lệnh, hỷ Mậu thổ ngăn nước, Canh Bính sưởi ấm.',
    '壬子': 'Thủy vượng cực Nhẫn, hỷ Mậu thổ ngăn Nhận, Bính hỏa sưởi ấm.',
    '壬丑': 'Thủy hàn băng đóng, hỷ Bính hỏa phá băng, Giáp Đinh sưởi ấm.',

    '癸寅': 'Thủy tiết vào mộc, hỷ Tân kim sinh phù, Bính hỏa sưởi ấm.',
    '癸卯': 'Thủy lâm Trường sinh (giả), hỷ Canh Tân sinh phù tuyệt đối.',
    '癸辰': 'Thủy lâm Mộ địa, hỷ Bính hỏa sưởi ấm, Giáp Tân phối hợp.',
    '癸巳': 'Thủy lâm Thai địa, hỷ Tân kim sinh phù, tránh bị Hỏa thiêu.',
    '癸午': 'Thủy bị hỏa thiêu, hỷ Canh kim sinh phù, Quý Nhâm trợ khí.',
    '癸未': 'Thủy táo Thổ khô, hỷ Canh kim sinh phù, Nhâm Tân Quý phối hợp.',
    '癸申': 'Thủy đắc vượng Kim, hỷ Đinh hỏa sưởi ấm, tránh Thủy quá lạnh.',
    '癸酉': 'Thủy đắc vượng Kim, hỷ Tân kim sinh phù, Bính hỏa sưởi ấm.',
    '癸戌': 'Thủy táo Thổ khô, hỷ Tân kim sinh phù, Nhâm Giáp Quý phối hợp.',
    '癸亥': 'Thủy vượng đắc lệnh, hỷ Canh kim sinh phù, Mậu Tân Đinh phối hợp.',
    '癸子': 'Thủy vượng cực Nhẫn, hỷ Bính hỏa sưởi ấm, Tân kim sinh phù.',
    '癸丑': 'Thủy hàn băng đóng, hỷ Bính hỏa phá băng, Đinh hỏa sưởi ấm.',
};

const JINBUHUAN = {
    '甲子': 'Điều hậu: Hỷ Đinh Kỵ Nhâm Quý  Đại vận: Hỷ nghịch hành Thủy Mộc Kỵ Ngọ Mùi  Ghi chú: Hỷ Quan Sát',
    '甲丑': 'Điều hậu: Hỷ Đinh Kỵ Nhâm Tân Quý  Đại vận: Hỷ Dần Mão Thân Dậu Kỵ Ngọ Mùi',
    '甲寅': 'Điều hậu: Hỷ Bính Quý Kỵ Mậu Kỷ  Đại vận: Hỷ nghịch hành Kim Thủy Kỵ Ngọ Mùi  Ghi chú: Tài, Sát',
    '甲卯': 'Điều hậu: Hỷ Canh Kỵ Nhâm Quý  Đại vận: Bất kể thuận nghịch Kỵ Thân Dậu',
    '甲辰': 'Điều hậu: Hỷ Canh Kỵ Đinh Quý  Đại vận: Hỷ Thân Dậu Kỵ Dần Mão Tỵ Ngọ Ghi chú: Chính Quan căn thâm',
    '甲巳': 'Điều hậu: Hỷ Quý Kỵ Mậu Kỷ  Đại vận: Hỷ Dần Mão Kỵ Ngọ Mùi (yểu) Ghi chú: Căn thâm Tài Quan',
    '甲午': 'Điều hậu: Hỷ Quý Kỵ Mậu Kỷ  Đại vận: Hỷ Hợi Tý Dần Mão Kỵ Thân Dậu',
    '甲未': 'Điều hậu: Hỷ Quý Kỵ Mậu Ất Kỷ  Đại vận: Hỷ Hợi Tý Dần Kỵ Thân Dậu (yểu) Ghi chú: Căn thâm Tài Quan',
    '甲申': 'Điều hậu: Hỷ Bính Kỵ Nhâm Quý  Đại vận: Hỷ Hợi Tý Dần Kỵ Ngọ Tỵ (yểu) Ghi chú: Kỵ vô căn Sát vượng',
    '甲酉': 'Điều hậu: Hỷ Giáp Nhâm Kỵ Đinh  Đại vận: Hỷ Hợi Tý Kỵ Ngọ (yểu) Ghi chú: Chính Quan',
    '甲戌': 'Điều hậu: Hỷ Tân Nhâm Kỵ Đinh  Đại vận: Hỷ thuận Hợi Mùi Kỵ Thìn Ghi chú: Tài Quan',
    '甲亥': 'Điều hậu: Hỷ Đinh Kỵ Nhâm Quý  Đại vận: Hỷ thuận Dần Mão Kỵ Ngọ Mùi (yểu) Ghi chú: Thất Sát',

    '乙子': 'Điều hậu: Hỷ Bính Kỵ Nhâm  Đại vận: Hỷ Tuất Thân Dậu Kỵ Hợi Sửu Ghi chú: Kỵ Quan Sát thành cục',
    '乙丑': 'Điều hậu: Hỷ Bính Kỵ Tân Nhâm  Đại vận: Hỷ Tỵ Ngọ Mùi Dần Mão',
    '乙寅': 'Điều hậu: Hỷ Bính Kỵ Nhâm  Đại vận: Hỷ Tỵ Ngọ Thân Dậu Kỵ Sửu Hợi Tý Ghi chú: Tài Quan',
    '乙卯': 'Điều hậu: Hỷ Bính Quý Kỵ Nhâm Kỷ  Đại vận: Hỷ Tỵ Ngọ Thân Dậu Kỵ Mão Tý Hợi',
    '乙辰': 'Điều hậu: Hỷ Bính Kỵ Quý  Đại vận: Hỷ Thân Dậu Kỵ Tuất (yểu)',
    '乙巳': 'Điều hậu: Hỷ Quý Kỵ Mậu Kỷ  Đại vận: Hỷ Hợi Tý Mão Dần Kỵ Thân Dậu (tai bệnh) Ghi chú: Kỵ vô căn',
    '乙午': 'Điều hậu: Hỷ Quý Kỵ Mậu Kỷ  Đại vận: Hỷ Thìn Mão Dần Kỵ Thân Dậu (tai bệnh) Ghi chú: Kỵ thân khinh',
    '乙未': 'Điều hậu: Hỷ Quý Bính Kỵ Ất Nhâm Kỷ  Đại vận: Hỷ Tỵ Ngọ Dần Mão Kỵ Thân Dậu Tý (yểu) Ghi chú: Quan Sát',
    '乙申': 'Điều hậu: Hỷ Bính Quý Kỵ Nhâm  Đại vận: Hỷ Mùi Ngọ Tỵ Kỵ Mậu Hợi Tý Ghi chú: Kỵ thân nhu',
    '乙酉': 'Điều hậu: Hỷ Quý Đinh Kỵ Kỷ Nhâm  Đại vận: Hỷ Mùi Ngọ Tỵ Kỵ Nhật chủ vô căn Ghi chú: Kỵ vô căn',
    '乙戌': 'Điều hậu: Hỷ Quý Tân Kỵ Đinh  Đại vận: Kỵ Dậu Hợi (tai bệnh)',
    '乙亥': 'Điều hậu: Hỷ Bính Mậu Kỵ Nhâm Giáp  Đại vận: Hỷ nghịch Thân Dậu Kỵ Thìn (yểu) Ghi chú: Hỷ Quan Sát',

    '丙子': 'Điều hậu: Hỷ Nhâm Kỵ Kỷ  Đại vận: Hỷ Dần Mão Tỵ Ngọ Kỵ Hợi Thân Dậu (yểu) Ghi chú: Ấn trọng',
    '丙丑': 'Điều hậu: Hỷ Nhâm Giáp Kỵ Tân Kỷ  Đại vận: Hỷ Thân Dậu Tuất Kỵ Dần Mão Tỵ Ngọ (tai họa) Ghi chú: Hỷ Ấn kỵ căn thiển',
    '丙寅': 'Điều hậu: Hỷ Nhâm Canh Kỵ Kỷ  Đại vận: Hỷ Thân Dậu Tuất Kỵ Mão',
    '丙卯': 'Điều hậu: Hỷ Nhâm Kỷ Kỵ Giáp  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Dần Thìn Ghi chú: Kỵ vô Quan',
    '丙辰': 'Điều hậu: Hỷ Nhâm Kỵ Quý  Đại vận: Hỷ Tuất Sửu Kỵ Tỵ Ngọ Hợi Tý Ghi chú: Hỷ Mậu Kỷ',
    '丙巳': 'Điều hậu: Hỷ Nhâm Canh Kỵ Đinh  Đại vận: Hỷ Thân Dậu Dần Mão Kỵ Tuất (tai họa) Ghi chú: Hỷ Quan Sát',
    '丙午': 'Điều hậu: Hỷ Nhâm Kỵ Kỷ Đinh  Đại vận: Hỷ Thân Dậu Hợi Sửu Kỵ Dần Mão Ghi chú: Hỷ Sát',
    '丙未': 'Điều hậu: Hỷ Quý Canh Kỵ Ất  Đại vận: Hỷ Thân Dậu Hợi Tý Kỵ Dần Mão Ghi chú: Kỵ Sát hỷ Quan',
    '丙申': 'Điều hậu: Hỷ Bính Kỵ Nhâm Quý  Đại vận: Hỷ Dần Mão Tỵ Ngọ Kỵ Hợi Tý Ghi chú: Hỷ tòng hóa',
    '丙酉': 'Điều hậu: Hỷ Nhâm Quý Kỵ Mậu Kỷ  Đại vận: Hỷ Hợi Tý Kỵ Dần Mão (yểu) Ghi chú: Kỵ Tỷ Kiếp',
    '丙戌': 'Điều hậu: Hỷ Giáp Nhâm Kỵ Đinh Kỷ  Đại vận: Hỷ Dần Mão Kỵ Hợi Tý Thìn Ghi chú: Hỷ Sát kỵ Quan',
    '丙亥': 'Điều hậu: Hỷ Giáp Nhâm Kỵ Kỷ  Đại vận: Hỷ Dần Mão Tỵ Ngọ Kỵ Thân Dậu (yểu)',

    '丁子': 'Điều hậu: Hỷ Giáp Canh Kỵ Kỷ Bính  Đại vận: Hỷ Dần Mão Thìn Kỵ Thân Dậu Tuất (yểu) Ghi chú: Thất Sát',
    '丁丑': 'Điều hậu: Hỷ Giáp Canh Kỵ Tân Kỷ Bính  Đại vận: Hỷ Dần Mão Thìn Kỵ Tỵ Ngọ Mùi Ghi chú: Đại kỵ Thổ nhiều',
    '丁寅': 'Điều hậu: Hỷ Nhâm Canh Kỵ Kỷ Đinh  Đại vận: Hỷ Tỵ Ngọ Mùi Hợi Tý Kỵ Thân Dậu (tai họa) Ghi chú: Hỷ Thủy kỵ Thổ nhiều',
    '丁卯': 'Điều hậu: Hỷ Canh Giáp Kỵ Bính  Đại vận: Hỷ Tỵ Ngọ Hợi Tý Kỵ Dần Mão Thân Dậu Ghi chú: Vô Quan độc Sát',
    '丁辰': 'Điều hậu: Hỷ Giáp Canh Kỵ Quý Bính  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Tỵ Tuất Hợi (yểu) ',
    '丁巳': 'Điều hậu: Hỷ Canh Giáp Kỵ Bính  Đại vận: Hỷ Canh Giáp Kỵ Bính',
    '丁午': 'Điều hậu: Hỷ Nhâm Quý Canh Kỵ Đinh  Đại vận: Hỷ Hợi Tý Kỵ Tuất Mùi Ghi chú: Kỵ vô Thủy (yểu)',
    '丁未': 'Điều hậu: Hỷ Giáp Nhâm Canh Kỵ Ất Đinh  Đại vận: Hỷ Thân Dậu Kỵ Tỵ Ngọ Ghi chú: Hỷ Kim Tài',
    '丁申': 'Điều hậu: Hỷ Giáp Canh Bính Kỵ Nhâm  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Hợi Tý Ghi chú: Thân cường căn thâm',
    '丁酉': 'Điều hậu: Hỷ Tân Giáp Bính Kỵ Đinh  Đại vận: Hỷ Thân Mùi Ngọ Tỵ Kỵ Tuất Sửu Ghi chú: Hỷ Quan Sát',
    '丁戌': 'Điều hậu: Hỷ Giáp Canh Kỵ Đinh  Đại vận: Hỷ Dần Mão Tỵ Ngọ Kỵ Hợi Tý (yểu) ',
    '丁亥': 'Điều hậu: Hỷ Giáp Canh Kỵ Bính  Đại vận: Hỷ Dần Mão Tỵ Ngọ Kỵ Thân Dậu (yểu) Ghi chú: Hỷ Quan kỵ Sát hỗn',

    '戊子': 'Điều hậu: Hỷ Bính Giáp Kỵ Tân  Đại vận: Hỷ Thìn Tuất Kỵ Dần Mão Thân Dậu Ghi chú: Hỷ Thìn Tuất tọa chi',
    '戊丑': 'Điều hậu: Hỷ Bính Giáp Kỵ Tân Canh  Đại vận: Hỷ Dần Mão Hợi Tý Kỵ Tỵ Ngọ Thân Dậu Ghi chú: Hỷ Tài Sát',
    '戊寅': 'Điều hậu: Hỷ Bính Giáp Quý Kỵ Nhâm  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Hợi Tý Giáp ',
    '戊卯': 'Điều hậu: Hỷ Bính Giáp Quý Kỵ Tân  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Dậu (yểu) Ghi chú: Hỷ Hỏa',
    '戊辰': 'Điều hậu: Hỷ Giáp Bính Nhâm Kỵ Quý  Đại vận: Hỷ Thân Dậu Tỵ Ngọ Kỵ Tuất Ghi chú: Hỷ Thủy Mộc Tài Quan',
    '戊巳': 'Điều hậu: Hỷ Giáp Bính Quý Kỵ Mậu  Đại vận: Hỷ Dần Mão Hợi Tý Kỵ Thân Dậu Tỵ Ngọ Ghi chú: Hỷ Tài Sát',
    '戊午': 'Điều hậu: Hỷ Nhâm Giáp Bính Kỵ Quý  Đại vận: Hỷ Dần Mão Kỵ Tý ',
    '戊未': 'Điều hậu: Hỷ Nhâm Bính Giáp Kỵ Ất  Đại vận: Hỷ Dần Mão Thìn Kỵ Hợi Tý',
    '戊申': 'Điều hậu: Hỷ Bính Giáp Quý Kỵ Canh  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Hợi Tý Sửu (tai họa) Ghi chú: Hỷ Tài Sát',
    '戊酉': 'Điều hậu: Hỷ Bính Quý Kỵ Nhâm  Đại vận: Hỷ Tỵ Ngọ Kỵ Hợi Tý Mão Ghi chú: Hỷ thân cường',
    '戊戌': 'Điều hậu: Hỷ Giáp Quý Kỵ Đinh  Đại vận: Kỵ Thìn Ghi chú: Hỷ Tài Sát',
    '戊亥': 'Điều hậu: Hỷ Giáp Bính Kỵ Tân  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Dậu Mão Thìn',

    '己子': 'Điều hậu: Hỷ Bính Giáp Kỵ Mậu  Đại vận: Hỷ Tỵ Mùi Tuất Kỵ Dần Mão (yểu) Ghi chú: Kỵ thân nhược Quan Sát hỗn',
    '己丑': 'Điều hậu: Hỷ Bính Giáp Kỵ Tân Kỷ  Đại vận: Tý Hợi Thân Dậu Kỵ Mùi Ghi chú: Kỵ Tỷ Kiên',
    '己寅': 'Điều hậu: Hỷ Bính Quý Kỵ Nhâm  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Sửu Tý (yểu) Ghi chú: Kỵ thân nhu',
    '己卯': 'Điều hậu: Hỷ Giáp Quý Kỵ Kỷ  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Dần (yểu) Ghi chú: Kỵ Quan Sát hội',
    '己辰': 'Điều hậu: Hỷ Bính Nhâm Kỵ Quý  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Mão Dần Sửu Tuất ',
    '己巳': 'Điều hậu: Hỷ Quý Bính Tân Kỵ Mậu  Đại vận: Hỷ Hợi Tý Dần Mão  Kỵ Thân Dậu ',
    '己午': 'Điều hậu: Hỷ Quý Bính Kỵ 己 Canh  Đại vận: Hỷ Mùi Thân Dần Mão  Kỵ Hợi Tý  ',
    '己未': 'Điều hậu: Hỷ Quý Bính Kỵ Ất  Đại vận: Kỵ Sửu  Ghi chú: Hỷ Thất Sát',
    '己申': 'Điều hậu: Hỷ Bính Quý Kỵ Giáp  Đại vận: Hỷ Tỵ Ngọ Mùi  Kỵ Dần Mão (yểu) Ghi chú: Thân cường',
    '己酉': 'Điều hậu: Hỷ Bính Quý Kỵ Tân  Đại vận: Hỷ Dần Tỵ Ngọ  Kỵ Thân Tuất Ghi chú: Kỵ vô căn (yểu)',
    '己戌': 'Điều hậu: Hỷ Giáp Bính Quý Kỵ Đinh Canh  Đại vận: Kỵ Tuất ',
    '己亥': 'Điều hậu: Hỷ Bính Giáp Kỵ 己  Đại vận: Hỷ Tử Sửu  Kỵ Dần Mão (yểu)  Ghi chú: Kỵ vô căn',

    '庚子': 'Điều hậu: Hỷ Đinh Bính Giáp Kỵ Quý  Đại vận: Hỷ Dần Mão Thìn Kỵ Ngọ (yểu)  Ghi chú: Hỷ Tài Sát',
    '庚丑': 'Điều hậu: Hỷ Bính Giáp Đinh Kỵ Tân  Đại vận: Hỷ Dần Mão Tỵ Ngọ Kỵ Mùi  Ghi chú: Hỷ Mộc Hỏa ',
    '庚寅': 'Điều hậu: Hỷ Bính Giáp Kỵ Quý  Đại vận: Hỷ Mão Tỵ Dậu Kỵ Tử Sửu Ngọ (tai họa) Ghi chú: Hỷ thấu Thổ',
    '庚卯': 'Điều hậu: Hỷ Đinh Giáp Kỵ Quý  Đại vận: Hỷ Thân Dậu Kỵ Ngọ (yểu) Ghi chú: Hỷ thân vượng',
    '庚辰': 'Điều hậu: Hỷ Giáp Đinh Tuất Kỵ Quý  Đại vận: Hỷ Mão Dần Hợi Kỵ Tý (yểu) ',
    '庚巳': 'Điều hậu: Hỷ Nhâm Mậu Bính Kỵ Đinh  Đại vận: Hỷ Thân Dậu Hợi Tý  Kỵ Ngọ (yểu) Ghi chú: Kỵ vô căn, thiếu Thủy ắt yểu',
    '庚午': 'Điều hậu: Hỷ Nhâm Kỵ Đinh  Đại vận: Hỷ Dần Mão Thìn Tỵ  Kỵ Tý (yểu)  ',
    '庚未': 'Điều hậu: Hỷ Đinh Giáp Kỵ Ất Mậu Kỷ  Đại vận: Hỷ Dần Mão Thìn Tỵ  Kỵ Tuất Thìn Sửu (hung)',
    '庚申': 'Điều hậu: Hỷ Giáp Đinh Kỵ Tân  Đại vận: Hỷ Dần Mão Tỵ Ngọ  Kỵ Dậu Ghi chú: Kỵ quá vượng',
    '庚酉': 'Điều hậu: Hỷ Đinh Dậu Kỵ Quý  Đại vận: Hỷ Tỵ Ngọ  Kỵ Thân Ghi chú: Hỷ Thất Sát',
    '庚戌': 'Điều hậu: Hỷ Giáp Nhâm Kỵ Đinh  Đại vận: Hỷ Tỵ Ngọ Mùi  Kỵ Tử Thìn (yểu) ',
    '庚亥': 'Điều hậu: Hỷ Đinh Bính Kỵ Quý  Đại vận: Hỷ Thìn Tỵ Ngọ  Kỵ Mão Dần (hung)  Ghi chú: Hỷ Thổ',

    '辛子': 'Điều hậu: Hỷ Bính Nhâm Kỵ Quý  Đại vận: Hỷ Dần Mão Tỵ Ngọ Kỵ Hợi Tý  Ghi chú: Hỷ Bính Đinh',
    '辛丑': 'Điều hậu: Hỷ Bính Kỵ Tân  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Thìn Tuất (yểu)  Ghi chú: Hỷ Đinh, Thổ nhiều ắt yểu ',
    '辛寅': 'Điều hậu: Hỷ Kỷ Nhâm Kỵ Đinh  Đại vận: Hỷ Dần Mão Thìn Kỵ Tỵ Ngọ (yểu) Ghi chú: Vô Mộc ắt yểu',
    '辛卯': 'Điều hậu: Hỷ Nhâm Kỵ Canh  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Thân Dậu (hung) Ghi chú: Hỷ chi tọa Thổ',
    '辛辰': 'Điều hậu: Hỷ Nhâm Kỵ Quý  Đại vận: Kỵ Tuất ',
    '辛巳': 'Điều hậu: Hỷ Nhâm Kỵ Đinh  Đại vận: Hỷ Dần Mão  Kỵ Ngọ Tử Hợi Ghi chú: Kỵ Thủy nhiều',
    '辛午': 'Điều hậu: Hỷ Nhâm Kỵ Đinh Tỵ  Đại vận: Hỷ Hợi Tý Dần Mão  Kỵ Thân Dậu  Ghi chú: Hỷ căn thâm',
    '辛未': 'Điều hậu: Hỷ Nhâm Canh Kỵ Ất  Đại vận: Hỷ Dần Mão Thìn  Kỵ Thân Ghi chú: Hỷ Kim Ấn',
    '辛申': 'Điều hậu: Hỷ Nhâm Giáp Kỵ 己  Đại vận: Hỷ Dần Mão Tỵ Ngọ  Kỵ Dậu Ghi chú: Kỵ chi tọa Dậu',
    '辛酉': 'Điều hậu: Hỷ Nhâm Kỵ 己  Đại vận: Hỷ Tỵ Ngọ Mùi  Kỵ Thân Tuất Tý Ghi chú: Hỷ Tài Sát',
    '辛戌': 'Điều hậu: Hỷ Nhâm Giáp Kỵ Đinh  Đại vận: Kỵ Tỵ Thìn ',
    '辛亥': 'Điều hậu: Hỷ Nhâm Bính Kỵ Quý  Đại vận: Hỷ Tỵ Ngọ Mùi  Kỵ Tử Sửu  Ghi chú: Hỷ Bính Quan',

    '壬子': 'Điều hậu: Hỷ Bính Nhâm Kỵ 己  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Hợi Sửu (hung)  Ghi chú: Hỷ Tài Sát',
    '壬丑': 'Điều hậu: Hỷ Bính Nhâm Kỵ Tân 己  Đại vận: Hỷ Hợi Tý Tỵ Ngọ Kỵ Dần Mão  Ghi chú: Hỷ Tài ',
    '壬寅': 'Điều hậu: Hỷ Tân Bính Kỵ Đinh  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Thân Hợi Tý ',
    '壬卯': 'Điều hậu: Hỷ Canh Tân Kỵ Bính  Đại vận: Hỷ Thìn Tỵ Ngọ Mùi Kỵ Sửu Hợi Tý ',
    '壬辰': 'Điều hậu: Hỷ Bính Tân Kỵ Quý  Đại vận: Hỷ Dần Mão Kỵ Thân Dậu  Ghi chú: Giáp Ất',
    '壬巳': 'Điều hậu: Hỷ Tân Nhâm Kỵ Đinh  Đại vận: Hỷ Thân Dậu  Kỵ Ngọ (yểu) Ghi chú: Kỵ nhật chủ vô căn',
    '壬午': 'Điều hậu: Hỷ Canh Tân Nhâm Kỵ Đinh  Đại vận: Hỷ Hợi Thân Dậu  Kỵ Tuất Mùi  Ghi chú: Hỷ tòng Tài ',
    '壬未': 'Điều hậu: Hỷ Canh Tân Nhâm Kỵ Ất Đinh  Đại vận: Kỵ Mão (hung yểu)',
    '壬申': 'Điều hậu: Hỷ Đinh Kỵ Nhâm Quý  Đại vận: Tỵ Ngọ Mùi  Kỵ Mão (hung yểu) Ghi chú: Hỷ Tài',
    '壬酉': 'Điều hậu: Hỷ Bính Tân Kỵ Ất  Đại vận: Kỵ Mão Ghi chú: Hỷ Sát kỵ Quan',
    '壬戌': 'Điều hậu: Hỷ Tân Giáp Kỵ Đinh  Đại vận: Hỷ Tỵ Ngọ  Kỵ Dần Mão Thìn',
    '壬亥': 'Điều hậu: Hỷ Bính Kỵ Tân Quý  Đại vận: Hỷ Dần Mão Tỵ Ngọ  Kỵ Tử Sửu  Ghi chú: Hỷ Tài thấu can',

    '癸子': 'Điều hậu: Hỷ Bính Nhâm Kỵ Tân  Đại vận: Hỷ Dần Mão Tỵ Ngọ Kỵ Thân Dậu  Ghi chú: Hỷ Tài Quan',
    '癸丑': 'Điều hậu: Hỷ Bính Kỵ Tân  Đại vận: Hỷ Dần Mão Tỵ Ngọ Kỵ Thân Dậu (yểu)  Ghi chú: Hỷ Tài Ấn ',
    '癸寅': 'Điều hậu: Hỷ Tân Bính Kỵ Canh  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Thân (yểu)  Ghi chú: Kỵ Quan Sát hỗn',
    '癸卯': 'Điều hậu: Hỷ Canh Tân Kỵ Quý  Đại vận: Hỷ Tỵ Ngọ Mùi Kỵ Thân Dậu (yểu)   Ghi chú: Kỵ Quan Sát hỗn',
    '癸辰': 'Điều hậu: Hỷ Bính Tân Kỵ Quý  Đại vận: Hỷ Thân Dậu Kỵ Tỵ Ngọ (tai họa)  Ghi chú: Kỵ vô căn',
    '癸巳': 'Điều hậu: Hỷ Tân Nhâm Kỵ Đinh  Đại vận: Hỷ Dần Mão Thìn  Kỵ Thân Dậu (tai họa) Ghi chú: Hỷ có căn kỵ Thất Sát',
    '癸午': 'Điều hậu: Hỷ Canh Nhâm Tân Kỵ Đinh  Đại vận: Hỷ tòng Hỏa Tài  Kỵ Thân (vô căn yểu)  Ghi chú: Kỵ nhật chủ vô căn ',
    '癸未': 'Điều hậu: Hỷ Canh Nhâm Tân Kỵ Ất  Đại vận: Hỷ Dần Mão Thìn Kỵ Nhẫn kỵ Quan',
    '癸申': 'Điều hậu: Hỷ Đinh Kỵ Quý  Đại vận: Hợi Tử Sửu  Kỵ Dần Ghi chú: Kỵ vô Tài cục',
    '癸酉': 'Điều hậu: Hỷ Bính Tân Kỵ Quý  Đại vận: Hỷ Thân Mùi Tỵ Ngọ  Kỵ Hợi Tý',
    '癸戌': 'Điều hậu: Hỷ Tân Giáp Kỵ Đinh Nhâm  Đại vận: Hỷ Dần Mão Tỵ Ngọ  Kỵ Hợi (yểu hung)',
    '癸亥': 'Điều hậu: Hỷ Bính Kỵ Ất Nhâm  Đại vận: Hỷ Tỵ Ngọ Mùi  Kỵ Mão (yểu hung) ',
};

const GES = {
    "Mộc": {
        "寅": "Thực Thương sinh Tài: Tốt nhất, Tài cách: Đắc lệnh thì phú. Ấn cách: Vô dụng vì Mộc vượng không cần Ấn. Sát Ấn tương sinh: Yểu thọ hoặc nhiều bệnh do Thân quá vượng Sát không chế nổi. Quan Sát: Bình thường. Thương Quan phối Ấn: Có tài nhưng cô độc.",
        "卯": "Thực Thương sinh Tài: Tốt nhất, Tài cách: Cần có Hỏa thông quan. Ấn cách: Vô dụng. Sát Ấn tương sinh: Yểu thọ hoặc nhiều bệnh. Quan Sát: Tốt nhất để chế bớt Mộc khí quá vượng. Thương Quan phối Ấn: Thanh cao thoát tục.",
        "辰": "Thực Thương sinh Tài: Tốt nhất. Tài cách: Khá tốt vì Thìn là kho tài của Mộc. Ấn cách: Vô dụng. Sát Ấn tương sinh: Bình thường. Quan Sát: Cần có Kim thấu can. Thương Quan phối Ấn: Tài hoa phát tiết.",
        "巳": "Thực Thương sinh Tài: Tốt. Tài cách: Phú quý. Ấn cách: Hôn nhân không tốt do Hỏa vượng tiêu Ấn. Sát Ấn tương sinh: Tốt. Quan Sát: Thị phi nhiều do Thương Quan gặp Quan. Thương Quan phối Ấn: Đắc dụng.",
        "午": "Thực Thương sinh Tài: Thể nhược đa bệnh do Hỏa tiết khí Mộc quá mạnh. Tài cách: Khá. Ấn cách: Cần thiết để bổ trợ Thân nhược. Sát Ấn tương sinh: Tốt. Quan Sát: Không tốt. Thương Quan phối Ấn: Tốt nhất.",
        "未": "Thực Thương sinh Tài: Thể nhược đa bệnh. Tài cách: Tốt. Ấn cách: Cần thiết. Sát Ấn tương sinh: Khá. Quan Sát: Bình thường. Thương Quan phối Ấn: Đắc cách.",
        "申": "Thực Thương sinh Tài: Vô dụng vì Thân yếu. Tài cách: Tốt nếu có Ấn. Ấn cách: Tốt nhất (Sát Ấn tương sinh). Sát Ấn tương sinh: Tốt, chủ về quyền bính. Quan Sát: Vượng quá ắt hại Thân. Thương Quan phối Ấn: Tài trí.",
        "酉": "Thực Thương sinh Tài: Nghèo khổ do Kim khắc Mộc mạnh. Tài cách: Tốt nếu có Ấn thụ. Ấn cách: Tốt nhất. Sát Ấn tương sinh: Quyền quý. Quan Sát: Tốt nhất nếu có Thủy thông quan. Thương Quan phối Ấn: Tú khí.",
        "戌": "Thực Thương sinh Tài: Nghèo khổ tật bệnh do Thổ khô héo Mộc. Tài cách: Bình thường. Ấn cách: Cần thiết. Sát Ấn tương sinh: Khá. Quan Sát: Tốt nhất để sơ thông Thổ khí. Thương Quan phối Ấn: Sáng tạo.",
        "亥": "Thực Thương sinh Tài: Tốt nhất. Tài cách: Phú quý. Ấn cách: Tuyệt vời vì được sinh phù. Sát Ấn tương sinh: Tốt. Quan Sát: Thanh quý. Thương Quan phối Ấn: Văn chương lừng lẫy.",
        "子": "Thực Thương sinh Tài: Tốt nhất. Tài cách: Khá hậu. Ấn cách: Thể nhược đa bệnh if Ấn quá vượng làm Mộc trôi nổi. Sát Ấn tương sinh: Bình thường. Quan Sát: Khá. Thương Quan phối Ấn: Tú mã.",
        "丑": "Thực Thương sinh Tài: Tốt nhất. Tài cách: Phú hậu. Ấn cách: Thể nhược đa bệnh. Sát Ấn tương sinh: Bình thường. Quan Sát: Lục thân thưa thớt. Thương Quan phối Ấn: Tài năng lẻ.",
    },
    "Hỏa": {
        "寅": "Thực Thương sinh Tài: Khá. Tài cách: Tốt. Ấn cách: Bình thường. Sát Ấn tương sinh: Phú mà có thể diện. Quan Sát: Thể nhược yểu tật do Hỏa bị Thủy dập tắt. Thương Quan phối Ấn: Văn nghệ sĩ.",
        "卯": "Thực Thương sinh Tài: Tốt. Tài cách: Phú quý. Ấn cách: Đắc lệnh. Sát Ấn tương sinh: Tốt nhất, chủ về học vấn và uy tín. Quan Sát: Thể nhược yểu tật. Thương Quan phối Ấn: Danh tiếng.",
        "辰": "Thực Thương sinh Tài: Thổ ẩm nhuận Hỏa, tài lộc dồi dào. Tài cách: Khá tốt. Ấn cách: Cần thiết. Sát Ấn tương sinh: Tốt nhất. Quan Sát: Thể nhược do Thổ tiết khí. Thương Quan phối Ấn: Sáng tạo.",
        "巳": "Thực Thương sinh Tài: Khá. Tài cách: Tốt nhất (Kiến Lộc phùng Tài). Ấn cách: Vô dụng. Sát Ấn tương sinh: Bình thường. Quan Sát: Thể nhược, kỵ Xung. Thương Quan phối Ấn: Tài hoa.",
        "午": "Thực Thương sinh Tài: Tốt. Tài cách: Cần Thủy chế Nhận. Ấn cách: Vô dụng. Sát Ấn tương sinh: Khá. Quan Sát: Cần thiết để chế Nhận. Thương Quan phối Ấn: Tốt nhất.",
        "未": "Thực Thương sinh Tài: Khô hạn. Tài cách: Khá tốt. Ấn cách: Cần Thủy. Sát Ấn tương sinh: Bình thường. Quan Sát: Khá. Thương Quan phối Ấn: Tốt nhất.",
        "申": "Thực Thương sinh Tài: Phú quý. Tài cách: Tốt. Ấn cách: Tốt để trợ Thân. Sát Ấn tương sinh: Quyền thế. Quan Sát: Tốt nhất. Thương Quan phối Ấn: Mưu lược.",
        "酉": "Thực Thương sinh Tài: Tiền tài nhiều nhưng Thân nhược. Tài cách: Vô Ấn khốn tài dẫn họa. Ấn cách: Tốt nhất để sinh Thân đoạt Tài. Sát Ấn tương sinh: Khá. Quan Sát: Thị phi do Tài sinh Sát khắc Thân. Thương Quan phối Ấn: Tú khí.",
        "戌": "Thực Thương sinh Tài: Khá. Tài cách: Vô Ấn khốn tài dẫn họa. Ấn cách: Tốt nhất. Sát Ấn tương sinh: Khá. Quan Sát: Thị phi. Thương Quan phối Ấn: Sáng tạo.",
        "亥": "Thực Thương sinh Tài: Vô dụng. Tài cách: Bình thường. Ấn cách: Cần thiết. Sát Ấn tương sinh: Tuyệt vời. Quan Sát: Vô Ấn thì hung, có Ấn thì quý. Thương Quan phối Ấn: Tài mưu.",
        "子": "Thực Thương sinh Tài: Vô dụng. Tài cách: Khó tụ. Ấn cách: Cần thiết. Sát Ấn tương sinh: Quyền quý. Quan Sát: Vô Ấn thì hung, có Ấn thì quý. Thương Quan phối Ấn: Thanh cao.",
        "丑": "Thực Thương sinh Tài: Bệnh đầu mặt do Thổ lạnh làm tắt Hỏa. Tài cách: Bình thường. Ấn cách: Cần thiết. Sát Ấn tương sinh: Khá. Quan Sát: Bình thường. Thương Quan phối Ấn: Tài mưu lẻ.",
    },
    "Thổ": {
        "寅": "Thực Thương sinh Tài: Khá. Tài cách: Vô dụng do Mộc khắc Thổ. Ấn cách: Tốt nhất (Sát Ấn tương sinh). Sát Ấn tương sinh: Quyền quý. Quan Sát: Vô dụng nếu không có Ấn. Thương Quan phối Ấn: Tú khí.",
        "卯": "Thực Thương sinh Tài: Khá. Tài cách: Vô dụng. Ấn cách: Tốt nhất. Sát Ấn tương sinh: Tuyệt vời. Quan Sát: Khắc Thân quá mạnh. Thương Quan phối Ấn: Tài hoa.",
        "辰": "Thực Thương sinh Tài: Phú quý. Tài cách: Tốt. Ấn cách: Tốt nhất. Sát Ấn tương sinh: Khá. Quan Sát: Thể nhược hoặc yểu chiết if Kim Thủy quá vượng. Thương Quan phối Ấn: Đắc dụng.",
        "巳": "Thực Thương sinh Tài: Rất tốt. Tài cách: Tốt nhất. Ấn cách: Tốt. Sát Ấn tương sinh: Khá. Quan Sát: Thể nhược đa bệnh do Hỏa vượng Thổ khô. Thương Quan phối Ấn: Tài mưu.",
        "午": "Thực Thương sinh Tài: Phú quý song toàn. Tài cách: Đại phú. Ấn cách: Vô dụng. Sát Ấn tương sinh: Khá. Quan Sát: Thông minh hiển đạt. Thương Quan phối Ấn: Tú khí.",
        "未": "Thực Thương sinh Tài: Khá. Tài cách: Đại phú. Ấn cách: Vô dụng. Sát Ấn tương sinh: Khá. Quan Sát: Thông minh. Thương Quan phối Ấn: Tài hoa.",
        "申": "Thực Thương sinh Tài: Phú quý. Tài cách: Độc hỷ (Thanh tú). Ấn cách: Cần thiết. Sát Ấn tương sinh: Khá. Quan Sát: Vô dụng do Kim tiết khí quá mạnh. Thương Quan phối Ấn: Mưu lược.",
        "酉": "Thực Thương sinh Tài: Phú thọ. Tài cách: Bình thường. Ấn cách: Bình thường. Sát Ấn tương sinh: Khá. Quan Sát: Tiết khí quá nặng. Thương Quan phối Ấn: Tài trí lẻ.",
        "戌": "Thực Thương sinh Tài: Khá. Tài cách: Bình thường. Ấn cách: Độc Ấn vinh thân. Sát Ấn tương sinh: Khá. Quan Sát: Tốt. Thương Quan phối Ấn: Sáng tạo.",
        "亥": "Thực Thương sinh Tài: Cô hàn do Thủy vượng Thổ trôi. Tài cách: Khá tốt if Thân vượng. Ấn cách: Độc Ấn cứu thân. Sát Ấn tương sinh: Khá. Quan Sát: Bình thường. Thương Quan phối Ấn: Tài năng.",
        "子": "Thực Thương sinh Tài: Bất lợi. Tài cách: Đa tật yểu bệnh do Thủy quá vượng làm Thổ sụp lở. Ấn cách: Độc Ấn hộ thân. Sát Ấn tương sinh: Khá. Quan Sát: Vô dụng. Thương Quan phối Ấn: Tú khí.",
        "丑": "Thực Thương sinh Tài: Nghèo cô tật. Tài cách: Vô dụng. Ấn cách: Độc Ấn. Sát Ấn tương sinh: Khá. Quan Sát: Vô dụng. Thương Quan phối Ấn: Mưu kế lẻ.",
    },
    "Kim": {
        "寅": "Thực Thương sinh Tài: Vô dụng do Kim tuyệt tại Dần. Tài cách: Bình thường. Ấn cách: Cần thiết. Sát Ấn tương sinh: Khá. Quan Sát: Hôn nhân không tốt (Phu cung gặp Tuyệt). Thương Quan phối Ấn: Vô dụng.",
        "卯": "Thực Thương sinh Tài: Khá. Tài cách: Phú quý if Thân vượng. Ấn cách: Độc Ấn trợ thân. Sát Ấn tương sinh: Khá. Quan Sát: Không nghèo thì cũng nhiều bệnh. Thương Quan phối Ấn: Tài hoa.",
        "辰": "Thực Thương sinh Tài: Tú khí. Tài cách: Khá tốt. Ấn cách: Độc Ấn sinh thân. Sát Ấn tương sinh: Quyền quý. Quan Sát: Không nghèo thì cũng nhiều bệnh if Thân quá nhược. Thương Quan phối Ấn: Đắc dụng.",
        "巳": "Thực Thương sinh Tài: Cô bần lao do Hỏa khắc Kim. Tài cách: Bình thường. Ấn cách: Tốt nhất (Sát Ấn tương sinh). Sát Ấn tương sinh: Tốt, quyền quý. Quan Sát: Thể nhược đa bệnh. Thương Quan phối Ấn: Mưu lược.",
        "午": "Thực Thương sinh Tài: Cô bần lao. Tài cách: Bình thường. Ấn cách: Tốt nhất. Sát Ấn tương sinh: Tốt. Quan Sát: Thể nhược đa bệnh. Thương Quan phối Ấn: Tài hoa.",
        "未": "Thực Thương sinh Tài: Vô dụng. Tài cách: Bình thường. Ấn cách: Tốt. Sát Ấn tương sinh: Tốt. Quan Sát: Thân thể có bệnh do Thổ khô không sinh Kim. Thương Quan phối Ấn: Tú khí.",
        "申": "Thực Thương sinh Tài: Tốt nhất (Kim Thủy nhã khiết). Tài cách: Phú quý. Ấn cách: Khá. Sát Ấn tương sinh: Khá. Quan Sát: Cần thiết để rèn luyện Kim. Thương Quan phối Ấn: Quyền mưu.",
        "酉": "Thực Thương sinh Tài: Tốt nhất. Tài cách: Khá tốt. Ấn cách: Khá. Sát Ấn tương sinh: Khá. Quan Sát: Cần thiết. Thương Quan phối Ấn: Tài năng.",
        "戌": "Thực Thương sinh Tài: Khá. Tài cách: Vô dụng. Ấn cách: Khá tốt. Sát Ấn tương sinh: Quyền bính. Quan Sát: Bình thường. Thương Quan phối Ấn: Sáng tạo.",
        "亥": "Thực Thương sinh Tài: Tốt (Kim lạnh Thủy mát). Tài cách: Phú quý. Ấn cách: Độc hỷ sinh ban đêm. Sát Ấn tương sinh: Khá. Quan Sát: Kỵ thư sinh (không có lực). Thương Quan phối Ấn: Tú khí.",
        "子": "Thực Thương sinh Tài: Thanh khiết. Tài cách: Phú quý. Ấn cách: Độc Ấn hộ thân. Sát Ấn tương sinh: Tốt. Quan Sát: Tốt nhất để sưởi ấm cục diện lạnh lẽo. Thương Quan phối Ấn: Tài hoa.",
        "丑": "Thực Thương sinh Tài: Khá. Tài cách: Tốt. Ấn cách: Độc Ấn. Sát Ấn tương sinh: Tốt. Quan Sát: Tốt nhất (Điều hậu). Thương Quan phối Ấn: Mưu lược.",
    },
    "Thủy": {
        "寅": "Thực Thương sinh Tài: Rất tốt (Thủy Mộc tương sinh). Tài cách: Tốt nhất. Ấn cách: Khá. Sát Ấn tương sinh: Quyền quý. Quan Sát: Vô dụng do Mộc tiết khí quá mạnh. Thương Quan phối Ấn: Văn chương.",
        "卯": "Thực Thương sinh Tài: Tốt. Tài cách: Thị phi nhiều do Mộc vượng hút cạn Thủy. Ấn cách: Vô dụng. Sát Ấn tương sinh: Khá. Quan Sát: Tốt nhất. Thương Quan phối Ấn: Tài hoa.",
        "辰": "Thực Thương sinh Tài: Tốt. Tài cách: Thị phi nhiều. Ấn cách: Vô dụng. Sát Ấn tương sinh: Quyền quý (Sát Ấn tương sinh). Quan Sát: Tốt nhất. Thương Quan phối Ấn: Đắc dụng.",
        "巳": "Thực Thương sinh Tài: Khá. Tài cách: Phú quý. Ấn cách: Vô Ấn thì yểu do Hỏa vượng làm Thủy bay hơi. Sát Ấn tương sinh: Tốt. Quan Sát: Bình thường. Thương Quan phối Ấn: Tài mưu.",
        "午": "Thực Thương sinh Tài: Khổ cực. Tài cách: Thể nhược đa bệnh. Ấn cách: Thân thuộc cô đơn. Sát Ấn tương sinh: Quyền bính. Quan Sát: Tốt nhất (Điều hậu). Thương Quan phối Ấn: Tú khí.",
        "未": "Thực Thương sinh Tài: Khá. Tài cách: Thể nhược đa bệnh. Ấn cách: Thân thuộc cô đơn. Sát Ấn tương sinh: Tốt. Quan Sát: Tốt nhất. Thương Quan phối Ấn: Tài năng lẻ.",
        "申": "Thực Thương sinh Tài: Thanh cao. Tài cách: Vô dụng. Ấn cách: Tốt nhất (Kim Thủy tương sinh). Sát Ấn tương sinh: Quyền quý. Quan Sát: Tốt. Thương Quan phối Ấn: Mưu lược.",
        "酉": "Thực Thương sinh Tài: Thanh cao. Tài cách: Bình thường. Ấn cách: Vô dụng (Ấn vượng không cần thêm). Sát Ấn tương sinh: Rất tốt. Quan Sát: Khá. Thương Quan phối Ấn: Tốt nhất.",
        "戌": "Thực Thương sinh Tài: Khá. Tài cách: Bình thường. Ấn cách: Vô dụng. Sát Ấn tương sinh: Quyền quý. Quan Sát: Khá tốt. Thương Quan phối Ấn: Tốt nhất.",
        "亥": "Thực Thương sinh Tài: Vô dụng (Thủy vượng trôi nổi). Tài cách: Tốt nhất. Ấn cách: Vô dụng. Sát Ấn tương sinh: Quyền bính. Quan Sát: Kỵ thư sinh. Thương Quan phối Ấn: Tú khí.",
        "子": "Thực Thương sinh Tài: Vô dụng. Tài cách: Tốt nhất. Ấn cách: Vô dụng. Sát Ấn tương sinh: Quyền quý. Quan Sát: Tốt nhất (Điều hậu). Thương Quan phối Ấn: Tài hoa.",
        "丑": "Thực Thương sinh Tài: Thực thần chế Sát quý. Tài cách: Tốt. Ấn cách: Khá. Sát Ấn tương sinh: Tuyệt vời. Quan Sát: Tốt nhất. Thương Quan phối Ấn: Mưu lược.",
    },
};

const YEAR_SHENS = {
    'Cô Thần': {
        "子": "Dần", "丑": "Dần", "寅": "Tỵ", "卯": "Tỵ", "辰": "Tỵ", "巳": "Thân",
        "午": "Thân", "未": "Thân", "申": "Hợi", "酉": "Hợi", "戌": "Hợi", "亥": "Dần"
    },
    'Quả Tú': {
        "子": "Tuất", "丑": "Tuất", "寅": "Sửu", "卯": "Sửu", "辰": "Sửu", "巳": "Thìn",
        "午": "Thìn", "未": "Thìn", "申": "Mùi", "酉": "Mùi", "戌": "Mùi", "亥": "Tuất"
    },
    'Đại Hao': {
        "子": "Tỵ Mùi", "丑": "Ngọ Thân", "寅": "Mùi Dậu", "卯": "Thân Tuất", "辰": "Dậu Hợi", "巳": "Tuất Tý",
        "午": "Hợi Sửu", "未": "Tý Dần", "申": "Sửu Mão", "酉": "Dần Thìn", "戌": "Mão Tỵ", "亥": "Thìn Ngọ"
    },
};

const MONTH_SHENS = {
    'Thiên Đức': {
        "子": "Tỵ", "丑": "Canh", "寅": "Đinh", "卯": "Thân", "辰": "Nhâm", "巳": "Tân",
        "午": "Hợi", "未": "Giáp", "申": "Quý", "酉": "Dần", "戌": "Bính", "亥": "Ất"
    },
    'Nguyệt Đức': {
        "子": "Nhâm", "丑": "Canh", "寅": "Bính", "卯": "Giáp", "辰": "Nhâm", "巳": "Canh",
        "午": "Bính", "未": "Giáp", "申": "Nhâm", "酉": "Canh", "戌": "Bính", "亥": "Giáp"
    },
};

const DAY_SHENS = {
    'Tướng Tinh': {
        "子": "Tý", "丑": "Dậu", "寅": "Ngọ", "卯": "Mão", "辰": "Tý", "巳": "Dậu",
        "午": "Ngọ", "未": "Mão", "申": "Tý", "酉": "Dậu", "戌": "Ngọ", "亥": "Mão"
    },
    'Hoa Cái': {
        "子": "Thìn", "丑": "Sửu", "寅": "Tuất", "卯": "Mùi", "辰": "Thìn", "巳": "Sửu",
        "午": "Tuất", "未": "Mùi", "申": "Thìn", "酉": "Sửu", "戌": "Tuất", "亥": "Mùi"
    },
    'Dịch Mã': {
        "子": "Dần", "丑": "Hợi", "寅": "Thân", "卯": "Tỵ", "辰": "Dần", "巳": "Hợi",
        "午": "Thân", "未": "Tỵ", "申": "Dần", "酉": "Hợi", "戌": "Thân", "亥": "Tỵ"
    },
    'Kiếp Sát': {
        "子": "Tỵ", "丑": "Dần", "寅": "Hợi", "卯": "Thân", "辰": "Tỵ", "巳": "Dần",
        "午": "Hợi", "未": "Thân", "申": "Tỵ", "酉": "Dần", "戌": "Hợi", "亥": "Thân"
    },
    'Vong Thần': {
        "子": "Hợi", "丑": "Thân", "寅": "Tỵ", "卯": "Dần", "辰": "Hợi", "巳": "Thân",
        "午": "Tỵ", "未": "Dần", "申": "Hợi", "酉": "Thân", "戌": "Tỵ", "亥": "Dần"
    },
    'Đào Hoa': {
        "子": "Dậu", "丑": "Ngọ", "寅": "Mão", "卯": "Tý", "辰": "Dậu", "巳": "Ngọ",
        "午": "Mão", "未": "Tý", "申": "Dậu", "酉": "Ngọ", "戌": "Mão", "亥": "Tý"
    },
};

const G_SHENS = {
    'Thiên Ất': {
        "甲": 'Mùi Sửu', "乙": "Thân Tý", "丙": "Dậu Hợi", "丁": "Dậu Hợi", "戊": 'Mùi Sửu', "己": "Thân Tý",
        "庚": "Mùi Sửu", "辛": "Dần Ngọ", "壬": "Mão Tỵ", "癸": "Mão Tỵ"
    },
    'Văn Xương': {
        "甲": 'Tỵ', "乙": "Ngọ", "丙": "Thân", "丁": "Dậu", "戊": "Thân", "己": "Dậu",
        "庚": "Hợi", "辛": "Tý", "壬": "Dần", "癸": "Sửu"
    },
    'Dương Nhẫn': {
        "甲": 'Mão', "乙": "", "丙": "Ngọ", "丁": "", "戊": "Ngọ", "己": "",
        "庚": "Dậu", "辛": "", "壬": "Tý", "癸": ""
    },
    'Hồng Diễm': {
        "甲": 'Ngọ', "乙": "Ngọ", "丙": "Dần", "丁": "Mùi", "戊": "Thìn", "己": "Thìn",
        "庚": "Tuất", "辛": "Dậu", "壬": "Tý", "癸": "Thân"
    },
};

const SHENS_INFOS = {
    'Cô Thần': "Cô tịch, cô độc: Nguyệt chi dễ không hòa đồng, dễ kết hôn sau 30 tuổi. Nữ mệnh Quan Sát Nguyệt can tọa Cô Thần thì xác suất ở một mình lớn, thời chi thì có tâm hướng đạo.",
    'Quả Tú': "Tương tự Cô Thần, cùng trụ có Thiên Nguyệt Đức thì không sao. Nam sợ Cô, nữ sợ Quả.",
    'Đại Hao': "Hao tổn bất ngờ, đứng một mình không sao. Cùng trụ với Đào Hoa hoặc Dịch Mã thì nguy hiểm.",
    'Thiên Đức': "Tiên thiên có phúc, nhật can suốt đời có phúc. Kỵ Xung Khắc, không sợ Hợp. Nữ mệnh cùng can với Phu tinh càng tốt.",
    'Nguyệt Đức': "Tiên thiên có phúc, nhật can suốt đời có phúc. Kỵ Xung Khắc, không sợ Hợp. Nữ mệnh cùng can với Phu tinh càng tốt.",
    'Tướng Tinh': "Có lý tưởng, khí độ, thong dong không vội vã.",
    'Hoa Cái': "Có năng khiếu nghệ thuật, trình độ liên quan đến mệnh cách.",
    'Dịch Mã': "Nhiều sự di chuyển, trình độ liên quan đến mệnh cách. Nữ Dịch Mã hợp Quý nhân, cuối cùng dễ rơi vào chốn phong trần.",
    'Kiếp Sát': "Cùng trụ với Quý nhân thì không sao, đối xung với Vong Thần. Gặp Tam Hình thì không tốt, các trường hợp khác vẫn ổn. Bị Nhật chủ khắc thì không có gì đáng ngại.",
    'Vong Thần': "Cùng trụ với Quý nhân thì không sao, đối xung với Kiếp Sát. Gặp Tam Hình thì không tốt, các trường hợp khác vẫn ổn. Bị Nhật chủ khắc thì không có gì đáng ngại.",
    'Đào Hoa': "Hung nhiều, nữ Chính Quan tọa Đào Hoa thì cát.",
    'Thiên Ất': "Hậu thiên giải nạn, nữ mệnh không nên có quá nhiều.",
    'Văn Xương': "Văn chương tốt, chưa chắc đã có phúc, nữ mệnh tham khảo Lý Thanh Chiếu.",
    'Dương Nhẫn': "Tính cách cương cường, nữ mệnh chưa chắc đã tốt.",
    'Hồng Diễm': "Yêu đương chấp nhất, không màng đến sự khác biệt địa vị.",
};

module.exports = {
    TEMPS, ZHI_TIME, DATOUXIU, XIAOTOUXIU,
    TEN_DEITIES, ZHI_ATTS,
    GAN_HES, GAN_CHONGS,
    ZHI_6HES, ZHI_3HES, ZHI_HALF_3HES, ZHI_HUIS,
    ZHI_CHONGS, ZHI_POES, ZHI_HAIES, ZHI_XINGS, ZHI_ZIXINGS,
    RELATIONS, GAN_DESC, ZHI_DESC, GAN_HEALTH,
    SHENGXIAOS, JU, KUS, JQMC, CHONGS, XINGS,
    // Additional data
    GUANS, GAN3, GAN4, ZHI3, GANZHI60, WUHANGS, ZHENGS,
    GONG_HE, GONG_HUI, JIS, YMC, RMC, NUMCN, WEEK, ZHI5_LIST,
    // Migrated from Python
    XINGXIUS, JIANCHUS, MINGGONGS, RIZHU_DESCS, EMPTIES, EMPTIE4S, LU_TYPES,
    SILING, XIUQIUS, CHENS, JINS, TIAOHOUS, JINBUHUAN, GES,
    YEAR_SHENS, MONTH_SHENS, DAY_SHENS, G_SHENS, SHENS_INFOS
};

