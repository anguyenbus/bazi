import React from 'react';
import { getTooltip } from '../../data/baziTerms';

/**
 * ChartDetails - Hiển thị thông tin cơ bản và điểm ngũ hành
 * Với tooltips giải thích các thuật ngữ Bát Tự
 */

// Component hiển thị label với tooltip
const LabelWithTip = ({ term, children }) => {
    const tooltip = getTooltip(term);
    return (
        <span className={tooltip ? "term-tooltip" : ""} title={tooltip || undefined}>
            {children || term}
            {tooltip && <span className="tooltip-icon">ⓘ</span>}
        </span>
    );
};

const ChartDetails = ({ data }) => {
    if (!data) return null;

    const { thong_tin_co_ban, diem_so } = data;

    // Element mapping
    const elementColors = {
        'Wood': '#2ecc71', 'Fire': '#e74c3c', 'Earth': '#f39c12',
        'Metal': '#95a5a6', 'Water': '#3498db'
    };
    const elementNames = {
        'Wood': 'MỘC', 'Fire': 'HỎA', 'Earth': 'THỔ', 'Metal': 'KIM', 'Water': 'THỦY'
    };
    const elementIcons = {
        'Wood': '❧', 'Fire': '◈', 'Earth': '◆', 'Metal': '◇', 'Water': '◎'
    };

    return (
        <div className="chart-details-simplified">
            {/* THÔNG TIN CƠ BẢN */}
            <div className="info-section">
                <h4 className="section-title">THÔNG TIN CƠ BẢN</h4>
                <div className="info-grid">
                    {thong_tin_co_ban?.ten && (
                        <div className="info-item highlight">
                            <span className="label">Tên</span>
                            <span className="value gold">{thong_tin_co_ban.ten}</span>
                        </div>
                    )}
                    <div className="info-item">
                        <span className="label">Giới tính</span>
                        <span className="value">{thong_tin_co_ban?.gioi_tinh || '---'} {thong_tin_co_ban?.xung_ho ? `(${thong_tin_co_ban.xung_ho})` : ''}</span>
                    </div>
                    {thong_tin_co_ban?.tuoi !== undefined && thong_tin_co_ban?.tuoi !== null && (
                        <div className="info-item">
                            <span className="label">Tuổi</span>
                            <span className="value">{thong_tin_co_ban.tuoi}</span>
                        </div>
                    )}
                    {thong_tin_co_ban?.giai_doan_doi && (
                        <div className="info-item">
                            <span className="label">Giai đoạn</span>
                            <span className="value">{thong_tin_co_ban.giai_doan_doi}</span>
                        </div>
                    )}
                    <div className="info-item">
                        <span className="label">Dương lịch</span>
                        <span className="value">{thong_tin_co_ban?.ngay_duong_lich || '---'}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Âm lịch</span>
                        <span className="value">{thong_tin_co_ban?.ngay_am_lich || '---'}</span>
                    </div>
                    {thong_tin_co_ban?.gio_sinh !== undefined && thong_tin_co_ban?.gio_sinh !== null && (
                        <div className="info-item">
                            <span className="label">Giờ sinh</span>
                            <span className="value">{thong_tin_co_ban.gio_sinh}h (giờ {thong_tin_co_ban.gio_chi})</span>
                        </div>
                    )}
                    {thong_tin_co_ban?.tiet_khi && (
                        <div className="info-item">
                            <span className="label"><LabelWithTip term="Tiết khí" /></span>
                            <span className="value">{thong_tin_co_ban.tiet_khi}</span>
                        </div>
                    )}
                    {thong_tin_co_ban?.bat_tu?.thang && (
                        <div className="info-item highlight">
                            <span className="label"><LabelWithTip term="Nguyệt lệnh" /></span>
                            <span className="value gold">{thong_tin_co_ban.bat_tu.thang[1]}</span>
                        </div>
                    )}
                    {thong_tin_co_ban?.nhap_van && (
                        <div className="info-item">
                            <span className="label"><LabelWithTip term="Nhập vận" /></span>
                            <span className="value">{thong_tin_co_ban.nhap_van}</span>
                        </div>
                    )}
                    <div className="info-item highlight">
                        <span className="label"><LabelWithTip term="Mệnh cung" /></span>
                        <span className="value gold">{thong_tin_co_ban?.menh_cung || '---'}</span>
                    </div>
                    <div className="info-item">
                        <span className="label"><LabelWithTip term="Thai nguyên" /></span>
                        <span className="value">{thong_tin_co_ban?.thai_nguyen || '---'}</span>
                    </div>
                    <div className="info-item">
                        <span className="label"><LabelWithTip term="Thân cung" /></span>
                        <span className="value">{thong_tin_co_ban?.than_cung || '---'}</span>
                    </div>
                    {thong_tin_co_ban?.can_yeu && (
                        <div className="info-item">
                            <span className="label">Căn</span>
                            <span className="value">{thong_tin_co_ban.can_yeu}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* NẠP ÂM - 4 pillars with feng shui colors */}
            {data.chi_tiet_tru && data.chi_tiet_tru.length >= 4 && (() => {
                // Helper function to extract element class from nap_am text
                const getElementClass = (napAm) => {
                    if (!napAm) return '';
                    if (napAm.includes('Thổ')) return 'earth';
                    if (napAm.includes('Mộc')) return 'wood';
                    if (napAm.includes('Kim')) return 'metal';
                    if (napAm.includes('Thủy')) return 'water';
                    if (napAm.includes('Hỏa')) return 'fire';
                    return '';
                };

                const pillars = [
                    { label: 'Năm', napAm: data.chi_tiet_tru[0]?.nap_am },
                    { label: 'Tháng', napAm: data.chi_tiet_tru[1]?.nap_am },
                    { label: 'Ngày', napAm: data.chi_tiet_tru[2]?.nap_am },
                    { label: 'Giờ', napAm: data.chi_tiet_tru[3]?.nap_am },
                ];

                return (
                    <div className="napam-row">
                        <h4 className="napam-title"><LabelWithTip term="Nạp âm">NẠP ÂM</LabelWithTip></h4>
                        <div className="napam-items">
                            {pillars.map((pillar, idx) => {
                                const elementClass = getElementClass(pillar.napAm);
                                return (
                                    <div key={idx} className={`napam-item ${elementClass}`}>
                                        <span className="napam-label">{pillar.label}</span>
                                        <span className={`napam-value ${elementClass}`}>{pillar.napAm || '---'}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })()}

            {/* SỨC MẠNH & NHIỆT ĐỘ */}
            <div className="strength-row">
                <div className={`strength-badge ${diem_so?.suc_manh?.la_nhuoc ? 'weak' : 'strong'}`}>
                    <LabelWithTip term={diem_so?.suc_manh?.la_nhuoc ? "Thân nhược" : "Thân vượng"}>
                        {diem_so?.suc_manh?.la_nhuoc ? '🔻 NHẬT CHỦ NHƯỢC' : '🔺 NHẬT CHỦ VƯỢNG'}
                    </LabelWithTip>
                </div>
                <div className="stat-pill">
                    <span className="stat-label">Điểm mạnh</span>
                    <span className="stat-val">{diem_so?.suc_manh?.diem_manh || 0}</span>
                </div>
                <div className="stat-pill">
                    <span className="stat-label">Tổng điểm</span>
                    <span className="stat-val">{diem_so?.suc_manh?.tong_diem || 0}</span>
                </div>
                <div className="stat-pill">
                    <span className="stat-label"><LabelWithTip term="Nhiệt độ" /></span>
                    <span className="stat-val">{diem_so?.nhiet_do?.toFixed(1) || 0}°</span>
                </div>
            </div>

            {/* ĐIỂM NGŨ HÀNH - Raw scores */}
            <div className="elements-row">
                {diem_so?.ngu_hanh_vn && (() => {
                    const scores = diem_so.ngu_hanh_vn;
                    const maxVal = Math.max(...Object.values(scores), 1);
                    const vnKeys = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
                    const keyMap = {
                        'Kim': { en: 'Metal', name: 'KIM', icon: '◇', color: '#95a5a6' },
                        'Mộc': { en: 'Wood', name: 'MỘC', icon: '❧', color: '#2ecc71' },
                        'Thủy': { en: 'Water', name: 'THỦY', icon: '◎', color: '#3498db' },
                        'Hỏa': { en: 'Fire', name: 'HỎA', icon: '◈', color: '#e74c3c' },
                        'Thổ': { en: 'Earth', name: 'THỔ', icon: '◆', color: '#f39c12' },
                    };
                    return vnKeys.filter(k => scores[k] !== undefined).map(key => {
                        const info = keyMap[key];
                        const value = scores[key];
                        const percent = (value / maxVal) * 100;
                        return (
                            <div key={key} className="element-pill" style={{ borderColor: info.color }}>
                                <span className="e-icon">{info.icon}</span>
                                <div className="element-pill-content">
                                    <span className="e-name term-tooltip" title={getTooltip(info.name)} style={{ color: info.color }}>
                                        {info.name}
                                    </span>
                                    <div className="e-bar">
                                        <div className="e-fill" style={{ width: `${percent}%`, backgroundColor: info.color }}></div>
                                    </div>
                                </div>
                                <span className="e-val">{value}</span>
                            </div>
                        );
                    });
                })()}
            </div>
        </div>
    );
};

export default ChartDetails;
