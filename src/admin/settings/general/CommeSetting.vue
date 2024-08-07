
<!-- eslint-disable no-unused-vars -->

<script setup>
    import "../Settings.css"
    import utils from "@/scripts/utils"
    import { ref, reactive, onMounted } from "vue"
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"
    import { queryCommentConfig, submitConfigItem } from "@/admin/scripts/core"
    import { Picture as IconPicture, UploadFilled  } from '@element-plus/icons-vue'

    const ready = ref(true);
    const AdminEchoStore = useAdminEchoStore();

    const comment_style = ref([
        {
            data: 1,
            name: '样式一',
            value: 'one',
        },{
            data: 2,
            name: '样式二',
            value: 'two',
        },{
            data: 3,
            name: '样式三',
            value: 'three',
        },{
            data: 4,
            name: '样式四',
            value: 'four',
        },{
            data: 5,
            name: '样式五',
            value: 'five',
        },{
            data: 6,
            name: '样式六',
            value: 'six',
        },
    ]);

    const comment_types = ref([
        {
            data: 1,
            name: 'Valine',
            value: 'Valine',
        },{
            data: 2,
            name: 'Twikoo',
            value: 'Twikoo',
        }
    ]);

    const settingItem = reactive({
        comment_psize: 5,
        comment_glbal: false,
        valine_emojes: false,

        comment_style: '',
        comment_types: '',
        valine_appids: '',
        valine_appkey: '',
        twikoo_envids: '',
        comment_place: '',
    });

    const settingItemChange = async () => {
        await queryCommentConfig().then(() => {
            setTimeout(async () => {
                ready.value = false;
                settingItem.valine_appids = utils.findItemInArray(AdminEchoStore.config.commeConfig,'valine_appids').item_value;
                settingItem.valine_appkey = utils.findItemInArray(AdminEchoStore.config.commeConfig,'valine_appkey').item_value;
                settingItem.twikoo_envids = utils.findItemInArray(AdminEchoStore.config.commeConfig,'twikoo_envids').item_value;
                settingItem.comment_place = utils.findItemInArray(AdminEchoStore.config.commeConfig,'comment_place').item_value;
                settingItem.comment_types = utils.findItemInArray(AdminEchoStore.config.commeConfig,'comment_types').item_value;
                settingItem.comment_psize = Number(utils.findItemInArray(AdminEchoStore.config.commeConfig,'comment_psize').item_value);
                settingItem.comment_glbal = Boolean(Number(utils.findItemInArray(AdminEchoStore.config.commeConfig,'comment_glbal').item_value));
                settingItem.valine_emojes = Boolean(Number(utils.findItemInArray(AdminEchoStore.config.commeConfig,'valine_emojes').item_value));
                settingItem.comment_style = comment_style.value[utils.findItemInArray(AdminEchoStore.config.commeConfig,'comment_style').item_value - 1].value;
            },500);
        });
    }

    onMounted(async () => await settingItemChange());

    const submitStyleConfig = async () => {
        let settingItemConfig = {...settingItem};
        settingItemConfig.comment_glbal = Number(settingItemConfig.comment_glbal);
        settingItemConfig.valine_emojes = Number(settingItemConfig.valine_emojes);
        settingItemConfig.comment_style = comment_style.value.find(item => item.value == settingItemConfig.comment_style).data;
        await submitConfigItem(settingItemConfig,"/api/config/comment/change").then(async () => await settingItemChange());
    }
</script>

<template>
    <div class="admin-page page-settings" v-loading="ready">
        <div class="setting-item">
            <el-space :size="30" wrap>
                <div class="item-box">
                    <a-typography-title :level="4">评论样式</a-typography-title>
                    <el-select v-model="settingItem.comment_style" placeholder="Select">
                        <el-option
                            v-for="item in comment_style"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">评论系统</a-typography-title>
                    <el-select v-model="settingItem.comment_types" placeholder="Select">
                        <el-option
                            v-for="item in comment_types"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>
            </el-space>
        </div>

        <el-divider content-position="left">关键设置</el-divider>

        <div class="setting-item">
            <el-space :size="30" wrap>
                <div class="item-box">
                    <a-typography-title :level="4">Valine AppId</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-input class="color-input" v-model="settingItem.valine_appids" style="width: 203px;" placeholder="Please input"/>
                    </div>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">Valine AppKey</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-input class="color-input" v-model="settingItem.valine_appkey" style="width: 203px;" placeholder="Please input"/>
                    </div>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">Twikoo EnvId</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-input class="color-input" v-model="settingItem.twikoo_envids" style="width: 203px;" placeholder="Please input"/>
                    </div>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">Comment Placehoter</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-input class="color-input" v-model="settingItem.comment_place" style="width: 203px;" placeholder="Please input"/>
                    </div>
                </div>
            </el-space>
        </div>

        <el-divider content-position="left">功能设置</el-divider>

        <div class="setting-item">
            <el-space :size="30" wrap class="line">
                <div class="item-box" style="margin-bottom:1em;">
                    <div style="display:inline-flex;align-items:center;margin-right: 20px;">
                        <el-tooltip class="box-item" effect="dark" content="可全局控制评论的开关" placement="bottom">
                            <a-typography-title :level="4" style="margin-bottom:2px;margin-right: 10px">全局启用评论</a-typography-title>
                        </el-tooltip>
                        <el-switch v-model="settingItem.comment_glbal" size="large" />
                    </div>
                    
                    <div style="display:inline-flex;align-items:center;margin-right: 20px;">
                        <el-tooltip class="box-item" effect="dark" content="开启后可使用更多表情包" placement="bottom">
                            <a-typography-title :level="4" style="margin-bottom:2px;margin-right: 10px">启用更多表情</a-typography-title>
                        </el-tooltip>
                        <el-switch v-model="settingItem.valine_emojes" size="large" />
                    </div>
                </div>
            </el-space>
        </div>

        <el-divider content-position="left">页面设置</el-divider>

        <div class="setting-item">
            <el-space :size="30" wrap>
                <div class="item-box">
                    <a-typography-title :level="4">每页评论条数</a-typography-title>
                    <el-input-number v-model="settingItem.comment_psize" :min="5" />
                </div>
            </el-space>
        </div>

        <a-float-button shape="square" type="primary" :style="{ right: '24px' }" @click="submitStyleConfig">
            <template #icon>
                <el-icon><UploadFilled /></el-icon>
            </template>
        </a-float-button>
    </div>
</template>