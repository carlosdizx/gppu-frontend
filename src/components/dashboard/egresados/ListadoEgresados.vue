<template>
  <v-container>
    <v-data-table
      :headers="columnas"
      :items="filas"
      item-key="documento"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Buscar por documento"
          class="mx-4"
        />
      </template>
      <template v-slot:item.detalle="{ item }">
        <DetallesEgresado :datos="item" />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { LISTAR_EGRESADOS } from "../../../services/recursos/egresadosRS";
import DetallesEgresado from "./DetallesEgresado";
export default {
  name: "ListadoEgresados",
  components: { DetallesEgresado },
  data: () => ({
    search: "",
    calories: "",
    columnas: [
      { text: "Documento", value: "documento" },
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
      { text: "Celular", value: "celular", sortable: false },
      { text: "Correo", value: "correo", sortable: false },
      { text: "Más detalles", value: "detalle" },
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
    async cargarDatos() {
      const token = JSON.parse(localStorage.getItem("token"));
      await LISTAR_EGRESADOS(token.localId).then((resultado) => {
        if (resultado.data) {
          this.filas = Object.values(resultado.data);
        }
      });
    },
  },
  async mounted() {
    await this.cargarDatos();
  },
};
</script>

<style scoped></style>
