<script setup>
    import "./assets/CarouView.css"
    import siteConfig from "../../../docs/main.js"
    import { useReomEchoStore } from "@/stores/ReomEchoStore.js"

    const ReomEchoStore = useReomEchoStore();
</script>

<template>
    <div class="carousel-chart" v-if="siteConfig.index.index_pc_carousel && !ReomEchoStore.isDeviceMobilePhone">
        <el-carousel height="155px" :interval="siteConfig.index.carousel_interval">
            <el-carousel-item v-for="(item,index) in siteConfig.carousel" :key="index">
                <a class="carousel-item" :href="item.href" :title="item.title">
                    <img class="carousel-item-image" v-lazy="item.image" :alt="item.title">
                    <div class="carousel-item-cover">
                        <p class="item-title">{{ item.title }}</p>
                    </div>
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>

    <div class="carousel-chart" v-if="siteConfig.index.index_mb_carousel && ReomEchoStore.isDeviceMobilePhone">
        <van-swipe class="carousel-swipe" :autoplay="siteConfig.index.carousel_interval" indicator-color="white">
            <van-swipe-item v-for="(item,index) in siteConfig.carousel" :key="index">
                <a class="carousel-item" :href="item.href" :title="item.title">
                    <img class="carousel-item-image" v-lazy="item.image" :alt="item.title">
                    <div class="carousel-item-cover">
                        <p class="item-title">
                            <van-text-ellipsis rows="2" :content="item.title"/>
                        </p>
                    </div>
                </a>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<style>
    .van-swipe__indicators {
        bottom: 20px!important;
    }

    .carousel-swipe .van-swipe-item {
        height: 155px;
        color: #ffffff;
        line-height: 150px;
        text-align: center;
        border-radius: 5px;
    }

    div.van-text-ellipsis {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>