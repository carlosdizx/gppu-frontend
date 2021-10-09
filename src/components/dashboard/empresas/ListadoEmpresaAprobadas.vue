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
      <template v-slot:item.pasantes="{ item }">
        <PasantesPorEmpresa :pasantes="item.pasantes" v-if="item.pasantes" />
        <v-btn
          fab
          small
          color="purple"
          class="elevation-1"
          v-if="!item.pasantes"
          disabled
        >
          <v-icon>mdi-account-supervisor-outline</v-icon>
        </v-btn>
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
import PasantesPorEmpresa from "./ListadoPasantesEmpresa";
import ListadoConveniosEmpresa from "./ListadoConveniosEmpresa";
import DocumentoRenovacionConvenio from "./DocumentoRenovacionConvenio";
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "ListadoEmpresaAprobadas",
  components: {
    DocumentosEmpresa,
    PasantesPorEmpresa,
    DocumentoRenovacionConvenio,
    ListadoConveniosEmpresa,
  },
  data: () => ({
    columnas: [
      { text: "Practicantes", value: "pasantes", sortable: false },
      { text: "Nit", value: "nit", sortable: false },
      { text: "Nombre", value: "nombre" },
      { text: "Representante", value: "documento", sortable: false },
      { text: "Celular", value: "celular", sortable: false },
      { text: "Correo", value: "correo", sortable: false },
      { text: "País", value: "pais", sortable: false },
      { text: "Departamento", value: "departamento", sortable: false },
      { text: "Ciudad", value: "ciudad", sortable: false },
      { text: "Dirección", value: "direccion", sortable: false },
      { text: "Fecha de aprobación", value: "inicio", sortable: false },
      { text: "Fecha de caducidad", value: "fin", sortable: false },
      { text: "Periodo (días)", value: "periodo", sortable: false },
      { text: "Días de vigencia", value: "dias", sortable: false },
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
              this.filas.forEach((empresa) => {
                const fecha1 = moment(new Date().toString());
                const fecha2 = moment(empresa.fin);
                const fecha3 = moment(empresa.inicio);
                empresa.periodo = fecha2.diff(fecha3, "days");
                empresa.dias = fecha2.diff(fecha1, "days");
              });
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
