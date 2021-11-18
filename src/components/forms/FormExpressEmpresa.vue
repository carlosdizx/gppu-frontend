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
              <v-text-field
                v-model="nit"
                label="NIT"
                prepend-icon="mdi-domain"
                :error-messages="errors"
                counter
              />
              <v-text-field
                v-model="nombre"
                label="Nombre"
                prepend-icon="mdi-domain"
                :error-messages="errors"
                counter
              />
              <v-text-field
                v-model="telefono"
                label="Teléfono  o celular"
                prepend-icon="mdi-phone"
                type="number"
                :error-messages="errors"
                counter
              />
              <v-text-field
                v-model="correo"
                label="Correo electrónico"
                prepend-icon="mdi-email"
                type="email"
                :error-messages="errors"
                counter
              />
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-text>
          <template>
            <v-container fluid>
              <v-checkbox v-model="checkbox">
                <template v-slot:label>
                  <div>
                    Acepta las políticas y condiciones sobre el tratamiento de
                    datos
                    <br />
                    <small>
                      **Estamos comprometidos con la protección de los mismos
                      para consultarlos cuando sea requerido**
                    </small>
                  </div>
                </template>
              </v-checkbox>
              <DocumentoPoliticas />
            </v-container>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" dark @click="dialog = !dialog">
            Cerrar
          </v-btn>
          <v-btn
            color="info darken-1"
            :disabled="!checkbox"
            @click="registrarExpress"
          >
            Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import DocumentoPoliticas from "./DocumentoPoliticas";
import { REGISTRO_DATOS_EXPRESS_EMPRESA } from "@/services/recursos/empresa";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "FormExpressEmpresa",
  components: {
    DocumentoPoliticas,
  },
  data: () => ({
    dialog: false,
    nit: "",
    nombre: "",
    telefono: null,
    correo: "",
    checkbox: false,
  }),
  methods: {
    async registrarExpress() {
      if (
        this.nit === "" ||
        this.nombre === "" ||
        this.telefono.toString() === "" ||
        this.correo === ""
      ) {
        return Swal.fire(
          "Datos erróneos",
          "Datos incorrectos o están vacíos",
          "error"
        );
      }
      const datos = {
        nit: this.nit,
        nombre: this.nombre,
        telefono: this.telefono,
        correo: this.correo,
      };
      await REGISTRO_DATOS_EXPRESS_EMPRESA(datos);
      await Swal.fire(
        "Datos registrados exitosamente",
        "En un plazo de 2 (dos) días hábiles recibirá información " +
          "por llamada o correo respecto al proceso de convenio empresa universidad.",
        "success"
      );
      await router.push("/about");
    },
  },
};
</script>

<style scoped></style>
