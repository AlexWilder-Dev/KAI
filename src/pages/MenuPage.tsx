import { m } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { DishList } from '../components/DishList';
import { ArrowIcon } from '../components/Icons';
import {
  BRUNCH,
  LEMONADE,
  OTHER_DRINKS,
  SAVOURY,
  SIDES,
  SOFT_DRINKS,
  SWEET,
  TOTS,
  TOTS_PRICE,
  VENUE,
  img,
  price,
} from '../data';
import { settle } from '../lib/motion';
import './MenuPage.css';

const TABS = [
  { id: 'm-pancakes', label: 'American Pancakes' },
  { id: 'm-brunch', label: 'Brunch' },
  { id: 'm-tots', label: 'Loaded Tater Tots' },
  { id: 'm-sides', label: 'Sides' },
  { id: 'm-drinks', label: 'Drinks' },
];

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Height of everything stuck to the top: the desktop header plus the tab bar */
const stuckHeight = () => {
  const header =
    window.innerWidth >= 900 ? ((document.querySelector('.top') as HTMLElement | null)?.offsetHeight ?? 0) : 0;
  const tabs = (document.querySelector('.tabs') as HTMLElement | null)?.offsetHeight ?? 0;
  return header + tabs;
};

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const line = stuckHeight() + 4;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 0) current = id;
      }
      // the last section may be too short to reach the line
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4)
        current = ids[ids.length - 1];
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);
  return active;
}

function Section({
  id,
  title,
  note,
  photo,
  alt,
  children,
}: {
  id: string;
  title: string;
  note?: ReactNode;
  photo: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <section className="mp__sec" id={id} aria-labelledby={`${id}-h`}>
      <header className="mp__sechead">
        <div>
          <h2 className="mp__title" id={`${id}-h`}>
            {title}
          </h2>
          {note && <p className="mp__note">{note}</p>}
        </div>
        <figure className="mp__photo">
          <img src={img(photo)} alt={alt} loading="lazy" />
        </figure>
      </header>
      {children}
    </section>
  );
}

export function MenuPage() {
  const [ids] = useState(() => TABS.map((t) => t.id));
  const active = useActiveSection(ids);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [flash, setFlash] = useState(false);

  // keep the active tab in view on small screens
  useEffect(() => {
    const bar = tabsRef.current;
    const tab = bar?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!bar || !tab) return;
    const left = tab.offsetLeft - (bar.clientWidth - tab.clientWidth) / 2;
    bar.scrollTo({ left, behavior: reduceMotion() ? 'auto' : 'smooth' });
  }, [active]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - stuckHeight() + 1;
    window.scrollTo({ top, behavior: reduceMotion() ? 'auto' : 'smooth' });
  };

  const findVegan = () => {
    document
      .getElementById('vegan-benedict')
      ?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'center' });
    setFlash(true);
    window.setTimeout(() => setFlash(false), 2400);
  };

  return (
    <div className={`mp ${flash ? 'is-flash' : ''}`}>
      <header className="mp__head">
        <div className="wrap">
          <p className="eyebrow">Menu</p>
          <h1 className="display mp__h1">Served all day, pancakes first.</h1>
          <p className="lede mp__lede">
            Walk in, or{' '}
            <a className="link" href={VENUE.deliveroo} target="_blank" rel="noopener">
              have it delivered
            </a>
            .
          </p>
          <button type="button" className="mp__vegan" onClick={findVegan}>
            <span className="tag">Vegan</span>
            <span>
              Vegan? Try the Vegan Benedict <ArrowIcon size={15} className="mp__vegan-arrow" />
            </span>
          </button>
        </div>
      </header>

      <div className="layer layer--batter mp__body">
        <nav className="tabs" aria-label="Menu sections">
          <div className="tabs__scroll" ref={tabsRef}>
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                data-id={t.id}
                className={`tabs__tab ${active === t.id ? 'is-on' : ''}`}
                aria-current={active === t.id ? 'true' : undefined}
                onClick={() => jump(t.id)}
              >
                {active === t.id && <m.span layoutId="tab-knob" className="tabs__knob" transition={settle} />}
                <span className="tabs__label">{t.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="wrap mp__sections">
          <Section
            id="m-pancakes"
            title="American Pancakes"
            note="Most come as a stack of three."
            photo="biscoff-side"
            alt="A Biscoff pancake stack, seen from the side"
          >
            <div className="mp__split">
              <div>
                <h3 className="mp__sub">Sweet</h3>
                <DishList dishes={SWEET} />
              </div>
              <div>
                <h3 className="mp__sub">Savoury</h3>
                <DishList dishes={SAVOURY} />
              </div>
            </div>
          </Section>

          <Section
            id="m-brunch"
            title="Brunch"
            note="On sourdough. The hollandaise is homemade."
            photo="avo-eggs"
            alt="Smashed avocado and poached eggs on sourdough, from above"
          >
            <DishList dishes={BRUNCH} className="mp__cols" />
          </Section>

          <Section
            id="m-tots"
            title="Loaded Tater Tots"
            note={
              <>
                <span className="price">{price(TOTS_PRICE)}</span> each
              </>
            }
            photo="tater-tots"
            alt="Tater Tots with sriracha and spring onion"
          >
            <DishList dishes={TOTS} className="mp__cols" />
          </Section>

          <Section id="m-sides" title="Sides" photo="sides" alt="Little dishes of smashed avocado and streaky bacon">
            <ul className="sides">
              {SIDES.map((s) => (
                <li key={s.id}>
                  <span>{s.name}</span>
                  <span className="price">{price(s.price)}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="m-drinks"
            title="Drinks"
            note="Organic coffee and tea, all day."
            photo="coffee"
            alt="Milk being poured into a coffee"
          >
            <div className="mp__split">
              <div>
                <h3 className="mp__sub">Soft drinks</h3>
                <ul className="sides sides--one">
                  {SOFT_DRINKS.items.map((d) => (
                    <li key={d}>
                      <span>{d}</span>
                      <span className="price">{price(SOFT_DRINKS.price)}</span>
                    </li>
                  ))}
                  <li>
                    <span>{LEMONADE.name}</span>
                    <span className="price">{price(LEMONADE.price)}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mp__sub">Also pouring</h3>
                <ul className="pouring">
                  {OTHER_DRINKS.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className="mp__ask">Ask the team for prices.</p>
              </div>
            </div>
          </Section>

          <aside className="mp__order">
            <p>
              Queue out the door? <strong>Order it on Deliveroo instead.</strong>
            </p>
            <a className="btn" href={VENUE.deliveroo} target="_blank" rel="noopener">
              Order on Deliveroo
              <ArrowIcon size={18} />
            </a>
          </aside>

          <p className="mp__allergy">Allergies? Ask the team before you order.</p>
        </div>
      </div>
    </div>
  );
}
