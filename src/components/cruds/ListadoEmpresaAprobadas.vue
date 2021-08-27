<template>
  <v-card max-width="1200" class="mx-auto my-auto">
    <v-card-title>Listado de todas las Empresas Aprobadas</v-card-title>
    <v-simple-table>
      <thead>
        <tr>
          <th>Nit</th>
          <th>Nombre</th>
          <th>Representante</th>
          <th>Celular</th>
          <th>Correo electronico</th>
          <th>Pais</th>
          <th>Departamento</th>
          <th>Ciudad</th>
          <th>Dirreccion</th>
          <th>Fecha de aprobación</th>
          <th>Fecha de caducidad</th>
          <th>Dias de vigencia</th>
          <th>Dias de validez</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empresa, index) in empresas" :key="index">
          <td>
            <DocumentosEmpresa :nit="empresa.nit" />
          </td>
          <td>{{ empresa.nombre }}</td>
          <td>{{ empresa.documento }}</td>
          <td>{{ empresa.celular }}</td>
          <td>{{ empresa.correo }}</td>
          <td>{{ empresa.pais }}</td>
          <td>{{ empresa.departamento }}</td>
          <td>{{ empresa.ciudad }}</td>
          <td>{{ empresa.direccion }}</td>
          <td>{{ empresa.inicio }}</td>
          <td>{{ empresa.fin }}</td>
          <td>{{ empresa.periodo }}</td>
          <td>
            <v-btn v-show="empresa.dias >= 60" text color="success">
              {{ empresa.dias }}
            </v-btn>
            <v-btn
              v-show="empresa.dias < 60 && empresa.dias > 0"
              text
              color="warning"
            >
              {{ empresa.dias }}
            </v-btn>
            <v-btn v-show="empresa.dias < 0" text color="red">
              {{ empresa.dias }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import { LISTAR_EMPRESAS_APROBADAS } from "../../services/recursos";
import DocumentosEmpresa from "./DocumentosEmpresa";
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "ListadoEmpresaAprobadas",
  components: { DocumentosEmpresa },
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
});
</script>

<style scoped></style>
