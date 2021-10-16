<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-btn color="red darken-4" dark @click="dialog = !dialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab small color="info darken-3" v-bind="attrs" v-on="on">
          <v-icon>mdi-briefcase-check-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Empresa {{ datos.nit }}</span>
        </v-card-title>
        <v-card-text>
          <v-form :disabled="carga">
            <v-alert class="text-center" dense dark color="secondary">
              Datos de la empresa
            </v-alert>
            <v-text-field
              outlined
              dense
              label="Nit"
              v-model="datos.nit"
              disabled
            />
            <validation-provider
              v-slot="{ errors }"
              name="Nombre"
              rules="required"
            >
              <v-text-field
                outlined
                dense
                label="Nombre"
                v-model="datos.nombre"
                :error-messages="errors"
                counter
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Doc. representante"
              rules="required"
            >
              <v-text-field
                outlined
                dense
                label="Representante"
                v-model="datos.documento"
                :error-messages="errors"
                counter
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Celular"
              rules="required"
            >
              <v-text-field
                outlined
                dense
                label="Celular"
                v-model="datos.celular"
                :error-messages="errors"
                counter
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Correo"
              rules="required"
            >
              <v-text-field
                outlined
                dense
                label="Correo"
                v-model="datos.correo"
                :error-messages="errors"
                counter
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="País"
              rules="required"
            >
              <v-text-field
                outlined
                dense
                label="País"
                v-model="datos.pais"
                :error-messages="errors"
                counter
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Departamento"
              rules="required"
            >
              <v-text-field
                outlined
                dense
                label="Departamento"
                v-model="datos.departamento"
                :error-messages="errors"
                counter
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Ciudad"
              rules="required"
            >
              <v-text-field
                outlined
                dense
                label="Ciudad"
                v-model="datos.ciudad"
                :error-messages="errors"
                counter
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Dirección"
              rules="required"
            >
              <v-text-field
                outlined
                dense
                label="Dirección"
                v-model="datos.direccion"
                :error-messages="errors"
                counter
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Dirección"
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
            <v-divider />
            <v-alert dense>
              Ver documentos actuales 👉 <DocumentosEmpresa :nit="datos.nit" />
            </v-alert>
            <v-divider />
            <v-switch
              v-model="edicion"
              label="Editar documentos de la empresa"
              v-on:change="actualizacionDocumentos"
            />
            <validation-provider
              v-slot="{ errors }"
              name="Carta de intencion"
              rules="required"
            >
              <v-file-input
                label="Carta de intención"
                v-model="carta"
                small-chips
                outlined
                dense
                hint="Solo PDF"
                persistent-hint
                accept="application/pdf"
                append-icon="mdi-pdf-box"
                :error-messages="errors"
                :disabled="!edicion"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Documento representante"
              rules="required"
            >
              <v-file-input
                label="Documento de identidad del representante"
                v-model="documento"
                small-chips
                outlined
                dense
                hint="Solo PDF"
                persistent-hint
                accept="application/pdf"
                append-icon="mdi-pdf-box"
                :error-messages="errors"
                :disabled="!edicion"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Documento RUT"
              rules="required"
            >
              <v-file-input
                label="RUT"
                v-model="rut"
                small-chips
                outlined
                dense
                hint="Solo PDF"
                persistent-hint
                accept="application/pdf"
                append-icon="mdi-pdf-box"
                :error-messages="errors"
                :disabled="!edicion"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Documento Camara C..."
              rules="required"
            >
              <v-file-input
                label="Cámara  de comercio"
                v-model="camara"
                small-chips
                outlined
                dense
                hint="Solo PDF"
                persistent-hint
                append-icon="mdi-pdf-box"
                accept="application/pdf"
                :error-messages="errors"
                :disabled="!edicion"
              />
            </validation-provider>
            <v-alert color="indigo" dark dense>
              Subir documento de convenio 👇
            </v-alert>
            <validation-provider
              v-slot="{ errors }"
              name="Documento de convenio"
              rules="required"
            >
              <v-file-input
                prepend-icon="mdi-handshake"
                color="success"
                v-model="convenio"
                small-chips
                outlined
                dense
                hint="Solo PDF"
                persistent-hint
                append-icon="mdi-pdf-box"
                accept="application/pdf"
                label="Documento de convenio"
                :error-messages="errors"
              />
            </validation-provider>
            <v-alert class="text-center" dense dark color="secondary">
              Periodo de valides del convenio
            </v-alert>
            <CalendarioRango @fecha="fechas = $event" />
          </v-form>
        </v-card-text>
        <v-card-text>
          <v-btn
            block
            :disabled="invalid || carga"
            color="success"
            @click="aprobar"
            :loading="carga"
          >
            Aprobar
          </v-btn>
          <v-dialog v-model="carga" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Espere un momento
                <v-progress-linear indeterminate color="white" class="mb-0">
                </v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-text>
      </v-card>
      <v-btn color="red darken-4" dark @click="dialog = !dialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-dialog>
  </validation-observer>
