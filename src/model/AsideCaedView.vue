
<script setup>
    import { ref } from 'vue'
    import utils from '@/scripts/utils.js'
    const siteConfig = utils.siteConfig,ReomEchoStore = utils.useReomEchoStore(),props = defineProps({ class: String, wave: Boolean }),classList = ref('aside-card ' + props.class);
</script>

<template>
    <div :class="classList" v-if="siteConfig.drawer.drawer_social  && !ReomEchoStore.isDeviceMobilePhone" v-wave="siteConfig.sundry.moused_wave && wave">
        <slot name="content"></slot>
    </div>
</template>