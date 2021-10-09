<template>
  <div>
    <Cabecera />
    <v-container>
      <Cuerpo />
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Cabecera from "../components/about/Cabecera";
import Cuerpo from "../components/about/Cuerpo";
import Footer from "../components/about/Footer";
export default {
  name: "About",
  components: { Cabecera, Cuerpo, Footer },
};
</script>

<style scoped></style>
