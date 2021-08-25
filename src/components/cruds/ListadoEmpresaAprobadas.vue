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
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empresa, index) in empresas" :key="index">
          <td>{{ empresa.nit }}</td>
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
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import {
  LISTAR_EMPRESAS_APROBADAS,
  ELIMINAR_EMPRESA_APROBADA,
} from "../../services/recursos";
import Vue from "vue";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "ListadoEmpresaAprobadas",
  data: () => ({
    empresas: [],
  }),
  methods: {
    async cargarEmpresas() {
      try {
        const result = await LISTAR_EMPRESAS_APROBADAS();
        this.empresas = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async eliminar(nit) {
      await Swal.fire({
        title: "¿Desea eliminar este registro?",
        text: "Si borra a esta empresa no podra recuperar esta info,",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#42b03d",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await ELIMINAR_EMPRESA_APROBADA(nit).then((result) =>
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
