const auth = require('../controllers/auth_controller');
const passport = require('koa-passport')
, FacebookStrategy = require('passport-facebook').Strategy;
const session = require('koa-session');
module.exports = ({ loginRoute }) => {
    auth.oAuth2.init();

    loginRoute.get('/', passport.authenticate('facebook'));

    loginRoute.get('/callback', passport.authenticate('facebook'), async (ctx, next) => {
        console.log(ctx.session)   
        
        await auth.convertToken(ctx.session, ctx.req.user.accessToken, ctx.req.user.refreshToken);
        await ctx.redirect('success')
    })

    loginRoute.get('/success', async (ctx, next) => {
        await ctx.render('pages/login_success');        
    })

    loginRoute.get('/out', async (ctx, next) => {
        await auth.logout(ctx);
        await ctx.redirect('/');
    })

    loginRoute.get('/failed', async (ctx, next) => {
        ctx.throw(400, 'Error while logging')
    })
}

