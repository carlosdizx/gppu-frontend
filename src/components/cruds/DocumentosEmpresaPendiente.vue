<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          {{ nit }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Documentos de empresa {{ nit }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form>
              <v-row>
                <v-col cols="2">
                  <v-btn
                    color="indigo"
                    dark
                    class="my-2"
                    fab
                    :href="carta"
                    target="_blank"
                  >
                    <v-icon>mdi-file</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="8">
                  <v-text-field text v-text="'Carta de intencion'" disabled />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="2">
                  <v-btn
                    color="indigo"
                    dark
                    class="my-2"
                    fab
                    :href="documento"
                    target="_blank"
                  >
                    <v-icon>mdi-file</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    text
                    v-text="'Documento del representante'"
                    disabled
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="2">
                  <v-btn
                    color="indigo"
                    dark
                    class="my-2"
                    fab
                    :href="rut"
                    target="_blank"
                  >
                    <v-icon>mdi-file</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="8">
                  <v-text-field text v-text="'Rut'" disabled />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="2">
                  <v-btn
                    color="indigo"
                    dark
                    class="my-2"
                    fab
                    :href="camara"
                    target="_blank"
                  >
                    <v-icon>mdi-file</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="8">
                  <v-text-field text v-text="'Camara de comercio'" disabled />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-1" dark @click="dialog = !dialog">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { LISTAR_ARCHIVOS_EMPRESA } from "../../services/recursos";

export default {
  name: "DocumentosEmpresaPendiente",
  data: () => ({
    dialog: false,
    carta: "",
    documento: "",
    rut: "",
    camara: "",
  }),
  props: {
    nit: String,
  },
  async mounted() {
    await LISTAR_ARCHIVOS_EMPRESA(this.nit, "carta_intencion").then(
      (result) => {
        this.carta = result;
      }
    );
    await LISTAR_ARCHIVOS_EMPRESA(this.nit, "documento").then((result) => {
      this.documento = result;
    });
    await LISTAR_ARCHIVOS_EMPRESA(this.nit, "rut").then((result) => {
      this.rut = result;
    });
    await LISTAR_ARCHIVOS_EMPRESA(this.nit, "camara_comercio").then(
      (result) => {
        this.camara = result;
      }
    );
  },
};
</script>

<style scoped></style>
