import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Prototype from "@/assets/model/prototype";

import '@/assets/style/index.scss'

const app = createApp(App)

for (let key in Prototype) {
    Prototype[key]()
}

app.use(store).use(router).mount('#app')
