import * as auth from './controllers/auth'
import passport from 'koa-passport'
import FacebookStrategy from 'passport-facebook'
import session from 'koa-session'

export function printRoutes (router) {
    auth.oAuth2.init();

    return router.get('/', passport.authenticate('facebook')),

    router.get('/callback', passport.authenticate('facebook'), async (ctx, next) => {
        await auth.convertToken(ctx.session, ctx.req.user.accessToken);
        await ctx.redirect('success')
    }),

    router.get('/success', async (ctx, next) => {
        await ctx.render('pages/login_success');        
    }),

    router.get('/out', async (ctx, next) => {
        await auth.logout(ctx);
        await ctx.redirect('/');
    }),

    router.get('/failed', async (ctx, next) => {
        ctx.throw(400, 'Error while logging')
    })
} 