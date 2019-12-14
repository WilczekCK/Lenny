var mysql = require('../controllers/mysql_controller');
const session = require('koa-session');
const koaBody = require('koa-body')

module.exports = ({ memeRoute }) => {
    memeRoute.get('/', async (ctx, next) => {
        await ctx.render('newMeme', true);
    });

    memeRoute.get('/add', async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        if(!is_player_logged) ctx.throw(400, 'User is not logged in');
        await ctx.render('newMeme', {userInfo: is_player_logged});
    })

    memeRoute.post('/add', koaBody(), async (ctx, next) => {
        console.log(ctx.request.body)
    })
}

