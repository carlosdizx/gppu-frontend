<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-card max-width="800" class="mx-auto my-auto">
      <v-card-title>Formulario empresa</v-card-title>
      <FormExpressEmpresa />
      <v-card-subtitle>
        Si necesita consultar más información antes de subir sus datos e
        información envíanos un email, haga clic, en el icono rosa de la derecha
        de arriba.
      </v-card-subtitle>
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
            name="Numero de documento"
            rules="required|min:5|max:25"
          >
            <v-text-field
              v-model="documento"
              label="Numero de documento del representante"
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
              label="Numero de celular"
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
              label="Correo electronico"
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
              label="Pais"
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
              label="Direccion"
              prepend-icon="mdi-home"
              :error-messages="errors"
              counter
            />
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
              label="Carta de intencion"
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
              label="Archivo del documento del representante"
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
              label="Camara de comercio"
              v-model="archivoCamara"
              append-icon="mdi-pdf-box"
              :error-messages="errors"
            />
          </validation-provider>
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-alert block dense dark color="red" v-show="invalid">
            Complete todos los campos
          </v-alert>
          <div class="text-center">
            <v-btn
              :disabled="invalid || carga"
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
import { mapActions } from "vuex";
import {
  EMPRESA_YA_REGISTRADA,
  REGISTRO_ARCHIVO_EMPRESA,
} from "@/services/recursos/empresaRS";
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
  },
  data: () => ({
    nit: "87570236-50",
    nombre: "Arena Center",
    documento: "1082749257",
    celular: 3163930876,
    correo: "carlodiaz@arenacenter.com",
    pais: "Colombia",
    departamento: "Nariño",
    ciudad: "Pasto",
    direccion: "Cl 18 # 35 - 06, Palermo",
    archivoDocumento: null,
    archivoRut: null,
    archivoCamara: null,
    archivoCarta: null,
    carga: false,
    formatoCarta:
      "https://firebasestorage.googleapis.com" +
      "/v0/b/gppu-backend.appspot.com/o/" +
      "uarena%2Fdocumentos%2FFormato%20carta%20de%20intencion.docx" +
      "?alt=media&token=2d0ff50a-a86f-4255-a178-66d362d11fc1",
    dialog: false,
  }),
  methods: {
    ...mapActions(["registrarDatosEmpresa", ""]),
    async registrar() {
      if (this.archivoDocumento.type !== "application/pdf") {
        return Swal.fire(
          "El documento del representante errado",
          "Solo seleccionar archivos pdf",
          "error"
        );
      }
      if (this.archivoRut.type !== "application/pdf") {
        return Swal.fire(
          "El documento RUT errado",
          "Solo seleccionar archivos pdf",
          "error"
        );
      }
      if (this.archivoCamara.type !== "application/pdf") {
        return Swal.fire(
          "El documento de Camara de comercio errado",
          "Solo seleccionar archivos pdf",
          "error"
        );
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
      };
      let pass = await EMPRESA_YA_REGISTRADA(datos.nit);

      if (!pass) {
        this.carga = true;
        await this.registrarDatosEmpresa(datos)
          .then((result) => console.log(result))
          .catch((error) => console.log(error));

        await REGISTRO_ARCHIVO_EMPRESA(
          datos.nit,
          this.archivoDocumento,
          "documento_" + datos.nit
        )
          .then((result) => console.log(result))
          .catch((error) =>
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
        )
          .then((result) => console.log(result))
          .catch((error) =>
            Swal.fire("Error al subir el RUT", `${error},`, "error")
          );

        await REGISTRO_ARCHIVO_EMPRESA(
          datos.nit,
          this.archivoCamara,
          "camara_comercio_" + datos.nit
        )
          .then((result) => console.log(result))
          .catch((error) =>
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
        )
          .then((result) => console.log(result))
          .catch((error) =>
            Swal.fire(
              "Error al subir la carta de intencion",
              `${error},`,
              "error"
            )
          );
        this.carga = false;
        await Swal.fire(
          "Registro exitoso",
          "Sus datos y documentos fueron subidos en plataforma <br>" +
            "En los proximos 2(dos) dias habiles puede recibir una llamada de el/la" +
            " coordinador@ de practicas para continuar con su proceso de vinculacion",
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
  },
};
</script>

<style scoped></style>
