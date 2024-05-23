
import './assets/index.css'
import App from '@/App.vue'
import.meta.glob('../docs/')
import router from '@/router'
import { Lazyload } from 'vant'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { cloneDeep } from 'lodash-es'
import siteConfig from "../docs/main.js"

const obj = cloneDeep({});
const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Lazyload, {lazyComponent: siteConfig.global.image_lazyload});

app.mount('#app');