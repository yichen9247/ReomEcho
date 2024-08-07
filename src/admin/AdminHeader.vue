
<script setup>
  import { onMounted } from "vue"
  import "./assets/AdminHeader.css"
  import { exitLogin } from "@/admin/scripts/core"
  import { Operation } from '@element-plus/icons-vue'
  import { setUserInfo } from "@/admin/scripts/core"
  import { NotificationIcon } from 'tdesign-icons-vue-next'
  import { useAdminEchoStore } from "@/stores/AdminEchoStore"
  import { UserOutlined, LoginOutlined, GithubOutlined } from '@ant-design/icons-vue'

  const AdminEchoStore = useAdminEchoStore();
  onMounted(async () => await setUserInfo());
  const openUserCenter = async () => {
    await AdminEchoStore.setMenuSelected('user-center');
    let activeItem = document.querySelectorAll("li.is-active");
    for (const iterator of activeItem) iterator.classList.remove('is-active');
  }
</script>

<template>
  <el-menu class="admin-menu" mode="horizontal" :ellipsis="false">
    <div class="admin-logo-box">
      <el-icon class="icon-menu-box"><Operation/></el-icon>
      <p class="logo-text">博客管理系统</p>
    </div>
    <div class="flex-grow" />
    <div class="right-button">
      <el-tooltip effect="dark" content="代码仓库" placement="bottom">
        <t-button variant="text">
          <GithubOutlined/>
        </t-button>
      </el-tooltip>

      <el-tooltip effect="dark" content="系统通知" placement="bottom">
        <t-button variant="text">
          <NotificationIcon />
        </t-button>
      </el-tooltip>

      <a-dropdown :trigger="['click']">
        <t-button variant="text">
          <div class="item" style="display: flex;align-items: center;justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="text-icon-large iconify iconify--ph" width="1.45em" height="1.45em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24M74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0M96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32m97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0"></path></svg>
            <span class="item-text" style="margin-left: 5px;">{{ AdminEchoStore.userInfo.nickname }}</span>
          </div>
        </t-button>

        <template #overlay>
          <a-menu class="admin-header-user-menu">
            <a-menu-item key="0" style="height: 35px;" @click="openUserCenter">
              <div class="item" style="display: flex;align-items: center;justify-content: center;">
                <UserOutlined />
                <span class="item-text" style="margin-left: 5px;">个人中心</span>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="1" style="height: 35px;" @click="exitLogin">
              <div class="item" style="display: flex;align-items: center;justify-content: center;">
                <LoginOutlined />
                <span class="item-text" style="margin-left: 6px;">退出登录</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>