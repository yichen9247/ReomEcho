
<script setup>
    import { onMounted } from "vue"
    import "./assets/BackTopWidget.css"
    import utils from "@/scripts/utils.min.js"

    onMounted(async () => {
        const Reomecho = document.querySelector("#Reomecho"),topbtn = document.getElementById('widget-to-top');
        Reomecho.addEventListener("scroll",() => topbtn.classList.toggle("active", Reomecho.scrollTop >= 200), { passive: true });
    });
</script>

<template>
    <button id="widget-to-top" @click="utils.backToTop" aria-label="返回顶部"></button>
</template>