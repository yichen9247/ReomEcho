<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-undef -->

<script setup>
    import "./assets/MobileSearch.css"
    import utils from "@/scripts/utils"
    import debounce from 'lodash/debounce'
    import { useRouter } from 'vue-router'
    import { ref, watch, onUnmounted } from 'vue'

    const isInput = ref(false);
    const router = useRouter();
    const searchResults = ref([]);
    const searchValue = ref(null);
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
        searchResults.value = inclu.slice(0.5);
    };
    
    const pushPost = async (path) => {
        ReomEchoStore.setSearchDialogStat(false);
        router.push(`/docs/${path}`).then(async () => {
            searchValue.value = "";
            ReomEchoStore.setMobileDrawerStat(false);
            document.querySelector('#Reomecho').scrollTo(0, 0);
        }).catch(async () => {
            await ElMessage({type: 'error',message: "系统功能异常！"});
        });
    }
    
    onUnmounted(() => debouncedSearchContent.cancel());
    const debouncedSearchContent = debounce((query) => { searchContent(query);isInput.value = false }, 300);
    watch(searchValue,async (newValue, oldValue) => { isInput.value = true;debouncedSearchContent(newValue) });
</script>

<template>
    <div class="mobile-search-container">
        <van-search v-model="searchValue" placeholder="请输入搜索关键词" />
        <div class="search-content" v-if="searchValue != '' && !isInput">
            <div class="content-list">
                <div class="content-item" v-for="(item,index) in searchResults" :key="index" @click="pushPost(item.path)">
                    <p class="item-title van-multi-ellipsis--l2">{{ item.name }}</p>
                    <p class="item-desc van-multi-ellipsis--l2">{{ item.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>