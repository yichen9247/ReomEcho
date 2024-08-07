<script setup>
    import { ref } from "vue"
    import "./assets/FriendView.css"
    import utils from "@/scripts/utils"
    import { VueDraggable } from 'vue-draggable-plus'
    import NotDataView from "@/model/NotDataView.vue"
    const siteConfig = utils.siteConfig,friends = ref(siteConfig.friends),ReomEchoStore = utils.useReomEchoStore();
</script>

<template>
    <div class="friends-list draggle" v-if="siteConfig.sundry.friends_draggle">
        <div class="drag-container" v-if="ReomEchoStore.isDeviceMobilePhone">
            <div class="friends-item" v-for="(item,index) in friends" v-wave="siteConfig.sundry.moused_wave && !ReomEchoStore.isDeviceMobilePhone" :key="index">
                <a class="item-link" :href="item.href" v-lazy:background-image="item.image" :target="item.target">
                    <div class="item-desc">
                        <div class="text-sheet">
                            <p class="name-text">{{ item.name }}</p>
                            <p class="desc-text">{{ item.desc }}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>

        <VueDraggable v-else v-model="friends" class="drag-container" :animation="300">
            <div class="friends-item" v-for="(item,index) in friends" v-wave="siteConfig.sundry.moused_wave  && !ReomEchoStore.isDeviceMobilePhone" :key="index">
                <a class="item-link" :href="item.href" v-lazy:background-image="item.image" :target="item.target">
                    <div class="item-desc">
                        <div class="text-sheet">
                            <p class="name-text">{{ item.name }}</p>
                            <p class="desc-text">{{ item.desc }}</p>
                        </div>
                    </div>
                </a>
            </div>
        </VueDraggable>
    </div>

    <div class="friends-list no-draggle" v-if="!siteConfig.sundry.friends_draggle">
        <div class="friends-item" v-for="(item,index) in friends" v-wave="siteConfig.sundry.moused_wave && !ReomEchoStore.isDeviceMobilePhone" :key="index">
            <a class="item-link" :href="item.href" v-lazy:background-image="item.image" :target="item.target">
                <div class="item-desc">
                    <div class="text-sheet">
                        <p class="name-text">{{ item.name }}</p>
                        <p class="desc-text">{{ item.desc }}</p>
                    </div>
                </div>
            </a>
        </div>
    </div>
    <NotDataView v-if="siteConfig.friends.length === 0" :description="'博主还没有添加过任何友链哦！'"/>
</template>