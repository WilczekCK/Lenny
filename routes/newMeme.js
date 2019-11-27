var mysql = require('../controllers/mysql_controller');

module.exports = ({ newMemeRoute }) => {
    newMemeRoute.get('/', async (ctx, next) => {
        await ctx.render('newMeme', true);
    });
}

