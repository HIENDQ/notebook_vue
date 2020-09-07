import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import firebase from 'firebase';
require('firebase/firestore');

Vue.use(Vuetify)

var firebaseConfig = {
  apiKey: "AIzaSyDxxM5ngsLsim_RLVn4oEjEkmSIFMjvogI",
  authDomain: "notebook-a46c2.firebaseapp.com",
  databaseURL: "https://notebook-a46c2.firebaseio.com",
  projectId: "notebook-a46c2",
  storageBucket: "notebook-a46c2.appspot.com",
  messagingSenderId: "154442059129",
  appId: "1:154442059129:web:1d09d88d95fc46b0b0f3a8",
  measurementId: "G-1V9YV5VR8S"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/* Bind firebase to your Vue instance */
Vue.prototype.$firebase = firebase;

Vue.config.productionTip = false
import store from "./store";
import {router} from "./router";
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
