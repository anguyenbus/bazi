import React, { useState, useEffect } from 'react';
import { getRandomSample } from '../data/sampleQA';

const SampleShowcase = () => {
    const [currentSample, setCurrentSample] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Load initial sample
        setCurrentSample(getRandomSample());

        // Auto-rotate every 10 seconds
        const interval = setInterval(() => {
            changeSample();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const changeSample = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSample(getRandomSample());
            setIsTransitioning(false);
        }, 300);
    };

    if (!currentSample) return null;

    const topicEmoji = {
        'Sự nghiệp': '💼',
        'Tình duyên': '💕',
        'Tài lộc': '💰',
        'Sức khỏe': '🏥',
        'Gia đạo': '🏠',
        'Con cái': '👶',
        'Học hành': '📚',
        'Đầu tư': '📈',
        'Hôn nhân': '💍'
    };

    return (
        <div className="sample-showcase glass-card">
            <div className="sample-header">
                <h3 className="sample-title">
                    <span className="sample-icon">🏮</span>
                    Huyền cơ Bát tự - luận giải mọi thứ cuộc đời
                </h3>
                <button
                    className="sample-next-btn"
                    onClick={changeSample}
                    disabled={isTransitioning}
                    title="Xem mẫu khác"
                >
                    ↻ Mẫu khác
                </button>
            </div>

            <div className={`sample-content ${isTransitioning ? 'fading' : ''}`}>
                <div className="sample-question-box">
                    <span className="sample-topic-badge">
                        {topicEmoji[currentSample.topic] || '📋'} {currentSample.topic}
                    </span>
                    <p className="sample-question">"{currentSample.question}"</p>
                    <div className="sample-birth-info">
                        <span>🗓️ {currentSample.birthInfo.day}/{currentSample.birthInfo.month}/{currentSample.birthInfo.year}</span>
                        <span>⏰ {currentSample.birthInfo.hour}h</span>
                        <span>👤 {currentSample.birthInfo.gender}</span>
                        <span>🎴 {currentSample.dayMaster}</span>
                    </div>
                </div>

                <div className="sample-answer-box">
                    <div className="sample-answer-header">
                        <span className="master-avatar">🧙‍♂️</span>
                        <span className="master-name">Thầy Huyền Cơ Bát Tự</span>
                    </div>
                    <p className="sample-answer">{currentSample.answer}</p>
                </div>
            </div>

            <p className="sample-cta">
                ✨ Hãy nhập thông tin của bạn để nhận lời luận giải cá nhân hóa!
            </p>
        </div>
    );
};

export default SampleShowcase;
