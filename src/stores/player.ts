import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { songUrl, songDetail } from '@/api/song';
import { playlistDetail } from '@/api/playlist';

export enum PlayState {
  Playing = 0,
  Paused,
  Stopped
}

export enum PlayMode {
  CurrentItemInLoop = 0,
  Loop,
  Random
}

export interface TrackInfo {
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
    const playlist = ref<{ id: number }[]>([]);

    // 播放列表歌曲信息
    const currentTrackInfo = ref<TrackInfo>({
      id: 0,
      name: '未知歌曲',
      picUrl: '/src/assets/icons/default.svg',
      album: '未知专辑',
      artists: '未知歌手',
      duration: 0
    });
    // 当前播放列表ID
    const currentPlaylistId = ref<string>('0');
    // 当前播放索引
    const currentIndex = ref<number>(-1);
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

    // 播放状态
    const playState = ref<PlayState>(PlayState.Stopped);
    // 播放模式图标
    const playModeIcon = ref<string>('/src/assets/icons/loop.svg');

    const init = () => {
      audio.volume = 0.2;
    }

    // 添加到播放列表,并且判断是否播放
    function addToPlaylist(id: number, isPlay: boolean = false) {
      // 判断是否已经存在
      const index = playlist.value.findIndex(v => v.id === id);
      if (index !== -1) {
        if (isPlay) {
          playAtIndex(index);
        }
        return;
      }
      playlist.value.push({ id: id });
      playlistCount.value++;
      currentPlaylistId.value = 'single';
      if (isPlay) {
        if (playlistCount.value >= 1) {
          playAtIndex(playlistCount.value - 1);
        }
      }
      console.log("播放列表歌曲数: " + playlistCount.value)
    }

    // 根据歌单ID添加到播放列表，并播放
    function playPlaylistById(id: number, index: number = -1) {
      if (currentPlaylistId.value === id.toString()) {
        if (index === -1) {
          playAtIndex(0);
        } else {
          playAtIndex(index);
        }
        return;
      }
      // 执行到这里，说明是新的歌单
      currentIndex.value = -1;
      playlistDetail({ id: id.toString() }).then(res => {
        const ids = res.playlist.trackIds.map(v => v.id);
        playlist.value = ids.map(v => { return { id: v } });
        playlistCount.value = playlist.value.length;
        currentPlaylistId.value = id.toString();
        if (index === -1) {
          playAtIndex(0);
        } else {
          playAtIndex(index);
        }
        console.log("播放列表歌曲数: " + playlistCount.value)
      })

    }

    // 播放指定索引的歌曲
    function playAtIndex(index: number) {
      currentIndex.value = index;
      play();
    }

    function play() {
      songUrl({ id: playlist.value[currentIndex.value].id }).then(res => {
        if (res.data[0].url) {
          audio.src = res.data[0].url;
          audio.play().catch(err => {
            console.error('播放失败:', err);
          }).then(() => {
            playState.value = PlayState.Playing;
          })
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
        case PlayMode.CurrentItemInLoop:
          play();
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

    // 根据播放模式，切换上一首歌曲
    function switchPreviousSong() {
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

    // 更新歌曲信息
    // 必须先保证 currentIndex 切换后，再调用此函数获取对应的歌曲信息
    function updateSongInfo() {
      songDetail({ ids: playlist.value[currentIndex.value].id.toString() }).then(res => {
        const song = res.songs[0];
        currentTrackInfo.value = {
          id: song.id,
          name: song.name,
          picUrl: song.al.picUrl,
          album: song.al.name,
          artists: song.ar.map(v => v.name).join(' / '),
          duration: song.dt
        }
      })
    }

    // 切换播放模式
    function switchPlayMode() {
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

    watch(currentIndex, async (newValue, oldValue) => {
      console.log('currentIndex changed:', "new ", newValue, " old ", oldValue)
      if (newValue === -1) return;
      updateSongInfo();
    })

    return {
      currentTrackInfo,
      currentIndex,
      playlistCount,
      playState,
      playMode,
      playModeIcon,
      position,
      duration,
      positionStr,
      durationStr,
      init,
      play,
      playOrPause,
      seek,
      addToPlaylist,
      previous,
      next,
      switchPlayMode,
      playAtIndex,
      playPlaylistById
    }
  }
);