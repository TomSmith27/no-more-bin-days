<template>
  <div class="container-fluid p-3 text-center">
    <h1>What can be recycled in your household bins?</h1>
    <div class="pt-3">
      <span class="h5 text-primary"
        >Tip: envelopes with windows can be recycled in your blue bin too!</span
      >
    </div>
    <div class="row mt-5 align-items-center">
      <div class="col">
        <img
          src="https://www.veolia.co.uk/sheffield/sites/g/files/dvc1851/files/styles/default/public/image/2019/03/Sheff%20brown%20bin.JPG?itok=kyZUr0lp"
          alt
        />
      </div>
      <div class="col">
        <img src="@/assets/Bin.png" />
      </div>
      <div class="col">
        <img
          src="https://www.veolia.co.uk/sheffield/sites/g/files/dvc1851/files/styles/default/public/image/2019/03/Sheff%20blue%20bin.JPG?itok=M1ghkYbw"
          alt
        />
      </div>
    </div>
    <small class="thanks">
      Images from
      <a
        href="https://www.veolia.co.uk/sheffield/collections/your-waste-and-recycling-service"
        >https://www.veolia.co.uk/sheffield/collections/your-waste-and-recycling-service</a
      >
    </small>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  components: {},
  setup() {}
})
</script>

<style lang="scss" scoped>
.thanks {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
