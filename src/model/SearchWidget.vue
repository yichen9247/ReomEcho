<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-undef -->
 
<script setup>
    import "./assets/SearchWidget.css"
    import utils from "@/scripts/utils"
    import debounce from 'lodash/debounce'
    import { useRouter } from 'vue-router'
    import { ref, watch, onUnmounted } from 'vue'
    import { CloseBold } from '@element-plus/icons-vue'

    const router = useRouter();
    const searchValue = ref("");
    const searchResults = ref([]);
    const siteConfig = utils.siteConfig;
    const wordToPostIndexMap = new Map();
    const ReomEchoStore = utils.useReomEchoStore();
    let posts = [],words = [],descs = [],inclu = [];

    siteConfig.actives.map(async (item, index) => {
        posts.push(item.config.path);
        words.push(item.config.name);
        descs.push(item.config.desc);
        wordToPostIndexMap.set(words[words.length - 1], index);
    });

    const searchContent = async () => {
        inclu = [];
        const regex = new RegExp(searchValue.value, 'i');
        const wordResults = words.filter(word => regex.test(word));
        const uniqueResults = Array.from(new Set(wordResults));
        const resultPaths = uniqueResults.map(word => posts[wordToPostIndexMap.get(word)]);
        const resultNames = uniqueResults.map(word => words[wordToPostIndexMap.get(word)]);
        const resultDescs = uniqueResults.map(word => descs[wordToPostIndexMap.get(word)]);
        if (resultPaths.length) for (let i=0;i<resultPaths.length;i++) inclu.push({ path: resultPaths[i], name: resultNames[i], desc: resultDescs[i] });
        searchResults.value = inclu;
    };
    
    const pushPost = async (path) => {
        ReomEchoStore.setSearchDialogStat(false);
        router.push(`/docs/${path}`).then(async () => {
            searchValue.value = "";
            document.querySelector('#Reomecho').scrollTo(0, 0);
        }).catch(async () => {
            await ElMessage({type: 'error',message: "系统功能异常！"});
        });
    }
    
    onUnmounted(() => debouncedSearchContent.cancel());
    const debouncedSearchContent = debounce((query) => searchContent(query), 300);
    watch(searchValue,async (newValue, oldValue) => debouncedSearchContent(newValue));
</script>
1
<template>
    <div class="search-container">
        <div class="search-dialog">
            <div class="search-navbar">
                <div class="search-navbar-title">搜索文章
                </div>
                <span class="search-close-button" @click="ReomEchoStore.setSearchDialogStat(false)">
                    <el-icon><CloseBold /></el-icon>
                </span>
            </div>
            <input v-model="searchValue" class="search-input" type="text" placeholder="输入关键词以快速查找">
            <div class="search-content">
                <a-empty  description="暂无搜索内容" v-if="searchResults.length == 0 && searchValue != ''"/>
                <div class="content-list" v-else>
                    <div class="content-item" v-for="(item,index) in searchResults" :key="index" @click="pushPost(item.path)">
                        <h2 class="item-title">{{ item.name }}</h2>
                        <p class="item-desc">
                            <van-highlight :keywords="searchValue" :source-string="item.desc" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .van-highlight__tag {
        color: unset;
        padding: 0 5px;
        color: #000000;
        margin-right: 5px;
        border-radius: 3px;
        background-color: #ffff00;
    }
</style>