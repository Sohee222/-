import { createApp } from 'vue';
import App from './App.vue';

// 직접만든 설정
import routes from './routes/index.js';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//createApp(App)
//.use(routes)
//.use(ElementPlus)
//.mount('#app');

const app = createApp(App);

app.use(routes);
app.use(ElementPlus);

app.mount('#app');
