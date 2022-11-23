import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './styles/app.css'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import CollapseCard from './components/collapse-card.vue'
import SaveButton from './components/save-button.vue'

// add global components
Vue.component('CollapseCard', CollapseCard)
Vue.component('SaveButton', SaveButton)

Vue.use(VueRouter)
Vue.use(Buefy)

Vue.config.productionTip = false

const app = new Vue({
  render: (h) => h(App),
  i18n,
  router,
  store
})

app.$mount('#app')
