import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_CONFIG } from '../config/api';

const API_BASE = API_CONFIG.AUTH;

const AuthModal = ({ onClose, onSuccess }) => {
    const [mode, setMode] = useState('login'); // login or register
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // CAPTCHA state
    const [captchaToken, setCaptchaToken] = useState('');
    const [captchaQuestion, setCaptchaQuestion] = useState('');
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [loadingCaptcha, setLoadingCaptcha] = useState(false);

    const { login, register } = useAuth();

    // Fetch CAPTCHA when switching to register mode
    useEffect(() => {
        if (mode === 'register') {
            fetchCaptcha();
        }
    }, [mode]);

    const fetchCaptcha = async () => {
        setLoadingCaptcha(true);
        try {
            const res = await fetch(`${API_BASE}/captcha`);
            const data = await res.json();
            setCaptchaToken(data.token);
            setCaptchaQuestion(data.question);
            setCaptchaAnswer('');
        } catch (err) {
            console.error('Failed to fetch CAPTCHA:', err);
        } finally {
            setLoadingCaptcha(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                if (!captchaAnswer) {
                    setError('Vui lòng nhập đáp án xác thực');
                    setLoading(false);
                    return;
                }
                await register(email, password, name, captchaToken, captchaAnswer);
            }
            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err.message);
            // Refresh CAPTCHA on error
            if (mode === 'register') {
                fetchCaptcha();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleModeSwitch = (newMode) => {
        setMode(newMode);
        setError('');
        setCaptchaAnswer('');
    };

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                <div className="auth-header">
                    <h2>🔮 {mode === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
                    <p className="auth-subtitle">
                        {mode === 'login'
                            ? 'Đăng nhập để sử dụng dịch vụ tư vấn'
                            : 'Đăng ký nhận ngay 100 Linh Thạch miễn phí'}
                    </p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {mode === 'register' && (
                        <div className="form-group">
                            <label>Họ tên</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nhập họ tên của bạn"
                                className="glass-input"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            className="glass-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ít nhất 6 ký tự"
                            className="glass-input"
                            required
                        />
                    </div>

                    {/* CAPTCHA for Register */}
                    {mode === 'register' && (
                        <div className="form-group captcha-group">
                            <label>Xác thực (CAPTCHA)</label>
                            <div className="captcha-box">
                                <div className="captcha-question">
                                    {loadingCaptcha ? '...' : captchaQuestion}
                                </div>
                                <button
                                    type="button"
                                    className="captcha-refresh"
                                    onClick={fetchCaptcha}
                                    disabled={loadingCaptcha}
                                    title="Lấy câu hỏi mới"
                                >
                                    🔄
                                </button>
                            </div>
                            <input
                                type="number"
                                value={captchaAnswer}
                                onChange={(e) => setCaptchaAnswer(e.target.value)}
                                placeholder="Nhập đáp án"
                                className="glass-input captcha-input"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn-auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : (mode === 'login' ? 'Đăng Nhập' : 'Đăng Ký')}
                    </button>
                </form>

                <div className="auth-footer">
                    {mode === 'login' ? (
                        <p>
                            Chưa có tài khoản?{' '}
                            <button
                                className="btn-link"
                                onClick={() => handleModeSwitch('register')}
                            >
                                Đăng ký ngay
                            </button>
                        </p>
                    ) : (
                        <p>
                            Đã có tài khoản?{' '}
                            <button
                                className="btn-link"
                                onClick={() => handleModeSwitch('login')}
                            >
                                Đăng nhập
                            </button>
                        </p>
                    )}
                </div>

                <div className="auth-bonus">
                    <span className="bonus-icon">💎</span>
                    <span>Đăng ký nhận ngay <strong>100 Linh Thạch</strong></span>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
