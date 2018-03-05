<template>
  <div>
    <h1 class="mb-4 display-2">{{ post.title }}</h1>
    <blockquote class="blockquote post-body">{{ post.body }}</blockquote>
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
.post-body {
  white-space: pre-line;
}
</style>