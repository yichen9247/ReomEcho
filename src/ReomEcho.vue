<script setup>
  import utils from "@/scripts/utils"
  import { useRoute } from 'vue-router'
  import RouteHome from "@/pages/RouteHome.vue"
  import RouteAdmin from "@/pages/RouteAdmin.vue"
  import { SpeedInsights } from "@vercel/speed-insights/vue"

  const siteConfig = utils.siteConfig;
  const route = useRoute(),ReomEchoStore = utils.useReomEchoStore();
  onresize = async () => await ReomEchoStore.resizeWindowInitConfig();
</script>

<template>
  <RouteHome v-if="route.meta.route === 'Home'"/>
  <RouteAdmin v-if="route.meta.route === 'Admin'"/>
  <SpeedInsights v-if="siteConfig.depoly.method === 'Vercel' && siteConfig.depoly.SpeedInsights"/>
</template>