import { NavLink } from 'react-router-dom';
import './header_nav.css';

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Arrival Guide', to: '/arrival' },
  { label: 'Checklist', to: '/checklist' },
  { label: 'FAQ & Rules', to: '/faq' },
];

function HeaderNav() {
  return (
    <header className="site-header">
      <nav className="header-nav" aria-label="Primary navigation">
        <NavLink className="header-brand" to="/" aria-label="Semaphore Support home">
          <span className="brand-mark" aria-hidden="true">logoipsum<span className="brand-spark">✦</span></span>
          <span className="brand-copy"><strong>Semaphore</strong><small>Support</small></span>
        </NavLink>
        <div className="header-links">
          {navigationItems.map((item) => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}
        </div>
        <label className="header-search">
          <span className="visually-hidden">Search</span>
          <input type="search" placeholder="searchbar disabled" disabled />
        </label>
      </nav>
    </header>
  );
}

export { HeaderNav };
export default HeaderNav;
