<script lang="ts" setup>
import { computed } from 'vue';
import Cover from '@/components/Cover.vue';
const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
  columnNum: {
    type: Number,
    default: 5,
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
    type: String
  },
});

const rowStyles = computed(() => {
  return {
    'grid-template-columns': `repeat(${props.columnNum}, 1fr)`,
    gap: props.gap,
  };
});

const getImageUrl = (item) => {
  if (props.type === 'artist') {
    return item.img1v1Url;
  } else if (props.type === 'discover') {
    return item.coverImgUrl;
  }
  return item.picUrl;
};
</script>

<template>
  <div class="cover-grid" :style="rowStyles">
    <div class="item" v-for="item in items" :class="{ artist: props.type === 'artist' }">
      <Cover :image-url="getImageUrl(item)" :type="type" />
      <div class="text">
        {{ item.name }}
      </div>
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
</style>
