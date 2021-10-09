<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
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
            <v-btn @click="descargarDatosEstudiante" small fab color="info">
              <v-icon>mdi-file-download</v-icon>
            </v-btn>
          </v-alert>
          <v-text-field label="Documento" :value="datos.documento" disabled />
          <v-text-field label="Nombres" :value="datos.nombres" disabled />
          <v-text-field label="Apellidos" :value="datos.apellidos" disabled />
          <v-text-field label="Tipo Doc." :value="datos.tipoDoc" disabled />
          <v-text-field
            label="F. expedición"
            :value="datos.fechaExp"
            disabled
          />
          <v-text-field
            label="F. nacimiento"
            :value="datos.fechaNaci"
            disabled
          />
          <v-text-field label="Género" :value="datos.genero" disabled />
          <v-text-field label="EPS" :value="datos.eps" disabled />
          <v-text-field label="País" :value="datos.pais" disabled />
          <v-text-field
            label="Departamento/Estado/Provincia"
            :value="datos.departamento"
            disabled
          />
          <v-text-field label="Ciudad" :value="datos.ciudad" disabled />
          <v-text-field label="Dirección" :value="datos.direccion" disabled />
          <v-text-field label="Zona" :value="datos.zona" disabled />
          <v-text-field label="Correo" :value="datos.correo" disabled />
          <v-text-field
            label="Celular o télefono"
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
            Competencias técnicas y profesionales
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
    </v-card>
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-dialog>
</template>

<script>
import { jsPDF } from "jspdf";
import { LISTAR_ARCHIVO_ESTUDIANTE } from "../../../services/recursos/estudianteRS";

export default {
  name: "DetallesEstudiante",
  data: () => ({
    dialog: false,
    url: "",
  }),
  props: {
    datos: Object,
  },
  methods: {
    descargarDatosEstudiante() {
      const doc = new jsPDF();
      doc.text("INFORME DATOS DEL ESTUDIANTE", 50, 30);
      doc.text(
        `Nombres y Apellidos: ${this.datos.nombres} ${this.datos.apellidos}`,
        20,
        50
      );
      doc.text(`Tipo De Documento: ${this.datos.tipoDoc}`, 20, 60);
      doc.text(`Número Documento: ${this.datos.documento}`, 20, 70);
      doc.text(`Fecha de Nacimiento: ${this.datos.fechaNaci}`, 20, 80);
      doc.text(`Fecha de Expiracion: ${this.datos.fechaExp}`, 20, 90);
      doc.text(`País: ${this.datos.pais}`, 20, 100);
      doc.text(`Departamento: ${this.datos.departamento}`, 20, 110);
      doc.text(`Ciudad: ${this.datos.ciudad}`, 20, 120);
      doc.text(`Direccion: ${this.datos.direccion}`, 20, 130);
      doc.text(`Zona: ${this.datos.zona}`, 20, 140);
      doc.text(`Correo Electronico: ${this.datos.correo}`, 20, 150);
      doc.text(`Teléfono: ${this.datos.telefono}`, 20, 160);
      doc.text(`Género: ${this.datos.genero}`, 20, 170);
      doc.text(`EPS: ${this.datos.eps}`, 20, 180);
      doc.text(`URL: ${this.datos.url}`, 20, 190);
      doc.save(
        `${this.datos.nombres} ${this.datos.apellidos}-${this.datos.documento}`
      );
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
