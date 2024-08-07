
<script setup>
    import { onMounted } from 'vue'
    import utils from "@/scripts/utils"
    import { useTitle } from 'vue-hooks-plus'
    import HomeArtic from '@/model/HomeArticle.vue'

    const siteConfig = utils.siteConfig;
    onMounted(async () => useTitle(siteConfig.global.site_title));
</script>

<template>
    <div class="frame-container frame-home" id="frame-home">
        <div class="hitokoto-box" v-if="siteConfig.index.index_hitoSt">
            <van-notice-bar left-icon="volume-o" :scrollable="false">
                <van-swipe vertical class="notice-swipe" :autoplay="3000" :touchable="false" :show-indicators="false">
                    <van-swipe-item v-for="(item, index) in siteConfig.index.index_hitokoto" :key="index">{{ item }}</van-swipe-item>
                </van-swipe>
            </van-notice-bar>
        </div>
        <HomeArtic/>
    </div>
</template>

<style>
    @import url("./assets/HomeFrame.css");
</style>