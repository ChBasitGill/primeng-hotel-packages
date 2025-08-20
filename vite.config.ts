import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Ensures assets resolve when served from /primeng-hotel-packages/
  base: '/primeng-hotel-packages/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
