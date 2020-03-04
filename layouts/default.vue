<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" sticky class="bg-white shadow-sm py-0 pl-0">
      <b-navbar-brand tag="h1" class="mb-0 mr-0 p-0 d-flex align-items-center" :to="{ name: 'index' }">
        <Logo style="width : 220px" />
      </b-navbar-brand>

      <b-navbar-toggle target="null" @click="navOpen = true"></b-navbar-toggle>
      <sidebar v-model="navOpen">
        <nuxt-link :to="{ name: 'index' }">
          <sidebar-logo />
        </nuxt-link>
        <hr />
        <b-navbar-nav>
          <button @click="install">Install</button>
          <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
          <b-nav-item :to="{ name: 'Bins' }">Bins</b-nav-item>
          <b-nav-item :to="{ name: 'Contact' }">Contact</b-nav-item>
          <b-nav-item :to="{ name: 'DidYouKnow' }">Did you know?</b-nav-item>
          <b-nav-item-dropdown text="Locations" right>
            <b-dropdown-item :to="{ name: 'shops' }">A-Z</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Products" right>
            <b-dropdown-item :to="{ name: 'Products' }">A-Z</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'ProductCategories' }">Categories</b-dropdown-item>
          </b-nav-item-dropdown>

          <!--    <b-nav-item href="#">Blogs</b-nav-item>
          <b-nav-item href="#">Bins</b-nav-item>
          <b-nav-item href="#">Composting</b-nav-item>-->
          <client-only placeholder="Loading...">
            <b-nav-item-dropdown v-if="isLoggedIn" text="Admin" right>
              <b-dropdown-item :to="{ name: 'ProductAdmin' }">Product Admin</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'ShopAdmin' }">Shop Admin</b-dropdown-item>
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
                <em>{{ user.email }}</em>
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
        <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
        <b-nav-item :to="{ name: 'Bins' }">Bins</b-nav-item>
        <b-nav-item :to="{ name: 'Contact' }">Contact</b-nav-item>
        <b-nav-item :to="{ name: 'DidYouKnow' }">Did you know?</b-nav-item>
        <b-nav-item-dropdown text="Locations" right>
          <b-dropdown-item :to="{ name: 'shops' }">A-Z</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Products" right>
          <b-dropdown-item :to="{ name: 'Products' }">A-Z</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'ProductCategories' }">Categories</b-dropdown-item>
        </b-nav-item-dropdown>

        <!--    <b-nav-item href="#">Blogs</b-nav-item>
          <b-nav-item href="#">Bins</b-nav-item>
        <b-nav-item href="#">Composting</b-nav-item>-->
        <client-only placeholder="Loading...">
          <b-nav-item-dropdown v-if="isLoggedIn" text="Admin" right>
            <b-dropdown-item :to="{ name: 'ProductAdmin' }">Product Admin</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'ShopAdmin' }">Shop Admin</b-dropdown-item>
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
              <em>{{ user.email }}</em>
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
import Logo from '@/components/Logo.vue'
import SidebarLogo from '@/components/SidebarLogo.vue'
const packageInfo = require('../package.json')
export default Vue.extend({
  name: 'app',
  components: {
    Sidebar,
    Logo,
    SidebarLogo
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
      },
      deferredPrompt: {} as Event
    }
  },
  watch: {
    $route: function() {
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
  mounted() {
    console.log('test2')
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e
      // Update UI notify the user they can install the PWA
    })
  },
  methods: {
    install() {
      const deferredPrompt = this.deferredPrompt as any
      // Show the install prompt
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
      })
    },
    logout() {
      this.$store.dispatch('LOGOUT')
      this.$router.push({ name: 'Index' })
    },
    async onSubmit() {
      await this.$store.dispatch('LOGIN', this.form)
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
