<script lang="ts" setup>
import { usePlayerStore } from '@/stores/player';
import { formatDuration } from '@/utils/format';
import { useUIStore } from '@/stores/ui';

const player = usePlayerStore();
const ui = useUIStore();
</script>

<template>
  <a-drawer
    title="播放列表"
    :forceRender="true"
    :open="ui.showPlayerQueue"
    :bodyStyle="{ padding: 0 }"
    :maskStyle="{
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
    }"
    @close="ui.showPlayerQueue = false"
  >
    <div
      v-for="(song, index) in player.playlist.playlistModel"
      :key="index"
      :class="
        player.playlist.currentIndex === index
          ? 'song-list active'
          : 'song-list'
      "
      @dblclick="player.playAtIndex(index)"
    >
      <Cover
        :image-url="song.picUrl"
        :show-play-btn="false"
        :img-size="50"
        loading="lazy"
      />
      <!-- 歌曲名称和作者 -->
      <div class="song-info">
        <div class="song-name">
          <span>{{ song.name }}</span>
        </div>
        <div class="song-artists">
          <span>{{ song.artists }}</span>
        </div>
      </div>
      <!-- 专辑名 -->
      <div class="song-album">
        <span>{{ song.album }}</span>
      </div>
      <!-- 歌曲时长 -->
      <div class="song-duration">
        <span>{{ formatDuration(song.duration) }}</span>
      </div>
    </div>
  </a-drawer>
</template>

<style lang="scss" scoped>
.song-list {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 0.75em;
  margin-left: 8px;
  user-select: none;
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
</style>
