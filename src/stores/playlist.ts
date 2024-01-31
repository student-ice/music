import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface TrackModel {
  id: number;
  name: string;
  picUrl: string;
  album: string;
  artists: string;
  duration: number;
}

export enum PlayMode {
  CurrentItemInLoop = 0,
  Loop,
  Random
}

export const usePlaylistStore = defineStore(
  'playlist', () => {
    // 当前播放列表ID
    const playlistId = ref<string>('0');
    // 歌曲id列表
    const playlist = ref<{ id: number }[]>([]);
    // 歌曲信息列表
    const playlistModel = ref<TrackModel[]>([]);
    // 当前播放下标
    const currentIndex = ref<number>(-1);
    // 当前播放列表歌曲数
    const playlistCount = ref<number>(0);
    // 播放模式
    const playMode = ref<PlayMode>(PlayMode.Loop);
    // 播放模式图标
    const playModeIcon = ref<string>('/src/assets/icons/loop.svg');

    // 上一首
    const previous = (): void => {
      if (playlistCount.value <= 0) {
        return;
      }
      // 根据播放模式切换上一首
      switch (playMode.value) {
        case PlayMode.CurrentItemInLoop:
          break;
        case PlayMode.Loop:
          if (currentIndex.value === 0) {
            currentIndex.value = playlist.value.length - 1;
          } else {
            currentIndex.value--;
          }
          break;
        case PlayMode.Random:
          currentIndex.value = Math.floor(Math.random() * playlist.value.length);
          break;
      }
    }

    // 下一首
    const next = (): void => {
      if (playlistCount.value <= 0) {
        return;
      }
      // 根据播放模式切换下一首
      switch (playMode.value) {
        case PlayMode.CurrentItemInLoop:
          break;
        case PlayMode.Loop:
          if (currentIndex.value === playlist.value.length - 1) {
            currentIndex.value = 0;
          } else {
            currentIndex.value++;
          }
          break;
        case PlayMode.Random:
          currentIndex.value = Math.floor(Math.random() * playlist.value.length);
          break;
      }
    }

    // 切换播放模式
    const switchPlayMode = (): void => {
      switch (playMode.value) {
        case PlayMode.CurrentItemInLoop:
          playMode.value = PlayMode.Loop;
          playModeIcon.value = '/src/assets/icons/loop.svg';
          break;
        case PlayMode.Loop:
          playMode.value = PlayMode.Random;
          playModeIcon.value = '/src/assets/icons/random.svg';
          break;
        case PlayMode.Random:
          playMode.value = PlayMode.CurrentItemInLoop;
          playModeIcon.value = '/src/assets/icons/currentiteminloop.svg';
          break;
      }
    }

    // 添加单曲到播放列表
    const addTrack = (track: TrackModel): void => {
      playlist.value.push({ id: track.id });
      playlistModel.value.push(track);
      playlistCount.value++;
    }
    // 批量添加歌曲到播放列表
    const addTracks = (tracks: TrackModel[]): void => {
      tracks.forEach(v => {
        playlist.value.push({ id: v.id });
        playlistModel.value.push(v);
        playlistCount.value++;
      })
    }

    const removeTrack = (index: number): void => {
      playlist.value.splice(index, 1);
      playlistModel.value.splice(index, 1);
      playlistCount.value--;
    }

    const clearPlaylist = (): void => {
      playlist.value = [];
      playlistModel.value = [];
      playlistCount.value = 0;
      currentIndex.value = -1;
    }

    const getCurrentTrackId = (): number => {
      if (currentIndex.value === -1) {
        return -1;
      }
      return playlist.value[currentIndex.value].id;
    }

    const getCurrentTrack = (): TrackModel => {
      if (currentIndex.value === -1) {
        return {
          id: 0,
          name: '未知歌曲',
          picUrl: '/src/assets/icons/default.svg',
          album: '未知专辑',
          artists: '未知歌手',
          duration: 0
        }
      }
      return playlistModel.value[currentIndex.value];
    }

    return {
      playlist,
      playlistId,
      playlistModel,
      currentIndex,
      playlistCount,
      playMode,
      playModeIcon,
      previous,
      next,
      switchPlayMode,
      addTrack,
      addTracks,
      removeTrack,
      clearPlaylist,
      getCurrentTrackId,
      getCurrentTrack
    };
  }
);