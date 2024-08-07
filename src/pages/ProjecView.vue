<!-- eslint-disable no-empty -->
<script setup>
    import "./assets/ProjecView.css"
    import utils from '@/scripts/utils'
    import { ref, onMounted } from 'vue'
    import axiostool from '@/scripts/axiostool'
    import NotDataView from "@/model/NotDataView.vue"

    const onReady = ref(true);
    const content = ref(null);
    const siteConfig = utils.siteConfig;
    const ReomEchoStore = utils.useReomEchoStore();
    const filePath = 'https://api.github.com/users/' + siteConfig.author.author_github + '/repos';

    const toRenderList = async (data) => content.value = data;onReady.value = false;
    onMounted(async () => await axiostool.sendHttpGet(filePath).then(async (data) => await toRenderList(data.data)));
</script>

<template>
    <div class="project-list" v-if="Array.isArray(content)">
        <div class="item-container" v-for="(item,index) in content" :key="index">
            <div class="project-item" v-wave="siteConfig.sundry.moused_wave && !ReomEchoStore.isDeviceMobilePhone" :style="{ backgroundColor: utils.returnRoundColor() }">
                <a class="project-link" :href="item.html_url" target="_blank">
                    <p class="project-name">{{ item.name }}</p>
                    <div class="project-info">
                        <i class="project-icon">
                            <svg t="1705371432945" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9841" width="16" height="16"><path d="M957.258525 404.23316c-3.78431-11.352931-13.589115-19.609609-25.458088-21.501764l-270.406182-41.799429L540.640349 82.394759c-5.332437-11.180917-16.513355-18.40551-28.898371-18.40551 0 0 0 0 0 0-12.385016 0-23.565933 7.052579-28.898371 18.40551l-121.78599 258.021166L90.135394 381.183269c-11.868974 1.720141-21.673778 9.976818-25.630102 21.32975s-1.032085 23.909961 7.396607 32.510667L268.342012 637.140265 221.38216 921.995632c-2.064169 12.040988 3.096254 24.25399 13.073072 31.306568 9.976818 7.052579 23.221905 7.740635 33.88678 1.892155L510.193852 822.227448l241.335797 133.826978c4.816395 2.580212 10.148833 3.956325 15.48127 3.956325 0.172014 0 0.516042 0 0.688056 0 17.717453 0 31.994625-14.277171 31.994625-31.994625 0-3.956325-0.688056-7.740635-2.064169-11.352931l-44.895683-278.662859 196.956157-201.256509C958.118596 428.143121 961.042836 415.586091 957.258525 404.23316z" fill="#ffffff" p-id="9842"></path></svg>
                        </i>
                        <span class="info-text">{{ item.stargazers_count }} starts</span>
                        <i class="project-icon">
                            <svg t="1705371491290" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12863" width="16" height="16"><path d="M288 64c70.692 0 128 57.308 128 128 0 58.192-38.833 107.315-91.998 122.867L324 571.5h225c48.8 0 84.134-19.864 110.1-62.009 15.655-25.408 27.76-58.805 36.092-100.127C648.71 390.177 616 344.408 616 291c0-70.692 57.308-128 128-128 70.692 0 128 57.308 128 128 0 62.814-45.245 115.06-104.923 125.925-9.94 52.391-25.407 95.81-46.677 130.334-38.644 62.721-96.365 95.58-169.189 96.231l-2.211 0.01H324l0.002 65.633c52.52 15.363 91.052 63.486 91.98 120.75L416 832c0 70.692-57.308 128-128 128-70.692 0-128-57.308-128-128 0-58.193 38.833-107.315 91.999-122.868V314.868C198.833 299.315 160 250.193 160 192c0-70.692 57.308-128 128-128z" fill="#ffffff" p-id="12864"></path></svg>
                        </i>
                        <span class="info-text">{{ item.forks_count }} forks</span>
                    </div>
                    <p class="project-desc" v-if="item.description === null">该项目暂无介绍</p>
                    <p class="project-desc" v-else>{{ item.description }}</p>
                    <div class="project-language" v-if="item.language === null">Other</div>
                    <div class="project-language" v-else>{{ item.language }}</div>
                </a>
            </div>
        </div>
    </div>
    <NotDataView v-else :description="'未查询到指定仓库的信息'"/>
</template>

<style>
    div.el-space {
        justify-content: space-between;
    }
</style>