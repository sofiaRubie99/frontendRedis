import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
  
app.config.globalProperties.url = 'https://tarea4sr.netlify.app';

app.use(router).mount("#app");

