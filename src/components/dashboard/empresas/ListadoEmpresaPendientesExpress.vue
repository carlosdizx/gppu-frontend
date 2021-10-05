<template>
  <v-container>
    <v-data-table :headers="columnas" :items="filas" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Empresas pendientes express</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.eliminar="{ item }">
        <v-btn
          class="px-5"
          fab
          dark
          small
          color="red darken-2"
          @click="eliminar(item.nit)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {
  LISTAR_EMPRESAS_EXPRESS,
  ELIMINAR_EMPRESA_EXPRESS,
} from "../../../services/recursos/empresaRS";
import Vue from "vue";
import Swal from "sweetalert2";
import moment from "moment";

export default Vue.extend({
  name: "ListadoEmpresaPendientesExpress",
  data: () => ({
    columnas: [
      { text: "Nit", value: "nit" },
      { text: "Nombre", value: "nombre" },
      { text: "Télefono", value: "telefono" },
      { text: "Eliminar", value: "eliminar" },
    ],
    filas: [],
  }),
  methods: {
    async cargarEmpresas() {
      try {
        this.filas = [];
        const token = JSON.parse(localStorage.getItem("token"));
        await LISTAR_EMPRESAS_EXPRESS(token.localId).then((resultado) => {
          if (resultado.data) {
            this.filas = Object.values(resultado.data);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async eliminar(nit) {
      await Swal.fire({
        title: "¿Desea eliminar este registro?",
        text: "Si borra a esta empresa no podra recuperar esta info",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#42b03d",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = JSON.parse(localStorage.getItem("token"));
          await ELIMINAR_EMPRESA_EXPRESS(token.localId, nit);
          await this.cargarEmpresas();
          await Swal.fire(
            "Eliminada!",
            "La empresa se elimino con exito",
            "success"
          );
        }
      });
    },
  },
  mounted() {
    this.cargarEmpresas();
  },
});
</script>

<style scoped></style>
