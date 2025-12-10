import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Quan trọng: Đặt đường dẫn tương đối để chạy được trên GitHub Pages sub-path
  build: {
    outDir: 'dist',
  },
});