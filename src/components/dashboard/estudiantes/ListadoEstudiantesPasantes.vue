<template>
  <v-container>
    <v-data-table :headers="columnas" :items="filas" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Estudiantes practicantes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.acciones="{ item }">
        <DetallesEstudiante :datos="item" />
        <DocumentoCalifacatorioPasante :datos="item" @reasinado="cargarDatos" />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import DetallesEstudiante from "./DetallesEstudiante";
import DocumentoCalifacatorioPasante from "./DocumentoCalifacatorioPasante";
import { LISTAR_ESTUDIANTES } from "../../../services/recursos/estudianteRS";

export default {
  name: "ListadoPasantesEmpresa",
  components: { DetallesEstudiante, DocumentoCalifacatorioPasante },
  data: () => ({
    columnas: [
      { text: "Documento", value: "documento" },
      { text: "Tipo", value: "tipoDoc" },
      { text: "F. Expedición", value: "fechaExp", sortable: false },
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
      { text: "Eps", value: "eps", sortable: false },
      { text: "Télefono", value: "telefono", sortable: false },
      { text: "Correo", value: "correo", sortable: false },
      { text: "Acciones", value: "acciones" },
    ],
    filas: [],
  }),
  methods: {
    async cargarDatos() {
      this.filas = [];
      const token = JSON.parse(localStorage.getItem("token"));
      await LISTAR_ESTUDIANTES(token.localId).then((respuesta) => {
        if (respuesta.data) {
          this.filas = Object.values(respuesta.data);
          this.filas = this.filas.filter(
            (estudiante) => estudiante.estado === 3
          );
        }
      });
    },
  },
  mounted() {
    this.cargarDatos();
  },
};
</script>

<style scoped></style>
