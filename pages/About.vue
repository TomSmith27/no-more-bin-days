<template>
  <div class="container-fluid text-center">
    <div class="border mt-2 shadow-sm bg-white p-4">
      <div>
        <Logo />
      </div>
      <div>
        <p>No More Bin Days was created to address the lack of information on where to recycle products that aren't accepted in our household bins. Many more products can be recycled than are accepted in our bins, but due to a lack of awareness of both products than can be recycled, and where to recycle them, this isn’t very well-known. Until now! No More Bin Days shows you all the products that can be recycled, and where to recycle them.</p>
        <p>Recycling, along with reducing consumption, reducing waste and supporting our local community are all things that we as individuals can do to play our part in caring for the environment.</p>
        <p>We're working to add more features, get more data and make No More Bin Days even more useful for you. Please feel free to use the Contact Us form to add suggestions of anything you would like to see added in the future.</p>
        <p>Thanks for your support.</p>
        <p>Poppy - Co-founder of No More Bin Days</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Logo from '@/components/Logo.vue'

import Vue from 'vue'
export default Vue.extend({
  components: {
    Logo
  },
  head() {
    return {
      title: 'About - No More Bin Days',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: `No More Bin Days was created to address the lack of information on where to recycle products that aren't accepted in our household bins. Search now and find out what to recycle where!`
        }
      ]
    }
  }
})
</script>
