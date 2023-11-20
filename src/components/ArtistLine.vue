<script lang="ts" setup>

defineProps({
  artist: {
    type: Array<TrackAl>,
    required: true,
  }
})

</script>
<template>
  <div class="artist">
    <!-- 每个歌手之间用 / 分隔 -->
    <span v-for="(item, index) in artist" :key="index">
      <span>{{ item.name }}</span>
      <span v-if="index !== artist.length - 1"> / </span>
    </span>
  </div>
</template>