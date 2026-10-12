import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** Scroll to a section on the home page, from anywhere in the site. */
export function useGoTo() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (pathname === '/' && el) {
        el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      } else {
        navigate('/', { state: { to: id } });
      }
    },
    [navigate, pathname],
  );
}
