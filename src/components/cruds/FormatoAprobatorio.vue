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
          <span class="text-h5">Empresa {{ datos.nit }}</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-alert class="text-center" dense dark color="secondary">
              Datos de la empresa
            </v-alert>
            <v-text-field label="Nit" :value="datos.nit" disabled />
            <v-text-field label="Nombre" :value="datos.nombre" disabled />
            <v-text-field
              label="Representante"
              :value="datos.documento"
              disabled
            />
            <v-text-field label="Celular" :value="datos.celular" disabled />
            <v-text-field label="Correo" :value="datos.correo" disabled />
            <v-text-field label="Pais" :value="datos.pais" disabled />
            <v-text-field
              label="Departamento"
              :value="datos.departamento"
              disabled
            />
            <v-text-field label="Ciudad" :value="datos.ciudad" disabled />
            <v-text-field label="Direccion" :value="datos.direccion" disabled />
            <v-alert class="text-center" dense dark color="secondary">
              Periodo de valides del convenio
            </v-alert>
            <CalendarioRango />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-4" dark @click="dialog = !dialog">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import CalendarioRango from "../general/CalendarioRango";
export default {
  name: "FormatoAprobatorio",
  components: { CalendarioRango },
  data: () => ({
    dialog: false,
  }),
  props: {
    datos: Object,
  },
};
</script>

<style scoped></style>
