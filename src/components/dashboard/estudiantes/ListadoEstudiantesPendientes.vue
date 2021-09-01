<template>
  <v-container>
    <v-card class="mx-auto my-auto">
      <v-card-title>Listado de estudiantes pendientes</v-card-title>
      <v-simple-table>
        <thead>
          <tr>
            <th>Documento de identidad</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo electronico</th>
            <th>Celular</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(estudiante, index) in estudiantes" :key="index">
            <td>{{ estudiante.documento }}</td>
            <td>{{ estudiante.nombres }}</td>
            <td>{{ estudiante.apellidos }}</td>
            <td>{{ estudiante.correo }}</td>
            <td>{{ estudiante.telefono }}</td>
            <td>
              <DetallesEstudiantePendiente
                :datos="estudiante"
                @aprobado="cargarDatos"
              />
              <v-btn
                fab
                dark
                small
                color="red darken-2"
                @click="eliminar(estudiante.documento)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import DetallesEstudiantePendiente from "./DetallesEstudiantePendiente";
import Vue from "vue";
import {
  ELIMINAR_ESTUDIANTE,
  LISTAR_ESTUDIANTES_PENDIENTES,
} from "../../../services/recursos/estudianteRS";
import { ELIMINAR_EMPRESA } from "../../../services/recursos/empresaRS";
export default Vue.extend({
  name: "ListadoEstudiantesPendientes",
  components: { DetallesEstudiantePendiente },
  data: () => ({
    estudiantes: [],
  }),
  methods: {
    async cargarDatos() {
      await LISTAR_ESTUDIANTES_PENDIENTES().then((result) => {
        this.estudiantes = result.data;
      });
    },
    async eliminar(documento) {
      await Swal.fire({
        title: "¿Desea eliminar este registro?",
        text: "Se borrara la informacion del 'estudiante'",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#42b03d",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await ELIMINAR_ESTUDIANTE(documento).then((result) =>
            console.log(result)
          );
          await this.cargarDatos();
          await Swal.fire(
            "Eliminado!",
            "El estudiante se elimino con exito",
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
