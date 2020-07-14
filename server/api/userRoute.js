import * as auth from './controllers/auth'
import passport from 'koa-passport'
import FacebookStrategy from 'passport-facebook'

export function printRoutes (router) {
    auth.oAuth2.init();

    return router.get('/login', passport.authenticate('facebook')),

    router.get('/login/callback', passport.authenticate('facebook'), async (ctx, next) => {
        await auth.convertToken(ctx.session, ctx.req.user.accessToken);
        await ctx.redirect('/');
    }),

    router.get('/auth/check', async (ctx, next) => {
        return ctx.body = ctx.req.body[1];
    }),

    router.get('/auth/logout', async (ctx, next) => {
        auth.sess.logout(ctx);
        ctx.body = true;
    }),

    router.get('/login/success', async (ctx, next) => {
        await ctx.render('pages/login_success');        
    }),

    router.get('/failed', async (ctx, next) => {
        ctx.throw(400, 'Error while logging')
    })
} 