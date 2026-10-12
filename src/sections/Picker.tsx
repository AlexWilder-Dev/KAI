import { AnimatePresence, m, type PanInfo } from 'framer-motion';
import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon, ChevronIcon } from '../components/Icons';
import { SAVOURY, SWEET, VENUE, img, price, type Dish } from '../data';
import { land, lofi, rise, settle } from '../lib/motion';
import './Picker.css';

type Side = 'sweet' | 'savoury';
const SIDES: { key: Side; label: string; list: Dish[] }[] = [
  { key: 'sweet', label: 'Sweet', list: SWEET },
  { key: 'savoury', label: 'Savoury', list: SAVOURY },
];

const pad = (n: number) => String(n).padStart(2, '0');

/** Three layers of the real dish photo land one by one, then the toppings drop on. */
const stackVariants = {
  enter: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -36, transition: { duration: 0.28, ease: [0.4, 0, 0.7, 0.2] as const } }),
};

function Stack({ dish, dir }: { dish: Dish; dir: number }) {
  const aspect = dish.aspect ?? 4 / 3;
  return (
    <m.div className="stack" custom={dir} variants={stackVariants} initial="enter" animate="enter" exit="exit">
      <ul className="stack__toppings" aria-label="On top">
        {dish.toppings?.map((t, i) => (
          <m.li
            key={t}
            className={`topping ${i % 3 === 1 ? 'topping--maple' : ''}`}
            initial={{ opacity: 0, y: -34, rotate: i % 2 ? 7 : -7 }}
            animate={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
            transition={{ ...land, delay: 0.62 + i * 0.1 }}
          >
            {t}
          </m.li>
        ))}
      </ul>

      <div className="stack__layers">
        {[0, 1, 2].map((i) => (
          <m.div
            key={i}
            className="stack__band"
            style={{ '--i': i } as CSSProperties}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...land, delay: (2 - i) * 0.14 }}
          >
            <div className="stack__clip" style={{ aspectRatio: `${aspect * 3}` }}>
              <img
                src={img(dish.img!)}
                alt={i === 0 ? `${dish.name} pancakes, from above` : ''}
                draggable={false}
                decoding="async"
              />
            </div>
          </m.div>
        ))}
      </div>
      <div className="stack__plate" aria-hidden="true" />
    </m.div>
  );
}

export function Picker() {
  const [side, setSide] = useState<Side>('sweet');
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const list = side === 'sweet' ? SWEET : SAVOURY;
  const dish = list[index];

  const go = (step: number) => {
    setDir(step);
    setIndex((i) => (i + step + list.length) % list.length);
  };
  const jump = (to: number) => {
    if (to === index) return;
    setDir(to > index ? 1 : -1);
    setIndex(to);
  };
  const choose = (next: Side) => {
    if (next === side) return;
    setDir(next === 'savoury' ? 1 : -1);
    setSide(next);
    setIndex(0);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -450) go(1);
    else if (info.offset.x > 50 || info.velocity.x > 450) go(-1);
  };
  const onKeys = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };
  const onTabKeys = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = side === 'sweet' ? 'savoury' : 'sweet';
      choose(next);
      document.getElementById(`tab-${next}`)?.focus();
    }
  };

  return (
    <section className="layer layer--batter picker" id="pancakes" aria-labelledby="picker-title">
      <div className="wrap">
        <div className="picker__head">
          <m.div {...rise}>
            <p className="eyebrow">American pancakes</p>
            <h2 className="h2" id="picker-title">
              Sweet or savoury?
            </h2>
            <p className="lede picker__lede">Stacked three high. You choose what lands on top.</p>
          </m.div>

          <div className="switch" role="tablist" aria-label="Pancakes" onKeyDown={onTabKeys}>
            {SIDES.map((s) => (
              <button
                key={s.key}
                id={`tab-${s.key}`}
                type="button"
                role="tab"
                aria-selected={side === s.key}
                aria-controls="stack-panel"
                tabIndex={side === s.key ? 0 : -1}
                className={`switch__opt ${side === s.key ? 'is-on' : ''}`}
                onClick={() => choose(s.key)}
              >
                {side === s.key && <m.span layoutId="switch-knob" className="switch__knob" transition={settle} />}
                <span className="switch__label">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="picker__stage"
          id="stack-panel"
          role="tabpanel"
          aria-labelledby={`tab-${side}`}
          aria-roledescription="carousel"
        >
          <m.div
            className="picker__pan"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.22}
            dragSnapToOrigin
            onDragEnd={onDragEnd}
            onKeyDown={onKeys}
            tabIndex={0}
            aria-label={`${dish.name}. Swipe or use the arrow keys for the next stack.`}
            style={{ touchAction: 'pan-y' }}
          >
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <Stack key={`${side}-${dish.id}`} dish={dish} dir={dir} />
            </AnimatePresence>
          </m.div>

          <div className="picker__info">
            <div className="picker__text" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={`${side}-${dish.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  transition={{ ...lofi, delay: 0.15 }}
                >
                  <p className="picker__count">
                    {side === 'sweet' ? 'Sweet' : 'Savoury'} · {pad(index + 1)} / {pad(list.length)}
                  </p>
                  <h3 className="h3 picker__name">{dish.name}</h3>
                  {dish.desc && <p className="picker__desc">{dish.desc}</p>}
                  <p className="price picker__price">{price(dish.price)}</p>
                </m.div>
              </AnimatePresence>
            </div>

            <div className="picker__nav">
              <button type="button" className="round" onClick={() => go(-1)} aria-label="Previous stack">
                <ChevronIcon className="flip" />
              </button>
              <ul className="thumbs">
                {list.map((d, i) => (
                  <li key={d.id}>
                    <button
                      type="button"
                      className={`thumb ${i === index ? 'is-on' : ''}`}
                      onClick={() => jump(i)}
                      aria-label={d.name}
                      aria-current={i === index ? 'true' : undefined}
                    >
                      <img src={img(d.img!)} alt="" loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" className="round" onClick={() => go(1)} aria-label="Next stack">
                <ChevronIcon />
              </button>
            </div>

            <p className="picker__foot">
              Photo first, then eat. Tag{' '}
              <a className="link" href={VENUE.hashtagUrl} target="_blank" rel="noopener">
                {VENUE.hashtag}
              </a>
              <span className="picker__sep" aria-hidden="true">
                ·
              </span>
              <Link to="/menu" className="picker__more">
                Full pancake menu <ArrowIcon size={16} />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
