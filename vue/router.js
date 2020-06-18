import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home.vue'
import Meme from './components/meme.vue'


Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/foo', component: Home },
      { path: '/bar', component: Meme },
    ]
  })
}
