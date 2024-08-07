<!-- eslint-disable no-unused-vars -->

<script setup>
    import "../Settings.css"
    import utils from "@/scripts/utils"
    import { ref, reactive, onMounted } from "vue"
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"
    import { queryStyleConfig, submitConfigItem } from "@/admin/scripts/core"
    import { Picture as IconPicture, UploadFilled  } from '@element-plus/icons-vue'

    const ready = ref(true);
    const AdminEchoStore = useAdminEchoStore();

    const msgs_style = ref([
        {
            data: 1,
            name: 'Vant Msg',
            value: 'vant'
        },{
            data: 2,
            name: 'Lay Msg',
            value: 'lay'
        },{
            name: 'Element Msg',
            value: 'element',
            disabled: true,
        }
    ]);

    const font_style = ref([
        {
            data: 0,
            name: '默认字体',
            value: 'default'
        },{
            data: 1,
            name: '可爱字体',
            value: 'keai'
        },{
            data: 2,
            name: '钉钉进步体',
            value: 'ding',
            disabled: true,
        },{
            data: 3,
            name: '阿里妈妈体',
            value: 'ali',
            disabled: true,
        }
    ]);

    const darkheme_toggle = ref([
        {
            data: 1,
            name: '自由',
            value: 'default'
        },{
            data: 2,
            name: '自动（每天 10:00 - 8:00）',
            value: 'auto'
        }
    ]);

    const predefineColors = ref([
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#40485b',
        '#626aef',
        '#ff6c6c'
    ]);

    const settingItem = reactive({
        msgs_style: '',
        font_style: '',
        domin_color: '',
        dotted_color1: '',
        dotted_color2: '',
        darkheme_toggle: '',
        site_buttoColor: '',
        background_imag: '',
        po_qrcode_color: '',
        
        star_backmod: false,
        dynamic_color: false,
        transt_interval: 0.0,
    });

    const settingItemChange = async () => {
        await queryStyleConfig().then(() => {
            setTimeout(async () => {
                ready.value = false;
                settingItem.domin_color = utils.findItemInArray(AdminEchoStore.config.styleConfig,'site_dominColor').item_value;
                settingItem.dotted_color1 = utils.findItemInArray(AdminEchoStore.config.styleConfig,'dotted_color1').item_value;
                settingItem.dotted_color2 = utils.findItemInArray(AdminEchoStore.config.styleConfig,'dotted_color2').item_value;
                settingItem.dynamic_color = utils.findItemInArray(AdminEchoStore.config.styleConfig,'dynamic_color').item_value;
                settingItem.site_buttoColor = utils.findItemInArray(AdminEchoStore.config.styleConfig,'site_buttoColor').item_value;
                settingItem.po_qrcode_color = utils.findItemInArray(AdminEchoStore.config.styleConfig,'po_qrcode_color').item_value;
                
                settingItem.transt_interval = Number(utils.findItemInArray(AdminEchoStore.config.styleConfig,'transt_interval').item_value);
                settingItem.star_backmod = Boolean(Number(utils.findItemInArray(AdminEchoStore.config.styleConfig,'star_backmod').item_value));
                settingItem.dynamic_color = Boolean(Number(utils.findItemInArray(AdminEchoStore.config.styleConfig,'dynamic_color').item_value));
                settingItem.font_style = font_style.value[utils.findItemInArray(AdminEchoStore.config.styleConfig,'font_style').item_value].value;
                settingItem.msgs_style = msgs_style.value[utils.findItemInArray(AdminEchoStore.config.styleConfig,'msgs_style').item_value - 1].value;
                settingItem.darkheme_toggle = darkheme_toggle.value[utils.findItemInArray(AdminEchoStore.config.styleConfig,'darkheme_toggle').item_value - 1].value;

                setTimeout(async () => {
                    settingItem.background_imag = utils.findItemInArray(AdminEchoStore.config.styleConfig,'background_imag').item_value.trim();
                }, 500);
            },500);
        });
    }

    onMounted(async () => await settingItemChange());

    const submitStyleConfig = async () => {
        let settingItemConfig = {...settingItem};
        settingItemConfig.star_backmod = Number(settingItemConfig.star_backmod);
        settingItemConfig.dynamic_color = Number(settingItemConfig.dynamic_color);
        settingItemConfig.font_style = font_style.value.find(item => item.value == settingItemConfig.font_style).data;
        settingItemConfig.msgs_style = msgs_style.value.find(item => item.value == settingItemConfig.msgs_style).data;
        settingItemConfig.darkheme_toggle = darkheme_toggle.value.find(item => item.value == settingItemConfig.darkheme_toggle).data;
        await submitConfigItem(settingItemConfig,"/api/config/style/change").then(async () => await settingItemChange());
    }
