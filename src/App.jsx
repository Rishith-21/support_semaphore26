import './App.css';
import { useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HeaderNav } from './components/header_nav';
import { Footer } from './components/footer';
import HomePage from './pages/home_page';
import ArrivalPage from './pages/arrival_page';
import ChecklistPage from './pages/checklist_page';
import EventsPage from './pages/events_page';
import FaqPage from './pages/faq_page';
import Helpdesk from './pages/helpdesk';
import CampusPage from './pages/campus_page';

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
      </main>
      <Footer />
    </div>
  );
}

export default App;
