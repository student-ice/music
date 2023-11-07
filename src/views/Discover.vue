<script setup lang="ts">
import { ref, onMounted } from "vue";
import Grid from "@/components/Grid.vue";
import { topPlaylists } from "@/api/playlist";

const categories = ref(["全部", "推荐", "官方", "华语", "欧美", "流行"]);
const currentCategory = ref("全部");
const playlists = ref([]);

onMounted(() => {
  topPlaylists({ cat: categories[0], limit: 20 }).then((res) => {
    console.log(res);
    playlists.value = res.playlists;
  });
});

const switchCategories = (item: string) => {
  currentCategory.value = item;
  topPlaylists({ cat: item, limit: 20 }).then((res) => {
    playlists.value = res.playlists;
  });
};
</script>

<template>
  <div class="index-discover">
    <h2>发现歌单</h2>
    <div class="tabs">
      <div class="btn" v-for="item in categories" :class="{ active: item === currentCategory }"
        @click="switchCategories(item)">
        {{ item }}
      </div>
    </div>
    <Grid :items="playlists" :column-num="5" type="discover" />
  </div>
</template>


<style lang="scss" scoped>
.tabs {
  margin-top: 10px;
  display: flex;
  align-items: center;
  height: 40px;

  .btn {
    width: 80px;
    height: 40px;
    margin-right: 5px;
    border-radius: 10px;
    background-color: #f5f5f5;
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    font-size: 18px;
  }

  .btn:last-child {
    margin-right: 0;
  }

  .btn.active {
    background-color: #d9ecff;
    color: #409EFF;
  }

  .btn:hover {
    cursor: pointer;
    background-color: #d9ecff;
    color: #409EFF;
  }
}
</style>
