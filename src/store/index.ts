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
  mutations: {
    aseginarToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    registroUsuario: async ({ commit }, usuario: any) => {
      await REGISTRO_USUARIO(usuario).then((result) => {
        commit("aseginarToken", result);
        localStorage.setItem("token", JSON.stringify(result));
      });
    },
    loguearUsuario: async ({ commit }, usuario: any) => {
      await LOGUEAR_USUARIO(usuario).then((result) => {
        commit("aseginarToken", result);
        localStorage.setItem("token", JSON.stringify(result));
      });
    },
    loguearUsuarioToken: async ({ commit }) => {
      const token = JSON.parse(<string>localStorage.getItem("token"));
      //console.log(JSON.stringify(token));
      await LOGUEAR_USUARIO_TOKEN(token.refreshToken).then(async (result) => {
        token.idToken = await result.access_token;
        token.refreshToken = await result.refresh_token;
        await localStorage.setItem("token", JSON.stringify(token));
        //console.log(JSON.stringify(token));
      });
    },
  },
  modules: {},
});
