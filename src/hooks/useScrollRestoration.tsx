import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Stores scroll positions per pathname in sessionStorage under key `scroll:{pathname}`
export default function useScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      // capture clicks on anchors (including Link from react-router)
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest && (target.closest('a') as HTMLAnchorElement | null);
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // only same-origin / app internal links (starts with /)
      if (href.startsWith('/') || href.startsWith(window.location.origin)) {
        try {
          sessionStorage.setItem('scroll:' + window.location.pathname, String(window.scrollY || 0));
        } catch {}
      }
    };

    window.addEventListener('click', clickHandler, true);
    return () => window.removeEventListener('click', clickHandler, true);
  }, []);

  useEffect(() => {
    // On navigation: if PUSH or REPLACE -> scroll to top. If POP (back/forward) -> restore saved pos if any.
    const key = 'scroll:' + location.pathname;

    if (navigationType === 'POP') {
      try {
        const raw = sessionStorage.getItem(key);
        const y = raw ? parseInt(raw, 10) : NaN;
        if (!Number.isNaN(y)) {
          // small timeout to allow new content to render
          setTimeout(() => window.scrollTo({ top: y, left: 0, behavior: 'auto' }), 10);
          return;
        }
      } catch {}
      // if no saved pos, don't change (let browser handle) or fallback to top
      return;
    }

    // For PUSH / REPLACE, scroll to top
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 0);
  }, [location, navigationType]);
}
