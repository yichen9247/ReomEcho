
<script setup>
    import { onMounted } from "vue"
    import "./assets/LeaveView.css"
    import { useReomEchoStore } from "@/stores/ReomEchoStore"

    const ReomEchoStore = useReomEchoStore();
    onMounted(async() => {
        ReomEchoStore.setIsSiLodingStatus(false);
    });
</script>

<template>
    
</template>