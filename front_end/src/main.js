import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {install} from '@icon-park/vue-next/es/all';
import { api } from "./api"

import './assets/main.css'

const app = createApp(App)
install(app);


app.use(router)

app.config.globalProperties.$api = api

app.mount('#app')
