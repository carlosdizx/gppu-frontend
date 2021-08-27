<template>
  <v-card max-width="1200" class="mx-auto my-auto">
    <v-card-title>Listado de todas las Empresas express</v-card-title>
    <v-simple-table>
      <thead>
        <tr>
          <th>Nit</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Telefono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empresa, index) in empresas" :key="index">
          <td>{{ empresa.nit }}</td>
          <td>{{ empresa.nombre }}</td>
          <td>{{ empresa.correo }}</td>
          <td>{{ empresa.telefono }}</td>
          <td>
            <v-btn
              class="px-5"
              fab
              dark
              small
              color="red darken-2"
              @click="eliminar(empresa.nit)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import {
  LISTAR_EMPRESAS_EXPRESS,
  ELIMINAR_EMPRESA_EXPRESS,
} from "../../../services/recursos";
import Vue from "vue";
import Swal from "sweetalert2";
import moment from "moment";

export default Vue.extend({
  name: "ListadoEmpresaPendientesExpress",
  data: () => ({
    empresas: [],
  }),
  methods: {
    async cargarEmpresas() {
      try {
        const result = await LISTAR_EMPRESAS_EXPRESS();
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
          await ELIMINAR_EMPRESA_EXPRESS(nit).then((result) =>
            console.log(result)
          );
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
