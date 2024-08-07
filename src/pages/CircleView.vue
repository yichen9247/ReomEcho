
<script setup>
    import utils from '@/scripts/utils'
    import { onMounted, ref, watch } from 'vue'
    import axiostool from '@/scripts/axiostool'
    import NotDataView from '@/model/NotDataView.vue'

    const list = ref([]);
    const siteConfig = utils.siteConfig;
    const statics = ref({ error_num: 0, active_num: 0, article_num: 0, friends_num: 0, last_updated_time: "2024-01-01" });

    onMounted(async () => {
        await axiostool.sendHttpGet(siteConfig.circle.serverAdress + '/all').then(async (data) => {
            list.value = data.data.article_data;
            statics.value = data.data.statistical_data;
            postArray.value = list.value.slice(0,postIndex.value);
        });
    });

    const postIndex = ref(siteConfig.circle.eachItem);
    const postArray = ref(list.value.reverse().slice(0,postIndex.value));
    
    watch(postIndex,async () => postArray.value = list.value.slice(0,postIndex.value));
    const currentChange = async (page) => { await utils.backToTop();postArray.value = list.value.reverse().slice((page - 1) * postArray.value,postIndex.value) }
</script>

<template>
    <div class="circle-statics">
        <div class="statics-list">
            <div class="statics-item">
                <p class="statics-title">订阅</p>
                <p class="statics-number">{{ statics.friends_num }}</p>
            </div>

            <div class="statics-item">
                <p class="statics-title">活跃</p>
                <p class="statics-number">{{ statics.active_num }}</p>
            </div>

            <div class="statics-item">
                <p class="statics-title">文章</p>
                <p class="statics-number">{{ statics.article_num }}</p>
            </div>
        </div>

        <div class="statics-update">
            <p class="update-text">
                最后更新于
                <span class="update-time">{{ statics.last_updated_time }}</span>
            </p>
        </div>
    </div>

    <ul class="circle-list" v-if="postArray.length > 0">
        <li class="circle-item" v-for="(item,inedx) in postArray" :key="inedx">
            <a class="circle-link" :href="item.link" :title="item.title" target="_blank">
                <div class="cover-box">
                    <img v-lazy="item.avatar" class="circle-image" draggable="false">
                </div>

                <div class="circle-content">
                    <p class="circle-title van-multi-ellipsis--l2">{{ item.title }}</p>
                    <p class="content-footer">
                        <div class="footer-box">
                            <svg t="1719741798615" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2461" width="18" height="18"><path d="M858.477714 763.611429a373.979429 373.979429 0 0 0-80.603428-119.515429 375.661714 375.661714 0 0 0-119.442286-80.603429l-1.243429-0.512a247.954286 247.954286 0 1 0-290.377142 0.073143l-1.243429 0.512a372.370286 372.370286 0 0 0-119.442286 80.603429 375.661714 375.661714 0 0 0-110.153143 257.609143 8.045714 8.045714 0 0 0 8.045715 8.192h59.977143a8.045714 8.045714 0 0 0 8.045714-7.753143 298.130286 298.130286 0 0 1 87.771428-204.288A297.984 297.984 0 0 1 512 610.011429c80.164571 0 155.501714 31.158857 212.187429 87.917714a298.130286 298.130286 0 0 1 87.771428 204.288c0.146286 4.388571 3.657143 7.753143 8.045714 7.753143h59.977143a8.045714 8.045714 0 0 0 8.045715-8.192 372.662857 372.662857 0 0 0-29.549715-138.24zM512 533.942857a170.861714 170.861714 0 0 1-121.563429-50.322286 170.861714 170.861714 0 0 1-50.468571-121.636571c0-45.860571 17.92-89.088 50.468571-121.563429A170.861714 170.861714 0 0 1 512 189.952c45.933714 0 89.088 17.92 121.563429 50.468571 32.548571 32.475429 50.468571 75.702857 50.468571 121.563429 0 45.933714-17.92 89.088-50.468571 121.636571A170.861714 170.861714 0 0 1 512 533.942857z" fill="#363636" p-id="2462"></path></svg>
                            <span class="footer-text">{{ item.author }}</span>
                        </div>
                        <div class="footer-box van-ellipsis">
                            <svg t="1719742193193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6162" width="18" height="18"><path d="M512 74.666667C270.464 74.666667 74.666667 270.464 74.666667 512S270.464 949.333333 512 949.333333 949.333333 753.536 949.333333 512 753.536 74.666667 512 74.666667z m0 64c206.186667 0 373.333333 167.146667 373.333333 373.333333S718.186667 885.333333 512 885.333333 138.666667 718.186667 138.666667 512 305.813333 138.666667 512 138.666667z" fill="#363636" p-id="6163"></path><path d="M480 149.333333h64v106.666667h-64zM256 469.333333v64H149.333333v-64zM480 768h64v106.666667h-64zM874.666667 469.333333v64h-106.666667v-64z" fill="#363636" p-id="6164"></path><path d="M512 288a32 32 0 0 1 31.850667 28.928L544 320v213.333333c0 25.088-27.349333 40.064-48.298667 27.541334l-2.304-1.493334-149.333333-106.666666a32 32 0 0 1 34.602667-53.76l2.602666 1.664 98.730667 70.528V320a32 32 0 0 1 28.928-31.850667L512 288z" fill="#363636" p-id="6165"></path></svg>
                            <span class="footer-text">{{ item.created }}</span>
                        </div>
                    </p>
                </div>
            </a>
        </li>
    </ul>
    <NotDataView description="暂无更多数据惹" v-if="postArray.length === 0" style="border: none" />

    <div class="load-more-circle" v-if="postArray.length > 0">
        <el-pagination size="small" background layout="prev, pager, next" :total="list.length" class="mt-4" :hide-on-single-page="true"  :page-size="postIndex" @current-change="currentChange"/>
    </div>
</template>

<style>
    @import url("./assets/CircleView.css");
</style>