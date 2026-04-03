import React, { useState } from 'react';

/**
 * LuanGiai component renders the structured interpretation report.
 * Layout giống MatrixAnalysis với sidebar navigation bên trái.
 */
const LuanGiai = ({ sections }) => {
    const [activeTab, setActiveTab] = useState(0);

    if (!sections || sections.length === 0) {
        return (
            <div className="advanced-matrix-explorer fade-in">
                <div className="matrix-display-area glass-card">
                    <div className="matrix-header-strip">
                        <h4>LUẬN GIẢI</h4>
                    </div>
                    <div className="matrix-body">
                        <p className="no-data">Chưa có dữ liệu luận giải.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Helper function để parse line thành label và content
    const parseLine = (line) => {
        if (!line || typeof line !== 'string') return { label: null, content: line || '' };
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0 && colonIndex < 50) {
            return {
                label: line.substring(0, colonIndex).trim(),
                content: line.substring(colonIndex + 1).trim()
            };
        }
        return { label: null, content: line };
    };

    return (
        <div className="advanced-matrix-explorer fade-in">
            {/* Sidebar Navigation */}
            <nav className="matrix-sidebar glass-card">
                <div className="sidebar-header">
                    <h4>LUẬN GIẢI</h4>
                </div>
                <div className="matrix-nav-list">
                    {sections.map((section, i) => (
                        <button
                            key={i}
                            className={`matrix-nav-btn ${activeTab === i ? 'active' : ''}`}
                            onClick={() => setActiveTab(i)}
                        >
                            <span className="m-icon">{section.icon || '📌'}</span>
                            <span className="m-name">{section.title}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Content Area */}
            <div className="matrix-display-area glass-card">
                <div className="matrix-header-strip">
                    <h4>{sections[activeTab]?.title || 'LUẬN GIẢI'}</h4>
                </div>

                <div className="matrix-body">
                    {sections[activeTab]?.content && sections[activeTab].content.length > 0 ? (
                        <div className="matrix-content-list">
                            {sections[activeTab].content.map((line, idx) => {
                                const parsed = parseLine(line);
                                // Xử lý newline trong content
                                const contentLines = parsed.content.split('\n').filter(l => l.trim());

                                return (
                                    <div key={idx} className="matrix-info-line">
                                        {parsed.label ? (
                                            <>
                                                <span className="matrix-label">{parsed.label}:</span>
                                                <div className="matrix-text">
                                                    {contentLines.length > 1 ? (
                                                        contentLines.map((l, i) => (
                                                            <div key={i} className="content-row">{l}</div>
                                                        ))
                                                    ) : (
                                                        parsed.content
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <span className="matrix-text full-width">{parsed.content}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="no-data-premium">
                            <p>Đang tải dữ liệu luận giải...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LuanGiai;
