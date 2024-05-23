
import Cookies from "js-cookie"
import { ref, watch } from "vue"
import { defineStore } from "pinia"
import isMobile from "@/scripts/mobile.js"
import siteConfig from "../../docs/main.js"
import DisableDevtool from 'disable-devtool'
import developer from "@/scripts/developer.js"
import { Bell } from "@element-plus/icons-vue"

const ready = ref(false);
document.body.style.setProperty('--dominColor',siteConfig.style.site_dominColor);
document.body.style.setProperty('--buttoColor',siteConfig.style.site_buttoColor);
document.body.style.setProperty('--transition',siteConfig.global.transt_interval);
document.body.style.setProperty('--dotted_color1',siteConfig.style.dotted_color1);
document.body.style.setProperty('--dotted_color2',siteConfig.style.dotted_color2);

if (siteConfig.global.load_topline) {
    import('pace-js');
    import('@/assets/paces/pace.css');
}

if (siteConfig.global.site_secproduc) {
    DisableDevtool(developer);
}

if (siteConfig.style.font_style == 1) {
    import('@/assets/styles/font1.css');
}

onload = async () => console.log("\n %c ReomEcho" + " %c 轻量级博客系统", "color:#ffffff;background:#626aef;padding:5px 0;", "color:#626aef;background:#f8f8f8;padding:5px 10px 5px 0px;");

watch(ready,async (newValue,oldValue) => {
    if (newValue) await checkPolicyAgreed();
    if (siteConfig.global.darkheme_toggl == 2 && newValue) {
        let Hours = new Date().getHours();
        let profile = document.querySelector("#profile");
        if ((Hours >=0 && Hours <= 8) || (Hours >=22 && Hours <= 23) ) {
            profile.setAttribute("data-theme","dark");
            Cookies.set('darkTheme', true ,{ expires: 30 });
        } else {
            profile.setAttribute("data-theme","default");
            Cookies.set('darkTheme', false ,{ expires: 30 });
        }
    }
    if (!siteConfig.statis.statics_pv && !siteConfig.statis.statics_uv) document.querySelector('script[src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"]').remove();
});

const checkPolicyAgreed = async () => {
    if (siteConfig.global.cook_notice) {
        if (Cookies.get('policy') !== 'true' && useReomEchoStore().isDeviceMobilePhone) {
            await showDialog({ message: siteConfig.global.cookie_mb_message, theme: 'round-button', confirmButtonText: "允许存储"}).then(() => Cookies.set('policy', true ,{ expires: 30 }));
        }
        if (Cookies.get('policy') !== 'true' && !useReomEchoStore().isDeviceMobilePhone) {
            Cookies.set('policy', true ,{ expires: 30 });
            await ElNotification({ icon: Bell,duration: 3000,title: '协议提醒助手',position: 'bottom-right',dangerouslyUseHTMLString: true,message: siteConfig.global.cookie_pc_message });
        }
    }
}

export const useReomEchoStore = defineStore('ReomEchoStore',() => {
    const imageLightBoxSrc = ref("");
    const isSiLodingStatus = ref(true);
    const refreshtilStstus = ref(false);
    const isHeaderBarShows = ref(false);
    const imageLightBoxSta = ref(false);
    const mobileDrawerStat = ref(false);
    const windowReadyState = ref(false);
    const isDeviceMobilePhone = ref(isMobile.isMobile());
    
    const toggleRefreshStatus = () => {
        refreshtilStstus.value = true;
        setTimeout(() => {
            showToast('刷新成功');
            refreshtilStstus.value = false;
        },1000);
    }
    const setImageLightBoxSrc = (value) => imageLightBoxSrc.value = value;
    const setImageLightBoxSta = (value) => imageLightBoxSta.value = value;
    const setMobileDrawerStat = (value) => mobileDrawerStat.value = value;
    const setIsHeaderBarShows = (value) => isHeaderBarShows.value = value;
    const setIsSiLodingStatus = (value) => isSiLodingStatus.value = value;
    const setWindowReadyState = (value) => {
        ready.value = value;
        windowReadyState.value = value;
    };

    return ({ 
        refreshtilStstus,
        imageLightBoxSrc, 
        imageLightBoxSta, 
        mobileDrawerStat, 
        windowReadyState, 
        isSiLodingStatus, 
        isHeaderBarShows, 
        isDeviceMobilePhone, 
        setImageLightBoxSrc, 
        setImageLightBoxSta, 
        setMobileDrawerStat, 
        setWindowReadyState, 
        setIsHeaderBarShows, 
        setIsSiLodingStatus, 
        toggleRefreshStatus
    });
});