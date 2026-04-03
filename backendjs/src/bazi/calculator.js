/**
 * BaZi Calculator - Core calculation module
 * Converted from Python bazi/calculator.py
 */

const { Solar, Lunar } = require('lunar-javascript');
const ganzhi = require('./ganzhi');
const core = require('./core');

class BaZiCalculator {
    constructor(options) {
        this.year = options.year;
        this.month = options.month;
        this.day = options.day;
        this.hour = options.hour || 12;
        this.minute = options.minute || 0;
        this.isFemale = options.isFemale || false;
        this.isSolar = options.isSolar !== false; // default true

        this.gans = [];  // Thiên Can
        this.zhis = [];  // Địa Chi
        this.pillars = [];
        this.elements = {};
        this.scores = {};
    }

    /**
     * Calculate BaZi chart
     */
    calculate() {
        // Convert to Solar if input is Lunar
        let solar;
        if (this.isSolar) {
            solar = Solar.fromYmdHms(this.year, this.month, this.day, this.hour, this.minute, 0);
        } else {
            const lunar = Lunar.fromYmd(this.year, this.month, this.day);
            solar = lunar.getSolar();
        }

        const lunar = solar.getLunar();
        const bazi = lunar.getEightChar();

        // Get Gans (Heavenly Stems)
        this.gans = [
            bazi.getYearGan(),
            bazi.getMonthGan(),
            bazi.getDayGan(),
            bazi.getTimeGan()
        ];

        // Get Zhis (Earthly Branches)
        this.zhis = [
            bazi.getYearZhi(),
            bazi.getMonthZhi(),
            bazi.getDayZhi(),
            bazi.getTimeZhi()
        ];

        // Build pillars
        this.pillars = this._buildPillars();

        // Calculate elements
        this.elements = this._calculateElements();

        // Calculate scores
        this.scores = this._calculateScores();

        // Build context
        return this._buildContext(solar, lunar, bazi);
    }

    /**
     * Build four pillars with details
     */
    _buildPillars() {
        const pillarNames = ['Nam', 'Tháng', 'Ngày', 'Giờ'];
        const pillars = [];

        for (let i = 0; i < 4; i++) {
            const gan = this.gans[i];
            const zhi = this.zhis[i];
            const ganVN = ganzhi.ganToVN(gan);
            const zhiVN = ganzhi.zhiToVN(zhi);

            // Build tang_can with calculated thap_than
            const rawTangCan = ganzhi.getTangCan(zhi);
            const tangCanWithThapThan = rawTangCan.map(tc => {
                // Convert Vietnamese can name back to Chinese for thap_than calculation
                const canVN = tc.can;
                const canCN = ganzhi.GANS[ganzhi.GANS_VN.indexOf(canVN)] || '';
                return {
                    can: canVN,
                    thap_than: ganzhi.getThapThan(this.gans[2], canCN)
                };
            });

            pillars.push({
                tru: pillarNames[i],
                can: ganVN,
                chi: zhiVN,
                can_cn: gan,
                chi_cn: zhi,
                nap_am: ganzhi.getNapAm(gan, zhi),
                tang_can: tangCanWithThapThan,
                thap_than_can: i === 2 ? 'Nhật Chủ' : ganzhi.getThapThan(this.gans[2], gan),
                thap_than_chi: ganzhi.getThapThan(this.gans[2], ganzhi.getZhiMainGan(zhi))
            });
        }

        return pillars;
    }

    /**
     * Calculate five elements distribution - EXACT MATCH WITH PYTHON
     * Python: for item in ctx.gans: ctx.scores[gan5[item]] += 5
     *         for item in list(ctx.zhis) + [ctx.zhis.month]: ... += zhi5[item][gan]
     */
    _calculateElements() {
        const elements = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };

        // Count from all Gans - each Gan adds 5 points to its element
        for (const gan of this.gans) {
            const element = ganzhi.GAN5[gan] || ganzhi.ganToElement(gan);
            if (elements[element] !== undefined) {
                elements[element] += 5;
            }
        }

        // Count from all Zhis using hidden stems with weights
        // IMPORTANT: Month zhi is counted TWICE in Python (list(ctx.zhis) + [ctx.zhis.month])
        const zhisWithExtraMonth = [...this.zhis, this.zhis[1]]; // Add month again

