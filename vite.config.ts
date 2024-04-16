/// <reference types="vitest" />

import path, { resolve } from 'node:path'
import { UserConfig, defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig(({ command, mode }) => {
  
  let userConfig: UserConfig = {}

  const commonPlugins = [
    Vue(),
      // ResolvedOptions: https://github.com/posva/unplugin-vue-router/blob/main/playground/vite.config.ts
      VueRouter({
        dts: 'src/typings/typed-router.d.ts'
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
  ]


  // 在 packages.json 中设置 "lib": "vite build --mode lib"
  if (mode === 'lib') {
    userConfig.build = {
      lib: {
        entry: resolve(__dirname, 'packages/index.ts'),
        name: 'V3Bento',
        fileName: 'v3-bento'
      },
      outDir: 'output-lib',
      emptyOutDir: true,
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        external: [
          'vue',
        ],
        output: [
          { format: 'cjs', entryFileNames: `v3-bento.cjs`, },
          { format: 'es', entryFileNames: `v3-bento.js`, preserveModules: false },
        ],
      }
    }

    // 禁用 public 内的内容复制到打包后的 lib 目录
    userConfig.publicDir = false

    // 插件
    userConfig.plugins = [
      ...commonPlugins,
      libInjectCss()
    ]
  }

  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [...commonPlugins],
    ...userConfig,
  }
})
