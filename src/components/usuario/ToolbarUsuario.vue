<template>
  <v-card :color="color">
    <v-card-text>
      <router-link to="dashboard" v-slot="{ navigate }" custom>
        <v-btn icon @click="navigate" dark>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <v-alert dense dark :color="color">
        <h1>Información del usuario</h1>
      </v-alert>
    </v-card-text>
    <v-card-subtitle>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="grey lighten-2" v-bind="attrs" v-on="on">
            <span class="mr-2">Color principal</span>
            <v-icon>mdi-palette</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(color, index) of colores" :key="index">
            <v-btn
              :dark="color.dark"
              block
              :color="color.nombre"
              @click="cambarColor(color.nombre)"
            >
              <v-chip :color="color.nombre">{{ index + 1 }}</v-chip>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

import { mapActions } from "vuex";
export default {
  name: "ToolbarUsuario",
  data: () => ({
    colores: [
      { nombre: "orange", dark: false },
      { nombre: "red", dark: true },
      { nombre: "pink", dark: true },
      { nombre: "purple", dark: true },
      { nombre: "indigo", dark: true },
      { nombre: "blue", dark: true },
      { nombre: "cyan", dark: true },
      { nombre: "teal", dark: true },
      { nombre: "green", dark: true },
      { nombre: "grey darken-4", dark: true },
    ],
  }),
  computed: {
    ...mapState(["color"]),
  },
  methods: {
    ...mapActions(["cambarColor"]),
  },
};
</script>
