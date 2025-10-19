// svelte.config.js - Netlify ke liye Sahi Version

import adapter from '@sveltejs/adapter-static'; // Hum Netlify ke liye static adapter istemal kar rahe hain
import { importAssets } from 'svelte-preprocess-import-assets';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte'],
    preprocess: [
        importAssets({
            sources: (defaultSources) => {
                return [
                    ...defaultSources,
                    {
                        tag: 'Icon',
                        srcAttributes: ['src']
                    },
                    {
                        tag: 'IconButton',
                        srcAttributes: ['src']
                    }
                ];
            }
        }),
        vitePreprocess()
    ],

    compilerOptions: {
        warningFilter: (warning) => {
            if (warning.code === 'attribute_quoted') {
                return false;
            }
            return true;
        }
    },

    kit: {
        // Netlify ke liye yeh setting sabse zaroori hai
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: 'index.html', // Yeh line 404 error aur blank page, dono ko fix karti hai
            precompress: false
        }),

        paths: {
            relative: false
        }
    }
};

export default config;
