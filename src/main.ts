import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const head = createHead();
const pinia = createPinia();

app.use(router);
app.use(VueQueryPlugin);
app.use(pinia);
app.use(head);

app.mount('#app');
