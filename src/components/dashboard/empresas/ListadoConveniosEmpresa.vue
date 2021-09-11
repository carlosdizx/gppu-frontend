<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small color="amber" v-bind="attrs" v-on="on">
        <v-icon>mdi-clipboard-list</v-icon>
      </v-btn>
    </template>
    <v-container>
      <v-card>
        <v-card-title>{{ datos.nombre }} || {{ datos.nit }}</v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  name: "ListadoConveniosEmpresa",
  components: {},
  data: () => ({
    dialog: false,
  }),
  props: {
    datos: Object,
  },
};
</script>

<style scoped></style>
