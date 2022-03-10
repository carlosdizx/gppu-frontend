<template>
  <v-card flat :color="color" dark tile class="white--text text-center">
    <v-card-text>
      <v-btn
        v-for="item in items"
        :key="item.url"
        :href="item.url"
        icon
        role="link"
        target="_blank"
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-card-text>

    <v-card-text class="white--text pt-0">
      La Universidad Mariana o Unimar es una universidad privada católica
      colombiana ubicada en San Juan de Pasto. Cuenta con cinco facultades que
      ofrecen un total de 21 programas de pregrado.
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text class="white--text">
      © 2021 - 2026 Todos los derechos reservados. —
      <v-btn href="https://www.umariana.edu.co/index.html" target="_blank" text>
        <strong>Universidad Mariana</strong>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Footer",
  data: () => ({
    items: [
      {
        icon: "mdi-facebook",
        url: "https://www.facebook.com/UniversidadMariana.Pasto",
      },
      { icon: "mdi-twitter", url: "https://twitter.com/UMarianaPasto" },
      {
        icon: "mdi-instagram",
        url: "https://instagram.com/universidadmariana/",
      },
      {
        icon: "mdi-youtube",
        url: "https://www.youtube.com/user/UniversidadMariana",
      },
    ],
  }),
  computed: {
    ...mapState(["color"]),
  },
};
</script>

<style scoped></style>
