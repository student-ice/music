import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { songUrl, songDetail } from '@/api/song';
import { usePlaylistStore, TrackModel } from './playlist';
import { getPrivateFM } from '@/api/recommend';

export enum PlayState {
  Playing = 0,
  Paused,
  Stopped
}

export const usePlayerStore = defineStore(
  'player', () => {
    const audio = new Audio();

    // 播放列表
    const playlist = usePlaylistStore();

    // 播放列表歌曲信息
    const currentTrackInfo = ref<TrackModel>({
      id: 0,
      name: '未知歌曲',
      picUrl: '/src/assets/icons/default.svg',
      album: '未知专辑',
      artists: '未知歌手',
      duration: 0
    });

    // 当前播放进度
    const position = ref<number>(0);
    // 当前播放时长
    const duration = ref<number>(0);
    const positionStr = ref<string>('00:00');
    const durationStr = ref<string>('00:00');

    // 播放状态
    const playState = ref<PlayState>(PlayState.Stopped);

    // 是否正在播放私人FM
    const isPrivateFM = ref<boolean>(false);
    // 私人FM当前歌曲信息
    const privateFMTrack = ref<TrackModel>({
      id: 0,
      name: '未知歌曲',
      picUrl: '/src/assets/icons/default.svg',
      album: '未知专辑',
      artists: '未知歌手',
      duration: 0
    })

    const init = async () => {
      audio.volume = 0.2;
      const { data } = await getPrivateFM();
      privateFMTrack.value = {
        id: data[0].id,
        name: data[0].name,
        picUrl: data[0].album.picUrl,
        album: data[0].album.name,
        artists: data[0].artists.map(v => v.name).join(' / '),
        duration: data[0].duration
      }
      console.log('初始化播放器完成');
    }

    // 添加到播放列表,并且判断是否播放
    function addToPlaylist(track: TrackModel, isPlay: boolean = false) {
      isPrivateFM.value = false;
      if (playlist.playlistId !== 'single') {
        playlist.clearPlaylist();
      }

      playlist.addTrack(track)
      playlist.playlistId = 'single';
      if (isPlay) {
        if (playlist.playlistCount >= 1) {
          playAtIndex(playlist.playlistCount - 1);
        }
      }
      console.log("播放列表歌曲数: " + playlist.playlistCount)
    }

    // 添加播放列表歌曲到播放列表，并播放
    function addTracks(id: number, songs: TrackModel[], index: number = -1) {
      isPrivateFM.value = false;
      if (playlist.playlistId === id.toString()) {
        if (index === -1) {
          playAtIndex(0);
        } else {
          playAtIndex(index);
        }
        return;
      }
      // 执行到这里，说明是新的歌单
      playlist.clearPlaylist();
      playlist.playlistId = id.toString();
      playlist.addTracks(songs);
      if (index === -1) {
        playAtIndex(0);
      } else {
        playAtIndex(index);
      }
    }

    // 播放私人FM下一首
    async function nextPrivateFM() {
      isPrivateFM.value = true;
      const { data } = await getPrivateFM()
      privateFMTrack.value = {
        id: data[0].id,
        name: data[0].name,
        picUrl: data[0].album.picUrl,
        album: data[0].album.name,
        artists: data[0].artists.map(v => v.name).join(' / '),
        duration: data[0].duration
      }
      currentTrackInfo.value = privateFMTrack.value;
      play();
    }

    // 播放私人FM
    async function playPrivateFM() {
      isPrivateFM.value = true;
      if (currentTrackInfo.value.id !== privateFMTrack.value.id) {
        currentTrackInfo.value = privateFMTrack.value;
        play();
      } else {
        playOrPause();
      }
    }

    // 播放指定索引的歌曲
    function playAtIndex(index: number) {
      playlist.currentIndex = index;
      play();
    }

    function play() {
      let id: number = 0;
      if (isPrivateFM.value) {
        id = privateFMTrack.value.id;
      } else {
        id = playlist.getCurrentTrackId();
      }
      songUrl({ id }).then(res => {
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
      playlist.previous();
      play();
    }

    // 下一首
    function next() {
      if (isPrivateFM.value) {
        nextPrivateFM();
        return;
      }
      playlist.next();
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

    // 更新歌曲信息
    function updateSongInfo() {
      let ids: string = '';
      if (isPrivateFM.value) {
        ids = privateFMTrack.value.id.toString();
      } else {
        ids = playlist.getCurrentTrackId().toString();
      }
      songDetail({ ids }).then(res => {
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
      playlist.switchPlayMode();
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
      next();
    })

    watch(() => { return playlist.currentIndex }, async (newValue, oldValue) => {
      console.log('currentIndex changed:', "new ", newValue, " old ", oldValue)
      console.log('播放列表歌曲数量: ' + playlist.playlistCount)
      if (newValue === -1) return;
      updateSongInfo();
    }, { deep: true })

    return {
      playlist,
      currentTrackInfo,
      playState,
      position,
      duration,
      positionStr,
      durationStr,
      isPrivateFM,
      privateFMTrack,
      init,
      play,
      playOrPause,
      seek,
      addToPlaylist,
      previous,
      next,
      switchPlayMode,
      playAtIndex,
      addTracks,
      playPrivateFM,
      nextPrivateFM
    }
  }
);