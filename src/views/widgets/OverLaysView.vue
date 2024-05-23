
<script setup>
    import "./assets/OverLaysView.css"
    import siteConfig from "../../../docs/main.js"
    import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

    const ReomEchoStore = useReomEchoStore();
</script>

<template>
    <van-overlay :show="ReomEchoStore.imageLightBoxSta" @click="ReomEchoStore.setImageLightBoxSta(false)">
        <div class="wrapper">
            <img :src="ReomEchoStore.imageLightBoxSrc">
        </div>
    </van-overlay>
    <van-overlay :show="ReomEchoStore.isSiLodingStatus" @click="ReomEchoStore.setImageLightBoxSta(false)" class="full-screen" z-index="100">
        <img :src="siteConfig.global.loading_icons" class="loading-icon" draggable="false">
        <div class="loading-image-dot"></div>
    </van-overlay>
</template>