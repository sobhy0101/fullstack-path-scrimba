import {defineConfig} from "vite"

export default defineConfig({
	plugins: [],
	root: './learn-html',
	server: {
		port: 3000,
		open: true
	},
	build: {
		outDir: '../dist',
		emptyOutDir: true
	}
})