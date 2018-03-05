<template>
  <v-layout>
    <v-flex xs12 md6 v-if="posts" v-for="(post, index) of posts" :key="index" class="mx-3">
      <v-card>
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">{{ post.title }}</span>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid>
          <v-layout>
            <v-flex xs12 align-end flexbox>
              <small class="grey--text">{{ dateFormat(post.date) }}</small>
              <p>{{ post.body }}</p>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <router-link 
            tag="v-btn" 
            :to="{name: 'post-view', params: {id: post._id}}" 
            class="btn--flat orange--text"
          >View</router-link>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>thumb_up</v-icon>
          </v-btn>
          <router-link 
            v-if="post.user === user._id"
            tag="v-btn"
            :to="{name: 'post-edit', params: {id: post._id}}"
            class="btn btn--icon"
          >
            <v-icon>edit</v-icon>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-flex>
    <div v-else>
      <v-progress-circular indeterminate :size="200" :width="3" color="primary"></v-progress-circular>
    </div>
  </v-layout>
</template>

<script>
import postService from '@/services/postService'
import { mapGetters } from "Vuex";

export default {
  data() {
    return {
      posts: []
    }
  },
  async created() {
    try {
      this.posts = await postService.getPosts();
    } catch (error) {
      
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    dateFormat(date) {
      return date;
    }
  }
}
</script>

<style scoped>
</style>