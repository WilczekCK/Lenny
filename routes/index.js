module.exports = ({ homepageRoute }) => {
    const mysql = require('../controllers/mysql_controller');
    const auth = require('../controllers/auth_controller');
    const session = require('koa-session');
    
    homepageRoute.get('/', async (ctx, next) => {
        const user_in_session = await auth.sess.status(ctx.session);
        await ctx.render('index', {userInfo: user_in_session[0]});
        next();
    });
}

