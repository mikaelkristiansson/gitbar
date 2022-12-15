const { resolve } = require('path');
const { mergeConfig } = require('vite');

module.exports = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
    ],
    framework: {
        name: '@storybook/svelte-vite',
        options: {
            preprocess: require('svelte-preprocess')({ postcss: true }),
        },
    },
    docs: {
        docsPage: true,
    },
    viteFinal: async config => {
        return mergeConfig(config, {
            // Add storybook-specific dependencies to pre-optimization
            resolve: {
                alias: [
                    {
                        find: /src\/(lib)\/(github.ts)/,
                        replacement: resolve(__dirname, './mocks/github.js'),
                    },
                ],
            },
        });
    },
};
