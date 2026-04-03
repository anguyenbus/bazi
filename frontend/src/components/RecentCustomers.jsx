import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../config/api';
import { formatDateTime } from '../utils/dateUtils';

/**
 * RecentCustomers Component
 * Displays a list of recent customers with anonymized names
 */
const RecentCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = API_CONFIG.CONSULTANT;

    useEffect(() => {
        fetchRecentCustomers();
    }, []);

    const fetchRecentCustomers = async () => {
        try {
            const response = await fetch(`${API_BASE}/recent?limit=10`);
            if (response.ok) {
                const data = await response.json();
                setCustomers(data);
            }
        } catch (error) {
            console.error('Failed to fetch recent customers:', error);
        } finally {
            setLoading(false);
        }
    };

    // Anonymize name: "Nguyễn Văn An" -> "N***n V***n A***n"
    const anonymizeName = (name) => {
        if (!name || name === 'Mệnh chủ') return 'Ẩn danh';
        const parts = name.split(' ');
        return parts.map(part => {
            if (part.length <= 2) return part[0] + '*';
            return part[0] + '***' + part[part.length - 1];
        }).join(' ');
    };


    // Format birth info: "1990-05-15 10:30" 
    const formatBirth = (customer) => {
        const { year, month, day, hour, minute } = customer;
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(day)}/${pad(month)}/${year} - ${pad(hour)}:${pad(minute)}`;
    };

    // Get year pillar (Can Chi)
    const getYearPillar = (year) => {
        const THIEN_CAN = ['Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ'];
        const DIA_CHI = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi'];
        const can = THIEN_CAN[year % 10];
        const chi = DIA_CHI[year % 12];
        return `${can} ${chi}`;
    };

    if (loading) {
        return (
            <div className="recent-customers glass-card">
                <div className="rc-header">
                    <span className="rc-icon">👥</span>
                    <h4>KHÁCH HÀNG GẦN ĐÂY</h4>
                </div>
                <div className="rc-loading">Đang tải...</div>
            </div>
        );
    }

    if (customers.length === 0) {
        return (
            <div className="recent-customers glass-card">
                <div className="rc-header">
                    <span className="rc-icon">👥</span>
                    <h4>KHÁCH HÀNG GẦN ĐÂY</h4>
                </div>
                <div className="rc-empty">Chưa có khách hàng nào</div>
            </div>
        );
    }

    return (
        <div className="recent-customers glass-card">
            <div className="rc-header">
                <span className="rc-icon">👥</span>
                <h4>KHÁCH HÀNG GẦN ĐÂY</h4>
            </div>
            <div className="rc-list">
                {customers.map((item, idx) => (
                    <div key={item.id || idx} className="rc-item">
                        <div className="rc-rank">{idx + 1}</div>
                        <div className="rc-info">
                            <div className="rc-name">
                                {anonymizeName(item.name)}
                                <span className="rc-gender">{item.gender === 'Nữ' ? '♀' : '♂'}</span>
                            </div>
                            <div className="rc-birth">
                                <span className="rc-label">Sinh:</span> {formatBirth(item)}
                                <span className="rc-pillar">• Trụ năm: {getYearPillar(item.year)}</span>
                            </div>
                            {item.last_question && (
                                <div className="rc-question">
                                    <span className="rc-label">Hỏi:</span> {item.last_question}
                                </div>
                            )}
                        </div>
                        <div className="rc-time">
                            {formatDateTime(item.consultation_time || item.created_at)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentCustomers;
