/**
 * Ten Deities (Thập Thần) analysis - Part 1: Tỷ Kiếp (Bi Jie)
 */
const ganzhi = require('../ganzhi');

// Helper Lục Xung
const LUC_XUNG = [
    ['Tý', 'Ngọ'], ['Sửu', 'Mùi'], ['Dần', 'Thân'], ['Mão', 'Dậu'], ['Thìn', 'Tuất'], ['Tỵ', 'Hợi']
];
function isChong(z1, z2) {
    if (!z1 || !z2) return false;
    return LUC_XUNG.some(pair => pair.includes(z1) && pair.includes(z2));
}

// Helper Tam Hình / Tự Hình (Simplified)
function checkHinh(zhis, idx) {
    const z = zhis[idx];
    // Tu Hinh
    if (['Thìn', 'Ngọ', 'Dậu', 'Hợi'].includes(z)) {
        // Check if another same branch exists
        if (zhis.filter((zh, i) => i !== idx && zh === z).length > 0) return true;
    }
    // Ty Mao
    if (z === 'Tý' && zhis.includes('Mão')) return true;
    if (z === 'Mão' && zhis.includes('Tý')) return true;
    // Dan Ty Than
    if (['Dần', 'Tỵ', 'Thân'].includes(z)) {
        const others = ['Dần', 'Tỵ', 'Thân'].filter(x => x !== z);
        if (others.some(o => zhis.includes(o))) return true; // Loose check (at least 1 partner)
    }
    // Suu Tuat Mui
    if (['Sửu', 'Tuất', 'Mùi'].includes(z)) {
        const others = ['Sửu', 'Tuất', 'Mùi'].filter(x => x !== z);
        if (others.some(o => zhis.includes(o))) return true;
    }
    return false;
}

function checkChong(zhis, idx) {
    const z = zhis[idx];
    return zhis.some((other, i) => i !== idx && isChong(z, other));
}


function analyzeBiExcess(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens = ctx.shens2 || [];

    results.push(`Tỷ Kiên xuất hiện nhiều:
        Nữ thương con cái hơn chồng; dễ phủ định chồng. Cách nói khác: Có lý tưởng, tự tin, tham tài, không sợ vợ. Nam có hai vợ.
        Anh em thiếu sự giúp đỡ. Vợ chồng đôi khi không hòa hợp. Bạn thân tri kỷ không ở lâu.
        Dù thành cách tốt cũng là mệnh vất vả, việc gì cũng tự tay làm. Trừ khi có Quan Sát chế phục. Tình cảm phiền lòng.
        Thiện ý nói nhiều, dẫn đến tranh chấp vô cớ; khó giữ bí mật, không nên nói nhiều; dễ phạm lỗi "vô sự bận rộn" để thể hiện mình; ngại từ chối người khác; tích tụ cảm xúc rồi đột ngột từ bỏ.
        Tỷ Kiên quá nhiều, Nữ: Bạn có số giúp chồng, hãy hỗ trợ sự nghiệp của anh ấy nhiều hơn, đưa ra nhiều ý kiến, thi thoảng có tranh chấp cũng không sao. Nữ: Tình cảm rắc rối.
        Đối với người cảnh giác thấp, lạc quan biết mệnh; quá trình tình cảm nhiều sóng gió.`);

    if (!shens.includes('Chính Quan') && !shens.includes('Sát')) {
        results.push("Tỷ Kiên nhiều, tứ trụ không có Chính Quan Thất Sát, tính tình nóng nảy.");
    }

    if (gan_shens.includes('Kiếp')) {
        results.push("Thiên Can Tỷ Kiếp song lập, Tỷ Kiên Địa chi chuyên vị, nữ mệnh tình cảm phong phú, thường gặp cảnh tranh chồng.");
    }

    if (gan_shens[0] === 'Tỷ') {
        results.push("Năm Can là Tỷ, không phải con trưởng, duyên cha mẹ khá mỏng, kết hôn muộn.");
    }

    if (gan_shens[3] === 'Tỷ') {
        results.push("Tổng tắc Mẫu pháp P21-6: Thời Can là Tỷ, nếu Địa chi ngày giờ xung, nam không lợi cho vợ, nữ vất vả vì chồng, làm nghệ thuật chín dòng, tôn giáo thì không sao.");
    }

    if (gan_shens[1] === 'Tỷ') {
        if (zhi_shens[1] === 'Thực') results.push("Nguyệt trụ Tỷ tọa Thực, dễ được quý nhân phù trợ.");
        if (zhi_shens[1] === 'Thương') results.push("Nguyệt trụ Tỷ tọa Thương, cả đời chỉ có chút tài khí, khó phú quý.");
        if (zhi_shens[1] === 'Tỷ') results.push("Nguyệt trụ Tỷ tọa Tỷ, gia đình đơn thân, kết hôn không đầu xôi đuôi lọt. Địa chi Tam Hợp hoặc Tam Hội Tỷ, Thiên Can 2 Tỷ cũng vậy.");
        if (zhi_shens[1] === 'Chính Tài' || zhi_shens[1] === 'Thiên Tài') results.push("Nguyệt trụ Tỷ tọa Tài, không lợi cho vợ, cũng chủ cha mẹ sức khỏe kém. Do người thân, tình cảm mà hao tài vô ích.");
        if (zhi_shens[1] === 'Sát') results.push("Nguyệt trụ Tỷ tọa Sát, vững chãi.");
    }

    return results;
}

