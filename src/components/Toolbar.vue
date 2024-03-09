<script lang="ts" setup>
import IconButton from '@/components/IconButton.vue';
import { usePlayerStore } from '@/stores/player';
import { useUIStore } from '@/stores/ui';
import { ref } from 'vue';

const player = usePlayerStore();
const ui = useUIStore();
const showFullScreen = ref<boolean>(false);

player.init();

const formatter = (value: number) => {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const playerQueueBtnClicked = () => {
  ui.showPlayerQueue = !ui.showPlayerQueue;
};
</script>

<template>
  <div class="toolbar">
    <div class="song-info">
      <div
        class="cover"
        @mouseenter="showFullScreen = true"
        @mouseleave="showFullScreen = false"
      >
        <img :src="player.currentTrackInfo.picUrl" alt="" />
        <div v-show="showFullScreen" class="full-screen-btn">
          <img
            src="/src/assets/icons/full-screen.svg"
            alt=""
            @click="ui.showLyric = true"
          />
        </div>
      </div>

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
        :size="45"
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
    <a-popover>
      <template #content>
        <a-slider
          :max="1"
          :min="0"
          v-model:value="player.volume"
          :step="0.01"
          vertical
          :tooltipOpen="false"
          :style="{ height: '100px', width: '10px' }"
          @afterChange="player.setVolume"
        />
        <!-- 怎么只保留整数 -->
        <div :style="{ textAlign: 'center' }">
          {{ (player.volume * 100).toFixed(0) }}%
        </div>
      </template>
      <icon-button
        class="volume-btn"
        :icon="
          player.volume
            ? '/src/assets/icons/volume.svg'
            : '/src/assets/icons/volume-mute.svg'
        "
      ></icon-button>
    </a-popover>
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
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(20px);
  z-index: 100;

  .song-info {
    width: 250px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .cover {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      box-sizing: border-box;
      border-radius: 0.35em;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
      img {
        width: 50px;
        height: 50px;
        border-radius: inherit;
        user-select: none;
      }

      .full-screen-btn {
        position: absolute;
        width: 50px;
        height: 50px;
        cursor: pointer;
        z-index: 2;
        border-radius: 0.35em;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
      }
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
        user-select: none;
      }

      p {
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #999;
        user-select: none;
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

  .volume-text {
    text-align: center;
  }
}
</style>
