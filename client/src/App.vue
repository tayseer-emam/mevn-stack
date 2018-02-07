<template>
  <div id="app">
    <v-app>
      <v-progress-linear
        height="2"
        :indeterminate="this.progress"
        :active="this.progress"
        class="my-0"
        background-color="warning"
        color="primary"
      ></v-progress-linear>
      <navbar/>
      <v-content>
        <v-container fluid>
          <v-snackbar 
            :color="message.color"
            :timeout="message.timeout"
            v-model="message.visible"
            :top="message.top"
            :left="message.left"
            :right="message.right"
            :bottom="message.bottom"
          >
          {{ message.text }}
          <v-btn v-if="message.close" dark flat @click="closeMessage">Close</v-btn>
          </v-snackbar>
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import userService from '@/services/userService'
import { mapGetters } from 'Vuex'

export default {
  name: 'app',
  components: {
    Navbar
  },
  async created() {
    if(this.isLoggedIn)
      await userService.checkAuth(this.user);
  },
  methods: {
    closeMessage() {
      this.$store.dispatch('closeMessage');
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'isLoggedIn',
      'message',
      'progress'
    ])
  }
}
</script>

<style>
.progress-linear {
  position: absolute;
  top: 0px;
}
</style>
