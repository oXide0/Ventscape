/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    cacheDir: '../../node_modules/.vite',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Ventscape',
                short_name: 'VS',
                theme_color: '#5056ed',
                background_color: '#252b3c',
                icons: [
                    {
                        src: '/logo.png',
                        sizes: '220x220',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
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
            config: '/src/config'
        }
    },
    build: {
        outDir: 'build',
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
                    return null;
                }
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['/src/setupTests.ts'],
        watch: false
    }
});
