<template>
  <v-navigation-drawer v-model="nav" absolute>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ rol }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ nombres + " " + apellidos }}
        </v-list-item-subtitle>
        <v-list-item-action-text>{{ programa }}</v-list-item-action-text>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-alert color="info darken-2" dark dense>Empresas</v-alert>
      <v-list-item link @click="changeElement(1)">
        <v-list-item-icon>
          <v-icon>mdi-domain-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Empresas pendientes</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="changeElement(2)">
        <v-list-item-icon>
          <v-icon>mdi-clock-fast</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Empresas express</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="changeElement(3)">
        <v-list-item-icon>
          <v-icon>mdi-domain</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Empresas aprobadas</v-list-item-title>
      </v-list-item>

      <v-alert color="deep-purple darken-1" dark dense>Estudiantes</v-alert>

      <v-list-item link @click="changeElement(4)">
        <v-list-item-icon>
          <v-icon>mdi-school-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Estudiantes pendientes</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="changeElement(5)">
        <v-list-item-icon>
          <v-icon>mdi-school</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Estudiantes aprobados</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="changeElement(6)">
        <v-list-item-icon>
          <v-icon>mdi-account-check</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Estudiantes practicantes</v-list-item-title>
      </v-list-item>

      <v-alert color="pink darken-1" dark dense>Puestos de práctica</v-alert>

      <v-list-item link @click="changeElement(7)">
        <v-list-item-icon>
          <v-icon>mdi-clipboard-check</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Asignar practicantes</v-list-item-title>
      </v-list-item>

      <v-alert color="amber darken-2" dark dense>Egresados</v-alert>

      <v-list-item link @click="changeElement(8)">
        <v-list-item-icon>
          <v-icon>mdi-account-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Egresados</v-list-item-title>
      </v-list-item>
    </v-list>
    {{ element }}
  </v-navigation-drawer>
</template>

<script>
import { OBTENER_DATOS_USUARIO } from "../../services/auth";

export default {
  name: "NavDrawer",
  data: () => ({
    element: null,
    nav: false,
    nombres: "",
    apellidos: "",
    programa: "",
    rol: "",
  }),
  methods: {
    changeElement(idItem) {
      this.$emit("changeDrawer", idItem);
    },
    change() {
      this.nav = !this.nav;
    },
  },
  async mounted() {
    await OBTENER_DATOS_USUARIO().then((result) => {
      if (result.data) {
        this.nombres = result.data.nombres;
        this.apellidos = result.data.apellidos;
        this.programa = result.data.programa;
        this.rol = result.data.rol === 1 ? "Coordinador@ de prácticas" : "";
      }
    });
  },
};
</script>

<style scoped></style>
