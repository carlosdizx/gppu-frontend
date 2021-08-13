<template>
  <v-card max-width="800" class="mx-auto my-auto">
    <v-card-title>Formulario estuidante</v-card-title>
    <v-card-subtitle>
      Tenga preparado los documentos y datos necesarios, solo se aceptan
      archivos en formato PDF
    </v-card-subtitle>
    <v-card-text>
      <v-form autocomplete="off" :disabled="carga">
        <v-text-field label="Nombres completas" prepend-icon="mdi-account" />
        <v-row>
          <v-col cols="6">
            <v-select
              label="Tipo de documento"
              :items="['Cedula de ciudadania', 'Tarjeta de identidad', 'Otro']"
              prepend-icon="mdi-format-list-bulleted-type"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              append-icon="mdi-card-account-details"
              label="Numero de documento"
            />
          </v-col>
        </v-row>
        <Calendario @fecha="fechaNacimiento = $event" />
        <v-text-field label="Direcciones" prepend-icon="mdi-home" />
        <v-text-field label="Correo electronico" prepend-icon="mdi-email" />
        <v-select
          label="Genero"
          :items="['Masculino', 'Femenino', 'Otro']"
          prepend-icon="mdi-gender-male-female"
        />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Calendario from "../general/Calendario.vue";
export default {
  name: "FormEstudiante",
  components: { Calendario },
  data: () => ({
    carga: false,
    tiposDoc: [],
    fechaNacimiento: null,
  }),
  methods: {},
};
</script>

<style scoped></style>
