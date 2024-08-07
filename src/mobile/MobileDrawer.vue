<!-- eslint-disable no-undef -->

<script setup>
    import Icons from 'feather-icons'
    import utils from "@/scripts/utils"
    import { useRouter } from 'vue-router'
    import "@/assets/footbadge/FootBadge.css"
    import MobileSearch from "@/mobile/MobileSearch.vue"
    import MobileSocials from "@/mobile/MobileSocials.vue"
    import StaticMusicCard from "@/model/StaticMusicCard.vue"
    import MobileStatistics from "@/mobile/MobileStatistics.vue"
    
    const router = useRouter(),Cookies = utils.Cookies,siteConfig = utils.siteConfig,ReomEchoStore = utils.useReomEchoStore();

    const toggleTheme = async () => {
        const profile = document.querySelector(".main-layout");
        if (profile.getAttribute('data-theme') !== "dark") {
            profile.setAttribute("data-theme","dark");
            await ReomEchoStore.setDarksThemeStatus(true);
            Cookies.set('darkTheme', true ,{ expires: 30 });
        } else {
            profile.setAttribute("data-theme","default");
            await ReomEchoStore.setDarksThemeStatus(false);
            Cookies.set('darkTheme', false ,{ expires: 30 });
        }
    }

    const checkSiteHref = async () => {
        let links = Array.from(document.getElementsByTagName("a"));
        links.forEach(link => {
            if (link.href.includes(location.host)) {
                link.addEventListener("click",function (e) {
                    ReomEchoStore.setMobileDrawerStat(false).then(async () => e.preventDefault());
                    router.push(new URL(this.href).pathname).then(async () => {
                        await ReomEchoStore.resetSitePathName();
                        await ReomEchoStore.resizeWindowInitConfig();
                        document.querySelector('#Reomecho').scrollTo(0, 0);
                    }).catch(async () => {
                        await ElMessage({type: 'error',message: "系统功能异常！"});
                    });
                });
            }
        });
    }

</script>

<template>
    <el-drawer v-model="ReomEchoStore.mobileDrawerStat" :show-close="false" :destroy-on-close="false" :with-header="false" direction="ltr" size="80%" :title="siteConfig.global.site_title" class="mobile-side-bar" v-if="siteConfig.drawer.drawer_show && ReomEchoStore.isDeviceMobilePhone" @open="checkSiteHref">
        <div class="sidebar">
            <el-button class="side-bright-button" circle @click="toggleTheme">
                <svg t="1719290618206" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7855" width="18" height="18"><path d="M411.308373 114.801778c-43.804444 11.036444-85.390222 29.468444-123.050666 54.442666a417.393778 417.393778 0 0 0-97.962667 89.144889 406.357333 406.357333 0 0 0-64.398222 117.361778A403.683556 403.683556 0 0 0 102.515484 512c0 55.466667 10.808889 108.373333 32.426667 158.833778 21.617778 50.631111 50.744889 94.208 87.381333 130.844444a410.965333 410.965333 0 0 0 130.730667 87.324445c50.517333 21.617778 103.537778 32.426667 159.004445 32.426666 46.933333 0 92.330667-7.68 136.192-23.324444a403.683556 403.683556 0 0 0 117.418666-64.398222 418.759111 418.759111 0 0 0 89.144889-97.962667 400.668444 400.668444 0 0 0 54.442667-122.88c-11.434667 0.967111-24.462222 1.536-38.798222 1.536a449.308444 449.308444 0 0 1-178.744889-36.522667 467.285333 467.285333 0 0 1-146.944-98.417777 465.92 465.92 0 0 1-98.417778-147.057778A448.056889 448.056889 0 0 1 409.658596 153.6c0-14.336 0.568889-27.306667 1.592888-38.684444v-0.113778zM512.001707 0c11.548444 0 22.869333 0.455111 34.019555 1.308444A357.660444 357.660444 0 0 0 540.446151 292.864c18.944 44.202667 44.373333 82.318222 76.458667 114.346667a359.537778 359.537778 0 0 0 114.346666 76.344889A350.435556 350.435556 0 0 0 870.401707 512c52.792889 0 103.651556-11.377778 152.405333-34.019556a508.017778 508.017778 0 0 1-17.180444 169.984 509.44 509.44 0 0 1-51.427556 122.595556 510.862222 510.862222 0 0 1-80.213333 103.424 516.380444 516.380444 0 0 1-103.367111 80.213333 513.592889 513.592889 0 0 1-394.638223 51.427556 513.592889 513.592889 0 0 1-122.595555-51.427556 518.371556 518.371556 0 0 1-103.424-80.213333 511.089778 511.089778 0 0 1-80.156445-103.424 509.155556 509.155556 0 0 1-51.427555-122.595556A508.074667 508.074667 0 0 1 0.001707 512c0-46.364444 6.144-91.761778 18.375111-135.964444a508.928 508.928 0 0 1 51.427555-122.595556 511.317333 511.317333 0 0 1 80.213334-103.424 508.017778 508.017778 0 0 1 103.367111-80.213333A508.302222 508.302222 0 0 1 376.037262 18.375111 508.472889 508.472889 0 0 1 512.001707 0z" fill="#666666" p-id="7856"></path></svg>
            </el-button>
            <img class="side-out-image" v-lazy="siteConfig.drawer.drawer_image" draggable="false">
            <div class="side-out-autho drawer-card">
                <img class="avatar-image" v-lazy="siteConfig.author.author_avatar" :alt="siteConfig.author.author_name">
                <div class="author-infos">
                    <a class="author-link" :href="siteConfig.author.author_link">{{ siteConfig.author.author_name }}</a>
                    <p class="author-desc">{{ siteConfig.author.author_desc }}</p>
                </div>
            </div>

            <MobileSocials/>
            <div class="side-out-search drawer-card" v-if="siteConfig.drawer.drawer_search">
                <MobileSearch/>
            </div>
            <ul class="nav-list-mobile drawer-card">
                <li v-for="(item, index) in siteConfig.header.header_navlist" :key="index" class="nav-item">
                    <a :href="item.link" :target="item.target">
                        <svg width="18" height="18" viewBox="0 0 24 24" class="feather feather-code"  xmlns="http://www.w3.org/2000/svg" 
                            :fill="Icons.icons[item.featherIcon].attrs.fill" v-html="Icons.icons[item.featherIcon].toString()" :style="{ stroke: Icons.icons[item.featherIcon].attrs.stroke, color: item.iconFill }">
                        </svg>
                        <span class="item-name">{{ item.name }}</span>
                    </a>
                </li>
            </ul>
            <div class="side-out-music drawer-card" v-if="siteConfig.drawer.drawer_musicst">
                <StaticMusicCard :player="true"/>
            </div>
            <MobileStatistics/>
            <div class="side-out-footer drawer-card" v-if="siteConfig.drawer.drawer_footer" v-wave="siteConfig.sundry.moused_wave">
                <span class="github-badge" style="margin-bottom: 0;">
                    <span class="badge-subject">轻量博客框架开发</span>
                    <a href="https://xiaokolomi.cn/" target="_blank">
                        <span class="badge-value bg-green">Powered By Hua</span>
                    </a>
                </span>
            </div>
        </div>
    </el-drawer>
</template>

<style>
    @import "./assets/MobileDrawer.css";

    div#markdown img.avatar-love {
        margin: 10px 0;
    }

    div.love-time span.time {
        color: var(--dominColor)
    }
</style>