<template>
  <v-btn :color="color" :dark="dark" absolute top right fab @click="press">
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
  methods: {
    press() {
      this.$emit("press", true);
    },
  },
};
</script>

<style scoped></style>
