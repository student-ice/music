<script setup lang="ts"></script>
<template>
  <div class="nav">
    <div class="side"></div>
    <div class="main">
      <a-input-search placeholder="搜索歌曲" enter-button />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 100;

  .side {
    height: 100%;
    width: 200px;
    background-color: rgb(240, 243, 246);
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
  }

  .main {
    position: relative;
    display: flex;
    flex: 1;

    .ant-input-group-wrapper {
      width: 300px;
    }

    padding: 0 50px;

  }
}
</style>
