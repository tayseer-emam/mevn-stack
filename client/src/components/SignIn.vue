<template>
  <v-layout class="mt-4">
      <v-flex xs12 offset-xs0 sm4 offset-sm4>
        <v-alert outline color="error" icon="warning" :value="err">
          {{ err }}
        </v-alert>
        <v-card dark color="primary">
          <v-card-text>Sign In</v-card-text>
        </v-card>
        <v-form>
          <v-text-field
            label="Email"
            :rules="emailRules"
            v-model="user.email"
            required
          >
          </v-text-field>
          <v-text-field
            label="Password"
            type="password"
            :rules="passwordRules"
            v-model="user.password"
            required
          >
          </v-text-field>
          <v-btn color="primary" @click="signIn()">Sign In</v-btn>
        </v-form>
      </v-flex>
  </v-layout>
</template>

<script>
import userService from '@/services/userService.js'
import { store } from '@/store/store'

const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      err: '',
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => emailRegEx.test(v) || 'Enter valid email adderss'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
    }
  },
  methods: {
    async signIn() {
      try {
        const user = (await userService.signIn(this.user)).data;
        this.$store.dispatch('signIn', user);
        localStorage.setItem('token', user.token);
        this.$router.push('/');
      } catch(err) {
        this.err = err.response.data.message;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if(!store.state.user.isLoggedIn) {
      next();
    } else {
      next(false);
    }
  }
}
</script>

<style scoped>
</style>