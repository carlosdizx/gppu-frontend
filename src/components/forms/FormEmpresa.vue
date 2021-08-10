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
          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
          label="Archivo del documento del representante"
          v-model="archivoDocumento"
        />
        <v-file-input
          color="indigo"
          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
          label="RUT"
          v-model="archivoRut"
        />
        <v-file-input
          color="indigo"
          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
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
    ...mapActions([
      "registrarDatosEmpresaPendiente",
      "registrarArchivosEmpresaPendiente",
    ]),
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

      await this.registrarArchivosEmpresaPendiente(this.archivoDocumento)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
      await this.registrarArchivosEmpresaPendiente(this.archivoRut)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
      if (this.archivoCamara !== null) {
        await this.registrarArchivosEmpresaPendiente(this.archivoCamara)
          .then((result) => console.log(result))
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped></style>
