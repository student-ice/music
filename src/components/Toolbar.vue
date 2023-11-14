<template>
  <div class="toolbar">
    <div class="controls">
      <icon-button icon="src/assets/icons/previous.svg"></icon-button>
      <icon-button icon="src/assets/icons/play.svg"></icon-button>
      <icon-button icon="src/assets/icons/next.svg"></icon-button>
    </div>

    <div class="slider">
      <span>00:00</span>
      <a-slider></a-slider>
      <span>03:00</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconButton from '@/components/IconButton.vue';
</script>

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
