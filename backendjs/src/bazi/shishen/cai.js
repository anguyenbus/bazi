/**
 * Ten Deities (Thập Thần) analysis - Part 3: Tài Tinh (Wealth)
 */
const { getKhongVong } = require('../shensha');
const ganzhi = require('../ganzhi');

// Simplistic Shensha helpers (Local Implementation)
function getDichMa(dayZhi, yearZhi) {
    // Basic logic: opposite of corner.
    // Ty Dau Suu -> Hoi
    // Hoi Mao Mui -> Ty
    // Than Ty Thin -> Dan
    // Dan Ngo Tuat -> Than
    const map = {
        'Tỵ': 'Hợi', 'Dậu': 'Hợi', 'Sửu': 'Hợi',
        'Hợi': 'Tỵ', 'Mão': 'Tỵ', 'Mùi': 'Tỵ',
        'Thân': 'Dần', 'Tý': 'Dần', 'Thìn': 'Dần',
        'Dần': 'Thân', 'Ngọ': 'Thân', 'Tuất': 'Thân'
    };
    const res = [];
    if (map[dayZhi]) res.push(map[dayZhi]);
    if (map[yearZhi]) res.push(map[yearZhi]);
    return res;
}

function getDaoHoa(dayZhi, yearZhi) {
    // Ty Dau Suu -> Ngo
    // Hoi Mao Mui -> Ty
    // Than Ty Thin -> Dau
    // Dan Ngo Tuat -> Mao
    const map = {
        'Tỵ': 'Ngọ', 'Dậu': 'Ngọ', 'Sửu': 'Ngọ',
        'Hợi': 'Tý', 'Mão': 'Tý', 'Mùi': 'Tý',
        'Thân': 'Dậu', 'Tý': 'Dậu', 'Thìn': 'Dậu',
        'Dần': 'Mão', 'Ngọ': 'Mão', 'Tuất': 'Mão'
    };
    const res = [];
    if (map[dayZhi]) res.push(map[dayZhi]);
    if (map[yearZhi]) res.push(map[yearZhi]);
    return res;
}

function analyzePianCai(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens2 = ctx.shens2 || [];
    const zhis = ctx.zhis;
    const zhus = ctx.zhus;
    const me = ctx.me;

    if (!gan_shens.includes('Thiên Tài')) return results;

    results.push("Thiên Tài hiện rõ ở Thiên Can, bất luận có căn hay không: Tài sản người ngoài thấy được; thực lực tài chính thực tế không bằng một nửa vẻ ngoài. Không có tiền người khác cũng không tin; giúp đỡ người khác thường quá khả năng của mình");
    results.push("Thiên Tài xuất Thiên Can, lại cùng Thiên Nguyệt Đức quý nhân ở cùng một Thiên Can. Ở năm tháng có người cha danh tiếng vang xa, tháng giờ có hồng nhan tri kỷ thông tuệ. Hỷ nịnh hót.");
    results.push("Thiên Tài thấu Thiên Can, Tứ trụ không có Hình Xung, trường thọ. Nữ là con hiếu thảo, chủ yếu đối với năm tháng. Trụ giờ biểu thị sau trung niên có sự nghiệp riêng, giỏi quản lý tài chính.");

    if (ctx.zhi_shens2 && ctx.zhi_shens2.some(s => s === 'Thiên Tài')) {
        results.push("Tài cách cơ sở 80: Tỷ Kiếp dùng Thực Thương thông quan hoặc Quan Sát chế; thân nhược có Tỷ Kiếp vẫn dùng Thực Thương thông quan. Nếu trụ giờ tọa thực Tỷ Kiếp, tuổi già phá sản.");
    }

    results.push("Thiên Tài thấu Thiên Can, giảng cứu nguyên tắc, không câu nệ tiểu tiết. Hỷ nịnh hót, giỏi hưởng lạc. Tài cách cơ sở 80");

    if ((gan_shens.includes('Tỷ') || gan_shens.includes('Kiếp')) && gan_shens[3] === 'Thiên Tài') {
        results.push("Năm tháng Tỷ Kiếp, trụ giờ thấu Thiên Tài. Tổ nghiệp tàn lụi, rồi tay trắng dựng cơ đồ. Có Hình Xung là nghìn vàng tán hết rồi lại đến");
    }

    if (gan_shens.includes('Sát') && zhi_shens.includes('Sát')) {
        results.push("Thiên Tài và Thất Sát đồng vị, Địa chi lại có căn, cha con ngoài hợp trong không hợp. Vì Thiên Tài sinh Sát công thân. Thiên Tài Thất Sát ở ngày giờ, thì có người yêu/bạn gái khó chiều.");
    }

    if (zhi_shens[0] === 'Thiên Tài') {
        results.push("Thiên Tài căn thấu trụ năm, gia thế tốt, và có thể thừa hưởng tổ nghiệp.");
    }

    // Pillar analysis
    gan_shens.forEach((gan, seq) => {
        if (gan !== 'Thiên Tài') return;
        const zhi = zhis[seq];

        // YangRen Kiep Tai Check
        // Python: if 'Kiếp' in zhi_shen3[seq] and zhis[seq] in zhengs
        const isZheng = ['Tý', 'Ngọ', 'Mão', 'Dậu'].includes(zhi);
        if (ctx.zhi_shen3[seq].includes('Kiếp') && isZheng) {
            results.push("Thiên Tài tọa Dương Nhận Kiếp Tài, có thể làm duyên cha mỏng, cũng có thể tuổi thơ nghèo khó. Cũng có thể cha mất trước, cần tham khảo đại vận đầu tiên. Thiên Tài tọa chuyên vị Dương Nhận Kiếp Tài, cha đi tha hương.");
        }

        if (ctx.empties && ctx.empties[2] && ctx.empties[2].includes(zhi)) {
            results.push("Thiên Tài tọa Không Vong, tài quan khó cầu.");
        }
    });

    if (shens2.filter(s => s === 'Thiên Tài').length > 2) {
        results.push("Người nhiều Thiên Tài hào phóng, xem nhẹ được mất. Tiêu tiền thường không hối hận. Khá lạc quan, thậm chí phù hoa. Thói quen sinh hoạt điên đảo. Khả năng thích nghi mạnh. Có tinh thần đồng đội. Được phái nữ yêu thích. Việc nhỏ ít khi thất hứa.");
        results.push("Thích làm việc thiện, có tinh thần đồng đội, nữ mệnh Thiên Tài thì nghe lời cha. Trụ giờ Thiên Tài nữ, giỏi quản lý tài chính, sau trung niên có sự nghiệp.");
    }

    if ((zhi_shens[2] === 'Thiên Tài' && !['Thìn', 'Tuất', 'Sửu', 'Mùi'].includes(zhis[2])) || (zhi_shens[3] === 'Thiên Tài' && !['Thìn', 'Tuất', 'Sửu', 'Mùi'].includes(zhis[3]))) {
        results.push("Nhật giờ Địa chi tọa chuyên vị Thiên Tài. Không thấy Hình Xung, giờ can không phải Tỷ Kiếp, đại vận cũng không có Tỷ Kiếp Hình Xung, tuổi già phát đạt.");
    }

    return results;
}

