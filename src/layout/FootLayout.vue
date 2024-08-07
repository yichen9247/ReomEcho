
<script setup>
    import utils from "@/scripts/utils"
    const siteConfig = utils.siteConfig;
</script>

<template>
    <footer id="footer">
        <div class="footer-box">
            <div class="footer-left footer-box">
            </div>
            <p class="copyright-text" v-html="siteConfig.insert_footer"></p>
        </div>
    </footer>
</template>

<style>
    @import url("./assets/FootLayout.css");
    @import url("../assets/footbadge/FootBadge.css");
</style>