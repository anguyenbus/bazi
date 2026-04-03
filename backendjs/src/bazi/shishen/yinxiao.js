/**
 * Ten Deities (Thập Thần) analysis - Part 2: Ấn Kiêu (Yin Xiao)
 */
const ganzhi = require('../ganzhi');

const LU = {
    'Giáp': 'Dần', 'Ất': 'Mão', 'Bính': 'Tỵ', 'Đinh': 'Ngọ', 'Mậu': 'Tỵ',
    'Kỷ': 'Ngọ', 'Canh': 'Thân', 'Tân': 'Dậu', 'Nhâm': 'Hợi', 'Quý': 'Tý'
};

function getLuOfKieu(me) {
    // Kieu is same polarity resource.
    const map = { 'Giáp': 'Nhâm', 'Ất': 'Quý', 'Bính': 'Giáp', 'Đinh': 'Ất', 'Mậu': 'Bính', 'Kỷ': 'Đinh', 'Canh': 'Mậu', 'Tân': 'Kỷ', 'Nhâm': 'Canh', 'Quý': 'Tân' };
    const kieuGan = map[me];
    return LU[kieuGan];
}

function getLuOfAn(me) {
    // An is opposite polarity resource.
    const map = { 'Giáp': 'Quý', 'Ất': 'Nhâm', 'Bính': 'Ất', 'Đinh': 'Giáp', 'Mậu': 'Đinh', 'Kỷ': 'Bính', 'Canh': 'Kỷ', 'Tân': 'Mậu', 'Nhâm': 'Tân', 'Quý': 'Canh' };
    const anGan = map[me];
    return LU[anGan];
}

