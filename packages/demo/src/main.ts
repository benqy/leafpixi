import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ClassDemo } from '@leafpixi/common'

const app = createApp(App)
const demo: ClassDemo = new ClassDemo()
console.log(demo)
app.use(router)

app.mount('#app')
