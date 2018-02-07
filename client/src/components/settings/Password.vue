<template>
  <div>
    <v-form class="pa-4" ref="form" @submit.prevent="resetPassword">
      <v-text-field
        label="Current Password"
        v-model.trim="userData.oldPassword"
        required
        type="password"
        :rules="passwordRules"
      >
      </v-text-field>
      <v-text-field
        label="New Password"
        v-model.trim="userData.newPassword"
        required
        type="password"
        :rules="passwordRules"
      >
      </v-text-field>
      <v-text-field
        label="Confirm Your New Password"
        v-model.trim="userData.newMatchPassword"
        required
        type="password"
        :rules="passwordRules"
      >
      </v-text-field>
      <v-btn color="primary" type="submit">Reset Password</v-btn>
    </v-form>
  </div>
</template>

<script>
import userService from '@/services/userService'
import { mapGetters } from 'Vuex'

export default {
  data() {
    return {
      userData: {
        _id: null,
        oldPassword: null,
        newPassword: null,
        newMatchPassword: null
      },
      passwordRules: [
        (v) => !!v || 'This field is required'
      ]
    }
  },
  created() {
    this.userData._id = this.user._id;
  },
  methods: {
    async resetPassword() {
      if(this.userData.oldPassword && this.userData.newPassword && this.userData.newMatchPassword) {
        try {
          const res = await userService.resetPassword(this.userData);
          this.$store.dispatch('showMessage', {text: res.message});
        } catch (err) {
          this.$store.dispatch('showMessage', {text: err.message, color: 'red'});
        }
      } else {
        this.$refs.form.validate();
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
  }
}
</script>

<style scoped>
</style>