//dependencies
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const scss = require('koa-scss');
const serve = require('koa-static');

const app = new Koa();
//dependencies

//Router
const homepageRoute = new Router({ prefix: '/' });
const loginRoute = new Router({ prefix: '/login' });
const newMemeRoute = new Router({ prefix: '/newMeme' });

require('./routes/index')({ homepageRoute });
require('./routes/login')({ loginRoute });
require('./routes/newMeme')({ newMemeRoute });
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

//Addons
app.use(logger());
app.use(scss({
    src: __dirname + '/public/scss/',
    dest: __dirname + '/public/css/'
}));
app.use(serve('./public'));
//Addons

//Routes
app.use(homepageRoute.routes());
app.use(homepageRoute.allowedMethods());

app.use(loginRoute.routes());
app.use(loginRoute.allowedMethods());

app.use(newMemeRoute.routes());
app.use(newMemeRoute.allowedMethods());
//Routes

const server = app.listen(3000);
module.exports = server;