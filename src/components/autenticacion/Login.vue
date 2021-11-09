<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-app>
      <v-card class="mx-auto my-auto">
        <v-card-title class="mx-auto my-auto">
          <v-img
            src="@/assets/GCEU_sin_fondo.png"
            max-width="250"
            max-height="250"
          />
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="iniciarSesion">
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="email"
                :error-messages="errors"
                color="indigo"
                label="Correo electrónico"
                prepend-icon="mdi-account-circle"
                @keypress.enter="iniciarSesion"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Contraseña"
              rules="required|min:8|max:60"
            >
              <v-text-field
                v-model="password"
                color="indigo"
                :type="mostrarPassword ? 'text' : 'password'"
                label="Contraseña"
                prepend-icon="mdi-lock"
                :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="mostrarPassword = !mostrarPassword"
                @keypress.enter="iniciarSesion"
                :error-messages="errors"
                counter
              />
            </validation-provider>
          </v-form>
          <v-btn
            @click="iniciarSesion"
            block
            color="info"
            type="submit"
            :disabled="invalid"
          >
            Iniciar sesión
          </v-btn>
          <br />
          <router-link to="registro" v-slot="{ navigate }" custom>
            <v-btn @click="navigate" block color="success" role="link">
              Soy empresa o estudiante
            </v-btn>
          </router-link>
        </v-card-text>
        <v-card-text>
          Designed and created by:<br />
          <v-btn
            text
            block
            role="link"
            color="blue-grey"
            href="https://portafolio-carlos-diaz.netlify.app"
            target="_blank"
          >
            <small> Carlos Ernesto Díaz Basante </small>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-app>
  </validation-observer>
</template>

<script>
import { required, digits, email, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { mapActions } from "vuex";

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
  name: "Login",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    mostrarPassword: false,
    email: "",
    password: "",
  }),
  computed: {},
  methods: {
    ...mapActions(["loguearUsuario", "loguearUsuarioToken"]),
    async iniciarSesion() {
      const usuario = {
        email: this.email,
        password: this.password,
      };
      await this.loguearUsuario(usuario);
    },
  },
  async mounted() {
    await this.loguearUsuarioToken();
  },
};
</script>

<style scoped></style>
