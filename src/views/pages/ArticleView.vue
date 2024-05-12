<script setup>
    import Cookies from "js-cookie"
    import { ref, onMounted, watch } from 'vue'
    import "@/views/pages/assets/ArticleView.css"
    import siteConfig from "../../../docs/main.js"
    import footerview from "@/views/footerview.vue"
    import headerview from "@/views/headerview.vue"
    import { useRoute, useRouter } from "vue-router"
    import renderMarkdown from "@/scripts/markdown.js"
    import NotFounds from '@/views/pages/NotFounds.vue'
    import vueQr from 'vue-qr/src/packages/vue-qr.vue'
    import ArticleFoot from "@/views/pages/ArticleFoot.vue"
    import CommentView from "@/views/widgets/CommentView.vue"
    import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

    const postWords = ref(0);
    const route = useRoute();
    const router = useRouter();
    const htmlContent = ref('');
    const showShare = ref(false);
    const showDraws = ref(false);
    const showQrcod = ref(false);
    const config = ref(route.meta.config);
    const locationHref = ref(location.href);
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
            images[i].addEventListener('click',async function(e) {
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
        if (config.value.path !== false) {
            htmlContent.value = await renderMarkdown(data);
        }
        postWords.value = data.length;
    }

    const toastIsDeveloper = async () => {
        showDraws.value = false;
        await showToast('正在开发中');
    };

    router.beforeEach(async (to, from, next) => {
        next();
        setTimeout(() => {
            try{
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
        },0);
    });

    const shareSelect = async (option) => {
        showShare.value = false;
        if (option.id == 'wechat') {
            await showToast('正在开发中');
        }

        if (option.id == 'weibo') {
            await showToast('正在开发中');
        }

        if (option.id == 'link') {
            await navigator.clipboard.writeText(location.href).then(
                async() => {
                    await showToast('复制链接成功');
                },(err) => showToast('复制链接失败')
            );
        }

        if (option.id == 'poster') {
            await showToast('正在开发中');
        }

        if (option.id == 'qrcode') {
            showQrcod.value = true;
        }
    }

    onMounted(async () => {
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
    });
    
    const shareOptions = [
        { id: 'wechat', name: '微信', icon: 'wechat' },
        { id: 'weibo', name: '微博', icon: 'weibo' },
        { id: 'link', name: '复制链接', icon: 'link' },
        { id: 'poster', name: '分享海报', icon: 'poster' },
        { id: 'qrcode', name: '二维码', icon: 'qrcode' },
    ];

    watch(config,(newValue,oldValue) => {
        document.title = config.value.name + ' - ' + siteConfig.global.site_title;
    });
    document.title = config.value.name + ' - ' + siteConfig.global.site_title;
</script>

<template>
    <div id="profile" :style="{ animation: 'article 1s' }" v-if="config.path !== false" :data-theme="Cookies.get('darkTheme') !== 'true' ? 'default' : 'dark'">
        <headerview class="active"/>
        <div id="article-head">
            <img class="cover-bg" v-lazy="config.image"/>
            <h1 class="cover-title">{{ config.name }}</h1>
        </div>
        <div id="markdown" class="markdown-post">
            <div class="markdown-body" :style="{ minHeight: '100%'  }">
                <section id="section" v-html="htmlContent"></section>
                <van-divider :style="{ color: 'var(--borderd-color)', borderColor: 'var(--borderd-color)', padding: '0 16px' }">全文结束</van-divider>
                <div id="post-tages">
                    <van-space align="baseline" :wrap="true" style="margin-top: 10px" :size="10">
                        <span class="tag" v-for="(tag,index) in config.tags" :key="index">
                            <span class="tag-text">{{ config.tags[index] }}</span>
                        </span>

                        <span class="tag" v-if="siteConfig.post.post_staticspa">
                            <span class="tag-text">全文共 {{ postWords }} 字</span>
                        </span>

                        <span class="tag" @click="showDraws = true" v-if="ReomEchoStore.isDeviceMobilePhone && siteConfig.post.post_graphsbtn">
                            <span class="tag-text">留下签名</span>
                        </span>

                        <span class="tag" @click="showShare = true" v-if="ReomEchoStore.isDeviceMobilePhone && siteConfig.post.post_sharebtn">
                            <span class="tag-text">分享作品</span>
                        </span>
                    </van-space>
                </div>
                <ArticleFoot v-if="siteConfig.post.post_copyright" :config="config"/>
                <CommentView/>
                <footerview />
            </div>
        </div>
        <van-back-top v-if="siteConfig.global.backtop_button"/>
    </div>
    
    <van-overlay :show="ReomEchoStore.imageLightBoxSta" @click="ReomEchoStore.setImageLightBoxSta(false)">
        <div class="wrapper">
            <img :src="ReomEchoStore.imageLightBoxSrc">
        </div>
    </van-overlay>
    <NotFounds v-if="config.path === false"/>
    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="shareOptions" @select="shareSelect" v-if="ReomEchoStore.isDeviceMobilePhone" />
    <van-popup v-if="ReomEchoStore.isDeviceMobilePhone" v-model:show="showQrcod" round position="bottom" :style="{ height: 'auto', padding: '15px' }" teleport="body">
        <vue-qr class="qrcode" :text="locationHref" :size="200" :autoColor="true" :colorDark="siteConfig.style.po_qrcode_color"></vue-qr>
    </van-popup>
    <van-popup v-if="ReomEchoStore.isDeviceMobilePhone" v-model:show="showDraws" round position="bottom" :style="{ height: 'auto', padding: '15px' }" teleport="body">
        <van-signature background-color="#eeeeee" @submit="toastIsDeveloper" pen-color="#ff0000" clear-button-text="清空签名"/>
    </van-popup>
</template>

<style>
    img.qrcode {
        margin: 0 auto;
        display: block!important;
    }

    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wrapper img {
        width: 100%;
        max-height: 65%;
        object-fit: cover;
        margin: auto !important;
    }

    .van-signature .van-signature__footer {
        margin-top: 15px;
    }
</style>