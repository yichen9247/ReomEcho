
<script setup>
    import Icons from 'feather-icons'
    import utils from "@/scripts/utils.min.js"
    const siteConfig = utils.siteConfig,ReomEchoStore = utils.useReomEchoStore();
</script>

<template>
    <div class="aside-container">
        <div class="author-box">
            <img class="background" v-lazy="siteConfig.author.author_background" draggable="false" alt="background">
            <div class="user-box">
                <img class="avatar" v-lazy="siteConfig.author.author_avatar" :alt="siteConfig.author.author_name" draggable="false" :title="siteConfig.author.author_name">
                <a class="username" :href="siteConfig.author.author_link">{{ siteConfig.author.author_name }}</a>
            </div>
        </div>

        <div class="nav-box">
            <ul class="nav-list">
                <li v-for="(item, index) in siteConfig.header.header_navlist" :key="index" :class="ReomEchoStore.sitePathNameStatus == item.link ? 'nav-item item-active' : 'nav-item'">
                    <a :href="item.link" :target="item.target">
                        <svg width="18" height="18" viewBox="0 0 24 24" class="feather feather-code"  xmlns="http://www.w3.org/2000/svg" 
                            :fill="Icons.icons[item.featherIcon].attrs.fill" v-html="Icons.icons[item.featherIcon].toString()" :style="{ stroke: Icons.icons[item.featherIcon].attrs.stroke, color: item.iconFill }">
                        </svg>
                        <span class="item-name">{{ item.name }}</span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="footer-box">
            <span class="footer-item" @click="utils.isDeveloper">
                <el-tooltip effect="dark" content="评论" placement="top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </el-tooltip>
            </span>
            <span class="footer-item" @click="utils.openRssFeedPage">
                <el-tooltip effect="dark" content="文章" placement="top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rss"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
                </el-tooltip>
            </span>
            <span class="footer-item" @click="utils.openAdminPage">
                <el-tooltip effect="dark" content="后台" placement="top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </el-tooltip>
            </span>
        </div>
    </div>
</template>

<style>
    @import url("./assets/AsideLayout.css");
</style>