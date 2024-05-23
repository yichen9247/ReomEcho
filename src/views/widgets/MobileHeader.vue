<script setup>
    import '@mdui/icons/brightness-6.js'
    import siteConfig from "../../../docs/main.js"
    import { Menu } from '@element-plus/icons-vue'
    import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

    const ReomEchoStore = useReomEchoStore();
</script>

<template>
    <el-button class="mobile-left-button mobile-button" :icon="Menu" @click="ReomEchoStore.setMobileDrawerStat(true)" v-if="siteConfig.drawer.drawer_show && ReomEchoStore.isDeviceMobilePhone"/>
    <a class="site-title" href="/">{{ siteConfig.header.header_title }}</a>
</template>