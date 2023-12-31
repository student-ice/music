<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { formatDate } from '@/utils/format';
import { useRoute } from 'vue-router';
import { playlistDetail, playlistTrackAll } from '@/api/playlist';
import { CaretRightFilled } from '@ant-design/icons-vue';
import { usePlayerStore } from '@/stores/player';
import Cover from '@/components/Cover.vue';
import SongList from '@/components/SongList.vue';

const route = useRoute();
const player = usePlayerStore();
const loading = ref(false);
console.log('歌单id: ', route.params.id);
const playlistInfo = ref<PlaylistDetailPlaylist>();
const songs = ref<Track[]>([]);
const count = ref<number>(0);
const limit = ref<number>(50);
const offset = ref<number>(0);
const hasMore = ref<boolean>(true);

const loadMoreSongs = async () => {
  loading.value = true;
  if (offset.value + limit.value >= count.value) {
    limit.value = count.value - offset.value;
  }
  try {
    const res = await playlistTrackAll({
      id: Number(route.params.id),
      limit: limit.value,
      offset: offset.value,
    });
    songs.value.push(...res.songs);
    offset.value += limit.value;
    if (offset.value >= count.value) {
      hasMore.value = false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const res = await playlistDetail({ id: route.params.id });
  playlistInfo.value = res.playlist;
  count.value = res.playlist.trackCount;
  if (count.value < limit.value) {
    limit.value = count.value;
    hasMore.value = false;
  }
  await loadMoreSongs();
});
</script>
<template>
  <div v-if="playlistInfo !== undefined" class="playlist">
    <div class="header">
      <!-- 歌单封面 -->
      <Cover :image-url="playlistInfo.coverImgUrl" :img-size="260" />
      <!-- 歌单信息 -->
      <div class="playlist-info">
        <div class="title">
          <span>{{ playlistInfo.name }}</span>
        </div>
        <div class="description">
          <span>{{ playlistInfo.description }}</span>
        </div>

        <div class="creator">
          <Cover
            :image-url="playlistInfo.creator.avatarUrl"
            type="artist"
            :img-size="40"
            :show-play-btn="false"
          />
          <span>{{ playlistInfo.creator.nickname }}</span>
          <span>创建于{{ formatDate(playlistInfo.createTime) }}</span>
        </div>

        <div class="buttons">
          <a-button
            size="large"
            type="primary"
            @click="player.playPlaylistById(playlistInfo.id)"
          >
            <template #icon>
              <CaretRightFilled style="font-size: 21px" />
            </template>
            播放
          </a-button>
          <a-button size="large" style="margin-left: 10px">收藏</a-button>
        </div>
      </div>
    </div>
    <SongList :songs="songs" :id="playlistInfo.id" />
    <!-- 加载更多按钮 -->
    <div class="load-more" v-show="hasMore">
      <a-button size="large" :loading="loading" @click="loadMoreSongs"
        >加载更多</a-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;

  .playlist-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;

    .title {
      font-size: 36px;
      font-weight: 700;
      color: #000;
    }

    .creator {
      margin-top: 20px;
      display: flex;
      align-items: center;

      span {
        margin-left: 10px;
        font-size: 16px;
        color: #2d2c2c;
      }
    }

    .description {
      margin-top: 20px;
      font-size: 16px;
      color: #2d2c2c;
      overflow: hidden;

      span {
        /* 超出两行后显示省略号 */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }

    .buttons {
      margin-top: 30px;
    }
  }
}

.load-more {
  margin-top: 20px;
  text-align: center;
}
</style>
