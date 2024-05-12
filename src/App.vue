<script setup>
  import Pace from 'pace-js'
  import { onMounted } from 'vue'
  import Cookies from "js-cookie"
  import "@/assets/paces/pace.css"
  import { RouterView } from 'vue-router'
  import siteConfig from "../docs/main.js"
  import isMobile from "@/scripts/mobile.js"
  import { Bell } from '@element-plus/icons-vue'

  document.body.style.setProperty('--dominColor',siteConfig.style.site_dominColor);
  document.body.style.setProperty('--buttoColor',siteConfig.style.site_buttoColor);
  document.body.style.setProperty('--dotted_color1',siteConfig.style.dotted_color1);
  document.body.style.setProperty('--dotted_color2',siteConfig.style.dotted_color2);

  onMounted(async () => {
    if (siteConfig.global.cook_notice) {
      if (Cookies.get('policy') !== 'true' && isMobile.isMobile()) {
        await showDialog({ message: siteConfig.global.cookie_mb_message, theme: 'round-button', confirmButtonText: "允许存储"}).then(() => Cookies.set('policy', true ,{ expires: 30 }));
      }
      if (Cookies.get('policy') !== 'true' && !isMobile.isMobile()) {
          Cookies.set('policy', true ,{ expires: 30 });
          ElNotification({ icon: Bell,duration: 3000,title: '协议提醒助手',position: 'bottom-right',dangerouslyUseHTMLString: true,message: siteConfig.global.cookie_pc_message });
      }
    }
    console.log("\n %c ReomEcho" + " %c 轻量级博客系统", "color:#ffffff;background:#626aef;padding:5px 0;", "color:#626aef;background:#f8f8f8;padding:5px 10px 5px 0px;");
  });
</script>

<template>
  <!-- 顶部安全区 -->
  <div class="van-safe-area-top" v-if="isMobile.isMobile()"></div>
  <RouterView />
  <!-- 底部安全区 -->
  <div class="van-safe-area-bottom" v-if="isMobile.isMobile()"></div>
</template>

<style>
  .el-icon {
    margin: 0.175em 0.1em;
    width: 0.75em!important;
    height: 0.75em!important;
  }
</style>