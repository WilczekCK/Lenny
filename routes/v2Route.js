module.exports = ({ v2Route }) => {
    const mysql = require('../controllers/mysql_controller');
    const auth = require('../controllers/auth_controller');
    const meme = require('../controllers/meme_controller');
    const session = require('koa-session');
    const koaBody = require('koa-body')
    
    v2Route.get('/', koaBody(), async (ctx, next) => {
        ctx.body = 'Working route';
        next();
    });
}

