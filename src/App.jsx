import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderNav from './components/header_nav';
import { Footer } from './components/footer';
import HomePage from './pages/home_page';
import ArrivalPage from './pages/arrival_page';
import ChecklistPage from './pages/checklist_page';
import FaqPage from './pages/faq_page';

function App() {
  return (
    <BrowserRouter>
      <HeaderNav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/arrival" element={<ArrivalPage />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
