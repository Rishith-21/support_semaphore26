import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header_nav.css';

const navigationItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Events', to: '/events' },
  { label: 'Arrival Guide', to: '/arrival' },
  { label: 'Checklist', to: '/checklist' },
  { label: 'FAQ & Rules', to: '/faq' },
];

function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className="header-nav" aria-label="Primary navigation">
        <NavLink className="header-brand" to="/" aria-label="Semaphore Support home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">S</span>
          <span className="brand-copy"><strong>Semaphore</strong><small>Support Center</small></span>
        </NavLink>

        <div className={`header-menu${menuOpen ? ' is-open' : ''}`} id="primary-menu" onClick={() => setMenuOpen(false)}>
          <div className="header-links">
            {navigationItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>
            ))}
            <NavLink className="campus-mobile-link" to="/campus">Campus Map</NavLink>
          </div>
          <NavLink className="helpdesk-nav-button" to="/helpdesk">Help Desk</NavLink>
        </div>

        <button
          type="button"
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
      </nav>
      {menuOpen && <button className="nav-backdrop" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}

export { HeaderNav };
export default HeaderNav;
