import { m } from 'framer-motion';
import { ArrowIcon } from '../components/Icons';
import { MapleDrip } from '../components/MapleDrip';
import { RATINGS, VENUE, img } from '../data';
import { lofi, rise } from '../lib/motion';
import './Deliveroo.css';

export function Deliveroo() {
  return (
    <section className="layer dr" id="delivery" aria-labelledby="dr-title">
      <div className="wrap dr__grid">
        <m.div className="dr__text" {...rise}>
          <p className="eyebrow">Deliveroo</p>
          <h2 className="h2 dr__title" id="dr-title">
            Skip the queue.
            <br />
            Keep the pyjamas.
          </h2>
          <p className="lede dr__lede">Stacks, sourdough and tots, brought to your door.</p>
          <p className="dr__rating">
            <strong>{RATINGS.deliveroo.score}★</strong> from {RATINGS.deliveroo.count} reviews on Deliveroo
          </p>
          <a className="btn dr__cta" href={VENUE.deliveroo} target="_blank" rel="noopener">
            Order on Deliveroo
            <ArrowIcon size={18} />
          </a>
        </m.div>

        <m.figure
          className="dr__photo"
          initial={{ opacity: 0, y: -30, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ ...lofi, delay: 0.2 }}
        >
          <img
            src={img('spread')}
            alt="The whole KAI menu laid out from above: pancake stacks, sourdough, tots and sides"
            loading="lazy"
            width={1600}
            height={900}
          />
        </m.figure>
      </div>
      <MapleDrip className="dr__drip" />
    </section>
  );
}
