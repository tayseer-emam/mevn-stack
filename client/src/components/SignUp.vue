<template>
  <v-layout class="mt-4">
      <v-flex xs12 offset-xs0 sm4 offset-sm4 class="elevation-2">
        <v-alert outline color="error" icon="warning" :value="err">
          {{ err }}
        </v-alert>
        <v-card dark color="primary">
          <v-card-text class="headline">Sign Up</v-card-text>
        </v-card>
        <div class="white pa-4">
          <v-form @submit.prevent="signUp($event)" ref="form">
            <v-text-field
              label="Email"
              :rules="emailRules"
              v-model.trim="user.email"
              required
            >
            </v-text-field>
            <v-text-field
              label="User Name"
              :rules="nameRules"
              v-model.trim="user.name"
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
            <v-btn class="mt4" color="primary" type="submit">Sign Up</v-btn>
          </v-form>
        </div>
      </v-flex>
  </v-layout>
</template>

<script>
import userService from '@/services/userService'

const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
export default {
  data() {
    return {
      user: {
        email: null,
        name: null,
        password: null
      },
      err: '',
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => emailRegEx.test(v) || 'Enter valid email adderss'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
      nameRules: [
        (v) => !!v || 'Name is required'
      ],
    }
  },
  methods: {
    async signUp(e) {
      if(this.user.name && this.user.password && this.user.email) {
        try {
          const user = (await userService.signUp(this.user)).data;
          this.$store.dispatch('signUp', user);
          this.$router.push('/');
        } catch(err) {
          this.err = err.response.data.message;
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