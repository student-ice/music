<template>
  <a-button
    :style="{ width: size + 'px', height: size + 'px' }"
    :disabled="disable"
  >
    <img
      :src="icon"
      :style="{ width: size - 5 + 'px', height: size - 5 + 'px' }"
    />
  </a-button>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: '',
  },
  disable: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 35,
  },
});
</script>

<style lang="scss" scoped>
.ant-btn {
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;

  &:hover {
    background: rgba(184, 190, 196, 0.8);
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>
