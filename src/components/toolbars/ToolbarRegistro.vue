<template>
  <div>
    <Toolbar
      titulo="Formularios de registro"
      icono="mdi-account-multiple"
      :tabs="tabs"
    />
    <FormEmpresa :indice="1" />
  </div>
</template>

<script lang="ts">
import Toolbar from "@/components/general/Toolbar.vue";
import FormEmpresa from "@/components/forms/FormEmpresa.vue";
export default {
  name: "ToolbarRegistro",
  components: { Toolbar, FormEmpresa },
  data: () => ({
    tabs: ["mdi-domain", "mdi-home"],
    indice: 1,
  }),
};
</script>
