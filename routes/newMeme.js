var mysql = require('../controllers/mysql_controller');

module.exports = ({ newMemeRoute }) => {
    newMemeRoute.get('/', async (ctx, next) => {
        await mysql.insert('images', 
                           "author_id, added_in, tags",
                           "123123, '2019-02-01', 'std'");
        
        await ctx.render('newMeme', true);
    });
}

