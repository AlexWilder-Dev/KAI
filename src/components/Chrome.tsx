import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { VENUE } from '../data';
import { useGoTo } from '../lib/useGoTo';
import { useNow } from '../lib/useNow';
import { BagIcon, PinIcon, StackIcon } from './Icons';
import { Logo } from './Logo';
import './Chrome.css';

export function Header() {
  const goTo = useGoTo();
  const { status } = useNow();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`top ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="top__inner">
        <Link to="/" className="top__logo" aria-label="KAI home">
          <Logo />
        </Link>

        <button type="button" className={`top__status ${status.open ? 'is-open' : ''}`} onClick={() => goTo('find-us')}>
          <span className="dot" aria-hidden="true" />
          {status.open ? `Open ${status.detail}` : status.label}
        </button>

        <nav className="top__nav" aria-label="Main">
          <NavLink to="/menu" className="top__link">
            Menu
          </NavLink>
          <button type="button" className="top__link" onClick={() => goTo('find-us')}>
            Find us
          </button>
          <a className="btn btn--maple top__order" href={VENUE.deliveroo} target="_blank" rel="noopener">
            Order on Deliveroo
          </a>
        </nav>
      </div>
    </header>
  );
}

export function BottomBar() {
  const { pathname } = useLocation();
  const onMenu = pathname.startsWith('/menu');
  return (
    <nav className="bar" aria-label="Quick links">
      <Link
        to="/menu"
        className={`bar__item ${onMenu ? 'is-here' : ''}`}
        aria-current={onMenu ? 'page' : undefined}
        onClick={() => onMenu && window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <StackIcon />
        <span>Menu</span>
      </Link>
      <a className="bar__item" href={VENUE.directions} target="_blank" rel="noopener">
        <PinIcon />
        <span>Directions</span>
      </a>
      <a className="bar__item bar__item--maple" href={VENUE.deliveroo} target="_blank" rel="noopener">
        <BagIcon />
        <span>Deliveroo</span>
      </a>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="layer layer--ink foot">
      <div className="wrap">
        <Logo className="foot__logo" />
        <div className="foot__row">
          <p className="foot__line">
            {VENUE.street}, {VENUE.city} {VENUE.postcode}
          </p>
          <ul className="foot__links">
            <li>
              <Link to="/menu" className="link">
                Menu
              </Link>
            </li>
            <li>
              <a className="link" href={VENUE.instagram} target="_blank" rel="noopener">
                Instagram
              </a>
            </li>
            <li>
              <a className="link" href={VENUE.deliveroo} target="_blank" rel="noopener">
                Deliveroo
              </a>
            </li>
          </ul>
        </div>
        <div className="foot__base">
          <span>© KAI {new Date().getFullYear()}</span>
          <span>Site by AlexWilder-Dev</span>
        </div>
      </div>
    </footer>
  );
}
