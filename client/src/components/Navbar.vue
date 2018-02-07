<template>
  <v-toolbar color="warning">
    <router-link tag="v-toolbar-title" to="/">Title</router-link>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link v-if="!isLoggedIn" tag="v-btn" to="/login" class="btn--flat">Login</router-link>
      <router-link v-if="!isLoggedIn" tag="v-btn" to="/register" class="btn--flat">Register</router-link>
    </v-toolbar-items>
    <v-menu v-if="isLoggedIn" bottom left :nudge-bottom="52" :nudge-width="200" class="mr-3">
      <v-avatar class="teal" slot="activator">
        <img v-if="user.image" :src="user.image"/>
        <span v-else class="white--text headline">{{ firstLetter }}</span>
      </v-avatar>
      <v-list>
        <v-list-tile avatar class="pb-2">
          <v-list-tile-avatar>
            <img v-if="user.image" :src="user.image" alt="">
            <span v-else class="white--text teal headline c-avatar">{{ firstLetter }}</span>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="setting" class="mt-2">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "Vuex";

export default {
  methods: {
    logout() {
      this.$store.dispatch('signOut');
      this.$router.push('/login');
    },
    setting() {
      this.$router.push('/settings');
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'user'
    ]),
    firstLetter() {
      return this.user.name.charAt(0).toUpperCase();
    }
  }
}
</script>

<style scoped>
.c-avatar {
  padding: 8px 15px;
  border-radius: 50%;
}
.list > li:first-child {
  border-bottom: 1px solid #ccc;
}
</style>
