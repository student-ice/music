<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { theme } from 'ant-design-vue';
import { getQrKey, checkQr } from '@/api/login';

const emit = defineEmits(['saveCookie']);
const { useToken } = theme;
const { token } = useToken();
const qrImg = ref<string>('');
const qrStatus = ref<string>('loading');
const qrInterval = ref<NodeJS.Timeout>();

const getQrImg = async () => {
  qrStatus.value = 'loading';
  const { data } = await getQrKey();
  qrImg.value = `https://music.163.com/login?codekey=${data.unikey}`;
  qrStatus.value = 'active';
  checkQrStatus(data.unikey);
};

// 检查二维码扫码状态
const checkQrStatus = (key: string) => {
  qrInterval.value = setInterval(async () => {
    const res = await checkQr(key);
    console.log(res);
    switch (res.code) {
      case 800: // 二维码过期
        qrStatus.value = 'expired';
        break;
      case 801: // 等待扫码
        qrStatus.value = 'active';
        break;
      case 802: // 已扫描
        qrStatus.value = 'scanned';
        break;
      case 803: // 已确认登录
        clearInterval(qrInterval.value);
        qrStatus.value = 'active';
        emit('saveCookie', res.cookie);
        break;
    }
  }, 1000);
};

onBeforeMount(() => {
  getQrImg();
});
</script>

<template>
  <div class="login-qr">
    <a-qrcode
      :size="240"
      :color="token.colorPrimary"
      :value="qrImg"
      :status="qrStatus"
      @refresh="getQrImg"
    />
    <div class="tip">请打开云音乐 APP 扫码登录</div>
  </div>
</template>

<style lang="scss" scoped>
.login-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  .tip {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
