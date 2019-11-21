module.exports = ({ homepageRoute }) => {
    const mysql = require('../controllers/mysql_controller');
    
    homepageRoute.get('/', async (ctx, next) => {
        mysql.connect();
        await ctx.render('index', true)
    });
}

