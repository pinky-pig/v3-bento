import path, { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default {
  resolve: {
    alias: {
      '~/': `${resolve(__dirname)}/src/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  plugins: [
    Vue(),
    // ResolvedOptions: https://github.com/posva/unplugin-vue-router/blob/main/playground/vite.config.ts
    VueRouter({
      dts: 'src/typings/typed-router.d.ts',
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: 'src/typings/auto-imports.d.ts',
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    Components({
      // 指定组件位置
      dts: 'src/typings/components.d.ts',
    }),
  ],
}
