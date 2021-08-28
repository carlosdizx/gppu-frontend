<template>
  <v-container>
    <v-card class="mx-auto my-auto">
      <v-card-title>Listado de empresas pendientes</v-card-title>
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
              <v-btn class="px-5" fab dark small color="red darken-2">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn class="px-5" fab dark small color="blue darken-2">
                <v-icon>mdi-check</v-icon>
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
import Vue from "vue";
import { LISTAR_ESTUDIANTES_PENDIENTES } from "../../../services/recursos/estudianteRS";
export default Vue.extend({
  name: "ListadoEstudiantesPendientes",
  components: {},
  data: () => ({
    estudiantes: [],
  }),
  methods: {
    async cargarDatos() {
      await LISTAR_ESTUDIANTES_PENDIENTES().then((result) => {
        this.estudiantes = result.data;
      });
    },
  },
  async mounted() {
    await this.cargarDatos();
  },
});
</script>

<style scoped></style>
