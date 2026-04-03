import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/common/SEO';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import './index.css';
import BirthInput from './features/Homepage/BirthInput';
import BaziChart from './features/BaziChart/BaziChart';
import RelationshipRadar from './features/BaziChart/RelationshipRadar';
import ChartDetails from './features/BaziChart/ChartDetails';
import LuckCycles from './features/LuckCycles/LuckCycles';
import MatrixAnalysis from './features/Interpretation/MatrixAnalysis';
import ClassicTexts from './features/Interpretation/ClassicTexts';
import PersonalizedDate from './features/DateSelection/PersonalizedDate';
import AuspiciousDatePicker from './features/DateSelection/AuspiciousDatePicker';
import ConsultantPage from './features/Consultant/ConsultantPage';
import AdminPage from './features/Admin/AdminPage';
import ArticlePage from './features/Articles/ArticlePage';
import MatchingPage from './features/Matching/MatchingPage';
import HistoryPage from './features/ConsultationHistory/HistoryPage';
import QuePage from './features/Que/QuePage';
import PDFExportButton from './components/PDFExportButton';
import ImageExportButton from './components/ImageExportButton';
import ComprehensiveInterpretation from './components/ComprehensiveInterpretation';
import MobileShell from './components/MobileShell';
import DesktopShell from './components/DesktopShell';
import useWindowSize from './hooks/useWindowSize';
import { useBaziApi } from './hooks/useBaziApi';
import { AuthProvider } from './context/AuthContext';

// Input Page Component
const InputPage = ({ onAnalyze, loading }) => {
  const navigate = useNavigate();

  const handleAnalyze = async (params) => {
    const result = await onAnalyze(params);
    if (result) {
      // Navigate to chart page, preserving the query params updated by useBaziApi
      navigate({
        pathname: '/laso',
        search: window.location.search
      });
    }
  };

  return <BirthInput onAnalyze={handleAnalyze} loading={loading} />;
};

// Chart Page Content
const ChartPage = ({ data, isMobile }) => {
  const elementScores = data?.diem_so?.ngu_hanh_vn;

  return (
    <div className="tab-pane fade-in chart-page">
      <div className="chart-actions-bar">
        <div style={{ display: 'flex', gap: '8px' }}>
          {!isMobile && (
            <Link to={{ pathname: '/vanhan', search: window.location.search }} className="btn-vanhan-inline">
              📈 Vận Hạn
            </Link>
          )}
        </div>
        <div className="chart-actions-right">
          {/* {!isMobile && <PDFExportButton data={data} />} */}
          <ImageExportButton data={data} />
          <ComprehensiveInterpretation data={data} />
        </div>
      </div>

      <div className="chart-top-row">
        <div className="glass-card chart-info-card">
          <ChartDetails data={data} />
        </div>
        <div className="glass-card radar-card">
          <h4 className="radar-title">NGŨ HÀNH</h4>
          {elementScores && <RelationshipRadar scores={elementScores} />}
        </div>
      </div>

      <BaziChart data={data} isMobile={isMobile} />
    </div>
  );
};

// Loading Overlay Component
const LoadingOverlay = () => (
  <div className="loading-overlay glass-card">Đang tải dữ liệu...</div>
);

// Main App Component
const AppContent = () => {
  const { data, inputParams, loading, error, analyze, clearData } = useBaziApi();
  const { isMobile } = useWindowSize();
  const location = useLocation();
  const navigate = useNavigate();

  // If we have data and we're on home page, redirect to chart preserving params
  // But skip if there's a pending question from suggestions
  // Redirect to chart disabled to keep InputForm as homepage
  /*
  useEffect(() => {
    const hasPendingQuestion = localStorage.getItem('pending_question');
    if (data && (location.pathname === '/' || location.pathname === '/input') && !hasPendingQuestion) {
      navigate({
        pathname: '/laso',
        search: location.search
      }, { replace: true });
    }
  }, [data, location.pathname, navigate, location.search]);
  */

  const hasData = data !== null;
  const searchParams = new URLSearchParams(location.search);
  const isRecovering = !hasData && searchParams.get('year') && searchParams.get('month') && searchParams.get('day');

  // Render content based on route
  const renderPageContent = (PageComponent, props = {}) => {
    if (loading || isRecovering) {
      return <LoadingOverlay />;
    }
    // Allow consultant page if there's pending question from suggestion click
    const hasPendingQuestion = localStorage.getItem('pending_question');
    if (!hasData && !hasPendingQuestion) {
      return <Navigate to="/" replace />;
    }
    return <PageComponent {...props} />;
  };

  const Shell = isMobile ? MobileShell : DesktopShell;

  // Admin page renders standalone without Shell
  if (location.pathname.startsWith('/admin')) {
    return (
      <>
        <div className="bazi-bg"></div>
        <AdminPage />
      </>
    );
  }

  return (
    <HelmetProvider>
      <Shell hasData={hasData} onClearData={clearData}>
        <SEO
          title={hasData ? "Luận Giải Chi Tiết" : "Huyền Cơ Bát Tự - Trang Chủ"}
          url={location.pathname}
        />
        <div className="bazi-bg"></div>

        <Routes>
          {/* Input form routes */}
          <Route path="/" element={<InputPage onAnalyze={analyze} loading={loading} />} />
          <Route path="/input" element={<Navigate to="/" replace />} />

          {/* Chart page */}
          <Route path="/laso" element={renderPageContent(ChartPage, { data, isMobile })} />

          {/* Analysis pages */}
          <Route path="/phantich" element={renderPageContent(MatrixAnalysis, { data })} />
          <Route path="/xemngay" element={renderPageContent(PersonalizedDate, { data, userData: inputParams })} />
          <Route path="/chonngay" element={renderPageContent(AuspiciousDatePicker, { userData: inputParams })} />
          <Route path="/tuvan" element={renderPageContent(ConsultantPage, { userData: inputParams })} />
          <Route path="/vanhan" element={renderPageContent(LuckCycles, { data })} />
          <Route path="/dientich" element={renderPageContent(ClassicTexts, { data })} />

          {/* Matching page - uses current userData as person1 */}
          <Route path="/duyenso" element={<MatchingPage userData={inputParams} />} />

          {/* Xin Que page */}
          <Route path="/xinque" element={renderPageContent(QuePage, { userData: inputParams })} />

          {/* History page - Standalone */}
          <Route path="/lich-su" element={<HistoryPage />} />

          {/* Article page - standalone, no data required */}
          <Route path="/bai-viet/:slug" element={<ArticlePage />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {error && (
          <div className="error-toast glass-card">
            ⚠️ Lỗi: {error}
          </div>
        )}
      </Shell>
    </HelmetProvider>
  );
};

// Root App with Router
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
