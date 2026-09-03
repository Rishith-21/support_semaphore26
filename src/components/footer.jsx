import { Link } from 'react-router-dom';
import './footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>SEMAPHORE 2K26</h2>
          <p>Your event support website for all important information, guidelines and assistance.</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/arrival">Arrival Guide</Link>
          <Link to="/checklist">Checklist</Link>
          <Link to="/faq">FAQ &amp; Rules</Link>
          <Link to="/campus">Campus Map</Link>
        </div>
        <div className="footer-main-website">
          <h3>Main Website</h3>
          <p>Visit our main website for complete event information.</p>
          <a href="https://www.semaphore2k26.in/" target="_blank" rel="noopener noreferrer" className="main-website-button">Visit Main Website</a>
        </div>
      </div>
      <div className="footer-bottom"><p>© SEMAPHORE 2K26. All rights reserved.</p></div>
    </footer>
  );
}
