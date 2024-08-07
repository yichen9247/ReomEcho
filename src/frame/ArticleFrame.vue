
<!-- eslint-disable no-undef -->
<script setup>
    import Pace from 'pace-js'
    import "@/scripts/prints.min.js"
    import Icons from 'feather-icons'
    import { useRoute } from "vue-router"
    import { useTitle } from 'vue-hooks-plus'
    import utils from "@/scripts/utils.min.js"
    import { ref, onMounted, watch } from 'vue'
    import ArticleFoot from "@/model/ArticleFoot.vue"
    import NotDataView from "@/model/NotDataView.vue"
    import CommentView from "@/model/CommentView.vue"
    import SiteNotFounds from '@/model/SiteNotFounds.vue'
    import renderMarkdown from "@/scripts/markdown.min.js"
    
    let filePath = undefined;

    const Swal = utils.Swal;
    const postWords = ref(0);
    const config = ref(null);
    const route = useRoute();
    const toast = utils.toast;
    const axios = utils.axios;
    const showShare = ref(false);
    const showDraws = ref(false);
    const showQrcod = ref(false);
    const dataStatus = ref(false);
    const htmlContent = ref(null);
    const Cookies = utils.Cookies;
    const articleLock = ref(false);
    const siteConfig = utils.siteConfig;
    const locationHref = ref(location.href);
    const ReomEchoStore = utils.useReomEchoStore();
    const PostsEchoStore = utils.usePostsEchoStore();
    const defaultQrCodeColor = ref(siteConfig.style.po_qrcode_color);

    try {
        config.value = siteConfig.actives.find(item => item.path == route.params.alias).config;
        useTitle(siteConfig.actives.find(item => item.path == route.params.alias).config.name + ' - ' + siteConfig.global.site_title);
    } catch {
        config.value = undefined;
    }

    /**
     * Markdown渲染的图片灯箱效果
    */

    const checkImageClick = async () => {
        let images = document.querySelectorAll("img.post-block-image");
        for (var i = 0; i < images.length; i++) {
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

    const toRenderDominColor = async () => {
        if (siteConfig.sundry.dynamic_color) {
            Pace.on('done', async () => {
                await utils.toRenderDominColor(config.value.image).then(data => {
                    defaultQrCodeColor.value = data[0];
                    document.body.style.setProperty('--dominColor', data[0]);
                    document.body.style.setProperty('--buttoColor', `rgba(${data[1][0][0]},${data[1][0][1]},${data[1][0][2]},0.75)`);
                });
            });
        }
    };

    const toRenderMarkdown = async (data) => {
        if (config.value !== undefined) {
            htmlContent.value = renderMarkdown(data);postWords.value = data.length;
        }
        dataStatus.value = true
    }

    const toastIsDeveloper = async () => {
        showDraws.value = false;
        await utils.isDeveloper();
    };

    const shareSelect = async (option) => {
        showShare.value = false;
        if (option.id == 'wechat') {
            await utils.isDeveloper();
        }

        if (option.id == 'weibo') {
            await utils.isDeveloper();
        }

        if (option.id == 'link') {
            utils.writeClipBoardLink();
        }

        if (option.id == 'poster') {
            await utils.isDeveloper();
        }

        if (option.id == 'qrcode') {
            showQrcod.value = true;
        }
    }

    const letGetPostData = async () => {
        try {
            const response = await axios.get(filePath);
            await toRenderMarkdown(response.data).then(async () => await checkImageClick());
        } catch (e) {
            location.reload();
        }
    }

    const toUnlockArticle = async () => {
        let lockCookie = Cookies.get(`${config.value.path}-lock`);
        if (lockCookie != 'True') {
            articleLock.value = true;
            await Swal.fire({
                title: "需要解锁才能查看",
                input: "text",
                inputAttributes: {
                  autocapitalize: "off"
                },
                showCancelButton: true,
                cancelButtonText: "取消",
                showLoaderOnConfirm: true,
                confirmButtonText: "解锁查看",
                inputPlaceholder: "请输入解锁密码",
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: async (password) => await validPassword(password),
            });
        } else await toRenderArticle();
    }

    const validPassword = async (password) => {
        let realPassword = config.value.password;
        if (password == realPassword) {
            await toRenderArticle();
            articleLock.value = false;
            await ElMessage({type: 'success',message: "解锁文章成功！"});
            Cookies.set(`${config.value.path}-lock`, 'True', { expires: config.value.expires });
        } else {
            toUnlockArticle();
            await ElMessage({type: 'error',message: "密码错误！"});
        }
    }

    const toRenderArticle = async () => {
        await Promise.all([
            await letGetPostData(),
            await toRenderDominColor(),
            await ReomEchoStore.setIsHeaderBarShows(true)
        ]).then(async () => {});
        if (siteConfig.post.post_copynoti) utils.readUserCopyOption();
    }

    const renderArticle = async () => {
        filePath = '../../../docs/' +  route.params.alias + '/README.md';
        if (config.value !== undefined) {
            if (config.value.lock) {
                await toUnlockArticle();
            } else await toRenderArticle();
        } else {
            try {
                if (route.params.alias != '/' + siteConfig.actives.find(item => item.path == route.params.alias).path) toast.error('文章配置文件不存在！');
            } catch {
                config.value = undefined;
            }
        }
    }
    onMounted(async () => await renderArticle());
    
    watch(() => route.path,async () => {
        config.value = siteConfig.actives.find(item => item.path == route.params.alias).config;
        await renderArticle();
    });
    const printfArticlePost = async () => Print('.article-content', {});
</script>

<template>
    <div class="frame-container frame-article" v-if="config != undefined">
        <h1 class="article-title van-multi-ellipsis--l2">{{ config.name }}</h1>
        <div class="break-box">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <svg width="15" height="15" viewBox="0 0 24 24" class="feather feather-code"  xmlns="http://www.w3.org/2000/svg" 
                        :fill="Icons.icons['home'].attrs.fill" v-html="Icons.icons['home'].toString()" :style="{ stroke: Icons.icons['home'].attrs.stroke, color: '#000000' }">
                    </svg>首页
                </el-breadcrumb-item>
                <el-breadcrumb-item>文章正文</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="article-content">
            <van-skeleton class="headimg-skeleton" :loading="!dataStatus" v-if="ReomEchoStore.isDeviceMobilePhone">
                <template #template>
                  <div :style="{ display: 'flex', width: '100%' }">
                    <van-skeleton-image />
                  </div>
                </template>
                <div class="image-box">
                    <img class="article-image" v-lazy="config.image" draggable="false" :alt="config.name">
                </div>
            </van-skeleton>
    
            <el-skeleton style="width: 100%" :loading="!dataStatus" animated class="headimg-skeleton" v-else>
                <template #template>
                    <el-skeleton-item variant="image"/>
                </template>
                <template #default>
                    <div class="image-box">
                        <img class="article-image" v-lazy="config.image" draggable="false" :alt="config.name">
                    </div>
                </template>
            </el-skeleton>

            <div id="markdown" class="markdown-post" v-if="htmlContent != null">
                <div class="markdown-body" v-if="htmlContent != null">
                    <a-watermark :content="siteConfig.post.text_watermark" v-if="siteConfig.global.post_watermark">
                        <section id="section" v-html="htmlContent"></section>
                    </a-watermark>
                    <section id="section" v-else v-html="htmlContent"></section>
                </div>
            </div>

            <div class="markdown-body" :style="{ minHeight: '100%',marginTop: '35px' }" v-if="articleLock">
                <NotDataView v-if="articleLock" :description="'此文章需要解锁才能查看'" @click="toUnlockArticle"/>
            </div>
        </div>

        <div class="article-tags">
            <van-space align="baseline" :wrap="true" style="margin-top: 10px" :size="10">
                <span class="tag" v-for="(tag,index) in !ReomEchoStore.isDeviceMobilePhone ? config.tags : []" :key="index" v-wave="siteConfig.sundry.moused_wave">
                    <span class="tag-text">{{ config.tags[index] }}</span>
                </span>
            
                <span class="tag" v-if="siteConfig.post.post_staticspa && !ReomEchoStore.isDeviceMobilePhone" v-wave="siteConfig.sundry.moused_wave">
                    <span class="tag-text">全文共 {{ postWords }} 字</span>
                </span>
            
                <span class="tag" @click="printfArticlePost" v-if="!ReomEchoStore.isDeviceMobilePhone && siteConfig.post.post_printbtn" v-wave="siteConfig.sundry.moused_wave">
                    <span class="tag-text">打印文章</span>
                </span>
            
                <span class="tag" @click="showDraws = true" v-if="ReomEchoStore.isDeviceMobilePhone && siteConfig.post.post_graphsbtn" v-wave="siteConfig.sundry.moused_wave">
                    <span class="tag-text">留下签名</span>
                </span>

                <a-popover :overlay-inner-style="{ padding: 0 }" placement="top"  v-if="!ReomEchoStore.isDeviceMobilePhone && siteConfig.post.post_sharebtn">
                    <template #content>
                      <a-qrcode :value="locationHref" :color="defaultQrCodeColor" :bordered="false" />
                    </template>
                    <span class="tag" v-wave="siteConfig.sundry.moused_wave">
                        <span class="tag-text">分享文章</span>
                    </span>
                </a-popover>
            
                <span class="tag" @click="showShare = true" v-if="ReomEchoStore.isDeviceMobilePhone && siteConfig.post.post_sharebtn" v-wave="siteConfig.sundry.moused_wave">
                    <span class="tag-text">分享文章</span>
                </span>
            </van-space>
        </div>

        <ArticleFoot v-if="siteConfig.post.post_copyright" :config="config"/>
        <CommentView v-if="siteConfig.comment.comment_glba && config.comment && !ReomEchoStore.isSiLodingStatus"/>
    </div>
    
    <SiteNotFounds v-if="config === undefined" :description="'文章未找到'"/>
    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="PostsEchoStore.postShare" @select="shareSelect" v-if="ReomEchoStore.isDeviceMobilePhone" />
    <van-popup v-if="ReomEchoStore.isDeviceMobilePhone" v-model:show="showQrcod" round position="bottom" :style="{ height: 'auto', padding: '15px' }" teleport="body">
        <!-- <vue-qr class="qrcode" :text="locationHref" :size="200" :autoColor="true" :colorDark="siteConfig.style.po_qrcode_color"></vue-qr> -->
        <a-qrcode :size="185" :value="locationHref" :color="siteConfig.style.po_qrcode_color" :style="{ margin: '0 auto' }" />
    </van-popup>
    <van-popup v-if="ReomEchoStore.isDeviceMobilePhone" v-model:show="showDraws" round position="bottom" :style="{ height: 'auto', padding: '15px' }" teleport="body">
        <van-signature background-color="#eeeeee" @submit="toastIsDeveloper" pen-color="#ff0000" clear-button-text="清空签名"/>
    </van-popup>
</template>

<style>
    @import url("./assets/ArticleFrame.css");
    
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