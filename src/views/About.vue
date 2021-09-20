<template>
  <div>
    <Cabecera />
    <v-container>
      <iframe
        width="100%"
        height="300"
        src="https://www.youtube.com/embed/hq2oqbslNus"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <iframe
        width="100%"
        height="300"
        src="https://www.youtube.com/embed/_U3sLiAP9Fo"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </v-container>
  </div>
</template>

<script>
import Cabecera from "../components/about/Cabecera";
export default {
  name: "About",
  components: { Cabecera },
};
</script>

<style scoped></style>
