export function printRoutes (router) {
    return router.get('/', async (ctx, next) => {
      ctx.type = 'json'
      ctx.body = {
        message: 'hi'
      }
    })
} 