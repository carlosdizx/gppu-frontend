<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-card max-width="800" class="mx-auto my-auto">
      <v-card-title>Formulario empresa</v-card-title>
      <v-card-subtitle>
        Tenga preparado los documentos y datos necesarios
      </v-card-subtitle>
      <v-card-text>
        <v-form autocomplete="off">
          <validation-provider
            v-slot="{ errors }"
            name="Nit"
            rules="required|min:5|max:25"
          >
            <v-text-field
              v-model="nit"
              color="indigo"
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
              color="indigo"
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
              color="indigo"
              label="Numero de documento del representante"
              prepend-icon="mdi-card-account-details"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Documento representante"
            rules="required"
          >
            <v-file-input
              color="indigo"
              accept="application/pdf"
              label="Archivo del documento del representante"
              v-model="archivoDocumento"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Documento RUT"
            rules="required"
          >
            <v-file-input
              color="indigo"
              accept="application/pdf"
              label="RUT"
              v-model="archivoRut"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Documento Camara C..."
            rules="required"
          >
            <v-file-input
              color="indigo"
              accept="application/pdf"
              label="Camara de comercio"
              v-model="archivoCamara"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Celular"
            rules="required|min:5|max:25"
          >
            <v-text-field
              v-model="celular"
              color="indigo"
              label="Numero de celular"
              type="number"
              prepend-icon="mdi-card-account-details"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Celular"
            rules="required|email"
          >
            <v-text-field
              v-model="correo"
              color="indigo"
              label="Correo electronico"
              prepend-icon="mdi-email"
              :error-messages="errors"
            />
          </validation-provider>
          <v-divider />
          <v-divider />
          <validation-provider
            v-slot="{ errors }"
            name="Pais"
            rules="required|min:5|max:60"
          >
            <v-text-field
              v-model="pais"
              color="indigo"
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
              color="indigo"
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
              color="indigo"
              label="Ciudad"
              prepend-icon="mdi-city"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Codigo postal"
            rules="required|min:5|max:20"
          >
            <v-text-field
              v-model="codigo"
              type="number"
              color="indigo"
              label="Codigo postal"
              prepend-icon="mdi-postage-stamp"
              :error-messages="errors"
              counter
            />
          </validation-provider>
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-alert block dense dark color="red" v-show="invalid">
            Complete todos los campos
          </v-alert>
          <v-btn @click="registrar" color="success" block :disabled="invalid">
            Registrar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </validation-observer>
</template>

<script>
import { STORAGE } from "@/main";
import { mapActions } from "vuex";
import { REGISTRO_ARCHIVOS_EMPRESA_PENDIENTE } from "@/services/recursos";
import Swal from "sweetalert2";
import { digits, email, max, min, required } from "vee-validate/dist/rules";
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
const ref = STORAGE.ref();

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
    codigo: 520002,
    archivoDocumento: null,
    archivoRut: null,
    archivoCamara: null,
  }),
  methods: {
    ...mapActions(["registrarDatosEmpresaPendiente", ""]),
    async registrar() {
      const datos = {
        nit: this.nit,
        nombre: this.nombre,
        documento: this.documento,
        celular: this.celular,
        correo: this.correo,
        pais: this.pais,
        departamento: this.departamento,
        ciudad: this.ciudad,
        codigo: this.codigo,
      };
      await this.registrarDatosEmpresaPendiente(datos)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));

      await REGISTRO_ARCHIVOS_EMPRESA_PENDIENTE(
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

      await REGISTRO_ARCHIVOS_EMPRESA_PENDIENTE(
        datos.nit,
        this.archivoRut,
        "rut_" + datos.nit
      )
        .then((result) => console.log(result))
        .catch((error) =>
          Swal.fire("Error al subir el RUT", `${error},`, "error")
        );

      await REGISTRO_ARCHIVOS_EMPRESA_PENDIENTE(
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
      await Swal.fire(
        "Registro exitoso",
        "Sus datos y documentos fueron subidos en plataforma <br>" +
          "En las proximas 48 horas puede recibir una llamada de el/la" +
          " coordinador@ de practicas para continuar con su proceso de vinculacion",
        "success"
      );
    },
  },
};
</script>

<style scoped></style>
