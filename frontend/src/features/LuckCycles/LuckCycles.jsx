import React, { useState } from 'react';

const LuckHistogram = ({ cycles, onSelectYear, selectedYear }) => {
    // Flatten all years into a single array for the chart
    const allYears = cycles.reduce((acc, cycle) => [...acc, ...cycle.luu_nien], []);
    const currentYear = new Date().getFullYear();

    const margin = { top: 20, right: 10, bottom: 30, left: 10 };
    const width = 1000; // Fixed inner width for coordinate system
    const height = 180;
    const barWidth = width / allYears.length - 2;

    const maxScore = Math.max(...allYears.map(y => Math.abs(y.score || 0)), 5);
    const yScale = (score) => {
        // Map score to pixels. Score 0 is at middle (height/2)
        const centerY = height / 2;
        const scale = (height / 2 - 20) / maxScore;
        return centerY - (score * scale);
    };

    return (
        <div className="luck-histogram-wrapper glass-card">
            <div className="histogram-header">
                <h4><span className="icon">📈</span> NHỊP ĐIỆU CÁT HÙNG (120 NĂM)</h4>
                <div className="chart-legend">
                    <span className="legend-item"><span className="dot good"></span> Tốt</span>
                    <span className="legend-item"><span className="dot normal"></span> Bình thường</span>
                    <span className="legend-item"><span className="dot bad"></span> Cần thận trọng</span>
                </div>
            </div>
            <div className="histogram-container">
                <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="luck-svg">
                    {/* Zero line */}
                    <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                    {/* Bars */}
                    {allYears.map((y, i) => {
                        const x = i * (width / allYears.length);
                        const score = y.score || 0;
                        const yVal = yScale(Math.max(score, 0));
                        const yZero = height / 2;
                        const barHeight = Math.abs(yScale(score) - yZero) || 2; // Min height 2px
                        const actualY = score >= 0 ? yScale(score) : yZero;

                        let barColor = 'rgba(241, 196, 15, 0.4)'; // Default gold (Normal)
                        if (score >= 3.0) barColor = 'rgba(46, 204, 113, 0.6)'; // Good - Green
                        if (score <= -3.0) barColor = 'rgba(231, 76, 60, 0.6)'; // Bad - Red

                        const isCurrent = y.nam === currentYear;
                        const isSelected = selectedYear && selectedYear.nam === y.nam;

                        return (
                            <g key={i} className="chart-bar-group" onClick={() => onSelectYear(y)}>
                                <rect
                                    x={x + 1}
                                    y={actualY}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={barColor}
                                    rx="2"
                                    className={`chart-bar ${isSelected ? 'selected' : ''} ${isCurrent ? 'current' : ''}`}
                                />
                                {isCurrent && (
                                    <text x={x + barWidth / 2} y={15} textAnchor="middle" className="current-year-label">NAY</text>
                                )}
                                <title>{`Năm ${y.nam} (${y.can_chi}): ${score > 0 ? '+' : ''}${score}`}</title>
                            </g>
                        );
                    })}

                    {/* Decade markers */}
                    {cycles.map((c, i) => {
                        const x = i * 10 * (width / allYears.length);
                        return (
                            <g key={i}>
                                <line x1={x} y1="0" x2={x} y2={height} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                                <text x={x + 5} y={height - 5} className="decade-label">{c.nam}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

const LuckCycles = ({ data }) => {
    const [viewMode, setViewMode] = useState('summary'); // 'summary' or 'detailed'
    const [expandedCycle, setExpandedCycle] = useState(null);
    const [selectedCycle, setSelectedCycle] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    // Check for required data structures
    if (!data || !data.dai_van || !data.chi_tiet_tru || data.chi_tiet_tru.length < 4) {
        return (
            <div className="luck-cycles-container fade-in">
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <p>⏳ Đang tải dữ liệu Đại Vận...</p>
                </div>
            </div>
        );
    }

    const getElementClass = (val) => {
        if (!val) return '';
        const mapping = {
            'Giáp': 'wood', 'Ất': 'wood', 'Dần': 'wood', 'Mão': 'wood',
            'Bính': 'fire', 'Đinh': 'fire', 'Tỵ': 'fire', 'Ngọ': 'fire',
            'Mậu': 'earth', 'Kỷ': 'earth', 'Thìn': 'earth', 'Tuất': 'earth', 'Sửu': 'earth', 'Mùi': 'earth',
            'Canh': 'metal', 'Tân': 'metal', 'Thân': 'metal', 'Dậu': 'metal',
            'Nhâm': 'water', 'Quý': 'water', 'Hợi': 'water', 'Tý': 'water'
        };
        return mapping[val] || '';
    };

    // Định nghĩa các tiêu đề nhóm chính
    const SECTION_KEYWORDS = {
        'phan_tich_toan_dien': ['PHÂN TÍCH TOÀN DIỆN LƯU NIÊN', 'THÔNG TIN NĂM', '📅'],
        'phan_tich_linh_vuc': ['PHÂN TÍCH CHI TIẾT THEO LĨNH VỰC', 'SỰ NGHIỆP', 'TÀI CHÍNH', 'TÌNH CẢM', 'SỨC KHỎE', '📊', '---'],
        'luan_giai_tong_hop': ['LUẬN GIẢI TỔNG HỢP VÀ LỜI KHUYÊN', '💡']
    };

    const formatLuanGiai = (text) => {
        if (!text) return <p className="no-data">Đang cập nhật dữ liệu luận giải...</p>;

        // Pre-process: Add newlines before section markers if the text is a single line
        let processedText = text;

        // Split markers - add newlines before key markers to properly separate content
        const splitMarkers = [
            '📅 THÔNG TIN NĂM',
            '🔗 QUAN HỆ VỚI TỨ TRỤ',
            '📊 PHÂN TÍCH CHI TIẾT THEO LĨNH VỰC',
            '📚 PHÂN TÍCH THEO CÁC PHƯƠNG PHÁP',
            '💡 LUẬN GIẢI TỔNG HỢP',
            '--- SỰ NGHIỆP',
            '--- TÀI CHÍNH',
            '--- TÌNH CẢM',
            '--- SỨC KHỎE',
            '⭐ Trạng thái:',
            '⚠️ Trạng thái:',
            '✨ Trạng thái:',
            '🏥 Trạng thái:',
            '🔥 Trạng thái:',
            '• Trạng thái:',
            '• Lời khuyên:',
            '• Lưu ý:',
            '• Năm',
            '• Chính',
            '• Thiên',
            '• Thất',
            '• Thương',
            '• Thực',
            '• Kiếp',
            '💼 Sự nghiệp:',
            '💰 Tài chính:',
            '❤️ Tình cảm:',
            '🏥 Sức khỏe:',
            '👨‍👩‍👧‍👦 Gia đình:',
            'Trụ Năm',
            'Trụ Tháng',
            'Trụ Ngày',
            'Trụ Giờ'
        ];

        splitMarkers.forEach(marker => {
            processedText = processedText.split(marker).join('\n' + marker);
        });

        const lines = processedText.split('\n');
        const sections = {
            'phan_tich_toan_dien': { title: '📅 THÔNG TIN NĂM', items: [] },
            'quan_he_tu_tru': { title: '🔗 QUAN HỆ VỚI TỨ TRỤ', items: [] },
            'phan_tich_linh_vuc': { title: '📊 PHÂN TÍCH CHI TIẾT THEO LĨNH VỰC', items: [] },
            'luan_giai_tong_hop': { title: '💡 LUẬN GIẢI TỔNG HỢP VÀ LỜI KHUYÊN', items: [] }
        };

        let currentSection = 'phan_tich_toan_dien';

        lines.forEach((line, idx) => {
            let cleanLine = line.trim();

            // Skip empty lines, separators, and raw dict/JSON content
            if (!cleanLine) return;
            if (cleanLine.match(/^[=─━═╔╗╚╝║─┌┐└┘│├┤┬┴┼*]{3,}$/)) return;
            if (cleanLine.startsWith('╔') || cleanLine.startsWith('╚') || cleanLine.startsWith('║')) return;
            if (cleanLine.includes('{') && cleanLine.includes('}')) return;
            if (cleanLine.match(/^\{.*\}$/)) return;

            // Detect and strip Markdown headers for section detection
            if (cleanLine.startsWith('#')) {
                const headerContent = cleanLine.replace(/^#+\s*/, '').toUpperCase();
                if (headerContent.includes('ĐẠI VẬN') || headerContent.includes('THÔNG TIN NĂM')) {
                    currentSection = 'phan_tich_toan_dien';
                    return;
                }
                if (headerContent.includes('QUAN HỆ') || headerContent.includes('TƯƠNG TÁC')) {
                    currentSection = 'quan_he_tu_tru';
                    return;
                }
                if (headerContent.includes('CHI TIẾT') || headerContent.includes('LĨNH VỰC')) {
                    currentSection = 'phan_tich_linh_vuc';
                    return;
                }
                if (headerContent.includes('LUẬN GIẢI') || headerContent.includes('LỜI KHUYÊN')) {
                    currentSection = 'luan_giai_tong_hop';
                    return;
                }
                // If it's a generic header, just treat as content but strip the #
                cleanLine = headerContent;
            }

            // Detect traditional section changes
            if (cleanLine.includes('🔗 QUAN HỆ VỚI TỨ TRỤ')) {
                currentSection = 'quan_he_tu_tru';
                return;
            } else if (cleanLine.includes('📊 PHÂN TÍCH CHI TIẾT THEO LĨNH VỰC') || cleanLine.match(/^---\s*(SỰ NGHIỆP|TÀI CHÍNH|TÌNH CẢM|SỨC KHỎE)/)) {
                currentSection = 'phan_tich_linh_vuc';
                if (cleanLine.includes('📊')) return;
            } else if (cleanLine.includes('💡 LUẬN GIẢI TỔNG HỢP')) {
                currentSection = 'luan_giai_tong_hop';
                return;
            }

            // Clean up bold markers for display logic if not already handled
            const displayLine = cleanLine.replace(/\*\*(.*?)\*\*/g, '$1');

            // Add content to current section
            sections[currentSection].items.push({ line: cleanLine, displayLine, idx });
        });

        // Render sections
        return Object.entries(sections).map(([key, sec]) => {
            if (sec.items.length === 0) return null;
            return (
                <div key={key} className="info-region-card glass-card fade-in">
                    <h4 className="region-title">{sec.title}</h4>
                    <div className="region-body">
                        {sec.items.map(({ line, displayLine, idx }) => {
                            // Sub-headers (like --- SỰ NGHIỆP)
                            if (displayLine.match(/^---\s*(.+)/)) {
                                const subTitle = displayLine.replace(/^---\s*/, '').trim();
                                return <h5 key={idx} className="sub-region-title">{subTitle}</h5>;
                            }
                            // Status with icons
                            if (displayLine.match(/^[⭐⚠️✨🏥🔥]/)) {
                                const isGood = displayLine.includes('TUYỆT VỜI') || displayLine.includes('RẤT TỐT') || displayLine.includes('THUẬN LỢI') || displayLine.includes('TỐT');
                                const isBad = displayLine.includes('CẨN THẬN') || displayLine.includes('RẤT CẨN THẬN') || displayLine.includes('CÓ BIẾN ĐỘNG') || displayLine.includes('⚠️');
                                return (
                                    <p key={idx} className={`status-line ${isGood ? 'status-good' : ''} ${isBad ? 'status-bad' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                );
                            }
                            // Life area advice (💼, 💰, ❤️, 🏥, 👨‍👩‍👧‍👦)
                            if (displayLine.match(/^[💼💰❤️🏥👨‍👩‍👧‍👦]/)) {
                                return <p key={idx} className="life-advice-line" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                            }
                            // Bullet points
                            if (displayLine.startsWith('•')) {
                                return (
                                    <div key={idx} className="luan-giai-bullet">
                                        <span className="bullet-dot">✦</span>
                                        <span className="bullet-text" dangerouslySetInnerHTML={{ __html: line.substring(1).trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                    </div>
                                );
                            }
                            // Warnings
                            if (displayLine.includes('⚠️') || displayLine.includes('🔥') || displayLine.includes('CẢNH BÁO')) {
                                return <p key={idx} className="luan-giai-warning" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                            }
                            // Pillar relations
                            if (displayLine.startsWith('Trụ ')) {
                                return <p key={idx} className="pillar-relation" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                            }
                            // Default paragraph
                            return <p key={idx} className="luan-giai-p" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                        })}
                    </div>
                </div>
            );
        }).filter(Boolean);
    };

    // Helper to split Can Chi string
    const splitCanChi = (str) => {
        if (!str) return { can: '', chi: '' };
        if (Array.isArray(str)) return { can: str[0], chi: str[1] || '' };
        if (str.includes(' ')) {
            const parts = str.split(' ');
            return { can: parts[0], chi: parts[1] || '' };
        }
        const canList = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        for (const canItem of canList) {
            if (str.startsWith(canItem)) return { can: canItem, chi: str.slice(canItem.length) };
        }
        return { can: str, chi: '' };
    };

    const thaiNguyen = splitCanChi(data.thong_tin_co_ban?.thai_nguyen || '');
    const menhCung = splitCanChi(data.thong_tin_co_ban?.menh_cung || '');

    const natalPillars = [
        { label: 'THAI NGUYÊN', ...thaiNguyen, shishen: '...' },
        { label: 'CUNG MỆNH', ...menhCung, shishen: 'NHẬT CHỦ' },
        { label: 'TRỤ GIỜ', can: data.chi_tiet_tru[3].can, chi: data.chi_tiet_tru[3].chi, shishen: data.chi_tiet_tru[3].thap_than_can, sub: data.chi_tiet_tru[3].tang_can?.map(t => t.can).join(' ') },
        { label: 'TRỤ NGÀY', can: data.chi_tiet_tru[2].can, chi: data.chi_tiet_tru[2].chi, shishen: 'NHẬT CHỦ', sub: data.chi_tiet_tru[2].tang_can?.map(t => t.can).join(' ') },
        { label: 'TRỤ THÁNG', can: data.chi_tiet_tru[1].can, chi: data.chi_tiet_tru[1].chi, shishen: data.chi_tiet_tru[1].thap_than_can, sub: data.chi_tiet_tru[1].tang_can?.map(t => t.can).join(' ') },
        { label: 'TRỤ NĂM', can: data.chi_tiet_tru[0].can, chi: data.chi_tiet_tru[0].chi, shishen: data.chi_tiet_tru[0].thap_than_can, sub: data.chi_tiet_tru[0].tang_can?.map(t => t.can).join(' ') },
    ];

    return (
        <section className="luck-cycles-container fade-in">
            {/* Natal Chart Overview Header */}
            <div className="natal-chart-overview">
                <div className="natal-header-strip">
                    <h2 className="natal-title">BÁT TỰ BẢN MỆNH</h2>
                </div>
                <div className="natal-pillars-grid">
                    {natalPillars.map((p, idx) => (
                        <div key={idx} className={`natal-pillar-card glass-card ${p.label === 'TRỤ GIỜ' ? 'highlight' : ''}`}>
                            <div className="p-label">{p.label}</div>
                            <div className="p-main">
                                <div className={`p-can ${getElementClass(p.can)}`}>{p.can}</div>
                                <div className="p-icon">✦</div>
                                <div className={`p-chi ${getElementClass(p.chi)}`}>{p.chi}</div>
                            </div>
                            <div className="p-footer">
                                <div className="p-shishen">{p.shishen}</div>
                                <div className="p-sub">{p.sub || '...'}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cycles Control Header */}
            <div className="cycles-section-header glass-card">
                <div className="header-left">
                    <h3>HÀNH TRÌNH VẬN HẠN</h3>
                </div>
                <div className="view-toggle">
                    <button
                        className={`toggle-btn ${viewMode === 'summary' ? 'active' : ''}`}
                        onClick={() => setViewMode('summary')}
                    >
                        ĐẠI VẬN
                    </button>
                    <button
                        className={`toggle-btn ${viewMode === 'detailed' ? 'active' : ''}`}
                        onClick={() => setViewMode('detailed')}
                    >
                        CHI TIẾT 100 NĂM
                    </button>
                </div>
            </div>

            {/* CURRENT YEAR ANALYSIS - Luận Động - Only show in summary view */}
            {viewMode === 'summary' && data.phan_tich?.phan_tich_nang_cao?.luan_dong && (
                <div className="current-year-analysis glass-card">
                    <div className="current-year-header">
                        <h3>🌊 PHÂN TÍCH VẬN NĂM NAY ({new Date().getFullYear()})</h3>
                        {data.phan_tich.phan_tich_nang_cao.luan_dong.intro && (
                            <p className="intro-text">{data.phan_tich.phan_tich_nang_cao.luan_dong.intro}</p>
                        )}
                    </div>

                    <div className="luan-dong-grid">
                        {/* Đại Vận Analysis */}
                        {data.phan_tich.phan_tich_nang_cao.luan_dong.dai_van && (
                            <div className="luan-dong-section dai-van-section">
                                <h4>📅 ĐẠI VẬN HIỆN TẠI</h4>

                                {/* Variables */}
                                {data.phan_tich.phan_tich_nang_cao.luan_dong.dai_van.variables && (
                                    <div className="analysis-block variables-block">
                                        <div className="block-header">
                                            <span className="block-icon">📊</span>
                                            <span className="block-title">BIẾN SỐ</span>
                                        </div>
                                        <div className="block-content">
                                            {data.phan_tich.phan_tich_nang_cao.luan_dong.dai_van.variables.map((v, i) => (
                                                <p key={i} className="variable-line" dangerouslySetInnerHTML={{ __html: v.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Convergence */}
                                {data.phan_tich.phan_tich_nang_cao.luan_dong.dai_van.convergence && (
                                    <div className="analysis-block convergence-block">
                                        <div className="block-header">
                                            <span className="block-icon">🔗</span>
                                            <span className="block-title">HỘI TỤ & TƯƠNG TÁC</span>
                                        </div>
                                        <div className="block-content">
                                            {data.phan_tich.phan_tich_nang_cao.luan_dong.dai_van.convergence.map((c, i) => (
                                                <p key={i} className="convergence-line" dangerouslySetInnerHTML={{ __html: c.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Conclusion */}
                                {data.phan_tich.phan_tich_nang_cao.luan_dong.dai_van.conclusion && (
                                    <div className="analysis-block conclusion-block">
                                        <div className="block-header">
                                            <span className="block-icon">📝</span>
                                            <span className="block-title">CHIẾN LƯỢC & HÀNH ĐỘNG</span>
                                        </div>
                                        <div className="block-content" dangerouslySetInnerHTML={{ __html: data.phan_tich.phan_tich_nang_cao.luan_dong.dai_van.conclusion.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>').replace(/_"(.*?)"_/g, '<em>"$1"</em>') }} />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Lưu Niên Analysis */}
                        {data.phan_tich.phan_tich_nang_cao.luan_dong.luu_nien && (
                            <div className="luan-dong-section luu-nien-section">
                                <h4>🎯 LƯU NIÊN {new Date().getFullYear()}</h4>

                                {/* Variables */}
                                {data.phan_tich.phan_tich_nang_cao.luan_dong.luu_nien.variables && (
                                    <div className="analysis-block variables-block">
                                        <div className="block-header">
                                            <span className="block-icon">📊</span>
                                            <span className="block-title">BIẾN SỐ</span>
                                        </div>
                                        <div className="block-content">
                                            {data.phan_tich.phan_tich_nang_cao.luan_dong.luu_nien.variables.map((v, i) => (
                                                <p key={i} className="variable-line" dangerouslySetInnerHTML={{ __html: v.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Convergence */}
                                {data.phan_tich.phan_tich_nang_cao.luan_dong.luu_nien.convergence && data.phan_tich.phan_tich_nang_cao.luan_dong.luu_nien.convergence.length > 0 && (
                                    <div className="analysis-block convergence-block">
                                        <div className="block-header">
                                            <span className="block-icon">🔗</span>
                                            <span className="block-title">TÁC ĐỘNG NĂNG LƯỢNG</span>
                                        </div>
                                        <div className="block-content">
                                            {data.phan_tich.phan_tich_nang_cao.luan_dong.luu_nien.convergence.map((c, i) => (
                                                <p key={i} className="convergence-line" dangerouslySetInnerHTML={{ __html: c.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Conclusion */}
                                {data.phan_tich.phan_tich_nang_cao.luan_dong.luu_nien.conclusion && (
                                    <div className="analysis-block conclusion-block">
                                        <div className="block-header">
                                            <span className="block-icon">🔮</span>
                                            <span className="block-title">DỰ BÁO & LỜI KHUYÊN</span>
                                        </div>
                                        <div className="block-content" dangerouslySetInnerHTML={{ __html: data.phan_tich.phan_tich_nang_cao.luan_dong.luu_nien.conclusion.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 100-YEAR HISTOGRAM CHART */}
            <LuckHistogram
                cycles={data.dai_van}
                onSelectYear={(y) => {
                    setSelectedYear(y);
                    setViewMode('detailed');
                    // Find which cycle this year belongs to and expand it
                    const cycleIdx = data.dai_van.findIndex(c => y.nam >= c.nam && y.nam <= c.nam + 9);
                    if (cycleIdx !== -1) setExpandedCycle(cycleIdx);
                }}
                selectedYear={selectedYear}
            />

            {viewMode === 'summary' ? (
                <div className="summary-view-wrapper">
                    <div className="cycles-horizontal-scroll">
                        {data.dai_van.map((c, idx) => {
                            const { can, chi } = splitCanChi(c.can_chi);
                            const isActive = selectedCycle === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`cycle-card glass-card ${isActive ? 'active' : ''}`}
                                    onClick={() => setSelectedCycle(isActive ? null : idx)}
                                >
                                    <div className="cycle-meta">{c.nam}</div>
                                    <div className="cycle-age">{c.tuoi_bat_dau} tuổi</div>
                                    <div className="cycle-main">
                                        <div className={`cycle-gan ${getElementClass(can)}`}>{can}</div>
                                        <div className={`cycle-chi ${getElementClass(chi)}`}>{chi}</div>
                                    </div>
                                    <div className="cycle-footer">
                                        <div className="shishen">{c.thap_than}</div>
                                        <div className="status">{c.trang_thai}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Detailed Analysis Panel for Selected Cycle */}
                    {selectedCycle !== null && (
                        <div className="cycle-detail-panel glass-card fade-in">
                            <div className="panel-header">
                                <h4>CHI TIẾT ĐẠI VẬN: {data.dai_van[selectedCycle].can_chi} ({data.dai_van[selectedCycle].nam})</h4>
                                <button className="close-btn" onClick={() => setSelectedCycle(null)}>×</button>
                            </div>
                            <div className="panel-content">
                                <div className="year-stats-strip">
                                    <div className="stat-item">
                                        <span className="label">Thập Thần</span>
                                        <span className="val gold">{data.dai_van[selectedCycle].thap_than}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="label">Trạng Thái</span>
                                        <span className="val">{data.dai_van[selectedCycle].trang_thai}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="label">Nạp Âm</span>
                                        <span className="val text-muted">{data.dai_van[selectedCycle].nap_am}</span>
                                    </div>
                                </div>

                                <div className="luan-giai-content">
                                    {formatLuanGiai(data.dai_van[selectedCycle].luan_giai)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            ) : (
                <div className="detailed-years-view">
                    {data.dai_van.map((c, idx) => (
                        <div key={idx} className={`decade-group glass-card ${expandedCycle === idx ? 'expanded' : ''}`}>
                            <div className="decade-header" onClick={() => setExpandedCycle(expandedCycle === idx ? null : idx)}>
                                <div className="decade-info">
                                    <span className="decade-title">ĐẠI VẬN {c.can_chi} ({c.nam})</span>
                                    <span className="decade-status">{c.thap_than} - {c.trang_thai}</span>
                                </div>
                                <span className="expand-icon">{expandedCycle === idx ? '−' : '+'}</span>
                            </div>
                            {expandedCycle === idx && (
                                <div className="years-grid">
                                    {c.luu_nien.map((y, yIdx) => {
                                        const { can: yCan, chi: yChi } = splitCanChi(y.can_chi);
                                        const isYearSelected = selectedYear && selectedYear.nam === y.nam;
                                        return (
                                            <div
                                                key={yIdx}
                                                className={`year-item glass-card ${isYearSelected ? 'active' : ''}`}
                                                onClick={() => setSelectedYear(isYearSelected ? null : y)}
                                            >
                                                <div className="y-head">
                                                    <span className="y-year">{y.nam}</span>
                                                    <span className="y-age">{y.tuoi} tuổi</span>
                                                </div>
                                                <div className="y-main">
                                                    <span className={`y-can ${getElementClass(yCan)}`}>{yCan}</span>
                                                    <span className={`y-chi ${getElementClass(yChi)}`}>{yChi}</span>
                                                </div>
                                                <div className="y-footer">
                                                    <span className="y-shishen">{y.thap_than}</span>
                                                </div>
                                                {y.than_sat && y.than_sat.length > 0 && (
                                                    <div className="y-stars">
                                                        {y.than_sat.slice(0, 2).map((s, si) => (
                                                            <span key={si} className="tiny-star-pill">{s}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Year Detail Modal/Overlay */}
                    {selectedYear && (
                        <div className="year-detail-overlay fade-in" onClick={() => setSelectedYear(null)}>
                            <div className="year-detail-modal glass-card" onClick={e => e.stopPropagation()}>
                                <div className="modal-header">
                                    <div className="modal-title-group">
                                        <h3>PHÂN TÍCH CHI TIẾT NĂM {selectedYear.nam}</h3>
                                        <p className="modal-subtitle">{selectedYear.can_chi} - {selectedYear.tuoi} tuổi</p>
                                    </div>
                                    <button className="close-btn" onClick={() => setSelectedYear(null)}>×</button>
                                </div>
                                <div className="modal-body">
                                    <div className="year-stats-strip">
                                        <div className="stat-item">
                                            <span className="label">Thập Thần</span>
                                            <span className="val gold">{selectedYear.thap_than}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="label">Trạng Thái</span>
                                            <span className="val">{selectedYear.trang_thai}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="label">Nạp Âm</span>
                                            <span className="val text-muted">{selectedYear.nap_am}</span>
                                        </div>
                                    </div>

                                    <div className="luan-giai-content">
                                        {formatLuanGiai(selectedYear.luan_giai)}
                                    </div>

                                    {selectedYear.than_sat && selectedYear.than_sat.length > 0 && (
                                        <div className="modal-section">
                                            <h4>THẦN SÁT CHIẾU MỆNH</h4>
                                            <div className="stars-flex">
                                                {selectedYear.than_sat.map((s, si) => (
                                                    <span key={si} className="star-pill">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button className="action-btn" onClick={() => setSelectedYear(null)}>ĐÃ HIỂU</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default LuckCycles;
