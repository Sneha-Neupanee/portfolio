import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
  build: {
    outDir: 'build', // Maintaining 'build' to minimize vercel/deployment config changes if possible, or we can switch to dist.
                     // The user request said "clean migration", and Vite defaults to dist. 
                     // However, to keep it simple with existing vercel config which expects 'build', 
                     // I will stick to 'build' OR update vercel config. 
                     // Let's stick to standard Vite 'dist' and update vercel.json as planned.
    outDir: 'dist',
  },
});
