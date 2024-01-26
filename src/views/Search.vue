<script lang="ts" setup>
import SongList from '@/components/SongList.vue';
import { ref, onBeforeMount, watch } from 'vue';
import { getSearchResult } from '@/api/search';
import { useRoute } from 'vue-router';

const route = useRoute();
const search = ref<Track[]>([]);
const loadSize = ref<number>(50);
const count = ref<number>(0);
const loadAll = ref<boolean>(false);
const loading = ref<boolean>(false);

onBeforeMount(async () => {
  const { result } = await getSearchResult({
    keywords: route.params.keywords as string,
    limit: loadSize.value,
    offset: 0,
    type: 1,
  });
  search.value = result.songs;
  count.value = result.songCount;
  if (search.value.length >= count.value) {
    loadAll.value = true;
  }
});

const loadMore = async () => {
  loading.value = true;
  const { result } = await getSearchResult({
    keywords: route.params.keywords as string,
    limit: loadSize.value,
    offset: search.value.length,
    type: 1,
  });
  search.value = search.value.concat(result.songs);
  if (search.value.length >= count.value) {
    loadAll.value = true;
  }
  loading.value = false;
};

watch(
  () => route.params.keywords,
  async () => {
    const { result } = await getSearchResult({
      keywords: route.params.keywords as string,
      limit: loadSize.value,
      offset: 0,
      type: 1,
    });
    search.value = result.songs;
    count.value = result.songCount;
    if (search.value.length >= count.value) {
      loadAll.value = true;
    }
  }
);
</script>

<template>
  <div class="search">
    <SongList
      :songs="search"
      :playlist-id="`search-${route.params.keywords}`"
      :is-paging="false"
      :load-all="loadAll"
    />
    <!-- 加载更多按钮 -->
    <div class="load-more" v-show="!loadAll">
      <a-button size="large" :loading="loading" @click="loadMore"
        >加载更多</a-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  .load-more {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
