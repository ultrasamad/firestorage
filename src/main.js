import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import * as firebase from "firebase/app";
import 'firebase/storage'

Vue.config.productionTip = false

//todo Use env
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET
};
firebase.initializeApp(config);

Vue.prototype.$firebase = firebase

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
