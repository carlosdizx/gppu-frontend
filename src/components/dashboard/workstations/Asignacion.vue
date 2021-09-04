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
                :items="estudiantes"
                item-text="documento"
                v-model="documento"
                v-on="actualizarEstudiante(documento)"
              />
              <v-text-field
                label="Nombres"
                :value="estudiante.nombres"
                disabled
              />
              <v-text-field
                label="Apellidos"
                :value="estudiante.apellidos"
                disabled
              />
              <v-text-field
                label="Departamento"
                :value="estudiante.departamento"
                disabled
              />
              <v-text-field
                label="Ciudad"
                :value="estudiante.ciudad"
                disabled
              />
              <v-text-field
                label="Direccion"
                :value="estudiante.direccion"
                disabled
              />
              <v-text-field
                label="Celular"
                :value="estudiante.telefono"
                disabled
              />
            </v-form>
          </v-col>
        </v-row>
        <v-btn
          block
          :disabled="!nit || !documento"
          color="success"
          @click="registrarworkstation"
          >Asignar</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { LISTAR_EMPRESAS_APROBADAS } from "../../../services/recursos/empresaRS";
import { LISTAR_ESTUDIANTES_APROBADOS } from "../../../services/recursos/estudianteRS";
import { REGISTRO_ESTUDIANTE_EN_EMPRESA } from "../../../services/recursos/workStationsRS";

import moment from "moment";

export default {
  name: "Asignacion",
  data: () => ({
    empresas: [],
    estudiantes: [],
    nit: null,
    documento: null,
    empresa: {},
    estudiante: {},
  }),
  methods: {
    async cargarEmpresas() {
      try {
        /**
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
         */
        await LISTAR_EMPRESAS_APROBADAS().then((result) => {
          if (result.data) {
            this.empresas = Object.values(result.data);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async cargarEstudiantes() {
      try {
        await LISTAR_ESTUDIANTES_APROBADOS().then((resultado) => {
          if (resultado.data) {
            this.estudiantes = Object.values(resultado.data);
            this.estudiantes = this.estudiantes.filter(
              (estudiante) => estudiante.estado === 2
            );
          }
        });
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
    actualizarEstudiante() {
      this.estudiantes.forEach((estudiante) => {
        if (estudiante.documento === this.documento) {
          return (this.estudiante = estudiante);
        }
      });
    },
    async registrarworkstation() {
      console.log("registrarworkstation");
      //await REGISTRO_ESTUDIANTE_EN_EMPRESA(datos);
    },
  },
  mounted() {
    this.cargarEmpresas();
    this.cargarEstudiantes();
  },
};
</script>

<style scoped></style>
