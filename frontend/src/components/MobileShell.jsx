import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import UserProfileModal from './UserProfileModal';

// Header navigation items (4 items)
const headerTabs = [
  { id: 'date', path: '/xemngay', label: 'XEM NGÀY', icon: '📅' },
  { id: 'matching', path: '/duyenso', label: 'DUYÊN SỐ', icon: '🎎' },
  { id: 'cycles', path: '/vanhan', label: 'VẬN HẠN', icon: '📈' },
  { id: 'wisdom', path: '/dientich', label: 'ĐIỂN TỊCH', icon: '📜' },
];

// Status Bar Component - Now includes user info
const StatusBar = () => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <>
      <div className="mobile-status-bar">
        <span className="status-time">{timeStr}</span>
        <span className="status-notch"></span>
        <div className="status-right">
          {isAuthenticated ? (
            <div className="user-info-compact" onClick={() => setShowUserMenu(!showUserMenu)}>
              <span className="user-credits">💎 {user?.credits || 0}</span>
              <span className="user-avatar">👤</span>
            </div>
          ) : (
            <button className="btn-login-compact" onClick={() => setShowAuthModal(true)}>
              Đăng nhập
            </button>
          )}
        </div>
      </div>

      {/* User Dropdown Menu */}
      {showUserMenu && isAuthenticated && createPortal(
        <div className="user-dropdown-overlay" onClick={() => setShowUserMenu(false)}>
          <div className="user-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="dropdown-header">
              <span className="dropdown-avatar">👤</span>
              <div className="dropdown-info">
                <span className="dropdown-name">{user?.name || 'Mệnh chủ'}</span>
                <span className="dropdown-email">{user?.email}</span>
              </div>
            </div>
            <div className="dropdown-credits">
              <span className="credits-label">Linh Thạch</span>
              <span className="credits-value">💎 {user?.credits || 0}</span>
            </div>
            <div className="dropdown-actions">
              <button className="dropdown-btn" onClick={() => { setShowProfileModal(true); setShowUserMenu(false); }}>
                👤 Thông tin tài khoản
              </button>
              <button className="dropdown-btn" onClick={() => { navigate('/lich-su'); setShowUserMenu(false); }}>
                📜 Lịch sử tư vấn
              </button>
              <button className="dropdown-btn logout" onClick={handleLogout}>
                🚪 Đăng xuất
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {showAuthModal && createPortal(
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />,
        document.body
      )}

      {showProfileModal && createPortal(
        <UserProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
        />,
        document.body
      )}
    </>
  );
};

// Brand Bar Component
const BrandBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/input';

  if (isHomePage) return null;

  return (
    <div className="mobile-brand-bar" onClick={() => navigate('/')}>
      <h1 className="mobile-mini-brand">HUYỀN CƠ BÁT TỰ</h1>
    </div>
  );
};

// Header Navigation Component - Simplified
const HeaderNav = () => {
  const location = useLocation();

  return (
    <header className="mobile-header">
      <nav className="header-nav">
        {headerTabs.map(tab => (
          <NavLink
            key={tab.id}
            to={{ pathname: tab.path, search: location.search }}
            className={({ isActive }) => `header-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

// Bottom Navigation Component - Redesigned with center button
const BottomNav = ({ onClearData }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onClearData) {
      onClearData();
    }
    navigate('/');
  };

  // Left items
  const leftTabs = [
    { id: 'chart', path: '/laso', label: 'LÁ SỐ', icon: '🎨' },
    { id: 'matrix', path: '/phantich', label: 'PHÂN TÍCH', icon: '⚙️' },
  ];

  // Right items
  const rightTabs = [
    { id: 'que', path: '/xinque', label: 'GIEO QUẺ', icon: '🎴' },
    { id: 'home', path: '/', label: 'TRANG CHỦ', icon: '🏠', onClick: handleHomeClick },
  ];

  // Center button (Tư Vấn) - ☯️ Yin-Yang symbol for BaZi/Feng Shui
  const centerTab = { id: 'consultant', path: '/tuvan', label: 'TƯ VẤN', icon: '☯️' };

  return (
    <nav className="mobile-bottom-nav">
      <div className="nav-left">
        {leftTabs.map(tab => (
          <NavLink
            key={tab.id}
            to={{ pathname: tab.path, search: location.search }}
            className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Center Floating Button */}
      <NavLink
        to={{ pathname: centerTab.path, search: location.search }}
        className={({ isActive }) => `bottom-nav-center ${isActive ? 'active' : ''}`}
      >
        <span className="center-icon">{centerTab.icon}</span>
        <span className="center-label">{centerTab.label}</span>
      </NavLink>

      <div className="nav-right">
        {rightTabs.map(tab => (
          tab.id === 'home' ? (
            <a
              key={tab.id}
              href="/"
              onClick={tab.onClick}
              className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </a>
          ) : (
            <NavLink
              key={tab.id}
              to={{ pathname: tab.path, search: location.search }}
              className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </NavLink>
          )
        ))}
      </div>
    </nav>
  );
};

// Main Mobile Shell Component
const MobileShell = ({ children, hasData, onClearData }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/input';
  const pageClass = location.pathname.split('/').filter(Boolean).join('-') || 'home';

  return (
    <div className={`mobile-shell ${pageClass}-page ${isHomePage ? 'home-page' : ''}`}>
      <div className="mobile-top-fixed">
        <StatusBar />
        <BrandBar />
        <HeaderNav />
      </div>
      <main className="mobile-content">
        {children}
      </main>
      <BottomNav onClearData={onClearData} />
    </div>
  );
};

export default MobileShell;
