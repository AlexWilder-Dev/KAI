import { m, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon } from '../components/Icons';
import { MapleDrip } from '../components/MapleDrip';
import { LINES, VENUE, img, media } from '../data';
import { previewLabel } from '../lib/hours';
import { lofi } from '../lib/motion';
import { useNow } from '../lib/useNow';
import './Hero.css';

function HeroVideo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const saveData =
    typeof navigator !== 'undefined' &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const still = reduce || saveData;

  useEffect(() => {
    const v = ref.current;
    if (!v || still) return;
    v.muted = true;
    v.play().catch(() => setPlaying(false));
  }, [still]);

  return (
    <div className="hero__media">
      <img className="hero__poster" src={img('poster')} alt="" width={960} height={540} fetchPriority="high" />
      {!still && (
        <video
          ref={ref}
          className={`hero__video ${playing ? 'is-playing' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={img('poster')}
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
        >
          <source src={media('kai-bg.mp4')} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export function OpenNow() {
  const { at, status } = useNow();
  return (
    <div className={`now ${status.open ? 'is-open' : 'is-closed'}`} role="status" aria-live="polite">
      <p className="now__state">
        <span className={`dot ${status.open ? 'is-open' : ''}`} aria-hidden="true" />
        <strong>{status.label}</strong>
        <span className="now__detail">{status.detail}</span>
      </p>
      <p className="now__line">{status.line}</p>
      {status.busy && (
        <a className="btn now__cta" href={VENUE.deliveroo} target="_blank" rel="noopener">
          No queue? Order on Deliveroo
          <ArrowIcon size={18} />
        </a>
      )}
      {at.preview && <p className="now__preview">Showing {previewLabel(at)}</p>}
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <m.div
        className="hero__layer hero__layer--media"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 0.8, 0.26, 1] }}
      >
        <HeroVideo />
      </m.div>

      <div className="hero__stack">
        <m.div
          className="hero__layer hero__layer--card"
          initial={{ opacity: 0, y: -26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...lofi, delay: 0.25 }}
        >
          <h1 id="hero-title" className="display hero__title">
            <span>
              Pancakes <span className="emoji">🥞</span>
            </span>{' '}
            <span>
              Brunch <span className="emoji">🥑</span>
            </span>{' '}
            <span>
              &amp; Coffee <span className="emoji">☕️</span>
            </span>
          </h1>
          <p className="hero__lede">{LINES.about}</p>
          <Link to="/menu" className="btn hero__menu">
            See the menu
            <ArrowIcon size={18} />
          </Link>
        </m.div>

        <m.div
          className="hero__layer hero__layer--now"
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...lofi, delay: 0.5 }}
        >
          <OpenNow />
          <MapleDrip className="hero__drip" />
        </m.div>
      </div>
    </section>
  );
}
