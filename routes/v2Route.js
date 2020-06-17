module.exports = ({ v2Route }) => {
    const vueContr = require('../controllers/vue_controller');

    const meme = require('../controllers/meme_controller');
    const session = require('koa-session');
    const koaBody = require('koa-body');
    
    const renderer = require('vue-server-renderer').createRenderer()
    
    v2Route.get('/', koaBody(), async (ctx, next) => {
        await ctx.render('v2/index')
        next();
    });
}

