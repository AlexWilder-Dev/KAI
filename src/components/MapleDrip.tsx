import './MapleDrip.css';

/** One slow drip of maple off an edge. Used twice: the hero strip and the Deliveroo panel. */
export function MapleDrip({ className = '' }: { className?: string }) {
  return (
    <svg className={`drip ${className}`} viewBox="0 0 64 170" aria-hidden="true" focusable="false">
      <path
        className="drip__lip"
        d="M-2 0H66C52 0 42 4 37.4 14C35.6 18 35.6 20 35.6 22H28.4C28.4 20 28.4 18 26.6 14C22 4 12 0-2 0Z"
      />
      <g className="drip__stream">
        <rect x="27.5" y="14" width="9" height="98" rx="4.5" />
        <rect className="drip__shine" x="30" y="20" width="1.6" height="78" rx="0.8" />
      </g>
      <g className="drip__drop">
        <circle cx="32" cy="112" r="8.6" />
        <ellipse className="drip__shine" cx="29.2" cy="109" rx="1.8" ry="2.6" />
      </g>
    </svg>
  );
}
