import {defineConfig} from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ds-cash/',
  server: {
    host: true,
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 将 /api 重写为空
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      utils: path.resolve(__dirname, 'src/utils'),
      '#': path.resolve(__dirname, 'types'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // mixin和variable里面是函数和变量等供scss使用的非实体css, scss-loader需要
        additionalData: `
          @import "@/assets/scss/variable.scss";
        `,
      },
    },
  },
  plugins: [react()],
})
