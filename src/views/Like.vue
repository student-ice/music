<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { songDetail } from '@/api/song';
import { useUserStore } from '@/stores/user';
import SongList from '@/components/SongList.vue';

const user = useUserStore();
const likeSongs = ref<Track[]>([]);
const pageNumber = ref<number>(1);
const loadSize = ref<number>(50);

onBeforeMount(async () => {
  const ids = user.userLikeList.join(',');
  const { songs } = await songDetail(ids);
  likeSongs.value = songs;
});

const pageNumberChanged = (page: number) => {
  pageNumber.value = page;
  const content = document.querySelector('.ant-layout-content');
  if (content) {
    content.scrollTop = 0;
  }
};
</script>

<template>
  <div class="like">
    <div class="title">
      <span>喜欢的音乐</span>
    </div>
    <SongList
      :songs="likeSongs"
      playlist-id="like"
      :page-number="pageNumber"
      :load-size="loadSize"
    />
    <a-pagination
      v-model:current="pageNumber"
      :total="likeSongs.length"
      :defaultPageSize="loadSize"
      :showSizeChanger="false"
      show-less-items
      @change="pageNumberChanged"
    />
  </div>
</template>

<style lang="scss" scoped>
.like {
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
