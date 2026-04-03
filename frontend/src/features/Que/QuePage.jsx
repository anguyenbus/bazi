import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../../context/AuthContext';
import QueCard from './components/QueCard';
import GuaSymbol from './components/GuaSymbol';
import QueTimeline from './components/QueTimeline';
import QueShareCard from './components/QueShareCard';
import './QuePage.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8888';



const TOPICS = [
    { id: 'Chung', label: 'Tổng Quan', icon: '✨' },
    { id: 'Công danh', label: 'Công Danh', icon: '👔' },
    { id: 'Tài lộc', label: 'Tài Lộc', icon: '💰' },
    { id: 'Tình duyên', label: 'Tình Duyên', icon: '❤️' },
    { id: 'Gia đạo', label: 'Gia Đạo', icon: '🏠' },
    { id: 'Học hành', label: 'Học Hành', icon: '📚' },
    { id: 'Sức khỏe', label: 'Sức Khỏe', icon: '💊' },
    { id: 'Thi cử', label: 'Thi Cử', icon: '✍️' },
    { id: 'Giao dịch', label: 'Giao Dịch', icon: '🤝' },
    { id: 'Xuất hành', label: 'Xuất Hành', icon: '✈️' }
];

const QuePage = ({ userData }) => {
    const [data, setData] = useState({
        daily: null,
        monthly: null,
        yearly: null
    });
    const [loading, setLoading] = useState({
        daily: false,
        monthly: false,
        yearly: false
    });
    const [error, setError] = useState(null);
    const [selectedGua, setSelectedGua] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState('Chung');
    const [showTimeline, setShowTimeline] = useState(false);
    const [timeline, setTimeline] = useState([]);
    const shareCardRef = useRef(null);
    const { user, token } = useAuth();

    // Reset data when topic changes to ensure new results reflect the topic
    useEffect(() => {
        setData({ daily: null, monthly: null, yearly: null });
        setSelectedGua(null);
    }, [selectedTopic]);

    // Check if userData is available
    const hasUserData = userData && userData.year && userData.month && userData.day;

    const handleRequest = useCallback(async (type) => {
        if (!hasUserData) {
            setError('Vui lòng nhập thông tin lá số trước khi xin quẻ.');
            return;
        }

        setLoading(prev => ({ ...prev, [type]: true }));
        setError(null);
        setSelectedGua(null); // Clear previous result while loading new one

        try {
            const params = new URLSearchParams({
                year: userData.year,
                month: userData.month,
                day: userData.day,
                hour: userData.hour || 12,
                minute: userData.minute || 0,
                gender: userData.gender || 'Nam',
                topic: selectedTopic
            });

            const headers = { 'Content-Type': 'application/json' };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_BASE}/api/que/${type}?${params.toString()}`, {
                method: 'GET',
                headers
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Có lỗi xảy ra');
            }

            const result = await response.json();
            setData(prev => ({ ...prev, [type]: result }));
            setSelectedGua(result);

        } catch (err) {
            console.error('Que request error:', err);
            setError(err.message || 'Có lỗi xảy ra khi xin quẻ.');
        } finally {
            setLoading(prev => ({ ...prev, [type]: false }));
        }
    }, [userData, token, hasUserData, selectedTopic]);

    const isAnyLoading = Object.values(loading).some(v => !!v);

    const handleSelectGua = useCallback((guaData) => {
        setSelectedGua(guaData);
        // Scroll to results section
        setTimeout(() => {
            document.getElementById('que-results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }, []);

    const handleReroll = useCallback(async (type) => {
        if (!hasUserData) {
            setError('Vui lòng nhập thông tin lá số trước khi xin quẻ.');
            return;
        }

        // Clear existing data for this type
        setData(prev => ({ ...prev, [type]: null }));
        setLoading(prev => ({ ...prev, [type]: true }));
        setError(null);
        setSelectedGua(null);

        try {
            const params = new URLSearchParams({
                year: userData.year,
                month: userData.month,
                day: userData.day,
                hour: userData.hour || 12,
                minute: userData.minute || 0,
                gender: userData.gender || 'Nam',
                topic: selectedTopic,
                forceNew: 'true' // Force new generation
            });

            const headers = { 'Content-Type': 'application/json' };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_BASE}/api/que/${type}?${params.toString()}`, {
                method: 'GET',
                headers
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Có lỗi xảy ra');
            }

            const result = await response.json();
            setData(prev => ({ ...prev, [type]: result }));
            setSelectedGua(result);

        } catch (err) {
            console.error('Reroll error:', err);
            setError(err.message || 'Có lỗi xảy ra khi xin quẻ lại.');
        } finally {
            setLoading(prev => ({ ...prev, [type]: false }));
        }
    }, [userData, token, hasUserData, selectedTopic]);

    const today = useMemo(() => new Date(), []);
    const todayStr = useMemo(() => today.toLocaleDateString('vi-VN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }), [today]);

    const getQualityClass = (quality) => {
        if (['Đại Cát', 'Cát', 'Tiểu Cát'].includes(quality)) return 'quality-good';
        if (['Bình'].includes(quality)) return 'quality-neutral';
        return 'quality-bad';
    };

    const cleanMarkdown = (text) => {
        if (!text) return "";
        let cleaned = text.trim();
        if (cleaned.startsWith('```')) {
            const lines = cleaned.split('\n');
            if (lines[0].startsWith('```')) lines.shift();
            if (lines[lines.length - 1].startsWith('```')) lines.pop();
            cleaned = lines.join('\n').trim();
        }
        return cleaned;
    };

    return (
        <>
            <div className="que-page fade-in">
                <div className="que-header glass-card">
                    <h1 className="que-page-title">🎴 Xin Quẻ Theo Mệnh</h1>
                    <p className="que-page-subtitle">"Mọi phân tích được Thầy Huyền Cơ luận giải từ sự tương tác giữa Mệnh và Thời"</p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
                        {todayStr}
                    </p>
                </div>

                <div className="calculate-view fade-in">
                    {error && (
                        <div className="error-toast glass-card" style={{ marginBottom: '1rem' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {!user && (
                        <div className="glass-card" style={{ textAlign: 'center', padding: '2rem', marginBottom: '1rem' }}>
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                                🔒 Vui lòng đăng nhập để sử dụng tính năng luận quẻ chuyên sâu.
                            </p>
                        </div>
                    )}

                    {user && !hasUserData && (
                        <div className="glass-card" style={{ textAlign: 'center', padding: '2rem', marginBottom: '1rem' }}>
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                                📋 Vui lòng nhập thông tin ngày giờ sinh để bắt đầu phân tích quẻ mệnh.
                            </p>
                        </div>
                    )}


                    <div className="style-instruction" style={{ textAlign: 'center', marginBottom: '1rem', color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
                        "Trước khi gieo quẻ, Mệnh chủ hãy tịnh tâm nghĩ về điều mình đang trăn trở"
                    </div>

                    <div className="topic-selector-container fade-in">
                        {TOPICS.map(topic => (
                            <div
                                key={topic.id}
                                className={`topic-chip ${selectedTopic === topic.id ? 'active' : ''}`}
                                onClick={() => setSelectedTopic(topic.id)}
                            >
                                {topic.icon} {topic.label}
                            </div>
                        ))}
                    </div>

                    <div className="que-cards-grid">
                        <QueCard
                            title="Quẻ Ngày"
                            icon="☀️"
                            type="daily"
                            data={data.daily}
                            loading={loading.daily}
                            onRequest={handleRequest}
                            onSelect={handleSelectGua}
                            onReroll={handleReroll}
                            disabled={!user || !hasUserData || isAnyLoading}
                            isGuest={!user}
                            topic={selectedTopic}
                        />

                        <QueCard
                            title="Quẻ Tháng"
                            icon="🌙"
                            type="monthly"
                            data={data.monthly}
                            loading={loading.monthly}
                            onRequest={handleRequest}
                            onSelect={handleSelectGua}
                            onReroll={handleReroll}
                            disabled={!user || !hasUserData || isAnyLoading}
                            isGuest={!user}
                            topic={selectedTopic}
                        />

                        <QueCard
                            title="Quẻ Năm"
                            icon="🌟"
                            type="yearly"
                            data={data.yearly}
                            loading={loading.yearly}
                            onRequest={handleRequest}
                            onSelect={handleSelectGua}
                            onReroll={handleReroll}
                            disabled={!user || !hasUserData || isAnyLoading}
                            isGuest={!user}
                            topic={selectedTopic}
                        />
                    </div>

                    {/* Combined AI Analysis Section */}
                    {selectedGua && !isAnyLoading && (
                        <div id="que-results-section" className="que-results-container glass-card fade-in">
                            <div className="results-header">
                                <div className="results-title-group">
                                    <GuaSymbol symbol={selectedGua.symbol} size={40} />
                                    <div>
                                        <h2 className="ai-title-prefix">Bản Luận Giải Từ Thầy Huyền Cơ</h2>
                                        <h2>{selectedGua.name}</h2>
                                    </div>
                                </div>
                                <div className="results-header-actions">
                                    <button
                                        className="share-btn"
                                        onClick={async () => {
                                            try {
                                                const html2canvas = (await import('html2canvas')).default;
                                                if (shareCardRef.current) {
                                                    shareCardRef.current.style.left = '0';
                                                    shareCardRef.current.style.position = 'fixed';
                                                    shareCardRef.current.style.top = '0';
                                                    shareCardRef.current.style.zIndex = '9999';

                                                    const canvas = await html2canvas(shareCardRef.current, {
                                                        backgroundColor: '#1a1510',
                                                        scale: 2
                                                    });

                                                    shareCardRef.current.style.left = '-9999px';
                                                    shareCardRef.current.style.position = 'absolute';
                                                    shareCardRef.current.style.zIndex = 'auto';

                                                    const link = document.createElement('a');
                                                    link.download = `que-${selectedGua.name}-${new Date().toISOString().split('T')[0]}.png`;
                                                    link.href = canvas.toDataURL();
                                                    link.click();
                                                }
                                            } catch (err) {
                                                console.error('Share error:', err);
                                                alert('Không thể tạo ảnh chia sẻ. Vui lòng thử lại.');
                                            }
                                        }}
                                    >
                                        📤 Chia sẻ lá số
                                    </button>
                                    <div className={`quality-badge ${getQualityClass(selectedGua.quality)}`}>
                                        Vận Thế: {selectedGua.quality}
                                    </div>
                                </div>
                            </div>

                            <div className="ai-analysis-content-unified">
                                {(selectedGua.ai_analysis || selectedGua.interpretation?.llm_detailed) ? (
                                    <div className="markdown-body">
                                        <ReactMarkdown>
                                            {cleanMarkdown(selectedGua.ai_analysis || selectedGua.interpretation?.llm_detailed)}
                                        </ReactMarkdown>
                                    </div>
                                ) : selectedGua ? (
                                    <div className="markdown-body">
                                        <h3>🔮 Luận giải cơ bản (Năng lượng đang kết nối)</h3>
                                        <p><strong>Quẻ: {selectedGua.name}</strong></p>
                                        <p><em>{selectedGua.meaning}</em></p>
                                        <p>Hiện tại Thầy đang tổng hợp dữ liệu, vui lòng chờ trong giây lát hoặc thử lại sau.</p>
                                    </div>
                                ) : (
                                    <div className="ai-loading-placeholder">
                                        <p>Thầy đang chiêm nghiệm các vì tinh tú...</p>
                                        <div className="stars-loader"></div>
                                    </div>
                                )}
                            </div>

                            <div className="results-footer-meta">
                                <span>📅 Thời gian: {selectedGua.displayPeriod || selectedGua.period}</span>
                                <span>🎯 Thập thần: {selectedGua.interaction?.activatedShiShen}</span>
                                <span>☯️ Can Chi: {selectedGua.interaction?.timeGan}{selectedGua.interaction?.timeZhi}</span>
                                <span>🕰️ Ngày gieo: {new Date(selectedGua.created_at).toLocaleString('vi-VN')}</span>
                            </div>

                            {/* Hidden Share Card for capture */}
                            <QueShareCard
                                ref={shareCardRef}
                                data={selectedGua}
                                topic={selectedTopic}
                            />
                        </div>
                    )}

                    <div className="glass-card footer-disclaimer">
                        <p>
                            <strong>📖 Nguyên lý:</strong> Bài luận được Thầy Huyền Cơ chiêm nghiệm từ việc phân tích sự tương tác giữa <strong>Nhật Chủ (Mệnh)</strong> với năng lượng của <strong>Thời</strong>.
                        </p>
                        <p className="disclaimer-note">
                            Mọi thông tin mang tính chất định hướng và chiêm nghiệm.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuePage;
