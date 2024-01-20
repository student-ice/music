<script setup lang="ts">
import Header from '@/components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Toolbar from '@/components/Toolbar.vue';
import PlayerQueue from './components/PlayerQueue.vue';
import { setTwoToneColor } from '@ant-design/icons-vue';
import { usePlayerStore } from '@/stores/player';

const player = usePlayerStore();
setTwoToneColor('#7752FE');
</script>

<template>
  <div id="app">
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#7752FE',
          colorPrimaryBg: '#dcd0ef',
        },
      }"
    >
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout class="content">
        <a-layout-sider>
          <Sidebar />
        </a-layout-sider>
        <a-layout-content>
          <router-view></router-view>
          <transition name="fade">
            <PlayerQueue v-show="player.showPlayerQueue" />
          </transition>
        </a-layout-content>
      </a-layout>
      <a-layout-footer>
        <Toolbar />
      </a-layout-footer>
    </a-config-provider>
  </div>
</template>

<style lang="scss" scoped>
.ant-layout-header {
  position: fixed;
  z-index: 1;
  width: 100%;
  text-align: center;
  color: #fff;
  height: 64px;
}

.ant-layout.content {
  height: 100vh;
  padding-top: 64px;
  padding-bottom: 60px;

  .ant-layout-sider {
    overflow-y: scroll;
    height: 100%;
    line-height: 120px;
    color: #fff;
    background-color: rgb(240, 243, 246);
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
  }

  .ant-layout-content {
    flex: 1;
    overflow-y: scroll;
    padding: 10px 50px 10px 50px;

    .fade-enter-from {
      transform: translateX(100%);
      opacity: 0;
    }
    .fade-enter-active {
      transition: all 0.4s;
    }

    .fade-enter-to {
      transform: translateX(0);
      opacity: 1;
    }
    .fade-leave-from {
      transform: translateX(0);
      opacity: 1;
    }
    .fade-leave-active {
      transition: all 0.4s;
    }
    .fade-leave-to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
}

.ant-layout-footer {
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 60px;
}

aside::-webkit-scrollbar {
  display: none;
}
</style>
