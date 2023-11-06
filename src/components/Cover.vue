<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
    default: '',
  },
  type: {
    type: String,
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
</script>

<template>
  <div class="cover">
    <el-image :src="imageUrl" :style="coverStyles" lazy></el-image>
  </div>
</template>

<style>
.el-image {
  width: 100%;
  border-radius: 0.75em;
  user-select: none;
  aspect-ratio: 1 / 1;
}
</style>
