<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-card max-width="800" class="mx-auto my-auto">
      <v-card-title>Formulario docentes</v-card-title>
      <v-card-text>
        <small>
          Para docentes que desean realizar movilidad o practica en el exterior
        </small>
      </v-card-text>
      <v-card-subtitle>
        Complete los datos que le sean requeridos
      </v-card-subtitle>
      <v-card-text>
        <v-form autocomplete="off" :disabled="carga">
          <validation-provider
            v-slot="{ errors }"
            name="Programa académico"
            rules="required"
          >
            <v-combobox
              v-model="programa"
              :items="programas"
              item-text="nombre"
              label="Programa académico"
              :error-messages="errors"
              hide-selected
              small-chips
              dense
              outlined
              v-on:change="listadoHabilidades"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Nombres"
            rules="required"
          >
            <v-text-field
              v-model="nombres"
              label="Nombres completos"
              prepend-icon="mdi-account"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Apellidos"
            rules="required"
          >
            <v-text-field
              v-model="apellidos"
              label="Apellidos completos"
              prepend-icon="mdi-account"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <v-row>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Tipo doc..."
                rules="required"
              >
                <v-select
                  v-model="tipoDoc"
                  label="Tipo de documento"
                  :items="[
                    'Cedula de ciudadania',
                    'Tarjeta de identidad',
                    'Otro',
                  ]"
                  prepend-icon="mdi-format-list-bulleted-type"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Documento"
                rules="required|min:5|max:30"
              >
                <v-text-field
                  v-model="documento"
                  append-icon="mdi-card-account-details"
                  label="Número de documento"
                  :error-messages="errors"
                  counter
                />
              </validation-provider>
            </v-col>
          </v-row>
          <validation-provider
            v-slot="{ errors }"
            name="Opciones de habilidades"
            rules="required"
          >
            <v-combobox
              v-model="habilidadeSeleccionadas"
              :items="habilidades"
              item-text="nombre"
              label="Habilidades"
              hint="Puede proponer"
              :error-messages="errors"
              hide-selected
              small-chips
              dense
              outlined
              multiple
            />
          </validation-provider>
          <v-row>
            <Calendario
              texto="Fecha de expedición"
              @fecha="fechaExp = $event"
            />
            <Calendario
              texto="Fecha de nacimiento"
              @fecha="fechaNaci = $event"
            />
          </v-row>
        </v-form>
      </v-card-text>

      <template>
        <v-container fluid>
          <v-checkbox v-model="checkbox">
            <template v-slot:label>
              <div>
                Acepta las políticas y condiciones sobre el tratamiento de datos
                <br />
                <small>
                  **Estamos comprometidos con la protección de los mismos para
                  consultarlos cuando sea requerido**
                </small>
              </div>
            </template>
          </v-checkbox>
          <DocumentoPoliticas />
        </v-container>
      </template>

      <v-card-text>
        <v-form>
          <v-alert block dense color="pink lighten-4" v-show="invalid">
            Complete los campos requeridos*
          </v-alert>
          <div class="text-center">
            <v-btn
              :disabled="carga || invalid || !checkbox"
              :loading="carga"
              class="white--text"
              color="success darken-2"
              block
            >
              Registrar
            </v-btn>
            <v-dialog v-model="carga" hide-overlay persistent width="300">
              <v-card color="primary" dark>
                <v-card-text>
                  Espere un momento
                  <v-progress-linear indeterminate color="white" class="mb-0">
                  </v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </validation-observer>
</template>

<script>
import Calendario from "../general/Calendario.vue";
import DocumentoPoliticas from "./DocumentoPoliticas";
import Swal from "sweetalert2";
import { LISTAR_PROGRAMAS } from "@/services/recursos/programaRS";
import { OBTENER_HABILIDADES } from "@/services/auth";
import { digits, email, max, min, required } from "vee-validate/dist/rules";
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";

setInteractionMode("eager");

{
  extend("digits", {
    ...digits,
    message: "{_field_}: Se necesita {length} digitos. ({_value_})",
  });

  extend("required", {
    ...required,
    message: "{_field_}: no puede estar vacio",
  });

  extend("max", {
    ...max,
    message: "{_field_}: maximo de caracteres {length}",
  });

  extend("min", {
    ...min,
    message: "{_field_}: Ingrese mas caracteres, minimo {length}",
  });

  extend("email", {
    ...email,
    message: "Correo con formato incorrecto",
  });
}

export default {
  name: "FormDocente",
  components: {
    ValidationObserver,
    ValidationProvider,
    Calendario,
    DocumentoPoliticas,
  },
  data: () => ({
    carga: false,
    checkbox: false,
    programas: [],
    programa: null,
    habilidades: [],
    habilidadeSeleccionadas: [],
    nombres: "",
    apellidos: "",
    tipoDoc: "",
    documento: "",
    fechaExp: null,
    fechaNaci: null,
  }),
  methods: {
    async listadoProgramas() {
      await LISTAR_PROGRAMAS().then(
        (resultado) => (this.programas = Object.values(resultado.data))
      );
    },
    async listadoHabilidades() {
      if (this.programa) {
        if (!this.programa.id) {
          return Swal.fire(
            "Programa academico incorrecto",
            "Vuelva a seleccionar el programa academico, no digite el nombre completo",
            "error"
          );
        }
      }
      if (this.programa != null) {
        this.habilidadeSeleccionadas = [];
        await OBTENER_HABILIDADES(this.programa.id).then(
          (resultado) => (this.habilidades = resultado.data)
        );
      } else {
        this.habilidades = [];
      }
    },
  },
  async mounted() {
    await this.listadoProgramas();
  },
};
</script>

<style scoped></style>
