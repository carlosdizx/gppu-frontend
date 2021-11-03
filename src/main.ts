import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_ZD2E_MljH_mKuX78Z0IUpw5PRfF4Z24",
  authDomain: "gceu-gestion.firebaseapp.com",
  databaseURL: "https://gceu-gestion-default-rtdb.firebaseio.com",
  projectId: "gceu-gestion",
  storageBucket: "gceu-gestion.appspot.com",
  messagingSenderId: "66955649732",
  appId: "1:66955649732:web:13c4d412ca612e00aedf91",
  measurementId: "G-G2790SS2B0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

export const STORAGE = firebase.storage();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
