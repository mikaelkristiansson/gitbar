import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api/enterprise': {
        target: 'https://api.github.schibsted.io',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/enterprise/, ''),
      },
    },
  },
});
