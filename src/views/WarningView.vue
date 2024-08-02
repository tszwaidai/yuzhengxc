<template>
    <div class="bg"></div>
    <Header></Header>
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>

<style lang="scss" scoped>
.bg {
    width: 1475px; 
    height: 100vh;
    margin-left: -130px;
    background: url('../assets/bg_bottom@2x.png');
    background-size: cover;
}
</style>