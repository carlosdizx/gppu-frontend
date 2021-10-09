<template>
  <div>
    <ToolbarUsuario />
    <FormUsuario />
  </div>
</template>

<script>
import FormUsuario from "../components/usuario/FormUsuario";
import ToolbarUsuario from "../components/usuario/ToolbarUsuario";
export default {
  name: "Usuario",
  components: { FormUsuario, ToolbarUsuario },
};
</script>

<style scoped></style>
