const meme = require('../controllers/meme_controller');
const user = require('../controllers/user_controller');
const _ = require('underscore');
module.exports = ({ profileRoute }) => {
    profileRoute.get('/', async (ctx, next) => {
        await ctx.throw(400, 'Missing the ID of profile!')
    });

    profileRoute.get('/:id', async (ctx, next) => {
        const idToFind = ctx.params.id;
        const userInfo = await user.find(idToFind);
        const detailed_meme_stats = await user.profile_detailed_meme(idToFind);
        const userMemes = await meme.displayMemesFromUser(idToFind);

        if(!userInfo) await ctx.throw(404, 'There is no user with ID like that')
        else await ctx.render('profile', {profile: userInfo[0], detailed: detailed_meme_stats[0], memes: userMemes})
    })
}

