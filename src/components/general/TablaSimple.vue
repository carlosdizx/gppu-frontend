<template>
  <v-card max-width="800" class="mx-auto my-auto">
    <v-card-title>{{ titulo }}</v-card-title>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left" v-for="columna in columnas" :key="columna">
            {{ columna }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, jindex) in filas" :key="jindex">
          <td v-for="(valor, index) in Object.values(item)" :key="index">
            {{ valor }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TablaSimple",
  data: () => ({
    rows: [],
    colums: [""],
  }),
  props: {
    titulo: String,
    columnas: [],
    filas: [],
  },
});
</script>

<style scoped></style>