function analyzeYin(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens2 = ctx.shens2 || [];
    const zhis = ctx.zhis;
    const zhus = ctx.zhus;
    const me = ctx.me;

    if (!gan_shens || !gan_shens.includes('Chính Ấn')) return results;

    if (ctx.zhi_shens2 && ctx.zhi_shens2.includes('Chính Ấn')) {
        results.push("Cơ sở 82, thành cách hỷ Quan Sát, thân nhược, kỵ Tài khắc Ấn. Hợp Ấn lưu Tài, kiến lợi vọng nghĩa. Thấu Tài Quan Sát thông quan hoặc Ấn sinh Tỷ Kiếp; hợp xung Ấn nếu không có cách khác hoặc Điều Hậu phá cách. Nhật chủ cường hung, Lộc Nhận một chi có thể dùng Thực Thương tiết.");
    }

    if (gan_shens[1] === 'Chính Ấn' && ctx.zhi_shen3[1].includes('Chính Ấn')) {
        results.push("Ấn nguyệt trùng điệp: Nữ kết hôn muộn, tháng có Dương Nhận thì ly quả, có thể độc lập kiếm sống, là tài nữ có tu dưỡng.");
    }

    if (gan_shens[0] === 'Chính Ấn') {
        results.push("Năm Can Ấn là hỷ: Sinh ra trong gia đình giàu sang phú quý.");
    }

    if (shens2.filter(s => s === 'Chính Ấn').length > 2) {
        results.push("Chính Ấn nhiều: Thông minh có mưu lược, khá hàm súc, không hại người, biết thời thế. Chính Ấn không sợ Nhật chủ tử tuyệt, ngược lại sợ quá cường. Nhật chủ cường, Chính Ấn nhiều, cô tịch, không giỏi quản lý tài chính. Nam khắc vợ, ít con cái. Nữ khắc mẹ.");
    }

    // Check An + Quan/Sat/Ti
    if (gan_shens.some(s => ['Chính Quan', 'Sát', 'Tỷ', 'Kiếp'].includes(s))) { // Simplify check "Quan/Sat/Ti in Gan"
        // Python: if 'Quan' or 'Sat' or 'Ti'...
        if (gan_shens.includes('Chính Quan') || gan_shens.includes('Sát') || gan_shens.includes('Tỷ')) {
            results.push("Chính Ấn nhiều, có Tỷ Kiên ở Thiên Can, không sợ Tài. Có Quan Sát ở Thiên Can cũng không sợ. Tài không mạnh cũng không sao.");
        }
    } else {
        results.push("Chính Ấn sợ Tài.");
    }


    // Pillar analysis
    gan_shens.forEach((gan, seq) => {
        if (gan !== 'Chính Ấn') return;
        const zhi = ctx.zhis[seq];

        // Tọa Tử Tuyệt check
        const tsStatus = ganzhi.getVongTrangSinh(ctx.gans[seq], zhi);
        if (tsStatus === 'Tuyệt') {
            results.push("Chính Ấn tọa Tuyệt: Duyên với mẹ mỏng, mẹ sức khỏe kém.");
        }
        if (tsStatus === 'Mộ') {
            results.push("Chính Ấn tọa Mộ: Mẹ duyên mỏng, tính cách thâm trầm.");
        }
        if (tsStatus === 'Tử') {
            results.push("Chính Ấn tọa Tử: Mẹ bất lợi.");
        }

        // Check Tuyet/Tu/Mo specific text from Python Line 56
        if ((tsStatus === 'Tuyệt' || tsStatus === 'Tử') && seq < 3) {
            results.push("Chính Ấn tọa Tử Tuyệt, hoặc Thiên Can Chính Ấn Địa chi có Xung Hình, không lợi cho mẹ. Trụ giờ không tính.");
        }

        if (zhi_shens[seq] === 'Chính Tài' || zhi_shens[seq] === 'Thiên Tài') {
            if (zhi_shens[seq] === 'Chính Tài') {
                results.push("Nam Chính Ấn tọa Chính Tài, vợ chồng không hòa thuận. Nguyệt trụ Chính Ấn tọa Chính Tài chuyên vị, tất ly hôn. Ở trụ giờ, hơn 50 tuổi mới có hôn nhân bình thường.");
            }
        }

        if (zhi_shens[seq] === 'Chính Ấn') {
            results.push("Chính Ấn tọa Chính Ấn, chuyên vị, quá tự tin. Vụ thực, cầm lên được bỏ xuống được. Nữ thì đa phần kết hôn muộn. Mẹ trường thọ; Nữ con cái muộn, thai đầu e sảy thai. Nữ Tứ trụ không có Quan Sát, khó có lương duyên. Nam làm nghệ thuật thì tốt, kinh doanh thì cô tịch, không tụ tài.");
        }

        if (zhi_shens[seq] === 'Thiên Ấn') { // And check chuyen vi logic if strictly followed
            results.push("Chính Ấn tọa Thiên Ấn chuyên vị: Có nhiều nghề nghiệp; gia đình bất cát: người thân có bệnh hoặc sở thích đặc biệt. Con cái muộn; tài vụ song quan. Ngoài một kiểu, trong một kiểu. Nữ tính cách hai mặt.");
        }

        if (zhi_shens[seq] === 'Thương') {
            results.push("Chính Ấn tọa Thương Quan: Thích hợp nghề thanh cao. Không thích hợp theo đuổi danh lợi, nữ hôn nhân không tốt.");
        }

        if (zhi_shens[seq] === 'Kiếp' && ['Giáp', 'Canh', 'Nhâm'].includes(ctx.me)) {
            results.push("Chính Ấn tọa Dương Nhận, thân tâm đa thương, tâm lực cạn kiệt, thi thoảng do công việc mà tử nạn. Chủ yếu chỉ Nguyệt trụ. Coi trọng công việc.");
        }
    });

    // Special Combination: An, Sat, Duong Nhan (Kiep)
    if (gan_shens.includes('Sát') && zhi_shens.includes('Kiếp') && ['Giáp', 'Canh', 'Nhâm'].includes(me)) {
        results.push("Chính Ấn, Thất Sát, Dương Nhận toàn: Nữ mệnh người tôn giáo, nếu không thì độc thân, thanh cao, thân thể e có bệnh kín, tính cách hẹp hòi thiếu kiên nhẫn. Nam tật bệnh nhiều, chỉ giỏi lý thuyết, hôn nhân không tốt, e có con ngoài giá thú, tâm tư tỉ mỉ yêu cầu cao với người khác.");
    }

    if (gan_shens.includes('Chính Quan') || gan_shens.includes('Sát')) {
        results.push("Thân nhược Quan Sát và Ấn đều thấu Thiên Can, cách cục tốt.");
    } else {
        results.push("Riêng Chính Ấn chủ tú khí, nghệ thuật, văn tài. Tính cách bảo thủ.");
    }

    if (gan_shens.includes('Chính Tài') || gan_shens.includes('Thiên Tài')) {
        results.push("Ấn và Tài đều thấu Thiên Can, đều có căn, tốt nhất Tiền Tài Hậu Ấn, cả đời kiết tường. Tiền Ấn Hậu Tài, năng lực tốt, nhưng đa phần bôn ba vì người khác. (Nam)");
    }

    return results;
}

