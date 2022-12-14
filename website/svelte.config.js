import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import { defineMDSveXConfig as defineConfig } from 'mdsvex'

const mdsvexConfig = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [],
  rehypePlugins: [],
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [preprocess(), mdsvex(mdsvexConfig)],

  kit: {
    paths: {
      base: '/gitbar',
    },
    adapter: adapter(),
  },
}

export default config
