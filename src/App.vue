<template>
  <the-navbar />
  <router-view />
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";

export default {
  components: {
    TheNavbar,
  },
  created() {
    
    // this.$store.dispatch('loadFromLocalStorage')
  },
};
</script>


<style lang="scss">


@font-face {
  font-family: "Titillium";
  src: local("Titillium"),
   url(./fonts/Titillium/TitilliumWeb-Regular.ttf) format("truetype");
}


body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Titillium, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



button {

  display:inline-block;
  padding:0.3rem 1.2rem;
  margin:0 0.1rem 0.1rem 0;
  border:0.16em solid rgba(255,255,255,0);
  border-radius: 2px;
  text-decoration:none;
  color:#ffffff;
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  text-align:center;
  transition: all 0.2s;
  background-color:#f14ebd;
  font-size: 1.1rem;
  height:2.5rem;
}

button.outline {
  background-color:#ffffff;
  border:0.16em solid #f14ebd;
  color:#252525;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0);

}




button:hover{
  border-color: rgb(145, 145, 145);
}


</style>
