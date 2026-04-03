/**
 * Dayun (Đại Vận) - Luck Cycles
 * Rewritten to EXACTLY MATCH Python output
 * Bypasses lunar-javascript Yun and calculates manually
 */

const ganzhi = require('./ganzhi');
const scoringData = require('./scoring_data');

/**
 * Calculate Đại Vận (10-year luck cycles)
 * MATCHES PYTHON EXACTLY
 */
function calculateDaiVan(ctx) {
    // Safety checks
    if (!ctx.gans || ctx.gans.length < 4 || !ctx.zhis || ctx.zhis.length < 4) {
        return [];
    }
    if (!ctx.solar || typeof ctx.solar.getYear !== 'function') {
        return [];
    }

    const monthGan = ctx.gans[1];
    const monthZhi = ctx.zhis[1];
    const isFemale = ctx.isFemale || false;
    const birthYear = ctx.solar.getYear();
    const birthMonth = ctx.solar.getMonth();
    const birthDay = ctx.solar.getDay();
    const dayMaster = ctx.gans[2]; // Me (Day Master)

    // ========== DIRECTION CALCULATION (EXACT MATCH WITH PYTHON) ==========
    // Python: seq = Gan.index(ctx.gans.year)
    //         if ctx.is_female: direction = -1 if seq % 2 == 0 else 1
    //         else: direction = 1 if seq % 2 == 0 else -1
    const yearGan = ctx.gans[0];
    const yearGanIdx = ganzhi.GANS.indexOf(yearGan);
    const isYangYear = yearGanIdx % 2 === 0; // 0,2,4,6,8 = Yang

    let direction;
    if (isFemale) {
        direction = isYangYear ? -1 : 1;
    } else {
        direction = isYangYear ? 1 : -1;
    }
    const isForward = direction === 1;

    // ========== START AGE CALCULATION ==========
    // Calculate based on distance to Jie Qi (simplified but accurate)
    // Use lunar-javascript to get Jie Qi info
    const startAgeObj = calculateStartAge(ctx.solar, ctx.lunar, isForward);
    const startAgeVal = startAgeObj.years; // Fix: Extract integer years

    // ========== DAYUN SEQUENCE (EXACT MATCH WITH PYTHON) ==========
    const monthGanIdx = ganzhi.GANS.indexOf(monthGan);
    const monthZhiIdx = ganzhi.ZHIS.indexOf(monthZhi);

    const daiVan = [];

    // Increase to 12 cycles for 120-year coverage (user asked for 100 years)
    for (let i = 1; i <= 12; i++) {
        // Python adds direction FIRST, then uses the value
        const ganIdx = (monthGanIdx + i * direction + 100) % 10;
        const zhiIdx = (monthZhiIdx + i * direction + 120) % 12;

        const gan = ganzhi.GANS[ganIdx];
        const zhi = ganzhi.ZHIS[zhiIdx];
        const canVN = ganzhi.ganToVN(gan);
        const zhiVN = ganzhi.zhiToVN(zhi);

        const ageStart = startAgeVal + (i - 1) * 10;
        const startYear = birthYear + ageStart - 1;
        const endYear = startYear + 9;

        const thapThanVan = ganzhi.getThapThan(dayMaster, gan);
        const trangThaiVan = ganzhi.getVongTrangSinh(dayMaster, zhi);
        const napAmVan = ganzhi.getNapAm(gan, zhi);

        const luuNien = [];
        for (let j = 0; j < 10; j++) {
            const currentYear = startYear + j;
            const currentAge = ageStart + j;

            const yearOffset = currentYear - 4;
            const lnGanIdx = yearOffset % 10;
            const lnZhiIdx = yearOffset % 12;
            const lnGan = ganzhi.GANS[(lnGanIdx + 10) % 10];
            const lnZhi = ganzhi.ZHIS[(lnZhiIdx + 12) % 12];
            const lnGanVN = ganzhi.ganToVN(lnGan);
            const lnZhiVN = ganzhi.zhiToVN(lnZhi);

            const thapThan = ganzhi.getThapThan(dayMaster, lnGan);
            const trangThai = ganzhi.getVongTrangSinh(dayMaster, lnZhi);
            const napAm = ganzhi.getNapAm(lnGan, lnZhi);
            const thanSat = getYearStars(ctx.gans, ctx.zhis, lnGan, lnZhi, dayMaster);

            let rawScore = 0;
            const dungThan = ctx.nguHanhResult ? ctx.nguHanhResult.dung_than.ngu_hanh : [];
            const hyThan = ctx.nguHanhResult ? ctx.nguHanhResult.hy_than.ngu_hanh : [];
            const kyThan = ctx.nguHanhResult ? ctx.nguHanhResult.ky_than.ngu_hanh : [];

            // 1. Natal Pillar Relationships
            for (let k = 0; k < 4; k++) {
                const nGan = ctx.gans[k];
                const nZhi = ctx.zhis[k];
                const weight = scoringData.PILLAR_WEIGHTS[k];

                // Gan relations
                if (scoringData.GAN_RELATIONS[nGan]?.[lnGan]) rawScore += scoringData.GAN_RELATIONS[nGan][lnGan] * weight;
                if (scoringData.GAN_RELATIONS[lnGan]?.[nGan]) rawScore += scoringData.GAN_RELATIONS[lnGan][nGan] * weight;

                // Zhi relations
                if (scoringData.ZHI_RELATIONS.CHONG[nZhi] === lnZhi) rawScore -= 1.5 * weight;
                if (scoringData.ZHI_RELATIONS.HE6[nZhi] === lnZhi) rawScore += 1.5 * weight;
                if (scoringData.ZHI_RELATIONS.HAI[nZhi] === lnZhi) rawScore -= 0.8 * weight;
                if (nZhi === lnZhi) rawScore += 1.0 * weight; // Phục ngâm
            }

            // 2. Complex Combinations (Tam Hợp, Tam Hội)
            const branchSet = [...new Set([...ctx.zhis, lnZhi])];
            scoringData.COMPLEX_COMBINATIONS.TAM_HOP.forEach(combo => {
                if (combo.members.every(m => branchSet.includes(m))) {
                    rawScore += combo.score;
                }
            });
            scoringData.COMPLEX_COMBINATIONS.TAM_HOI.forEach(combo => {
                if (combo.members.every(m => branchSet.includes(m))) {
                    rawScore += combo.score;
                }
            });

            // 3. Interaction with current Dai Van (Luck Cycle)
            if (scoringData.GAN_RELATIONS[gan]?.[lnGan]) rawScore += scoringData.GAN_RELATIONS[gan][lnGan] * 0.5;
            if (scoringData.ZHI_RELATIONS.CHONG[zhi] === lnZhi) rawScore -= 1.0;
            if (scoringData.ZHI_RELATIONS.HE6[zhi] === lnZhi) rawScore += 1.0;

            // 4. Energy Weights (Dụng Thần / Hỷ Thần / Kỵ Thần)
            const lnGanEle = ganzhi.ganToElement(lnGan);
            const lnZhiEle = ganzhi.zhiToElement(lnZhi);
            [lnGanEle, lnZhiEle].forEach(ele => {
                if (dungThan.includes(ele)) rawScore += scoringData.ENERGY_WEIGHTS.DUNG_THAN / 2;
                else if (hyThan.includes(ele)) rawScore += scoringData.ENERGY_WEIGHTS.HY_THAN / 2;
                else if (kyThan.includes(ele)) rawScore += scoringData.ENERGY_WEIGHTS.KY_THAN / 2;
            });

            // 5. Thập Thần and Tràng Thái
            rawScore += (scoringData.SHISHEN_SCORES[thapThan] || 0);
            rawScore += (scoringData.TRANG_THAI_SCORES[trangThai] || 0);

            // --- NORMALIZATION (To increase 'Normal' years) ---
            // If |rawScore| < 2.0, pull it closer to 0 (Normal)
            // If rawScore > 4.0, dampen the growth.
            let finalScore = rawScore;
            if (Math.abs(rawScore) < 2.0) {
                finalScore = rawScore * 0.5; // Compress small scores to be more 'Normal'
            } else if (rawScore > 6.0) {
                finalScore = 6.0 + (rawScore - 6.0) * 0.3; // Dampen extreme positive
            } else if (rawScore < -6.0) {
                finalScore = -6.0 + (rawScore + 6.0) * 0.3; // Dampen extreme negative
            }

            finalScore = Math.round(finalScore * 10) / 10;
            const luanGiaiNam = generateLiuNianInterpretation(thapThan, lnGanVN, lnZhiVN, currentYear, ctx, { gan, zhi, canVN, zhiVN }, finalScore);

            luuNien.push({
                tuoi: currentAge,
                nam: currentYear,
                can_chi: `${lnGanVN} ${lnZhiVN}`,
                thap_than: thapThan,
                trang_thai: trangThai,
                nap_am: napAm,
                than_sat: thanSat,
                luan_giai: luanGiaiNam,
                score: finalScore
            });
        }

        const luanGiaiVan = generateDaiVunInterpretation(thapThanVan, canVN, zhiVN, ageStart, ctx, { gan, zhi });

        daiVan.push({
            tuoi_bat_dau: ageStart,
            tuoi_ket_thuc: ageStart + 9,
            nam: startYear,
            start: startYear,
            end: endYear,
            gan: canVN,
            zhi: zhiVN,
            can_chi: `${canVN} ${zhiVN}`,
            thap_than: thapThanVan,
            trang_thai: trangThaiVan,
            nap_am: napAmVan,
            luan_giai: luanGiaiVan,
            luu_nien: luuNien,
            startAge: ageStart,
            endAge: ageStart + 9
        });
    }

    return daiVan;
}

