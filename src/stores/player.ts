import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { songUrl, songDetail } from '@/api/song';
import { usePlaylistStore, TrackModel } from './playlist';
import { getPrivateFM } from '@/api/recommend';
import { Howler, Howl } from 'howler';

export enum PlayState {
  Playing = 0,
  Paused,
  Stopped
}

export const usePlayerStore = defineStore(
  'player', () => {
    const audio = ref<Howl>(null);

    const currentTimeTimer = ref<NodeJS.Timeout>(null);

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

    /**
     * 添加播放列表歌曲到播放列表，并播放
     * @param id 歌单id
     * @param songs 歌曲信息
     * @param index 要播放的歌曲下标
     * @param loadAll 歌单歌曲是否全部加载
     * @returns 
     */
    function addTracks(id: string, songs: TrackModel[], index: number = -1, loadAll: boolean = true) {
      isPrivateFM.value = false;
      if (playlist.playlistId === id && loadAll) {
        if (index === -1) {
          playAtIndex(0);
        } else {
          playAtIndex(index);
        }
        return;
      }
      // 执行到这里，说明是新的歌单
      playlist.clearPlaylist();
      playlist.playlistId = id;
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
      clearInterval(currentTimeTimer.value);
      position.value = 0;
      positionStr.value = '00:00';
      duration.value = 0;
      durationStr.value = '00:00';
      Howler.unload();
      let id: number = 0;
      if (isPrivateFM.value) {
        id = privateFMTrack.value.id;
      } else {
        id = playlist.getCurrentTrackId();
      }
      songUrl({ id }).then(res => {
        if (res.data[0].url) {
          audio.value = new Howl({
            src: [res.data[0].url],
            format: ["mp3", "flac"],
            html5: true,
            preload: "metadata",
            volume: 0.5,
            onplay: () => {
              playState.value = PlayState.Playing;
              updatePosition();
              updateDuration();
            },
            onpause: () => {
              playState.value = PlayState.Paused;
              clearInterval(currentTimeTimer.value);
            },
            onstop: () => {
              playState.value = PlayState.Stopped;
            },
            onend: () => {
              next();
            },
          });
          audio.value.play();
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
      if (audio.value === null) return;
      if (playState.value === PlayState.Playing) {
        audio.value.pause();
      } else {
        audio.value.play();
      }
    }

    // 快进
    function seek(time: number) {
      audio.value.seek(time);
    }

    // 更新歌曲信息
    function updateSongInfo() {
      let ids: string = '';
      if (isPrivateFM.value) {
        ids = privateFMTrack.value.id.toString();
        songDetail(ids).then(res => {
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
      } else {
        currentTrackInfo.value = playlist.getCurrentTrack();
      }

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

    // 定时获取歌曲播放进度
    function updatePosition() {
      clearInterval(currentTimeTimer.value);
      currentTimeTimer.value = setInterval(() => {
        position.value = audio.value.seek();
        positionStr.value = formatTime(position.value);
      }, 250);
    }
    // 获取歌曲时长
    function updateDuration() {
      duration.value = audio.value.duration();
      durationStr.value = formatTime(duration.value);
    }
    watch(() => { return playlist.currentIndex }, async (newValue, oldValue) => {
      console.log('currentIndex changed:', "new ", newValue, " old ", oldValue)
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