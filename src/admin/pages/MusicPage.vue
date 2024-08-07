<!-- eslint-disable no-undef -->

<script setup>
    import "./assets/LinksPage.css"
    import utils from "@/scripts/utils"
    import { onMounted, reactive, ref } from "vue"
    import { PlusOutlined } from '@ant-design/icons-vue'
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"
    import { setMusicList, appendMusicItem, deleteMusicItem } from "@/admin/scripts/core"

    const ready = ref(true);
    const dataList = ref([]);
    const addDialog = ref(false);
    const appendData = reactive({
        title: '',
        src: '',
        image: '',
        lyric: ''
    });

    const AdminEchoStore = useAdminEchoStore();
    const ReomEchoStore = utils.useReomEchoStore();
    
    onMounted(async () => {
        await setMusicList().then(() => {
            setTimeout(async () => {
                ready.value = false;
                dataList.value = AdminEchoStore.musicList;
            },500);
        });
    });

    const tableRename = [
        {
            title: '音乐名称',
            dataIndex: 'title',
        },{
            title: '音乐链接',
            dataIndex: 'src',
        },{
            title: '专辑图片',
            dataIndex: 'image',
        },{
            title: '歌词链接',
            dataIndex: 'lyric',
        },{
            title: '更多操作',
            dataIndex: 'action',
        }
    ];
    
    const appendMusic = async () => {
        if (appendData.src == '' || appendData.title == '' || appendData.image == '' || appendData.lyric == '') return await ElMessage({type: 'warning',message: "请将信息填写完整！"});
        addDialog.value = false;
        await appendMusicItem(appendData).then(() => {
            dataList.value = AdminEchoStore.musicList;
        });
        appendData.title = '';
        appendData.src = '';
        appendData.image = '';
        appendData.lyric = '';
    }
    const deleteMusic = async (record) => await deleteMusicItem(record).then(() => dataList.value = AdminEchoStore.musicList);
</script>

<template>
    <a-modal v-model:open="addDialog" title="添加音乐" :footer="null" destroyOnClose centered class="add-music-dialog" >
        <el-form label-position="top" :model="appendData">
            <el-form-item label="音乐名称" prop="name">
                <el-input v-model="appendData.title" clearable/>
            </el-form-item>
            <el-form-item label="音乐链接" prop="link">
                <el-input  v-model="appendData.src" clearable/>
            </el-form-item>
            <el-form-item label="专辑图片" prop="image">
                <el-input  v-model="appendData.image" clearable/>
            </el-form-item>
            <el-form-item label="歌词链接" prop="lyric">
                <el-input  v-model="appendData.lyric" clearable/>
            </el-form-item>
        </el-form>
        <t-button theme="primary" @click="appendMusic">提交信息</t-button>
    </a-modal>

    <div class="admin-page page-music" v-loading="ready">
        <a-typography-title :level="4">音乐列表</a-typography-title>

        <el-table :data="dataList" border style="width: 100%" v-if="ReomEchoStore.isDeviceMobilePhone" height="520px">
            <el-table-column prop="title" label="音乐名称" />
            <el-table-column label="更多操作">
                <template #default="scope">
                    <el-button type="danger" size="small" @click="deleteMusic(AdminEchoStore.musicList[scope.$index].src)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <a-table :columns="tableRename" :data-source="dataList" bordered keyboard v-else >
            <template #bodyCell="{ column, record  }">
                <template v-if="['title', 'src', 'image', 'lyric'].includes(column.dataIndex)"/>
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