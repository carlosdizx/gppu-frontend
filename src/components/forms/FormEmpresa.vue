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
      <v-btn color="success" block dark>Registrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { STORAGE } from "@/main";
const ref = STORAGE.ref();
export default {
  name: "FormEmpresa",
  data: () => ({
    nit: "",
    nombre: "",
    documento: "",
    celular: null,
    correo: "",
    pais: "",
    departamento: "",
    ciudad: "",
    codigo: null,
    archivoDocumento: null,
    archivoRut: null,
    archivoCamara: null,
  }),
  methods: {
    subirArchivos() {
      const refDocs = ref.child("documentos/" + this.archivoDocumento.name);
      const metadata = {
        contentType:
          "image/jpeg,image/gif,image/png,application/pdf,image/x-eps",
      };
      refDocs
        .put(this.archivoDocumento, metadata)
        .then((result) => console.log(result));
    },
  },
};
</script>

<style scoped></style>
