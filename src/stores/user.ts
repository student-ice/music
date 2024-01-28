import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserProfile, getLikeList } from '@/api/user';
import { logout } from '@/api/login';

export const useUserStore = defineStore('user', () => {
  const loginStatus = ref<boolean>(false);
  const userId = ref<number>(0);
  const userNickName = ref<string>('');
  const userAvatar = ref<string>('');
  const userLikeList = ref<number[]>([]);

  const setUserProfile = async () => {
    if (loginStatus.value) return;
    const { profile } = await getUserProfile();
    userId.value = profile.userId;
    userNickName.value = profile.nickname;
    userAvatar.value = profile.avatarUrl;
    loginStatus.value = true;
    userLikeList.value = (await getLikeList(userId.value)).ids;
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
    userLikeList,
    setUserProfile,
    loginOut,
  }
})