/**
 * Ten Deities (Thập Thần) analysis - Part 5: Thực Thương (Eating God/Hurting Officer)
 */
const { getKhongVong } = require('../shensha');
const ganzhi = require('../ganzhi');

const KUS = ['Thìn', 'Tuất', 'Sửu', 'Mùi'];
const LU = {
    'Giáp': 'Dần', 'Ất': 'Mão', 'Bính': 'Tỵ', 'Đinh': 'Ngọ', 'Mậu': 'Tỵ',
    'Kỷ': 'Ngọ', 'Canh': 'Thân', 'Tân': 'Dậu', 'Nhâm': 'Hợi', 'Quý': 'Tý'
};
const DI = {
    'Giáp': 'Mão', 'Ất': 'Dần', 'Bính': 'Ngọ', 'Đinh': 'Tỵ', 'Mậu': 'Ngọ',
    'Kỷ': 'Tỵ', 'Canh': 'Dậu', 'Tân': 'Thân', 'Nhâm': 'Tý', 'Quý': 'Hợi'
};

function getShensOfMe(me) {
    // Return map of deities gans
    // Just simple lookup based on polarity
    // ... Or just compute Lu directly.
    return {};
}

function getLuDiOf(me, type) {
    // type: 'Thuc', 'Thuong', 'Sat'
    const tenDeities = {
        'Giáp': { 'Thực': 'Bính', 'Thương': 'Đinh', 'Sát': 'Canh' },
        'Ất': { 'Thực': 'Đinh', 'Thương': 'Bính', 'Sát': 'Tân' },
        'Bính': { 'Thực': 'Mậu', 'Thương': 'Kỷ', 'Sát': 'Nhâm' },
        'Đinh': { 'Thực': 'Kỷ', 'Thương': 'Mậu', 'Sát': 'Quý' },
        'Mậu': { 'Thực': 'Canh', 'Thương': 'Tân', 'Sát': 'Giáp' },
        'Kỷ': { 'Thực': 'Tân', 'Thương': 'Canh', 'Sát': 'Ất' },
        'Canh': { 'Thực': 'Nhâm', 'Thương': 'Quý', 'Sát': 'Bính' },
        'Tân': { 'Thực': 'Quý', 'Thương': 'Nhâm', 'Sát': 'Đinh' },
        'Nhâm': { 'Thực': 'Giáp', 'Thương': 'Ất', 'Sát': 'Mậu' },
        'Quý': { 'Thực': 'Ất', 'Thương': 'Giáp', 'Sát': 'Kỷ' }
    };
    if (!tenDeities[me]) {
        return { lu: '', di: '', gan: '' };
    }
    const targetGan = tenDeities[me][type];
    return { lu: LU[targetGan], di: DI[targetGan], gan: targetGan };
}

