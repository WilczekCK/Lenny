module.exports = ({ homepageRoute }) => {
    const mysql = require('../controllers/mysql_controller');
    const auth = require('../controllers/auth_controller');
    const meme = require('../controllers/meme_controller');
    const session = require('koa-session');
    const koaBody = require('koa-body')
    
    homepageRoute.get('/', koaBody(), async (ctx, next) => {
        // const is_player_logged = ctx.req.body[0];
        const allMemesID = await meme.displayMemes(10);


        // await ctx.render('pages/index', {userInfo: is_player_logged, memes: allMemesID});
        // next();
        
        ctx.body = allMemesID;
        next()
    });
}

