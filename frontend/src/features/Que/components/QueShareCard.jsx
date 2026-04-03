import React, { forwardRef } from 'react';
import GuaSymbol from './GuaSymbol';

/**
 * Share Card component - optimized for image capture
 * Shows hexagram overview/meaning as summary
 */
const QueShareCard = forwardRef(({ data, topic }, ref) => {
    if (!data) return null;

    const getQualityClass = (quality) => {
        if (['Đại Cát', 'Cát', 'Tiểu Cát'].includes(quality)) return 'quality-good';
        if (['Bình'].includes(quality)) return 'quality-neutral';
        return 'quality-bad';
    };

    const getQualityColor = (quality) => {
        const cls = getQualityClass(quality);
        if (cls === 'quality-good') return '#2ecc71';
        if (cls === 'quality-neutral') return '#ffc107';
        return '#e74c3c';
    };

    const today = new Date().toLocaleDateString('vi-VN', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    // Get overview summary from interpretation data
    const getOverview = () => {
        // Try to get overview from interpretation object first
        if (data.interpretation?.overview) {
            return data.interpretation.overview;
        }
        // Fallback to meaning
        return data.meaning || 'Quẻ này mang năng lượng phù hợp với vận trình của bạn.';
    };

    // Get advice from interpretation
    const getAdvice = () => {
        const advice = data.interpretation?.advice;
        if (!advice) return null;

        const positives = advice.positive || [];
        const cautions = advice.caution || [];

        return { positives, cautions };
    };

    const overview = getOverview();
    const advice = getAdvice();

    return (
        <div
            ref={ref}
            className="share-card-container"
            style={{
                position: 'absolute',
                left: '-9999px',
                width: '420px',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #1a1510 0%, #2c241b 50%, #1a1510 100%)',
                borderRadius: '16px',
                border: '2px solid #e2c044',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                fontFamily: 'inherit'
            }}
        >
            {/* Compact Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                paddingBottom: '0.8rem',
                borderBottom: '1px solid rgba(226, 192, 68, 0.3)'
            }}>
                <h3 style={{
                    color: '#e2c044',
                    margin: 0,
                    fontSize: '1rem',
                    letterSpacing: '1px'
                }}>
                    🔮 HUYỀN CƠ BÁT TỰ
                </h3>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
                    {today}
                </span>
            </div>

            {/* Main Info - Horizontal Layout */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem',
                alignItems: 'center'
            }}>
                {/* Left: Symbol */}
                <div style={{ flexShrink: 0 }}>
                    <GuaSymbol symbol={data.symbol} size={55} />
                </div>

                {/* Right: Name, Meaning, Quality */}
                <div style={{ flex: 1 }}>
                    <h2 style={{
                        color: '#fff',
                        margin: '0 0 0.3rem 0',
                        fontSize: '1.25rem'
                    }}>
                        {data.name}
                    </h2>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.65)',
                        margin: '0 0 0.5rem 0',
                        fontStyle: 'italic',
                        fontSize: '0.8rem'
                    }}>
                        {data.meaning}
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.2rem 0.7rem',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            background: `rgba(${getQualityClass(data.quality) === 'quality-good' ? '46, 204, 113' : getQualityClass(data.quality) === 'quality-neutral' ? '255, 193, 7' : '231, 76, 60'}, 0.2)`,
                            color: getQualityColor(data.quality),
                            border: `1px solid ${getQualityColor(data.quality)}40`
                        }}>
                            Vận Thế: {data.quality}
                        </span>
                        {topic && topic !== 'Chung' && (
                            <span style={{
                                color: '#e2c044',
                                fontSize: '0.7rem',
                                padding: '0.15rem 0.5rem',
                                background: 'rgba(226, 192, 68, 0.15)',
                                borderRadius: '4px'
                            }}>
                                🎯 {topic}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Overview Section */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '0.9rem',
                marginBottom: '0.8rem',
                border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
                <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    margin: 0,
                    fontSize: '0.85rem',
                    lineHeight: '1.6',
                    textAlign: 'center'
                }}>
                    {overview}
                </p>
            </div>

            {/* Advice Section */}
            {advice && (advice.positives.length > 0 || advice.cautions.length > 0) && (
                <div style={{
                    display: 'flex',
                    gap: '0.8rem',
                    marginBottom: '0.8rem',
                    fontSize: '0.75rem'
                }}>
                    {advice.positives.length > 0 && (
                        <div style={{ flex: 1, color: '#2ecc71' }}>
                            <div style={{ marginBottom: '0.3rem', fontWeight: 'bold' }}>✅ Nên</div>
                            <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                                {advice.positives.join(', ')}
                            </div>
                        </div>
                    )}
                    {advice.cautions.length > 0 && (
                        <div style={{ flex: 1, color: '#e74c3c' }}>
                            <div style={{ marginBottom: '0.3rem', fontWeight: 'bold' }}>⚠️ Tránh</div>
                            <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                                {advice.cautions.join(', ')}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Footer */}
            <div style={{
                textAlign: 'center',
                paddingTop: '0.5rem',
                borderTop: '1px solid rgba(226, 192, 68, 0.2)'
            }}>
                <p style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    margin: 0,
                    fontSize: '0.7rem'
                }}>
                    huyencobattu.com • Huyền Cơ Luận Giải
                </p>
            </div>
        </div>
    );
});

QueShareCard.displayName = 'QueShareCard';

export default QueShareCard;
