import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../components/Toast';
import TypewriterEffect from '../Consultant/TypewriterEffect';
import ConsultationHistoryContainer from '../ConsultationHistory/ConsultationHistoryContainer';
import './MatchingPage.css';

/**
 * PersonInputForm - Input form for a single person's data
 */
const PersonInputForm = ({ label, person, onChange, color, readOnly = false }) => {
    const currentYear = new Date().getFullYear();

    if (readOnly) {
        return (
            <div className={`person-input-card glass-card ${color} read-only`}>
                <h3 className="person-label">{label}</h3>
                <div className="read-only-info">
                    <p className="ro-name"><strong>{person.name || 'Mệnh chủ'}</strong></p>
                    <p className="ro-details">
                        {person.day}/{person.month}/{person.year} - {person.hour}h ({person.gender})
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`person-input-card glass-card ${color}`}>
            <h3 className="person-label">{label}</h3>

            <div className="input-row">
                <div className="input-group">
                    <label>Tên</label>
                    <input
                        type="text"
                        value={person.name}
                        onChange={(e) => onChange({ ...person, name: e.target.value })}
                        placeholder="Nhập tên..."
                        className="glass-input"
                    />
                </div>
                <div className="input-group gender">
                    <label>Giới tính</label>
                    <select
                        value={person.gender}
                        onChange={(e) => onChange({ ...person, gender: e.target.value })}
                        className="glass-select"
                    >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
            </div>

            <div className="input-row date-row">
                <div className="input-group">
                    <label>Ngày</label>
                    <select
                        value={person.day}
                        onChange={(e) => onChange({ ...person, day: parseInt(e.target.value) })}
                        className="glass-select"
                    >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label>Tháng</label>
                    <select
                        value={person.month}
                        onChange={(e) => onChange({ ...person, month: parseInt(e.target.value) })}
                        className="glass-select"
                    >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                            <option key={m} value={m}>Tháng {m}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label>Năm</label>
                    <select
                        value={person.year}
                        onChange={(e) => onChange({ ...person, year: parseInt(e.target.value) })}
                        className="glass-select"
                    >
                        {Array.from({ length: 100 }, (_, i) => currentYear - i).map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label>Giờ</label>
                    <select
                        value={person.hour}
                        onChange={(e) => onChange({ ...person, hour: parseInt(e.target.value) })}
                        className="glass-select"
                    >
                        {Array.from({ length: 24 }, (_, i) => i).map(h => (
                            <option key={h} value={h}>{h}:00</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

/**
 * MiniPillarCard - Displays a single pillar
 */
const MiniPillarCard = ({ pillar, label }) => (
    <div className="mini-pillar">
        <div className="pillar-label">{label}</div>
        <div className="pillar-gan">{pillar?.gan || '-'}</div>
        <div className="pillar-zhi">{pillar?.zhi || '-'}</div>
    </div>
);

/**
 * ChartDisplay - Displays the Bazi chart for a person
 */
const ChartDisplay = ({ person, chartData }) => {
    if (!chartData) return null;

    const pillars = chartData.pillars || {};

    return (
        <div className="chart-display glass-card">
            <div className="chart-header">
                <span className="person-name">{person.name || 'Người'}</span>
                <span className="person-element">{chartData.dayMaster?.element || ''}</span>
            </div>
            <div className="pillars-row">
                <MiniPillarCard pillar={pillars.year} label="Năm" />
                <MiniPillarCard pillar={pillars.month} label="Tháng" />
                <MiniPillarCard pillar={pillars.day} label="Ngày" />
                <MiniPillarCard pillar={pillars.hour} label="Giờ" />
            </div>
        </div>
    );
};

/**
 * ScoreBar - Visual score display
 */
const ScoreBar = ({ score, label }) => {
    const getScoreColor = (s) => {
        if (s >= 80) return 'excellent';
        if (s >= 65) return 'good';
        if (s >= 50) return 'neutral';
        if (s >= 35) return 'challenging';
        return 'difficult';
    };

    return (
        <div className={`score-bar ${getScoreColor(score)}`}>
            <div className="score-label">{label}</div>
            <div className="score-track">
                <div className="score-fill" style={{ width: `${score}%` }}></div>
            </div>
            <div className="score-value">{score}</div>
        </div>
    );
};

/**
 * MatchingPage - Main matching/compatibility analysis page (Duyên Số)
 */
const MatchingPage = ({ userData }) => {
    const currentYear = new Date().getFullYear();

    const [person1, setPerson1] = useState({
        name: userData?.name || '',
        year: userData?.year || currentYear - 25,
        month: userData?.month || 1,
        day: userData?.day || 1,
        hour: userData?.hour || 12,
        gender: userData?.gender || 'Nam'
    });

    const [person2, setPerson2] = useState({
        name: '',
        year: currentYear - 23,
        month: 6,
        day: 15,
        hour: 12,
        gender: person1.gender === 'Nam' ? 'Nữ' : 'Nam' // Auto-opposite gender
    });

    const { user, token, isAuthenticated, refreshUser } = useAuth();
    const navigate = useNavigate();

    const [relationship, setRelationship] = useState('romance');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);
    const [selectedPersona, setSelectedPersona] = useState('huyen_co');
    const [isAIResult, setIsAIResult] = useState(false);
    const [followUpAnswer, setFollowUpAnswer] = useState(null);
    const [loadingFollowUp, setLoadingFollowUp] = useState(false);
    const [customQuestion, setCustomQuestion] = useState('');
    const [showHistory, setShowHistory] = useState(false);
    const [showInputForm, setShowInputForm] = useState(true);
    const resultsRef = useRef(null);
    const [displayScore, setDisplayScore] = useState(0);

    // Progress steps for AI Matching
    const [progressStep, setProgressStep] = useState(0);
    const progressSteps = [
        { icon: '💓', text: 'Đang kết nối nhịp đập Bát Tự của hai người...' },
        { icon: '☯️', text: 'Phân tích tương tác Ngũ Hành bản mệnh...' },
        { icon: '🔗', text: 'Tra cứu xung - hợp trong Can Chi...' },
        { icon: '🌟', text: 'Tìm kiếm Thần Sát và Thập Thần tương hỗ...' },
        { icon: '🔮', text: 'Thầy đang thấu thị nhân duyên tiền định...' },
        { icon: '✨', text: 'Hoàn thiện lời khuyên và hướng hóa giải...' }
    ];

    // Cycle through progress steps when loading AI
    useEffect(() => {
        if (!loadingAI) {
            setProgressStep(0);
            return;
        }
        const interval = setInterval(() => {
            setProgressStep(prev => (prev + 1) % progressSteps.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [loadingAI]);

    // Update person1 if userData changes
    useEffect(() => {
        if (userData && userData.year) {
            setPerson1({
                name: userData.name || '',
                year: userData.year,
                month: userData.month,
                day: userData.day,
                hour: userData.hour || 12,
                gender: userData.gender || 'Nam'
            });
        }
    }, [userData]);

    const relationshipOptions = [
        { value: 'romance', label: '💕 Tình duyên / Hôn nhân', icon: '💕' },
        { value: 'friendship', label: '🤝 Bạn bè', icon: '🤝' },
        { value: 'parent_child', label: '👨‍👧 Cha mẹ - Con cái', icon: '👨‍👧' },
        { value: 'siblings', label: '👫 Anh chị em', icon: '👫' },
        { value: 'business', label: '💼 Đối tác kinh doanh', icon: '💼' },
        { value: 'colleague', label: '🏢 Đồng nghiệp', icon: '🏢' },
        { value: 'teacher_student', label: '👨‍🏫 Thầy trò', icon: '👨‍🏫' },
        { value: 'spiritual', label: '🧘 Đạo hữu / Tâm linh', icon: '🧘' },
        { value: 'rival', label: '⚔️ Đối thủ / Cạnh tranh', icon: '⚔️' },
        { value: 'boss_employee', label: '👔 Cấp trên - Cấp dưới', icon: '👔' }
    ];

    const analyzeCompatibility = async () => {
        setLoading(true);
        setError(null);
        setIsAIResult(false);

        try {
            const data = await apiClient.matching({
                person1,
                person2,
                relationship
            });
            setResult(data);
        } catch (err) {
            console.error('Matching error:', err);
            setError(err.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const analyzeCompatibilityAI = async () => {
        if (!person2.name || !person2.name.trim()) {
            setToast({ message: 'Vui lòng nhập tên đối phương để phân tích.', type: 'warning' });
            return;
        }

        setLoadingAI(true);
        setError(null);
        setResult(null);
        setDisplayScore(0);

        try {
            const data = await apiClient.matchingAI({
                person1,
                person2,
                relationship,
                persona: selectedPersona
            }, token);

            if (data.error) {
                if (data.error.includes('linh thạch')) {
                    setToast({ message: 'Bạn không đủ Linh Thạch để thầy Huyền cơ bát tự luận giải (Cần 25 💎)', type: 'error' });
                } else {
                    setError(data.message || data.error);
                }
                return;
            }

            setResult(data);
            setIsAIResult(true);
            setShowInputForm(false);
            refreshUser();
            setToast({ message: 'Thầy luận giải hoàn tất! (-25 💎)', type: 'success' });

            // Auto-scroll to results
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        } catch (err) {
            console.error('Matching AI error:', err);
            setError(err.message || 'Có lỗi xảy ra khi kết nối AI');
        } finally {
            setLoadingAI(false);
        }
    };

    const handleFollowUp = async (question) => {
        if (!question || !question.trim()) return;

        setLoadingFollowUp(true);
        setFollowUpAnswer(null);

        try {
            const data = await apiClient.askAI({
                ...person1,
                partnerData: person2,
                questionId: 'custom',
                questionText: question,
                useAI: true,
                persona: selectedPersona
            }, token);

            if (data.error) {
                if (data.error.includes('linh thạch')) {
                    setToast({ message: 'Bạn không đủ Linh Thạch để đặt câu hỏi (Cần 25 💎)', type: 'error' });
                } else {
                    setToast({ message: data.message || data.error, type: 'error' });
                }
                return;
            }

            setFollowUpAnswer({
                question,
                answer: data.answer
            });
            refreshUser(); // Update credits
            setToast({ message: 'Thầy đã trả lời! (-25 💎)', type: 'success' });
            if (question === customQuestion) setCustomQuestion('');

            // Scroll to answer after a short delay
            setTimeout(() => {
                const element = document.getElementById('follow-up-anchor');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (err) {
            console.error('Follow-up error:', err);
            setToast({ message: 'Có lỗi xảy ra khi kết nối AI', type: 'error' });
        } finally {
            setLoadingFollowUp(false);
        }
    };

    const getScoreClass = (score) => {
        if (score >= 80) return 'excellent';
        if (score >= 65) return 'good';
        if (score >= 50) return 'neutral';
        if (score >= 35) return 'challenging';
        return 'difficult';
    };

    // Animated score counter
    useEffect(() => {
        if (!result?.totalScore) return;
        const target = result.totalScore;
        const duration = 1200;
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setDisplayScore(Math.round(eased * target));
            if (progress >= 1) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [result?.totalScore]);

    const handleReAnalyze = () => {
        setResult(null);
        setIsAIResult(false);
        setFollowUpAnswer(null);
        setShowInputForm(true);
        setDisplayScore(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (showHistory) {
        window.scrollTo(0, 0);
        return (
            <div className="matching-container fade-in">
                <div className="matching-header glass-card">
                    <div className="mystical-welcome-text">
                        <span>LUẬN GIẢI KẾT NỐI</span>
                        <h1>Lịch Sử Duyên Số</h1>
                    </div>
                </div>
                <div className="history-page-wrapper glass-card">
                    <ConsultationHistoryContainer onBack={() => { setShowHistory(false); window.scrollTo(0, 0); }} />
                </div>
            </div>
        );
    }

    return (
        <div className="matching-page fade-in">
            <div className="page-header glass-card">
                <div className="header-info">
                    <h2 className="mystical-welcome-text">👩‍❤️‍👨 DUYÊN SỐ - PHÂN TÍCH TƯƠNG HỢP</h2>
                    <p>So sánh Bát Tự của bạn với đối phương để xem mức độ hòa hợp</p>
                </div>
                {isAuthenticated && (
                    <button
                        className="btn-history-round"
                        onClick={() => setShowHistory(true)}
                        title="Xem lịch sử duyên số"
                    >
                        📜
                    </button>
                )}
            </div>

            {/* Input Section or Loading Progress */}
            {loadingAI ? (
                <div className="matching-loading-view glass-card fade-in">
                    <div className="loading-progress-view">
                        <div className="loading-animation">
                            <div className="loading-icon">{progressSteps[progressStep].icon}</div>
                            <div className="loading-pulse"></div>
                        </div>
                        <h3 className="loading-title">Thầy đang bấm quẻ xem duyên số...</h3>
                        <p className="loading-text">{progressSteps[progressStep].text}</p>
                        <div className="loading-steps">
                            {progressSteps.map((step, idx) => (
                                <div
                                    key={idx}
                                    className={`step-dot ${idx <= progressStep ? 'active' : ''} ${idx === progressStep ? 'current' : ''}`}
                                />
                            ))}
                        </div>
                        <p className="loading-hint">Mối lương duyên cần sự kiên nhẫn, vui lòng chờ Thầy thấu thị...</p>
                    </div>
                </div>
            ) : showInputForm ? (
                <div className="input-section">
                    <div className="persons-grid">
                        <PersonInputForm
                            label="👤 Bản mệnh (Bạn)"
                            person={person1}
                            onChange={setPerson1}
                            color="blue"
                            readOnly={!!userData?.year}
                        />
                        <div className="vs-divider">
                            <span>⚡</span>
                        </div>
                        <PersonInputForm
                            label="👤 Đối phương (Cần xem)"
                            person={person2}
                            onChange={setPerson2}
                            color="pink"
                        />
                    </div>

                    <div className="controls-bar glass-card">
                        <div className="relationship-selector">
                            <label>Mối quan hệ:</label>
                            <select
                                value={relationship}
                                onChange={(e) => setRelationship(e.target.value)}
                                className="glass-select"
                            >
                                {relationshipOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            className="analyze-btn ai-btn premium"
                            onClick={analyzeCompatibilityAI}
                            disabled={loading || loadingAI}
                        >
                            <span>✨ HUYỀN CƠ LUẬN GIẢI</span>
                            <span className="credit-tag">💎 25</span>
                        </button>
                    </div>
                </div>
            ) : result && (
                <div className="compact-summary glass-card fade-in">
                    <div className="summary-persons">
                        <span className="summary-person">👤 {person1.name || 'Bản mệnh'}</span>
                        <span className="summary-vs">⚡</span>
                        <span className="summary-person">👤 {person2.name || 'Đối phương'}</span>
                    </div>
                    <button className="btn-reanalyze" onClick={handleReAnalyze}>
                        🔄 Phân tích lại
                    </button>
                </div>
            )}

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Error */}
            {error && (
                <div className="error-message glass-card">
                    ⚠️ {error}
                </div>
            )}

            {/* Results */}
            {result && (
                <div className="results-section" ref={resultsRef}>
                    {/* Total Score */}
                    <div className={`total-score-card glass-card ${getScoreClass(result.totalScore)} score-entrance`}>
                        <div className="score-circle">
                            <div className="score-number">{displayScore}</div>
                            <div className="score-label">/ 100</div>
                        </div>
                        <div className="score-info">
                            <h2>{result.assessment?.icon} {result.assessment?.title}</h2>
                            <p>{result.assessment?.summary}</p>
                        </div>
                    </div>

                    {/* Dual Charts */}
                    <div className="dual-charts">
                        <ChartDisplay person={result.person1} chartData={result.person1?.chart} />
                        <div className="chart-connector">
                            <span className="connector-icon">💫</span>
                        </div>
                        <ChartDisplay person={result.person2} chartData={result.person2?.chart} />
                    </div>

                    {/* Score Breakdown */}
                    <div className="breakdown-section glass-card">
                        <h3>📊 PHÂN TÍCH CHI TIẾT</h3>
                        <div className="breakdown-grid">
                            <div className="breakdown-item">
                                <div className="item-header">
                                    <span className="item-icon">☯️</span>
                                    <span className="item-title">Ngũ Hành</span>
                                    <span className="item-score">{result.breakdown?.element?.score}/{result.breakdown?.element?.maxScore}</span>
                                </div>
                                <p className="item-desc">{result.breakdown?.element?.description}</p>
                            </div>

                            <div className="breakdown-item">
                                <div className="item-header">
                                    <span className="item-icon">🔗</span>
                                    <span className="item-title">Can Chi</span>
                                    <span className="item-score">{result.breakdown?.ganzhi?.score}/{result.breakdown?.ganzhi?.maxScore}</span>
                                </div>
                                {result.breakdown?.ganzhi?.details?.map((d, i) => (
                                    <p key={i} className={`item-detail ${d.type}`}>{d.text}</p>
                                ))}
                            </div>

                            <div className="breakdown-item">
                                <div className="item-header">
                                    <span className="item-icon">🌟</span>
                                    <span className="item-title">Thập Thần</span>
                                    <span className="item-score">{result.breakdown?.shishen?.score}/{result.breakdown?.shishen?.maxScore}</span>
                                </div>
                                {result.breakdown?.shishen?.details?.map((d, i) => (
                                    <p key={i} className={`item-detail ${d.type}`}>{d.text}</p>
                                ))}
                            </div>

                            <div className="breakdown-item">
                                <div className="item-header">
                                    <span className="item-icon">✨</span>
                                    <span className="item-title">Thần Sát</span>
                                    <span className="item-score">{result.breakdown?.star?.score}/{result.breakdown?.star?.maxScore}</span>
                                </div>
                                {result.breakdown?.star?.details?.map((d, i) => (
                                    <p key={i} className={`item-detail ${d.type}`}>{d.text}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Aspects */}
                    <div className="aspects-section glass-card">
                        <h3>💫 ĐÁNH GIÁ THEO KHÍA CẠNH</h3>
                        <div className="aspects-grid">
                            {result.aspects?.map((aspect, idx) => (
                                <div key={idx} className="aspect-card">
                                    <div className="aspect-header">
                                        <span className="aspect-icon">{aspect.icon}</span>
                                        <span className="aspect-title">{aspect.title}</span>
                                    </div>
                                    <ScoreBar score={aspect.score} label="" />
                                    <p className="aspect-desc">{aspect.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Advice */}
                    {result.advice && result.advice.length > 0 && (
                        <div className="advice-section glass-card">
                            <h3>💡 LỜI KHUYÊN</h3>
                            <div className="advice-list">
                                {result.advice.map((a, i) => (
                                    <div key={i} className={`advice-item ${a.type}`}>
                                        <span className="advice-icon">
                                            {a.type === 'positive' ? '✅' : a.type === 'warning' ? '⚠️' : a.type === 'tip' ? '💡' : 'ℹ️'}
                                        </span>
                                        <p>{a.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Suggested Questions (AI only) */}
                    {isAIResult && result.suggestedQuestions && result.suggestedQuestions.length > 0 && (
                        <div className="suggestions-section glass-card fade-in">
                            <h3>❓ CÂU HỎI GỢI Ý TỪ THẦY</h3>
                            <p className="suggestion-hint">Chọn câu hỏi để nhận lời giải chi tiết (💎 25/câu)</p>
                            <div className="suggestions-grid">
                                {result.suggestedQuestions.map((q, i) => (
                                    <button
                                        key={i}
                                        className="suggestion-item glass-btn"
                                        onClick={() => handleFollowUp(q)}
                                        disabled={loadingFollowUp}
                                    >
                                        {loadingFollowUp && !followUpAnswer && result.suggestedQuestions[i] === q ? (
                                            <span className="spinner-tiny"></span>
                                        ) : `✨ ${q}`}
                                    </button>
                                ))}
                            </div>

                            <div className="custom-question-form">
                                <h4>💬 Đặt câu hỏi riêng của bạn</h4>
                                <div className="custom-input-group">
                                    <textarea
                                        className="glass-textarea"
                                        placeholder="Ví dụ: Hai người có hạp làm ăn lớn trong năm tới không?..."
                                        value={customQuestion}
                                        onChange={(e) => setCustomQuestion(e.target.value)}
                                        rows={2}
                                    />
                                    <button
                                        className="ask-btn premium"
                                        onClick={() => handleFollowUp(customQuestion)}
                                        disabled={loadingFollowUp || !customQuestion.trim()}
                                    >
                                        Hỏi ngay <span className="credit-tag">💎 25</span>
                                    </button>
                                </div>
                            </div>

                            {/* Loading State for Follow-up */}
                            {loadingFollowUp && !followUpAnswer && (
                                <div className="follow-up-loading-view glass-card fade-in">
                                    <div className="loading-progress-view">
                                        <div className="loading-animation">
                                            <div className="loading-icon">{progressSteps[progressStep].icon}</div>
                                            <div className="loading-pulse"></div>
                                        </div>
                                        <p className="loading-text">{progressSteps[progressStep].text}</p>
                                        <div className="loading-steps">
                                            {progressSteps.map((step, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`step-dot ${idx <= progressStep ? 'active' : ''} ${idx === progressStep ? 'current' : ''}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="loading-hint">Thầy đang dùng linh lực để thấu thị câu hỏi của con, vui lòng chờ trong giây lát...</p>
                                    </div>
                                </div>
                            )}

                            {/* Inline Answer */}
                            {followUpAnswer && (
                                <div id="follow-up-anchor" className="follow-up-inline-answer glass-card fade-in">
                                    <div className="answer-header">
                                        <span className="q-badge">CÂU HỎI:</span>
                                        <h4>{followUpAnswer.question}</h4>
                                    </div>
                                    <div className="answer-body">
                                        <TypewriterEffect text={followUpAnswer.answer} speed={10} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MatchingPage;
