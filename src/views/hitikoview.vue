<script setup>
    import "@/views/assets/hitikoview.css"

    const config = defineProps({
        config: Object
    });

    const scrollToMain = async () => {
        const main = document.getElementById('markdown');
        main.scrollIntoView({ behavior: 'smooth' });
    }
    const openSocalSite = async (socalSite) => open(socalSite, '_blank');
</script>

<template>
    <div class="hitokoto-box">
        <p>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.19em" height="1em" viewBox="0 0 1664 1408" data-icon="fa:quote-left" class="iconify"><path fill="currentColor" d="M768 832v384q0 80-56 136t-136 56H192q-80 0-136-56T0 1216V512q0-104 40.5-198.5T150 150T313.5 40.5T512 0h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136m896 0v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136V512q0-104 40.5-198.5T1046 150t163.5-109.5T1408 0h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136"></path></svg>
            <p class="desctext">{{ config.config.descText }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.19em" height="1em" viewBox="0 0 1664 1408" data-icon="fa:quote-right" class="iconify"><path fill="currentColor" d="M768 192v704q0 104-40.5 198.5T618 1258t-163.5 109.5T256 1408h-64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64q106 0 181-75t75-181v-32q0-40-28-68t-68-28H192q-80 0-136-56T0 576V192q0-80 56-136T192 0h384q80 0 136 56t56 136m896 0v704q0 104-40.5 198.5T1514 1258t-163.5 109.5T1152 1408h-64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64q106 0 181-75t75-181v-32q0-40-28-68t-68-28h-224q-80 0-136-56t-56-136V192q0-80 56-136t136-56h384q80 0 136 56t56 136"></path></svg>
        </p>
        <div class="top-social">
            <div class="left-side side">
                <svg t="1704802491009" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1415" width="28" height="28"><path d="M161.1 511.2l373.6-373.6c26.4-26.4 61-39.5 95.6-39.5 34.6 0 69.2 13.2 95.6 39.5 52.7 52.7 52.7 138.5 0 191.2L400.4 654.3c-10.3 10.3-27 10.3-37.3 0-10.3-10.3-10.3-27 0-37.3l325.4-325.4c32.2-32.2 32.2-84.5 0-116.6-32.2-32.2-84.5-32.2-116.6 0L198.4 548.5M630.3 98.1" fill="#2197EF" p-id="1416"></path><path d="M371 375.9l341.2 341.2c42.5 42.5 42.5 111.4 0 153.9s-111.4 42.5-153.9 0L217 529.9" fill="#CEE8FA" p-id="1417"></path><path d="M198.4 548.5l336.3 336.3c25.5 25.5 59.5 39.6 95.6 39.6 36.1 0 70.1-14.1 95.6-39.6 52.7-52.7 52.7-138.5 0-191.2L389.6 357.3m-74.6 0l17.4 17.4 19.8 19.8 336.3 336.3c32.2 32.2 32.2 84.5 0 116.6-15.6 15.6-36.3 24.2-58.3 24.2s-42.7-8.6-58.3-24.2L235.7 511.2l-20.5-20.5-16.7-16.7" fill="#2197EF" p-id="1418"></path></svg>
            </div>
            <ul class="social-list">
                <el-space :size="16">
                    <li class="icon-box" v-for="(item,index) in config.config.socialIcon.left" @click="() => openSocalSite(item.link)" v-html="item.icon"></li>
                    <el-button type="primary" class="social-button" color="#626aef" @click="scrollToMain">{{ config.config.buttonText }}</el-button>
                    <li class="icon-box" v-for="(item,index) in config.config.socialIcon.right" @click="() => openSocalSite(item.link)" v-html="item.icon"></li>
                </el-space>
            </ul>
            
            <div class="right-side side">
                <svg t="1704802681604" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1619" width="28" height="28"><path d="M836.8 551.2L462 176.4c-32.3-32.3-84.8-32.3-117 0-32.3 32.3-32.3 84.8 0 117L671.5 620c10.3 10.3 10.3 27.1 0 37.4-10.3 10.3-27.1 10.3-37.4 0L307.6 330.8c-52.9-52.9-52.9-139 0-191.8 26.4-26.4 61.2-39.7 95.9-39.7s69.5 13.2 95.9 39.7l374.8 374.8M403.5 99.3" fill="#2197EF" p-id="1620"></path><path d="M818.1 532.5L475.8 874.9c-42.6 42.6-111.8 42.6-154.4 0-42.7-42.6-42.7-111.8 0-154.4l342.4-342.4" fill="#CEE8FA" p-id="1621"></path><path d="M645 359.4L307.6 696.8c-52.9 52.9-52.9 139 0 191.8 25.6 25.6 59.7 39.7 95.9 39.7s70.3-14.1 95.9-39.7l337.4-337.4m0-74.8L820 493.2l-20.6 20.6L462 851.2c-15.6 15.6-36.4 24.2-58.5 24.2s-42.9-8.6-58.5-24.2c-32.3-32.3-32.3-84.8 0-117l337.4-337.4 19.9-19.9 17.5-17.5" fill="#2197EF" p-id="1622"></path></svg>
            </div>
        </div>
    </div>
</template>