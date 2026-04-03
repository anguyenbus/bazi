import React from 'react';

const DateSelection = ({ data }) => {
    const dates = [
        { type: 'Khai trương', date: '25/12/2025', rate: 'Cực tốt' },
        { type: 'Cưới hỏi', date: '02/01/2026', rate: 'Tốt' },
        { type: 'Giao dịch', date: '15/01/2026', rate: 'Bình thường' },
        { type: 'Xuất hành', date: '20/01/2026', rate: 'Tốt' },
    ];

    return (
        <section className="date-selection-module glass-card">
            <div className="section-header-dark">
                <h3>CHỌN NGÀY CÁT TƯỜNG</h3>
            </div>
            <div className="dates-grid">
                {dates.map((d, i) => (
                    <div key={i} className="date-item">
                        <div className="date-type">{d.type}</div>
                        <div className="date-val">{d.date}</div>
                        <div className={`date-rate ${d.rate === 'Cực tốt' ? 'high' : ''}`}>{d.rate}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DateSelection;
