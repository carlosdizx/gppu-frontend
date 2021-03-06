<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-card max-width="800" class="mx-auto my-auto">
      <v-card-text>
        <h2>Formulario empresa</h2>
        <small> Para empresas que deseen formalizar un convenio. </small>
      </v-card-text>
      <FormExpressEmpresa />
      <v-card-text>
        Haga clic en el icono
        <v-chip color="pink" text-color="white">
          <v-icon>mdi-email-edit-outline</v-icon>
        </v-chip>
        para obtener más información de las prácticas o si tienes alguna duda o
        inquietud para que la resolvamos por ti.
      </v-card-text>
      <v-card-text>
        <v-form autocomplete="off" :disabled="carga">
          <validation-provider
            v-slot="{ errors }"
            name="Nit"
            rules="required|min:5|max:25"
          >
            <v-text-field
              v-model="nit"
              label="NIT"
              prepend-icon="mdi-domain"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Nombre"
            rules="required"
          >
            <v-text-field
              v-model="nombre"
              label="Nombre de la empresa"
              prepend-icon="mdi-rename-box"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Número de documento del representante"
            rules="required|min:5|max:25"
          >
            <v-text-field
              v-model="documento"
              label="Número de documento del representante"
              prepend-icon="mdi-card-account-details"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Celular"
            rules="required|min:5|max:25"
          >
            <v-text-field
              v-model="celular"
              label="Número de celular"
              type="number"
              prepend-icon="mdi-phone"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Correo"
            rules="required|email"
          >
            <v-text-field
              v-model="correo"
              label="Correo electrónico"
              prepend-icon="mdi-email"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Pais"
            rules="required|min:5|max:60"
          >
            <v-text-field
              v-model="pais"
              label="País"
              prepend-icon="mdi-earth"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Departamento"
            rules="required|min:5|max:60"
          >
            <v-text-field
              v-model="departamento"
              label="Departamento/estado/provincia"
              prepend-icon="mdi-sign-real-estate"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Ciudad"
            rules="required|min:5|max:60"
          >
            <v-text-field
              v-model="ciudad"
              label="Ciudad"
              prepend-icon="mdi-city"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Direccion"
            rules="required|min:5|max:50"
          >
            <v-text-field
              v-model="direccion"
              label="Dirección"
              prepend-icon="mdi-home"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Programas académicos"
            rules="required"
          >
            <v-combobox
              multiple
              v-model="programasSeleccionados"
              :items="programas"
              item-text="nombre"
              :error-messages="errors"
              label="Programa académico de interés"
              hide-selected
              small-chips
              dense
              outlined
            >
            </v-combobox>
          </validation-provider>
          <v-alert dense color="secondary" dark>
            Tenga preparado los siguientes archivos solicitados en formato PDF.
          </v-alert>
          <v-alert dense color="blue-grey" dark>
            <v-btn
              v-show="!archivoCarta"
              color="blue darken-4"
              dark
              fab
              small
              :href="formatoCarta"
              target="_blank"
            >
              <v-icon>mdi-file-document-edit</v-icon>
            </v-btn>
            <strong> 👈 Formato de carta de intención</strong>
          </v-alert>
          <validation-provider
            v-slot="{ errors }"
            name="Carta de intencion"
            rules="required"
          >
            <v-file-input
              accept="application/pdf"
              label="Carta de intención"
              v-model="archivoCarta"
              append-icon="mdi-pdf-box"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Documento representante"
            rules="required"
          >
            <v-file-input
              accept="application/pdf"
              label="Documento de identidad del representante"
              v-model="archivoDocumento"
              append-icon="mdi-pdf-box"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Documento RUT"
            rules="required"
          >
            <v-file-input
              accept="application/pdf"
              label="RUT"
              v-model="archivoRut"
              append-icon="mdi-pdf-box"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Documento Camara C..."
            rules="required"
          >
            <v-file-input
              accept="application/pdf"
              label="Cámara  de comercio"
              v-model="archivoCamara"
              append-icon="mdi-pdf-box"
              :error-messages="errors"
            />
          </validation-provider>
        </v-form>
      </v-card-text>
      <v-card-text>
        <template>
          <v-container fluid>
            <v-checkbox v-model="checkbox">
              <template v-slot:label>
                <div>
                  Acepta las políticas y condiciones sobre el tratamiento de
                  datos
                  <br />
                  <small>
                    **Estamos comprometidos con la protección de los mismos para
                    consultarlos cuando sea requerido**
                  </small>
                </div>
              </template>
            </v-checkbox>
            <DocumentoPoliticas />
          </v-container>
        </template>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-alert block dense color="pink lighten-4" v-show="invalid">
            Complete todos los campos*
          </v-alert>
          <div class="text-center">
            <v-btn
              :disabled="invalid || carga || !checkbox"
              :loading="carga"
              class="white--text"
              color="success darken-2"
              @click="registrar"
              block
            >
              Registrar
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
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </validation-observer>
</template>

