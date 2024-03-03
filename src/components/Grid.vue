<script lang="ts" setup>
import { computed } from 'vue';
import Cover from '@/components/Cover.vue';
import SkeletonImage from './SkeletonImage.vue';

const props = defineProps({
  items: {
    type: Array<PlaylistBaseInfo>,
    required: true,
  },
  columnNum: {
    type: Number,
    default: 6,
  },
  gap: {
    type: String,
    default: '44px 24px',
  },
  radius: {
    type: String,
    default: '0.75em',
  },
  type: {
    type: String,
  },
  loadingNum: {
    type: Number,
  },
});

const rowStyles = computed(() => {
  return {
    'grid-template-columns': `repeat(${props.columnNum}, 1fr)`,
    gap: props.gap,
  };
});

const getImageUrl = (item: PlaylistBaseInfo) => {
  return item.picUrl;
};
</script>

<template>
  <div v-if="items.length" class="cover-grid" :style="rowStyles">
    <div
      class="item"
      v-for="item in items"
      :class="{ artist: props.type === 'artist' }"
    >
      <Cover :image-url="getImageUrl(item)" :type="type" :id="item.id" />
      <div class="text">
        {{ item.name }}
      </div>
    </div>
  </div>
  <div v-else class="cover-grid-loading" :style="rowStyles">
    <div
      class="item"
      v-for="index in loadingNum"
      :class="{ artist: props.type === 'artist' }"
    >
      <SkeletonImage :type="props.type" />
      <a-skeleton-button :block="true" :active="true" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cover-grid {
  display: grid;
  margin-top: 20px;

  .item {
    .text {
      margin-top: 8px;
      margin-bottom: 5px;
      color: #000;
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-all;
      user-select: none;
    }

    .text:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

.item.artist {
  display: flex;
  flex-direction: column;
  text-align: center;

  .cover {
    display: flex;
  }

  .text {
    margin-top: 4px;
  }
}

.cover-grid-loading {
  display: grid;
  margin-top: 20px;

  .item {
    display: flex;
    flex-direction: column;

    .ant-skeleton-button {
      border-radius: 0.75em;
    }
  }
}
</style>
