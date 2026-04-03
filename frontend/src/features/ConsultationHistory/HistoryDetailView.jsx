import React from 'react';
import GuaSymbol from '../Que/components/GuaSymbol';
import TypewriterEffect from '../Consultant/TypewriterEffect';
import { formatDateTime } from '../../utils/dateUtils';

const getElementColorClass = (text) => {
    if (!text) return '';
    const t = text.toLowerCase();
    if (t.includes('giáp') || t.includes('ất') || t.includes('dần') || t.includes('mão')) return 'wood';
    if (t.includes('bính') || t.includes('đinh') || t.includes('tỵ') || t.includes('ngọ')) return 'fire';
    if (t.includes('mậu') || t.includes('kỷ') || t.includes('thìn') || t.includes('tuất') || t.includes('sửu') || t.includes('mùi')) return 'earth';
    if (t.includes('canh') || t.includes('tân') || t.includes('thân') || t.includes('dậu')) return 'metal';
    if (t.includes('nhâm') || t.includes('quý') || t.includes('hợi') || t.includes('tý')) return 'water';
    return '';
};

const MiniPillarCard = ({ pillar, label }) => {
    const ganColor = getElementColorClass(pillar?.gan);
    const zhiColor = getElementColorClass(pillar?.zhi);

    return (
        <div className="mini-pillar glass-card">
            <div className="pillar-label">{label}</div>
            <div className={`pillar-gan ${ganColor}`}>{pillar?.gan || '-'}</div>
            <div className={`pillar-zhi ${zhiColor}`}>{pillar?.zhi || '-'}</div>
        </div>
    );
};

const ChartDisplay = ({ person, chartData }) => {
    if (!chartData) return null;
    const pillars = chartData.pillars || {};
    return (
        <div className="chart-display-mini glass-card">
            <div className="chart-header">
                <span className="person-name">{person?.name || 'Mệnh chủ'}</span>
                <span className="person-gender">{person?.gender || ''}</span>
            </div>
            <div className="pillars-row">
                <MiniPillarCard pillar={pillars.year} label="Năm" />
                <MiniPillarCard pillar={pillars.month} label="Tháng" />
                <MiniPillarCard pillar={pillars.day} label="Ngày" />
                <MiniPillarCard pillar={pillars.hour} label="Giờ" />
            </div>
            {/* Show Day Master Element strength if available */}
            {chartData.dayMasterStrength && (
                <div className="mini-dm-strength">
                    <small>Thân:</small> <strong>{chartData.dayMasterStrength}</strong>
                </div>
            )}
        </div>
    );
};

