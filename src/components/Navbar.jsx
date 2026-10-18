import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onOpenChat }) {
  const location = useLocation();
  const path = location.pathname;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/projects', label: 'Portfolio' },
    { to: '/services', label: 'Service' },
  ];

  return (
    <header className="nav-wrapper">
      <nav className="nav-container" aria-label="Main Navigation">
        <Link to="/" className="nav-brand">
          capture&reg;
        </Link>
        <ul className="nav-menu">
          {navLinks.map((item) => {
            const isActive =
              item.to === '/'
                ? path === '/'
                : path.startsWith(item.to) ||
                  (item.to === '/projects' && path.startsWith('/portfolio')) ||
                  (item.to === '/services' && path.startsWith('/service'));

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={'nav-link ' + (isActive ? 'active' : '')}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <button className="nav-btn" type="button" onClick={onOpenChat}>
          Let's chat
        </button>
      </nav>
    </header>
  );
}