'use strict'

import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import config from './config'
import middlewares from './middlewares'
import * as auth from './api/controllers/auth'
import passport from 'koa-passport'
import FacebookStrategy from 'passport-facebook'
import session from 'koa-session'

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || config.server.port

//SESSIONS
app.keys = ['your-session-secret']
app.use(session(app));

const myLogger = async function(ctx, next){
  const myLogger = await auth.sess.status(ctx.session)

  if(myLogger){
    ctx.req.body = myLogger;
  }else{
    ctx.req.body = {};
  }
  await next()
};

app.use(myLogger);
//SESSIONS

//Passport
app.use(passport.initialize());
app.use(passport.session());
//Passport


// Import and Set Nuxt.js options
let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = !(app.env === 'production')

// Instantiate nuxt.js
const nuxt = new Nuxt(nuxtConfig)

// Build in development
if (nuxtConfig.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch(e => {
    console.error(e) // eslint-disable-line no-console
    process.exit(1)
  })
}

// Middlewares are imported here.
middlewares(app)

// Hook Nuxt up!
// https://github.com/nuxt-community/koa-template/blob/master/template/server/index.js
app.use(ctx => {
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset

  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve)
    ctx.res.on('finish', resolve)
    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject)
    })
  })
})

app.listen(port, host)
