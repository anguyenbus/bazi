/**
 * Luận giải Quan Hệ Can Chi - 6 Phần (Structure 6 Parts)
 * Uses: Combinatorial Dictionary for >100k variations.
 */
const ganzhi = require('../ganzhi');
const { DICTIONARY, mix, pick } = require('./data/luan_giai_lib');
const { TRU_IMPACTS } = require('./data/quan_he_text');

function generateLuanGiai6Phan(ctx, quanHeResult) {
    if (!quanHeResult) return null;

    const report = {
        phan_1_hien_tuong: generatePart1(quanHeResult),
        phan_2_luc_khi: generatePart2(ctx, quanHeResult),
        phan_3_tinh_chat: generatePart3(quanHeResult),
        phan_4_vi_tri: generatePart4(quanHeResult),
        phan_5_chu_khach: generatePart5(ctx, quanHeResult),
        phan_6_ung_su: generatePart6(ctx, quanHeResult)
    };

    return report;
}

// PHẦN 1 — HIỆN TƯỢNG (WHAT)
function generatePart1(res) {
    const thienCanLines = [];
    const diaChiLines = [];
    let xungCount = 0;
    let hopCount = 0;

    res.thien_can.forEach(item => {
        thienCanLines.push(`• ${item.chi_tiet} (${item.ten})`);
        if (item.loai.includes('Xung')) xungCount++;
        if (item.loai.includes('Hợp')) hopCount++;
    });

    res.dia_chi.forEach(item => {
        diaChiLines.push(`• ${item.chi_tiet} (${item.ten})`);
        if (item.loai.includes('Xung')) xungCount += 2;
        if (item.loai.includes('Hợp')) hopCount += 2;
    });

    const summary = [];
    // Combinatorial Generation
    if (xungCount === 0 && hopCount === 0) {
        summary.push("Cục diện bình hòa, an tĩnh.");
    } else if (xungCount > hopCount) {
        // PREFIX + STATE_XUNG + CONTEXT_XUNG
        summary.push(mix(DICTIONARY.PART_1.PREFIX, DICTIONARY.PART_1.STATE_XUNG, DICTIONARY.PART_1.CONTEXT_XUNG));
    } else if (hopCount > xungCount) {
        // PREFIX + STATE_HOP + CONTEXT_HOP
        summary.push(mix(DICTIONARY.PART_1.PREFIX, DICTIONARY.PART_1.STATE_HOP, DICTIONARY.PART_1.CONTEXT_HOP));
    } else {
        summary.push("Xung Hợp đan xen, cục diện cân bằng động.");
    }

    return {
        title: "HIỆN TƯỢNG",
        thien_can: thienCanLines.length ? thienCanLines : ["Không có tương tác rõ rệt."],
        dia_chi: diaChiLines.length ? diaChiLines : ["Địa chi yên ổn."],
        noi_bat: summary
    };
}

// PHẦN 2 — LỰC KHÍ (HOW STRONG)
function generatePart2(ctx, res) {
    const monthZhi = ctx.zhis[1];
    const monthZhiVN = ganzhi.zhiToVN(monthZhi);
    const monthEle = ganzhi.zhiToElement(monthZhi);

    const isDacLenh = res.manh_yeu?.dac_lenh?.status;
    const seasonComment = `Tháng ${monthZhiVN} (${monthEle} vượng). ${isDacLenh ? "Đắc lệnh, khí thế vượng." : "Thất lệnh, hưu tù."}`;

    // Root Analysis
    const dayMasterRoot = res.can_khi.find(r => r.is_nhat_chu);
    const rootDetails = [];
    if (dayMasterRoot) {
        if (dayMasterRoot.roots.length > 0) {
            dayMasterRoot.roots.forEach(r => {
                let desc = "";
                if (r.cuong_do === 3) desc = pick(DICTIONARY.PART_2.ROOTS_STRONG);
                else desc = pick(DICTIONARY.PART_2.ROOTS_WEAK);
                rootDetails.push(`Có gốc tại ${r.chi} (${r.loai}) - ${desc}`);
            });
        } else {
            rootDetails.push(`Nhật chủ vô căn, ${pick(DICTIONARY.PART_2.ROOTS_WEAK)}`);
        }
    }

    // Clash Impact
    const clashImpacts = [];
    if (dayMasterRoot && dayMasterRoot.roots.length > 0) {
        dayMasterRoot.roots.forEach(r => {
            const clash = res.dia_chi.find(idx => idx.loai.includes('Xung') && idx.chi_tiet.includes(r.chi));
            if (clash) {
                clashImpacts.push(`⚠️ ${pick(DICTIONARY.PART_2.ROOTS_CLASHED)} (Do ${clash.chi_tiet})`);
            }
        });
    }

    return {
        title: "LỰC KHÍ",
        khi_mua: seasonComment,
        goc_re: rootDetails,
        xung_pha: clashImpacts.length ? clashImpacts : ["Gốc rễ an toàn."],
        ket_luan: res.manh_yeu?.ket_luan_so_bo || "Đang xác định..."
    };
}

