/**
 * Ten Deities (Thập Thần) analysis - Part 4: Quan Sát (Officer/Seven Killings)
 */
const { getKhongVong } = require('../shensha');
const ganzhi = require('../ganzhi');

// Helpers inline
const LU = {
    'Giáp': 'Dần', 'Ất': 'Mão', 'Bính': 'Tỵ', 'Đinh': 'Ngọ', 'Mậu': 'Tỵ',
    'Kỷ': 'Ngọ', 'Canh': 'Thân', 'Tân': 'Dậu', 'Nhâm': 'Hợi', 'Quý': 'Tý'
};
const DI = {
    'Giáp': 'Mão', 'Ất': 'Dần', 'Bính': 'Ngọ', 'Đinh': 'Tỵ', 'Mậu': 'Ngọ',
    'Kỷ': 'Tỵ', 'Canh': 'Dậu', 'Tân': 'Thân', 'Nhâm': 'Tý', 'Quý': 'Hợi'
};
const LUC_XUNG = [
    ['Tý', 'Ngọ'], ['Sửu', 'Mùi'], ['Dần', 'Thân'], ['Mão', 'Dậu'], ['Thìn', 'Tuất'], ['Tỵ', 'Hợi']
];
function isChong(z1, z2) {
    if (!z1 || !z2) return false;
    return LUC_XUNG.some(pair => pair.includes(z1) && pair.includes(z2));
}
function checkHinh(zhis, idx) {
    const z = zhis[idx];
    if (['Thìn', 'Ngọ', 'Dậu', 'Hợi'].includes(z)) {
        if (zhis.filter((zh, i) => i !== idx && zh === z).length > 0) return true;
    }
    if (z === 'Tý' && zhis.includes('Mão')) return true;
    if (z === 'Mão' && zhis.includes('Tý')) return true;
    if (['Dần', 'Tỵ', 'Thân'].includes(z)) {
        const others = ['Dần', 'Tỵ', 'Thân'].filter(x => x !== z);
        if (others.some(o => zhis.includes(o))) return true;
    }
    if (['Sửu', 'Tuất', 'Mùi'].includes(z)) {
        const others = ['Sửu', 'Tuất', 'Mùi'].filter(x => x !== z);
        if (others.some(o => zhis.includes(o))) return true;
    }
    return false;
}
function checkChongGlobal(zhis, idx) {
    const z = zhis[idx];
    return zhis.some((other, i) => i !== idx && isChong(z, other));
}

function getQuanLu(me) {
    // Quan is opposite polarity controller
    const map = { 'Giáp': 'Tân', 'Ất': 'Canh', 'Bính': 'Quý', 'Đinh': 'Nhâm', 'Mậu': 'Ất', 'Kỷ': 'Giáp', 'Canh': 'Đinh', 'Tân': 'Bính', 'Nhâm': 'Kỷ', 'Quý': 'Mậu' };
    return LU[map[me]];
}


