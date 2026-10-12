import { m } from 'framer-motion';
import { RATINGS, REVIEWS } from '../data';
import { lofi, rise } from '../lib/motion';
import './Reviews.css';

/** Their own quote mark, from quote-mark.svg */
const Quote = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 76 47" aria-hidden="true" fill="currentColor">
    <path
      transform="translate(0.97 0.5)"
      d="m33.75 29.719c0-9.0312-6.125-15.688-14.312-15.688-4.0938 0-7.5312 1.4375-10 4.2812h-1.375c1.5-5.375 6.9062-10.531 14.562-12.375 1.0625-0.28125 1.8125-0.625 2.3125-1.1562 0.53125-0.5 0.84375-1.1875 0.84375-2.0312 0-1.5938-1.3125-2.75-3.1562-2.75-1.625 0-2.7188 0.28125-4.6562 0.875-4.0625 1.4062-7.9375 3.8125-11.031 7.0312-4.5312 4.75-6.9375 11-6.9375 17.969 0 12.656 7.8438 20 17.688 20 9.25 0 16.062-6.75 16.062-16.156zm40.562 0c0-9.0312-6.125-15.688-14.312-15.688-4.125 0-7.5625 1.4375-10 4.2812h-1.4062c1.5312-5.375 6.9062-10.531 14.562-12.375 1.0625-0.28125 1.8438-0.625 2.3438-1.1562 0.53125-0.5 0.8125-1.1875 0.8125-2.0312 0-1.5938-1.3125-2.75-3.125-2.75-1.625 0-2.7188 0.28125-4.6875 0.875-4.0625 1.4062-7.9062 3.8125-11.031 7.0312-4.5 4.75-6.9062 11-6.9062 17.969 0 12.656 7.8438 20 17.688 20 9.25 0 16.062-6.75 16.062-16.156z"
    />
  </svg>
);

export function Reviews() {
  return (
    <section className="layer layer--ink reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <m.div className="reviews__head" {...rise}>
          <p className="eyebrow" id="reviews-title">
            What people say
          </p>
          <div className="score">
            <p className="score__big">
              {RATINGS.google.score}
              <span className="score__star" aria-hidden="true">
                ★
              </span>
            </p>
            <p className="score__label">
              on Google, from {RATINGS.google.count} reviews
              <span className="score__alt">
                {RATINGS.deliveroo.score}★ on Deliveroo, from {RATINGS.deliveroo.count}
              </span>
            </p>
          </div>
        </m.div>

        <ul className="quotes">
          {REVIEWS.map((r, i) => (
            <m.li
              key={r.quote}
              className={`quote quote--${i + 1}`}
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ ...lofi, delay: i * 0.18 }}
            >
              <figure>
                <Quote className="quote__mark" />
                <blockquote className="quote__text">{r.quote}</blockquote>
                <figcaption className="quote__who">{r.who}</figcaption>
              </figure>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