function analyzeXiao(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens2 = ctx.shens2 || [];
    const zhi_shens2 = ctx.zhi_shens2 || [];

    if (!gan_shens.includes('Thiên Ấn')) return results;

    results.push("Thiên Ấn ở Thiên Can nếu thành cách: Thiên Ấn phía trước, Thiên Tài (Tài thứ chi) phía sau, có Thiên Nguyệt Đức là mệnh tốt (Thiên Ấn cách ở ngày giờ, không ở tháng thấu Thiên Can cũng rắc rối). Kỵ điên đảo kiệt thực, nhưng tọa Tuyệt thì không có năng lực này.");
    results.append ? results.append("Kinh điển cho rằng: Thiên Ấn không thể phù thân, cần thân vượng; Thiên Ấn kiến Quan Sát chưa chắc là phúc; hỷ Thương Quan, hỷ Tài; kỵ Nhật chủ vô căn; Nữ chăm sóc anh chị em; Nam lục thân như giá lạnh") : results.push("Kinh điển cho rằng: Thiên Ấn không thể phù thân, cần thân vượng; Thiên Ấn kiến Quan Sát chưa chắc là phúc; hỷ Thương Quan, hỷ Tài; kỵ Nhật chủ vô căn; Nữ chăm sóc anh chị em; Nam lục thân như giá lạnh");
    results.push("Thiên Ấn cách Can Chi có Xung, Hợp, Hình, Địa chi là vị trí Tuyệt của Thiên Ấn cũng không tốt.");

    // Check Kieu Than Doat Thuc
    if (gan_shens.includes('Thực')) {
        results.push("Kiêu Thần đoạt Thực: Nếu thân cường mà gặp Kiêu đoạt Thực, tai họa trùng trùng, sự nghiệp trắc trở, ăn uống kém, nữ mệnh khó sinh nuôi con.");
    }

    if (gan_shens[1] === 'Thiên Ấn' && ctx.zhi_shen3[1].includes('Thiên Ấn')) {
        results.push("Kiêu nguyệt trùng điệp: Phúc mỏng tuệ nhiều, thanh niên đơn độc, có khuynh hướng văn nghệ tôn giáo.");
    }

    if (zhi_shens2.filter(s => s === 'Thiên Ấn').length > 1) { // Check counting
        results.push("Thiên Ấn căn thấu 2 trụ, cô độc có hoạn nạn sắc dục. Làm việc có đầu không cuối, Nữ danh tiếng không tốt!");
    }

    if (zhi_shens2.some(s => s === 'Thiên Ấn')) {
        results.push("Thiên Ấn thành cách cơ sở 89 sinh Tài, phối Ấn; hỷ nhất Thiên Tài đồng thời thành cách, Thiên Ấn phía trước, Thiên Tài phía sau. Kỵ nhất ngày giờ tọa thực Tỷ Kiếp Nhận.");
    }

    if (shens2.filter(s => s === 'Thiên Ấn').length > 2) {
        results.push("Thiên Ấn quá nhiều, tính cách cô độc, diễn đạt quá hàm súc, để người khác phải đoán, nói chuyện đôi khi có gai. Khá bi quan. Có Thiên Tài và Thiên Nguyệt Đức quý nhân có thể cải thiện. Có thiên phú nghệ thuật. Làm việc đa phần có đầu không cuối. Nếu Tứ trụ toàn Âm, phái nữ danh tiếng không tốt.");
        results.push("Đối với anh chị em khá tốt. Nam do tài cán được con cái kính trọng. Nữ Thiên Ấn nhiều, con cái không nhiều. Thứ nhất khắc Thương Thực, thứ hai tính nghệ thuật.");
        if (gan_shens.includes('Thương')) {
            results.push("Nữ mệnh Thiên Ấn nhiều, lại cùng Thương Quan đồng thấu, chồng ly con tán. Có Thiên Tài và Thiên Nguyệt Đức quý nhân có thể cải thiện.");
        }
    }

    if (gan_shens.filter(s => s === 'Thiên Ấn').length > 1) {
        results.push("Thiên Can hai Thiên Ấn: Kết hôn muộn, độc thân..., hôn nhân không tốt. Ba Thiên Ấn, gia tộc ít người, họ hàng không nhiều.");
    }

    if (gan_shens[0] === 'Thiên Ấn' && zhi_shens[0] === 'Thiên Ấn') {
        results.push("Thiên Ấn ở năm, Can Chi đều thấu, không lợi cho trưởng bối. Mẹ kế đương lệnh, mẹ đẻ không quyền, có thể là con nuôi, phòng nhì, anh em cùng cha khác mẹ...");
    }

    // Pillar analysis
    gan_shens.forEach((gan, seq) => {
        if (gan !== 'Thiên Ấn') return;
        const zhi = ctx.zhis[seq];
        const tsStatus = ganzhi.getVongTrangSinh(ctx.gans[seq], zhi);

        if (tsStatus === 'Tuyệt') {
            results.push("Thiên Ấn tọa Tuyệt: Sinh lực yếu, làm việc không kiên trì.");
        }
        if (tsStatus === 'Mộ') {
            results.push("Thiên Ấn tọa Mộ: Tính cách thâm trầm, làm việc bí mật.");
        }
    });

    return results;
}

