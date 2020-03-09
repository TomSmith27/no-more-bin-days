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
          <b-nav-item href="https://www.instagram.com/accounts/login/?next=%2Fno_more_bin_days%2F&source=follow">Follow us on instagram</b-nav-item>
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
    <footer class="footer shadow-sm">
      <div class="container text-center">
        <a target="_blank" href="https://www.instagram.com/accounts/login/?next=%2Fno_more_bin_days%2F&source=follow">
          Find us on Instagram
          <svg
            height="32"
            width="32"
            style="enable-background:new 0 0 512 512;"
            version="1.1"
            viewBox="0 0 512 512"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <style type="text/css">
  .st0 {
    fill: url(#SVGID_1_);
  }
  .st1 {
    fill: #ffffff;
  }
            </style>
            <g id="Edges" />
            <g id="Background">
              <radialGradient
                cx="62.8233"
                cy="997.7359"
                gradientTransform="matrix(0.9986 -5.233596e-02 -4.448556e-02 -0.8488 44.4709 1334.337)"
                gradientUnits="userSpaceOnUse"
                id="SVGID_1_"
                r="684.5226"
              >
                <stop offset="0" style="stop-color:#FED576" />
                <stop offset="0.2634" style="stop-color:#F47133" />
                <stop offset="0.6091" style="stop-color:#BC3081" />
                <stop offset="1" style="stop-color:#4C63D2" />
              </radialGradient>
              <path class="st0" d="M431,492.7H81.3c-34.2,0-61.9-27.7-61.9-61.9V81.1c0-34.2,27.7-61.9,61.9-61.9H431c34.2,0,61.9,27.7,61.9,61.9   v349.7C492.9,465,465.2,492.7,431,492.7z" />
            </g>
            <g id="Symbol">
              <g>
                <path
                  class="st1"
                  d="M255.1,139.9c37.9,0,42.4,0.1,57.4,0.8c13.8,0.6,21.4,2.9,26.4,4.9c6.6,2.6,11.4,5.7,16.3,10.6    c5,5,8,9.7,10.6,16.3c1.9,5,4.3,12.5,4.9,26.4c0.7,15,0.8,19.5,0.8,57.4s-0.1,42.4-0.8,57.4c-0.6,13.8-2.9,21.4-4.9,26.4    c-2.6,6.6-5.7,11.4-10.6,16.3c-5,5-9.7,8-16.3,10.6c-5,1.9-12.5,4.3-26.4,4.9c-15,0.7-19.5,0.8-57.4,0.8s-42.4-0.1-57.4-0.8    c-13.8-0.6-21.4-2.9-26.4-4.9c-6.6-2.6-11.4-5.7-16.3-10.6c-5-5-8-9.7-10.6-16.3c-1.9-5-4.3-12.5-4.9-26.4    c-0.7-15-0.8-19.5-0.8-57.4s0.1-42.4,0.8-57.4c0.6-13.8,2.9-21.4,4.9-26.4c2.6-6.6,5.7-11.4,10.6-16.3c5-5,9.7-8,16.3-10.6    c5-1.9,12.5-4.3,26.4-4.9C212.7,140.1,217.2,139.9,255.1,139.9 M255.1,114.3c-38.6,0-43.4,0.2-58.6,0.9    c-15.1,0.7-25.4,3.1-34.5,6.6c-9.3,3.6-17.3,8.5-25.2,16.4c-7.9,7.9-12.8,15.8-16.4,25.2c-3.5,9-5.9,19.4-6.6,34.5    c-0.7,15.2-0.9,20-0.9,58.6c0,38.6,0.2,43.4,0.9,58.6c0.7,15.1,3.1,25.4,6.6,34.5c3.6,9.3,8.5,17.3,16.4,25.2    c7.9,7.9,15.8,12.8,25.2,16.4c9,3.5,19.4,5.9,34.5,6.6c15.2,0.7,20,0.9,58.6,0.9s43.4-0.2,58.6-0.9c15.1-0.7,25.4-3.1,34.5-6.6    c9.3-3.6,17.3-8.5,25.2-16.4c7.9-7.9,12.8-15.8,16.4-25.2c3.5-9,5.9-19.4,6.6-34.5c0.7-15.2,0.9-20,0.9-58.6s-0.2-43.4-0.9-58.6    c-0.7-15.1-3.1-25.4-6.6-34.5c-3.6-9.3-8.5-17.3-16.4-25.2c-7.9-7.9-15.8-12.8-25.2-16.4c-9-3.5-19.4-5.9-34.5-6.6    C298.5,114.5,293.7,114.3,255.1,114.3L255.1,114.3z"
                />
                <path
                  class="st1"
                  d="M255.1,183.4c-40.3,0-72.9,32.7-72.9,72.9s32.7,72.9,72.9,72.9s72.9-32.7,72.9-72.9S295.4,183.4,255.1,183.4z     M255.1,303.7c-26.2,0-47.3-21.2-47.3-47.3c0-26.2,21.2-47.3,47.3-47.3s47.3,21.2,47.3,47.3C302.5,282.5,281.3,303.7,255.1,303.7z    "
                />
                <circle class="st1" cx="331" cy="180.6" r="17" />
              </g>
            </g>
          </svg>
        </a>
      </div>
    </footer>
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
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('before prompt')
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.

      this.$store.commit('setInstallPrompt', e)
      // Update UI notify the user they can install the PWA
    })
  },
  methods: {
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

/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
  background-color: #fff;
}

/* Custom page CSS
-------------------------------------------------- */
/* Not required for template or sticky footer method. */

.container {
  width: auto;
  max-width: 680px;
  padding: 0 15px;
}
</style>
