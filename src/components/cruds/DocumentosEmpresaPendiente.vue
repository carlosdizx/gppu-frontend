<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="pink" dark v-bind="attrs" v-on="on" absolute top right>
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
              <v-text-field label="NIT" prepend-icon="mdi-domain" counter />
              <v-text-field
                label="Telefono o celular"
                prepend-icon="mdi-phone"
                type="number"
                counter
              />
              <v-text-field
                label="Correo electronico"
                prepend-icon="mdi-email"
                type="email"
                counter
              />
            </v-form>
          </v-container>
          <small>** Medidas legales van aqui, texto que da miedo</small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" dark @click="dialog = !dialog">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DocumentosEmpresaPendiente",
  data: () => ({
    dialog: false,
  }),
};
</script>

<style scoped></style>
