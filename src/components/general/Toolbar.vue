<template>
  <div>
    <v-toolbar dark color="cyan darken-4" flat>
      <v-toolbar-title>{{ titulo }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>{{ icono }}</v-icon>
    </v-toolbar>
    <v-tabs background-color="cyan darken-4" center-active dark>
      <v-tab v-for="(tab, i) in tabs" :key="i" @click="cambiarIndex(i + 1)">
        <v-icon>{{ tab }}</v-icon>
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data: () => ({
    indice: 1,
  }),
  props: {
    titulo: String,
    icono: String,
    tabs: Array,
  },
  methods: {
    cambiarIndex(i) {
      this.indice = i;
      this.$emit("indice", this.indice);
    },
  },
};
</script>
