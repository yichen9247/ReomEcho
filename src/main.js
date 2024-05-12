
import './assets/index.css'
import App from '@/App.vue'
import.meta.glob('../docs/')
import router from '@/router'
import { Lazyload } from 'vant'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import 'element-plus/dist/index.css'

const app = createApp(App);

app.use(router);
app.use(Lazyload, {
    lazyComponent: true,
});
app.use(createPinia());

app.mount('#app');