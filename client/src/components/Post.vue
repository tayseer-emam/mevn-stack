<template>
  <v-layout class="mt-4">
    <v-flex xs12 class="elevation-2">
      <v-card dark color="primary">
        <v-card-text class="headline">New Post</v-card-text>
      </v-card>
      <div class="white pa-4">
        <v-form @submit.prevent="savePost($event)" ref="form">
          <v-text-field
            label="Title"
            v-model.trim="post.title"
            required
            :rules="required"
          >
          </v-text-field>
          <v-text-field
            label="Content"
            v-model.trim="post.body"
            required
            multi-line
            :rules="required"
          >
          </v-text-field>
          <v-btn class="mt4" color="primary" type="submit">Save</v-btn>
        </v-form>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import postService from '@/services/postService'
import { mapGetters } from 'Vuex'

export default {
  data() {
    return {
      post: {
        title: null,
        body: null,
        user: null
      },
      required: [
        (v) => !!v || 'Name is required'
      ]
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.post.user = this.user._id;
  },
  methods: {
    async savePost() {
      if(this.post.title && this.post.body) {
        try {
          const post = await postService.post(this.post);
          this.$store.dispatch('showMessage', {text: post.message});
        } catch (error) {
          this.$store.dispatch('showMessage', {text: err.message, color: 'red'});
        }
      } else {
        this.$refs.form.validate();
      }
    }
  }
}
</script>

<style scoped>
</style>