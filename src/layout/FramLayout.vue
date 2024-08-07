
<script setup>
    import { RouterView } from 'vue-router'
    import utils from "@/scripts/utils.min.js"
    import AsideFrame from '@/frame/AsideFrame.vue'
    import FootLayout from '@/layout/FootLayout.vue'
    const ReomEchoStore = utils.useReomEchoStore();
</script>

<template>
    <div class="frame-containers">
        <div class="frame-main frame" :style="{ width: ReomEchoStore.isDeviceMobilePhone && '100%' }">
            <RouterView/>
            <FootLayout v-if="!ReomEchoStore.refreshtilStstus"/>
        </div>

        <div class="frame-aside frame" v-if="!ReomEchoStore.isDeviceMobilePhone">
            <AsideFrame/>
        </div>
    </div>
</template>

<style>
    @import url("./assets/FramLayout.css");
</style>