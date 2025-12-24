import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // example
        },
      },
    },
  },
  assetsInclude: ['**/*.xlsx'],
  resolve: {
    extensions: ['.js', '.jsx'], // 👈 allow both
  },
 
})
