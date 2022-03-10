<template>
  <v-app-bar app dark :color="color">
    <v-app-bar-nav-icon @click="changeState"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ proyecto }} - {{ entidad }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <SelectorColor />
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
import SelectorColor from "@/components/general/SelectorColor";
import { mapState, mapActions } from "vuex";
import { ENTIDAD_EDUCATIVA, NOMBRE_PROYECTO } from "@/utilites/Definicion";
export default {
  name: "ToolbarNav",
  components: { SelectorColor },
  data: () => ({
    proyecto: "",
    entidad: "",
  }),
  props: ["nav"],
  computed: {
    ...mapState(["color"]),
  },
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
  created() {
    this.proyecto = NOMBRE_PROYECTO;
    this.entidad = ENTIDAD_EDUCATIVA;
  },
};
</script>

<style scoped></style>