<script>
import FormExpressEmpresa from "@/components/forms/FormExpressEmpresa";
import DocumentoPoliticas from "@/components/forms/DocumentoPoliticas";
import {
  REGISTRO_DATOS_EMPRESA,
  EMPRESA_PENDIENTE_YA_REGISTRADA,
  REGISTRO_ARCHIVO_EMPRESA,
  EMPRESA_APROBADA_YA_REGISTRADA,
} from "@/services/recursos/empresaRS";
import { LISTAR_PROGRAMAS } from "@/services/recursos/programaRS";
import Swal from "sweetalert2";
import { digits, email, max, min, required } from "vee-validate/dist/rules";
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
import router from "@/router";

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
  name: "FormEmpresa",
  components: {
    ValidationObserver,
    ValidationProvider,
    FormExpressEmpresa,
    DocumentoPoliticas,
  },
  data: () => ({
    nit: "",
    nombre: "",
    documento: "",
    celular: "",
    correo: "",
    pais: "",
    departamento: "",
    ciudad: "",
    direccion: "",
    archivoDocumento: null,
    archivoRut: null,
    archivoCamara: null,
    archivoCarta: null,
    carga: false,
    formatoCarta:
      "https://firebasestorage.googleapis.com/v0/b/gceu-gestion.appspot.com/o/" +
      "universidad_mariana%2Fdocumentos%2FFormato%20carta%20de%20intencion.docx" +
      "?alt=media&token=2fc78d1b-5661-4781-90e7-0c356a67d9b0",
    dialog: false,
    checkbox: false,
    programas: [],
    programasSeleccionados: null,
  }),
  methods: {
    async registrar() {
      if (this.archivoCarta.type !== "application/pdf") {
        return Swal.fire(
          "La carta de intención errada",
          "Solo seleccionar archivos PDF",
          "error"
        );
      }
      if (this.archivoDocumento.type !== "application/pdf") {
        return Swal.fire(
          "El documento del representante errado",
          "Solo seleccionar archivos PDF",
          "error"
        );
      }
      if (this.archivoRut.type !== "application/pdf") {
        return Swal.fire(
          "El documento RUT errado",
          "Solo seleccionar archivos PDF",
          "error"
        );
      }
      if (this.archivoCamara.type !== "application/pdf") {
        return Swal.fire(
          "El documento de Cámara de comercio errado",
          "Solo seleccionar archivos PDF",
          "error"
        );
      }
      if (this.programasSeleccionados) {
        let invalido = false;
        const invalidos = [];
        this.programasSeleccionados.forEach((programa) => {
          if (!programa.id) {
            invalido = true;
            invalidos.push(programa);
          }
        });
        if (invalido) {
          return Swal.fire(
            "Programas academicos incorrectos",
            "Vuelva a seleccionar los programas academicos, no digite el nombre completo",
            "error"
          );
        }
      }
      const datos = {
        nit: this.nit,
        nombre: this.nombre,
        documento: this.documento,
        celular: this.celular,
        correo: this.correo,
        pais: this.pais,
        departamento: this.departamento,
        ciudad: this.ciudad,
        direccion: this.direccion,
        programas: this.programasSeleccionados,
      };
      let pass = false;
      await EMPRESA_PENDIENTE_YA_REGISTRADA(datos.nit).then((resultado) => {
        if (resultado.data) {
          return (pass = true);
        }
      });

      await EMPRESA_APROBADA_YA_REGISTRADA(datos.nit).then((resultado) => {
        if (resultado.data) {
          return (pass = true);
        }
      });

      if (!pass) {
        this.carga = true;
        await REGISTRO_DATOS_EMPRESA(datos);

        await REGISTRO_ARCHIVO_EMPRESA(
          datos.nit,
          this.archivoDocumento,
          "documento_" + datos.nit
        ).catch((error) =>
          Swal.fire(
            "Error al subir el documento del representante",
            `${error},`,
            "error"
          )
        );

        await REGISTRO_ARCHIVO_EMPRESA(
          datos.nit,
          this.archivoRut,
          "rut_" + datos.nit
        ).catch((error) =>
          Swal.fire("Error al subir el RUT", `${error},`, "error")
        );

        await REGISTRO_ARCHIVO_EMPRESA(
          datos.nit,
          this.archivoCamara,
          "camara_comercio_" + datos.nit
        ).catch((error) =>
          Swal.fire(
            "Error al subir la Camara de Comercio",
            `${error},`,
            "error"
          )
        );

        await REGISTRO_ARCHIVO_EMPRESA(
          datos.nit,
          this.archivoCarta,
          "carta_intencion_" + datos.nit
        ).catch((error) =>
          Swal.fire(
            "Error al subir la carta de intencion",
            `${error},`,
            "error"
          )
        );

        this.carga = false;
        await Swal.fire(
          "Registro exitoso",
          "Sus datos y documentos fueron subidos en plataforma.<br>" +
            "En los próximos 2(dos) días hábiles puede recibir una llamada de el/la<br>" +
            "coordinador@ de prácticas para continuar con su proceso de vinculación.",
          "success"
        );
        this.carga = false;
        await router.push("/about");
      } else {
        await Swal.fire(
          "Empresa ya registrada",
          "La empresa ya se encuentra registrada en plataforma",
          "warning"
        );
      }
    },
    async listadoProgramas() {
      await LISTAR_PROGRAMAS().then(
        (resultado) => (this.programas = Object.values(resultado.data))
      );
    },
  },
  async mounted() {
    await this.listadoProgramas();
  },
};
</script>

<style scoped></style>
