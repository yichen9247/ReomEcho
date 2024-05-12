<script setup>
    import "./assets/NoData.css"
    const config = defineProps({
        description: String
    });
</script>

<template>
    <div class="have-no-data">
        <el-empty :description="config.description" />
    </div>
</template>