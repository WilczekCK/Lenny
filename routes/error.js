const koaBody = require('koa-body');

module.exports = ({ errorRoute }) => {
    errorRoute.get('/', koaBody(), async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        
        await ctx.render('error', {message: ctx.session.error, userInfo: is_player_logged,});
        ctx.session.error = undefined;
        next();
    });
}

