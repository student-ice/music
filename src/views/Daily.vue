<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { getRecommendSong } from '@/api/song';
import SongList from '@/components/SongList.vue';

const recommendSongs = ref<Track[]>([]);
const pageNumber = ref<number>(1);
const loadSize = ref<number>(50);

onBeforeMount(async () => {
  const { data } = await getRecommendSong();
  recommendSongs.value = data.dailySongs;
});

const pageNumberChanged = (page: number) => {
  pageNumber.value = page;
  console.log(page, pageNumber.value);
  const content = document.querySelector('.ant-layout-content');
  if (content) {
    content.scrollTop = 0;
  }
};
</script>

<template>
  <div class="daily">
    <div class="title">
      <span>每日推荐</span>
    </div>
    <SongList
      :songs="recommendSongs"
      playlist-id="daily"
      :page-number="pageNumber"
      :load-size="loadSize"
    />
    <a-pagination
      v-model:current="pageNumber"
      :total="recommendSongs.length"
      :defaultPageSize="loadSize"
      :showSizeChanger="false"
      show-less-items
      @change="pageNumberChanged"
    />
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

  .ant-pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
