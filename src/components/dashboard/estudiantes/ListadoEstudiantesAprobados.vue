<template>
  <v-container>
    <v-data-table :headers="columnas" :items="filas" class="elevation-1">
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
      { text: "Tipo", value: "tipoDoc" },
      { text: "F. Expedicion", value: "fechaExp", sortable: false },
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
      { text: "Eps", value: "eps", sortable: false },
      { text: "Telefono", value: "telefono", sortable: false },
      { text: "Correo", value: "correo", sortable: false },
      { text: "Mas detalles", value: "detalle" },
    ],
    filas: [],
  }),
  methods: {
    async cargarDatos() {
      await LISTAR_ESTUDIANTES_APROBADOS().then(
        (respuesta) => (this.filas = Object.values(respuesta.data))
      );
    },
  },
  mounted() {
    this.cargarDatos();
  },
};
</script>

<style scoped></style>
