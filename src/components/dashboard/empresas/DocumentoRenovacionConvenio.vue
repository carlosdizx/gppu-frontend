<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-btn color="red darken-4" dark @click="dialog = !dialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab small color="lime" v-bind="attrs" v-on="on">
          <v-icon>mdi-autorenew</v-icon>
        </v-btn>
      </template>
      <v-container>
        <v-card>
          <v-card-title>{{ datos.nombre }} | {{ datos.nit }}</v-card-title>
          <v-card-text>
            <v-form>
              <validation-provider
                v-slot="{ errors }"
                name="Programas académicos"
                rules="required"
              >
                <v-combobox
                  v-model="datos.programas"
                  :items="programas"
                  item-text="nombre"
                  label="Programa académico"
                  hide-selected
                  small-chips
                  dense
                  outlined
                  multiple
                  :error-messages="errors"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Documento de convenio"
                rules="required"
              >
                <v-file-input
                  label="Nuevo documento de convenio"
                  v-model="convenio"
                  small-chips
                  outlined
                  dense
                  hint="Solo PDF"
                  persistent-hint
                  accept="application/pdf"
                  append-icon="mdi-pdf-box"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-form>
            <CalendarioRango @fecha="fechas = $event" />
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              color="green accent-4"
              :loading="carga"
              @click="renovar"
              :disabled="invalid || carga"
            >
              Renovar <v-icon>mdi-handshake</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </validation-observer>
</template>

<script>
import {
  ACTUALIZAR_CONVENIO_EMPRESA,
  APROBAR_CONVENIO_EMPRESA,
  APROBAR_EMPRESA,
  ELIMINAR_EMPRESA,
  REGISTRAR_ARCHIVO_CONVENIO,
} from "../../../services/recursos/empresaRS";
import CalendarioRango from "../../general/CalendarioRango";
import Swal from "sweetalert2";
import moment from "moment";
import { OBTENER_DATOS_USUARIO } from "../../../services/auth";
import { LISTAR_PROGRAMAS } from "../../../services/recursos/programaRS";
import { digits, email, max, min, required } from "vee-validate/dist/rules";
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
import shortid from "shortid";
setInteractionMode("eager");

{
  extend("digits", {
    ...digits,
    message: "{_field_} Se necesita {length} digitos. ({_value_})",
  });

  extend("required", {
    ...required,
    message: "{_field_} no puede estar vacio",
  });

  extend("max", {
    ...max,
    message: "{_field_} {length} maximo de caracteres",
  });

  extend("min", {
    ...min,
    message: "{_field_} Ingrese mas caracteres ",
  });

  extend("email", {
    ...email,
    message: "Correo con formato incorrecto",
  });
}

export default {
  name: "DocumentoRenovacionConvenio",
  components: { ValidationObserver, ValidationProvider, CalendarioRango },
  data: () => ({
    dialog: false,
    fechas: [],
    programas: [],
    convenio: null,
    carga: false,
  }),
  props: {
    datos: Object,
  },
  methods: {
    async listadoProgramas() {
      await LISTAR_PROGRAMAS().then(
        (resultado) => (this.programas = Object.values(resultado.data))
      );
    },
    async renovar() {
      if (this.fechas.length === 2) {
        const fecha_inicio = moment(this.fechas[0]);
        const fecha_fin = moment(this.fechas[1]);
        const diferencia = fecha_fin.diff(fecha_inicio, "days");
        if (diferencia < 61) {
          return Swal.fire(
            "Fechas erroneas",
            `Las fechas estan mal,deben durar mas de 61 dias y
            la fecha de fin de convenio tiene que ser mayor a la
             fecha de inicio de convenio
             <br/>Diferencia en dias ${diferencia}`,
            "error"
          );
        }

        this.datos.inicio = this.fechas[0];
        this.datos.fin = this.fechas[1];
        const convenios = this.datos.convenios;
        let responsable = "";
        let documento = "";
        await OBTENER_DATOS_USUARIO().then((result) => {
          responsable = result.data.nombres + " " + result.data.apellidos;
          documento = result.data.documento;
        });
        if (this.convenio.type !== "application/pdf") {
          return Swal.fire(
            "El documento del convenio es erroneo",
            "Solo seleccionar archivos PDF",
            "error"
          );
        }
        await Swal.fire({
          title: "¿Renovar convenio con esta empresa?",
          text:
            "Soy conciente de que la informacion es correcta" +
            `Nit: ${this.datos.nit}
           Nombre: ${this.datos.nombre}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0f76b7",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, esa es la empresa!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.carga = true;
            const fecha_hoy = new Date();
            const convenio = {
              inicio: this.fechas[0],
              fin: this.fechas[1],
              generado:
                fecha_hoy.getFullYear() +
                "-" +
                (fecha_hoy.getMonth() + 1) +
                "-" +
                fecha_hoy.getDate(),
              responsable: responsable,
              documento: documento,
            };
            this.dialog = !this.dialog;
            this.carga = false;
          }
        });
      } else {
        await Swal.fire(
          "Seleccione una fecha",
          "Debe seleccionar un rango de fecha",
          "error"
        );
      }
    },
  },
  async mounted() {
    await this.listadoProgramas();
  },
};
</script>

<style scoped></style>
