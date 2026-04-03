import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getTooltip } from '../../data/baziTerms';

const BaziChart = ({ data, isMobile }) => {
    if (!data) return null;

    const getElementClass = (val) => {
        const mapping = {
            'Giáp': 'wood', 'Ất': 'wood', 'Dần': 'wood', 'Mão': 'wood',
            'Bính': 'fire', 'Đinh': 'fire', 'Tỵ': 'fire', 'Ngọ': 'fire',
            'Mậu': 'earth', 'Kỷ': 'earth', 'Thìn': 'earth', 'Tuất': 'earth', 'Sửu': 'earth', 'Mùi': 'earth',
            'Canh': 'metal', 'Tân': 'metal', 'Thân': 'metal', 'Dậu': 'metal',
            'Nhâm': 'water', 'Quý': 'water', 'Hợi': 'water', 'Tý': 'water'
        };
        return mapping[val] || '';
    };

    // Helper to split Can Chi string (e.g., "Quý Tỵ" or "QuýTỵ")
    const splitCanChi = (str) => {
        if (!str) return { gan: '', chi: '' };
        // Vietnamese Can names
        const canList = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        // Check if string has space separator
        if (str.includes(' ')) {
            const parts = str.split(' ');
            return { gan: parts[0], chi: parts[1] || '' };
        }
        // Find Can from beginning of string
        for (const can of canList) {
            if (str.startsWith(can)) {
                return { gan: can, chi: str.slice(can.length) };
            }
        }
        return { gan: str, chi: '' };
    };

    const thaiNguyen = splitCanChi(data.thong_tin_co_ban?.thai_nguyen || '');
    const menhCung = splitCanChi(data.thong_tin_co_ban?.menh_cung || '');

    const auxPillars = [
        { title: 'THAI NGUYÊN', can: thaiNguyen.gan, chi: thaiNguyen.chi, type: 'aux' },
        { title: 'CUNG MỆNH', can: menhCung.gan, chi: menhCung.chi, type: 'aux' }
    ];

    // Order: Hour (Left) -> Year (Right) as per previous design (Right-to-Left logic rendered LTR?)
    // Actually, let's strictly follow the User's ordering preference from the screenshot
    // Screenshot: Thai | Cung | Gio | Ngay | Thang | Nam
    const mainPillars = [
        { title: 'TRỤ GIỜ', ...data.chi_tiet_tru[3], type: 'main' },
        { title: 'TRỤ NGÀY', ...data.chi_tiet_tru[2], type: 'dm', isDay: true },
        { title: 'TRỤ THÁNG', ...data.chi_tiet_tru[1], type: 'main' },
        { title: 'TRỤ NĂM', ...data.chi_tiet_tru[0], type: 'main' },
    ];

    const PillarCard = ({ p, isAux }) => (
        <div className={`pillar-card ${p.type === 'dm' ? 'day-master-card' : ''}`}
            style={{
                background: p.type === 'dm' ? 'rgba(231, 76, 60, 0.1)' : 'rgba(255,255,255,0.03)',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: p.type === 'dm' ? '1px solid rgba(231, 76, 60, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                minWidth: isAux ? '120px' : '140px',
                flex: 1
            }}>
            <div style={{ fontSize: '0.8em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '8px', letterSpacing: '1px' }} title={getTooltip(p.title)}>
                {p.title}
            </div>

            {/* Can */}
            <div className={`gan-text ${getElementClass(p.can)}`}
                style={{ fontSize: '1.6em', fontWeight: 'bold', marginBottom: '4px', cursor: 'help' }}
                title={getTooltip(p.can)}>
                {p.can}
            </div>

            {/* Thang Giua (Visual Connector) */}
            {/* <div style={{height: '20px', width: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 0'}}></div> */}

            {/* Chi */}
            <div className={`zhi-text ${getElementClass(p.chi)}`}
                style={{ fontSize: '1.6em', fontWeight: 'bold', marginBottom: '8px', cursor: 'help' }}
                title={getTooltip(p.chi)}>
                {p.chi}
            </div>

            {/* Footer Infos */}
            {!isAux && (
                <div style={{ width: '100%', marginTop: 'auto', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '8px' }}>

                    {/* Thap Than Can */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.75em', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', color: '#bdc3c7', cursor: 'help' }}
                            title={getTooltip(p.thap_than_can || 'Nhật Chủ')}>
                            {p.thap_than_can || 'Nhật Chủ'}
                        </span>
                    </div>

                    {/* Tang Can */}
                    <div style={{ fontSize: '0.75em', opacity: 0.6, textAlign: 'center', marginBottom: '4px' }}>
                        {p.tang_can ? p.tang_can.map(t => t.can).join(' ') : ''}
                    </div>

                    {/* Than Sat (Mini) */}
                    {p.than_sat && p.than_sat.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', justifyContent: 'center' }}>
                            {p.than_sat.slice(0, 2).map((s, i) => (
                                <span key={i}
                                    style={{ fontSize: '0.65em', background: '#f1c40f20', color: '#f1c40f', padding: '1px 3px', borderRadius: '2px', cursor: 'help' }}
                                    title={getTooltip(s)}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    const Cell = ({ pillar }) => (
        // Legacy Cell ref, kept if needed but we use PillarCard now
        <PillarCard p={pillar} isAux={false} />
    );
    // Note: Legacy Cell was removed from usage below

    const renderInfoLine = (text, index) => {
        if (!text) return null;
        if (text.includes(':')) {
            const [label, ...rest] = text.split(':');
            const content = rest.join(':').trim();
            // Split by separator | for multi-line support
            const lines = content.includes('|') ? content.split('|') : [content];

            return (
                <div key={index} className="analysis-line info-line">
                    <span className="info-label">{label.trim().replace(/^•\s*/, '')}:</span>
                    <div className="info-text-group">
                        {lines.map((line, i) => (
                            <div key={i} className="info-text">{line.trim()}</div>
                        ))}
                    </div>
                </div>
            );
        }
        return <p key={index} className="analysis-line">• {text}</p>;
    };

    return (
        <div className="bazi-chart-layout">
            <BaziTOC />
            <section className="bazi-chart-container fade-in">
                <div className="chart-header-strip">
                    <h2 className="section-title">BÁT TỰ BẢN MỆNH</h2>
                </div>

                {/* NEW LAYOUT: Split into Aux and Main */}
                <div className="bazi-layout-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>

                    {/* 1. Main Pillars Overlay Group */}
                    <div className="main-chart-group glass-card" id="section-chart" style={{ padding: '20px', position: 'relative', borderTop: '4px solid #3498db' }}>
                        <div style={{ position: 'absolute', top: '10px', left: '15px', fontSize: '0.8em', color: '#3498db', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            ★ Tứ Trụ (Giờ - Ngày - Tháng - Năm)
                        </div>

                        <div className="pillars-flex-row" style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                            {mainPillars.map((p, idx) => (
                                <PillarCard key={idx} p={p} isAux={false} />
                            ))}
                        </div>
                    </div>

                    {/* 2. Secondary Info (Thai Nguyen / Menh Cung) */}
                    <div className="aux-info-group" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        {auxPillars.map((p, idx) => (
                            <div key={idx} className="glass-card" style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '140px', borderTop: '3px solid #9b59b6' }}>
                                <div style={{ fontSize: '0.75em', opacity: 0.7, marginBottom: '5px' }} title={getTooltip(p.title)}>{p.title}</div>
                                <div style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
                                    <span className={getElementClass(p.can)} title={getTooltip(p.can)} style={{ cursor: 'help' }}>{p.can}</span>
                                    <span style={{ margin: '0 5px', opacity: 0.3 }}>-</span>
                                    <span className={getElementClass(p.chi)} title={getTooltip(p.chi)} style={{ cursor: 'help' }}>{p.chi}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* 4 Analysis Sections */}
                <div className="analysis-sections">
                    {/* 1. PHÂN TÍCH CẤU TRÚC */}
                    <div className="analysis-box glass-card" id="section-structure">
                        <h3 className="box-title">PHÂN TÍCH CẤU TRÚC</h3>
                        <div className="box-content">
                            {data.phan_tich.cau_truc && !Array.isArray(data.phan_tich.cau_truc) && data.phan_tich.cau_truc.thien_can ? (
                                <div className="structure-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem' }}>
                                    {/* Thiên Can */}
                                    <div className="struct-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <h4 className="struct-head" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '0.5rem', color: '#e0e0e0' }}>{data.phan_tich.cau_truc.thien_can.title}</h4>
                                        {data.phan_tich.cau_truc.thien_can.items.map((item, idx) => (
                                            <div key={idx} className="struct-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                                                <span className="pillar-tag" style={{ opacity: 0.7, width: '50px' }}>{item.pillar}</span>
                                                <strong className={`main-val ${getElementClass(item.name)}`} title={getTooltip(item.name)} style={{ cursor: 'help' }}>{item.name}</strong>
                                                <span className="sub-val" style={{ fontSize: '0.9em', opacity: 0.8 }}>({item.element}, {item.yinyang})</span>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Địa Chi */}
                                    <div className="struct-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <h4 className="struct-head" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '0.5rem', color: '#e0e0e0' }}>{data.phan_tich.cau_truc.dia_chi.title}</h4>
                                        {data.phan_tich.cau_truc.dia_chi.items.map((item, idx) => (
                                            <div key={idx} className="struct-row" style={{ padding: '0.3rem 0', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span className="pillar-tag" style={{ opacity: 0.7, width: '50px' }}>{item.pillar}</span>
                                                    <strong className={`main-val ${getElementClass(item.name)}`} title={getTooltip(item.name)} style={{ cursor: 'help' }}>{item.name}</strong>
                                                </div>
                                                <div className="sub-val t-small" style={{ fontSize: '0.85em', opacity: 0.6, marginTop: '2px', textAlign: 'right' }}>
                                                    Tàng: {item.hidden.join(', ')}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Âm Dương */}
                                    <div className="struct-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h4 className="struct-head" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '0.5rem', color: '#e0e0e0' }}>{data.phan_tich.cau_truc.am_duong.title}</h4>
                                        <div className="yin-yang-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', marginTop: 'auto' }}>
                                            <div className="yy-badge yang" style={{ flex: 1, padding: '0.8rem', background: 'rgba(231, 76, 60, 0.15)', textAlign: 'center', borderRadius: '6px', border: '1px solid rgba(231, 76, 60, 0.3)' }}>
                                                <div style={{ fontSize: '0.8em', marginBottom: '4px', opacity: 0.8, textTransform: 'uppercase' }}>Dương</div>
                                                <b style={{ fontSize: '1.4em', color: '#e74c3c' }}>{data.phan_tich.cau_truc.am_duong.stats.duong}</b>
                                            </div>
                                            <div className="yy-badge yin" style={{ flex: 1, padding: '0.8rem', background: 'rgba(52, 152, 219, 0.15)', textAlign: 'center', borderRadius: '6px', border: '1px solid rgba(52, 152, 219, 0.3)' }}>
                                                <div style={{ fontSize: '0.8em', marginBottom: '4px', opacity: 0.8, textTransform: 'uppercase' }}>Âm</div>
                                                <b style={{ fontSize: '1.4em', color: '#3498db' }}>{data.phan_tich.cau_truc.am_duong.stats.am}</b>
                                            </div>
                                        </div>
                                        <p className="struct-desc" style={{ fontSize: '0.95em', fontStyle: 'italic', opacity: 0.9, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '6px', textAlign: 'center', marginBottom: '0' }}>{data.phan_tich.cau_truc.am_duong.conclusion}</p>
                                    </div>

                                </div>
                            ) : (
                                Array.isArray(data.phan_tich.cau_truc) && data.phan_tich.cau_truc.length > 0 ? (
                                    data.phan_tich.cau_truc.map((line, i) => renderInfoLine(line, i))
                                ) : (
                                    <p className="analysis-line empty">Chưa có dữ liệu cấu trúc</p>
                                )
                            )}
                        </div>
                    </div>

                    {/* 3. PHÂN TÍCH THẬP THẦN */}
                    <div className="analysis-box glass-card" id="section-shishen">
                        <h3 className="box-title">PHÂN TÍCH THẬP THẦN</h3>
                        <div className="box-content">
                            {data.phan_tich.thap_than && data.phan_tich.thap_than.isStructured ? (
                                <>
                                    <div className="shishen-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                                        {/* Order: TyKiep, ThucThuong, Tai, Quan, An */}
                                        {['ty_kiep', 'thuc_thuong', 'tai_tinh', 'quan_sat', 'an_tinh'].map(key => {
                                            const group = data.phan_tich.thap_than[key];
                                            if (!group) return null;
                                            return (
                                                <div key={key} className="shishen-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <div className="shishen-head" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.95em', fontWeight: 'bold', color: '#ecf0f1' }} title={group.desc}>{group.title}</span>
                                                        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8em', minWidth: '20px', textAlign: 'center' }}>{group.count}</span>
                                                    </div>
                                                    {group.items.length > 0 ? (
                                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85em' }}>
                                                            {group.items.map((item, idx) => (
                                                                <li key={idx} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.8)' }}>
                                                                    <strong style={{ color: '#bdc3c7', cursor: 'help' }} title={getTooltip(item.name)}>{item.name}</strong>
                                                                    <span style={{ opacity: 0.6, fontSize: '0.85em', background: 'rgba(255,255,255,0.05)', padding: '1px 4px', borderRadius: '3px' }}>{item.pillar}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <div style={{ fontSize: '0.8em', fontStyle: 'italic', opacity: 0.3, textAlign: 'center', padding: '0.5rem 0' }}>Không xuất hiện</div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Detailed Commentary Section - 5 Groups */}
                                    {(['ty_kiep', 'an_tinh', 'tai_tinh', 'quan_sat', 'thuc_thuong'].some(k => data.phan_tich.thap_than[k]?.analysis?.length > 0) || (data.phan_tich.thap_than.commentary && data.phan_tich.thap_than.commentary.length > 0)) && (
                                        <div className="shishen-commentary glass-card" style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.25)', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #f1c40f' }}>
                                            <h4 style={{ color: '#f1c40f', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(241, 196, 15, 0.3)', marginTop: 0, display: 'flex', alignItems: 'center' }}>
                                                <span style={{ marginRight: '8px' }}>📜</span> LUẬN THẬP THẦN CHI TIẾT
                                            </h4>
                                            <div className="commentary-content">
                                                {['ty_kiep', 'thuc_thuong', 'tai_tinh', 'quan_sat', 'an_tinh'].map(key => {
                                                    const group = data.phan_tich.thap_than[key];
                                                    if (!group) return null;
                                                    const hasAnalysis = group.analysis && group.analysis.length > 0;

                                                    // Always display if there are items OR if there is analysis. 
                                                    // Actually user requests to see them, so let's display all to complete the structure.
                                                    return (
                                                        <div key={key} style={{ marginBottom: '1.2rem' }}>
                                                            <h5 style={{ color: '#e67e22', fontSize: '1em', fontWeight: 'bold', marginBottom: '0.5rem', borderLeft: '3px solid #e67e22', paddingLeft: '8px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
                                                                <span>{group.title}</span>
                                                                <span style={{ fontSize: '0.8em', fontWeight: 'normal', color: 'rgba(255,255,255,0.6)' }}>({group.count} vị trí)</span>
                                                            </h5>
                                                            <div style={{ paddingLeft: '4px' }}>
                                                                {hasAnalysis ? (
                                                                    group.analysis.map((line, idx) => (
                                                                        <p key={idx} className="analysis-line" style={{ marginBottom: '0.5rem', lineHeight: '1.5', fontSize: '0.95em', color: 'rgba(255,255,255,0.9)' }}>
                                                                            {line.startsWith('•') ? line : `• ${line}`}
                                                                        </p>
                                                                    ))
                                                                ) : (
                                                                    <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', fontSize: '0.9em', marginBottom: '0.5rem' }}>
                                                                        {group.desc || "Chưa có luận giải đặc biệt cho nhóm này."}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                {/* Fallback to lagacy mixed commentary if no structured analysis found but summary exists */}
                                                {(!['ty_kiep', 'thuc_thuong', 'tai_tinh', 'quan_sat', 'an_tinh'].some(k => data.phan_tich.thap_than[k]?.analysis?.length > 0) &&
                                                    data.phan_tich.thap_than.commentary && data.phan_tich.thap_than.commentary.length > 0) && (
                                                        data.phan_tich.thap_than.commentary.map((line, idx) => (
                                                            <p key={idx} className="analysis-line" style={{ marginBottom: '0.6rem', lineHeight: '1.5' }}>• {line}</p>
                                                        ))
                                                    )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                Array.isArray(data.phan_tich.thap_than) && data.phan_tich.thap_than.length > 0 ? (
                                    data.phan_tich.thap_than.map((line, i) => renderInfoLine(line, i))
                                ) : (
                                    <p className="analysis-line empty">Chưa có phân tích thập thần</p>
                                )
                            )}
                        </div>
                    </div>

                    {/* 4. QUAN HỆ CAN – CHI */}
                    <div className="analysis-box glass-card highlight-box" id="section-relations">
                        <h3 className="box-title gold">QUAN HỆ CAN – CHI & NỘI LỰC</h3>
                        <div className="box-content">
                            {data.phan_tich.quan_he_can_chi ? (
                                <>
                                    <div className="qc-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>

                                        {/* COLUMN 1: INTERACTION (Can + Chi) */}
                                        <div className="interaction-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                            {/* Thiên Can Relationship */}
                                            <div className="rel-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '8px' }}>
                                                <h4 style={{ color: '#e0e0e0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '12px', fontSize: '1.1em' }}>🔴 THIÊN CAN (Ngoại Tượng)</h4>
                                                {data.phan_tich.quan_he_can_chi.thien_can && data.phan_tich.quan_he_can_chi.thien_can.length > 0 ? (
                                                    data.phan_tich.quan_he_can_chi.thien_can.map((item, idx) => (
                                                        <div key={idx} className="rel-item" style={{ marginBottom: '8px', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', borderLeft: item.loai.includes('Hợp') ? '3px solid #2ecc71' : '3px solid #e74c3c' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <span style={{ fontWeight: 'bold', color: item.loai.includes('Hợp') ? '#2ecc71' : '#e74c3c', fontSize: '1.05em' }}>{item.loai}</span>
                                                                <span style={{ fontSize: '0.8em', opacity: 0.6, background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>{item.tru}</span>
                                                            </div>
                                                            <div style={{ marginTop: '6px', fontSize: '0.95em' }}>{item.chi_tiet} <span style={{ opacity: 0.6 }}>({item.ten})</span></div>
                                                            {item.luan_giai && (
                                                                <div style={{ marginTop: '8px', fontSize: '0.9em', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '6px', lineHeight: '1.4' }}>
                                                                    ➤ {item.luan_giai}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div style={{ padding: '15px', textAlign: 'center', opacity: 0.5, fontStyle: 'italic', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '6px' }}>Bình hòa, không có xung hợp rõ ràng.</div>
                                                )}
                                            </div>

                                            {/* Địa Chi Relationship */}
                                            <div className="rel-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '8px', flex: 1 }}>
                                                <h4 style={{ color: '#e0e0e0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '12px', fontSize: '1.1em' }}>🟤 ĐỊA CHI (Nội Tượng)</h4>
                                                {data.phan_tich.quan_he_can_chi.dia_chi && data.phan_tich.quan_he_can_chi.dia_chi.length > 0 ? (
                                                    data.phan_tich.quan_he_can_chi.dia_chi.map((item, idx) => (
                                                        <div key={idx} className="rel-item" style={{ marginBottom: '8px', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', borderLeft: item.loai.includes('Hợp') ? '3px solid #3498db' : (item.loai.includes('Hình') ? '3px solid #f39c12' : '3px solid #e74c3c') }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <span style={{ fontWeight: 'bold', color: item.loai.includes('Hợp') ? '#3498db' : (item.loai.includes('Hình') ? '#f39c12' : '#e74c3c'), fontSize: '1.05em' }}>{item.loai}</span>
                                                                <span style={{ fontSize: '0.8em', opacity: 0.6, background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>{item.tru}</span>
                                                            </div>
                                                            <div style={{ marginTop: '6px', fontSize: '0.95em' }}>{item.chi_tiet} <span style={{ opacity: 0.6 }}>({item.ten})</span></div>
                                                            {item.luan_giai && (
                                                                <div style={{ marginTop: '8px', fontSize: '0.9em', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '6px', lineHeight: '1.4' }}>
                                                                    ➤ {item.luan_giai}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div style={{ padding: '15px', textAlign: 'center', opacity: 0.5, fontStyle: 'italic', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '6px' }}>Địa chi yên ổn.</div>
                                                )}
                                            </div>

                                            {/* NEW: GROUPED RELATIONSHIPS (Integrated from 4.9) */}
                                            {data.phan_tich.quan_he_mo_rong && (
                                                <div className="extended-rels-integrated" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    {/* Thiên Can Hợp */}
                                                    {data.phan_tich.quan_he_mo_rong.can_hop?.length > 0 && (
                                                        <div style={{ background: 'rgba(46, 204, 113, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #2ecc71' }}>
                                                            <h5 style={{ color: '#2ecc71', marginTop: 0, fontSize: '0.9em', textTransform: 'uppercase' }}>✨ Thiên Can Ngũ Hợp</h5>
                                                            {data.phan_tich.quan_he_mo_rong.can_hop.map((h, i) => (
                                                                <div key={i} style={{ fontSize: '0.85em', marginTop: '5px' }}>• <b>{h.ten}:</b> {h.chi_tiet}</div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {/* Địa Chi Hợp/Hội */}
                                                    {data.phan_tich.quan_he_mo_rong.chi_hop?.length > 0 && (
                                                        <div style={{ background: 'rgba(52, 152, 219, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #3498db' }}>
                                                            <h5 style={{ color: '#3498db', marginTop: 0, fontSize: '0.9em', textTransform: 'uppercase' }}>💎 Địa Chi Tam Hợp / Lục Hợp</h5>
                                                            {data.phan_tich.quan_he_mo_rong.chi_hop.map((h, i) => (
                                                                <div key={i} style={{ fontSize: '0.85em', marginTop: '5px' }}>• <b>{h.loai}:</b> {h.chi_tiet} ({h.ten})</div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {/* Các quan hệ hung (Xung, Hình, Hại, Phá) */}
                                                    {(data.phan_tich.quan_he_mo_rong.chi_xung?.length > 0 || data.phan_tich.quan_he_mo_rong.chi_hinh?.length > 0 || data.phan_tich.quan_he_mo_rong.chi_hai?.length > 0 || data.phan_tich.quan_he_mo_rong.chi_pha?.length > 0) && (
                                                        <div style={{ background: 'rgba(231, 76, 60, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #e74c3c' }}>
                                                            <h5 style={{ color: '#e74c3c', marginTop: 0, fontSize: '0.9em', textTransform: 'uppercase' }}>⚠️ Xung - Hình - Hại - Phá</h5>
                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px' }}>
                                                                {[
                                                                    ...data.phan_tich.quan_he_mo_rong.chi_xung.map(x => ({ ...x, label: 'Xung' })),
                                                                    ...data.phan_tich.quan_he_mo_rong.chi_hinh.map(x => ({ ...x, label: 'Hình' })),
                                                                    ...data.phan_tich.quan_he_mo_rong.chi_hai.map(x => ({ ...x, label: 'Hại' })),
                                                                    ...data.phan_tich.quan_he_mo_rong.chi_pha.map(x => ({ ...x, label: 'Phá' })),
                                                                ].map((h, i) => (
                                                                    <span key={i} style={{ fontSize: '0.8em', background: 'rgba(231, 76, 60, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                                                                        <b>{h.label}:</b> {h.chi_tiet}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        </div>

                                        {/* COLUMN 2: STRENGTH & ROOTS (Căn Khí, Sức Mạnh, Tàng Can) */}
                                        <div className="strength-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            <div className="rel-group" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '8px', height: '100%' }}>
                                                <h4 style={{ color: '#e0e0e0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '12px', fontSize: '1.1em' }}>🌳 CĂN KHÍ & SỨC MẠNH</h4>

                                                {/* Sức Mạnh Summary */}
                                                {data.phan_tich.quan_he_can_chi.manh_yeu && (
                                                    <div style={{ marginBottom: '1.2rem', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #f1c40f' }}>
                                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' }}>
                                                            <span style={{ padding: '4px 8px', borderRadius: '4px', background: data.phan_tich.quan_he_can_chi.manh_yeu.dac_lenh.status ? 'rgba(46, 204, 113, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: data.phan_tich.quan_he_can_chi.manh_yeu.dac_lenh.status ? '#2ecc71' : '#bdc3c7', fontSize: '0.85em', fontWeight: 'bold' }}>
                                                                {data.phan_tich.quan_he_can_chi.manh_yeu.dac_lenh.desc}
                                                            </span>
                                                            <span style={{ padding: '4px 8px', borderRadius: '4px', background: data.phan_tich.quan_he_can_chi.manh_yeu.dac_dia.status ? 'rgba(52, 152, 219, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: data.phan_tich.quan_he_can_chi.manh_yeu.dac_dia.status ? '#3498db' : '#bdc3c7', fontSize: '0.85em', fontWeight: 'bold' }}>
                                                                {data.phan_tich.quan_he_can_chi.manh_yeu.dac_dia.desc}
                                                            </span>
                                                        </div>
                                                        <p style={{ margin: 0, fontStyle: 'italic', fontWeight: 'bold', color: '#f1c40f', fontSize: '1.05em' }}>
                                                            {data.phan_tich.quan_he_can_chi.manh_yeu.ket_luan_so_bo}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Bảng Căn Khí */}
                                                <h5 style={{ fontSize: '0.9em', color: '#bdc3c7', margin: '15px 0 8px 0', textTransform: 'uppercase' }}>1. Danh sách Căn khí (Gốc)</h5>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                                                    {data.phan_tich.quan_he_can_chi.can_khi && data.phan_tich.quan_he_can_chi.can_khi.map((item, idx) => (
                                                        <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '6px', border: item.is_nhat_chu ? '1px solid rgba(231, 76, 60, 0.5)' : '1px dashed rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div>
                                                                <div className={`element-text ${getElementClass(item.can)}`} style={{ fontWeight: 'bold', fontSize: '1em', cursor: 'help' }} title={getTooltip(item.can)}>{item.can}</div>
                                                                <div style={{ fontSize: '0.75em', opacity: 0.5 }}>{item.tru}</div>
                                                            </div>

                                                            <div style={{ textAlign: 'right' }}>
                                                                <div style={{ fontSize: '0.9em', marginBottom: '2px', color: item.co_can ? '#2ecc71' : 'rgba(255,255,255,0.4)', cursor: 'help' }} title={getTooltip(item.trang_thai)}>
                                                                    {item.trang_thai}
                                                                </div>
                                                                {item.roots.length > 0 && (
                                                                    <div style={{ fontSize: '0.8em', opacity: 0.8 }}>
                                                                        Gốc: {item.roots.map(r => r.chi).join(', ')}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Tàng Can */}
                                                <h5 style={{ fontSize: '0.9em', color: '#bdc3c7', margin: '20px 0 8px 0', textTransform: 'uppercase' }}>2. Tàng Can (Khí ẩn)</h5>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                                    {data.phan_tich.quan_he_can_chi.tang_can && data.phan_tich.quan_he_can_chi.tang_can.map((item, idx) => (
                                                        <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                                                            <div style={{ fontSize: '0.75em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px', cursor: 'help' }} title={getTooltip(item.chi)}>{item.chi} ({item.tru})</div>
                                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                                                                {item.can_tang.map((tb, i) => (
                                                                    <span key={i} className={`element-text ${getElementClass(tb.can)}`} style={{ fontWeight: 'bold', fontSize: '0.9em', cursor: 'help' }} title={getTooltip(tb.can)}>{tb.can}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    {/* LUẬN CAN-CHI CHI TIẾT (Full Width) */}
                                    {data.phan_tich.quan_he_can_chi.luan_giai_chi_tiet && (
                                        <div style={{ marginTop: '2rem' }}>
                                            <DetailedReport report={data.phan_tich.quan_he_can_chi.luan_giai_chi_tiet} isMobile={isMobile} />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="analysis-line empty">Đang cập nhật dữ liệu quan hệ...</p>
                            )}
                        </div>
                    </div>

                    {/* 5. CÂN BẰNG NGŨ HÀNH - UPDATED PRO */}
                    <div className="analysis-box glass-card highlight-box" id="section-gods" style={{ marginTop: '2rem' }}>
                        <h3 className="box-title gold">PHÂN TÍCH CHUYÊN SÂU NỘI/NGOẠI CÁCH & DỤNG THẦN</h3>
                        <div className="box-content">
                            {data.phan_tich.can_bang_ngu_hanh ? (
                                <div>
                                    {/* Summary Strength & Structure */}
                                    <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #f1c40f' }}>

                                        <h4 style={{ color: '#f1c40f', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                                            🌟 ĐỊNH CÁCH CỤC: <span style={{ fontSize: '1.2em', marginLeft: '5px', cursor: 'help' }} title={getTooltip('Cách cục')}>{data.phan_tich.can_bang_ngu_hanh.nhan_dinh.cuong_do}</span>
                                        </h4>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.95em' }}>
                                            <div>
                                                <b title={getTooltip('Nhật chủ')} style={{ cursor: 'help' }}>Nhật chủ:</b> <span className={`element-text ${getElementClass(data.phan_tich.can_bang_ngu_hanh.nhan_dinh.ngu_hanh)}`}>{data.phan_tich.can_bang_ngu_hanh.nhan_dinh.nhat_chu}</span>
                                            </div>
                                            <div>
                                                <b>Nguyệt Lệnh:</b> {data.phan_tich.can_bang_ngu_hanh.nhan_dinh.nguyet_lenh}
                                                <span style={{ marginLeft: '6px', fontSize: '0.9em', opacity: 0.8, background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', cursor: 'help' }} title={getTooltip(data.phan_tich.can_bang_ngu_hanh.nhan_dinh.dac_lenh)}>
                                                    {data.phan_tich.can_bang_ngu_hanh.nhan_dinh.dac_lenh || '?'}
                                                </span>
                                            </div>
                                            <div>
                                                <b>Điểm Trợ:</b> <span style={{ color: '#2ecc71' }}>{data.phan_tich.can_bang_ngu_hanh.nhan_dinh.diem_tuong_doi.ho_tro}</span>
                                            </div>
                                            <div>
                                                <b>Điểm Khắc:</b> <span style={{ color: '#e74c3c' }}>{data.phan_tich.can_bang_ngu_hanh.nhan_dinh.diem_tuong_doi.khac_che}</span>
                                            </div>
                                        </div>

                                        {/* Điều Hầu Section */}
                                        {data.phan_tich.can_bang_ngu_hanh.dieu_hau && data.phan_tich.can_bang_ngu_hanh.dieu_hau.can_thiet && (
                                            <div style={{ marginTop: '12px', background: 'rgba(52, 152, 219, 0.15)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.95em', border: '1px dashed rgba(52, 152, 219, 0.4)' }}>
                                                <span style={{ marginRight: '6px', cursor: 'help' }} title={getTooltip('Điều hậu')}>❄️/☀️ <b>Điều Hầu:</b></span>
                                                <span style={{ color: '#fff', fontStyle: 'italic' }}>{data.phan_tich.can_bang_ngu_hanh.dieu_hau.luan_giai}</span>
                                            </div>
                                        )}

                                        {data.phan_tich.can_bang_ngu_hanh.luan_giai_tong_quat && (
                                            <div style={{ marginTop: '12px', fontStyle: 'italic', opacity: 0.9, lineHeight: '1.6' }}>
                                                <span style={{ color: '#f1c40f', marginRight: '5px', float: 'left' }}>➤</span>
                                                <div style={{ marginLeft: '20px' }}>
                                                    {data.phan_tich.can_bang_ngu_hanh.luan_giai_tong_quat.split('<br/>').map((line, idx) => (
                                                        <div key={idx} style={{ marginBottom: '4px' }}>
                                                            {line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
                                                                if (part.startsWith('**') && part.endsWith('**')) return <strong key={pIdx} style={{ color: '#f1c40f' }}>{part.slice(2, -2)}</strong>;
                                                                return part;
                                                            })}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* GODS GRID - 3 Columns */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
                                        {/* DỤNG THẦN */}
                                        <div style={{ background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.15) 0%, rgba(46, 204, 113, 0.05) 100%)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(46, 204, 113, 0.3)' }}>
                                            <h4 style={{ color: '#2ecc71', fontWeight: 'bold', borderBottom: '1px solid rgba(46, 204, 113, 0.3)', paddingBottom: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <span style={{ fontSize: '1.2em', marginRight: '8px' }}>💎</span> DỤNG THẦN (Cốt lõi)
                                            </h4>
                                            <div style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '10px 0', color: '#fff', textShadow: '0 0 10px rgba(46, 204, 113, 0.5)' }}>
                                                {data.phan_tich.can_bang_ngu_hanh.dung_than.ngu_hanh.join(', ') || "Đang xét"}
                                            </div>
                                            <p style={{ fontSize: '0.9em', opacity: 0.8, marginBottom: '0' }}>{data.phan_tich.can_bang_ngu_hanh.dung_than.y_nghia}</p>
                                        </div>

                                        {/* HỶ THẦN */}
                                        <div style={{ background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.15) 0%, rgba(52, 152, 219, 0.05) 100%)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(52, 152, 219, 0.3)' }}>
                                            <h4 style={{ color: '#3498db', fontWeight: 'bold', borderBottom: '1px solid rgba(52, 152, 219, 0.3)', paddingBottom: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <span style={{ fontSize: '1.2em', marginRight: '8px' }}>✨</span> HỶ THẦN (Hỗ trợ)
                                            </h4>
                                            <div style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '10px 0', color: '#fff', textShadow: '0 0 10px rgba(52, 152, 219, 0.5)' }}>
                                                {data.phan_tich.can_bang_ngu_hanh.hy_than.ngu_hanh.join(', ') || "Đang xét"}
                                            </div>
                                            <p style={{ fontSize: '0.9em', opacity: 0.8, marginBottom: '0' }}>{data.phan_tich.can_bang_ngu_hanh.hy_than.y_nghia}</p>
                                        </div>

                                        {/* KỴ THẦN */}
                                        <div style={{ background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.15) 0%, rgba(231, 76, 60, 0.05) 100%)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(231, 76, 60, 0.3)' }}>
                                            <h4 style={{ color: '#e74c3c', fontWeight: 'bold', borderBottom: '1px solid rgba(231, 76, 60, 0.3)', paddingBottom: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                                <span style={{ fontSize: '1.2em', marginRight: '8px' }}>🔥</span> KỴ THẦN (Cần tránh)
                                            </h4>
                                            <div style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '10px 0', color: '#fff', textShadow: '0 0 10px rgba(231, 76, 60, 0.5)' }}>
                                                {data.phan_tich.can_bang_ngu_hanh.ky_than.ngu_hanh.join(', ') || "Đang xét"}
                                            </div>
                                            <p style={{ fontSize: '0.9em', opacity: 0.8, marginBottom: '0' }}>{data.phan_tich.can_bang_ngu_hanh.ky_than.y_nghia}</p>
                                        </div>
                                    </div>

                                    {/* NEW: KHỐI LUẬN CHI TIẾT */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                        {/* Cát Hung */}
                                        {data.phan_tich.can_bang_ngu_hanh.cat_hung && (
                                            <div className="glass-card" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
                                                <h5 style={{ color: '#f39c12', marginBottom: '0.8rem', borderLeft: '3px solid #f39c12', paddingLeft: '8px' }}>LUẬN CÁT HUNG TỔNG THỂ</h5>
                                                <ul className="dash-list" style={{ paddingLeft: '10px' }}>
                                                    <li style={{ marginBottom: '8px' }}><span style={{ color: '#2ecc71', fontWeight: 'bold' }}>Vận Tốt:</span> {data.phan_tich.can_bang_ngu_hanh.cat_hung.gap_van_tot}</li>
                                                    <li style={{ marginBottom: '8px' }}><span style={{ color: '#e74c3c', fontWeight: 'bold' }}>Vận Xấu:</span> {data.phan_tich.can_bang_ngu_hanh.cat_hung.gap_van_xau}</li>
                                                </ul>
                                            </div>
                                        )}

                                        {/* Nghề Nghiệp */}
                                        {data.phan_tich.can_bang_ngu_hanh.dung_than.nghe_nghiep && (
                                            <div className="glass-card" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
                                                <h5 style={{ color: '#9b59b6', marginBottom: '0.8rem', borderLeft: '3px solid #9b59b6', paddingLeft: '8px' }}>LUẬN NGHỀ NGHIỆP & ĐỊNH HƯỚNG</h5>
                                                <div style={{ fontSize: '0.95em', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)' }}>
                                                    {/* Simple parser for our backend rich text */}
                                                    {data.phan_tich.can_bang_ngu_hanh.dung_than.nghe_nghiep.split('<br/>').map((line, idx) => (
                                                        <div key={idx} style={{ marginBottom: '6px' }}>
                                                            {line.split(/(\*\*.*?\*\*|<b>.*?<\/b>)/g).map((part, pIdx) => {
                                                                if (part.startsWith('**') && part.endsWith('**')) return <strong key={pIdx} style={{ color: '#fff' }}>{part.slice(2, -2)}</strong>;
                                                                if (part.startsWith('<b>') && part.endsWith('</b>')) return <strong key={pIdx} style={{ color: '#fff' }}>{part.slice(3, -4)}</strong>;
                                                                return part;
                                                            })}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Sức Khỏe */}
                                        {data.phan_tich.can_bang_ngu_hanh.ky_than.suc_khoe && (
                                            <div className="glass-card" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', gridColumn: '1 / -1' }}>
                                                <h5 style={{ color: '#e74c3c', marginBottom: '0.8rem', borderLeft: '3px solid #e74c3c', paddingLeft: '8px' }}>LUẬN SỨC KHỎE ĐÔNG Y</h5>
                                                <div style={{ fontSize: '0.95em', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)' }}>
                                                    {data.phan_tich.can_bang_ngu_hanh.ky_than.suc_khoe.split('<br/>').map((line, idx) => (
                                                        <div key={idx} style={{ marginBottom: '6px' }}>
                                                            {line.split(/(\*\*.*?\*\*|<b>.*?<\/b>)/g).map((part, pIdx) => {
                                                                if (part.startsWith('**') && part.endsWith('**')) return <strong key={pIdx} style={{ color: '#ff7675' }}>{part.slice(2, -2)}</strong>;
                                                                if (part.startsWith('<b>') && part.endsWith('</b>')) return <strong key={pIdx} style={{ color: '#ff7675' }}>{part.slice(3, -4)}</strong>;
                                                                return part;
                                                            })}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Phong Thủy (NEW) */}
                                        {data.phan_tich.can_bang_ngu_hanh.phong_thuy && (
                                            <div className="glass-card" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', gridColumn: '1 / -1', border: '1px solid rgba(0, 206, 201, 0.3)' }}>
                                                <h5 style={{ color: '#00cec9', marginBottom: '0.8rem', borderLeft: '3px solid #00cec9', paddingLeft: '8px' }}>
                                                    🔮 PHONG THỦY CẢI VẬN (Dụng thần: {data.phan_tich.can_bang_ngu_hanh.phong_thuy.dung_than_chinh})
                                                </h5>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.95em', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)' }}>
                                                    {data.phan_tich.can_bang_ngu_hanh.phong_thuy.loi_khuyen.split('<br/>').map((line, idx) => {
                                                        const parts = line.split(':');
                                                        const label = parts[0]?.replace(/\*\*/g, '').trim();
                                                        const content = parts[1]?.trim();
                                                        if (!content) return null;

                                                        return (
                                                            <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '6px' }}>
                                                                <div style={{ color: '#81ecec', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase', fontSize: '0.85em' }}>{label}</div>
                                                                <div style={{ color: '#fff' }}>{content}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="analysis-line empty">Đang phân tích ngũ hành...</p>
                            )}
                        </div>
                    </div>

                    {/* 4.5. LUẬN TĨNH (LÁ SỐ GỐC) - NEW SECTION */}
                    <div className="analysis-box glass-card highlight-box" id="section-static" style={{ marginTop: '2rem', border: '1px solid rgba(155, 89, 182, 0.4)' }}>
                        <h3 className="box-title" style={{ color: '#9b59b6', textShadow: '0 0 10px rgba(155, 89, 182, 0.4)' }}>LUẬN TĨNH (LÁ SỐ GỐC - MỆNH CHI BẢN TƯỢNG)</h3>
                        <div className="box-content">
                            {data.phan_tich.luan_tinh ? (
                                <div className="grid grid-cols-1 gap-6">
                                    {/* 1. TÍNH CÁCH */}
                                    <DataCard
                                        title="TÍNH CÁCH CỐT LÕI"
                                        icon="🧠"
                                        headerColor="#9b59b6"
                                        dataObj={data.phan_tich.luan_tinh.personality}
                                    />

                                    {/* 2. SỰ NGHIỆP */}
                                    <DataCard
                                        title="SỰ NGHIỆP & TÀI LỘC"
                                        icon="💰"
                                        headerColor="#f1c40f"
                                        dataObj={data.phan_tich.luan_tinh.career}
                                    />

                                    {/* 3. HÔN NHÂN */}
                                    <DataCard
                                        title="HÔN NHÂN & GIA ĐẠO"
                                        icon="❤️"
                                        headerColor="#e74c3c"
                                        dataObj={data.phan_tich.luan_tinh.marriage}
                                    />
                                </div>
                            ) : (
                                <p className="analysis-line empty">Đang phân tích tĩnh...</p>
                            )}
                        </div>
                    </div>

                    {/* 4.6. LUẬN ĐỘNG (ĐẠI VẬN - LƯU NIÊN) - NEW SECTION */}
                    <div className="analysis-box glass-card highlight-box" id="section-dynamic" style={{ marginTop: '2rem', border: '1px solid rgba(52, 152, 219, 0.4)' }}>
                        <h3 className="box-title" style={{ color: '#3498db', textShadow: '0 0 10px rgba(52, 152, 219, 0.4)' }}>
                            LUẬN ĐỘNG (ỨNG KỲ - ĐẠI VẬN & LƯU NIÊN)
                        </h3>
                        <div className="box-content">
                            {data.phan_tich.luan_dong ? (
                                <div className="grid grid-cols-1 gap-6">
                                    {/* 1. ĐẠI VẬN (10 NĂM) */}
                                    <DataCard
                                        title={`ĐẠI VẬN HIỆN TẠI (${data.phan_tich.luan_dong.dai_van.gan} ${data.phan_tich.luan_dong.dai_van.zhi})`}
                                        icon="🌊"
                                        headerColor="#3498db"
                                        dataObj={data.phan_tich.luan_dong.dai_van}
                                    />

                                    {/* 2. LƯU NIÊN (HIỆN TẠI) */}
                                    <DataCard
                                        title="LƯU NIÊN NĂM NAY"
                                        icon="📅"
                                        headerColor="#2ecc71"
                                        dataObj={data.phan_tich.luan_dong.luu_nien}
                                    />
                                </div>
                            ) : (
                                <p className="analysis-line empty">Chưa vào đại vận hoặc thiếu dữ liệu...</p>
                            )}
                        </div>
                    </div>

                    {/* 4.7. KINH ĐIỂN CỔ THƯ - NEW SECTION */}
                    {data.phan_tich.kinh_dien && (
                        <div className="analysis-box glass-card" id="section-classic" style={{ marginTop: '2rem', border: '1px solid rgba(241, 196, 15, 0.3)' }}>
                            <h3 className="box-title" style={{ color: '#f1c40f' }}>📜 PHÂN TÍCH KINH ĐIỂN CỔ THƯ</h3>
                            <div className="box-content">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {data.phan_tich.kinh_dien.nhat_chu?.mo_ta && (
                                        <div className="classic-card-chart" style={{ background: 'rgba(241, 196, 15, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(241, 196, 15, 0.2)' }}>
                                            <h4 style={{ color: '#f1c40f', marginTop: 0, marginBottom: '0.8rem', fontSize: '1.1em' }}>🌟 Nhật Chủ {data.phan_tich.kinh_dien.nhat_chu.can}</h4>
                                            <p style={{ margin: 0, fontSize: '0.95em', lineHeight: '1.7', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
                                                "{data.phan_tich.kinh_dien.nhat_chu.mo_ta}"
                                            </p>
                                        </div>
                                    )}
                                    {data.phan_tich.kinh_dien.cung_phu_the?.mo_ta && (
                                        <div className="classic-card-chart" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                            <h4 style={{ color: '#ecf0f1', marginTop: 0, marginBottom: '0.8rem', fontSize: '1.1em' }}>🏠 Cung Phu Thê ({data.phan_tich.kinh_dien.cung_phu_the.chi})</h4>
                                            <p style={{ margin: 0, fontSize: '0.95em', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)' }}>
                                                {data.phan_tich.kinh_dien.cung_phu_the.mo_ta}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4.8. SỨC KHỎE NGŨ HÀNH (CHUYÊN SÂU) - NEW SECTION */}
                    {data.phan_tich.suc_khoe && (
                        <div className="analysis-box glass-card" id="section-health" style={{ marginTop: '2rem', border: '1px solid rgba(46, 204, 113, 0.3)' }}>
                            <h3 className="box-title" style={{ color: '#2ecc71' }}>🩺 TƯ VẤN SỨC KHỎE NGŨ HÀNH</h3>
                            <div className="box-content">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ background: 'rgba(46, 204, 113, 0.1)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                                        <div style={{ color: '#2ecc71', fontSize: '0.8em', fontWeight: 'bold' }}>🧭 HƯỚNG TỐT</div>
                                        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{data.phan_tich.suc_khoe.huong_tot}</div>
                                    </div>
                                    <div style={{ background: 'rgba(46, 204, 113, 0.1)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                                        <div style={{ color: '#2ecc71', fontSize: '0.8em', fontWeight: 'bold' }}>🎨 MÀU MAY MẮN</div>
                                        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{data.phan_tich.suc_khoe.mau_may_man}</div>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #2ecc71' }}>
                                    <p style={{ margin: 0, lineHeight: '1.8', color: 'rgba(255,255,255,0.9)' }} dangerouslySetInnerHTML={{ __html: data.phan_tich.suc_khoe.loi_khuyen.replace(/\*\*(.*?)\*\*/g, '<b style="color:#2ecc71">$1</b>') }} />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
};

// --- Table of Contents Component ---
const BaziTOC = () => {
    const [activeSection, setActiveSection] = useState('section-chart');
    const [isExpanded, setIsExpanded] = useState(false);

    const sections = [
        { id: 'section-chart', title: 'Lá Số Gốc', icon: '📊' },
        { id: 'section-structure', title: 'Cấu Trúc', icon: '🏗️' },
        { id: 'section-shishen', title: 'Thập Thần', icon: '👤' },
        { id: 'section-relations', title: 'Quan Hệ Can-Chi', icon: '🤝' },
        { id: 'section-gods', title: 'Dụng Thần', icon: '💎' },
        { id: 'section-static', title: 'Luận Tĩnh', icon: '🧘' },
        { id: 'section-dynamic', title: 'Luận Động', icon: '⚡' },
        { id: 'section-classic', title: 'Kinh Điển', icon: '📜' },
        { id: 'section-health', title: 'Sức Khỏe', icon: '🩺' },
    ];

    useEffect(() => {
        const scrollContainer = document.querySelector('.mobile-content');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.2,
                root: scrollContainer || null,
                rootMargin: '-10% 0px -70% 0px'
            }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Use scrollIntoView which is more robust and respects scroll-margin-top
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setIsExpanded(false);
        }
    };

    return (
        <>
            {/* Desktop TOC */}
            <nav className="bazi-toc-desktop">
                <div className="toc-header">MỤC LỤC</div>
                <div className="toc-list">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className={`toc-item ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(section.id)}
                        >
                            <span className="toc-icon">{section.icon}</span>
                            <span className="toc-text">{section.title}</span>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Mobile TOC Floating Button rendered via Portal */}
            {createPortal(
                <div className={`bazi-toc-mobile ${isExpanded ? 'active' : ''}`}>
                    <button className="toc-trigger" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? '✕' : '📑'}
                    </button>
                    <div className="toc-mobile-menu glass-card">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className={`toc-mobile-item ${activeSection === section.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(section.id)}
                            >
                                <span className="toc-icon">{section.icon}</span>
                                <span className="toc-text">{section.title}</span>
                            </div>
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

// Component con để hiển thị từng thẻ phân tích Đa Biến
const DataCard = ({ title, icon, headerColor, dataObj }) => {
    if (!dataObj) return null;

    // Helper to format rich text
    const formatText = (text) => {
        if (!text) return '';
        // If text is already HTML-like (contains tags), preserve it but still parse Markdown
        // Split by newlines to handle lists naturally
        return text.split('\n').map(line => {
            let processed = line.trim();
            if (!processed) return '<div style="height:4px"></div>';

            // Bold: **text**
            processed = processed.replace(/\*\*(.*?)\*\*/g, '<b style="color:#fff">$1</b>');

            // Italic: _text_
            processed = processed.replace(/_(.*?)_/g, '<i style="opacity:0.9">$1</i>');

            // Highlight/Header: ♦ or Starts with uppercase usually
            if (processed.startsWith('♦')) {
                return `<div style="color:${headerColor}; font-weight:bold; margin-top:6px; margin-bottom:2px; padding-bottom:2px">${processed}</div>`;
            }

            // List items: ➤, -, >
            if (processed.startsWith('➤') || processed.startsWith('-') || processed.startsWith('>')) {
                const content = processed.substring(1).trim();
                return `<div style="display:flex; margin-bottom:4px"><span style="color:${headerColor}; margin-right:6px">➤</span><span style="color:rgba(255,255,255,0.9)">${content}</span></div>`;
            }

            // Default paragraph
            return `<div style="margin-bottom:4px">${processed}</div>`;
        }).join('');
    };

    return (
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${headerColor}40`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ background: `${headerColor}20`, color: headerColor, padding: '12px 16px', margin: 0, borderBottom: `1px solid ${headerColor}40`, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px', fontSize: '1.2em' }}>{icon}</span> {title}
            </h4>
            <div style={{ padding: '16px', flex: 1 }}>

                {/* 1. BIẾN SỐ */}
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.8em', textTransform: 'uppercase', color: '#bdc3c7', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>🔹 PHÂN TÍCH BIẾN SỐ</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {dataObj.variables && dataObj.variables.map((v, i) => (
                            <li key={i} style={{ fontSize: '0.9em', color: '#ecf0f1', padding: '4px 0', borderBottom: '1px dashed rgba(255,255,255,0.1)' }} dangerouslySetInnerHTML={{ __html: formatText(v) }}></li>
                        ))}
                    </ul>
                </div>

                {/* 2. HỘI TỤ */}
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.8em', textTransform: 'uppercase', color: '#bdc3c7', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>🔹 HỘI TỤ PHÂN TÍCH</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {dataObj.convergence && dataObj.convergence.map((c, i) => (
                            <li key={i} style={{ fontSize: '0.9em', color: '#ecf0f1', padding: '4px 0', display: 'flex' }}>
                                <span style={{ marginRight: '6px', color: '#2ecc71' }}>➤</span>
                                <span>{c}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. LUẬN GIẢI */}
                <div>
                    <div style={{ fontSize: '0.8em', textTransform: 'uppercase', color: '#bdc3c7', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>🔹 LUẬN GIẢI (CÓ ĐIỀU KIỆN)</div>
                    <div style={{ background: `${headerColor}10`, padding: '12px', borderRadius: '8px', borderLeft: `3px solid ${headerColor}`, fontSize: '0.95em', color: '#ecf0f1', lineHeight: '1.6', fontStyle: 'italic' }}>
                        <div dangerouslySetInnerHTML={{ __html: formatText(dataObj.conclusion) }} />
                    </div>
                </div>

            </div>
        </div>
    );
};



const ReportSection = ({ title, children }) => (
    <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ color: '#ecf0f1', fontSize: '1.1em', fontWeight: 'bold', marginBottom: '1rem', borderLeft: '4px solid #3498db', paddingLeft: '10px' }}>{title}</h4>
        <div style={{ paddingLeft: '10px' }}>{children}</div>
    </div>
);

const DetailedReport = ({ report, isMobile }) => {
    if (!report) return null;
    return (
        <div className="detailed-report-6-parts glass-card" style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ borderBottom: '2px solid rgba(52, 152, 219, 0.5)', paddingBottom: '15px', marginBottom: '2rem', color: '#3498db', fontSize: '1.4em', letterSpacing: '1px', textAlign: 'center' }}>LUẬN CAN-CHI</h3>

            {/* PART 1 */}
            <ReportSection title={report.phan_1_hien_tuong.title}>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <h5 className="sub-head" style={{ color: '#bdc3c7', borderBottom: '1px dashed #7f8c8d' }}>🔹 Thiên Can</h5>
                        <ul className="dash-list" style={{ marginTop: '10px' }}>{report.phan_1_hien_tuong.thien_can.map((l, i) => <li key={i} style={{ marginBottom: '5px' }}>{l}</li>)}</ul>
                    </div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <h5 className="sub-head" style={{ color: '#bdc3c7', borderBottom: '1px dashed #7f8c8d' }}>🔹 Địa Chi</h5>
                        <ul className="dash-list" style={{ marginTop: '10px' }}>{report.phan_1_hien_tuong.dia_chi.map((l, i) => <li key={i} style={{ marginBottom: '5px' }}>{l}</li>)}</ul>
                    </div>
                </div>
                <div className="highlight-box" style={{ marginTop: '1.5rem', background: 'rgba(52, 152, 219, 0.1)', padding: '15px', borderRadius: '6px', borderLeft: '3px solid #3498db' }}>
                    👉 <b>Hiện tượng nổi bật:</b> {report.phan_1_hien_tuong.noi_bat.join(' ')}
                </div>
            </ReportSection>

            <div className="divider-line" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1.5rem 0' }}></div>

            {/* PART 2 */}
            <ReportSection title={report.phan_2_luc_khi.title}>
                <p><b>Xét khí mùa:</b> {report.phan_2_luc_khi.khi_mua}</p>
                <div style={{ margin: '1rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <b style={{ color: '#2ecc71' }}>Gốc rễ:</b>
                        <ul className="dash-list" style={{ marginTop: '5px' }}>{report.phan_2_luc_khi.goc_re.map((l, i) => <li key={i}>{l}</li>)}</ul>
                    </div>
                    <div>
                        <b style={{ color: '#e74c3c' }}>Xung phá:</b>
                        <ul className="dash-list" style={{ marginTop: '5px' }}>{report.phan_2_luc_khi.xung_pha.map((l, i) => <li key={i}>{l}</li>)}</ul>
                    </div>
                </div>
                <p className="conclusion-text" style={{ color: '#f1c40f', fontWeight: 'bold', marginTop: '10px', fontSize: '1.1em' }}>📌 Kết luận lực: {report.phan_2_luc_khi.ket_luan}</p>
            </ReportSection>

            <div className="divider-line" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1.5rem 0' }}></div>

            {/* PART 3 */}
            <ReportSection title={report.phan_3_tinh_chat.title}>
                {isMobile ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {report.phan_3_tinh_chat.bang_y_nghia.map((row, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #3498db' }}>
                                <div style={{ fontWeight: 'bold', color: '#ecf0f1', marginBottom: '4px' }}>{row.quan_he}</div>
                                <div style={{ fontSize: '0.9em', opacity: 0.9, lineHeight: '1.4' }}>{row.y_nghia}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95em', marginBottom: '1rem' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '10px', textAlign: 'left', width: '40%' }}>Quan hệ</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Ý nghĩa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.phan_3_tinh_chat.bang_y_nghia.map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#ecf0f1' }}>{row.quan_he}</td>
                                    <td style={{ padding: '10px', opacity: 0.9 }}>{row.y_nghia}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {report.phan_3_tinh_chat.co_ngu.length > 0 && (
                    <div className="scroll-paper" style={{ fontStyle: 'italic', opacity: 0.8, color: '#bdc3c7', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', marginTop: '1rem' }}>
                        📜 Cổ ngữ:
                        {report.phan_3_tinh_chat.co_ngu.map((q, i) => <p key={i} style={{ margin: '4px 0 0 10px' }}>{q}</p>)}
                    </div>
                )}
            </ReportSection>

            <div className="divider-line" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1.5rem 0' }}></div>

            {/* PART 4 */}
            <ReportSection title={report.phan_4_vi_tri.title}>
                {isMobile ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {report.phan_4_vi_tri.phan_tich.map((row, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #e74c3c' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: 'bold', color: '#ecf0f1' }}>{row.xung_hop}</span>
                                    <span style={{ fontSize: '0.8em', opacity: 0.7 }}>{row.tru}</span>
                                </div>
                                <div style={{ fontSize: '0.9em', opacity: 0.9, lineHeight: '1.4' }}>{row.ung}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95em', marginBottom: '1rem' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.1)' }}>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Xung/Hợp</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Trụ</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Ứng sự</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.phan_4_vi_tri.phan_tich.map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '10px', fontWeight: 'bold' }}>{row.xung_hop}</td>
                                        <td style={{ padding: '10px' }}>{row.tru}</td>
                                        <td style={{ padding: '10px', opacity: 0.9 }}>{row.ung}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <p className="conclusion-text" style={{ color: '#e74c3c', marginTop: '10px', fontWeight: 'bold', fontSize: isMobile ? '0.95em' : '1em' }}>{report.phan_4_vi_tri.ket_luan}</p>
            </ReportSection>

            <div className="divider-line" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1.5rem 0' }}></div>

            {/* PART 5 */}
            <ReportSection title={report.phan_5_chu_khach.title}>
                <h5 style={{ color: '#f39c12', marginBottom: '10px', fontSize: '1em' }}>{report.phan_5_chu_khach.nhat_chu}</h5>
                <ul className="dash-list" style={{ marginBottom: '1rem', paddingLeft: '20px' }}>
                    {report.phan_5_chu_khach.tuong_tac.map((l, i) => <li key={i} style={{ marginBottom: '5px' }}>{l}</li>)}
                </ul>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '8px' }}>
                        <b>📌 Vai trò:</b> <span style={{ color: '#3498db', fontWeight: 'bold' }}>{report.phan_5_chu_khach.vai_tro}</span>
                    </div>
                    <div>
                        <b>Xu hướng:</b> <span style={{ opacity: 0.9, fontStyle: 'italic' }}>{report.phan_5_chu_khach.xu_huong}</span>
                    </div>
                </div>
            </ReportSection>

            <div className="divider-line" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1.5rem 0' }}></div>

            {/* PART 6 */}
            <ReportSection title={report.phan_6_ung_su.title}>
                <p style={{ marginBottom: '10px' }}><b>Ứng khi gặp:</b> <span style={{ color: '#e67e22' }}>{report.phan_6_ung_su.ung_khi}</span></p>
                <div style={{ margin: '1rem 0' }}>
                    <b>➡️ Dễ xảy ra:</b>
                    <ul className="dash-list" style={{ marginTop: '5px', paddingLeft: '20px' }}>{report.phan_6_ung_su.du_bao.map((l, i) => <li key={i} style={{ marginBottom: '5px' }}>{l}</li>)}</ul>
                </div>
                {report.phan_6_ung_su.co_quyet.length > 0 && (
                    <div className="scroll-paper" style={{ marginTop: '1.5rem', fontStyle: 'italic', opacity: 0.8, borderLeft: '3px solid #95a5a6', paddingLeft: '15px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>📜 Cổ quyết:</div>
                        {report.phan_6_ung_su.co_quyet.map((q, i) => <div key={i} style={{ marginBottom: '3px' }}>{q}</div>)}
                    </div>
                )}
            </ReportSection>

        </div>
    );
};

export default BaziChart;
