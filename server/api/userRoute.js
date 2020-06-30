export function printRoutes (router) {
    const users = [
        { name: 'Alexandre' },
        { name: 'Pooya' },
        { name: 'Sébastien' },
    ]

    return router.get('/users', async (ctx, next) => {
            ctx.type = 'json'
            ctx.body = users
        }),

        router.get('/users/:id', async (ctx, next) => {
            const id = parseInt(ctx.params.id)
            console.log(users[id])
            if (id >= 0 && id < users.length) {
              ctx.body = users[id]
            } else {
              ctx.throw(404)
            }
        })
} 