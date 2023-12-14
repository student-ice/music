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
</script>

<template>
  <div class="toolbar">
    <div class="controls">
      <icon-button icon="/src/assets/icons/previous.svg"></icon-button>
      <icon-button
        :icon="
          player.playState
            ? '/src/assets/icons/play.svg'
            : '/src/assets/icons/pause.svg'
        "
        @click="player.playOrPause"
      ></icon-button>
      <icon-button icon="/src/assets/icons/next.svg"></icon-button>
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
}
</style>
