/// <reference types="vitest" />

import { resolve } from 'node:path'
import type { PluginOption } from 'vite'
import { defineConfig, mergeConfig } from 'vite'

import CleanCSS from 'clean-css'
import baseConfig from './vite.base.config'

const cleanCssInstance = new CleanCSS({})
function minify(code: string) {
  return cleanCssInstance.minify(code).styles
}

let cssCodeStr = ''

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return mergeConfig(baseConfig, {
      build: {
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
      },
      publicDir: false,
      plugins: <PluginOption> [
        {
          name: 'inline-css',
          transform(code, id) {
            const isCSS = (path: string) => /\.css$/.test(path)

            if (!isCSS(id))
              return
            const cssCode = minify(code)
            cssCodeStr += cssCode
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
              function __insertCSS(code) {
                if (!code || typeof document == 'undefined') return
                let head = document.head || document.getElementsByTagName('head')[0]
                let style = document.createElement('style')
                style.type = 'text/css'
                head.appendChild(style)
                ;style.styleSheet ? (style.styleSheet.cssText = code) : style.appendChild(document.createTextNode(code))
              }\n
              __insertCSS(${JSON.stringify(cssCodeStr)})
              \n ${code}`,
              map: { mappings: '' },
            }
          },
        },
      ],
    })
  }
  else {
    return mergeConfig(baseConfig, {
      build: {
        outDir: 'dist',
      },
    })
  }
})
