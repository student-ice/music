<script lang="ts" setup>
import { useUIStore } from '@/stores/ui';
import { ref, watch } from 'vue';
import { usePlayerStore } from '@/stores/player';
import * as Vibrant from 'node-vibrant/dist/vibrant.min.js';
import Color from 'color';
import { getLyric } from '@/api/song';
import { parseLyric } from '@/utils/lyric';
import IconButton from './IconButton.vue';

const ui = useUIStore();
const player = usePlayerStore();

const background = ref<string>('rgb(240, 243, 246)');
const lyric = ref<Array<{ time: number; content: string }>>([]);
const hightlightIndex = ref<number>(1);
const lyricTimer = ref<NodeJS.Timeout>(null);

const getLyricData = async () => {
  clearInterval(lyricTimer.value);
  lyric.value = [];
  const { lrc } = await getLyric({ id: player.currentTrackInfo.id });
  lyric.value = parseLyric(lrc.lyric);
  lyricScroll();
};

const lyricScroll = () => {
  lyricTimer.value = setInterval(() => {
    const currentTime = player.position;
    let left = 0;
    let right = lyric.value.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (lyric.value[mid].time > currentTime) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    const index = left;
    if (index >= 0 && index !== hightlightIndex.value) {
      hightlightIndex.value = index - 1;
      scrollTo(index - 1);
    }
  }, 500);
};

const scrollTo = (index: number) => {
  const el = document.getElementById(`line-${index}`);
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

const clickLyric = (index: number) => {
  hightlightIndex.value = index;
  player.seek(lyric.value[index].time);
};

watch(
  () => player.currentTrackInfo.picUrl,
  () => {
    const url = `${player.privateFMTrack.picUrl}?param=256y256`;
    Vibrant.from(url)
      .getPalette()
      .then((palette) => {
        const originColor = Color.rgb(palette.DarkMuted._rgb);
        const color = originColor.darken(0.1).rgb().string();
        const color2 = originColor.lighten(0.28).rotate(-30).rgb().string();
        background.value = `linear-gradient(to top left, ${color}, ${color2})`;
      });
  },
  { immediate: true, deep: true }
);

watch(
  () => player.currentTrackInfo.id,
  () => {
    getLyricData();
  },
  { deep: true }
);

watch(
  () => {
    return player.playState;
  },
  () => {
    if (!player.playState) {
      lyricScroll();
    } else {
      clearInterval(lyricTimer.value);
    }
  },
  { deep: true }
);
</script>

<template>
  <Transition name="fade">
    <div class="lyric-page" :style="{ background }">
      <div class="close-btn" @click="ui.showLyric = false">
        <img src="/src/assets/icons/down.svg" alt="" />
      </div>
      <div class="left-content">
        <div class="cover">
          <img
            :src="`${player.currentTrackInfo.picUrl}?param=1024y1024`"
            alt=""
          />
          <div
            class="shadow"
            :style="{
              backgroundImage: `url(${player.currentTrackInfo.picUrl})`,
            }"
          ></div>
        </div>
        <div class="info">
          <div class="name">{{ player.currentTrackInfo.name }}</div>
          <div class="artist">{{ player.currentTrackInfo.artists }}</div>
        </div>
        <div class="controls">
          <IconButton
            icon="/src/assets/icons/previous-light.svg"
            :size="50"
            @click="player.previous"
          />
          <IconButton
            :icon="
              !player.playState
                ? '/src/assets/icons/pause-light.svg'
                : '/src/assets/icons/play-light.svg'
            "
            :size="55"
            @click="player.playOrPause"
          />
          <IconButton
            icon="/src/assets/icons/next-light.svg"
            :size="50"
            @click="player.next"
          />
        </div>
      </div>
      <div class="right-content">
        <div class="lyric-container" @mouseleave="">
          <div
            class="lyric-line"
            v-for="(line, index) in lyric"
            :id="`line-${index}`"
            :key="index"
            :class="{ hightlight: hightlightIndex === index }"
            @dblclick="clickLyric(index)"
          >
            <span>{{ line.content }}</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.lyric-page {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: aquamarine;

  display: flex;
  justify-content: center;
  align-items: center;

  .close-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 0.35em;

    img {
      width: 25px;
      height: 25px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: scale(0.9);
    }
  }

  .left-content {
    margin-left: 10%;
    margin-right: 2%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .cover {
      position: relative;
      width: 60vh;
      height: 60vh;
      border-radius: 10px;

      img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        object-fit: cover;
      }

      .shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        filter: blur(16px) opacity(0.7);
        z-index: -1;
        background-size: cover;
      }
    }

    .info {
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .name {
        font-size: 24px;
        font-weight: 600;
        color: #fff;
        user-select: none;
      }

      .artist {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        user-select: none;
      }
    }

    .controls {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

  .right-content {
    margin-left: 2%;

    .lyric-container {
      width: 100vh;
      height: 90vh;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      transition: 0.5s;
      font-weight: 600;
      .lyric-line {
        margin: 2px 0;
        padding: 10px 15px;
        transition: 0.5s;
        cursor: pointer;
        border-radius: 6px;

        span {
          font-size: 20px;
          color: #d5d3d3;
          user-select: none;
        }

        &:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.3);
        }
      }

      .hightlight {
        opacity: 1;
        background: rgba(255, 255, 255, 0.3);
        span {
          color: #fff;
        }
      }
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }
}

.fade-enter-from {
  transform: translateY(100%);
}
.fade-enter-active {
  transition: all 0.6s;
}

.fade-enter-to {
  transform: translateY(0);
}
.fade-leave-from {
  transform: translateY(0);
}
.fade-leave-active {
  transition: all 0.6s;
}
.fade-leave-to {
  transform: translateY(100%);
}
</style>