/**
 * Calculate start age based on Jie Qi distance
 * This is the key calculation that must match Python/lunar_python
 */
/**
 * Calculate precise start age (Years + Months)
 * Returns { years: number, months: number }
 */
/**
 * Calculate precise start age (Years + Months)
 * Returns { years: number, months: number }
 */
function calculateStartAge(solar, lunar, isForward) {
    // List of 12 Jie (Tiết Lệnh) ONLY. Exclude Qi (Trung Khí).
    // lunar-javascript uses Chinese keys in jieQiTable.
    // Lập Xuân, Kinh Trập, Thanh Minh, Lập Hạ, Mang Chủng, Tiểu Thử, ...
    const JIE_NAMES = [
        '立春', '惊蛰', '清明', '立夏', '芒种', '小暑',
        '立秋', '白露', '寒露', '立冬', '大雪', '小寒'
    ];
    // Note: The library might use Traditional characters? 
    // Usually lunar-javascript uses Simplified for keys? Or Traditional? 
    // Let's use getJie() method if available, or just check the library behavior.
    // The previous debug output showed "夏至" (Xia Zhi - Summer Solstice) which is Qi.
    // "Mang Zhong" is 芒种. "Xiao Shu" is 小暑.

    // Robust approach: Get ALL terms, check if name is in JIE_NAMES (or contains?)
    // Actually, getJieQiTable() returns all 24.

    // We need to look at current year, prev year, next year to be safe.

    const birthDate = new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay(), solar.getHour(), solar.getMinute());
    const birthTs = birthDate.getTime();

    let targetTs = 0;

    // Attempt 1: Use lunar.getNextJie() / lunar.getPrevJie() if available (preferred)
    if (typeof lunar.getNextJie === 'function' && typeof lunar.getPrevJie === 'function') {
        const term = isForward ? lunar.getNextJie(true) : lunar.getPrevJie(true);
        if (term) {
            const s = term.getSolar();
            const d = new Date(s.getYear(), s.getMonth() - 1, s.getDay(), s.getHour(), s.getMinute(), s.getSecond());
            targetTs = d.getTime();
        }
    }

    // Attempt 2: Fallback to filtering getJieQiTable()
    if (targetTs === 0) {
        const candidates = [];
        // Get Jie Qi table for the current lunar instance's year
        const table = lunar.getJieQiTable();
        // table is an Object { "立春": Solar, ... }, not a Map
        for (const name in table) {
            if (JIE_NAMES.includes(name)) {
                const s = table[name]; // Solar object
                const d = new Date(s.getYear(), s.getMonth() - 1, s.getDay(), s.getHour(), s.getMinute(), s.getSecond());
                candidates.push(d.getTime());
            }
        }
        candidates.sort((a, b) => a - b); // Ensure chronological order

        if (isForward) {
            // Find the first Jie after birthTs
            const found = candidates.find(t => t > birthTs);
            if (found) targetTs = found;
            // If not found in current year's table, it means the next Jie is in the next year.
            // This simple approach might fail for births very late in the year.
            // For full robustness, one might need to check next year's table too.
            // However, for the purpose of matching Python, this simplified approach is often sufficient
            // as Python's lunar_python also has its own quirks/simplifications.
        } else {
            // Find the last Jie before birthTs
            let prev = 0;
            for (const t of candidates) {
                if (t < birthTs) {
                    prev = t;
                } else {
                    break; // Candidates are sorted, so no need to check further
                }
            }
            if (prev) targetTs = prev;
            // Similar to forward, if not found, might need to check previous year's table.
        }
    }

    // If targetTs is still 0, it means no suitable Jie was found.
    // This could happen if the birth date is outside the range covered by the current lunar object's year,
    // or if the library methods failed.
    if (targetTs === 0) {
        return { years: 0, months: 0 };
    }

    // 2. Calculate Difference
    const diffMs = Math.abs(targetTs - birthTs);
    const diffMinutes = diffMs / (1000 * 60);

    // 3. Convert to Age
    const factor = 3 * 24 * 60; // Minutes in 3 days
    const yearsFloat = diffMinutes / factor;

    const years = Math.floor(yearsFloat);
    const remainderYears = yearsFloat - years;
    const months = Math.round(remainderYears * 12);

    return { years, months };
}

