<template>
  <v-app>
    <InicioSesion />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import InicioSesion from "@/components/autenticacion/InicioSesion.vue";

export default Vue.extend({
  name: "Home",

  components: { InicioSesion },
  methods: {
    ...mapActions(["registroUsuario", "loguearUsuario", "loguearUsuarioToken"]),
  },
  computed: {
    ...mapState(["error"]),
  },
  async mounted() {
    const usuario = {
      email: "carlosbiche98@gmail.com",
      password: "123456789",
    };
    //await this.registroUsuario(usuario);
    //await this.loguearUsuario(usuario);
    await this.loguearUsuarioToken(usuario);
  },
});
</script>
