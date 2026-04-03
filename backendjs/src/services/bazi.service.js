const BaZiCalculator = require('../bazi/calculator');
const { getElements } = require('../bazi/core');
const { calculateShenSha } = require('../bazi/shensha');
const { determineCach } = require('../bazi/geju');
const { calculateDaiVan } = require('../bazi/dayun');
const { formatOutput } = require('../bazi/output');
const thoiGianLuan = require('../bazi/thoi_gian_luan');
const ganzhi = require('../bazi/ganzhi');
const cacheService = require('./cache.service');

class BaZiService {
    /**
     * Full BaZi Analysis
     */
    async analyzeComplete(params) {
        return cacheService.getOrSet(
            cacheService.generateKey({ method: 'analyzeComplete', ...params }),
            async () => {
                const { year, month, day, hour, minute, gender, calendar, name } = params;

                const calc = new BaZiCalculator({
                    year, month, day, hour, minute,
                    isFemale: (gender || 'Nam').toLowerCase() === 'nữ',
                    isSolar: (calendar || 'solar').toLowerCase() === 'solar'
                });

                const ctx = calc.calculate();

                return formatOutput(ctx, { name, includeAll: true });
            }
        );
    }

    /**
     * Basic Chart (simplified pillars view)
     */
    async getBasicChart(params) {
        const { year, month, day, hour, minute, gender, calendar } = params;
        const calc = new BaZiCalculator({
            year, month, day, hour, minute,
            isFemale: (gender || 'Nam').toLowerCase() === 'nữ',
            isSolar: (calendar || 'solar').toLowerCase() === 'solar'
        });
        const ctx = calc.calculate();
        const fullData = formatOutput(ctx);

        return {
            pillars: fullData.chi_tiet_tru,
            elements: fullData.diem_so.ngu_hanh_vn,
            strength: fullData.diem_so.suc_manh,
            basicInfo: fullData.thong_tin_co_ban
        };
    }

    /**
     * Basic Birth Information
     */
    async getBasicInfo(params) {
        const { year, month, day, hour, minute, gender, calendar } = params;
        const calc = new BaZiCalculator({
            year, month, day, hour, minute,
            isFemale: gender.toLowerCase() === 'nữ',
            isSolar: calendar.toLowerCase() === 'solar'
        });
        const ctx = calc.calculate();
        const fullData = formatOutput(ctx);
        return {
            thong_tin_co_ban: fullData.thong_tin_co_ban,
            tham_so_dau_vao: params
        };
    }

    /**
     * Detailed Pillars
     */
    async getPillars(params) {
        const { year, month, day, hour, minute, gender, calendar } = params;
        const calc = new BaZiCalculator({
            year, month, day, hour, minute,
            isFemale: gender.toLowerCase() === 'nữ',
            isSolar: calendar.toLowerCase() === 'solar'
        });
        const ctx = calc.calculate();
        const fullData = formatOutput(ctx);
        return {
            chi_tiet_tru: fullData.chi_tiet_tru
        };
    }

    /**
     * Structural Analysis
     */
    async getAnalysis(params) {
        return cacheService.getOrSet(
            cacheService.generateKey({ method: 'getAnalysis', ...params }),
            async () => {
                const { year, month, day, hour, minute, gender, calendar } = params;
                const calc = new BaZiCalculator({
                    year, month, day, hour, minute,
                    isFemale: gender.toLowerCase() === 'nữ',
                    isSolar: calendar.toLowerCase() === 'solar'
                });
                const ctx = calc.calculate();
                const fullData = formatOutput(ctx);
                return {
                    phan_tich: fullData.phan_tich
                };
            }
        );
    }

    /**
     * Advanced Analysis (10 methods)
     */
    async getAdvanced(params) {
        return cacheService.getOrSet(
            cacheService.generateKey({ method: 'getAdvanced', ...params }),
            async () => {
                const { year, month, day, hour, minute, gender, calendar } = params;
                const calc = new BaZiCalculator({
                    year, month, day, hour, minute,
                    isFemale: gender.toLowerCase() === 'nữ',
                    isSolar: calendar.toLowerCase() === 'solar'
                });
                const ctx = calc.calculate();
                const fullData = formatOutput(ctx);
                return {
                    phan_tich_nang_cao: fullData.phan_tich.phan_tich_nang_cao
                };
            }
        );
    }

