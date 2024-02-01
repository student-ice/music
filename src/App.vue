<script setup lang="ts">
import Header from '@/components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Toolbar from '@/components/Toolbar.vue';
import PlayerQueue from './components/PlayerQueue.vue';
import { setTwoToneColor } from '@ant-design/icons-vue';
import { useUIStore } from '@/stores/ui';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Lyric from './components/Lyric.vue';

const ui = useUIStore();
setTwoToneColor('#7752FE');
</script>

<template>
  <div id="app">
    <a-config-provider
      :locale="zhCN"
      :theme="{
        token: {
          colorPrimary: '#7752FE',
          colorPrimaryBg: '#e2d4f9',
        },
      }"
    >
      <Header />
      <div class="main">
        <Sidebar />
        <div class="content">
          <router-view></router-view>
          <PlayerQueue />
          <Lyric v-show="ui.showLyric" />
        </div>
      </div>
      <Toolbar />
    </a-config-provider>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  height: 100vh;
  .content {
    flex: 1;
    overflow-y: scroll;
    padding: 64px 50px 64px 50px;
  }
}

aside::-webkit-scrollbar {
  display: none;
}
</style>
