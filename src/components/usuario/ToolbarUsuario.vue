<template>
  <v-card :color="color">
    <v-card-text>
      <router-link to="dashboard" v-slot="{ navigate }" custom>
        <v-btn icon @click="navigate" dark>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <v-alert dense :color="color" dark>
        <h1>Información del usuario</h1>
      </v-alert>
      <SelectorColor />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import SelectorColor from "@/components/general/SelectorColor.vue";
import { mapState } from "vuex";
export default {
  name: "ToolbarUsuario",
  components: { SelectorColor },
  computed: {
    ...mapState(["color"]),
  },
};
</script>
