<script lang="ts" setup>
import { ref } from 'vue';
import LoginQRCode from './LoginQRCode.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const loginModalVisible = ref(false);

const openLoginModal = () => {
  loginModalVisible.value = true;
};

const saveCookie = async (cookie: string) => {
  loginModalVisible.value = false;
  const cookies = cookie.split(';;');
  cookies.map((_cookie) => {
    document.cookie = _cookie;
    const cookieKeyValue = _cookie.split(';')[0].split('=');
    localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1]);
  });
  userStore.setUserProfile();
};

defineExpose({
  openLoginModal,
});
</script>

<template>
  <a-modal
    v-model:open="loginModalVisible"
    centered
    :footer="null"
    @ok="loginModalVisible = false"
  >
    <div class="login-content">
      <a-tabs centered>
        <a-tab-pane key="1" tab="二维码登录"
          ><LoginQRCode @saveCookie="saveCookie"
        /></a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
