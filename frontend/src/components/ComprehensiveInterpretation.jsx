import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_CONFIG } from '../config/api';

const ComprehensiveInterpretation = ({ data }) => {
    const navigate = useNavigate();
    const { token, user, isAuthenticated, refreshUser } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState('huyen_co');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [followUpQuestions, setFollowUpQuestions] = useState([]);
    const [error, setError] = useState(null);
    const [showFAB, setShowFAB] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [randomSuggestion, setRandomSuggestion] = useState(null);
    const [fabMode, setFabMode] = useState('interpret'); // 'interpret' or 'consult'

    // Toggle FAB mode for new users every 5 seconds
    useEffect(() => {
        if (!randomSuggestion) {
            const interval = setInterval(() => {
                setFabMode(prev => prev === 'interpret' ? 'consult' : 'interpret');
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [randomSuggestion]);

    // Fetch suggestions if authenticated
    useEffect(() => {
        if (isAuthenticated && token) {
            fetch(`${API_CONFIG.AUTH}/suggestions?limit=10`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => {
                    if (res.status === 401) return { suggestions: [] };
                    if (!res.ok) throw new Error('Fetch failed');
                    return res.json();
                })
                .then(data => {
                    const qs = data.suggestions || [];
                    setSuggestions(qs);
                    if (qs.length > 0) {
                        setRandomSuggestion(qs[Math.floor(Math.random() * qs.length)]);
                    }
                })
                .catch(err => console.error('Failed to fetch suggestions:', err));
        }
    }, [isAuthenticated, token]);

    // Monitor scroll for Floating Action Button
    useEffect(() => {
        const handleScroll = (e) => {
            const scrollY = e.target === window ? window.scrollY : e.target.scrollTop;
            // Show FAB when scrolled down more than 400px
            if (scrollY > 400) {
                setShowFAB(true);
            } else {
                setShowFAB(false);
            }
        };

        const scrollContainer = document.querySelector('.mobile-content') || window;
        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    const CREDIT_COST = 25;

    const personas = [
        {
            id: 'huyen_co',
            name: 'Thầy Huyền Cơ Bát Tự',
            icon: '🧙‍♂️',
            desc: 'Phong cách cổ kính, uyên thâm, đầy chiêm nghiệm Đông phương.',
            style: 'Trang trọng, dẫn dắt từ triết lý, trích dẫn kinh điển.'
        },
        {
            id: 'menh_meo',
            name: 'Thầy Mệnh Mèo GenZ',
            icon: '🐱',
            desc: 'Hài hước, gần gũi, dùng ngôn ngữ Gen Z để giải thích.',
            style: 'Vui vẻ, dùng từ lóng, ví von đời thường, nhiều emoji.'
        }
    ];

    // Progress steps for loading animation
    const [progressStep, setProgressStep] = useState(0);
    const progressSteps = [
        { icon: '🔮', text: 'Đang đọc Tứ Trụ của bạn...' },
        { icon: '📊', text: 'Phân tích Ngũ Hành và Thập Thần...' },
        { icon: '⭐', text: 'Tra cứu Thần Sát quan trọng...' },
        { icon: '📅', text: 'Tính toán vận hạn theo thời gian...' },
        { icon: '✍️', text: 'Thầy đang viết luận giải cho bạn...' },
        { icon: '🎯', text: 'Đang hoàn thiện gợi ý và lời khuyên...' }
    ];

    // Cycle through progress steps when loading
    useEffect(() => {
        if (!loading) {
            setProgressStep(0);
            return;
        }
        const interval = setInterval(() => {
            setProgressStep(prev => (prev + 1) % progressSteps.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, [loading]);


    const handleGenerate = async () => {
        // Check credits only for authenticated users
        if (isAuthenticated && (user?.credits || 0) < CREDIT_COST) {
            setError(`Không đủ Linh Thạch. Cần ${CREDIT_COST}, hiện có ${user?.credits || 0}`);
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            // Only add authorization if user is authenticated
            if (isAuthenticated && token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_CONFIG.CONSULTANT}/comprehensive`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    chartData: data,
                    persona: selectedPersona
                })
            });

            const responseData = await response.json();

            if (response.status === 402) {
                setError(`Không đủ Linh Thạch. Cần ${responseData.credits_required}, hiện có ${responseData.credits_current}`);
                return;
            }

            if (!response.ok) {
                throw new Error(responseData.error || 'Có lỗi xảy ra');
            }

            setResult(responseData.interpretation);
            setFollowUpQuestions(responseData.followUpQuestions || []);
            if (isAuthenticated) {
                refreshUser(); // Update credit balance
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const currentPersona = personas.find(p => p.id === selectedPersona);

    return (
        <>
            <button
                className="chart-action-btn premium-pulse"
                onClick={() => setShowModal(true)}
                disabled={!data}
            >
                🔮 Luận giải <span className="credit-badge custom">💎 {CREDIT_COST}</span>
            </button>

            {/* Mobile Sticky Header Bar - appears on scroll */}
            {createPortal(
                <div className={`sticky-action-header mobile-only ${showFAB && !showModal ? 'visible' : ''}`}>
                    <button
                        className={`sticky-action-btn ${randomSuggestion ? 'has-suggestion' : ''} ${!randomSuggestion && fabMode === 'consult' ? 'consult-mode' : ''}`}
                        onClick={() => {
                            if (randomSuggestion) {
                                navigate('/tuvan', {
                                    state: {
                                        prefilledQuestion: randomSuggestion,
                                        fromFAB: true
                                    }
                                });
                            } else if (fabMode === 'consult') {
                                navigate('/tuvan');
                            } else {
                                setShowModal(true);
                            }
                        }}
                        disabled={!data && !randomSuggestion}
                    >
                        <span className="sticky-btn-icon">
                            {randomSuggestion ? '💡' : (fabMode === 'consult' ? '💬' : '🔮')}
                        </span>
                        <span className="sticky-btn-text">
                            {randomSuggestion
                                ? randomSuggestion.slice(0, 30) + (randomSuggestion.length > 30 ? '...' : '')
                                : (fabMode === 'consult'
                                    ? 'Tư vấn miễn phí'
                                    : (isAuthenticated ? 'Luận giải' : 'Luận giải tổng thể'))}
                        </span>
                        <span className="sticky-btn-price">💎 {isAuthenticated ? CREDIT_COST : 25}</span>
                    </button>
                </div>,
                document.body
            )}

            {/* Desktop Floating Button - appears on scroll */}
            {createPortal(
                <div className={`desktop-floating-container desktop-only ${showFAB && !showModal ? 'visible' : ''}`}>
                    <button
                        className={`desktop-floating-btn ${randomSuggestion ? 'has-suggestion' : ''} ${!randomSuggestion && fabMode === 'consult' ? 'consult-mode' : ''}`}
                        onClick={() => {
                            if (randomSuggestion) {
                                navigate('/tuvan', {
                                    state: {
                                        prefilledQuestion: randomSuggestion,
                                        fromFAB: true
                                    }
                                });
                            } else if (fabMode === 'consult') {
                                navigate('/tuvan');
                            } else {
                                setShowModal(true);
                            }
                        }}
                        disabled={!data && !randomSuggestion}
                    >
                        <span className="floating-btn-icon">
                            {randomSuggestion ? '💡' : (fabMode === 'consult' ? '💬' : '🔮')}
                        </span>
                        <div className="floating-content">
                            <span className="floating-btn-text">
                                {randomSuggestion
                                    ? "Gợi ý của Thầy"
                                    : (fabMode === 'consult' ? 'Tư vấn chi tiết (miễn phí)' : 'Luận giải tổng thể (miễn phí)')}
                            </span>
                            {!randomSuggestion && <span className="floating-btn-price">💎 {isAuthenticated ? CREDIT_COST : 25}</span>}
                        </div>
                    </button>
                </div>,
                document.body
            )}


            {showModal && (
                <div className="comprehensive-modal-overlay" onClick={() => !loading && setShowModal(false)}>
                    <div className="comprehensive-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => !loading && setShowModal(false)}>✕</button>

                        {!result ? (
                            loading ? (
                                <div className="loading-progress-view">
                                    <div className="loading-animation">
                                        <div className="loading-icon">{progressSteps[progressStep].icon}</div>
                                        <div className="loading-pulse"></div>
                                    </div>
                                    <h2 className="modal-title">{currentPersona.icon} {currentPersona.name} đang xem lá số...</h2>
                                    <p className="loading-text">{progressSteps[progressStep].text}</p>
                                    <div className="loading-steps">
                                        {progressSteps.map((step, idx) => (
                                            <div
                                                key={idx}
                                                className={`step-dot ${idx <= progressStep ? 'active' : ''} ${idx === progressStep ? 'current' : ''}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="loading-hint">Vui lòng chờ giây lát, Thầy đang dùng linh lực để thấu thị vận mệnh của bạn...</p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="modal-title">🔮 Tổng Hợp Luận Giải Lá Số</h2>
                                    <p className="modal-desc">
                                        Toàn bộ thông tin trong lá số của bạn sẽ được tổng hợp thành một bản luận giải
                                        đầy đủ, chi tiết theo phong cách của Thầy bạn chọn.
                                    </p>

                                    <div className="persona-selection">
                                        <h3>Chọn phong cách Thầy:</h3>
                                        <div className="persona-options">
                                            {personas.map(p => (
                                                <div
                                                    key={p.id}
                                                    className={`persona-option ${selectedPersona === p.id ? 'active' : ''}`}
                                                    onClick={() => setSelectedPersona(p.id)}
                                                >
                                                    <div className="persona-icon">{p.icon}</div>
                                                    <div className="persona-details">
                                                        <h4>{p.name}</h4>
                                                        <p>{p.desc}</p>
                                                    </div>
                                                    {selectedPersona === p.id && <div className="check-mark">✓</div>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="cost-info">
                                        <span>Chi phí:</span>
                                        <span className="cost-value">💎 {CREDIT_COST} Linh Thạch</span>
                                        <span className="balance">
                                            (Hiện có: {user?.credits || 0})
                                        </span>
                                    </div>

                                    {error && <div className="error-message">⚠️ {error}</div>}

                                    <div className="modal-actions">
                                        <button
                                            className="btn-cancel"
                                            onClick={() => setShowModal(false)}
                                            disabled={loading}
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            className="btn-generate"
                                            onClick={handleGenerate}
                                            disabled={loading || (isAuthenticated && (user?.credits || 0) < CREDIT_COST)}
                                        >
                                            {loading ? (
                                                <><span className="btn-spinner"></span> Đang xử lý...</>
                                            ) : (
                                                <>{currentPersona.icon} Xin {currentPersona.name} Luận Giải</>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )
                        ) : (

                            <div className="result-view">
                                <h2 className="modal-title">{currentPersona.icon} Luận Giải Từ {currentPersona.name}</h2>
                                <div className="result-content">
                                    {result.split('\n').map((para, idx) => {
                                        const trimmed = para.trim();
                                        if (!trimmed) return null;

                                        // Helper to render inline markdown (bold only)
                                        const renderContent = (text) => {
                                            if (!text) return '';
                                            const parts = text.split(/(\*\*.*?\*\*)/g);
                                            return parts.map((part, i) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                                                }
                                                return part;
                                            });
                                        };

                                        // Skip separator lines (---, ---, ===, etc.)
                                        if (/^[-=_]{2,}$/.test(trimmed)) return null;

                                        // Detect section headings (starts with ** or # or numbered like "1. TITLE")
                                        const isHeading = trimmed.startsWith('**') ||
                                            trimmed.startsWith('#') ||
                                            /^\d+\.\s*[A-ZÀ-Ỹ]/.test(trimmed) ||
                                            /^\*\*\d+\./.test(trimmed);

                                        // Clean up markdown-style formatting
                                        const cleanText = trimmed
                                            .replace(/^\*\*|\*\*$/g, '')
                                            .replace(/^#+\s*/, '')
                                            .replace(/\*\*/g, '');

                                        // Helper to handle question click
                                        const handleQuestionClick = (q) => {
                                            const cleanQ = q.replace(/^\d+\.\s*/, '').replace(/^✨|🔹\s*/, '').trim();
                                            setShowModal(false);
                                            navigate('/tuvan', {
                                                state: {
                                                    prefilledQuestion: cleanQ,
                                                    fromComprehensive: true
                                                }
                                            });
                                        };

                                        // Detect if a paragraph looks like a suggested question (ends with ? and is short)
                                        const looksLikeQuestion = (trimmed.endsWith('?') && trimmed.length < 150) ||
                                            /^\d+\./.test(trimmed) && trimmed.includes('?');

                                        if (looksLikeQuestion) {
                                            return (
                                                <button
                                                    key={idx}
                                                    className="inline-question-btn"
                                                    onClick={() => handleQuestionClick(trimmed)}
                                                >
                                                    <span className="icon">❓</span>
                                                    <span className="text">{renderContent(trimmed.replace(/^\d+\.\s*/, ''))}</span>
                                                    <span className="price">💎 25</span>
                                                </button>
                                            );
                                        }

                                        if (isHeading) {
                                            return (
                                                <div key={idx} className="section-heading">
                                                    ✨ {cleanText}
                                                </div>
                                            );
                                        }

                                        // Detect list items (starts with - or • but has actual content after)
                                        if ((trimmed.startsWith('-') || trimmed.startsWith('•')) && trimmed.length > 2) {
                                            const listContent = trimmed.replace(/^[-•]\s*/, '').trim();
                                            if (listContent && listContent !== '-' && listContent !== '--') {
                                                // If list content is a question
                                                if (listContent.endsWith('?')) {
                                                    return (
                                                        <button
                                                            key={idx}
                                                            className="inline-question-btn list-variant"
                                                            onClick={() => handleQuestionClick(listContent)}
                                                        >
                                                            <span className="icon">🔹</span>
                                                            <span className="text">{renderContent(listContent)}</span>
                                                            <span className="price">💎 25</span>

                                                        </button>
                                                    );
                                                }
                                                return (
                                                    <div key={idx} className="list-item">
                                                        🔹 {renderContent(listContent)}
                                                    </div>
                                                );
                                            }
                                            return null; // Skip empty list items
                                        }

                                        return <p key={idx}>{renderContent(para)}</p>;
                                    })}
                                </div>


                                {/* Follow-up Questions Section */}
                                {followUpQuestions.length > 0 && (
                                    <div className="follow-up-section">
                                        <h4 className="follow-up-title">
                                            💡 {currentPersona.icon} Gợi ý câu hỏi tiếp theo:
                                        </h4>
                                        <div className="follow-up-items">
                                            {followUpQuestions.map((q, qidx) => (
                                                <button
                                                    key={qidx}
                                                    className="follow-up-btn"
                                                    onClick={() => {
                                                        // Navigate to Consultant page with question
                                                        setShowModal(false);
                                                        navigate('/tuvan', {
                                                            state: {
                                                                prefilledQuestion: q,
                                                                fromComprehensive: true
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <span className="question-text">✨ {q}</span>
                                                    <span className="credit-badge custom">💎 25</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="modal-actions">
                                    <button className="btn-cancel" onClick={() => { setResult(null); setFollowUpQuestions([]); setShowModal(false); }}>
                                        Đóng
                                    </button>
                                    <button className="btn-generate" onClick={() => { setResult(null); setFollowUpQuestions([]); }}>
                                        🔄 Tạo lại
                                    </button>
                                </div>
                            </div>

                        )}

                    </div>
                </div>
            )}
        </>
    );
};

export default ComprehensiveInterpretation;
