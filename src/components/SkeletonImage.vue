<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
  type: {
    type: String,
    default: 'normal',
  },
  // 宽高是否相等
  square: {
    type: Boolean,
    default: true,
  },
});

const imageStyles = computed(() => {
  let styles: {
    aspectRatio?: number;
    height?: string;
    borderRadius?: string;
  } = {};
  if (props.square) {
    styles['aspectRatio'] = 1;
  } else {
    styles['height'] = '100%';
  }
  if (props.type === 'artist') {
    styles['borderRadius'] = '50%';
  } else {
    styles['borderRadius'] = '0.75em';
  }
  return styles;
});
</script>

<template>
  <div class="img-loading" :style="imageStyles">
    <img src="/src/assets/icons/skeleton-image.svg" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.img-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 0.75em;
  background: rgba(0, 0, 0, 0.06);
  margin-bottom: 5px;
}
</style>
