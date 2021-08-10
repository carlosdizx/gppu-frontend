<template>
  <div>
    <Toolbar
      titulo="Formularios de registro"
      icono="mdi-account-multiple-plus"
    />
    <FormEmpresa />
  </div>
</template>

<script lang="ts">
import Toolbar from "@/components/general/Toolbar.vue";
import FormEmpresa from "@/components/forms/FormEmpresa.vue";
export default {
  name: "ToolbarRegistro",
  components: { Toolbar, FormEmpresa },
};
</script>

<style scoped></style>
