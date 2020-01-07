const mysql = require('../controllers/mysql_controller');
const meme = require('../controllers/meme_controller');
const session = require('koa-session');
const koaBody = require('koa-body');
const multer = require('@koa/multer');
const upload = multer({ dest: './public/uploads/', limits: { fileSize: 500000 } });
const moment = require('moment')
const _ = require('underscore')

module.exports = ({ memeRoute }) => {
    memeRoute.get('/', async (ctx, next) => {
        await ctx.render('newMeme', true);
    });

    memeRoute.get('/add', async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        if (!is_player_logged) ctx.throw(400, 'User is not logged in');
        await ctx.render('newMeme', { userInfo: is_player_logged });
    })

    memeRoute.post('/add', upload.fields([
        {
            name: 'meme',
            maxCount: 1
        },
        {
            name: 'tags',
            maxCount: 1
        }
    ]), async (ctx, next) => {
        if (_.isEmpty(ctx.request.files) || _.isEmpty(ctx.request.body)) return ctx.throw(400, 'One of the fields is missing');
        const { filename } = ctx.request.files.meme[0]; //image-id
        const { tags, author_id, author_username, meme_title } = ctx.request.body;

        const uploadedSqlID = await meme.insertToDB(`${author_id}`, `${author_username}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`, `${tags}`, `${meme_title}`)
        await meme.changeImageName(`${filename}`, `${uploadedSqlID}`);

        await ctx.redirect('/');
        await next();
    })

    memeRoute.get('/moderate', async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        if (!is_player_logged || is_player_logged.role < 1) ctx.throw(400, 'User is not logged in or is not administrator');

        const allMemesID = await meme.displayWaitingMemes();
        await ctx.render('moderate', { userInfo: is_player_logged, memes: allMemesID });
    })

    memeRoute.post('/moderate', koaBody(), async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        if (!is_player_logged || is_player_logged.role < 1) ctx.throw(400, 'User is not logged in or is not administrator');
        const { meme_id, decision } = ctx.request.body;
        meme.moderate(meme_id, decision);

        await ctx.redirect('/meme/moderate');
        await next();
    })

    memeRoute.post('/like/:id', async (ctx, next) => {
        const meme_id = ctx.originalUrl.slice(11);
        //slice the strings from the url, leave the id only

        const who_liked = ctx.req.body[0].ingame_id;
        const alreadyGaveLike = await meme.like(meme_id, who_liked);
        if (alreadyGaveLike) { ctx.body = true; } else { ctx.body = false; }
    })

    memeRoute.post('/load', koaBody(), async (ctx, next) => {
        const howManyLoads = ctx.request.header.loadcount;
        const howManyElements = ctx.request.header.loadelements;
        const lastMemeID = await meme.infiniteScroll(howManyLoads, howManyElements)
        ctx.body = lastMemeID;
    })
}

