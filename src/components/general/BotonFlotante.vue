<template>
  <v-btn :color="color" :dark="dark" absolute top right fab>
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "BotonFlotante",
  props: {
    icon: String,
    color: String,
    dark: Boolean,
  },
};
</script>

<style scoped></style>
