<template>
  <v-app>
    <div>
      <Login />
    </div>
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
<style scoped>
div {
  background-image: url("../../src/assets/BANNER.jpg");
  height: 100%;
  object-fit: fill;
}
</style>
