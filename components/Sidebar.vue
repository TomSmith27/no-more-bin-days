<template>
  <div class="sidebar-container">
    <div v-if="value" class="modal-backdrop" @click="$emit('input', false)"></div>
    <div class="sidebar" :class="{'sidebar-show' : value}">
      <b-navbar-nav class="text-right">
        <b-nav-item-dropdown text="Products" right>
          <b-dropdown-item :to="{name : 'Products'}">A-Z</b-dropdown-item>
          <b-dropdown-item :to="{name : 'Locations'}">Categories</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Locations" right>
          <b-dropdown-item class="d-none d-xl-block" :to="{name : 'shops'}">A-Z</b-dropdown-item>
          <b-dropdown-item>Categories</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="{name : 'Bins' }">Bins</b-nav-item>
        <b-nav-item :to="{name : 'About' }">About</b-nav-item>
        <b-nav-item :to="{name : 'News' }">News</b-nav-item>
        <b-nav-item :to="{name : 'DidYouKnow' }">Did you know?</b-nav-item>

        <!--    <b-nav-item href="#">Blogs</b-nav-item>
          <b-nav-item href="#">Bins</b-nav-item>
        <b-nav-item href="#">Composting</b-nav-item>-->
        <client-only placeholder="Loading...">
          <!--        <b-nav-item-dropdown v-if="isLoggedIn" text="Admin" right>
            <b-dropdown-item :to="{name : 'ProductAdmin'}">Product Admin</b-dropdown-item>
            <b-dropdown-item :to="{name : 'ShopAdmin'}">Shop Admin</b-dropdown-item>
          </b-nav-item-dropdown>-->
        </client-only>
      </b-navbar-nav>
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
  right: -30vw;
  width: 30vw;
  background: red;
  transition: right 0.5s;

  &-show {
    right: 0;
  }
}
</style>