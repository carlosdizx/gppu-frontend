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
  apiKey: "AIzaSyDO8hVE9rxb9oP38kTH4qRhqxUcHNtAi3w",
  authDomain: "gppu-backend.firebaseapp.com",
  databaseURL: "https://gppu-backend-default-rtdb.firebaseio.com",
  projectId: "gppu-backend",
  storageBucket: "gppu-backend.appspot.com",
  messagingSenderId: "512100142634",
  appId: "1:512100142634:web:b8a6d707db524a553e3d53",
  measurementId: "G-H1PD88776G",
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
