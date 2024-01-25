<script lang="ts" setup>
import { h } from 'vue';
import { HomeFilled, StarFilled, LikeFilled } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();
const user = useUserStore();

const goto = (item) => {
  if (item.key !== route.name) {
    router.push({
      name: item.key,
    });
  }
};
</script>

<template>
  <div class="sidebar">
    <a-config-provider
      :theme="{
        components: {
          token: {
            colorPrimary: '#00b96b',
          },
        },
      }"
    >
      <a-menu :selectedKeys="[route.name]" @click="goto">
        <a-menu-item key="index" :icon="h(HomeFilled)">为我推荐</a-menu-item>
        <a-menu-item key="winnow" :icon="h(StarFilled)">精选</a-menu-item>
        <!-- 分割线 -->
        <a-menu-divider v-if="user.loginStatus"></a-menu-divider>
        <a-menu-item v-if="user.loginStatus" key="daily" :icon="h(LikeFilled)"
          >每日推荐</a-menu-item
        >
      </a-menu>
    </a-config-provider>
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
