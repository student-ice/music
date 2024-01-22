<script lang="ts" setup>
import { watch, ref } from 'vue';
import IconButton from './IconButton.vue';
import { usePlayerStore } from '@/stores/player';
import * as Vibrant from 'node-vibrant/dist/vibrant.min.js';
import Color from 'color';

const player = usePlayerStore();

const background = ref('');

watch(
  () => {
    return player.privateFMTrack.picUrl;
  },
  () => {
    const url = `${player.privateFMTrack.picUrl}?param=512y512`;
    Vibrant.from(url)
      .getPalette()
      .then((palette) => {
        const color = Color.rgb(palette.Vibrant._rgb)
          .darken(0.1)
          .rgb()
          .string();
        const color2 = Color.rgb(palette.Vibrant._rgb)
          .lighten(0.28)
          .rotate(-30)
          .rgb()
          .string();
        background.value = `linear-gradient(to top left, ${color}, ${color2})`;
      });
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="private-fm">
    <div class="overlay" :style="{ background }"></div>
    <img :src="player.privateFMTrack.picUrl" :width="180" :height="180" />
    <div class="content">
      <div class="info">
        <span class="name">{{ player.privateFMTrack.name }}</span>
        <span class="artist">{{ player.privateFMTrack.artists }}</span>
        <span class="album">{{ player.privateFMTrack.album }}</span>
      </div>
      <div class="control">
        <IconButton
          :icon="
            !player.playState && player.isPrivateFM
              ? '/src/assets/icons/pause-light.svg'
              : '/src/assets/icons/play-light.svg'
          "
          @click="player.playPrivateFM"
        />
        <IconButton
          icon="/src/assets/icons/next-light.svg"
          @click="player.nextPrivateFM"
        />
      </div>
    </div>
    <div class="tip">
      <img src="/src/assets/icons/fm.svg" alt="" />
      <span>私人 FM</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.private-fm {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 10px;
  border-radius: 8px;
  z-index: 1;
  color: #efefef;

  img {
    border-radius: 8px;
  }

  .content {
    flex: 1;
    height: 180px;
    margin-left: 10px;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 70%;
      padding-left: 10px;
      .name {
        font-size: 22px;
        font-weight: 700;
      }

      .artist {
        margin-top: 10px;
        font-size: 18px;
      }

      .album {
        font-size: 18px;
      }
    }

    .control {
      display: flex;
      align-items: center;
      height: 30%;
    }
  }
  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: 150% 150%;
    background-position: center;
    border-radius: 8px;
    z-index: -1;
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #0f0e0e60;
      backdrop-filter: blur(30px);
      box-sizing: border-box;
      border-radius: 8px;
    }
  }
  .tip {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    right: 10px;
    bottom: 10px;
    font-size: 16px;
    color: #efefef;
    font-weight: 700;

    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
