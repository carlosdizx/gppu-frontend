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
</template>

<script>
export default {
  name: "ListadoEmpresaAprobadas",
  data() {
    return {
      empresas: [],
    };
  },
};
</script>
