<script lang="ts" setup>
import { formatDuration } from '@/utils/format';
import ArtistLine from './ArtistLine.vue';
import Cover from './Cover.vue';
import { usePlayerStore } from '@/stores/player';

defineProps({
  songs: {
    type: Array<Track>,
    required: true,
  },
  id: {
    type: Number,
    default: -1,
  },
});

const player = usePlayerStore();
</script>

<template>
  <div class="song-list">
    <div
      class="song-list-item"
      v-for="(item, index) in songs"
      :key="index"
      @dblclick.native="player.playPlaylistById(id, index)"
    >
      <Cover
        :image-url="item.al.picUrl"
        :show-play-btn="false"
        :img-size="50"
        loading="lazy"
      />
      <!-- 歌曲名称和作者 -->
      <div class="song-info">
        <div class="song-name">
          <span>{{ item.name }}</span>
        </div>
        <ArtistLine :artist="item.ar" class="song-artists" />
      </div>
      <!-- 专辑名 -->
      <div class="song-album">
        <span>{{ item.al.name }}</span>
      </div>
      <!-- 歌曲时长 -->
      <div class="song-duration">
        <span>{{ formatDuration(item.dt) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.song-list {
  .song-list-item {
    display: flex;
    align-items: center;
    padding: 10px 10px;
    cursor: pointer;
    border-radius: 0.75em;

    .song-info {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .song-name {
        font-size: 16px;
        color: #000;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .song-artist {
        font-size: 14px;
        color: #666;
      }
    }

    .song-album {
      flex: 1;
      font-size: 14px;
      color: #666;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .song-duration {
      margin-right: 10px;
      font-size: 14px;
      color: #666;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
