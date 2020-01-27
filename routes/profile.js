const meme = require('../controllers/meme_controller');
const user = require('../controllers/user_controller');
const _ = require('underscore');
const koaBody = require('koa-body');

module.exports = ({ profileRoute }) => {
    profileRoute.get('/', koaBody(), async (ctx, next) => {
        const is_player_logged = ctx.req.body[0];
        await ctx.throw(400, 'Missing the ID of profile!')
    });

    profileRoute.get('/:id', koaBody(), async (ctx, next) => {
        const idToFind = ctx.params.id;
        const userInfo = await user.find(idToFind);
        const detailed_meme_stats = await user.profile_detailed_meme(idToFind);
        const userMemes = await meme.displayMemesFromUser(idToFind);
        const is_player_logged = ctx.req.body[0];

        if(!userInfo) await ctx.throw(404, 'There is no user with ID like that')
        else await ctx.render('profile', {profile: userInfo[0], detailed: detailed_meme_stats[0], memes: userMemes, userInfo: is_player_logged})
    })
}

