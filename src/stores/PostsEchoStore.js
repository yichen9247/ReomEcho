
import { ref } from "vue"
import { defineStore } from "pinia"

export const usePostsEchoStore = defineStore('PostsEchoStore',() => {
    const thisPath = ref(null);

    const postShare = ref([
        { id: 'wechat', name: '微信', icon: 'wechat' },
        { id: 'weibo', name: '微博', icon: 'weibo' },
        { id: 'link', name: '复制链接', icon: 'link' },
        { id: 'poster', name: '分享海报', icon: 'poster' },
        { id: 'qrcode', name: '二维码', icon: 'qrcode' },
    ]);

    const setThisPath = async (value) => thisPath.value = value;

    return ({ thisPath,postShare,setThisPath });
});