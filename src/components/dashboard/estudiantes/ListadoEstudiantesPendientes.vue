<template>
  <v-container>
    <v-data-table :headers="columnas" :items="filas" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Estudiantes pendientes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.acciones="{ item }">
        <DocumentoAprobatorioEstudiante :datos="item" @aprobado="cargarDatos" />
        <v-btn
          fab
          dark
          small
          color="red darken-2"
          @click="eliminar(item.documento)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import DocumentoAprobatorioEstudiante from "./DocumentoAprobatorioEstudiante";
import Vue from "vue";
import {
  ELIMINAR_ESTUDIANTE,
  LISTAR_ESTUDIANTES,
} from "../../../services/recursos/estudianteRS";
export default Vue.extend({
  name: "ListadoEstudiantesPendientes",
  components: { DocumentoAprobatorioEstudiante },
  data: () => ({
    columnas: [
      { text: "Documento", value: "documento" },
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
      { text: "Correo", value: "correo", sortable: false },
      { text: "Télefono", value: "telefono", sortable: false },
      { text: "Acciones", value: "acciones" },
    ],
    filas: [],
  }),
  methods: {
    async cargarDatos() {
      const token = JSON.parse(localStorage.getItem("token"));
      await LISTAR_ESTUDIANTES(token.localId).then((result) => {
        if (result.data) {
          this.filas = Object.values(result.data);
          this.filas = this.filas.filter(
            (estudiante) => estudiante.estado === 1
          );
        }
      });
    },
    async eliminar(documento) {
      await Swal.fire({
        title: "¿Desea eliminar este registro?",
        text: "Se borrara la informacion del 'estudiante'",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#42b03d",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = JSON.parse(localStorage.getItem("token"));
          await ELIMINAR_ESTUDIANTE(token.localId, documento).then((result) =>
            console.log(result)
          );
          await this.cargarDatos();
          await Swal.fire(
            "Eliminado!",
            "El estudiante se elimino con exito",
            "success"
          );
        }
      });
    },
  },
  async mounted() {
    await this.cargarDatos();
  },
});
</script>

<style scoped></style>
