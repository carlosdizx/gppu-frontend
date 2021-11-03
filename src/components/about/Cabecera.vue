<template>
  <div>
    <v-card color="cyan darken-4" dark prominent>
      <v-card-text>
        <h1>Información GCEU</h1>
        <br />
        <router-link to="/" v-slot="{ navigate }" custom>
          <v-btn @click="navigate" icon dark>
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/registro" v-slot="{ navigate }" custom>
          <v-btn @click="navigate" icon dark>
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Cabecera",
};
</script>

<style scoped></style>
