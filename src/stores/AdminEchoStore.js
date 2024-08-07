/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { ref } from "vue"
import { defineStore } from "pinia"

export const useAdminEchoStore = defineStore('AdminEchoStore',() => {
    const userInfo = ref({});
    const linkList = ref([]);
    const musicList = ref([]);
    const homeConfig = ref([]);
    const styleConfig = ref([]);
    const commeConfig = ref([]);
    const activConfig = ref([]);
    const inserConfig = ref([]);
    const menuSelected = ref(0);

    const setLinkList = (value) => linkList.value = value;
    const setUserInfo = (value) => userInfo.value = value;
    const setMusicList = (value) => musicList.value = value;
    const setHomeConfig = (value) => homeConfig.value = value;
    const setActivConfig = (value) => activConfig.value = value;
    const setStyleConfig = (value) => styleConfig.value = value;
    const setCommeConfig = (value) => commeConfig.value = value;
    const setInserConfig = (value) => inserConfig.value = value;
    const setMenuSelected = (value) => menuSelected.value = value;

    return ({
        userInfo, linkList, musicList, menuSelected, 
        config: { styleConfig, commeConfig, activConfig, homeConfig, inserConfig },
        setUserInfo, setLinkList, setMenuSelected, setActivConfig, setHomeConfig, setStyleConfig, setMusicList, setCommeConfig, setInserConfig
    });
});