</script>

<template>
    <div class="admin-page page-settings" v-loading="ready">
        <div class="setting-item">
            <el-space :size="30" wrap>
                <div class="item-box">
                    <a-typography-title :level="4">弹窗样式</a-typography-title>
                    <el-select v-model="settingItem.msgs_style" placeholder="Select">
                        <el-option
                            v-for="item in msgs_style"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">字体样式</a-typography-title>
                    <el-select v-model="settingItem.font_style" placeholder="Select">
                        <el-option
                            v-for="item in font_style"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">深色模式</a-typography-title>
                    <el-select v-model="settingItem.darkheme_toggle" placeholder="Select">
                        <el-option
                            v-for="item in darkheme_toggle"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </div>
            </el-space>
        </div>

        <el-divider content-position="left">颜色设置</el-divider>

        <div class="setting-item">
            <el-space :size="30" wrap>
                <div class="item-box">
                    <a-typography-title :level="4">网站主色</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-color-picker v-model="settingItem.domin_color" show-alpha clearable :predefine="predefineColors"/>
                        <el-input class="color-input" v-model="settingItem.domin_color" style="width: 160px;margin-left: 10px" placeholder="Please input"/>
                    </div>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">边框主色</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-color-picker v-model="settingItem.dotted_color1" show-alpha clearable :predefine="predefineColors"/>
                        <el-input class="color-input" v-model="settingItem.dotted_color1" style="width: 160px;margin-left: 10px" placeholder="Please input"/>
                    </div>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">边框副色</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-color-picker v-model="settingItem.dotted_color2" show-alpha clearable :predefine="predefineColors"/>
                        <el-input class="color-input" v-model="settingItem.dotted_color2" style="width: 160px;margin-left: 10px" placeholder="Please input"/>
                    </div>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">按钮颜色</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-color-picker v-model="settingItem.site_buttoColor" show-alpha clearable :predefine="predefineColors"/>
                        <el-input class="color-input" v-model="settingItem.site_buttoColor" style="width: 160px;margin-left: 10px" placeholder="Please input"/>
                    </div>
                </div>

                <div class="item-box">
                    <a-typography-title :level="4">二维码颜色</a-typography-title>
                    <div style="display:flex;align-items:center">
                        <el-color-picker v-model="settingItem.po_qrcode_color" show-alpha clearable :predefine="predefineColors"/>
                        <el-input class="color-input" v-model="settingItem.po_qrcode_color" style="width: 160px;margin-left: 10px" placeholder="Please input"/>
                    </div>
                </div>
            </el-space>
        </div>

        <el-divider content-position="left">功能设置</el-divider>

        <div class="setting-item">
            <el-space :size="30" wrap class="line">
                <div class="item-box" style="margin-bottom:1em;">
                    <div style="display:inline-flex;align-items:center;margin-right: 20px;">
                        <el-tooltip class="box-item" effect="dark" content="只在电脑端有效" placement="bottom">
                            <a-typography-title :level="4" style="margin-bottom:2px;margin-right: 10px">是否显示特效背景</a-typography-title>
                        </el-tooltip>
                        <el-switch v-model="settingItem.star_backmod" size="large" />
                    </div>
                    
                    <div style="display:inline-flex;align-items:center;margin-right: 20px;">
                        <el-tooltip class="box-item" effect="dark" content="只在文章页有效" placement="bottom">
                            <a-typography-title :level="4" style="margin-bottom:2px;margin-right: 10px">是否启用动态配色</a-typography-title>
                        </el-tooltip>
                        <el-switch v-model="settingItem.dynamic_color" size="large" />
                    </div>
                </div>
            </el-space>
        </div>

        <el-divider content-position="left">动画设置</el-divider>

        <div class="setting-item">
            <el-space :size="30" wrap>
                <div class="item-box">
                    <a-typography-title :level="4">动画过渡时间</a-typography-title>
                    <el-input-number v-model="settingItem.transt_interval" :precision="2" :step="0.1" :min="0.1" :max="5" />
                </div>
            </el-space>
        </div>

        <el-divider content-position="left">背景设置</el-divider>

        <div class="setting-item">
            <a-typography-title :level="4">网站背景图片</a-typography-title>
            <el-input class="color-input" v-model="settingItem.background_imag" placeholder="Please input"/>
            <el-image :src="settingItem.background_imag" v-if="settingItem.background_imag != ''" style="margin-top: 1em;border-radius:5px;">
                <template #error></template>
            </el-image>
        </div>

        <a-float-button shape="square" type="primary" :style="{ right: '24px' }" @click="submitStyleConfig">
            <template #icon>
                <el-icon><UploadFilled /></el-icon>
            </template>
        </a-float-button>
    </div>
</template>