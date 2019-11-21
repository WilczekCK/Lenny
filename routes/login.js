module.exports = ({ loginRoute }) => {
    loginRoute.get('/', async (ctx, next) => {
        await ctx.render('login', true);
    });
}

