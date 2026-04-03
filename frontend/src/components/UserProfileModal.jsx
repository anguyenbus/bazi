import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { API_CONFIG } from '../config/api';

const UserProfileModal = ({ isOpen, onClose }) => {
    const { user, token, refreshUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        year: user?.bazi_data?.year || 1990,
        month: user?.bazi_data?.month || 1,
        day: user?.bazi_data?.day || 1,
        hour: user?.bazi_data?.hour || 0,
        gender: user?.bazi_data?.gender || 'Nam'
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch(`${API_CONFIG.AUTH}/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    baziData: {
                        year: parseInt(formData.year),
                        month: parseInt(formData.month),
                        day: parseInt(formData.day),
                        hour: parseInt(formData.hour),
                        gender: formData.gender,
                        calendar: 'solar'
                    }
                })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage({ type: 'success', text: 'Cập nhật thành công!' });
                refreshUser();
                setTimeout(onClose, 1500);
            } else {
                setMessage({ type: 'error', text: data.error || 'Có lỗi xảy ra' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Không thể kết nối server' });
        } finally {
            setSaving(false);
        }
    };

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content profile-modal glass-card" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                <h2 className="modal-title">👤 Quản Lý Hồ Sơ</h2>

                <div className="profile-section">
                    <h4>Thông tin cá nhân</h4>
                    <div className="input-group">
                        <label>Họ và Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="glass-input"
                            placeholder="Nhập tên của bạn"
                        />
                    </div>
                </div>

                <div className="profile-section">
                    <h4>Thông tin Bát Tự</h4>
                    <div className="form-grid profile-grid">
                        <div className="input-group">
                            <label>Ngày sinh</label>
                            <input
                                type="number"
                                name="day"
                                value={formData.day}
                                onChange={handleChange}
                                className="glass-input"
                                min="1" max="31"
                            />
                        </div>
                        <div className="input-group">
                            <label>Tháng</label>
                            <input
                                type="number"
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                className="glass-input"
                                min="1" max="12"
                            />
                        </div>
                        <div className="input-group">
                            <label>Năm sinh</label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="glass-input"
                                min="1900" max="2100"
                            />
                        </div>
                        <div className="input-group">
                            <label>Giờ sinh</label>
                            <select name="hour" value={formData.hour} onChange={handleChange} className="glass-input">
                                <option value={0}>Tý (23:00 - 01:00)</option>
                                <option value={1}>Sửu (01:00 - 03:00)</option>
                                <option value={3}>Dần (03:00 - 05:00)</option>
                                <option value={5}>Mão (05:00 - 07:00)</option>
                                <option value={7}>Thìn (07:00 - 09:00)</option>
                                <option value={9}>Tỵ (09:00 - 11:00)</option>
                                <option value={11}>Ngọ (11:00 - 13:00)</option>
                                <option value={13}>Mùi (13:00 - 15:00)</option>
                                <option value={15}>Thân (15:00 - 17:00)</option>
                                <option value={17}>Dậu (17:00 - 19:00)</option>
                                <option value={19}>Tuất (19:00 - 21:00)</option>
                                <option value={21}>Hợi (21:00 - 23:00)</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Giới tính</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="glass-input">
                                <option value="Nam">Nam Mệnh</option>
                                <option value="Nữ">Nữ Mệnh</option>
                            </select>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className={`profile-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <div className="profile-actions">
                    <button className="secondary-button" onClick={onClose}>Hủy</button>
                    <button className="premium-button" onClick={handleSave} disabled={saving}>
                        {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default UserProfileModal;
