<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.params.id);
</script>

<template>
  <h1>歌单页面</h1>
</template>

<style lang="scss" scoped></style>