<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { recommendPlaylists } from '@/api/playlist';
import { topArtists } from '@/api/artist';
import Grid from '@/components/Grid.vue';

const recommendPlaylistsRes = ref([]);
const topArtistsRes = ref([]);

onMounted(() => {
  recommendPlaylists({ limit: 10 }).then((res) => {
    recommendPlaylistsRes.value = res.result;
  });
  topArtists().then((res) => {
    // 根据 res.artists.length 生成一个随机数，<= res.artists.length - 6 ,然后截取
    const random = Math.floor(Math.random() * (res.artists.length - 6));
    topArtistsRes.value = res.artists.slice(random, random + 6);
  });
});
</script>
<template>
  <div>
    <div class="index-row first-row">
      <h2>每日推荐</h2>
      <Grid :items="recommendPlaylistsRes" />
    </div>
    <div class="index-row">
      <h2>热门歌手</h2>
      <Grid :items="topArtistsRes" :column-num="6" type="artist" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index-row {
  margin-top: 30px;

  h2 {
    margin-bottom: 10px;
    font-size: 28px;
    font-weight: 700;
  }
}

.first-row {
  margin-top: 10px;
}
</style>
