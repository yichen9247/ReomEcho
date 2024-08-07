<script setup lang="ts">
    import utils from "@/scripts/utils"
    import "./assets/MusicCardView.css"
    import icons from "@/scripts/icons.min.js"
    import { computed, onMounted, ref, watch } from "vue"

    const Cookies = utils.Cookies;
    const prettyLog = utils.prettyLog;
    const audioRef = ref<HTMLAudioElement>();
    const MusicEchoStore = utils.useMisicEchoStore();

    interface Obj { img: string;src: string;lyric: string;title: string }
    interface AudioProps { musicList?: Array<Obj> | undefined; diskHW?: string; offsetY?: number; player?: boolean; lyricSize?: string; progressColor?: string; }
    const props = withDefaults(defineProps<AudioProps>(), { offsetY: 25, player: true, diskHW: '120px', lyricSize: '14px', musicList: undefined, progressColor: '#1890ff' });

    MusicEchoStore.setMusicList(props.musicList);

    const playSongSrc = computed(function () {
        return MusicEchoStore.musicList ? MusicEchoStore.musicList[MusicEchoStore.songIndex]:{}
    });

    const getLyric = async () => {
        if (playSongSrc.value == undefined) {
            await MusicEchoStore.setMusicLoading(true);
        } else {
            let result = playSongSrc.value.lyric;
            if (result) {
                let lyricData =[];
                result.split(/[\n]/).forEach(item => {
                    let temp = item.split(/\[(.+?)\]/)
                    lyricData.push({ time: temp[1], lyc: temp[2] });
                });
                lyricData = lyricData.filter(v => v['lyc'])
                MusicEchoStore.setLyricList(lyricData);
            } else {
                if (props.player) audioRef.value ? audioRef.value.currentTime = 0 : null;
                await MusicEchoStore.setCurrentLyc(0);
                await MusicEchoStore.setLyricList([]);
                let data = MusicEchoStore.lyricList;
                data.push({ time: '00:01:00', lyc: playSongSrc.value.title });
                await MusicEchoStore.setLyricList(data);
            }
        }
    }

    const timeUpdate = async () => {
        if (playSongSrc.value.lyric && props.player) {
            const currentDate = await getTime(audioRef.value.currentTime);
            for (let i = 0; i < MusicEchoStore.lyricList.length; i++) {
                if (MusicEchoStore.lyricList[i + 1]   && currentDate < MusicEchoStore.lyricList[i + 1].time && currentDate > MusicEchoStore.lyricList[i].time) {
                    await MusicEchoStore.setCurrentLyc(i);
                }
            }
        }
    }
    
    const getTime = async (time) => {
        if (time) {
            const minutes = Math.floor(time / 60);
            const remainingSeconds = time % 60;
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = remainingSeconds.toFixed(2).replace('.', ':').padStart(5, '0');
            return `${formattedMinutes}:${formattedSeconds}`;
        } else return "00:00";
    };

    watch (playSongSrc,function (value, oldvalue) {
        try {
            if (props.player) audioRef.value.src = value?.src;
            getLyric();
            audioRef.value?.play();MusicEchoStore.setPaused(true);
        } catch (e) {
            prettyLog.error(e);
            ElMessage({type: 'error',message: "音频文件加载失败！"});
        };
    });

    onMounted(async () => {
        getLyric();
        if (playSongSrc.value == undefined) {
            await MusicEchoStore.setMusicLoading(true);
        } else {
            if (props.player) {
                audioRef.value.src = playSongSrc.value?.src;
                audioRef.value.addEventListener("ended",async () => await switchSong(true));
                audioRef.value.addEventListener("timeupdate",async () => await timeUpdate());
                audioRef.value.addEventListener('error',async () => {
                    prettyLog.error('音频文件加载失败！');
                    await ElMessage({type: 'error',message: "音频文件加载失败！"});
                });
            }
        }
    });

    const playSong = function() {
        MusicEchoStore.setPaused(!MusicEchoStore.paused);
    }

    watch (MusicEchoStore,function (value, oldvalue) {
        if (props.player) MusicEchoStore.paused ? audioRef.value?.play() :audioRef.value ?.pause();
    });
    
    const switchSong = async (isNext) => {
        try {
            let number = MusicEchoStore.songIndex;
            if (MusicEchoStore.musicList) {
                if (MusicEchoStore.songIndex == MusicEchoStore.musicList.length - 1) {
                    MusicEchoStore.setSongIndex(0);
                    if (props.player) MusicEchoStore.setPaused(audioRef.value.paused);
                } else {
                    if (isNext) {
                        MusicEchoStore.setSongIndex(MusicEchoStore.songIndex + 1);
                        Cookies.set('songIndex',String(MusicEchoStore.songIndex));
                        if (props.player) MusicEchoStore.setPaused(audioRef.value.paused);
                    } else {
                        if (number == 0) {
                            ElMessage({type: 'warning',message: "当前是第一首哦！"});
                        } else {
                            MusicEchoStore.setSongIndex(MusicEchoStore.songIndex - 1);
                            Cookies.set('songIndex',String(MusicEchoStore.songIndex));
                            if (props.player) MusicEchoStore.setPaused(audioRef.value.paused);
                        }
                    }
                }
            }
            // if (MusicEchoStore.songIndex == MusicEchoStore.musicList.length - 1) audioRef.value.pause();
        } catch (e) {
            prettyLog.error(e);
        }
    }

    const voice = ref(50);
