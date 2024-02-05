
<template>
  <v-app>
    <v-app-bar :elevation="4" color="primary">
      <!-- <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-avatar size="50">
          <img :src="logo"/>
        </v-avatar>
      </template> -->
      <v-app-bar-title>File Type Converter</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <p class="text-h6 ml-10">Select the type of conversion you need</p>
      <br />
      <v-container>

        <v-row full-width >
          <v-col cols="12" xs="12" sm="6">
            <v-row >
              <v-col cols="6"  sm="6" md="4" lg="3" class="d-flex ">
                <v-btn @click="setSelectedType('docx-to-pdf')" :color="selectedType==='docx-to-pdf'? 'red' : 'primary'" block>Docx to Pdf</v-btn>
              </v-col>
              <v-col cols="6"  sm="6" md="4" lg="3" class="d-flex ">
                <v-btn @click="setSelectedType('pdf-to-docx')" :color="selectedType==='pdf-to-docx'? 'red' : 'primary'" block>Pdf to Docx</v-btn>
              </v-col>
              <v-col cols="6"  sm="6" md="4" lg="3" class="d-flex ">
                <v-btn @click="setSelectedType('png-to-jpg')" :color="selectedType==='png-to-jpg'? 'red' : 'primary'" block>Png to Jpg</v-btn>
              </v-col>
              <v-col cols="6"  sm="6" md="4" lg="3" class="d-flex ">
                <v-btn @click="setSelectedType('jpg-to-png')" :color="selectedType==='jpg-to-png'? 'red' : 'primary'" block>Jpg to Png</v-btn>
              </v-col>
              <v-col cols="6"  sm="6" md="4" lg="3" class="d-flex ">
                <v-btn @click="setSelectedType('xlsx-to-csv')" :color="selectedType==='xlsx-to-csv'? 'red' : 'primary'" block>Xlsx to Csv</v-btn>
              </v-col>
              
            </v-row>

          </v-col>

          <v-col cols="12" xs="12" sm="6" class="convertContainer" justify="center">

            <div v-if="selectedType===null">
                <p>Choose a type of conversion to proceed</p>
            </div>
              <div v-if="selectedType !== null && selectedFile===null" class="d-flex flex-column">
                <input type="file" @change="uploadFile" id="file" name="document" ref="fileInput" hidden  multiple/>
                <v-btn  @click="triggerFileInput">Upload File<v-icon end
                  icon="mdi-upload"></v-icon>
                </v-btn>
                <p>Upload your {{ selectedType.split('-')[0] }} file</p>
              </div>
              <div v-if="selectedFile !== null && downloadUrl === null && !isConversionLoading">
              
                <p>{{ fileName }}</p>
                <v-btn  @click="proceedConversion"
                color="secondary">Convert</v-btn>
              </div>
              <div v-if="isConversionLoading" class="d-flex flex-column align-center justify-center">
                <!-- <v-progress-circular  :size="50" :width="8" indeterminate :color="colorLoading[selectedType.split('-')[2]]"></v-progress-circular> -->
                <img height="100" :src="doc2pdf"/>
              <p2 class="mt-2" >Converting to {{ selectedType.split('-')[2] }}...</p2>
              </div>
            
          </v-col>

        </v-row>
        <v-container v-if="!isConversionLoading"  class="d-flex flex-column justify-center align-center my-10" >
          <p class="text-center" v-if="downloadingFileName !== ''">{{ downloadingFileName }}</p>
              <v-btn class="ma-2" v-if="downloadUrl" @click="downloadFile">Download
              </v-btn>
            </v-container>

      </v-container>

    </v-main>
  </v-app>
</template>

<script>
// import logo from './assets/logo.png'
import doc2pdf from './assets/doc-to-pdf.gif';
export default {
  name: 'App',

  components: {

  },

  data: () => ({
    doc2pdf:doc2pdf,
    selectedType: null,
    downloadUrl: null,
    selectedFile: null,
    fileName: '',
    downloadingFileName : null,
    isConversionLoading : false,
    colorLoading:{
      pdf:'red',
      doc:'primary',
      jpg:'green',
      png:'yellow'
    }
  }),
  methods: {
    setSelectedType(type) {
      this.selectedType = type
      this.downloadUrl = null
      this.fileName = ''
      this.selectedFile = null
      this.downloadingFileName = null
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    uploadFile(event) {
      const file = event.target.files[0];
      const uploadType = this.selectedType.split('-')[0]
      if(uploadType === 'jpeg'){
        uploadType = 'jpg';
      }
      if (!(file.name.endsWith(uploadType))) {
        alert('Please upload the file that are document format!');
        this.selectedFile = null;
      }
      else {
        this.selectedFile = file;
        this.fileName = this.selectedFile.name
      }
    },
    proceedConversion() {
      this.isConversionLoading = true;
      const formData = new FormData();
      formData.append('document', this.selectedFile);

      const backendUrl = import.meta.env.VITE_APP_BACKEND_URL
      
      fetch(`${backendUrl}/conversion/${this.selectedType}/`, {
        method: 'POST',
        body: formData
      })
        .then((response) => response.blob())
        .then((blob) => {
          const fileExtension = '.'+ this.selectedType.split('-')[2];
          this.downloadUrl = window.URL.createObjectURL(new Blob([blob]));
          this.downloadingFileName = this.fileName.split('.')[0] + fileExtension
          this.selectedType = null;
          setTimeout(()=>{
            this.isConversionLoading = false;
          },5000)
          
        })
        .catch((err) => console.log('error', err))



    },
    downloadFile() {
      const link = document.createElement('a');
      link.href = this.downloadUrl;
      link.setAttribute('download', this.downloadingFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style scoped>
*{
  font-family: 'Poppins', sans-serif;
}


.convertContainer{
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  width: 50%;
  background: linear-gradient(to right,rgba(160, 158, 158,0.5),rgba(135, 153, 165, 0.5));
  -webkit-backdrop-filter: blur(100px);
  backdrop-filter: blue(20px);
  border-radius: 20px;
  min-height: 200px;
  padding: 4px;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); 
  border: 1px solid rgba(255, 255, 255, 0.18);
}

</style>