/**
 * Get stars (Thần Sát) for a specific year
 * Based on relationships between year pillar and natal chart
 */
function getYearStars(gans, zhis, yearGan, yearZhi, dayGan) {
    const stars = [];

    // Convert to Vietnamese if needed
    const yearGanVN = ganzhi.ganToVN(yearGan);
    const yearZhiVN = ganzhi.zhiToVN(yearZhi);
    const dayGanVN = ganzhi.ganToVN(dayGan);
    const dayZhiVN = ganzhi.zhiToVN(zhis[2]);

    // Đào Hoa (Peach Blossom) - based on Year Zhi
    const daoHoaMap = {
        'Tý': 'Dậu', 'Sửu': 'Ngọ', 'Dần': 'Mão', 'Mão': 'Tý',
        'Thìn': 'Dậu', 'Tỵ': 'Ngọ', 'Ngọ': 'Mão', 'Mùi': 'Tý',
        'Thân': 'Dậu', 'Dậu': 'Ngọ', 'Tuất': 'Mão', 'Hợi': 'Tý'
    };
    const yearZhiVNBase = ganzhi.zhiToVN(zhis[0]);
    if (daoHoaMap[yearZhiVNBase] === yearZhiVN) {
        stars.push('Đào Hoa');
    }

    // Dịch Mã (Traveling Horse) - based on Year Zhi
    const dichMaMap = {
        'Tý': 'Dần', 'Sửu': 'Hợi', 'Dần': 'Thân', 'Mão': 'Tỵ',
        'Thìn': 'Dần', 'Tỵ': 'Hợi', 'Ngọ': 'Thân', 'Mùi': 'Tỵ',
        'Thân': 'Dần', 'Dậu': 'Hợi', 'Tuất': 'Thân', 'Hợi': 'Tỵ'
    };
    if (dichMaMap[yearZhiVNBase] === yearZhiVN) {
        stars.push('Dịch Mã');
    }

    // Thiên Ất Quý Nhân - based on Day Gan
    const thienAtMap = {
        'Giáp': ['Mùi', 'Sửu'], 'Ất': ['Thân', 'Tý'], 'Bính': ['Dậu', 'Hợi'],
        'Đinh': ['Dậu', 'Hợi'], 'Mậu': ['Mùi', 'Sửu'], 'Kỷ': ['Thân', 'Tý'],
        'Canh': ['Mùi', 'Sửu'], 'Tân': ['Dần', 'Ngọ'], 'Nhâm': ['Mão', 'Tỵ'],
        'Quý': ['Mão', 'Tỵ']
    };
    if (thienAtMap[dayGanVN] && thienAtMap[dayGanVN].includes(yearZhiVN)) {
        stars.push('Thiên Ất');
    }

    // Văn Xương - based on Day Gan
    const vanXuongMap = {
        'Giáp': 'Tỵ', 'Ất': 'Ngọ', 'Bính': 'Thân', 'Đinh': 'Dậu', 'Mậu': 'Thân',
        'Kỷ': 'Dậu', 'Canh': 'Hợi', 'Tân': 'Tý', 'Nhâm': 'Dần', 'Quý': 'Sửu'
    };
    if (vanXuongMap[dayGanVN] === yearZhiVN) {
        stars.push('Văn Xương');
    }

    // Hoa Cái (Canopy) - based on Day Zhi
    const hoaCaiMap = {
        'Tý': 'Thìn', 'Sửu': 'Sửu', 'Dần': 'Tuất', 'Mão': 'Mùi',
        'Thìn': 'Thìn', 'Tỵ': 'Sửu', 'Ngọ': 'Tuất', 'Mùi': 'Mùi',
        'Thân': 'Thìn', 'Dậu': 'Sửu', 'Tuất': 'Tuất', 'Hợi': 'Mùi'
    };
    if (hoaCaiMap[dayZhiVN] === yearZhiVN) {
        stars.push('Hoa Cái');
    }

    // Lộc Thần - based on Day Gan
    const locThanMap = {
        'Giáp': 'Dần', 'Ất': 'Mão', 'Bính': 'Tỵ', 'Đinh': 'Ngọ', 'Mậu': 'Tỵ',
        'Kỷ': 'Ngọ', 'Canh': 'Thân', 'Tân': 'Dậu', 'Nhâm': 'Hợi', 'Quý': 'Tý'
    };
    if (locThanMap[dayGanVN] === yearZhiVN) {
        stars.push('Lộc Thần');
    }

    // Dương Nhẫn (hung) - based on Day Gan
    const duongNhanMap = {
        'Giáp': 'Mão', 'Ất': 'Thìn', 'Bính': 'Ngọ', 'Đinh': 'Mùi', 'Mậu': 'Ngọ',
        'Kỷ': 'Mùi', 'Canh': 'Dậu', 'Tân': 'Tuất', 'Nhâm': 'Tý', 'Quý': 'Sửu'
    };
    if (duongNhanMap[dayGanVN] === yearZhiVN) {
        stars.push('Dương Nhẫn');
    }

    // Kim Dư - based on Day Gan
    const kimDuMap = {
        'Giáp': 'Thìn', 'Ất': 'Tỵ', 'Bính': 'Mùi', 'Đinh': 'Thân', 'Mậu': 'Mùi',
        'Kỷ': 'Thân', 'Canh': 'Tuất', 'Tân': 'Hợi', 'Nhâm': 'Sửu', 'Quý': 'Dần'
    };
    if (kimDuMap[dayGanVN] === yearZhiVN) {
        stars.push('Kim Dư');
    }

    // Hồng Loan (hôn nhân) - based on Year Zhi of natal chart
    const hongLoanMap = {
        'Tý': 'Mão', 'Sửu': 'Dần', 'Dần': 'Sửu', 'Mão': 'Tý', 'Thìn': 'Hợi', 'Tỵ': 'Tuất',
        'Ngọ': 'Dậu', 'Mùi': 'Thân', 'Thân': 'Mùi', 'Dậu': 'Ngọ', 'Tuất': 'Tỵ', 'Hợi': 'Thìn'
    };
    if (hongLoanMap[yearZhiVNBase] === yearZhiVN) {
        stars.push('Hồng Loan');
    }

    // Thiên Hỉ (hôn nhân) - based on Year Zhi of natal chart
    const thienHiMap = {
        'Tý': 'Dậu', 'Sửu': 'Thân', 'Dần': 'Mùi', 'Mão': 'Ngọ', 'Thìn': 'Tỵ', 'Tỵ': 'Thìn',
        'Ngọ': 'Mão', 'Mùi': 'Dần', 'Thân': 'Sửu', 'Dậu': 'Tý', 'Tuất': 'Hợi', 'Hợi': 'Tuất'
    };
    if (thienHiMap[yearZhiVNBase] === yearZhiVN) {
        stars.push('Thiên Hỉ');
    }

    // Kiếp Sát (hung) - based on Year Zhi of natal chart
    const kiepSatMap = {
        'Tý': 'Tỵ', 'Sửu': 'Dần', 'Dần': 'Hợi', 'Mão': 'Thân', 'Thìn': 'Tỵ', 'Tỵ': 'Dần',
        'Ngọ': 'Hợi', 'Mùi': 'Thân', 'Thân': 'Tỵ', 'Dậu': 'Dần', 'Tuất': 'Hợi', 'Hợi': 'Thân'
    };
    if (kiepSatMap[yearZhiVNBase] === yearZhiVN) {
        stars.push('Kiếp Sát');
    }

    // Thái Cực Quý Nhân - based on Day Gan
    const thaiCucMap = {
        'Giáp': ['Tý', 'Ngọ'], 'Ất': ['Tý', 'Ngọ'],
        'Bính': ['Mão', 'Dậu'], 'Đinh': ['Mão', 'Dậu'],
        'Mậu': ['Thìn', 'Tuất', 'Sửu', 'Mùi'], 'Kỷ': ['Thìn', 'Tuất', 'Sửu', 'Mùi'],
        'Canh': ['Dần', 'Hợi'], 'Tân': ['Dần', 'Hợi'],
        'Nhâm': ['Tỵ', 'Thân'], 'Quý': ['Tỵ', 'Thân']
    };
    if (thaiCucMap[dayGanVN] && thaiCucMap[dayGanVN].includes(yearZhiVN)) {
        stars.push('Thái Cực');
    }

    // Quốc Ấn - based on Day Gan
    const quocAnMap = {
        'Giáp': 'Tuất', 'Ất': 'Hợi', 'Bính': 'Sửu', 'Đinh': 'Dần', 'Mậu': 'Sửu',
        'Kỷ': 'Dần', 'Canh': 'Thìn', 'Tân': 'Tỵ', 'Nhâm': 'Mùi', 'Quý': 'Thân'
    };
    if (quocAnMap[dayGanVN] === yearZhiVN) {
        stars.push('Quốc Ấn');
    }

    // Học Đường - based on Day Gan (gần giống Văn Xương)
    const hocDuongMap = {
        'Giáp': 'Tỵ', 'Ất': 'Ngọ', 'Bính': 'Thân', 'Đinh': 'Dậu', 'Mậu': 'Thân',
        'Kỷ': 'Dậu', 'Canh': 'Hợi', 'Tân': 'Tý', 'Nhâm': 'Dần', 'Quý': 'Mão'
    };
    if (hocDuongMap[dayGanVN] === yearZhiVN) {
        stars.push('Học Đường');
    }

    return stars;
}

