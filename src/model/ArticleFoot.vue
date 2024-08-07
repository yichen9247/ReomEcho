<script setup>
    import utils from "@/scripts/utils.js"
    const docLocation = location.href,siteConfig = utils.siteConfig,config = defineProps({ config: Object });
</script>

<template>
    <div id="post-copyright">
        <div class="post-copyright">
            <p class="copy-text">标题：{{ config.config.name }}</p>
            <p class="copy-text">作者：{{ siteConfig.author.author_name }}</p>
            <p class="copy-text">链接：
                <a :href="docLocation">{{ docLocation }}</a>
            </p>
            <p class="copy-text">许可协议：
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a>
            </p>
        </div>
        <div class="creative-commons-mark"></div>
    </div>
</template>

<style>
    @import url("./assets/ArticleFoot.css");
</style>