function analyzeBiJian(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const zhis = ctx.zhis;
    const shens2 = ctx.shens2 || [];

    // Safety check
    if (!gan_shens || !zhi_shens) return results;

    if (!gan_shens.includes('Tỷ')) {
        return results;
    }

    results.push("Tỷ: Đồng tính tương xung. Ghét chính mình. Luôn nghĩ lại trước đó có sai không. Không có tính bền vững, tối đa theo bạn 3-5 năm. Tán tài, tháng lên Tỷ Kiên, làm việc không định tính, không coi trọng tiền, tình cảm không bền lâu. Không nghi ngờ người ta, tâm địa tốt. Thiện ý gây rắc rối. Năm lên không vấn đề lớn.");

    if (gan_shens[0] === 'Tỷ' && gan_shens[1] === 'Tỷ') {
        results.push("Tỷ Kiên năm tháng Thiên Can song hiện: Không phải con cả, xuất thân bình thường. Nữ dung mạo đoan trang, có tư tưởng riêng; không coi trọng tiền tài, hay nói không giữ bí mật. Dưới 30 tuổi thị phi tiểu nhân không ngừng.");
    }

    if (gan_shens[1] === 'Tỷ' && ctx.zhi_shen3[1].includes('Tỷ')) {
        results.push("Nguyệt trụ Can Chi Tỷ Kiên: Tranh chồng tình cảm phong phú. Dưới 30 tuổi tiền không đủ tiêu.");
    }

    if (gan_shens[0] === 'Tỷ') {
        results.push("Năm Can Tỷ: Trên có anh/chị, xuất thân bình thường.");
    }

    if (zhi_shens[2] === 'Tỷ') {
        results.push("Nữ tọa Tỷ lộ Tỷ: Vợ chồng oán hận nhau.");
    }

    if (gan_shens.filter(g => g === 'Tỷ').length > 1) {
        results.push("Thiên Can 2 Tỷ Kiên: Tự ngã bài xích, dễ hối hận, do dự, quyết định vội vàng dẫn đến sai lầm; Nam có xu hướng thích làm việc nhóm, tự mình quyết định dễ đánh cược tất cả. Nữ có tư tưởng riêng, dung mạo đẹp, chú trọng chi tiết, thương con hơn chồng. Coi thường chồng. Đối với chồng đa nghi, dễ ghen tuông xung động. Nam không được lòng phái nữ. Khó giữ bí mật, không thích hợp nói nhiều; Địa chi có căn, cả đời thị phi nhỏ không ngừng. Không có Quan Sát chế, thiếu kiên nhẫn.");
    }

    // Check Excess
    if (shens2.filter(s => s === 'Tỷ').length > 2 && zhi_shens.includes('Tỷ')) {
        results.push(...analyzeBiExcess(ctx));
    }

    // Individual pillar analysis
    gan_shens.forEach((gan, seq) => {
        if (gan !== 'Tỷ') return;
        const zhi = zhis?.[seq];

        // Check Khong Vong (Empty)
        if (ctx.empties && ctx.empties[2] && ctx.empties[2].includes(zhi)) {
            results.push(`Tỷ Kiên trụ ${ctx.zhus?.[seq]?.[1] || seq} tọa Không Vong: Không lợi cho cha và vợ. Năm không lợi cha, tháng không lợi cha và vợ. Nữ: Duyên vợ chồng mỏng.`);
        }

        const tsStatus = ganzhi.getVongTrangSinh(ctx.gans[seq], zhi);
        if (tsStatus === 'Mộ') {
            results.push(`Tỷ Kiên trụ ${seq} tọa Mộ: Hình khắc anh em, duyên phận mỏng.`)
        }

        // Hinh / Chong
        if (checkHinh(zhis, seq)) {
            results.push("Tỷ Kiên tọa Hình (chú ý không phải Bán Hình), tuổi thơ gian khổ, tự thân vận động từ sớm.");
            if (zhi_shens[seq] === 'Kiếp') {
                results.push("Tỷ Kiên tọa Hình Kiếp, anh em không hòa thuận, cũng có thể ly cư với vợ.");
            }
        }
        if (checkChong(zhis, seq)) {
            results.push("Tỷ Kiên Xung, tay chân không hòa, dựa theo trụ định thời gian. Nữ mệnh kỵ Tỷ Kiếp và hợp Quan Sát, nhiều phần do nhậm tính gây ra khó khăn.");
        }

        if (zhi_shens[seq] === 'Tỷ') {
            results.push("Tỷ tọa Tỷ - Bình cát: Đối lập với Quan Sát, không có chủ quyền. Con nuôi: Khắc Thiên Tài, tiết Chính Ấn. Cát: Hết lòng vì bạn bè; Hung: Luống công vì anh em bạn bè. Duyên cha mỏng, cô độc, nam hay kết hôn muộn.");
        }

        if (zhi_shens[seq] === 'Kiếp') {
            results.push("Tỷ tọa Kiếp - Đại hung: Vì kỵ người thân mà tổn thất, hùn hạp làm ăn giữa đường giải tán, không hợp với vợ. Như năm tháng thấy 3 Tỷ, duyên cha mỏng hoặc đã tử biệt.");
            results.push("Nữ Tỷ Kiên tọa Kiếp: Vợ chồng oán hận nhau. Còn có Hình Xung và là Dương Nhận, nữ e có tai họa bất ngờ: như xe cộ, phẫu thuật.");

            // Python line 139: Check Tuyet
            if (tsStatus === 'Tuyệt' && seq < 2) {
                results.push("Tỷ Kiên tọa Tuyệt, anh em không nhiều, hoặc khó gặp mặt. Mậu Kỷ và Nhâm Quý xác suất thấp hơn một chút.");
            }
        }

        if (zhi_shens[seq] === 'Chính Tài' || zhi_shens[seq] === 'Thiên Tài') {
            results.push("Tỷ Kiên tọa Tài: Do người thân, tình cảm mà gây tổn thất vô ích.");
        }

        if (zhi_shens[seq] === 'Sát') {
            results.push("Tỷ Kiên tọa Sát: Vững chãi.");
        }

        if (zhi_shens[seq] === 'Thiên Ấn') {
            results.push("Tỷ Kiên tọa Kiêu: 3-5 năm phát đạt, sau đó giữ thành.");
        }

        // Dương nhận check (Yangren)
        if (zhi_shens[seq] === 'Kiếp' && ctx.isYangMe) {
            results.push("Tỷ Kiên tọa Dương Nhận: Cha mất trước, tùy trụ nào để đoán thời gian. Ở năm không lợi cha, ở chỗ khác có vết dao, xe cộ, tai nạn bất ngờ.");
        }

        if (['Kiếp', 'Tỷ'].includes(zhi_shens[seq]) && gan_shens.includes('Kiếp')) {
            results.push("Thiên Can Tỷ Kiếp song hành, Tỷ Kiên lại tọa Tỷ Kiếp, Nữ dễ gặp cảnh tranh chồng, cá tính mạnh, khó hòa hợp.");
        }
    });

    return results;
}

