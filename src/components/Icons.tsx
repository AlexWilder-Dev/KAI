type P = { size?: number; className?: string };

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Their own menu icon: three pancakes and a pat of butter. */
export const StackIcon = ({ size = 24, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <rect x="9.6" y="3.2" width="4.8" height="3" rx="1" />
    <rect x="4.2" y="7.6" width="15.6" height="3.6" rx="1.8" />
    <rect x="3" y="12.3" width="18" height="3.6" rx="1.8" />
    <rect x="4.2" y="17" width="15.6" height="3.6" rx="1.8" />
  </svg>
);

export const PinIcon = ({ size = 24, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...line}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

export const BagIcon = ({ size = 24, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...line}>
    <path d="M5 8.5h14l-1.1 11a1.6 1.6 0 0 1-1.6 1.5H7.7a1.6 1.6 0 0 1-1.6-1.5z" />
    <path d="M8.8 8.5V7a3.2 3.2 0 0 1 6.4 0v1.5" />
  </svg>
);

export const ArrowIcon = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...line}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </svg>
);

export const ChevronIcon = ({ size = 22, className }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
    {...line}
    strokeWidth={2}
  >
    <path d="M9 5.5 15.5 12 9 18.5" />
  </svg>
);

export const PhoneIcon = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...line}>
    <path d="M6.6 3.5h2.6l1.4 4.2-2 1.4a11 11 0 0 0 6.3 6.3l1.4-2 4.2 1.4V18a2.5 2.5 0 0 1-2.7 2.5A15.8 15.8 0 0 1 3.5 6.2 2.5 2.5 0 0 1 6 3.5z" />
  </svg>
);

export const MailIcon = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...line}>
    <rect x="3.2" y="5.5" width="17.6" height="13" rx="2.4" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const InstaIcon = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...line}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);
