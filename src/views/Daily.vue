<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { getRecommendSong } from '@/api/song';
import SongList from '@/components/SongList.vue';

const recommendSongs = ref<Track[]>([]);

onBeforeMount(async () => {
  const { data } = await getRecommendSong();
  recommendSongs.value = data.dailySongs;
});
</script>

<template>
  <div class="daily">
    <div class="title">
      <span>每日推荐</span>
    </div>
    <SongList :songs="recommendSongs" :playlist-id="111" />
  </div>
</template>

<style lang="scss" scoped>
.daily {
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;

    span {
      font-size: 40px;
      font-weight: 700;
    }
  }
}
</style>
