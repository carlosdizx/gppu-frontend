import Vue from "vue";
import Vuex from "vuex";
import { REGISTRO_USUARIO } from "@/services/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    registroUsuario: async ({ commit }, usuario: any) => {
      await REGISTRO_USUARIO(usuario).then((result) => {
        console.log(result);
      });
    },
  },
  modules: {},
});
