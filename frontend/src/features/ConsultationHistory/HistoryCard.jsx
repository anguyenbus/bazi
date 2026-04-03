import React from 'react';
import { formatDateTime } from '../../utils/dateUtils';

const HistoryCard = ({ item, onClick }) => {
    const isMatching = item.question_id === 'matching_ai' || item.theme_id === 'matching';
    const isQue = item.theme_id === 'xin_que' || item.metadata?.isQue;

    return (
        <div className={`history-card glass-card fade-in ${isMatching ? 'is-matching' : ''} ${isQue ? 'is-que' : ''}`} onClick={onClick}>
            <div className="card-left">
                {/* Icon removed as requested */}
            </div>
            <div className="card-main">
                <div className="history-question-row">
                    <span className="q-type-badge">
                        {isMatching ? '👩‍❤️‍👨 Duyên Số' : isQue ? '🔮 Xin Quẻ' : '💬 Tư vấn'}
                    </span>
                    <span className="question-text-truncate">{item.question_text}</span>
                </div>
                <div className="history-meta-row">
                    <span className="history-date">📅 {formatDateTime(item.created_at)}</span>
                    <span className="history-cost">💎 {item.credits_used || 0}</span>
                </div>
            </div>
            <div className="card-arrow">
                <span>→</span>
            </div>
        </div>
    );
};

export default HistoryCard;
