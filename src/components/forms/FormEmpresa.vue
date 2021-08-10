<template>
  <v-card max-width="800" class="mx-auto my-auto">
    <v-card-title>Formulario empresa</v-card-title>
    <v-card-subtitle>
      Tenga preparado los documentos y datos necesarios
    </v-card-subtitle>
    <v-card-text>
      <v-form autocomplete="off">
        <v-text-field color="indigo" label="NIT" prepend-icon="mdi-domain" />
        <v-text-field
          color="indigo"
          label="Nombre"
          prepend-icon="mdi-rename-box"
        />
        <v-text-field
          color="indigo"
          label="Numero de documento del representante"
          prepend-icon="mdi-card-account-details"
        />
        <v-file-input
          color="indigo"
          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
          label="Archivo del documento del representante"
        />
        <v-file-input
          color="indigo"
          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
          label="RUT"
        />
        <v-file-input
          color="indigo"
          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
          label="Camara de comercio (opcional)"
        />
        <v-text-field
          color="indigo"
          label="Numero de celular"
          type="number"
          prepend-icon="mdi-card-account-details"
        />
        <v-text-field
          color="indigo"
          label="Correo electronico"
          prepend-icon="mdi-email"
        />
        <v-divider />
        <v-text-field color="indigo" label="Pais" prepend-icon="mdi-earth" />
        <v-text-field
          color="indigo"
          label="Departamento/estado/provincia"
          prepend-icon="mdi-sign-real-estate"
        />
        <v-text-field color="indigo" label="Ciudad" prepend-icon="mdi-city" />
        <v-text-field
          type="number"
          color="indigo"
          label="Codigo postal"
          prepend-icon="mdi-postage-stamp"
        />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "FormEmpresa",
};
</script>

<style scoped></style>
