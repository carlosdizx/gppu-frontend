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
    ...mapActions(["registroUsuario"]),
  },
  mounted() {
    const usuario = {
      email: "carlodiaz@umariana.edu.co",
      password: "123456789",
    };
    this.registroUsuario(usuario);
  },
});
</script>
