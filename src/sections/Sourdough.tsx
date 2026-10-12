import { m } from 'framer-motion';
import { BRUNCH, img, price, type Dish } from '../data';
import { lofi, rise } from '../lib/motion';
import './Sourdough.css';

const dish = (id: string) => BRUNCH.find((d) => d.id === id)!;

/** The brunch menu falls into three families. Group it the way people choose from it. */
const GROUPS: { id: string; title: string; options: { d: Dish; label: string; note?: string }[] }[] = [
  {
    id: 'hollandaise',
    title: 'Eggs & homemade hollandaise',
    options: [
      { d: dish('royale'), label: 'Royale', note: 'Smoked salmon' },
      { d: dish('benedict'), label: 'Eggs Benedict', note: 'Streaky smoked bacon' },
      { d: dish('florentine'), label: 'Florentine', note: 'Spinach' },
    ],
  },
  {
    id: 'avocado',
    title: 'Smashed avocado',
    options: [
      { d: dish('avo-poached'), label: 'With poached eggs', note: dish('avo-poached').desc },
      { d: dish('avo-tofu'), label: 'With scrambled sriracha tofu' },
      { d: dish('avo'), label: 'Just on sourdough', note: dish('avo').desc },
    ],
  },
];
const VEGAN = dish('vegan-benedict');

export function Sourdough() {
  return (
    <section className="layer sd" id="brunch" aria-labelledby="sd-title">
      <div className="wrap sd__grid">
        <div className="sd__media">
          <m.figure className="sd__main" {...rise}>
            <img
              src={img('yolk')}
              alt="A fork breaking a poached egg over smashed avocado on toasted sourdough"
              loading="lazy"
              width={960}
              height={540}
            />
          </m.figure>
          <m.figure
            className="sd__plate"
            initial={{ opacity: 0, y: -28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ ...lofi, delay: 0.3 }}
          >
            <img
              src={img('benedict')}
              alt="Eggs Benedict with streaky bacon and hollandaise, from above"
              loading="lazy"
            />
          </m.figure>
        </div>

        <div className="sd__text">
          <m.div {...rise}>
            <p className="eyebrow">Brunch</p>
            <h2 className="h2 sd__title" id="sd-title">
              Brunch on sourdough
            </h2>
            <p className="lede sd__lede">Every plate here comes on sourdough, and the hollandaise is homemade.</p>
          </m.div>

          <div className="sd__groups">
            {GROUPS.map((g, gi) => (
              <m.div
                key={g.id}
                className={`sdg sdg--${g.id}`}
                initial={{ opacity: 0, y: -24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ ...lofi, delay: gi * 0.12 }}
              >
                <h3 className="sdg__title">{g.title}</h3>
                <ul className="sdg__opts">
                  {g.options.map((o) => (
                    <li key={o.d.id} className="sdg__opt">
                      <span className="sdg__name">{o.label}</span>
                      {o.note && <span className="sdg__note">{o.note}</span>}
                      <span className="price sdg__price">{price(o.d.price)}</span>
                    </li>
                  ))}
                </ul>
              </m.div>
            ))}

            <m.div
              className="sdg sdg--vegan"
              id="home-vegan"
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ ...lofi, delay: 0.24 }}
            >
              <div className="sdg__veganhead">
                <h3 className="sdg__title">
                  {VEGAN.name} <span className="tag sdg__tag">Vegan</span>
                </h3>
                <span className="price sdg__price">{price(VEGAN.price)}</span>
              </div>
              <p className="sdg__note">{VEGAN.desc}</p>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
