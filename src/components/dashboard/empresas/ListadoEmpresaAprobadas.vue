<template>
  <v-container>
    <v-data-table :headers="columnas" :items="filas" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Empresas aprobadas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          {{ new Date().toLocaleDateString().replaceAll("/", "-") }}
        </v-toolbar>
      </template>
      <template v-slot:item.nit="{ item }">
        <DocumentosEmpresa :nit="item.nit" />
      </template>
      <template v-slot:item.convenios="{ item }">
        <DocumentoRenovacionConvenio @renovado="cargarEmpresas" :datos="item" />
        <ListadoConveniosEmpresa
          :convenios="item.convenios"
          :nombre="item.nombre"
          :nit="item.nit"
        />
      </template>
      <template v-slot:item.dias="{ item }">
        <v-btn v-show="item.dias >= 60" text color="success">
          {{ item.dias }}
        </v-btn>
        <v-btn v-show="item.dias < 60 && item.dias > 0" text color="warning">
          {{ item.dias }}
        </v-btn>
        <v-btn v-show="item.dias < 0" text color="red">
          {{ item.dias }}
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { LISTAR_EMPRESAS_APROBADAS } from "../../../services/recursos/empresaRS";
import DocumentosEmpresa from "./DocumentosEmpresa";
import ListadoConveniosEmpresa from "./ListadoConveniosEmpresa";
import DocumentoRenovacionConvenio from "./DocumentoRenovacionConvenio";
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "ListadoEmpresaAprobadas",
  components: {
    DocumentosEmpresa,
    DocumentoRenovacionConvenio,
    ListadoConveniosEmpresa,
  },
  data: () => ({
    columnas: [
      { text: "Nit", value: "nit", sortable: false },
      { text: "Nombre", value: "nombre" },
      { text: "Representante", value: "documento" },
      { text: "Celular", value: "celular" },
      { text: "Correo", value: "correo" },
      { text: "País", value: "pais" },
      { text: "Departamento", value: "departamento" },
      { text: "Ciudad", value: "ciudad" },
      { text: "Dirección", value: "direccion" },
      { text: "Convenios", value: "convenios", sortable: false },
    ],
    filas: [],
  }),
  methods: {
    async cargarEmpresas() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        await LISTAR_EMPRESAS_APROBADAS(token.localId).then(
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
  created() {
    this.cargarEmpresas();
  },
});
</script>

<style scoped></style>
