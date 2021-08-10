<template>
  <v-app>
    <v-card class="mx-auto my-auto">
      <v-card-title class="mx-auto my-auto">
        <v-img src="@/assets/GPPU.png" max-width="200" max-height="200" />
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="">
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
          <v-btn @click="iniciarSesion" block dark color="primary">
            Iniciar sesion
          </v-btn>
          <br />
          <v-btn block dark color="success">No tengo cuenta</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    mostrarPassword: false,
    email: "",
    password: "",
  }),
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
