import {defineConfig} from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import {createStyleImportPlugin} from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
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
