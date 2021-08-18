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
            <v-btn text>{{ empresa.nit }}</v-btn>
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
            <v-btn fab dark small color="yellow darken-2">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab dark small color="red darken-3">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import { LISTAR_EMPRESAS } from "../../services/recursos";
export default {
  name: "ListadoEmpresa",
  data: () => ({
    empresas: [],
  }),
  async mounted() {
    await LISTAR_EMPRESAS().then((result) => (this.empresas = result.data));
    console.log(this.empresas);
  },
};
</script>

<style scoped></style>
