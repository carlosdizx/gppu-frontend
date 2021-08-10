<template>
  <v-app>
    <v-card class="mx-auto my-auto">
      <v-card-title class="mx-auto my-auto">
        <v-img src="@/assets/GPPU.png" max-width="200" max-height="200" />
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="iniciarSesion">
          <v-text-field
            v-model="email"
            color="indigo"
            label="Correo electronico"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            v-model="password"
            color="indigo"
            :type="mostrarPassword ? 'text' : 'password'"
            label="Contraseña"
            prepend-icon="mdi-lock"
            :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="mostrarPassword = !mostrarPassword"
          />
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-btn
            @click="iniciarSesion"
            block
            dark
            color="primary"
            type="submit"
            :disabled="bloquear"
          >
            Iniciar sesion
          </v-btn>
          <br />
          <router-link to="registro" v-slot="{ navigate }" custom>
            <v-btn @click="navigate" block dark color="success" role="link">
              No tengo cuenta
            </v-btn>
          </router-link>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    mostrarPassword: false,
    email: "",
    password: "",
  }),
  computed: {
    bloquear() {
      return this.email.trim() === "" || this.password.trim() === "";
    },
  },
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
};
</script>

<style scoped></style>
