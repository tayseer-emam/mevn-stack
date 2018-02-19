<template>
  <v-layout class="mt-4">
      <v-flex xs12 offset-xs0 sm4 offset-sm4 class="elevation-2">
        <v-alert outline color="error" icon="warning" :value="err">
          {{ err }}
        </v-alert>
        <v-card dark color="primary">
          <v-card-text class="headline">Sign In</v-card-text>
        </v-card>
        <div class="white pa-4">
          <v-form @submit.prevent="signIn($event)" ref="form">
            <v-text-field
              label="Email"
              :rules="emailRules"
              v-model.trim="user.email"
              required
            >
            </v-text-field>
            <v-text-field
              label="Password"
              type="password"
              :rules="passwordRules"
              v-model.trim="user.password"
              required
            >
            </v-text-field>
            <v-btn class="mt4" color="primary" type="submit">Sign In</v-btn>
          </v-form>
        </div>
      </v-flex>
  </v-layout>
</template>

<script>
import userService from '@/services/userService.js'

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
    async signIn(e) {
      if(this.user.email && this.user.password) {
        try {
          const user = await userService.signIn(this.user);
          this.$store.dispatch('signIn', user);
          this.$router.push('/');
        } catch(err) {
          this.err = err.message;
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