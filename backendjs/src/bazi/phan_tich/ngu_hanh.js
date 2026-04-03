/**
 * Phân tích Cân Bằng Ngũ Hành - PHIÊN BẢN DATABASE CỰC LỚN (Ultimate Logic)
 * Tích hợp KHO DỮ LIỆU chuyên sâu về Nghề nghiệp, Sức khỏe Đông Y, Cách cục và Phong thủy.
 */
const ganzhi = require('../ganzhi');
const { CAREER_DB, HEALTH_DB, STRUCTURE_ANALYSIS, LUCK_ADVICE, DIEU_HAU_DATA, FENGSHUI_DB } = require('./data/ngu_hanh_data');

const RELATIONSHIPS = {
    'Mộc': { sinh: 'Hỏa', khac: 'Thổ', duoc_sinh: 'Thủy', bi_khac: 'Kim' },
    'Hỏa': { sinh: 'Thổ', khac: 'Kim', duoc_sinh: 'Mộc', bi_khac: 'Thủy' },
    'Thổ': { sinh: 'Kim', khac: 'Thủy', duoc_sinh: 'Hỏa', bi_khac: 'Mộc' },
    'Kim': { sinh: 'Thủy', khac: 'Mộc', duoc_sinh: 'Thổ', bi_khac: 'Hỏa' },
    'Thủy': { sinh: 'Mộc', khac: 'Hỏa', duoc_sinh: 'Kim', bi_khac: 'Thổ' }
};

const { determineCach } = require('../geju');

