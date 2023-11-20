<template>
  <a-button :class="{ 'play-button': isPlayBtn }">
    <img :src="icon" />
  </a-button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  icon: {
    type: String,
    default: ''
  }
})

const isPlayBtn = computed(() => props.icon === '/src/assets/icons/play.svg')
</script>

<style lang="scss" scoped>
.ant-btn {
  width: 35px;
  height: 35px;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;

  &:hover {
    background: rgba(184, 190, 196, 0.8);
  }

  &:active {
    transform: scale(0.9);
  }

  img {
    width: 35px;
    height: 35px;
  }
}

.play-button {
  width: 45px;
  height: 45px;

  img {
    width: 45px;
    height: 45px;
  }
}
</style>
