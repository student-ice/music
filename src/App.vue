<script setup lang="ts">
import Header from '@/components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Toolbar from '@/components/Toolbar.vue';
import { setTwoToneColor } from '@ant-design/icons-vue';
setTwoToneColor('#7752FE');
</script>

<template>
  <div id="app">
    <a-config-provider :theme="{
      token: {
        colorPrimary: '#7752FE',
        colorPrimaryBg: '#dcd0ef'
      },
    }">
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout class="content">
        <a-layout-sider>
          <Sidebar />
        </a-layout-sider>
        <a-layout-content>
          <router-view></router-view>
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
  line-height: 64px;
}

.ant-layout.content {
  height: 100vh;
  padding-top: 64px;
  padding-bottom: 60px;

  .ant-layout-sider {
    overflow-y: scroll;
    height: 100%;
    text-align: center;
    line-height: 120px;
    color: #fff;
    background-color: rgb(240, 243, 246);
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
  }

  .ant-layout-content {
    flex: 1;
    overflow-y: scroll;
    padding: 10px 50px 10px 50px;
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
