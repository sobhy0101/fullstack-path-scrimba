import { defineConfig } from 'vite'

export default defineConfig({
  // Base path - use relative for development, absolute for GitHub Pages deployment
  base: './',
  
  // Server configuration
  server: {
    port: 3000,
    open: true, // Auto-open browser
    cors: true
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: false  // Changed: No minification for easier debugging
  },
  
  // CSS configuration
  css: {
    devSourcemap: true
  }
})
