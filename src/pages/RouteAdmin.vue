
<script setup>
    import utils from '@/scripts/utils'
    const ReomEchoStore = utils.useReomEchoStore();
</script>

<template>
    <!-- 顶部安全区 -->
    <div class="van-safe-area-top" v-if="ReomEchoStore.isDeviceMobilePhone"></div>
    <RouterView />
    <!-- 底部安全区 -->
    <div class="van-safe-area-bottom" v-if="ReomEchoStore.isDeviceMobilePhone"></div>
</template>