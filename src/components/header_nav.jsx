
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
  const [scrolled, setScrolled] = useState(false);

  /* =====================================================
     Detect page scroll
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  /* =====================================================
     Lock background while mobile menu is open
  ===================================================== */

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        'keydown',
        closeOnEscape
      );
    };
  }, [menuOpen]);


  /* =====================================================
     Close mobile navigation when resizing to desktop
  ===================================================== */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  /* =====================================================
     Navigation click
  ===================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (
    <header
      className={`site-header${scrolled ? ' is-scrolled' : ''}${
        menuOpen ? ' menu-active' : ''
      }`}
    >

      {/* =================================================
          AMBIENT HEADER LIGHT
      ================================================= */}

      <div className="header-ambient" aria-hidden="true">
        <span className="ambient-orb orb-one" />
        <span className="ambient-orb orb-two" />
        <span className="ambient-line line-one" />
        <span className="ambient-line line-two" />
      </div>


      <nav
        className="header-nav"
        aria-label="Primary navigation"
      >

        {/* =================================================
            BRAND
        ================================================= */}

        <NavLink
          className="header-brand"
          to="/"
          aria-label="Semaphore 2K26 home"
          onClick={closeMenu}
        >

          <div
            className="brand-logos"
            aria-label="NITTE, SAMCA and Semaphore"
          >

            {/* NITTE */}

            <span className="brand-logo nitte-logo">
              <img
                src="src/assets/nitte.png"
                alt="NITTE"
              />
            </span>


            <span
              className="brand-separator"
              aria-hidden="true"
            />


            {/* SAMCA */}

            <span className="brand-logo samca-logo">
              <img
                src="src/assets/samca.png"
                alt="SAMCA"
              />
            </span>


            <span
              className="brand-separator"
              aria-hidden="true"
            />


            {/* SEMAPHORE */}

            <span className="brand-logo semaphore-logo">

              <span
                className="semaphore-glow"
                aria-hidden="true"
              />

              <img
                src="src/assets/semaphore.png"
                alt="Semaphore 2K26"
              />

            </span>

          </div>

        </NavLink>


        {/* =================================================
            DESKTOP / MOBILE NAVIGATION
        ================================================= */}

        <div
          className={`header-menu${
            menuOpen ? ' is-open' : ''
          }`}
          id="primary-menu"
        >

          <div className="menu-inner">

            {/* Navigation */}

            <div className="header-links">

              {navigationItems.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  style={{
                    '--nav-index': index,
                  }}
                  onClick={closeMenu}
                >
                  <span className="nav-number">
                    0{index + 1}
                  </span>

                  <span className="nav-label">
                    {item.label}
                  </span>

                  <span
                    className="nav-active-dot"
                    aria-hidden="true"
                  />
                </NavLink>
              ))}


              {/* Mobile campus link */}

              <NavLink
                className="campus-mobile-link"
                to="/campus"
                onClick={closeMenu}
              >
                <span className="nav-number">
                  06
                </span>

                <span className="nav-label">
                  Campus Map
                </span>
              </NavLink>

            </div>


            {/* =================================================
                HELP DESK CTA
            ================================================= */}

            <NavLink
              className="helpdesk-nav-button"
              to="/helpdesk"
              onClick={closeMenu}
            >

              <span className="helpdesk-icon">
                <span />
                <span />
              </span>

              <span className="helpdesk-copy">
                <small>NEED HELP?</small>
                <strong>Help Desk</strong>
              </span>

              <span
                className="helpdesk-arrow"
                aria-hidden="true"
              >
                →
              </span>

            </NavLink>

          </div>

        </div>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className={`menu-toggle${
            menuOpen ? ' is-open' : ''
          }`}
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          aria-label={
            menuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          onClick={() =>
            setMenuOpen((open) => !open)
          }
        >

          <span className="menu-toggle-text">
            {menuOpen ? 'CLOSE' : 'MENU'}
          </span>

          <span className="menu-icon">
            <span />
            <span />
            <span />
          </span>

        </button>

      </nav>


      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      <button
        className={`nav-backdrop${
          menuOpen ? ' is-visible' : ''
        }`}
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />


      {/* =====================================================
          BOTTOM SCAN LINE
      ===================================================== */}

      <div
        className="header-scanline"
        aria-hidden="true"
      />

    </header>
  );
}


export { HeaderNav };

export default HeaderNav;