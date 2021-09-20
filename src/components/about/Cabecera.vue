<template>
  <div>
    <v-toolbar color="cyan darken-4" dark prominent>
      <v-toolbar-title>Información GPPU</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link to="/" v-slot="{ navigate }" custom>
        <v-btn icon @click="navigate">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/registro" v-slot="{ navigate }" custom>
        <v-btn icon @click="navigate">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "Cabecera",
};
</script>

<style scoped></style>
