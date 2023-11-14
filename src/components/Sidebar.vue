<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const to = (item) => {
  if (item.key !== route.path) {
    router.push({
      path: item.key,
    });
  }
}
</script>

<template>
  <div class="sidebar">
    <a-menu :selectedKeys="[route.path]" @click="to">
      <a-menu-item key="/">为你推荐</a-menu-item>
      <a-menu-item key="/discover">发现</a-menu-item>
    </a-menu>
  </div>
</template>

<style lang="scss" scoped>
.ant-menu {
  height: 100%;
  background-color: rgb(240, 243, 246);
  font-weight: 700;
  color: #000;
}

.ant-menu.ant-menu-root.ant-menu-vertical.ant-menu-light {
  border-inline-end: none;
}
</style>