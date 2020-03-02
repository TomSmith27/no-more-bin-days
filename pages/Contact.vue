<template>
  <div class="container">
    <b-card
      border-variant="primary"
      header-border-variant="primary"
      header-text-variant="primary"
      class="m-2 p-4 shadow"
      title-tag="h3"
      title="Contact us"
      sub-title="We would love to hear your feedback"
    >
      <hr class="border-primary" />
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Email address:" label-for="email" description="We'll never share your email with anyone else.">
          <b-form-input id="email" v-model="email" type="email" required placeholder="Enter email"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="name">
          <b-form-input id="name" v-model="name" required placeholder="Enter name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Message" label-for="message">
          <b-form-textarea id="message" v-model="message" placeholder="Message" rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>

        <b-button class="float-right" type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FeedbackService from '@/services/feedbackService';
const feedbackService = new FeedbackService();
export default Vue.extend({
  name: 'Contact',
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    async onSubmit() {
      try {
        await feedbackService.add({
          name: this.name,
          email: this.email,
          message: this.message
        })
        //@ts-ignore 
        this.$bvToast.toast(`Thank you for your feedback`, {
          title: `Thank you for your feedback`,
          solid: true,
          variant: 'success'
        })

        setTimeout(() => {
          this.$router.push({ name: 'index' })
        }, 2000)
      }
      catch (e) {
        console.log(e)
        //@ts-ignore 
        this.$bvToast.toast(`Sorry you're feedback could not be submitted at this time`, {
          title: 'Please try again later',
          solid: true,
          variant: 'danger'
        })
      }
    }
  }
});
</script>

<style>
</style>