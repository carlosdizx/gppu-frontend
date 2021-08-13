<template>
  <div>
    <Toolbar
      titulo="Formularios de registro"
      icono="mdi-account-multiple"
      :tabs="tabs"
      @indice="indice = $event"
    />
    <FormEmpresa v-if="indice === 1" :indice="1" />
  </div>
</template>

<script lang="ts">
import Toolbar from "@/components/general/Toolbar.vue";
import FormEmpresa from "@/components/forms/FormEmpresa.vue";
export default {
  name: "ToolbarRegistro",
  components: { Toolbar, FormEmpresa },
  data: () => ({
    tabs: ["mdi-domain", "mdi-lock"],
    indice: 1,
  }),
  methods: {},
};
</script>
