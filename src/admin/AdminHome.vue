
<script setup>
    import "./assets/AdminHome.css"
    import { useTitle } from 'vue-hooks-plus'
    import AdminAside from "@/admin/AdminAside.vue"
    import AdminHeader from "@/admin/AdminHeader.vue"
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"
    
    import HomePage from "@/admin/pages/HomePage.vue"
    import LinksPage from "@/admin/pages/LinksPage.vue"
    import MusicPage from "@/admin/pages/MusicPage.vue"
    import UserCenter from "@/admin/pages/UserCenter.vue"

    import HomeSetting from "@/admin/settings/general/HomeSetting.vue"
    import CommeSetting from "@/admin/settings/general/CommeSetting.vue"
    import StyleSetting from "@/admin/settings/general/StyleSetting.vue"
    import InsertSetting from "@/admin/settings/general/InsertSetting.vue"
    import SideBarSetting from "@/admin/settings/general/SideBarSetting.vue"
    import ActivesSetting from "@/admin/settings/general/ActivesSetting.vue"

    useTitle("博客管理后台");
    const AdminEchoStore = useAdminEchoStore();
</script>

<template>
    <div class="console-home-container">
      <el-container style="height: 100%;">
        <el-header style="padding: 0;">
            <AdminHeader/>
        </el-header>
        <el-container style="height: 100%;">
          <el-aside width="200px">
            <AdminAside/>
          </el-aside>
          <el-main>
            <HomePage v-if="AdminEchoStore.menuSelected == 0"/>
            <LinksPage v-if="AdminEchoStore.menuSelected == 3"/>
            <MusicPage v-if="AdminEchoStore.menuSelected == 4"/>
            
            <ActivesSetting v-if="AdminEchoStore.menuSelected == '5-3'"/>
            <HomeSetting v-if="AdminEchoStore.menuSelected == '5-4'"/>
            <StyleSetting v-if="AdminEchoStore.menuSelected == '5-6'"/>
            <CommeSetting v-if="AdminEchoStore.menuSelected == '5-8'"/>
            <SideBarSetting v-if="AdminEchoStore.menuSelected == '5-10'"/>
            <InsertSetting v-if="AdminEchoStore.menuSelected == '5-11'"/>

            <UserCenter v-if="AdminEchoStore.menuSelected == 'user-center'"/>
          </el-main>
        </el-container>
    </el-container>
    </div>
</template>