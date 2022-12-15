import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    console.log('mode: ', mode);
    return {
        resolve: {
            alias: {
                src: '/src',
            },
        },
        plugins: [svelte()],
        server: {
            port: 3000,
        },
    };
});
