<template>
  <Transition name="fade">
    <div class="player-queue">
      <h2>播放列表</h2>
      <div
        v-for="(song, index) in player.playlist.playlistModel"
        :class="
          player.playlist.currentIndex === index
            ? 'song-list active'
            : 'song-list'
        "
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
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { usePlayerStore } from '@/stores/player';
import { formatDuration } from '@/utils/format';

const player = usePlayerStore();
</script>

<style lang="scss" scoped>
.player-queue {
  position: fixed;
  top: 5px;
  right: 5px;
  bottom: calc(60px + 5px);
  width: 300px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  overflow-y: scroll;
  border-radius: 5px;
  z-index: 100;

  h2 {
    padding: 10px 10px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }

  .song-list {
    display: flex;
    align-items: center;
    padding: 10px 10px;
    cursor: pointer;
    border-radius: 0.75em;
    margin-left: 8px;
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
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
.fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.4s;
}

.fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.fade-leave-active {
  transition: all 0.4s;
}
.fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
