var mysql = require('../controllers/mysql_controller');

module.exports = ({ memeRoute }) => {
    memeRoute.get('/', async (ctx, next) => {
        await ctx.render('newMeme', true);
    });
}

