<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small color="lime" v-bind="attrs" v-on="on">
        <v-icon>mdi-handshake-outline</v-icon>
      </v-btn>
    </template>
    Renovar conveio
  </v-dialog>
</template>

<script>
export default {
  name: "DocumentoRenovacionConvenio",
  data: () => ({
    dialog: false,
  }),
};
</script>

<style scoped></style>
