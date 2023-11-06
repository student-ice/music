<script setup lang="ts">
import Nav from '@/components/Nav.vue';
</script>

<template>
  <div id="app">
    <Nav />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>
#app {
  width: 100%;
  transition: all 0.3s;
}

main {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: auto;
  padding: 64px 10vw 96px 10vw;
}
</style>
