<!-- eslint-disable no-undef -->

<script setup>
    import "./assets/LinksPage.css"
    import { onMounted, reactive, ref } from "vue"
    import utils from "@/scripts/utils"
    import { PlusOutlined } from '@ant-design/icons-vue'
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"
    import { setLinkList, appendLinkItem, deleteLinkItem } from "@/admin/scripts/core"

    const ready = ref(true);
    const dataList = ref([]);
    const addDialog = ref(false);
    const appendData = reactive({
        name: '',
        desc: '',
        link: '',
        image: '',
        target: '_blank'
    });

    const AdminEchoStore = useAdminEchoStore();
    const ReomEchoStore = utils.useReomEchoStore();
    
    onMounted(async () => {
        await setLinkList().then(() => {
            setTimeout(async () => {
                ready.value = false;
                dataList.value = AdminEchoStore.linkList;
            },500);
        });
    });

    const tableRename = [
        {
            title: '链接名称',
            dataIndex: 'name',
        },{
            title: '链接描述',
            dataIndex: 'text',
        },{
            title: '链接地址',
            dataIndex: 'link',
        },{
            title: '链接图片',
            dataIndex: 'image',
        },{
            title: '跳转方式',
            dataIndex: 'target',
        },{
            title: '更多操作',
            dataIndex: 'action',
        }
    ];

    const targetList = [
        {
            value: '_blank',
            label: '_blank'
        },{
            value: '_self',
            label: '_self'
        },{
            value: '_parent',
            label: '_parent'
        },{
            value: '_top',
            label: '_top'
        }
    ]
    
    const appendLink = async () => {
        if (appendData.name == '' || appendData.desc == '' || appendData.link == '' || appendData.image == '' || appendData.target == '')  return await ElMessage({type: 'warning',message: "请将信息填写完整！"});
        addDialog.value = false;
        await appendLinkItem(appendData).then(() => {
            dataList.value = AdminEchoStore.linkList;
        });
        appendData.name = '';
        appendData.desc = '';
        appendData.link = '';
        appendData.image = '';
        appendData.target = '_blank';
    }
    const deleteLink = async (record) => await deleteLinkItem(record).then(() => dataList.value = AdminEchoStore.linkList);
</script>

<template>
    <a-modal v-model:open="addDialog" title="添加链接" :footer="null" destroyOnClose centered class="add-link-dialog" >
        <el-form label-position="top" :model="appendData">
            <el-form-item label="链接名称" prop="name">
                <el-input v-model="appendData.name" clearable/>
            </el-form-item>
            <el-form-item label="链接描述" prop="desc">
                <el-input  v-model="appendData.desc" clearable/>
            </el-form-item>
            <el-form-item label="链接地址" prop="link">
                <el-input  v-model="appendData.link" clearable/>
            </el-form-item>
            <el-form-item label="链接图片" prop="image">
                <el-input  v-model="appendData.image" clearable/>
            </el-form-item>
            <el-form-item label="跳转方式" prop="target">
                <el-select v-model="appendData.target" placeholder="Select" style="width: 240px">
                    <el-option
                      v-for="item in targetList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :empty-values="[null, undefined, '']"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <t-button theme="primary" @click="appendLink">提交信息</t-button>
    </a-modal>

    <div class="admin-page page-links" v-loading="ready">

        
        <a-typography-title :level="4">链接列表</a-typography-title>
        
        <el-table :data="dataList" border style="width: 100%" v-if="ReomEchoStore.isDeviceMobilePhone">
            <el-table-column prop="name" label="链接名称" />
            <el-table-column label="更多操作">
                <template #default="scope">
                    <el-button type="danger" size="small" @click="deleteLink(AdminEchoStore.linkList[scope.$index].link)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <a-table :columns="tableRename" :data-source="dataList" bordered keyboard v-else>
            <template #bodyCell="{ column, record  }">
                <template v-if="['name', 'text', 'link', 'image', 'target'].includes(column.dataIndex)"/>
                <template v-else>
                    <t-button theme="danger" @click="deleteMusic(record.src)" size="small" style="padding: 0 15px;">删除</t-button>
                </template>
            </template>
        </a-table>

        <a-float-button shape="square" type="primary" :style="{ right: '24px' }" @click="addDialog = true">
            <template #icon>
                <PlusOutlined />
            </template>
        </a-float-button>
    </div>
</template>