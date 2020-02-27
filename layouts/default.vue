<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" sticky class="bg-white shadow-sm">
      <b-navbar-brand tag="h1" class="mb-0 d-flex align-items-center" :to="{name : 'index'}">
        <b-icon variant="primary" font-scale="2" icon="outlet"></b-icon>No More Bin Days
      </b-navbar-brand>

      <b-navbar-toggle target="null" @click="navOpen = true"></b-navbar-toggle>
      <sidebar v-model="navOpen">
        <h5 class="text-primary">No More Bin Days</h5>
        <hr />
        <b-navbar-nav>
          <b-nav-item-dropdown text="Products" right>
            <b-dropdown-item :to="{name : 'Products'}">A-Z</b-dropdown-item>
            <b-dropdown-item :to="{name : 'Locations'}">Categories</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Locations" right>
            <b-dropdown-item :to="{name : 'shops'}">A-Z</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{name : 'Bins' }">Bins</b-nav-item>
          <b-nav-item :to="{name : 'About' }">About</b-nav-item>
          <b-nav-item :to="{name : 'News' }">News</b-nav-item>
          <b-nav-item :to="{name : 'DidYouKnow' }">Did you know?</b-nav-item>

          <!--    <b-nav-item href="#">Blogs</b-nav-item>
          <b-nav-item href="#">Bins</b-nav-item>
          <b-nav-item href="#">Composting</b-nav-item>-->
          <client-only placeholder="Loading...">
            <b-nav-item-dropdown v-if="isLoggedIn" text="Admin" right>
              <b-dropdown-item :to="{name : 'ProductAdmin'}">Product Admin</b-dropdown-item>
              <b-dropdown-item :to="{name : 'ShopAdmin'}">Shop Admin</b-dropdown-item>
            </b-nav-item-dropdown>
          </client-only>
        </b-navbar-nav>
        <b-navbar-nav>
          <client-only placeholder="Loading...">
            <b-nav-item v-if="!isLoggedIn">
              <b-button v-b-modal.login-modal variant="outline-primary">Login</b-button>
              <b-modal hide-footer title="Login" centered id="login-modal">
                <b-form @submit.prevent="onSubmit">
                  <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
                    <b-form-input id="input-1" v-model="form.email" type="email" required></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-2" label="Password" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.password" type="password" required></b-form-input>
                  </b-form-group>

                  <div class="d-flex justify-content-between w-100">
                    <button class="btn btn-secondary" type="button" @click="$bvModal.hide('login-modal')">Cancel</button>
                    <button class="btn btn-primary" type="submit">Login</button>
                  </div>
                </b-form>
              </b-modal>
            </b-nav-item>
            <b-nav-item-dropdown v-else right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{user.email}}</em>
              </template>
              <b-dropdown-item @click="logout">Log out</b-dropdown-item>
            </b-nav-item-dropdown>
          </client-only>
          <b-nav-item class="position-absolute" style="bottom : 0; right : 5">
            <small>{{ version }}</small>
          </b-nav-item>
        </b-navbar-nav>
      </sidebar>

      <b-navbar-nav class="text-right d-none d-lg-flex">
        <b-nav-item-dropdown text="Products" right>
          <b-dropdown-item :to="{name : 'Products'}">A-Z</b-dropdown-item>
          <b-dropdown-item :to="{name : 'Locations'}">Categories</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Locations" right>
          <b-dropdown-item :to="{name : 'shops'}">A-Z</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="{name : 'Bins' }">Bins</b-nav-item>
        <b-nav-item :to="{name : 'About' }">About</b-nav-item>
        <b-nav-item :to="{name : 'News' }">News</b-nav-item>
        <b-nav-item :to="{name : 'DidYouKnow' }">Did you know?</b-nav-item>

        <!--    <b-nav-item href="#">Blogs</b-nav-item>
          <b-nav-item href="#">Bins</b-nav-item>
        <b-nav-item href="#">Composting</b-nav-item>-->
        <client-only placeholder="Loading...">
          <b-nav-item-dropdown v-if="isLoggedIn" text="Admin" right>
            <b-dropdown-item :to="{name : 'ProductAdmin'}">Product Admin</b-dropdown-item>
            <b-dropdown-item :to="{name : 'ShopAdmin'}">Shop Admin</b-dropdown-item>
          </b-nav-item-dropdown>
        </client-only>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto text-right d-none d-lg-flex">
        <b-nav-item>
          <small>{{ version }}</small>
        </b-nav-item>
        <client-only placeholder="Loading...">
          <b-nav-item v-if="!isLoggedIn">
            <b-button v-b-modal.login-modal variant="outline-primary">Login</b-button>
            <b-modal hide-footer title="Login" centered id="login-modal">
              <b-form @submit.prevent="onSubmit">
                <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
                  <b-form-input id="input-1" v-model="form.email" type="email" required></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Password" label-for="input-2">
                  <b-form-input id="input-2" v-model="form.password" type="password" required></b-form-input>
                </b-form-group>

                <div class="d-flex justify-content-between w-100">
                  <button class="btn btn-secondary" type="button" @click="$bvModal.hide('login-modal')">Cancel</button>
                  <button class="btn btn-primary" type="submit">Login</button>
                </div>
              </b-form>
            </b-modal>
          </b-nav-item>
          <b-nav-item-dropdown v-else right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{user.email}}</em>
            </template>
            <b-dropdown-item @click="logout">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
        </client-only>
      </b-navbar-nav>
    </b-navbar>
    <nuxt />
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Sidebar from '@/components/Sidebar.vue'
const packageInfo = require('../package.json')
export default Vue.extend({
  name: 'app',
  components: {
    Sidebar
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user']),
    version() {
      return packageInfo.version
    }
  },
  data() {
    return {
      navOpen: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  watch: {
    $route: function () {
      this.navOpen = false
    }
  },
  created() {
    if (process.client) {
      var user = window.localStorage.getItem('recycle-user')
      if (user != undefined) {
        this.$store.commit('setUser', {
          email: user
        })
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT')
      this.$router.push({ name: 'Index' })
    },
    async onSubmit() {
      await this.$store.dispatch('LOGIN', this.form)
      //this.$bvModal.hide('login-modal')
    }
  }
})
</script>

<style lang="scss">
@import '../theme';
body {
  background-color: #fcfcfa !important;
}
</style>
