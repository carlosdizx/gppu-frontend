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
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ToolbarUsuario",
  computed: {
    ...mapState(["color"]),
  },
};
</script>
