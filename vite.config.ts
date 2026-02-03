import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/grandlin/',
  plugins: [
    react(),
    {
      name: 'redirect-grandlin-slash',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            const raw = req.url || '';
            const pathOnly = raw.replace(/\?.*$/, '').replace(/#.*$/, '');
            if (pathOnly === '/grandlin') {
              res.statusCode = 301;
              res.setHeader('Location', '/grandlin/');
              res.end();
              return;
            }
          } catch (e) {}
          next();
        });
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
