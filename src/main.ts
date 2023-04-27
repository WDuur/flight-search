import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import router from './router'
import 'primevue/resources/themes/saga-orange/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('InputText', InputText)

app.mount('#app')
