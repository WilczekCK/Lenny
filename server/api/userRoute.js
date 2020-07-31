import * as auth from './controllers/auth'
import * as user from './controllers/user'
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
        if(!ctx.req.body[1]) return false;
        return ctx.body = ctx.req.body[1];
    }),

    router.get('/auth/logout', async (ctx, next) => {
        auth.sess.logout(ctx);
        ctx.body = true;
    }),

    router.get('/failed', async (ctx, next) => {
        ctx.throw(400, 'Error while logging')
    }),

    router.get('/users/:id', async (ctx, next) => {
        const [{username, registered, role, fb_id, avatar_uploaded}] = await user.find(ctx.params.id);
        const [{memes_count, sum_likes}] = await user.profile_detailed_meme(ctx.params.id);

        return ctx.body = {
            username: username,
            registered: registered,
            role: role,
            fb_id: fb_id,
            memes_count:memes_count,
            sum_likes:sum_likes,
            avatar_uploaded:avatar_uploaded
        };
    })
} 