<script setup>
    import './assets/indexview.css'
    import Cookies from "js-cookie"
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import config from "../../docs/index.js"
    import siteConfig from "../../docs/main.js"
    import hitikoview from "@/views/hitikoview.vue"
    import HomeArtic from "@/views/pages/HomeArtic.vue"
    import renderMarkdown from "../scripts/markdown.js"
    import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

    const router = useRouter();
    const htmlContent = ref('');
    const contextshow = ref(false);
    const filePath = '../../docs/README.md';
    const ReomEchoStore = useReomEchoStore();
    const darkTheme = ref(Cookies.get('darkTheme'));

    const checkSiteHref = () => {
        let links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.includes(location.host)) {
                links[i].addEventListener('click',function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(new URL(this.href).pathname).then(() => {
                        document.querySelector('#app').scrollTo(0, 0);
                    });
                });
            }
        };
    }

    const loadMainRescoure = () => {
        fetch(filePath)
        .then(response => response.text())  
        .then(data => toRenderMarkdown(data))  
        .catch(error => console.error('Error fetching file:', error));
        if (!ReomEchoStore.isDeviceMobilePhone) {
            document.querySelector("#app").addEventListener('scroll',() => {
                if (document.querySelector("#app").scrollTop >= 100) {
                    document.querySelector("#site-header").classList.add("active");
                } else document.querySelector("#site-header").classList.remove("active");
            });
        }
        setTimeout(async () => {
            contextshow.value = true;
        },500);
        checkSiteHref();
    }
    onMounted(async () => {
        await homeReady().then(async () => {
            ReomEchoStore.setIsSiLodingStatus(false);
        }).catch(async() => {
            ElMessage({type: 'error',message: "系统功能异常！"});
        });
    });

    const homeReady = async () => {
        loadMainRescoure();
        ReomEchoStore.setWindowReadyState(true);
        ReomEchoStore.setIsHeaderBarShows(false);
    }

    const scrollToMain = () => {
        const main = document.getElementById('markdown');
        main.scrollIntoView({ behavior: 'smooth' });
    }
    
    document.title = siteConfig.global.site_title;
    const toRenderMarkdown = (data) => {
        htmlContent.value = renderMarkdown(data);
    };
</script>

<template>
    <div id="profile" :data-theme="darkTheme !== 'true' ? 'default' : 'dark'" v-if="ReomEchoStore.isDeviceMobilePhone">
        <van-pull-refresh v-model="ReomEchoStore.refreshtilStstus" @refresh="ReomEchoStore.toggleRefreshStatus" v-if="ReomEchoStore.isDeviceMobilePhone && siteConfig.index.index_refreshs">
            <div id="markdown" class="markdown-index">
                <div class="markdown-body">
                    <section v-html="htmlContent"></section>
                    <HomeArtic/>
                    <el-divider/>
                </div>
            </div>
        </van-pull-refresh>
    </div>

    <div id="profile" :data-theme="darkTheme !== 'true' ? 'default' : 'dark'" v-else>
        <img class="cover-bg" :src="siteConfig.header.header_image" v-if="siteConfig.index.index_header"/>
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

        <div id="markdown" class="markdown-index" :style="{ marginTop: !siteConfig.index.index_header && '80px'}">
            <div class="markdown-body">
                <section v-html="htmlContent"></section>
                <HomeArtic/>
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