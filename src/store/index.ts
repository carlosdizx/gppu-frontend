import Vue from "vue";
import Vuex from "vuex";
import { LOGUEAR_USUARIO, LOGUEAR_USUARIO_TOKEN } from "@/services/auth";
import Swal from "sweetalert2";
import { CONTIENE_ERROR } from "@/services/validaciones";
import { REGISTRO_DATOS_EMPRESA } from "@/services/recursos/empresaRS";
import router from "@/router";
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
      commit("asignarError", error);
    },
    //--------------------------------------------------------------------------
    //-------------------------------- AUTH ------------------------------------
    //--------------------------------------------------------------------------
    loguearUsuario: async ({ commit, state }, usuario: any) => {
      await LOGUEAR_USUARIO(usuario).then(async (result) => {
        await CONTIENE_ERROR(result);
        if (state.error === null) {
          commit("asignarToken", result);
          localStorage.setItem("token", JSON.stringify(result));
          await router.push("/dashboard");
          return await Swal.fire({
            title: "Login exitoso",
            icon: "success",
            timer: 1000,
          });
        }
      });
    },
    loguearUsuarioToken: async ({ commit, state }) => {
      const tokenLocal = JSON.parse(<string>localStorage.getItem("token"));
      if (tokenLocal !== null) {
        await LOGUEAR_USUARIO_TOKEN(tokenLocal.refreshToken).then(
          async (result) => {
            await CONTIENE_ERROR(result);
            if (state.error === null) {
              tokenLocal.idToken = await result.access_token;
              tokenLocal.refreshToken = await result.refresh_token;
              await localStorage.setItem("token", JSON.stringify(tokenLocal));
              commit("asignarToken", tokenLocal);
              await router.push("/dashboard");
              await Swal.fire({
                title: "Cargando sesion",
                html: "No es necesario que vuelvas a ingresar tus credenciales",
                icon: "info",
                timer: 1900,
                showConfirmButton: false,
              });
            }
          }
        );
      }
    },
    removeUserToken({ commit }) {
      commit("asignarToken", null);
    },
  },
  modules: {},
});
