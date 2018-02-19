<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
  </div>
</template>

<script>
import postService from '@/services/postService'

export default {
  data() {
    return {
      post: {}
    }
  },
  async created() {
    try {
      this.post = await postService.getPost(this.$route.params.id);
    } catch (err) {
      this.$router.back();
      this.$store.dispatch('showMessage', {text: err.message, color: 'red'});
    }
  }
}
</script>

<style scoped>
</style>