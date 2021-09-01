<template>
  <v-row justify="center" class="my-2 px-1">
    <v-dialog v-model="dialog" persistent max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab small color="info darken-3" v-bind="attrs" v-on="on">
          <v-icon>mdi-briefcase-check-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Estudiante {{ datos.documento }}</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-alert class="text-center" dense dark color="secondary">
              Datos del estudiante
            </v-alert>
            <v-text-field label="Nit" :value="datos.documento" disabled />
            <v-text-field label="Nombre" :value="datos.nombres" disabled />
            <v-text-field label="Nombre" :value="datos.apellidos" disabled />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-4" dark @click="dialog = !dialog">
            Cerrar
          </v-btn>
          <v-btn color="info"> Aprobar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DetallesEstudiantePendiente",
  datos: {
    dialog: false,
  },
  props: {
    datos: Object,
  },
};
</script>

<style scoped></style>
