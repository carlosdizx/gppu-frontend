<template>
  <v-app-bar app dark color="cyan darken-4">
    <v-app-bar-nav-icon @click="changeState"></v-app-bar-nav-icon>
    <v-toolbar-title>GCEU - Universidad Mariana</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="usuario" v-slot="{ navigate }" custom>
      <v-btn icon @click="navigate">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </router-link>
    <v-btn icon @click="redirectToHome">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ToolbarNav",
  props: ["nav"],
  methods: {
    ...mapActions(["removeUserToken"]),
    changeState() {
      this.$emit("changeDrawer");
    },
    redirectToHome() {
      this.$router.push("/");
      localStorage.removeItem("token");
      this.removeUserToken();
    },
  },
};
</script>

<style scoped></style>
