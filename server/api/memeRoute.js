import * as meme from './controllers/meme.js';
import * as mysql from './controllers/mysql.js';
import session from 'koa-session';
import koaBody from 'koa-body';
import multer from 'multer';
import moment from 'moment';
import _ from 'underscore';


var upload = multer({ 
    fileFilter: function (ctx, file, cb) {
        if (file.mimetype !== 'image/jpeg') {
            return cb(new Error('Only .jpg extension is allowed on that page!', {}));
        }
        cb(null, true);
    },
    dest: './public/uploads/',
    limits: { fileSize: 1000000 } 
});
const getFields = multer();


export function printRoutes (router) {
    return router.get('/meme', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = await meme.displayMemes();
        }),

        router.get('/meme/:id', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = await meme.displayMeme(ctx.params.id)
        }),

        router.post('/meme/add-image', upload.fields([
            {
                name: 'meme',
                maxCount: 1
            },
            {
                name: 'tags',
                maxCount: 1
            }
        ]), async (ctx, next) => {
            if (_.isEmpty(ctx.request.files) || _.isEmpty(ctx.request.body.tags) || _.isEmpty(ctx.request.body.meme_title)) {
                ctx.type = 'json';
                return ctx.body = {status: 400, message: 'One of the fields are missing'};
            }
    
            const { filename } = ctx.request.files.meme[0]; //image-id
            const { tags, author_id, author_username, meme_title } = ctx.request.body;
    
            const uploadedSqlID = await meme.insertToDB(`${author_id}`, `${author_username}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`, `${tags}`, `${meme_title}`, null)
            await meme.changeImageName(`${filename}`, `${uploadedSqlID}`);
    
            await next();
        }),

        router.post('/meme/add-video', getFields.none(),  async (ctx, next) => {
            if (_.isEmpty(ctx.request.body.tags) || _.isEmpty(ctx.request.body.meme_title)) {
                return ctx.throw(400, {message: 'One of the fields are missing'})
            }
    
            const { tags, author_id, author_username, meme_title, meme_video_id } = ctx.request.body;
            const uploadedSqlID = await meme.insertToDB(`${author_id}`, `${author_username}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`, `${tags}`, `${meme_title}`, `'${meme_video_id}'`)
    
            await next();
        }),

        router.get('/meme/load', koaBody(), async (ctx, next) => {
            const howManyLoads = ctx.request.header.page;
            const howManyElements = ctx.request.header.loadelements;
            const lastMemeID = await meme.infiniteScroll(howManyLoads, howManyElements)
            ctx.body = lastMemeID;
            
            await next();
        }),

        router.get('/meme/comments/load/:id', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = await meme.getComments(ctx.params.id);
        }),


    router.post('/meme/comments/post/:id', async (ctx, next) => {
        //const is_player_logged = ctx.req.body[0];
       // if (!is_player_logged || is_player_logged.role < 0) return ctx.body = false;
        
        const comment = ctx.request.header.content;
        const userID = ctx.request.header.userid;
        const idToFind = ctx.params.id;

        meme.postComment(idToFind, userID, comment, moment().format('YYYY-MM-DD HH:mm:ss'));
        return ctx.body = true;
    }),

    router.delete('/meme/comments/delete/:id', koaBody(), async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        const comment_author_id = ctx.request.header.actual_user;

        if (is_player_logged.role == 1){
            //nothing, go further!
        } else if (comment_author_id != is_player_logged.ingame_id || !is_player_logged || is_player_logged.role < 0) {
            return ctx.body = false;
        }

        const idToFind = ctx.params.id;
        await meme.removeComment(idToFind);
        return ctx.body = true;
    })
} 