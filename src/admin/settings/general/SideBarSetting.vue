
<!-- eslint-disable no-unused-vars -->

<script setup>
    import "../Settings.css"
    import utils from "@/scripts/utils"
    import { ref, reactive, onMounted } from "vue"
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"
    import { queryActivesConfig, submitConfigItem } from "@/admin/scripts/core"
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

    const settingItem = reactive({
        post_copynoti: '',
        post_printbtn: '',
        post_sharebtn: '',
        post_copyright: '',
        post_staticspa: '',
        post_graphsbtn: '',
        code_highlight: '',
        post_watermark: ''
    });

    const settingItemChange = async () => {
        await queryActivesConfig().then(() => {
            setTimeout(async () => {
                ready.value = false;
                settingItem.post_copynoti = switchItem.value[utils.findItemInArray(AdminEchoStore.config.activConfig,'post_copynoti').item_value].value;
                settingItem.post_printbtn = switchItem.value[utils.findItemInArray(AdminEchoStore.config.activConfig,'post_printbtn').item_value].value;
                settingItem.post_sharebtn = switchItem.value[utils.findItemInArray(AdminEchoStore.config.activConfig,'post_sharebtn').item_value].value;
                settingItem.post_copyright = switchItem.value[utils.findItemInArray(AdminEchoStore.config.activConfig,'post_copyright').item_value].value;
                settingItem.post_staticspa = switchItem.value[utils.findItemInArray(AdminEchoStore.config.activConfig,'post_staticspa').item_value].value;
                settingItem.post_graphsbtn = switchItem.value[utils.findItemInArray(AdminEchoStore.config.activConfig,'post_graphsbtn').item_value].value;
                settingItem.code_highlight = switchItem.value[utils.findItemInArray(AdminEchoStore.config.activConfig,'code_highlight').item_value].value;
                settingItem.post_watermark = switchItem.value[utils.findItemInArray(AdminEchoStore.config.activConfig,'post_watermark').item_value].value;
            },500);
        });
    }

    onMounted(async () => await settingItemChange());

    const submitStyleConfig = async () => {
        let settingItemConfig = {...settingItem};
        settingItemConfig.post_copynoti = switchItem.value.find(item => item.value == settingItemConfig.post_copynoti).data;
        settingItemConfig.post_printbtn = switchItem.value.find(item => item.value == settingItemConfig.post_printbtn).data;
        settingItemConfig.post_sharebtn = switchItem.value.find(item => item.value == settingItemConfig.post_sharebtn).data;
        settingItemConfig.post_copyright = switchItem.value.find(item => item.value == settingItemConfig.post_copyright).data;
        settingItemConfig.post_staticspa = switchItem.value.find(item => item.value == settingItemConfig.post_staticspa).data;
        settingItemConfig.post_graphsbtn = switchItem.value.find(item => item.value == settingItemConfig.post_graphsbtn).data;
        settingItemConfig.code_highlight = switchItem.value.find(item => item.value == settingItemConfig.code_highlight).data;
        settingItemConfig.post_watermark = switchItem.value.find(item => item.value == settingItemConfig.post_watermark).data;
        await submitConfigItem(settingItemConfig,"/api/config/actives/change").then(async () => await settingItemChange());
    }
</script>

<template>
    <div class="admin-page page-settings" v-loading="ready">
        <el-divider content-position="left">手机端</el-divider>

        <div class="setting-item">
            <el-space :size="30" wrap>
                
            </el-space>
        </div>

        <el-divider content-position="left">电脑端</el-divider>

        <a-float-button shape="square" type="primary" :style="{ right: '24px' }" @click="submitStyleConfig">
            <template #icon>
                <el-icon><UploadFilled /></el-icon>
            </template>
        </a-float-button>
    </div>
</template>