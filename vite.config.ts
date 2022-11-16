import {defineConfig} from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import {createStyleImportPlugin} from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
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
    },
  },
  plugins: [
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/css`
          },
        },
      ],
    }),
  ],
})
