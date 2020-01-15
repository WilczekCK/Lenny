//dependencies
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const Pug = require('koa-pug')
const serve = require('koa-static');
var methodOverride = require('koa-methodoverride');
const passport = require('koa-passport');
const session = require('koa-session');
const koaBody = require('koa-body');
const auth = require('./controllers/auth_controller');
const fs = require('fs');

const path = require('path')
const app = new Koa();
//dependencies

//MethodOverride
app.use(methodOverride('_method'))
//MethodOverride

//Router
const homepageRoute = new Router({ prefix: '/' });
const loginRoute = new Router({ prefix: '/login' });
const memeRoute = new Router({ prefix: '/meme' });
const errorRoute = new Router({ prefix: '/error' });
const profileRoute = new Router({ prefix: '/profile' });

require('./routes/index')({ homepageRoute });
require('./routes/login')({ loginRoute });
require('./routes/meme')({ memeRoute });
require('./routes/error')({ errorRoute });
require('./routes/profile')({ profileRoute });
//Router

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

//Error handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});


app.on('error', (err, ctx) => {
  ctx.session.error = err.message;
  return ctx.redirect('/error')
})
//Error handler


//Addons
app.use(logger());
app.use(serve(__dirname + '/public'));

const pug = new Pug({
  viewPath: path.resolve(__dirname, './views'),
  basedir: './views',
  locals: { },
  helperPath: [
    { _: require('underscore')},
    { moment: require('moment')},
  ],
  app: app 
})
//Addons

//Passport
app.use(passport.initialize());
app.use(passport.session());
//Passport

//Routes
app.use(homepageRoute.routes());
app.use(homepageRoute.allowedMethods());

app.use(loginRoute.routes());
app.use(loginRoute.allowedMethods());

app.use(memeRoute.routes());
app.use(memeRoute.allowedMethods());

app.use(errorRoute.routes());
app.use(errorRoute.allowedMethods());

app.use(profileRoute.routes());
app.use(profileRoute.allowedMethods());
//Routes

const server = app.listen(3000);
module.exports = server;