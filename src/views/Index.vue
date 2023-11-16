<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { recommendPlaylists } from '@/api/playlist';
import { topArtists } from '@/api/artist';
import { banner } from '@/api/banner';
import { RightOutlined } from '@ant-design/icons-vue'
import Grid from '@/components/Grid.vue';

const bannerRes = ref([]);
const recommendPlaylistsRes = ref([]);
const topArtistsRes = ref([]);

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
      <div class="left">
        <a-carousel autoplay>
          <div class="banner" v-for="item in bannerRes">
            <img :src="item.imageUrl" alt="">
          </div>
        </a-carousel>
      </div>
      <!-- 中间间距30 -->
      <a-space size="30"></a-space>
      <!-- 右边私人漫游 -->
      <div class="right">
        <a-card title="私人FM">
          <p>私人FM</p>
          <p>听歌识曲，发现音乐</p>
          <a-button type="primary">开始播放</a-button>
        </a-card>
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
      <Grid :items="recommendPlaylistsRes" />
    </div>
    <div class="index-row">
      <h2>热门歌手</h2>
      <Grid :items="topArtistsRes" type="artist" />
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
        object-fit: cover;
      }
    }
  }
}

.right {
  width: calc(50% - 15px);
  height: 200px;

  .ant-card {
    height: 100%;
  }
}

.first-row {
  margin-top: 10px;
}
</style>
