import type { Transition } from 'framer-motion';

/** Lofi pace: soft, unhurried springs with small offsets. */
export const lofi: Transition = { type: 'spring', stiffness: 60, damping: 17, mass: 1 };
export const settle: Transition = { type: 'spring', stiffness: 120, damping: 19, mass: 0.9 };
export const land: Transition = { type: 'spring', stiffness: 150, damping: 17, mass: 0.8 };

export const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -12% 0px' },
  transition: lofi,
};
