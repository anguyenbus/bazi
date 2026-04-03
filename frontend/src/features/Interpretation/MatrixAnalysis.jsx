import React, { useState } from 'react';

const MatrixAnalysis = ({ data }) => {
    const [activeTab, setActiveTab] = useState(0);

    if (!data || !data.phan_tich) return null;

    const advanced = data.phan_tich.phan_tich_nang_cao || {};
    const luanTinh = advanced.luan_tinh || {};
    const luanDong = advanced.luan_dong || {};

    // ========================================
    // NEW: Extract additional analysis data
    // ========================================
    const cauTruc = data.phan_tich.cau_truc || {};
    const thapThan = data.phan_tich.thap_than || {};
    const ketLuan = data.phan_tich.ket_luan || {};
    const luanGiai = data.luan_giai || {};
    const shishen = advanced.shishen || {};
    const thanSatSao = data.phan_tich.than_sat_sao || {};
    const quanHeCanChi = data.phan_tich.quan_he_can_chi || {};

    // ========================================
    // PERSONALIZATION: Use backend-calculated data
    // ========================================
    const basicInfo = data.thong_tin_co_ban || {};
    const gioiTinh = basicInfo.gioi_tinh || 'Nam';
    const isNam = gioiTinh === 'Nam';
    const tuoi = basicInfo.tuoi || null;
    const giaiDoanDoi = basicInfo.giai_doan_doi || 'Chưa xác định';
    const xungHo = basicInfo.xung_ho || { full: 'Mệnh chủ', menh: 'mệnh chủ' };

    // Gender-specific term helper (fallback)
    const genderTerm = (maleText, femaleText) => isNam ? maleText : femaleText;

    // ========================================
    // HELPER: Detect separator lines
    // ========================================
    const isSeparator = (line) => {
        if (!line) return false;
        // Match lines consisting of 5 or more separator characters (=, -, _, –, —)
        return /^[\s\-=–—]{5,}$/.test(line.trim());
    };

    // ========================================
    // HELPER: Parse rich text (Markdown-like)
    // ========================================
    const parseRichText = (text) => {
        if (!text || isSeparator(text)) return null;
        let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        parsed = parsed.replace(/<b>(.*?)<\/b>/gi, '<strong>$1</strong>');
        parsed = parsed.replace(/<br\s*\/?>/gi, '<br/>');
        return <span dangerouslySetInnerHTML={{ __html: parsed }} />;
    };

    // ========================================
    // HELPER: Parse sectioned content [SECTION]
    // ========================================
    const parseSectionedContent = (arr) => {
        if (!arr || arr.length === 0) return {};
        const sections = {};
        let currentSection = 'intro';
        arr.forEach(line => {
            if (!line || isSeparator(line)) return;
            const match = line.match(/^\[(.+)\]$/);
            if (match) {
                currentSection = match[1];
                sections[currentSection] = [];
            } else {
                sections[currentSection] = sections[currentSection] || [];
                sections[currentSection].push(line);
            }
        });
        return sections;
    };

    // ========================================
    // HELPER: Render Section Card with Icon
    // ========================================
    const renderSectionCard = (title, icon, lines, accentColor = 'gold') => {
        if (!lines || lines.length === 0) return null;
        return (
            <div className={`section-card accent-${accentColor}`}>
                <div className="section-card-header">
                    <span className="card-icon">{icon}</span>
                    <h5 className="card-title">{title}</h5>
                </div>
                <div className="section-card-body">
                    {lines.map((line, idx) => {
                        if (!line || isSeparator(line)) return null;
                        // Parse bullet points
                        const bulletMatch = line.match(/^[•\-]\s*\*\*(.+?)\*\*[:\s]*(.*)$/);
                        if (bulletMatch) {
                            return (
                                <div key={idx} className="card-item highlight-item">
                                    <span className="item-label">{bulletMatch[1]}</span>
                                    <span className="item-value">{parseRichText(bulletMatch[2])}</span>
                                </div>
                            );
                        }
                        // Parse label: value format
                        const colonMatch = line.match(/^[•\-]?\s*(.+?):\s*(.+)$/);
                        if (colonMatch && colonMatch[1].length < 40) {
                            return (
                                <div key={idx} className="card-item">
                                    <span className="item-label">{colonMatch[1]}:</span>
                                    <span className="item-value">{parseRichText(colonMatch[2])}</span>
                                </div>
                            );
                        }
                        return <p key={idx} className="card-text">{parseRichText(line)}</p>;
                    })}
                </div>
            </div>
        );
    };

    // ========================================
    // HELPER: Render string array as enhanced list
    // ========================================
    const renderStringList = (arr, title, icon = '📋') => {
        if (!arr || arr.length === 0) return null;
        // Try to parse as sectioned content first
        const sections = parseSectionedContent(arr);
        const sectionKeys = Object.keys(sections).filter(k => k !== 'intro' && sections[k].length > 0);

        if (sectionKeys.length > 0) {
            const icons = { 'PHÁP THÂN NHẬT CHỦ': '🎯', 'LÝ LUẬN MỘ KHỐ': '🏛️', 'HỆ THỐNG QUÂN THẦN TÁ SỨ': '👑', 'XUNG CHIẾN CHI TIẾT': '⚔️', 'TỔNG KẾT CHIẾN LƯỢC': '📊' };
            const colors = { 'PHÁP THÂN NHẬT CHỦ': 'gold', 'LÝ LUẬN MỘ KHỐ': 'purple', 'HỆ THỐNG QUÂN THẦN TÁ SỨ': 'blue', 'XUNG CHIẾN CHI TIẾT': 'red', 'TỔNG KẾT CHIẾN LƯỢC': 'green' };
            return (
                <div className="sectioned-content">
                    <h4 className="section-main-title">{icon} {title}</h4>
                    <div className="section-cards-grid">
                        {sectionKeys.map((key, idx) => renderSectionCard(key, icons[key] || '📜', sections[key], colors[key] || 'gold'))}
                    </div>
                </div>
            );
        }

        // Fallback to simple list
        return (
            <div className="analysis-section">
                {title && <h5 className="section-subtitle">{icon} {title}</h5>}
                <div className="content-list enhanced">
                    {arr.filter(line => line && !isSeparator(line)).map((line, idx) => {
                        const colonIdx = line.indexOf(':');
                        if (colonIdx > 0 && colonIdx < 50) {
                            const label = line.substring(0, colonIdx).replace(/^[•\-\[\]]\s*/, '').trim();
                            const content = line.substring(colonIdx + 1).trim();
                            return (
                                <div key={idx} className="info-row enhanced">
                                    <span className="info-label">{label}:</span>
                                    <span className="info-content">{parseRichText(content)}</span>
                                </div>
                            );
                        }
                        return <p key={idx} className="info-line">{parseRichText(line)}</p>;
                    })}
                </div>
            </div>
        );
    };

    // ========================================
    // HELPER: Render structured analysis (enhanced)
    // ========================================
    const renderStructuredAnalysis = (section, label) => {
        if (!section) return null;
        return (
            <div className="structured-analysis enhanced">
                {label && <h4 className="analysis-header">{label}</h4>}
                <div className="analysis-blocks-grid">
                    {section.variables && section.variables.length > 0 && (
                        <div className="analysis-block variables-block">
                            <div className="block-header"><span className="block-icon">📊</span><span className="block-title">BIẾN SỐ</span></div>
                            <div className="block-content">{section.variables.map((v, i) => <div key={i} className="variable-chip">{parseRichText(v)}</div>)}</div>
                        </div>
                    )}
                    {section.convergence && section.convergence.length > 0 && (
                        <div className="analysis-block convergence-block">
                            <div className="block-header"><span className="block-icon">🔗</span><span className="block-title">HỘI TỤ</span></div>
                            <div className="block-content">{section.convergence.map((c, i) => <div key={i} className="convergence-item">{parseRichText(c)}</div>)}</div>
                        </div>
                    )}
                </div>
                {section.conclusion && (
                    <div className="analysis-block conclusion-block full-width">
                        <div className="block-header"><span className="block-icon">📝</span><span className="block-title">LUẬN GIẢI CHI TIẾT</span></div>
                        <div className="block-content conclusion-text">{parseRichText(section.conclusion)}</div>
                    </div>
                )}
            </div>
        );
    };

    // ========================================
    // TAB DEFINITIONS - 8 Tabs
    // ========================================
    const tabs = [
        {
            id: 'overview',
            name: 'TỔNG QUAN',
            icon: '🌟',
            render: () => (
                <div className="tab-content overview-tab">
                    <div className="overview-hero">
                        <h3>TỔNG QUAN BÁT TỰ</h3>
                        <p className="hero-subtitle">
                            Phân tích cá nhân hóa cho {genderTerm('quý ông', 'quý bà')} {tuoi ? `${tuoi} tuổi` : ''}
                            {giaiDoanDoi !== 'Chưa xác định' && ` - Giai đoạn ${giaiDoanDoi}`}
                        </p>
                    </div>

                    {/* Personalized Summary Cards */}
                    <div className="overview-summary-grid">
                        <div className="summary-card accent-gold">
                            <div className="card-icon-large">🎯</div>
                            <h5>Cách Cục</h5>
                            <p>{ketLuan.cach?.join(', ') || nguHanh.nhan_dinh?.cuong_do || 'Đang phân tích'}</p>
                        </div>
                        <div className="summary-card accent-blue">
                            <div className="card-icon-large">⚡</div>
                            <h5>Dụng Thần</h5>
                            <p>{nguHanh.dung_than?.ngu_hanh?.join(', ') || 'Đang xác định'}</p>
                        </div>
                        <div className="summary-card accent-purple">
                            <div className="card-icon-large">🔮</div>
                            <h5>Kỵ Thần</h5>
                            <p>{nguHanh.ky_than?.ngu_hanh?.join(', ') || 'Đang xác định'}</p>
                        </div>
                        <div className="summary-card accent-green">
                            <div className="card-icon-large">🌱</div>
                            <h5>Giai Đoạn</h5>
                            <p>{giaiDoanDoi}</p>
                        </div>
                    </div>

                    {/* Thập Thần Overview */}
                    {thapThan.items && thapThan.items.length > 0 && (
                        <div className="thap-than-overview">
                            <h4>📊 THẬP THẦN TRONG MỆNH</h4>
                            <div className="thap-than-chips">
                                {thapThan.items.map((item, idx) => (
                                    <div key={idx} className={`thap-than-chip ${item.count > 2 ? 'prominent' : ''}`}>
                                        <span className="tt-name">{item.name}</span>
                                        <span className="tt-count">×{item.count}</span>
                                        {item.desc && <span className="tt-desc">{item.desc}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Personality Summary from luan_tinh */}
                    {luanTinh.personality && renderStructuredAnalysis(luanTinh.personality, `🧠 PHÂN TÍCH ${genderTerm('NAM', 'NỮ')} MỆNH`)}

                    {/* Địch Thiên Tủy Quick View */}
                    {advanced.dich_thien_tuy && advanced.dich_thien_tuy.length > 0 && (
                        <div className="classic-quote-box">
                            <h5>📜 ĐỊCH THIÊN TỦY - Tinh Hoa Can Chi</h5>
                            {advanced.dich_thien_tuy.filter(line => !isSeparator(line)).slice(0, 5).map((line, i) => (
                                <p key={i} className="quote-line">{parseRichText(line)}</p>
                            ))}
                        </div>
                    )}

                    {/* Luận Giải Summary */}
                    {luanGiai.tong_quan && (
                        <div className="luan-giai-summary">
                            <h4>📝 LUẬN GIẢI TỔNG HỢP</h4>
                            <div className="luan-giai-content">
                                {Array.isArray(luanGiai.tong_quan)
                                    ? luanGiai.tong_quan.filter(line => !isSeparator(line)).map((line, i) => <p key={i}>{parseRichText(line)}</p>)
                                    : <p>{parseRichText(luanGiai.tong_quan)}</p>
                                }
                            </div>
                        </div>
                    )}
                </div>
            )
        },
        {
            id: 'personality',
            name: 'TÍNH CÁCH',
            icon: '🧠',
            render: () => (
                <div className="tab-content personality-tab">
                    <h3>📊 PHÂN TÍCH TÍNH CÁCH CHUYÊN SÂU</h3>

                    {/* Luận Tĩnh - Personality */}
                    {luanTinh.personality && renderStructuredAnalysis(luanTinh.personality)}

                    {/* Địch Thiên Tủy - Stem Essence */}
                    {renderStringList(advanced.dich_thien_tuy, '📜 ĐỊCH THIÊN TỦY - Tinh Hoa Thiên Can')}

                    {/* Động Tĩnh Luận */}
                    {renderStringList(advanced.dong_tinh_luan, '⚖️ ĐỘNG TĨNH LUẬN - Cân Bằng Âm Dương')}
                </div>
            )
        },
        {
            id: 'career',
            name: 'SỰ NGHIỆP',
            icon: '💼',
            render: () => (
                <div className="tab-content career-tab">
                    <h3>💼 PHÂN TÍCH SỰ NGHIỆP & TÀI LỘC</h3>

                    {/* Luận Tĩnh - Career */}
                    {luanTinh.career && renderStructuredAnalysis(luanTinh.career)}

                    {/* Tứ Bình Chân Thuyên */}
                    {renderStringList(advanced.tu_binh_chan_thuyen, '📖 TỨ BÌNH CHÂN THUYÊN - Cổ Pháp Định Mệnh')}

                    {/* Kim Bất Hoán */}
                    {renderStringList(advanced.kim_bat_hoan, '💎 KIM BẤT HOÁN - Lời Vàng Bất Hủ')}
                </div>
            )
        },
        {
            id: 'marriage',
            name: 'HÔN NHÂN',
            icon: '❤️',
            render: () => (
                <div className="tab-content marriage-tab">
                    <h3>❤️ PHÂN TÍCH HÔN NHÂN & GIA ĐÌNH</h3>

                    {/* Luận Tĩnh - Marriage */}
                    {luanTinh.marriage && renderStructuredAnalysis(luanTinh.marriage)}

                    {/* Tam Mệnh Thông Hội */}
                    {renderStringList(advanced.tam_menh_thong_hoi, '🌟 TAM MỆNH THÔNG HỘI - Tam Kiếp Định Duyên')}
                </div>
            )
        },
        {
            id: 'punishments',
            name: 'HÌNH HẠI',
            icon: '⚔️',
            render: () => {
                const quanHeMoRong = data.phan_tich?.quan_he_mo_rong || {};
                return (
                    <div className="tab-content punishments-tab">
                        <h3>⚔️ PHÂN TÍCH HÌNH - HẠI - PHÁ</h3>
                        <p className="section-intro">Phân tích các mối quan hệ xung khắc trong địa chi, bao gồm Tam Hình, Lục Hại và Lục Phá.</p>

                        {/* NEW: Thiên Can Hợp from extended data */}
                        {quanHeMoRong.can_hop?.length > 0 && (
                            <div className="relationship-section">
                                <h4>✨ THIÊN CAN NGŨ HỢP</h4>
                                {quanHeMoRong.can_hop.map((hop, idx) => (
                                    <div key={idx} className="relationship-card good">
                                        <div className="rel-header">
                                            <span className="rel-pair">{hop.gans?.join(' - ') || ''}</span>
                                            <span className="rel-type">{hop.name}</span>
                                        </div>
                                        <p className="rel-desc">Hóa {hop.hoa}. {hop.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* NEW: Địa Chi Hại từ extended data */}
                        {quanHeMoRong.chi_hai?.length > 0 && (
                            <div className="relationship-section">
                                <h4>💔 ĐỊA CHI LỤC HẠI</h4>
                                {quanHeMoRong.chi_hai.map((hai, idx) => (
                                    <div key={idx} className="relationship-card bad">
                                        <div className="rel-header">
                                            <span className="rel-pair">{hai.zhis?.join(' Hại ') || ''}</span>
                                        </div>
                                        <p className="rel-desc">{hai.luan_giai}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* NEW: Địa Chi Hình từ extended data */}
                        {quanHeMoRong.chi_hinh?.length > 0 && (
                            <div className="relationship-section">
                                <h4>⚡ ĐỊA CHI TAM HÌNH</h4>
                                {quanHeMoRong.chi_hinh.map((hinh, idx) => (
                                    <div key={idx} className="relationship-card bad">
                                        <div className="rel-header">
                                            <span className="rel-pair">{hinh.zhis?.join(' Hình ') || ''}</span>
                                            <span className="rel-type">{hinh.name}</span>
                                        </div>
                                        <p className="rel-desc">{hinh.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Hình Hại Phá Analysis - fallback */}
                        {renderStringList(advanced.hinh_hai_pha, '🔥 CHI TIẾT HÌNH HẠI PHÁ')}

                        {(!quanHeMoRong.chi_hai?.length && !quanHeMoRong.chi_hinh?.length && (!advanced.hinh_hai_pha || advanced.hinh_hai_pha.length === 0)) && (
                            <div className="no-conflict-box">
                                <span className="success-icon">✅</span>
                                <p>Không phát hiện Hình - Hại - Phá nghiêm trọng trong tứ trụ.</p>
                            </div>
                        )}
                    </div>
                );
            }
        },
        {
            id: 'classics',
            name: 'KINH ĐIỂN',
            icon: '📜',
            render: () => {
                const kinhDien = data.phan_tich?.kinh_dien || {};
                return (
                    <div className="tab-content classics-tab">
                        <h3>📜 KINH ĐIỂN CỔ THƯ</h3>
                        <p className="section-intro">Tra cứu từ các kinh điển Bát Tự: Kim Bất Hoán, Nạp Âm, Cung Thông Bảo Giám.</p>

                        {/* NEW: Classic descriptions from ganzhi data */}
                        {(kinhDien.nhat_chu?.mo_ta || kinhDien.cung_phu_the?.mo_ta) && (
                            <div className="kinh-dien-section">
                                <h4>📕 LUẬN VỀ NHẬT CHỦ VÀ CHI</h4>
                                {kinhDien.nhat_chu?.mo_ta && (
                                    <div className="classic-card">
                                        <div className="classic-header">
                                            <span className="classic-title">🌟 Nhật Chủ {kinhDien.nhat_chu.can} ({kinhDien.nhat_chu.hanh})</span>
                                        </div>
                                        <p className="classic-content">{kinhDien.nhat_chu.mo_ta}</p>
                                    </div>
                                )}
                                {kinhDien.cung_phu_the?.mo_ta && (
                                    <div className="classic-card">
                                        <div className="classic-header">
                                            <span className="classic-title">🏠 Cung Phu Thê ({kinhDien.cung_phu_the.chi})</span>
                                        </div>
                                        <p className="classic-content">{kinhDien.cung_phu_the.mo_ta}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Kim Bất Hoán */}
                        {renderStringList(advanced.kim_bat_hoan, '💎 KIM BẤT HOÁN - Kim Ngọc Bất Hoán')}

                        {/* Nạp Âm Chuyên Sâu */}
                        {renderStringList(advanced.nap_am_chuyen_sau, '🌊 NẠP ÂM CHUYÊN SÂU - Âm Luật Ngũ Hành')}

                        {/* Cung Thông Bảo Giám */}
                        {renderStringList(advanced.cung_thong_bao_giam, '🔍 CUNG THÔNG BẢO GIÁM - Điều Hầu & Bảo Giám')}

                        {/* Địch Thiên Tủy Full */}
                        {renderStringList(advanced.dich_thien_tuy, '📖 ĐỊCH THIÊN TỦY - Tủy Tinh Thiên Can')}
                    </div>
                );
            }
        },
        {
            id: 'health',
            name: 'SỨC KHỎE',
            icon: '🩺',
            render: () => {
                const sucKhoe = data.phan_tich?.suc_khoe || {};
                return (
                    <div className="tab-content health-tab">
                        <h3>🩺 PHÂN TÍCH BỆNH DƯỢC & SỨC KHỎE</h3>
                        <p className="section-intro">Dựa trên Thần Phong Thông Khảo - phân tích nguy cơ sức khỏe theo ngũ hành và giới tính.</p>

                        {/* NEW: Health advice from ganzhi data */}
                        {sucKhoe.loi_khuyen && (
                            <div className="health-advice-section">
                                <h4>🍀 LỜI KHUYÊN SỨC KHỎE THEO NGŨ HÀNH ({sucKhoe.ngu_hanh_nhat_chu})</h4>
                                <div className="health-summary-grid">
                                    <div className="health-card">
                                        <span className="health-label">🧭 Hướng tốt:</span>
                                        <span className="health-value">{sucKhoe.huong_tot}</span>
                                    </div>
                                    <div className="health-card">
                                        <span className="health-label">🎨 Màu may mắn:</span>
                                        <span className="health-value">{sucKhoe.mau_may_man}</span>
                                    </div>
                                </div>
                                <div className="health-advice-content">
                                    {parseRichText(sucKhoe.loi_khuyen)}
                                </div>
                            </div>
                        )}

                        {/* Bệnh Dược Analysis */}
                        {renderStringList(advanced.benh_duoc, '💊 CHẨN ĐOÁN BỆNH DƯỢC')}

                        {/* Health from personality if embedded */}
                        {luanTinh.personality?.conclusion?.includes('SỨC KHỎE') && (
                            <div className="health-warning-box">
                                <h5>⚠️ CẢNH BÁO SỨC KHỎE RIÊNG</h5>
                                <p>Xem chi tiết trong phần Tính Cách - Sức Khỏe được tích hợp vào phân tích toàn diện.</p>
                            </div>
                        )}
                    </div>
                );
            }
        },
        {
            id: 'lifestages',
            name: 'TRƯỜNG SINH',
            icon: '🌱',
            render: () => {
                const vongTrangSinh = data.phan_tich?.vong_trang_sinh || {};
                const pillarDetails = vongTrangSinh.pillar_details || [];
                const stageColors = {
                    'Tr.Sinh': 'green', 'Mộc Dục': 'blue', 'Quan Đới': 'gold', 'L.Quan': 'gold',
                    'Đ.Vượng': 'gold', 'Suy': 'orange', 'Bệnh': 'red', 'Tử': 'red',
                    'Mộ': 'purple', 'Tuyệt': 'red', 'Thai': 'blue', 'Dưỡng': 'green'
                };
                return (
                    <div className="tab-content lifestages-tab">
                        <h3>🌱 VÒNG TRƯỜNG SINH & VẬN ĐỘNG</h3>
                        <p className="section-intro">Phân tích 12 trạng thái Trường Sinh theo từng trụ và động lực vận trình.</p>

                        {/* Pillar Stages Visual */}
                        {pillarDetails.length > 0 && (
                            <div className="truong-sinh-grid">
                                <h4>🔄 TRẠNG THÁI TỪNG TRỤ</h4>
                                <div className="ts-pillars-row">
                                    {pillarDetails.map((detail, idx) => (
                                        <div key={idx} className={`ts-pillar-card accent-${stageColors[detail.stage] || 'gold'}`}>
                                            <span className="ts-pillar-name">{detail.pillar}</span>
                                            <span className="ts-chi">{detail.chi}</span>
                                            <span className={`ts-stage ${stageColors[detail.stage] || ''}`}>{detail.stage}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Vòng Trường Sinh Analysis */}
                        {vongTrangSinh.analysis && vongTrangSinh.analysis.length > 0
                            ? renderStringList(vongTrangSinh.analysis, '📊 PHÂN TÍCH CHI TIẾT')
                            : renderStringList(advanced.vong_trang_sinh, '� PHÂN TÍCH CHI TIẾT')
                        }

                        {/* Luận Động - Dynamic Analysis */}
                        {luanDong && luanDong.findings && luanDong.findings.length > 0 && (
                            <div className="analysis-section luan-dong-section">
                                <h5>🌊 LUẬN ĐỘNG - PHÂN TÍCH VẬN HẠN</h5>
                                <div className="content-list">
                                    {luanDong.findings.map((finding, idx) => (
                                        <div key={idx} className="finding-card">
                                            <div className="finding-header">
                                                <span className="finding-type">{finding.type || 'Phát hiện'}</span>
                                                {finding.period && <span className="finding-period">{finding.period}</span>}
                                            </div>
                                            <p className="finding-content">{parseRichText(finding.content || finding.desc || JSON.stringify(finding))}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Fallback if luan_dong is string array */}
                        {Array.isArray(advanced.luan_dong) && renderStringList(advanced.luan_dong, '🌊 LUẬN ĐỘNG - VẬN HẠN')}
                    </div>
                );
            }
        }
    ];

    // Helper for element class
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

    // Get data from same structure as BaziChart
    const pillars = data.chi_tiet_tru || [];
    const nguHanh = data.phan_tich?.can_bang_ngu_hanh || {};

    return (
        <div className="matrix-analysis-pro fade-in">
            {/* Tab Navigation */}
            <nav className="matrix-tabs-nav">
                {tabs.map((tab, idx) => (
                    <button
                        key={tab.id}
                        className={`matrix-tab-btn ${activeTab === idx ? 'active' : ''}`}
                        onClick={() => setActiveTab(idx)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-name">{tab.name}</span>
                    </button>
                ))}
            </nav>

            {/* PERSISTENT BASIC INFO SECTION - Always visible */}
            <div className="persistent-info-section glass-card">
                <div className="persistent-info-grid">
                    {/* Personal Info */}
                    <div className="info-column personal-info">
                        <h4>👤 THÔNG TIN</h4>
                        <div className="info-mini-grid">
                            <div className="info-chip">
                                <span className="chip-label">Tên</span>
                                <span className="chip-value">{basicInfo.ten || 'Chưa nhập'}</span>
                            </div>
                            <div className="info-chip">
                                <span className="chip-label">Ngày DL</span>
                                <span className="chip-value">{basicInfo.ngay_duong_lich || 'N/A'}</span>
                            </div>
                            <div className="info-chip">
                                <span className="chip-label">Ngày ÂL</span>
                                <span className="chip-value">{basicInfo.ngay_am_lich || 'N/A'}</span>
                            </div>
                            <div className="info-chip">
                                <span className="chip-label">Giờ sinh</span>
                                <span className="chip-value">{basicInfo.gio_sinh || basicInfo.gio_chi || 'N/A'}</span>
                            </div>
                            <div className="info-chip">
                                <span className="chip-label">Giới tính</span>
                                <span className="chip-value">{basicInfo.gioi_tinh || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Mini Pillars - from chi_tiet_tru */}
                    {pillars.length >= 4 && (
                        <div className="info-column pillars-info">
                            <h4>🏛️ TỨ TRỤ</h4>
                            <div className="mini-pillars-row">
                                {[
                                    { label: 'Năm', pillar: pillars[0] },
                                    { label: 'Tháng', pillar: pillars[1] },
                                    { label: 'Ngày', pillar: pillars[2], isDM: true },
                                    { label: 'Giờ', pillar: pillars[3] }
                                ].map((item, idx) => (
                                    <div key={idx} className={`mini-pillar-compact ${item.isDM ? 'day-master' : ''}`}>
                                        <span className="pillar-header">{item.label}</span>
                                        <div className="pillar-chars">
                                            <span className={getElementClass(item.pillar?.can)}>{item.pillar?.can}</span>
                                            <span className={getElementClass(item.pillar?.chi)}>{item.pillar?.chi}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Key Stats */}
                    <div className="info-column stats-info">
                        <h4>⚡ PHÂN TÍCH</h4>
                        <div className="stats-chips">
                            <div className="stat-chip highlight">
                                <span className="chip-label">Nhật Chủ</span>
                                <span className="chip-value gold">{pillars[2]?.can || 'N/A'}</span>
                            </div>
                            <div className="stat-chip">
                                <span className="chip-label">Nạp Âm</span>
                                <span className="chip-value">{pillars[2]?.nap_am || 'N/A'}</span>
                            </div>
                            <div className="stat-chip">
                                <span className="chip-label">Thân</span>
                                <span className="chip-value">{nguHanh.nhan_dinh?.cuong_do || 'N/A'}</span>
                            </div>
                            <div className="stat-chip">
                                <span className="chip-label">Dụng Thần</span>
                                <span className="chip-value">{nguHanh.dung_than?.ngu_hanh?.join(', ') || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Content Area */}
            <div className="matrix-content-area glass-card">
                {tabs[activeTab].render()}
            </div>

            {/* Source Attribution */}
            <div className="matrix-footer">
                <p>📚 Nguồn: Địch Thiên Tủy, Tứ Bình Chân Thuyên, Kim Bất Hoán, Tam Mệnh Thông Hội, Thần Phong Thông Khảo</p>
            </div>
        </div>
    );
};

export default MatrixAnalysis;
