<template>
  <v-container>
    <v-data-table :headers="columnas" :items="filas" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Estudiantes aprobados</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.detalle="{ item }">
        <DetallesEstudiante :datos="item" />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import DetallesEstudiante from "./DetallesEstudiante";
import { LISTAR_ESTUDIANTES_APROBADOS } from "../../../services/recursos/estudianteRS";

export default {
  name: "ListadoEstudiantesAprobados",
  components: { DetallesEstudiante },
  data: () => ({
    columnas: [
      { text: "Documento", value: "documento" },
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
      { text: "Telefono", value: "telefono", sortable: false },
      { text: "Correo", value: "correo", sortable: false },
      { text: "Mas detalles", value: "detalle" },
    ],
    filas: [],
  }),
  methods: {
    async cargarDatos() {
      await LISTAR_ESTUDIANTES_APROBADOS().then((resultado) => {
        if (resultado.data) {
          this.filas = Object.values(resultado.data);
          this.filas = this.filas.filter(
            (estudiante) => estudiante.estado === 2
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
