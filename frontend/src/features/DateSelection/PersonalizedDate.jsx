import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/apiClient';
import AuspiciousDatePicker from './AuspiciousDatePicker';

/**
 * CustomerInfoHeader - Reusable info header for personalized pages
 */
const CustomerInfoHeader = ({ info }) => {
    if (!info) return null;
    return (
        <div className="customer-info-header glass-card">
            <div className="header-top">
                <div className="avatar-circle">{info.ten ? info.ten.charAt(0) : '👤'}</div>
                <div className="header-main">
                    <h3 className="customer-name">{info.ten}</h3>
                    <div className="customer-meta">
                        <span className="meta-item gender">{info.gioi_tinh} {info.xung_ho ? `(${info.xung_ho})` : ''}</span>
                        <span className="meta-divider">|</span>
                        <span className="meta-item age">Tuổi: {info.tuoi}</span>
                        <span className="meta-divider">|</span>
                        <span className="meta-item stage">Giai đoạn: {info.giai_doan_doi}</span>
                    </div>
                </div>
            </div>
            <div className="header-stats-grid">
                <div className="stat-box">
                    <span className="stat-label">Dương lịch</span>
                    <span className="stat-value">{info.ngay_duong_lich}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">Âm lịch</span>
                    <span className="stat-value">{info.ngay_am_lich}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">Mệnh cung</span>
                    <span className="stat-value gold">{info.menh_cung}</span>
                </div>
            </div>
        </div>
    );
};