function analyzeNguHanh(ctx) {
    const dayGan = ctx.gans[2];
    const dayEle = ganzhi.ganToElement(dayGan);
    const monthZhi = ctx.zhis[1];
    const monthEle = ganzhi.zhiToElement(monthZhi);

    // 1. TÍNH ĐIỂM CƯỜNG NHƯỢC
    const isMonthSupport = (monthEle === dayEle) || (RELATIONSHIPS[dayEle].duoc_sinh === monthEle);

    let selfScore = 0;   // Ta
    let resourceScore = 0; // Ấn
    let outputScore = 0; // Thực
    let wealthScore = 0; // Tài
    let officerScore = 0; // Quan

    const calcScore = (ele, type, position) => {
        let score = 0;
        if (position === 'month_zhi') score = 40;
        else if (position === 'day_zhi') score = 16;
        else if (position.includes('zhi')) score = 10;
        else score = 8;

        if (ele === dayEle) selfScore += score;
        else if (RELATIONSHIPS[dayEle].duoc_sinh === ele) resourceScore += score;
        else if (RELATIONSHIPS[dayEle].sinh === ele) outputScore += score;
        else if (RELATIONSHIPS[dayEle].khac === ele) wealthScore += score;
        else if (RELATIONSHIPS[dayEle].bi_khac === ele) officerScore += score;
    };

    ctx.gans.forEach((g, i) => { if (i !== 2) calcScore(ganzhi.ganToElement(g), 'gan', `gan_${i}`); });
    ctx.zhis.forEach((z, i) => {
        let pos = (i === 1) ? 'month_zhi' : (i === 2 ? 'day_zhi' : 'other_zhi');
        calcScore(ganzhi.zhiToElement(z), 'zhi', pos);
    });

    const totalSupport = selfScore + resourceScore;
    const totalOppose = outputScore + wealthScore + officerScore;

    // 2. XÁC ĐỊNH CÁCH CỤC (Structure Type)
    let specialType = "Chính Quan Cách";
    let isSpecial = false;

    // Logic Ngoại Cách (Special Structures based on Extreme Scores)
    if (totalSupport >= 82) { // Ngưỡng cực vượng
        isSpecial = true;
        specialType = "Tòng Vượng Cách";
    } else if (totalSupport <= 12 && !isMonthSupport) { // Ngưỡng cực nhược
        isSpecial = true;
        const maxOppose = Math.max(wealthScore, officerScore, outputScore);
        if (maxOppose === wealthScore) specialType = "Tòng Tài Cách";
        else if (maxOppose === officerScore) specialType = "Tòng Sát Cách";
        else specialType = "Tòng Nhi Cách";
    } else {
        // Nội cách: Sử dụng kết quả chính xác từ module geju.js
        const patterns = determineCach(ctx);
        if (patterns && patterns.length > 0) {
            // Map kết quả từ geju (ví dụ 'Thất Sát') sang key của db (ví dụ 'Thất Sát Cách')
            const rawType = patterns[0];
            const typeMap = {
                'Kiến Lộc': 'Kiến Lộc Cách/Nguyệt Kiếp',
                'Nguyệt Nhận': 'Kiến Lộc Cách/Nguyệt Kiếp', // Dương Nhận coi như Vượng
                'Kiếp Tài': 'Kiến Lộc Cách/Nguyệt Kiếp'
            };

            if (typeMap[rawType]) {
                specialType = typeMap[rawType];
            } else {
                // Thêm chữ "Cách" nếu chưa có
                specialType = rawType.includes("Cách") ? rawType : rawType + " Cách";
            }
        } else {
            // Fallback: Nếu geju không tìm ra, dùng logic cũ (Main Gan Chi Tháng)
            const mainGanMonth = ganzhi.getZhiMainGan(monthZhi);
            const god = ganzhi.getThapThan(dayGan, mainGanMonth);
            const godNameMap = {
                'Tỷ': 'Kiến Lộc Cách/Nguyệt Kiếp', 'Kiếp': 'Kiến Lộc Cách/Nguyệt Kiếp',
                'Thực': 'Thực Thần Cách', 'Thương': 'Thương Quan Cách',
                'Tài+': 'Chính Tài Cách', 'Tài-': 'Thiên Tài Cách',
                'Quan': 'Chính Quan Cách', 'Sát': 'Thất Sát Cách',
                'Ấn': 'Chính Ấn Cách', 'Kiêu': 'Thiên Ấn Cách'
            };
            specialType = godNameMap[god] || "Tạp Khí Cách";
        }
    }

    // Thân Vượng / Nhược (cho nội cách)
    let isStrong = false;
    if (!isSpecial) {
        if (isMonthSupport) isStrong = totalSupport >= 35 && totalOppose < 65;
        else isStrong = totalSupport > 50;
    }

    const strengthDesc = isSpecial ?
        (specialType.includes("Vượng") ? "Cực Vượng (Ngoại cách)" : "Cực Nhược (Ngoại cách)") :
        (isStrong ? "Thân Vượng (Nội cách)" : "Thân Nhược (Nội cách)");

    // 3. CHỌN DỤNG THẦN & LUẬN GIẢI
    let dungThan = [];
    let hyThan = [];
    let kyThan = [];
    let analysis = "";

    const resourceEle = RELATIONSHIPS[dayEle].duoc_sinh;
    const outputEle = RELATIONSHIPS[dayEle].sinh;
    const wealthEle = RELATIONSHIPS[dayEle].khac;
    const officerEle = RELATIONSHIPS[dayEle].bi_khac;

    // Load Structure Info (Object)
    let stInfo = STRUCTURE_ANALYSIS[specialType] || { desc: "Đang cập nhật", strengths: "", weaknesses: "", success_key: "" };

    if (isSpecial) {
        if (specialType === "Tòng Vượng Cách") {
            dungThan = [dayEle, resourceEle];
            hyThan = [outputEle];
            kyThan = [wealthEle, officerEle];
        } else if (specialType === "Tòng Tài Cách") {
            dungThan = [wealthEle];
            hyThan = [outputEle];
            kyThan = [resourceEle, dayEle];
        } else if (specialType === "Tòng Sát Cách") {
            dungThan = [officerEle];
            hyThan = [wealthEle];
            kyThan = [resourceEle, dayEle, outputEle];
        } else { // Tòng Nhi
            dungThan = [outputEle];
            hyThan = [dayEle, wealthEle];
            kyThan = [resourceEle, officerEle];
        }

        analysis = `**${specialType}**: ${stInfo.desc}<br/>` +
            `💪 **Điểm mạnh**: ${stInfo.strengths}<br/>` +
            `🔻 **Điểm yếu**: ${stInfo.weaknesses}<br/>` +
            `🔑 **Chìa khóa thành công**: ${stInfo.success_key}<br/>`;

    } else {
        // NỘI CÁCH
        analysis += `Cách cục: **${specialType}**.<br/>${stInfo.desc}<br/>` +
            `💪 **Điểm mạnh**: ${stInfo.strengths}<br/>` +
            `🔻 **Điểm yếu**: ${stInfo.weaknesses}<br/>` +
            `🔑 **Chìa khóa thành công**: ${stInfo.success_key}<br/>-------------------<br/>`;

        if (isStrong) {
            analysis += `Nhật chủ **${dayEle}** vượng. Nguyên tắc: Ức chế hoặc Tiết khí. `;
            if (resourceScore > selfScore) {
                dungThan = [wealthEle];
                hyThan = [outputEle];
                kyThan = [resourceEle, dayEle];
                analysis += "Do Ấn tinh quá vượng sinh thân, Dụng thần tối ưu là **TÀI TINH** (để phá Ấn).";
            } else {
                if (officerScore > 10) {
                    dungThan = [officerEle];
                    hyThan = [wealthEle];
                    kyThan = [resourceEle, dayEle, outputEle];
                    analysis += "Do Tỷ Kiếp vượng, Dụng thần là **QUAN SÁT** (để khắc chế).";
                } else {
                    dungThan = [outputEle];
                    hyThan = [wealthEle];
                    kyThan = [resourceEle, officerEle];
                    analysis += "Thân vượng mà Quan Sát yếu, chuyển sang dùng **THỰC THƯƠNG** để tiết tú (thông quan).";
                }
            }
        } else {
            // Thân Nhược
            analysis += `Nhật chủ **${dayEle}** nhược. Nguyên tắc: Phù trợ (Sinh/Trợ). `;
            if (officerScore >= wealthScore) {
                dungThan = [resourceEle];
                hyThan = [dayEle];
                kyThan = [wealthEle, outputEle];
                analysis += "Bị Quan Sát khắc chế mạnh, cần **ẤN TINH** để hóa Sát sinh Thân (Dụng Ấn).";
            } else if (wealthScore > outputScore) {
                dungThan = [dayEle];
                hyThan = [resourceEle];
                kyThan = [outputEle, officerEle];
                analysis += "Bị Tài tinh làm hao tổn, cần **TỶ KIẾP** để gánh vác Tài (Dụng Tỷ).";
            } else {
                dungThan = [resourceEle];
                hyThan = [dayEle];
                kyThan = [wealthEle];
                analysis += "Bị Thực Thương tiết khí nhiều, cần **ẤN TINH** để chế Thực dưỡng Mệnh.";
            }
        }
    }

    // 4. ĐIỀU HẦU
    let dieuHau = null;
    let dieuHauMsg = "";

    // Check mùa
    const mVn = ganzhi.zhiToVN(monthZhi);
    const winterZhis = ['Hợi', 'Tý', 'Sửu'];
    const summerZhis = ['Tỵ', 'Ngọ', 'Mùi'];

    if (winterZhis.includes(mVn)) dieuHau = 'Hỏa';
    else if (summerZhis.includes(mVn)) dieuHau = 'Thủy';

    if (dieuHau && DIEU_HAU_DATA[dieuHau]) {
        const dhInfo = DIEU_HAU_DATA[dieuHau];
        dieuHauMsg = dhInfo.msg;

        if (!dungThan.includes(dieuHau) && !hyThan.includes(dieuHau)) {
            if (kyThan.includes(dieuHau) && isSpecial) {
                dieuHauMsg += ` Tuy nhiên do cách cục đặc biệt, hành ${dieuHau} là Kỵ thần nên chỉ dùng bổ trợ nhỏ.`;
            } else {
                hyThan.push(dieuHau);
                analysis += ` Kết hợp thêm **${dieuHau}** ${dhInfo.icon} làm Điều Hầu.`;
            }
        }
    }

    // Dedupe
    dungThan = [...new Set(dungThan)];
    hyThan = [...new Set(hyThan)];
    kyThan = [...new Set(kyThan)];
    if (!dungThan.length) dungThan = ["Đang xét"]; // Safety

    // 5. GENERATE RICH CONTENT
    const primaryDung = dungThan[0];
    const primaryKy = kyThan[0];

    // Career
    const careerNode = CAREER_DB[primaryDung] || {};
    // Format job list: Select ~6 representative jobs across different categories
    const allJobs = careerNode.jobs || [];
    let selectedJobs = [];
    if (allJobs.length > 0) {
        // Sample evenly distributed jobs to ensure variety
        const step = Math.max(1, Math.floor(allJobs.length / 6));
        for (let i = 0; i < allJobs.length && selectedJobs.length < 6; i += step) {
            selectedJobs.push(allJobs[i]);
        }
    }
    const jobList = selectedJobs.join(', ');
    const jobHtml = `
        **${careerNode.title || primaryDung}**: ${careerNode.advice || ""}<br/><br/>
        👉 **GỢI Ý NGHỀ CHI TIẾT**:<br/>${jobList},...
    `;

    // Health
    const healthNode = HEALTH_DB[primaryKy] || {};
    const healthHtml = `
        **Nguy cơ từ hành ${primaryKy} vượng (Kỵ thần)**:<br/>
        ⚠️ **Bộ phận**: ${healthNode.organs || "Đang cập nhật"}<br/>
        🤒 **Triệu chứng**: ${healthNode.symptoms || "Đang cập nhật"}<br/>
        🧠 **Tâm lý/Cảm xúc**: ${healthNode.psychology || "Đang cập nhật"}<br/>
        🛡️ **Phòng ngừa**: ${healthNode.lifestyle || "Cân bằng lối sống"}<br/>
        🥗 **Dinh dưỡng**: ${healthNode.nutrition || "Ăn uống điều độ"}
    `;

    // Feng Shui
    // Suggest remedies for ALL Dung Than elements, prioritize primary
    const fsNode = FENGSHUI_DB[primaryDung] || {};
    const fengShuiHtml = `
        **Màu sắc**: ${fsNode.color || "..."}<br/>
        **Hình khối**: ${fsNode.shape || "..."}<br/>
        **Chất liệu**: ${fsNode.material || "..."}<br/>
        **Con số**: ${fsNode.number || "..."}<br/>
        **Hướng tốt**: ${fsNode.direction || "..."}
    `;

    return {
        nhan_dinh: {
            nhat_chu: dayGan,
            ngu_hanh: dayEle,
            cuong_do: strengthDesc,
            diem_tuong_doi: {
                ho_tro: totalSupport,
                khac_che: totalOppose
            },
            nguyet_lenh: monthEle,
            dac_lenh: isMonthSupport ? "Đắc lệnh" : "Thất lệnh"
        },
        dung_than: {
            ngu_hanh: dungThan,
            y_nghia: `Dụng thần là yếu tố cân bằng mệnh cục.`,
            nghe_nghiep: jobHtml
        },
        hy_than: {
            ngu_hanh: hyThan,
            y_nghia: "Sinh trợ cho Dụng thần."
        },
        ky_than: {
            ngu_hanh: kyThan,
            y_nghia: "Gây mất cân bằng mệnh cục.",
            suc_khoe: healthHtml
        },
        dieu_hau: {
            can_thiet: dieuHau,
            luan_giai: dieuHauMsg
        },
        phong_thuy: {
            dung_than_chinh: primaryDung,
            loi_khuyen: fengShuiHtml
        },
        luan_giai: analysis,
        luan_giai_tong_quat: analysis,
        cat_hung: {
            gap_van_tot: "Gặp vận **" + [...dungThan, ...hyThan].join('/') + "**: " + LUCK_ADVICE['good'][0],
            gap_van_xau: "Gặp vận **" + kyThan.join('/') + "**: " + LUCK_ADVICE['bad'][0]
        }
    };
}

module.exports = { analyzeNguHanh };
