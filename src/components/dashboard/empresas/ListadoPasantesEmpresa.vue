<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small color="info darken-3" v-bind="attrs" v-on="on">
        <v-icon>mdi-account-supervisor-outline</v-icon>
      </v-btn>
    </template>
    <v-data-table :headers="columnas" :items="pasantes" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Estudiante practicantes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-dialog>
</template>

<script>
export default {
  name: "PasantesPorEmpresa",
  data: () => ({
    dialog: false,
    columnas: [
      { text: "Documento", value: "documento" },
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
    ],
  }),
  props: {
    pasantes: Array,
  },
};
</script>

<style scoped></style>
