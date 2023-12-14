import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia'

console.log('运行环境: ' + process.env.NODE_ENV);

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');
