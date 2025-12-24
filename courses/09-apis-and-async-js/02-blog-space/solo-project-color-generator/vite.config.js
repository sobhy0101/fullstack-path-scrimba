import { defineConfig } from 'vite'

export default defineConfig({
  // Base path for GitHub Pages deployment
  base: '/fullstack-path-scrimba/courses/09-apis-and-async-js/02-blog-space/solo-project-color-scheme-generator/',
  
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
    // Use esbuild for minification (faster, built-in)
    minify: 'esbuild'
  },
  
  // CSS configuration
  css: {
    devSourcemap: true
  }
})