function analyzeGuan(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens2 = ctx.shens2 || [];
    const zhi_shens2 = ctx.zhi_shens2 || [];
    const zhis = ctx.zhis;
    const me = ctx.me;
    const isYang = ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(me);
    const guanLu = getQuanLu(me);

    if (!gan_shens.includes('Chính Quan')) return results;

    // Quan Cach Checks
    if (zhi_shens2.some(s => s === 'Chính Quan')) {
        results.push("Quan nếu thành cách: Kỵ Thương; kỵ hỗn tạp; Cơ sở 78. Có Thương dùng Tài thông quan hoặc Ấn chế. Hỗn tạp dùng Hợp hoặc Thân Quan lưỡng đình. Nhật chủ nhược thì không thể phù.");

        if (gan_shens.includes('Tỷ') || gan_shens.includes('Kiếp')) {
            results.push("Quan cách thấu Tỷ hoặc Kiếp: Cố tỏ vẻ thanh cao hoặc là văn nhân có khiết phích.");
        }
        if (gan_shens.includes('Thương')) {
            results.push("Quan cách thấu Thương: Biểu lý bất nhất (ngoài trong không đồng nhất).");
        }
        if (gan_shens.includes('Chính Tài') || gan_shens.includes('Thiên Tài')) {
            results.push("Quan cách thấu Tài: Tụ tài.");
        }
        if (gan_shens.includes('Chính Ấn')) {
            results.push("Quan cách thấu Ấn: Nhân phẩm thanh nhã.");
        }
        // Check "Quan doc thau" inside QuanCach context
        if (!gan_shens.includes('Chính Ấn') && !gan_shens.includes('Chính Tài') && !gan_shens.includes('Thiên Tài')) {
            results.push("Quan độc thấu thành cách: Người đôn hậu.");
        }
    }

    if ((gan_shens[0] === 'Chính Quan' && gan_shens[1] === 'Chính Quan') || (gan_shens[1] === 'Chính Quan' && ctx.zhi_shen3[1].includes('Chính Quan'))) {
        results.push("Quan nguyệt trùng điệp: Nữ dễ ly hôn, kết hôn sớm không cát lợi. Tính tình ôn hòa.");
    }

    if (gan_shens[3] === 'Chính Quan' && Object.keys(ganzhi.ZHI5[zhis[3]] || {}).length === 1) {
        results.push("Quan chuyên vị giờ tọa Địa chi, Nam có con cái đắc lực.");
    }

    if (gan_shens[0] === 'Chính Quan') {
        results.push("Năm Can là Quan, thân cường có khả năng xuất thân từ gia đình thư hương.");
        if (gan_shens[3] === 'Chính Quan') {
            results.push("Nam mệnh năm Can, giờ Can đều là Quan, không lợi cho hậu đại và con đầu lòng.");
        }
    }

    if (!gan_shens.includes('Chính Tài') && !gan_shens.includes('Chính Ấn') && !gan_shens.includes('Thiên Tài') && !gan_shens.includes('Thiên Ấn')) {
        results.push("Quan độc thấu Thiên Can thành cách, Tứ trụ không Tài hoặc Ấn, là người thật thà.");
    }

    if (gan_shens.includes('Thương')) {
        results.push("Chính Quan Thương Quan thông căn thấu, lại không có cách cục khác, bất lợi. Đặc biệt là Nữ mệnh, đa phần sống xa nhau, hôn nhân không mỹ mãn.");
    }

    if (gan_shens.includes('Sát')) {
        results.push("Năm tháng Can Sát và Thiên Quan, trước 30 tuổi hôn nhân không ổn định. Tháng giờ đa phần thể nhược đa bệnh.");
    }

    // Quan An dong can
    if (gan_shens.includes('Chính Ấn') && zhi_shens2.includes('Chính Ấn') && zhi_shens2.includes('Chính Quan')) {
        results.push("Quan Ấn đồng căn thấu, không Hình Xung Hợp, cát.");
        if (gan_shens.includes('Chính Tài') && zhi_shens2.includes('Chính Tài')) {
            results.push("Tài Quan Ấn đồng căn thấu, không Hình Xung Hợp, cát.");
        }
    }

    if (zhi_shens[1] === 'Chính Quan' && gan_shens[1] === 'Chính Quan') {
        results.push("Nguyệt trụ Chính Quan tọa Chính Quan, hôn biến. Nguyệt trụ không nên thông. Tọa Lộc.");
    }

    // Pillar analysis
    gan_shens.forEach((gan, seq) => {
        if (gan !== 'Chính Quan') return;

        if (zhi_shens[seq] === 'Kiếp' || zhi_shens[seq] === 'Tỷ') {
            results.push("Thiên Can Chính Quan, Địa chi Tỷ Kiên hoặc Kiếp Tài, người thân không thích hợp hợp tác, nhưng người này hợp với việc dọn dẹp mớ hỗn độn.");
        }

        if (zhi_shens[seq] === 'Sát') {
            results.push("Chính Quan tọa Thất Sát, Nam mệnh e có tai nạn kiện tụng. Nữ mệnh hôn nhân không tốt. Nguyệt trụ đặc biệt rắc rối, hai lần có tranh chấp tình cảm. Năm không tính, giờ nhẹ.");
        }

        if (zhi_shens[seq] === 'Kiếp' && isYang) {
            results.push("Quan tọa Dương Nhận: Cần Sát mới có thể khắc chế Dương Nhận, có việc lực bất tòng tâm.");
        }

        if (zhi_shens[seq] === 'Chính Ấn') {
            results.push("Quan tọa Ấn, không Hình Xung Hợp, cát");
        }
    });

    if (shens2.filter(s => s === 'Chính Quan').length > 2 && gan_shens.includes('Chính Quan') && zhi_shens2.includes('Chính Quan')) {
        results.push("Người nhiều Chính Quan, hư danh. Tính tình ôn hòa, khá thực tế. Xem như Thất Sát");
    }

    if (zhis[2] === guanLu || zhi_shens[2] === 'Chính Quan') {
        results.push("Nhật tọa Chính Quan chuyên vị, thục nữ.");
        if (isYang && zhis[3] === DI[me]) {
            results.push("Nhật tọa Chính Quan, giờ chi Dương Nhận: Trước giàu sau bại, rồi đông sơn tái khởi. Tử Bình Mẫu Pháp P55-7");
        }
    }

    if (gan_shens.filter(s => s === 'Chính Quan').length > 2) {
        results.push("Thiên Can 2 Quan, dưới Nữ có em trai em gái phải chăm sóc, cả đời bị tình cảm vây hãm.");
    }

    if (zhi_shens[1] === 'Chính Quan' && zhi_shens2.includes('Thương')) {
        results.push("Nguyệt chi Chính Quan, lại thành Thương Quan cách, khó làm vợ chồng thực sự. Có thực, vô danh.");
    }

    return results;
}

