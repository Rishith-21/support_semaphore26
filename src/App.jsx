import './App.css';
import { lazy, Suspense, useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HeaderNav } from './components/header_nav';
import { Footer } from './components/footer';

const HomePage = lazy(() => import('./pages/home_page'));
const ArrivalPage = lazy(() => import('./pages/arrival_page'));
const ChecklistPage = lazy(() => import('./pages/checklist_page'));
const EventsPage = lazy(() => import('./pages/events_page'));
const FaqPage = lazy(() => import('./pages/faq_page'));
const Helpdesk = lazy(() => import('./pages/helpdesk'));
const CampusPage = lazy(() => import('./pages/campus_page'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="app-layout">
      <ScrollToTop />
      <HeaderNav />
      <main className="main-content-wrapper">
        <Suspense fallback={<div className="page-loader" role="status" aria-live="polite">Loading page…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/arrival" element={<ArrivalPage />} />
            <Route path="/checklist" element={<ChecklistPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/helpdesk" element={<Helpdesk />} />
            <Route path="/campus" element={<CampusPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
