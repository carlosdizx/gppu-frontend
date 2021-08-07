import Vue from "vue";
import Vuex from "vuex";
import {
  LOGUEAR_USUARIO,
  LOGUEAR_USUARIO_TOKEN,
  REGISTRO_USUARIO,
} from "@/services/auth";
import Swal from "sweetalert2";
import { CONTIENE_ERROR } from "@/services/validaciones";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    error: null,
  },
  mutations: {
    asignarToken(state, payload) {
      state.token = payload;
    },
    asignarError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    registrarError: async ({ commit }, error: any) => {
      commit("asignarError");
    },
    registroUsuario: async ({ commit }, usuario: any) => {
      await REGISTRO_USUARIO(usuario).then(async (result) => {
        await CONTIENE_ERROR(result);
        commit("asignarToken", result);
        localStorage.setItem("token", JSON.stringify(result));
      });
    },
    loguearUsuario: async ({ commit }, usuario: any) => {
      await LOGUEAR_USUARIO(usuario).then(async (result) => {
        await CONTIENE_ERROR(result);
        commit("asignarToken", result);
        localStorage.setItem("token", JSON.stringify(result));
      });
    },
    loguearUsuarioToken: async ({ commit }) => {
      const token = JSON.parse(<string>localStorage.getItem("token"));
      if (token !== null) {
        await LOGUEAR_USUARIO_TOKEN(token.refreshToken).then(async (result) => {
          await CONTIENE_ERROR(result);
          token.idToken = await result.access_token;
          token.refreshToken = await result.refresh_token;
          await localStorage.setItem("token", JSON.stringify(token));
          commit("asignarToken", token);
        });
      } else {
        await Swal.fire(
          "Vuelve a iniciar sesion",
          "Por motivos de seguridad vuelve a ingresar tus credenciales",
          "warning"
        );
      }
    },
  },
  modules: {},
});
