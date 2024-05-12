
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: 'assets', // 静态资源目录
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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
