import React, { useCallback } from 'react';
import GuaSymbol from './GuaSymbol';

const QueCard = ({ title, type, icon, data, onRequest, onSelect, onReroll, loading, disabled, isGuest, topic }) => {
    const hasData = !!data && !data.error;

    const handleClick = useCallback(() => {
        if (!hasData && !loading && !disabled) {
            onRequest(type);
        } else if (hasData) {
            onSelect(data);
        }
    }, [hasData, loading, disabled, onRequest, onSelect, type, data]);

    const getQualityClass = (quality) => {
        if (['Đại Cát', 'Cát', 'Tiểu Cát'].includes(quality)) return 'quality-good';
        if (['Bình'].includes(quality)) return 'quality-neutral';
        return 'quality-bad';
    };

    return (
        <div className={`que-card-container ${hasData ? 'has-data' : ''}`}>
            <div className={`que-card ${hasData ? 'flipped' : ''}`} onClick={handleClick}>

                {/* FRONT SIDE (Card Back - Chưa xin) */}
                <div className="que-card-face que-card-front">
                    <div className="card-pattern"></div>
                    <div className="card-content">
                        <div className="card-icon">{icon}</div>
                        <h3 className="card-title">{title}</h3>
                        {loading ? (
                            <div className="card-status status-loading">
                                <div className="divination-3d-scene">
                                    <div className="tube-container">
                                        <div className="tube">
                                            <div className="tube-back"></div>
                                            <div className="sticks-bundle">
                                                {[...Array(10)].map((_, i) => (
                                                    <div key={i} className="stick-3d" style={{ '--i': i }}></div>
                                                ))}
                                            </div>
                                            <div className="tube-front"></div>
                                        </div>
                                        <div className="falling-stick-wrapper">
                                            <div className="stick-3d falling"></div>
                                        </div>
                                    </div>
                                </div>
                                <span className="loading-text">Thầy đang chiêu quẻ...</span>
                            </div>
                        ) : disabled ? (
                            <div className="card-status status-disabled">
                                <span>{isGuest ? 'Vui lòng đăng nhập' : 'Cần nhập lá số trước'}</span>
                            </div>
                        ) : (
                            <div className="card-status status-available">
                                <span className="pulse-icon">👆</span>
                                <span>Chạm để xin quẻ</span>
                                <span className="credit-cost">💎 10 linh thạch</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* BACK SIDE (Result - Đã xin) */}
                <div className="que-card-face que-card-back">
                    {hasData && (
                        <div className="result-content">
                            <div className="result-header">
                                <span className="result-period">{title}</span>
                                {topic && topic !== 'Chung' && (
                                    <span className="topic-badge">🎯 {topic}</span>
                                )}
                                <span className={`result-quality ${getQualityClass(data.quality)}`}>
                                    {data.quality}
                                </span>
                            </div>

                            <div className="result-main">
                                <GuaSymbol symbol={data.symbol} size={70} />
                                <h4 className="gua-name">{data.name}</h4>
                                <p className="gua-meaning">{data.meaning}</p>
                            </div>

                            <div className="result-interaction">
                                <span className="interaction-label">
                                    {data.interaction?.dayMaster} ({data.interaction?.dayMasterElement})
                                    <span className={`relation-badge ${data.interaction?.relationType}`}>
                                        {data.interaction?.relation}
                                    </span>
                                    {data.interaction?.timeGan}{data.interaction?.timeZhi}
                                </span>
                            </div>

                            <div className="result-footer">
                                <span>🎯 Thập Thần: {data.interaction?.activatedShiShen}</span>
                                <small>Bấm để xem chi tiết bên dưới</small>
                            </div>

                            {data.is_history ? (
                                <span className="history-badge">📜 Đã xin trước</span>
                            ) : (
                                <span className="new-badge">✨ Mới tạo</span>
                            )}

                            {onReroll && (
                                <button
                                    className="reroll-btn"
                                    onClick={(e) => { e.stopPropagation(); onReroll(type); }}
                                    title="Xin quẻ mới (tốn 10 linh thạch)"
                                >
                                    🔄 Xin lại
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QueCard;
