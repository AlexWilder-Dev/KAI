import { m } from 'framer-motion';
import { DishList } from '../components/DishList';
import { SAVOURY, TOTS, TOTS_PRICE, img, price } from '../data';
import { lofi, rise } from '../lib/motion';
import './Tots.css';

const RED_LEICESTER = [
  SAVOURY.find((d) => d.id === 'breakfast-stack')!,
  SAVOURY.find((d) => d.id === 'red-leicester')!,
  TOTS.find((d) => d.id === 'tater')!,
  TOTS.find((d) => d.id === 'tarty')!,
];

export function Tots() {
  return (
    <section className="layer layer--batter tots" id="tots" aria-labelledby="tots-title">
      <div className="wrap">
        <div className="tots__grid">
          <div className="tots__photos" aria-hidden="false">
            <m.figure className="tots__photo tots__photo--a" {...rise}>
              <img src={img('tater-tots')} alt="Tater Tots with sriracha and spring onion" loading="lazy" />
            </m.figure>
            <m.figure
              className="tots__photo tots__photo--b"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ ...lofi, delay: 0.25 }}
            >
              <img src={img('tarty-tots')} alt="Tarty Tots with caramelised red onion" loading="lazy" />
            </m.figure>
          </div>

          <div className="tots__text">
            <m.div {...rise}>
              <p className="eyebrow">Loaded tater tots</p>
              <h2 className="h2 tots__title" id="tots-title">
                Tots, loaded.
              </h2>
              <p className="lede tots__lede">
                Three ways, <span className="price">{price(TOTS_PRICE)}</span> each. Get one for the table.
              </p>
            </m.div>
            <DishList dishes={TOTS} showPrice={false} className="tots__list" />
          </div>
        </div>

        <m.aside
          className="rl"
          aria-labelledby="rl-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={lofi}
        >
          <figure className="rl__photo">
            <img
              src={img('red-leicester')}
              alt="Red Leicester melted over a pancake stack with bacon, onion and maple syrup"
              loading="lazy"
            />
          </figure>
          <div className="rl__body">
            <p className="eyebrow">Local pride</p>
            <h2 className="rl__title" id="rl-title">
              Red Leicester.
              <br />
              <em>Obviously.</em>
            </h2>
            <p className="rl__copy">
              It&rsquo;s got our city&rsquo;s name on it, so it runs right through the menu: melted into the Breakfast
              Stack, on the cheese, bacon &amp; onion stack, and loaded onto two of the tots.
            </p>
            <ul className="rl__dishes">
              {RED_LEICESTER.map((d) => (
                <li key={d.id}>
                  <span>{d.name}</span>
                  <span className="price">{price(d.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        </m.aside>
      </div>
    </section>
  );
}
