import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { API_CONFIG } from '../../config/api';
import './QuickDivination.css';

const TOPICS = [
    { id: 'love', label: 'Tình Duyên', icon: '❤️' },
    { id: 'wealth', label: 'Tài Lộc', icon: '💰' },
    { id: 'safety', label: 'Tai Tinh', icon: '🛡️' }
];

const QuickDivination = () => {
    const [selectedTopic, setSelectedTopic] = useState('love');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showFullAnalysis, setShowFullAnalysis] = useState(false);
    const [error, setError] = useState(null);

    const handleCast = async () => {
        setIsAnimating(true);
        setError(null);
        setShowFullAnalysis(false);
        // We don't clear result immediately to allow transition later

        const startTime = Date.now();

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/que/quick-random?topic=${selectedTopic}`);

            if (!response.ok) {
                throw new Error('Không thể kết nối với thần linh, vui lòng thử lại.');
            }

            const data = await response.json();

            // Calculate remaining time to fulfill 5 seconds
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 5000 - elapsed);

            await new Promise(resolve => setTimeout(resolve, remaining));

            setResult(data);
        } catch (err) {
            console.error('Divination error:', err);
            setError(err.message || 'Có lỗi xảy ra.');
            setIsAnimating(false);
        } finally {
            setIsAnimating(false);
        }
    };

    const getQualityClass = (quality) => {
        const q = quality?.toLowerCase() || '';
        if (q.includes('cát')) return 'quality-good';
        if (q.includes('bình')) return 'quality-neutral';
        return 'quality-bad';
    };

    return (
        <div className="quick-divination-container glass-card">
            {isAnimating && createPortal(
                <div className="animation-overlay">
                    <div className="mystical-sphere">
                        <div className="sphere-ring ring-1"></div>
                        <div className="sphere-ring ring-2"></div>
                        <div className="sphere-ring ring-3"></div>
                        <div className="sphere-ring ring-4"></div>
                        <div className="sphere-ring ring-5"></div>
                        <div className="mystical-core"></div>
                    </div>
                    <div className="mystical-text">GIAO THOA NĂNG LƯỢNG...</div>
                </div>,
                document.body
            )}

            <div className="quick-header">
                <h3 className="quick-title">✨ Gieo Quẻ Nhanh</h3>
                <p className="quick-subtitle">Kết nối ngẫu nhiên với thông điệp vũ trụ</p>
            </div>

            <div className="quick-topics">
                {TOPICS.map(topic => (
                    <button
                        key={topic.id}
                        className={`topic-btn ${selectedTopic === topic.id ? 'active' : ''}`}
                        onClick={() => setSelectedTopic(topic.id)}
                    >
                        <span>{topic.icon}</span>
                        {topic.label}
                    </button>
                ))}
            </div>

            <div className="quick-action">
                <button
                    className="cast-btn"
                    onClick={handleCast}
                    disabled={isAnimating}
                >
                    {isAnimating ? 'ĐANG KẾT NỐI...' : 'Gieo Quẻ Ngay 🎲'}
                </button>
                <p className="cast-limit-advice">
                    ⚠️ Mệnh chủ lưu ý: Mỗi ngày chỉ nên gieo quẻ tối đa 3 lần với lòng thành tâm.
                    Gieo nhiều lần sẽ làm tán khí, mất đi sự linh ứng.
                </p>
            </div>

            {error && (
                <div className="error-toast" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    ⚠️ {error}
                </div>
            )}

            {result && (
                <div className="quick-result">
                    <div className="hex-header">
                        <div className="hex-symbol">{result.symbol}</div>
                        <div className="hex-info">
                            <h3>{result.name}</h3>
                            <div className="hex-meaning">{result.meaning}</div>
                            <span className={`hex-quality ${getQualityClass(result.quality)}`}>
                                {result.quality}
                            </span>
                        </div>
                    </div>

                    {!showFullAnalysis ? (
                        <div className="analysis-toggle-container">
                            <button
                                className="toggle-analysis-btn"
                                onClick={() => setShowFullAnalysis(true)}
                            >
                                Xem Luận Giải Chi Tiết ✨
                            </button>
                        </div>
                    ) : (
                        <div className="full-analysis-content">
                            <div className="interpretation-content">
                                {/* Use Markdown for Rich Content */}
                                {result.ai_analysis ? (
                                    <div className="markdown-body quick-markdown">
                                        <ReactMarkdown>{result.ai_analysis}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <>
                                        <h4>Luận giải về {result.topic}:</h4>
                                        <p className="interpretation-text">{result.interpretation}</p>
                                    </>
                                )}

                                {!result.ai_analysis && result.advice && (
                                    <div className="quick-advice">
                                        <p><strong>Lời khuyên:</strong> {result.advice.positive?.[0] || 'Hãy kiên nhẫn.'}</p>
                                    </div>
                                )}
                            </div>

                            <div className="quick-disclaimer">
                                <span className="disclaimer-icon">ℹ️</span>
                                <p className="disclaimer-text">{result.disclaimer}</p>
                            </div>

                            <div className="analysis-toggle-container">
                                <button
                                    className="toggle-analysis-btn collapse"
                                    onClick={() => setShowFullAnalysis(false)}
                                >
                                    Thu gọn luận giải 🔼
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuickDivination;
