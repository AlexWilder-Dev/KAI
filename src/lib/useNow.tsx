import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { atFromUrl, londonNow, parseAt, statusAt, type Moment, type Status } from './hours';

type Now = { at: Moment; status: Status };

const read = (): Now => {
  const at = parseAt(atFromUrl()) ?? londonNow();
  return { at, status: statusAt(at) };
};

const NowContext = createContext<Now>(read());

export function NowProvider({ children }: { children: ReactNode }) {
  const [now, setNow] = useState(read);

  useEffect(() => {
    const update = () => setNow(read());
    const timer = window.setInterval(update, 30_000);
    window.addEventListener('hashchange', update);
    window.addEventListener('popstate', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('hashchange', update);
      window.removeEventListener('popstate', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <NowContext.Provider value={now}>{children}</NowContext.Provider>;
}

export const useNow = () => useContext(NowContext);
