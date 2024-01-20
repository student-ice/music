import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserProfile } from '@/api/user';
import { logout } from '@/api/login';

export const useUserStore = defineStore('user', () => {
  const loginStatus = ref<boolean>(false);
  const userId = ref<number>(0);
  const userNickName = ref<string>('');
  const userAvatar = ref<string>('');

  const setUserProfile = async () => {
    const { profile } = await getUserProfile();
    loginStatus.value = true;
    userId.value = profile.userId;
    userNickName.value = profile.nickname;
    userAvatar.value = profile.avatarUrl;
  }

  const loginOut = async () => {
    const { code } = await logout();
    if (code !== 200) return;
    loginStatus.value = false;
    userId.value = 0;
    userNickName.value = '';
    userAvatar.value = '';
  }

  return {
    loginStatus,
    userId,
    userNickName,
    userAvatar,
    setUserProfile,
    loginOut
  }
})