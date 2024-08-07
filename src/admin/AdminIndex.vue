<!-- eslint-disable no-unused-vars -->

<script setup>
    import { ref, watch } from "vue"
    import "./assets/AdminIndex.css"
    import AdminHome from "./AdminHome.vue"
    import AdminLogin from "./AdminLogin.vue"
    import utils from "@/scripts/utils.min.js"
    import { checkConnectValid } from "@/admin/scripts/core"
    import { useAdminEchoStore } from "@/stores/AdminEchoStore"

    utils.checkAdminLogin();
    const AdminEchoStore = useAdminEchoStore();
    const loginStatus = ref(localStorage.getItem('loginStatus') === 'True');
    watch(AdminEchoStore,async (newValue,oldValue) => await checkConnectValid(),{ deep: true });
</script>

<template>
    <AdminLogin v-if="!loginStatus"/>
    <div class="console-container" v-if="loginStatus">
        <AdminHome/>
    </div>
</template>