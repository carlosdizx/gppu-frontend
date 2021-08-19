<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          {{ nit }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Documentos de empresa {{ nit }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form autocomplete="off"></v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" dark @click="dialog = !dialog">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DocumentosEmpresaPendiente",
  data: () => ({
    dialog: false,
  }),
  props: {
    nit: String,
  },
};
</script>

<style scoped></style>
