<script setup>
    import './assets/indexview.css'
    import Cookies from "js-cookie"
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import config from "../../docs/index.js"
    import siteConfig from "../../docs/main.js"
    import headerview from "@/views/headerview.vue"
    import hitikoview from "@/views/hitikoview.vue"
    import footerview from "@/views/footerview.vue"
    import HomeArtic from "@/views/pages/HomeArtic.vue"
    import renderMarkdown from "../scripts/markdown.js"
    import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

    const loading = ref(false);
    const router = useRouter();
    const htmlContent = ref('');
    const contextshow = ref(false);
    const filePath = '../../docs/README.md';
    const ReomEchoStore = useReomEchoStore();
    const darkTheme = ref(Cookies.get('darkTheme'));

    const checkSiteHref = () => {
        let links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.includes(window.location.host)) {
                links[i].addEventListener('click',function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(new URL(this.href).pathname);
                });
            }
        };
    }

    const loadMainRescoure = () => {
        fetch(filePath)
        .then(response => response.text())  
        .then(data => toRenderMarkdown(data))  
        .catch(error => console.error('Error fetching file:', error));
        if (ReomEchoStore.isDeviceMobilePhone) {
            document.querySelector("#profile").addEventListener('scroll',() => {
                if (document.querySelector("#profile").scrollTop >= 100) {
                    document.querySelector("#site-header").classList.add("active");
                } else document.querySelector("#site-header").classList.remove("active");
            });
        }
        setTimeout(async () => {
            contextshow.value = true;
        },500);
        checkSiteHref();
    }
    onMounted(() => loadMainRescoure());

    const scrollToMain = () => {
        const main = document.getElementById('markdown');
        main.scrollIntoView({ behavior: 'smooth' });
    }
    
    document.title = siteConfig.global.site_title;
    const toRenderMarkdown = (data) => htmlContent.value = renderMarkdown(data);

    const onRefresh = () => {
        setTimeout(() => {
            showToast('刷新成功');
            loading.value = false;
        }, 1000);
    };
</script>

<template>
    <div id="profile" :data-theme="darkTheme !== 'true' ? 'default' : 'dark'" v-if="ReomEchoStore.isDeviceMobilePhone">
        <headerview/>
        <van-back-top v-if="siteConfig.global.backtop_button"/>
        <van-pull-refresh v-model="loading" @refresh="onRefresh" v-if="ReomEchoStore.isDeviceMobilePhone && siteConfig.index.index_refreshs">
            <div id="markdown" class="markdown-index">
                <div class="markdown-body">
                    <section v-html="htmlContent"></section>
                    <HomeArtic/>
                    <el-divider/>
                    <footerview/>
                </div>
            </div>
        </van-pull-refresh>
    </div>

    <div id="profile" :data-theme="darkTheme !== 'true' ? 'default' : 'dark'" v-else>
        <headerview/>
        <img class="cover-bg" :src="config.heaImage" v-if="siteConfig.index.index_header"/>
        <div id="headerfile" v-if="siteConfig.index.index_header">
            <transition name="el-fade-in-linear">
                <div class="context-box" v-show="contextshow">
                    <h1 class="TopTitle" :data-text="config.TopTitle" :data-fick="config.textFick">{{ config.TopTitle }}</h1>
                    <hitikoview :config="config" /> 
                </div>
            </transition>

            <div class="home-wave">
                <div class="wave-1 wave"></div>
                <div class="wave-2 wave"></div>
            </div>

            <div class="home-down" @click="scrollToMain">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.27em" height="1em" viewBox="0 0 1664 1312" data-icon="fa:chevron-down" class="iconify"><path fill="currentColor" d="m1619 552l-742 741q-19 19-45 19t-45-19L45 552q-19-19-19-45.5T45 461l166-165q19-19 45-19t45 19l531 531l531-531q19-19 45-19t45 19l166 165q19 19 19 45.5t-19 45.5"></path></svg>
            </div>
        </div>

        <div id="markdown" class="markdown-index" :style="{ marginTop: !siteConfig.index.index_header && '55px'}">
            <div class="markdown-body">
                <section v-html="htmlContent"></section>
                <HomeArtic/>
                <footerview/>
            </div>
        </div>

    </div>
</template>

<style>
    .van-pull-refresh__head {
        top: 55px;
    }
    .van-back-top {
        background-color: var(--buttoColor);
    }
</style>