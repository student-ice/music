<script lang="ts" setup>
import IconButton from '@/components/IconButton.vue';
import { usePlayerStore } from '@/stores/player';

const player = usePlayerStore();

player.init();

const formatter = (value: number) => {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const playerQueueBtnClicked = () => {
  player.showPlayerQueue = !player.showPlayerQueue;
};
</script>

<template>
  <div class="toolbar">
    <div class="song-info">
      <img :src="player.currentTrackInfo.picUrl" alt="" />
      <div class="info">
        <h3>{{ player.currentTrackInfo.name }}</h3>
        <p>{{ player.currentTrackInfo.artists }}</p>
      </div>
    </div>
    <div class="controls">
      <icon-button
        v-show="!player.isPrivateFM"
        icon="/src/assets/icons/previous.svg"
        @click="player.previous"
      ></icon-button>
      <icon-button
        :icon="
          player.playState
            ? '/src/assets/icons/play.svg'
            : '/src/assets/icons/pause.svg'
        "
        @click="player.playOrPause"
      ></icon-button>
      <icon-button
        icon="/src/assets/icons/next.svg"
        @click="player.next"
      ></icon-button>
    </div>

    <div class="slider">
      <span>{{ player.positionStr }}</span>
      <a-slider
        :min="0"
        :max="player.duration"
        v-model:value="player.position"
        :step="0.1"
        :tip-formatter="formatter"
        @afterChange="player.seek"
      ></a-slider>
      <span>{{ player.durationStr }}</span>
    </div>
    <!-- 播放模式按钮 -->
    <icon-button
      class="play-mode-btn"
      :disable="player.isPrivateFM"
      :icon="player.playlist.playModeIcon"
      @click="player.switchPlayMode"
    ></icon-button>
    <icon-button
      :disable="player.isPrivateFM"
      icon="/src/assets/icons/player-queue.svg"
      @click="playerQueueBtnClicked"
    >
    </icon-button>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.86);
  display: flex;
  align-items: center;
  justify-content: center;

  .song-info {
    width: 250px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border: 1px solid #eee;
      border-radius: 0.35em;
      /* 阴影 */
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    }

    .info {
      /* 固定宽度 */
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      h3 {
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 5px;
      }

      p {
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #999;
      }
    }
  }

  .slider {
    width: 50%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .ant-slider {
      width: 100%;
    }

    span {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .controls {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .play-mode-btn {
    margin-left: 10px;
  }
}
</style>
