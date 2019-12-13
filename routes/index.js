module.exports = ({ homepageRoute }) => {
    const mysql = require('../controllers/mysql_controller');
    const auth = require('../controllers/auth_controller');
    const session = require('koa-session');
    
    homepageRoute.get('/', async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        console.log(is_player_logged)
        await ctx.render('index', {userInfo: is_player_logged});
        next();
    });
}

