<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Login from './Login.vue';
import { useUserStore } from '@/stores/user';
import { loginStatus } from '@/api/login';
import { clearCookie } from '@/utils/auth';
import { useRouter } from 'vue-router';
import { getHotSearchList } from '@/api/search';

const router = useRouter();
const userStore = useUserStore();
const loginRef = ref(null);
const searchFocus = ref(false);
const hotSearchList = ref([]);

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
    toSearch(e);
  }
};

const toSearch = (keywords: string) => {
  router.push({
    name: 'search',
    params: {
      keywords,
    },
  });
};

const getHotSearch = async () => {
  const { result } = await getHotSearchList();
  hotSearchList.value = result.hots;
};

// 延时失焦
const delayBlur = () => {
  setTimeout(() => {
    searchFocus.value = false;
  }, 200);
};

onMounted(() => {
  checkLoginStatus();
  getHotSearch();
});
</script>
<template>
  <div class="nav">
    <div class="side"></div>
    <div class="main">
      <div class="search">
        <a-input-search
          placeholder="搜索歌曲"
          enter-button
          @focus="searchFocus = true"
          @blur="delayBlur"
          @search="pressEnter"
        />
        <div
          class="hot-search"
          :style="{ display: searchFocus ? 'block' : 'none' }"
        >
          <!-- 标题 -->
          <div class="title">热门搜索</div>
          <!-- 热门搜索列表 -->
          <div
            class="hot-search-item"
            v-for="item in hotSearchList"
            @click.stop="toSearch(item.first)"
          >
            {{ item.first }}
          </div>
        </div>
      </div>
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
  position: fixed;
  height: 64px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  text-align: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  z-index: 100;

  .side {
    height: 100%;
    width: 200px;
    background-color: rgb(240, 243, 246);
  }

  .main {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex: 1;

    padding: 0 50px;

    .user-info {
      padding: 0;
      height: 32px;
      .ant-btn {
        margin-left: 10px;
      }
    }

    .search {
      position: relative;
      width: 300px;
      z-index: 101;
      .ant-input-group-wrapper {
        width: 100%;
      }

      .hot-search {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: inherit;
        .hot-search-item {
          display: inline-block;
          margin: 0 10px 10px 0;
          padding: 5px 10px;
          border: 1px solid #eee;
          border-radius: 4px;
          color: #666;
          cursor: pointer;
          &:hover {
            background-color: #eee;
          }
        }
      }
    }
  }
}
</style>
