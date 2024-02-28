import { defineStore } from "pinia";
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {


  // 显示播放列表
  const showPlayerQueue = ref<boolean>(false);

  // 显示歌词页面
  const showLyric = ref<boolean>(false);

  // 是否折叠侧边栏
  const isCollapsed = ref<boolean>(false);

  return {
    showPlayerQueue,
    showLyric,
    isCollapsed
  }
})