</script>

<template>
    <div style="height: 100%;width: 100%;display: flex;flex-direction: column;" v-if="!MusicEchoStore.musicloading">
        <audio ref='audioRef' v-if="player"></audio>
        <div class='player'>
            <div class="player_disk">
                <div class="disk_img">
                    <img class="disk-bg" :src="playSongSrc.img" draggable="false"/>
                    <div class="control-box">
                        <div class="control-btn" @click="switchSong(false)">
                            <svg t="1716635573930" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2980" width="36" height="36"><path d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z" fill="#ffffff" p-id="2981"></path></svg>
                        </div>
                        <div class="control-btn" @click="playSong()">
                            <svg :style="{marginLeft: MusicEchoStore.paused ? '-100%' : '0'}" t="1716635647906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4042" width="42" height="42"><path d="M732.502883 465.602819c-107.883492-82.3454-215.772403-164.681769-323.652282-247.014525-38.414608-29.327534-93.780555-1.929039-93.780555 46.396277v494.029051c0 48.325316 55.365948 75.725617 93.780555 46.398084 107.87988-82.332757 215.76879-164.669126 323.652282-247.014525 30.61356-23.357989 30.61356-69.436372 0-92.794362z" fill="#ffffff" p-id="4043"></path></svg>
                            <svg :style="{marginRight: MusicEchoStore.paused ? '0' : '-100%'}" t="1716635718799" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4588" width="42" height="42"><path d="M296.962348 819.192775h430.086141c50.897458 0 92.151511-41.254053 92.151511-92.151511V296.958736c0-50.895652-41.252246-92.160542-92.151511-92.160542H296.962348c-50.897458 0-92.160542 41.26489-92.160542 92.160542v430.082528c-0.001806 50.895652 41.261277 92.151511 92.160542 92.151511z" fill="#ffffff" p-id="4589"></path></svg>
                        </div>
                        <div class="control-btn" @click="switchSong(true)">
                            <svg t="1716635627554" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3478" width="36" height="36"><path d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z" fill="#ffffff" p-id="3479"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="player_control">
                <div class="lyricBox" >
                    <div :style="{fontSize: lyricSize}" class="lyricStyle">
                        <p v-if="MusicEchoStore.lyricList.length == 0">{{ MusicEchoStore.musicList[MusicEchoStore.songIndex].title }}</p>
                        <p v-for="(item,index) in MusicEchoStore.lyricList" key={index} :class="MusicEchoStore.currentLyc != index && 'active'">{{ item.lyc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="music-loading" v-loading="MusicEchoStore.musicloading" v-else element-loading-background="var(--backard-color)" :element-loading-svg="icons.loading" element-loading-svg-view-box="-10, -10, 50, 50"></div>
</template>