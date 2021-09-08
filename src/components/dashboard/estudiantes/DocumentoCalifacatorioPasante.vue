<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small color="success darken-1" v-bind="attrs" v-on="on">
        <v-icon>mdi-account-details</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-form>
          <v-select
            label="Seleccione el calificativo"
            :items="opciones"
            v-model="opcion"
          />
          <v-text-field
            label="Calificacion en numeros"
            :success="opcion === 'Aprobado'"
            :error="opcion === 'Reprobado'"
            :disabled="opcion === 'Cancelado'"
            type="number"
          />
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DocumentoCalifacatorioPasante",
  data: () => ({
    dialog: false,
    opciones: ["Aprobado", "Reprobado", "Cancelado"],
    opcion: null,
  }),
  props: {
    datos: Object,
  },
};
</script>

<style scoped></style>
