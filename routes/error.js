module.exports = ({ errorRoute }) => {
    errorRoute.get('/', async (ctx, next) => {
        await ctx.render('error', {});
        next();
    });
}

