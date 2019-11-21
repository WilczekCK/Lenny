module.exports = ({ loginRoute }) => {
    loginRoute.get('/', (ctx, next) => {
        ctx.body = 'Login';
    });
}

