
<!-- eslint-disable no-unused-vars -->

<script setup>
    import "../Settings.css"
    import utils from "@/scripts/utils"
    import { ref, reactive, onMounted } from "vue"
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"
    import { queryHomeConfig, submitConfigItem } from "@/admin/scripts/core"
    import { Picture as IconPicture, UploadFilled  } from '@element-plus/icons-vue'

    const ready = ref(true);
    const AdminEchoStore = useAdminEchoStore();

    const switchItem = ref([
        {
            data: 0,
            name: '关闭',
            value: 'close',
        },{
            data: 1,
            name: '开启',
            value: 'open',
        },
    ]);

    const post_listmode = ref([
        {
            data: 0,
            name: '双列显示',
            value: 'two'
        },{
            data: 1,
            name: '单列显示',
            value: 'one'
        }
    ]);

    const settingItem = reactive({
        post_recomms: '',
        post_eachnum: 10,
        post_listmode: '',
        index_header: '',
        post_polishing: '',
        index_refreshs: '',
        index_pc_carousel: '',
        index_mb_carousel: '',
        carousel_interval: 5000
    });

    const settingItemChange = async () => {
        await queryHomeConfig().then(() => {
            setTimeout(async () => {
                ready.value = false;
                settingItem.post_eachnum = Number(utils.findItemInArray(AdminEchoStore.config.homeConfig,'post_eachnum').item_value);
                settingItem.carousel_interval = Number(utils.findItemInArray(AdminEchoStore.config.homeConfig,'carousel_interval').item_value);
                settingItem.post_recomms = switchItem.value[utils.findItemInArray(AdminEchoStore.config.homeConfig,'post_recomms').item_value].value;
                settingItem.index_header = switchItem.value[utils.findItemInArray(AdminEchoStore.config.homeConfig,'index_header').item_value].value;
                settingItem.post_polishing = switchItem.value[utils.findItemInArray(AdminEchoStore.config.homeConfig,'post_polishing').item_value].value;
                settingItem.index_refreshs = switchItem.value[utils.findItemInArray(AdminEchoStore.config.homeConfig,'index_refreshs').item_value].value;
                settingItem.post_listmode = post_listmode.value[utils.findItemInArray(AdminEchoStore.config.homeConfig,'post_listmode').item_value].value;
                settingItem.index_pc_carousel = switchItem.value[utils.findItemInArray(AdminEchoStore.config.homeConfig,'index_pc_carousel').item_value].value;
                settingItem.index_mb_carousel = switchItem.value[utils.findItemInArray(AdminEchoStore.config.homeConfig,'index_mb_carousel').item_value].value;
            },500);
        });
    }

    onMounted(async () => await settingItemChange());

    const submitStyleConfig = async () => {
        let settingItemConfig = {...settingItem};
        settingItemConfig.post_recomms = switchItem.value.find(item => item.value == settingItemConfig.post_recomms).data;
        settingItemConfig.index_header = switchItem.value.find(item => item.value == settingItemConfig.index_header).data;
        settingItemConfig.post_polishing = switchItem.value.find(item => item.value == settingItemConfig.post_polishing).data;
        settingItemConfig.index_refreshs = switchItem.value.find(item => item.value == settingItemConfig.index_refreshs).data;
        settingItemConfig.post_listmode = post_listmode.value.find(item => item.value == settingItemConfig.post_listmode).data;
        settingItemConfig.index_pc_carousel = switchItem.value.find(item => item.value == settingItemConfig.index_pc_carousel).data;
        settingItemConfig.index_mb_carousel = switchItem.value.find(item => item.value == settingItemConfig.index_mb_carousel).data;
        await submitConfigItem(settingItemConfig,"/api/config/home/change").then(async () => await settingItemChange());
    }
</script>

<template>
    <div class="admin-page page-settings" v-loading="ready">
        <div class="setting-item">
            <el-space :size="30" wrap>
                <div class="item-box">
                    <a-typography-title :level="4">推荐文章</a-typography-title>
                    <el-select v-model="settingItem.post_recomms" placeholder="Select">
                        <el-option
                            v-for="item in switchItem"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">首页首屏</a-typography-title>
                    <el-select v-model="settingItem.index_header" placeholder="Select">
                        <el-option
                            v-for="item in switchItem"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">文章擦亮</a-typography-title>
                    <el-select v-model="settingItem.post_polishing" placeholder="Select">
                        <el-option
                            v-for="item in switchItem"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">刷新效果</a-typography-title>
                    <el-select v-model="settingItem.index_refreshs" placeholder="Select">
                        <el-option
                            v-for="item in switchItem"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">电脑轮播</a-typography-title>
                    <el-select v-model="settingItem.index_pc_carousel" placeholder="Select">
                        <el-option
                            v-for="item in switchItem"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">手机轮播</a-typography-title>
                    <el-select v-model="settingItem.index_mb_carousel" placeholder="Select">
                        <el-option
                            v-for="item in switchItem"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">显示模式</a-typography-title>
                    <el-select v-model="settingItem.post_listmode" placeholder="Select">
                        <el-option
                            v-for="item in post_listmode"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>
            </el-space>
        </div>

        <el-divider content-position="left">功能设置</el-divider>

        <div class="setting-item">
            <el-space :size="30" wrap>
                <div class="item-box">
                    <a-typography-title :level="4">每次加载文章数</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-input-number v-model="settingItem.post_eachnum" :min="1"/>
                    </div>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">轮播图切换间隔</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-input-number v-model="settingItem.carousel_interval" :step="1000" :min="1000" :max="100000" />
                    </div>
                </div>
            </el-space>
        </div>

        <el-divider content-position="left">轮播设置</el-divider>

        <a-float-button shape="square" type="primary" :style="{ right: '24px' }" @click="submitStyleConfig">
            <template #icon>
                <el-icon><UploadFilled /></el-icon>
            </template>
        </a-float-button>
    </div>
</template>