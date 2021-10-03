<template>
  <div>
    <Cabecera />
    <v-container>
      <Cuerpo />
    </v-container>
  </div>
</template>

<script>
import Cabecera from "../components/about/Cabecera";
import Cuerpo from "../components/about/Cuerpo";
export default {
  name: "About",
  components: { Cabecera, Cuerpo },
};
</script>

<style scoped></style>
