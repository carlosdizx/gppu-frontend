<template>
  <v-card>
    <v-card-title>{{ titulo }}</v-card-title>
    <v-data-table
      :headers="columnas"
      :items="lista"
      :items-per-page="5"
      class="elevation-1"
    />
  </v-card>
</template>

<script>
export default {
  name: "TablaCompuesta",
  props: {
    titulo: String,
    columnas: Array,
    lista: Array,
  },
};
</script>
