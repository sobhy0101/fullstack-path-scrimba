import {defineConfig} from "vite"

export default defineConfig({
	plugins: [], // Add your Vite plugins here
	root: './', // Project root directory
	server: {
		port: 3000, // Development server port
		open: true // Open the browser automatically
	},
	build: {
		outDir: './dist', // Output directory for the build
		emptyOutDir: true // Clean the output directory before each build
	}
})