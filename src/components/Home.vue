<template>
  <v-container>
    <v-row class="text-center">
        <v-file-input
          :show-size="true"
          label="Avatar"
          placeholder="Pick a file"
          accept="image/*"
          :rules="rules"
          prepend-icon="mdi-camera"
          @change="onChanged">
        </v-file-input>
        <v-btn
          class="mt-3"
          color="secondary"
          :disabled="uploading || !file"
          @click="uploadFile">
          <v-icon>mdi-upload</v-icon>
          Upload
        </v-btn>
        <v-progress-circular
          v-if="uploading"
          class="ml-4"
          size="50"
          width="5"
          :value="uploadProgress"
          color="teal"
        >{{ uploadProgress }}</v-progress-circular>
    </v-row>
    <v-row>
      <v-card
        :img="picture"
        height="300"
        width="400"
        :loading="false">
        Image preview
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  import uid from "uid";
  export default {
    name: 'Home',

    data: () => ({
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      file: null,
      picture: null,
      uploading: false,
      uploadProgress: 0,
    }),

    methods: {
      onChanged(file) {
        if(!file) return
        this.file = file
        this.previewImage(file)
      },
      uploadFile() {
        //Handle upload
        this.uploading = true
        const storageRef = this.$firebase.storage().ref()
        const imagesRef = storageRef.child('images')

        const metadata = {
          contentType: this.file.type
        };
        
        const fileName = `${uid(10)}.${this.file.name.split('.')[1]}`
        const uploadTask = imagesRef.child(fileName).put(this.file, metadata)
        uploadTask.on('state_changed', (snapshot) => {
          const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed();
          this.uploadProgress = progress

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break;
            case 'running': 
              //Running
            break;
          }

        }, (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
          
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown': 
              // Unknown error occurred, inspect error.serverResponse
            break;
          }
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
            this.file = null
            this.uploading = false
            this.picture = downloadURL;
          });

        })

      },
      pauseUpload(uploadTask) {
        // Pause the upload
        uploadTask.pause();
      },
      resumeUpload(uploadTask) {
        // Resume the upload
        uploadTask.resume();
      },
      cancelUpload(uploadTask) {
        // Cancel the upload
        uploadTask.cancel();
      },
      previewImage(file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const dataUri = event.target.result
          this.picture = dataUri
        }
        reader.onerror = (event) => {
          console.error('File could not be read', event.target.error)
        }

        reader.readAsDataURL(file)
      }
    },
    mounted() {
      //
    }
  }
</script>
