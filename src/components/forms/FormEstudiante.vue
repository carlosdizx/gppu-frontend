<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-card max-width="800" class="mx-auto my-auto">
      <v-card-title>Formulario estuidante</v-card-title>
      <v-card-subtitle>
        Complete los datos que le sean requeridos
      </v-card-subtitle>
      <v-card-text>
        <v-form autocomplete="off" :disabled="carga">
          <v-alert dense color="secondary" dark>Datos personales</v-alert>
          <validation-provider
            v-slot="{ errors }"
            name="Nombres"
            rules="required|min:5|max:60"
          >
            <v-text-field
              v-model="nombres"
              label="Nombres completos"
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
                  label="Numero de documento"
                  :error-messages="errors"
                  counter
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <Calendario
              texto="Fecha de expedicion"
              @fecha="fechaExp = $event"
            />
            <Calendario
              texto="Fecha de nacimiento"
              @fecha="fechaNacimiento = $event"
            />
          </v-row>
          <validation-provider
            v-slot="{ errors }"
            name="Genero"
            rules="required"
          >
            <v-select
              v-model="genero"
              label="Genero"
              :items="['Masculino', 'Femenino', 'Otro']"
              prepend-icon="mdi-gender-male-female"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Eps"
            rules="required|min:3|max:60"
          >
            <v-text-field
              v-model="eps"
              label="EPS"
              prepend-icon="mdi-hospital-building"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Pais"
            rules="required|min:3|max:30"
          >
            <v-text-field
              v-model="pais"
              label="Pais"
              prepend-icon="mdi-earth"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Departamento"
            rules="required|min:3|max:30"
          >
            <v-text-field
              v-model="departamento"
              label="Departamento/Estado/Provincia"
              prepend-icon="mdi-sign-real-estate"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Ciudad"
            rules="required|min:3|max:30"
          >
            <v-text-field
              v-model="ciudad"
              label="Ciudad"
              prepend-icon="mdi-city"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Direccion"
            rules="required|min:5|max:50"
          >
            <v-text-field
              v-model="direccion"
              label="Direccion"
              prepend-icon="mdi-home"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Zona" rules="required">
            <v-select
              v-model="zona"
              label="Zona"
              :items="['Rural', 'Urbana']"
              prepend-icon="mdi-map-legend"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Correo"
            rules="required|email"
          >
            <v-text-field
              v-model="correo"
              label="Correo electronico"
              prepend-icon="mdi-email"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Telefono"
            rules="required|min:5|max:20"
          >
            <v-text-field
              v-model="telefono"
              label="Telefono o Celular"
              prepend-icon="mdi-phone"
              type="number"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <v-alert dense color="secondary" dark>Datos academicos</v-alert>
          <v-text-field
            label="Promedio de calificaciones (aprox)"
            prepend-icon="mdi-counter"
            type="number"
          />
          <v-select
            :items="['Decimo', 'Noveno', 'Octavo', 'Otro']"
            label="Semestre"
            prepend-icon="mdi-circle-half-full"
          />
          <v-alert dense color="secondary" dark>
            Datos de preferencia de practica
          </v-alert>
          <v-select
            label="Primera opcion"
            :items="opcinesCargo"
            prepend-icon="mdi-briefcase"
          />
          <v-select
            label="Segunda opcion"
            :items="opcinesCargo"
            prepend-icon="mdi-briefcase-outline"
          />
          <v-select
            label="Tercera opcion"
            :items="opcinesCargo"
            prepend-icon="mdi-briefcase-outline"
          />
          <v-select
            label="Modalidad de trabajo"
            :items="['Presencial', 'Virtual', 'Mixta', 'No importa']"
            prepend-icon="mdi-home-plus"
          />
          <v-select
            label="Tipo de empresa"
            :items="['Privada', 'Publica']"
            prepend-icon="mdi-domain"
          />
          <v-textarea
            label="Expectativas de trabajo"
            prepend-icon="mdi-order-bool-ascending-variant"
          />
          <v-alert dense color="secondary" dark>
            Competencias Tecnicas y profesionales
          </v-alert>
          <v-select
            label="¿Cuenta con experiencia laboral?"
            :items="['Si', 'No']"
          />
          <v-select
            label="¿Experiencia en Ing. de Sistemas?"
            :items="['Si', 'No']"
          />
          <v-textarea label="Competencias técnicas que posee" />
          <v-textarea
            label="Competencias técnicas en las cuales se considera fuerte"
          />
          <v-textarea label="¿Qué aspectos destaca de su perfil profesional?" />
          <v-textarea label="¿Qué aspectos destaca de su perfil personal?" />
          <v-textarea
            label="¿Qué aspectos son susceptibles de mejora por su parte?"
          />
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-alert block dense dark color="red">
            Complete todos los campos
          </v-alert>
          <div class="text-center">
            <v-btn
              :disabled="carga || invalid"
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

<script lang="ts">
import Calendario from "../general/Calendario.vue";
import { OPCIONES_CAMPO } from "@/assets/textos";
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
  name: "FormEstudiante",
  components: { Calendario, ValidationObserver, ValidationProvider },
  data: () => ({
    opcinesCargo: OPCIONES_CAMPO,
    fechaNacimiento: null,
    nombres: "",
    tipoDoc: null,
    documento: null,
    fechaExp: null,
    fechaNaci: null,
    genero: null,
    eps: null,
    pais: null,
    departamento: null,
    ciudad: null,
    direccion: null,
    zona: null,
    correo: null,
    telefono: null,
    promedio: null,
    semestre: null,
    opcion1: null,
    opcion2: null,
    opcion3: null,
    modalidad: null,
    tipoEmp: null,
    espectativas: null,
    experiencia: null,
    exp_ingenieria: null,
    competencias: null,
    comp_fuerte: null,
    aspectos_pro: null,
    aspectos_per: null,
    mejoras: null,
    carga: false,
  }),
  methods: {},
};
</script>
