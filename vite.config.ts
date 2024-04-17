/// <reference types="vitest" />

import path, { resolve } from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import CleanCSS from 'clean-css'

const cleanCssInstance = new CleanCSS({})
function minify(code: string) {
  return cleanCssInstance.minify(code).styles
}

let cssCodeStr = ''

export default defineConfig(({ mode }) => {
  const userConfig: UserConfig = {}

  const commonPlugins = [
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
  ]

  // 在 packages.json 中设置 "lib": "vite build --mode lib"
  if (mode === 'lib') {
    userConfig.build = {
      lib: {
        entry: resolve(__dirname, 'packages/index.ts'),
        name: 'V3Bento',
        fileName: 'v3-bento',
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
          {
            format: 'umd',
            name: 'v3-bento.umd.js',
            entryFileNames: `v3-bento.umd.js`,
          },
          {
            format: 'es',
            entryFileNames: `v3-bento.es.js`,
            preserveModules: false,
          },
        ],
      },
    }

    // 禁用 public 内的内容复制到打包后的 lib 目录
    userConfig.publicDir = false

    // 插件
    userConfig.plugins = [
      ...commonPlugins,
      // libInjectCss(),
      {
        name: 'inline-css',
        transform(code, id) {
          const isCSS = (path: string) => /\.css$/.test(path)
          if (!isCSS(id))
            return

          const cssCode = minify(code)
          cssCodeStr = cssCode
          return {
            code: '',
            map: { mappings: '' },
          }
        },
        renderChunk(code, { isEntry }) {
          if (!isEntry)
            return

          return {
            code: `\
            function __insertCSSVueSonner(code) {
              if (!code || typeof document == 'undefined') return
              let head = document.head || document.getElementsByTagName('head')[0]
              let style = document.createElement('style')
              style.type = 'text/css'
              head.appendChild(style)
              ;style.styleSheet ? (style.styleSheet.cssText = code) : style.appendChild(document.createTextNode(code))
            }\n
            __insertCSSVueSonner(${JSON.stringify(cssCodeStr)})
            \n ${code}`,
            map: { mappings: '' },
          }
        },
      },
    ]
  }
  else {
    userConfig.build = {
      outDir: 'dist',
    }
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
