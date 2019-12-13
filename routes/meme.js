var mysql = require('../controllers/mysql_controller');
const session = require('koa-session');

module.exports = ({ memeRoute }) => {
    memeRoute.get('/', async (ctx, next) => {
        ctx.session = {};
        await ctx.render('newMeme', true);
    });
}

