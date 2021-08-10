<template>
  <v-app>
    <Login />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Login from "@/components/autenticacion/Login.vue";

export default Vue.extend({
  name: "InicioSesion",
  components: { Login },
  methods: {},
});
</script>
