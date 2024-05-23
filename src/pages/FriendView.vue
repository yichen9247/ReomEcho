<script setup>
    import { ref } from "vue"
    import "./assets/FriendView.css"
    import siteConfig from "../../docs/main.js"
    import NoData from "@/views/widgets/NoData.vue"
    import { VueDraggable } from 'vue-draggable-plus'
    import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

    const friends = ref(siteConfig.friends);
    const ReomEchoStore = useReomEchoStore();
</script>

<template>
    <ul class="friends-list draggle" v-if="!ReomEchoStore.isDeviceMobilePhone && siteConfig.global.friends_draggle">
        <VueDraggable v-model="friends" class="drag-container" :animation="300" v-if="siteConfig.global.friends_draggle">
            <li class="friends-item" v-for="(item,index) in friends">
                <a class="item-link" :href="item.href" v-lazy:background-image="item.image" :target="item.target">
                    <div class="item-desc">
                        <div class="text-sheet">
                            <p class="name-text">{{ item.name }}</p>
                            <p class="desc-text">{{ item.desc }}</p>
                        </div>
                    </div>
                </a>
            </li>
        </VueDraggable>
    </ul>

    <ul class="friends-list no-draggle" v-if="!ReomEchoStore.isDeviceMobilePhone && !siteConfig.global.friends_draggle">
        <li class="friends-item" v-for="(item,index) in friends">
            <a class="item-link" :href="item.href" v-lazy:background-image="item.image" :target="item.target">
                <div class="item-desc">
                    <div class="text-sheet">
                        <p class="name-text">{{ item.name }}</p>
                        <p class="desc-text">{{ item.desc }}</p>
                    </div>
                </div>
            </a>
        </li>
    </ul>

    <ul class="friends-list mobile" v-if="ReomEchoStore.isDeviceMobilePhone">
        <li class="friends-item" v-for="(item,index) in friends">
            <a class="item-link" :href="item.href" v-lazy:background-image="item.image" :target="item.target">
                <div class="item-desc">
                    <div class="text-sheet">
                        <p class="name-text">{{ item.name }}</p>
                        <p class="desc-text">{{ item.desc }}</p>
                    </div>
                </div>
            </a>
        </li>
    </ul>
    <NoData v-if="siteConfig.friends.length === 0" :description="'博主还没有添加过任何友链哦！'"/>
</template>