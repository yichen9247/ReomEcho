<script setup>
    import { useRouter } from 'vue-router'
    import siteConfig from "../../../docs/main.js"
    import headerview from "@/views/headerview.vue"
    import footerview from "@/views/footerview.vue"
    document.title = "页面没找到 - " + siteConfig.global.site_title;

    const router = useRouter();
    const backHist = async () => router.go(-1);
    const backHome = async () => router.push("/");
</script>

<template>
    <div id="profile" :style="{ animation: 'article 1s' }">
        <headerview class="active"/>
        <div id="article-head">
            <img class="cover-bg" :src="siteConfig.header.header_image"/>
            <h1 class="cover-title">404 页面没有找到</h1>
        </div>
        <div id="markdown">
            <div class="markdown-body" :style="{ paddingTop: '25px', minHeight: 'calc(100% - 20px)'  }">
                <section id="section">
                    <el-space :size="16">
                        <el-button class="go-home n-button" size="large" @click="backHome">返回到首页</el-button>
                        <el-button class="go-hist n-button" size="large" @click="backHist">返回上一页</el-button>
                    </el-space>
                </section>
                <el-divider/>
                <footerview/>
            </div>
        </div>
    </div>
</template>

<style>
    button.n-button {
        width: 200px;
        transition: 0.5s;
    }

    button.n-button > span {
        transition: 0.5s;
    }
    
    @media (max-width: 768px) {
        div.el-space {
            width: 100%;
            transition: 0.5s;
            margin-bottom: -15px;
            flex-direction: column;
        }
        
        div.el-space > div.el-space__item {
            width: 100%;
            transition: 0.5s;
            margin-bottom: 20px;
            margin-right: 0!important;
        }

        div.el-space > div.el-space__item > button.n-button {
            width: 100%;
            height: 55px;
        }
    }
</style>