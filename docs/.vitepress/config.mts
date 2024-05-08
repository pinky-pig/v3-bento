import path, { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'V3 Bento',
  description: 'A simple bento layout component for Vue3.',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/api/props' },
    ],

    sidebar: [
      {
        text: 'API',
        items: [
          { text: 'Props', link: '/api/props' },
          { text: 'Emits', link: '/api/emits' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, '../..', 'src')}/`,
      },
    },
    plugins: [
      AutoImport({
        imports: [
          'vue',
          '@vueuse/core',
        ],
        dts: './.vitepress/typings/auto-imports.d.ts',
        dirs: [
          '../src/composables',
        ],
        vueTemplate: true,
      }),
      Components({
        dts: './.vitepress/typings/components.d.ts',
        dirs: [
          '../src/components',
        ],
      }),
    ],
  },
})