function analyzeJieCai(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const zhis = ctx.zhis;
    const shens2 = ctx.shens2 || [];
    const isYang = ctx.isYangMe;

    if (!gan_shens.includes('Kiếp')) return results;

    results.push("Kiếp Tài phù trợ, chu đáo vẹn toàn. Người nhiều Kiếp Tài trong khiêm tốn có phần ngạo mạn. Phàm sự việc trước lý sau tình, hoặc trước tình sau lý. Trước chi tiết sau toàn cục. Tính cương cường, tinh minh can luyện, nữ mệnh không thích hợp Can lộ Chi tàng.");
    results.push("Vụ thực, không thích lý luận suông. Không dễ nhận sai, khá bướng. Có lý tưởng nhưng không đủ linh hoạt. Không sợ lời ra tiếng vào. Không nể mặt người khác.");
    results.push("Hợp tác làm ăn có đầu không có cuối. Quá trọng chi tiết. Làm lãnh đạo nhỏ vẫn được. Có chí hướng, tự tin. Sát hoặc Thực thấu Can có thể giải mọi tiêu cực. Nữ mệnh kỵ Tỷ Kiếp và hợp Quan Sát, nhiều phần do nhậm tính gây ra khó khăn.");

    if (gan_shens[0] === 'Kiếp' && gan_shens[1] === 'Kiếp') {
        results.push("Kiếp năm tháng Thiên Can song hiện: Hỷ nộ lộ ra mặt, trước 30 tuổi thất bại lớn một lần. Quá tự tin, tinh minh phản bị tinh minh ngộ.");
    }

    if (gan_shens[1] === 'Kiếp') {
        if (ctx.zhi_shen3[1].includes('Kiếp')) {
            results.push("Nguyệt trụ Can Chi Kiếp: Vô duyên với cha, trước 30 tuổi nhậm tính, kết hôn sớm phòng chia tay, áp lực tinh thần cực kỳ nặng nề.");
        }
        // Missing line 204: Kiep + Tai Lu
        // Simplify: Check if month branch is Tai (Wealth) Lu? 
        // We skip exact Lu check for now as it needs Lu data.
    }

    if (shens2.filter(s => s === 'Kiếp').length > 2) {
        results.push('Kiếp Tài quá nhiều, hôn nhân không tốt');
    }

    if (zhi_shens[2] === 'Kiếp') {
        results.push("Nhật tọa Kiếp Tài, thấu Thiên Can. Ở năm cha mất sớm, ở tháng quan hệ vợ chồng không tốt. Ví như tài sản phòng bị lẫn nhau; coi thường đối phương; tự mình quyết định mặc đối phương không đồng ý. Nam thường có hai vợ. Thiên Can có Sát hoặc Thực có thể giải.");
    }

    // Interaction Checks
    if (gan_shens.includes('Chính Tài')) {
        results.push("Kiếp Tài gặp Chính Tài: Khắc vợ, phá tài, đề phòng tiểu nhân hãm hại.");
    }
    if (gan_shens.includes('Thiên Tài')) {
        results.push("Kiếp Tài gặp Thiên Tài: Tổn hại cha, hao tài tốn của, khó tụ tài.");
    }

    // Pillar Loop
    gan_shens.forEach((gan, seq) => {
        if (gan !== 'Kiếp') return;
        const zhi = zhis?.[seq];

        if (zhi_shens[seq] === 'Kiếp' && isYang) {
            results.push("Kiếp Tài tọa Dương Nhận: Tính cách cực đoan, hình khắc người thân, đề phòng tai nạn huyết quang.");
        }

        const tsStatus = ganzhi.getVongTrangSinh(ctx.gans[seq], zhi);
        if (tsStatus === 'Tuyệt') {
            results.push("Kiếp Tài tọa Tuyệt: Tính cách manh động, thiếu suy tính.");
        }
    });

    return results;
}

