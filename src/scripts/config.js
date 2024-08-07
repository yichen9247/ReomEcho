
import { useFavicon } from 'vue-hooks-plus'
import siteConfig from "../../docs/main.js"
import DisableDevtool from 'disable-devtool'
import developer from "@/scripts/developer.js"

if (siteConfig.sundry.load_topline) {
    import('pace-js');
    import('@/assets/paces/pace.min.css');
}

if (siteConfig.sundry.site_mourning) import('@/assets/styles/dao.css');
if (siteConfig.style.font_style == 1) import('@/assets/styles/font1.css');
if (siteConfig.style.font_style == 2) import('@/assets/styles/font2.css');
if (siteConfig.sundry.click_effec) import('@/scripts/effect/effect_dianji.js');
if (siteConfig.aside.aside_list.includes('sakanas')) import('sakana-widget/lib/index.css');

if (siteConfig.sundry.is_cssinsert) {
    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = siteConfig.insert_styles;
    document.body.appendChild(style);
}

if (siteConfig.sundry.is_javainsert) {
    let script = document.createElement('script');
    script.setAttribute('nonce', 'uniquevalue');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = siteConfig.insert_javascript;
    document.body.appendChild(script);
}

const setMetaDescription = async (description) => {
    let meta = document.querySelector('meta[name=description]');
    if (meta) {
        meta.setAttribute('content', description);
    } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        meta.setAttribute('content', description);
        document.head.appendChild(meta);
    }
}

document.body.className = "";
useFavicon(siteConfig.global.site_icons);
setMetaDescription(siteConfig.global.site_description);
document.body.style.setProperty('--dominColor', siteConfig.style.site_dominColor);
document.body.style.setProperty('--buttoColor', siteConfig.style.site_buttoColor);
document.body.style.setProperty('--transition', siteConfig.style.transt_interval);
document.body.style.setProperty('--dotted_color1', siteConfig.style.dotted_color1);
document.body.style.setProperty('--dotted_color2', siteConfig.style.dotted_color2);
document.body.style.setProperty('--background', `url(${siteConfig.style.background_imag})`);
if (siteConfig.sundry.site_secproduc && import.meta.env.MODE === 'production') DisableDevtool(developer);
onload = async () => console.log("\n %c ReomEcho" + " %c 轻量级博客系统", "color:#ffffff;background:#626aef;padding:5px 0;", "color:#626aef;background:#f8f8f8;padding:5px 10px 5px 0px;");