export function printRoutes (router) {
    return router.get('/meme', async (ctx, next) => {
            if(err) return err;
            ctx.type = 'json'
            ctx.body = 'meme page'
        }),

        router.get('/meme/:id', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = ctx.params.id;
        })
} 