<template>
  <div class="container-fluid text-center mt-2">
    <b-card class="shadow-sm" title="Terracycle -  what is it?">
      <hr />
      <p>
        Terracycle is a recycling scheme that recycles hard-to-recycle products.
        Terracycle have teamed up with various companies to create and run these
        recycling schemes. Many of the Terracycle recycling locations have been
        added to NoMoreBinDays. Many of the products listed in The Recycle Guide
        would not be able to be recycled without Terracycle - the crisp packets,
        sweetie wrappers, dental products and more are all recycled through
        Terracycle schemes.
      </p>
      <p>You can also get involved yourself and set-up a drop off location!</p>
      <p>
        Read more about Terracycle here at the below link. There you can also
        see what they make with the recycled items.
      </p>
      <p>https://www.terracycle.com/en-GB/</p>
    </b-card>
  </div>
</template>


<script>
export default {
  name: 'DidYouKnow',
  head() {
    return {
      title: 'Did you know? - No More Bin Days',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: `Find out here some handy recycling tips and other tricks to lowering your waste!`
        }
      ]
    }
  }
}
</script>