const PersonalizedDate = ({ data, userData }) => {
    const [mode, setMode] = useState('day'); // 'year', 'month', 'day'
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [targetDate, setTargetDate] = useState({
        year: tomorrow.getFullYear(),
        month: tomorrow.getMonth() + 1,
        day: tomorrow.getDate()
    });
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const parseRichText = (text) => {
        if (!text) return null;
        let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        parsed = parsed.replace(/<b>(.*?)<\/b>/gi, '<strong>$1</strong>');
        parsed = parsed.replace(/➤/g, '<span class="arrow-gold">➤</span>');
        parsed = parsed.replace(/✨/g, '<span class="star-icon">✨</span>');
        parsed = parsed.replace(/•/g, '<span class="list-bullet">•</span>');
        parsed = parsed.replace(/💡/g, '<span class="idea-icon">💡</span>');
        return <span dangerouslySetInnerHTML={{ __html: parsed }} />;
    };

    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

    useEffect(() => {
        const maxDays = getDaysInMonth(targetDate.year, targetDate.month);
        if (targetDate.day > maxDays) {
            setTargetDate(prev => ({ ...prev, day: maxDays }));
        }
    }, [targetDate.year, targetDate.month]);

    useEffect(() => {
        if (userData && userData.year) {
            fetchAnalysis();
        }
    }, [userData]);

    const fetchAnalysis = async () => {
        if (!userData || !userData.year) {
            setError("Thiếu thông tin ngày sinh của bạn.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const queryParams = {
                year: userData.year,
                month: userData.month,
                day: userData.day,
                hour: userData.hour || 12,
                gender: userData.gender || 'Nam',
                target_year: targetDate.year
            };

            if (mode === 'month' || mode === 'day') queryParams.target_month = targetDate.month;
            if (mode === 'day') queryParams.target_day = targetDate.day;

            const res = await apiClient.analyzeTime(queryParams);
            setSections(res.sections || []);
        } catch (err) {
            console.error("Error fetching analysis:", err);
            setError(err.message || "Không thể kết nối đến server.");
        } finally {
            setLoading(false);
        }
    };

    const renderStructuredInterpretation = (text) => {
        if (!text) return null;

        // Split by major headers or specific emoji markers that start a paragraph
        // We use a positive lookahead to keep the marker with the following text
        const sections = text.split(/(?=[🎰📊🎯]|\*\*Về|\*\*CẢNH BÁO|💡|⚠️|🔹|🔸|♦)/g)
            .map(s => s.trim())
            .filter(s => s.length > 5); // Filter out fragments or empty strings

        return (
            <div className="structured-interpretation">
                {sections.map((section, i) => {
                    // Determine block type
                    let blockClass = "interpret-block";
                    if (section.includes('⚠️') || section.includes('CẢNH BÁO')) blockClass += " warning";
                    else if (section.includes('💡') || section.includes('Lời khuyên')) blockClass += " advice";
                    else if (section.includes('🌟') || section.includes('chất lượng')) blockClass += " highlight";
                    else if (section.includes('💎') || section.includes('Đặc điểm')) blockClass += " feature";

                    return (
                        <div key={i} className={blockClass}>
                            <div className="block-content">{parseRichText(section)}</div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderEvaluationGrid = (content) => {
        // Extract evaluation lines vs interpretation block
        const evaluationLines = content.filter(l =>
            l.includes('**Sự nghiệp**') ||
            l.includes('**Tài lộc**') ||
            l.includes('**Tình cảm**') ||
            l.includes('**Sức khỏe**')
        );

        // Find the "Luận giải tổng quan" line
        const interpretationLine = content.find(l => l.toLowerCase().includes('luận giải tổng quan'));
        const otherLines = content.filter(l => !evaluationLines.includes(l) && l !== interpretationLine);

        return (
            <div className="analysis-detail-view">
                <div className="eval-mini-grid">
                    {evaluationLines.map((line, i) => {
                        const [label, text] = line.split(':');
                        const cleanLabel = label.replace(/\*/g, '').trim();
                        const icon = cleanLabel.includes('Sự nghiệp') ? '💼' :
                            cleanLabel.includes('Tài lộc') ? '💰' :
                                cleanLabel.includes('Tình cảm') ? '❤️' : '🩺';
                        return (
                            <div key={i} className="eval-mini-card">
                                <div className="eval-mini-header">
                                    <span className="eval-icon">{icon}</span>
                                    <span className="eval-label">{cleanLabel}</span>
                                </div>
                                <div className="eval-text">{text?.trim()}</div>
                            </div>
                        );
                    })}
                </div>

                {interpretationLine && (
                    <div className="main-interpretation-area">
                        <h4 className="sub-section-title">✨ Luận Giải Chi Tiết</h4>
                        {renderStructuredInterpretation(interpretationLine)}
                    </div>
                )}

                {otherLines.length > 0 && (
                    <div className="eval-context-lines">
                        {otherLines.map((line, i) => (
                            <p key={i} className="context-line">{parseRichText(line)}</p>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    if (!userData || !userData.year) {
        return (
            <div className="personalized-date-page fade-in">
                <div className="placeholder-info glass-card">
                    <p>⚠️ Vui lòng nhập thông tin ngày sinh để nhận luận giải cá nhân hóa.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="personalized-date-page fade-in">
            {/* 1. Header with Customer Info */}
            <CustomerInfoHeader info={data?.thong_tin_co_ban} />

            {/* 2. Selector section */}
            <div className="time-explorer glass-card">
                <div className="explorer-header">
                    <h4><span className="icon">🔭</span> Khám Phá Vận Hạn</h4>
                    <div className="explorer-mode-tabs">
                        {['year', 'month', 'day', 'calendar'].map(m => (
                            <button
                                key={m}
                                className={`mode-tab-btn ${mode === m ? 'active' : ''}`}
                                onClick={() => setMode(m)}
                            >
                                {m === 'year' ? 'Năm' : m === 'month' ? 'Tháng' : m === 'day' ? 'Ngày' : '📅 Lịch'}
                            </button>
                        ))}
                    </div>
                </div>

                {mode !== 'calendar' && (
                    <div className="explorer-controls">
                        <div className="control-group">
                            <label>Chọn Năm</label>
                            <select
                                value={targetDate.year}
                                onChange={(e) => setTargetDate(p => ({ ...p, year: parseInt(e.target.value) }))}
                                className="glass-select"
                            >
                                {Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i).map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>

                        {(mode === 'month' || mode === 'day') && (
                            <div className="control-group">
                                <label>Chọn Tháng</label>
                                <select
                                    value={targetDate.month}
                                    onChange={(e) => setTargetDate(p => ({ ...p, month: parseInt(e.target.value) }))}
                                    className="glass-select"
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                        <option key={m} value={m}>Tháng {m}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {mode === 'day' && (
                            <div className="control-group">
                                <label>Chọn Ngày</label>
                                <select
                                    value={targetDate.day}
                                    onChange={(e) => setTargetDate(p => ({ ...p, day: parseInt(e.target.value) }))}
                                    className="glass-select"
                                >
                                    {Array.from({ length: getDaysInMonth(targetDate.year, targetDate.month) }, (_, i) => i + 1).map(d => (
                                        <option key={d} value={d}>Ngày {d}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button className="analyze-btn" onClick={fetchAnalysis} disabled={loading}>
                            {loading ? <span className="spinner-tiny"></span> : '⚡ PHÂN TÍCH'}
                        </button>
                    </div>
                )}
            </div>

            {/* 3. Results area - Show calendar or analysis */}
            {mode === 'calendar' ? (
                <AuspiciousDatePicker userData={userData} hideTitle={true} />
            ) : (
                <div className="analysis-container">
                    {loading ? (
                        <div className="loading-state glass-card">
                            <div className="spinner-medium"></div>
                            <p>Đang đọc ma trận thời gian...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state glass-card">
                            <p>⚠️ {error}</p>
                        </div>
                    ) : sections.length > 0 ? (
                        <div className="sections-grid">
                            {sections.map((section, idx) => (
                                <div key={idx} className={`analysis-section-card glass-card ${idx === 0 ? 'highlight-section' : ''}`}>
                                    <div className="section-header">
                                        <span className="section-icon">{section.icon}</span>
                                        <h3>{section.title}</h3>
                                    </div>
                                    <div className="section-body">
                                        {idx === 0 ? renderEvaluationGrid(section.content) : (
                                            <div className="generic-list">
                                                {section.content.map((line, i) => (
                                                    <p key={i} className="list-item">{parseRichText(line)}</p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state glass-card">
                            <div className="empty-icon">🔮</div>
                            <p>Chọn mốc thời gian và nhấn Phân Tích để bắt đầu.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PersonalizedDate;

