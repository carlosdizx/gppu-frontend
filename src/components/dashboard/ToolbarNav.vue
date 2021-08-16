<template>
  <v-app-bar app dark color="cyan darken-4">
    <v-app-bar-nav-icon @click="changeState"></v-app-bar-nav-icon>
    <v-toolbar-title>GPPU</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn icon @click="redirectToHome">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "ToolbarNav",
  props: ["nav"],
  methods: {
    changeState() {
      this.$emit("changeDrawer");
    },
    redirectToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
