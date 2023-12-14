import { defineStore } from 'pinia';
import { ref } from 'vue';
import { songUrl } from '@/api/song';

export enum PlayState {
  Playing = 0,
  Paused,
  Stopped
}

export const usePlayerStore = defineStore(
  'player', () => {
    const audio = new Audio();

    const position = ref<number>(0);
    const duration = ref<number>(0);
    const positionStr = ref<string>('00:00');
    const durationStr = ref<string>('00:00');

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
      playState.value = PlayState.Stopped;
    })

    const init = () => {
      audio.volume = 0.2;
    }

    // 播放状态
    const playState = ref<PlayState>(PlayState.Stopped);

    function play(id: number) {
      // 获取歌曲url
      songUrl({ id }).then(res => {
        audio.src = res.data[0].url;
        audio.play();
        playState.value = PlayState.Playing;
      })
    }

    function playOrPause() {
      if (audio.src === '') return;
      if (playState.value === PlayState.Playing) {
        audio.pause();
        playState.value = PlayState.Paused;
      } else {
        audio.play();
        playState.value = PlayState.Playing;
      }
    }

    // 快进
    function seek(time: number) {
      audio.currentTime = time;
    }

    function formatTime(time: number): string {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);
      return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    }

    return {
      playState,
      position,
      duration,
      positionStr,
      durationStr,
      init,
      play,
      playOrPause,
      seek
    }
  }
);