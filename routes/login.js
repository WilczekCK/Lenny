const auth = require('../controllers/auth_controller');
const passport = require('koa-passport')
const session = require('koa-session');
module.exports = ({ loginRoute }) => {
    auth.oAuth2.init();

    loginRoute.get('/', passport.authenticate('oauth2'));

    loginRoute.get('/callback',
        passport.authenticate('oauth2'), async (ctx, next) => {
            await auth.oAuth2.convertToken(ctx.session, ctx.req.user.accessToken, ctx.req.user.refreshToken);
            await ctx.redirect('success')
    })

    loginRoute.get('/success', async (ctx, next) => {
        ctx.redirect('..');
    })

    loginRoute.get('/failed', async (ctx, next) => {
        ctx.throw(400, 'Error while logging')
    })
}

