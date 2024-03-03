<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { recommendPlaylists } from '@/api/playlist';
import { topArtists } from '@/api/artist';
import { banner, Banners } from '@/api/banner';
import { RightOutlined } from '@ant-design/icons-vue';
import Grid from '@/components/Grid.vue';
import PrivateFM from '@/components/PrivateFM.vue';
import { usePlayerStore } from '@/stores/player';

const player = usePlayerStore();
const bannerRes = ref<Banners[]>([]);
const recommendPlaylistsRes = ref<PlaylistBaseInfo[]>([]);
const topArtistsRes = ref<PlaylistBaseInfo[]>([]);

onMounted(() => {
  banner().then((res) => {
    bannerRes.value = res.banners;
  });
  recommendPlaylists({ limit: 12 }).then((res) => {
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
    <div class="index-row index-flex first-row">
      <!-- 分为左右两块 -->
      <!-- 左边轮播图 -->
      <div v-if="bannerRes.length" class="left">
        <a-carousel autoplay>
          <div class="banner" v-for="item in bannerRes">
            <img :src="item.imageUrl + 'param?800y400'" alt="" />
          </div>
        </a-carousel>
      </div>
      <div v-else class="left">
        <SkeletonImage :square="false" />
      </div>
      <!-- 中间间距30 -->
      <a-space size="30"></a-space>
      <PrivateFM
        v-if="player.privateFMTrack.picUrl !== '/src/assets/icons/default.svg'"
        class="right"
      />
      <div v-else class="right">
        <SkeletonImage :square="false" />
      </div>
    </div>
    <div class="index-row">
      <div class="title">
        <h2>推荐歌单</h2>
        <a-button>
          <template #icon>
            <RightOutlined />
          </template>
        </a-button>
      </div>
      <Grid :items="recommendPlaylistsRes" :loading-num="12" />
    </div>
    <div class="index-row">
      <h2>热门歌手</h2>
      <Grid :items="topArtistsRes" type="artist" :loading-num="6" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index-row {
  margin-top: 30px;

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    h2 {
      font-size: 28px;
      font-weight: 700;
    }

    .ant-btn {
      margin-left: 10px;
    }
  }
}

.index-flex {
  display: flex;
  justify-content: space-between;

  .left {
    width: calc(50% - 15px);
    height: 200px;

    .ant-carousel {
      img {
        width: 100%;
        height: 200px;
        border-radius: 8px;
      }
    }
  }
}

.right {
  width: calc(50% - 15px);
  height: 200px;
}

.first-row {
  margin-top: 10px;
}
</style>
