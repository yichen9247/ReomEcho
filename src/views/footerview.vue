<script setup>
    import "@/views/assets/footerview.css"
    import "@/views/pages/assets/FootBadge.css"
    import siteConfig from "../../docs/main.js"
</script>

<template>
    <footer id="footer">
        <p class="copyright" v-html="siteConfig.footer.footer_copyright"></p>
    </footer>
</template>