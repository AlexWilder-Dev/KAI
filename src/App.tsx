import { LazyMotion, MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { HashRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { BottomBar, Footer, Header } from './components/Chrome';
import { NowProvider } from './lib/useNow';
import { Home } from './pages/Home';
import { MenuPage } from './pages/MenuPage';

function ScrollManager() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    const to = (state as { to?: string } | null)?.to;
    if (to) {
      requestAnimationFrame(() => document.getElementById(to)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);
  return null;
}

function Shell() {
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BottomBar />
    </>
  );
}

// Animation features load in their own chunk, after first paint
const loadFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default);

export function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <NowProvider>
          <HashRouter>
            <Routes>
              <Route element={<Shell />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </HashRouter>
        </NowProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
