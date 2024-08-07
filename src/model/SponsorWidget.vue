
<script setup>
    import utils from '@/scripts/utils'
    const siteConfig = utils.siteConfig,ReomEchoStore = utils.useReomEchoStore();
</script>

<template>
    <a-modal v-model:open="ReomEchoStore.sponsDialogState" title="赞助我们" :footer=null>
        <img class="sponsor" v-lazy="siteConfig.aside.sponsor_image" alt="赞助我们" draggable="false">
    </a-modal>
</template>

<style>
    img.sponsor {
        width: 200px;
        height: auto;
        display: block;
        margin-top: 20px;
        user-select: none;
        margin: 10px auto;
        object-fit: cover;
        border-radius: 5px;
    }

    :where(.css-dev-only-do-not-override-16pw25h).ant-modal .ant-modal-content,:where(.css-dev-only-do-not-override-16pw25h).ant-modal .ant-modal-header {
        background-color: var(--backard-color);
    }

    :where(.css-dev-only-do-not-override-16pw25h).ant-modal .ant-modal-title,:where(.css-dev-only-do-not-override-16pw25h).ant-modal .ant-modal-close {
        color: var(--textard-color)!important;
    }
</style>