function analyzeZhengCai(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens2 = ctx.shens2 || [];
    const zhis = ctx.zhis;
    const zhus = ctx.zhus;
    const me = ctx.me;
    const isYang = ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(me);
    const dayZhi = zhis[2];
    const yearZhi = zhis[0];
    const dichMas = getDichMa(dayZhi, yearZhi);
    const daoHoas = getDaoHoa(dayZhi, yearZhi);

    // Overlap check
    if ((['Chính Tài', 'Thiên Tài'].includes(gan_shens[0]) && ['Chính Tài', 'Thiên Tài'].includes(gan_shens[1])) ||
        (['Chính Tài', 'Thiên Tài'].includes(gan_shens[1]) && ctx.zhi_shen3[1].some(s => ['Chính Tài', 'Thiên Tài'].includes(s)))) {
        results.push("Tài hoặc Thiên Tài tháng trùng điệp: Nữ là người phụ nữ của công việc, có năng lực quản lý tài chính. Do năng lực quản lý tài chính của mình mà ảnh hưởng hôn nhân. Nhất tài đắc sở, hồng nhan thất phối. Nam có hai vợ.");
    }

    if (!gan_shens.includes('Chính Tài')) return results;

    if (isYang) {
        results.push("Nam nhật chủ hợp Tài tinh, vợ chồng yêu thương nhau. Nếu tranh hợp hoặc Thiên Can có Kiếp Tài, hai vợ.");
    }

    if (zhi_shens.includes('Chính Tài')) {
        results.push("Tài cách cơ sở 80: Tỷ Kiếp dùng Thực Thương thông quan hoặc Quan Sát chế; thân nhược có Tỷ Kiếp vẫn dùng Thực Thương thông quan.");
    }

    if (gan_shens.includes('Chính Quan')) {
        results.push("Chính Quan Chính Tài song hành thấu ra, (thân cường) xuất thân từ gia đình nhà gia giáo.");
    }

    if (gan_shens.includes('Chính Quan') || gan_shens.includes('Sát')) {
        results.push("Quan hoặc Sát cùng Tài song hành thấu ra, nữ áp chế chồng, Tài sinh Quan Sát, chồng áp lực lớn.");
    }

    if (gan_shens[0] === 'Chính Tài') {
        results.push("Năm Can Chính Tài nếu là hỷ, gia đình giàu có, nhưng không lợi mẹ.");
    }

    if (zhi_shens.includes('Chính Tài')) {
        if (gan_shens.includes('Chính Quan') || gan_shens.includes('Sát')) {
            results.push("Nam Tài vượng thấu Quan Sát, Nữ chán chồng.");
        }
    }

    if (gan_shens.filter(s => s === 'Chính Tài').length > 1) {
        results.push("Thiên Can hai Chính Tài, nguồn tài nhiều, đa phần làm mấy loại kinh doanh, hay chạy theo trào lưu, gió chiều nào che chiều nấy. Đôi khi làm kinh doanh không đúng chuyên môn.");
        // Check rootless
        const hasRoot = ctx.zhi_shens2 && ctx.zhi_shens2.includes('Chính Tài');
        if (!hasRoot) {
            results.push("Chính Tài nhiều mà không căn thì hư mà không thiết thực. Trọng tài không giàu.");
        }
    }

    // Pillar specific
    gan_shens.forEach((gan, seq) => {
        if (gan !== 'Chính Tài') return;
        const zhi = zhis[seq];
        const tsStatus = ganzhi.getVongTrangSinh(ctx.gans[seq], zhi);

        // Dich Ma check
        if (dichMas.includes(zhi) && seq !== 2) {
            results.push("Nữ trụ có Tài + Dịch Mã, động lực quán xuyến việc nhà.");
        }

        // Dao Hoa check
        if (daoHoas.includes(zhi) && seq !== 2) {
            results.push("Nữ trụ có Tài + Đào Hoa, không cát lợi.");
        }

        if (ctx.empties && ctx.empties[2] && ctx.empties[2].includes(zhi)) {
            results.push("Tài tọa Không Vong, không lâu bền.");
        }

        if (tsStatus === 'Tuyệt' || tsStatus === 'Mộ') {
            results.push("Nam Tài tọa Tuyệt hoặc Mộ, không lợi hôn nhân.");
        }
    });

    if (shens2.filter(s => s === 'Chính Tài').length > 2) {
        results.push("Người nhiều Chính Tài, tính cách đoan chính, giữ chữ tín, giản dị vững vàng.");
        if (ctx.zhi_shens2 && ctx.zhi_shens2.includes('Chính Tài') && !ctx.zhi_shens2.includes('Nhật Chủ')) {
            results.push("Chính Tài nhiều mà có căn, Nhật chủ không ở Sinh Vượng Khố, thân nhược sợ vợ.");
        }
    }

    if (zhi_shens[1] === 'Chính Tài') {
        if (ctx.is_female) {
            results.push("Nữ mệnh tháng chi Chính Tài, có quan niệm hôn nhân thực tế.");
        }
        results.push("Nguyệt lệnh Chính Tài, không Xung Hình, có hiền nội trợ, nhưng mẹ và vợ không hòa thuận. Sinh hoạt giản dị, đa phần là người quản lý tài chính.");
    }

    if (zhi_shens[3] === 'Chính Tài' && !['Thìn', 'Tuất', 'Sửu', 'Mùi'].includes(zhis[3])) { // Len(zhi5) == 1 check approx
        results.push("Thời chi Chính Tài, thường có hai con trai.");
    }

    // Check Mau Ty (Wu Zi)
    if (zhus[2][0] === 'Mậu' && zhus[2][1] === 'Tý') {
        results.push("Nhật chi chuyên vị Chính Tài, cưới được vợ cần kiệm. Tức Mậu Tý. Nhật giờ chuyên vị chi Chính Tài, lại thấu Chính Quan, sau trung niên phát đạt, độc lập quý hiển.");
    }
    // Check Nham Ngo / Quy Ty
    if ((zhus[2][0] === 'Nhâm' && zhus[2][1] === 'Ngọ') || (zhus[2][0] === 'Quý' && zhus[2][1] === 'Tỵ')) {
        results.push("Tọa Tài Quan Ấn, chỉ cần Tứ trụ không có Hình Xung, đại cát!");
    }

    return results;
}

function analyzeCaiGeneral(ctx) {
    const results = [];
    const gan_shens = ctx.gan_shens;
    const zhi_shens = ctx.zhi_shens;
    const shens2 = ctx.shens2 || [];

    if (gan_shens[3] === 'Chính Tài' || zhi_shens[3] === 'Chính Tài') {
        results.push("Chưa hẳn chính xác: Trụ giờ có Chính Tài, miệng nhanh tâm thẳng, không thích lằng nhằng, Hình Xung thì phù táo. Dương Nhận cũng không tốt. Ngược lại thì có vợ đẹp con ngoan");
    }

    if (!shens2.includes('Chính Tài') && !shens2.includes('Thiên Tài')) {
        results.push("Tứ trụ không tài, dù gặp vận tài cũng là hư danh hư lợi. Nam kết hôn muộn");
    }

    return results;
}

module.exports = {
    analyzePianCai,
    analyzeZhengCai,
    analyzeCaiGeneral
};