function analyzeBiKiepGeneral(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens2 = ctx.shens2 || [];

    if (zhi_shens[2] === 'Tỷ') {
        results.push("Nhật chi Tỷ: 1-39 tuổi có sự lãnh đạo kiểu gia trưởng trong việc nhà; tiền kiếm được không dễ và đôi khi hao tài nhỏ. Tự ngã, nếu có Hình Xung thì không thích về nhà!");
    }

    if (zhi_shens[3] === 'Tỷ') {
        results.push("Thời chi Tỷ: Con cái tính công chính cương trực, sức hành động mạnh, có thể được tài sản.");
    }

    if (gan_shens[1] === 'Tỷ' || zhi_shens[1] === 'Tỷ') {
        results.push("Nguyệt trụ Tỷ: Trước 30 tuổi khó có thành tựu. Mạo tiến, bất ổn. Bạn gái không bền, chủ nghĩa đại nam tử.");
    }

    if (gan_shens[3] === 'Tỷ' || zhi_shens[3] === 'Tỷ') {
        results.push("Thời trụ Tỷ: Không hợp ý kiến với người thân.");
    }

    const countBiKiep = shens2.filter(s => s === 'Tỷ' || s === 'Kiếp').length;
    if (countBiKiep > 1) {
        results.push("Tỷ Kiếp lớn hơn 2, Nam: cản trở tình cảm, sự nghiệp thăng trầm bất định.");
    }

    return results;
}

module.exports = {
    analyzeBiJian,
    analyzeJieCai,
    analyzeBiKiepGeneral
};
