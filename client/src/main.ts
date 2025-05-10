import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import './style.css';

// Dependencies setup
const pinia = createPinia();
const app = createApp(App);

//Registering pinia and vue query
app.use(pinia);
app.use(VueQueryPlugin);

app.mount('#app'); // Mount the app
