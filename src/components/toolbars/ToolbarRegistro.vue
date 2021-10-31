<template>
  <div>
    <Toolbar
      titulo="Formularios de registro"
      icono="mdi-information"
      url="about"
      back
      :tabs="tabs"
      @indice="indice = $event"
    />
    <FormEmpresa v-if="indice === 1" />
    <FormEstudiante v-if="indice === 2" />
    <FormDocente v-if="indice === 3" />
  </div>
</template>

<script lang="ts">
import Toolbar from "@/components/general/Toolbar.vue";
import FormEmpresa from "@/components/forms/FormEmpresa.vue";
import FormEstudiante from "@/components/forms/FormEstudiante.vue";
import FormDocente from "@/components/forms/FormDocente.vue";
export default {
  name: "ToolbarRegistro",
  components: { Toolbar, FormEmpresa, FormEstudiante, FormDocente },
  data: () => ({
    tabs: [
      "mdi-office-building-marker-outline",
      "mdi-school",
      "mdi-school-outline",
    ],
    indice: 1,
  }),
  methods: {},
};
</script>
