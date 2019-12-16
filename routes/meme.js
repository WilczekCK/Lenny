var mysql = require('../controllers/mysql_controller');
const session = require('koa-session');
const koaBody = require('koa-body');
const multer = require('@koa/multer');
const upload = multer({ dest: './uploads/' });
const moment = require('moment')
const fs = require('fs')

module.exports = ({ memeRoute }) => {
    memeRoute.get('/', async (ctx, next) => {
        await ctx.render('newMeme', true);
    });

    memeRoute.get('/add', async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        if(!is_player_logged) ctx.throw(400, 'User is not logged in');
        await ctx.render('newMeme', {userInfo: is_player_logged});
    })

    memeRoute.post('/add',  upload.fields([
        {
            name: 'meme',
            maxCount: 1
        },
        {
            name:'tags',
            maxCount: 1
        }
    ]), async (ctx, next) => {
        if(!ctx.request) return ctx.throw(400, 'One of the fields is missing');
        const {filename} = ctx.request.files.meme[0]; //image-id
        const {tags, author_id} = ctx.request.body; 

        const uploadedSqlID = await mysql.insert(`images`, `author_id, added_in, tags`, `${author_id}, '${moment().format('YYYY-MM-DD')}', '${tags}'`);
        fs.rename(`./uploads/${filename}`, `./uploads/${uploadedSqlID}.jpg`, (err) => {
            if (err) throw err;
        });

        await ctx.redirect('/');
        await next();
    })
}

