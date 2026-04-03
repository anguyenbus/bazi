import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import ConsultationHistoryContainer from './ConsultationHistoryContainer';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../../components/AuthModal';

const HistoryPage = () => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [showAuth, setShowAuth] = React.useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShowAuth(true);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="history-page-wrapper">
                {showAuth && createPortal(
                    <AuthModal
                        onClose={() => navigate('/')}
                        onSuccess={() => setShowAuth(false)}
                    />,
                    document.body
                )}
                <div className="loading-state glass-card">
                    <p>Vui lòng đăng nhập để xem lịch sử.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="history-page fade-in">
            <div className="page-header glass-card">
                <div className="header-info">
                    <h2 className="mystical-welcome-text">NHẬT KÝ HUYỀN CƠ</h2>
                    <p>Lưu giữ những lời khuyên và phân tích duyên số của bạn</p>
                </div>
                <div className="user-badge">
                    👤 {user?.username || 'Khách'}
                </div>
            </div>

            <div className="history-container-wrapper glass-card">
                <ConsultationHistoryContainer onBack={() => navigate(-1)} />
            </div>
        </div>
    );
};

export default HistoryPage;
