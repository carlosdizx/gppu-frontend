<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="pink"
          dark
          v-bind="attrs"
          v-on="on"
          absolute
          top
          right
          fab
        >
          <v-icon>mdi-email-edit-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Formulario express para empresas</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form autocomplete="off">
              <v-text-field label="Nombre de la empresa" />
              <v-text-field label="Telefono o celular" />
              <v-text-field label="Correo electronico" />
            </v-form>
          </v-container>
          <small>** Texto que da miedo</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = !dialog">
            Cerrar
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = !dialog">
            Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "FormExpressEmpresa",
  data: () => ({
    dialog: false,
  }),
};
</script>

<style scoped></style>
