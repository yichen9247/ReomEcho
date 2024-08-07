
<script setup>
    import "./assets/AdminAside.css"
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"
    import { House, Setting, Document, Box, Guide, TakeawayBox, Mug } from '@element-plus/icons-vue'

    const AdminEchoStore = useAdminEchoStore();
    const menuSelected = (index) => AdminEchoStore.setMenuSelected(index);
</script>

<template>
    <el-menu default-active="4" class="admin-menu-box" @select="menuSelected">
        <el-menu-item index="0">
            <el-icon><House/></el-icon>
            <span>后台首页</span>
        </el-menu-item>
        <el-menu-item index="1">
            <el-icon><Document/></el-icon>
            <span>文章管理</span>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon><Box/></el-icon>
            <span>页面管理</span>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon><Guide/></el-icon>
            <span>链接管理</span>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon><Mug/></el-icon>
            <span>音乐管理</span>
        </el-menu-item>
        <el-sub-menu index="5">
            <template #title>
                <el-icon><TakeawayBox/></el-icon>
                <span>常规设置</span>
            </template>
            <el-menu-item index="5-1">
                <span>头部设置</span>
            </el-menu-item>
            <el-menu-item index="5-2">
                <span>尾部设置</span>
            </el-menu-item>
            <el-menu-item index="5-3">
                <span>文章设置</span>
            </el-menu-item>
            <el-menu-item index="5-4">
                <span>首页设置</span>
            </el-menu-item>
            <el-menu-item index="5-6">
                <span>样式设置</span>
            </el-menu-item>
            <el-menu-item index="5-8">
                <span>评论设置</span>
            </el-menu-item>
            <el-menu-item index="5-10">
                <span>侧栏设置</span>
            </el-menu-item>
            <el-menu-item index="5-11">
                <span>代码注入</span>
            </el-menu-item>
            <el-menu-item index="5-12">
                <span>全局设置</span>
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="6">
            <el-icon><Setting/></el-icon>
            <span>系统设置</span>
        </el-menu-item>
    </el-menu>
</template>