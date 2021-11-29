import { createApp } from 'vue';
import App from './App.vue';
import { VuesticPlugin } from 'vuestic-ui';
import 'vuestic-ui/dist/vuestic-ui.css';
import router from './routes/routes';
import store from './store/index';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VuesticPlugin);
app.mount('#app');