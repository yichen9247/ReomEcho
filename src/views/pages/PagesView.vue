<script setup>
    import Cookies from "js-cookie"
    import { useRoute } from 'vue-router'
    import { ref, onMounted, watch } from 'vue'
    import LeaveView from "@/pages/LeaveView.vue"
    import AboutView from "@/pages/AboutView.vue"
    import "@/views/pages/assets/ArticleView.css"
    import siteConfig from "../../../docs/main.js"
    import { onBeforeRouteLeave } from 'vue-router'
    import FriendView from "@/pages/FriendView.vue"
    import ProjecView from "@/pages/ProjecView.vue"
    import renderMarkdown from "@/scripts/markdown.js"
    import CommentView from "@/views/widgets/CommentView.vue"
    import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

    const route = useRoute();
    const htmlContent = ref('');
    const config = ref(route.meta.config);
    const ReomEchoStore = useReomEchoStore();
    let filePath = '../../../docs/' + config.value.path + '/README.md';

    /**
     * Markdown渲染的图片灯箱效果
    */

    const checkImageClick = async () => {
        let images = document.querySelectorAll("img.post-block-image");
        for (var i = 0; i < images.length; i++) {
            images[i].addEventListener('click', async function(e) {
                ReomEchoStore.setImageLightBoxSta(true);
                ReomEchoStore.setImageLightBoxSrc(e.target.src);
                
                /* let clone = this.parentNode.cloneNode(true);
                clone.childNodes[0].classList.add("post-block-image-full");
                this.parentNode.parentNode.appendChild(clone);
                clone.childNodes[0].focus();
                clone.childNodes[0].onblur = () => {
                    this.parentNode.parentNode.removeChild(clone);
                }; */ // 旧版图片预览逻辑
            });
        };
    }

    const toRenderMarkdown = async (data) => {
        if (config.path !== false) {
            htmlContent.value = await renderMarkdown(data);
        }
    }

    onBeforeRouteLeave(async (to, from, next) => {
        next();
        setTimeout(() => {
            try {
                config.value = route.meta.config;
                if (route.meta.type === 'post') {
                    filePath = '../../../docs/' + config.value.path + '/README.md';
                    fetch(filePath)
                    .then(response => response.text())
                    .then(data => toRenderMarkdown(data))
                    .catch(error => {});
                    setTimeout(() => checkImageClick(),1000);
                }
            } catch (e) {
                location.reload();
            }
        },1);
    });

    const letGetPostData = async () => {
        if (route.meta.type === 'post') {
            try {
                await fetch(filePath)
                .then(response => response.text())  
                .then(data => toRenderMarkdown(data))  
                .catch(error => {});
                setTimeout(() => checkImageClick(),1000);
            } catch (e) {
                location.reload();
            }
        }
    }
    
    onMounted(async () => {
        await Promise.all([
            await ReomEchoStore.setIsSiLodingStatus(true),
            await letGetPostData(),
            await ReomEchoStore.setIsHeaderBarShows(true)
        ]).then(async () => {
            await ReomEchoStore.setIsSiLodingStatus(false);
        });
    });

    document.title = config.value.name + ' - ' + siteConfig.global.site_title;
    watch(config,async (newValue,oldValue) => {
        document.title = config.value.name + ' - ' + siteConfig.global.site_title;
    },{deep: true});
</script>

<template>
    <div id="profile" :style="{ animation: 'article 1s' }" v-if="config.path !== false" :data-theme="Cookies.get('darkTheme') !== 'true' ? 'default' : 'dark'">
        <van-pull-refresh v-model="ReomEchoStore.refreshtilStstus" @refresh="ReomEchoStore.toggleRefreshStatus" v-if="ReomEchoStore.isDeviceMobilePhone && siteConfig.global.index_refreshs">
            <div id="article-head" v-if="config.head">
                <img class="cover-bg" :src="config.image"/>
                <h1 class="cover-title">{{ config.name }}</h1>
            </div>
            <div id="markdown" :class="route.meta.type === 'post' ? 'markdown-post' : 'markdown-page'">
                <div class="markdown-body" :style="{ minHeight: '100%'  }">
                    <section id="section" v-if="route.meta.type === 'post'" v-html="htmlContent"></section>
                    <LeaveView v-if="route.meta.type === 'feed'"/>
                    <FriendView v-if="route.meta.type === 'link'"/>
                    <ProjecView v-if="route.meta.type === 'repo'"/>
                    <AboutView  v-if="route.meta.type === 'about'"/>
                    <CommentView v-if="siteConfig.comment.comment_glba && config.comment"/>
                </div>
            </div>
        </van-pull-refresh>
        <div v-else>
            <div id="article-head" v-if="config.head">
                <img class="cover-bg" :src="config.image"/>
                <h1 class="cover-title">{{ config.name }}</h1>
            </div>
            <div id="markdown" :class="route.meta.type === 'post' ? 'markdown-post' : 'markdown-page'">
                <div class="markdown-body" :style="{ minHeight: '100%'  }">
                    <section id="section" v-if="route.meta.type === 'post'" v-html="htmlContent"></section>
                    <LeaveView v-if="route.meta.type === 'feed'"/>
                    <FriendView v-if="route.meta.type === 'link'"/>
                    <ProjecView v-if="route.meta.type === 'repo'"/>
                    <AboutView  v-if="route.meta.type === 'about'"/>
                    <CommentView v-if="siteConfig.comment.comment_glba && config.comment"/>
                </div>
            </div>
        </div>
    </div>
</template>