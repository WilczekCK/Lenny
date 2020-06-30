'use strict'

import Router from 'koa-trie-router'
const homeRoute = require('./api/homeRoute');
const userRoute = require('./api/userRoute');
const memeRoute = require('./api/memeRoute');

const router = new Router()

export default (app) => {
  homeRoute.printRoutes(router)
  userRoute.printRoutes(router)
  memeRoute.printRoutes(router)

  return router.middleware()
}