const HistoryDetailView = ({ item, onBack }) => {
    const isMatching = item.question_id === 'matching_ai' || item.theme_id === 'matching';
    const isQue = item.theme_id === 'xin_que' || item.metadata?.isQue;
    const answer = item.answer;

    return (
        <div className="history-detail-view fade-in">
            <div className="detail-header">
                <button className="btn-back-link" onClick={onBack}>← Danh sách</button>
                <div className="detail-title">
                    <span className="q-badge">
                        {isMatching ? '👩‍❤️‍👨 Duyên Số' : isQue ? '🔮 Xin Quẻ' : '💬 Tư vấn'}
                    </span>
                    <h3>Chi tiết luận giải</h3>
                </div>
            </div>

            <div className="detail-content glass-card">
                <div className="question-info">
                    {isQue && item.metadata && (
                        <div className="que-detail-box glass-card">
                            <GuaSymbol symbol={item.metadata.symbol} size={64} />
                            <div className="que-info-text">
                                <div className="que-name">{item.metadata.guaName}</div>
                                <div className="que-quality-badge">{item.metadata.quality}</div>
                            </div>
                        </div>
                    )}
                    <div className="q-row">
                        <strong>{isQue ? 'Mục tiêu:' : 'Câu hỏi:'}</strong>
                        <p>{item.question_text}</p>
                    </div>
                    <div className="q-meta">
                        <span>📅 {formatDateTime(item.created_at)}</span>
                        <span>🧙‍♂️ {item.persona === 'menh_meo' ? 'Thầy Mệnh Mèo' : 'Thầy Huyền Cơ'}</span>
                    </div>
                </div>

                <div className="charts-section">
                    <h4>📊 Lá số lúc luận giải</h4>
                    <div className={`charts-container ${isMatching ? 'is-matching' : ''}`}>
                        <ChartDisplay
                            person={item.person1_data}
                            chartData={item.person1_data?.chart}
                        />
                        {isMatching && item.person2_data && (
                            <>
                                <div className="connector-badge">VS</div>
                                <ChartDisplay
                                    person={item.person2_data}
                                    chartData={item.person2_data?.chart}
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className="answer-section">
                    <h4>📜 Lời của Thầy</h4>
                    <div className="answer-body">
                        {(() => {
                            // Helper to safely extract answer text
                            let validAnswer = answer;

                            // If answer is a string that looks like JSON array, try to parse it
                            if (typeof answer === 'string') {
                                const trimmed = answer.trim();
                                if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
                                    try {
                                        validAnswer = JSON.parse(trimmed);
                                    } catch (e) {
                                        // Not valid JSON, keep as string but clean up escape sequences
                                        validAnswer = answer.replace(/\\n/g, '\n').replace(/\\"/g, '"');
                                    }
                                } else {
                                    // Clean up escape sequences in regular string
                                    validAnswer = answer.replace(/\\n/g, '\n').replace(/\\"/g, '"');
                                }
                            }

                            // Check if it's a matching AI result object with expected structure
                            if (typeof validAnswer === 'object' && validAnswer !== null && !Array.isArray(validAnswer)) {
                                // Matching AI results have these fields
                                if (validAnswer.assessment && validAnswer.totalScore !== undefined) {
                                    // Format matching result nicely
                                    const lines = [];

                                    // Assessment
                                    lines.push(`🎯 **Đánh giá tổng quát**: ${validAnswer.assessment.title || 'N/A'}`);
                                    lines.push(`📊 **Điểm tương hợp**: ${validAnswer.totalScore}/100`);
                                    if (validAnswer.assessment.summary) {
                                        lines.push(`\n${validAnswer.assessment.summary}`);
                                    }

                                    // Breakdown
                                    if (validAnswer.breakdown) {
                                        lines.push('\n---\n**CHI TIẾT PHÂN TÍCH:**\n');
                                        if (validAnswer.breakdown.element) {
                                            lines.push(`🔥 **Ngũ Hành** (${validAnswer.breakdown.element.score}/${validAnswer.breakdown.element.maxScore}): ${validAnswer.breakdown.element.description || ''}`);
                                        }
                                        if (validAnswer.breakdown.ganzhi && validAnswer.breakdown.ganzhi.details) {
                                            lines.push(`\n☯️ **Can Chi** (${validAnswer.breakdown.ganzhi.score}/${validAnswer.breakdown.ganzhi.maxScore}):`);
                                            validAnswer.breakdown.ganzhi.details.forEach(d => lines.push(`  ${d.type === 'positive' ? '✅' : '⚠️'} ${d.text}`));
                                        }
                                        if (validAnswer.breakdown.shishen && validAnswer.breakdown.shishen.details) {
                                            lines.push(`\n⭐ **Thập Thần** (${validAnswer.breakdown.shishen.score}/${validAnswer.breakdown.shishen.maxScore}):`);
                                            validAnswer.breakdown.shishen.details.forEach(d => lines.push(`  ${d.type === 'positive' ? '✅' : '⚠️'} ${d.text}`));
                                        }
                                        if (validAnswer.breakdown.star && validAnswer.breakdown.star.details) {
                                            lines.push(`\n✨ **Thần Sát** (${validAnswer.breakdown.star.score}/${validAnswer.breakdown.star.maxScore}):`);
                                            validAnswer.breakdown.star.details.forEach(d => lines.push(`  ${d.type === 'positive' ? '✅' : '⚠️'} ${d.text}`));
                                        }
                                    }

                                    // Aspects
                                    if (validAnswer.aspects && Array.isArray(validAnswer.aspects)) {
                                        lines.push('\n---\n**PHƯƠNG DIỆN:**\n');
                                        validAnswer.aspects.forEach(a => {
                                            lines.push(`${a.icon || '📌'} **${a.title}**: ${a.score}/100 - ${a.description || ''}`);
                                        });
                                    }

                                    // Advice
                                    if (validAnswer.advice && Array.isArray(validAnswer.advice)) {
                                        lines.push('\n---\n**LỜI KHUYÊN:**\n');
                                        validAnswer.advice.forEach(adv => {
                                            const prefix = adv.type === 'warning' ? '⚠️' : adv.type === 'tip' ? '💡' : adv.type === 'positive' ? '✅' : '📝';
                                            lines.push(`${prefix} ${adv.text}`);
                                        });
                                    }

                                    validAnswer = lines.join('\n');
                                } else {
                                    // Try common fields or stringify for other object types
                                    validAnswer = validAnswer.answer || validAnswer.result || validAnswer.content || validAnswer.message || JSON.stringify(validAnswer, null, 2);
                                }
                            }

                            if (!validAnswer) return <p>Không có nội dung luận giải.</p>;

                            // Handle array of paragraphs
                            if (Array.isArray(validAnswer)) {
                                return validAnswer.map((para, idx) => {
                                    // Clean up each paragraph string
                                    let cleanPara = String(para).replace(/\\n/g, '\n').replace(/\\"/g, '"');
                                    return (
                                        <div key={idx} className="answer-paragraph">
                                            <TypewriterEffect text={cleanPara} speed={2} />
                                        </div>
                                    );
                                });
                            }

                            // Handle single string
                            return (
                                <div className="answer-paragraph">
                                    <TypewriterEffect text={String(validAnswer)} speed={2} />
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryDetailView;
