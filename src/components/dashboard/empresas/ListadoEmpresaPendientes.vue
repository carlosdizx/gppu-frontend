<template>
  <v-container>
    <v-data-table :headers="columnas" :items="filas" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Empresas pendientes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.nit="{ item }">
        <DocumentosEmpresa :nit="item.nit" />
      </template>
      <template v-slot:item.acciones="{ item }">
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
        <DocumentoAprobatorioEmpresa :datos="item" @aprobado="cargarDatos" />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {
  ELIMINAR_EMPRESA,
  LISTAR_EMPRESAS_PENDIENTES,
} from "../../../services/recursos/empresaRS";
import Swal from "sweetalert2";
import Vue from "vue";
import DocumentosEmpresa from "./DocumentosEmpresa";
import DocumentoAprobatorioEmpresa from "./DocumentoAprobatorioEmpresa";
export default Vue.extend({
  name: "ListadoEmpresaPendientes",
  components: { DocumentosEmpresa, DocumentoAprobatorioEmpresa },
  data: () => ({
    columnas: [
      { text: "Nit", value: "nit" },
      { text: "Nombre", value: "nombre" },
      { text: "Representante", value: "documento", sortable: false },
      { text: "Celular", value: "celular", sortable: false },
      { text: "Correo", value: "correo", sortable: false },
      { text: "País", value: "pais", sortable: false },
      { text: "Departamento", value: "departamento", sortable: false },
      { text: "Ciudad", value: "ciudad", sortable: false },
      { text: "Direcció", value: "direccion", sortable: false },
      { text: "Acciones", value: "acciones", sortable: false },
    ],
    filas: [],
  }),
  methods: {
    async cargarDatos() {
      this.filas = [];
      const token = JSON.parse(localStorage.getItem("token"));
      await LISTAR_EMPRESAS_PENDIENTES(token.localId).then((resultado) => {
        if (resultado.data) {
          this.filas = Object.values(resultado.data);
        }
      });
    },
    async eliminar(nit) {
      await Swal.fire({
        title: "¿Desea eliminar este registro?",
        text:
          "Si borra a esta empresa no podra recuperar esta info," +
          " antes tiene que notificarle a la empresa que realize" +
          " el registro nuevamente con las correcciones correspondientes",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#42b03d",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = JSON.parse(localStorage.getItem("token"));
          await ELIMINAR_EMPRESA(token.localId, nit).then((result) =>
            console.log(result)
          );
          await this.cargarDatos();
          await Swal.fire(
            "Eliminada!",
            "La empresa pendiente se elimino con exito",
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
