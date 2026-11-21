import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { siteContent, currentUser, logout } = useTrust();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 48);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  const headerClass = isHome
    ? `site-header ${scrolled ? 'header-scrolled' : 'header-hero-top'}`
    : 'site-header';

  return (
    <>
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <header className={headerClass}>
        {(!isHome || scrolled) && siteContent.homeAnnouncement && (
          <div className="announcement-strip">
            <span>{siteContent.homeAnnouncement}</span>
            <Link to="/requests">Explore Active Cases &rarr;</Link>
          </div>
        )}

        <div className="container navbar-inner">
          <Link to="/" className="brand-logo" onClick={closeMenu}>
            <img
              className="brand-image"
              src="/assets/images/thisaigal/thisaigal-logo.png"
              alt={`${siteContent.trustName} logo`}
            />
          </Link>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          <nav className={`nav-collapse ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
            <ul className="nav-links">
              <li><NavLink to="/" end className="nav-link" onClick={closeMenu}>Home</NavLink></li>
              <li><NavLink to="/about" className="nav-link" onClick={closeMenu}>About</NavLink></li>
              <li><NavLink to="/services" className="nav-link" onClick={closeMenu}>Services</NavLink></li>
              <li><NavLink to="/requests" className="nav-link" onClick={closeMenu}>Our Work</NavLink></li>
              <li><NavLink to="/events" className="nav-link" onClick={closeMenu}>Events</NavLink></li>
              <li><NavLink to="/gallery" className="nav-link" onClick={closeMenu}>Gallery</NavLink></li>
              <li><NavLink to="/success-stories" className="nav-link" onClick={closeMenu}>Impact</NavLink></li>
              <li><NavLink to="/contact" className="nav-link" onClick={closeMenu}>Contact</NavLink></li>
            </ul>

            <div className="nav-actions">
              <Link
                to="/request-assistance"
                className={`btn btn-sm ${isHome && !scrolled ? 'btn-outline-light' : 'btn-outline-green'}`}
                onClick={closeMenu}
              >
                Request Help
              </Link>
              {currentUser ? (
                <>
                  {currentUser.role === 'admin' ? (
                    <Link to="/admin" className="btn btn-secondary btn-sm" onClick={closeMenu}>
                      Admin Console
                    </Link>
                  ) : (
                    <Link to="/donor-portal" className="btn btn-secondary btn-sm" onClick={closeMenu}>
                      My Support
                    </Link>
                  )}
                  <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn btn-sage btn-sm" onClick={closeMenu}>
                  Donate
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