        for (const zhi of zhisWithExtraMonth) {
            const hiddenStems = ganzhi.ZHI5[zhi];
            if (hiddenStems) {
                for (const [hiddenGan, weight] of Object.entries(hiddenStems)) {
                    const element = ganzhi.GAN5[hiddenGan];
                    if (element && elements[element] !== undefined) {
                        elements[element] += weight;
                    }
                }
            }
        }

        return elements;
    }

    /**
     * Calculate strength scores - EXACT MATCH WITH PYTHON
     * Python: ctx.strong = gan_scores[Tỷ] + gan_scores[Kiếp] + gan_scores[Kiêu] + gan_scores[Ấn]
     */
    _calculateScores() {
        const dayGan = this.gans[2];

        // Calculate gan_scores (score per individual Gan)
        const ganScores = {};
        for (const gan of ganzhi.GANS) {
            ganScores[gan] = 0;
        }

        // Add 5 for each Gan in chart
        for (const gan of this.gans) {
            ganScores[gan] = (ganScores[gan] || 0) + 5;
        }

        // Add weights for hidden stems (including month counted twice)
        const zhisWithExtraMonth = [...this.zhis, this.zhis[1]];
        for (const zhi of zhisWithExtraMonth) {
            const hiddenStems = ganzhi.ZHI5[zhi];
            if (hiddenStems) {
                for (const [hiddenGan, weight] of Object.entries(hiddenStems)) {
                    ganScores[hiddenGan] = (ganScores[hiddenGan] || 0) + weight;
                }
            }
        }

        // Find the Gans that represent Tỷ, Kiếp, Kiêu, Ấn
        // Need to calculate using ten_deities logic
        const dayElement = ganzhi.ganToElement(dayGan);
        const dayYin = ganzhi.GANS.indexOf(dayGan) % 2; // 0 = yang, 1 = yin

        let strongScore = 0;

        // Calculate strong score = Tỷ + Kiếp + Kiêu + Ấn
        for (const gan of ganzhi.GANS) {
            const thapThan = ganzhi.getThapThan(dayGan, gan);
            // Tỷ, Kiếp (same element), Kiêu, Ấn (generates me)
            if (['Tỷ', 'Kiếp', 'Kiêu', 'Ấn'].includes(thapThan)) {
                strongScore += ganScores[gan] || 0;
            }
        }

        // Calculate total score
        const totalScore = Object.values(this.elements).reduce((sum, v) => sum + v, 0);

        // Determine weak/strong - Use Vong Trang Sinh (12 Life Stages)
        let isWeak = true;
        const meStatus = [];

        for (const zhi of this.zhis) {
            const status = ganzhi.getVongTrangSinh(dayGan, zhi);
            meStatus.push(status);
            // Check if Day Master implies strength phases
            if (['Tr.Sinh', 'Đ.Vượng', 'L.Quan'].includes(status)) {
                isWeak = false;
            }
        }

        // Additional check: if still weak, check if Tỷ count + Mộ count > 2
        if (isWeak) {
            // Calculate shens similar to Python: stem deities + branch main deities
            const ganShens = this.gans.map((g, i) => i === 2 ? '' : ganzhi.getThapThan(dayGan, g));
            const zhiMainShens = this.zhis.map(z => ganzhi.getThapThan(dayGan, ganzhi.getZhiMainGan(z)));
            const allShens = [...ganShens, ...zhiMainShens];

            const tyCount = allShens.filter(s => s === 'Tỷ').length;
            const moCount = meStatus.filter(s => s === 'Mộ').length;

            if (tyCount + moCount > 2) {
                isWeak = false;
            }
        }

        return {
            suc_manh: {
                diem_manh: strongScore,
                tong_diem: totalScore,
                la_nhuoc: isWeak
            },
            ngu_hanh_vn: this.elements,
            nhiet_do: this._calculateTemperature()
        };
    }

    /**
     * Calculate temperature (hot/cold balance)
     */
    _calculateTemperature() {
        let temp = 0;

        // Hot elements: Hỏa, Mộc
        // Cold elements: Thủy, Kim
        temp += (this.elements['Hỏa'] || 0) * 1;
        temp += (this.elements['Mộc'] || 0) * 0.5;
        temp -= (this.elements['Thủy'] || 0) * 1;
        temp -= (this.elements['Kim'] || 0) * 0.5;

        return Math.round(temp * 10) / 10;
    }

    /**
     * Build full context object
     */
    _buildContext(solar, lunar, bazi) {
        const dayGan = this.gans[2];
        const dayGanVN = ganzhi.ganToVN(dayGan);
        const monthZhiVN = ganzhi.zhiToVN(this.zhis[1]);

        // Calculate specialized shishen lists for analyze modules
        const ganShens = this.gans.map((g, i) => i === 2 ? 'Nhật Chủ' : ganzhi.getThapThan(dayGan, g));
        const zhiShens = this.zhis.map(z => ganzhi.getThapThan(dayGan, ganzhi.getZhiMainGan(z)));
        const zhiShen3 = this.zhis.map(z => ganzhi.getTangCan(z).map(t => ganzhi.getThapThan(dayGan, t.can)));

        // Flattened list of all shens in the chart
        const shens2 = [...ganShens.filter(s => s !== 'Nhật Chủ'), ...zhiShen3.flat()];


        // Use lunar-javascript API for proper calculations
        let menhCung = '';
        let thaiNguyen = '';
        let thanCung = '';
        let nhapVan = '';
        let yun = null;

        // Helper to translate Chinese GanZhi to Vietnamese
        const translateGanZhi = (str) => {
            if (!str) return '';
            // Split GanZhi into Gan and Zhi (2 characters each in Chinese)
            if (str.length === 2) {
                const gan = str[0];
                const zhi = str[1];
                return `${ganzhi.ganToVN(gan)} ${ganzhi.zhiToVN(zhi)}`;
            }
            // If already in Vietnamese format (with space)
            if (str.includes(' ')) return str;
            return str;
        };

        try {
            // Mệnh Cung from lunar-javascript
            const rawMenhCung = bazi.getMingGong ? bazi.getMingGong() : null;
            menhCung = rawMenhCung ? translateGanZhi(rawMenhCung) : `${dayGanVN} ${monthZhiVN}`;

            // Thai Nguyên from lunar-javascript  
            const rawThaiNguyen = bazi.getTaiYuan ? bazi.getTaiYuan() : null;
            thaiNguyen = rawThaiNguyen ? translateGanZhi(rawThaiNguyen) : this._getThaiNguyenManual();

            // Thân Cung from lunar-javascript
            const rawThanCung = bazi.getShenGong ? bazi.getShenGong() : null;
            thanCung = rawThanCung ? translateGanZhi(rawThanCung) : `${dayGanVN} ${ganzhi.zhiToVN(this.zhis[2])}`;

            // Nhập vận (Manual Calculation for Accuracy)
            const dayun = require('./dayun');
            // Recalculate direction manually to coincide with dayun.js logic
            const yearGan = this.gans[0];
            const yearGanIdx = ganzhi.GANS.indexOf(yearGan); // Note: Assuming gans are Chinese? Or VN?
            // Need to verify what 'this.gans' contains. Calculator.js line 45: bazi.getYearGan() returns Chinese char?
            // lunar-javascript usually returns Chinese chars.
            const isYangYear = (yearGanIdx >= 0) ? (yearGanIdx % 2 === 0) : true; // Default Yang if not found

            // Re-calc direction
            let isForward;
            if (this.isFemale) {
                isForward = !isYangYear;
            } else {
                isForward = isYangYear;
            }
            // Use manual start age
            const startAgeObj = dayun.calculateStartAge(solar, lunar, isForward);

            // Convert to Date
            const birthDate = new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
            // Add Start Age Span
            // birthDate.setFullYear(birthDate.getFullYear() + startAgeObj.years);
            // birthDate.setMonth(birthDate.getMonth() + startAgeObj.months);

            // Calculate resulting Year and Month
            let targetYear = solar.getYear() + startAgeObj.years;
            let targetMonth = solar.getMonth() + startAgeObj.months;

            while (targetMonth > 12) {
                targetMonth -= 12;
                targetYear += 1;
            }

            // Format: "Tháng M/YYYY"
            nhapVan = `Tháng ${targetMonth}/${targetYear}`;
            // Also store basic Start Age for Dayun loop
            // Dayun loop currently uses `i` integer.
            // We need to pass precise age? No, loop uses integer years usually (Chinese age).
            // But calculator needs start age for year mapping.
            // For now, assume integer years for the main loop, but display precise time.

        } catch (e) {
            console.error("Error calculating Nhap Van:", e); // Debug
            // Fallback to manual calculations
            menhCung = `${dayGanVN} ${monthZhiVN}`;
            thaiNguyen = this._getThaiNguyenManual();
            thanCung = `${dayGanVN} ${ganzhi.zhiToVN(this.zhis[2])}`;
            nhapVan = 'Đang tính';
        }


        // Calculate weak/strong (can_yeu)
        const isWeak = this.scores?.suc_manh?.la_nhuoc;
        const canYeu = isWeak === true ? 'Yếu' : isWeak === false ? 'Mạnh' : 'Trung bình';

        return {
            basicInfo: {
                ten: '',
                gioi_tinh: this.isFemale ? 'Nữ' : 'Nam',
                ngay_duong_lich: `Năm ${solar.getYear()} tháng ${solar.getMonth()} ngày ${solar.getDay()}`,
                ngay_am_lich: `Năm ${lunar.getYear()} tháng ${lunar.getMonth()} ngày ${lunar.getDay()}`,
                gio_sinh: String(this.hour),
                gio_chi: ganzhi.zhiToVN(this.zhis[3]),
                tiet_khi: lunar.getJieQi() || '',
                menh_cung: menhCung,
                thai_nguyen: thaiNguyen,
                than_cung: thanCung,
                nhap_van: nhapVan,
                can_yeu: canYeu
            },
            pillars: this.pillars,
            elements: this.elements,
            elementsVN: this.elements,
            scores: this.scores,
            balance: this._getBalance(),
            gans: this.gans,
            zhis: this.zhis,
            zhus: this.gans.map((g, i) => [g, this.zhis[i]]),
            dayGan: this.gans[2],
            dayZhi: this.zhis[2],
            isFemale: this.isFemale,
            solar,
            lunar,
            bazi, // Store bazi object for later use
            yun,  // Store yun for Dai Van calculations
            // Shishen-specific lists
            ganShens,
            zhiShens,
            zhiShen3,
            shens2,
            nayin: this.pillars.map(p => p.nap_am),
            ge: ganzhi.getThapThan(dayGan, ganzhi.getZhiMainGan(this.zhis[1])),
            me: dayGan,
            // Vòng Trường Sinh for each pillar
            pillarStages: this.zhis.map(zhi => ganzhi.getVongTrangSinh(this.gans[2], zhi)),
            // Additional properties for parity
            weak: isWeak,
            strong: this.scores?.suc_manh?.diem_manh || 0,
            hour_unknown: false
        };
    }

    _getThaiNguyenManual() {
        // Thai Nguyên manual calculation
        // Thai Nguyên = Month Gan + 1 position, Month Zhi + 3 positions
        const monthGanIdx = ganzhi.GANS.indexOf(this.gans[1]);
        const monthZhiIdx = ganzhi.ZHIS.indexOf(this.zhis[1]);
        const thaiGanIdx = (monthGanIdx + 1) % 10;
        const thaiZhiIdx = (monthZhiIdx + 3) % 12;
        return `${ganzhi.ganToVN(ganzhi.GANS[thaiGanIdx])} ${ganzhi.zhiToVN(ganzhi.ZHIS[thaiZhiIdx])}`;
    }

    _getCanKhi() {
        // Can Khí analysis
        const dayElement = ganzhi.ganToElement(this.gans[2]);
        const monthZhi = this.zhis[1];
        return ganzhi.getCanKhi(dayElement, monthZhi);
    }

    _getBalance() {
        const dayElement = ganzhi.ganToElement(this.gans[2]);
        return {
            day_element: dayElement,
            favorable: ganzhi.getFavorable(dayElement),
            unfavorable: ganzhi.getUnfavorable(dayElement)
        };
    }
}

module.exports = BaZiCalculator;
