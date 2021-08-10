import Vue from "vue";
import Vuex from "vuex";
import {
  LOGUEAR_USUARIO,
  LOGUEAR_USUARIO_TOKEN,
  REGISTRO_USUARIO,
} from "@/services/auth";
import Swal from "sweetalert2";
import { CONTIENE_ERROR } from "@/services/validaciones";
import {
  REGISTRO_ARCHIVOS_EMPRESA_PENDIENTE,
  REGISTRO_DATOS_EMPRESA_PENDIENTE,
} from "@/services/recursos";
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
        if (!result.error) {
          commit("asignarToken", result);
          localStorage.setItem("token", JSON.stringify(result));
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
            if (!result.error) {
              tokenLocal.idToken = await result.access_token;
              tokenLocal.refreshToken = await result.refresh_token;
              await localStorage.setItem("token", JSON.stringify(tokenLocal));
              commit("asignarToken", tokenLocal);
            }
          }
        );
      } else {
        await Swal.fire(
          "",
          "Por motivos de seguridad debes ingresar tus credenciales",
          "warning"
        );
      }
    },
    //--------------------------------------------------------------------------
    //------------------------------ EMPRESA -----------------------------------
    //--------------------------------------------------------------------------
    registrarDatosEmpresaPendiente: async ({ commit }, datos: any) => {
      return await REGISTRO_DATOS_EMPRESA_PENDIENTE(datos);
    },
  },
  modules: {},
});
