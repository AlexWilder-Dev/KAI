import { m } from 'framer-motion';
import { InstaIcon } from '../components/Icons';
import { VENUE, img } from '../data';
import { lofi, rise } from '../lib/motion';
import './Cafe.css';

const drop = (delay = 0) => ({
  initial: { opacity: 0, y: -24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { ...lofi, delay },
});

export function Cafe() {
  return (
    <section className="layer cafe" id="cafe" aria-labelledby="cafe-title">
      <div className="wrap">
        <m.div className="cafe__head" {...rise}>
          <p className="eyebrow">The café</p>
          <h2 className="h2" id="cafe-title">
            Simple room.
            <br />
            Lofi on.
          </h2>
        </m.div>

        {/* The room: a wide photo with a note resting on its corner */}
        <div className="cafe__room">
          <m.figure className="cafe__photo cafe__photo--room" {...rise}>
            <img
              src={img('interior')}
              alt="Inside KAI: a cushioned banquette along a timber wall, white chairs, paper lampshades and the counter"
              loading="lazy"
              width={860}
              height={630}
            />
          </m.figure>
          <m.div className="note note--room" {...drop(0.2)}>
            <h3 className="note__title">Banquettes inside. Tables out in the square.</h3>
            <p>
              Sink into the banquettes along the wall, or take a table out in St Martin&rsquo;s Square when the
              sun&rsquo;s out.
            </p>
          </m.div>
        </div>

        {/* Coffee: a line of type, with the pour set right into it */}
        <m.div className="pour" {...rise}>
          <p className="eyebrow">On the coffee machine</p>
          <p className="pour__line">
            <strong>Organic coffee</strong>
            <span className="pour__pic">
              <img src={img('coffee')} alt="Milk being poured into a coffee, making latte art" loading="lazy" />
            </span>{' '}
            <strong>&amp; tea.</strong> Mocha, hot chocolate, iced matcha, juices and breakfast cocktails. Yes,
            there&rsquo;s a Bloody Mary.
          </p>
        </m.div>

        {/* Saturdays: the early door, side by side with the rush */}
        <div className="sat">
          <m.div className="sat__text" {...rise}>
            <p className="eyebrow">Saturdays</p>
            <p className="sat__time" aria-hidden="true">
              8<span>am</span>
            </p>
            <h3 className="sat__title">So busy, we took the unit next door.</h3>
            <p className="sat__copy">
              More seats, same queue out the door. Saturday doors open at 8, an hour early, for anyone who wants first
              pick.
            </p>
          </m.div>
          <m.figure className="cafe__photo sat__photo" {...drop(0.15)}>
            <img
              src={img('busy')}
              alt="Plates of pancakes and sourdough on their way out to a busy room"
              loading="lazy"
            />
          </m.figure>
        </div>

        {/* Instagram: people come to photograph the stacks */}
        <m.div className="insta" {...rise}>
          <figure className="insta__photo">
            <img
              src={img('biscoff-side')}
              alt="A Biscoff pancake stack with a Lotus biscuit on top, crumb and spread over the plate"
              loading="lazy"
            />
          </figure>
          <div className="insta__body">
            <p className="eyebrow">On Instagram</p>
            <a className="insta__tag" href={VENUE.hashtagUrl} target="_blank" rel="noopener">
              {VENUE.hashtag}
            </a>
            <p className="insta__copy">The stacks get photographed before they get eaten. Post yours with the tag.</p>
            <a className="btn" href={VENUE.instagram} target="_blank" rel="noopener">
              <InstaIcon size={20} />
              Follow {VENUE.handle}
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
}