    /**
     * Classic Texts
     */
    async getClassicTexts(params) {
        const { year, month, day, hour, minute, gender, calendar } = params;
        const calc = new BaZiCalculator({
            year, month, day, hour, minute,
            isFemale: gender.toLowerCase() === 'nữ',
            isSolar: calendar.toLowerCase() === 'solar'
        });
        const ctx = calc.calculate();
        const fullData = formatOutput(ctx);
        return {
            van_ban_co_dien: fullData.van_ban_co_dien
        };
    }

    /**
     * Comprehensive Interpretation
     */
    async getLuanGiai(params) {
        return cacheService.getOrSet(
            cacheService.generateKey({ method: 'getLuanGiai', ...params }),
            async () => {
                const { year, month, day, hour, minute, gender, calendar } = params;
                const calc = new BaZiCalculator({
                    year, month, day, hour, minute,
                    isFemale: gender.toLowerCase() === 'nữ',
                    isSolar: calendar.toLowerCase() === 'solar'
                });
                const ctx = calc.calculate();
                const fullData = formatOutput(ctx);
                return {
                    luan_giai: fullData.luan_giai
                };
            }
        );
    }

    /**
     * Ngũ Hành Analysis
     */
    async getElements(params) {
        const { year, month, day, hour, gender, calendar } = params;
        const calc = new BaZiCalculator({
            year, month, day, hour,
            isFemale: (gender || 'Nam').toLowerCase() === 'nữ',
            isSolar: (calendar || 'solar').toLowerCase() === 'solar'
        });
        const ctx = calc.calculate();
        const fullData = formatOutput(ctx);
        return {
            diem_so: fullData.diem_so
        };
    }

    /**
     * Thần Sát Analysis
     */
    async getStars(params) {
        const { year, month, day, hour, gender, calendar } = params;
        const calc = new BaZiCalculator({
            year, month, day, hour,
            isFemale: (gender || 'Nam').toLowerCase() === 'nữ',
            isSolar: (calendar || 'solar').toLowerCase() === 'solar'
        });
        const ctx = calc.calculate();
        const fullData = formatOutput(ctx);
        return {
            sao_dac_biet: fullData.phan_tich.than_sat_sao
        };
    }

    /**
     * Đại Vận Analysis
     */
    async getLuckCycles(params) {
        const { year, month, day, hour, gender, calendar } = params;
        const calc = new BaZiCalculator({
            year, month, day, hour,
            isFemale: (gender || 'Nam').toLowerCase() === 'nữ',
            isSolar: (calendar || 'solar').toLowerCase() === 'solar'
        });
        const ctx = calc.calculate();
        const fullData = formatOutput(ctx);
        return {
            dai_van: fullData.dai_van
        };
    }

    /**
     * Lưu Niên Analysis
     */
    async getYearAnalysis(params) {
        return cacheService.getOrSet(
            cacheService.generateKey({ method: 'getYearAnalysis', ...params }),
            async () => {
                const { year, month, day, hour, gender, calendar, targetYear } = params;
                const isFemale = gender ? (gender.toLowerCase() === 'nữ' || gender.toLowerCase() === 'female') : false;
                const isSolar = calendar ? calendar.toLowerCase() === 'solar' : true;

                const calc = new BaZiCalculator({
                    year, month, day, hour,
                    isFemale,
                    isSolar
                });

                const ctx = calc.calculate();
                const luuNien = thoiGianLuan.analyzeLiuNian(ctx, targetYear || new Date().getFullYear());

                return {
                    nam_xem: targetYear,
                    ganzhiVN: `${ganzhi.ganToVN(ctx.gans[0])} ${ganzhi.zhiToVN(ctx.zhis[0])}`,
                    ...luuNien
                };
            }
        );
    }

    /**
     * Auspicious Dates
     */
    async getAuspiciousDates(params) {
        return cacheService.getOrSet(
            cacheService.generateKey({ method: 'getAuspiciousDates', ...params }),
            async () => {
                try {
                    const { year, month, day, hour, gender, calendar, targetYear, targetMonth } = params;
                    const isFemale = gender ? (gender.toLowerCase() === 'nữ' || gender.toLowerCase() === 'female') : false;
                    const isSolar = calendar ? calendar.toLowerCase() === 'solar' : true;

                    const calc = new BaZiCalculator({
                        year, month, day, hour: hour || 12,
                        isFemale,
                        isSolar
                    });

                    const ctx = calc.calculate();
                    const result = thoiGianLuan.analyzeAuspiciousDates(ctx, targetYear, targetMonth, params.activity || "general");

                    return {
                        nam: targetYear,
                        thang: targetMonth,
                        lich_thang: result,
                        activity: params.activity
                    };
                } catch (error) {
                    console.error("Error in getAuspiciousDates:", error);
                    throw error;
                }
            }
        );
    }

