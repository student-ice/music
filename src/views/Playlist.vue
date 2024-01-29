<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { formatDate } from '@/utils/format';
import { useRoute } from 'vue-router';
import { playlistDetail } from '@/api/playlist';
import { CaretRightFilled } from '@ant-design/icons-vue';
import { usePlayerStore } from '@/stores/player';
import Cover from '@/components/Cover.vue';
import SongList from '@/components/SongList.vue';
import { songDetail } from '@/api/song';

const route = useRoute();
const loading = ref<boolean>(false);
console.log('歌单id: ', route.params.id);
const playlistInfo = ref<PlaylistDetailPlaylist>();
const songs = ref<Track[]>([]);
const count = ref<number>(0);
const pageNumber = ref<number>(1);
const loadSize = ref<number>(50);

const loadSongs = async () => {
  let ids = [];
  playlistInfo.value.trackIds.forEach((item) => {
    ids.push(item.id);
  });
  const _songs = await songDetail(ids.join(','));
  songs.value = _songs.songs;
  loading.value = false;
};

// 初始化
const init = async () => {
  loading.value = true;
  const res = await playlistDetail({ id: route.params.id });
  playlistInfo.value = res.playlist;
  count.value = res.playlist.trackCount;
  await loadSongs();
};

onMounted(async () => {
  init();
});

const pageNumberChanged = (page: number) => {
  pageNumber.value = page;
  console.log(page, pageNumber.value);
  const content = document.querySelector('.ant-layout-content');
  if (content) {
    content.scrollTop = 0;
  }
};

watch(
  () => route.params.id,
  async () => {
    init();
  }
);
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
          <a-button size="large" type="primary">
            <template #icon>
              <CaretRightFilled style="font-size: 21px" />
            </template>
            播放
          </a-button>
          <a-button size="large" style="margin-left: 10px">收藏</a-button>
        </div>
      </div>
    </div>
    <SongList
      :songs="songs"
      :playlist-id="playlistInfo.id.toString()"
      :page-number="pageNumber"
      :load-size="loadSize"
    />
    <a-pagination
      v-model:current="pageNumber"
      :total="songs.length"
      :defaultPageSize="loadSize"
      :showSizeChanger="false"
      show-less-items
      @change="pageNumberChanged"
    />
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
.playlist {
  .ant-pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
