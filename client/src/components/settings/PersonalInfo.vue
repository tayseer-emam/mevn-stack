<template>
  <div>
    <v-form class="pa-4" @submit.prevent="updateInfo($event)" ref="form">
      <div>
        <v-avatar :class="{'teal': userInfo.imageSrc === null}" size="88px">
          <span v-if="userInfo.imageSrc === null && !user.image" class="white--text display-3">{{ userChar }}</span>
          <img v-else-if="userInfo.imageSrc" :src="userInfo.imageSrc" alt="">
          <img v-else :src="user.image" alt="">
        </v-avatar>
        <v-btn color="secondary" @click="$refs.file.click()">Upload</v-btn>
        <input 
          type="file" 
          v-show="false" 
          accept="image/*"
          ref="file" 
          @change="fileUpload"
        >
      </div>
      <v-text-field
        label="User Name"
        v-model.trim="userInfo.name"
        :value="user.name"
        :rules="nameRules"
        required
      >
      </v-text-field>
      <v-btn color="primary" @click="updateInfo">Update</v-btn>
    </v-form>
    <v-snackbar 
      :color="message.color"
      :timeout="6000"
      v-model="message.show"
    >
     {{ message.text }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "Vuex";
import userService from '@/services/userService.js'

export default {
  data() {
    return {
      userInfo: {
        name: null,
        imageSrc: null
      },
      newImage: null,
      dataForm: new FormData(),
      nameRules: [
        (v) => !!v || 'Name is required'
      ],
      message: {
        show: false,
        color: '',
        text: null
      }
    }
  },
  created() {
    this.userInfo.name = this.user.name;
    this.userInfo.imageSrc = this.user.image;
  },
  methods: {
    fileUpload(e) {
      let files = e.target.files;
      if(!files[0]) {
        throw 'Field to Upload';
      }
      this.newImage = files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.userInfo.imageSrc = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    async updateInfo(e) {
      if(this.userInfo.name) {
        this.dataForm = new FormData();
        this.dataForm.append('name', this.userInfo.name);
        this.dataForm.append('_id', this.user._id);
        if(this.newImage) {
          this.dataForm.append('image', this.newImage);
        }
        try {
          const res = (await userService.updateInfo(this.dataForm)).data;
          this.$store.dispatch('updateInfo', res);
          this.message.text = res.message;
          this.message.show = true;
          this.message.color = 'green';
        } catch (err) {
          this.message.text = err.response.data.message;
          this.message.show = true;
          this.message.color = 'red';
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
    userChar() {
      return this.user.name.charAt(0).toUpperCase()
    }
  }
}
</script>

<style scoped>
</style>