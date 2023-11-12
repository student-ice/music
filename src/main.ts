import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from '@/router';

console.log('运行环境: ' + process.env.NODE_ENV);

const app = createApp(App);

app.use(router);
app.mount('#app');
