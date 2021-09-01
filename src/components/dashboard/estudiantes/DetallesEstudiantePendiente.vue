<template>
  <v-row justify="center" class="my-2 px-1">
    <v-dialog v-model="dialog" persistent max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="info darken-3" v-bind="attrs" v-on="on" fab small>
          <v-icon>mdi-eye</v-icon>
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
              <v-btn small fab color="info">
                <v-icon>mdi-file-download</v-icon>
              </v-btn>
            </v-alert>
            <v-text-field label="Nit" :value="datos.documento" disabled />
            <v-text-field label="Nombre" :value="datos.nombres" disabled />
            <v-text-field label="Nombre" :value="datos.apellidos" disabled />
            <v-text-field label="Tipo Doc." :value="datos.tipoDoc" disabled />
            <v-text-field
              label="F. expedicion"
              :value="datos.fechaExp"
              disabled
            />
            <v-text-field
              label="F. nacimiento"
              :value="datos.fechaNaci"
              disabled
            />
            <v-text-field label="Genero" :value="datos.genero" disabled />
            <v-text-field label="EPS" :value="datos.eps" disabled />
            <v-text-field label="Pais" :value="datos.pais" disabled />
            <v-text-field
              label="Departamento/Estado/Provincia"
              :value="datos.departamento"
              disabled
            />
            <v-text-field label="Ciudad" :value="datos.ciudad" disabled />
            <v-text-field label="Direccion" :value="datos.direccion" disabled />
            <v-text-field label="Zona" :value="datos.zona" disabled />
            <v-text-field label="Correo" :value="datos.correo" disabled />
            <v-text-field
              label="Celular o telefono"
              :value="datos.telefono"
              disabled
            />
            <v-alert class="text-center" dense dark color="secondary">
              Datos academicos
            </v-alert>
            <v-text-field
              label="Promedio"
              :value="datos.datos.promedio"
              disabled
            />
            <v-text-field
              label="Semestre"
              :value="datos.datos.semestre"
              disabled
            />
            <v-alert class="text-center" dense dark color="secondary">
              Datos preferencia
            </v-alert>
            <v-text-field
              label="Opcion 1 de practica"
              :value="datos.datos.opcion1"
              disabled
            />
            <v-text-field
              label="Opcion 2 de practica"
              :value="datos.datos.opcion2"
              disabled
            />
            <v-text-field
              label="Opcion 3 de practica"
              :value="datos.datos.opcion3"
              disabled
            />
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
  data: () => ({ dialog: false }),
  props: {
    datos: Object,
  },
};
</script>

<style scoped></style>
