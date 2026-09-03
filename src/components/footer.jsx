import { Link } from 'react-router-dom';
import './footer.css';

export function Footer() {
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-eyebrow">Official support</span>
          <h2>SEMAPHORE 2K26</h2>
          <p>Everything participants need before and during the fest, in one place.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <div className="footer-link-grid">
            <Link to="/events">Events</Link>
            <Link to="/checklist">Checklist</Link>
            <Link to="/arrival">Arrival Guide</Link>
            <Link to="/faq">FAQ &amp; Rules</Link>
            <Link to="/campus">Campus Map</Link>
            <Link to="/helpdesk">Help Desk</Link>
          </div>
        </div>

        <div className="footer-actions">
          <h3>Need assistance?</h3>
          <p>Contact the event team or visit the official fest website.</p>
          <div className="footer-button-group">
            <Link to="/helpdesk" className="footer-help-button">Open Help Desk</Link>
            <a href="https://www.semaphore2k26.in/" target="_blank" rel="noopener noreferrer" className="main-website-button">Main Website</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Semaphore 2K26. All rights reserved.</p>
        <a href="#top" onClick={scrollToTop}>Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
