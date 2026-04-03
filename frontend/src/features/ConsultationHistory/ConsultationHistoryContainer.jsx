import React, { useState, useEffect } from 'react';
import HistoryCard from './HistoryCard';
import HistoryDetailView from './HistoryDetailView';
import { useAuth } from '../../context/AuthContext';
import { API_CONFIG } from '../../config/api';
import './ConsultationHistory.css';

const ConsultationHistoryContainer = ({ onBack, embedded = false }) => {
    const { token, isAuthenticated } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [error, setError] = useState(null);

    const API_BASE = API_CONFIG.CONSULTANT;

    useEffect(() => {
        if (isAuthenticated) {
            fetchHistory();
        }
    }, [isAuthenticated]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/my-history?limit=30`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.history) {
                setHistory(data.history);
            } else {
                setHistory([]);
            }
        } catch (err) {
            console.error('Failed to fetch history:', err);
            setError('Không thể tải lịch sử tư vấn.');
        } finally {
            setLoading(false);
        }
    };

    if (selectedItem) {
        return <HistoryDetailView item={selectedItem} onBack={() => setSelectedItem(null)} />;
    }

    return (
        <div className={`consultation-history-container ${embedded ? 'embedded' : ''}`}>
            <div className="history-list-header">
                {!embedded && <h3>📜 Lịch sử tư vấn</h3>}
                {!embedded && <button className="btn-back-link" onClick={onBack}>← Quay lại</button>}
            </div>

            {loading ? (
                <div className="loader">Đang tải lịch sử...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : history.length > 0 ? (
                <div className="history-grid">
                    {history.map(item => (
                        <HistoryCard
                            key={item.id}
                            item={item}
                            onClick={() => setSelectedItem(item)}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-history">
                    <div className="empty-icon">📭</div>
                    <p>Bạn chưa có lịch sử tư vấn nào.</p>
                    <button className="premium-button small" onClick={onBack}>Bắt đầu ngay</button>
                </div>
            )}
        </div>
    );
};

export default ConsultationHistoryContainer;
