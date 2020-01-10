const koaBody = require('koa-body');

module.exports = ({ errorRoute }) => {
    errorRoute.get('/', koaBody(), async (ctx, next) => {
        await ctx.render('error', {message: ctx.session.error});
        ctx.session.error = undefined;
        next();
    });
}

