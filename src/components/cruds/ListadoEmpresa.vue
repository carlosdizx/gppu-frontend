<template>
  <v-card max-width="1200" class="mx-auto my-auto">
    <v-card-title>Listado de empresas</v-card-title>
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
          <th>Carta de intencion</th>
          <th>Doc Representane</th>
          <th>Rut</th>
          <th>Camara de comercio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
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
export default {
  name: "ListadoEmpresa",
};
</script>

<style scoped></style>
