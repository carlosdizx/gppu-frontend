<template>
  <v-card max-width="800" class="mx-auto my-auto">
    <v-card-title>Formulario empresa</v-card-title>
    <v-card-subtitle>
      Tenga preparado los documentos y datos necesarios
    </v-card-subtitle>
    <v-card-text>
      <v-form autocomplete="off">
        <v-text-field
          v-model="nit"
          color="indigo"
          label="NIT"
          prepend-icon="mdi-domain"
        />
        <v-text-field
          v-model="nombre"
          color="indigo"
          label="Nombre"
          prepend-icon="mdi-rename-box"
        />
        <v-text-field
          v-model="documento"
          color="indigo"
          label="Numero de documento del representante"
          prepend-icon="mdi-card-account-details"
        />
        <v-file-input
          color="indigo"
          accept="application/pdf"
          label="Archivo del documento del representante"
          v-model="archivoDocumento"
        />
        <v-file-input
          color="indigo"
          accept="application/pdf"
          label="RUT"
          v-model="archivoRut"
        />
        <v-file-input
          color="indigo"
          accept="application/pdf"
          label="Camara de comercio (opcional)"
          v-model="archivoCamara"
        />
        <v-text-field
          v-model="celular"
          color="indigo"
          label="Numero de celular"
          type="number"
          prepend-icon="mdi-card-account-details"
        />
        <v-text-field
          v-model="correo"
          color="indigo"
          label="Correo electronico"
          prepend-icon="mdi-email"
        />
        <v-divider />
        <v-text-field
          v-model="pais"
          color="indigo"
          label="Pais"
          prepend-icon="mdi-earth"
        />
        <v-text-field
          v-model="departamento"
          color="indigo"
          label="Departamento/estado/provincia"
          prepend-icon="mdi-sign-real-estate"
        />
        <v-text-field
          v-model="ciudad"
          color="indigo"
          label="Ciudad"
          prepend-icon="mdi-city"
        />
        <v-text-field
          v-model="codigo"
          type="number"
          color="indigo"
          label="Codigo postal"
          prepend-icon="mdi-postage-stamp"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="registrar" color="success" block dark>Registrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { STORAGE } from "@/main";
import { mapActions } from "vuex";
import { REGISTRO_ARCHIVOS_EMPRESA_PENDIENTE } from "@/services/recursos";
import Swal from "sweetalert2";
const ref = STORAGE.ref();
export default {
  name: "FormEmpresa",
  data: () => ({
    nit: "87570236",
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

      if (this.archivoCamara !== null) {
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
      }
      await Swal.fire({
        title: "Registro exitoso",
        icon: "success",
        timer: 2500,
      });
    },
  },
};
</script>

<style scoped></style>
