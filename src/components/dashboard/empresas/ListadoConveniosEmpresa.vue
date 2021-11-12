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
        <template v-slot:item.archivo="{ item }">
          <v-btn :href="item.archivo" target="_blank">
            Ver documento <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </v-dialog>
</template>

<script>
import { LISTAR_ARCHIVO_CONVENIO_EMPRESA } from "../../../services/recursos/empresa";

export default {
  name: "ListadoConveniosEmpresa",
  components: {},
  data: () => ({
    dialog: false,
    columnas: [
      { text: "Fecha inicio", value: "inicio" },
      { text: "Fecha fin", value: "fin" },
      { text: "Fecha de generación", value: "generado" },
      { text: "Responsable", value: "responsable" },
      { text: "Documento responsable", value: "documento" },
      { text: "Archivo", value: "archivo" },
    ],
  }),
  props: {
    convenios: Array,
    nombre: String,
    nit: String,
  },
  async created() {
    for (const convenio of this.convenios) {
      LISTAR_ARCHIVO_CONVENIO_EMPRESA(this.nit, convenio.archivo).then(
        (url) => (convenio.archivo = url)
      );
    }
  },
};
</script>

<style scoped></style>
