import {defineConfig} from "vite"

export default defineConfig({
	plugins: [], // Add your Vite plugins here
	root: './', // Project root directory
	server: {
		port: 3000, // Development server port
		open: false, // Disabled: manually open http://localhost:3000/ in browser
		hmr: false  // Disables Hot Module Replacement
	},
	build: {
		outDir: './dist', // Output directory for the build
		emptyOutDir: true // Clean the output directory before each build
	}
})