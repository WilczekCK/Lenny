module.exports = ({ homepageRoute }) => {
    const mysql = require('../controllers/mysql_controller');
    
    homepageRoute.get('/', async (ctx, next) => {
        console.log(await mysql.query('SELECT * FROM images'))
        await ctx.render('index', true)
    });
}

