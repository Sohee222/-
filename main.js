import { createApp } from 'vue';
import App from './App.vue';

// 직접만든 설정
import routes from './routes/index.js';



createApp(App)
.use(routes)
.mount('#app');
