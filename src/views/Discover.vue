<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Grid from '@/components/Grid.vue';
import { topPlaylists } from '@/api/playlist';

const categories = ref(['全部', '推荐', '官方', '华语', '欧美', '流行']);
const currentCategory = ref('全部');
const playlists = ref<PlaylistBaseInfo[]>([]);
const loading = ref(false);
const hasMore = ref(true);
var limit = 20;
var offset = 0;

onMounted(() => {
  topPlaylists({ cat: currentCategory.value, limit, offset }).then((res) => {
    if (!res.more) {
      hasMore.value = false;
      return;
    }
    playlists.value = res.playlists;
  });
});

const switchCategories = (item: string) => {
  currentCategory.value = item;
  limit = 20;
  offset = 0;
  loading.value = false;
  hasMore.value = true;
  topPlaylists({ cat: item, limit: 20 }).then((res) => {
    if (!res.more) {
      hasMore.value = false;
      return;
    }
    playlists.value = res.playlists;
    offset += res.playlists.length;
  });
};

const loadMore = () => {
  loading.value = true;
  topPlaylists({
    cat: currentCategory.value,
    limit,
    offset: offset + limit,
  }).then((res) => {
    if (!hasMore) {
      return;
    }
    if (!res.more) {
      hasMore.value = false;
      return;
    }
    playlists.value = playlists.value.concat(res.playlists);
    offset += res.playlists.length;
    loading.value = false;
  });
};
</script>

<template>
  <div class="index-discover">
    <h2>发现歌单</h2>
    <div class="tabs">
      <div
        class="btn"
        v-for="item in categories"
        :class="{ active: item === currentCategory }"
        @click="switchCategories(item)"
      >
        {{ item }}
      </div>
    </div>
    <Grid :items="playlists" :column-num="5" type="discover" />
    <div class="load-more" v-show="hasMore">
      <a-button size="large" :loading="loading" @click="loadMore"
        >加载更多</a-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  margin-top: 10px;
  display: flex;
  align-items: center;
  height: 40px;

  .btn {
    width: 80px;
    height: 40px;
    margin-right: 5px;
    border-radius: 10px;
    background-color: #f5f5f5;
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    font-size: 18px;
  }

  .btn:last-child {
    margin-right: 0;
  }

  .btn.active {
    background-color: var(--highlight-bg-color);
    color: var(--highlight-color);
  }

  .btn:hover {
    cursor: pointer;
    background-color: var(--highlight-bg-color);
    color: var(--highlight-color);
  }
}

.load-more {
  margin-top: 20px;
  text-align: center;
}
</style>
