import Vue from "vue";
import Vuex from "vuex";
import {
  LOGUEAR_USUARIO,
  LOGUEAR_USUARIO_TOKEN,
  REGISTRO_USUARIO,
} from "@/services/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {},
  actions: {
    registroUsuario: async ({ commit }, usuario: any) => {
      await REGISTRO_USUARIO(usuario).then((result) => {
        localStorage.setItem("token", JSON.stringify(result));
      });
    },
    loguearUsuario: async ({ commit }, usuario: any) => {
      await LOGUEAR_USUARIO(usuario).then((result) => {
        localStorage.setItem("token", JSON.stringify(result));
      });
    },
    loguearUsuarioToken: async ({ commit }) => {
      const token = JSON.parse(<string>localStorage.getItem("token"));
      console.log(token);
      await LOGUEAR_USUARIO_TOKEN(token.refreshToken).then((result) => {
        localStorage.setItem("token", JSON.stringify(result));
      });
    },
  },
  modules: {},
});
