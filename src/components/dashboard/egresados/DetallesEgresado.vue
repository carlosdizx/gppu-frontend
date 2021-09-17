<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small color="indigo accent-4" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ datos.documento }} | {{ datos.nombres + " " + datos.apellidos }} |
        {{ datos.calificacion.valoracionFinal }}
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Documento" v-model="datos.documento" disabled />
          <v-text-field label="Nombres" v-model="datos.nombres" disabled />
          <v-text-field label="Apellidos" v-model="datos.apellidos" disabled />
          <v-text-field label="Celular" v-model="datos.celular" disabled />
          <v-text-field label="Correo" v-model="datos.correo" disabled />
          <v-alert dense color="blue-grey" dark>
            Datos del puesto de práctica
          </v-alert>
          <v-text-field
            label="Empresa"
            v-model="datos.empresa.nombre"
            disabled
          />
          <v-text-field label="Nit" v-model="datos.empresa.nit" disabled />
          <v-alert dense color="blue-grey" dark> Resumen de práctica </v-alert>
          <v-text-field
            label="¿Acata las normas y principios de la entidad?"
            v-model="datos.calificacion.valoracion1"
            disabled
          />
          <v-text-field
            label="Es responsable en el cumplimiento de su horario de trabajo"
            v-model="datos.calificacion.valoracion2"
            disabled
          />
          <v-text-field
            label="Es responsable en el cumplimiento de sus tareas."
            v-model="datos.calificacion.valoracion3"
            disabled
          />
          <v-text-field
            label="Espíritu de colaboración"
            v-model="datos.calificacion.valoracion4"
            disabled
          />
          <v-text-field
            label="Relaciones interpersonales"
            v-model="datos.calificacion.valoracion5"
            disabled
          />
          <v-text-field
            label="Se adapta con facilidad"
            v-model="datos.calificacion.valoracion6"
            disabled
          />
          <v-text-field
            label="¿Cómo usted que ha sido el desempeño del estudiante en éste corte?"
            v-model="datos.calificacion.valoracion7"
            disabled
          />
          <v-alert>
            Nota final: {{ datos.calificacion.valoracionFinal }}
          </v-alert>
          <v-text-field
            label=""
            v-model="datos.calificacion.aspectos_pro"
            disabled
          />
          <v-text-field
            label=""
            v-model="datos.calificacion.aspectos_por"
            disabled
          />
          <v-text-field
            label=""
            v-model="datos.calificacion.comentario"
            disabled
          />
          <v-text-field
            label=""
            v-model="datos.calificacion.competencias"
            disabled
          />
        </v-form>
      </v-card-text>
    </v-card>
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-dialog>
</template>

<script>
export default {
  name: "DetallesEgresado",
  data: () => ({
    dialog: false,
  }),
  props: {
    datos: Object,
  },
};
</script>

<style scoped></style>
