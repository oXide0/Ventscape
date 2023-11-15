import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), splitVendorChunkPlugin()],
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
    build: {
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (
                        id.includes('@chakra-ui/react') ||
                        id.includes('@emotion/react') ||
                        id.includes('@emotion/styled') ||
                        id.includes('framer-motion') ||
                        id.includes('react-icons')
                    ) {
                        return '@styles';
                    }

                    if (
                        id.includes('react-hook-form') ||
                        id.includes('react-redux') ||
                        id.includes('@reduxjs/toolkit') ||
                        id.includes('react-router-dom') ||
                        id.includes('react-dom')
                    ) {
                        return '@react-helpers';
                    }

                    if (id.includes('firebase')) {
                        return '@firebase';
                    }
                },
            },
        },
    },
});
