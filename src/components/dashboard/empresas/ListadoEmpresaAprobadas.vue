<template>
  <v-container>
    <v-data-table :headers="columnas" :items="filas" class="elevation-1">
      <template v-slot:item.nit="{ item }">
        <DocumentosEmpresa :nit="item.nit" />
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
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "ListadoEmpresaAprobadas",
  components: { DocumentosEmpresa },
  data: () => ({
    columnas: [
      { text: "Nit", value: "nit", sortable: false },
      { text: "Representante", value: "documento", sortable: false },
      { text: "Celular", value: "celular", sortable: false },
      { text: "Correo", value: "correo", sortable: false },
      { text: "Pais", value: "pais", sortable: false },
      { text: "Departamento", value: "departamento", sortable: false },
      { text: "Ciudad", value: "ciudad", sortable: false },
      { text: "Direccion", value: "direccion", sortable: false },
      { text: "Fecha de aprobación", value: "inicio", sortable: false },
      { text: "Fecha de caducidad", value: "fin", sortable: false },
      { text: "Dias de vigencia", value: "periodo", sortable: false },
      { text: "Dias de validez", value: "dias", sortable: false },
    ],
    filas: [],
  }),
  methods: {
    async cargarEmpresas() {
      try {
        const result = await LISTAR_EMPRESAS_APROBADAS();
        this.filas = Object.values(result.data);
        this.filas.forEach((empresa) => {
          const fecha1 = moment(new Date().toString());
          const fecha2 = moment(empresa.fin);
          const fecha3 = moment(empresa.inicio);
          empresa.periodo = fecha2.diff(fecha3, "days");
          empresa.dias = fecha2.diff(fecha1, "days");
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.cargarEmpresas();
  },
});
</script>

<style scoped></style>
