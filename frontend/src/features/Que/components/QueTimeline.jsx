import React from 'react';
import GuaSymbol from './GuaSymbol';

/**
 * Timeline component showing historical hexagram results
 * Displays past divinations in a horizontal scrollable format
 */
const QueTimeline = ({ history, onSelect, type = 'daily' }) => {
    if (!history || history.length === 0) {
        return (
            <div className="timeline-empty">
                <p>📜 Chưa có lịch sử quẻ {type === 'daily' ? 'ngày' : type === 'monthly' ? 'tháng' : 'năm'}</p>
            </div>
        );
    }

    const getQualityClass = (quality) => {
        if (['Đại Cát', 'Cát', 'Tiểu Cát'].includes(quality)) return 'quality-good';
        if (['Bình'].includes(quality)) return 'quality-neutral';
        return 'quality-bad';
    };

    const formatDate = (dateStr, type) => {
        const date = new Date(dateStr);
        if (type === 'daily') {
            return `${date.getDate()}/${date.getMonth() + 1}`;
        } else if (type === 'monthly') {
            return `T${date.getMonth() + 1}/${date.getFullYear()}`;
        }
        return date.getFullYear().toString();
    };

    return (
        <div className="que-timeline-container">
            <div className="timeline-header">
                <h4>📊 Xu Hướng Vận Mệnh</h4>
                <span className="timeline-type-label">
                    {type === 'daily' ? '7 ngày qua' : type === 'monthly' ? '3 tháng qua' : '3 năm qua'}
                </span>
            </div>

            <div className="timeline-scroll">
                <div className="timeline-line" />
                {history.map((item, index) => (
                    <div
                        key={item.id || index}
                        className={`timeline-node ${getQualityClass(item.quality)}`}
                        onClick={() => onSelect && onSelect(item)}
                    >
                        <div className="node-date">{formatDate(item.created_at, type)}</div>
                        <div className="node-symbol">
                            <GuaSymbol symbol={item.symbol} size={30} />
                        </div>
                        <div className="node-quality">{item.quality}</div>
                        <div className="node-name">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QueTimeline;
