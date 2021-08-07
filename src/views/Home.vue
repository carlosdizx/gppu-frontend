<template>
  <div>
    <v-alert v-if="error" dark dense color="red">
      {{ error }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "Home",

  components: {},
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
