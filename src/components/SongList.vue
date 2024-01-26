<script lang="ts" setup>
import { ref } from 'vue';
import { formatDuration } from '@/utils/format';
import ArtistLine from './ArtistLine.vue';
import Cover from './Cover.vue';
import { usePlayerStore } from '@/stores/player';

const props = defineProps({
  songs: {
    type: Array<Track>,
    required: true,
  },
  playlistId: {
    type: String,
    default: -1,
  },
  // 是否分页显示
  isPaging: {
    type: Boolean,
    default: true,
  },
  pageNumber: {
    type: Number,
    default: 1,
  },
  loadSize: {
    type: Number,
    default: 50,
  },
  // 是否以加载全部歌曲
  loadAll: {
    type: Boolean,
    default: true,
  },
});

const player = usePlayerStore();

// 双击歌曲
const songItemDbClicked = (index: number) => {
  player.addTracks(props.playlistId, getSongs(), index, props.loadAll);
};

const getSongs = () => {
  let songs = [];
  props.songs.forEach((item) => {
    songs.push({
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      album: item.al.name,
      artists: item.ar.map((artist) => artist.name).join('/'),
      duration: item.dt,
    });
  });
  return songs;
};
</script>

<template>
  <div class="song-list">
    <div
      v-for="(song, index) in songs.slice(
        isPaging ? (pageNumber - 1) * loadSize : 0,
        isPaging ? (pageNumber - 1) * loadSize + loadSize : songs.length
      )"
      :key="index"
      :class="
        player.playlist.getCurrentTrackId() === song.id
          ? 'song-list-item active'
          : 'song-list-item'
      "
      @dblclick.native="songItemDbClicked(index)"
    >
      <Cover
        :image-url="song.al.picUrl"
        :show-play-btn="false"
        :img-size="50"
        loading="lazy"
      />
      <!-- 歌曲名称和作者 -->
      <div class="song-info">
        <div class="song-name">
          <span>{{ song.name }}</span>
        </div>
        <ArtistLine :artist="song.ar" class="song-artists" />
      </div>
      <!-- 专辑名 -->
      <div class="song-album">
        <span>{{ song.al.name }}</span>
      </div>
      <!-- 歌曲时长 -->
      <div class="song-duration">
        <span>{{ formatDuration(song.dt) }}</span>
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

    &.active {
      background-color: var(--list-active-bg);
    }
  }
}
</style>
