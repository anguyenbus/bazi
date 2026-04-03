import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import TypewriterEffect from './TypewriterEffect';
import Toast from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import { API_CONFIG } from '../../config/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateUtils';
import ConsultationHistoryContainer from '../ConsultationHistory/ConsultationHistoryContainer';

const ConsultantPage = ({ userData }) => {
    const { user, token, isAuthenticated, refreshUser, logout } = useAuth();
    const navigate = useNavigate();
    const answerRef = useRef(null);
    const [step, setStep] = useState(1); // 1: Themes, 2: Questions, 3: Answer, 4: History
    const [themes, setThemes] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedPersona, setSelectedPersona] = useState('huyen_co');
    const [followUps, setFollowUps] = useState([]);
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingStage, setLoadingStage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState(null);
    const [customQuestion, setCustomQuestion] = useState('');
    const [showCreditRequest, setShowCreditRequest] = useState(false);
    const [insufficientInfo, setInsufficientInfo] = useState(null);
    const [requestingCredits, setRequestingCredits] = useState(false);
    const [hasPendingRequest, setHasPendingRequest] = useState(false);
    const [questionPage, setQuestionPage] = useState(1);
    const [partnerData, setPartnerData] = useState(null);
    const QUESTIONS_PER_PAGE = 15;

    const API_BASE = API_CONFIG.CONSULTANT;
    const API_AUTH = API_CONFIG.AUTH;

    const location = useLocation();

    // Check for pending question from homepage suggestions (stored in localStorage)
    useEffect(() => {
        const pendingQuestionRaw = localStorage.getItem('pending_question');
        if (pendingQuestionRaw) {
            try {
                const pendingQuestion = JSON.parse(pendingQuestionRaw);
                // Only process if it's recent (within 30 seconds)
                if (Date.now() - pendingQuestion.timestamp < 30000) {
                    // Clear it immediately to prevent re-triggering
                    localStorage.removeItem('pending_question');

                    // Set the persona if provided
                    if (pendingQuestion.persona) {
                        setSelectedPersona(pendingQuestion.persona);
                    }

                    // Delay to ensure component is ready
                    setTimeout(() => {
                        setCustomQuestion(pendingQuestion.text);
                        setSelectedQuestion({ id: 'custom', text: pendingQuestion.text });
                        askQuestion('custom', pendingQuestion.text);
                    }, 800);
                } else {
                    // Remove stale pending question
                    localStorage.removeItem('pending_question');
                }
            } catch (e) {
                localStorage.removeItem('pending_question');
            }
        }
    }, [isAuthenticated]);

    // Handle prefilled question from ComprehensiveInterpretation
    useEffect(() => {
        if (location.state?.prefilledQuestion && location.state?.fromComprehensive) {
            const question = location.state.prefilledQuestion;
            console.log('[Consultant] Received prefilled question:', question);

            // Set the custom question and prepare to ask
            setCustomQuestion(question);
            setSelectedQuestion({ id: 'custom', text: question });

            // Auto-trigger if authenticated
            if (isAuthenticated) {
                if (location.state?.partnerData) {
                    setPartnerData(location.state.partnerData);
                }
                setTimeout(() => {
                    askQuestion('custom', question);
                }, 500);
            }

            // Clear the state to prevent re-triggering without direct DOM manipulation
            const { prefilledQuestion, fromComprehensive, ...remainingState } = location.state || {};
            navigate(location.pathname, { replace: true, state: remainingState });

        }
    }, [location.state, isAuthenticated]);

    const fetchHistory = () => {
        setStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle view history request from header dropdown
    useEffect(() => {
        if (location.state?.view === 'history') {
            fetchHistory();
            // Clear the state
            const { view, ...remainingState } = location.state || {};
            navigate(location.pathname, { replace: true, state: remainingState });
        }
    }, [location.state, isAuthenticated]);


    // Fetch Themes on mount
    useEffect(() => {
        fetch(`${API_BASE}/themes`)
            .then(res => res.json())
            .then(data => setThemes(data))
            .catch(err => console.error('Error fetching themes:', err));
    }, []);


    // Fetch Questions when theme changes
    useEffect(() => {
        if (selectedTheme) {
            setLoading(true);
            fetch(`${API_BASE}/questions/${selectedTheme.id}`)
                .then(res => res.json())
                .then(data => {
                    setQuestions(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching questions:', err);
                    setLoading(false);
                });
        }
    }, [selectedTheme]);

    const handleSelectTheme = (theme) => {
        setSelectedTheme(theme);
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectQuestion = async (question) => {
        setSelectedQuestion(question);
        await askQuestion(question.id, question.text);
    };

    const handleCustomQuestion = async () => {
        if (!customQuestion.trim()) {
            setToast({ message: 'Vui lòng nhập câu hỏi', type: 'warning' });
            return;
        }
        setSelectedQuestion({ id: 'custom', text: customQuestion });
        await askQuestion(customQuestion, customQuestion);
    };

    const askQuestion = async (questionId, questionText) => {
        setLoading(true);
        setLoadingStage(0);
        setAnswer(null);
        setFollowUps([]);
        setStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const stageTimer = setInterval(() => {
            setLoadingStage(prev => (prev < 3 ? prev + 1 : prev));
        }, 1500);

        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            // Only add authorization if user is authenticated
            if (isAuthenticated && token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_BASE}/ask`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    ...userData,
                    partnerData: partnerData, // Include partner if available
                    questionId: questionId,
                    questionText: questionText,
                    useAI: true,
                    persona: selectedPersona
                })
            });
            const data = await response.json();

            if (response.status === 402) {
                // Not enough credits - show request modal
                clearInterval(stageTimer);
                setInsufficientInfo({
                    required: data.credits_required,
                    current: data.credits_current
                });
                setShowCreditRequest(true);
                checkPendingRequest();
                setStep(2);
                return;
            }

            if (response.status === 401) {
                logout();
                setToast({ message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại', type: 'error' });
                return;
            }

            if (data.error) throw new Error(data.message || data.error);
            clearInterval(stageTimer);
            setAnswer(data.answer);
            setFollowUps(data.followUps || []);
            refreshUser();

            // Auto-scroll to answer
            setTimeout(() => {
                answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        } catch (err) {
            clearInterval(stageTimer);
            setToast({ message: err.message, type: 'error' });
            setStep(2);
        } finally {
            setLoading(false);
        }
    };

    const checkPendingRequest = async () => {
        try {
            const res = await fetch(`${API_AUTH}/pending-request`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setHasPendingRequest(data.hasPending);
        } catch (err) {
            console.error('Error checking pending request:', err);
        }
    };

    const handleRequestCredits = async () => {
        setRequestingCredits(true);
        try {
            const res = await fetch(`${API_AUTH}/request-credits`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setToast({ message: data.message, type: 'success' });
            setHasPendingRequest(true);
            setShowCreditRequest(false);
        } catch (err) {
            setToast({ message: err.message, type: 'error' });
        } finally {
            setRequestingCredits(false);
        }
    };



    const handleFollowUpClick = (qText) => {
        setCustomQuestion(qText);
        setSelectedQuestion({ id: 'custom', text: qText });
        askQuestion(qText, qText);
    };

    const personas = [
        {
            id: 'huyen_co',
            name: 'Thầy Huyền Cơ Bát Tự',
            icon: '🧙‍♂️',
            title: 'Bậc Thầy Bát Tự',
            desc: '35 năm kinh nghiệm, nhân văn, uyên bác.'
        },
        {
            id: 'menh_meo',
            name: 'Thầy Mệnh Mèo GenZ',
            icon: '🐱',
            title: 'GenZ Tư Vấn Mệnh',
            desc: 'Hài hước, cực viral, chuyên gia pressing vận mệnh.'
        }
    ];

    const currentPersona = personas.find(p => p.id === selectedPersona) || personas[0];

    const filteredQuestions = questions.filter(q =>
        q.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic for questions
    const totalQuestionPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
    const questionStartIdx = (questionPage - 1) * QUESTIONS_PER_PAGE;
    const paginatedQuestions = filteredQuestions.slice(questionStartIdx, questionStartIdx + QUESTIONS_PER_PAGE);

    // Reset page when search or theme changes
    useEffect(() => {
        setQuestionPage(1);
    }, [searchQuery, selectedTheme]);

    return (
        <div className="consultant-container fade-in">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Credit Request Modal */}
            {showCreditRequest && (
                <div className="credit-request-modal-overlay" onClick={() => setShowCreditRequest(false)}>
                    <div className="credit-request-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowCreditRequest(false)}>✕</button>
                        <div className="credit-warning-icon">💎</div>
                        <h3>Không đủ Linh Thạch</h3>
                        <div className="credit-info">
                            <div className="credit-row">
                                <span>Cần:</span>
                                <span className="credit-required">{insufficientInfo?.required}</span>
                            </div>
                            <div className="credit-row">
                                <span>Hiện có:</span>
                                <span className="credit-current">{insufficientInfo?.current}</span>
                            </div>
                        </div>

                        {hasPendingRequest ? (
                            <div className="pending-message">
                                <span>⏳</span>
                                <p>Bạn đã gửi yêu cầu. Vui lòng chờ Admin phê duyệt.</p>
                            </div>
                        ) : (
                            <>
                                <p className="request-desc">Yêu cầu thêm 100 Linh Thạch từ Admin</p>
                                <button
                                    className="btn-request-credits"
                                    onClick={handleRequestCredits}
                                    disabled={requestingCredits}
                                >
                                    {requestingCredits ? 'Đang gửi...' : '📩 Gửi yêu cầu'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Breadcrumb / Progress */}
            <div className="consult-header glass-card">
                <div className="breadcrumb">
                    <span className={step >= 1 && step <= 3 ? 'active' : ''} onClick={() => setStep(1)}>1. CHỦ ĐỀ</span>
                    <span className="separator">/</span>
                    <span className={step >= 2 && step <= 3 ? 'active' : ''} onClick={() => step > 2 && setStep(2)}>2. CÂU HỎI</span>
                    <span className="separator">/</span>
                    <span className={step === 3 ? 'active' : ''}>3. TƯ VẤN</span>
                </div>
                <div className="header-right">
                    {selectedTheme && step > 1 && step <= 3 && (
                        <div className="current-theme-badge">
                            {selectedTheme.icon} {selectedTheme.name}
                        </div>
                    )}
                    {isAuthenticated && (
                        <button
                            className={`btn-history ${step === 4 ? 'active' : ''}`}
                            onClick={fetchHistory}
                            title="Xem lịch sử câu hỏi"
                        >
                            📜 Lịch sử
                        </button>
                    )}
                </div>
            </div>

            {/* Step 1: Theme Selection */}
            {step === 1 && (
                <div className="consult-welcome-intro fade-in">
                    <h2 className="mystical-welcome-text">
                        Hãy chọn câu hỏi về cuộc đời, Huyền cơ Bát tự sẽ giúp bạn giải đáp mọi thứ.
                    </h2>
                </div>
            )}

            {/* Step 1: Theme Selection Grid */}
            {step === 1 && (
                <div className="themes-grid">
                    {themes.map(theme => (
                        <div
                            key={theme.id}
                            className="theme-card glass-card hover-lift"
                            onClick={() => handleSelectTheme(theme)}
                        >
                            <span className="theme-icon">{theme.icon}</span>
                            <h3>{theme.name}</h3>
                            <p>100 câu hỏi chuyên sâu</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Step 2: Question & Persona Selection */}
            {step === 2 && (
                <div className="questions-area glass-card">
                    {/* Persona Selector */}
                    <div className="persona-selector-section">
                        <h3 className="section-title">✨ Chọn Thầy Luận Giải</h3>
                        <div className="persona-grid">
                            {personas.map(p => (
                                <div
                                    key={p.id}
                                    className={`persona-card ${selectedPersona === p.id ? 'active' : ''}`}
                                    onClick={() => setSelectedPersona(p.id)}
                                >
                                    <div className="persona-icon-circle">{p.icon}</div>
                                    <div className="persona-info">
                                        <h4 className="persona-name">{p.name}</h4>
                                        <p className="persona-desc">{p.desc}</p>
                                    </div>
                                    {selectedPersona === p.id && <div className="selected-check">✓</div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="section-divider"></div>

                    {/* Custom Question Form - First */}
                    <div className="custom-question-section top">
                        <h3 className="custom-title">
                            {currentPersona.icon} Hỏi {currentPersona.name}
                            <span className="credit-badge custom">💎 25</span>
                        </h3>
                        <div className="custom-question-form">
                            <textarea
                                className="glass-input custom-textarea"
                                placeholder="Nhập câu hỏi bạn muốn hỏi về vận mệnh, công danh, tình duyên, sức khỏe..."
                                value={customQuestion}
                                onChange={(e) => setCustomQuestion(e.target.value)}
                                rows={3}
                            />
                            <button
                                className="btn-ask-custom"
                                onClick={handleCustomQuestion}
                                disabled={!customQuestion.trim()}
                            >
                                🙏 Xin {currentPersona.name} Luận Giải
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="section-divider">
                        <span>Hoặc chọn câu hỏi có sẵn <span className="credit-badge predefined">💎 10</span></span>
                    </div>

                    {/* Search and Questions List */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Tìm kiếm câu hỏi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="glass-input"
                        />
                    </div>
                    <div className="questions-list">
                        {loading ? (
                            <div className="loader">Đang tải danh sách câu hỏi...</div>
                        ) : paginatedQuestions.length > 0 ? (
                            <>
                                {paginatedQuestions.map(q => (
                                    <div
                                        key={q.id}
                                        className="question-item"
                                        onClick={() => handleSelectQuestion(q)}
                                    >
                                        <span className="q-bullet">🔹</span>
                                        {q.text}
                                    </div>
                                ))}
                                {/* Pagination Controls */}
                                {totalQuestionPages > 1 && (
                                    <div className="consultant-pagination">
                                        <button
                                            className="pagination-btn"
                                            onClick={() => setQuestionPage(p => Math.max(1, p - 1))}
                                            disabled={questionPage === 1}
                                        >
                                            ← Trước
                                        </button>
                                        <span className="pagination-info">
                                            Trang {questionPage}/{totalQuestionPages} ({filteredQuestions.length} câu hỏi)
                                        </span>
                                        <button
                                            className="pagination-btn"
                                            onClick={() => setQuestionPage(p => Math.min(totalQuestionPages, p + 1))}
                                            disabled={questionPage === totalQuestionPages}
                                        >
                                            Sau →
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="empty-state">Không tìm thấy câu hỏi phù hợp.</div>
                        )}
                    </div>
                </div>
            )}

            {/* Step 3: Answer Area */}
            {step === 3 && (
                <div className="answer-area glass-card" ref={answerRef}>
                    <div className="asked-question">
                        <strong>Câu hỏi:</strong> {selectedQuestion?.text}
                    </div>
                    <div className="answer-content">
                        {loading ? (
                            <div className="ai-loading-progress">
                                <div className="ai-loading-icon">{currentPersona.icon}</div>
                                <div className="ai-loading-title">{currentPersona.name} đang luận giải lá số</div>
                                <div className="ai-progress-bar">
                                    <div className="ai-progress-fill" style={{ width: `${(loadingStage + 1) * 25}%` }}></div>
                                </div>
                                <div className="ai-loading-steps">
                                    <div className={`ai-step ${loadingStage >= 0 ? 'active' : ''} ${loadingStage > 0 ? 'done' : ''}`}>
                                        <span className="step-icon">{loadingStage > 0 ? '✓' : '1'}</span>
                                        <span className="step-text">Tính toán Tứ Trụ</span>
                                    </div>
                                    <div className={`ai-step ${loadingStage >= 1 ? 'active' : ''} ${loadingStage > 1 ? 'done' : ''}`}>
                                        <span className="step-icon">{loadingStage > 1 ? '✓' : '2'}</span>
                                        <span className="step-text">Phân tích Thập Thần</span>
                                    </div>
                                    <div className={`ai-step ${loadingStage >= 2 ? 'active' : ''} ${loadingStage > 2 ? 'done' : ''}`}>
                                        <span className="step-icon">{loadingStage > 2 ? '✓' : '3'}</span>
                                        <span className="step-text">Xem xét Đại Vận</span>
                                    </div>
                                    <div className={`ai-step ${loadingStage >= 3 ? 'active' : ''}`}>
                                        <span className="step-icon">4</span>
                                        <span className="step-text">Thầy soạn lời khuyên</span>
                                    </div>
                                </div>
                            </div>
                        ) : answer ? (
                            <div className="paragraphs">
                                {(Array.isArray(answer) ? answer : (typeof answer === 'string' ? answer.split('\n\n') : [])).map((para, idx) => (
                                    <div key={idx} className={`paragraph-box ${selectedPersona}`}>
                                        <TypewriterEffect text={para} speed={15} />
                                    </div>
                                ))}

                                {followUps.length > 0 && (
                                    <div className="follow-up-section fade-in">
                                        <h4 className="follow-up-title pink-gradient-text">
                                            Gợi ý từ {currentPersona.name}: <span className="credit-badge follow-up">💎 25/câu</span>
                                        </h4>
                                        <div className="follow-up-items">
                                            {followUps.map((q, qidx) => (
                                                <button
                                                    key={qidx}
                                                    className="follow-up-btn"
                                                    onClick={() => handleFollowUpClick(q)}
                                                >
                                                    ✨ {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Custom Question Form - After Follow-ups */}
                                <div className="custom-question-inline fade-in">
                                    <h4 className="custom-inline-title">
                                        💬 Hoặc hỏi câu hỏi của riêng bạn: <span className="credit-badge custom">💎 25</span>
                                    </h4>
                                    <div className="custom-inline-form">
                                        <textarea
                                            className="custom-inline-textarea"
                                            placeholder={`Nhập câu hỏi bạn muốn hỏi ${currentPersona.name}...`}
                                            value={customQuestion}
                                            onChange={(e) => setCustomQuestion(e.target.value)}
                                            rows={2}
                                        />
                                        <button
                                            className="custom-inline-btn"
                                            onClick={handleCustomQuestion}
                                            disabled={!customQuestion.trim() || loading}
                                        >
                                            🙏 Xin Thầy Luận Giải
                                        </button>
                                    </div>
                                </div>

                                <div className="answer-footer">
                                    <button className="premium-button small" onClick={() => setStep(2)}>HỎI CÂU KHÁC</button>
                                </div>
                            </div>
                        ) : (
                            <div className="error-state">Không thể lấy được lời giải mẫn tiệp.</div>
                        )}
                    </div>
                </div>
            )}

            {/* Step 4: History Area */}
            {step === 4 && (
                <div className="history-area-new glass-card">
                    <ConsultationHistoryContainer onBack={() => setStep(1)} />
                </div>
            )}
        </div>
    );
};

export default ConsultantPage;
