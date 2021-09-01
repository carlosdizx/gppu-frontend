<template>
  <v-container>
    <v-data-table
      :headers="columnas"
      :items="filas"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.detalle="{ item }">
        <v-btn fab dark small color="info darken-2">
          {{ item.id }}
          <v-icon> mdi-eye </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { LISTAR_EMPRESAS_APROBADAS } from "../../../services/recursos/estudianteRS";

export default {
  name: "ListadoEstudiantesAprobados",
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
      await LISTAR_EMPRESAS_APROBADAS().then(
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
