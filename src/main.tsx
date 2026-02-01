import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import CategoryDetail from './components/CategoryDetail.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/grandlin">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/theme/:themeId/:category" element={<CategoryDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
