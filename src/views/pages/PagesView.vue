<script setup>
    import Cookies from "js-cookie"
    import { ref, onMounted, watch } from 'vue'
    import "@/views/pages/assets/ArticleView.css"
    import headerview from "@/views/headerview.vue"
    import siteConfig from "../../../docs/main.js"
    import footerview from "@/views/footerview.vue"
    import { useRoute, useRouter } from 'vue-router'
    import renderMarkdown from "@/scripts/markdown.js"
    import FriendView from '@/views/pages/FriendView.vue'
    import ProjecView from '@/views/pages/ProjecView.vue'
    import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const htmlContent = ref('');
    const config = ref(route.meta.config);
    const ReomEchoStore = useReomEchoStore();
    const filePath = '../../../docs/' + config.value.path + '/README.md';

    const checkSiteHref = async () => {
        let links = document.getElementsByTagName('a');  
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.includes(location.host)) {
                links[i].addEventListener('click',async function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    await router.push(new URL(this.href).pathname);
                });
            }
        };
    }

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

    const onRefresh = async () => {
        setTimeout(() => {
            showToast('刷新成功');
            loading.value = false;
        }, 1000);
    };

    const toRenderMarkdown = async (data) => {
        if (config.path !== false) {
             htmlContent.value = await renderMarkdown(data);
        }
    }

    router.beforeEach((to, from, next) => {
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
    
    onMounted(async () => {
        if (route.meta.type === 'post') {
            try {
                await fetch(filePath)
                .then(response => response.text())  
                .then(data => toRenderMarkdown(data))  
                .catch(error => {});
                checkSiteHref();
                setTimeout(() => checkImageClick(),1000);
            } catch (e) {
                location.reload();
            }
        }
    });

    document.title = config.value.name + ' - ' + siteConfig.global.site_title;
    watch(config,(newValue,oldValue) => {
        document.title = config.value.name + ' - ' + siteConfig.global.site_title;
    });
</script>

<template>
    <div id="profile" :style="{ animation: 'article 1s' }" v-if="config.path !== false" :data-theme="Cookies.get('darkTheme') !== 'true' ? 'default' : 'dark'">
        <headerview class="active"/>
        <van-pull-refresh v-model="loading" @refresh="onRefresh" v-if="ReomEchoStore.isDeviceMobilePhone && siteConfig.global.index_refreshs">
            <div id="article-head">
                <img class="cover-bg" :src="config.image"/>
                <h1 class="cover-title">{{ config.name }}</h1>
            </div>
            <div id="markdown" :class="route.meta.type === 'post' ? 'markdown-post' : 'markdown-page'">
                <div class="markdown-body" :style="{ minHeight: '100%'  }">
                    <section id="section" v-if="route.meta.type === 'post'" v-html="htmlContent"></section>
                    <FriendView v-if="route.meta.type === 'link'"/>
                    <ProjecView v-if="route.meta.type === 'repo'"/>
                    <el-divider/>
                    <footerview />
                </div>
            </div>
        </van-pull-refresh>
        <div v-else>
            <div id="article-head">
                <img class="cover-bg" :src="config.image"/>
                <h1 class="cover-title">{{ config.name }}</h1>
            </div>
            <div id="markdown" :class="route.meta.type === 'post' ? 'markdown-post' : 'markdown-page'">
                <div class="markdown-body" :style="{ minHeight: '100%'  }">
                    <section id="section" v-if="route.meta.type === 'post'" v-html="htmlContent"></section>
                    <FriendView v-if="route.meta.type === 'link'"/>
                    <ProjecView v-if="route.meta.type === 'repo'"/>
                    <el-divider/>
                    <footerview />
                </div>
            </div>
        </div>
        <van-overlay :show="ReomEchoStore.imageLightBoxSta" @click="ReomEchoStore.setImageLightBoxSta(false)">
            <div class="wrapper">
                <img :src="ReomEchoStore.imageLightBoxSrc">
            </div>
        </van-overlay>
        <van-back-top v-if="siteConfig.global.backtop_button"/>
    </div>
</template>