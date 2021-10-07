<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-card max-width="800" class="mx-auto my-auto">
      <v-card-title>Formulario estudiante</v-card-title>
      <v-card-subtitle>
        Complete los datos que le sean requeridos
      </v-card-subtitle>
      <v-card-text>
        <v-form
          @submit.prevent="registrar"
          autocomplete="off"
          :disabled="carga"
        >
          <v-alert dense color="secondary" dark>Datos personales</v-alert>
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
          <validation-provider
            v-slot="{ errors }"
            name="Apellidos"
            rules="required|min:5|max:60"
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
          <validation-provider
            v-slot="{ errors }"
            name="Genero"
            rules="required"
          >
            <v-select
              v-model="genero"
              label="Género"
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
            name="País"
            rules="required|min:3|max:30"
          >
            <v-text-field
              v-model="pais"
              label="País"
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
            name="Dirección"
            rules="required|min:5|max:50"
          >
            <v-text-field
              v-model="direccion"
              label="Dirección"
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
              label="Correo electrónico"
              prepend-icon="mdi-email"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Télefono"
            rules="required|min:5|max:20"
          >
            <v-text-field
              v-model="telefono"
              label="Télefono o Celular"
              prepend-icon="mdi-phone"
              type="number"
              :error-messages="errors"
              counter
            />
          </validation-provider>

          <v-alert dense color="secondary" dark>Datos académicos</v-alert>

          <validation-provider
            v-slot="{ errors }"
            name="Promedio"
            rules="required"
          >
            <v-text-field
              v-model="promedio"
              label="Promedio de calificaciones (aprox)"
              prepend-icon="mdi-counter"
              type="number"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Semestre"
            rules="required"
          >
            <v-select
              v-model="semestre"
              :items="['Décimo', 'Noveno', 'Octavo', 'Otro']"
              label="Semestre"
              prepend-icon="mdi-circle-half-full"
              :error-messages="errors"
            />
          </validation-provider>

          <!-- --------------------------------- Preferencias --------------------------------- -->

          <v-alert dense color="secondary" dark>
            Datos de preferencia de práctica
          </v-alert>

          <validation-provider
            v-slot="{ errors }"
            name="Opciones de habilidades"
            rules="required"
          >
            <v-combobox
              v-model="habilidadeSeleccionadas"
              :items="habilidades"
              item-text="nombre"
              label="Habilidades, seleccione 3 o mas"
              hint="Puede proponer"
              :error-messages="errors"
              hide-selected
              small-chips
              dense
              outlined
              multiple
            />
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Modalidad"
            rules="required"
          >
            <v-select
              v-model="modalidad"
              label="Modalidad de trabajo"
              :items="['Presencial', 'Virtual', 'Mixta', 'No importa']"
              prepend-icon="mdi-home-plus"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Tipo empresa"
            rules="required"
          >
            <v-select
              v-model="tipoEmp"
              label="Tipo de empresa"
              :items="['Privada', 'Publica']"
              prepend-icon="mdi-domain"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Expectativas"
            rules="required|min:20|max:500"
          >
            <v-textarea
              v-model="expectativas"
              label="Expectativas de trabajo"
              prepend-icon="mdi-order-bool-ascending-variant"
              :error-messages="errors"
              counter
            />
          </validation-provider>

          <!-- --------------------------------- Competencias --------------------------------- -->

          <v-alert dense color="secondary" dark>
            Competencias Técnicas y profesionales
          </v-alert>

          <validation-provider
            v-slot="{ errors }"
            name="Experiencia"
            rules="required"
          >
            <v-select
              v-model="experiencia"
              label="¿Cuenta con experiencia laboral?"
              :items="['Si', 'No']"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Experiencia ing"
            rules="required"
          >
            <v-select
              v-model="exp_ingenieria"
              label="¿Experiencia en Ing. de Sistemas?"
              :items="['Si', 'No']"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Competencias"
            rules="required|min:20|max:100"
          >
            <v-textarea
              v-model="competencias"
              label="Competencias técnicas que posee"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Competencias fuertes"
            rules="required|min:20|max:100"
          >
            <v-textarea
              v-model="comp_fuerte"
              label="Competencias técnicas en las cuales se considera fuerte"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Aspectos profecionales"
            rules="required|min:20|max:200"
          >
            <v-textarea
              v-model="aspectos_pro"
              label="¿Qué aspectos destaca de su perfil profesional?"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Aspectos personales"
            rules="required|min:20|max:200"
          >
            <v-textarea
              v-model="aspectos_per"
              label="¿Qué aspectos destaca de su perfil personal?"
              :error-messages="errors"
              counter
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Aspectos a mejorar"
            rules="required|min:10|max:200"
          >
            <v-textarea
              v-model="mejoras"
              label="¿Qué aspectos son susceptibles de mejora por su parte?"
              :error-messages="errors"
              counter
            />
          </validation-provider>

          <v-alert block dense dark color="info darken-3"> Opcionales </v-alert>

          <v-text-field
            v-model="url"
            label="URL Portafolio digital (opcional)"
            prepend-icon="mdi-web"
          />
          <v-file-input
            v-model="hoja"
            accept="application/pdf"
            label="Hoja de vida  (opcional)"
            prepend-icon="mdi-file-account"
          />
        </v-form>
      </v-card-text>

      <template>
        <v-container fluid>
          <v-checkbox v-model="checkbox">
            <template v-slot:label>
              <div>
                Aceptar nuestras políticas y condiciones sobre el tratamiento de
                datos, Estamos comprometidos con la protección de los mismos
                para consultarlos cuando sea requerido
              </div>
            </template>
          </v-checkbox>
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
              @click="registrar"
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
import { OPCIONES_CAMPO } from "@/assets/textos";
import { digits, email, max, min, required } from "vee-validate/dist/rules";
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
import {
  ESTUDIANTE_YA_REGISTRADO,
  REGISTRO_ARCHIVO_ESTUDIANTE,
  REGISTRO_DATOS_ESTUDIANTE_PENDIENTE,
  REGISTRO_ESTUDIANTE_PENDIENTE,
} from "@/services/recursos/estudianteRS";
import Swal from "sweetalert2";
import { LISTAR_PROGRAMAS } from "@/services/recursos/programaRS";
import { OBTENER_DATOS_USUARIO, OBTENER_HABILIDADES } from "@/services/auth";

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
  name: "FormEstudiante",
  components: { Calendario, ValidationObserver, ValidationProvider },
  data: () => ({
    opcinesCargo: OPCIONES_CAMPO,
    programas: [],
    programa: null,
    nombres: "",
    apellidos: "",
    tipoDoc: "",
    documento: "",
    fechaExp: null,
    fechaNaci: null,
    genero: "",
    eps: "",
    pais: "",
    departamento: "",
    ciudad: "",
    direccion: "",
    zona: "",
    correo: "",
    telefono: null,
    promedio: null,
    semestre: "",
    habilidades: [],
    habilidadeSeleccionadas: [],
    modalidad: "",
    tipoEmp: "",
    expectativas: "",
    experiencia: "",
    exp_ingenieria: "",
    competencias: "",
    comp_fuerte: "",
    aspectos_pro: "",
    aspectos_per: "",
    mejoras: "",
    url: "",
    hoja: null,
    carga: false,
    checkbox: false,
  }),
  methods: {
    async registrar() {
      if (this.fechaNaci === null || this.fechaExp === null) {
        return await Swal.fire(
          "Complete todos los campos",
          "Fecha de nacimiento y fecha de expedicion de documento de identidad son necesarios",
          "error"
        );
      }
      const estudiante = {
        nombres: this.nombres,
        programa: this.programa.id,
        apellidos: this.apellidos,
        tipoDoc: this.tipoDoc,
        documento: this.documento,
        fechaExp: this.fechaExp,
        fechaNaci: this.fechaNaci,
        genero: this.genero,
        eps: this.eps,
        pais: this.pais,
        departamento: this.departamento,
        ciudad: this.ciudad,
        direccion: this.direccion,
        zona: this.zona,
        correo: this.correo,
        telefono: this.telefono,
        url: this.url,
        estado: 1,
      };
      const datos = {
        promedio: this.promedio,
        semestre: this.semestre,
        habilidades: this.habilidadeSeleccionadas,
        modalidad: this.modalidad,
        tipoEmp: this.tipoEmp,
        expectativas: this.expectativas,
        experiencia: this.experiencia,
        exp_ingenieria: this.exp_ingenieria,
        competencias: this.competencias,
        comp_fuerte: this.comp_fuerte,
        aspectos_pro: this.aspectos_pro,
        aspectos_per: this.aspectos_per,
        mejoras: this.mejoras,
      };
      if (
        await ESTUDIANTE_YA_REGISTRADO(
          estudiante.programa,
          estudiante.documento
        )
      ) {
        return await Swal.fire(
          "Estudiante ya registrado",
          "Sus datos ya fueron subidos a plataforma",
          "error"
        );
      }
      let facha = false;
      if (this.hoja !== null) {
        if (this.hoja.type === "application/pdf") {
          this.carga = true;
          await REGISTRO_ARCHIVO_ESTUDIANTE(
            estudiante.programa,
            estudiante.documento,
            this.hoja,
            `hoja_de_vida_${estudiante.documento}`
          );
          facha = true;
        } else {
          await Swal.fire(
            "El documento hoja de vida errado",
            "Solo seleccionar archivos PDF",
            "error"
          );
        }
      } else {
        facha = true;
      }
      if (facha) {
        this.carga = true;
        await REGISTRO_ESTUDIANTE_PENDIENTE(estudiante.programa, estudiante);
        await REGISTRO_DATOS_ESTUDIANTE_PENDIENTE(
          estudiante.programa,
          datos,
          estudiante.documento
        );
        await Swal.fire(
          "Registro exitoso",
          "Sus datos serán validados en los próximos días",
          "success"
        );
        this.carga = false;
      }
    },
    async listadoProgramas() {
      await LISTAR_PROGRAMAS().then(
        (resultado) => (this.programas = Object.values(resultado.data))
      );
    },
    async listadoHabilidades() {
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
