
import { ref } from "vue"
import Cookies from "js-cookie"
import { defineStore } from "pinia"
import siteConfig from "../../docs/main.js"

let cookieIndex = 0;
if (siteConfig.sundry.music_cookie && Cookies.get('songIndex') != undefined) cookieIndex = Number(Cookies.get('songIndex'));

export const useMisicEchoStore = defineStore('MisicEchoStore',() => {

    const closestatus = ref(false);
    const userMusic = ref(null);
    const audioRef = ref();
    const musicList = ref([]);
    const currentLyc = ref(0);
    const paused = ref(false);
    const lyricList = ref([]);
    const isPlayed = ref(false);
    const musicloading = ref(false);
    const songIndex = ref(cookieIndex);

    const setPaused = async (value) => paused.value = value;
    const setMusicList = async (value) => musicList.value = value;
    const setSongIndex = async (value) => songIndex.value = value;
    const setLyricList = async (value) => lyricList.value = value;
    const setCurrentLyc = async (value) => currentLyc.value = value;
    const setIsPlayed = async (value) => isPlayed.value = value;
    const setUserMusic = async (value) => userMusic.value = value;
    const setClosestatus = async (value) => closestatus.value = value;
    const setMusicLoading = async (value) => musicloading.value = value;

    return ({
        paused,userMusic,audioRef,musicList,songIndex,lyricList,currentLyc,isPlayed,closestatus,musicloading,
        setPaused,setMusicList,setSongIndex,setLyricList,setCurrentLyc,setIsPlayed,setUserMusic,setClosestatus,setMusicLoading
    });
});