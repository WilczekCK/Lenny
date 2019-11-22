module.exports = ({ homepageRoute }) => {
    const mysql = require('../controllers/mysql_controller');
    
    homepageRoute.get('/', async (ctx, next) => {
        console.log(await mysql.queries.get('SELECT * FROM images where id = 10'))
        await ctx.render('index', true)
    });
}

