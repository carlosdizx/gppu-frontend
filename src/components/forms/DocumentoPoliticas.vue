<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary darken-2" text v-bind="attrs" v-on="on">
        Politicas y normativas
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <h1 class="py-5 text-center">{{ entidad }}</h1>
        <br />
        <h1>Políticas de tratamiento de la información y de datos</h1>
        <br />
        <h2>1. Responsables del tratamiento de los datos.</h2>
        <v-divider />
        <div v-for="(responsable, index) of responsables" :key="index">
          <h3>{{ responsable.nombre }}</h3>
          <p>Nit: {{ responsable.nit }}</p>
          <p>Dirección: {{ responsable.direccion }}</p>
          <p>Correo electrónico: {{ responsable.correo }}</p>
          <p>
            Teléfono: {{ responsable.telefono }} - Cel.
            {{ responsable.celular }}
          </p>
          <v-divider />
        </div>
        <h2>2. Política general de tratamiento de protección de datos.</h2>
        <v-divider />
        <p v-html="tratamiento"></p>
        <v-divider />
        <h2>3. Ámbito de aplicación</h2>
        <v-divider />
        <p v-html="ambito"></p>
        <v-divider />
        <h2>4. Definiciones</h2>
        <v-divider />
        <p v-html="definiciones"></p>
      </v-card-text>
    </v-card>
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-dialog>
</template>

<script>
import {
  AMBITO,
  DEFINICIONES,
  ENTIDAD_EDUCATIVA,
  RESPONSABLES,
  TRATATMIENTO,
} from "@/utilites/Definicion";

export default {
  name: "DocumentoPoliticas",
  data: () => ({
    dialog: false,
    entidad: "",
    responsables: [],
    tratamiento: "",
    ambito: "",
    definiciones: "",
  }),
  created() {
    this.entidad = ENTIDAD_EDUCATIVA;
    this.responsables = RESPONSABLES;
    this.tratamiento = TRATATMIENTO;
    this.ambito = AMBITO;
    this.definiciones = DEFINICIONES;
  },
};
</script>

<style scoped></style>
