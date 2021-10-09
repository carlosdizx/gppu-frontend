<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small color="amber" v-bind="attrs" v-on="on">
        <v-icon>mdi-clipboard-list</v-icon>
      </v-btn>
    </template>
    <v-container>
      <v-data-table :headers="columnas" :items="convenios" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>{{ nombre }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-toolbar-title>{{ nit }}</v-toolbar-title>
            <v-spacer></v-spacer>
            Convenios
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  name: "ListadoConveniosEmpresa",
  components: {},
  data: () => ({
    dialog: false,
    columnas: [
      { text: "Fecha inicio", value: "inicio" },
      { text: "Fecha fin", value: "fin" },
      { text: "Fecha de generación", value: "generado" },
    ],
  }),
  props: {
    convenios: Array,
    nombre: String,
    nit: String,
  },
};
</script>

<style scoped></style>
