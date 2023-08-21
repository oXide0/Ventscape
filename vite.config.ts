/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.ts'],
	},
	resolve: {
		alias: {
			components: '/src/components',
			config: '/src/config',
			features: '/src/features',
			hoc: '/src/hoc',
			hooks: '/src/hooks',
			pages: '/src/pages',
			services: '/src/services',
			store: '/src/store',
			types: '/src/types',
			utils: '/src/utils',
			UI: '/src/components/UI',
		},
	},
});
