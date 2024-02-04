<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>File Type Converter</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <p class="text-h5">Select the type of conversion you need</p>
      <br />
      <v-container>

        <v-row justify="space-between">
          <v-col cols="12" xs="12" sm="6">
            <div class="d-flex flex-column">
              <v-btn @click="setSelectedType('docx-to-pdf')" class="mb-2" color="primary">Docx to Pdf</v-btn>
              <v-btn @click="setSelectedType('pdf-to-docx')" class="mb-2" color="primary">Pdf to Doc</v-btn>
            </div>

          </v-col>

          <v-col cols="12" xs="12" sm="6" class="d-flex align-center justify-center" justify="center">
            <div>

              <input type="file" @change="uploadFile" id="file" name="document" ref="fileInput" hidden />
              <v-btn v-if="selectedType !== null" @click="triggerFileInput">Upload File<v-icon end
                  icon="mdi-upload"></v-icon>
              </v-btn>

              <v-btn v-if="selectedFile !== null && downloadUrl === null" @click="proceedConversion"
                color="secondary">Convert</v-btn>
              <p v-if="selectedType !== null">Upload your {{ selectedType }} file</p>
              <p v-if="fileName !== ''">{{ fileName }}</p>
              <v-btn class="ma-2" v-if="downloadUrl" @click="downloadFile">Download
              </v-btn>
            </div>
          </v-col>

        </v-row>


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
    selectedType: null,
    downloadUrl: null,
    selectedFile: null,
    fileName: ''
  }),
  methods: {
    setSelectedType(type) {
      this.selectedType = type
      this.downloadUrl = null
      this.fileName = ''
      this.selectedFile = null
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    uploadFile(event) {
      const file = event.target.files[0];
      const uploadType = this.selectedType.split('-')[0]
      
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

      const formData = new FormData();
      formData.append('document', this.selectedFile);

      fetch(`http://127.0.0.1:8000/conversion/${this.selectedType}/`, {
        method: 'POST',
        body: formData
      })
        .then((response) => response.blob())
        .then((blob) => {
          this.downloadUrl = window.URL.createObjectURL(new Blob([blob]));
          this.selectedType = null
        })
        .catch((err) => console.log('error', err))



    },
    downloadFile() {
      const link = document.createElement('a');
      link.href = this.downloadUrl;
      link.setAttribute('download', 'converted.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style scoped></style>
