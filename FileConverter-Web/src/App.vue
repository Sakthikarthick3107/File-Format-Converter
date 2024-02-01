<template>
  <v-app>
    <v-main>
      <v-container>
        <input type="file" @change="uploadFile" id="file" name="document"/>
        <v-btn v-if="downloadUrl" @click="downloadFile" >Download</v-btn>
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
    downloadUrl : null
  }),
  methods:{
    uploadFile(event){
      const file = event.target.files[0];
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
