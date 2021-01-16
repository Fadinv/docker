import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import urql from '@urql/vue'


createApp(App).use(router).use(urql, {
    url: 'http://localhost:8000/graphql',
}).mount('#app')
