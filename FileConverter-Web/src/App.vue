<template>
  <v-app>
    <v-app-bar color="primary" >
      <v-app-bar-title>File Type Converter</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <div id="uploadFileButton">
          <input type="file" @change="uploadFile" id="file" name="document" ref="fileInput" hidden />
          <v-btn v-if="!downloadUrl" @click="triggerFileInput" >Upload File<v-icon end icon="mdi-upload"></v-icon></v-btn>
          <p v-if="fileName !== ''" >{{ fileName }}</p>
        </div>
        
        <v-btn class="ma-2"  v-if="downloadUrl" @click="downloadFile" >

          
          Download
        </v-btn>
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    downloadUrl : null,
    fileName : ''
  }),
  methods:{
    triggerFileInput(){
      this.$refs.fileInput.click();
    },
    uploadFile(event){
      const file = event.target.files[0];
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('document' , file);

      fetch('http://127.0.0.1:8000/conversion/doc-to-pdf/',{
        method : 'POST',
        body: formData
      })
      .then((response) => response.blob())
      .then((blob) => {
        this.downloadUrl = window.URL.createObjectURL(new Blob([blob]));
       
      })
      .catch((err) => console.log('error' ,err))
    },
    downloadFile(){
      const link = document.createElement('a');
      link.href = this.downloadUrl;
      link.setAttribute('download' , 'converted.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style scoped>



</style>