// PHẦN 3 — TÍNH CHẤT (NATURE)
function generatePart3(res) {
    const meanings = [];

    const getElementsFromDetail = (detail) => {
        const words = detail.split(/\s+|-|xung|hợp/).map(w => w.trim()).filter(w => w);
        const eles = [];
        words.forEach(w => {
            if (['Giáp', 'Ất', 'Dần', 'Mão'].includes(w)) eles.push('Moc');
            if (['Bính', 'Đinh', 'Ngọ', 'Tỵ'].includes(w)) eles.push('Hoa');
            if (['Mậu', 'Kỷ', 'Thìn', 'Tuất', 'Sửu', 'Mùi'].includes(w)) eles.push('Tho');
            if (['Canh', 'Tân', 'Thân', 'Dậu'].includes(w)) eles.push('Kim');
            if (['Nhâm', 'Quý', 'Tý', 'Hợi'].includes(w)) eles.push('Thuy');
        });
        return [...new Set(eles)].sort().join('_');
    };

    const generateMeaning = (key) => {
        if (DICTIONARY.PART_3[key]) {
            // Mix Subject + Action + Result -> Huge variety
            const D = DICTIONARY.PART_3[key];
            return mix(D.SUBJECT, D.ACTION, D.RESULT);
        }
        return mix(DICTIONARY.PART_3.GENERIC_XUNG);
    };

    res.thien_can.forEach(item => {
        let meaning = "";
        if (item.loai.includes('Xung')) {
            const key = getElementsFromDetail(item.chi_tiet) === 'Kim_Moc' ? 'KIM_MOC' :
                (getElementsFromDetail(item.chi_tiet) === 'Thuy_Hoa' ? 'THUY_HOA' : 'GENERIC_XUNG');
            // Simplified matching for now, expanded later
            meaning = generateMeaning(key);
        } else if (item.loai.includes('Hợp')) {
            meaning = "Sự hòa hợp, liên kết hữu tình.";
        }
        if (meaning) meanings.push({ quan_he: item.chi_tiet, y_nghia: meaning });
    });

    res.dia_chi.forEach(item => {
        let meaning = "";
        if (item.loai.includes('Lục Xung')) {
            const keyEle = getElementsFromDetail(item.chi_tiet);
            let key = 'GENERIC_XUNG';
            if (keyEle === 'Kim_Moc') key = 'KIM_MOC';
            if (keyEle === 'Thuy_Hoa') key = 'THUY_HOA';
            meaning = generateMeaning(key);
        }
        else if (item.loai.includes('Tam Hợp')) meaning = "Đoàn kết, lực lượng vượng.";
        else if (item.loai.includes('Tam Hình')) meaning = "Rắc rối pháp lý, nội tâm dằn vặt.";

        if (meaning) meanings.push({ quan_he: item.chi_tiet, y_nghia: meaning });
    });

    return {
        title: "TÍNH CHẤT",
        bang_y_nghia: meanings,
        co_ngu: ["“Xung đa giả, nhân sinh đa động”"]
    };
}

