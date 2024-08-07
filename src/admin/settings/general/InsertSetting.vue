

<!-- eslint-disable no-unused-vars -->

<script setup>
    import "../Settings.css"
    import utils from "@/scripts/utils"
    import { ref, reactive, onMounted } from "vue"
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"
    import { queryInertCodeConfig, submitConfigItem } from "@/admin/scripts/core"
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
        insert_styles: '',
        insert_footer: '',
        insert_javascript: ''
    });

    const settingItemChange = async () => {
        await queryInertCodeConfig().then(() => {
            setTimeout(async () => {
                ready.value = false;
                settingItem.insert_styles = utils.findItemInArray(AdminEchoStore.config.inserConfig,'insert_styles').item_value.trim();
                settingItem.insert_footer = utils.findItemInArray(AdminEchoStore.config.inserConfig,'insert_footer').item_value.trim();
                settingItem.insert_javascript = utils.findItemInArray(AdminEchoStore.config.inserConfig,'insert_javascript').item_value.trim();
            },500);
        });
    }

    onMounted(async () => await settingItemChange());

    const submitStyleConfig = async () => {
        let settingItemConfig = {...settingItem};
        await submitConfigItem(settingItemConfig,"/api/config/insertcode/change").then(async () => await settingItemChange());
    }
</script>

<template>
    <div class="admin-page page-settings" v-loading="ready">
        <t-alert style="width:520px;margin-bottom:2em;" theme="info" message="为了安全起见，无需编写标签，直接写标签里面的代码即可" />
        <div class="setting-item">
            <div class="item-box">
                <a-typography-title :level="4">全局注入样式</a-typography-title>
                <el-input class="insert-coder" v-model="settingItem.insert_styles" style="width: 520px;" :autosize="{ minRows: 8, maxRows: 10 }" type="textarea" placeholder="Please input"/>
            </div>
        </div>

        <div class="setting-item">
            <div class="item-box">
                <a-typography-title :level="4">全局注入脚本</a-typography-title>
                <el-input class="insert-coder" v-model="settingItem.insert_javascript" style="width: 520px" :autosize="{ minRows: 8, maxRows: 10 }" type="textarea" placeholder="Please input"/>
            </div>
        </div>

        <div class="setting-item">
            <div class="item-box">
                <a-typography-title :level="4">全局页脚注入</a-typography-title>
                <el-input class="insert-coder" v-model="settingItem.insert_footer" style="width: 520px" :autosize="{ minRows: 8, maxRows: 10 }" type="textarea" placeholder="Please input"/>
            </div>
        </div>

        <a-float-button shape="square" type="primary" :style="{ right: '24px' }" @click="submitStyleConfig">
            <template #icon>
                <el-icon><UploadFilled /></el-icon>
            </template>
        </a-float-button>
    </div>
</template>