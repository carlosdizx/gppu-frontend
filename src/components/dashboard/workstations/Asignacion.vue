<template>
  <v-container>
    <v-card>
      <v-card-title>Asignar practicantes a puestos de trabajo</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-form>
              <v-combobox
                v-model="empresa"
                :items="empresas"
                item-text="nombre"
                label="Buscar empresa"
                hide-selected
                small-chips
                dense
                outlined
              />
              <v-text-field
                label="Nit"
                :value="!empresa ? null : empresa.nit"
                disabled
              />
              <v-text-field
                label="Nombre"
                :value="!empresa ? null : empresa.nombre"
                disabled
              />
              <v-text-field
                label="Departamento"
                :value="!empresa ? null : empresa.departamento"
                disabled
              />
              <v-text-field
                label="Ciudad"
                :value="!empresa ? null : empresa.ciudad"
                disabled
              />
              <v-text-field
                label="Dirección"
                :value="!empresa ? null : empresa.direccion"
                disabled
              />
              <v-text-field
                label="Días de validez"
                :value="!empresa ? null : empresa.dias"
                disabled
              />
            </v-form>
          </v-col>
          <v-col cols="6">
            <v-form>
              <v-combobox
                v-model="estudiante"
                :items="estudiantes"
                item-text="documento"
                label="Buscar estudiante"
                hide-selected
                small-chips
                dense
                outlined
              />
              <v-text-field
                label="Nombres"
                :value="!estudiante ? null : estudiante.nombres"
                disabled
              />
              <v-text-field
                label="Apellidos"
                :value="!estudiante ? null : estudiante.apellidos"
                disabled
              />
              <v-text-field
                label="Departamento"
                :value="!estudiante ? null : estudiante.departamento"
                disabled
              />
              <v-text-field
                label="Ciudad"
                :value="!estudiante ? null : estudiante.ciudad"
                disabled
              />
              <v-text-field
                label="Dirección"
                :value="!estudiante ? null : estudiante.direccion"
                disabled
              />
              <v-text-field
                label="Celular"
                :value="!estudiante ? null : estudiante.telefono"
                disabled
              />
            </v-form>
          </v-col>
        </v-row>
        <v-btn
          block
          :disabled="!empresa || !estudiante"
          color="success"
          @click="registrarworkstation"
        >
          Asignar
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  ASIGNAR_PASANTE_APROBADAS,
  LISTAR_EMPRESAS_APROBADAS,
} from "../../../services/recursos/empresaRS";
import {
  ESTUDIANTE_PASANTE,
  LISTAR_ESTUDIANTES,
} from "../../../services/recursos/estudianteRS";

import moment from "moment";
import Swal from "sweetalert2";

export default {
  name: "Asignacion",
  data: () => ({
    empresas: [],
    estudiantes: [],
    empresa: null,
    estudiante: null,
  }),
  methods: {
    async cargarEmpresas() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        await LISTAR_EMPRESAS_APROBADAS(token.localId).then((result) => {
          if (result.data) {
            this.empresas = Object.values(result.data);
          }
        });
        this.empresas.forEach((empresa) => {
          const fecha1 = moment(new Date().toString());
          const fecha2 = moment(empresa.fin);
          empresa.dias = fecha2.diff(fecha1, "days");
        });
        this.empresas = this.empresas.filter((empresa) => empresa.dias >= 60);
      } catch (error) {
        console.log(error);
      }
    },
    async cargarEstudiantes() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        await LISTAR_ESTUDIANTES(token.localId).then((resultado) => {
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
    async registrarworkstation() {
      this.estudiante.estado = 3;
      const token = JSON.parse(localStorage.getItem("token"));
      await ESTUDIANTE_PASANTE(token.localId, this.estudiante);
      const estudiante = {
        documento: this.estudiante.documento,
        nombres: this.estudiante.nombres,
        apellidos: this.estudiante.apellidos,
      };
      const pasantes = this.empresa.pasantes ? this.empresa.pasantes : [];
      pasantes.push(estudiante);
      this.empresa.pasantes = pasantes;
      this.empresa.dias = null;
      await ASIGNAR_PASANTE_APROBADAS(token.localId, this.empresa);
      this.empresas = [];
      this.estudiantes = [];
      this.empresa = null;
      this.estudiante = null;
      await this.cargarEmpresas();
      await this.cargarEstudiantes();
      await Swal.fire({
        title: "Felicitaciones por el nuevo puesto de practica 👨‍🏭👩‍🏭",
        timer: 2500,
        icon: "success",
        showConfirmButton: false,
      });
    },
  },
  async mounted() {
    await this.cargarEmpresas();
    await this.cargarEstudiantes();
  },
};
</script>

<style scoped></style>
