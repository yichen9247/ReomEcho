<script setup>
    import Valine from 'valine'
    import "./assets/CommentView.css"
    import { onMounted, ref } from 'vue'
    import emojeList from '@/scripts/emojeList'
    import siteConfig from "../../../docs/main.js"

    if (siteConfig.comment.comment_styl == 1) {
        import('./assets/comment/style1.css');
    }

    if (siteConfig.comment.comment_styl == 2) {
        import('./assets/comment/style2.css');
    }

    if (siteConfig.comment.comment_styl == 3) {
        import('./assets/comment/style3.css');
    }

    const commentContainer = ref(null);

    onMounted(() => {
        if (commentContainer.value && siteConfig.comment.comment_type == 'Valine') {
            new Valine(siteConfig.comment.valine_emoje ? {
                recordIP: true,enableQQ: true,
                pageSize: siteConfig.comment.comment_psiz,
                path: location.pathname,emojiMaps: emojeList,
                el: commentContainer.value,
                requiredFields: ['nick','mail'],
                appId: siteConfig.comment.valine_appid, 
                appKey: siteConfig.comment.valine_appkey,
                emojiCDN: "https://i0.hdslb.com/bfs/emote/",
                placeholder: siteConfig.comment.comment_placehoter,
            } : {
                recordIP: true,enableQQ: true,
                pageSize: siteConfig.comment.comment_psiz,
                path: location.pathname,
                el: commentContainer.value,
                requiredFields: ['nick','mail'],
                appId: siteConfig.comment.valine_appid, 
                appKey: siteConfig.comment.valine_appkey,
                placeholder: siteConfig.comment.comment_placehoter,
            });
        }
    });
</script>

<template>
    <div ref="commentContainer" id="comment-box"></div>
</template>