
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
      <div id="bg">
        <p class="caption">Convert documents, images, audio, and videos quickly and effortlessly across a wide array of formats</p>
      </div>
      <FileConversion/>

    </v-main>
  </v-app>
</template>

<script>
import FileConversion from './components/FileConversion.vue';
export default {
  name: 'App',
  components:{
    FileConversion
  }
}

</script>

<style scoped>
*{
  font-family: 'Poppins', sans-serif;
}
#bg{
  background: url('./assets/bg.png') no-repeat ;
  background-position: center center;
  
  background-size: cover;
  height: 60vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.caption{
  font-family: 'Poppins', sans-serif;
  font-size: 50px;
  text-align: center;
  color: white;
}
@media (max-width: 1000px) {
  #bg{
    height: 40vh;
  }
  .caption{
    font-size: 30px;
  }
}
@media (max-width: 700px) {
  #bg{
    height: 20vh;
  }
  .caption{
    font-size: 20px;
  }
}


</style>
