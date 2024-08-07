
<script setup>
    import utils from '@/scripts/utils'
    import MainLayout from "@/layout/MainLayout.vue"
    import SearchWidget from "@/model/SearchWidget.vue"
    import OverLaysView from "@/model/OverLaysView.vue"
    import MobileDrawer from "@/mobile/MobileDrawer.vue"
    import SponsorWidget from "@/model/SponsorWidget.vue"
    const siteConfig = utils.siteConfig,ReomEchoStore = utils.useReomEchoStore();
</script>

<template>
    <!-- 顶部安全区 -->
    <div class="van-safe-area-top" v-if="ReomEchoStore.isDeviceMobilePhone"></div>
    <MainLayout />
    <OverLaysView />
    <MobileDrawer v-if="ReomEchoStore.isDeviceMobilePhone"/>
    <van-back-top v-if="siteConfig.sundry.backtop_button"/>
    <SponsorWidget v-if="!ReomEchoStore.isDeviceMobilePhone"/>
    <SearchWidget v-if="ReomEchoStore.searchDialogStat && siteConfig.widget.search_widget"/>
    <!-- 底部安全区 -->
    <div class="van-safe-area-bottom" v-if="ReomEchoStore.isDeviceMobilePhone"></div>
</template>