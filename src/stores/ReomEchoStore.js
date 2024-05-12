import { ref } from "vue"
import { defineStore } from "pinia"
import isMobile from "@/scripts/mobile.js"

export const useReomEchoStore = defineStore('onelDialogStore',() => {
    const imageLightBoxSrc = ref("");
    const imageLightBoxSta = ref(false);
    const isDeviceMobilePhone = ref(isMobile.isMobile());
    
    const setImageLightBoxSrc = (value) => imageLightBoxSrc.value = value;
    const setImageLightBoxSta = (value) => imageLightBoxSta.value = value;

    return ({ imageLightBoxSrc, imageLightBoxSta, isDeviceMobilePhone, setImageLightBoxSrc, setImageLightBoxSta });
});