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
          <v-alert dense color="blue-grey" dark>Datos estudiante</v-alert>
          <v-text-field label="Nombres" disabled v-model="datos.nombres" />
          <v-text-field label="Apellidos" disabled v-model="datos.apellidos" />
          <v-text-field label="Doumento" disabled v-model="datos.documento" />
          <v-alert dense color="blue-grey" dark>Datos empresa</v-alert>
          <v-text-field label="Nombre" disabled v-model="empresa.nombre" />
          <v-text-field label="Nombre" disabled v-model="empresa.nit" />
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
import { LISTAR_EMPRESAS_APROBADAS } from "../../../services/recursos/empresaRS";

export default {
  name: "DocumentoCalifacatorioPasante",
  data: () => ({
    dialog: false,
    opciones: ["Aprobado", "Reprobado", "Cancelado"],
    opcion: null,
    empresa: {},
  }),
  props: {
    datos: Object,
  },
  async mounted() {
    const resultado = await LISTAR_EMPRESAS_APROBADAS();
    const empresas = Object.values(resultado.data);
    for (const empresa of empresas) {
      const pasantes = empresa.pasantes;
      if (pasantes) {
        for (const pasante of pasantes) {
          if (this.datos.documento === pasante.documento) {
            this.empresa = empresa;
          }
        }
      }
    }
  },
};
</script>

<style scoped></style>
