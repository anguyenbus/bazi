/**
 * Lunar Calendar Conversion Utility
 * Simplified lunar calendar calculation for display purposes
 * Based on Vietnamese lunar calendar algorithm
 */

// Lunar month data encoded for years 1900-2100
// Each year's data contains info about lunar months and leap months
const LUNAR_INFO = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
    0x0d520
];

const EARTHLY_BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

/**
 * Get number of days in a lunar year
 */
function getLunarYearDays(year) {
    let sum = 348;
    let info = LUNAR_INFO[year - 1900];
    for (let i = 0x8000; i > 0x8; i >>= 1) {
        sum += (info & i) ? 1 : 0;
    }
    return sum + getLeapDays(year);
}

/**
 * Get leap month for a lunar year (0 = no leap month)
 */
function getLeapMonth(year) {
    return LUNAR_INFO[year - 1900] & 0xf;
}

/**
 * Get number of leap days (29 or 30)
 */
function getLeapDays(year) {
    if (getLeapMonth(year)) {
        return (LUNAR_INFO[year - 1900] & 0x10000) ? 30 : 29;
    }
    return 0;
}

/**
 * Get days in a lunar month
 */
function getLunarMonthDays(year, month) {
    return (LUNAR_INFO[year - 1900] & (0x10000 >> month)) ? 30 : 29;
}

/**
 * Convert solar date to lunar date
 * @param {number} solarYear 
 * @param {number} solarMonth (1-12)
 * @param {number} solarDay 
 * @returns {Object} { year, month, day, isLeapMonth }
 */
export function solarToLunar(solarYear, solarMonth, solarDay) {
    // Validate input
    if (solarYear < 1900 || solarYear > 2100) {
        return { year: solarYear, month: solarMonth, day: solarDay, isLeapMonth: false };
    }

    // Days from 1900-01-31 (lunar 1900-01-01)
    const baseDate = new Date(1900, 0, 31);
    const targetDate = new Date(solarYear, solarMonth - 1, solarDay);
    let offset = Math.floor((targetDate - baseDate) / 86400000);

    if (offset < 0) {
        return { year: solarYear, month: solarMonth, day: solarDay, isLeapMonth: false };
    }

    let lunarYear = 1900;
    let lunarMonth = 1;
    let lunarDay = 1;
    let isLeapMonth = false;

    // Calculate lunar year
    let daysInYear = getLunarYearDays(lunarYear);
    while (offset >= daysInYear) {
        offset -= daysInYear;
        lunarYear++;
        daysInYear = getLunarYearDays(lunarYear);
    }

    // Calculate lunar month
    let leapMonth = getLeapMonth(lunarYear);
    let leapProcessed = false;

    for (let i = 1; i <= 12; i++) {
        let daysInMonth;

        if (leapMonth > 0 && i === leapMonth + 1 && !leapProcessed) {
            // This is the leap month
            daysInMonth = getLeapDays(lunarYear);
            isLeapMonth = true;
            leapProcessed = true;
            i--; // Don't advance month number
        } else {
            daysInMonth = getLunarMonthDays(lunarYear, i);
            isLeapMonth = false;
        }

        if (offset < daysInMonth) {
            lunarMonth = i;
            lunarDay = offset + 1;
            break;
        }
        offset -= daysInMonth;
    }

    return {
        year: lunarYear,
        month: lunarMonth,
        day: lunarDay || 1, // Ensure day is never 0
        isLeapMonth
    };
}

/**
 * Get lunar day text for display
 * @param {number} day 
 * @returns {string}
 */
export function getLunarDayText(day) {
    const tens = ['', 'Mùng ', 'Hai Mươi ', 'Ba Mươi '];
    const ones = ['Mười', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín'];

    if (day <= 10) {
        return day === 10 ? 'Mùng 10' : `${day}`;
    } else if (day === 20) {
        return '20';
    } else if (day === 30) {
        return '30';
    } else {
        return `${day}`;
    }
}

/**
 * Format lunar date for display
 * @param {number} lunarDay 
 * @param {number} lunarMonth 
 * @returns {string}
 */
export function formatLunarDate(lunarDay, lunarMonth, isLeapMonth = false) {
    const monthPrefix = isLeapMonth ? 'N.' : '';
    return `${lunarDay}/${monthPrefix}${lunarMonth}`;
}

export { EARTHLY_BRANCHES };
