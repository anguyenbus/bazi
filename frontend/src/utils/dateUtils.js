/**
 * Utility functions for date and time formatting
 */

/**
 * Formats a date string (ISO or SQLite format) to Vietnam timezone (GMT+7)
 * @param {string} dateStr - Date string from database
 * @returns {string} Formatted date/time: HH:mm DD/MM/YYYY
 */
export const formatDateTime = (dateStr) => {
    if (!dateStr) return 'N/A';

    try {
        let date;
        // Handle SQLite format "2026-01-09 15:30:00" vs ISO "2026-01-09T15:30:00Z"
        if (dateStr.includes('T')) {
            date = new Date(dateStr);
        } else {
            // SQLite CURRENT_TIMESTAMP is UTC. Replace space with T and append Z to force UTC parsing
            date = new Date(dateStr.replace(' ', 'T') + 'Z');
        }

        // Check for invalid date
        if (isNaN(date.getTime())) return 'N/A';

        // Format using Vietnam locale and timezone
        return date.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour12: false
        }).replace(',', ''); // Remove comma if present in some browser locales
    } catch (e) {
        console.error('[dateUtils] Error formatting date:', e, dateStr);
        return 'N/A';
    }
};

export default {
    formatDateTime
};
