<template>
  <div class="container-fluid text-center mt-2">
    <div class="w-100">
      <b-card border-variant="primary" header-border-variant="primary" header-text-variant="primary" class="shadow-sm" title>
        <img style="max-width: 200px" src="https://s3.amazonaws.com/tc-global-prod/download_resources/gb/downloads/10649/Official_TerraCycle_Logo.png" alt />
        <hr class="border-primary" />
        <b-card-title>Terracycle - what is it?</b-card-title>
        <hr class="border-primary" />
        <p>
          Terracycle is a recycling scheme that recycles hard-to-recycle products.
          Terracycle have teamed up with various companies to create and run these
          recycling schemes. Many of the Terracycle recycling locations have been
          added to No More Bin Days. Many of the products listed in The Recycle Guide
          would not be able to be recycled without Terracycle - the crisp packets,
          sweetie wrappers, dental products and more are all recycled through
          Terracycle schemes.
        </p>
        <p>You can also get involved yourself and set-up a drop off location!</p>
        <p>
          Read more about Terracycle
          <a target="_blank" href=" https://www.terracycle.com/en-GB/">here</a>. There you can also
          see what they make with the recycled items.
        </p>
      </b-card>
    </div>
    <div class="bg-primary my-1" style="height: 50px"></div>
    <div class="w-100">
      <b-card border-variant="primary" header-border-variant="primary" header-text-variant="primary" class="shadow-sm" title="How well do you know your recycling symbols?">
        <hr class="border-primary" />
        <p>Below you can find three common labels you may find on packaging - have a read and find out what the labels actually mean!</p>
        <hr class="border-primary" />
        <div class="row justify-content-center">
          <img src="../static/didyouknow/1.PNG" alt />
        </div>
        <hr class="border-primary" />
        <div class="row justify-content-center">
          <img src="../static/didyouknow/3.PNG" alt />
        </div>
        <hr class="border-primary" />
        <p>Just looking at the symbol on the 'Check Locally' label you could easily think that this packaging cannot be recycled. But think again! Actually your local authority may well collect it and if not, you may be able to recycle it at another location - use the Search function on the homepage to see if your packaging can be recycled somewhere.</p>
        <hr class="border-primary" />
        <div class="row justify-content-center my-2">
          <img src="../static/didyouknow/4.PNG" alt />
        </div>
        <hr class="border-primary" />
        <h4 class="pt-5">Here are some other labels you may find interesting:</h4>
        <p>This symbol could easily trick you into thinking the packaging is recyclable!</p>
        <hr class="border-primary" />
        <div class="row justify-content-center">
          <img src="../static/didyouknow/5.PNG" alt />
        </div>
        <hr class="border-primary" />
        <div class="row justify-content-center">
          <img src="../static/didyouknow/6.PNG" alt />
        </div>
        <hr class="border-primary" />
        <p>There's actually loads of packaging that can be recycled at big supermarkets that few people know about! When you take your carrier bags there to be recycled you can also take all the below listed items too. That's a lot of plastic!</p>
        <hr class="border-primary" />
        <div class="row justify-content-center">
          <img src="../static/didyouknow/2.PNG" alt />
        </div>
        <hr class="border-primary" />
        <p>
          To find out more about recycling symbols and what they actually mean, see the
          <a
            target="_blank"
            href="https://www.recyclenow.com/recycling-knowledge/packaging-symbols-explained?gclid=EAIaIQobChMI5ez39tP55wIVSbDtCh1NNwRxEAAYASAAEgJBhvD_BwE"
          >Recycle Now website.</a>
        </p>
      </b-card>
    </div>
    <div class="bg-primary my-1" style="height: 50px"></div>
    <div class="w-100">
      <b-card border-variant="primary" header-border-variant="primary" header-text-variant="primary" class="shadow-sm">
        <img style="max-width: 50vw" src="https://cdn.shopify.com/s/files/1/1502/3454/files/logo-square.png?v=14352352191725024634" alt />
        <hr class="border-primary" />
        <b-card-title>Who Gives a Crap?!</b-card-title>
        <hr class="border-primary" />
        <p>Despite now being able to recycle toilet roll packaging, wouldn't it be best to just not buy it all...</p>
        <p>Introducing... Who Gives a Crap! With its unusual name it is an unusual company, in that in return for providing you with 100% recycled toilet roll, wrapped in compostable packaging, and delivered to your door, it also donates half of its profits to charity!</p>
        <p>At 18.8p per 100 sheets, that's only 65% of the cost of your standard cute-labrador-puppy sheets, saving you money and doing good at the same time!</p>
        <p>The toilet rolls are wrapped in cute patterned paper that's fully compostable in your home compost bin - or do what I do and use it to wrap all your birthday presents!</p>
        <a target="_blank" href="https://uk.whogivesacrap.org/">Have a look on their website!</a>
        <div>
          <img style="max-width: 80vw" src="https://cdn.shopify.com/s/files/1/1502/3454/products/WGAC_ProductPhotos_2018Packaging_TransparentBG_DLGroupShot_large.png?v=1531168094" alt />
        </div>
      </b-card>
    </div>
    <div class="bg-primary my-1" style="height: 50px"></div>
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

<style>
img {
  max-width: 80vw;
}
</style>