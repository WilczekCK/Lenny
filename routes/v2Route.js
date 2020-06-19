module.exports = ({ v2Route }) => {
    const session = require('koa-session');
    const koaBody = require('koa-body');
    
    v2Route.get('/', koaBody(), async (ctx, next) => {
        await ctx.render('v2/index')
        next();
    });
}

