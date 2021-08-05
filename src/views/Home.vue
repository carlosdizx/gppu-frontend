<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "Home",

  components: {},
  methods: {
    ...mapActions(["registroUsuario", "loguearUsuario", "loguearUsuarioToken"]),
  },
  async mounted() {
    const usuario = {
      email: "carlodiaz@umariana.edu.co",
      password: "123456789",
    };
    //this.registroUsuario(usuario);
    await this.loguearUsuario(usuario);
    await this.loguearUsuarioToken(usuario);
  },
});
</script>
