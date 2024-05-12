<script setup>
    import "./assets/FriendView.css"
    import siteConfig from "../../../docs/main.js"
    import NoData from "@/views/widgets/NoData.vue"
</script>

<template>
    <ul class="friends-list">
        <li class="friends-item" v-for="(item,index) in siteConfig.friends">
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