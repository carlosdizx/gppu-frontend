<template>
  <v-card max-width="800" class="mx-auto my-auto">
    <v-card-title>Formulario estuidante</v-card-title>
    <v-card-subtitle>
      Tenga preparado los documentos y datos necesarios, solo se aceptan
      archivos en formato PDF
    </v-card-subtitle>
    <v-card-text>
      <v-form autocomplete="off" :disabled="carga">
        <v-text-field label="Nombres completas" prepend-icon="mdi-account" />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  name: "FormEstudiante",
  data: () => ({
    carga: false,
  }),
  methods: {},
};
</script>

<style scoped></style>
