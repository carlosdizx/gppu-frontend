<template>
  <v-container>
    <v-card>
      <v-card-title>Asignar practicantes a puestos de trabajo</v-card-title>
    </v-card>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-form>
            <v-select label="Seleccione la empresa" :items="['e1', 'e2']" />
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
  </v-container>
</template>

<script>
import { LISTAR_EMPRESAS_APROBADAS } from "../../../services/recursos/empresaRS";
import moment from "moment";

export default {
  name: "Asignacion",
  data: () => ({
    empresas: [],
  }),
  methods: {
    async cargarEmpresas() {
      try {
        const result = await LISTAR_EMPRESAS_APROBADAS();
        this.empresas = await result.data;
        this.empresas = Object.values(this.empresas);
        this.empresas.forEach((empresa) => {
          const fecha1 = moment(new Date().toString());
          const fecha2 = moment(empresa.fin);
          const fecha3 = moment(empresa.inicio);
          empresa.dias = fecha2.diff(fecha1, "days");
          empresa.periodo = fecha2.diff(fecha3, "days");
        });
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
