import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import VitePluginStyleInject from './plugin/vite-plugin-style-inject'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePluginStyleInject(),
    vue(),
    dts(),
  ],
  server: {
    host: '0.0.0.0',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'v3-bento',
      fileName: format => `v3-bento.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },

  },

})
