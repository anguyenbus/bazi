import React, { useState } from 'react';

const ClassicTexts = ({ data }) => {
    const [expandedSection, setExpandedSection] = useState(null);

    if (!data) return null;

    const vanBan = data.van_ban_co_dien || {};
    const phanTich = data.phan_tich?.phan_tich_nang_cao || {};

    // Map các điển tịch với thông tin chi tiết
    const classicBooks = [
        {
            id: 'luc_thap_nhat_dung',
            title: '六十日穴 LỤC THẬP NHẬT DỤNG',
            subtitle: 'Luận giải 60 ngày Giáp Tý',
            icon: '📖',
            description: 'Kinh điển luận giải chi tiết về 60 ngày Giáp Tý, phân tích đặc điểm từng ngày sinh.',
            sections: [
                { label: 'LUẬN NGÀY SINH (Trụ Ngày)', content: vanBan.ngay, highlight: true },
                { label: 'LUẬN NĂM SINH (Trụ Năm)', content: vanBan.nam },
            ]
        },
        {
            id: 'cung_thong_bao_giam',
            title: '穷通宝鉴 CÙNG THÔNG BẢO GIÁM',
            subtitle: 'Điều Hậu Dụng Thần',
            icon: '📜',
            description: 'Cổ thư về Điều Hậu - nghệ thuật cân bằng hàn/nhiệt, điều chỉnh ngũ hành theo tháng sinh.',
            sections: [
                { label: 'ĐIỀU HẬU THÁNG SINH', content: vanBan.thang, highlight: true },
                { label: 'PHÂN TÍCH CÙNG THÔNG', content: phanTich.cung_thong_bao_giam?.join('\n\n') },
            ]
        },
        {
            id: 'tam_menh_thong_hoi',
            title: '三命通会 TAM MỆNH THÔNG HỘI',
            subtitle: 'Luận Giờ Sinh & Tổng Hợp',
            icon: '🏛️',
            description: 'Đại tác phẩm tổng hợp mệnh lý, đặc biệt về luận giải giờ sinh và tương quan ngày-giờ.',
            sections: [
                { label: 'LUẬN GIỜ SINH (Trụ Giờ)', content: vanBan.gio, highlight: true },
                { label: 'PHÂN TÍCH TAM MỆNH', content: phanTich.tam_menh_thong_hoi?.join('\n\n') },
            ]
        },
        {
            id: 'thoi_than',
            title: '时辰 MƯỜI HAI THỜI THẦN',
            subtitle: 'Chi tiết từng khắc giờ',
            icon: '⏰',
            description: 'Phân tích chi tiết 3 khắc trong mỗi giờ: đầu giờ, giữa giờ và cuối giờ.',
            sections: [
                { label: 'LUẬN THỜI THẦN', content: vanBan.muoi_hai_thoi_thanh, highlight: true },
            ]
        },
        {
            id: 'dich_thien_tuy',
            title: '滴天髓 ĐỊCH THIÊN TỦY',
            subtitle: 'Tinh Hoa Mệnh Lý',
            icon: '💧',
            description: 'Cổ thư quý về các nguyên lý cốt lõi của Tử Bình, bao gồm luận về Chân Thần, Giả Thần.',
            sections: [
                { label: 'PHÂN TÍCH ĐỊCH THIÊN TỦY', content: phanTich.dich_thien_tuy?.join('\n\n'), highlight: true },
            ]
        },
        {
            id: 'tu_binh_chan_thuyen',
            title: '子平真诠 TỬ BÌNH CHÂN THUYÊN',
            subtitle: 'Cách Cục Luận',
            icon: '⚖️',
            description: 'Kinh điển về phương pháp Cách Cục, phân tích thành/bại của cách cục.',
            sections: [
                { label: 'PHÂN TÍCH TỬ BÌNH', content: phanTich.tu_binh_chan_thuyen?.join('\n\n'), highlight: true },
            ]
        },
        {
            id: 'kim_bat_hoan',
            title: '金不换 KIM BẤT HOÁN',
            subtitle: 'Khẩu Quyết Vàng',
            icon: '🥇',
            description: 'Bộ khẩu quyết quý giá "vạn kim không đổi", tổng kết tinh hoa luận mệnh theo nhật chủ và tháng sinh.',
            sections: [
                { label: 'KHẨU QUYẾT KIM BẤT HOÁN', content: phanTich.kim_bat_hoan?.join('\n\n'), highlight: true },
            ]
        },
        {
            id: 'benh_duoc',
            title: '病药 BỆNH DƯỢC LUẬN',
            subtitle: 'Thần Phong Thuật Số',
            icon: '💊',
            description: 'Phương pháp "bốc thuốc chữa bệnh" trong mệnh lý - tìm ra điểm yếu và cách khắc phục.',
            sections: [
                { label: 'CHẨN ĐOÁN BỆNH DƯỢC', content: phanTich.benh_duoc?.join('\n\n'), highlight: true },
            ]
        },
    ];

    const toggleSection = (id) => {
        setExpandedSection(expandedSection === id ? null : id);
    };

    const formatContent = (text) => {
        if (!text) return null;

        // Split by sentences and format
        const sentences = text.split(/(?<=[.。])\s*/);
        return sentences.map((sentence, idx) => {
            if (!sentence.trim()) return null;

            // Check for special patterns
            if (sentence.includes('Tháng') && sentence.includes(':')) {
                return <p key={idx} className="month-highlight">{sentence}</p>;
            }
            if (sentence.startsWith('"') || sentence.includes('—')) {
                return <blockquote key={idx} className="classic-quote">{sentence}</blockquote>;
            }
            if (sentence.match(/^\[.*\]/)) {
                return <h5 key={idx} className="section-marker">{sentence}</h5>;
            }
            return <p key={idx} className="classic-paragraph">{sentence}</p>;
        });
    };

    return (
        <section className="classic-texts-container fade-in">
            {/* Header */}
            <div className="wisdom-header glass-card">
                <div className="wisdom-title-group">
                    <h2 className="wisdom-main-title">📚 ĐIỂN TỊCH CỔ ĐIỂN</h2>
                    <p className="wisdom-subtitle">Tri thức mệnh lý từ các bộ sách kinh điển nghìn năm</p>
                </div>
                <div className="wisdom-stats">
                    <div className="stat-box">
                        <span className="stat-number">8</span>
                        <span className="stat-label">Điển Tịch</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-number">1000+</span>
                        <span className="stat-label">Năm Lịch Sử</span>
                    </div>
                </div>
            </div>

            {/* Books Grid */}
            <div className="classic-books-grid">
                {classicBooks.map((book) => (
                    <div
                        key={book.id}
                        className={`classic-book-card glass-card ${expandedSection === book.id ? 'expanded' : ''}`}
                    >
                        <div
                            className="book-header"
                            onClick={() => toggleSection(book.id)}
                        >
                            <div className="book-icon-wrapper">
                                <span className="book-icon">{book.icon}</span>
                            </div>
                            <div className="book-info">
                                <h3 className="book-title">{book.title}</h3>
                                <p className="book-subtitle">{book.subtitle}</p>
                            </div>
                            <span className="expand-indicator">
                                {expandedSection === book.id ? '−' : '+'}
                            </span>
                        </div>

                        <p className="book-description">{book.description}</p>

                        {expandedSection === book.id && (
                            <div className="book-content fade-in">
                                {book.sections.map((section, idx) => (
                                    <div
                                        key={idx}
                                        className={`content-section ${section.highlight ? 'highlighted' : ''}`}
                                    >
                                        <h4 className="section-label">{section.label}</h4>
                                        <div className="section-text">
                                            {section.content ? (
                                                formatContent(section.content)
                                            ) : (
                                                <p className="no-content">Chưa có dữ liệu cho mục này.</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer Quote */}
            <div className="wisdom-footer glass-card">
                <blockquote className="master-quote">
                    "Mệnh là gốc, Vận là ngọn. Hiểu điển tịch để thấu triệt căn nguyên, luận mệnh mới được tinh vi."
                </blockquote>
                <p className="quote-author">— Cổ nhân dạy</p>
            </div>
        </section>
    );
};

export default ClassicTexts;
