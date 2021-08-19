<template>
  <v-card max-width="1200" class="mx-auto my-auto">
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
            <DocumentosEmpresaPendiente :nit="empresa.nit" />
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
              fab
              dark
              small
              color="info darken-2"
              @click="aprobar(empresa.nit)"
            >
              <v-icon>mdi-text-box-check</v-icon>
            </v-btn>
            <v-btn
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
  APROBAR_CONVENIO_EMPRESA,
  ELIMINAR_EMPRESA,
  EMPRESA_YA_REGISTRADA,
  LISTAR_EMPRESAS_PENDIENTES,
} from "../../services/recursos";
import Swal from "sweetalert2";
import Vue from "vue";
import DocumentosEmpresaPendiente from "./DocumentosEmpresaPendiente";
export default Vue.extend({
  name: "ListadoEmpresaPendientes",
  components: { DocumentosEmpresaPendiente },
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
    async aprobar(nit) {
      let datos = null;
      await EMPRESA_YA_REGISTRADA(nit).then((result) => (datos = result));
      datos.fecha = new Date();
      await Swal.fire({
        title: "¿Aprobar convenio con esta empresa?",
        text:
          "Se borra esta empresa de pendientes para " +
          "registrarla como aprobada." +
          `Nit: ${datos.nit}
           Nombre: ${datos.nombre}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0f76b7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cumple con las validaciones!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await APROBAR_CONVENIO_EMPRESA(datos);
          await ELIMINAR_EMPRESA(nit).then((result) => console.log(result));
          await this.cargarDatos();
          await Swal.fire(
            "Aprobada!",
            "Felicitaciones por el nuevo convenio 🤝",
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
