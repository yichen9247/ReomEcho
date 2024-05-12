<script setup>
    import Cookies from "js-cookie"
    import "@/views/assets/headerview.css"
    import { ElMessage } from 'element-plus'
    import siteConfig from "../../docs/main.js"
    import mobilhead from "@/views/mobilhead.vue"
    import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

    const ReomEchoStore = useReomEchoStore();
    const isDeveloper = () => ElMessage({ message: '功能正在开发中！', type: 'warning' });

    const toggleTheme = async () => {
        const profile = document.querySelector("#profile");
        if (profile.getAttribute('data-theme') !== "dark") {
            profile.setAttribute("data-theme","dark");
            await Cookies.set('darkTheme', true ,{ expires: 30 });
        } else {
            profile.setAttribute("data-theme","default");
            await Cookies.set('darkTheme', false ,{ expires: 30 });
        }
    }
</script>

<template>
    <header id="site-header" :class="((!siteConfig.index.index_header) && (!ReomEchoStore.isDeviceMobilePhone)) && 'h-show'">
        <div class="header-inner">
            <a class="image-link" href="/" v-if="!ReomEchoStore.isDeviceMobilePhone">
                <img class="avatar-icon" v-lazy="siteConfig.header.header_icon" :alt="siteConfig.header.header_title" draggable="false">
            </a>

            <mobilhead/>

            <nav class="center-nav" v-if="!ReomEchoStore.isDeviceMobilePhone">
                <ul class="navlist">
                    <el-space nowrap :size="16">
                        <li class="navlist-item" v-for="(item,index) in siteConfig.header.header_navlist" :key="index">
                            <a class="item-link" :href="item.link" :target="item.target">
                                <span class="link-text">{{ item.name }}</span>
                            </a>
                        </li>
                    </el-space>
                </ul>
            </nav>

            <div class="right-button" v-if="!ReomEchoStore.isDeviceMobilePhone">
                <el-tooltip content="切换模式" placement="bottom" effect="light">
                    <div class="icon-box" @click="toggleTheme">
                        <svg t="1705386229830" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23534" width="36" height="36"><path d="M822.14912 871.50592H192.73728c-22.6304 0-40.96-18.3296-40.96-40.96V201.15456c0-22.6304 18.3296-40.96 40.96-40.96h629.39136c22.6304 0 40.96 18.3296 40.96 40.96v629.39136c0.02048 22.6304-18.3296 40.96-40.93952 40.96z" fill="#626aef" p-id="23535" data-spm-anchor-id="a313x.search_index.0.i49.40343a81sAKrVZ" class="selected"></path><path d="M981.46304 544.80896L536.41216 989.85984c-15.99488 15.99488-41.92256 15.99488-57.91744 0L33.42336 544.80896c-15.99488-15.99488-15.99488-41.92256 0-57.91744L478.47424 41.84064c15.99488-15.99488 41.92256-15.99488 57.91744 0l445.05088 445.05088c16.01536 15.99488 16.01536 41.92256 0.02048 57.91744z" fill="#626aef" p-id="23536" data-spm-anchor-id="a313x.search_index.0.i48.40343a81sAKrVZ" class="selected"></path><path d="M507.45344 515.85024m-257.04448 0a257.04448 257.04448 0 1 0 514.08896 0 257.04448 257.04448 0 1 0-514.08896 0Z" fill="#FFFFFF" p-id="23537"></path><path d="M151.77728 217.23136h355.65568V814.4896H151.77728z" fill="#626aef" p-id="23538" data-spm-anchor-id="a313x.search_index.0.i50.40343a81sAKrVZ" class="selected"></path></svg>
                    </div>
                </el-tooltip>

                <el-tooltip content="搜索组件" placement="bottom" effect="light">
                    <div class="icon-box" @click="isDeveloper">
                        <svg t="1704850894017" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5493" width="30" height="30"><path d="M453.818182 23.272727C704.465455 23.272727 907.636364 226.443636 907.636364 477.090909c0 35.746909-4.142545 70.981818-12.264728 105.192727a46.545455 46.545455 0 0 1-90.577454-21.504c6.469818-27.182545 9.751273-55.202909 9.751273-83.688727C814.545455 277.876364 653.032727 116.363636 453.818182 116.363636 254.603636 116.363636 93.090909 277.876364 93.090909 477.090909 93.090909 676.305455 254.603636 837.818182 453.818182 837.818182c101.003636 0 195.211636-41.658182 262.981818-113.826909a46.545455 46.545455 0 0 1 63.650909-3.979637c2.978909 1.792 5.818182 3.956364 8.401455 6.446546l213.201454 205.684363a45.707636 45.707636 0 0 1 0.581818 65.233455l-0.581818 0.581818a46.545455 46.545455 0 0 1-65.233454 0.581818l-185.390546-178.827636A452.305455 452.305455 0 0 1 453.818182 930.909091C203.170909 930.909091 0 727.738182 0 477.090909S203.170909 23.272727 453.818182 23.272727z m76.613818 179.828364c86.714182 23.598545 147.2 76.078545 177.245091 154.973091a46.545455 46.545455 0 0 1-86.993455 33.140363c-19.176727-50.362182-55.994182-82.315636-114.688-98.280727a46.545455 46.545455 0 1 1 24.436364-89.832727z" fill="#626aef" p-id="5494"></path></svg>
                    </div>
                </el-tooltip>

                <el-tooltip content="用户中心" placement="bottom" effect="light">
                    <div class="icon-box" @click="isDeveloper">
                        <svg t="1704850554771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4253" width="30" height="30"><path d="M880.182 987.568H143.818C98.705 987.568 62 952.882 62 910.245V801.52c0-122.986 110.113-223.042 245.455-223.042h409.09C851.887 578.478 962 678.533 962 801.52v108.726c0 42.636-36.704 77.322-81.818 77.322z m-736.364-82.197l736.363 0.379V801.52c0-77.873-73.408-141.224-163.637-141.224h-409.09c-90.228 0-163.636 63.351-163.636 141.224v103.851zM511.67 547.796c-140.984 0-255.682-114.697-255.682-255.682 0-140.984 114.697-255.682 255.682-255.682 140.985 0 255.682 114.697 255.682 255.682 0.001 140.985-114.697 255.682-255.682 255.682z m0-429.546c-95.871 0-173.864 77.993-173.864 173.864S415.8 465.978 511.67 465.978s173.864-77.993 173.864-173.864S607.541 118.25 511.67 118.25z" fill="#626aef" p-id="4254"></path></svg>
                    </div>
                </el-tooltip>
            </div>
        </div>
    </header>
</template>