// PHẦN 4 — VỊ TRÍ (LOCATION)
function generatePart4(res) {
    const locations = [];

    // Helper to determine Good/Bad nature
    const isPositive = (loai) => {
        return loai.includes('Hợp') || loai.includes('Hội') || loai.includes('Sinh');
    };

    const analyzePos = (list) => {
        const processedKeys = new Set();

        list.forEach(item => {
            if (!item.tru) return;

            // Deduplication Check
            const uniqueKey = `${item.chi_tiet}|${item.tru}`;
            if (processedKeys.has(uniqueKey)) return;
            processedKeys.add(uniqueKey);

            const parts = item.tru.split('-').map(s => s.trim());
            if (parts.length < 2) return;

            const p1 = parts[0], p2 = parts[1];
            const typeKey = isPositive(item.loai) ? 'GOOD' : 'BAD';
            let listSource = [];

            if ((p1.includes('Năm') && p2.includes('Tháng')) || (p2.includes('Năm') && p1.includes('Tháng')))
                listSource = DICTIONARY.PART_4.EARLY_LIFE[typeKey];
            else if ((p1.includes('Tháng') && p2.includes('Ngày')) || (p2.includes('Tháng') && p1.includes('Ngày')))
                listSource = DICTIONARY.PART_4.MID_LIFE[typeKey];
            else if ((p1.includes('Ngày') && p2.includes('Giờ')) || (p2.includes('Ngày') && p1.includes('Giờ')))
                listSource = DICTIONARY.PART_4.LATE_LIFE[typeKey];

            if (listSource && listSource.length) {
                let specificImpact = "";
                const pillarMap = { 'Năm': 0, 'Tháng': 1, 'Ngày': 2, 'Giờ': 3 };
                const findIdx = (str) => {
                    if (str.includes('Năm')) return 0;
                    if (str.includes('Tháng')) return 1;
                    if (str.includes('Ngày')) return 2;
                    if (str.includes('Giờ')) return 3;
                    return undefined;
                };
                const idx1 = findIdx(p1);
                const idx2 = findIdx(p2);

                if (idx1 !== undefined && TRU_IMPACTS[idx1]) specificImpact += " " + pick(TRU_IMPACTS[idx1]);
                if (idx2 !== undefined && TRU_IMPACTS[idx2]) specificImpact += " " + pick(TRU_IMPACTS[idx2]);

                locations.push({
                    xung_hop: item.chi_tiet,
                    tru: item.tru,
                    ung: (pick(listSource) + specificImpact).trim()
                });
            }
        });
    };
    analyzePos(res.thien_can);
    analyzePos(res.dia_chi);

    return {
        title: "VỊ TRÍ",
        phan_tich: locations,
        ket_luan: "Phân tích dựa trên trục thời gian cuộc đời."
    };
}

// PHẦN 5 — CHỦ THỂ & KHÁCH THỂ (WHO)
function generatePart5(ctx, res) {
    const dayGanVN = ganzhi.ganToVN(ctx.gans[2]);
    const dayGanEle = ganzhi.ganToElement(ctx.gans[2]);
    const interactions = [];
    let isPassive = false;

    res.thien_can.forEach(item => {
        if (item.chi_tiet.includes(dayGanVN)) {
            if (item.loai.includes('Xung')) {
                interactions.push("Bị xung khắc trực tiếp.");
                isPassive = true;
            }
        }
    });

    return {
        title: "CHỦ THỂ & KHÁCH THỂ",
        nhat_chu: `Nhật Chủ ${dayGanVN} (${dayGanEle})`,
        tuong_tac: interactions.length ? interactions : ["Độc lập/Tự chủ."],
        vai_tro: isPassive ? "Bị Động" : "Chủ Động",
        xu_huong: isPassive ? "Chịu áp lực hoàn cảnh." : "Nắm quyền kiểm soát."
    };
}

// PHẦN 6 — ỨNG SỰ (WHAT HAPPENS)
function generatePart6(ctx, res) {
    const hasXung = res.dia_chi.some(x => x.loai.includes('Xung'));
    const predictions = [];

    if (hasXung) {
        // Mix different domains
        predictions.push(pick(DICTIONARY.PART_6.CAREER));
        predictions.push(pick(DICTIONARY.PART_6.LOVE));
        if (Math.random() > 0.5) predictions.push(pick(DICTIONARY.PART_6.HEALTH));
    } else {
        predictions.push("Cuộc sống bình ổn, ít sóng gió lớn.");
    }

    return {
        title: "ỨNG SỰ",
        ung_khi: "Khi gặp vận hạn kích hoạt.",
        du_bao: predictions,
        co_quyet: ["“Can xung chủ sự, Chi xung chủ biến”"]
    };
}

module.exports = { generateLuanGiai6Phan };
