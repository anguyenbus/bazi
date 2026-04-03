import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/apiClient';

/**
 * AuspiciousDatePicker - Calendar-based component for selecting auspicious dates
 * Fetches ALL activities and allows filtering by dropdown
 */
const AuspiciousDatePicker = ({ userData, hideTitle = false }) => {
    const currentDate = new Date();
    const [targetMonth, setTargetMonth] = useState({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1
    });
    const [selectedActivity, setSelectedActivity] = useState('all');
    const [allCalendarData, setAllCalendarData] = useState({}); // { activity: { day: data } }
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    const activities = [
        { value: 'general', label: '🎯 Chung (Công việc)', icon: '🎯' },
        { value: 'wedding', label: '💒 Cưới hỏi', icon: '💒' },
        { value: 'engagement', label: '💍 Đính hôn', icon: '💍' },
        { value: 'moving', label: '🏠 Chuyển nhà', icon: '🏠' },
        { value: 'business', label: '💼 Khai trương', icon: '💼' },
        { value: 'travel', label: '✈️ Xuất hành', icon: '✈️' },
        { value: 'contract', label: '📝 Ký kết hợp đồng', icon: '📝' },
        { value: 'construction', label: '🏗️ Động thổ', icon: '🏗️' },
        { value: 'house_blessing', label: '🏡 Nhập trạch', icon: '🏡' },
    ];

    const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const monthNames = ['', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
    const getFirstDayOfWeek = (year, month) => new Date(year, month - 1, 1).getDay();

    // Fetch data for a single activity
    const fetchActivityData = async (activityType) => {
        const queryParams = {
            year: userData.year,
            month: userData.month,
            day: userData.day,
            target_year: targetMonth.year,
            target_month: targetMonth.month,
            activity: activityType,
            gender: userData.gender || 'Nam'
        };

        const data = await apiClient.selectDates(queryParams);
        return parseResultsToCalendar(data.dates || [], activityType);
    };

    // Fetch ALL activities in parallel
    const fetchAllActivities = async () => {
        if (!userData || !userData.year) {
            setError("Vui lòng nhập thông tin ngày sinh trước.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const promises = activities.map(act =>
                fetchActivityData(act.value).then(data => ({ activity: act.value, data }))
            );

            const results = await Promise.all(promises);

            const allData = {};
            results.forEach(({ activity, data }) => {
                allData[activity] = data;
            });

            setAllCalendarData(allData);
        } catch (err) {
            console.error("Error fetching auspicious dates:", err);
            setError(err.message || "Không thể kết nối đến server.");
        } finally {
            setLoading(false);
        }
    };

    const parseResultsToCalendar = (rawDates, activityType) => {
        const days = {};
        let currentType = 'normal';
        let lastDayNum = null;

        for (const line of rawDates) {
            if (!line || line.trim() === '' || /^[=\-─]+$/.test(line)) continue;

            // Detect section type from headers
            if (line.includes('NGÀY ĐẠI CÁT') || line.includes('🌟🌟🌟')) {
                currentType = 'excellent';
                continue;
            } else if (line.includes('NGÀY TỐT') && !line.includes('ĐẠI CÁT')) {
                currentType = 'good';
                continue;
            } else if (line.includes('NGÀY NÊN TRÁNH') || line.includes('⛔')) {
                currentType = 'avoid';
                continue;
            } else if (line.includes('LỜI KHUYÊN') || line.includes('Lưu ý quan trọng')) {
                currentType = 'advice';
                continue;
            }

            if (currentType === 'advice') continue;

            // Extract day info
            const dayMatch = line.match(/(?:📅|❌)\s*(?:\**)?\s*Ngày\s*(\d+)/);
            if (dayMatch) {
                const dayNum = parseInt(dayMatch[1]);
                lastDayNum = dayNum;
                if (!days[dayNum]) {
                    days[dayNum] = { type: currentType, lines: [], lunarDay: '', canChi: '', jianchu: '' };
                }
                days[dayNum].type = currentType;

                const canChiMatch = line.match(/Ngày\s*\d+\s*-\s*([^|]+)/);
                if (canChiMatch) {
                    days[dayNum].canChi = canChiMatch[1].trim();
                }
            }

            const lunarMatch = line.match(/Âm lịch:\s*([^|]+)/);
            if (lunarMatch && lastDayNum && days[lastDayNum]) {
                days[lastDayNum].lunarDay = lunarMatch[1].trim();
            }

            const jianchuMatch = line.match(/Kiến trừ:\s*([^|]+)/);
            if (jianchuMatch && lastDayNum && days[lastDayNum]) {
                days[lastDayNum].jianchu = jianchuMatch[1].trim();
            }

            if (lastDayNum && days[lastDayNum]) {
                // Check if line contains quality indicators or activity reasons
                if (line.includes('✅') || line.includes('⚠️') || line.includes('🌟') || line.includes('✨') || line.includes('❌')) {
                    const cleanDetail = line.split('|').pop().trim();
                    if (cleanDetail) days[lastDayNum].lines.push(cleanDetail);
                }
            }
        }

        return days;
    };

    // Merge data from all activities for a specific day
    const getMergedDayData = (day) => {
        const mergedData = {
            activities: {},
            bestType: 'normal',
            lunarDay: '',
            canChi: ''
        };

        activities.forEach(act => {
            const actData = allCalendarData[act.value]?.[day];
            if (actData) {
                mergedData.activities[act.value] = {
                    type: actData.type,
                    lines: actData.lines
                };

                // Get lunar and canchi from any activity that has it
                if (actData.lunarDay && !mergedData.lunarDay) {
                    mergedData.lunarDay = actData.lunarDay;
                }
                if (actData.canChi && !mergedData.canChi) {
                    mergedData.canChi = actData.canChi;
                }

                // Determine best type (excellent > good > normal > avoid)
                const typePriority = { excellent: 4, good: 3, normal: 2, avoid: 1 };
                if (typePriority[actData.type] > typePriority[mergedData.bestType]) {
                    mergedData.bestType = actData.type;
                }
            }
        });

        return mergedData;
    };

    // Get display type based on filter
    const getDisplayType = (day) => {
        if (selectedActivity === 'all') {
            return getMergedDayData(day).bestType;
        }
        return allCalendarData[selectedActivity]?.[day]?.type || 'normal';
    };

    useEffect(() => {
        if (userData && userData.year) {
            fetchAllActivities();
        }
    }, [targetMonth, userData]);

    const navigateMonth = (delta) => {
        let newMonth = targetMonth.month + delta;
        let newYear = targetMonth.year;

        if (newMonth > 12) { newMonth = 1; newYear++; }
        else if (newMonth < 1) { newMonth = 12; newYear--; }

        setTargetMonth({ year: newYear, month: newMonth });
        setSelectedDay(null);
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(targetMonth.year, targetMonth.month);
        const firstDay = getFirstDayOfWeek(targetMonth.year, targetMonth.month);
        const cells = [];

        for (let i = 0; i < firstDay; i++) {
            cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const mergedData = getMergedDayData(day);
            const displayType = getDisplayType(day);
            const isSelected = selectedDay === day;
            const isToday = targetMonth.year === currentDate.getFullYear() &&
                targetMonth.month === currentDate.getMonth() + 1 &&
                day === currentDate.getDate();

            // Count how many activities are good/excellent for this day
            const goodActivities = Object.entries(mergedData.activities)
                .filter(([_, data]) => data.type === 'excellent' || data.type === 'good');

            cells.push(
                <div
                    key={day}
                    className={`calendar-cell ${displayType} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => setSelectedDay(day)}
                >
                    <div className="solar-day">{day}</div>
                    {mergedData.lunarDay && (
                        <div className="lunar-day">{mergedData.lunarDay}</div>
                    )}
                    {mergedData.canChi && (
                        <div className="can-chi">{mergedData.canChi}</div>
                    )}

                    {/* Activity icons for good days */}
                    {goodActivities.length > 0 && (
                        <div className="activity-icons">
                            {goodActivities.slice(0, 3).map(([actKey, _]) => {
                                const act = activities.find(a => a.value === actKey);
                                return <span key={actKey} className="mini-icon" title={act?.label}>{act?.icon}</span>;
                            })}
                            {goodActivities.length > 3 && (
                                <span className="mini-icon more">+{goodActivities.length - 3}</span>
                            )}
                        </div>
                    )}

                    <div className="day-indicator">
                        {displayType === 'excellent' && '🌟'}
                        {displayType === 'good' && '✨'}
                        {displayType === 'avoid' && '⚠️'}
                    </div>
                </div>
            );
        }

        return cells;
    };

    if (!userData || !userData.year) {
        return (
            <div className="auspicious-calendar-module fade-in">
                {!hideTitle && <h2 className="module-title">📅 CHỌN NGÀY CÁT TƯỜNG</h2>}
                <div className="placeholder-info">
                    <p>⚠️ Vui lòng nhập thông tin ngày sinh trước để sử dụng tính năng này.</p>
                </div>
            </div>
        );
    }

    const selectedDayMergedData = selectedDay ? getMergedDayData(selectedDay) : null;

    return (
        <div className="auspicious-calendar-module fade-in">
            {!hideTitle && <h2 className="module-title">📅 CHỌN NGÀY CÁT TƯỜNG</h2>}

            {/* Activity Filter */}
            <div className="activity-bar glass-card">
                <label>Lọc theo hoạt động:</label>
                <select
                    value={selectedActivity}
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    className="glass-select"
                >
                    <option value="all">🔮 Tất cả hoạt động</option>
                    {activities.map(act => (
                        <option key={act.value} value={act.value}>{act.label}</option>
                    ))}
                </select>
            </div>

            {/* Calendar Container */}
            <div className="calendar-container">
                <div className="calendar-header glass-card">
                    <button className="nav-btn" onClick={() => navigateMonth(-1)}>◀</button>
                    <div className="month-year">
                        <span className="month-name">{monthNames[targetMonth.month]}</span>
                        <span className="year-name">{targetMonth.year}</span>
                    </div>
                    <button className="nav-btn" onClick={() => navigateMonth(1)}>▶</button>
                </div>

                <div className="calendar-legend">
                    <span className="legend-item excellent">🌟 Đại cát</span>
                    <span className="legend-item good">✨ Tốt</span>
                    <span className="legend-item avoid">⚠️ Nên tránh</span>
                </div>

                <div className="calendar-wrapper glass-card">
                    {loading ? (
                        <div className="loading-spinner-area">
                            <div className="spinner-mini"></div>
                            <p>Đang phân tích tất cả hoạt động...</p>
                        </div>
                    ) : error ? (
                        <div className="placeholder-info error-state">
                            <p>⚠️ {error}</p>
                            <button className="retry-btn" onClick={fetchAllActivities}>Thử lại</button>
                        </div>
                    ) : (
                        <>
                            <div className="calendar-weekdays">
                                {weekDays.map(d => (
                                    <div key={d} className={`weekday ${d === 'CN' ? 'sunday' : ''}`}>{d}</div>
                                ))}
                            </div>
                            <div className="calendar-grid">
                                {renderCalendar()}
                            </div>
                        </>
                    )}
                </div>

                {/* Selected Day Details - Show ALL activities */}
                {selectedDay && selectedDayMergedData && (
                    <div className="day-details glass-card">
                        <div className="details-header">
                            <span className="details-date">
                                Ngày {selectedDay}/{targetMonth.month}/{targetMonth.year}
                            </span>
                        </div>

                        {selectedDayMergedData.lunarDay && (
                            <div className="details-lunar">Âm lịch: {selectedDayMergedData.lunarDay}</div>
                        )}
                        {selectedDayMergedData.canChi && (
                            <div className="details-canchi">Can Chi: {selectedDayMergedData.canChi}</div>
                        )}

                        {/* Activity breakdown */}
                        <div className="activities-breakdown">
                            <h4>Phân tích theo hoạt động:</h4>
                            {activities.map(act => {
                                const actData = selectedDayMergedData.activities[act.value];
                                if (!actData) return null;

                                return (
                                    <div key={act.value} className={`activity-item ${actData.type}`}>
                                        <div className="activity-header">
                                            <span className="activity-icon">{act.icon}</span>
                                            <span className="activity-name">{act.label.replace(/^[^\s]+\s/, '')}</span>
                                            <span className={`activity-status ${actData.type}`}>
                                                {actData.type === 'excellent' && '🌟 Đại cát'}
                                                {actData.type === 'good' && '✨ Tốt'}
                                                {actData.type === 'avoid' && '⚠️ Tránh'}
                                                {actData.type === 'normal' && '—'}
                                            </span>
                                        </div>
                                        {actData.lines && actData.lines.length > 0 && (
                                            <div className="activity-reasons">
                                                {actData.lines.slice(0, 2).map((line, idx) => (
                                                    <p key={idx}>{line}</p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuspiciousDatePicker;
