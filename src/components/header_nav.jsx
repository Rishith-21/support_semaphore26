import './header_nav.css'

const navigationItems = ['Events', 'Guide', 'Checklist', 'FAQ', 'Map', 'Help']

function HeaderNav() {
  return (
    <header className="site-header">
      <nav className="header-nav" aria-label="Primary navigation">
        <a className="header-brand" href="#top" aria-label="Semaphore Support home">
          <span className="brand-mark" aria-hidden="true">
            logoipsum<span className="brand-spark">✦</span>
          </span>
          <span className="brand-copy">
            <strong>Semaphore</strong>
            <small>Support</small>
          </span>
        </a>

        <div className="header-links">
          {navigationItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </div>

        <label className="header-search">
          <span className="visually-hidden">Search</span>
          <input type="search" placeholder="searchbar disabled" disabled />
        </label>
      </nav>
    </header>
  )
}

export { HeaderNav }
export default HeaderNav
