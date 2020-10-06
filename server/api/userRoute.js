import * as auth from './controllers/auth'
import * as user from './controllers/user'
import passport from 'koa-passport'
import koaBody from 'koa-body'
import moment from 'moment'
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
        const [{username, registered, role, fb_id, nickname_delay}] = await user.find(ctx.params.id);
        const [{memes_count, sum_likes}] = await user.profile_detailed_meme(ctx.params.id);

        return ctx.body = {
            username: username,
            registered: registered,
            role: role,
            fb_id: fb_id,
            memes_count:memes_count,
            sum_likes:sum_likes,
            nickname_delay:nickname_delay
        };
    }),

    router.post('/users/uploadAvatar', koaBody({ multipart: true }), async (ctx, next) => {
        try {    
            const fb_id = ctx.request.header.userid;
            const { file } = ctx.request.files;

            await user.uploadAvatar(`${file.path}`, `${fb_id}`);
        } catch (err) {
            return ctx.throw(400)
        }

        return ctx.throw(200)
    }),

    router.post('/users/changeNickname', async (ctx, next) => {
        try {    
            const { user_id, nickname } = ctx.request.body.body;

            await user.changeInfo(user_id, `username = '${nickname}', nickname_delay = '${moment().add(7, 'days').format('YYYY-MM-DD')}'`)
        } catch (err) {
            return ctx.throw(400)
        }

        return ctx.throw(200)
    }),

    router.patch('/users/block', async (ctx, next) => {
        try{
            const {user_id, moderator_id} = ctx.request.body;
            const [{ role }] = await user.find(moderator_id);

            if(role === 1) {
                await user.blockUser(user_id);
                return ctx.body = 200
            };
                
            return ctx.body = 400;
        } catch (err){
            return ctx.body = 400;
        }
    })
} 