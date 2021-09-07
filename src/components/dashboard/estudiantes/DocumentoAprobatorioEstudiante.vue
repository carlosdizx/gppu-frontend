<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="info darken-3" v-bind="attrs" v-on="on" fab small>
        <v-icon>mdi-check</v-icon>
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
            <v-btn fab color="info">
              <v-icon>mdi-file-download</v-icon>
            </v-btn>
          </v-alert>
          <v-text-field label="Documento" :value="datos.documento" disabled />
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
          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn :href="datos.url" target="_blank">
                Portafolio digital <v-icon>mdi-briefcase</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn :href="datos.url" target="_blank">
                Hoja de vida <v-icon>mdi-account-box</v-icon>
              </v-btn>
            </v-col>
          </v-row>
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
          <v-text-field
            label="Modalidad"
            :value="datos.datos.modalidad"
            disabled
          />
          <v-text-field
            label="Tipo empresa"
            :value="datos.datos.tipoEmp"
            disabled
          />
          <v-textarea
            label="Expectativas"
            :value="datos.datos.expectativas"
            disabled
          />
          <v-alert class="text-center" dense dark color="secondary">
            Competencias tecnicas y profesionales
          </v-alert>
          <v-text-field
            label="Experiencia laboral"
            :value="datos.datos.experiencia"
            disabled
          />
          <v-text-field
            label="Experiencia en ingenieria"
            :value="datos.datos.exp_ingenieria"
            disabled
          />
          <v-textarea
            label="Competencias tecnicas"
            :value="datos.datos.competencias"
            disabled
          />
          <v-textarea
            label="Competencias fuertes"
            :value="datos.datos.comp_fuerte"
            disabled
          />
          <v-textarea
            label="Aspectos profesionales a destacar"
            :value="datos.datos.aspectos_pro"
            disabled
          />
          <v-textarea
            label="Aspectos personales a destacar"
            :value="datos.datos.aspectos_per"
            disabled
          />
          <v-textarea
            label="Aspectos a mejorar"
            :value="datos.datos.mejoras"
            disabled
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red darken-4" dark @click="dialog = !dialog">
          Cerrar
        </v-btn>
        <v-btn color="info" @click="aprobar">Aprobar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  APROBAR_ESTUDIANTE,
  ELIMINAR_ESTUDIANTE,
} from "../../../services/recursos/estudianteRS";
import Swal from "sweetalert2";
import {
  APROBAR_CONVENIO_EMPRESA,
  ELIMINAR_EMPRESA,
} from "../../../services/recursos/empresaRS";
import { localeChanged } from "vee-validate";

export default {
  name: "DocumentoAprobatorioEstudiante",
  data: () => ({ dialog: false }),
  props: {
    datos: Object,
  },
  methods: {
    async aprobar() {
      await Swal.fire({
        title: "¿Desea aprobar a este estudiante?",
        text:
          "Soy conciente de que la informacion es correcta " +
          `Documento: ${this.datos.documento} -
           Nombres: ${this.datos.nombres} -
           Apellidos: ${this.datos.nombres}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0f76b7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cumple con las validaciones!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.datos.estado = 2;
          await APROBAR_ESTUDIANTE(this.datos);
          this.$emit("aprobado", true);
          await Swal.fire(
            "Aprobado!",
            "Felicitaciones estudiante verificado 🙋‍♀️🙋‍♂️",
            "success"
          );
          this.dialog = !this.dialog;
        }
      });
    },
  },
};
</script>

<style scoped></style>
