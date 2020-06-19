import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home.vue'
import Meme from './components/meme.vue'
import NotFound from './components/NotFound.vue'


Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/home', component: Home },
      { path: '/memes', component: Meme },
      { path: '*', component: NotFound },
    ],
    watch: {
      $route(to, from){
        console.log([to, from])
      }
    }
  })
}
