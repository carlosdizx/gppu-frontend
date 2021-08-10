<template>
  <v-toolbar dark color="cyan darken-4" flat>
    <v-toolbar-title>{{ titulo }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-icon>{{ icono }}</v-icon>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    titulo: String,
    icono: String,
  },
};
</script>
