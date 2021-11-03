<template>
  <v-container>
    <v-data-table :headers="columnas" :items="filas" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            Empresas que ya formalizaron uno o más convenios
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { LISTAR_EMPRESAS_APROBADAS } from "../../services/recursos/empresaRS";
export default {
  name: "EmpresasConConvenio",
  data: () => ({
    columnas: [
      { text: "Nit", value: "nit" },
      { text: "Nombre", value: "nombre" },
      { text: "País", value: "pais" },
      { text: "Departamento", value: "departamento" },
      { text: "Ciudad", value: "ciudad" },
    ],
    filas: [],
  }),
  methods: {
    async cargarEmpresas() {
      try {
        await LISTAR_EMPRESAS_APROBADAS("lxWMzUUF0vZosLQtHyHvXNmztV52").then(
          async (resultado) => {
            if (resultado.data) {
              this.filas = await Object.values(resultado.data);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.cargarEmpresas();
  },
};
</script>

<style scoped></style>
