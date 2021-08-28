<template>
  <v-container>
    <v-card class="mx-auto my-auto">
      <v-card-title>Listado de empresas pendientes</v-card-title>
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
            <th>Acciones</th>
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
              <FormatoAprobatorio :datos="empresa" @aprobado="cargarDatos" />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
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
import FormatoAprobatorio from "./FormatoAprobatorio";
export default Vue.extend({
  name: "ListadoEmpresaPendientes",
  components: { DocumentosEmpresa, FormatoAprobatorio },
  data: () => ({
    empresas: [],
  }),
  methods: {
    async cargarDatos() {
      await LISTAR_EMPRESAS_PENDIENTES().then((result) => {
        this.empresas = result.data;
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
          await ELIMINAR_EMPRESA(nit).then((result) => console.log(result));
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
