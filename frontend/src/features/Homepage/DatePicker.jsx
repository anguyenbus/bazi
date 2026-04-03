import React, { useState, useEffect, useRef } from 'react';
import { solarToLunar } from '../../utils/lunarCalendar';

const DatePicker = ({ value, onChange, onClose }) => {
    const [viewDate, setViewDate] = useState(() => {
        return {
            year: value?.year || 1990,
            month: value?.month || 6
        };
    });
    const pickerRef = useRef(null);

    const selectedDate = {
        year: value?.year || 1990,
        month: value?.month || 6,
        day: value?.day || 15
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                onClose?.();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside, { passive: true });
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [onClose]);

    const getDaysInMonth = (year, month) => {
        const y = parseInt(year) || 1990;
        return new Date(y, month, 0).getDate();
    };

    const getMonthData = () => {
        const { year, month } = viewDate;
        const y = parseInt(year) || 1990;
        const daysInMonth = getDaysInMonth(y, month);
        const firstDayOfWeek = new Date(y, month - 1, 1).getDay();

        const days = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }
        for (let d = 1; d <= daysInMonth; d++) {
            const lunar = solarToLunar(y, month, d);
            days.push({
                solar: d,
                lunar: lunar.day,
                lunarMonth: lunar.month,
                isLeapMonth: lunar.isLeapMonth,
                isNewMoon: lunar.day === 1,
                isFullMoon: lunar.day === 15
            });
        }
        return days;
    };

    const handleDayClick = (dayData) => {
        if (!dayData) return;
        const y = parseInt(viewDate.year) || 1990;
        onChange({
            year: y,
            month: viewDate.month,
            day: dayData.solar
        });
        onClose?.();
    };

    // Navigation functions
    const prevYear = () => setViewDate(prev => {
        const y = parseInt(prev.year) || 1990;
        return { ...prev, year: Math.max(1900, y - 1) };
    });
    const nextYear = () => setViewDate(prev => {
        const y = parseInt(prev.year) || 1990;
        return { ...prev, year: Math.min(2100, y + 1) };
    });

    const prevMonth = () => {
        setViewDate(prev => {
            const y = parseInt(prev.year) || 1990;
            if (prev.month === 1) {
                return { year: Math.max(1900, y - 1), month: 12 };
            }
            return { ...prev, month: prev.month - 1 };
        });
    };

    const nextMonth = () => {
        setViewDate(prev => {
            const y = parseInt(prev.year) || 1990;
            if (prev.month === 12) {
                return { year: Math.min(2100, y + 1), month: 1 };
            }
            return { ...prev, month: prev.month + 1 };
        });
    };

    const handleYearChange = (e) => {
        setViewDate(prev => ({ ...prev, year: parseInt(e.target.value) || 1990 }));
    };



    const handleMonthChange = (e) => {
        setViewDate(prev => ({ ...prev, month: parseInt(e.target.value) }));
    };

    const years = [];
    for (let y = 1900; y <= 2100; y++) {
        years.push(y);
    }

    const monthNames = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    const isSelected = (dayData) => {
        if (!dayData) return false;
        const y = parseInt(viewDate.year) || 1990;
        return dayData.solar === selectedDate.day &&
            viewDate.month === selectedDate.month &&
            y === selectedDate.year;
    };

    const isToday = (dayData) => {
        if (!dayData) return false;
        const y = parseInt(viewDate.year) || 1990;
        const today = new Date();
        return dayData.solar === today.getDate() &&
            viewDate.month === today.getMonth() + 1 &&
            y === today.getFullYear();
    };

    return (
        <div className="date-picker-overlay">
            <div className="date-picker-container glass-card" ref={pickerRef}>
                {/* Year Navigation */}
                <div className="dp-nav-row">
                    <button type="button" className="dp-nav-btn" onClick={prevYear}>❮❮</button>
                    <select
                        className="dp-select-label dp-year-select"
                        value={viewDate.year}
                        onChange={handleYearChange}
                    >
                        {years.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                    <button type="button" className="dp-nav-btn" onClick={nextYear}>❯❯</button>
                </div>

                {/* Month Navigation */}
                <div className="dp-nav-row">
                    <button type="button" className="dp-nav-btn" onClick={prevMonth}>❮</button>
                    <select
                        className="dp-select-label"
                        value={viewDate.month}
                        onChange={handleMonthChange}
                    >
                        {monthNames.map((name, i) => (
                            <option key={i} value={i + 1}>{name}</option>
                        ))}
                    </select>
                    <button type="button" className="dp-nav-btn" onClick={nextMonth}>❯</button>
                </div>

                {/* Legend */}
                <div className="dp-legend">
                    <span className="dp-legend-item"><span className="legend-dot solar"></span> Dương</span>
                    <span className="dp-legend-item"><span className="legend-dot lunar"></span> Âm</span>
                </div>

                {/* Weekdays */}
                <div className="date-picker-weekdays">
                    {weekDays.map(d => <span key={d} className="dp-weekday">{d}</span>)}
                </div>

                {/* Days Grid */}
                <div className="date-picker-days">
                    {getMonthData().map((dayData, i) => (
                        <button
                            key={i}
                            type="button"
                            className={`dp-day-dual ${!dayData ? 'empty' : ''} ${isSelected(dayData) ? 'selected' : ''} ${isToday(dayData) ? 'today' : ''} ${dayData?.isNewMoon ? 'new-moon' : ''} ${dayData?.isFullMoon ? 'full-moon' : ''}`}
                            onClick={() => handleDayClick(dayData)}
                            disabled={!dayData}
                            title={dayData?.isNewMoon ? `Mùng 1 Tháng ${dayData.lunarMonth}${dayData.isLeapMonth ? ' Nhuận' : ''} ÂL` : ''}
                        >
                            {dayData && (
                                <>
                                    <span className="dp-solar">{dayData.solar}</span>
                                    <span className="dp-lunar">
                                        {dayData.isNewMoon && <span className="lunar-month-dot">●</span>}
                                        {dayData.lunar}
                                    </span>
                                </>
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="date-picker-footer">
                    <button type="button" className="dp-today-btn" onClick={() => {
                        const today = new Date();
                        setViewDate({ year: today.getFullYear(), month: today.getMonth() + 1 });
                    }}>
                        Về hôm nay
                    </button>
                    <button type="button" className="dp-close-btn" onClick={onClose}>
                        ✕ Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