function analyzeYinXiaoGeneral(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const zhis = ctx.zhis;
    const me = ctx.me;
    const anLu = getLuOfAn(me);
    const kieuLu = getLuOfKieu(me);

    if (zhi_shens[1] === 'Chính Ấn') {
        if (ctx.is_female) {
            results.push("Nguyệt chi Ấn: Nữ mệnh thấy chồng không bằng mình, phân cư là thường tình, tự mình có năng lực.");
        }
        if (gan_shens[1] === 'Chính Ấn') {
            results.push("Nguyệt Can Chi Ấn: Nam quyền trọng hơn danh, Nữ mệnh rất tự tin, bình quyền với chồng. Thông minh có quyền mưu, tự ngã");
            if (gan_shens.includes('Tỷ')) {
                results.push("Nguyệt Can Chi Ấn cách, thấu Tỷ, có Xung vong.");
            }
        }
    }

    if (ctx.is_female) {
        if (zhis[1] === anLu || zhis[1] === kieuLu) {
            results.push("Ấn hoặc Kiêu ở Nguyệt chi (Lộc), có tâm thái áp chế chồng.");
        }
        if (zhis[3] === anLu || zhis[3] === kieuLu) {
            results.push("Ấn hoặc Kiêu ở Thời chi (Lộc), chồng tai họa con cái ít.");
        }
    }

    if (gan_shens[0] === 'Thiên Ấn' || zhi_shens[0] === 'Thiên Ấn') {
        results.push("Thiên Ấn ở năm: Ít có gia đình giàu sang; có tố chất tôn giáo, không thích hưởng lạc, giác quan thứ sáu mạnh.");
    }

    if (gan_shens[1] === 'Thiên Ấn' || zhi_shens[1] === 'Thiên Ấn') {
        results.push("Thiên Ấn ở tháng: Có tuệ ít phúc, có thể xả thân vì người.");
    }

    if (gan_shens[3] === 'Thiên Ấn' || zhi_shens[3] === 'Thiên Ấn') {
        results.push("Thiên Ấn ở giờ: Nữ sống xa con cháu; Nam trước 50 tuổi đặt nền móng, tuổi già hưởng phúc.");
    }

    const countAnKieu = gan_shens.filter(s => s === 'Chính Ấn').length + gan_shens.filter(s => s === 'Thiên Ấn').length;
    if (countAnKieu > 1) {
        results.push("Ấn Kiêu ở năm Can tháng Can, tính cách hủ lậu, tỏ vẻ thanh cao, Nữ con cái muộn, hôn nhân có cản trở. Ấn Kiêu ở giờ Can, không lợi mẹ con, tính cách không hòa hợp.");
    }

    return results;
}

module.exports = {
    analyzeYin,
    analyzeXiao,
    analyzeYinXiaoGeneral
};
