<template>
  <div>
    <v-toolbar color="cyan darken-4" dark prominent>
      <v-toolbar-title>Información GPPU</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link to="/" v-slot="{ navigate }" custom>
        <v-btn @click="navigate" color="info">
          Iniciar sesión
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </router-link>

      <router-link class="mx-2" to="/registro" v-slot="{ navigate }" custom>
        <v-btn @click="navigate" color="lime darken-2">
          Registrarme
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
