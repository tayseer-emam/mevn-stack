<template>
  <v-toolbar  color="warning">
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link v-if="!$store.state.user.isLoggedIn" tag="v-btn" to="/login" class="btn--flat">Login</router-link>
      <router-link v-if="!$store.state.user.isLoggedIn" tag="v-btn" to="/register" class="btn--flat">Register</router-link>
      <v-btn flat v-if="$store.state.user.isLoggedIn" @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('signOut');
      localStorage.removeItem('token');
    }
  }
}
</script>

<style scoped>
</style>
