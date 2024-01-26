<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Login from './Login.vue';
import { useUserStore } from '@/stores/user';
import { loginStatus } from '@/api/login';
import { clearCookie } from '@/utils/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const loginRef = ref(null);

const openLoginModal = () => {
  loginRef.value.openLoginModal();
};

const checkLoginStatus = async () => {
  const { data } = await loginStatus();
  if (data.code === 200 && data.profile) {
    userStore.setUserProfile();
  }
};

const logout = () => {
  userStore.loginOut();
  clearCookie('MUSIC_U');
};

const pressEnter = (e: any) => {
  if (e) {
    router.push({
      name: 'search',
      params: {
        keywords: e,
      },
    });
  }
};

onMounted(() => {
  checkLoginStatus();
});
</script>
<template>
  <div class="nav">
    <div class="side"></div>
    <div class="main">
      <a-input-search
        placeholder="搜索歌曲"
        enter-button
        @search="pressEnter"
      />
      <a-dropdown v-if="userStore.loginStatus">
        <div class="user-info">
          <a-avatar :src="userStore.userAvatar" />
          <a-button @click.prevent> {{ userStore.userNickName }} </a-button>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown v-else>
        <div class="user-info">
          <a-avatar src="/src/assets/icons/avatar.svg" />
          <a-button @click.prevent> 未登录 </a-button>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="openLoginModal">登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
  <Login ref="loginRef" />
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);

  .side {
    height: 100%;
    width: 200px;
    background-color: rgb(240, 243, 246);
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
  }

  .main {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex: 1;

    .ant-input-group-wrapper {
      width: 300px;
    }

    padding: 0 50px;

    .user-info {
      padding: 0;
      height: 32px;
      .ant-btn {
        margin-left: 10px;
      }
    }
  }
}
</style>
