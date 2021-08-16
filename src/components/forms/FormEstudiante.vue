<template>
  <v-card max-width="800" class="mx-auto my-auto">
    <v-card-title>Formulario estuidante</v-card-title>
    <v-card-subtitle>
      Complete los datos que le sean requeridos
    </v-card-subtitle>
    <v-card-text>
      <v-form autocomplete="off" :disabled="carga">
        <v-alert dense color="secondary" dark>Datos personales</v-alert>
        <v-text-field label="Nombres completos" prepend-icon="mdi-account" />
        <v-row>
          <v-col cols="6">
            <v-select
              label="Tipo de documento"
              :items="['Cedula de ciudadania', 'Tarjeta de identidad', 'Otro']"
              prepend-icon="mdi-format-list-bulleted-type"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              append-icon="mdi-card-account-details"
              label="Numero de documento"
            />
          </v-col>
        </v-row>
        <v-row>
          <Calendario
            texto="Fecha de expedicion"
            @fecha="fechaNacimiento = $event"
          />
          <Calendario
            texto="Fecha de nacimiento"
            @fecha="fechaNacimiento = $event"
          />
        </v-row>
        <v-select
          label="Genero"
          :items="['Masculino', 'Femenino', 'Otro']"
          prepend-icon="mdi-gender-male-female"
        />
        <v-text-field label="EPS" prepend-icon="mdi-hospital-building" />
        <v-text-field label="Pais" prepend-icon="mdi-earth" />
        <v-text-field
          label="Departamento/Estado/Provincia"
          prepend-icon="mdi-sign-real-estate"
        />
        <v-text-field label="Ciudad" prepend-icon="mdi-city" />
        <v-text-field label="Direccion" prepend-icon="mdi-home" />
        <v-select
          label="Zona"
          :items="['Rural', 'Urbana']"
          prepend-icon="mdi-map-legend"
        />
        <v-text-field label="Correo electronico" prepend-icon="mdi-email" />
        <v-text-field label="Telefono" prepend-icon="mdi-phone" type="number" />
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
            :disabled="carga"
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
</template>

<script lang="ts">
import Calendario from "../general/Calendario.vue";
import { OPCIONES_CAMPO } from "@/assets/textos";

export default {
  name: "FormEstudiante",
  components: { Calendario },
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
