<template>
  <v-container>
    <v-data-table
      :headers="columnas"
      :items="filas"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        >
        </v-text-field>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "ListadoEgresados",
  data: () => ({
    search: "",
    calories: "",
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
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
  },
};
</script>

<style scoped></style>
