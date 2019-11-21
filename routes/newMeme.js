module.exports = ({ newMemeRoute }) => {
    newMemeRoute.get('/', (ctx, next) => {
        ctx.body = 'New memes!';
    });
}

