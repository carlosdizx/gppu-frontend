<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="blue-grey" dark v-bind="attrs" v-on="on">
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
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SelectorColor",
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

<style scoped></style>
