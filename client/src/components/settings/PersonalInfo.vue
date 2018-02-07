<template>
  <div>
    <v-form class="pa-4" @submit.prevent="updateInfo($event)" ref="form">
      <div class="text-xs-center">
        <v-avatar :class="{'teal': userInfo.imageSrc === null}" size="200px" @click="$refs.file.click()">
          <div class="avatar-overlay">
            <v-icon dark>photo_camera</v-icon>
          </div>
          <span v-if="userInfo.imageSrc === null && !user.image" class="white--text display-3">{{ userChar }}</span>
          <img v-else-if="userInfo.imageSrc" :src="userInfo.imageSrc" alt="">
          <img v-else :src="user.image" alt="">
        </v-avatar>
        <!-- <v-btn color="secondary" @click="$refs.file.click()">Upload</v-btn> -->
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
    <v-dialog
      v-model="cropDialog"
      persistent
      width="460"
    >
      <v-card>
        <img ref="originalImage" :src="croppedImg" class="to-crop-img">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="imageCrop">Apply</v-btn>
          <v-btn color="green darken-1" flat @click.native="cropDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "Vuex";
import userService from '@/services/userService.js'
import Cropper from 'cropperjs'

export default {
  data() {
    return {
      userInfo: {
        name: null,
        imageSrc: null
      },
      cropDialog: false,
      cropper: null,
      croppedImg: null,
      newImage: null,
      imgName: null,
      dataForm: new FormData(),
      nameRules: [
        (v) => !!v || 'Name is required'
      ]
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
      this.croppedImg = files[0];
      this.imgName = this.croppedImg.name;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.croppedImg = e.target.result;
        setTimeout(() => {
          this.cropDialog = true;
          const originalImage = this.$refs.originalImage;
          this.cropper = new Cropper(originalImage, {
            aspectRatio: 1 / 1,
            minContainerWidth: 460,
            minContainerHeight: 460
          });
        });
      };
      reader.readAsDataURL(files[0]);
    },
    imageCrop() {
      this.userInfo.imageSrc = this.cropper.getCroppedCanvas({ width: 460 }).toDataURL();
      let blobImg = null;
      this.cropper.getCroppedCanvas({ width: 460 }).toBlob((blb) => {
        blobImg = blb;
        this.newImage = new File([blobImg], this.imgName);
        this.cropDialog = false;
        this.cropper.destroy();
      });
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
          const res = await userService.updateInfo(this.dataForm);
          this.$store.dispatch('updateInfo', res)
            .then(() => {
              this.$store.dispatch('showMessage', {text: res.message});
              this.newImage = null;
              this.croppedImg = null;
              this.imgName = null;
            })
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
    userChar() {
      return this.user.name.charAt(0).toUpperCase()
    }
  }
}
</script>

<style scoped>
.avatar {
  position: relative;
  cursor: pointer;
}
.avatar:hover .avatar-overlay {
  opacity: 1;
}
.avatar-overlay {
  width: 100%;
  height: 100%;
  background: rgba(146, 153, 152, 0.7);
  position: absolute;
  border-radius: 100%;
  opacity: 0;
  transition: all 300ms;
}
.to-crop-img {
  max-width: 100%;
}
</style>