function analyzeShi(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens2 = ctx.shens2 || [];
    const zhis = ctx.zhis;
    const me = ctx.me;
    const zhus = ctx.zhus || [];
    const shiInfo = getLuDiOf(me, 'Thực');
    const shaInfo = getLuDiOf(me, 'Sát');

    if (!gan_shens.includes('Thực')) return results;

    if (ctx.zhi_shens2 && ctx.zhi_shens2.includes('Thực')) {
        results.push("Trong trường hợp Thực Thần thành cách, thọ mệnh khá tốt. Thực Thần và Thiên Tài cách khá trường thọ. Thực Thần hậu đạo, làm người không hào phóng. Thực Thần có khẩu phúc. Thành cách cơ sở 84, hỷ Tài kỵ Thiên Ấn (chỉ có dùng Thiên Tài mới chế được).");
        results.push("Thực Thần không Tài cả đời cơm áo không lo, nhưng không đại phúc. Có Ấn dùng Tỷ Kiếp thông quan hoặc Tài chế.");
    }

    if ((gan_shens[0] === 'Thực' && gan_shens[1] === 'Thực') || (gan_shens[1] === 'Thực' && ctx.zhi_shen3[1].includes('Thực'))) {
        results.push("Thực nguyệt trùng điệp: Sinh trưởng trong môi trường an định, tính tình nhân từ, không Xung Hình thì trường thọ. Nữ sớm có con. Không bị Xung Hình Thiên Ấn là mệnh tốt.");
    }

    if (gan_shens.includes('Thiên Ấn')) {
        results.push("Nam Thực Thần gặp Thiên Ấn, thân thể không tốt. Sợ Thiên Ấn, Chính Ấn thì tốt hơn một chút. Tứ trụ thấu Thiên Tài có thể giải.");
        if (gan_shens.includes('Kiếp')) {
            results.push("Thực Thần không nên cùng Kiếp Tài, Thiên Ấn cùng xuất hiện ở Thiên Can. Thể nhược đa bệnh.");
        }
        if (gan_shens.includes('Sát')) {
            results.push("Thực Thần không nên cùng Sát, Thiên Ấn cùng thành cách. Thể nhược đa bệnh.");
        }
    }

    if (zhi_shens.includes('Thực')) {
        results.push("Thực Thần thiên thấu địa tạng, Nữ mệnh ngày Dương thích hợp nghề nghiệp xã hội, ngày Âm thích hợp làm công sở.");
    }

    if (!gan_shens.includes('Chính Tài') && !gan_shens.includes('Thiên Tài')) {
        results.push("Thực Thần nhiều, cần Thực Thương sinh Tài mới tốt, không Tài khó phát.");
    }

    if (gan_shens.includes('Thương')) {
        results.push("Thực Thương hỗn tạp: Thực Thần và Thương Quan cùng thấu Thiên Can: Chí lớn tài mọn.");
    }

    if (gan_shens.includes('Sát')) {
        results.push("Thực Thần chế Sát, Sát không phải chủ cách, ban ơn xong rồi hối hận.");
    }

    // Pillar analysis
    gan_shens.forEach((gan, seq) => {
        if (gan !== 'Thực') return;
        if (zhi_shens[seq] === 'Kiếp') {
            results.push(`Thực Thần trụ ${seq === 0 ? 'nam' : seq === 1 ? 'thang' : seq === 2 ? 'ngay' : 'gio'} tọa Dương Nhận, vất vả.`);
        }
    });

    if (shens2.filter(s => s === 'Thực').length > 2) {
        results.push("Thực Thần 4 cái trở lên là nhiều, xử lý như Thương Quan. Thực Thần nhiều, cần Thực Thương sinh Tài mới tốt, không Tài khó phát.");
        if (gan_shens.includes('Kiếp') || gan_shens.includes('Tỷ')) {
            results.push("Thực Thần mang Tỷ Kiếp, hay giúp đỡ (thí xả), vui vẻ làm các phục vụ xã hội.");
        }
    }

    // Check Thuc Sat same pillar
    let thucSatSamePillar = false;
    zhus.forEach((zhu, i) => {
        const ganShen = gan_shens[i];
        const zhiShenList = ctx.zhi_shen3[i] || [];
        if ((ganShen === 'Thực' && zhiShenList.includes('Sát')) || (ganShen === 'Sát' && zhiShenList.includes('Thực'))) {
            thucSatSamePillar = true;
        }
    });
    if (thucSatSamePillar) {
        results.push("Thực Thần và Thất Sát cùng một trụ, dễ nổi giận. Thực Thần chế Sát, tốt nhất Thực ở trước. Có xác suất nhất định.");
    }

    // Check Thuc + Kieu same pillar
    let thucKieuSamePillar = false;
    zhus.forEach((zhu, i) => {
        const ganShen = gan_shens[i];
        const zhiShenList = ctx.zhi_shen3[i] || [];
        if ((ganShen === 'Thực' && zhiShenList.includes('Thiên Ấn')) || (ganShen === 'Thiên Ấn' && zhiShenList.includes('Thực'))) {
            thucKieuSamePillar = true;
        }
    });
    if (thucKieuSamePillar) {
        results.push("Nữ mệnh sợ nhất Thực Thần Thiên Ấn cùng một trụ. Bất lợi hậu đại, trụ giờ đặc biệt quan trọng.");
    }

    if (ctx.zhi_shen3[2] && ctx.zhi_shen3[2].includes('Thực') && ['Mão', 'Dậu'].includes(zhis[2])) { // Simplified check for Quy Mao/Ky Dau
        results.push("Nhật chi Thực Thần chuyên vị dễ phát phì, có phúc. Chỉ có 2 ngày: Quý Mão, Kỷ Dậu. Nam mệnh có người vợ giúp sức.");
    }

    // Line 95 Python
    if (zhis[2] === shiInfo.lu) { // Self sits on Shi Lu
        if (zhis[3] === shaInfo.lu && !gan_shens.includes('Sát')) {
            results.push("Tự tọa Thực, chi giờ chuyên Sát không thấu can: Đa thành bại, kết cục mất khống chế. Mẫu pháp tổng tắc P56-22 Bính Tý Canh Dần Kỷ Dậu Đinh Mão");
        }
    }

    // Missing parts added:
    if (ctx.zhi_shen3[3] && ctx.zhi_shen3[3].includes('Thực') && (ctx.zhi_shen3[3].includes('Thiên Ấn') || gan_shens[3] === 'Thiên Ấn')) {
        results.push("Chi giờ Thực Thần gặp Thiên Ấn: Thể nhược, bệnh mãn tính, phái nữ hôn nhân không trọn vẹn.");
    }

    // Tự tọa Thực Thương khố
    if (KUS.includes(zhis[2])) {
        const hidden = ctx.zhi_shen3[2];
        if (hidden.length >= 3 && (hidden[2] === 'Thực' || hidden[2] === 'Thương')) {
            results.push("Tự tọa Thực Thương khố: Luôn cảm thấy không đủ tiền.");
        }
    }

    if (gan_shens[0] === 'Thực' || zhi_shens[0] === 'Thực') {
        results.push("Trụ năm Thực: Có thể tam đại đồng đường (ba đời ở cùng nhau).");
    }

    return results;
}

