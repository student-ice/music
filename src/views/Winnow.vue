<script lang="ts" setup>
import { RightOutlined } from '@ant-design/icons-vue'
import Grid from '@/components/Grid.vue';
import { ref, onMounted } from 'vue';
import { topPlaylists } from "@/api/playlist";
import { newSong } from '@/api/song';

const activeKey = ref('1');
const playlists = ref([]);
const newSongs = ref([]);

onMounted(() => {
  topPlaylists({ cat: "官方", limit: 12 }).then((res) => {
    playlists.value = res.playlists;
  });
  newSong({ limit: 9 }).then((res) => {
    newSongs.value = res.result;
  })
})
</script>

<template>
  <div class="winnow">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="精选">
        <div class="index-row">
          <div class="title">
            <h2>官方歌单</h2>
            <a-button>
              <template #icon>
                <RightOutlined />
              </template>
            </a-button>
          </div>
          <Grid :items="playlists" type="winnow" />
        </div>
        <div class="index-row">
          <div class="title">
            <h2>最新音乐</h2>
            <a-button>
              <template #icon>
                <RightOutlined />
              </template>
            </a-button>
          </div>
          <div class="grid">
            <div class="item" v-for="item in newSongs" :key="item.id">
              <div class="cover">
                <img :src="item.picUrl" alt="" loading="lazy">
              </div>
              <div class="text">
                <span class="title">{{ item.name }}</span>
                <span>{{ item.song.artists[0].name }}</span>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="歌单广场">Content of Tab Pane 2</a-tab-pane>
    </a-tabs>
  </div>
</template>

<style lang="scss" scoped>
.index-row {
  margin-top: 5px;

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

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    .item {
      width: 100%;
      display: flex;
      height: 80px;
      border-radius: 0.75em;
      align-items: center;

      .cover {
        margin-left: 5px;
        height: 95%;

        img {
          height: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 0.75em;
        }
      }

      .text {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          font-size: 16px;
          font-weight: 600;
          color: #000;
          line-height: 20px;
        }
      }

      &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.06);
      }
    }
  }
}
</style>