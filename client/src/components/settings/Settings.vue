<template>
  <v-layout row class="settings">
    <v-flex xs12 sm3 class="elevation-1 white">
      <v-toolbar color="primary" dark class="elevation-0">
        <v-toolbar-title>Account Settings</v-toolbar-title>
      </v-toolbar>
      <v-list class="pt-3">
        <router-link tag="v-list-tile" to="/settings">
          <v-list-tile-title>Personal Information</v-list-tile-title>
        </router-link>
        <router-link tag="v-list-tile" to="/settings/password">
          <v-list-tile-title>Password</v-list-tile-title>
        </router-link>
      </v-list>
    </v-flex>
    <v-flex xs12 sm9 ml-4 class="elevation-1 white">
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style>
.settings .router-link-exact-active .list__tile--link {
    color: #FFC107 !important;
}
</style>