function analyzeShang(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens2 = ctx.shens2 || [];
    const zhis = ctx.zhis;
    const me = ctx.me;
    const isFemale = ctx.is_female;
    const meLu = LU[me];
    const shangInfo = getLuDiOf(me, 'Thương');

    if (!gan_shens.includes('Thương')) return results;

    results.push("Thương Quan có tài hoa, nhưng thanh cao. Cần sinh Tài, hoặc Ấn chế.");

    if (ctx.zhi_shens2 && ctx.zhi_shens2.some(s => s === 'Thương')) {
        results.push("Thực Thần nặng thành Thương Quan, không thích hợp Thương Quan phối Ấn. Kim Thủy, Thổ Kim, Mộc Hỏa mệnh tạo cao hơn. Hỏa Thổ cần điều hậu, dễ hỏa viêm thổ táo. Thương Quan và Thất Sát cục không thích hợp nguyệt chi là Khố.");
        results.push("Thương Quan thành cách cơ sở 87 sinh Tài, phối Ấn. Không xem xét điều hậu thì nghịch dụng tốt hơn thuận dụng, điều hậu quan trọng hơn. Sinh Chính Tài dùng Thiên Ấn, sinh Thiên Tài dùng Chính Ấn. \\nThương Quan phối Ấn, nếu thấu Sát, thấu Tài không tốt. Thương Quan Thất Sát đồng thời thành cách, không thấu Tài là mệnh cục thượng hảo.");
    }

    if ((gan_shens[0] === 'Thương' && gan_shens[1] === 'Thương') || (gan_shens[1] === 'Thương' && ctx.zhi_shen3[1].includes('Thương'))) {
        results.push("Bố mẹ anh em đều vô duyên. Cô khổ, tính cương nghị ưa nắm quyền. Trước 30 tuổi có khổ đau tình cảm nghiêm trọng, thích hợp già yêu trẻ, kế thất tiên đồng cư hậu kết hôn.");
    }

    if (gan_shens.includes('Chính Ấn') && !gan_shens.includes('Chính Tài') && !gan_shens.includes('Thiên Tài')) {
        results.push("Thương Quan phối Ấn, không Tài, có tay nghề, nhưng không giỏi quản lý tài chính. Có cá tính nhất định");
    }

    if (gan_shens[0] === 'Thương' && gan_shens[1] === 'Thương' && (!ctx.zhi_shens2 || !ctx.zhi_shens2.includes('Thương'))) {
        results.push("Năm tháng Thiên Can đều nổi Thương Quan, thân thuộc ít.");
    }

    if (zhi_shens[1] === 'Thương' && ['Tý', 'Ngọ', 'Mão', 'Dậu'].includes(zhis[1]) && gan_shens[1] === 'Thương') {
        results.push("Nguyệt trụ: Thương Quan tọa chuyên vị Thương Quan, phu duyên bất định. Vợ chồng giả. Ví như sếp và bồ nhí.");
    }

    // Pillar analysis
    gan_shens.forEach((gan, seq) => {
        if (gan !== 'Thương') return;
        if (zhi_shens[seq] === 'Kiếp') {
            results.push("Thương Quan Địa chi tọa Dương Nhận, lực bất tòng tâm. Bội lộc trục mã, khắc quan kiếp tài. Ảnh hưởng 15 năm. Thương Quan tọa Kiếp Tài: Chỉ thích hợp với thương nhân tinh minh thuần túy hoặc người nắm giữ tài chính nghiêm cẩn.")
        }
    });

    if (shens2.filter(s => s === 'Thương').length > 2) {
        if (isFemale) {
            results.push("Nữ mệnh Thương Quan nhiều, dù không nhập Thương Quan cách cũng duyên phận mỏng, đa phần có khổ tình.");
        }
        if (gan_shens.filter(s => s === 'Thương').length > 2) {
            results.push("Thiên Can 2 Thương Quan: Tính kiêu, lục thân không dựa dẫm được. Trước kết hôn than phiền gia đình, sau kết hôn oán hận chồng. Trước 30 tuổi là thời kỳ khủng hoảng hôn nhân.");
        }
    }

    if (zhi_shens[2] === 'Thương' && ['Tý', 'Ngọ', 'Mão', 'Dậu'].includes(zhis[2])) {
        results.push("Nữ mệnh cung hôn nhân Thương Quan: Thế mạnh khắc chồng. Nam thì bất lợi đối với vợ. Chỉ có ngày Canh Tý.");
    }

    if (gan_shens[3] === 'Thương' && meLu === zhis[3]) {
        results.push("Thương Quan tọa giờ Lộc: Lục thân không dựa dẫm được, không có Xung Hình tuổi già phát, có Xung Hình không phát. Mẫu pháp P27-96 Kỷ Mùi Nhâm Thân Kỷ Hợi Canh Ngọ, có thể tham Tam Mệnh.");
    }

    // Nguyet chi thoi chi Thuc Thuong duong lenh
    if ((zhis[3] === shangInfo.lu || zhis[3] === shangInfo.di) && (zhis[1] === shangInfo.lu || zhis[1] === shangInfo.di)) {
        results.push("Nguyệt chi thời chi Thực Thương đương lệnh: Nhật chủ vô căn, tiết tận nhật chủ, hung. Mẫu pháp P28-104 Giáp Ngọ Ất Hợi Canh Tuất Bính Tý Mẫu pháp P60-104");
    }

    // Nu menh dia chi Thuong Quan Loc
    if (isFemale && zhis.includes(shangInfo.lu)) {
        results.push("Nữ mệnh địa chi Thương Quan Lộc: Hôn nhân không chịu được cảnh nghèo.");
    }

    return results;
}

function analyzeShiShangGeneral(ctx) {
    return [];
}

module.exports = {
    analyzeShi,
    analyzeShang,
    analyzeShiShangGeneral
};
