<template>
  <div class="sidebar-container text-right">
    <div v-if="value" class="modal-backdrop" @click="$emit('input', false)"></div>
    <div class="sidebar bg-white shadow p-3" :class="{'sidebar-show' : value}">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    value: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
}
.sidebar {
  z-index: 1041;
  position: fixed;
  height: 100%;
  top: 0;
  right: -40vw;
  width: 40vw;
  transition: right 0.5s;

  &-show {
    right: 0;
  }
}
</style>