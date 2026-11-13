import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // библиотека подключена через file:../ui-library, поэтому React должен быть один
    dedupe: ['react', 'react-dom'],
  },
})
