import { createApp } from 'vue'
import "./extend"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import { api } from "./api"

import { createPinia } from 'pinia'

import './assets/main.css'

const pinia = createPinia()

const app = createApp(App)
// 使用element ui
app.use(ElementPlus)
app.use(pinia)

app.use(router)

app.config.globalProperties.$api = api

app.mount('#app')
