<template>
  <v-card color="cyan darken-4">
    <v-card-text>
      <router-link to="dashboard" v-slot="{ navigate }" custom>
        <v-btn icon @click="navigate" dark>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <v-alert dense dark color="cyan darken-4">
        Información del usuario
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ToolbarUsuario",
};
</script>

<style scoped></style>
