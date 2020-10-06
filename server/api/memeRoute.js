import * as meme from './controllers/meme.js';
import * as user from './controllers/user.js';
import koaBody from 'koa-body';
import moment from 'moment';
import _ from 'underscore';

export function printRoutes(router) {
    return router.get('/meme', async (ctx, next) => {
        ctx.type = 'json'
        ctx.body = await meme.displayMemes(5);
    }),

        router.get('/meme/:id', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = await meme.displayMeme(ctx.params.id)
        }),

        router.get('/meme/waiting', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = await meme.displayWaitingMemes(5)
        }),

        router.get('/meme/cat/:name', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = await meme.displayMemesWithCategory(ctx.params.name, 5)
        }),

        router.get('/meme/user/:id', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = await meme.displayMemesFromUser(ctx.params.id, 5)
        }),

        router.post('/meme/uploadImage', koaBody({ multipart: true }), async (ctx, next) => {
            try {
                const { file } = ctx.request.files;
                const { title, tags } = ctx.request.header;
                const { fb_id, username } = ctx.req.body[0][0];

                const uploadedSqlID = await meme.insertToDB(`${fb_id}`, `${username}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`, `${tags}`, `${title}`, null)
                await meme.uploadImage(`${file.path}`, uploadedSqlID);
            } catch (err) {
                return ctx.throw(400)
            }

            return ctx.throw(200)
        }),

        router.post('/meme/uploadVideo', async (ctx, next) => {
            try{
                const {title, videoid, tags} = ctx.request.body.body;
                const { fb_id, username } = ctx.req.body[0][0];

                if(!fb_id || !username || !title || !videoid || !tags) return ctx.throw(400, { message: 'One of the fields are missing' })
                await meme.insertToDB(`${fb_id}`, `${username}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`, `${tags}`, `${title}`, `'${videoid}'`)    
            }catch (err){
                return ctx.throw(400)
            }

            return ctx.throw(200)
        }),

        router.get('/meme/load', async (ctx, next) => {
            const howManyLoads = ctx.request.header.page;
            const howManyElements = ctx.request.header.loadelements;
            const lastMemeID = await meme.infiniteScroll(howManyLoads, howManyElements)
            
            ctx.body = lastMemeID;

            await next();
        }),

        router.get('/meme/load/cat', async (ctx, next) => {
            const howManyLoads = ctx.request.header.page;
            const howManyElements = ctx.request.header.loadelements;
            const category = ctx.request.header.category;
            const lastMemeID = await meme.infiniteScrollCategory(howManyLoads, howManyElements, category)
            
            ctx.body = lastMemeID;

            await next();
        }),

        router.get('/meme/load/user', async (ctx, next) => {
            const howManyLoads = ctx.request.header.page;
            const howManyElements = ctx.request.header.loadelements;
            const user = ctx.request.header.userid;
            const lastMemeID = await meme.infiniteScrollUser(howManyLoads, howManyElements, user)
            
            ctx.body = lastMemeID;

            await next();
        }),

        router.get('/meme/load/waiting', async (ctx, next) => {
            const howManyLoads = ctx.request.header.page;
            const howManyElements = ctx.request.header.loadelements;
            const user = ctx.request.header.userid;
            const lastMemeID = await meme.infiniteScrollWaiting(howManyLoads, howManyElements, user)
            
            ctx.body = lastMemeID;

            await next();
        }),

        router.get('/meme/comments/load/:id', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = await meme.getComments(ctx.params.id);
        }),


        router.post('/meme/comments/post/:id', async (ctx, next) => {
            const is_player_logged = ctx.req.body[0];
            if (!is_player_logged || is_player_logged.role < 0) return ctx.body = false;

            const comment = ctx.request.header.content;
            const userID = ctx.req.body[0][0].fb_id;
            const idToFind = ctx.params.id;

            meme.postComment(idToFind, userID, comment, moment().format('YYYY-MM-DD HH:mm:ss'));
            return ctx.body = true;
        }),

        router.delete('/meme/comments/remove/:id', koaBody(), async (ctx, next) => {
            const { fb_id, id, role } = ctx.req.body[0][0];
            const { loggeduserid, commentid } = ctx.request.header;

            console.log(fb_id, id, role, loggeduserid, commentid);
            if (role == 1) {
                //nothing, go further!
            } else if (loggeduserid != fb_id || !fb_id || role < 0) {
                return ctx.body = false;
            }

            await meme.removeComment(commentid);
            return ctx.body = true;
        }),

        router.patch('/meme/like/:id', async (ctx, next) => {
            const meme_id = ctx.params.id;
            const who_liked = ctx.req.body[0][0].fb_id;
            const alreadyGaveLike = await meme.like(meme_id, who_liked);
            if (alreadyGaveLike) { ctx.body = true; } else { ctx.body = false;}
        }),

        router.delete('/meme/remove/:id', async (ctx, next) => {
            try{
                const meme_id = ctx.params.id;
                const {moderator_id} = ctx.request.body;
                const [{ role }] = await user.find(moderator_id);
    
                if(role === 1) {
                    await meme.removeMeme(meme_id);
                    return ctx.body = 200
                };
                    
                return ctx.body = 400;
            } catch (err){
                return ctx.body = 400;
            }
        }),

        router.patch('/meme/approve/:id', async (ctx, next) => {
            try{
                const meme_id = ctx.params.id;
                const {moderator_id} = ctx.request.body;
                const [{ role }] = await user.find(moderator_id);
    
                if(role === 1) {
                    await meme.approveMeme(meme_id);
                    return ctx.body = 200
                };
                    
                return ctx.body = 400;
            } catch (err){
                return ctx.body = 400;
            }
        })
} 