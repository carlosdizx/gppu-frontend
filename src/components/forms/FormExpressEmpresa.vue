<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
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
                <validation-provider
                  v-slot="{ errors }"
                  name="Nit empresa"
                  rules="required|min:5|max:80"
                >
                  <v-text-field
                    v-model="nit"
                    label="NIT"
                    prepend-icon="mdi-domain"
                    :error-messages="errors"
                    counter
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Nombre empresa"
                  rules="required|min:2|max:100"
                >
                  <v-text-field
                    v-model="nombre"
                    label="Nombre"
                    prepend-icon="mdi-domain"
                    :error-messages="errors"
                    counter
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Celular"
                  rules="required|min:5|max:25"
                >
                  <v-text-field
                    v-model="telefono"
                    label="Teléfono  o celular"
                    prepend-icon="mdi-phone"
                    type="number"
                    :error-messages="errors"
                    counter
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Correo"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="correo"
                    label="Correo electrónico"
                    prepend-icon="mdi-email"
                    type="email"
                    :error-messages="errors"
                    counter
                  />
                </validation-provider>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-text>
            <template>
              <v-container fluid>
                <v-checkbox v-model="checkbox">
                  <template v-slot:label>
                    <div>
                      Aceptar nuestras políticas y condiciones sobre el
                      tratamiento de datos, Estamos comprometidos con la
                      protección de los mismos para consultarlos cuando sea
                      requerido
                    </div>
                  </template>
                </v-checkbox>
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
              :disabled="invalid || !checkbox"
              @click="registrarExpress"
            >
              Registrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </validation-observer>
</template>

<script>
import { REGISTRO_DATOS_EXPRESS_EMPRESA } from "@/services/recursos/empresaRS";
import { digits, email, max, min, required } from "vee-validate/dist/rules";
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
import Swal from "sweetalert2";
import router from "@/router";
import { LISTAR_PROGRAMAS } from "@/services/recursos/programaRS";

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
  name: "FormExpressEmpresa",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    dialog: false,
    nit: "",
    nombre: "",
    telefono: null,
    correo: "",
    checkbox: false,
    programas: [],
  }),
  methods: {
    async registrarExpress() {
      const datos = {
        nit: this.nit,
        nombre: this.nombre,
        telefono: this.telefono,
        correo: this.correo,
      };
      await this.programas.forEach((programa) => {
        REGISTRO_DATOS_EXPRESS_EMPRESA(programa.id, datos);
      });
      await Swal.fire(
        "Datos registrados exitosamente",
        "En un plazo de 2 (dos) días hábiles recibirá información " +
          "por llamada o correo respecto al proceso de convenio empresa universidad.",
        "success"
      );
      await router.push("/about");
    },
    async listadoProgramas() {
      await LISTAR_PROGRAMAS().then(
        (resultado) => (this.programas = Object.values(resultado.data))
      );
    },
  },
  async mounted() {
    await this.listadoProgramas();
  },
};
</script>

<style scoped></style>
