
import "@/scripts/config"
import "@/assets/index.css"
// import.meta.glob('../docs/')

import VWave from 'v-wave'
import router from '@/router'
import ReomEcho from '@/ReomEcho.vue'
import Toast from "vue-toastification"
import siteConfig from "../docs/main.js"
import ActionCaptcha from "vue3-action-captcha"

import { Lazyload } from 'vant'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const toastOptions = {
    maxToasts: 2,
    closeOnClick: true,pauseOnHover: true,
    closeButton: "button",position: "top-right",
    draggablePercent: 0.6,pauseOnFocusLoss: true,
    icon: true,rtl: false,timeout: 2000,draggable: true,
};
const Reomecho = createApp(ReomEcho);

Promise.all([
    Reomecho.use(VWave),
    Reomecho.use(router),
    Reomecho.use(ActionCaptcha),
    Reomecho.use(createPinia()),
    Reomecho.use(Toast, toastOptions),
    Reomecho.use(Lazyload, {attempt: 3, lazyComponent: siteConfig.sundry.image_lazyload, loading: siteConfig.style.image_lazyload, error: siteConfig.style.image_lazyerror}),
]).then(async () => {
    Reomecho.mount('#Reomecho');
});