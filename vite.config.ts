import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            routes: '/src/routes',
            pages: '/src/pages',
            components: '/src/components',
            ui: '/src/components/ui',
            services: '/src/services',
            hooks: '/src/hooks',
            utils: '/src/utils',
            types: '/src/types',
            store: '/src/store',
            features: '/src/features',
        },
    },
});
