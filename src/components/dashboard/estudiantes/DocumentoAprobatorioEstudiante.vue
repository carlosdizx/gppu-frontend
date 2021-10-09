<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="info darken-3" v-bind="attrs" v-on="on" fab small>
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </template>
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="text-h5">Estudiante {{ datos.documento }}</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-alert class="text-center" dense dark color="secondary">
            Actualizar Datos
            <v-btn
              fab
              small
              color="secondary"
              @click="actualizarDatos"
              :disabled="actualiza"
            >
              <v-icon>mdi-update</v-icon>
            </v-btn>
          </v-alert>
          <v-text-field label="Documento" v-model="datos.documento" disabled />
          <v-text-field label="Nombres" v-model="datos.nombres" disabled />
          <v-text-field label="Apellidos" v-model="datos.apellidos" disabled />
          <v-text-field label="Tipo Doc." v-model="datos.tipoDoc" disabled />
          <v-text-field
            label="F. expedición"
            v-model="datos.fechaExp"
            disabled
          />
          <v-text-field
            label="F. nacimiento"
            v-model="datos.fechaNaci"
            disabled
          />
          <v-text-field label="Género" v-model="datos.genero" />
          <v-text-field label="EPS" v-model="datos.eps" />
          <v-text-field label="País" v-model="datos.pais" />
          <v-text-field
            label="Departamento/Estado/Provincia"
            v-model="datos.departamento"
          />
          <v-text-field label="Ciudad" v-model="datos.ciudad" />
          <v-text-field label="Dirección" v-model="datos.direccion" />
          <v-text-field label="Zona" v-model="datos.zona" />
          <v-text-field label="Correo" v-model="datos.correo" />
          <v-text-field label="Celular o télefono" v-model="datos.telefono" />
          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn :href="datos.url" target="_blank">
                Portafolio digital <v-icon>mdi-briefcase</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn :disabled="url === ''" :href="url" target="_blank">
                Hoja de vida <v-icon>mdi-account-box</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-alert class="text-center" dense dark color="secondary">
            Datos académicos
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
            label="Habilidades"
            :value="datos.datos.habilidades"
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
            label="Experiencia en ingeniería"
            :value="datos.datos.exp_ingenieria"
            disabled
          />
          <v-textarea
            label="Competencias técnicas"
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
  ACTUUALIZAR_ESTUDIANTE_PENDIENTE,
  LISTAR_ARCHIVO_ESTUDIANTE,
} from "../../../services/recursos/estudianteRS";
import Swal from "sweetalert2";

export default {
  name: "DocumentoAprobatorioEstudiante",
  data() {
    return {
      dialog: false,
      actualiza: false,
      url: "",
    };
  },
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
          const token = JSON.parse(localStorage.getItem("token"));
          await APROBAR_ESTUDIANTE(token.localId, this.datos);
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
    async actualizarDatos() {
      console.log("actualizar");
      await Swal.fire({
        title: "¿Esta seguro de Actualizar los datos del estudiante?",
        text:
          "Soy conciente de la nueva información esta correcta " +
          `Documento: ${this.datos.documento} -
           Nombres: ${this.datos.nombres} -
           Apellidos: ${this.datos.apellidos}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0f76b7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Actualizar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = JSON.parse(localStorage.getItem("token"));
          await ACTUUALIZAR_ESTUDIANTE_PENDIENTE(token.localId, this.datos);
          await Swal.fire(
            "Actualizado!",
            "Felicitaciones estudiante Actualizado",
            "success"
          );
          this.dialog = !this.dialog;
        }
      });
    },
  },
  async mounted() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await LISTAR_ARCHIVO_ESTUDIANTE(
        token.localId,
        this.datos.documento,
        "hoja_de_vida"
      ).then((result) => {
        this.url = result;
      });
    } catch (e) {
      //
    }
  },
};
</script>

<style scoped></style>
