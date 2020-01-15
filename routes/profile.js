module.exports = ({ profileRoute }) => {
    profileRoute.get('/', async (ctx, next) => {
        await ctx.render('profile')
    });
}

