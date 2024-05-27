import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    // 开发时 解决这些commonjs包转成esm包
    include: [
      "@jiaminghi/c-render",
      "@jiaminghi/c-render/lib/plugin/util",
      "@jiaminghi/charts/lib/util/index",
      "@jiaminghi/charts/lib/util",
      "@jiaminghi/charts/lib/extend/index",
      "@jiaminghi/charts",
      "@jiaminghi/color",
    ],
  },
  build: {
    // 打包时需要另外处理的commonjs规范的包
    commonjsOptions: {
      include: [
        /node_modules/, // 必须包含
      ],
    },
  },


})
