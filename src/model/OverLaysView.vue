
<script setup>
    import "./assets/OverLaysView.css"
    import utils from "@/scripts/utils"
    const siteConfig = utils.siteConfig,ReomEchoStore = utils.useReomEchoStore();
</script>

<template>
    <van-overlay :show="ReomEchoStore.imageLightBoxSta" @click="ReomEchoStore.setImageLightBoxSta(false)">
        <div class="wrapper">
            <img :src="ReomEchoStore.imageLightBoxSrc">
        </div>
    </van-overlay>
    <van-overlay :show="ReomEchoStore.isSiLodingStatus && siteConfig.sundry.load_fullscreen" @click="ReomEchoStore.setImageLightBoxSta(false)" class="full-screen" z-index="100">
        <img :src="siteConfig.global.site_loadingIcon" class="loading-icon" draggable="false">
        <div class="loading-image-dot"></div>
    </van-overlay>
</template>