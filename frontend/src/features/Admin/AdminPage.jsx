import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../../components/AuthModal';
import { API_CONFIG } from '../../config/api';
import { formatDateTime } from '../../utils/dateUtils';

const API_BASE = API_CONFIG.ADMIN;

// ========== DASHBOARD PAGE ==========
const DashboardPage = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState(null);
    const [creditStats, setCreditStats] = useState(null);
    const [chartData, setChartData] = useState({ daily: [], categories: [] });

    useEffect(() => {
        if (!token) return;
        fetchStats();
        fetchCreditStats();
        generateChartData();
    }, [token]);

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_BASE}/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setStats(await res.json());
        } catch (err) { console.error(err); }
    };

    const fetchCreditStats = async () => {
        try {
            const res = await fetch(`${API_BASE}/credit-stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCreditStats(await res.json());
        } catch (err) { console.error(err); }
    };

    const generateChartData = async () => {
        try {
            const res = await fetch(`${API_BASE}/chart-data`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();

            // Localize day labels (CN, T2, T3...)
            const daysVn = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
            const formattedDaily = data.daily.map(d => {
                const date = new Date(d.date);
                return {
                    label: daysVn[date.getUTCDay()],
                    value: d.count
                };
            });

            setChartData({
                daily: formattedDaily,
                categories: data.categories || []
            });
        } catch (err) {
            console.error('Error fetching chart data:', err);
            // Fallback to empty if failed
            setChartData({ daily: [], categories: [] });
        }
    };

    const maxDaily = Math.max(...chartData.daily.map(d => d.value), 1);
    const maxCat = Math.max(...chartData.categories.map(c => c.value), 1);

    return (
        <div className="admin-page-content">
            <h2>📊 Tổng quan hệ thống</h2>

            {stats && (
                <div className="dashboard-grid">
                    <div className="dashboard-card primary">
                        <div className="card-icon">👥</div>
                        <div className="card-content">
                            <span className="card-value">{stats.totalCustomers}</span>
                            <span className="card-label">Khách hàng</span>
                        </div>
                    </div>
                    <div className="dashboard-card success">
                        <div className="card-icon">💬</div>
                        <div className="card-content">
                            <span className="card-value">{stats.totalConsultations}</span>
                            <span className="card-label">Lượt tư vấn</span>
                        </div>
                    </div>
                    <div className="dashboard-card info">
                        <div className="card-icon">🤖</div>
                        <div className="card-content">
                            <span className="card-value">{stats.aiConsultations}</span>
                            <span className="card-label">Tư vấn AI</span>
                        </div>
                    </div>
                    <div className="dashboard-card accent">
                        <div className="card-icon">📅</div>
                        <div className="card-content">
                            <span className="card-value">{stats.todayConsultations}</span>
                            <span className="card-label">Hôm nay</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Credit Statistics */}
            {creditStats && (
                <div className="credit-stats-section">
                    <h3>💎 Thống kê Linh Thạch</h3>
                    <div className="dashboard-grid">
                        <div className="dashboard-card">
                            <div className="card-icon">💎</div>
                            <div className="card-content">
                                <span className="card-value">{creditStats.totalCreditsIssued}</span>
                                <span className="card-label">Đã cấp</span>
                            </div>
                        </div>
                        <div className="dashboard-card">
                            <div className="card-icon">🔥</div>
                            <div className="card-content">
                                <span className="card-value">{creditStats.totalCreditsUsed}</span>
                                <span className="card-label">Đã dùng</span>
                            </div>
                        </div>
                        <div className="dashboard-card warning">
                            <div className="card-icon">⏳</div>
                            <div className="card-content">
                                <span className="card-value">{creditStats.pendingRequests}</span>
                                <span className="card-label">Chờ duyệt</span>
                            </div>
                        </div>
                        <div className="dashboard-card success">
                            <div className="card-icon">✅</div>
                            <div className="card-content">
                                <span className="card-value">{creditStats.approvedRequests}</span>
                                <span className="card-label">Đã duyệt</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Charts Section */}
            <div className="charts-row">
                <div className="chart-card">
                    <h4>📈 Tư vấn 7 ngày qua</h4>
                    <div className="bar-chart">
                        {chartData.daily.map((d, i) => (
                            <div key={i} className="bar-item">
                                <div className="bar" style={{ height: `${Math.max((d.value / maxDaily) * 150, 8)}px` }}>
                                    <span className="bar-value">{d.value}</span>
                                </div>
                                <span className="bar-label">{d.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chart-card">
                    <h4>📁 Câu hỏi theo danh mục</h4>
                    <div className="horizontal-chart">
                        {chartData.categories.slice(0, 6).map((c, i) => (
                            <div key={i} className="h-bar-item">
                                <div className="h-bar-label">
                                    <span>{c.icon}</span>
                                    <span>{c.label}</span>
                                </div>
                                <div className="h-bar-track">
                                    <div className="h-bar" style={{ width: `${(c.value / maxCat) * 100}%` }}></div>
                                </div>
                                <span className="h-bar-value">{c.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ========== CATEGORIES PAGE ==========
const CategoriesPage = () => {
    const { token } = useAuth();
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: '', icon: '📋' });
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => { if (token) fetchCategories(); }, [token]);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_BASE}/categories`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCategories(await res.json());
        } catch (err) { console.error(err); }
    };

    const handleSave = async () => {
        if (!form.name.trim()) return;
        const url = editingId ? `${API_BASE}/categories/${editingId}` : `${API_BASE}/categories`;
        await fetch(url, {
            method: editingId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });
        setForm({ name: '', icon: '📋' });
        setEditingId(null);
        setShowModal(false);
        fetchCategories();
    };

    const handleDelete = async (id) => {
        if (!confirm('Xóa danh mục sẽ xóa tất cả câu hỏi bên trong. Tiếp tục?')) return;
        await fetch(`${API_BASE}/categories/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchCategories();
    };

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h2>📁 Quản lý danh mục</h2>
                <button className="btn-primary" onClick={() => { setForm({ name: '', icon: '📋' }); setEditingId(null); setShowModal(true); }}>
                    + Thêm danh mục
                </button>
            </div>

            <div className="category-grid">
                {categories.map(cat => (
                    <Link to={`/admin/categories/${cat.id}`} key={cat.id} className="category-card">
                        <div className="cat-icon">{cat.icon}</div>
                        <div className="cat-info">
                            <h4>{cat.name}</h4>
                            <span className="cat-count">Xem câu hỏi →</span>
                        </div>
                        <div className="cat-actions" onClick={(e) => e.preventDefault()}>
                            <button className="btn-icon" onClick={(e) => { e.preventDefault(); setForm({ name: cat.name, icon: cat.icon }); setEditingId(cat.id); setShowModal(true); }}>✏️</button>
                            <button className="btn-icon danger" onClick={(e) => { e.preventDefault(); handleDelete(cat.id); }}>🗑️</button>
                        </div>
                    </Link>
                ))}
            </div>

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        <h3>{editingId ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h3>
                        <div className="form-group">
                            <label>Icon</label>
                            <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Tên danh mục</label>
                            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nhập tên..." />
                        </div>
                        <div className="form-actions">
                            <button className="btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                            <button className="btn-primary" onClick={handleSave}>{editingId ? 'Cập nhật' : 'Tạo mới'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ========== QUESTIONS PAGE ==========
const QuestionsPage = ({ categoryId }) => {
    const { token } = useAuth();
    const [category, setCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [form, setForm] = useState({ text: '' });
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    useEffect(() => {
        if (token && categoryId) {
            fetchCategory();
            fetchQuestions();
        }
    }, [categoryId, token]);

    const fetchCategory = async () => {
        try {
            const res = await fetch(`${API_BASE}/categories`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const cats = await res.json();
            setCategory(cats.find(c => c.id === parseInt(categoryId)));
        } catch (err) { console.error(err); }
    };

    const fetchQuestions = async () => {
        try {
            const res = await fetch(`${API_BASE}/questions?category_id=${categoryId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setQuestions(await res.json());
            setPage(1); // Reset to page 1 when fetching new questions
        } catch (err) { console.error(err); }
    };

    const handleSave = async () => {
        if (!form.text.trim()) return;
        const url = editingId ? `${API_BASE}/questions/${editingId}` : `${API_BASE}/questions`;
        const body = { ...form, category_id: categoryId };
        await fetch(url, {
            method: editingId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        setForm({ text: '' });
        setEditingId(null);
        setShowModal(false);
        fetchQuestions();
    };

    const handleDelete = async (id) => {
        if (!confirm('Xóa câu hỏi này?')) return;
        await fetch(`${API_BASE}/questions/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchQuestions();
    };

    // Pagination logic
    const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);
    const startIdx = (page - 1) * ITEMS_PER_PAGE;
    const paginatedQuestions = questions.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <div className="breadcrumb">
                    <Link to="/admin/categories" className="btn-back">← Danh mục</Link>
                    <span className="current">{category?.icon} {category?.name}</span>
                    <span className="question-count">({questions.length} câu hỏi)</span>
                </div>
                <button className="btn-primary" onClick={() => { setForm({ text: '' }); setEditingId(null); setShowModal(true); }}>
                    + Thêm câu hỏi
                </button>
            </div>

            <div className="question-list">
                {paginatedQuestions.map((q, idx) => (
                    <div key={q.id} className="question-item">
                        <span className="q-number">{startIdx + idx + 1}</span>
                        <span className="q-text">{q.text}</span>
                        <div className="q-actions">
                            <button className="btn-icon" onClick={() => { setForm({ text: q.text }); setEditingId(q.id); setShowModal(true); }}>✏️</button>
                            <button className="btn-icon danger" onClick={() => handleDelete(q.id)}>🗑️</button>
                        </div>
                    </div>
                ))}
                {questions.length === 0 && <div className="empty-state">Chưa có câu hỏi nào</div>}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination-controls">
                    <button
                        className="pagination-btn"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        ← Trước
                    </button>
                    <span className="pagination-info">
                        Trang {page} / {totalPages}
                    </span>
                    <button
                        className="pagination-btn"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Sau →
                    </button>
                </div>
            )}

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        <h3>{editingId ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}</h3>
                        <div className="form-group">
                            <label>Nội dung câu hỏi</label>
                            <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} placeholder="Nhập nội dung..." />
                        </div>
                        <div className="form-actions">
                            <button className="btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                            <button className="btn-primary" onClick={handleSave}>{editingId ? 'Cập nhật' : 'Thêm'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ========== CUSTOMERS PAGE ==========
const CustomersPage = () => {
    const { token } = useAuth();
    const [customers, setCustomers] = useState({ customers: [], total: 0 });
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('info'); // 'info' or 'history'
    const [historyPage, setHistoryPage] = useState(1); // Pagination for consultation history
    const HISTORY_PER_PAGE = 5;

    useEffect(() => { if (token) fetchCustomers(); }, [page, searchTerm, token]);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/customers?page=${page}&limit=20&search=${searchTerm}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCustomers(await res.json());
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const fetchDetail = async (id) => {
        try {
            const res = await fetch(`${API_BASE}/customers/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setSelectedCustomer(data);
            setActiveTab('info'); // Reset to info tab when selecting new customer
            setHistoryPage(1); // Reset history pagination
        } catch (err) { console.error(err); }
    };

    // Paginated consultations
    const consultations = selectedCustomer?.consultations || [];
    const totalHistoryPages = Math.ceil(consultations.length / HISTORY_PER_PAGE);
    const paginatedConsultations = consultations.slice(
        (historyPage - 1) * HISTORY_PER_PAGE,
        historyPage * HISTORY_PER_PAGE
    );

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h2>👥 Quản lý khách hàng</h2>
                <div className="search-box">
                    <input type="text" placeholder="Tìm theo tên hoặc năm sinh..." value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} />
                </div>
            </div>

            <div className={`customer-split-view ${selectedCustomer ? 'has-detail' : ''}`}>
                {/* Left Panel: Customer List */}
                <div className="customer-list-panel">
                    {loading ? <div className="loading-state">Đang tải...</div> : (
                        <>
                            <div className="customer-table compact with-index">
                                <div className="table-header">
                                    <span className="cell-index">#</span>
                                    <span>Tên</span>
                                    <span>Ngày sinh</span>
                                    <span>Giới tính</span>
                                    <span>Tư vấn</span>
                                </div>
                                {customers.customers?.map((c, idx) => (
                                    <div
                                        key={c.id}
                                        className={`table-row ${selectedCustomer?.id === c.id ? 'active' : ''}`}
                                        onClick={() => fetchDetail(c.id)}
                                    >
                                        <span className="cell-index">{(page - 1) * 20 + idx + 1}</span>
                                        <span className="cell-name">{c.name || 'Ẩn danh'}</span>
                                        <span>{c.day}/{c.month}/{c.year}</span>
                                        <span>{c.gender}</span>
                                        <span className="cell-count">{c.consultation_count}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="pagination compact">
                                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>←</button>
                                <span>{page} / {Math.ceil(customers.total / 20) || 1}</span>
                                <button disabled={page >= Math.ceil(customers.total / 20)} onClick={() => setPage(p => p + 1)}>→</button>
                            </div>
                        </>
                    )}
                </div>

                {/* Right Panel: Customer Detail with Tabs */}
                {selectedCustomer && (
                    <div className="customer-detail-panel">
                        <div className="detail-header">
                            <h3>{selectedCustomer.name || 'Ẩn danh'}</h3>
                            <button className="btn-close-panel" onClick={() => setSelectedCustomer(null)}>✕</button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="tab-nav">
                            <button
                                className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
                                onClick={() => setActiveTab('info')}
                            >
                                📋 Thông tin
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                                onClick={() => setActiveTab('history')}
                            >
                                📜 Lịch sử ({consultations.length})
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="tab-content">
                            {activeTab === 'info' && (
                                <div className="customer-info-tab">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">Tên</span>
                                            <span className="info-value">{selectedCustomer.name || 'Ẩn danh'}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Ngày sinh</span>
                                            <span className="info-value">{selectedCustomer.day}/{selectedCustomer.month}/{selectedCustomer.year}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Giờ sinh</span>
                                            <span className="info-value">{selectedCustomer.hour}:{String(selectedCustomer.minute).padStart(2, '0')}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Giới tính</span>
                                            <span className="info-value">{selectedCustomer.gender}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Lượt tư vấn</span>
                                            <span className="info-value">{consultations.length}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Lịch (Calendar)</span>
                                            <span className="info-value">{selectedCustomer.calendar === 'lunar' ? 'Âm lịch' : 'Dương lịch'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'history' && (
                                <div className="customer-history-tab">
                                    {consultations.length > 0 ? (
                                        <>
                                            <div className="consultation-history">
                                                {paginatedConsultations.map((con, i) => (
                                                    <div key={i} className="history-item">
                                                        <div className="h-index">#{(historyPage - 1) * HISTORY_PER_PAGE + i + 1}</div>
                                                        <div className="h-question">{con.question_text}</div>
                                                        <div className="h-answer">{Array.isArray(con.answer) ? con.answer.join(' ').substring(0, 300) : String(con.answer || '').substring(0, 300)}...</div>
                                                        <div className="h-meta">{formatDateTime(con.created_at)} {con.use_ai ? '🤖' : ''}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            {totalHistoryPages > 1 && (
                                                <div className="pagination compact history-pagination">
                                                    <button disabled={historyPage <= 1} onClick={() => setHistoryPage(p => p - 1)}>←</button>
                                                    <span>{historyPage} / {totalHistoryPages}</span>
                                                    <button disabled={historyPage >= totalHistoryPages} onClick={() => setHistoryPage(p => p + 1)}>→</button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="empty-state">Chưa có lịch sử tư vấn</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ========== USERS PAGE (Account & Credit Management) ==========
const UsersPage = () => {
    const { token } = useAuth();
    const [usersData, setUsersData] = useState({ users: [], total: 0 });
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [creditForm, setCreditForm] = useState({ amount: 0, reason: '' });
    const [showCreditModal, setShowCreditModal] = useState(false);

    useEffect(() => { if (token) fetchUsers(); }, [page, searchTerm, token]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/users?page=${page}&limit=20&search=${searchTerm}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsersData(await res.json());
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSetCredits = async () => {
        try {
            await fetch(`${API_BASE}/users/${selectedUser.id}/credits`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ credits: creditForm.amount, description: creditForm.reason })
            });
            setShowCreditModal(false);
            setSelectedUser(null);
            fetchUsers();
        } catch (err) { console.error(err); }
    };

    const formatDateTime = (dateStr) => {
        if (!dateStr) return 'Chưa';
        let date = dateStr.includes('T') ? new Date(dateStr) : new Date(dateStr.replace(' ', 'T') + 'Z');
        const vn = new Date(date.getTime() + 7 * 60 * 60 * 1000);
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(vn.getUTCDate())}/${pad(vn.getUTCMonth() + 1)}/${vn.getUTCFullYear()}`;
    };

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h2>👤 Quản lý tài khoản & Linh Thạch</h2>
                <div className="search-box">
                    <input type="text" placeholder="Tìm theo email hoặc tên..." value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} />
                </div>
            </div>

            {loading ? <div className="loading-state">Đang tải...</div> : (
                <>
                    <div className="customer-table">
                        <div className="table-header">
                            <span>Email</span><span>Tên</span><span>Linh Thạch</span><span>Admin</span><span>Đăng ký</span>
                        </div>
                        {usersData.users?.map(u => (
                            <div key={u.id} className="table-row" onClick={() => { setSelectedUser(u); setCreditForm({ amount: u.credits, reason: '' }); setShowCreditModal(true); }}>
                                <span className="cell-name">{u.email}</span>
                                <span>{u.name || '-'}</span>
                                <span className="credit-badge">💎 {u.credits}</span>
                                <span>{u.is_admin ? '✅' : '-'}</span>
                                <span className="cell-time">{formatDateTime(u.created_at)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Trước</button>
                        <span>Trang {page} / {Math.ceil(usersData.total / 20) || 1}</span>
                        <button disabled={page >= Math.ceil(usersData.total / 20)} onClick={() => setPage(p => p + 1)}>Tiếp →</button>
                    </div>
                </>
            )}

            {showCreditModal && selectedUser && (
                <div className="admin-modal-overlay" onClick={() => setShowCreditModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowCreditModal(false)}>✕</button>
                        <h3>💎 Điều chỉnh Linh Thạch</h3>
                        <div className="user-info-summary">
                            <div><strong>Email:</strong> {selectedUser.email}</div>
                            <div><strong>Hiện có:</strong> {selectedUser.credits} Linh Thạch</div>
                        </div>
                        <div className="form-group">
                            <label>Số Linh Thạch mới</label>
                            <input type="number" value={creditForm.amount}
                                onChange={(e) => setCreditForm({ ...creditForm, amount: parseInt(e.target.value) || 0 })} />
                        </div>
                        <div className="form-group">
                            <label>Lý do điều chỉnh</label>
                            <input type="text" value={creditForm.reason}
                                onChange={(e) => setCreditForm({ ...creditForm, reason: e.target.value })}
                                placeholder="VD: Nạp thêm, Hoàn tiền..." />
                        </div>
                        <div className="credit-preview">
                            {creditForm.amount > selectedUser.credits
                                ? <span className="credit-add">+{creditForm.amount - selectedUser.credits}</span>
                                : creditForm.amount < selectedUser.credits
                                    ? <span className="credit-deduct">{creditForm.amount - selectedUser.credits}</span>
                                    : <span>Không thay đổi</span>
                            }
                        </div>
                        <div className="form-actions">
                            <button className="btn-secondary" onClick={() => setShowCreditModal(false)}>Hủy</button>
                            <button className="btn-primary" onClick={handleSetCredits}>Cập nhật</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ========== CREDIT REQUESTS PAGE ==========
const CreditRequestsPage = () => {
    const { token } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { if (token) fetchRequests(); }, [token]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/credit-requests`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setRequests(await res.json());
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleApprove = async (id) => {
        try {
            await fetch(`${API_BASE}/credit-requests/${id}/approve`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchRequests();
        } catch (err) { console.error(err); }
    };

    const handleReject = async (id) => {
        const note = prompt('Lý do từ chối (tuỳ chọn):');
        if (note === null) return; // Cancelled prompt
        try {
            await fetch(`${API_BASE}/credit-requests/${id}/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ note })
            });
            fetchRequests();
        } catch (err) { console.error(err); }
    };

    const formatDateTime = (dateStr) => {
        if (!dateStr) return 'N/A';
        let date = dateStr.includes('T') ? new Date(dateStr) : new Date(dateStr.replace(' ', 'T') + 'Z');
        const vn = new Date(date.getTime() + 7 * 60 * 60 * 1000);
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(vn.getUTCHours())}:${pad(vn.getUTCMinutes())} ${pad(vn.getUTCDate())}/${pad(vn.getUTCMonth() + 1)}`;
    };

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h2>📩 Yêu cầu Linh Thạch</h2>
            </div>

            {loading ? <div className="loading-state">Đang tải...</div> : requests.length === 0 ? (
                <div className="empty-state">Không có yêu cầu nào đang chờ</div>
            ) : (
                <div className="request-list">
                    {requests.map(req => (
                        <div key={req.id} className="request-card">
                            <div className="request-info">
                                <div className="request-user">
                                    <span className="user-email">{req.email}</span>
                                    <span className="user-name">{req.name || 'Chưa đặt tên'}</span>
                                </div>
                                <div className="request-details">
                                    <span className="request-amount">💎 +{req.amount}</span>
                                    <span className="request-current">Hiện có: {req.current_credits}</span>
                                    <span className="request-time">{formatDateTime(req.created_at)}</span>
                                </div>
                            </div>
                            <div className="request-actions">
                                <button className="btn-approve" onClick={() => handleApprove(req.id)}>✅ Duyệt</button>
                                <button className="btn-reject" onClick={() => handleReject(req.id)}>❌ Từ chối</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ========== ARTICLES ADMIN PAGE ==========
const ArticlesAdminPage = () => {
    const { token } = useAuth();
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [form, setForm] = useState({
        title: '', excerpt: '', content: '', category_id: '', is_published: true, is_featured: false
    });
    const [seeding, setSeeding] = useState(false);

    useEffect(() => { if (token) { fetchArticles(); fetchCategories(); } }, [token, page]);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_CONFIG.BASE_URL}/articles/admin/all?page=${page}&limit=15`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setArticles(data.articles || []);
                setTotalPages(data.pagination?.totalPages || 1);
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_CONFIG.BASE_URL}/articles/categories`);
            const data = await res.json();
            if (data.success) setCategories(data.categories || []);
        } catch (err) { console.error(err); }
    };

    const handleSeedArticles = async () => {
        if (!confirm('Khởi tạo 100 bài viết mẫu về Bát Tự? (Chỉ chạy 1 lần)')) return;
        setSeeding(true);
        try {
            const res = await fetch(`${API_CONFIG.BASE_URL}/articles/seed`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            alert(data.message);
            fetchArticles();
        } catch (err) { console.error(err); alert('Lỗi khi khởi tạo bài viết'); }
        finally { setSeeding(false); }
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            alert('Vui lòng nhập tiêu đề và nội dung');
            return;
        }
        const url = editingArticle
            ? `${API_CONFIG.BASE_URL}/articles/${editingArticle.id}`
            : `${API_CONFIG.BASE_URL}/articles`;
        try {
            await fetch(url, {
                method: editingArticle ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
            setShowModal(false);
            setEditingArticle(null);
            setForm({ title: '', excerpt: '', content: '', category_id: '', is_published: true, is_featured: false });
            fetchArticles();
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Xóa bài viết này?')) return;
        try {
            await fetch(`${API_CONFIG.BASE_URL}/articles/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchArticles();
        } catch (err) { console.error(err); }
    };

    const openEditModal = (article) => {
        setEditingArticle(article);
        setForm({
            title: article.title,
            excerpt: article.excerpt || '',
            content: article.content,
            category_id: article.category_id || '',
            is_published: !!article.is_published,
            is_featured: !!article.is_featured
        });
        setShowModal(true);
    };

    const openNewModal = () => {
        setEditingArticle(null);
        setForm({ title: '', excerpt: '', content: '', category_id: '', is_published: true, is_featured: false });
        setShowModal(true);
    };

    return (
        <div className="admin-page-content">
            <div className="page-header stacked">
                <h2>📝 Quản lý Bài viết</h2>
                <div className="header-actions">
                    <button className="btn-secondary" onClick={handleSeedArticles} disabled={seeding}>
                        {seeding ? 'Đang khởi tạo...' : '🌱 Seed 100 bài'}
                    </button>
                    <button className="btn-primary" onClick={openNewModal}>+ Thêm bài viết</button>
                </div>
            </div>

            {loading ? <div className="loading-state">Đang tải...</div> : (
                <>
                    <div className="customer-table">
                        <div className="table-header">
                            <span>Tiêu đề</span><span>Danh mục</span><span>Trạng thái</span><span>Lượt xem</span><span>Hành động</span>
                        </div>
                        {articles.map(article => (
                            <div key={article.id} className="table-row">
                                <span className="cell-name">{article.title.substring(0, 50)}{article.title.length > 50 ? '...' : ''}</span>
                                <span>{article.category_name || '-'}</span>
                                <span>{article.is_published ? '✅ Đã đăng' : '📝 Nháp'} {article.is_featured ? '⭐' : ''}</span>
                                <span>{article.views || 0}</span>
                                <span className="cell-actions">
                                    <button className="btn-icon" onClick={() => openEditModal(article)}>✏️</button>
                                    <button className="btn-icon danger" onClick={() => handleDelete(article.id)}>🗑️</button>
                                </span>
                            </div>
                        ))}
                        {articles.length === 0 && <div className="empty-state">Chưa có bài viết nào</div>}
                    </div>
                    <div className="pagination">
                        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Trước</button>
                        <span>Trang {page} / {totalPages}</span>
                        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Tiếp →</button>
                    </div>
                </>
            )}

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal admin-modal-large" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        <h3>{editingArticle ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h3>
                        <div className="form-group">
                            <label>Tiêu đề *</label>
                            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Nhập tiêu đề..." />
                        </div>
                        <div className="form-group">
                            <label>Danh mục</label>
                            <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                                <option value="">-- Chọn danh mục --</option>
                                {categories.filter(c => c.slug !== 'all').map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tóm tắt</label>
                            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} placeholder="Mô tả ngắn..." />
                        </div>
                        <div className="form-group">
                            <label>Nội dung * (HTML)</label>
                            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} placeholder="<h2>Tiêu đề</h2><p>Nội dung...</p>" />
                        </div>
                        <div className="form-row">
                            <label><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} /> Đã đăng</label>
                            <label><input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} /> Nổi bật</label>
                        </div>
                        <div className="form-actions">
                            <button className="btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                            <button className="btn-primary" onClick={handleSave}>{editingArticle ? 'Cập nhật' : 'Tạo mới'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ========== MAIN ADMIN LAYOUT ==========
const AdminPage = () => {
    const location = useLocation();
    const path = location.pathname;
    const { user, isAuthenticated, loading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Extract categoryId from URL if on questions page
    const categoryId = path.match(/\/admin\/categories\/(\d+)/)?.[1];

    const isActive = (route) => {
        if (route === '/admin' && path === '/admin') return true;
        if (route !== '/admin' && path.startsWith(route)) return true;
        return false;
    };

    // Check auth - require login and admin role
    if (loading) {
        return (
            <div className="admin-auth-screen">
                <div className="loading-spinner">Đang tải...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="admin-auth-screen">
                {showAuthModal && createPortal(
                    <AuthModal onClose={() => setShowAuthModal(false)} onSuccess={() => setShowAuthModal(false)} />,
                    document.body
                )}
                <div className="auth-required-box">
                    <div className="auth-icon">🔐</div>
                    <h2>Yêu cầu đăng nhập</h2>
                    <p>Vui lòng đăng nhập để truy cập trang quản trị</p>
                    <button className="btn-primary" onClick={() => setShowAuthModal(true)}>
                        Đăng nhập
                    </button>
                </div>
            </div>
        );
    }

    if (!user?.is_admin) {
        return (
            <div className="admin-auth-screen">
                <div className="auth-required-box">
                    <div className="auth-icon">⛔</div>
                    <h2>Không có quyền truy cập</h2>
                    <p>Tài khoản của bạn không có quyền quản trị</p>
                    <a href="/" className="btn-secondary">← Quay lại trang chủ</a>
                </div>
            </div>
        );
    }

    // Determine which page to render
    const renderContent = () => {
        if (path === '/admin' || path === '/admin/') {
            return <DashboardPage />;
        }
        if (categoryId) {
            return <QuestionsPage categoryId={categoryId} />;
        }
        if (path.startsWith('/admin/categories')) {
            return <CategoriesPage />;
        }
        if (path.startsWith('/admin/customers')) {
            return <CustomersPage />;
        }
        if (path.startsWith('/admin/users')) {
            return <UsersPage />;
        }
        if (path.startsWith('/admin/credit-requests')) {
            return <CreditRequestsPage />;
        }
        if (path.startsWith('/admin/articles')) {
            return <ArticlesAdminPage />;
        }
        return <DashboardPage />;
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h1>⚙️ ADMIN</h1>
                    <span className="subtitle">Huyền Cơ Bát Tự</span>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin" className={path === '/admin' ? 'active' : ''}>
                        <span className="nav-icon">📊</span> <span className="nav-label">Tổng quan</span>
                    </Link>
                    <Link to="/admin/categories" className={path.includes('/categories') ? 'active' : ''}>
                        <span className="nav-icon">📁</span> <span className="nav-label">Danh mục</span>
                    </Link>
                    <Link to="/admin/users" className={path.includes('/users') ? 'active' : ''}>
                        <span className="nav-icon">👤</span> <span className="nav-label">Tài khoản</span>
                    </Link>
                    <Link to="/admin/credit-requests" className={path.includes('/credit-requests') ? 'active' : ''}>
                        <span className="nav-icon">📩</span> <span className="nav-label">Yêu cầu nạp</span>
                    </Link>
                    <Link to="/admin/customers" className={path.includes('/customers') ? 'active' : ''}>
                        <span className="nav-icon">📋</span> <span className="nav-label">Khách hàng</span>
                    </Link>
                    <Link to="/admin/articles" className={path.includes('/articles') ? 'active' : ''}>
                        <span className="nav-icon">📝</span> <span className="nav-label">Bài viết</span>
                    </Link>
                    <Link to="/">
                        <span className="nav-icon">🏠</span> <span className="nav-label">Trang chủ</span>
                    </Link>
                </nav>
                <div className="sidebar-footer">
                    <Link to="/" className="back-link">← Quay lại trang chủ</Link>
                </div>
            </aside>

            <main className="admin-main">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminPage;
