import { m } from 'framer-motion';
import { InstaIcon, MailIcon, PhoneIcon, PinIcon } from '../components/Icons';
import { VENUE } from '../data';
import { DAY_NAMES, HOURS, WEEK, clock } from '../lib/hours';
import { lofi, rise } from '../lib/motion';
import { useNow } from '../lib/useNow';
import './FindUs.css';

export function FindUs() {
  const { status } = useNow();

  return (
    <section className="layer find" id="find-us" aria-labelledby="find-title">
      <div className="wrap find__grid">
        <m.div className="find__where" {...rise}>
          <p className="eyebrow">Find us</p>
          <h2 className="h2 find__title" id="find-title">
            4 St Martin&rsquo;s Square
          </h2>
          <p className="lede find__lede">
            {VENUE.city} {VENUE.postcode}, in {VENUE.area}. No need to book: walk in, and grab a table out in the square
            if it&rsquo;s nice.
          </p>
          <a className="btn btn--maple find__dir" href={VENUE.directions} target="_blank" rel="noopener">
            <PinIcon size={20} />
            Directions
          </a>

          <ul className="contact">
            <li>
              <PhoneIcon />
              <a className="link" href={VENUE.phoneHref}>
                {VENUE.phone}
              </a>
            </li>
            <li>
              <MailIcon />
              <a className="link" href={`mailto:${VENUE.email}`}>
                {VENUE.email}
              </a>
            </li>
            <li>
              <InstaIcon />
              <span>
                <a className="link" href={VENUE.instagram} target="_blank" rel="noopener">
                  {VENUE.handle}
                </a>
                <span className="contact__sep" aria-hidden="true">
                  ·
                </span>
                <a className="link" href={VENUE.hashtagUrl} target="_blank" rel="noopener">
                  {VENUE.hashtag}
                </a>
              </span>
            </li>
          </ul>
        </m.div>

        <m.div
          className="hours"
          initial={{ opacity: 0, y: -26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ ...lofi, delay: 0.15 }}
        >
          <div className="hours__head">
            <h3 className="h3">Opening hours</h3>
            <p className={`hours__now ${status.open ? 'is-open' : ''}`}>
              <span className={`dot ${status.open ? 'is-open' : ''}`} aria-hidden="true" />
              {status.label}, {status.detail}
            </p>
          </div>
          <ol className="days" aria-label="Opening hours by day">
            {WEEK.map((d, i) => {
              const [opens, closes] = HOURS[d];
              const today = d === status.today;
              return (
                <li
                  key={d}
                  className={`day ${today ? 'is-today' : ''} day--${i % 3}`}
                  aria-current={today ? 'date' : undefined}
                >
                  <span className="day__name">
                    {DAY_NAMES[d]}
                    {today && <span className="day__today">Today</span>}
                  </span>
                  <span className="day__time">
                    {clock(opens)}–{clock(closes)}
                    {d === 6 && <span className="day__note">Early birds, doors at 8</span>}
                  </span>
                </li>
              );
            })}
          </ol>
        </m.div>
      </div>
    </section>
  );
}
