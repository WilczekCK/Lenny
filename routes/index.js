module.exports = ({ homepageRoute }) => {
    const mysql = require('../controllers/mysql_controller');
    const auth = require('../controllers/auth_controller');
    const session = require('koa-session');
    const koaBody = require('koa-body')
    
    homepageRoute.get('/', koaBody(), async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        await ctx.render('index', {userInfo: is_player_logged});
        next();
    });
}

