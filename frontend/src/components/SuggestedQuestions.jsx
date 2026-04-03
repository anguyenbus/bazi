import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../config/api';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../services/apiClient';

const SuggestedQuestions = () => {
    const { user, token, isAuthenticated } = useAuth();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    // Default suggestions for unauthenticated users or users without history
    const defaultSuggestions = [
        { text: "Năm nay tôi có cơ hội thăng tiến trong sự nghiệp không?", persona: "huyen_co" },
        { text: "Tình duyên của tôi trong năm này sẽ như thế nào?", persona: "huyen_co" },
        { text: "Hướng nhà nào tốt nhất cho tôi để an cư lập nghiệp?", persona: "huyen_co" },
        { text: "Vận mệnh tài chính của tôi năm nay có khởi sắc không?", persona: "huyen_co" }
    ];

    useEffect(() => {
        if (isAuthenticated && token) {
            fetchSuggestions();
        } else {
            // Use default suggestions for unauthenticated users
            setSuggestions(defaultSuggestions);
        }
    }, [isAuthenticated, token]);

    const fetchSuggestions = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_CONFIG.AUTH}/suggestions?limit=3`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok && data.success && Array.isArray(data.suggestions)) {
                const allQuestions = data.suggestions.flatMap(s =>
                    // Ensure s.questions is also an array
                    Array.isArray(s.questions) ? s.questions.map(q => ({
                        text: q,
                        persona: s.persona,
                        createdAt: s.createdAt,
                        originalQuestion: s.originalQuestion
                    })) : []
                ).slice(0, 4);
                setSuggestions(allQuestions);
            }
        } catch (err) {
            console.error('Failed to fetch suggestions:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestClick = async (questionText, persona) => {
        // Check if user has saved bazi_data
        if (!user?.bazi_data) {
            alert('Vui lòng nhập thông tin ngày sinh trước khi sử dụng gợi ý.');
            return;
        }

        setProcessing(true);
        try {
            // Prepare params from user's saved bazi_data
            const params = {
                name: user.bazi_data.name || user.name || '',
                gender: user.bazi_data.gender || 'Nam',
                year: user.bazi_data.year,
                month: user.bazi_data.month,
                day: user.bazi_data.day,
                hour: user.bazi_data.hour || 10,
                minute: user.bazi_data.minute || 0,
                calendar: user.bazi_data.calendar || 'solar'
            };

            // Call API directly - bypass React state entirely to avoid redirect race
            const result = await apiClient.analyze(params);

            if (result) {
                // Manually store in sessionStorage so App.jsx picks it up
                sessionStorage.setItem('bazi_data', JSON.stringify(result));
                sessionStorage.setItem('bazi_params', JSON.stringify(params));

                // Store pending question for ConsultantPage
                localStorage.setItem('pending_question', JSON.stringify({
                    text: questionText,
                    persona: persona,
                    timestamp: Date.now()
                }));

                // Force page reload to /consultant to ensure clean state
                window.location.href = '/tuvan';
            }
        } catch (err) {
            console.error('Failed to analyze:', err);
            alert('Không thể phân tích lá số. Vui lòng thử lại.');
        } finally {
            setProcessing(false);
        }
    };

    if (suggestions.length === 0 && !loading) return null;

    return (
        <div className="suggested-questions-widget glass-card">
            <h3 className="widget-title">
                <span className="sparkle">✨</span> Gợi ý dành cho bạn
            </h3>
            <p className="widget-desc">Dựa trên lá số và các cuộc tư vấn trước đây của bạn</p>

            {processing && (
                <div className="suggestions-loader">Đang phân tích lá số...</div>
            )}

            <div className="suggestions-grid">
                {loading ? (
                    <div className="suggestions-loader">Đang tìm gợi ý...</div>
                ) : (
                    suggestions.map((suggestion, idx) => (
                        <div
                            key={idx}
                            className={`suggestion-item-card hover-lift ${processing ? 'disabled' : ''}`}
                            onClick={() => !processing && handleSuggestClick(suggestion.text, suggestion.persona)}
                        >
                            <div className="suggestion-icon">🏮</div>
                            <div className="suggestion-body">
                                <p className="suggestion-text">{suggestion.text}</p>
                                <span className="suggestion-meta">
                                    Từ Thầy {suggestion.persona === 'menh_meo' ? 'Mệnh Mèo' : 'Huyền Cơ'}
                                </span>
                            </div>
                            <div className="suggestion-arrow">→</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SuggestedQuestions;
