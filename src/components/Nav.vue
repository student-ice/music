<script setup lang="ts"></script>
<template>
  <nav>
    <ul>
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/discover">发现</router-link></li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to right bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.5));
  backdrop-filter: blur(80px);
  z-index: 100;

  ul {
    position: relative;
    display: flex;

    li {
      width: 80px;
      line-height: 40px;
      text-align: center;

      a {
        display: block;
        font-size: 20px;
        width: 100%;
        height: 100%;
      }

      a.router-link-exact-active {
        font-weight: bold;
        color: var(--highlight-color);
      }

      a:hover {
        /* 鼠标变成小手 */
        cursor: pointer;
        background-color: rgba(209, 209, 214, 0.28);
        border-radius: 10px;
      }
    }
  }
}
</style>
