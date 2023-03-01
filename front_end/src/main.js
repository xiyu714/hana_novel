import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import { api } from "./api"

import './assets/main.css'

const app = createApp(App)
// 使用element ui
app.use(ElementPlus)


app.use(router)

app.config.globalProperties.$api = api

app.mount('#app')
