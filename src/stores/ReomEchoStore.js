/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import Cookies from "js-cookie"
import { ref, watch } from "vue"
import { defineStore } from "pinia"
import utils from "@/scripts/utils.js"
import siteConfig from "../../docs/main.js"
import { Bell } from "@element-plus/icons-vue"

const ready = ref(false);
watch(ready,async (newValue,oldValue) => {
    if (newValue) await checkPolicyAgreed();
    if (siteConfig.style.darkheme_toggle == 2 && newValue) {
        let Hours = new Date().getHours();
        let profile = document.querySelector(".main-layout");
        if ((Hours >= 0 && Hours <= 8) || (Hours >=22 && Hours <= 23) ) {
            profile.setAttribute("data-theme","dark");
            Cookies.set('darkTheme', true ,{ expires: 30 });
        } else {
            profile.setAttribute("data-theme","default");
            Cookies.set('darkTheme', false ,{ expires: 30 });
        }
    }
});

const checkPolicyAgreed = async () => {
    if (siteConfig.cookie.cookie_notice) {
        if (Cookies.get('policy') !== 'true' && useReomEchoStore().isDeviceMobilePhone) {
            await showDialog({ message: siteConfig.cookie.cookie_mb_message, theme: 'round-button', confirmButtonText: "允许存储"}).then(() => Cookies.set('policy', true ,{ expires: 30 }));
        }
        if (Cookies.get('policy') !== 'true' && !useReomEchoStore().isDeviceMobilePhone) {
            Cookies.set('policy', true ,{ expires: 30 });
            await ElNotification({ icon: Bell,duration: 3000,title: '协议提醒助手',position: 'bottom-right',dangerouslyUseHTMLString: true,message: siteConfig.cookie.cookie_pc_message });
        }
    }
}

onload = async () => ready.value = true;

export const useReomEchoStore = defineStore('ReomEchoStore',() => {
    const imageLightBoxSrc = ref("");
    const searchDialogStat = ref(false);
    const isSiLodingStatus = ref(true);
    const isHeaderBarShows = ref(false);
    const imageLightBoxSta = ref(false);
    const mobileDrawerStat = ref(false);
    const sponsDialogState = ref(false);
    const sitePathNameStatus = ref(location.pathname);
    const isDeviceMobilePhone = ref(utils.isMobile());
    const pageResizeStatus = ref(Cookies.get('resize'));
    const darksThemeStatus = ref(Cookies.get('darkTheme'));

    const setImageLightBoxSrc = async (value) => imageLightBoxSrc.value = value;
    const setImageLightBoxSta = async (value) => imageLightBoxSta.value = value;
    const setMobileDrawerStat = async (value) => mobileDrawerStat.value = value;
    const setIsHeaderBarShows = async (value) => isHeaderBarShows.value = value;
    const setIsSiLodingStatus = async (value) => isSiLodingStatus.value = value;
    const setSearchDialogStat = async (value) => searchDialogStat.value = value;
    const setPageResizeStatus = async (value) => pageResizeStatus.value = value;
    const setDarksThemeStatus = async (value) => darksThemeStatus.value = value;
    const setSponsDialogState = async (value) => sponsDialogState.value = value;
    const resetSitePathName = async () => sitePathNameStatus.value = location.pathname;

    const resizeWindowInitConfig = async () => {
        let device = utils.isMobile();
        isDeviceMobilePhone.value = device;
    }

    return ({ 
        pageResizeStatus, 
        imageLightBoxSrc, 
        imageLightBoxSta, 
        mobileDrawerStat, 
        isSiLodingStatus, 
        isHeaderBarShows, 
        searchDialogStat, 
        sponsDialogState, 
        darksThemeStatus, 
        sitePathNameStatus, 
        isDeviceMobilePhone, 

        resetSitePathName,
        setPageResizeStatus,
        setDarksThemeStatus, 
        setImageLightBoxSrc, 
        setImageLightBoxSta, 
        setMobileDrawerStat, 
        setIsHeaderBarShows, 
        setIsSiLodingStatus, 
        setSearchDialogStat, 
        setSponsDialogState,
        resizeWindowInitConfig,
    });
});