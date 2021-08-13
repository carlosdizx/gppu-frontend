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
        <v-row>
          <Calendario
            texto="Fecha de expedicion"
            @fecha="fechaNacimiento = $event"
          />
          <Calendario
            texto="Fecha de nacimiento"
            @fecha="fechaNacimiento = $event"
          />
        </v-row>
        <v-select
          label="Genero"
          :items="['Masculino', 'Femenino', 'Otro']"
          prepend-icon="mdi-gender-male-female"
        />
        <v-text-field label="EPS" prepend-icon="mdi-hospital-building" />
        <v-divider />
        <v-text-field label="Pais" prepend-icon="mdi-earth" />
        <v-text-field
          label="Departamento/Estado/Provincia"
          prepend-icon="mdi-sign-real-estate"
        />
        <v-text-field label="Ciudad" prepend-icon="mdi-city" />
        <v-text-field label="Direccion" prepend-icon="mdi-home" />
        <v-text-field label="Correo electronico" prepend-icon="mdi-email" />
        <v-select
          label="Zona"
          :items="['Rural', 'Urbana']"
          prepend-icon="mdi-map-legend"
        />
        <v-text-field label="Telefono" prepend-icon="mdi-phone" type="number" />
        <v-divider />
        <v-text-field
          label="Promedio de calificaciones (aprox)"
          prepend-icon="mdi-counter"
          type="number"
        />
        <v-select
          :items="['Decimo', 'Noveno', 'Octavo', 'Otro']"
          label="Semestre"
          prepend-icon="mdi-circle-half-full"
        />
        <v-divider />
        <v-select
          label="Primera opcion"
          :items="opcinesCargo"
          prepend-icon="mdi-briefcase"
        />
        <v-select
          label="Segunda opcion"
          :items="opcinesCargo"
          prepend-icon="mdi-briefcase-outline"
        />
        <v-select
          label="Tercera opcion"
          :items="opcinesCargo"
          prepend-icon="mdi-briefcase-outline"
        />
        <v-select
          label="Modalidad de trabajo"
          :items="['Presencial', 'Virtual', 'Mixta', 'No importa']"
          prepend-icon="mdi-home-plus"
        />
        <v-select
          label="Tipo de empresa"
          :items="['Privada', 'Publica']"
          prepend-icon="mdi-domain"
        />
        <v-text-field
          label="Expectativas de trabajo"
          prepend-icon="mdi-order-bool-ascending-variant"
        />
        <v-divider />
        <v-select
          label="¿Cuenta con experiencia laboral?"
          :items="['Si', 'No']"
        />
        <v-select
          label="¿Experiencia en Ing. de Sistemas?"
          :items="['Si', 'No']"
        />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Calendario from "../general/Calendario.vue";
import { OPCIONES_CAMPO } from "@/assets/textos";

export default {
  name: "FormEstudiante",
  components: { Calendario },
  data: () => ({
    carga: false,
    opcinesCargo: OPCIONES_CAMPO,
    fechaNacimiento: null,
  }),
  methods: {},
};
</script>
