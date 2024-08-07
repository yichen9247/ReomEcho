<script setup>
    import "./assets/NotDataView.css"
    const config = defineProps({ description: String });
</script>

<template>
    <div class="have-no-data">
        <a-empty :description="config.description" />
    </div>
</template>