import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/project-history/', // Указываем базовый путь
  plugins: [react()],
});