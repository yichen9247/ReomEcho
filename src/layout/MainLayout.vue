<!-- eslint-disable no-undef -->

<script setup>
    import utils from "@/scripts/utils.min.js"
    import { useKeyPress } from 'vue-hooks-plus'
    import HeadLayout from "@/layout/HeadLayout.vue"
    import FramLayout from "@/layout/FramLayout.vue"
    import AsideLayout from "@/layout/AsideLayout.vue"
    import BackTopWidget from '@/model/BackTopWidget.vue'

    const siteConfig = utils.siteConfig,ReomEchoStore = utils.useReomEchoStore();

    useKeyPress(['ctrl.k'],(e) => {
        e.preventDefault();
        if (ReomEchoStore.searchDialogStat) {
            ReomEchoStore.setSearchDialogStat(false);
        } else ReomEchoStore.setSearchDialogStat(true);
    });
</script>

<template>
    <div class="main-layout" :data-theme="ReomEchoStore.darksThemeStatus !== 'true' ? 'default' : 'dark'" :data-resize="ReomEchoStore.pageResizeStatus !== 'true' ? 'False' : 'True'">
        <el-container class="main-container">
            <el-header class="layout-header">
                <HeadLayout/>
            </el-header>
            <BackTopWidget v-if="siteConfig.sundry.baktop_bton && !ReomEchoStore.isDeviceMobilePhone"/>

            <el-container class="content-container">
                <el-aside class="content-aside">
                    <AsideLayout/>
                </el-aside>
    
                <el-main class="content-main">
                    <FramLayout/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
    @import url("./assets/MainLayout.css");
</style>