<template>
  <div>
    <Cabecera />
    <v-container>
      <Cuerpo />
      <EmpresasConConvenio />
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Cabecera from "../components/about/Cabecera";
import Cuerpo from "../components/about/Cuerpo";
import EmpresasConConvenio from "../components/about/EmpresasConConvenio";
import Footer from "../components/about/Footer";
export default {
  name: "About",
  components: { Cabecera, Cuerpo, EmpresasConConvenio, Footer },
};
</script>

<style scoped></style>