</template>

<script>
import CalendarioRango from "../../general/CalendarioRango";
import DocumentosEmpresa from "./DocumentosEmpresa";
import {
  APROBAR_CONVENIO_EMPRESA,
  ELIMINAR_EMPRESA,
  REGISTRAR_ARCHIVO_CONVENIO,
  REGISTRO_ARCHIVO_EMPRESA,
} from "../../../services/recursos/empresaRS";
import Swal from "sweetalert2";
import { OBTENER_DATOS_USUARIO } from "../../../services/auth";
import { LISTAR_PROGRAMAS } from "../../../services/recursos/programaRS";
import { digits, email, max, min, required } from "vee-validate/dist/rules";
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
import moment from "moment";
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
  name: "DocumentoAprobatorioEmpresa",
  components: {
    ValidationObserver,
    ValidationProvider,
    CalendarioRango,
    DocumentosEmpresa,
  },
  data: () => ({
    dialog: false,
    fechas: [],
    programas: [],
    carta: {},
    documento: {},
    rut: {},
    camara: {},
    edicion: false,
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
    actualizacionDocumentos() {
      if (this.edicion) {
        this.carta = null;
        this.documento = null;
        this.rut = null;
        this.camara = null;
      } else {
        this.carta = {};
        this.documento = {};
        this.rut = {};
        this.camara = {};
      }
    },
    async aprobar() {
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
        const convenios = [];
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
          title: "¿Aprobar convenio con esta empresa?",
          text: `Soy conciente de que la informacion es correcta`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0f76b7",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, cumple con las validaciones!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.carga = true;
            if (this.edicion) {
              //-------------------- Validacion si el formato de los archivos-----------
              if (this.carta.type !== "application/pdf") {
                this.carga = false;
                return Swal.fire(
                  "La carta de intención errada",
                  "Solo seleccionar archivos PDF",
                  "error"
                );
              }
              if (this.documento.type !== "application/pdf") {
                this.carga = false;
                return Swal.fire(
                  "El documento del representante errado",
                  "Solo seleccionar archivos PDF",
                  "error"
                );
              }
              if (this.rut.type !== "application/pdf") {
                this.carga = false;
                return Swal.fire(
                  "El documento RUT errado",
                  "Solo seleccionar archivos PDF",
                  "error"
                );
              }
              if (this.camara.type !== "application/pdf") {
                this.carga = false;
                return Swal.fire(
                  "El documento de Cámara de comercio errado",
                  "Solo seleccionar archivos PDF",
                  "error"
                );
              }

              //--------------------- Subida de archivos ----------------

              await REGISTRO_ARCHIVO_EMPRESA(
                this.datos.nit,
                this.carta,
                "carta_intencion_" + this.datos.nit
              ).catch((error) =>
                Swal.fire(
                  "Error al subir la carta de intencion",
                  `${error},`,
                  "error"
                )
              );

              await REGISTRO_ARCHIVO_EMPRESA(
                this.datos.nit,
                this.documento,
                "documento_" + this.datos.nit
              ).catch((error) =>
                Swal.fire(
                  "Error al subir el documento del representante",
                  `${error},`,
                  "error"
                )
              );

              await REGISTRO_ARCHIVO_EMPRESA(
                this.datos.nit,
                this.rut,
                "rut_" + this.datos.nit
              ).catch((error) =>
                Swal.fire("Error al subir el RUT", `${error},`, "error")
              );

              await REGISTRO_ARCHIVO_EMPRESA(
                this.datos.nit,
                this.camara,
                "camara_comercio_" + this.datos.nit
              ).catch((error) =>
                Swal.fire(
                  "Error al subir la Camara de Comercio",
                  `${error},`,
                  "error"
                )
              );
            }
          }

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
          await REGISTRAR_ARCHIVO_CONVENIO(
            this.datos.nit,
            this.convenio,
            "convenio_" + this.datos.nit + "_" + new Date().toDateString()
          )
            .then((result) => {
              convenio.archivo = result.metadata.name;
            })
            .catch((error) =>
              Swal.fire("Error al subir el convenio", `${error},`, "error")
            );
          convenios.push(convenio);
          this.datos.convenios = convenios;
          this.datos.programas.forEach((programas) => {
            APROBAR_CONVENIO_EMPRESA(programas.id, this.datos);
          });
          const token = JSON.parse(localStorage.getItem("token"));
          await APROBAR_CONVENIO_EMPRESA(token.localId, this.datos);
          await ELIMINAR_EMPRESA(this.datos.nit);
          await this.$emit("aprobado", true);
          await Swal.fire(
            "Aprobada!",
            "Felicitaciones por el nuevo convenio 🤝",
            "success"
          );
          this.carga = false;
          this.dialog = !this.dialog;
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
  mounted() {
    this.listadoProgramas();
  },
};
</script>

<style scoped></style>
