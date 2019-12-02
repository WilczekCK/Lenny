//dependencies
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const Pug = require('koa-pug')
const serve = require('koa-static');
const passport = require('koa-passport');
const session = require('koa-session');

const path = require('path')
const app = new Koa();
//dependencies

//Router
const homepageRoute = new Router({ prefix: '/' });
const loginRoute = new Router({ prefix: '/login' });
const memeRoute = new Router({ prefix: '/meme' });

require('./routes/index')({ homepageRoute });
require('./routes/login')({ loginRoute });
require('./routes/meme')({ memeRoute });
//Router



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

//Error handler


//SESSIONS
app.keys = ['keybo@rd'];
const configSession = {
  key: 'koa:sess', 
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: false,
  signed: true,
  rolling: false,
  renew: false, 
}

app.use(session(configSession, app))
//SESSIONS


//Addons
app.use(logger());
app.use(serve(__dirname + '/public'));

const pug = new Pug({
    viewPath: path.resolve(__dirname, './views'),
    basedir: './views',
    locals: { /* soon auth will be here */ },
    helperPath: [
      { _: require('underscore')},
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
//Routes

const server = app.listen(3000);
module.exports = server;