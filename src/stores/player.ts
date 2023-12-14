import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { songUrl } from '@/api/song';

export enum PlayState {
  Playing = 0,
  Paused,
  Stopped
}

export enum PlayMode {
  Loop = 0,
}

interface PlaylistModel {
  id: number;
  name: string;
  picUrl: string;
  album: string;
  artists: string;
  duration: number;
}

export const usePlayerStore = defineStore(
  'player', () => {
    const audio = new Audio();

    // 播放列表
    const playlist = ref<PlaylistModel[]>([]);
    // 当前播放索引
    const currentIndex = ref<number>(0);
    // 播放列表歌曲数量
    const playlistCount = ref<number>(0);
    // 播放模式
    const playMode = ref<PlayMode>(PlayMode.Loop);
    // 当前播放进度
    const position = ref<number>(0);
    // 当前播放时长
    const duration = ref<number>(0);
    const positionStr = ref<string>('00:00');
    const durationStr = ref<string>('00:00');

    const init = () => {
      audio.volume = 0.2;
    }

    // 当前播放歌曲封面
    const currentPicUrl = ref<string>('/src/assets/icons/default.svg');

    // 当前播放歌曲名
    const currentName = ref<string>('未知歌曲');

    // 当前播放歌手名
    const currentArtist = ref<string>('未知歌手');

    // 播放状态
    const playState = ref<PlayState>(PlayState.Stopped);

    // 添加到播放列表,并且判断是否播放
    function addToPlaylist(item: PlaylistModel, isPlay: boolean = false) {
      // 判断是否已经存在
      const index = playlist.value.findIndex(v => v.id === item.id);
      if (index !== -1) {
        if (isPlay) {
          playAtIndex(index);
        }
        return;
      }
      playlist.value.push(item);
      playlistCount.value++;
      if (isPlay) {
        playAtIndex(playlist.value.length - 1);
        if (playlist.value.length === 1) {
          updateSongInfo();
        }
      }
    }

    // 播放指定索引的歌曲
    function playAtIndex(index: number) {
      if (index < 0 || index >= playlist.value.length) return;
      currentIndex.value = index;
      play();
    }

    function play() {
      songUrl({ id: playlist.value[currentIndex.value].id }).then(res => {
        if (res.data[0].url) {
          audio.src = res.data[0].url;
          audio.play().catch(err => {
            console.error('播放失败:', err);
          });
          playState.value = PlayState.Playing;
        } else {
          console.error('获取歌曲 URL 失败');
        }
      })
    }

    // 上一首
    function previous() {
      switchPreviousSong();
      play();
    }

    // 下一首
    function next() {
      switchNextSong();
      play();
    }

    function playOrPause() {
      if (audio.src === '') return;
      if (playState.value === PlayState.Playing) {
        playState.value = PlayState.Paused;
        audio.pause();
      } else {
        playState.value = PlayState.Playing;
        audio.play();
      }
    }

    // 快进
    function seek(time: number) {
      audio.currentTime = time;
    }

    // 根据播放模式，切换下一首歌曲
    function switchNextSong() {
      switch (playMode.value) {
        case PlayMode.Loop:
          if (currentIndex.value === playlist.value.length - 1) {
            currentIndex.value = 0;
          } else {
            currentIndex.value++;
          }
          break;
      }
    }

    // 根据播放模式，切换上一首歌曲
    function switchPreviousSong() {
      switch (playMode.value) {
        case PlayMode.Loop:
          if (currentIndex.value === 0) {
            currentIndex.value = playlist.value.length - 1;
          } else {
            currentIndex.value--;
          }
          break;
      }
    }

    // 更新歌曲信息
    function updateSongInfo() {
      currentPicUrl.value = playlist.value[currentIndex.value].picUrl;
      currentName.value = playlist.value[currentIndex.value].name;
      currentArtist.value = playlist.value[currentIndex.value].artists;
    }

    function formatTime(time: number): string {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);
      return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    }

    // 监听播放进度
    audio.addEventListener('timeupdate', () => {
      position.value = audio.currentTime;
      positionStr.value = formatTime(audio.currentTime);
    });
    // 监听播放时长
    audio.addEventListener('durationchange', () => {
      duration.value = audio.duration;
      durationStr.value = formatTime(audio.duration);
    })
    audio.addEventListener('ended', () => {
      switchNextSong()
    })

    watch(currentIndex, () => {
      updateSongInfo();
    })

    return {
      currentIndex,
      playlistCount,
      playState,
      playMode,
      position,
      duration,
      positionStr,
      durationStr,
      currentPicUrl,
      currentName,
      currentArtist,
      init,
      play,
      playOrPause,
      seek,
      addToPlaylist,
      previous,
      next
    }
  }
);