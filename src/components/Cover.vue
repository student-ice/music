<script lang="ts" setup>
import { computed, ref } from 'vue';
import { PlayCircleTwoTone } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const focus = ref(false);
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
    default: '',
  },
  type: {
    type: String,
  },
  id: {
    type: Number,
  },
});

const coverStyles = computed(() => {
  let style = {};
  if (props.type === 'artist') {
    style = {
      'border-radius': '50%',
    };
  }
  return style;
});
const play = () => {
  console.log(props.id);
};


const toPlaylist = () => {
  if (props.type !== 'artist') {
    router.push({
      name: 'playlist',
      params: {
        id: props.id,
      },
    });
  }
};
</script>

<template>
  <div class="cover" @mouseenter="focus = true" @mouseleave="focus = false">
    <div class="hover-show" @click="toPlaylist">
      <PlayCircleTwoTone v-show="focus" class="play-icon" @click.stop="play" />
    </div>
    <img :src="imageUrl" :style="coverStyles" loading="lazy" />
  </div>
</template>

<style lang="scss" scoped>
.cover {
  position: relative;

  transition: transform 0.5s;

  .hover-show {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .play-icon {
      font-size: 40px;

      &:active {
        transform: scale(0.9);
      }
    }

    &:hover {
      cursor: pointer;
    }
  }

  img {
    width: 100%;
    border-radius: 0.75em;
    user-select: none;
    aspect-ratio: 1 / 1;
  }
}
</style>
