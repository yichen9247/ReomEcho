<!-- eslint-disable no-undef -->

<script setup>
    import { useTitle } from 'vue-hooks-plus'
    import utils from "@/scripts/utils.min.js"
    import { ref, onMounted, watch  } from 'vue'
    import FriendView from "@/pages/FriendView.vue"
    import ProjecView from "@/pages/ProjecView.vue"
    import CircleView from "@/pages/CircleView.vue"
    import NotDataView from "@/model/NotDataView.vue"
    import CommentView from "@/model/CommentView.vue"
    import renderMarkdown from "@/scripts/markdown.min.js"
    import { useRoute, onBeforeRouteLeave } from 'vue-router'

    const route = useRoute();
    const axios = utils.axios;
    const htmlContent = ref(null);
    const siteConfig = utils.siteConfig;
    const config = ref(route.meta.config);
    const ReomEchoStore = utils.useReomEchoStore();
    let filePath = '../../../docs/' + config.value.path + '/README.md';

    /**
     * Markdown渲染的图片灯箱效果
    */

    const checkImageClick = async () => {
        let images = document.querySelectorAll("img.post-block-image");
        for (let i = 0; i < images.length; i++) {
            images[i].addEventListener('click', async function(e) {
                if (siteConfig.style.img_sandbox == 1) {
                    ReomEchoStore.setImageLightBoxSta(true);
                    ReomEchoStore.setImageLightBoxSrc(e.target.src);
                } else 
                if (siteConfig.style.img_sandbox == 2) {
                    Promise.all([
                        await import("layui"),
                        await import("layui/dist/css/layui.css")
                    ]).then(async () => layer.photos({ photos: { "title": '文章图片',"start": 0, "data": [{"alt": '文章图片',"pid": 1,"src": e.target.src}] } }));
                }
                
                /* let clone = this.parentNode.cloneNode(true);
                clone.childNodes[0].classList.add("post-block-image-full");
                this.parentNode.parentNode.appendChild(clone);
                clone.childNodes[0].focus();
                clone.childNodes[0].onblur = () => {
                    this.parentNode.parentNode.removeChild(clone);
                }; */ // 旧版图片预览逻辑
            });
        }
    }

    
    onBeforeRouteLeave(async (to, from, next) => {
        next();setTimeout(async () => {
            try {
                config.value = to.meta.config;
                if (to.meta.type === 'post') {
                    filePath = '../../../docs/' + config.value.path + '/README.md';
                    await axios.get(filePath).then(async (response) => {
                        await toRenderMarkdown(response.data).then(async () => await checkImageClick());
                    });
                }
            } catch {
                location.reload();
            }
        },1);
    });
    
    const letGetPostData = async () => {
        if (route.meta.type !== 'post') return;
        try {
            const response = await axios.get(filePath);
            await toRenderMarkdown(response.data).then(async () => await checkImageClick());
        } catch {
            location.reload();
        }
    }
    
    onMounted(async () => await letGetPostData());
    useTitle(config.value.name + ' - ' + siteConfig.global.site_title);
    watch(() => route.path,async () => config.value = route.meta.config);
    const toRenderMarkdown = async (data) => { if (config.value.path !== false) htmlContent.value = await renderMarkdown(data) };
</script>

<template>
    <div class="frame-container frame-pages">
        <h1 class="pages-title van-multi-ellipsis--l2">{{ config.name }}</h1>
        <div id="markdown" v-if="route.meta.type === 'post'" :class="route.meta.type === 'post' ? 'markdown-post' : 'markdown-page'" style="padding-top: 40px">
            <div class="markdown-body" :style="{ minHeight: '100%', width: '100%'  }">
                <section id="section"  v-html="htmlContent"></section>
            </div>
        </div>
        <FriendView v-if="route.meta.type === 'link'"/>
        <ProjecView v-if="route.meta.type === 'repo'"/>
        <CircleView v-if="route.meta.type === 'circle'"/>
        <NotDataView v-if="route.meta.type === 'post' && htmlContent == null" :description="'未查询到文章信息'"/>
        <CommentView v-if="siteConfig.comment.comment_glba && config.comment && !ReomEchoStore.isSiLodingStatus"/>
    </div>
</template>

<style>
    @import url("./assets/PagesFrame.css");
</style>