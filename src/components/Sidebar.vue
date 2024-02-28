<script lang="ts" setup>
import { h } from 'vue';
import {
  HomeFilled,
  StarFilled,
  LikeFilled,
  HeartFilled,
} from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useUIStore } from '@/stores/ui';

const route = useRoute();
const router = useRouter();
const user = useUserStore();
const ui = useUIStore();

const goto = (item) => {
  if (item.key !== route.name) {
    if (item.key === 'like-songs') {
      router.push({
        name: item.key,
        params: {
          id: user.userLikeListId,
        },
      });
    } else {
      router.push({
        name: item.key,
      });
    }
  }
};
</script>

<template>
  <a-layout-sider v-model:collapsed="ui.isCollapsed" collapsible>
    <a-menu :selectedKeys="[route.name]" @click="goto">
      <a-menu-item key="index" :icon="h(HomeFilled)">为我推荐</a-menu-item>
      <a-menu-item key="winnow" :icon="h(StarFilled)">精选</a-menu-item>
      <!-- 分割线 -->
      <a-menu-divider v-if="user.loginStatus"></a-menu-divider>
      <a-menu-item v-if="user.loginStatus" key="daily" :icon="h(LikeFilled)"
        >每日推荐</a-menu-item
      >
      <a-menu-item
        v-if="user.loginStatus"
        key="like-songs"
        :icon="h(HeartFilled)"
        >喜欢的音乐</a-menu-item
      >
    </a-menu>
  </a-layout-sider>
</template>

<style lang="scss" scoped>
.ant-menu {
  width: 100%;
  padding-top: 64px;
  padding-bottom: 64px;
  height: 100vh;
  background-color: rgb(240, 243, 246);
  font-weight: 700;
  color: #000;
  border-right: 1px solid #ccc;

  .ant-menu-item {
    height: 120px;
    line-height: 120px;
    font-size: 20px;
    color: #000;
  }
}

.ant-menu.ant-menu-root.ant-menu-vertical.ant-menu-light {
  border-inline-end: none;
}
</style>
