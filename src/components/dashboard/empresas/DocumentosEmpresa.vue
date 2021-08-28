<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange darken-2" text v-bind="attrs" v-on="on">
          {{ nit }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Empresa {{ nit }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form>
              <v-btn
                block
                color="indigo"
                dark
                class="my-2"
                :href="carta"
                target="_blank"
              >
                <v-icon>mdi-file-export</v-icon>Carta
              </v-btn>

              <v-btn
                block
                color="indigo"
                dark
                class="my-2"
                :href="documento"
                target="_blank"
              >
                <v-icon>mdi-file-export</v-icon>Representante
              </v-btn>

              <v-btn
                block
                color="indigo"
                dark
                class="my-2"
                :href="rut"
                target="_blank"
              >
                <v-icon>mdi-file-export</v-icon>Rut
              </v-btn>

              <v-btn
                block
                color="indigo"
                dark
                class="my-2"
                :href="camara"
                target="_blank"
              >
                <v-icon>mdi-file-export</v-icon>Camara de comercio
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-4" dark @click="dialog = !dialog">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { LISTAR_ARCHIVOS_EMPRESA } from "../../../services/recursos/empresaRS";

export default {
  name: "DocumentosEmpresa",
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
