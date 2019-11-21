module.exports = ({ homepageRoute }) => {
    homepageRoute.get('/', (ctx, next) => {
        ctx.body = 'Homepage';
    });
}

