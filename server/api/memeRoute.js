import * as meme from './controllers/meme.js';
import * as mysql from './controllers/mysql.js';
import session from 'koa-session';
import koaBody from 'koa-body';
import multer from 'multer';
import moment from 'moment';
import _ from 'underscore';
import http from 'http';
import path from 'path'
import os from 'os';
import fs from 'fs';
import BusBoy from 'koa-busboy';

const uploader = BusBoy({
    dest: './', // default is system temp folder (`os.tmpdir()`)
    fnDestFilename: (fieldname, filename) => uuid() + filename
})

export function printRoutes(router) {
    return router.get('/meme', async (ctx, next) => {
        ctx.type = 'json'
        ctx.body = await meme.displayMemes(5);
    }),

        router.get('/meme/:id', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = await meme.displayMeme(ctx.params.id)
        }),

        router.get('/meme/cat/:name', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = await meme.displayMemesWithCategory(ctx.params.name, 5)
        }),

        router.post('/meme/uploadImage', koaBody({ multipart: true }), async (ctx, next) => {
            try {
                const { file } = ctx.request.files;
                const { title, desc, tags } = ctx.request.header;
                const { fb_id, username } = ctx.req.body[0][0];

                const uploadedSqlID = await meme.insertToDB(`${fb_id}`, `${username}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`, `${tags}`, `${title}`, null)
                await meme.uploadImage(`${file.path}`, uploadedSqlID);
            } catch (err) {
                return ctx.throw(400)
            }

            return ctx.throw(200)
        }),

        router.post('/meme/add-video', async (ctx, next) => {
            if (_.isEmpty(ctx.request.body.tags) || _.isEmpty(ctx.request.body.meme_title)) {
                return ctx.throw(400, { message: 'One of the fields are missing' })
            }

            const { tags, author_id, author_username, meme_title, meme_video_id } = ctx.request.body;
            const uploadedSqlID = await meme.insertToDB(`${author_id}`, `${author_username}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`, `${tags}`, `${meme_title}`, `'${meme_video_id}'`)

            await next();
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
        })
} 