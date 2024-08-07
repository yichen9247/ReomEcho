<!-- eslint-disable no-undef -->
<script setup>
    import Artalk from 'artalk'
    import "./assets/CommentView.css"
    import utils from '@/scripts/utils'
    import { onMounted, ref, onUnmounted } from 'vue'
    import { Waline } from '@waline/client/component'
    import emojeList from '@/scripts/emojeList.min.js'

    const commentContainer = ref(null);
    const Valine = utils.Valine,siteConfig = utils.siteConfig;
    let artalk, pathName = location.hostname + '/' + location.pathname;

    const valineInit = async () => {
        if (commentContainer.value && siteConfig.comment.comment_type == 'Valine') {
            valineContainer = new Valine(siteConfig.comment.valine_emoje ? {
                recordIP: true,enableQQ: true,
                emojiMaps: emojeList,
                el: commentContainer.value,
                requiredFields: ['nick','mail'],
                lang: siteConfig.comment.comment_lang,
                appId: siteConfig.comment.valine_appid, 
                appKey: siteConfig.comment.valine_appkey,
                pageSize: siteConfig.comment.comment_psiz,
                emojiCDN: "https://i0.hdslb.com/bfs/emote/",
                path: location.hostname + '/' + location.pathname,
                placeholder: siteConfig.comment.comment_placehoter,
            } : {
                recordIP: true,enableQQ: true,
                pageSize: siteConfig.comment.comment_psiz,
                path: location.pathname,
                el: commentContainer.value,
                requiredFields: ['nick','mail'],
                lang: siteConfig.comment.comment_lang,
                appId: siteConfig.comment.valine_appid, 
                appKey: siteConfig.comment.valine_appkey,
                placeholder: siteConfig.comment.comment_placehoter,
            });
        }
    }

    onMounted(async () => {
        await valineInit();
        await artalkInit();
        await walineInit();
    });

    const walineInit = async () => {
        if (siteConfig.comment.comment_type == 'Waline') import('@waline/client/style');
    }

    const artalkInit = async () => {
        if (commentContainer.value && siteConfig.comment.comment_type == 'Artalk') {
            import('artalk/dist/Artalk.css');
            artalk = Artalk.init({
                el: commentContainer.value,
                pageTitle: `${document.title}`,
                site: siteConfig.global.site_title,
                server: siteConfig.comment.artalk_server,
                placeholder: siteConfig.comment.comment_placehoter,
                pageKey: location.hostname + '/' + location.pathname,
            })
        }
    }

    const twikooInit = async () => {
        if (siteConfig.comment.comment_type == 'Twikoo') {
            setTimeout(() => twikoo.init({ 
                el: '#comment-twikoo',
                lang: siteConfig.comment.comment_lang,
                envId: siteConfig.comment.twikoo_envid,
                path: location.hostname + '/' + location.pathname
            },100));
            import('@/assets/twikoo/twikoo.css');

            if (siteConfig.comment.comment_styl == 1) {
                import('./comment/style1.css');
            }

            if (siteConfig.comment.comment_styl == 2) {
                import('./comment/style2.css');
            }

            if (siteConfig.comment.comment_styl == 3) {
                import('./comment/style3.css');
            }

            if (siteConfig.comment.comment_styl == 4) {
                import('./comment/style4.css');
            }

            if (siteConfig.comment.comment_styl == 5) {
                import('./comment/style5.css');
            }

            if (siteConfig.comment.comment_styl == 6) {
                import('./comment/style6.css');
            }
        }
    }

    onUnmounted(() => {
        if (commentContainer.value && siteConfig.comment.comment_type == 'Artalk') artalk.destroy();
    });
</script>

<template>
    <div class="comment-model">
        <div ref="commentContainer" id="comment-artalk" v-if="siteConfig.comment.comment_type == 'Artalk'"></div>
        <div ref="commentContainer" id="comment-valine" v-if="siteConfig.comment.comment_type == 'Valine'"></div>
        <div ref="commentContainer" id="comment-twikoo" v-if="siteConfig.comment.comment_type == 'Twikoo'"></div>
        <component :is="'script'" async src="/twikoo/twikoo.min.js" ref="twikooJs" @load="twikooInit" v-if="siteConfig.comment.comment_type == 'Twikoo'"></component>
        <Waline :lang="siteConfig.comment.comment_lang" :serverURL="siteConfig.comment.waline_server" :path="pathName" :copyright="false" :reaction="siteConfig.comment.waline_reaction" :pageSize="siteConfig.comment.comment_psiz" :wordLimit="siteConfig.comment.comment_maxs" :login="siteConfig.comment.waline_login" v-if="siteConfig.comment.comment_type == 'Waline'"/>
    </div>
</template>