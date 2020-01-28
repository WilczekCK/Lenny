const _ = require('underscore');
const koaBody = require('koa-body');

module.exports = ({ infoRoute }) => {
    infoRoute.get('/', koaBody(), async (ctx, next) => {
        ctx.throw('404', 'That page does not exist');
    });

    infoRoute.get('/rules', koaBody(), async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        await ctx.render('rules', { userInfo: is_player_logged})
        next();
    });
}

