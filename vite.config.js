
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import compression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import Components from 'unplugin-vue-components/vite'
import removeConsole from "vite-plugin-remove-console"
import { VantResolver } from '@vant/auto-import-resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    brotliSize: false,
    assetsDir: 'assets', // 静态资源目录
    rollupOptions: {
      treeshake: true,
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        commonjsOptions: {
          requireReturnsDefault: 'namespace', // 要求ES模块返回其名称空
        }
      }
    }
  },
  server: {
    hot: {reload: true,rerender: true},
    routes: {
      beforeEnter(req, res, next) {
        if (/\.js$/.test(req.path)) res.redirect('/');
        else next();
        if (/\.md$/.test(req.path)) res.redirect('/');
        else next();
      }
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 所有以 mdui- 开头的标签名都是 mdui 组件
          isCustomElement: (tag) => tag.startsWith('mdui-')
        }
      }
    }),
    AutoImport({resolvers: [ElementPlusResolver(),VantResolver()]}),
    Components({resolvers: [ElementPlusResolver(),VantResolver()]}),
    compression({verbose: true,disable: false,threshold:10240,algorithm: 'gzip',ext: '.gz'}),visualizer()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
});
