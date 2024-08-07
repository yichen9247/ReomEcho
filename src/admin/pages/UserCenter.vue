<!-- eslint-disable no-empty -->
<!-- eslint-disable no-undef -->
<script setup>
    import "./assets/UserCenter.css"
    import { reactive, ref } from "vue"
    import { Edit2Icon } from 'tdesign-icons-vue-next'
    import { submitUserInfo } from "@/admin/scripts/core"
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"

    const editDialog = ref(false);
    const AdminEchoStore = useAdminEchoStore();

    const editForm = reactive({
        id: AdminEchoStore.userInfo.id,
        email: AdminEchoStore.userInfo.email,
        password: localStorage.getItem('password'),
        username: AdminEchoStore.userInfo.username,
        nickname: AdminEchoStore.userInfo.nickname,
        userdesc: AdminEchoStore.userInfo.userdesc,
    });

    const submitInfo = async () => {
        try {
            if (editForm.email != '' || editForm.password != '' || editForm.username != '' || editForm.usernick != '' || editForm.userdesc != '') {
            await submitUserInfo(editForm);
            } else await ElMessage({type: 'warning',message: "请将信息填写完整！"});
        } catch {}
    }
</script>

<template>
    <a-modal v-model:open="editDialog" title="修改信息" :footer="null" destroyOnClose centered class="add-link-dialog" >
        <el-form label-position="top" :model="editForm">
            <el-form-item label="用户账号" prop="name">
                <el-input v-model="editForm.username" clearable maxlength="20"/>
            </el-form-item>
            <el-form-item label="显示名称" prop="desc">
                <el-input  v-model="editForm.nickname" clearable maxlength="10"/>
            </el-form-item>
            <el-form-item label="邮箱账号" prop="link">
                <el-input  v-model="editForm.email" clearable maxlength="50"/>
            </el-form-item>
            <el-form-item label="个人描述" prop="image">
                <el-input  v-model="editForm.userdesc" clearable/>
            </el-form-item>
            <el-form-item label="账号密码" prop="image">
                <el-input type="password" v-model="editForm.password" clearable show-password/>
            </el-form-item>
        </el-form>
        <t-button theme="primary" @click="submitInfo">提交信息</t-button>
    </a-modal>

    <div class="admin-page page-user-center">
        <el-container>
            <el-main>
                <div class="page-content">
                    <div class="user-left-greeting">
                        <span>欢迎回来，{{ AdminEchoStore.userInfo.nickname }}</span>
                        <span class="system-logo">Reomecho</span>
                    </div>

                    <div class="content-box">
                        <t-tabs :default-value="1">
                            <t-tab-panel :value="1" label="个人详情">
                                <el-descriptions class="margin-top" :column="3" size="large" border>
                                    <el-descriptions-item>
                                        <template #label>
                                            <div class="cell-item">显示名称</div>
                                        </template>
                                        {{ AdminEchoStore.userInfo.nickname }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template #label>
                                            <div class="cell-item">邮箱账号</div>
                                        </template>
                                        {{ AdminEchoStore.userInfo.email }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template #label>
                                            <div class="cell-item">用户账号</div>
                                        </template>
                                        {{ AdminEchoStore.userInfo.username }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template #label>
                                            <div class="cell-item">账号身份</div>
                                        </template>
                                        <el-tag size="small" v-if="AdminEchoStore.userInfo.permission == 0">普通用户</el-tag>
                                        <el-tag size="small" v-if="AdminEchoStore.userInfo.permission == 1">超级管理员</el-tag>
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template #label>个人描述</template>
                                        {{ AdminEchoStore.userInfo.userdesc }}
                                    </el-descriptions-item>
                                </el-descriptions>
                            </t-tab-panel>
                        </t-tabs>
                    </div>
                </div>
            </el-main>
            <el-aside width="360px">
                <div class="user-intro">
                    <t-button class="edit-button" shape="circle" variant="outline" @click="editDialog = true">
                        <Edit2Icon />
                    </t-button>
                    <t-avatar size="80px">{{ AdminEchoStore.userInfo.nickname.charAt(0) }}</t-avatar>
                    <p class="usernick">{{ AdminEchoStore.userInfo.nickname }}</p>
                    <p class="userdesc">{{ AdminEchoStore.userInfo.userdesc }}</p>
                </div>
            </el-aside>
        </el-container>
    </div>
</template>