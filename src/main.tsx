import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import CategoryDetail from './components/CategoryDetail.tsx';
import BoosterSetDetail from './components/BoosterSetDetail.tsx';
import Legal from './pages/Legal';
import './index.css';

// Ensure trailing slash for the app basename so assets and routing behave the same
if (typeof window !== 'undefined') {
  try {
    const p = window.location.pathname;
    // if user landed exactly on /grandlin (no trailing slash), navigate to /grandlin/ (hard reload)
    if (p === '/grandlin') {
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      // use location.replace to force a server request for the canonical path
      window.location.replace('/grandlin/' + search + hash);
    }
  } catch {}
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/grandlin/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/theme/:themeId/boosters" element={<BoosterSetDetail />} />
        <Route path="/theme/:themeId/:category" element={<CategoryDetail />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