    /**
     * Unified Time Analysis (Year, Month, or Day)
     */
    async analyzeTimeStatus(params) {
        return cacheService.getOrSet(
            cacheService.generateKey({ method: 'analyzeTimeStatus', ...params }),
            async () => {
                const { year, month, day, hour, gender, calendar, targetYear, targetMonth, targetDay } = params;
                const isFemale = gender ? (gender.toLowerCase() === 'nữ' || gender.toLowerCase() === 'female') : false;
                const isSolar = calendar ? calendar.toLowerCase() === 'solar' : true;

                const calc = new BaZiCalculator({
                    year, month, day, hour: hour || 12,
                    isFemale,
                    isSolar
                });

                const ctx = calc.calculate();
                let result = {};

                if (targetDay) {
                    result = thoiGianLuan.analyzeLiuRi(ctx, targetYear, targetMonth, targetDay);
                } else if (targetMonth) {
                    result = thoiGianLuan.analyzeLiuYue(ctx, targetYear, targetMonth);
                } else {
                    result = thoiGianLuan.analyzeLiuNian(ctx, targetYear || new Date().getFullYear());
                }

                return result;
            }
        );
    }
    /**
     * Map Bazi context to simplified chart data for frontend/history
     */
    mapToChart(ctx) {
        if (!ctx) return null;

        const gans = ctx.gans || [];
        const zhis = ctx.zhis || [];
        const naYin = ctx.naYin || [];
        const shenSha = ctx.shenSha || [];
        const ganShens = ctx.ganShens || [];

        // Safety helper for ganzhi
        const safeGanToVN = (gan) => gan ? ganzhi.ganToVN(gan) : '';
        const safeZhiToVN = (zhi) => zhi ? ganzhi.zhiToVN(zhi) : '';

        return {
            // Basic Info
            nam_sinh: ctx.year,
            gioi_tinh: ctx.isFemale ? 'Nữ' : 'Nam',

            // Full Pillars with Na Yin & Shen Sha
            tru_nam: {
                can: safeGanToVN(gans[0]),
                chi: safeZhiToVN(zhis[0]),
                nap_am: naYin[0] || '',
                than_sat: shenSha[0] || []
            },
            tru_thang: {
                can: safeGanToVN(gans[1]),
                chi: safeZhiToVN(zhis[1]),
                nap_am: naYin[1] || '',
                than_sat: shenSha[1] || []
            },
            tru_ngay: {
                can: safeGanToVN(gans[2]),
                chi: safeZhiToVN(zhis[2]),
                nap_am: naYin[2] || '',
                than_sat: shenSha[2] || [],
                chu: safeGanToVN(ctx.dayGan) // Day Master
            },
            tru_gio: {
                can: safeGanToVN(gans[3]),
                chi: safeZhiToVN(zhis[3]),
                nap_am: naYin[3] || '',
                than_sat: shenSha[3] || []
            },

            // Analysis Data
            menh: naYin[0] || '',
            than_vuong_suy: ctx.dayMasterStrength || 'Bình Hòa',
            dung_than: ctx.usefulGods || [],
            ky_than: ctx.harmfulGods || [],

            // Scores
            diem_so: {
                ngu_hanh_vn: ctx.nguHanhResult?.scores || {},
                ngu_hanh: ctx.elements || {}
            },

            // Luck Cycles
            dai_van: ctx.dai_van || [],

            // Detailed Objects for Rendering
            dayMaster: { element: ctx.dayGan ? ganzhi.ganToElement(ctx.dayGan) : '' },
            pillars: {
                year: { gan: safeGanToVN(gans[0]), zhi: safeZhiToVN(zhis[0]) },
                month: { gan: safeGanToVN(gans[1]), zhi: safeZhiToVN(zhis[1]) },
                day: { gan: safeGanToVN(gans[2]), zhi: safeZhiToVN(zhis[2]) },
                hour: { gan: safeGanToVN(gans[3]), zhi: safeZhiToVN(zhis[3]) }
            },
            elements: ctx.elements || {},
            shishen: {
                year: ganShens[0] || '',
                month: ganShens[1] || '',
                day: ganShens[2] || '',
                hour: ganShens[3] || ''
            }
        };
    }
}

module.exports = new BaZiService();
