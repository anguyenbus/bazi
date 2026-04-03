/**
 * Utility for date and time handling in Vietnam timezone (GMT+7)
 */

/**
 * Gets the current date string in YYYY-MM-DD format (Vietnam time)
 * @returns {string}
 */
const getVNDateString = () => {
    const now = new Date();
    const vnTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const year = vnTime.getFullYear();
    const month = String(vnTime.getMonth() + 1).padStart(2, '0');
    const day = String(vnTime.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Gets the current month string in YYYY-MM format (Vietnam time)
 * @returns {string}
 */
const getVNMonthString = () => {
    const now = new Date();
    const vnTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const year = vnTime.getFullYear();
    const month = String(vnTime.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
};

/**
 * Gets the current year string in YYYY format (Vietnam time)
 * @returns {string}
 */
const getVNYearString = () => {
    const now = new Date();
    const vnTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    return String(vnTime.getFullYear());
};

/**
 * Gets the current full ISO string in Vietnam time
 * @returns {string}
 */
const getCurrentVNTime = () => {
    return new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
};

module.exports = {
    getVNDateString,
    getVNMonthString,
    getVNYearString,
    getCurrentVNTime
};
