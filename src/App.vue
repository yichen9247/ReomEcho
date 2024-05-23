<script setup>
  
  import '@/views/assets/indexview.css'
  import { RouterView } from 'vue-router'
  import siteConfig from "../docs/main.js"
  import headerview from "@/views/headerview.vue"
  import footerview from "@/views/footerview.vue"
  import OverLaysView from "@/views/widgets/OverLaysView.vue"
  import MobileDrawer from "@/views/widgets/MobileDrawer.vue"
  import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

  const ReomEchoStore = useReomEchoStore();
</script>

<template>
  <!-- 顶部安全区 -->
  <div class="van-safe-area-top" v-if="ReomEchoStore.isDeviceMobilePhone"></div>
  <headerview />
  <RouterView />
  <footerview />
  <OverLaysView v-if="siteConfig.global.load_fullscreen"/>
  <MobileDrawer v-if="ReomEchoStore.isDeviceMobilePhone"/>
  <van-back-top v-if="siteConfig.global.backtop_button"/>
  <!-- 底部安全区 -->
  <div class="van-safe-area-bottom" v-if="ReomEchoStore.isDeviceMobilePhone"></div>
</template>

<style>
  .el-icon {
    margin: 0.175em 0.1em;
    width: 0.75em!important;
    height: 0.75em!important;
  }
</style>