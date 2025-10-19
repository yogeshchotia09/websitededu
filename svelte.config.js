// svelte.config.js - Netlify ke liye Sahi Version

import adapter from '@sveltejs/adapter-static';
import { importAssets } from 'svelte-preprocess-import-assets';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // Netlify ke liye yeh setting sabse zaroori hai
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: 'index.html', // Yeh line blank page aur 404 error, dono ko fix karti hai
            precompress: false
        }),

        paths: {
            relative: false
        }
    },

    // --- Baaki project ki settings ---
    extensions: ['.svelte'],
    preprocess: [
        importAssets({
            sources: (defaultSources) => {
                return [
                    ...defaultSources,
                    { tag: 'Icon', srcAttributes: ['src'] },
                    { tag: 'IconButton', srcAttributes: ['src'] }
                ];
            }
        }),
        vitePreprocess()
    ],
    compilerOptions: {
        warningFilter: (warning) => {
            if (warning.code === 'attribute_quoted') return false;
            return true;
        }
    },
};

export default config;
