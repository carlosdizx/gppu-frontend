<template>
  <v-container>
    <v-card>
      <v-card-title>Asignar practicantes a puestos de trabajo</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-form>
              <v-select
                label="Seleccione la empresa"
                :items="empresas"
                item-text="nit"
                v-model="nit"
                v-on="actualizarEmpresa(nit)"
              />
              <v-text-field label="Nit" :value="empresa.nit" disabled />
              <v-text-field label="Nombre" :value="empresa.nombre" disabled />
              <v-text-field
                label="Departamento"
                :value="empresa.departamento"
                disabled
              />
              <v-text-field label="Ciudad" :value="empresa.ciudad" disabled />
              <v-text-field
                label="Direccion"
                :value="empresa.direccion"
                disabled
              />
              <v-text-field
                label="Dias de validez"
                :value="empresa.dias"
                disabled
              />
            </v-form>
          </v-col>
          <v-col cols="6">
            <v-form>
              <v-select
                label="Seleccione la estudiante"
                :items="estudiantesAprobados"
                item-text="documento"
                v-model="documento"
              />
            </v-form>
          </v-col>
        </v-row>
        <v-btn block color="success">Asignar</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { LISTAR_EMPRESAS_APROBADAS } from "../../../services/recursos/empresaRS";
// import { REGISTRO_WORKSTATION } from "../../../services/recursos/workStationRS";
import { LISTAR_ESTUDIANTES_APROBADOS } from "../../../services/recursos/estudianteRS";
import moment from "moment";

export default {
  name: "Asignacion",
  data: () => ({
    empresas: [],
    estudiantesAprobados: [],
    nit: null,
    documento: null,
    empresa: {},
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
        this.empresas = this.empresas.filter((empresa) => empresa.dias >= 60);
      } catch (error) {
        console.log(error);
      }
    },
    async cargarEstudiantes() {
      try {
        const result = await LISTAR_ESTUDIANTES_APROBADOS();
        this.estudiantesAprobados = Object.values(result.data);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    actualizarEmpresa() {
      this.empresas.forEach((empresa) => {
        if (empresa.nit === this.nit) {
          return (this.empresa = empresa);
        }
      });
    },
    // registrarworkstation() {
    //   REGISTRO_WORKSTATION
    // },
  },
  mounted() {
    this.cargarEmpresas();
    this.cargarEstudiantes();
  },
};
</script>

<style scoped></style>
