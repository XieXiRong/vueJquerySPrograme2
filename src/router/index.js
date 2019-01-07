import Vue from 'vue'
import Router from 'vue-router'
import Msite from '../pages/Msite/Msite'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Msite',
      component: Msite
    }
  ]
})