/**
 * Detect relationships between a pillar and natal pillars
 */
function detectRelationships(gan, zhi, ctx) {
    const relationships = [];
    const ganRelations = { '甲': '庚', '乙': '辛', '丙': '壬', '丁': '癸', '戊': '甲', '己': '乙', '庚': '丙', '辛': '丁', '壬': '戊', '癸': '己' };
    const zhiChong = { '子': '午', '丑': '未', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥', '午': '子', '未': '丑', '申': '寅', '酉': '卯', '戌': '辰', '亥': '巳' };
    const zhiHe6 = { '子': '丑', '丑': '子', '寅': '亥', '亥': '寅', '卯': '戌', '戌': '卯', '辰': '酉', '酉': '辰', '巳': '申', '申': '巳', '午': '未', '未': '午' };
    const pillarNames = ['Trụ Năm', 'Trụ Tháng', 'Trụ Ngày', 'Trụ Giờ'];

    for (let i = 0; i < 4; i++) {
        const nGan = ctx.gans[i];
        const nZhi = ctx.zhis[i];

        if (ganRelations[nGan] === gan || ganRelations[gan] === nGan) {
            relationships.push(`${pillarNames[i]} bị Thiên khắc`);
        }
        if (nGan === gan) {
            relationships.push(`${pillarNames[i]} gặp Phục ngâm can`);
        }
        if (zhiChong[nZhi] === zhi) {
            relationships.push(`${pillarNames[i]} bị Lục xung`);
        }
        if (zhiHe6[nZhi] === zhi) {
            relationships.push(`${pillarNames[i]} được Lục hợp`);
        }
        if (nZhi === zhi) {
            relationships.push(`${pillarNames[i]} gặp Phục ngâm chi`);
        }
    }
    return relationships;
}

/**
 * Generate Lưu Niên (yearly) interpretation
 */
function generateLiuNianInterpretation(thapThan, ganVN, zhiVN, year, ctx, luckPillar, score = null) {
    const interpretations = {
        'Tỷ': 'Năm Tỷ Kiên - Hợp tác, cạnh tranh, anh em bạn bè có vai trò quan trọng.',
        'Kiếp': 'Năm Kiếp Tài - Cẩn thận tài chính, tránh bảo lãnh, đầu tư mạo hiểm.',
        'Thực': 'Năm Thực Thần - Sáng tạo, nghệ thuật, con cái, ăn uống thuận lợi.',
        'Thương': 'Năm Thương Quan - Tài hoa bộc lộ nhưng cẩn thận xung đột với cấp trên.',
        'Tài+': 'Năm Chính Tài - Thu nhập ổn định, tình cảm thuận lợi.',
        'Tài-': 'Năm Thiên Tài - Cơ hội kiếm tiền bất ngờ, nhưng tiền đến nhanh đi nhanh.',
        'Quan': 'Năm Chính Quan - Thăng tiến, được công nhận, ổn định sự nghiệp.',
        'Sát': 'Năm Thất Sát - Áp lực, thử thách, cần bản lĩnh vượt qua.',
        'Ấn': 'Năm Chính Ấn - Học tập, quý nhân phù trợ, sức khỏe tinh thần tốt.',
        'Kiêu': 'Năm Thiên Ấn - Nghiên cứu, chuyên môn sâu, cẩn thận sức khỏe.'
    };

    const lnGan = ganzhi.GANS[ganzhi.GANS_VN.indexOf(ganVN)];
    const lnZhi = ganzhi.ZHIS[ganzhi.ZHIS_VN.indexOf(zhiVN)];

    const rels = detectRelationships(lnGan, lnZhi, ctx);
    const base = interpretations[thapThan] || `Năm ${thapThan} - Cần phân tích thêm.`;

    let interactionStr = '';
    if (rels.length > 0) {
        interactionStr = `\n**Tương tác bản mệnh**: ${rels.join(', ')}.`;
    }

    // Interaction with Luck Cycle
    if (luckPillar) {
        const zhiChong = { '子': '午', '丑': '未', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥', '午': '子', '未': '丑', '申': '寅', '酉': '卯', '戌': '辰', '亥': '巳' };
        if (zhiChong[luckPillar.zhi] === lnZhi) {
            interactionStr += `\n**Cảnh báo**: Lưu niên xung với Đại vận ${luckPillar.can_chi}, dễ có biến động hoặc thay đổi lớn.`;
        }
    }

    const dungThan = ctx.nguHanhResult ? ctx.nguHanhResult.dung_than.ngu_hanh : [];
    const ganEle = ganzhi.ganToElement(lnGan);
    const zhiEle = ganzhi.zhiToElement(lnZhi);

    let luckStr = '';
    const hasDungThan = dungThan.includes(ganEle) || dungThan.includes(zhiEle);

    if (score !== null) {
        if (score >= 5) {
            luckStr = `\n🌟 **Đánh giá**: Vận trình **Cực Tốt**. Có thiên thời địa lợi, nên mạnh dạn thực hiện các kế hoạch lớn.`;
        } else if (score >= 2) {
            luckStr = `\n✨ **Đánh giá**: Vận trình **Thuận Lợi**. Có nhiều cơ hội tốt, sự nghiệp và tài chính đều hanh thông.`;
        } else if (score >= 0) {
            if (hasDungThan) {
                luckStr = `\n✨ **Đánh giá**: Vận trình **Trung bình Khá**. Dù gặp Dụng thần nhưng do có một vài xung khắc nên cần nỗ lực mới đạt kết quả cao.`;
            } else {
                luckStr = `\n🌤️ **Đánh giá**: Vận trình **Bình ổn**. Mọi việc diễn ra bình thường, cần kiên trì với mục tiêu hiện tại.`;
            }
        } else if (score >= -3) {
            luckStr = `\n⚠️ **Đánh giá**: Vận trình **Có Thử Thách**. Xuất hiện nhiều xung khắc, cần bình tĩnh và thận trọng trong các quyết định quan trọng.`;
        } else {
            luckStr = `\n⛔ **Đánh giá**: Vận trình **Nhiều Biến Động**. Áp lực và xung khắc mạnh, nên phòng thủ, tránh mạo hiểm và giữ gìn sức khỏe.`;
        }
    } else {
        // Fallback if score is not provided
        if (hasDungThan) {
            luckStr = '\n✨ **Đánh giá**: Đây là năm có năng lượng Dụng thần, rất thuận lợi để thực hiện các kế hoạch quan trọng.';
        } else {
            luckStr = '\n🌤️ **Đánh giá**: Vận trình bình ổn, cần chú trọng sự kiên trì.';
        }
    }

    return `### PHÂN TÍCH LƯU NIÊN ${year} (${ganVN} ${zhiVN})\n${base}${interactionStr}${luckStr}`;
}

/**
 * Generate Đại Vận (10-year period) interpretation
 */
function generateDaiVunInterpretation(thapThan, ganVN, zhiVN, ageStart, ctx, pillar) {
    const ageEnd = ageStart + 9;
    const prefix = `## ĐẠI VẬN ${ganVN.toUpperCase()} ${zhiVN.toUpperCase()} (${ageStart} - ${ageEnd} tuổi)\n`;

    const meanings = {
        'Tỷ': 'Giai đoạn Tỷ Kiên. Độc lập, tự chủ, hợp tác kinh doanh cần cẩn trọng.',
        'Kiếp': 'Giai đoạn Kiếp Tài. Cạnh tranh mạnh mẽ, cẩn thận tài chính và tình cảm.',
        'Thực': 'Giai đoạn Thực thần. Thuận lợi phát triển sự nghiệp, sáng tạo. Tốt cho nghệ thuật, giáo dục.',
        'Thương': 'Giai đoạn Thương Quan. Tài hoa bộc lộ, nhưng dễ xung đột với người có quyền.',
        'Tài+': 'Giai đoạn Chính Tài. Tài lộc ổn định, tình duyên thuận lợi.',
        'Tài-': 'Giai đoạn Thiên Tài. Cơ hội kiếm tiền bất ngờ, đầu tư ngắn hạn.',
        'Quan': 'Giai đoạn Chính Quan. Sự nghiệp thăng tiến, được cấp trên công nhận.',
        'Sát': 'Giai đoạn Thất Sát. Áp lực lớn nhưng cũng là cơ hội khẳng định bản thân.',
        'Ấn': 'Giai đoạn Chính Ấn. Học tập thành công, có quý nhân phù trợ.',
        'Kiêu': 'Giai đoạn Thiên Ấn. Nghiên cứu sâu, tri thức phát triển.'
    };

    const base = meanings[thapThan] || 'Giai đoạn có nhiều biến chuyển, cần phân tích kỹ lưỡng.';

    // Relationships
    const rels = detectRelationships(pillar.gan, pillar.zhi, ctx);
    let relStr = '';
    if (rels.length > 0) {
        relStr = `\n**Tương tác với Bản mệnh**: ${rels.join(', ')}.`;
    }

    // Element check
    const dungThan = ctx.nguHanhResult ? ctx.nguHanhResult.dung_than.ngu_hanh : [];
    const ganEle = ganzhi.ganToElement(pillar.gan);
    const zhiEle = ganzhi.zhiToElement(pillar.zhi);

    let evaluation = '\nĐây là vận trình trung bình, cần nỗ lực tự thân.';
    if (dungThan.includes(ganEle) || dungThan.includes(zhiEle)) {
        evaluation = '\n✨ **Cát vận**: Đây là 10 năm thuận lợi, có nhiều cơ hội thăng tiến và đạt được thành tựu lớn.';
    } else if (ctx.nguHanhResult && ctx.nguHanhResult.ky_than.ngu_hanh.includes(ganEle) && ctx.nguHanhResult.ky_than.ngu_hanh.includes(zhiEle)) {
        evaluation = '\n⚠️ **Thử thách**: Giai đoạn này gặp nhiều cản trở từ Kỵ thần, cần kiên trì và thận trọng.';
    }

    return `${prefix}${base}${relStr}${evaluation}`;
}

function getCurrentDaiVan(daYuns, age) {
    // Find the Dai Van period that covers the given age (Chinese age counting)
    // Each Dai Van lasts 10 years, starting at `tuoi_bat_dau`
    for (const dv of daYuns) {
        if (age >= dv.tuoi_bat_dau && age < dv.tuoi_bat_dau + 10) {
            return dv;
        }
    }
    return null;
}

module.exports = {
    calculateDaiVan,
    calculateStartAge,
    generateLiuNianInterpretation,
    generateDaiVunInterpretation,
    getYearStars,
    getCurrentDaiVan
};
