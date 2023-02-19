import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {install} from '@icon-park/vue-next/es/all';

import './assets/main.css'

const app = createApp(App)
install(app);


app.use(router)

app.mount('#app')