function analyzeSha(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens2 = ctx.shens2 || [];
    const zhi_shens2 = ctx.zhi_shens2 || [];
    const zhis = ctx.zhis;
    const me = ctx.me;

    if (!gan_shens.includes('Sát')) return results;

    results.push("Thất Sát thị phi nhiều. Nhưng đối với đàn ông đôi khi là cách tốt. Ví dụ như Mao Chủ tịch... Thành cách cơ sở 85 có Sát sinh Ấn hoặc Thực chế Ấn, Thân Sát lưỡng đình, Dương Nhận giá Sát.");

    // Sat Cach logic
    if (zhi_shens2.includes('Sát')) {
        results.push("Sát cách: Hỷ Thực Thần chế, cần Thực ở trước, Sát ở sau. Dương Nhận giá Sát: Sát ở trước, Nhận ở sau. Thân Sát lưỡng đình: Ví như Giáp Dần nhật Canh Thân nguyệt. Sát Ấn tương sinh, kỵ Thực đồng thời thành cách.");

        if (gan_shens.includes('Tỷ') || gan_shens.includes('Kiếp')) {
            results.push("Sát cách thấu Tỷ hoặc Kiếp: Tính vội vàng nhưng còn chừng mực.");
        }
        if (gan_shens.includes('Chính Quan')) {
            results.push("Sát cách thấu Quan: Tinh minh tỉ mỉ, không ngại bẩn.");
        }
        if (gan_shens.includes('Thực') || gan_shens.includes('Thương')) {
            results.push("Sát cách thấu Thực Thương: Ngoại biểu ninh tĩnh, nội tâm cương nghị.");
        }
        if (gan_shens.includes('Chính Ấn') || gan_shens.includes('Thiên Ấn')) {
            results.push("Sát cách thấu Ấn: Viên nhuận, tinh minh can luyện.");
        }
    }

    if (gan_shens[0] === 'Sát' && gan_shens[1] === 'Sát') {
        results.push("Sát Nguyệt Can Niên Can trùng điệp: Không phải con cả, xuất thân bình thường, nhiều tai họa, làm người không vững vàng.");
    }

    if (gan_shens[1] === 'Sát' && ctx.zhi_shen3[1].includes('Sát')) {
        results.push("Sát nguyệt trùng điệp: Nữ dễ ly hôn, cách khác cả đời nhiều bệnh.");
    }

    if (gan_shens[0] === 'Sát') {
        results.push("Năm Can Thất Sát, thuở nhỏ không tốt. Hoặc nhà nghèo hoặc thân thể không tốt.");
        if (gan_shens[1] === 'Sát') {
            results.push("Năm tháng Thiên Can Thất Sát, gia đình phức tạp.");
        }
    }

    if (gan_shens.includes('Chính Quan')) {
        results.push("Quan và Sát đồng kiến Thiên Can không tốt. Nữ ở năm Can tháng Can, trước 30 tuổi hôn nhân không tốt, hoặc thể nhược đa bệnh.");
    }

    if (gan_shens[1] === 'Sát' && zhi_shens[1] === 'Sát') {
        results.push("Nguyệt trụ đều là Thất Sát, khắc quá mức. Có phúc không biết hưởng. Lục thân phúc mỏng. Trụ giờ không sao.");
        if (!zhi_shens2.includes('Sát')) {
            results.push("Thất Sát năm tháng nổi trên Thiên Can, tính tình hay thay đổi, không dễ định hình. Trước 30 tuổi không được.");
        }
    }

    if (zhi_shens.includes('Sát') && zhi_shens.includes('Kiếp')) {
        results.push("Thất Sát Địa chi có căn thì cần có Dương Nhận cường là tốt. Sát thân lưỡng đình.");
    }

    if (gan_shens[1] === 'Sát' && gan_shens[3] === 'Sát') {
        results.push("Tháng giờ Thiên Can là Thất Sát: Thể nhược đa bệnh");
    }

    if (gan_shens[0] === 'Sát' && gan_shens[3] === 'Sát') {
        results.push("Thất Sát năm Can giờ Can: Nam con đầu rắc rối (xác suất), Nữ hôn nhân có cản trở.");
    }

    if (gan_shens[3] === 'Sát') {
        results.push("Thất Sát ở giờ Can, cố chấp có nghị lực.");
    }

    if (gan_shens.includes('Chính Ấn') || gan_shens.includes('Thiên Ấn')) {
        results.push("Thân nhược Sát sinh Ấn, không ít người là thương nhân tinh minh nhuần nhuyễn.");
    }

    if (gan_shens.includes('Chính Tài') || gan_shens.includes('Thiên Tài')) {
        results.push("Tài sinh Sát, nếu không phải thân nhược có Ấn, không tốt.");
    }

    // Pillar analysis
    gan_shens.forEach((gan, seq) => {
        if (gan !== 'Sát') return;

        if (ctx.zhi_shen3[seq].includes('Sát') && seq !== 3) {
            results.push("Thất Sát tọa Thất Sát, lục thân phúc mỏng.");
        }

        if (ctx.empties && ctx.empties[2] && ctx.empties[2].includes(zhis[seq])) {
            results.push("Thất Sát tọa Không Vong, Nữ mệnh phu duyên mỏng.");
        }

        if (zhi_shens[seq] === 'Thực') {
            results.push("Thất Sát tọa Thực: Dễ có phán đoán sai lầm.");
        }

        // Check Xung/Hinh
        if (checkHinh(zhis, seq) || checkChongGlobal(zhis, seq)) {
            results.push("Thất Sát tọa Hình hoặc đối xung, vợ chồng không hòa thuận.");
        }
    });

    if (shens2.filter(s => s === 'Sát').length > 2) {
        results.push("Sát nhiều nếu vô chế, tính cách cương cường. Hay bênh vực kẻ yếu, không dễ nghe lời khuyên. Nữ thích người mà mình kính nể.");
    }

    // Thien Nguyen Toa Sat
    if (zhi_shens[2] === 'Sát' && Object.keys(ganzhi.ZHI5[zhis[2]] || {}).length === 1) {
        results.push("Thiên nguyên tọa Sát: Ất Dậu, Kỷ Mão, nếu không có Thực Thần, Dương Nhận, tính vội vàng, thông minh, không tin tưởng người khác. Nếu Thất Sát còn thấu ra tháng Can vô chế, thể nhược đa bệnh, thậm chí yêu chiết. Nếu ở giờ Can, hậu vận không tốt.");
    }

    if (gan_shens.filter(s => s === 'Sát').length > 2) {
        results.push("Thiên Can 2 Sát, không phải con cả, tính cách nổi nóng không bền chí.");
    }

    return results;
}

module.exports = {
    analyzeGuan,
    analyzeSha
};
