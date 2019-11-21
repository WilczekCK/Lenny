module.exports = ({ homepageRoute }) => {
    homepageRoute.get('/', async (ctx, next) => {
        await ctx.render('index', true)
    });
}

