<template>
  <v-data-table
    :headers="columnas"
    :items="filas"
    sort-by="calories"
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>
export default {
  name: "ListadoEstudiantesAprobados",
  data: () => ({
    columnas: [
      { text: "Mas detalles", align: "start", sortable: false, value: "documento" },
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
      { text: "Eps", value: "eps", sortable: false },
      { text: "Celular", value: "telefono", sortable: false },
      { text: "Correo", value: "correo", sortable: false },
      { text: "Acciones", value: "acciones", sortable: false }
    ],
    filas: []
  }),
};
</script>

<style scoped>

</style>
